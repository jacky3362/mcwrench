// SPDX-License-Identifier: MIT
//
// condense.mjs — trim fetched plugin docs to a compact, normalised REFERENCE.md.
// Heuristic, not semantic: drops obvious nav/marketing chrome, keeps the sections an
// admin needs, and hard-caps length so the reference stays cheap to load.

const MAX_CHARS = 16000; // ~4000 tokens

// Buckets the condenser tries to surface, by heading keyword.
const SECTION_HINTS = [
  { key: 'Overview', re: /\b(overview|about|description|introduction|what is)\b/i },
  { key: 'Installation', re: /\b(install|installation|getting started|setup|download|requirements)\b/i },
  { key: 'Configuration', re: /\b(config|configuration|settings|options|config\.yml)\b/i },
  { key: 'Permissions', re: /\b(permission|permissions|nodes?)\b/i },
  { key: 'Commands', re: /\b(commands?|usage)\b/i },
  { key: 'Placeholders', re: /\b(placeholder|placeholders|papi)\b/i },
  { key: 'Dependencies', re: /\b(depend|dependencies|requires|soft-?depend)\b/i },
  { key: 'Folia', re: /\bfolia\b/i },
];

const DROP_LINE = [
  /^\s*\[!\[/, // badge image links
  /^\s*<img\b/i,
  /shields\.io/i,
  /discord\.gg/i,
  /\bbuy me a coffee\b/i,
  /\bpatreon\b/i,
  /\bsponsor\b/i,
  /^\s*\|?\s*:?-{3,}/, // table rule rows handled elsewhere; keep real ones
];

function stripChrome(md) {
  return md
    .split('\n')
    .filter((line) => {
      if (/shields\.io|\[!\[|^\s*<img\b|buy me a coffee|patreon\.com/i.test(line)) return false;
      return true;
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// Split markdown into [{level, title, body}] by ATX headings.
function splitSections(md) {
  const lines = md.split('\n');
  const sections = [];
  let current = { level: 0, title: '', body: [] };
  for (const line of lines) {
    const m = /^(#{1,6})\s+(.*)$/.exec(line);
    if (m) {
      if (current.title || current.body.length) sections.push(current);
      current = { level: m[1].length, title: m[2].trim(), body: [] };
    } else {
      current.body.push(line);
    }
  }
  if (current.title || current.body.length) sections.push(current);
  return sections;
}

function classify(title) {
  for (const hint of SECTION_HINTS) {
    if (hint.re.test(title)) return hint.key;
  }
  return null;
}

export function condense(rawMarkdown, meta = {}) {
  const md = stripChrome(rawMarkdown || '');
  const sections = splitSections(md);

  // Group matched sections by bucket, preserve order of first appearance for the rest.
  const buckets = new Map();
  const leftovers = [];
  for (const s of sections) {
    const key = classify(s.title);
    const text = `${'#'.repeat(Math.max(2, s.level))} ${s.title}\n${s.body.join('\n')}`.trim();
    if (!text) continue;
    if (key) {
      if (!buckets.has(key)) buckets.set(key, []);
      buckets.get(key).push(text);
    } else {
      leftovers.push(text);
    }
  }

  const order = ['Overview', 'Installation', 'Configuration', 'Permissions', 'Commands', 'Placeholders', 'Dependencies', 'Folia'];
  const parts = [];

  const fm = [
    '---',
    `name: ${meta.name || meta.slug || 'plugin'}`,
    `slug: ${meta.slug || ''}`,
    `source_url: ${meta.sourceUrl || ''}`,
    `fetched_at: ${meta.fetchedAt || ''}`,
    meta.adapter ? `adapter: ${meta.adapter}` : null,
    '---',
  ]
    .filter(Boolean)
    .join('\n');
  parts.push(fm);
  parts.push(`# ${meta.name || meta.slug} — condensed reference`);
  if (meta.warnings && meta.warnings.length) {
    parts.push(`> **Warnings:** ${meta.warnings.join('; ')}`);
  }
  parts.push(
    `> Condensed by mcwrench/learn-plugin-docs from <${meta.sourceUrl || 'source'}>. ` +
      `Full text in RAW.md. Verify against the live docs for anything safety-critical.`,
  );

  for (const key of order) {
    if (buckets.has(key)) {
      parts.push(`\n## ${key}\n\n${buckets.get(key).join('\n\n')}`);
    }
  }

  // Preserve unbucketed content too (many plugin READMEs use headings that don't match the
  // keyword buckets). Append it under "Details" rather than dropping it; the MAX_CHARS cap below
  // trims overflow. This is what keeps a doc whose sections didn't classify from coming back empty.
  if (leftovers.length) {
    const bucketed = order.some((k) => buckets.has(k));
    const heading = bucketed ? 'Details' : 'Reference';
    parts.push(`\n## ${heading}\n\n${leftovers.slice(0, 40).join('\n\n')}`);
  }

  let out = parts.join('\n').replace(/\n{3,}/g, '\n\n').trim();
  if (out.length > MAX_CHARS) {
    out = out.slice(0, MAX_CHARS) + '\n\n…[truncated — see RAW.md for the full document]';
  }
  return out + '\n';
}

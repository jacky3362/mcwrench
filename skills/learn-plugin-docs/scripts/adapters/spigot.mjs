// SPDX-License-Identifier: MIT
// SpigotMC adapter — WIRED. Uses the unofficial XenforoResourceManagerAPI wrapper:
//   GET https://api.spigotmc.org/simple/0.2/index.php?action=getResource&id=<id>
// The resource `description` is BBCode (not Markdown) — converted here with a small lossy
// converter; a warning is surfaced in the reference.

const API = 'https://api.spigotmc.org/simple/0.2/index.php';

function resourceId(url) {
  // .../resources/<slug>.<id>/  -> <id>
  const m = /resources\/[^/]*\.(\d+)/.exec(url.pathname) || /[?&]id=(\d+)/.exec(url.search);
  return m ? m[1] : null;
}

// Minimal BBCode -> Markdown. Lossy on heavily formatted pages (tables, spoilers, custom tags).
function bbcodeToMarkdown(bb) {
  let s = String(bb || '');
  s = s.replace(/\[b\]([\s\S]*?)\[\/b\]/gi, '**$1**');
  s = s.replace(/\[i\]([\s\S]*?)\[\/i\]/gi, '_$1_');
  s = s.replace(/\[u\]([\s\S]*?)\[\/u\]/gi, '$1');
  s = s.replace(/\[s\]([\s\S]*?)\[\/s\]/gi, '~~$1~~');
  s = s.replace(/\[url=([^\]]+)\]([\s\S]*?)\[\/url\]/gi, '[$2]($1)');
  s = s.replace(/\[url\]([\s\S]*?)\[\/url\]/gi, '<$1>');
  s = s.replace(/\[img\]([\s\S]*?)\[\/img\]/gi, '![]($1)');
  s = s.replace(/\[code\]([\s\S]*?)\[\/code\]/gi, '\n```\n$1\n```\n');
  s = s.replace(/\[list\]([\s\S]*?)\[\/list\]/gi, (_m, inner) => '\n' + inner.replace(/\[\*\]/g, '- '));
  s = s.replace(/\[\*\]/g, '- ');
  s = s.replace(/\[h\d\]([\s\S]*?)\[\/h\d\]/gi, '\n## $1\n');
  s = s.replace(/\[size=[^\]]+\]([\s\S]*?)\[\/size\]/gi, '$1');
  s = s.replace(/\[color=[^\]]+\]([\s\S]*?)\[\/color\]/gi, '$1');
  s = s.replace(/\[center\]([\s\S]*?)\[\/center\]/gi, '$1');
  s = s.replace(/\[quote[^\]]*\]([\s\S]*?)\[\/quote\]/gi, '\n> $1\n');
  s = s.replace(/\[[^\]]+\]/g, ''); // strip any remaining tags
  return s.replace(/\n{3,}/g, '\n\n').trim();
}

function decodeEntities(s) {
  return String(s)
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&apos;/g, "'");
}

export async function fetchFromUrl(url, { userAgent }) {
  const id = resourceId(url);
  if (!id) throw new Error(`No SpigotMC resource id in ${url.href} (expected /resources/<name>.<id>/)`);
  const res = await fetch(`${API}?action=getResource&id=${id}`, {
    headers: { 'User-Agent': userAgent, Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`SpigotMC API ${res.status} for resource ${id}`);
  const r = await res.json();
  const title = r.title || `SpigotMC resource ${id}`;
  const md = [
    `# ${title}`,
    r.tag ? `\n_${decodeEntities(r.tag)}_\n` : '',
    r.version ? `\n**Version:** ${r.version}` : '',
    r.downloads ? `\n**Downloads:** ${r.downloads}` : '',
    `\n**Resource:** https://www.spigotmc.org/resources/${id}/`,
    '\n\n---\n',
    bbcodeToMarkdown(decodeEntities(r.description || '')),
  ].join('');
  return {
    markdown: md,
    sourceUrl: `https://www.spigotmc.org/resources/${id}/`,
    meta: { name: title, slug: `spigot-${id}`, host: 'spigotmc.org', adapter: 'spigot' },
    warnings: ['SpigotMC descriptions are BBCode; conversion to Markdown is lossy — verify against the live page.'],
  };
}

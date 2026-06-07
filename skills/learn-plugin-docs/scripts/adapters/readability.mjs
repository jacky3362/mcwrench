// SPDX-License-Identifier: MIT
// Generic Readability fallback adapter — WIRED, with LAZY optional deps.
// For unknown hosts with no API and no markdown export. The heavy deps (jsdom,
// @mozilla/readability, turndown, turndown-plugin-gfm) are OPTIONAL — install them with
//   npm install jsdom @mozilla/readability turndown turndown-plugin-gfm
// to enable this path. The wired adapters (Modrinth/Hangar/GitBook/GitHub/Oraxen/Spigot/
// SkriptHub/PaperMC) never need them.

async function loadDeps() {
  try {
    const { JSDOM } = await import('jsdom');
    const { Readability } = await import('@mozilla/readability');
    const Turndown = (await import('turndown')).default;
    let gfm = null;
    try { ({ gfm } = await import('turndown-plugin-gfm')); } catch { /* tables optional */ }
    return { JSDOM, Readability, Turndown, gfm };
  } catch (e) {
    return null;
  }
}

export async function fetchFromUrl(url, { userAgent }) {
  const deps = await loadDeps();
  if (!deps) {
    throw new Error(
      `Readability fallback needs optional deps for ${url.href}. ` +
        `Run: npm install jsdom @mozilla/readability turndown turndown-plugin-gfm ` +
        `(or use WebFetch on the URL, or paste the docs / upload the plugin .jar).`,
    );
  }
  const res = await fetch(url.href, { headers: { 'User-Agent': userAgent, Accept: 'text/html,*/*' } });
  if (!res.ok) throw new Error(`Readability fetch ${res.status} for ${url.href}`);
  const html = await res.text();

  const { JSDOM, Readability, Turndown, gfm } = deps;
  const dom = new JSDOM(html, { url: url.href });
  const article = new Readability(dom.window.document).parse();
  if (!article || !article.content) throw new Error(`Readability could not extract an article from ${url.href}`);

  const td = new Turndown({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
  if (gfm) td.use(gfm);
  const md = `# ${article.title || url.hostname}\n\n${td.turndown(article.content)}`;

  const slug = (url.pathname.split('/').filter(Boolean).pop() || url.hostname.split('.')[0]).toLowerCase();
  return {
    markdown: md,
    sourceUrl: url.href,
    meta: { name: article.title || url.hostname, slug, host: url.hostname, adapter: 'readability' },
    warnings: ['Best-effort Readability extraction from an unknown host — verify against the live page.'],
  };
}

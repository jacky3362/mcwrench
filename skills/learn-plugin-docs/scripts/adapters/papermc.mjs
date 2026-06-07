// SPDX-License-Identifier: MIT
// PaperMC docs + GitLab-wiki adapter — WIRED.
// - PaperMC docs (docs.papermc.io) use Starlight; the GitBook `.md` trick does NOT work, so we
//   fetch the raw Markdown source from github.com/PaperMC/docs.
// - MythicMobs docs are a self-hosted GitLab wiki (git.mythiccraft.io) — we try GitLab's raw
//   markdown endpoints, NOT the GitBook trick.

async function tryText(url, userAgent) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': userAgent, Accept: 'text/plain, */*' } });
    if (!res.ok) return null;
    const t = await res.text();
    return t.trim() ? t : null;
  } catch {
    return null;
  }
}

async function fetchPaperDocs(url, userAgent) {
  // PaperMC docs are Starlight: the live URL slug does NOT match the source file path
  // (files live under src/content/docs/.../*.mdx). So we search the repo tree for a file whose
  // path ends with the URL's last segment, then fetch its raw markdown. Robust to restructures.
  const segs = url.pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  const last = (segs[segs.length - 1] || 'index').toLowerCase();
  let tree;
  try {
    const r = await fetch('https://api.github.com/repos/PaperMC/docs/git/trees/main?recursive=1', {
      headers: { 'User-Agent': userAgent, Accept: 'application/vnd.github+json' },
    });
    if (!r.ok) return null;
    tree = (await r.json()).tree || [];
  } catch {
    return null;
  }
  const docs = tree
    .map((t) => t.path)
    .filter((p) => /^src\/content\/docs\/.+\.(md|mdx)$/.test(p));
  // Prefer an exact filename match on the last URL segment; then a path that contains all segments.
  const base = (p) => p.replace(/\.(md|mdx)$/, '').split('/').pop().toLowerCase();
  let hit =
    docs.find((p) => base(p) === last) ||
    docs.find((p) => segs.every((s) => p.toLowerCase().includes(s.toLowerCase()))) ||
    null;
  if (!hit) return null;
  const raw = `https://raw.githubusercontent.com/PaperMC/docs/main/${hit}`;
  const md = await tryText(raw, userAgent);
  return md ? { md, sourceUrl: raw } : null;
}

async function fetchGitlabWiki(url, userAgent) {
  // git.mythiccraft.io/<group>/<project>/-/wikis/<page>  -> raw wiki markdown
  const m = /^\/(.+?)\/-\/wikis\/(.+?)\/?$/.exec(url.pathname);
  if (m) {
    const project = m[1];
    const page = m[2];
    const candidates = [
      `${url.origin}/${project}/-/wikis/${page}.md`,
      `${url.origin}/${project}/-/wikis/${page}?format=md`,
    ];
    for (const c of candidates) {
      const md = await tryText(c, userAgent);
      if (md && !/^\s*<!doctype html|^\s*<html/i.test(md)) return { md, sourceUrl: c };
    }
  }
  return null;
}

export async function fetchFromUrl(url, { userAgent }) {
  let got = null;
  if (url.hostname.includes('docs.papermc.io')) got = await fetchPaperDocs(url, userAgent);
  else if (url.hostname.includes('git.mythiccraft.io') || url.hostname.includes('gitlab'))
    got = await fetchGitlabWiki(url, userAgent);

  if (!got) {
    throw new Error(
      `PaperMC/GitLab adapter could not resolve markdown for ${url.href}. ` +
        `PaperMC docs: try github.com/PaperMC/docs directly. GitLab wikis: use the page's raw view. ` +
        `Manual fallback: WebFetch the page or paste the section.`,
    );
  }
  const slug = url.pathname.split('/').filter(Boolean).pop() || url.hostname.split('.')[0];
  return {
    markdown: got.md,
    sourceUrl: got.sourceUrl,
    meta: { name: url.hostname, slug: slug.toLowerCase(), host: url.hostname, adapter: 'papermc' },
    warnings: [],
  };
}

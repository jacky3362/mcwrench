// SPDX-License-Identifier: MIT
// GitBook (and generic docs host) adapter.
// Strategy (verified 2026-06-07):
//   1. Append `.md` to the page URL (GA since 2025-06-24) — but PER-SITE TOGGLEABLE, may 404.
//   2. Fall back to `<origin>/llms-full.txt`, then `<origin>/llms.txt`.
//   3. If all fail, throw with a manual-fallback hint (the Readability stub handles the rest).

async function tryFetchText(url, userAgent, accept = 'text/markdown, text/plain, */*') {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': userAgent, Accept: accept } });
    if (!res.ok) return null;
    const text = await res.text();
    // Guard against an HTML page being returned with a 200 for a .md URL.
    if (/^\s*<!doctype html|^\s*<html/i.test(text)) return null;
    return text.trim() ? text : null;
  } catch {
    return null;
  }
}

export async function fetchFromUrl(url, { userAgent }) {
  const href = url.href.replace(/\/$/, '');
  const origin = url.origin;
  const warnings = [];

  // 1. .md suffix
  const mdUrl = href.endsWith('.md') ? href : `${href}.md`;
  let md = await tryFetchText(mdUrl, userAgent);
  let sourceUrl = mdUrl;

  // 2. llms-full.txt / llms.txt at the origin
  if (!md) {
    warnings.push('GitBook .md export unavailable for this page; used llms.txt fallback');
    md = await tryFetchText(`${origin}/llms-full.txt`, userAgent);
    sourceUrl = `${origin}/llms-full.txt`;
    if (!md) {
      md = await tryFetchText(`${origin}/llms.txt`, userAgent);
      sourceUrl = `${origin}/llms.txt`;
    }
  }

  if (!md) {
    throw new Error(
      `GitBook adapter could not get markdown from ${url.href} ` +
        `(tried .md, /llms-full.txt, /llms.txt). ` +
        `The generic Readability fallback is tried next for unknown hosts (it needs optional deps); ` +
        `otherwise paste the docs or give a GitHub source.`,
    );
  }

  const slug = (url.hostname.split('.')[0] || 'docs') + '-' + (url.pathname.split('/').filter(Boolean).pop() || 'index');
  return {
    markdown: md,
    sourceUrl,
    meta: { name: url.hostname, slug, host: url.hostname, adapter: 'gitbook' },
    warnings,
  };
}

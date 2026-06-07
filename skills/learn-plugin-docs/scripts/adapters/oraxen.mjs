// SPDX-License-Identifier: MIT
// Oraxen adapter — WIRED. Oraxen dropped its standalone llms.txt (verified 2026-06-07) and uses
// content negotiation. Try, in order: `.md` suffix, `?format=md`, `Accept: text/markdown`,
// then the bulk `/api/docs/_all`. Docs: https://docs.oraxen.com/

async function tryText(url, userAgent, headers = {}) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': userAgent, ...headers } });
    if (!res.ok) return null;
    const text = await res.text();
    if (/^\s*<!doctype html|^\s*<html/i.test(text)) return null; // got an HTML page, not markdown
    return text.trim() ? text : null;
  } catch {
    return null;
  }
}

export async function fetchFromUrl(url, { userAgent }) {
  const href = url.href.replace(/\/$/, '');
  const origin = url.origin;
  const warnings = [];
  let md = null;
  let sourceUrl = href;

  // 1. .md suffix
  md = await tryText(href.endsWith('.md') ? href : `${href}.md`, userAgent, { Accept: 'text/markdown' });
  if (md) sourceUrl = `${href}.md`;

  // 2. ?format=md
  if (!md) {
    const u = `${href}${url.search ? '&' : '?'}format=md`;
    md = await tryText(u, userAgent, { Accept: 'text/markdown' });
    if (md) sourceUrl = u;
  }

  // 3. Accept: text/markdown on the page itself
  if (!md) {
    md = await tryText(href, userAgent, { Accept: 'text/markdown' });
    if (md) sourceUrl = href;
  }

  // 4. bulk dump
  if (!md) {
    md = await tryText(`${origin}/api/docs/_all`, userAgent, { Accept: 'text/markdown, application/json' });
    if (md) {
      sourceUrl = `${origin}/api/docs/_all`;
      warnings.push('Used Oraxen /api/docs/_all bulk dump (whole docs site, not a single page)');
    }
  }

  if (!md) {
    throw new Error(
      `Oraxen adapter could not get markdown from ${url.href} ` +
        `(tried .md, ?format=md, Accept: text/markdown, /api/docs/_all). ` +
        `Manual fallback: fetch the page with WebFetch or paste the docs.`,
    );
  }

  const last = url.pathname.split('/').filter(Boolean).pop() || 'oraxen';
  return {
    markdown: md,
    sourceUrl,
    meta: { name: 'Oraxen', slug: `oraxen-${last}`.toLowerCase(), host: url.hostname, adapter: 'oraxen' },
    warnings,
  };
}

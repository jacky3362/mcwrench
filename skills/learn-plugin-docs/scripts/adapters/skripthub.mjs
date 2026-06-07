// SPDX-License-Identifier: MIT
// Skript Hub adapter — WIRED. Undocumented JSON API (live 2026-06-07):
//   GET https://skripthub.net/api/v1/addonsyntaxlist/   (incl. addons)
// For richer Skript work use the skript-author skill's fetch-skripthub.mjs (addon/search filters).
// Here we resolve a skripthub.net URL: filter by ?addon= / ?search= if present, else summarise.

const ENDPOINT = 'https://skripthub.net/api/v1/addonsyntaxlist/';

export async function fetchFromUrl(url, { userAgent }) {
  const res = await fetch(ENDPOINT, { headers: { 'User-Agent': userAgent, Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Skript Hub ${res.status} for ${ENDPOINT}`);
  const data = await res.json();
  const arr = Array.isArray(data) ? data : data.results || [];

  const addonName = (it) => (it.addon && typeof it.addon === 'object' ? it.addon.name : it.addon) || '';
  const addon = url.searchParams.get('addon');
  const search = (url.searchParams.get('search') || url.searchParams.get('q') || '').toLowerCase();
  const items = arr.filter((it) => {
    if (addon && String(addonName(it)).toLowerCase() !== addon.toLowerCase()) return false;
    if (search) {
      const hay = `${it.title || ''} ${it.syntax_pattern || ''} ${it.description || ''}`.toLowerCase();
      if (!hay.includes(search)) return false;
    }
    return true;
  });

  const label = addon || search || 'Skript (all addons)';
  const lines = [`# Skript Hub syntax — ${label}`, `> ${items.length} entries.`, ''];
  for (const it of items.slice(0, 150)) {
    lines.push(`## ${it.title || it.id} ${addonName(it) ? `(${addonName(it)})` : ''}`.trim());
    if (it.syntax_pattern) lines.push('```\n' + String(it.syntax_pattern).trim() + '\n```');
    if (it.description) lines.push(String(it.description).trim());
    lines.push('');
  }

  return {
    markdown: lines.join('\n'),
    sourceUrl: ENDPOINT,
    meta: { name: `Skript Hub: ${label}`, slug: `skripthub-${(addon || search || 'all').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, host: 'skripthub.net', adapter: 'skripthub' },
    warnings: items.length > 150 ? [`Truncated to 150 of ${items.length} entries`] : [],
  };
}

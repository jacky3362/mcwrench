// SPDX-License-Identifier: MIT
// Hangar (PaperMC plugin host) adapter — official REST v1.
// IMPORTANT (verified 2026-06-07): the /{author}/{slug} endpoints are DEPRECATED.
// Use slug-only forms: /api/v1/projects/{slug} and /api/v1/pages/main/{project}.
// OpenAPI: https://hangar.papermc.io/v3/api-docs

const API = 'https://hangar.papermc.io/api/v1';

async function getJson(url, userAgent) {
  const res = await fetch(url, {
    headers: { 'User-Agent': userAgent, Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`Hangar ${res.status} for ${url}`);
  return res.json();
}

async function getMainPage(slug, userAgent) {
  // The main page endpoint returns Markdown (sometimes as a raw string, sometimes JSON-wrapped).
  const res = await fetch(`${API}/pages/main/${encodeURIComponent(slug)}`, {
    headers: { 'User-Agent': userAgent, Accept: 'application/json, text/markdown' },
  });
  if (!res.ok) return '';
  const text = await res.text();
  try {
    const j = JSON.parse(text);
    return typeof j === 'string' ? j : j.contents || j.content || '';
  } catch {
    return text; // already markdown
  }
}

function toReference(project, body) {
  const slug = project.name || project.slug;
  const url = `https://hangar.papermc.io/${project.namespace?.owner || ''}/${slug}`.replace('//', '/');
  const header = [
    `# ${project.name || slug}`,
    project.description ? `\n${project.description}\n` : '',
    project.category ? `\n**Category:** ${project.category}` : '',
    project.stats?.downloads != null ? `\n**Downloads:** ${project.stats.downloads}` : '',
    '\n\n---\n',
  ].join('');
  return {
    markdown: header + (body || '_No main page content returned by Hangar._'),
    sourceUrl: `https://hangar.papermc.io/${project.namespace?.owner ? project.namespace.owner + '/' : ''}${slug}`,
    meta: { name: project.name || slug, slug, host: 'hangar.papermc.io', adapter: 'hangar' },
    warnings: [],
  };
}

export async function fetchProject(slug, { userAgent }) {
  const project = await getJson(`${API}/projects/${encodeURIComponent(slug)}`, userAgent);
  const body = await getMainPage(slug, userAgent);
  return toReference(project, body);
}

export async function fetchFromUrl(url, { userAgent }) {
  // https://hangar.papermc.io/<owner>/<slug>  -> use slug (last segment)
  const parts = url.pathname.split('/').filter(Boolean);
  const slug = parts[parts.length - 1];
  if (!slug) throw new Error(`No Hangar slug in URL ${url.href}`);
  return fetchProject(slug, { userAgent });
}

export async function searchAndFetch(name, { userAgent }) {
  const url = `${API}/projects?query=${encodeURIComponent(name)}&limit=3`;
  const data = await getJson(url, userAgent);
  const hit = data.result && data.result[0];
  if (!hit) throw new Error(`Hangar search: no match for "${name}"`);
  const slug = hit.name || hit.slug;
  const body = await getMainPage(slug, userAgent);
  return toReference(hit, body);
}

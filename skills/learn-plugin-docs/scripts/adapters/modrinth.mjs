// SPDX-License-Identifier: MIT
// Modrinth adapter — official REST v2, no auth. The `body` field is Markdown.
// Docs: https://docs.modrinth.com/api/  · Rate limit: 300 req/min · requires a unique User-Agent.

const API = 'https://api.modrinth.com/v2';

async function getJson(url, userAgent) {
  const res = await fetch(url, {
    headers: { 'User-Agent': userAgent, Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`Modrinth ${res.status} for ${url}`);
  return res.json();
}

function toReference(project) {
  const url = `https://modrinth.com/${project.project_type || 'plugin'}/${project.slug}`;
  const header = [
    `# ${project.title}`,
    project.description ? `\n${project.description}\n` : '',
    project.client_side || project.server_side
      ? `\n_client: ${project.client_side} · server: ${project.server_side}_\n`
      : '',
    project.categories?.length ? `\n**Categories:** ${project.categories.join(', ')}` : '',
    project.game_versions?.length
      ? `\n**Game versions:** ${project.game_versions.slice(-8).join(', ')}`
      : '',
    project.source_url ? `\n**Source:** ${project.source_url}` : '',
    project.wiki_url ? `\n**Wiki:** ${project.wiki_url}` : '',
    '\n\n---\n',
  ].join('');
  return {
    markdown: header + (project.body || '_No long description provided on Modrinth._'),
    sourceUrl: url,
    meta: { name: project.title, slug: project.slug, host: 'modrinth.com', adapter: 'modrinth' },
    warnings: [],
  };
}

export async function fetchProject(slug, { userAgent }) {
  const project = await getJson(`${API}/project/${encodeURIComponent(slug)}`, userAgent);
  return toReference(project);
}

export async function fetchFromUrl(url, { userAgent }) {
  // https://modrinth.com/plugin/<slug>  |  /mod/<slug>  |  /datapack/<slug>
  const parts = url.pathname.split('/').filter(Boolean);
  const slug = parts[1] || parts[0];
  if (!slug) throw new Error(`No Modrinth slug in URL ${url.href}`);
  return fetchProject(slug, { userAgent });
}

export async function searchAndFetch(name, { userAgent }) {
  const facets = encodeURIComponent('[["project_type:plugin","project_type:mod"]]');
  const url = `${API}/search?query=${encodeURIComponent(name)}&limit=3&facets=${facets}`;
  const data = await getJson(url, userAgent);
  const hit = data.hits && data.hits[0];
  if (!hit) throw new Error(`Modrinth search: no plugin/mod match for "${name}"`);
  return fetchProject(hit.slug, { userAgent });
}

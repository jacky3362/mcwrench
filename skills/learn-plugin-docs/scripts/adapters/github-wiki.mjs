// SPDX-License-Identifier: MIT
// GitHub wiki adapter — wiki pages are served as raw markdown at
// raw.githubusercontent.com/wiki/<owner>/<repo>/<Page>.md  (no auth, no API).
// Grabs the Home page and appends the sidebar page index when present.

async function tryWiki(owner, repo, page, userAgent) {
  const url = `https://raw.githubusercontent.com/wiki/${owner}/${repo}/${page}`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': userAgent, Accept: 'text/plain, */*' } });
    if (!res.ok) return null;
    const text = await res.text();
    return text.trim() ? { text, url } : null;
  } catch {
    return null;
  }
}

export async function fetchFromRepo(owner, repo, { userAgent }) {
  repo = repo.replace(/\.git$/, '').replace(/\.wiki$/, '');
  const home = (await tryWiki(owner, repo, 'Home.md', userAgent)) || (await tryWiki(owner, repo, 'README.md', userAgent));
  if (!home) throw new Error(`No GitHub wiki Home page for ${owner}/${repo} (is the wiki enabled?).`);
  let markdown = `# ${owner}/${repo} (wiki)\n\n${home.text}`;
  const side = await tryWiki(owner, repo, '_Sidebar.md', userAgent);
  if (side) markdown += `\n\n## Wiki pages\n\n${side.text}`;
  return {
    markdown,
    sourceUrl: home.url,
    meta: { name: `${owner}/${repo} wiki`, slug: repo.toLowerCase(), host: 'github.com', adapter: 'github-wiki' },
    warnings: [],
  };
}

export async function fetchFromUrl(url, { userAgent }) {
  // https://github.com/<owner>/<repo>/wiki[/Page]
  const parts = url.pathname.split('/').filter(Boolean);
  if (parts.length < 2) throw new Error(`No owner/repo in GitHub wiki URL ${url.href}`);
  return fetchFromRepo(parts[0], parts[1], { userAgent });
}

// SPDX-License-Identifier: MIT
// GitHub README adapter — raw markdown, no auth, no API rate concerns for raw.githubusercontent.com.
// Tries common default branches and README filenames.

const BRANCHES = ['HEAD', 'main', 'master'];
const FILES = ['README.md', 'readme.md', 'README.MD', 'Readme.md', 'docs/README.md'];

async function tryRaw(owner, repo, branch, file, userAgent) {
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file}`;
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
  repo = repo.replace(/\.git$/, '');
  for (const branch of BRANCHES) {
    for (const file of FILES) {
      const hit = await tryRaw(owner, repo, branch, file, userAgent);
      if (hit) {
        return {
          markdown: `# ${owner}/${repo}\n\n${hit.text}`,
          sourceUrl: hit.url,
          meta: { name: `${owner}/${repo}`, slug: repo.toLowerCase(), host: 'github.com', adapter: 'github-readme' },
          warnings: [],
        };
      }
    }
  }
  throw new Error(`No README found for ${owner}/${repo} on HEAD/main/master.`);
}

export async function fetchFromUrl(url, { userAgent }) {
  // https://github.com/<owner>/<repo>[/...]  or raw.githubusercontent.com/<owner>/<repo>/<branch>/<path>
  const parts = url.pathname.split('/').filter(Boolean);
  if (parts.length < 2) throw new Error(`No owner/repo in GitHub URL ${url.href}`);
  return fetchFromRepo(parts[0], parts[1], { userAgent });
}

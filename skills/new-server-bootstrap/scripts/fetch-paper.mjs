#!/usr/bin/env node
// SPDX-License-Identifier: MIT
//
// fetch-paper.mjs — resolve the latest STABLE Paper (or Velocity) build via the PaperMC Fill v3
// API and print its download URL. The legacy v2 API stopped receiving builds on 2025-12-31.
//
// IMPORTANT: download URLs are read from the API response (on fill-data.papermc.io) and must NOT
// be hand-constructed — the format may change. A descriptive User-Agent is required by the API.
//
// Usage:
//   node fetch-paper.mjs                       # latest STABLE Paper for the newest version
//   node fetch-paper.mjs 26.1.2                # latest STABLE Paper for 26.1.2
//   node fetch-paper.mjs 26.1.2 --download     # also download the jar to ./paper-<ver>-<build>.jar
//   node fetch-paper.mjs --project velocity 3.5.0-SNAPSHOT
//
// Runs on stock Node >= 18 (global fetch).

import { writeFile } from 'node:fs/promises';

const UA = 'mcwrench/1.0 (+https://github.com/Teddy563/mcwrench) new-server-bootstrap';
const API = 'https://fill.papermc.io/v3';

async function getJson(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Fill v3 ${res.status} for ${url}`);
  return res.json();
}

function parseArgs(argv) {
  const out = { project: 'paper', version: null, download: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--download') out.download = true;
    else if (a === '--project') out.project = argv[++i];
    else if (!a.startsWith('--')) out.version = a;
  }
  return out;
}

async function latestVersion(project) {
  const data = await getJson(`${API}/projects/${project}/versions`);
  // The API returns versions; newest first or under a `versions` array depending on shape.
  const list = Array.isArray(data) ? data : data.versions || [];
  const first = list[0];
  if (!first) throw new Error(`No versions returned for ${project}`);
  return typeof first === 'string' ? first : first.version?.id || first.id || first.version;
}

function pickBuild(builds) {
  const arr = Array.isArray(builds) ? builds : builds.builds || [];
  // Prefer the newest STABLE; fall back to the newest of any channel.
  const stable = arr.filter((b) => (b.channel || '').toUpperCase() === 'STABLE');
  const pool = stable.length ? stable : arr;
  // Highest build number.
  return pool.reduce((best, b) => ((b.id ?? b.build ?? 0) > (best.id ?? best.build ?? -1) ? b : best), pool[0]);
}

function downloadUrl(build) {
  const d = build.downloads || {};
  const entry = d['server:default'] || d.application || Object.values(d)[0];
  if (!entry || !entry.url) throw new Error('No download URL in build response');
  return { url: entry.url, name: entry.name };
}

async function main() {
  const { project, version, download } = parseArgs(process.argv.slice(2));
  const ver = version || (await latestVersion(project));
  const builds = await getJson(`${API}/projects/${project}/versions/${encodeURIComponent(ver)}/builds`);
  const build = pickBuild(builds);
  const { url, name } = downloadUrl(build);
  const buildId = build.id ?? build.build;
  const channel = build.channel || 'UNKNOWN';

  console.log(`project: ${project}`);
  console.log(`version: ${ver}`);
  console.log(`build:   ${buildId} (${channel})`);
  console.log(`jar:     ${name || `${project}-${ver}-${buildId}.jar`}`);
  console.log(`url:     ${url}`);

  if (download) {
    const out = name || `${project}-${ver}-${buildId}.jar`;
    console.error(`[fetch-paper] downloading ${out} …`);
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error(`download ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(out, buf);
    console.error(`[fetch-paper] wrote ${out} (${buf.length} bytes)`);
  }
}

main().catch((e) => {
  console.error(`[fetch-paper] FAILED: ${e.message}`);
  process.exit(1);
});

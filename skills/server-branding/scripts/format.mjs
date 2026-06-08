#!/usr/bin/env node
// SPDX-License-Identifier: MIT
//
// format.mjs — convert between MiniMessage and legacy (&-code / &#RRGGBB) color formatting, for
// branding output that must target plugins which don't parse MiniMessage (see
// references/format-target-matrix.md). Pure JS, no deps, stock Node >= 18.
//
// Usage:
//   node format.mjs --to-legacy "<gradient:#FF6B6B:#FFD93D>Aether</gradient>"
//   node format.mjs --to-mm "&aHello &#ff0000World"
//   node format.mjs --preview "<gradient:#FF6B6B:#FFD93D>Aether</gradient>"
//
// Conversions are LOSSY: hover/click and other interactivity tags have no legacy equivalent
// (they are dropped with a warning); legacy -> MiniMessage does not auto-close tags.

const NAMED = {
  black: '0', dark_blue: '1', dark_green: '2', dark_aqua: '3', dark_red: '4', dark_purple: '5',
  gold: '6', gray: '7', grey: '7', dark_gray: '8', dark_grey: '8', blue: '9', green: 'a',
  aqua: 'b', red: 'c', light_purple: 'd', yellow: 'e', white: 'f',
};
const NAMED_INV = Object.fromEntries(Object.entries(NAMED).filter(([k]) => k !== 'grey' && k !== 'dark_grey').map(([k, v]) => [v, k]));
const DECOR = { bold: 'l', b: 'l', italic: 'o', i: 'o', em: 'o', underlined: 'n', u: 'n', strikethrough: 'm', st: 'm', obfuscated: 'k', obf: 'k', reset: 'r' };
const DECOR_INV = { l: 'bold', o: 'italic', n: 'underlined', m: 'strikethrough', k: 'obfuscated', r: 'reset' };

const warnings = [];
function warn(m) { if (!warnings.includes(m)) warnings.push(m); }

const hexToRgb = (h) => { const x = h.replace('#', ''); return [0, 2, 4].map((i) => parseInt(x.slice(i, i + 2), 16)); };
const rgbToHex = (r, g, b) => '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');

// n interpolated hex colors across the given stops (linear, multi-stop).
function gradientColors(stops, n) {
  if (n <= 0) return [];
  if (n === 1 || stops.length === 1) return [stops[0]];
  const segs = stops.length - 1;
  const out = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const x = t * segs;
    const si = Math.min(Math.floor(x), segs - 1);
    const lt = x - si;
    const [r1, g1, b1] = hexToRgb(stops[si]);
    const [r2, g2, b2] = hexToRgb(stops[si + 1]);
    out.push(rgbToHex(r1 + (r2 - r1) * lt, g1 + (g2 - g1) * lt, b1 + (b2 - b1) * lt));
  }
  return out;
}

// Expand <gradient:#a:#b[:#c][:phase]>text</gradient> to per-character &#RRGGBB runs.
function expandGradients(s) {
  return s.replace(/<gradient:([^>]+)>([\s\S]*?)<\/gradient>/gi, (_, args, text) => {
    const stops = args.split(':').filter((a) => /^#?[0-9a-f]{6}$/i.test(a)).map((a) => (a[0] === '#' ? a : '#' + a));
    if (stops.length < 2) return text;
    // strip nested tags for color slotting but keep their characters? keep simple: color visible chars
    const chars = [...text];
    const cols = gradientColors(stops, chars.length);
    return chars.map((c, i) => (c.trim() === '' ? c : `&${cols[i]}${c}`)).join('');
  });
}
// Expand <rainbow>text</rainbow> across the HSV wheel.
function expandRainbow(s) {
  return s.replace(/<rainbow(?::!?[0-9.]*)?>([\s\S]*?)<\/rainbow>/gi, (_, text) => {
    const chars = [...text];
    return chars.map((c, i) => {
      if (c.trim() === '') return c;
      const h = (i / Math.max(1, chars.length)) * 360;
      return `&${rgbToHex(...hsvToRgb(h, 0.9, 1))}${c}`;
    }).join('');
  });
}
function hsvToRgb(h, s, v) {
  const c = v * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = v - c;
  const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}

function toLegacy(s) {
  let out = expandRainbow(expandGradients(s));
  // interactivity -> drop (keep inner text)
  out = out.replace(/<(hover|click|insert|font|key|lang|tr|selector|score|nbt)(:[^>]*)?>([\s\S]*?)<\/\1>/gi, (_, tag, _a, inner) => {
    warn(`dropped <${tag}> (no legacy equivalent)`);
    return inner;
  });
  // hex color tags
  out = out.replace(/<#([0-9a-f]{6})>/gi, '&#$1').replace(/<color:#([0-9a-f]{6})>/gi, '&#$1');
  out = out.replace(/<\/?(?:color|c)(?::[^>]*)?>/gi, '');
  // named colors
  out = out.replace(/<(\/?)([a-z_]+)>/gi, (m, slash, name) => {
    const k = name.toLowerCase();
    if (NAMED[k]) return slash ? '' : '&' + NAMED[k];
    if (DECOR[k]) return slash ? '' : '&' + DECOR[k];
    if (k === 'newline' || k === 'br') return '\n';
    if (k === 'reset') return '&r';
    return m; // leave unknown tags untouched (caller should review)
  });
  out = out.replace(/<(bold|b|italic|i|em|underlined|u|strikethrough|st|obfuscated|obf)\/>/gi, (m, t) => '&' + DECOR[t.toLowerCase()]);
  return out;
}

function toMiniMessage(s) {
  warn('legacy -> MiniMessage is naive: tags are opened but not closed; review the result');
  let out = s.replace(/[&§]#([0-9a-f]{6})/gi, '<#$1>');
  out = out.replace(/[&§]([0-9a-fk-or])/gi, (m, code) => {
    const c = code.toLowerCase();
    if (NAMED_INV[c]) return `<${NAMED_INV[c]}>`;
    if (DECOR_INV[c]) return `<${DECOR_INV[c]}>`;
    return m;
  });
  return out;
}

function preview(s) {
  const lines = [];
  const gm = /<gradient:([^>]+)>([\s\S]*?)<\/gradient>/i.exec(s);
  if (gm) {
    const stops = gm[1].split(':').filter((a) => /^#?[0-9a-f]{6}$/i.test(a)).map((a) => (a[0] === '#' ? a : '#' + a));
    const chars = [...gm[2]];
    lines.push(`gradient stops: ${stops.join(' -> ')}`);
    lines.push(`text "${gm[2]}" (${chars.length} chars) sampled: ${gradientColors(stops, Math.min(chars.length, 8)).join(' ')}`);
  }
  const hexes = [...s.matchAll(/#([0-9a-f]{6})/gi)].map((m) => '#' + m[1]);
  if (hexes.length) lines.push(`hex colors: ${[...new Set(hexes)].join(' ')}`);
  const names = [...s.matchAll(/<(\/?)([a-z_]+)>/gi)].map((m) => m[2].toLowerCase()).filter((n) => NAMED[n] || DECOR[n]);
  if (names.length) lines.push(`named tags: ${[...new Set(names)].join(' ')}`);
  lines.push('(terminal cannot render colors; this is a sanity check only)');
  return lines.join('\n');
}

const mode = process.argv[2];
const input = process.argv.slice(3).join(' ');
if (!mode || !input || !['--to-legacy', '--to-mm', '--preview'].includes(mode)) {
  console.error('Usage: node format.mjs --to-legacy|--to-mm|--preview "<text>"');
  process.exit(2);
}
let result;
if (mode === '--to-legacy') result = toLegacy(input);
else if (mode === '--to-mm') result = toMiniMessage(input);
else result = preview(input);
console.log(result);
if (warnings.length) console.error('\n' + warnings.map((w) => `[format] warning: ${w}`).join('\n'));

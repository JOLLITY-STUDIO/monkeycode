// 检查 SCENE_0x0A 的 metatile 索引在 bank08 中的类型分布
const ts = require('typescript');
const fs = require('fs');

// 直接 require 编译产物？先看是否有 js。改用文本解析获取数组
function loadArray(file, name) {
  const src = fs.readFileSync(file, 'utf8');
  const m = src.match(new RegExp('export const ' + name + '(?: =|: readonly number\\[\\] =)[\\s\\S]*?\\[([\\s\\S]*?)\\]', 'm'));
  if (!m) { console.log('NOT FOUND', name); return null; }
  const nums = m[1].match(/0x[0-9a-fA-F]+|\d+/g) || [];
  return nums.map((n) => parseInt(n, 16));
}
function loadMetatileRecords(file) {
  const src = fs.readFileSync(file, 'utf8');
  const m = src.match(/export const METATILE_TABLE[\\s\\S]*?= \[([\s\S]*?)\]\s*as const;/m);
  if (!m) { console.log('METATILE_TABLE NOT FOUND'); return null; }
  const body = m[1];
  // 每条记录形如 { type: MetatileType.BG, tiles: [...] } 或 { type: 0xAA, ... }
  const recs = [];
  const re = /\{\s*type:\s*([^,]+),\s*tiles:\s*\[([\s\S]*?)\]\s*\}/g;
  let mm;
  while ((mm = re.exec(body)) !== null) {
    const ty = mm[1].trim();
    const tiles = (mm[2].match(/0x[0-9a-fA-F]+|\d+/g) || []).map((n) => parseInt(n, 16));
    recs.push({ type: ty, tiles });
  }
  return recs;
}

const scene = loadArray('src/game/prg/data/tables/bank07-scenes-metatile.ts', 'SCENE_0x0A');
const recs = loadMetatileRecords('src/game/prg/data/tables/bank08-map-metatile.ts');
console.log('SCENE_0x0A length:', scene ? scene.length : null);
console.log('METATILE_TABLE records:', recs ? recs.length : null);
if (scene && recs) {
  const idxs = scene.slice(6, 6 + scene[3] * scene[4]);
  console.log('grid w=', scene[3], 'h=', scene[4], 'count=', idxs.length);
  const typeCount = {};
  const samples = {};
  idxs.forEach((idx, i) => {
    const r = recs[idx];
    if (!r) { console.log('  MISSING idx', idx); return; }
    const ty = r.type;
    typeCount[ty] = (typeCount[ty] || 0) + 1;
    if (!samples[ty]) samples[ty] = [];
    if (samples[ty].length < 4) samples[ty].push('#' + i + '=' + idx.toString(16) + ':' + r.tiles.slice(0, 8).map((t) => t.toString(16)).join(','));
  });
  console.log('typeCount:', typeCount);
  console.log('samples:', JSON.stringify(samples, null, 1));
}

import fs from 'fs';
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa/romdata';
const rom = fs.readFileSync(p + '/Captain Tsubasa II - Super Striker (Japan).nes');
const cdl = fs.readFileSync(p + '/Captain Tsubasa II - Super Striker (Japan)-球员属性第一关大空翼以及技能.cdl');
const BANK = 16384;
function cdlToFile(cdlOff) { return cdlOff + 16; }
function cdlToCpu(cdlOff) { return (cdlOff % BANK) + 0x8000; }
function cdlToRomBank(cdlOff) { return Math.floor(cdlOff / BANK); }

// Collect all PPU-data accessed ranges (bit 4 = 0x10)
let ranges = [];
let last = -2;
for (let i = 0; i < cdl.length; i++) {
  if (cdl[i] & 0x10) {
    if (i !== last + 1) ranges.push({ start: i, count: 0 });
    ranges[ranges.length - 1].count++;
    last = i;
  }
}
console.log('PPU-data (bit4) ranges:', ranges.length);
for (const r of ranges.slice(0, 30)) {
  const fileOff = cdlToFile(r.start);
  const cpu = cdlToCpu(r.start);
  const bank = cdlToRomBank(r.start);
  const hex = Array.from(rom.subarray(fileOff, fileOff + Math.min(r.count, 16))).map(v => v.toString(16).padStart(2, '0')).join(' ');
  console.log(`  CDL 0x${r.start.toString(16)} Bank ${bank} CPU 0x${cpu.toString(16)} len=${r.count}: ${hex}`);
}

// Search for known name tiles in data-accessed regions
const kana = JSON.parse(fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/data/_chr_map_tsubasa.json', 'utf8'));
const charToTile = {};
for (const [k, v] of Object.entries(kana._mapping)) charToTile[v] = parseInt(k);
function nameToTiles(name) {
  return Array.from(name).map(c => charToTile[c]).filter(v => v !== undefined);
}
const names = ['つばさ', 'プラトン', 'ジウ', 'パビントン', 'タハマタ', 'パチスタ', 'ドトール', 'アマラウ', 'マリーニ', 'リマ', 'レナート', 'サンパウロ', 'ナンカツ', '大空翼'];
for (const name of names) {
  const seq = nameToTiles(name);
  if (!seq.length) continue;
  // Search in all data-accessed regions
  const hits = [];
  for (let i = 0; i < cdl.length - seq.length; i++) {
    if (!(cdl[i] & 0x02)) continue;
    let ok = true;
    for (let j = 0; j < seq.length; j++) {
      if ((cdl[i + j] & 0x02) && rom[cdlToFile(i + j)] === seq[j]) continue;
      ok = false; break;
    }
    if (ok) hits.push(i);
  }
  console.log(name, 'tiles', seq.map(v => v.toString(16)).join(','), hits.length ? hits.slice(0, 10).map(x => '0x' + x.toString(16)).join(', ') : 'NONE');
}

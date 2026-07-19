import fs from 'fs';
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa/romdata';
const rom = fs.readFileSync(p + '/Captain Tsubasa II - Super Striker (Japan).nes');
const cdl = fs.readFileSync(p + '/Captain Tsubasa II - Super Striker (Japan)-球员属性第一关大空翼以及技能.cdl');
const H = 16, BANK = 16384;
const kana = JSON.parse(fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/data/_chr_map_tsubasa.json', 'utf8'))._mapping;
const tileToChar = kana;

function search(seq) {
  const out = [];
  for (let i = 0; i < rom.length - seq.length; i++) {
    let ok = true;
    for (let j = 0; j < seq.length; j++) if (rom[i + j] !== seq[j]) { ok = false; break; }
    if (ok) out.push(i);
  }
  return out;
}

const names = {
  'ジウ': [133, 58],
  'パビントン': [147, 143, 101, 75, 101],
  'タハマタ': [71, 81, 86, 71],
  'パチスタ': [147, 72, 68, 71],
  'ドトール': [141, 75, 160, 96],
  'アマラウ': [56, 86, 94, 58],
  'マリーニ': [86, 95, 160, 77],
  'リマ': [95, 86],
  'レナート': [97, 76, 160, 75],
  'プラトン': [149, 94, 75, 101],
  'つばさ': [27, 117, 20],
  '大空翼': [176, 185, 186],
};

for (const [name, seq] of Object.entries(names)) {
  const hits = search(seq);
  console.log(name, hits.length ? hits.slice(0, 10).map(x => '0x' + x.toString(16) + ' Bank ' + Math.floor((x - H) / BANK)).join(', ') : 'NONE');
  if (hits.length) {
    const ctx = hits[0];
    const ctxStr = Array.from(rom.subarray(ctx - 8, ctx + 16)).map(v => tileToChar[v] || '.').join('');
    console.log('  context:', ctxStr);
  }
}

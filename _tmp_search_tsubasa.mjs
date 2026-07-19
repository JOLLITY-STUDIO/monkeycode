import fs from 'fs';
const rom = fs.readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes');
function search(seq) {
  const out = [];
  for (let i = 0; i < rom.length - seq.length; i++) {
    let ok = true;
    for (let j = 0; j < seq.length; j++) if (rom[i + j] !== seq[j]) { ok = false; break; }
    if (ok) out.push(i);
  }
  return out;
}
const kana = {
  'つばさ': [27, 117, 20],
  'プラトン': [149, 94, 75, 101],
  'ジウ': [133, 58],
  'パビントン': [147, 143, 101, 75, 101],
  'タハマタ': [71, 81, 86, 71],
  'パチスタ': [147, 72, 68, 71],
  'ドトール': [141, 75, 160, 96],
  'アマラウ': [56, 86, 94, 58],
  'マリーニ': [86, 95, 160, 77],
  'リマ': [95, 86],
  'レナート': [97, 76, 160, 75],
  '大空翼': [176, 185, 186]
};
console.log('=== name searches ===');
for (const [k, v] of Object.entries(kana)) {
  const hits = search(v);
  console.log(k, v.length, hits.length ? hits.slice(0, 10).map(x => '0x' + x.toString(16) + '/' + x).join(', ') : 'NONE');
}
const skills = {
  'ドライブシュート': [141, 94, 57, 144, 67, 154, 160, 75],
  'オーバーヘッドキック': [60, 160, 142, 160, 84, 152, 141, 62, 152, 63],
  'ヒールリフト': [82, 160, 96, 95, 83, 75],
  'ドライブパス': [141, 94, 57, 144, 147, 68]
};
console.log('=== skill searches ===');
for (const [k, v] of Object.entries(skills)) {
  const hits = search(v);
  console.log(k, v.length, hits.length ? hits.slice(0, 10).map(x => '0x' + x.toString(16) + '/' + x).join(', ') : 'NONE');
}
console.log('=== stamina values ===');
console.log('408,748,416 LE16', search([408 & 0xff, 408 >> 8, 748 & 0xff, 748 >> 8, 416 & 0xff, 416 >> 8]).map(x => '0x' + x.toString(16)).join(', ') || 'NONE');
console.log('200,160,90,40', search([200, 160, 90, 40]).map(x => '0x' + x.toString(16)).join(', ') || 'NONE');
console.log('200,160,90,40 LE16', search([200 & 0xff, 200 >> 8, 160 & 0xff, 160 >> 8, 90 & 0xff, 90 >> 8, 40 & 0xff, 40 >> 8]).map(x => '0x' + x.toString(16)).join(', ') || 'NONE');
console.log('40,90,160,200', search([40, 90, 160, 200]).map(x => '0x' + x.toString(16)).join(', ') || 'NONE');

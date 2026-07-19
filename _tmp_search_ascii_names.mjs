import fs from 'fs';
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa/romdata';
const rom = fs.readFileSync(p + '/Captain Tsubasa II - Super Striker (Japan).nes');
function search(seq) {
  const out = [];
  for (let i = 0; i < rom.length - seq.length; i++) {
    let ok = true;
    for (let j = 0; j < seq.length; j++) if (rom[i + j] !== seq[j]) { ok = false; break; }
    if (ok) out.push(i);
  }
  return out;
}
const ascii = {
  'Platon': 'Platon', 'Jiu': 'Jiu', 'Pabinton': 'Pabinton', 'Tahamata': 'Tahamata',
  'Pachista': 'Pachista', 'Dotol': 'Dotol', 'Amarau': 'Amarau', 'Marini': 'Marini',
  'Rima': 'Rima', 'Renato': 'Renato'
};
for (const [k, v] of Object.entries(ascii)) {
  const seq = Array.from(v).map(c => c.charCodeAt(0));
  const hits = search(seq);
  console.log(k, hits.length ? hits.slice(0, 5).map(x => '0x' + x.toString(16)).join(', ') : 'NONE');
}

// Also try uppercase variants
const upper = {
  'PLATON': 'PLATON', 'JIU': 'JIU', 'PABINTON': 'PABINTON', 'TAHAMATA': 'TAHAMATA',
  'PACHISTA': 'PACHISTA', 'DOTOL': 'DOTOL', 'AMARAU': 'AMARAU', 'MARINI': 'MARINI',
  'RIMA': 'RIMA', 'RENATO': 'RENATO'
};
for (const [k, v] of Object.entries(upper)) {
  const seq = Array.from(v).map(c => c.charCodeAt(0));
  const hits = search(seq);
  console.log(k, hits.length ? hits.slice(0, 5).map(x => '0x' + x.toString(16)).join(', ') : 'NONE');
}

// Try katakana with different tile encodings maybe from CHR bank 0
// Standard encoding from _chr_map_tsubasa.json
const kana = JSON.parse(fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/data/_chr_map_tsubasa.json', 'utf8'))._mapping;
const charToTile = {};
for (const [k, v] of Object.entries(kana)) charToTile[v] = parseInt(k);
const katakanaNames = {
  'プラトン': 'プラトン', 'ジウ': 'ジウ', 'パビントン': 'パビントン', 'タハマタ': 'タハマタ',
  'パチスタ': 'パチスタ', 'ドトール': 'ドトール', 'アマラウ': 'アマラウ', 'マリーニ': 'マリーニ',
  'リマ': 'リマ', 'レナート': 'レナート', 'サンパウロ': 'サンパウロ', 'ナンカツ': 'ナンカツ'
};
for (const [k, v] of Object.entries(katakanaNames)) {
  const seq = Array.from(v).map(c => charToTile[c]).filter(x => x !== undefined);
  if (!seq.length) { console.log(k, 'no tiles'); continue; }
  const hits = search(seq);
  console.log(k, seq.map(x => x.toString(16)).join(','), hits.length ? hits.slice(0, 5).map(x => '0x' + x.toString(16)).join(', ') : 'NONE');
}

// Try alternate: maybe the tiles for these are in different ranges (e.g., full-width ascii or different kana layout)
// Search for any single character プ (tile 149) and look at context
console.log('single プ at 149:', search([149]).slice(0, 10).map(x => '0x' + x.toString(16)).join(', '));
console.log('single ジ at 133:', search([133]).slice(0, 10).map(x => '0x' + x.toString(16)).join(', '));
console.log('single ラ at 94:', search([94]).slice(0, 10).map(x => '0x' + x.toString(16)).join(', '));
console.log('single ン at 101:', search([101]).slice(0, 10).map(x => '0x' + x.toString(16)).join(', '));
console.log('single ト at 75:', search([75]).slice(0, 10).map(x => '0x' + x.toString(16)).join(', '));
console.log('single パ at 147:', search([147]).slice(0, 10).map(x => '0x' + x.toString(16)).join(', '));
console.log('single ド at 141:', search([141]).slice(0, 10).map(x => '0x' + x.toString(16)).join(', '));
console.log('single マ at 86:', search([86]).slice(0, 10).map(x => '0x' + x.toString(16)).join(', '));
console.log('single レ at 97:', search([97]).slice(0, 10).map(x => '0x' + x.toString(16)).join(', '));
console.log('single ナ at 76:', search([76]).slice(0, 10).map(x => '0x' + x.toString(16)).join(', '));

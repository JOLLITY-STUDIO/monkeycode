// 验证 Brazilian 6 队真实 11 ID roster
// 假设: PRG byte = player ID 直接, stride 2, reverse mapping (PRG[base+0]=Pos11, PRG[base+2]=Pos10, ..., PRG[base+20]=Pos1)
const fs = require('fs');
const prg = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes').slice(16);

// 已知 anchors
const ANCHORS = [
  // [队名, base_PRG, Pos_N_anchor, expected ID]
  ['Corinthians', 0x3BAF8, 1,  null],  // doc 没标 Pos1
  ['Corinthians', 0x3BAF8, 9,  0x17], // Satilst
  ['Corinthians', 0x3BAF8, 10, 0x18], // Riverio
  ['Gremio',      null,   1,  0x1A], // Meon GK
  ['Gremio',      null,   9,  0x19], // Da Silva
];

function posPrg(base, pos) { return base + (10 - pos) * 2; }  // reverse stride 2

// Cor first PRG = Pos10 PRG - 9*2 = 0x3BB0A - 18 = 0x3BAF8 ✓
const corBase = 0x3BAF8;
console.log('=== Corinthians @ base PRG 0x' + corBase.toString(16).toUpperCase() + ' ===');
const corRoster = [];
for (let pos = 1; pos <= 11; pos++) {
  const prgAddr = posPrg(corBase, pos);
  const pid = prg[prgAddr];
  corRoster.push(pid);
  process.stdout.write('  Pos' + pos + ' @ PRG[0x' + prgAddr.toString(16).toUpperCase() + '] = 0x' + pid.toString(16).padStart(2,'0').toUpperCase() + ' (dec ' + pid + ')');
  if (pid === 0x17 && pos === 9) console.log('  ✓ Satilst');
  else if (pid === 0x18 && pos === 10) console.log('  ✓ Riverio');
  else console.log();
}

// Gre first PRG = Pos9 PRG - 8*2 = 0x3BB18 - 16 = 0x3BB08
const greBase = 0x3BB08;
console.log('\n=== Gremio @ base PRG 0x' + greBase.toString(16).toUpperCase() + ' ===');
const greRoster = [];
for (let pos = 1; pos <= 11; pos++) {
  const prgAddr = posPrg(greBase, pos);
  const pid = prg[prgAddr];
  greRoster.push(pid);
  process.stdout.write('  Pos' + pos + ' @ PRG[0x' + prgAddr.toString(16).toUpperCase() + '] = 0x' + pid.toString(16).padStart(2,'0').toUpperCase() + ' (dec ' + pid + ')');
  if (pid === 0x1A && pos === 1) console.log('  ✓ Meon GK');
  else if (pid === 0x19 && pos === 9) console.log('  ✓ Da Silva');
  else console.log();
}

// 验证: Brazil 队间 stride
// Cor first 0x3BAF8, Gre first 0x3BB08 -> diff = 0x10 = 16 stride (不是 22)
// 那 Pal/San/Fla first PRG = ?
const palette = ['Flu', 'Cor', 'Gre', 'Pal', 'San', 'Fla'];
const palBase = greBase + 16;   // 0x3BB18
const sanBase = palBase + 16;   // 0x3BB28
const flaBase = sanBase + 16;   // 0x3BB38
const fluBase = corBase - 16;   // 0x3BAE8

console.log('\n=== Trying Brazil 6 队 in order (Flu/Cor/Gre/Pal/San/Fla) with stride 16 ===');
const bases = [fluBase, corBase, greBase, palBase, sanBase, flaBase];
const expected = [
  // anchor verifications
  [null, null, null, null, null, null, null, null, null, null, null],  // Flu - no anchor
  [null, null, null, null, null, null, null, null, 0x17, 0x18, null],
  [0x1A, null, null, null, null, null, null, null, 0x19, null, null],
];

for (let t = 0; t < 6; t++) {
  console.log('\n' + palette[t] + ' @ base PRG 0x' + bases[t].toString(16).toUpperCase() + ' (stride 16 between teams)');
  for (let pos = 1; pos <= 11; pos++) {
    const prgAddr = posPrg(bases[t], pos);
    const pid = prg[prgAddr];
    process.stdout.write('  Pos' + pos + ' @ PRG[0x' + prgAddr.toString(16).toUpperCase() + '] = 0x' + pid.toString(16).padStart(2,'0').toUpperCase() + ' (' + pid + ')');
    let marked = '';
    if (t === 1 && pos === 9  && pid === 0x17) marked = ' ✓ Satilst';
    if (t === 1 && pos === 10 && pid === 0x18) marked = ' ✓ Riverio';
    if (t === 2 && pos === 1  && pid === 0x1A) marked = ' ✓ Meon GK';
    if (t === 2 && pos === 9  && pid === 0x19) marked = ' ✓ Da Silva';
    console.log(marked);
  }
}

// 也试试 flip: 队间 stride 12 (每队 11 ID + 1 tactic byte)
// 队 11 ID 字节连续, 第 12 字节 tactic. PRG byte layout 正向 (Pos1 idx 0..10, Pos11 idx 10)
function posPrg12(base, pos) { return base + (pos - 1); }
console.log('\n=== Alternative: stride 12 (11 ID + 1 tactic), 队间 stride 12 also ===');
const bases12 = [0x3BAB6, 0x3BAC2, 0x3BACE, 0x3BADA, 0x3BAE6, 0x3BAF2];  // 假设
for (let t = 0; t < 6; t++) {
  console.log('\n' + palette[t] + ' @ base PRG 0x' + bases12[t].toString(16).toUpperCase() + ' (forward stride 1)');
  for (let pos = 1; pos <= 11; pos++) {
    const prgAddr = posPrg12(bases12[t], pos);
    const pid = prg[prgAddr];
    process.stdout.write('  Pos' + pos + ' @ PRG[0x' + prgAddr.toString(16).toUpperCase() + '] = 0x' + pid.toString(16).padStart(2,'0').toUpperCase() + ' (' + pid + ')');
    let marked = '';
    if (t === 1 && pos === 9  && pid === 0x17) marked = ' ✓ Satilst';
    if (t === 1 && pos === 10 && pid === 0x18) marked = ' ✓ Riverio';
    if (t === 2 && pos === 1  && pid === 0x1A) marked = ' ✓ Meon GK';
    if (t === 2 && pos === 9  && pid === 0x19) marked = ' ✓ Da Silva';
    console.log(marked);
  }
}

// 解析 sav(275帧) 与 cdl 结构
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'docs', 'roms', 'aftertecmo');

// ---- sav ----
const sav = fs.readFileSync(path.join(DIR, 'tsubasa-when-show-frame-275.sav'));
console.log('=== SAV === size', sav.length);
console.log('head hex:', sav.slice(0, 48).toString('hex'));
console.log('head ascii:', JSON.stringify(sav.slice(0, 48).toString('latin1')));
// 找 'FCS' (fceux) / 'NEST' (nestopia) 等标记
const markers = ['FCS', 'NEST', 'FCT', 'pNes', 'sNes'];
for (const m of markers) {
  const idx = sav.indexOf(m);
  if (idx >= 0) console.log(`marker '${m}' at`, idx);
}
// 字节统计：如果 2925 = 256(RAM) * 11 + ... 看看分布
const counts = {};
for (const b of sav) counts[b] = (counts[b] || 0) + 1;
console.log('unique bytes:', Object.keys(counts).length, 'top:', Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10));

// ---- cdl ----
const cdl = fs.readFileSync(path.join(DIR, 'Captain Tsubasa II - Super Striker (Japan)-tsubasa1045.cdl'));
console.log('\n=== CDL === size', cdl.length);
const name = cdl.slice(0, 16).toString('latin1').replace(/\0+$/, '');
console.log('rom name:', JSON.stringify(name));
// 尝试不同结构：65536*4+16? 65536*6? 65536+16?
const rest = cdl.slice(16);
console.log('rest len', rest.length, 'rest/65536=', rest.length / 65536);
// 每地址 N 字节
for (let n = 1; n <= 8; n++) {
  if (rest.length % n === 0 && rest.length / n === 65536) console.log('per-address bytes =', n);
}
// 假设 4 bytes/addr (FCEUX new cdl)
if (rest.length === 65536 * 4) {
  let codeCount = 0, dataCount = 0;
  const bankSummary = {};
  for (let i = 0; i < 65536; i++) {
    const v = rest[i * 4];
    if (v) {
      const bank = Math.floor(i / 0x2000);
      if (!bankSummary[bank]) bankSummary[bank] = { code: 0, data: 0, other: 0 };
      if (v & 0x01) { bankSummary[bank].code++; codeCount++; }
      if (v & 0x02) { bankSummary[bank].data++; dataCount++; }
      if (v & 0x04) bankSummary[bank].other++;
    }
  }
  console.log('code bytes:', codeCount, 'data bytes:', dataCount);
  console.log('per-bank (32KB window banks 0-7):');
  for (const b in bankSummary) {
    const s = bankSummary[b];
    console.log(`  bank ${b} ($${(0x8000 + parseInt(b) * 0x2000).toString(16)}): code=${s.code} data=${s.data} other=${s.other}`);
  }
}

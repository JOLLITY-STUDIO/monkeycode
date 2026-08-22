// 解析 Mesen CDL (无头: 前 0x40000 = PRG mapping, 后 0x20000 = CHR mapping)
const fs = require('fs');
const buf = fs.readFileSync('docs/Captain Tsubasa II - Super Striker (Japan)202060822.cdl');
console.log('file size:', buf.length, '= 0x' + buf.length.toString(16));

const PRG_SZ = 0x40000, CHR_SZ = 0x20000;
if (buf.length !== PRG_SZ + CHR_SZ) { console.log('尺寸不匹配!'); process.exit(1); }
const prg = buf.slice(0, PRG_SZ);
const chr = buf.slice(PRG_SZ, PRG_SZ + CHR_SZ);

function statsOf(arr, label, bankSize, bankCount) {
  console.log(`\n===== ${label} =====`);
  let tCode = 0, tData = 0, tAny = 0;
  for (let b = 0; b < bankCount; b++) {
    let code = 0, data = 0, any = 0;
    for (let i = 0; i < bankSize; i++) {
      const v = arr[b * bankSize + i];
      if (v & 0x01) code++;
      if (v & 0x02) data++;
      if (v) any++;
    }
    tCode += code; tData += data; tAny += any;
    console.log(`  bank ${String(b).padStart(2)}: code=${String(code).padStart(5)} data=${String(data).padStart(5)} any=${String(any).padStart(5)}`);
  }
  console.log(`  合计: code=${tCode} data=${tData} any=${tAny}`);
}

statsOf(prg, 'PRG (玩到第二关执行覆盖)', 0x2000, 32);
statsOf(chr, 'CHR', 0x2000, 16);

// bank17 详细: 代码段 + 数据段(全部)
const B = 17;
const b17 = prg.slice(B * 0x2000, (B + 1) * 0x2000);
function segments(arr, mask) {
  const out = []; let s = -1;
  for (let i = 0; i <= arr.length; i++) {
    const hit = i < arr.length && (arr[i] & mask) !== 0;
    if (s >= 0 && !hit) { out.push({ start: s, len: i - s }); s = -1; }
    else if (s < 0 && hit) s = i;
  }
  return out;
}
console.log('\n===== bank17 代码段 =====');
const cseg = segments(b17, 0x01);
for (const s of cseg) console.log(`  $${s.start.toString(16).padStart(4, '0')}-$${(s.start + s.len - 1).toString(16).padStart(4, '0')} (${s.len}B)`);
console.log('代码段数:', cseg.length);
console.log('\n===== bank17 数据段 (全部 68 段) =====');
const dseg = segments(b17, 0x02);
for (const s of dseg) console.log(`  $${s.start.toString(16).padStart(4, '0')}-$${(s.start + s.len - 1).toString(16).padStart(4, '0')} (${s.len}B)`);
console.log('数据段数:', dseg.length);

// 其他银行也有意义: 显示未访问(any=0)的 bank
console.log('\n===== 未被执行/读取的 bank (any=0) =====');
for (let b = 0; b < 32; b++) {
  let any = 0;
  for (let i = 0; i < 0x2000; i++) if (prg[b * 0x2000 + i]) { any = 1; break; }
  if (!any) console.log('  bank', b);
}

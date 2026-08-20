// 修正版: 解析 bank7 比赛配置 (指针表项 = 配置数据头, 非二级指针)
// 精确模拟 bank0 $8B1C-$8C59: 字段提取 + 16位位移 + 控制字节/ram_0072
const fs = require('fs');
const rom = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const bank7 = rom.slice(16 + 7 * 0x2000, 16 + 8 * 0x2000);
const hex = (n) => '0x' + n.toString(16).toUpperCase().padStart(2, '0');
const hex4 = (n) => '$' + n.toString(16).toUpperCase().padStart(4, '0');

const ptrTable = [];
for (let i = 0; i < 128; i++) ptrTable.push(bank7[i * 2] | (bank7[i * 2 + 1] << 8));

// 精确模拟 16位位移: {5D:5C} = 0x0200|low, <<2, OR低3位(已并入low), <<2
function shift16(low, bit6) {
  let v = 0x0200 | low;            // 5D=0x02, 5C=low
  v = (v << 1) & 0xffff; v = (v << 1) & 0xffff;   // <<2
  v = (v | bit6) & 0xffff;                          // [6]&7 已并入 low, 无需再 OR
  v = (v << 1) & 0xffff; v = (v << 1) & 0xffff;     // <<2
  return v;
}

function extract(idx, EC) {
  const P = ptrTable[idx];
  const off = P & 0x1fff;
  const d = [];
  for (let i = 0; i < 16; i++) d.push(bank7[off + i]);
  const b2 = d[2];
  const m48 = b2 & 0x3f;
  // ram_005B 高2位 (LSR 5B / ROL / ROL 5B): 5B 原值 bit0 进 A bit0, b2 bit7→5B bit7, b2 bit6→5B bit6(近似, 5B初值0)
  const m5B_bits = ((b2 & 0x80) >> 1) | (b2 & 0x40);
  const m5E = d[3], m5F = d[4];
  const low = (d[5] & 0xf8) | (d[6] & 0x07);
  const v16 = shift16(low, 0);
  const m5C = v16 & 0xff, m5D = (v16 >> 8) & 0xff;
  // ram_0070 = config+6+EC, 读 [1] 控制 / [2] 阶段倒计时
  const ctl = d[6 + EC + 1];
  const m62 = ctl & 0xe0;
  const m61 = (ctl & 0x1f) >> 2;
  const m60 = (ctl & 0x03) << 6;
  const m72 = (ctl & 0x1f) !== 0 ? d[6 + EC + 2] : 0;
  return { P, d, m48, m5B_bits, m5E, m5F, m5C, m5D, ctl, m62, m61, m60, m72 };
}

console.log('=== bank7 配置 24 项 (EC=0..5 控制字节) ===');
for (let i = 0; i < 24; i++) {
  const c = extract(i, 0);
  const c1 = extract(i, 1);
  console.log(
    `idx${String(i).padStart(2)} @${hex4(c.P)} | 75=${hex(c.d[0])} 76=${hex(c.d[1])} 48=${hex(c.m48)} 5B=${hex(c.m5B_bits)} ` +
    `5E=${hex(c.m5E)} 5F=${hex(c.m5F)} 5C=${hex(c.m5C)} 5D=${hex(c.m5D)} ` +
    `| EC0: ctl=${hex(c.ctl)} 62=${hex(c.m62)} 61=${hex(c.m61)} 60=${hex(c.m60)} 72=${hex(c.m72)} ` +
    `| EC1: ctl=${hex(c1.ctl)} 72=${hex(c1.m72)}`
  );
  if (i < 6) console.log('  head: ' + c.d.slice(0, 10).map(hex).join(' '));
}

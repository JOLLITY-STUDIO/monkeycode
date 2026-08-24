/**
 * _split_bank7.cjs — 拆细 bank7（CPU $A000-$BFFF）
 * 结构（每个 CHR 配置区）：cfg(6B) + tileData(w*h B) + 指令流(直到下一条 cfg)
 * 输出：_bank7_streams.ts（仅非空指令流配置）+ console 摘要
 */
const fs = require('fs');
const rom = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const OFF = 0x10 + 7 * 0x2000;
const cpu = (a) => rom[OFF + (a - 0xa000)];

const ptrs = [];
for (let i = 0; i < 32; i++) ptrs.push(cpu(0xa000 + i * 2) | (cpu(0xa000 + i * 2 + 1) << 8));

const rows = [];
for (let i = 0; i < 32; i++) {
  const p = ptrs[i];
  const next = i + 1 < 32 ? ptrs[i + 1] : 0xa000 + 0x2000;
  const cfg = Array.from({ length: 6 }, (_, k) => cpu(p + k));
  const tileLen = cfg[3] * cfg[4];
  const streamStart = p + 6 + tileLen;
  const streamLen = Math.max(0, next - streamStart);
  const raw = Array.from({ length: streamLen }, (_, k) => cpu(streamStart + k));
  // 按命令解析截断：命令长 = 2 + ((cmd & 0x1F) ? 1 : 0)；cmd & 0x20 为最后一条
  const stream = [];
  let idx = 0;
  for (;;) {
    if (idx >= raw.length) break;
    const cmd = raw[idx + 1];
    if (cmd === undefined) break;
    const len = 2 + ((cmd & 0x1f) !== 0 ? 1 : 0);
    for (let k = 0; k < len && idx < raw.length; k++) stream.push(raw[idx++]);
    if ((cmd & 0x20) !== 0) break; // 最后一条命令
  }
  rows.push({ i, p, cfg, tileLen, stream });
}

// console 摘要
for (const r of rows) {
  const s = r.stream.slice(0, 12).map((v) => v.toString(16).padStart(2, '0')).join(' ');
  const more = r.stream.length > 12 ? '...' : '';
  console.log(
    `0x${r.i.toString(16).padStart(2, '0')} @${r.p.toString(16).toUpperCase()} tile=${r.tileLen}B stream=${r.stream.length}B: ${s}${more}`
  );
}

// 写 TS 文件（到 src/game/prg/data/scene/bank7-streams.ts）
const outFile = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/data/scene/bank7-streams.ts';
const nonEmpty = rows.filter((r) => r.stream.length > 0);
let out = '';
out += '/**\n';
out += ' * bank7-streams.ts — bank7 全部 CHR 配置区的 tile 指令流（声明式数据）\n';
out += ' * 由 scripts/_split_bank7.cjs 生成，勿手改。\n';
out += ' * 命令语义（$8BB0-$8DFC）：byte[0]=等待控制；byte[1]=cmd(bit7-6=类型, bit5=最后一条, bit4-0=行参)；\n';
out += ' * byte[2]=$0072 参数(行参≠0 时存在)；cmd bit5=1 结束命令流。\n';
out += ' */\n';
out += 'export const OPENING_TILE_STREAMS: Record<number, readonly number[]> = {\n';
for (const r of nonEmpty) {
  out += `  /* 0x${r.i.toString(16).padStart(2, '0')} @$${r.p.toString(16).toUpperCase()} cfg=${r.cfg.map((v) => '0x' + v.toString(16).padStart(2, '0')).join(',')} tile=${r.tileLen}B */ `;
  out += '[' + r.stream.map((v) => '0x' + v.toString(16).padStart(2, '0')).join(', ') + '],\n';
}
out += '};\n';
fs.writeFileSync(outFile, out);
console.log('\n写入 ' + outFile + '（非空流配置数：' + nonEmpty.length + '）');

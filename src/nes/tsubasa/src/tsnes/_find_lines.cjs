// 查找 bank_01.asm 中指定 CPU 地址的行号
// bank_01.asm 指令地址 = 运行时地址 - 0x2000 (MMC3 映射到 $A000-$BFFF)
const fs = require('fs');
const file = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_01.asm';
const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
const targets = process.argv.slice(2).map(s => parseInt(s, 16));
const map = new Map(targets.map(t => [t, []]));
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/00:([0-9A-F]{4}):/i);
  if (!m) continue;
  const addr = parseInt(m[1], 16);
  const run = addr + 0x2000; // 运行时地址
  if (map.has(run)) map.get(run).push(i + 1);
}
for (const t of targets) {
  console.log(`$${t.toString(16).toUpperCase()}: lines ${(map.get(t) || []).join(',')}`);
}

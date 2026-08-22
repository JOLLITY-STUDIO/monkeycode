/**
 * scan_cpu.cjs — 扫描 cpu.log 提取关键运行时事件
 *
 * 格式 (tsnes tracer): 每行一条完整指令
 *   i{n}  $bank:ADDR: OPCODE... MNEMONIC [operand] A:.. X:.. Y:.. S:.. P:..
 * 注意: 写 PPU/OAM/调色板的指令不在此日志 (tsnes 把它们分发到 ppu_regs/nt/palette/oam 日志),
 *       但 NMI 渲染的地址设置子程 (如 bank0 $A032) 会出现。
 */
const fs = require('fs');
const path = require('path');
const lines = fs.readFileSync(path.resolve(__dirname, 'trace/cpu.log'), 'utf8').split('\n');

const stats = { total: 0, lines: 0 };
const scene = [], bankswitch = [], vramAddrSub = [], jmps = [];
const addrPattern = /^i(\d+)\s+\$(\w+):([0-9A-F]{4}):\s/;

for (const l of lines) {
  if (!l.length) continue;
  const m = l.match(addrPattern);
  if (!m) continue;
  const i = +m[1], bank = m[2], addr = m[3];
  stats.lines++;
  if (i > stats.total) stats.total = i;
  const aM = l.match(/A:([0-9A-F]{2}) /);
  const A = aM ? parseInt(aM[1], 16) : NaN;

  if (/STA\s+#?\$ED\b/.test(l)) scene.push(`i${i} $${bank}:${addr} STA $00ED = A=#$${A.toString(16).toUpperCase()}`);
  if (/JSR\s+\$C4B9\b/.test(l)) bankswitch.push(`i${i} $${bank}:${addr} JSR $C4B9`);
  // bank0 $A032 = NMI 渲染的 $05E8 buffer 回放 (地址设置), $A038 = 数据写 (在 palette/nt 日志)
  if (bank === '00' && /STA\s+\$2006\b/.test(l)) vramAddrSub.push(`i${i} $${bank}:${addr} STA $2006 = #$${A.toString(16).toUpperCase()}`);
}

console.log(`指令行 ${stats.lines}, i 最大 ${stats.total}`);
console.log('\n=== STA $00ED 场景切换 ===');
console.log(scene.length ? scene.slice(0, 50).join('\n') : '(无)');
console.log('\n=== JSR $C4B9 (切 bank) ===');
console.log(bankswitch.length ? bankswitch.slice(0, 50).join('\n') : '(无)');
console.log(`\n=== $2006 地址设置 (bank0 NMI 渲染, 前 40) ===`);
console.log(vramAddrSub.length ? vramAddrSub.slice(0, 40).join('\n') : '(无)');
console.log(`(${vramAddrSub.length} 次)`);

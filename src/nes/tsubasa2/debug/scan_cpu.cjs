/**
 * scan_cpu.cjs — 扫描 cpu.log (v4: 按 ^i\d+ 聚合多行指令)
 * tsnes 反汇编格式: "i{n}  $bank:ADDR:" 地址行 + 0-N 个内容行(操作码/助记符/寄存器)
 * 每条指令 = 地址行 + 后续内容行拼接 (直到下一个 ^i\d+)
 */
const fs = require('fs');
const path = require('path');
const lines = fs.readFileSync(path.resolve(__dirname, 'trace/cpu.log'), 'utf8').split('\n');

// 聚合: 每条指令的完整文本
const instrs = [];
let cur = null;
for (const l of lines) {
  if (!l.length) continue;
  const iM = l.match(/^i(\d+)\s+\$(\w+):([0-9A-F]{4}):\s*$/);
  if (iM) {
    if (cur) instrs.push(cur);
    cur = { i: +iM[1], bank: iM[2], addr: iM[3], text: '' };
  } else if (cur) {
    cur.text += ' ' + l.trim();
  }
}
if (cur) instrs.push(cur);
console.log(`解析指令 ${instrs.length} 条`);

const scene = [], ntWrites = [], oamDma = [], frameMark = [], bankswitch = [], jmp = [];
let ppuAddr = 0, pendingHi = null, lastNmi = false;
let total2007 = 0;

for (const ins of instrs) {
  const i = ins.i, t = ins.text;
  const aM = t.match(/A:([0-9A-F]{2}) /);
  const A = aM ? parseInt(aM[1], 16) : NaN;

  if (/STA\s+#?\$ED\b/.test(t)) scene.push(`i${i} $${ins.addr} STA $00ED A=#$${A.toString(16).toUpperCase()}`);
  if (t.includes('STA $2006')) {
    if (pendingHi === null) pendingHi = A;
    else { ppuAddr = (pendingHi << 8) | A; pendingHi = null; }
  }
  if (t.includes('STA $2007')) {
    total2007++;
    if (A !== 0) ntWrites.push({ i, addr: ppuAddr, tile: A });
    ppuAddr = (ppuAddr + 1) & 0xffff;
  }
  if (t.includes('STA $4014')) oamDma.push({ i, src: A, at: ins.addr });
  if (t.includes('STA $2000')) {
    const nmiOn = !!(A & 0x80);
    if (nmiOn !== lastNmi) { frameMark.push({ i, on: nmiOn, v: A, at: ins.addr }); lastNmi = nmiOn; }
  }
  if (t.includes('JSR $C4B9')) bankswitch.push({ i, at: ins.addr });
}

console.log('\n=== STA $00ED 场景切换 ===');
console.log(scene.length ? scene.slice(0, 60).join('\n') : '(无)');
if (scene.length > 60) console.log(`... 共 ${scene.length} 次`);

console.log('\n=== $2007 非零 tile 写入 (前 60) ===');
ntWrites.slice(0, 60).forEach(w => console.log(`i${w.i} $${w.addr.toString(16).toUpperCase()} = #$${w.tile.toString(16).toUpperCase()}`));
console.log(`非零 tile ${ntWrites.length} 次 / $2007 总写 ${total2007} 次`);

console.log('\n=== OAM DMA (前 60) ===');
oamDma.slice(0, 60).forEach(d => console.log(`i${d.i} @$${d.at} src=#$${d.src.toString(16).toUpperCase()}`));

console.log('\n=== $2000 NMI 交替 (前 80) ===');
frameMark.slice(0, 80).forEach(f => console.log(`i${f.i} @$${f.at} NMI_${f.on ? 'ON' : 'off'} $2000=#$${f.v.toString(16).toUpperCase()}`));
console.log(`NMI 交替共 ${frameMark.length} 次 (≈ ${(frameMark.length / 2).toFixed(0)} 帧)`);

console.log('\n=== JSR $C4B9 (切 bank) 次数 ===');
console.log(`共 ${bankswitch.length} 次`);
if (bankswitch.length) console.log(bankswitch.slice(0, 30).map(b => `i${b.i} @$${b.at}`).join('\n'));

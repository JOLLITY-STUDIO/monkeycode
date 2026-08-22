/**
 * _scan_segs.cjs — 扫描所有 cpu_seg*.log, 统计 STA $00ED / JSR $C4B9 / JSR $C4C4 等
 */
const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, 'trace');
const files = fs.readdirSync(dir).filter(f => /^cpu_seg\d+\.log$/.test(f)).sort();
console.log('分段文件:', files.join(', '));

const sceneWrites = [];
const bankSwitches = [];
let total = 0;
for (const f of files) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n');
  let segScene = [];
  for (const l of lines) {
    if (!l.length) continue;
    const m = l.match(/^i(\d+)\s+\$(\w+):([0-9A-F]{4}):\s/);
    if (!m) continue;
    total++;
    const i = +m[1];
    const aM = l.match(/A:([0-9A-F]{2}) /);
    const A = aM ? parseInt(aM[1], 16) : NaN;
    if (/STA\s+#?\$ED\b/.test(l)) {
      sceneWrites.push(`${f} i${i} ${l.trim().slice(0, 90)}`);
    }
    if (/JSR\s+\$C4B9\b/.test(l)) {
      bankSwitches.push(`${f} i${i} $${m[2]}:${m[3]} JSR $C4B9`);
    }
  }
}

console.log(`总指令行 ${total}`);
console.log(`\n=== STA $00ED 写入 (前 80) ===`);
console.log(sceneWrites.length ? sceneWrites.slice(0, 80).join('\n') : '(无)');
console.log(`共 ${sceneWrites.length} 次`);
console.log(`\n=== JSR $C4B9 切 bank (前 60) ===`);
console.log(bankSwitches.length ? bankSwitches.slice(0, 60).join('\n') : '(无)');
console.log(`共 ${bankSwitches.length} 次`);

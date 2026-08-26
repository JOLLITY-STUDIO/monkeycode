const fs = require('fs');
const lines = fs.readFileSync('docs/roms/opening-all/opening-all-per-frame.log', 'utf8').split(/\r?\n/);
// 找带 STA 的行测试
let shown = 0;
for (const l of lines) {
  if (l.includes('STA $2000') || l.includes('STA $8001') || l.includes('STA $047B')) {
    const m = l.match(/^f(\d+)\s+c(\d+)\s+i(\d+)\s+A:([0-9A-F]{2})\s+X:([0-9A-F]{2})\s+Y:([0-9A-F]{2})\s+S:([0-9A-F]{2})\s+P:([A-Za-z]+)\s+\$([0-9A-F]{2}):([0-9A-F]{4}):\s+(.+)$/);
    if (!m) { console.log('NO MATCH HEAD:', l.slice(0, 120)); if (++shown > 3) break; continue; }
    const instr = m[11];
    const instrM = instr.match(/^\s*([0-9A-F ]+?)\s{2,}(.+)$/);
    console.log('HEAD OK | instr=[' + instr + ']');
    if (!instrM) { console.log('  no instrM'); continue; }
    const op = instrM[2];
    const opM = op.match(/^([A-Z]{3})\s+(.*)$/);
    console.log('  bytes=[' + instrM[1] + '] op=[' + op + '] mnem=' + (opM ? opM[1] : '?') + ' rest=[' + (opM ? opM[2] : '?') + ']');
    if (++shown > 6) break;
  }
}
// 每行模式统计
let headOk = 0, instrNo = 0, opNo = 0;
for (const l of lines) {
  const m = l.match(/^f(\d+)\s+c(\d+)\s+i(\d+)\s+A:([0-9A-F]{2})\s+X:([0-9A-F]{2})\s+Y:([0-9A-F]{2})\s+S:([0-9A-F]{2})\s+P:([A-Za-z]+)\s+\$([0-9A-F]{2}):([0-9A-F]{4}):\s+(.+)$/);
  if (m) {
    headOk++;
    const instrM = m[11].match(/^\s*([0-9A-F ]+?)\s{2,}(.+)$/);
    if (!instrM) { instrNo++; continue; }
    const opM = instrM[2].match(/^([A-Z]{3})\s+(.*)$/);
    if (!opM) opNo++;
  }
}
console.log('\nheadOk:', headOk, 'instrNo(op split fail):', instrNo, 'opNo(mnem split fail):', opNo);

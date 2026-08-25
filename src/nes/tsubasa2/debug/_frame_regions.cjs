// 分析 opening-all.log 三个关键帧区：boot(f6-f40) / 清屏(f4090-f4100) / tecmo再現(f4330-f4355)
const fs = require('fs');
const dir = 'docs/roms/opening-all';
const p = fs.readdirSync(dir).find(n => n.endsWith('.log'));
const s = fs.readFileSync(dir + '/' + p, 'utf8');
const lines = s.split(/\r?\n/).filter(l => l.trim().length > 0);
const rows = [];
for (const l of lines) {
  const m = l.match(/^f(\d+)\s+c(\d+)\s+i(\d+)\s+(A:..\s+X:..\s+Y:..\s+S:..\s+P:........)\s+\$(..):([0-9A-F]{4}):\s+(.+)$/);
  if (m) rows.push({ frame: +m[1], cycle: +m[2], regs: m[4], bank: m[5], addr: m[6], text: m[7] });
}
console.log('解析行', rows.length);
const regions = [[6, 40, 'boot f6-f40'], [4088, 4100, '清屏 f4088-f4100'], [4325, 4355, '再現 f4325-f4355']];
for (const [f0, f1, label] of regions) {
  const sel = rows.filter(r => r.frame >= f0 && r.frame <= f1);
  console.log('\n===== ' + label + ' (' + sel.length + ' 行) =====');
  // 每帧首条指令
  let cur = -1; let first = 0;
  const frameFirst = [];
  for (const r of sel) {
    if (r.frame !== cur) { cur = r.frame; first = 1; frameFirst.push(r); }
  }
  console.log('帧数', new Set(sel.map(r => r.frame)).size);
  // 统计指令地址频率 top20
  const freq = {};
  for (const r of sel) {
    const k = '$' + r.bank + ':' + r.addr + ' ' + r.text.split(';')[0].trim().slice(0, 18);
    freq[k] = (freq[k] || 0) + 1;
  }
  const top = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 25);
  console.log('top 指令:');
  for (const [k, v] of top) console.log('  ' + v + 'x ' + k);
  // 找 PPU 写 / 特殊调用
  const ppuWrites = sel.filter(r => /STA \$2006|STA \$2007|STA \$2005|STA \$3F/i.test(r.text));
  console.log('PPU 写次数', ppuWrites.length);
  const calls = sel.filter(r => r.text.includes('JSR $9FA8') || r.text.includes('JSR $8895') || r.text.includes('JSR $98E8') || r.text.includes('JSR $9B7F') || r.text.includes('JSR $9B91'));
  const callKinds = {};
  for (const r of calls) {
    const k = '$' + r.bank + ':' + r.addr + ' ' + r.text;
    callKinds[k] = (callKinds[k] || 0) + 1;
  }
  console.log('关键 JSR:');
  for (const [k, v] of Object.entries(callKinds)) console.log('  ' + v + 'x ' + k);
  // 每帧的首条指令（采样）
  console.log('每帧首指令(前12帧):');
  for (const r of frameFirst.slice(0, 12)) console.log('  f' + r.frame + ' $' + r.bank + ':' + r.addr + ' ' + r.text);
}

const fs = require('fs');
const lines = fs.readFileSync('_tmp_bzk_out/_full_disasm.asm', 'utf8').split(/\r?\n/);
// 两行式格式: "  0x000AA0 $8A90: C-----" + " 60       RTS  "
const map = new Map();
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/0x([0-9A-F]{6}) \$([0-9A-F]{4}):/);
  if (!m) continue;
  const off = parseInt(m[1], 16);
  const cpu = parseInt(m[2], 16);
  // 确认 bank00 (偏移 0x10-0x200F)
  if (off >= 0x10 && off <= 0x200F) {
    const next = (lines[i + 1] || '').trim();
    map.set(cpu, `${lines[i].trim()}  ${next}`);
  }
}
const want = [
  '88CA', '9895', '98E8', '98EA', '98DF', '98A0',
  '97AB', '97AD', '97B6', '97B8',
  '997A', '997E', '99F0',
  '9D27', '9D50', '9DB5', '9DEE', '9E0C', '9E4F', '9E7C', '9D08', '9D73', '9D8E',
  '9C3A', '9C28', '9C71', '9CC9', '9CD3', '9C3C', '9C0D', '9BE3', '9BE8',
  '9BA0', '9FA8', '9B6F', '9B74', '9B7F', '9B11', '9B28', '9B5E',
  '89A3', '9CA0', '9C2C',
];
function dump(cpu, len) {
  const out = [];
  for (let i = cpu; i < cpu + len; i++) {
    const l = map.get(i);
    if (l) out.push(l);
  }
  return out.join('\n');
}
const out = [];
for (const a of want) {
  const code = dump(parseInt(a, 16), 80);
  if (code) out.push(`; ===== $${a} =====\n${code}`);
}
fs.writeFileSync('_b00_shared_full.txt', out.join('\n\n'), 'utf8');
console.log('bytes map size:', map.size);

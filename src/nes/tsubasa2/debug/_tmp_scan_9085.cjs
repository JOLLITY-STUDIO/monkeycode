// 提取 bank00 $9085-$9142 (sub9085) 与 $890C / $88FB / $9B7F 区段
const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank00';
function grep(addrRange) {
  // addrRange: [start, end] 反汇编地址 (bank 内 $8000 基址)
  const files = fs.readdirSync(root).filter(f => f.endsWith('.s'));
  const hits = [];
  for (const f of files) {
    const lines = fs.readFileSync(path.join(root, f), 'utf8').split(/\r?\n/);
    let capturing = false;
    let out = [];
    for (const l of lines) {
      const m = l.match(/;\s*\$([0-9A-F]{4})/i);
      if (m) {
        const a = parseInt(m[1], 16);
        if (!capturing && a >= addrRange[0] && a <= addrRange[1]) { capturing = true; out = []; }
        else if (capturing && a > addrRange[1]) break;
      }
      if (capturing) out.push(l);
    }
    if (out.length) hits.push(`--- ${f} ---\n` + out.join('\n'));
  }
  return hits.join('\n');
}
console.log('########## $9085-$9142 ##########');
console.log(grep([0x9085, 0x9142]));
console.log('\n########## $88FB-$8920 ##########');
console.log(grep([0x88FB, 0x8920]));
console.log('\n########## $9B7F-$9BA0 ##########');
console.log(grep([0x9B7F, 0x9BA0]));

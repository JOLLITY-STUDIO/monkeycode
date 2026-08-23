// 扫描 asm 中所有 $001B 写入点 (STA $001B / STX $001B) + $801F-$80D1 区段
const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank00';
const files = fs.readdirSync(root).filter(f => f.endsWith('.s'));
const re = /(STA|STX|INC|DEC|LDA|AND|ORA|EOR|BIT|LSR|ASL)\s+\$001B\b/i;
const re801F = /\$801[F-F]|\$802[0-F]|\$803[0-F]|\$804[0-F]|\$805[0-F]|\$807[A-F]|\$809[0-1]/i;
for (const f of files) {
  const lines = fs.readFileSync(path.join(root, f), 'utf8').split(/\r?\n/);
  lines.forEach((l, i) => {
    if (re.test(l)) {
      console.log(`${f}:${i + 1}: ${l.trim()}`);
    }
  });
}
console.log('--- $801E-$8092 区段 ($001B 用法) ---');
for (const f of files) {
  const lines = fs.readFileSync(path.join(root, f), 'utf8').split(/\r?\n/);
  lines.forEach((l, i) => {
    if (re801F.test(l) && /\$001B/.test(l)) {
      console.log(`${f}:${i + 1}: ${l.trim()}`);
    }
  });
}

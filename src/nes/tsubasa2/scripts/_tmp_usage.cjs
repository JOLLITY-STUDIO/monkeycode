// 临时：查 AudioRom.readByte/readU16/readBgmData/readSePointer/switchBank 的调用点
const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src';
const pats = [/AudioRom\.readByte/, /AudioRom\.readU16/, /readBgmData/, /readSePointer/, /switchBank/, /readBgmPointer/];
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { if (e.name !== 'node_modules') walk(p); continue; }
    if (!e.name.endsWith('.ts')) continue;
    const lines = fs.readFileSync(p, 'utf8').split('\n');
    lines.forEach((l, i) => {
      if (pats.some((re) => re.test(l)) && !/static (readByte|readU16|readBgmData|readSePointer|switchBank|readBgmPointer)/.test(l)) {
        console.log(path.basename(p) + ':' + (i + 1) + ': ' + l.trim());
      }
    });
  }
}
walk(root);

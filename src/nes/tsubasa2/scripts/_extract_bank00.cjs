// 从 bank00 提取 $8920/$8AF7/$9FA8/$9B28/$9B5E/$9B07/$8464 等子程序
const fs = require('fs');
const path = require('path');
const dirs = {
  main: 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/bank00/code_main.s',
  sub: 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/bank00/code_sub.s',
  scene: 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/bank00/code_scene.s',
  render: 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/bank00/code_render.s',
};
const targets = [0x8920, 0x8af7, 0x9fa8, 0x9f89, 0x9f96, 0x9f7e, 0x9b28, 0x9b5e, 0x9b07, 0x9a71, 0x9a35, 0x98a0, 0x98e8, 0x98ea, 0x9b7f, 0x9b91, 0x88fb, 0x890c, 0x8895, 0x8297, 0x9085, 0x9ba0, 0x9b11, 0x99f0, 0x9a0d, 0x9a43, 0x9ab8, 0x9ada, 0x9a1f, 0x9a2e];
for (const [tag, file] of Object.entries(dirs)) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  // 建立 addr → 行内容 映射
  const map = new Map();
  lines.forEach((l, i) => {
    const m = l.match(/;\s*\$([0-9A-F]{4})\s*$/);
    if (m) map.set(parseInt(m[1], 16), i);
  });
  for (const t of targets) {
    if (map.has(t)) {
      const i = map.get(t);
      console.log(`==== ${tag} $${t.toString(16).toUpperCase()} (line ${i + 1}) ====`);
      // 打印该地址开始的 20 行
      for (let k = i; k < Math.min(i + 20, lines.length); k++) {
        const lm = lines[k].match(/;\s*\$([0-9A-F]{4})\s*$/);
        if (lm && parseInt(lm[1], 16) > t + 40) break;
        console.log(lines[k].trim());
      }
    }
  }
}

// 临时: 定位 $9B28/$9B5E/$8879/$84C5/$8545 等地址
const fs = require('fs');
const files = ['code_main.s', 'code_sub.s', 'code_render.s', 'code_scene.s', 'code_util.s'];
const targets = ['9B28', '9B5E', '8879', '84C5', '8545', '8546', '9F7E', '9085', '8A14', '8AE6', '89FF', '88B1'];
for (const f of files) {
  const p = `d:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank00/${f}`;
  if (!fs.existsSync(p)) continue;
  const lines = fs.readFileSync(p, 'utf8').split('\n');
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/;\s*\$([0-9A-F]{4})/);
    if (m && targets.includes(m[1])) {
      console.log(`${f}:${i + 1}  $${m[1]}  ${lines[i].trim()}`);
    }
  }
}

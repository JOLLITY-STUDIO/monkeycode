// 验证 emu-full 与当前模拟器是否完全一致（前 300 帧 state.json 对比）
const fs = require('fs');
const path = require('path');

// 找 src/core 的编译 js 产物
function findJs(dir, out) {
  for (const f of fs.readdirSync(dir)) {
    const fp = path.join(dir, f);
    const s = fs.statSync(fp);
    if (s.isDirectory()) findJs(fp, out);
    else if (/\.js$/.test(f)) out.push(fp);
  }
  return out;
}
const coreJs = findJs('src/core', []);
console.log('src/core .js files:', coreJs.length);
if (coreJs.length === 0) {
  console.log('NO compiled js for src/core — need bundle via esbuild');
  process.exit(2);
}
console.log(coreJs.slice(0, 10).join('\n'));

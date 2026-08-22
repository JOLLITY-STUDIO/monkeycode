// 帧推进黑屏诊断: 检查 slot1/slot5 协程、$001E、$05E8 buffer、NT0
const fs = require('fs');
const path = require('path');
// 用 ts-node 风格不行, 直接 require 编译产物? 项目可能没有编译产物。用 tsx? 检查 package.json
const pkg = JSON.parse(fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/package.json', 'utf8'));
console.log('deps:', Object.keys(pkg.dependencies || {}), Object.keys(pkg.devDependencies || {}));
console.log('scripts:', JSON.stringify(pkg.scripts));

const fs = require('fs');
const s = fs.readFileSync('src/game/index.ts', 'utf8');
// 找 bootRouter/router 相关属性声明
const re = /this\.(\w*[Rr]outer\w*)\s*=|readonly (\w*[Rr]outer\w*)\s*:|(\w*[Rr]outer\w*)\s*:\s*\w+\s*=/g;
let m;
while ((m = re.exec(s))) console.log('MATCH:', m.slice(1).filter(Boolean).join(' | '));
// 找 frame() 方法引用 router 的地方
const i = s.indexOf('bootRouter');
console.log('--- bootRouter ctx ---');
console.log(s.slice(Math.max(0, i - 100), i + 100).replace(/\n/g, '\n'));

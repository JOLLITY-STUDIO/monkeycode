// 提取 nes-ram.ts 中 OamManager / ShadowOam 类的方法签名
const fs = require('fs');
const path = require('path');
const f = path.join(__dirname, 'src', 'core', 'nes-ram.ts');
const src = fs.readFileSync(f, 'utf8');
const lines = src.split('\n');

let inOam = false;
let brace = 0;
let start = -1;
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (/export (class|const|function|interface|type) OamManager/.test(l)) {
    inOam = true;
    start = i;
    brace = (l.match(/{/g) || []).length - (l.match(/}/g) || []).length;
    continue;
  }
  if (inOam) {
    brace += (l.match(/{/g) || []).length - (l.match(/}/g) || []).length;
    if (brace <= 0) {
      // 输出整个类的定义
      console.log(`=== OamManager 定义 (${start + 1}-${i + 1}) ===`);
      for (let j = start; j <= i; j++) console.log(`${j + 1}: ${lines[j]}`);
      inOam = false;
      break;
    }
  }
}
// ShadowOam 的方法列表
console.log('\n=== ShadowOam 方法 ===');
const re = /^\s{2}(public |private |protected )?([a-zA-Z_$][\w$]*)\s*\([^)]*\)[^)]*\{?/;
lines.forEach((l, i) => {
  if (/^\s{2}(public|private|protected) [a-zA-Z_$]/.test(l) && /\)\s*(:\s*[^{]+)?\{?$/.test(l)) {
    console.log(`${i + 1}: ${l.trim()}`);
  }
});

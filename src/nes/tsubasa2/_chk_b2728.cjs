const fs = require('fs');
const b27 = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/src/game/data/prg/bank27-data.ts', 'utf8');
const b28 = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/src/game/data/prg/bank28-tables.ts', 'utf8');
// 导出符号
const exp27 = [...b27.matchAll(/export\s+(?:const|function|type|interface)\s+(\w+)/g)].map(m => m[1]);
const exp28 = [...b28.matchAll(/export\s+(?:const|function|type|interface)\s+(\w+)/g)].map(m => m[1]);
console.log('=== bank27-data.ts exports (' + exp27.length + ') ===');
console.log(exp27.join(', '));
console.log('=== bank28-tables.ts exports (' + exp28.length + ') ===');
console.log(exp28.join(', '));
// service import 需求
const s27 = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/src/game/service/bank27.service.ts', 'utf8');
const s28 = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/src/game/service/bank28_match.service.ts', 'utf8');
const need27 = [...s27.matchAll(/^\s{2}(\w+),?$/gm)].map(m => m[1]).filter(n => n !== 'DataStore');
const need28 = [...s28.matchAll(/^\s{2}(\w+),?$/gm)].map(m => m[1]).filter(n => n !== 'DataStore');
console.log('=== bank27.service needs missing ===');
console.log(need27.filter(n => !exp27.includes(n)));
console.log('=== bank28.service needs missing ===');
console.log(need28.filter(n => !exp28.includes(n)));

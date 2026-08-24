const fs = require('fs');
const d = fs.readFileSync('src/game/prg/data/tables/player-stats.ts', 'utf8');

// 提取所有 { id, name, ... } 条目
const entries = [...d.matchAll(/\{\s*id:\s*0x([0-9A-Fa-f]{2}),[^}]*?name:\s*['"]([^'"]+)['"][^}]*?\}/g)].map(m => ({ id: parseInt(m[1], 16), name: m[2] }));
console.log('total entries:', entries.length);
const real = entries.filter(e => !/^CpuMember_/.test(e.name));
const placeholder = entries.filter(e => /^CpuMember_/.test(e.name));
console.log('real names:', real.length);
console.log('CpuMember placeholders:', placeholder.length);
console.log('real names:');
real.forEach(e => console.log('  0x' + e.id.toString(16).padStart(2, '0').toUpperCase() + ' = ' + e.name));
console.log('placeholder IDs (first 20):');
placeholder.slice(0, 20).forEach(e => console.log('  0x' + e.id.toString(16).padStart(2, '0').toUpperCase()));

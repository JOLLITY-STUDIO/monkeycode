const fs = require('fs');
const path = require('path');
const BASE = 'd:/studio/github/monkeycode/src/nds/picpic/roms/extracted/';

let out = '';

// 1) map_d 文件列表（排序后前20）
const mapFiles = fs.readdirSync(BASE + 'map_d').filter(f => f.endsWith('.map')).sort();
out += '=== map_d 前20文件（排序后） ===\n';
mapFiles.slice(0, 20).forEach((f, i) => {
  out += `  ${String(i+1).padStart(3)}: ${f}\n`;
});

// 2) 搜索 map_d 中的 rooster
const roosterMap = mapFiles.filter(f => f.toLowerCase().includes('rooster'));
out += `\n=== map_d 中 rooster 文件: ${roosterMap.length === 0 ? '无' : roosterMap.join(', ')} ===\n`;

// 3) lap_d 各等级文件数量
const lapDirs = ['1_dat','2_dat','3_dat','4_dat','5_dat','tutorial'];
out += '\n=== lap_d 各目录文件数量 ===\n';
for (const d of lapDirs) {
  const dir = BASE + 'lap_d/' + d;
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.lap')).sort();
  out += `  ${d}: ${files.length} files  (e.g. ${files.slice(0,3).join(', ')}${files.length>3?'...':''})\n`;
}

// 4) fap_d 前20文件（含大小）
const fapFiles = fs.readdirSync(BASE + 'fap_d').filter(f => f.endsWith('.fap')).sort();
out += '\n=== fap_d 前20文件（含大小） ===\n';
for (const f of fapFiles.slice(0, 20)) {
  const s = fs.statSync(BASE + 'fap_d/' + f).size;
  out += `  ${f.padEnd(30)} size=${s}\n`;
}

// 5) 搜索 fap_d 中的 rooster
const roosterFap = fapFiles.filter(f => f.toLowerCase().includes('rooster'));
out += `\n=== fap_d 中 rooster 文件: ${roosterFap.length === 0 ? '无' : roosterFap.join(', ')} ===\n`;

// 6) map_comp 文件
const compFiles = fs.readdirSync(BASE + 'map_comp').sort();
out += `\n=== map_comp 文件数量: ${compFiles.length} ===\n`;
out += `  前10: ${compFiles.slice(0,10).join(', ')}\n`;

fs.writeFileSync(BASE + '../../tools/_level_mapping.txt', out);
console.log('written', out.length);

const fs = require('fs');
const path = require('path');

const f = path.join(__dirname, 'game-engine/native-game/tsubasa/banks/prg/bank-22-sprite-engine-data.ts');
const c = fs.readFileSync(f, 'utf8');

// 把文件所有 hex 值提取为数组
const hexes = [];
const re = /0x([0-9A-Fa-f]{2})/g;
let m;
while ((m = re.exec(c)) !== null) hexes.push(parseInt(m[1], 16));

// OAM 里的 tile (按顺序): Pal=0 轮廓层
const oamTiles = [0x50, 0x52, 0x53, 0x58, 0x5A, 0x56, 0x57, 0x5C, 0x5D, 0x5E, 0x5F, 0x55, 0x59, 0x5B, 0x54, 0x51];

// 在 hexes 中找连续匹配 OAM tiles 的位置（至少 8 个匹配）
for (let i = 1; i < hexes.length - 1; i++) {
  // tile 在偶数位置吗？（xAttr, tile 成对）
  // 检查从 i 开始的 tiles 匹配若干 OAM tiles
  let match = true;
  let count = 0;
  for (let j = 0; j < oamTiles.length && (i + j * 2) < hexes.length; j++) {
    const tileIdx = i + j * 2; // tile 在每对的偶数位置
    if (hexes[tileIdx] !== oamTiles[j]) {
      match = false;
      break;
    }
    count++;
  }
  if (count >= 6) {
    console.log(`FOUND ${count} sequential OAM tiles at hexes[${i}]:`);
    let out = '';
    for (let j = 0; j < count; j++) {
      const xAttr = hexes[i + j * 2 - 1];
      const tile = hexes[i + j * 2];
      out += `0x${xAttr.toString(16).padStart(2, '0').toUpperCase()}, 0x${tile.toString(16).padStart(2, '0').toUpperCase()}, `;
    }
    console.log('  ' + out);
    break;
  }
}

// 反过来，找文件中所有 Pal=$0 的 tile ($50-$5F) 密集区域
console.log('\n=== Pal=$0 tiles in data (tile in odd position after valid xAttr) ===');
let cluster = [];
let lastIdx = -5;
for (let i = 1; i < hexes.length; i++) {
  const prev = hexes[i - 1];
  const curr = hexes[i];
  if (curr >= 0x50 && curr <= 0x5F && (prev & 0xC0) !== 0 && (prev & 0x03) === 0) {
    // Pal=$0 tile found (xAttr bits 1-0 = 0)
    if (i - lastIdx > 4) {
      if (cluster.length >= 3) {
        console.log('CLUSTER hexes[' + (lastIdx - cluster.length*2 + 1) + ']: ' + cluster.join(''));
        console.log('');
      }
      cluster = [];
    }
    cluster.push(`0x${prev.toString(16).padStart(2,'0').toUpperCase()},0x${curr.toString(16).padStart(2,'0').toUpperCase()} `);
    lastIdx = i;
  }
}
if (cluster.length >= 3) {
  console.log('CLUSTER final: ' + cluster.join(''));
}

// 搜索字符串: 直接用逗号分隔的 hex pair
console.log('\n=== 在文件中搜索这些关键 tiles 的连续序列 ===');
// 从 OAM #5-15 的 Pal=0 tiles: 50, 52, 53, 58, 5A, 56, 57
const searchStr = oamTiles.map(t => `0x${t.toString(16).toUpperCase()}`).join(', ');
console.log('搜索: ' + searchStr);
console.log('在 bank-22-sprite-engine-data.ts 中 Ctrl+F 搜这个能找到对应数据。');

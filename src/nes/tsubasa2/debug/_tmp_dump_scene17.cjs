// dump scene 0x17 descriptor + bank9 segment 0x0D 数据
const path = require('path');
const ts = require(path.resolve(__dirname, '../_tmp_out/game/index.js'));
// 尝试直接 import 数据表
try {
  const bank07 = require(path.resolve(__dirname, '../_tmp_out/game/prg/data/scene/bank07-scenes.js'));
  console.log('bank07 keys:', Object.keys(bank07).slice(0, 40).join(', '));
} catch (e) { console.log('bank07 err:', e.message); }
try {
  const bank09 = require(path.resolve(__dirname, '../_tmp_out/game/prg/data/scene/bank09-scenes.js'));
  console.log('bank09 keys:', Object.keys(bank09).slice(0, 40).join(', '));
} catch (e) { console.log('bank09 err:', e.message); }

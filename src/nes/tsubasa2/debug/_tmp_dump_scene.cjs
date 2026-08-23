// 诊断: sub9085 场景段 buffer 内容 + BANK9/10 数据流首字节分布
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2';
const BANK9 = require(path.join(root, 'src/game/prg/data/scene/bank09-data.ts'));
const BANK10 = require(path.join(root, 'src/game/prg/data/scene/bank10-data.ts'));
console.log('BANK9 keys:', Object.keys(BANK9).filter(k => k.includes('SCENE_PTR') || k.includes('RAW')));
console.log('BANK10 keys:', Object.keys(BANK10).filter(k => k.includes('SCENE_PTR') || k.includes('RAW')));

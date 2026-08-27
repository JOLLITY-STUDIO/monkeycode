// 临时：emu frame-0010 palette vs GT f10 palette
const fs = require('fs');
const pal = JSON.parse(fs.readFileSync('output/emu-full/frame-0010/palette.json', 'utf8'));
console.log('emu palette keys:', Object.keys(pal));
console.log('emu bg:', JSON.stringify(pal.bg));
console.log('emu spr:', JSON.stringify(pal.spr || pal.sp));

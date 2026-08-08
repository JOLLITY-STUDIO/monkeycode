const fs = require('fs');
let s = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/src/cpu.ts', 'utf8');
// Import paths are already correct for mini-audio structure ("./utils")
fs.writeFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/mini-audio/cpu.ts', s);
console.log('CPU copied:', s.split(/\r?\n/).length, 'lines');

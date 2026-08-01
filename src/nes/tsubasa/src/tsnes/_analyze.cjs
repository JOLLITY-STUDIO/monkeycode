const fs = require('fs');
const f = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/game-engine/test/ai-player/output/run3.txt';

if (!fs.existsSync(f)) {
  console.log('File not found');
  process.exit(1);
}

const d = fs.readFileSync(f, 'utf8');
const lines = d.split('\n');
console.log('LINES:', lines.length);

const patterns = [
  '场景变化', '检查点', 'match init', 'active', 'ball=', 
  '总帧', '通关', 'END', '错误', 'onBank1C', 'A+B pressed'
];

const key = lines.filter(l => patterns.some(p => l.includes(p)));
console.log('\n=== KEY EVENTS ===');
key.slice(0, 40).forEach(l => console.log(l.trim()));

console.log('\n=== LAST 15 ===');
lines.slice(-15).forEach(l => console.log(l.trim()));

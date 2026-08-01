const fs = require('fs');
const f = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/game-engine/test/ai-player/output/run3.txt';

function read() {
  if (!fs.existsSync(f)) { console.log('No file yet'); return; }
  const d = fs.readFileSync(f, 'utf8');
  const lines = d.split('\n');
  console.log('LINES:', lines.length);

  // Show key events
  console.log('\n=== KEY EVENTS ===');
  const key = lines.filter(l => 
    l.includes('场景变化') || l.includes('A+B') || 
    l.includes('子状态') || l.includes('mode=') || 
    l.includes('总帧') || l.includes('错误') || 
    l.includes('通关') || l.includes('active')
  );
  key.slice(0, 40).forEach(l => console.log(l.trim().substring(0, 200)));

  // Show progress snapshots
  console.log('\n=== PROGRESS ===');
  const prog = lines.filter(l => l.includes('进度') && l.includes('mode='));
  prog.forEach(l => console.log(l.trim().substring(0, 200)));

  console.log('\n=== LAST 10 ===');
  lines.slice(-10).forEach(l => console.log(l.trim()));
}

setTimeout(read, 70000);
read(); // also try immediately

const { execSync } = require('child_process');
const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');

const cwd = resolve(__dirname);
console.log('[AI Runner] Starting...');

try {
  const out = execSync('npx tsx game-engine/test/ai-player/run-ai-player.ts', {
    cwd,
    timeout: 120000,
    maxBuffer: 50 * 1024 * 1024,
    encoding: 'utf8',
    stdio: 'pipe',
  });
  console.log('[AI Runner] SUCCESS');
} catch(e) {
  console.log('[AI Runner] Exited (expected at max frames)');
}

// Read last 80 lines of output
try {
  const filePath = resolve(cwd, 'game-engine/test/ai-player/output/ai-run-output.txt');
  const d = readFileSync(filePath, 'utf8');
  const lines = d.split('\n');
  
  console.log('\n=== KEY EVENTS ===');
  const events = lines.filter(l => 
    l.includes('No handler') || l.includes('场景变化') || l.includes('startGame') ||
    l.includes('A+B') || l.includes('总帧') || l.includes('检查点') || l.includes('通关')
  );
  // Show scene changes and key events
  events.slice(0, 50).forEach(l => console.log(l.trim()));
  
  console.log('\n=== PROGRESS SNAPSHOT ===');
  const progress = lines.filter(l => l.includes('进度') && l.includes('mode='));
  progress.forEach(l => console.log(l.trim().replace(/\[进度\] /g,`  [进展]`)));
  
  console.log('\n=== LAST 30 LINES ===');
  lines.slice(-30).forEach(l => console.log(l.trim()));
} catch(e) {
  console.log('Cannot read output:', e.message);
}

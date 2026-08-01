const { execSync } = require('child_process');
const path = require('path');
const cwd = path.resolve(__dirname);

console.log('[test] Running AI Player...');

try {
  const out = execSync('npx tsx game-engine/test/ai-player/run-ai-player.ts', {
    cwd,
    timeout: 120000,
    maxBuffer: 50 * 1024 * 1024,
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'pipe'],
  });
  // Filter to show key events only
  const lines = out.split('\n');
  const key = lines.filter(l => 
    l.includes('No handler') || l.includes('ERROR') || l.includes('停滞') ||
    l.includes('场景变化') || l.includes('错误') || l.includes('A+B') ||
    l.includes('start') || l.includes('startGame') || l.includes('总帧') ||
    l.includes('SUCCESS') || l.includes('FAIL') || l.includes('检查点') ||
    l.includes('通关')
  ).slice(-30);
  console.log('=== KEY EVENTS ===');
  key.forEach(l => console.log(l));
} catch (e) {
  console.log('[test] Error:', e.message);
  if (e.stdout) {
    const lines = e.stdout.split('\n');
    const key = lines.filter(l => 
      l.includes('No handler') || l.includes('ERROR') || l.includes('停滞') ||
      l.includes('场景变化') || l.includes('错误') || l.includes('A+B')
    ).slice(-20);
    console.log('=== KEY EVENTS (from error) ===');
    key.forEach(l => console.log(l));
  }
}

const { execSync } = require('child_process');

// Maybe there's a worktree configuration or relative submodule stuff
console.log('=== git status ===');
const stat = execSync('git status', { encoding: 'utf8' });
console.log(stat);

console.log('=== git ls-files at src/nes/tsubasa2 (max 5) ===');
try {
  const out = execSync('git ls-files src/nes/tsubasa2 | head -5', { encoding: 'utf8' });
  console.log(out || '(empty)');
} catch (e) { console.log('err:', e.message); }

console.log('=== git worktree list ===');
try {
  const out = execSync('git worktree list', { encoding: 'utf8' });
  console.log(out);
} catch (e) { console.log('err:', e.message); }

console.log('=== cat .git/config (top 30) ===');
try {
  const out = execSync('type ..\\..\\..\\.git\\config 2>&1 || cat ../../../.git/config 2>/dev/null || cat ../../.git/config', { encoding: 'utf8', shell: 'cmd.exe' });
  console.log(out);
} catch (e) { console.log('err:', e.message); }

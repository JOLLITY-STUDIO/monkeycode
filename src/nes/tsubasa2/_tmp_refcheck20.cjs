const { execSync } = require('child_process');
const pats = ['entry_8452', 'entry_858F', 'entry_876B', 'entry_86F2', 'fn_881D', 'entry_8459'];
for (const p of pats) {
  try {
    const r = execSync('git grep -n ' + p + ' -- src pages test', { encoding: 'utf8', cwd: 'd:/studio/github/monkeycode/src/nes/tsubasa2' });
    console.log('[' + p + ']\n' + r);
  } catch (e) {
    console.log('[' + p + '] no external refs');
  }
}

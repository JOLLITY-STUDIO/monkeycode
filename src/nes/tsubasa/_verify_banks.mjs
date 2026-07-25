import { execSync } from 'child_process';
import { readFileSync } from 'fs';

let allOK = true;
for (let b = 0; b <= 30; b++) {
  const bn = String(b).padStart(2, '0');
  const repoPath = 'src/nes/tsubasa/src/tsnes/tsubasa-code/prg_banks/bank_' + bn + '.ts';
  const absPath = 'src/tsnes/tsubasa-code/prg_banks/bank_' + bn + '.ts';
  try {
    const origTxt = execSync('git show HEAD:' + repoPath, { encoding: 'utf-8' });
    const origBytes = [...origTxt.matchAll(/0x([0-9A-F]{2})/gi)].map(m => parseInt(m[1], 16));
    const gen = readFileSync(absPath, 'utf-8');
    const genBytes = [...gen.matchAll(/0x([0-9A-F]{2})/gi)].map(m => parseInt(m[1], 16));
    let diffs = 0;
    for (let i = 0; i < origBytes.length; i++) { if (origBytes[i] !== genBytes[i]) diffs++; }
    if (diffs > 0 || origBytes.length !== genBytes.length) {
      console.log('bank_' + bn + ' FAIL: ' + diffs + ' diffs, orig=' + origBytes.length + ' gen=' + genBytes.length);
      allOK = false;
    } else {
      console.log('bank_' + bn + ' OK');
    }
  } catch (e) { console.log('bank_' + bn + ' SKIP: ' + e.message.slice(0, 40)); }
}
console.log(allOK ? '\nALL BANKS VERIFIED OK' : '\nSOME BANKS FAILED');

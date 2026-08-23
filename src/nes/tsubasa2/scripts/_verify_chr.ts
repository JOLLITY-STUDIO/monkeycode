/**
 * 验证修复后 CHR 请求表和 chrBanks 与 tsnes 一致
 */
import NES from '../../tsnes/src/nes';
import * as fs from 'fs';

const romPath = 'd:\\studio\\github\\monkeycode\\src\\nes\\tsubasa2\\src\\asm\\dist\\tsubasa2.nes';
const outPath = 'd:\\studio\\github\\monkeycode\\src\\nes\\tsubasa2\\debug\\verify_chr.txt';
const romData = fs.readFileSync(romPath);

const nes = new NES({
  onFrame: () => {},
  onAudioSample: () => {},
  onStatusUpdate: () => {},
  emulateSound: false,
});

nes.loadROM(romData);
const cpu: any = nes.cpu;
const mem = cpu.mem;

const lines: string[] = [];
function log(msg: string) { lines.push(msg); console.log(msg); }

log('=== CHR 验证（tsnes 300 帧）===');
log('frame | ram_0490-0497 (req)                        | ram_0022 | chrBanks');
log('------+--------------------------------------------+----------+--------');

for (let f = 1; f <= 300; f++) {
  nes.frame();
  
  if (f <= 5 || f === 9 || f === 10 || f % 50 === 0) {
    const req = Array.from({length: 8}, (_, i) => mem[0x0490 + i]);
    const r22 = mem[0x0022];
    const mmap: any = nes.mmap;
    const chr = mmap.chrBanks ? JSON.stringify(mmap.chrBanks) : 'N/A';
    log(
      f.toString().padStart(5) + ' | ' +
      '[' + req.map(r => '0x' + r.toString(16).toUpperCase().padStart(2, '0')).join(', ') + '] | ' +
      '$' + r22.toString(16).toUpperCase().padStart(2, '0') + '     | ' +
      chr
    );
  }
}

log('\n=== 最终状态 (frame 300) ===');
const req = Array.from({length: 8}, (_, i) => mem[0x0490 + i]);
const mmap: any = nes.mmap;
log('ram_0490-0497: [' + req.map(r => '0x' + r.toString(16).toUpperCase().padStart(2, '0')).join(', ') + ']');
log('chrBanks: ' + JSON.stringify(mmap.chrBanks));

// 差分验证
log('\n=== 差分验证 ===');
const expectedChr = [0, 1, 2, 3, 252, 113, 82, 83];
const actualChr = Array.from({length: 8}, (_, i) => mmap.chrBanks[i]);
let pass = 0, fail = 0;
for (let i = 0; i < 8; i++) {
  if (expectedChr[i] === actualChr[i]) { pass++; log('  slot' + i + ': PASS (expected=' + expectedChr[i] + ', actual=' + actualChr[i] + ')'); }
  else { fail++; log('  slot' + i + ': FAIL (expected=' + expectedChr[i] + ', actual=' + actualChr[i] + ')'); }
}
log('差分结果: PASS=' + pass + ', FAIL=' + fail);

fs.writeFileSync(outPath, lines.join('\n'));
console.log('\nOutput: ' + outPath);

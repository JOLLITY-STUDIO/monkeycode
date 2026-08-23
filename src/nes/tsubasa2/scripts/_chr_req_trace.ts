/**
 * 逐帧追踪 ram_0490-0497 的写入时机
 */
import NES from '../../tsnes/src/nes';
import * as fs from 'fs';

const romPath = 'd:\\studio\\github\\monkeycode\\src\\nes\\tsubasa2\\src\\asm\\dist\\tsubasa2.nes';
const outPath = 'd:\\studio\\github\\monkeycode\\src\\nes\\tsubasa2\\debug\\chr_req_trace.txt';
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

log('=== CHR request table trace (ram_0490-0497) ===');
log('frame | req0 req1 req2 req3 req4 req5 req6 req7 | ram_0022 | chrBanks');

let prevReq = [0,0,0,0,0,0,0,0];

for (let f = 1; f <= 300; f++) {
  nes.frame();
  
  const req = [
    mem[0x0490], mem[0x0491], mem[0x0492], mem[0x0493],
    mem[0x0494], mem[0x0495], mem[0x0496], mem[0x0497],
  ];
  const r22 = mem[0x0022];
  
  // 检测变化
  let changed = false;
  for (let i = 0; i < 8; i++) {
    if (req[i] !== prevReq[i]) { changed = true; break; }
  }
  
  if (changed || f <= 5 || f % 50 === 0) {
    const mmap: any = nes.mmap;
    const chrBanks = mmap.chrBanks;
    const chrStr = chrBanks ? JSON.stringify(chrBanks) : 'N/A';
    log(
      f.toString().padStart(5) + ' | ' +
      req.map(r => r.toString().padStart(3)).join(' ') + ' | ' +
      '$' + r22.toString(16).toUpperCase().padStart(2, '0') + ' | ' +
      chrStr
    );
    prevReq = [...req];
  }
}

log('\n=== Final state ===');
log('ram_0490-0497: ' + Array.from({length:8}, (_,i) => mem[0x0490+i]).join(', '));
log('ram_0022: $' + mem[0x0022].toString(16).toUpperCase());
const mmap: any = nes.mmap;
if (mmap.chrBanks) log('chrBanks: ' + JSON.stringify(mmap.chrBanks));

fs.writeFileSync(outPath, lines.join('\n'));
console.log('\nOutput: ' + outPath);

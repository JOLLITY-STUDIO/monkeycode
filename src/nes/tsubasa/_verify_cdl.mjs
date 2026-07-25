// 最干脆：CDL 文件逐个 8KB MMC3 bank 拆分统计
// ROM PRG = 256KB = 32 x 8KB MMC3 banks

import { readFileSync } from 'fs';

const cdl = readFileSync('src/legacy/romdata/Captain Tsubasa II - Super Striker (Japan)-openning-tecmo显示到黑屏未出现人物289帧.cdl');
console.log('CDL file size:', cdl.length, 'bytes');

// CDL PRG slots (x16384) → MMC3 8KB banks
// slot N → bank 2N (first 8KB) + bank 2N+1 (second 8KB)
console.log('\n=== MMC3 bank file → tecmo289 访问量 ===');
const mmc3Total = Math.min(32, Math.floor(cdl.length / 8192));

for (let b = 0; b < mmc3Total; b++) {
  const off = b * 8192;
  let code = 0, data = 0;
  let codeRanges = [], dataRanges = [];
  for (let i = 0; i < 8192; i++) {
    const v = cdl[off + i];
    const addr = 0x8000 + i;
    if (v & 1) {
      code++;
      if (codeRanges.length === 0 || addr > codeRanges[codeRanges.length-1].end + 1)
        codeRanges.push({start:addr, end:addr});
      else codeRanges[codeRanges.length-1].end = addr;
    }
    if (v & 2) {
      data++;
      if (dataRanges.length === 0 || addr > dataRanges[dataRanges.length-1].end + 1)
        dataRanges.push({start:addr, end:addr});
      else dataRanges[dataRanges.length-1].end = addr;
    }
  }
  
  const type = b < 16 ? 'PRG' : 'CHR';
  const bnum = b < 16 ? b : b - 16;
  const name = type === 'PRG' ? `prg_bank_${String(bnum).padStart(2, '0')}` : `chr_bank_${String(bnum).padStart(2, '0')}`;
  
  if (code + data > 0) {
    console.log(`${name}: code=${code} data=${data}`);
    for (const r of dataRanges) {
      const sz = r.end - r.start + 1;
      console.log(`  DATA $${r.start.toString(16).toUpperCase()}-$${r.end.toString(16).toUpperCase()} (${sz}B)`);
    }
  }
}

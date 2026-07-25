// dump tecmo289 CDL hit regions as asm hex
// cross-ref with _tmp_bzk_out_openning disasm

import { readFileSync, writeFileSync } from 'fs';

const CDL = readFileSync('src/legacy/romdata/Captain Tsubasa II - Super Striker (Japan)-openning-tecmo显示到黑屏未出现人物289帧.cdl');
const ROM = readFileSync('rom.nes');
const PRG_BASE = 16; // iNES header

function hex8(v) { return v.toString(16).toUpperCase().padStart(2, '0'); }
function hex16(v) { return v.toString(16).toUpperCase().padStart(4, '0'); }

// Collect CDL-hit data ranges per bank
const banks = [];
for (let b = 0; b < 32; b++) {
  const off = b * 8192;
  let code = 0, data = 0;
  const dataRanges = [];
  for (let i = 0; i < 8192; i++) {
    const v = CDL[off + i];
    if (v & 1) code++;
    if (v & 2) {
      data++;
      const addr = 0x8000 + i;
      if (dataRanges.length === 0 || addr > dataRanges[dataRanges.length - 1].end + 1)
        dataRanges.push({ start: addr, end: addr });
      else
        dataRanges[dataRanges.length - 1].end = addr;
    }
  }
  banks.push({ index: b, code, data, dataRanges });
}

// ── PART 1: ROM byte dump ──
let out = '; ================================================================\n';
out += '; tecmo289 CDL DATA REGION DUMP\n';
out += '; MMC3 bank → ROM addr → data bytes (hex)\n';
out += '; ================================================================\n';

for (const bank of banks) {
  if (bank.data === 0) continue;
  const type = bank.index < 16 ? 'PRG' : 'CHR';
  const bnum = bank.index < 16 ? bank.index : bank.index - 16;
  const name = `${type === 'PRG' ? 'prg' : 'chr'}_bank_${String(bnum).padStart(2, '0')}`;

  out += `\n; === ${name} (MMC3 bank ${bank.index}) code=${bank.code} data=${bank.data} ===\n`;
  
  const romBase = (bank.index < 16 ? PRG_BASE : PRG_BASE + 256 * 1024) + (bank.index < 16 ? bank.index : bank.index - 16) * 8192;

  for (const r of bank.dataRanges) {
    const sz = r.end - r.start + 1;
    const off = r.start - 0x8000;
    out += `; $${hex16(r.start)}-$${hex16(r.end)} (${sz}B)  rom $${hex16(romBase + off)}\n`;

    // dump .byte lines, 16 per line
    for (let i = 0; i < sz; i += 16) {
      const addr = r.start + i;
      let line = `  $${hex16(addr)}:  .byte `;
      for (let j = 0; j < 16 && i + j < sz; j++) {
        const byt = ROM[romBase + off + i + j];
        line += `$${hex8(byt)}`;
        if (j < 15 && i + j < sz - 1) line += ', ';
      }
      out += line + '\n';
    }
  }
}

// ── PART 2: Cross-ref with BZK disasm ──
out += `\n\n; ================================================================\n`;
out += `; CROSS-REF with _tmp_bzk_out_openning bank_XX.asm\n`;
out += `; Show existing BZK disasm lines for each CDL data range\n`;
out += `; ================================================================\n`;

for (const bank of banks) {
  if (bank.data === 0 || bank.index >= 16) continue;
  const asmFile = `_tmp_bzk_out_openning/bank_${String(bank.index).padStart(2, '0')}.asm`;
  
  try {
    const asm = readFileSync(asmFile, 'utf8');
    out += `\n; === bank_${String(bank.index).padStart(2, '0')}.asm (BZK) ===\n`;
    
    for (const r of bank.dataRanges) {
      const sz = r.end - r.start + 1;
      out += `; CDL data $${hex16(r.start)}-$${hex16(r.end)} (${sz}B) ──────\n`;
      
      let found = false;
      for (let addr = r.start; addr <= r.end; addr++) {
        const pat = `$${hex16(addr)}:`;
        const idx = asm.indexOf(pat);
        if (idx >= 0) {
          found = true;
          const eol = asm.indexOf('\n', idx);
          const line = asm.substring(idx, eol === -1 ? idx + 80 : eol).trimEnd();
          out += `  ${line}\n`;
          // skip gap
        }
      }
      if (!found) out += `  ; (no BZK match)\n`;
    }
  } catch {
    out += `\n; ${asmFile}: NOT FOUND\n`;
  }
}

writeFileSync('_dump_tecmo_data.asm', out);
console.log(`Written ${out.length} bytes to _dump_tecmo_data.asm`);

// Summary to console
console.log('\n=== SUMMARY ===');
for (const bank of banks) {
  if (bank.data > 0 || bank.code > 0) {
    const name = (bank.index < 16 ? `prg_bank_${String(bank.index).padStart(2,'0')}` : `chr_bank_${String(bank.index-16).padStart(2,'0')}`);
    console.log(`${name}: code=${bank.code} data=${bank.data} ranges=${bank.dataRanges.length}`);
  }
}

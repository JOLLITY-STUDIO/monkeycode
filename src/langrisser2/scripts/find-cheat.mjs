import { readFileSync } from 'fs';

// Try different encodings of the cheat code sequence
// B=0x10, Start=0x80, Right=0x08, Left=0x04, Up=0x01, Down=0x02, A=0x40
const mainSeq = [0x10, 0x80, 0x08, 0x04, 0x01, 0x02, 0x10, 0x40, 0x10, 0x40, 0x01, 0x02, 0x04, 0x08, 0x80];
const altSeq  = [0x10, 0x80, 0x08, 0x04, 0x02, 0x01, 0x10, 0x40, 0x10, 0x40, 0x02, 0x01, 0x04, 0x08, 0x80];

function searchROM(romPath, sequences) {
  const d = readFileSync(romPath);
  console.log('ROM size: 0x' + d.length.toString(16));
  
  for (const [name, seq] of Object.entries(sequences)) {
    let found = [];
    for (let i = 0; i < d.length - seq.length; i++) {
      if (seq.every((b, j) => d[i + j] === b)) {
        found.push('0x' + i.toString(16));
      }
    }
    console.log(`  ${name}: ${found.length ? found.join(', ') : 'NOT FOUND'}`);
  }
}

// Also search the ASM file text for button cmp patterns
function searchASM(asmPath) {
  const d = readFileSync(asmPath, 'utf8');
  const lines = d.split('\n');
  
  // Search for sequences of cmpi.b with button-like values
  let buttonCmps = [];
  const btnVals = ['$01', '$02', '$04', '$08', '$10', '$40', '$80'];
  
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (l.includes('cmpi') || l.includes('cmp.')) {
      for (const v of btnVals) {
        if (l.includes('#' + v) && !l.includes('#$100') && !l.includes('#$400') && !l.includes('#$800')) {
          buttonCmps.push({line: i+1, text: l.trimStart()});
          break;
        }
      }
    }
  }
  
  // Look for clusters (button comparison within 20 lines)
  console.log(`\nTotal button cmp instructions: ${buttonCmps.length}`);
  
  // Find tight clusters
  let clusterStart = 0;
  for (let i = 1; i <= buttonCmps.length; i++) {
    if (i === buttonCmps.length || buttonCmps[i].line - buttonCmps[i-1].line > 5) {
      const cluster = buttonCmps.slice(clusterStart, i);
      if (cluster.length >= 3) {
        console.log(`\n--- Cluster ${cluster.length} cmps, lines ${cluster[0].line}-${cluster[cluster.length-1].line} ---`);
        // Show surrounding context
        const ctxStart = Math.max(0, cluster[0].line - 5);
        const ctxEnd = Math.min(lines.length - 1, cluster[cluster.length-1].line + 5);
        for (let j = ctxStart; j <= ctxEnd; j++) {
          console.log(`${(j+1).toString().padStart(6)}: ${lines[j].substring(0, 130)}`);
        }
      }
      clusterStart = i;
    }
  }
}

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const base = join(__dirname, '..', '20260713');

// Search ROM binary
console.log('=== Searching ROM binary ===');
searchROM(`${base}/Langrisser II (Japan).md`, {
  'main_seq': mainSeq,
  'alt_seq': altSeq
});

// Search in RAM areas (the cheat might be triggered by RAM state)
console.log('\n=== Searching ASM text for button comparisons ===');
searchASM(`${base}/asm/m68k/rom.asm`);

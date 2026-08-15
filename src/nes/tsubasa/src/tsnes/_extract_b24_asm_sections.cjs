// Extract asm lines for CPU address ranges from bank_24.asm
const fs = require('fs');
const lines = fs.readFileSync('_tmp_bzk_out/bank_24.asm', 'utf8').split(/\r?\n/);

// Parse CPU addr from line like: "- - - - - - 0x030010 0C:8000: 4C .byte $4C"
function cpuAddr(line) {
  const m = line.match(/0C:([0-9A-F]{4}):/i);
  return m ? parseInt(m[1], 16) : null;
}

function extract(start, end, label) {
  console.log(`\n===== ${label} ($${start.toString(16)}-$${end.toString(16)}) =====`);
  let inRange = false;
  for (const line of lines) {
    const a = cpuAddr(line);
    if (a === null) continue;
    if (a >= start && a <= end) {
      inRange = true;
      console.log(line);
    } else if (inRange && a > end) break;
  }
}

// Sprite loading core
extract(0x8851, 0x8D9D, 'SPRITE LOAD CORE $8851-$8D9D');

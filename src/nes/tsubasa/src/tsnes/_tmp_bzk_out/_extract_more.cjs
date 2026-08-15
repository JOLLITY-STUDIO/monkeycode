const fs = require('fs');
const path = require('path');
const asm = fs.readFileSync(path.join(__dirname, '_full_disasm.asm'), 'utf8');
const lines = asm.split(/\r?\n/);

function extractRange(startAddr, endAddr, label) {
  const out = [];
  let started = false;
  for (const line of lines) {
    const m = line.match(/\b([0-9A-F]{4})\b:/i);
    if (!m) continue;
    const addr = parseInt(m[1], 16);
    if (addr === startAddr) started = true;
    if (started) {
      out.push(line);
      if (addr >= endAddr) break;
    }
  }
  console.log(`\n===== ${label} $${startAddr.toString(16)}-$${endAddr.toString(16)} =====`);
  console.log(out.join('\n'));
}

extractRange(0x9EED, 0x9F30, 'mainLoop_9EED');
extractRange(0x8AF7, 0x8C00, 'sceneLoad_8AF7');
extractRange(0x8297, 0x82B0, 'paletteInit_8297');
extractRange(0xC6BE, 0xC800, 'bank30_C6BE_sceneCtrl');

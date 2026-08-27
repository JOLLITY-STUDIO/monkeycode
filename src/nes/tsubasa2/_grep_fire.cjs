const fs = require('fs');
const p = 'src/core/ppu/index.ts';
const lines = fs.readFileSync(p, 'utf8').split('\n');
for (let i = 0; i < lines.length; i++) {
  if (/_fireVblankSet|startVBlank|endFrame|renderFramePartially|frameEnded|vblankPending/.test(lines[i])) {
    console.log((i + 1) + ': ' + lines[i]);
  }
}

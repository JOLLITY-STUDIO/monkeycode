const fs = require('fs');
const lines = fs.readFileSync('20260713/asm/m68k/rom.asm', 'utf8').split('\n');
const targets = [
  '00800A', '0082B4', '00866C', '0086B4', '008A6C',
  '009020', '009172', '00942A', '0099B2', '00C80C',
  '00C92C', '00C93A', '00C944', '00C9AA', '00CA00',
  '0100A0', '01DDC8', '00FFF8', '0B0000', '01C834', '01C854'
];
targets.forEach(t => {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('org') && lines[i].includes(t)) {
      console.log('L' + (i + 1) + ': ' + lines[i].trim());
      break;
    }
  }
});

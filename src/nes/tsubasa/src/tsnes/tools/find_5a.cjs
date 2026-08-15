const d = require('../src/disasm/banks/backup/_romdata').ROM_DATA;
for (let b = 0; b < 48; b++) {
  if (!d[b]) continue;
  const arr = d[b];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === 0x85 && arr[i + 1] === 0x5A) {
      const addr = 0x8000 + i;
      const romOffs = b * 0x2000 + 0x10 + i;
      const ctx = arr.slice(Math.max(0, i - 6), i + 3).map(x => x.toString(16).padStart(2, '0')).join(' ');
      console.log(`Bank ${b}  CPU $${addr.toString(16).toUpperCase()}  ROM $${romOffs.toString(16).toUpperCase()}  STA $5A  [${ctx}]`);
    }
    if (arr[i] === 0x86 && arr[i + 1] === 0x5A) {
      const addr = 0x8000 + i;
      console.log(`Bank ${b}  CPU $${addr.toString(16).toUpperCase()}  STX $5A`);
    }
    if (arr[i] === 0x84 && arr[i + 1] === 0x5A) {
      const addr = 0x8000 + i;
      console.log(`Bank ${b}  CPU $${addr.toString(16).toUpperCase()}  STY $5A`);
    }
    // Also search for LDA $5A (A5 5A) - where $5A is read
    if (arr[i] === 0xA5 && arr[i + 1] === 0x5A) {
      const addr = 0x8000 + i;
      const romOffs = b * 0x2000 + 0x10 + i;
      const ctx = arr.slice(Math.max(0, i - 3), i + 3).map(x => x.toString(16).padStart(2, '0')).join(' ');
      console.log(`Bank ${b}  CPU $${addr.toString(16).toUpperCase()}  ROM $${romOffs.toString(16).toUpperCase()}  LDA $5A  [${ctx}]`);
    }
  }
}

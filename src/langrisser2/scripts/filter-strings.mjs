import fs from 'fs';
const out = fs.readFileSync('src/langrisser2/20260713/output/rom-strings.txt', 'utf8');
const lines = out.split('\n');

// Show interesting long ASCII strings (>= 6 chars)
let ascii = 0;
console.log('=== Long ASCII strings (>= 6 chars) ===');
for (const l of lines) {
  if (l.includes('(len=') && l.includes('ROM $') && l.includes('ASCII')) {
    const m = l.match(/len=(\d+)/);
    if (m && parseInt(m[1]) >= 6) {
      console.log(l.substring(0, 180));
      ascii++;
      if (ascii > 40) {
        console.log(`... (${ascii} total long ASCII strings, truncated)`);
        break;
      }
    }
  }
}

// Show all SJIS strings  
console.log('\n=== Shift-JIS strings ===');
let sjis = 0;
for (const l of lines) {
  if (l.includes('SJIS')) {
    console.log(l.substring(0, 180));
    sjis++;
    if (sjis > 30) {
      console.log(`... (${sjis} total SJIS, truncated)`);
      break;
    }
  }
}

// Show null-terminated strings
console.log('\n=== Null-terminated strings ===');
let nt = 0;
for (const l of lines) {
  if (l.includes('NULL-terminated') || l.includes('ROM $') && !l.includes('len=')) {
    console.log(l.substring(0, 180));
    nt++;
    if (nt > 30) {
      console.log(`... truncated`);
      break;
    }
  }
}

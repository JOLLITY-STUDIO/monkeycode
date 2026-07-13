import fs from 'fs';

const lines = fs.readFileSync('src/langrisser2/docs/execution-trace.md', 'utf8').split('\n');
console.log('Total lines:', lines.length);

// Search for VDP writes, DMA, and resource loading
const matches = [];
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (l.match(/C00000|C00004|0x0099[bB]2|0x00[cC]914|resource|VRAM|0x800[0-9a-fA-F]/)) {
    matches.push(`${(i+1).toString().padStart(4)}: ${l.substring(0, 160)}`);
  }
}
console.log('Matched lines:', matches.length);
if (matches.length <= 60) {
  matches.forEach(m => console.log(m));
} else {
  matches.slice(0, 30).forEach(m => console.log(m));
  console.log('...');
  matches.slice(-30).forEach(m => console.log(m));
}

// Also search for important functions around 0x90-area and resource table
console.log('\n--- FUN_000099b2 (resource loader) references ---');
const b2Refs = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('99b2') || lines[i].includes('99B2')) {
    b2Refs.push(`${(i+1).toString().padStart(4)}: ${lines[i].substring(0, 160)}`);
  }
}
b2Refs.slice(0, 20).forEach(m => console.log(m));

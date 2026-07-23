const fs=require('fs');
const c=fs.readFileSync('tools/6502-to-js-test/_prg_output/_merged_all.c','utf8');

// Find B0_8000 → B0_8166 flow
const labels = [];
for(const m of c.matchAll(/^(B0_8[01]\w+):\s*(.+)/gm)) {
  labels.push({label: m[1], code: m[2].trim()});
}

console.log('--- B0_8000 area ---');
for(let i=0;i<30;i++) {
  if(labels[i]) console.log(`${labels[i].label}: ${labels[i].code}`);
}

// Check B0_8166 specifically
const idx8166 = c.indexOf('B0_8166:');
if(idx8166>0) {
  console.log('\n--- Code at B0_8166 ---');
  const chunk = c.substring(idx8166, idx8166+500);
  console.log(chunk);
} else {
  console.log('\nB0_8166 NOT FOUND');
  // Search for 8166
  const nearby = c.match(/B0_81[5-7][0-9a-f]:/g);
  console.log('Nearby labels:', nearby);
}

// Check RESET handler
const idxFFF0 = c.indexOf('B31_fff0:');
if(idxFFF0>0) {
  console.log('\n--- RESET handler at B31_fff0 ---');
  const chunk = c.substring(idxFFF0, idxFFF0+800);
  console.log(chunk);
} else {
  console.log('\nB31_fff0 NOT FOUND');
  // search case-insensitive
  const fffMatch = c.match(/B31_fff[0-9a-f]:/gi);
  console.log('B31_fff* labels:', fffMatch);
}

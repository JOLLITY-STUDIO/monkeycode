const fs=require('fs');
const c=fs.readFileSync('tools/6502-to-js-test/_prg_output/_merged_all.c','utf8');

// RESET vector
let fffc=[], fffd=[];
for(const m of c.matchAll(/SetMem\(0x([0-9a-f]+),\s*0x([0-9a-f]+)\)/gi)) {
  const addr=parseInt(m[1],16);
  if(addr===0xFFFC) fffc.push(parseInt(m[2],16));
  if(addr===0xFFFD) fffd.push(parseInt(m[2],16));
}
console.log('RESET FFFC:', fffc.map(v=>'$'+v.toString(16)));
console.log('RESET FFFD:', fffd.map(v=>'$'+v.toString(16)));

// Code start
const lines=c.split('\n');
console.log('\n--- Code around line 930 ---');
for(let i=928;i<945;i++) console.log(`${i}: ${lines[i]?.trim()}`);

// RET table
const retIdx=c.indexOf('RET_BEGIN');
console.log('\n--- RET_BEGIN ---');
console.log(c.substring(retIdx, retIdx+600));

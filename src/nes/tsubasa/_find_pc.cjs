const fs=require('fs');
const c=fs.readFileSync('pages/tsubasaFromCore/core_engine.js','utf8');

// Find typed array declarations
const arrMatch = c.match(/var\s+([svtuwxyz])\s*=\s*new\s+(Int8Array|Uint8Array|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array)\s*\(\s*(\w+)\s*\)/g);
console.log('Typed array declarations:');
if (arrMatch) arrMatch.forEach(m => console.log('  ' + m));

// Find the layout of regs at the beginning of function T
const tStart = c.indexOf('function T(){');
const tEnd = c.indexOf('\nfunction ', tStart + 100);
const tBody = c.substring(tStart, tEnd);

// Find the return statement which writes back all regs
const retMatch = tBody.match(/v\[\d+\]=(\w+)/g);
console.log('\nReg writebacks in T:');
if (retMatch) retMatch.forEach(m => console.log('  ' + m));

// Show initial loads
const initLoads = tBody.match(/(\w)=v\[\d+\]|(\w)=w\[\d+\]/g);
console.log('\nInitial loads:');
if (initLoads) initLoads.forEach(m => console.log('  ' + m));

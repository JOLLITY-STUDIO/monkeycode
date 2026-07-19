const fs = require('fs');
const c = fs.readFileSync('src/nes/tsubasa/romdata/tsubasa2.nes.c', 'utf8');
const lines = c.split('\n');

// Search for data blocks that look like roster arrays  
let matches = [];
for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (/\bbyte\b/.test(l) && /0x[0-9a-fA-F]{2}(,\s*0x[0-9a-fA-F]{2}){10,}/.test(l)) {
        matches.push((i + 1) + ': ' + l.trim().slice(0, 200));
    }
}
console.log('Found ' + matches.length + ' potential byte data lines');
matches.slice(0, 40).forEach(m => console.log(m));

// Also search for ASCII strings 
console.log('\n=== ASCII strings ===');
let strings = [];
for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const m = l.match(/"([^"]{3,})"/g);
    if (m) {
        m.forEach(s => strings.push((i + 1) + ': ' + s));
    }
}
strings.slice(0, 50).forEach(s => console.log(s));

// Search for UNDEFINED functions that might handle name/team data
console.log('\n=== UNDEFINED functions with potential team/player data ===');
let funcs = [];
for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('void UNDEFINED(')) {
        funcs.push((i + 1) + ': ' + lines[i].trim());
    }
}
funcs.forEach(f => console.log(f));

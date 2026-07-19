const fs = require('fs');
const c = fs.readFileSync('src/nes/tsubasa/romdata/tsubasa2.nes.c', 'utf8');
const lines = c.split('\n');

// Search for any reference to addresses 0x0468-0x046B
let matches = [];
for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (l.match(/(0x)?468[^0-9a-fA-F]/) || l.match(/0x468/) || 
        l.match(/(0x)?469[^0-9a-fA-F]/) || l.match(/(0x)?46[aAbB]/)) {
        matches.push({ line: i + 1, text: l.trim().slice(0, 200) });
    }
}
console.log('Total matches:', matches.length);
matches.slice(0, 30).forEach(m => console.log(m.line + ': ' + m.text));

// Also search for FUN_ or UNDEFINED functions to see function list
console.log('\n=== Function entries near 0x468 references ===');
let funcCount = 0;
for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (l.match(/^void\s+(FUN_|UNDEFINED_)/)) {
        funcCount++;
    }
}
console.log('Total functions:', funcCount);

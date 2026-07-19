const fs = require('fs');
const c = fs.readFileSync('src/nes/tsubasa/romdata/tsubasa2.nes.c', 'utf8');
const lines = c.split('\n');

// Search for functions that reference DAT_0468, DAT_0469, etc.
let inFunc = false;
let funcName = '';
let funcLines = [];
let results = [];

for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const m = l.match(/^void\s+(FUN_[0-9a-fA-F_]+|UNDEFINED_[0-9a-fA-F_]+)\s*\(/);
    if (m) {
        if (funcLines.length > 0 && inFunc) {
            results.push({ name: funcName, lines: [...funcLines] });
        }
        funcName = m[1];
        funcLines = [l];
        inFunc = false;
    } else if (funcName) {
        funcLines.push(l);
        if (l.includes('DAT_0468') || l.includes('DAT_0469') || l.includes('&PTR_LAB_0468')) {
            inFunc = true;
        }
    }
}
if (funcLines.length > 0 && inFunc) {
    results.push({ name: funcName, lines: [...funcLines] });
}

console.log('Functions referencing $0468 area:');
results.forEach(r => {
    console.log('\n=== ' + r.name + ' ===');
    // Filter relevant lines
    const relevant = r.lines.filter(l => 
        l.includes('DAT_046') || l.includes('0x46') || l.includes('DAT_04') || 
        l.includes('468') || l.includes('469') || l.includes('46A') || l.includes('46B')
    );
    relevant.forEach(l => console.log('  ' + l.trim()));
    if (relevant.length === 0) {
        // Show first few lines
        r.lines.slice(1, 20).forEach(l => console.log('  ' + l.trim()));
    }
});

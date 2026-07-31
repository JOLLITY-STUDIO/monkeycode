const fs = require('fs');
const content = fs.readFileSync('game-engine/native-game/tsubasa/banks/prg/bank-26-code.ts', 'utf-8');
const lines = content.split('\n');

// Find exports
console.log('=== exports ===');
lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('export ')) {
        console.log(`L${i+1}: ${trimmed}`);
    }
});

// Find functions
console.log('\n=== function declarations ===');
lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (trimmed.includes('/**') && i + 1 < lines.length && lines[i+1].trim().includes('$')) {
        // multi-line comment approach
    }
    if (trimmed.match(/^export (const|function) \w+/)) {
        console.log(`L${i+1}: ${trimmed}`);
    } else if (trimmed.match(/^function \w+/)) {
        console.log(`L${i+1}: ${trimmed}`);
    }
});

// Find section headers
console.log('\n=== SECTION headers ===');
lines.forEach((line, i) => {
    if (line.includes('SECTION') && line.includes('═')) {
        console.log(`L${i+1}: ${line.trim()}`);
    }
});

// Find JSDoc comments for key functions
console.log('\n=== Key JSDoc ===');
for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('/**') && i + 1 < lines.length) {
        const next = lines[i + 1].trim();
        if (next.startsWith('* $') || next.startsWith('*  $')) {
            console.log(`L${i+1}-${i+2}: ${lines[i].trim()} | ${next.trim()}`);
        }
    }
}

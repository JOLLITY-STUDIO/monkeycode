const fs = require('fs');
const s = fs.readFileSync('src/asm/bank19/code_main.s', 'utf8');
console.log('length', s.length);
console.log('first 500 chars with escapes:');
console.log(JSON.stringify(s.slice(0, 500)));
console.log('--- line count by LF:', s.split('\n').length);
console.log('--- line count by CRLF:', s.split('\r\n').length);

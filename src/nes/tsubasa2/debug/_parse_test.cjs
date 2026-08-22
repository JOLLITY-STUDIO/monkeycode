// debug test parse
const fs = require('fs');
const path = require('path');
const raw = fs.readFileSync(path.resolve(__dirname, 'trace/cpu.log'), 'utf8');
const lines = raw.split('\n');
console.log('lines:', lines.length, 'raw len:', raw.length);
console.log('L0:', JSON.stringify(lines[0]));
console.log('L1:', JSON.stringify(lines[1]));
console.log('L2:', JSON.stringify(lines[2]));
const re = /^i(\d+)\s+\$(\w+):([0-9A-F]{4}):\s*$/;
console.log('re.test L0:', re.test(lines[0]));
console.log('L0 charcodes:', [...lines[0]].slice(0, 20).map(c => c.charCodeAt(0)));

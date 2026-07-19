const fs = require('fs');
const out = [];
out.push('hello from node');
fs.writeFileSync('_out.txt', out.join('\n'));
console.log('done');

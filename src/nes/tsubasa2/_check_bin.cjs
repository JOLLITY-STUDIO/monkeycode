const fs = require('fs');
const d = fs.readdirSync('node_modules/.bin');
console.log(d.join('\n'));

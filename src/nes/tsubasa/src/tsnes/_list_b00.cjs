const fs = require('fs');
const text = fs.readFileSync('_tmp_bzk_out/_b00_routines.txt', 'utf8');
const secs = text.split(/^===== \$/m).slice(1);
const list = secs.map(s => s.match(/^([0-9A-F]{4}) =====/)[1]);
console.log(list.join(' '));

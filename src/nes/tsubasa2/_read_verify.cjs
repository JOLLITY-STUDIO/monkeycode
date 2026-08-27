const fs = require('fs');
const lines = fs.readFileSync('_verify_curtain_out.txt', 'utf8').split('\n');
for (const l of lines) {
  if (/h5=(372[0-9]|373[0-5]) /.test(l)) console.log(l);
}

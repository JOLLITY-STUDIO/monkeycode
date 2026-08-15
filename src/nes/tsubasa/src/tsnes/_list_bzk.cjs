const fs = require('fs');
const dir = '_tmp_bzk_out';
for (const f of fs.readdirSync(dir)) {
  console.log(f);
}

const fs = require('fs');
for (let b = 19; b <= 20; b++) {
  const dir = 'asm/bank' + b.toString().padStart(2, '0');
  try {
    const files = fs.readdirSync(dir);
    let total = 0;
    const sizes = {};
    for (const f of files) {
      const s = fs.statSync(dir + '/' + f).size;
      sizes[f] = s;
      total += s;
    }
    console.log('bank' + b + ': ' + total + 'B, ' + JSON.stringify(sizes));
  } catch(e) {
    console.log('bank' + b + ': ' + e.message);
  }
}

const fs = require('fs');
const l = fs.readFileSync('src/asm/bank00/code_main.s', 'utf8').split(/\r?\n/);
const targets = ['$8165', '$818A', '$81AD', '$81B4', '$81DA', '$801F', '$8027', '$A265', '$A28A', '$A2AD', '$A2B4', '$A2DA'];
l.forEach((x, i) => {
  if (targets.some(t => x.includes(t))) console.log(`${i + 1}: ${x}`);
});

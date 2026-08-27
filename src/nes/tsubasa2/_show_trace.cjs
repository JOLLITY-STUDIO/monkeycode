const fs = require('fs');
const lines = fs.readFileSync('_trace_curtain2.log', 'utf8').split('\n');
const frames = process.argv.slice(2).map(Number);
for (const f of frames) {
  console.log(`\n========== FRAME ${f} ==========`);
  for (const line of lines) {
    if (line.includes(`f=${f} `)) {
      console.log(line);
    }
  }
}

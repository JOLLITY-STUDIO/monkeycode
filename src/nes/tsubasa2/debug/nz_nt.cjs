const fs = require('fs');
const lines = fs.readFileSync('debug/trace/nt.log', 'utf8').split('\n');
for (const l of lines) {
  if (l.includes('NT_WRITE') && !l.includes('tile=#$00') && !l.includes('tile=#$55')) {
    console.log(l.substring(0, 130));
  }
}

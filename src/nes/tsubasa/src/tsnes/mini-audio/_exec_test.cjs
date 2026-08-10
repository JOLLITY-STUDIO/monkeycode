// Direct file-write test - no imports
const fs = require('fs');
const path = require('path');
const outPath = path.join(__dirname, '_exec_test.txt');
try {
  fs.writeFileSync(outPath, 'execute_command works!\n' + new Date().toISOString());
  console.log('SUCCESS: wrote to', outPath);
} catch(e) {
  console.error('FAILED:', e.message);
}

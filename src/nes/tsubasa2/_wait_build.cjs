const fs = require('fs');
const start = Date.now();
for (;;) {
  try {
    const st = fs.statSync('_tsc_cjs_dist.log');
    if (st.mtimeMs > Date.now() - 2000 && Date.now() - start > 3000) {
      const l = JSON.parse(fs.readFileSync('_tsc_cjs_dist.log', 'utf8'));
      console.log('DONE status=' + l.status + ' err=' + (l.error || ''));
      console.log((l.stderr || '').slice(0, 2000));
      process.exit(0);
    }
  } catch (e) { /* log not ready */ }
  if (Date.now() - start > 240000) {
    console.log('TIMEOUT waiting build');
    process.exit(1);
  }
  // busy wait
}

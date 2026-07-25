import * as fs from 'fs';

try {
  const { tsDispatch } = await import('./src/tsnes/tsubasa-code/prg_banks/bank_00');
  fs.writeFileSync('test_output/_ts_dispatch_out.txt', 'IMPORT OK: tsDispatch is ' + typeof tsDispatch);
} catch(e: any) {
  fs.writeFileSync('test_output/_ts_dispatch_out.txt', 'ERROR: ' + (e?.message || e?.stack || String(e)));
}

import * as fs from 'fs';

try {
  require('./src/tsnes/tsubasa-code/prg_banks/bank_00');
  fs.writeFileSync('test_output/_ts_dispatch_out.txt', 'IMPORT OK');
} catch(e: any) {
  fs.writeFileSync('test_output/_ts_dispatch_out.txt', 'ERROR: ' + String(e));
}

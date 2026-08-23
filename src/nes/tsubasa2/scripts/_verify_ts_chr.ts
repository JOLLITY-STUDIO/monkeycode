/**
 * 跑 TS H5 版本 300 帧，验证 CHR 请求表
 */
import { Tsubasa2 } from '../src/game/index';
import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';
import * as fs from 'fs';

const outPath = 'd:\\studio\\github\\monkeycode\\src\\nes\\tsubasa2\\debug\\verify_ts_chr.txt';

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot();

const store = game.store;

const lines: string[] = [];
function log(msg: string) { lines.push(msg); console.log(msg); }

log('=== TS H5 版本 300 帧 CHR 验证 ===');
log('frame | ram_0490-0497 (req)                        | ram_0022 | ram_00ED | ram_001B | ram_0048');
log('------+--------------------------------------------+----------+----------+----------+----------');

for (let f = 1; f <= 300; f++) {
  runtime.frame(game);
  
  if (f <= 5 || f === 9 || f === 10 || f % 50 === 0) {
    const req = Array.from({length: 8}, (_, i) => store.readByte(0x0490 + i));
    const r22 = store.readByte(0x0022);
    const rED = store.readByte(0x00ED);
    const r1B = store.readByte(0x001B);
    const r48 = store.readByte(0x0048);
    log(
      f.toString().padStart(5) + ' | ' +
      '[' + req.map(r => '0x' + r.toString(16).toUpperCase().padStart(2, '0')).join(', ') + '] | ' +
      '$' + r22.toString(16).toUpperCase().padStart(2, '0') + '     | ' +
      rED.toString().padStart(8) + ' | ' +
      '$' + r1B.toString(16).toUpperCase().padStart(2, '0') + '     | ' +
      '$' + r48.toString(16).toUpperCase().padStart(2, '0')
    );
  }
}

log('\n=== 最终状态 (frame 300) ===');
const req = Array.from({length: 8}, (_, i) => store.readByte(0x0490 + i));
log('ram_0490-0497: [' + req.map(r => '0x' + r.toString(16).toUpperCase().padStart(2, '0')).join(', ') + ']');
log('ram_00ED: ' + store.readByte(0x00ED));
log('ram_001B: $' + store.readByte(0x001B).toString(16).toUpperCase());
log('ram_0048: $' + store.readByte(0x0048).toString(16).toUpperCase());

// 对比 tsnes 期望值
log('\n=== 差分验证（对比 tsnes）===');
const tsnesReq = [0x58, 0x58, 0x00, 0x50, 0x58, 0xE5, 0x01, 0x50];
let pass = 0, fail = 0;
for (let i = 0; i < 8; i++) {
  const ts = req[i];
  const expected = tsnesReq[i];
  if (ts === expected) { pass++; log('  req' + i + ': PASS (0x' + ts.toString(16).toUpperCase() + ')'); }
  else { fail++; log('  req' + i + ': FAIL (expected=0x' + expected.toString(16).toUpperCase() + ', actual=0x' + ts.toString(16).toUpperCase() + ')'); }
}
log('差分结果: PASS=' + pass + ', FAIL=' + fail);

fs.writeFileSync(outPath, lines.join('\n'));
console.log('\nOutput: ' + outPath);

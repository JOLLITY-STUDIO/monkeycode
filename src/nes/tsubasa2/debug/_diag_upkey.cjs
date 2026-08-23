// 验证按 UP (input_mask bit4=0x10) 后 boot 推进: sub801EGen 等 UP → sceneLoad(0x17) → 输入驱动
const path = require('path');
const fs = require('fs');
const ts = require(path.resolve(__dirname, '../_tmp_out/game/index.js'));
const core = require(path.resolve(__dirname, '../_tmp_out/core/index.js'));
const NES = core.NES;
const nes = new NES();
nes.loadTsROM({ header: ts.HEADER, prg: ts.PRG, chr: ts.NES_CHR_ROM });
const game = new ts.default(nes);
game.boot();
const store = game.store;

function countNt(nt) {
  let n = 0;
  for (let y = 0; y < 30; y++) {
    const row = nt[y];
    if (!row) continue;
    for (let x = 0; x < 32; x++) if (row[x] && row[x].tile !== 0) n++;
  }
  return n;
}

const log = [];
const edHist = [];
// 前 100 帧不按键 (叙事播放), 100-110 按 UP
for (let i = 0; i < 400; i++) {
  if (i >= 100 && i < 104) {
    store.set('input_mask', 0x10); // UP 按下沿
  } else {
    store.set('input_mask', 0);
  }
  try { game.frame(nes); } catch (e) { log.push('CRASH f' + (i + 1) + ': ' + e.message); break; }
  const ed = store.read('ram_00ED');
  if (edHist.length === 0 || edHist[edHist.length - 1].ed !== ed) edHist.push({ f: i + 1, ed });
  if (i % 40 === 39) log.push(`f${i + 1}: ed=${ed} nt0=${countNt(store.nt0)} nt1=${countNt(store.nt1)} ptr=${store.read('ram_004D')} 0056=${store.read('ram_0056')}`);
}
log.push('=== ed history ===');
log.push(edHist.map(e => `f${e.f}:${e.ed}`).join(' '));
log.push('=== final ===');
log.push('ram_00ED=' + store.read('ram_00ED') + ' nt0=' + countNt(store.nt0) + ' nt1=' + countNt(store.nt1));
log.push('ram_0051/52/53=' + store.read('ram_0051') + '/' + store.read('ram_0052') + '/' + store.read('ram_0053'));
log.push('ram_004D/4E(ptr)=' + store.read('ram_004D') + '/' + store.read('ram_004E'));
log.push('ram_0090=' + store.read('ram_0090') + ' 0091=' + store.read('ram_0091') + ' 007B=' + store.read('ram_007B'));
fs.writeFileSync(path.resolve(__dirname, '_diag_upkey_out.txt'), log.join('\n') + '\n');
console.log(log.join('\n'));

/** 诊断 H5 opening 运行：跑 3800 帧，捕获每帧异常并记录 scroll/override 状态 */
const fs = require('fs');
const { HeadlessRuntime } = require('../dist-cjs/game/runtime/HeadlessRuntime');
const { Tsubasa2 } = require('../dist-cjs/game/index');

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot(runtime);

const out = [];
const TOTAL = 3800;
let crashAt = -1;
for (let f = 0; f < TOTAL; f++) {
  try {
    runtime.frame(game);
  } catch (e) {
    crashAt = f;
    out.push(`CRASH at h5 f=${f}: ${e && e.stack ? e.stack.split('\n').slice(0, 6).join(' | ') : String(e)}`);
    break;
  }
  const ppu = runtime.ppu;
  const sc = runtime.store && runtime.store.scene;
  const h5f = f + 10;
  // 关键帧采样（字幕 282+ / 标题 3728+）
  if (f < 30 || (f >= 270 && f <= 360) || (f >= 3715 && f <= 3790)) {
    if (f % 5 === 0 || f < 20) {
      let nz = 0;
      for (let i = 0; i < ppu.buffer.length; i++) if (ppu.buffer[i] !== 0) nz++;
      let nt0nz = 0, nt1nz = 0, nt2nz = 0, nt3nz = 0;
      for (let i = 0; i < 960; i++) {
        if (ppu.nameTable[0].tile[i] !== 0) nt0nz++;
        if (ppu.nameTable[1].tile[i] !== 0) nt1nz++;
        if (ppu.nameTable[2].tile[i] !== 0) nt2nz++;
        if (ppu.nameTable[3].tile[i] !== 0) nt3nz++;
      }
      out.push(
        `h5f=${h5f} scene=${sc ? sc.currentSceneId : '?'} bufNz=${nz} nt0=${nt0nz} nt1=${nt1nz} nt2=${nt2nz} nt3=${nt3nz} ` +
        `reg=(${ppu.regV},${ppu.regH},${ppu.regVT},${ppu.regHT},${ppu.regFV},${ppu.regFH}) ` +
        `override=${ppu.renderStartOverride ? JSON.stringify(ppu.renderStartOverride) : 'null'}`,
      );
    }
  }
}
fs.writeFileSync('output/_diag_scroll.log', out.join('\n') + (crashAt >= 0 ? `\nCRASHED at f=${crashAt}` : `\nDONE ${TOTAL} frames`));
console.log('written output/_diag_scroll.log, crashAt=' + crashAt);

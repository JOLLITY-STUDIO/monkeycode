// 验证 H5 opening f3725-f3782 幕布 override 是否真正生效
const fs = require('fs');
const { Tsubasa2 } = require('./dist-cjs2/game/index');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
// 屏蔽内部帧日志
const origLog = console.log;
console.log = () => {};
game.boot(runtime);
console.log = origLog;

const ppu = runtime.ppu;
const H5_START = 3700;
const H5_END = 3810;

// hook renderBgScanline 记录每帧 scanline0 的渲染起始 cnt
const origRender = ppu.renderBgScanline.bind(ppu);
const scan0Cnt = {};
ppu.renderBgScanline = function (bgbuffer, scan) {
  if (scan === 0) {
    const key = game['_frame'];
    if (!scan0Cnt[key]) {
      scan0Cnt[key] = { cntV: this.cntV, cntVT: this.cntVT, cntFV: this.cntFV, cntH: this.cntH, curNt: this.curNt };
    }
  }
  return origRender(bgbuffer, scan);
};

const opening = game.router.getController(100);
const origApply = opening.applyNtToPpu.bind(opening);
const overrides = {};
opening.applyNtToPpu = function (t) {
  const f = this.currentFrame ? this.currentFrame.f : -1;
  const r = t.renderStartOverride;
  overrides['nes_' + f] = r ? { cv: r.cntV, cvt: r.cntVT, cfv: r.cntFV, ch: r.cntH } : null;
  return origApply(t);
};

for (let h5 = 0; h5 <= H5_END; h5++) {
  game.frame(runtime);
}

const out = [];
out.push('h5 | nes | override(cv/cvt/cfv) | renderStartScan0(cv/cvt/cfv) | curNt');
for (let h5 = H5_START; h5 <= H5_END; h5++) {
  const nes = h5 + 10;
  const ov = overrides['nes_' + nes];
  const sc = scan0Cnt[h5];
  out.push(
    'h5=' + h5 + ' nes=' + nes +
    ' override=' + (ov ? `${ov.cv}/${ov.cvt}/${ov.cfv}` : 'NULL') +
    ' scan0=' + (sc ? `${sc.cntV}/${sc.cntVT}/${sc.cntFV}` : 'N/A') +
    ' curNt=' + (sc ? sc.curNt : '?'),
  );
}
fs.writeFileSync('_verify_curtain_out.txt', out.join('\n'), 'utf8');
console.log('done lines=' + out.length);

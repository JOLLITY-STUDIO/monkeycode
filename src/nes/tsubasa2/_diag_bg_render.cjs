// monkey-patch renderBgScanline 观察 row 12-13 的 tile 获取
const { HeadlessRuntime } = require('./dist-cjs/game/runtime/HeadlessRuntime');
const { Tsubasa2 } = require('./dist-cjs/game/index');

const r = new HeadlessRuntime();
const g = new Tsubasa2();
g.boot(r);

// 在渲染前 patch
const ppu = r.ppu;
const orig = ppu.renderBgScanline.bind(ppu);
let patched = false;

ppu.renderBgScanline = function (bgbuffer, scan) {
  // 只在 row 12-13 (scan 97-111) 记录
  if (scan >= 96 && scan <= 112) {
    const ntIdx = this.ntable1[(this.cntV << 1) + this.cntH];
    const tileIdx = this.nameTable[ntIdx].getTileIndex(this.cntHT, this.cntVT);
    console.log('scan=' + scan + ' curNt=' + this.curNt + ' cntHT=' + this.cntHT + ' cntVT=' + this.cntVT + ' cntV=' + this.cntV + ' cntH=' + this.cntH + ' nt=' + ntIdx + ' tileIdx=' + tileIdx.toString(16));
  }
  return orig(bgbuffer, scan);
};
patched = true;

for (let f = 0; f < 11; f++) {
  console.log('=== frame ' + f + ' ===');
  r.frame(g);
}

// 黑屏修复验证 v5: 90 帧推进, 确认 ram_0538 恒 0 / buffer 非黑 / 开场动画推进
const NES = require('./_test_out/core/nes').default;
const { PRG, HEADER, NES_CHR_ROM } = require('./_test_out/game/rom');
const { Tsubasa2 } = require('./_test_out/game/index');

let lastBuf = null;
const nes = new NES({
  onFrame: (buf) => { lastBuf = buf; },
  onStatusUpdate: () => {},
  emulateSound: false,
});
nes.loadTsROM({ header: HEADER, prg: PRG, chr: NES_CHR_ROM });

const t = new Tsubasa2();
t.boot();
function countNz(buf) { let n = 0; for (let i = 0; i < buf.length; i++) if (buf[i]) n++; return n; }

for (let f = 0; f < 90; f++) {
  t.frame(nes);
  if (f % 15 === 14) {
    console.log(
      `frame=${f + 1} bufNZ=${countNz(lastBuf)} scrollX=${t.store.scrollX}` +
        ` scrollY=${t.store.scrollY} ram_0538=${t.store.read('ram_0538')}` +
        ` ram_00ED=${t.store.read('ram_00ED')} nt0=${(function () { let n = 0; for (let y = 0; y < 30; y++) for (let x = 0; x < 32; x++) { const e = t.store.readNT(0, x, y); if (e && e.tile) n++; } return n; })()}`,
    );
  }
}
console.log('DONE frame90 bufNZ =', countNz(lastBuf));

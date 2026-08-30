/**
 * _cmp_nt450.ts — 对比 H5 f450 nameTable vs emu nt.json
 */
import * as fs from 'fs';
import * as path from 'path';
import { Tsubasa2 } from '../src/game/index';
import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';

const ROOT = path.resolve(__dirname, '..');

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot(runtime);
const ppu: any = runtime.ppu;
for (let k = 1; k <= 440; k++) runtime.frame(game);

const emu = JSON.parse(fs.readFileSync(path.join(ROOT, 'output/emu-full/frame-0450/nt.json'), 'utf8'));
// emu nt.json: {0:{tile,attr},1:...}
for (let ni = 0; ni < 4; ni++) {
  const e = emu[ni];
  const h = ppu.nameTable[ni];
  if (!e || !h) {
    console.log(`nt${ni} missing`);
    continue;
  }
  // 对比 tile 行 (0-29 内容行, 960-1023 属性区)
  const hDiff: number[] = [];
  const eDiff: number[] = [];
  let rowDiff = 0;
  for (let r = 0; r < 30; r++) {
    let rd = 0;
    for (let c = 0; c < 32; c++) {
      const et = e.tile[r * 32 + c];
      const ht = h.tile[r * 32 + c];
      if (et !== ht) rd++;
    }
    if (rd > 0) {
      hDiff.push(r);
      rowDiff += rd;
    }
  }
  console.log(`nt${ni}: rowDiff=${hDiff.join(',')} totalTileDiff=${rowDiff}`);
  if (hDiff.length) {
    // 打印前几个差异行的 H5 vs emu tile
    for (const r of hDiff.slice(0, 3)) {
      const hrow = [];
      const erow = [];
      for (let c = 0; c < 32; c++) {
        hrow.push(h.tile[r * 32 + c]);
        erow.push(e.tile[r * 32 + c]);
      }
      console.log(`  row${r} H5: ${hrow.join(',')}`);
      console.log(`  row${r} EMU:${erow.join(',')}`);
    }
  }
}

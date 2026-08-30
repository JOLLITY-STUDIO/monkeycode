/**
 * _cmp_attr450.ts — 比较 H5 与 emu f450 的属性表
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

// H5 nameTable 结构: nameTable[i].tile[30*32], attrib[64]
for (let ni = 0; ni < 4; ni++) {
  const h5 = ppu.nameTable[ni].attrib;
  const emuFile = path.join(ROOT, 'output/emu-full/frame-0450/nt.json');
  let emuAttr: number[] = [];
  if (fs.existsSync(emuFile)) {
    const arr = JSON.parse(fs.readFileSync(emuFile, 'utf8'));
    const j = arr.find((x: any) => x.idx === ni);
    if (j) emuAttr = j.attrib || [];
  }
  let diff = 0;
  for (let i = 0; i < 64; i++) {
    const a = h5[i] & 0xff;
    const b = (emuAttr[i] || 0) & 0xff;
    if (a !== b) {
      if (diff < 10) console.log(`nt${ni} attr[${i}] H5=${a.toString(16)} EMU=${b.toString(16)}`);
      diff++;
    }
  }
  console.log(`nt${ni} attr diff=${diff}/${64}`);
}

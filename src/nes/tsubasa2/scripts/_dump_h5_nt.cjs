const fs = require('fs');
const path = require('path');
// 用 ts-node 注册直接加载 ts
require('ts-node').register({ project: path.join(__dirname, '..', 'tsconfig.json'), transpileOnly: true });
const { HeadlessRuntime } = require('../src/game/runtime/HeadlessRuntime');
const { Tsubasa2 } = require('../src/game/index');

const targetH5Frame = parseInt(process.argv[2] || '3100', 10);
const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot(runtime);

for (let f = 0; f <= targetH5Frame; f++) {
  runtime.frame(game);
}

const ppu = runtime.ppu;
const out = {
  frame: targetH5Frame,
  nesFrame: targetH5Frame + 10,
  nameTables: []
};
for (let i = 0; i < 4; i++) {
  const nt = ppu.nameTable[i];
  out.nameTables.push({
    idx: i,
    tile: Array.from(nt.tile).map(x => x & 0xff),
    attrib: Array.from(nt.attrib).map(x => x & 0xff)
  });
}

const outDir = path.join(__dirname, '..', 'output', 'h5-dump');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, `nt-f${targetH5Frame}.json`), JSON.stringify(out));
console.log('dumped', path.join(outDir, `nt-f${targetH5Frame}.json`));

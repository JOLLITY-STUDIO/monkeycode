const fs = require('fs');
console.log('dist-cjs2 exists:', fs.existsSync('dist-cjs2'));
console.log('HeadlessRuntime:', fs.existsSync('dist-cjs2/src/game/runtime/HeadlessRuntime.js'));
console.log('ppu index:', fs.existsSync('dist-cjs2/src/core/ppu/index.js'));
console.log('opening:', fs.existsSync('dist-cjs2/src/game/prg/code/scene/OpeningSceneController.js'));
console.log('frame table:', fs.existsSync('dist-cjs2/src/game/prg/data/scene/OpeningFrameTable.js'));
if (fs.existsSync('dist-cjs2/src/game/runtime/HeadlessRuntime.js')) {
  const s = fs.readFileSync('dist-cjs2/src/game/runtime/HeadlessRuntime.js', 'utf8');
  console.log('headless head:', s.slice(0, 200).replace(/\n/g, ' '));
}

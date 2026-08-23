/* 无头验证：编译 TS 组合根并跑 900 帧，确认场景表分发正常 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 1. 编译 game 入口到临时目录
execSync('npx tsc -p tsconfig.json --noEmit', { cwd: '.', stdio: 'inherit' });

// 2. 编译验证脚本
const verifyTs = `
import { Tsubasa2 } from '../src/game/index';
import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';

const game = new Tsubasa2();
const runtime = new HeadlessRuntime();
game.boot();
let sceneAt480 = -1;
let ram1B = 0;
for (let f = 0; f < 900; f++) {
  game.frame(runtime);
  if (f === 480) sceneAt480 = game.store.readByte(0x00ed);
  ram1B = game.store.readByte(0x001b);
}
const buf = (runtime as any).ppu.buffer as Uint32Array;
let nz = 0;
for (let i = 0; i < buf.length; i++) if (buf[i] !== 0) nz++;
console.log(JSON.stringify({
  finalScene: game.store.readByte(0x00ed),
  sceneAt480,
  ram1B: ram1B.toString(16),
  bufNonZero: nz,
  frame: game['_frame'],
}, null, 2));
`;
fs.mkdirSync('temp_out', { recursive: true });
fs.writeFileSync('temp_out/_verify_scene_table.ts', verifyTs);
execSync('npx tsc temp_out/_verify_scene_table.ts --module commonjs --target es2017 --esModuleInterop --skipLibCheck --outDir temp_out 2>&1', { cwd: '.', stdio: 'inherit' });

// 3. 运行
const jsPath = 'temp_out/_verify_scene_table.js';
if (!fs.existsSync(jsPath)) {
  console.error('COMPILE FAILED: ' + jsPath + ' not found');
  const alt = 'temp_out/temp_out/_verify_scene_table.js';
  if (fs.existsSync(alt)) {
    console.log(require(path.resolve(alt)));
  }
  process.exit(1);
}
const result = execSync('node ' + jsPath, { cwd: '.', encoding: 'utf8' });
console.log('RESULT:', result);

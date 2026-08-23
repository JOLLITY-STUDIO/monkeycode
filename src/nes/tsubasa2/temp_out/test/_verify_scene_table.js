"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 无头验证：确认场景表驱动重构后场景 0 → 2 流转正常。
 * 运行：npx tsc test/_verify_scene_table.ts --module commonjs --target es2017 --esModuleInterop --skipLibCheck --outDir temp_out && node temp_out/test/_verify_scene_table.js
 */
const index_1 = require("../src/game/index");
const HeadlessRuntime_1 = require("../src/game/runtime/HeadlessRuntime");
const game = new index_1.Tsubasa2();
const runtime = new HeadlessRuntime_1.HeadlessRuntime();
game.boot();
let sceneAt480 = -1;
for (let f = 0; f < 900; f++) {
    game.frame(runtime);
    if (f === 480)
        sceneAt480 = game.store.readByte(0x00ed);
}
const buf = runtime.ppu.buffer;
let nz = 0;
for (let i = 0; i < buf.length; i++)
    if (buf[i] !== 0)
        nz++;
console.log(JSON.stringify({
    finalScene: game.store.readByte(0x00ed),
    sceneAt480,
    ram1B: game.store.readByte(0x001b).toString(16),
    bufNonZero: nz,
    frame: game._frame,
}, null, 2));

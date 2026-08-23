"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * V0.3-C1 无头验证：boot → 开场场景 0 完整流转 → 场景 2
 * 用法：npx tsc scripts/_verify_c1.ts --outDir temp_out --module commonjs --target ES2020 ... && node temp_out/_verify_c1.js
 */
const index_1 = require("../src/game/index");
const HeadlessRuntime_1 = require("../src/game/runtime/HeadlessRuntime");
const runtime = new HeadlessRuntime_1.HeadlessRuntime();
const game = new index_1.Tsubasa2();
game.boot();
let crash = null;
try {
    for (let i = 0; i < 900; i++)
        game.frame(runtime);
}
catch (e) {
    crash = e;
}
const store = game.store;
const info = {
    frame: game._frame,
    scene: store.readByte(0x00ed),
    ram_001B: store.readByte(0x001b).toString(16),
    ram_0044: store.readByte(0x0044).toString(16),
    ram_0048: store.readByte(0x0048).toString(16),
    ram_004A: store.readByte(0x004a).toString(16),
    ram_0079: store.readByte(0x0079).toString(16),
    ram_007C: store.readByte(0x007c).toString(16),
    ram_0628: store.readByte(0x0628).toString(16),
    bufNonZero: (() => {
        const buf = runtime.ppu.buffer;
        let n = 0;
        for (let i = 0; i < buf.length; i++)
            if (buf[i] !== 0)
                n++;
        return n;
    })(),
};
console.log(JSON.stringify(info, null, 2));
if (crash) {
    console.error('CRASH:', crash);
    process.exit(1);
}
if (info.scene !== 2) {
    console.error('FAIL: 期望流转到场景 2，实际 scene=' + info.scene);
    process.exit(2);
}
console.log('OK: 开场场景 0 → 场景 2 流转完成，画面有非零像素=' + info.bufNonZero);

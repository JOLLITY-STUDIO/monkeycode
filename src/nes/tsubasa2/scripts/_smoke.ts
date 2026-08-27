// _smoke.ts — 快速验证 ts-node 链路 + 跑 60 帧
import { Tsubasa2 } from '../src/game/index';
import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';
const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot(runtime);
for (let k = 0; k < 60; k++) runtime.frame(game);
const ppu: any = runtime.ppu;
console.log('SMOKE_OK frame=' + (game as any)._frame + ' buf0=' + ppu.buffer[0]);

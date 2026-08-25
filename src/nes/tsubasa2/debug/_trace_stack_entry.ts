import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';
import { Tsubasa2 } from '../src/game/index';

async function main() {
  const runtime = new HeadlessRuntime();
  const game = new Tsubasa2();
  const origWrite = (game.store as any).writeByte.bind(game.store);
  (game.store as any).writeByte = function (addr: number, val: number) {
    if (addr === 0x0498 && val !== 96 && val !== 0) {
      const stack = new Error().stack ?? '';
      console.log(`writeByte(0x0498=${val}) called by:`);
      // 取栈上 8 行
      stack.split('\n').slice(2, 8).forEach((l) => console.log('  ' + l));
    }
    return origWrite(addr, val);
  };
  game.boot();
  console.log('=== frame 1 ===');
  runtime.frame(game);
  console.log('=== frame 2 ===');
  runtime.frame(game);
}
main().catch((e) => { console.error(e.stack || e); process.exit(1); });

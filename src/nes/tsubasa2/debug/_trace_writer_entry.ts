import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';
import { Tsubasa2 } from '../src/game/index';

async function main() {
  const runtime = new HeadlessRuntime();
  const game = new Tsubasa2();
  // 改写 DataStore.writeByte 以追踪 setSpriteY/spriteY 写入
  const origWrite = (game.store as any).writeByte.bind(game.store);
  let frame = 0;
  (game.store as any).writeByte = function (addr: number, val: number) {
    // 只追踪 OAM 范围：$0468 + slot*4 处的 Y 字节 (slot*4 = 0,4,8,...0xfc)
    if (addr >= 0x0468 && addr <= 0x0568 && (addr & 3) === 0 && frame <= 5) {
      const slot = (addr - 0x0468) >> 2;
      console.log(`  f=${frame} writeByte(s${slot}.Y @0x${addr.toString(16)}, ${val})`);
    }
    return origWrite(addr, val);
  };
  game.boot();
  for (frame = 1; frame <= 5; frame++) {
    console.log(`=== frame ${frame} input state ===`);
    console.log(`  s12 Y before frame: ${game.store.readByte(0x0468 + 12 * 4)}`);
    runtime.frame(game);
    console.log(`  s12 Y after frame:  ${game.store.readByte(0x0468 + 12 * 4)}`);
  }
}
main().catch((e) => { console.error(e.stack || e); process.exit(1); });

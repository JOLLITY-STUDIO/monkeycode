/**
 * test/run_node.ts — 纯 Node.js 测试入口
 *
 * 用法:
 *   npx tsx test/run_node.ts [帧数] [--dump-rom]
 *   npm test
 *
 * 退出码:
 *   0 — 渲染输出包含非黑像素
 *   1 — 渲染全黑或引擎异常
 */
import { diagnoseEngine } from './diagnose_engine';
import { runFullDump } from './dump_rom';

const FRAMES = parseInt(process.argv[2] || '180', 10);
const DUMP_ROM = process.argv.includes('--dump-rom');

console.log('══════ TsubasaNes Node Test ══════');
console.log(`Target frames: ${FRAMES}`);

if (DUMP_ROM) {
  console.log('\n── ROM Dump ──');
  runFullDump();
}

console.log('\n── Engine Diagnosis ──');
const result = diagnoseEngine(FRAMES);

console.log('\n══════ Result ══════');
console.log(`Init success: ${result.init.success}`);
console.log(`Scene: ${result.scene.name} (#${result.scene.id})`);
console.log(`PPU ctrl=${result.ppu.ctrl.toString(16)} mask=${result.ppu.mask.toString(16)} ` +
  `bg=${result.ppu.bgEnabled} spr=${result.ppu.sprEnabled}`);
console.log(`Summary: ${result.summary}`);

const anyNonBlack = result.frames.some(f => f.nonBlackCount > 0);
if (anyNonBlack) {
  console.log('\n✅ PASS: 存在有效渲染像素');
  process.exit(0);
} else {
  console.log('\n❌ FAIL: 渲染全黑');
  process.exit(1);
}

/**
 * 验证脚本: 测试 Reset 链 (Bank30 → Bank02 → Bank00)
 *
 * 用法: node --import tsx scripts/verify_reset_chain.ts
 *   或: npx tsx scripts/verify_reset_chain.ts
 *
 * 不依赖浏览器/Canvas，仅验证数据流逻辑。
 */

import { DataStore } from '../src/game/data/DataStore';
import { Bank00Service } from '../src/game/service/bank00/bank00_core.service';
import { Bank02Service } from '../src/game/service/bank02_scene.service';
import { Bank30Service } from '../src/game/service/bank30_init.service';

// ── 辅助 ──

function assert(cond: boolean, msg: string): void {
  if (!cond) {
    console.error(`❌ 断言失败: ${msg}`);
    process.exit(1);
  }
  console.log(`  ✓ ${msg}`);
}

function main(): void {
  console.log('═══════════════════════════════════════');
  console.log('  天使之翼2 — Reset 链验证');
  console.log('  Bank31($FFF0) → Bank30 → Bank02 → Bank00');
  console.log('═══════════════════════════════════════\n');

  // ── 1. 创建 DataStore ──
  console.log('1. 创建 DataStore...');
  const store = new DataStore();
  assert(store !== null, 'DataStore 创建成功');
  assert(store.nt0.length === 30 && store.nt0[0].length === 32, 'NT0 是 32×30 网格');

  // ── 2. 创建 Bank 服务链 ──
  console.log('\n2. 创建 Bank 服务链 (依赖注入, 不模拟 MMC3)...');
  const bank00 = new Bank00Service(store);
  const bank02 = new Bank02Service(store, bank00);
  const bank30 = new Bank30Service(store, bank00, bank02);
  assert(bank00 !== null, 'Bank00Service 创建成功');
  assert(bank02 !== null, 'Bank02Service 创建成功');
  assert(bank30 !== null, 'Bank30Service 创建成功');

  // ── 3. 执行 Reset 初始化 ──
  console.log('\n3. 执行 Reset 链: bank30.init()...');
  try {
    bank30.init();
    console.log('  ✓ bank30.init() 执行完毕 (无异常)');
  } catch (e: any) {
    console.error(`  ❌ bank30.init() 抛出异常: ${e.message}`);
    console.error(e.stack);
    process.exit(1);
  }

  // ── 4. 验证初始化后状态 ──
  console.log('\n4. 验证初始化后状态...');

  // PPU 寄存器镜像
  // Bank30 $C400: $20=$08 → Bank02 $82A3: ORA #$80 → $20=$88 (NMI on)
  const ppuctrl = store.read('ppuctrl');
  assert(ppuctrl === 0x88, `PPUCTRL = 0x88 ($08|$80, NMI on, NT0) — 实际: 0x${ppuctrl.toString(16)}`);

  const ppumask = store.read('ppumask');
  assert(ppumask === 0x1E, `PPUMASK = 0x1E (BG+SPR on) — 实际: 0x${ppumask.toString(16)}`);

  // Bank 切换状态
  const ram22 = store.read('ram_0022');
  assert(ram22 === 0, `ram_0022 = 0 (Bank 切换状态清零) — 实际: 0x${ram22.toString(16)}`);

  // 状态变量
  const ram8f = store.read('ram_008F');
  assert(ram8f === 0x02, `ram_008F = 2 — 实际: 0x${ram8f.toString(16)}`);

  const ram91 = store.read('ram_0091');
  assert(ram91 === 0x02, `ram_0091 = 2 — 实际: 0x${ram91.toString(16)}`);

  // PPU Buffer 指针
  const buf4a = store.read('ram_004A');
  const buf4b = store.read('ram_004B');
  assert(buf4a === 0 && buf4b === 0, `PPU Buffer 指针 = 0 (ram_004A=${buf4a}, ram_004B=${buf4b})`);

  // ram_001B 标志
  const ram1b = store.read('ram_1B');
  assert((ram1b & 0x40) !== 0, `ram_001B bit6 = 1 (初始化标志) — 实际: 0x${ram1b.toString(16)}`);

  // OAM 清空
  assert(store.sprites.length === 64, `OAM 精灵数 = 64 — 实际: ${store.sprites.length}`);
  assert(store.sprites[0].y === 0xF8, `OAM[0].Y = 0xF8 (不可见) — 实际: 0x${store.sprites[0].y.toString(16)}`);

  // NT 清零
  assert(store.nt0[0][0].tile === 0, `NT0[0][0] tile = 0 — 实际: ${store.nt0[0][0].tile}`);

  // 主循环状态
  assert(bank00.isRunning, 'Bank00 主循环已启动');
  assert(bank00.frameCount === 0, `frameCount = 0 — 实际: ${bank00.frameCount}`);

  // ── 5. 模拟几帧运行 ──
  console.log('\n5. 模拟帧运行...');
  for (let f = 1; f <= 5; f++) {
    bank00.setVBlankFlag();
    bank00.update(0);
    console.log(`  frame ${f}: running=${bank00.isRunning}, frameCount=${bank00.frameCount}`);
  }
  assert(bank00.frameCount === 5, `5帧后 frameCount = 5 — 实际: ${bank00.frameCount}`);

  // ── 6. 汇总 ──
  console.log('\n═══════════════════════════════════════');
  console.log('  ✅ 全部验证通过');
  console.log('  Reset 链: Bank31 → Bank30 → Bank02 → Bank00 正确');
  console.log('  无 MMC3 模拟，直接对象调用');
  console.log('═══════════════════════════════════════');
}

main();

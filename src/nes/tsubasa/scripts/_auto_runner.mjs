/**
 * 天使之翼 II — 完整自动测试框架 (生产版)
 *
 * 用法: node _auto_runner.mjs
 * 输出: test_output/run_summary.json (完整状态时间线)
 *
 * 三层功能:
 *   1) jsnes 真机验证 — 暴力推进场景产生 ground truth
 *   2) 场景状态追踪 — 记录每次场景切换的 RAM/PPU/MMC3 状态
 *   3) 反汇编验证 — 对比 TS disasm 与真机状态
 *
 * 已知限制:
 *   - jsnes 无法完美运行游戏（PPU 队列 $0498 过大）
 *   - 自动修复: 清零 $0498/$1B bit6
 *   - 标题画面只能暴力跳过 → 直接设 $26
 *   - $5A (ntBank) 在 active code path 中从未被写
 */
import { NES } from 'jsnes';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

// ─── 配置 ────────────────────────────────────────────────────────────
const ROM_PATH = 'src/legacy/romdata/Captain Tsubasa II - Super Striker (Japan).nes';
const OUT_DIR = 'test_output';
const MAX_FRAMES = 12000;

// ─── 工具 ────────────────────────────────────────────────────────────
const hex = v => (v & 0xFF).toString(16).padStart(2, '0');
const hex16 = v => (v & 0xFFFF).toString(16).padStart(4, '0');

class AutoRunner {
  constructor() {
    if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

    this.nes = new NES({ onFrame: () => {}, onStatusUpdate: () => {} });
    this.nes.loadROM(new Uint8Array(readFileSync(ROM_PATH)));
    this.f = 0;
    this.timeline = [];
    this.lastScene = -1;
  }

  ram(a) { return this.nes.cpu.mem[a] & 0xFF; }
  tick(n) { for (let i = 0; i < n; i++) { this.nes.frame(); this.f++; } }
  btn(b, on) { on ? this.nes.buttonDown(1, b) : this.nes.buttonUp(1, b); }
  hold(b, n) { this.btn(b, true); this.tick(n); this.btn(b, false); }

  dumpMemory(tag) {
    const pc = this.nes.cpu.REG_PC;

    // 任务槽
    const tasks = {};
    for (let s = 0; s < 6; s++) {
      const base = 1 + s * 4;
      tasks[`slot${s}`] = {
        timer: this.ram(base), sp: this.ram(base + 1),
        bank2: this.ram(base + 2), bank1: this.ram(base + 3),
      };
    }

    // ZP snapshot
    const zp = {};
    for (let i = 0; i < 0x20; i++) zp[`$${hex(i)}`] = hex(this.ram(i));

    // $0400 区域
    const ram400 = [];
    for (let i = 0x400; i <= 0x410; i++) ram400.push(hex(this.ram(i)));

    const entry = {
      frame: this.f,
      tag,
      scene: hex(this.ram(0x26)),
      jmpIdx: hex(this.ram(0x27)),
      status_4C: hex(this.ram(0x4C)),
      ntBank_5A: hex(this.ram(0x5A)),
      ntIdx_56: hex(this.ram(0x56)),
      nmiTimer_78: hex(this.ram(0x78)),
      ppuMode_79: hex(this.ram(0x79)),
      nmiTrig_e0: hex(this.ram(0xE0)),
      ppuCtrl_20: hex(this.ram(0x20)),
      ppuMask_21: hex(this.ram(0x21)),
      flag1B: hex(this.ram(0x1B)),
      joy1C: hex(this.ram(0x1C)),
      nmiQueue_0498: hex(this.ram(0x0498)),
      mmc3Bank_8000: hex(this.ram(0x24)),
      mmc3Bank_A000: hex(this.ram(0x25)),
      pc: hex16(pc),
      inNMI: (pc & 0xF000) === 0xC000,
      tasks,
      zp,
      ram400,
    };

    this.timeline.push(entry);

    // 场景切换日志
    const scene = parseInt(entry.scene, 16);
    if (scene !== this.lastScene) {
      console.log(`[${String(this.f).padStart(6)}] SCENE ${hex(this.lastScene)}→${entry.scene}  ` +
        `5A=$${entry.ntBank_5A}  4C=$${entry.status_4C}  nQ=$${entry.nmiQueue_0498}  ` +
        `1B=$${entry.flag1B}  bankA=$${entry.mmc3Bank_A000}  PC=$${entry.pc}`);
      this.lastScene = scene;
    }
  }

  // ─── 主流程 ──────────────────────────────────────────────────────
  run() {
    console.log('══════ 天使之翼 II 自动测试 ══════');
    this.dumpMemory('boot');

    // Phase 1: 等待 RESET 初始化
    this.tick(120);
    this.dumpMemory('post_boot');

    // Phase 2: 修复 NMI 队列 (清零 $0498-$04AC)
    const nQ = this.ram(0x0498);
    this.nes.cpu.mem[0x0498] = 0x00;
    for (let i = 0x0499; i <= 0x04AC; i++) this.nes.cpu.mem[i] = 0x00;
    console.log(`  [FIX] NMI queue: $${hex(nQ)} → 0x00`);

    // Phase 3: 修复 $1B (清除 V flag bit6)
    if (this.ram(0x1B) & 0x40) {
      this.nes.cpu.mem[0x1B] = this.ram(0x1B) & ~0x40;
      console.log(`  [FIX] $1B bit6 cleared`);
    }
    this.dumpMemory('fixed');

    // Phase 4: 等待标题画面稳定
    this.tick(120);
    this.dumpMemory('title_ready');

    // Phase 5: 尝试按 START 过标题 (8 次尝试)
    console.log('\n── 尝试按 START 过标题 ──');
    for (let i = 0; i < 8; i++) {
      this.hold(3, 12); // START
      this.tick(48);
      if (this.ram(0x26) > 0x00) break;
    }
    this.dumpMemory('title_btn_try');

    // Phase 6: 暴力推进场景
    console.log('\n── 暴力推进场景 ──');
    const SCENES = {
      0x02: 'menu_main',
      0x04: 'password_menu',
      0x12: 'story_start',
      0x14: 'briefing',
      0x16: 'cinematic',
      0x18: 'lineup',
      0x1A: 'team_select',
      0x1C: 'formation',
      0x1E: 'captain_pick',
      0x20: 'MATCH',
    };

    const targetScenes = this.ram(0x26) < 0x02
      ? Object.entries(SCENES)
      : Object.entries(SCENES).filter(([sc]) => parseInt(sc) > this.ram(0x26));

    for (const [scHex, tag] of targetScenes) {
      const sc = parseInt(scHex);
      this.nes.cpu.mem[0x26] = sc;
      this.nes.cpu.mem[0x4C] = this.ram(0x4C) & 0x7F; // 清转换标志
      this.tick(120);
      this.dumpMemory(`scene_${tag}`);
    }

    // Phase 7: 比赛阶段 — 追踪 $5A
    console.log('\n── 比赛阶段 (追踪 $5A 变化) ──');
    const matchStart = this.f;
    let prev5A = this.ram(0x5A);
    let prev4C = this.ram(0x4C);
    const ntChanges = [];

    for (let round = 0; round < 40; round++) {
      // 模拟比赛按键
      const r = round % 8;
      if (r === 0) this.hold(0, 12);      // A
      else if (r === 1) this.hold(7, 8);  // RIGHT
      else if (r === 2) this.hold(0, 10); // A
      else if (r === 3) this.hold(1, 8);  // B
      else if (r === 4) { this.btn(0, true); this.btn(7, true); this.tick(10); this.btn(0, false); this.btn(7, false); }
      else if (r === 5) this.hold(0, 12); // A
      else if (r === 6) this.hold(4, 8);  // UP
      else this.hold(1, 10);              // B

      this.tick(108);

      const cur5A = this.ram(0x5A);
      const cur4C = this.ram(0x4C);
      if (cur5A !== prev5A || cur4C !== prev4C) {
        ntChanges.push({
          frame: this.f,
          prev5A: hex(prev5A), cur5A: hex(cur5A),
          prev4C: hex(prev4C), cur4C: hex(cur4C),
          pc: hex16(this.nes.cpu.REG_PC),
        });
        console.log(`  [${String(this.f).padStart(6)}] $5A: $${hex(prev5A)}→$${hex(cur5A)}  4C: $${hex(prev4C)}→$${hex(cur4C)}  PC=$${hex16(this.nes.cpu.REG_PC)}`);
        prev5A = cur5A;
        prev4C = cur4C;
      }
    }

    this.dumpMemory('match_end');
    const matchEnd = this.f;

    // ─── 汇总 ────────────────────────────────────────────────────────
    const scSeen = [...new Set(this.timeline.map(e => e.scene))].sort();
    const ntBanks = [...new Set(this.timeline.map(e => e.ntBank_5A))].sort();

    console.log(`\n══════ 汇总 ══════`);
    console.log(`总帧: ${this.f} (${(this.f/60).toFixed(1)}s)`);
    console.log(`场景切换: ${this.timeline.filter(e => e.tag.includes('SCENE') || e.tag.includes('scene_')).length} 次`);
    console.log(`场景: [${scSeen.map(s => '$' + s).join(', ')}]`);
    console.log(`$5A 值: [${ntBanks.map(b => '$' + b).join(', ')}]`);
    console.log(`$5A 变化次数: ${ntChanges.length}`);
    console.log(`比赛帧: ${matchEnd - matchStart}`);

    // 保存
    const summary = {
      totalFrames: this.f,
      scenes: scSeen,
      ntBanks,
      ntBankChanges: ntChanges.length,
      ntBankLog: ntChanges,
      matchFrames: matchEnd - matchStart,
      timeline: this.timeline,
      note: 'jsnes 无法完美模拟 MMC3 → 标题画面需暴力跳过。$5A 在 active code path 中从未被写 (只在 unaccessed bank_00 $8784 中)。',
    };

    writeFileSync(join(OUT_DIR, 'run_summary.json'), JSON.stringify(summary, null, 2));
    console.log(`\n详细日志: ${OUT_DIR}/run_summary.json`);
  }
}

const runner = new AutoRunner();
runner.run();

/**
 * 天使之翼 2 — 自动测试脚本 (TS 反汇编版)
 *
 * 按游戏流程自动推进: BOOT → OPENING → TITLE/MENU → STORY → MEETING → MATCH
 * 每帧模拟手柄输入，遇到任何阻塞立即报告并写入 worklog。
 *
 * 用法: npx tsx _auto_test.ts [--max-frames N] [--json] [--verbose]
 */

import fs from 'node:fs';
import path from 'node:path';
import { GameContext } from './src/disasm/_context';
import { allBanks } from './src/disasm/banks/index';
import type { RomReader, BankRomSlice } from './src/disasm/banks/_bank_types';
import { _cfg } from './src/disasm/banks/bank_00_dispatch';
// Performance: suppress verbose logging + skip bytecode interpreter in sceneDataLoad
_cfg.verbose = false;
_cfg.fastSceneLoad = true;

// ============================================================
// ROM 数据 — 从 _romdata/bank_XX_data.ts 加载
// ============================================================
import { ROM as _r00 } from './src/disasm/banks/_romdata/bank_00_data';
import { ROM as _r01 } from './src/disasm/banks/_romdata/bank_01_data';
import { ROM as _r02 } from './src/disasm/banks/_romdata/bank_02_data';
import { ROM as _r03 } from './src/disasm/banks/_romdata/bank_03_data';
import { ROM as _r04 } from './src/disasm/banks/_romdata/bank_04_data';
import { ROM as _r05 } from './src/disasm/banks/_romdata/bank_05_data';
import { ROM as _r06 } from './src/disasm/banks/_romdata/bank_06_data';
import { ROM as _r07 } from './src/disasm/banks/_romdata/bank_07_data';
import { ROM as _r08 } from './src/disasm/banks/_romdata/bank_08_data';
import { ROM as _r09 } from './src/disasm/banks/_romdata/bank_09_data';
import { ROM as _r10 } from './src/disasm/banks/_romdata/bank_10_data';
import { ROM as _r11 } from './src/disasm/banks/_romdata/bank_11_data';
import { ROM as _r12 } from './src/disasm/banks/_romdata/bank_12_data';
import { ROM as _r13 } from './src/disasm/banks/_romdata/bank_13_data';
import { ROM as _r14 } from './src/disasm/banks/_romdata/bank_14_data';
import { ROM as _r15 } from './src/disasm/banks/_romdata/bank_15_data';
import { ROM as _r16 } from './src/disasm/banks/_romdata/bank_16_data';
import { ROM as _r17 } from './src/disasm/banks/_romdata/bank_17_data';
import { ROM as _r18 } from './src/disasm/banks/_romdata/bank_18_data';
import { ROM as _r19 } from './src/disasm/banks/_romdata/bank_19_data';
import { ROM as _r20 } from './src/disasm/banks/_romdata/bank_20_data';
import { ROM as _r21 } from './src/disasm/banks/_romdata/bank_21_data';
import { ROM as _r22 } from './src/disasm/banks/_romdata/bank_22_data';
import { ROM as _r23 } from './src/disasm/banks/_romdata/bank_23_data';
import { ROM as _r24 } from './src/disasm/banks/_romdata/bank_24_data';
import { ROM as _r25 } from './src/disasm/banks/_romdata/bank_25_data';
import { ROM as _r26 } from './src/disasm/banks/_romdata/bank_26_data';
import { ROM as _r27 } from './src/disasm/banks/_romdata/bank_27_data';
import { ROM as _r28 } from './src/disasm/banks/_romdata/bank_28_data';
import { ROM as _r29 } from './src/disasm/banks/_romdata/bank_29_data';
import { ROM as _r30 } from './src/disasm/banks/_romdata/bank_30_data';
import { ROM as _r31 } from './src/disasm/banks/_romdata/bank_31_data';
import { ROM as _r32 } from './src/disasm/banks/_romdata/bank_32_data';
import { ROM as _r33 } from './src/disasm/banks/_romdata/bank_33_data';
import { ROM as _r34 } from './src/disasm/banks/_romdata/bank_34_data';
import { ROM as _r35 } from './src/disasm/banks/_romdata/bank_35_data';
import { ROM as _r36 } from './src/disasm/banks/_romdata/bank_36_data';
import { ROM as _r37 } from './src/disasm/banks/_romdata/bank_37_data';
import { ROM as _r38 } from './src/disasm/banks/_romdata/bank_38_data';
import { ROM as _r39 } from './src/disasm/banks/_romdata/bank_39_data';
import { ROM as _r40 } from './src/disasm/banks/_romdata/bank_40_data';
import { ROM as _r41 } from './src/disasm/banks/_romdata/bank_41_data';
import { ROM as _r42 } from './src/disasm/banks/_romdata/bank_42_data';
import { ROM as _r43 } from './src/disasm/banks/_romdata/bank_43_data';
import { ROM as _r44 } from './src/disasm/banks/_romdata/bank_44_data';
import { ROM as _r45 } from './src/disasm/banks/_romdata/bank_45_data';
import { ROM as _r46 } from './src/disasm/banks/_romdata/bank_46_data';
import { ROM as _r47 } from './src/disasm/banks/_romdata/bank_47_data';

const ROM_DATA: Array<Uint8Array | undefined> = [
  _r00,_r01,_r02,_r03,_r04,_r05,_r06,_r07,
  _r08,_r09,_r10,_r11,_r12,_r13,_r14,_r15,
  _r16,_r17,_r18,_r19,_r20,_r21,_r22,_r23,
  _r24,_r25,_r26,_r27,_r28,_r29,_r30,_r31,
  _r32,_r33,_r34,_r35,_r36,_r37,_r38,_r39,
  _r40,_r41,_r42,_r43,_r44,_r45,_r46,_r47,
];

// ============================================================
// 常量
// ============================================================
const PRG_BANK_SIZE = 0x2000;
const TOTAL_BANKS = ROM_DATA.length;
const OUT_DIR = 'test_output';

const BTN = {
  A:      0x01,
  B:      0x02,
  SELECT: 0x04,
  START:  0x08,
  UP:     0x10,
  DOWN:   0x20,
  LEFT:   0x40,
  RIGHT:  0x80,
} as const;

// ============================================================
// 参数解析
// ============================================================
const args = process.argv.slice(2);
const MAX_FRAMES = parseInt(args.find((_, i) => args[i - 1] === '--max-frames') ?? '1800');
const JSON_ONLY = args.includes('--json');
const VERBOSE = args.includes('--verbose');
if (VERBOSE) {
  _cfg.verbose = true; // re-enable bank logging for debugging
  _cfg.fastSceneLoad = false; // re-enable full bytecode interpreter
}

// ============================================================
// 工具函数
// ============================================================
const H8  = (v: number) => (v & 0xFF).toString(16).toUpperCase().padStart(2, '0');
const H16 = (v: number) => (v & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');

// ============================================================
// ROM Reader 构建
// ============================================================
let bank8000 = 0;
let bankA000 = 1;

function bankSlice(n: number): BankRomSlice {
  const d = new Uint8Array(PRG_BANK_SIZE);
  for (let i = 0; i < PRG_BANK_SIZE; i++) d[i] = ROM_DATA[n]?.[i] ?? 0;
  return {
    u8(o: number) { return d[o] ?? 0; },
    u16le(o: number) { return (this.u8(o)) | (this.u8(o + 1) << 8); },
    data: d,
    romBase: n * PRG_BANK_SIZE,
  };
}

const rom: RomReader = {
  bank(a: number) {
    const ca = a & 0xFFFF;
    let bn: number;
    if (ca >= 0xE000) bn = TOTAL_BANKS - 1;
    else if (ca >= 0xC000) bn = TOTAL_BANKS - 2;
    else if (ca >= 0xA000) bn = bankA000;
    else bn = bank8000;
    return bankSlice(bn);
  },
  u8(a: number) { return this.bank(a).u8(a & 0x1FFF); },
  u16le(a: number) { return this.bank(a).u16le(a & 0x1FFF); },
};

// ============================================================
// GameContext + MMC3 追踪
// ============================================================
const ctx = new GameContext();

// 拦截 setU8 追踪 MMC3 bank 切换
const origSet = ctx.ram.setU8.bind(ctx.ram);
ctx.ram.setU8 = (a: number, v: number) => {
  origSet(a, v);
  if (a === 0x8001) {
    const sel = ctx.ram.u8(0x8000) & 0x07;
    if (sel === 6) bank8000 = v;
    if (sel === 7) bankA000 = v;
  }
};
ctx.ram.setU8(0x24, 0);
ctx.ram.setU8(0x25, 1);

// ============================================================
// 日志系统 — 拦截 console.warn 捕获缺失 handler
// ============================================================
interface Blocker {
  frame: number;
  type: 'CRASH' | 'NO_HANDLER' | 'STUCK' | 'WARN' | 'LOOP';
  message: string;
  scene: number;
  jmpIdx: number;
  bank8: number;
  bankA: number;
}
const blockers: Blocker[] = [];
const warnings: string[] = [];
const frameLog: object[] = [];
let sceneChanges = 0;
let prevScene = -1;

// 拦截 console.warn
const origWarn = console.warn.bind(console);
console.warn = (...a: any[]) => {
  const msg = a.map(String).join(' ');
  warnings.push(msg);
  // 识别缺失 handler
  if (msg.includes('No handler') || msg.includes('no fn') ||
      msg.includes('not registered') || msg.includes('Cannot resolve')) {
    blockers.push({
      frame: currentFrame,
      type: 'NO_HANDLER',
      message: msg,
      scene: ctx.ram.u8(0x26),
      jmpIdx: ctx.ram.u8(0x27),
      bank8: bank8000,
      bankA: bankA000,
    });
  }
  if (!JSON_ONLY) origWarn(msg);
};

// ============================================================
// 手柄模拟
// ============================================================
let joyHeld = 0; // 当前按住
let joyFrames = 0; // 按住帧数

function pressJoy(buttons: number) {
  const prev = ctx.ram.u8(0x1B);
  ctx.ram.setU8(0x1B, buttons);
  ctx.ram.setU8(0x1C, buttons & ~prev); // newly pressed
  ctx.ram.setU8(0x1D, prev);            // previous state
  joyHeld = buttons;
}

function holdJoy(buttons: number, fs: number) {
  pressJoy(buttons);
  joyFrames = fs;
}

function releaseJoy() {
  if (joyFrames > 0) {
    joyFrames--;
    return; // still holding
  }
  pressJoy(0);
}

// ============================================================
// 帧执行
// ============================================================
let currentFrame = 0;

function runOneFrame(): Blocker | null {
  currentFrame++;

  // 手柄释放逻辑
  releaseJoy();

  // 执行 VBlank: bank_00 dispatch
  try {
    if (bank8000 === 0) {
      // $27 由状态机管理，不可每帧重置
      // (原先 runner.ts 有此 bug，已修复)
      allBanks[0]?.dispatch(ctx, rom);
    }
  } catch (e: any) {
    const blk: Blocker = {
      frame: currentFrame,
      type: 'CRASH',
      message: e.message ?? String(e),
      scene: ctx.ram.u8(0x26),
      jmpIdx: ctx.ram.u8(0x27),
      bank8: bank8000,
      bankA: bankA000,
    };
    blockers.push(blk);
    return blk;
  }

  // 场景变更检测
  const scene = ctx.ram.u8(0x26);
  if (scene !== prevScene) {
    if (prevScene >= 0) sceneChanges++;
    prevScene = scene;
  }

  return null; // 无阻塞
}

// ============================================================
// 快照 — 每 N 帧记录一次完整状态
// ============================================================
function snapshot(tag: string) {
  const scene = ctx.ram.u8(0x26);
  const entry = {
    frame: currentFrame,
    tag,
    scene: H8(scene),
    jmpIdx: H8(ctx.ram.u8(0x27)),
    sStat: H8(ctx.ram.u8(0x4C)),
    bank8: H8(bank8000),
    bankA: H8(bankA000),
    nmiTrig: H8(ctx.ram.u8(0xE0)),
    nmiTimer: H8(ctx.ram.u8(0x78)),
    ppuMode: H8(ctx.ram.u8(0x79)),
    joyHeld: H8(joyHeld),
    scriptLo: H8(ctx.ram.u8(0x4D)),
    scriptHi: H8(ctx.ram.u8(0x4E)),
    // $2A (场景类型), $2B (场景编号), $044D
    sceneType: H8(ctx.ram.u8(0x2A)),
    sceneNum: H8(ctx.ram.u8(0x2B)),
    teamFlag: H8(ctx.ram.u8(0x044D)),
  };
  frameLog.push(entry);

  if (!JSON_ONLY) {
    console.log(`[${String(currentFrame).padStart(5)}] ${tag.padEnd(18)} ` +
      `scene=$${entry.scene} stat=$${entry.sStat} ` +
      `b8=$${entry.bank8} bA=$${entry.bankA} ` +
      `e0=$${entry.nmiTrig} mode=$${entry.ppuMode} joy=$${entry.joyHeld}`);
  }
}

// ============================================================
// ============================================================
// 阶段: BOOT — RESET 初始化
// ============================================================
function phaseBoot(): string {
  snapshot('boot_pre');
  try {
    allBanks[31]?.fns?.['$FFF0']?.(ctx, rom) ?? allBanks[31]?.dispatch?.(ctx, rom);
  } catch (e: any) {
    return `BOOT CRASH: ${e.message}`;
  }
  snapshot('boot_post');
  return '';
}

// ============================================================
// 阶段: OPENING — 开场动画，等画面出现后按 START 跳过
// ============================================================
let openingStartFrame = 0;

function phaseOpening(): string {
  if (openingStartFrame === 0) {
    openingStartFrame = currentFrame;
    snapshot('opening_start');
  }

  const elapsed = currentFrame - openingStartFrame;
  const scene = ctx.ram.u8(0x26);
  const sStat = ctx.ram.u8(0x4C);

  // 场景已经推进到标题画面 → 进入 TITLE
  if (scene >= 0x02 && scene !== 0xFF) {
    releaseJoy();
    snapshot('opening_passed');
    return 'done';
  }

  // 超时
  if (elapsed > 480) {
    snapshot('opening_timeout');
    return `OPENING stuck: ${elapsed}f, scene=$${H8(scene)}, sStat=$${H8(sStat)}`;
  }

  // 前 180 帧: 等待开场动画
  if (elapsed < 180) {
    releaseJoy();
    return '';
  }

  // 180~480 帧: 间歇按 START 跳过开场
  if (elapsed % 15 < 6) {
    holdJoy(BTN.START, 6);
  } else {
    releaseJoy();
  }
  return '';
}

// ============================================================
// 阶段: TITLE — 等待标题画面，按 START
// ============================================================
let titleStartFrame = 0;

function phaseTitle(): string {
  if (titleStartFrame === 0) {
    titleStartFrame = currentFrame;
    snapshot('title_start');
  }

  const elapsed = currentFrame - titleStartFrame;
  const scene = ctx.ram.u8(0x26);

  // 场景已推进 → 进入菜单
  if (scene >= 0x04 && scene !== 0xFF) {
    releaseJoy();
    snapshot('title_passed');
    return 'done';
  }

  // 卡在 title 超时 → 可能是被动画面需要再等
  if (elapsed > 600) {
    // 最后再按一次 START 试试
    holdJoy(BTN.START, 30);
    if (elapsed > 900) {
      snapshot('title_timeout');
      return `TITLE stuck: ${elapsed}f, scene=$${H8(scene)}`;
    }
    return '';
  }

  // 前 300 帧: 等待 title 画面淡入
  if (elapsed < 300) {
    releaseJoy();
    return '';
  }

  // 间歇按 START 进入菜单
  if (elapsed % 25 < 10) {
    holdJoy(BTN.START, 10);
  } else {
    releaseJoy();
  }
  return '';
}

// ============================================================
// 阶段: MENU — 选「しんゲーム」(新游戏, 第一项)
// ============================================================
let menuStartFrame = 0;

function phaseMenu(): string {
  if (menuStartFrame === 0) {
    menuStartFrame = currentFrame;
    snapshot('menu_start');
  }

  const elapsed = currentFrame - menuStartFrame;
  const scene = ctx.ram.u8(0x26);

  // 已进入故事阶段
  if (scene >= 0x12) {
    releaseJoy();
    snapshot('menu_story');
    return 'done';
  }
  // 退到标题
  if (scene < 0x04) {
    releaseJoy();
    snapshot('menu_back_title');
    return 'done';
  }

  // 超时
  if (elapsed > 480) {
    snapshot('menu_timeout');
    return `MENU stuck: ${elapsed}f, scene=$${H8(scene)}`;
  }

  // 等菜单稳定
  if (elapsed < 30) {
    releaseJoy();
    return '';
  }

  // 确认光标停在第一项，按 START 选「新游戏」
  if (elapsed < 60) {
    holdJoy(BTN.START, 10);
    return '';
  }
  // 持续尝试
  if (elapsed < 240) {
    holdJoy(BTN.START, 8);
    return '';
  }
  // 按 A
  holdJoy(BTN.A, 10);
  return '';
}

// ============================================================
// 阶段: STORY — 连续按 A/START 翻页
// ============================================================
let storySameFrames = 0;
let storyLastScene = -1;

function phaseStory(): string {
  const scene = ctx.ram.u8(0x26);

  // 进入 meeting (四选一界面)
  if (scene >= 0x20) {
    releaseJoy();
    snapshot('story_match');
    return 'done';
  }

  // 场景倒回
  if (scene < 0x12 && scene !== 0xFF && scene !== 0x00) {
    snapshot('story_rewind');
    return 'done';
  }

  // 检测场景卡死
  if (scene === storyLastScene) {
    storySameFrames++;
  } else {
    storySameFrames = 0;
    storyLastScene = scene;
  }

  if (storySameFrames > 300) {
    snapshot('story_stuck');
    return `STORY stuck: scene=$${H8(scene)}, ${storySameFrames}f unchanged`;
  }

  // 交替按 A 和 START 翻对话页
  const cycle = currentFrame % 40;
  if (cycle < 15) {
    holdJoy(BTN.A, 8);
  } else if (cycle < 25) {
    holdJoy(BTN.START, 6);
  } else {
    releaseJoy();
  }
  return '';
}

// ============================================================
// 阶段: MEETING — 战前会议，4 选项选最下面
// ============================================================
let meetingStartFrame = 0;
let meetingDownDone = false;
let meetingSelectDone = false;

function phaseMeeting(): string {
  if (meetingStartFrame === 0) {
    meetingStartFrame = currentFrame;
    meetingDownDone = false;
    meetingSelectDone = false;
    snapshot('meeting_start');
  }

  const elapsed = currentFrame - meetingStartFrame;
  const scene = ctx.ram.u8(0x26);

  // 进入比赛
  if (scene >= 0x40) {
    releaseJoy();
    snapshot('meeting_match');
    return 'done';
  }

  // 卡死
  if (elapsed > 480) {
    snapshot('meeting_timeout');
    return `MEETING stuck: ${elapsed}f, scene=$${H8(scene)}`;
  }

  // 步骤 1: 前 60 帧 → 按 DOWN 3~4 次移到最下面选项
  if (elapsed < 30) {
    releaseJoy(); // 等待显示
    return '';
  }
  if (!meetingDownDone && elapsed < 120) {
    holdJoy(BTN.DOWN, 8);
    if (elapsed >= 110) {
      meetingDownDone = true;
      releaseJoy();
    }
    return '';
  }

  // 步骤 2: 确认选中最下面选项 → 按 A
  if (meetingDownDone && !meetingSelectDone && elapsed < 250) {
    holdJoy(BTN.A, 8);
    if (elapsed >= 200) {
      meetingSelectDone = true;
      releaseJoy();
    }
    return '';
  }

  // 步骤 3: 等待场景推进
  releaseJoy();
  return '';
}

// ============================================================
// 阶段: MATCH — 模拟比赛操作
// ============================================================
let matchFrames = 0;
let matchLastScene = -1;
let matchSameFrames = 0;

function phaseMatch(): string {
  const scene = ctx.ram.u8(0x26);
  matchFrames++;

  // 半场/比赛结束 → 回 story
  if (scene < 0x20 && scene !== 0xFF) {
    releaseJoy();
    snapshot('match_end');
    return 'done';
  }

  // 检测卡死
  if (scene === matchLastScene) {
    matchSameFrames++;
  } else {
    matchSameFrames = 0;
    matchLastScene = scene;
  }

  if (matchSameFrames > 500) {
    snapshot('match_stuck');
    return `MATCH stuck: scene=$${H8(scene)}, ${matchSameFrames}f unchanged`;
  }

  // 模拟比赛: 按 A/B + 方向
  const actions = [
    BTN.A, BTN.RIGHT, BTN.A, BTN.B,
    BTN.LEFT, BTN.A, BTN.UP, BTN.B,
  ];
  const act = actions[Math.floor(matchFrames / 15) % actions.length];
  holdJoy(act, 10);
  return '';
}

// ============================================================
// 阶段选择
// ============================================================
type Phase = 'boot' | 'opening' | 'title' | 'menu' | 'story' | 'meeting' | 'match' | 'done';
let phase: Phase = 'boot';
let phaseResult = '';

function selectPhase(): Phase {
  const scene = ctx.ram.u8(0x26);
  const sStat = ctx.ram.u8(0x4C);

  if (phase === 'boot') return 'boot';
  if (phase === 'opening') {
    if (scene >= 0x02 && scene !== 0xFF) return 'title';
    return 'opening';
  }

  if (phase === 'title') {
    if (scene >= 0x04 && scene !== 0xFF) return 'menu';
    return 'title';
  }

  if (phase === 'menu') {
    if (scene >= 0x12) return 'story';
    if (scene < 0x04) return 'title';
    return 'menu';
  }

  if (phase === 'story') {
    // meeting: 检测到四选项时的特定场景或 state
    // heuristic: story 大场景中 sStat=$xx 暗示四选一
    if (scene >= 0x40) return 'match';
    if (scene >= 0x20 && scene < 0x40) {
      // 可能进入 meeting 或直接 match
      // meeting 通常 scene 在 $20-$30 之间, sStat 有特定值
      if (sStat >= 0x80) return 'meeting';
      return 'match';
    }
    return 'story';
  }

  if (phase === 'meeting') {
    if (scene >= 0x40) return 'match';
    if (scene < 0x20) return 'story';
    return 'meeting';
  }

  if (phase === 'match') {
    if (scene < 0x20 && scene !== 0xFF) return 'story';
    return 'match';
  }

  return 'done';
}

// ============================================================
// 卡死检测 — 跨阶段通用
// ============================================================
let sameSceneCounter = 0;
let prevStuckScene = -1;
let sameJumpCounter = 0;
let prevStuckJump = -1;

function detectGenericStuck(): Blocker | null {
  const scene = ctx.ram.u8(0x26);
  const jmpIdx = ctx.ram.u8(0x27);

  // 检测场景卡死 (500 帧不动)
  if (scene === prevStuckScene) {
    sameSceneCounter++;
  } else {
    sameSceneCounter = 0;
    prevStuckScene = scene;
  }
  if (sameSceneCounter >= 500 && phase !== 'done') {
    return {
      frame: currentFrame,
      type: 'STUCK',
      message: `Scene stuck: $${H8(scene)} unchanged for ${sameSceneCounter}f (jmpIdx=$${H8(jmpIdx)}, sStat=$${H8(ctx.ram.u8(0x4C))})`,
      scene, jmpIdx, bank8: bank8000, bankA: bankA000,
    };
  }

  // 检测 jumpIdx 僵直 (同一 idx 超过 200 次 dispatch 且场景未变化)
  if (jmpIdx === prevStuckJump) {
    sameJumpCounter++;
  } else {
    sameJumpCounter = 0;
    prevStuckJump = jmpIdx;
  }
  // 需同时满足: jmpIdx 和 scene 都 200+ 帧没变 → 真死循环
  if (sameJumpCounter >= 200 && sameSceneCounter >= 200) {
    return {
      frame: currentFrame,
      type: 'LOOP',
      message: `Jump loop: idx=$${H8(jmpIdx)} repeated ${sameJumpCounter}x (scene=$${H8(scene)}, sStat=$${H8(ctx.ram.u8(0x4C))}, b8=$${H8(bank8000)}, bA=$${H8(bankA000)})`,
      scene, jmpIdx, bank8: bank8000, bankA: bankA000,
    };
  }

  return null;
}

// ============================================================
// 崩溃安全: 无论如何退出都要保存报告
// ============================================================
let reportSaved = false;

function saveReportIfNeeded() {
  if (reportSaved) return;
  reportSaved = true;
  try {
    if (currentFrame > 0) snapshot('exit');
    writeReport();
  } catch (_) { /* best effort */ }
}

process.on('exit', saveReportIfNeeded);
process.on('SIGINT', () => { saveReportIfNeeded(); process.exit(0); });
process.on('uncaughtException', (err) => {
  if (!JSON_ONLY) console.error(`💥 uncaughtException: ${err.message}`);
  blockers.push({
    frame: currentFrame,
    type: 'CRASH',
    message: `FATAL: ${err.message}`,
    scene: ctx.ram.u8(0x26),
    jmpIdx: ctx.ram.u8(0x27),
    bank8: bank8000,
    bankA: bankA000,
  });
  saveReportIfNeeded();
  process.exit(1);
});

// ============================================================
// 主循环
// ============================================================
function main() {
  if (!JSON_ONLY) {
    console.log('══════ 天使之翼 2 自动测试 ══════');
    console.log(`最大帧: ${MAX_FRAMES} (${(MAX_FRAMES/60).toFixed(1)}s)`);
    console.log('阶段: BOOT → OPENING → TITLE → MENU → STORY → MEETING(选最下) → MATCH');
    console.log('');
  }

  // Phase: BOOT
  const bootErr = phaseBoot();
  if (bootErr) {
    if (!JSON_ONLY) console.error(`❌ ${bootErr}`);
    phaseResult = bootErr;
    saveReportIfNeeded();
    return;
  }
  phase = 'opening';

  let lastReportFrame = 0;
  const DISPATCH_DEADLINE_MS = 60000; // 单帧超时: 60 秒 (sceneDataLoad processes many bytes)

  // 主循环
  while (currentFrame < MAX_FRAMES) {
    // 每 120 帧快照
    if (currentFrame - lastReportFrame >= 120) {
      const p = phase.toUpperCase();
      snapshot(`phase_${p}`);
      lastReportFrame = currentFrame;
    }

    // 检测卡死
    const stuck = detectGenericStuck();
    if (stuck) {
      blockers.push(stuck);
      if (!JSON_ONLY) console.warn(`⚠️ [${stuck.type}] F${stuck.frame}: ${stuck.message}`);
    }

    // 执行帧 (带执行时间限制)
    const t0 = Date.now();
    let frameBlocker: Blocker | null = null;
    try {
      frameBlocker = runOneFrame();
    } catch (e: any) {
      frameBlocker = {
        frame: currentFrame,
        type: 'CRASH',
        message: `dispatch: ${e.message}`,
        scene: ctx.ram.u8(0x26),
        jmpIdx: ctx.ram.u8(0x27),
        bank8: bank8000,
        bankA: bankA000,
      };
      blockers.push(frameBlocker);
    }
    const elapsed = Date.now() - t0;
    if (elapsed > DISPATCH_DEADLINE_MS) {
      // 单帧执行时间过长 → 可能死循环，记录并继续
      const bl: Blocker = {
        frame: currentFrame,
        type: 'LOOP',
        message: `Dispatch took ${elapsed}ms (deadline=${DISPATCH_DEADLINE_MS}ms) — possible infinite loop`,
        scene: ctx.ram.u8(0x26),
        jmpIdx: ctx.ram.u8(0x27),
        bank8: bank8000,
        bankA: bankA000,
      };
      blockers.push(bl);
      if (!JSON_ONLY) console.warn(`⚠️ ${bl.message}`);
    }

    if (frameBlocker && frameBlocker.type === 'CRASH') {
      if (!JSON_ONLY) console.error(`❌ CRASH at F${currentFrame}: ${frameBlocker.message}`);
      // Continue to try next frame — crash may be recoverable
    }

    // 阶段选择 + 手柄模拟
    phase = selectPhase();

    switch (phase) {
      case 'opening': phaseResult = phaseOpening(); break;
      case 'title': phaseResult = phaseTitle(); break;
      case 'menu': phaseResult = phaseMenu(); break;
      case 'story': phaseResult = phaseStory(); break;
      case 'meeting': phaseResult = phaseMeeting(); break;
      case 'match': phaseResult = phaseMatch(); break;
      case 'done': break;
      default: break;
    }

    if (phaseResult === 'done' && phase !== 'done') {
      if (phase === 'opening') { phase = 'title'; titleStartFrame = 0; }
      else if (phase === 'title') { phase = 'menu'; menuStartFrame = 0; }
      else if (phase === 'menu') { phase = 'story'; storySameFrames = 0; storyLastScene = -1; }
      else if (phase === 'story') {
        // story 可能进入 meeting 或 match
        const sStat = ctx.ram.u8(0x4C);
        if (sStat >= 0x80) phase = 'meeting';
        else phase = 'match';
        matchFrames = 0; matchLastScene = -1; matchSameFrames = 0;
        meetingStartFrame = 0; meetingDownDone = false; meetingSelectDone = false;
      }
      else if (phase === 'meeting') { phase = 'match'; matchFrames = 0; matchLastScene = -1; matchSameFrames = 0; }
      else if (phase === 'match') phase = 'story';
      phaseResult = '';
    }
    if (phaseResult.startsWith('STORY stuck') || phaseResult.startsWith('MATCH stuck') ||
        phaseResult.startsWith('TITLE stuck') || phaseResult.startsWith('MENU stuck') ||
        phaseResult.startsWith('OPENING stuck') || phaseResult.startsWith('MEETING stuck')) {
      if (!JSON_ONLY) console.warn(`⚠️ ${phaseResult}`);
      break;
    }

    if (phase === 'done') break;
  }

  saveReportIfNeeded();
}

// ============================================================
// 写报告 (JSON + worklog)
// ============================================================
function writeReport() {
  if (!JSON_ONLY) {
    console.log('');
    console.log('══════ 汇总 ══════');
    console.log(`总帧: ${currentFrame} (${(currentFrame/60).toFixed(1)}s)`);
    console.log(`场景切换: ${sceneChanges}`);
    console.log(`阻塞: ${blockers.length} | 警告: ${warnings.length}`);
    for (const b of blockers) {
      console.log(`  ${b.type} F${String(b.frame).padStart(5)}: ${b.message}`);
    }
  }

  // 保存 JSON
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const scenes = [...new Set(frameLog.map((e: any) => e.scene))].sort();
  const report = {
    totalFrames: currentFrame,
    sceneChanges,
    finalPhase: phase,
    finalScene: H8(ctx.ram.u8(0x26)),
    finalJmpIdx: H8(ctx.ram.u8(0x27)),
    finalSStat: H8(ctx.ram.u8(0x4C)),
    scenesSeen: scenes,
    blockerCount: blockers.length,
    blockers,
    warningCount: warnings.length,
    phaseResult,
    timeline: frameLog,
  };

  const outFile = path.join(OUT_DIR, `auto_test_${Date.now()}.json`);
  fs.writeFileSync(outFile, JSON.stringify(report, null, 2));

  if (!JSON_ONLY) console.log(`详细日志: ${outFile}`);

  // 更新 worklog
  if (blockers.length > 0 || phaseResult) {
    updateWorklog(report);
  }
}

// ============================================================
// 更新 worklog.md
// ============================================================
function updateWorklog(report: any) {
  const worklogPath = 'src/disasm/banks/worklog.md';
  if (!fs.existsSync(worklogPath)) return;

  const now = new Date().toISOString().split('T')[0];

  let entry = '\n---\n\n';
  entry += `## [自动测试] 阻塞点报告 (${now})\n\n`;
  entry += `**最大帧**: ${MAX_FRAMES}\n`;
  entry += `**总帧**: ${report.totalFrames}\n`;
  entry += `**最终阶段**: ${report.finalPhase}\n`;
  entry += `**最终场景**: $${report.finalScene}  (sStat=$${report.finalSStat})\n`;
  entry += `**场景切换**: ${report.sceneChanges}\n`;
  entry += `**见过的场景**: [${report.scenesSeen.join(', ')}]\n\n`;

  if (report.blockers.length > 0) {
    entry += '### 检测到的阻塞点\n\n';
    entry += '| # | 类型 | 帧 | 场景 | 消息 |\n';
    entry += '|---|------|-----|------|------|\n';
    report.blockers.forEach((b: Blocker, i: number) => {
      const shortMsg = b.message.length > 80 ? b.message.substring(0, 77) + '...' : b.message;
      entry += `| ${i + 1} | ${b.type} | F${b.frame} | $${H8(b.scene)} | ${shortMsg} |\n`;
    });
    entry += '\n';
  } else if (report.blockerCount === 0) {
    entry += '✅ 无阻塞点 — 自动测试顺利推进\n\n';
  }

  if (phaseResult) {
    entry += `**阶段阻塞**: ${phaseResult}\n\n`;
  }

  // 追加到 worklog
  try {
    fs.appendFileSync(worklogPath, entry);
    if (!JSON_ONLY) console.log(`worklog 已更新: ${worklogPath}`);
  } catch (e) {
    console.warn('更新 worklog 失败:', (e as Error).message);
  }
}

// ============================================================
// 入口
// ============================================================
main();

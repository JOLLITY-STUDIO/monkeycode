/**
 * 交互式命令行 — 按键操控 Tsubasa NES 模拟器
 *
 * 帧始终自动跑，不受按键约束。
 * 命令:
 *   x/z/g/f/w/a/s/d            — 单键短按
 *   hold <wasd>                — 按住方向持续移动（球员移动专用），回车停止
 *   n / step                   — 打印一帧+info
 *   st (state) / i (info)      — 查看状态/阵型
 *   dump / save [name]         — 数据 dump
 *   ram [ADDR [LEN]]           — 查看 RAM
 *   press <key> [N]            — 按住直到场景变化
 *   help, q
 *
 * 运行: npx tsx _play.ts
 */

import * as readline from 'readline';
import * as fs from 'fs';
import { TsubasaNes } from './src/tsnes/tsubasa-code/tsubasa_nes';

// ============================================================
// Button name → ID 映射
// ============================================================
const BTN: Record<string, number> = {
  // 按钮
  x: 0, z: 1, f: 2, g: 3,
  // 方向
  w: 4, s: 5, a: 6, d: 7,
  // 全称别名 (用于 p/h 命令)
  select: 2, start: 3,
  up: 4, down: 5, left: 6, right: 7,
};

// ============================================================
// 初始化模拟器
// ============================================================
let frameCount = 0;
const nes = new TsubasaNes({ onFrame() {}, emulateSound: false });

function getMem(): Uint8Array {
  return (nes as any).cpu.mem;
}

function hex(v: number, pad = 2): string {
  return v.toString(16).toUpperCase().padStart(pad, '0');
}

// ============================================================
// 按钮持久状态 + 自动跑帧
// ============================================================
const held: Set<number> = new Set();
let _autoTimer: ReturnType<typeof setTimeout> | null = null;

function releaseAll() {
  for (let i = 0; i < 8; i++) {
    nes.controllers[1].state[i] = 0x40; // 0x40 = released
  }
}

function applyHeld() {
  for (const btn of held) {
    nes.controllers[1].state[btn] = 0x41; // 0x41 = pressed
  }
}

function clearHeld() {
  held.clear();
  releaseAll();
}

function doAutoFrame() {
  _autoTimer = setTimeout(() => {
    releaseAll();
    applyHeld();
    nes.frame();
    frameCount++;
    _autoTimer = null;
    doAutoFrame();
  }, 8); // ~120fps 保证流畅
}

function startAutoRun() {
  if (_autoTimer) return;
  doAutoFrame();
}

function stopAutoRun() {
  if (_autoTimer) {
    clearTimeout(_autoTimer);
    _autoTimer = null;
  }
}

// ============================================================
// 帧运行
// ============================================================
let _lastScene = -1;
let _lastMenuState = -1;
let _lastDispatch = -1;

function _updateWatch() {
  const m = getMem();
  _lastScene = m[0x26];
  _lastMenuState = m[0x4C];
  _lastDispatch = m[0x27];
}

function _checkWatch() {
  const m = getMem();
  const scene = m[0x26];
  const menu = m[0x4C];
  const disp = m[0x27];
  const changes: string[] = [];
  if (scene !== _lastScene) changes.push(`$26: ${hex(_lastScene)}→${hex(scene)}`);
  if (menu !== _lastMenuState) changes.push(`$4C: ${hex(_lastMenuState)}→${hex(menu)}`);
  if (disp !== _lastDispatch) changes.push(`$27: ${_lastDispatch}→${disp}`);
  _lastScene = scene;
  _lastMenuState = menu;
  _lastDispatch = disp;
  if (changes.length > 0) {
    const tag = scene >= 0x10 ? '[MATCH]' : scene > 0 ? '[MENU]' : '[TITLE]';
    logLine(`>>> [frame ${frameCount}] ${tag} ${changes.join(', ')}`);
  }
}

// 停自动跑帧后手动跑一帧
function tickOne() {
  releaseAll();
  applyHeld();
  nes.frame();
  frameCount++;
  _checkWatch();
}

// 短按: 按下 holdFrames 帧, 释放再跑几帧
function tap(btn: number, holdFrames = 12) {
  // 暂停自动跑，手动推帧
  stopAutoRun();
  releaseAll();
  applyHeld();
  nes.controllers[1].buttonDown(btn as any);
  for (let i = 0; i < holdFrames; i++) {
    nes.frame(); frameCount++;
    _checkWatch();
  }
  nes.controllers[1].buttonUp(btn as any);
  for (let i = 0; i < 8; i++) {
    releaseAll(); applyHeld();
    nes.frame(); frameCount++;
    _checkWatch();
  }
  // 恢复自动跑
  startAutoRun();
}

// press: 按住直到场景变化
function press(btn: number, totalFrames: number) {
  stopAutoRun();
  const name = Object.keys(BTN).find(k => BTN[k] === btn) || '?';
  const startScene = getMem()[0x26];
  logLine(`  pressing ${name} for up to ${totalFrames}f...`);

  releaseAll();
  applyHeld();
  nes.controllers[1].buttonDown(btn as any);
  for (let i = 0; i < totalFrames; i++) {
    nes.frame(); frameCount++;
    const scene = getMem()[0x26];
    if (scene !== startScene) {
      _checkWatch();
      logLine(`  stopped at change (frame ${frameCount})`);
      break;
    }
    _checkWatch();
  }
  nes.controllers[1].buttonUp(btn as any);
  for (let i = 0; i < 8; i++) {
    releaseAll(); applyHeld();
    nes.frame(); frameCount++;
    _checkWatch();
  }
  showState();
  startAutoRun();
}

// ============================================================
// 日志文件
// ============================================================
const LOG_FILE = '_play_log.txt';
fs.writeFileSync(LOG_FILE, ''); // 清空

function logLine(s: string) {
  console.log(s);
  fs.appendFileSync(LOG_FILE, s + '\n');
}

// ============================================================
// 信息 dump
// ============================================================
function showInfo() {
  const m = getMem();
  const scene = m[0x26];
  const dispatch = m[0x27];
  const stage = m[0x2B];
  const half = m[0x2A];
  const menuFlag = m[0x2C];
  const menuState = m[0x4C];

  logLine(
    `[frame:${frameCount}] scene=$26=${hex(scene)} dispatch=$27=${dispatch} ` +
    `stage=$2B=${stage} half=$2A=${half} menuFlag=$2C=${menuFlag} menuState=$4C=${hex(menuState)}`
  );

  // 阵型 RAM $0408-$042B
  let hasFmt = false;
  for (let i = 0; i < 10; i++) {
    const b = m[0x408 + i * 4];
    if (b !== 0) { hasFmt = true; break; }
  }
  if (hasFmt) {
    const fmt = [...Array(10)].map((_, i) => {
      const base = 0x408 + i * 4;
      return `${i}:${hex(m[base])}${hex(m[base + 1])}${hex(m[base + 2])}${hex(m[base + 3])}`;
    }).join(' ');
    logLine(`  formation $0408: ${fmt}`);
  } else {
    logLine(`  formation $0408: (empty)`);
  }

  // 球员首发
  let hasRoster = false;
  for (let i = 0; i < 11; i++) {
    if (m[0x300 + i * 12] !== 0) { hasRoster = true; break; }
  }
  if (hasRoster) {
    const roster = [...Array(11)].map((_, i) => {
      const b = 0x300 + i * 12;
      return `${i}:id=${hex(m[b])}`;
    }).join(' ');
    logLine(`  roster $0300: ${roster}`);
  }

  // 球员场上坐标
  let hasCoords = false;
  for (let i = 0; i < 20; i++) {
    if (m[0x446 + i * 3] !== 0) { hasCoords = true; break; }
  }
  if (hasCoords) {
    const coords = [...Array(11)].map((_, i) => {
      const b = 0x446 + i * 3;
      return `${i}:(${m[b]},${m[b + 1]},${m[b + 2]})`;
    }).join(' ');
    logLine(`  coords $0446: ${coords}`);
  }
}

function showRam(args: string[]) {
  const m = getMem();
  let addr = parseInt(args[0], 16);
  let len = args.length > 1 ? parseInt(args[1]) : 16;
  if (isNaN(addr) || isNaN(len)) {
    logLine('Usage: ram <ADDR_HEX> [LEN]');
    return;
  }
  const out: string[] = [];
  for (let i = 0; i < len; i++) {
    const a = addr + i;
    if (a < 0x800) {
      out.push(`${hex(a, 3)}=${hex(m[a])}`);
    }
  }
  logLine(out.join(' '));
}

function showState() {
  const m = getMem();
  logLine(`frame=${frameCount}`);
  logLine(`$26(scene)=${hex(m[0x26])} $27(dispatch)=${hex(m[0x27])}`);
  logLine(`$2A(half)=${hex(m[0x2A])} $2B(stage)=${hex(m[0x2B])} $2C(roster_flag)=${hex(m[0x2C])}`);
  logLine(`$4C(script_status)=${hex(m[0x4C])} $4D(script_ptr_lo)=${hex(m[0x4D])} $4E(script_ptr_hi)=${hex(m[0x4E])} $4F(script_row)=${hex(m[0x4F])}`);
  logLine(`held buttons: ${[...held].map(b => Object.keys(BTN).find(k => BTN[k] === b)).join(', ') || '(none)'}`);
}

/** 完整数据 dump → JSON 文件 */
function fullDump(): Record<string, any> {
  const m = getMem();
  const out: Record<string, any> = {
    frame: frameCount,
    scene_26: m[0x26],
    dispatch_27: m[0x27],
    half_2A: m[0x2A],
    stage_2B: m[0x2B],
    roster_flag_2C: m[0x2C],
    menu_state_4C: m[0x4C],
    // 阵型 $0408 - $042B (10 × 4 bytes)
    formation_0408: [] as number[][],
    // 首发 $0300 - $0383 (11 × 12 bytes)
    roster_0300: [] as number[][],
    // 场上坐标 $0446+ (11 × 3 bytes)
    player_coords_0446: [] as number[][],
    // 关键 ZP
    zp_00_2F: [] as number[],
    zp_4C_4F: [] as number[],
  };

  for (let i = 0; i < 10; i++) {
    const base = 0x408 + i * 4;
    out.formation_0408.push([m[base], m[base + 1], m[base + 2], m[base + 3]]);
  }
  for (let i = 0; i < 11; i++) {
    const base = 0x300 + i * 12;
    const p: number[] = [];
    for (let j = 0; j < 12; j++) p.push(m[base + j]);
    out.roster_0300.push(p);
  }
  for (let i = 0; i < 11; i++) {
    const base = 0x446 + i * 3;
    out.player_coords_0446.push([m[base], m[base + 1], m[base + 2]]);
  }
  for (let i = 0; i < 0x30; i++) out.zp_00_2F.push(m[i]);
  for (let i = 0x4C; i <= 0x4F; i++) out.zp_4C_4F.push(m[i]);

  return out;
}

function saveDump(filename?: string) {
  const fn = filename || '_play_dump';
  const path = `${fn}.json`;
  const data = fullDump();
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
  logLine(`\n>>> Dump saved to: ${path}`);
  // 也打印核心数据到控制台
  prettyPrint(data);
}

function prettyPrint(d: Record<string, any>) {
  logLine('');
  logLine('========== FULL DUMP ==========');
  logLine(`frame: ${d.frame}`);
  logLine(`scene=$26=${hex(d.scene_26)} dispatch=$27=${hex(d.dispatch_27)} half=$2A=${d.half_2A} stage=$2B=${d.stage_2B}`);
  logLine(`roster_flag=$2C=${d.roster_flag_2C} menu_state=$4C=${hex(d.menu_state_4C)}`);
  logLine(`ZP $00-$2F: ${d.zp_00_2F.map((v: number) => hex(v)).join(' ')}`);
  logLine(`ZP $4C-$4F: ${d.zp_4C_4F.map((v: number) => hex(v)).join(' ')}`);
  logLine('');
  logLine('--- Formation $0408 (10 entries, 4 bytes each: type,x,y,attr) ---');
  d.formation_0408.forEach((f: number[], i: number) => {
    logLine(`  [${i}] ${hex(f[0])} ${hex(f[1])} ${hex(f[2])} ${hex(f[3])}`);
  });
  logLine('');
  logLine('--- Roster $0300 (11 players, 12 bytes each) ---');
  d.roster_0300.forEach((p: number[], i: number) => {
    logLine(`  [${i}] player_id=${hex(p[0])} bytes: ${p.map((v: number) => hex(v)).join(' ')}`);
  });
  logLine('');
  logLine('--- Player Coords $0446 (11 × 3) ---');
  d.player_coords_0446.forEach((c: number[], i: number) => {
    logLine(`  [${i}] x=${c[0]} y=${c[1]} attr=${c[2]}`);
  });
  logLine('================================');
}

// ============================================================
// 命令处理
// ============================================================
function handleCmd(line: string): boolean {
  // 暂停自动跑帧，处理命令
  stopAutoRun();

  const trimmed = line.trim().toLowerCase();
  if (!trimmed) {
    // 回车 → 如果正在 hold 则释放
    if (held.size > 0) {
      clearHeld();
      logLine(`>>> hold released (frame ${frameCount})`);
    }
    startAutoRun();
    return true;
  }

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0];
  const args = parts.slice(1);

  switch (cmd) {
    // ---- 单键短按 ----
    case 'x': case 'z': case 'g': case 'f':
    case 'w': case 'a': case 's': case 'd':
      tap(BTN[cmd]);
      break;

    // ---- hold: 持续按住方向键 ----
    case 'hold':
    case 'h': {
      // 无参 = 释放 hold
      if (!args[0] || !(args[0] in BTN)) {
        if (held.size > 0) {
          clearHeld();
          logLine(`>>> hold released (frame ${frameCount})`);
        } else {
          console.log('  Usage: hold <wasd>   // 按回车停止');
        }
        break;
      }
      const btn = BTN[args[0]];
      if (btn < 4 || btn > 7) {
        console.log('  hold 仅用于方向键 (wasd)');
        break;
      }
      held.clear();
      held.add(btn);
      logLine(`>>> holding ${args[0]} (frame ${frameCount}). 按回车停止.`);
      break;
    }

    // ---- press: 按住直到场景变 ----
    case 'press':
    case 'p':
      if (!args[0] || !(args[0] in BTN)) {
        console.log('  Usage: press <key> [maxFrames=120]');
        break;
      }
      press(BTN[args[0]], parseInt(args[1]) || 120);
      break;

    // ---- 下一帧+info ----
    case 'n':
    case 'step':
      tickOne();
      showInfo();
      break;

    // ---- 信息 ----
    case 'info':
    case 'i':
      showInfo();
      break;

    case 'state':
    case 'st':
      showState();
      break;

    case 'ram':
      showRam(args);
      break;

    case 'dump':
      prettyPrint(fullDump());
      break;

    case 'save':
    case 'sv':
      saveDump(args[0] || undefined);
      break;

    // ---- 退出 ----
    case 'q':
    case 'quit':
    case 'exit':
      stopAutoRun();
      console.log('Bye!');
      return false;

    case 'help':
    case '?':
      console.log(`
  单按: x(脚) z(克星) g(Start) f(Select) wasd(方向)
  hold <wasd> — 按住方向移动球员, 回车停止
  press <key> [N] — 按住直到场景变 → 自动 st
  n — 跑1帧+info
  st — 状态  i — 阵型/球员  dump/save — 数据 dump
  q — 退出

  进比赛: g → p g → x → ... → save match
`);
      break;

    default:
      console.log(`Unknown: ${cmd}. Type "help".`);
  }

  // 恢复自动跑帧（除非 quit）
  startAutoRun();
  return true;
}

// ============================================================
// 主循环
// ============================================================
console.log('=== Tsubasa 命令行调试器 ===');
console.log('帧自动运行，不受按键约束。');
console.log('日志同时写入: _play_log.txt');
console.log('');

// 初始跑几帧让模拟器初始化
console.log('初始化中...');
for (let i = 0; i < 30; i++) {
  releaseAll();
  nes.frame();
  frameCount++;
}
_updateWatch();
showState();
console.log('就绪！帧已在后台自动运行。');
console.log('');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

// 启动自动跑帧
startAutoRun();

rl.prompt();

rl.on('line', (line: string) => {
  const keepGoing = handleCmd(line);
  if (!keepGoing) {
    rl.close();
    return;
  }
  rl.prompt();
});

rl.on('close', () => {
  stopAutoRun();
  console.log('\nSession ended.');
  process.exit(0);
});

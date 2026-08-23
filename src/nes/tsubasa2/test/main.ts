/**
 * 天使之翼2 H5 引擎测试台（index.html 入口）
 *
 * 即插即用：HeadlessRuntime + Tsubasa2，无 CPU 无 MMC3。
 *  - 键盘/手柄 → runtime.setButton → core Controller
 *  - 每帧 game.frame(runtime) → runtime.ppu.buffer → Canvas ImageData
 *  - 启动冒烟测试：RAM 初始化 / Reset 链路 / 渲染缓冲
 */
import { Tsubasa2 } from '../src/game/index';
import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';
import Controller from '../src/core/controller';

// ─────────────────────────── DOM 元素 ───────────────────────────
const $ = (id: string): HTMLElement => document.getElementById(id)!;
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const imageData = ctx.createImageData(256, 240);
const engineBadge = $('engineBadge');
const fpsVal = $('fpsVal');
const frameVal = $('frameVal');
const stateVal = $('stateVal');
const progressBar = $('progressBar') as HTMLElement;
const logPane = $('logPane');
const shotPane = $('shotPane');
const reportPane = $('reportPane');
const shotCount = $('shotCount');

// ─────────────────────────── 引擎实例 ───────────────────────────
const runtime = new HeadlessRuntime();
const game = new Tsubasa2();

// ─────────────────────────── 工具 ───────────────────────────
let shotSeq = 0;

function log(cls: string, msg: string): void {
  const line = document.createElement('div');
  line.className = 'log-line log-' + cls;
  line.textContent = msg;
  logPane.appendChild(line);
  logPane.scrollTop = logPane.scrollHeight;
}

function report(sev: string, msg: string): void {
  const p = document.createElement('div');
  p.className = 'sev-' + sev;
  p.textContent = msg;
  reportPane.appendChild(p);
}

function assertEq(name: string, actual: number | boolean, expected: number | boolean): boolean {
  const ok = actual === expected;
  log(ok ? 'pass' : 'fail', `${ok ? '✓' : '✗'} ${name}: 期望 ${expected}，实际 ${actual}`);
  report(ok ? 'Pass' : 'Critical', `${name}: ${ok ? '通过' : '失败（期望 ' + expected + '，实际 ' + actual + '）'}`);
  return ok;
}

// ─────────────────────────── 输入：键盘 ───────────────────────────
const KEY_TO_BUTTON: Record<string, number> = {
  ArrowUp: Controller.BUTTON_UP,
  ArrowDown: Controller.BUTTON_DOWN,
  ArrowLeft: Controller.BUTTON_LEFT,
  ArrowRight: Controller.BUTTON_RIGHT,
  KeyZ: Controller.BUTTON_A,
  KeyX: Controller.BUTTON_B,
  Enter: Controller.BUTTON_START,
  ShiftLeft: Controller.BUTTON_SELECT,
  ShiftRight: Controller.BUTTON_SELECT,
};

window.addEventListener('keydown', (e) => {
  const b = KEY_TO_BUTTON[e.code];
  if (b !== undefined && !e.repeat) {
    runtime.setButton(1, b, true);
    e.preventDefault();
  }
});
window.addEventListener('keyup', (e) => {
  const b = KEY_TO_BUTTON[e.code];
  if (b !== undefined) {
    runtime.setButton(1, b, false);
    e.preventDefault();
  }
});

// 画布下方虚拟手柄按钮
document.querySelectorAll<HTMLElement>('.gp-btn').forEach((el) => {
  const key: string = el.dataset.key ?? '';
  const map: Record<string, number> = {
    UP: Controller.BUTTON_UP,
    DOWN: Controller.BUTTON_DOWN,
    LEFT: Controller.BUTTON_LEFT,
    RIGHT: Controller.BUTTON_RIGHT,
    SELECT: Controller.BUTTON_SELECT,
    START: Controller.BUTTON_START,
    B: Controller.BUTTON_B,
    A: Controller.BUTTON_A,
  };
  const b = map[key];
  if (b === undefined) return;
  const down = (e: Event) => {
    runtime.setButton(1, b, true);
    el.classList.add('active');
    e.preventDefault();
  };
  const up = (e: Event) => {
    runtime.setButton(1, b, false);
    el.classList.remove('active');
    e.preventDefault();
  };
  el.addEventListener('touchstart', down);
  el.addEventListener('touchend', up);
  el.addEventListener('touchcancel', up);
  el.addEventListener('mousedown', down);
  el.addEventListener('mouseup', up);
  el.addEventListener('mouseleave', up);
});

// ─────────────────────────── 冒烟测试 ───────────────────────────
function runBootSmoke(): boolean {
  log('step', '══ 启动冒烟测试：boot() 链路 ══');
  const ok: boolean[] = [];
  game.boot();
  const store = game.store;
  ok.push(assertEq('ram_00ED = 场景 0（Opening）', store.readByte(0x00ed), 0));
  ok.push(assertEq('ram_0020 = $08（PPU CTRL）', store.readByte(0x0020), 0x08));
  ok.push(assertEq('ram_0021 = $1E（PPU MASK）', store.readByte(0x0021), 0x1e));
  ok.push(assertEq('OAM 全部隐藏（$F8）', store.oamBuffer[0], 0xf8));
  log('step', '══ 冒烟测试结束 ══');
  return ok.every((v) => v);
}

// ─────────────────────────── 测试按钮 ───────────────────────────
function runUnit(): void {
  log('step', '— 单元测试 —');
  runBootSmoke();
  log('info', 'DataStore keyToAddr: ' + JSON.stringify(['ram_0601', 'ram_0020'].map((k) => k + '→' + DataStoreAddr(k))));
}

function DataStoreAddr(key: string): number {
  // 简单复算（避免额外 import；正式断言用 store 自身）
  const m = /^ram[_0-9a-fA-F]*0x?([0-9a-fA-F]{1,4})$/.exec(key);
  return m ? parseInt(m[1], 16) : parseInt(key.replace(/^ram[_-]?/i, ''), 16);
}

function runIntegration(): void {
  log('step', '— 集成测试：连跑 120 帧 —');
  for (let i = 0; i < 120; i++) {
    if (i === 60) runtime.setButton(1, Controller.BUTTON_START, true);
    if (i === 61) runtime.setButton(1, Controller.BUTTON_START, false);
    game.frame(runtime);
  }
  const store = game.store;
  log('info', `120 帧后: scene=${store.readByte(0x00ed)} ram_001B=${store.readByte(0x001b).toString(16)} ram_0628=${store.readByte(0x0628)}`);
  assertEq('NMI 主渲染标志（ram_001B bit7）已置位', (store.readByte(0x001b) & 0x80) !== 0, true);
  report('Pass', '集成测试：120 帧运行无异常');
}

function runInput(): void {
  log('step', '— 输入测试 —');
  runtime.setButton(1, Controller.BUTTON_A, true);
  game.frame(runtime);
  const store = game.store;
  log('info', `A 按下后 ram_001C=0x${store.readByte(0x001c).toString(16)}（期望 bit0=1 → 0x01）`);
  assertEq('ram_001C bit0（A 键）', store.readByte(0x001c) & 0x01, 1);
  runtime.setButton(1, Controller.BUTTON_A, false);
  game.frame(runtime);
  log('info', `A 松开后 ram_001C=0x${store.readByte(0x001c).toString(16)}（期望 0x00）`);
  assertEq('ram_001C 松开后清零', store.readByte(0x001c), 0);
}

function runPerf(): void {
  log('step', '— 性能测试：连跑 600 帧计时 —');
  const t0 = performance.now();
  for (let i = 0; i < 600; i++) game.frame(runtime);
  const dt = performance.now() - t0;
  const fps = 600000 / dt;
  log('info', `600 帧耗时 ${dt.toFixed(1)}ms → 等效 ${fps.toFixed(1)} FPS`);
  report('Pass', `性能测试：${fps.toFixed(1)} FPS`);
}

function runEdge(): void {
  log('step', '— 边界测试：重复 boot / 长按不崩溃 —');
  for (let r = 0; r < 3; r++) {
    game.boot();
    runtime.setButton(1, Controller.BUTTON_A, true);
    for (let i = 0; i < 10; i++) game.frame(runtime);
    runtime.setButton(1, Controller.BUTTON_A, false);
  }
  log('pass', '3 次重复 boot + 长按 A 无异常');
  report('Pass', '边界测试通过');
}

// ─────────────────────────── 截图 ───────────────────────────
function snapshot(label: string): void {
  const img = document.createElement('img');
  img.src = canvas.toDataURL();
  const card = document.createElement('div');
  card.className = 'shot-card';
  const cap = document.createElement('div');
  cap.className = 'shot-label';
  cap.textContent = `#${++shotSeq} ${label} (${game.store.readByte(0x00ed)})`;
  card.appendChild(img);
  card.appendChild(cap);
  shotPane.appendChild(card);
  $('shotCount').textContent = String(shotSeq);
  log('info', `截图已保存 #${shotSeq} ${label}`);
}

function autoShot(): void {
  log('step', '— 自动截图：每 30 帧 × 10 —');
  let shotAt = 0;
  const iv = window.setInterval(() => {
    for (let i = 0; i < 30; i++) game.frame(runtime);
    shotAt++;
    snapshot('auto-' + shotAt);
    if (shotAt >= 10) window.clearInterval(iv);
  }, 100);
}

// ─────────────────────────── 导出报告 ───────────────────────────
function exportReport(): void {
  const html = '<h3>天使之翼2 H5 引擎测试报告</h3>' + reportPane.innerHTML;
  const blob = new Blob([html], { type: 'text/html' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'tsubasa2-test-report.html';
  a.click();
  URL.revokeObjectURL(a.href);
  log('info', '报告已导出');
}

// ─────────────────────────── 按钮绑定 ───────────────────────────
$('btnRunAll').addEventListener('click', () => {
  progressBar.style.width = '10%';
  runUnit();
  progressBar.style.width = '40%';
  runIntegration();
  progressBar.style.width = '70%';
  runInput();
  progressBar.style.width = '85%';
  runEdge();
  progressBar.style.width = '100%';
  log('pass', '全套测试完成');
});
$('btnInit').addEventListener('click', () => {
  game.boot();
  engineBadge.textContent = '引擎已启动';
  engineBadge.className = 'badge ok';
  log('info', '引擎已重新初始化 (boot)');
});
$('btnRunUnit').addEventListener('click', runUnit);
$('btnRunInteg').addEventListener('click', runIntegration);
$('btnRunInput').addEventListener('click', runInput);
$('btnRunPerf').addEventListener('click', runPerf);
$('btnRunEdge').addEventListener('click', runEdge);
$('btnShot').addEventListener('click', () => snapshot('manual'));
$('btnAutoShot').addEventListener('click', autoShot);
$('btnClear').addEventListener('click', () => {
  logPane.innerHTML = '';
  reportPane.innerHTML = '';
});
$('btnExport').addEventListener('click', exportReport);

// Tab 切换
document.querySelectorAll<HTMLElement>('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll<HTMLElement>('.tab').forEach((t) => t.classList.remove('active'));
    document.querySelectorAll<HTMLElement>('.pane').forEach((p) => p.classList.remove('active'));
    tab.classList.add('active');
    $((tab.dataset.tab === 'shot' ? 'shotPane' : tab.dataset.tab === 'report' ? 'reportPane' : 'logPane')).classList.add('active');
  });
});

// ─────────────────────────── 主循环 ───────────────────────────
game.boot();
engineBadge.textContent = '引擎已启动';
engineBadge.className = 'badge ok';

let lastTs = 0;
let fpsAcc = 0;
let fpsFrames = 0;

function frame(t: number): void {
  game.frame(runtime);
  // 绘制帧缓冲
  const buf = runtime.ppu.buffer as Uint32Array;
  const data = imageData.data as Uint8ClampedArray;
  for (let i = 0, n = buf.length; i < n; i++) {
    const v = buf[i];
    const o = i * 4;
    data[o] = (v >>> 16) & 0xff;
    data[o + 1] = (v >>> 8) & 0xff;
    data[o + 2] = v & 0xff;
    data[o + 3] = 0xff;
  }
  ctx.putImageData(imageData, 0, 0);

  // 统计
  if (lastTs) {
    fpsAcc += 1000 / (t - lastTs);
    fpsFrames++;
    if (fpsFrames >= 30) {
      fpsVal.textContent = (fpsAcc / fpsFrames).toFixed(1);
      fpsAcc = 0;
      fpsFrames = 0;
    }
  }
  lastTs = t;
  const fc = game['_frame'] as number;
  frameVal.textContent = String(fc);
  stateVal.textContent = `scene=${game.store.readByte(0x00ed)}`;
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

log('info', '测试台已启动：键盘 Z=A / X=B / Enter=Start / Shift=Select / 方向键移动');

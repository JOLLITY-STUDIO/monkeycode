// @ts-nocheck
/**
 * 测试主入口 — tsubasa2-h5-src HTML 测试页面
 *
 * 职责：
 *   1. 安装微信小程序 wx API Mock
 *   2. 绑定测试控制按钮（运行全套/单元/集成/输入/性能/边界/截图/导出）
 *   3. 绑定手柄按钮（press/release 按键）
 *   4. 实时刷新顶部 FPS/帧/状态
 *   5. Tab 切换（日志/截图/报告）
 */

import { Tsubasa2 } from '../src/index';
import { BUTTON, GameState } from '../src/core/types';
import { installWxMock } from './wx-mock';
import { log, screenshot, clearLog, progress, sleep } from './utils';
import {
  runUnitTests,
  runIntegrationTests,
  runInputTests,
  runPerformanceTests,
  runEdgeTests,
  clearResults,
  type TestContext,
} from './test-suite';
import { generateReport, exportReportMarkdown } from './report';

// ── 全局上下文 ──
const ctx: TestContext = {
  game: null,
  canvas: document.getElementById('gameCanvas') as HTMLCanvasElement,
  get ctx() {
    return this.canvas.getContext('2d')!;
  },
};

// ── 1. 安装 wx Mock ──
installWxMock(ctx.canvas);
log('微信小程序 wx API Mock 已安装', 'step');

// ── 2. 引擎初始化（默认自动初始化） ──
async function initEngine(): Promise<void> {
  if (ctx.game) {
    log('引擎已存在，先停止旧实例', 'warn');
    ctx.game.stop();
    ctx.game = null;
  }
  log('开始初始化 Tsubasa2 引擎...', 'step');

  let game: Tsubasa2 | null = null;
  try {
    game = new Tsubasa2(ctx.ctx, {
      debug: true,
      callbacks: {
        onStateChange: (from, to) => log(`[状态] ${from} → ${to}`, 'info'),
        onError: (err) => log(`[引擎错误] ${err.message}`, 'fail'),
      },
    });
    log('Tsubasa2 构造成功', 'pass');
  } catch (e) {
    log(`Tsubasa2 构造失败: ${(e as Error).message}`, 'fail');
    updateBadge('构造失败', true);
    return;
  }

  try {
    game.start(ctx.canvas);
    log('引擎 start() 成功', 'pass');
    updateBadge('运行中', false);
  } catch (e) {
    log(`引擎 start() 失败: ${(e as Error).message}`, 'fail');
    updateBadge('启动失败', true);
    return;
  }

  ctx.game = game;

  // 等待开场画面渲染
  await sleep(500);
  screenshot('引擎初始化-开场画面');
}

// ── 3. 测试控制按钮 ──
function bindControls(): void {
  const get = (id: string) => document.getElementById(id)!;

  get('btnInit').addEventListener('click', () => {
    clearResults();
    initEngine();
  });

  get('btnRunAll').addEventListener('click', async () => {
    clearLog();
    clearResults();
    progress(0);
    log('═══ 全套测试开始 ═══', 'step');

    // 确保引擎已初始化
    if (!ctx.game) {
      await initEngine();
    }

    const suites = [
      { name: '单元测试', fn: runUnitTests, pct: 20 },
      { name: '集成测试', fn: runIntegrationTests, pct: 45 },
      { name: '输入测试', fn: runInputTests, pct: 65 },
      { name: '性能测试', fn: runPerformanceTests, pct: 85 },
      { name: '边界测试', fn: runEdgeTests, pct: 100 },
    ];

    for (const s of suites) {
      try {
        await s.fn(ctx);
      } catch (e) {
        log(`[${s.name}] 套件异常: ${(e as Error).message}`, 'fail');
      }
      progress(s.pct);
    }

    generateReport();
    // 切换到报告 Tab
    switchTab('report');
    log('═══ 全套测试完成，已生成报告 ═══', 'step');
  });

  get('btnRunUnit').addEventListener('click', async () => {
    await runUnitTests(ctx);
    generateReport();
    switchTab('report');
  });

  get('btnRunInteg').addEventListener('click', async () => {
    if (!ctx.game) await initEngine();
    await runIntegrationTests(ctx);
    generateReport();
    switchTab('report');
  });

  get('btnRunInput').addEventListener('click', async () => {
    if (!ctx.game) await initEngine();
    await runInputTests(ctx);
    generateReport();
    switchTab('report');
  });

  get('btnRunPerf').addEventListener('click', async () => {
    if (!ctx.game) await initEngine();
    await runPerformanceTests(ctx);
    generateReport();
    switchTab('report');
  });

  get('btnRunEdge').addEventListener('click', async () => {
    if (!ctx.game) await initEngine();
    await runEdgeTests(ctx);
    generateReport();
    switchTab('report');
  });

  get('btnShot').addEventListener('click', () => {
    screenshot('手动截图-' + new Date().toLocaleTimeString('zh-CN'));
    switchTab('shot');
  });

  get('btnAutoShot').addEventListener('click', async () => {
    log('开始自动截图（每 500ms 一张，共 6 张）', 'info');
    for (let i = 0; i < 6; i++) {
      await sleep(500);
      screenshot(`自动截图-${i + 1}/6 (${(i * 0.5).toFixed(1)}s)`);
      progress(((i + 1) / 6) * 100);
    }
    switchTab('shot');
    log('自动截图完成', 'pass');
  });

  get('btnClear').addEventListener('click', () => {
    clearLog();
    log('日志已清空', 'info');
  });

  get('btnExport').addEventListener('click', () => {
    generateReport();
    exportReportMarkdown();
  });
}

// ── 4. 手柄按钮 ──
function bindGamepad(): void {
  const buttons = document.querySelectorAll('.gp-btn[data-key]');
  const keyOf = (el: Element) => el.getAttribute('data-key') as keyof typeof BUTTON;

  buttons.forEach((btn) => {
    const key = keyOf(btn);
    const press = (e: Event) => {
      e.preventDefault();
      if (ctx.game) {
        ctx.game.pressButton(key);
        btn.classList.add('active');
      }
    };
    const release = (e: Event) => {
      e.preventDefault();
      if (ctx.game) {
        ctx.game.releaseButton(key);
        btn.classList.remove('active');
      }
    };
    btn.addEventListener('mousedown', press);
    btn.addEventListener('mouseup', release);
    btn.addEventListener('mouseleave', release);
    btn.addEventListener('touchstart', press, { passive: false });
    btn.addEventListener('touchend', release, { passive: false });
  });

  // 键盘映射
  const keyMap: Record<string, keyof typeof BUTTON> = {
    ArrowUp: 'UP', ArrowDown: 'DOWN', ArrowLeft: 'LEFT', ArrowRight: 'RIGHT',
    z: 'A', x: 'B', a: 'B', s: 'A',
    Enter: 'START', Shift: 'SELECT',
  };
  const pressed = new Set<string>();

  window.addEventListener('keydown', (e) => {
    const key = keyMap[e.key];
    if (key && !pressed.has(e.key) && ctx.game) {
      pressed.add(e.key);
      ctx.game.pressButton(key);
      const btn = document.querySelector(`.gp-btn[data-key="${key}"]`);
      btn?.classList.add('active');
    }
  });
  window.addEventListener('keyup', (e) => {
    const key = keyMap[e.key];
    if (key && ctx.game) {
      pressed.delete(e.key);
      ctx.game.releaseButton(key);
      const btn = document.querySelector(`.gp-btn[data-key="${key}"]`);
      btn?.classList.remove('active');
    }
  });
}

// ── 5. Tab 切换 ──
function switchTab(tab: 'log' | 'shot' | 'report'): void {
  document.querySelectorAll('.tab').forEach((t) => {
    t.classList.toggle('active', t.getAttribute('data-tab') === tab);
  });
  document.querySelectorAll('.pane').forEach((p) => {
    p.classList.toggle('active', p.id === tab + 'Pane');
  });
}

function bindTabs(): void {
  document.querySelectorAll('.tab').forEach((t) => {
    t.addEventListener('click', () => switchTab(t.getAttribute('data-tab') as any));
  });
}

// ── 6. 顶部状态刷新 ──
function updateBadge(text: string, isError: boolean): void {
  const badge = document.getElementById('engineBadge')!;
  badge.textContent = text;
  badge.className = 'badge ' + (isError ? 'err' : 'ok');
}

function startStatusLoop(): void {
  const fpsEl = document.getElementById('fpsVal')!;
  const frameEl = document.getElementById('frameVal')!;
  const stateEl = document.getElementById('stateVal')!;

  setInterval(() => {
    if (ctx.game) {
      const dbg = ctx.game.getDebugInfo();
      fpsEl.textContent = String(dbg.fps);
      frameEl.textContent = String(dbg.frame);
      stateEl.textContent = dbg.gameStateName;
    } else {
      fpsEl.textContent = '0';
      frameEl.textContent = '0';
      stateEl.textContent = '--';
    }
  }, 500);
}

// ── 7. 启动 ──
async function main(): Promise<void> {
  bindControls();
  bindGamepad();
  bindTabs();
  startStatusLoop();

  log('测试页面就绪，自动初始化引擎...', 'step');
  await initEngine();
  log('提示: 点击"运行全套测试"开始自动化测试，或使用键盘(方向键/Z=A/X=B/Enter=START)操作', 'info');
}

main().catch((e) => log(`主入口异常: ${(e as Error).message}`, 'fail'));

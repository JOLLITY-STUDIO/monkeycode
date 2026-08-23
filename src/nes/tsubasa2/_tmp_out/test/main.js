"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
const wx_mock_1 = require("./wx-mock");
const utils_1 = require("./utils");
const test_suite_1 = require("./test-suite");
const report_1 = require("./report");
// ── 全局上下文 ──
const ctx = {
    game: null,
    canvas: document.getElementById('gameCanvas'),
    get ctx() {
        return this.canvas.getContext('2d');
    },
};
// ── 1. 安装 wx Mock ──
(0, wx_mock_1.installWxMock)(ctx.canvas);
(0, utils_1.log)('微信小程序 wx API Mock 已安装', 'step');
// ── 2. 引擎初始化（默认自动初始化） ──
async function initEngine() {
    if (ctx.game) {
        (0, utils_1.log)('引擎已存在，先停止旧实例', 'warn');
        ctx.game.stop();
        ctx.game = null;
    }
    (0, utils_1.log)('开始初始化 Tsubasa2 引擎...', 'step');
    let game = null;
    try {
        game = new index_1.Tsubasa2(ctx.ctx, {
            debug: true,
            callbacks: {
                onStateChange: (from, to) => (0, utils_1.log)(`[状态] ${from} → ${to}`, 'info'),
                onError: (err) => (0, utils_1.log)(`[引擎错误] ${err.message}`, 'fail'),
            },
        });
        (0, utils_1.log)('Tsubasa2 构造成功', 'pass');
    }
    catch (e) {
        (0, utils_1.log)(`Tsubasa2 构造失败: ${e.message}`, 'fail');
        updateBadge('构造失败', true);
        return;
    }
    try {
        game.start(ctx.canvas);
        (0, utils_1.log)('引擎 start() 成功', 'pass');
        updateBadge('运行中', false);
    }
    catch (e) {
        (0, utils_1.log)(`引擎 start() 失败: ${e.message}`, 'fail');
        updateBadge('启动失败', true);
        return;
    }
    ctx.game = game;
    // 等待开场画面渲染
    await (0, utils_1.sleep)(500);
    (0, utils_1.screenshot)('引擎初始化-开场画面');
}
// ── 3. 测试控制按钮 ──
function bindControls() {
    const get = (id) => document.getElementById(id);
    get('btnInit').addEventListener('click', () => {
        (0, test_suite_1.clearResults)();
        initEngine();
    });
    get('btnRunAll').addEventListener('click', async () => {
        (0, utils_1.clearLog)();
        (0, test_suite_1.clearResults)();
        (0, utils_1.progress)(0);
        (0, utils_1.log)('═══ 全套测试开始 ═══', 'step');
        // 确保引擎已初始化
        if (!ctx.game) {
            await initEngine();
        }
        const suites = [
            { name: '单元测试', fn: test_suite_1.runUnitTests, pct: 20 },
            { name: '集成测试', fn: test_suite_1.runIntegrationTests, pct: 45 },
            { name: '输入测试', fn: test_suite_1.runInputTests, pct: 65 },
            { name: '性能测试', fn: test_suite_1.runPerformanceTests, pct: 85 },
            { name: '边界测试', fn: test_suite_1.runEdgeTests, pct: 100 },
        ];
        for (const s of suites) {
            try {
                await s.fn(ctx);
            }
            catch (e) {
                (0, utils_1.log)(`[${s.name}] 套件异常: ${e.message}`, 'fail');
            }
            (0, utils_1.progress)(s.pct);
        }
        (0, report_1.generateReport)();
        // 切换到报告 Tab
        switchTab('report');
        (0, utils_1.log)('═══ 全套测试完成，已生成报告 ═══', 'step');
    });
    get('btnRunUnit').addEventListener('click', async () => {
        await (0, test_suite_1.runUnitTests)(ctx);
        (0, report_1.generateReport)();
        switchTab('report');
    });
    get('btnRunInteg').addEventListener('click', async () => {
        if (!ctx.game)
            await initEngine();
        await (0, test_suite_1.runIntegrationTests)(ctx);
        (0, report_1.generateReport)();
        switchTab('report');
    });
    get('btnRunInput').addEventListener('click', async () => {
        if (!ctx.game)
            await initEngine();
        await (0, test_suite_1.runInputTests)(ctx);
        (0, report_1.generateReport)();
        switchTab('report');
    });
    get('btnRunPerf').addEventListener('click', async () => {
        if (!ctx.game)
            await initEngine();
        await (0, test_suite_1.runPerformanceTests)(ctx);
        (0, report_1.generateReport)();
        switchTab('report');
    });
    get('btnRunEdge').addEventListener('click', async () => {
        if (!ctx.game)
            await initEngine();
        await (0, test_suite_1.runEdgeTests)(ctx);
        (0, report_1.generateReport)();
        switchTab('report');
    });
    get('btnShot').addEventListener('click', () => {
        (0, utils_1.screenshot)('手动截图-' + new Date().toLocaleTimeString('zh-CN'));
        switchTab('shot');
    });
    get('btnAutoShot').addEventListener('click', async () => {
        (0, utils_1.log)('开始自动截图（每 500ms 一张，共 6 张）', 'info');
        for (let i = 0; i < 6; i++) {
            await (0, utils_1.sleep)(500);
            (0, utils_1.screenshot)(`自动截图-${i + 1}/6 (${(i * 0.5).toFixed(1)}s)`);
            (0, utils_1.progress)(((i + 1) / 6) * 100);
        }
        switchTab('shot');
        (0, utils_1.log)('自动截图完成', 'pass');
    });
    get('btnClear').addEventListener('click', () => {
        (0, utils_1.clearLog)();
        (0, utils_1.log)('日志已清空', 'info');
    });
    get('btnExport').addEventListener('click', () => {
        (0, report_1.generateReport)();
        (0, report_1.exportReportMarkdown)();
    });
}
// ── 4. 手柄按钮 ──
function bindGamepad() {
    const buttons = document.querySelectorAll('.gp-btn[data-key]');
    const keyOf = (el) => el.getAttribute('data-key');
    buttons.forEach((btn) => {
        const key = keyOf(btn);
        const press = (e) => {
            e.preventDefault();
            if (ctx.game) {
                ctx.game.pressButton(key);
                btn.classList.add('active');
            }
        };
        const release = (e) => {
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
    const keyMap = {
        ArrowUp: 'UP', ArrowDown: 'DOWN', ArrowLeft: 'LEFT', ArrowRight: 'RIGHT',
        z: 'A', x: 'B', a: 'B', s: 'A',
        Enter: 'START', Shift: 'SELECT',
    };
    const pressed = new Set();
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
function switchTab(tab) {
    document.querySelectorAll('.tab').forEach((t) => {
        t.classList.toggle('active', t.getAttribute('data-tab') === tab);
    });
    document.querySelectorAll('.pane').forEach((p) => {
        p.classList.toggle('active', p.id === tab + 'Pane');
    });
}
function bindTabs() {
    document.querySelectorAll('.tab').forEach((t) => {
        t.addEventListener('click', () => switchTab(t.getAttribute('data-tab')));
    });
}
// ── 6. 顶部状态刷新 ──
function updateBadge(text, isError) {
    const badge = document.getElementById('engineBadge');
    badge.textContent = text;
    badge.className = 'badge ' + (isError ? 'err' : 'ok');
}
function startStatusLoop() {
    const fpsEl = document.getElementById('fpsVal');
    const frameEl = document.getElementById('frameVal');
    const stateEl = document.getElementById('stateVal');
    setInterval(() => {
        if (ctx.game) {
            const dbg = ctx.game.getDebugInfo();
            fpsEl.textContent = String(dbg.fps);
            frameEl.textContent = String(dbg.frame);
            stateEl.textContent = dbg.gameStateName;
        }
        else {
            fpsEl.textContent = '0';
            frameEl.textContent = '0';
            stateEl.textContent = '--';
        }
    }, 500);
}
// ── 7. 启动 ──
async function main() {
    bindControls();
    bindGamepad();
    bindTabs();
    startStatusLoop();
    (0, utils_1.log)('测试页面就绪，自动初始化引擎...', 'step');
    await initEngine();
    (0, utils_1.log)('提示: 点击"运行全套测试"开始自动化测试，或使用键盘(方向键/Z=A/X=B/Enter=START)操作', 'info');
}
main().catch((e) => (0, utils_1.log)(`主入口异常: ${e.message}`, 'fail'));

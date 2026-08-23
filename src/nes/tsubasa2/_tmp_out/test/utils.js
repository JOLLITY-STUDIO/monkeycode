"use strict";
/**
 * 测试工具集 — 日志 / 截图 / 进度
 *
 * - log(): 带时间戳与颜色的日志输出到页面日志面板
 * - screenshot(): 捕获游戏 canvas 当前帧，存入截图面板
 * - progress(): 更新进度条
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = log;
exports.sleep = sleep;
exports.screenshot = screenshot;
exports.progress = progress;
exports.getShots = getShots;
exports.clearLog = clearLog;
exports.assert = assert;
const logPane = () => document.getElementById('logPane');
const shotPane = () => document.getElementById('shotPane');
const shotCountEl = () => document.getElementById('shotCount');
const progressBar = () => document.getElementById('progressBar');
let _shotCount = 0;
const _shots = [];
/** 当前时间字符串（精确到毫秒） */
function now() {
    const d = new Date();
    return (String(d.getHours()).padStart(2, '0') + ':' +
        String(d.getMinutes()).padStart(2, '0') + ':' +
        String(d.getSeconds()).padStart(2, '0') + '.' +
        String(d.getMilliseconds()).padStart(3, '0'));
}
/** 写日志 */
function log(msg, level = 'info') {
    const line = document.createElement('div');
    line.className = 'log-line log-' + level;
    line.textContent = `[${now()}] ${msg}`;
    const pane = logPane();
    pane.appendChild(line);
    pane.scrollTop = pane.scrollHeight;
    // 同时输出到控制台
    const fn = level === 'fail' ? console.error : level === 'warn' ? console.warn : console.log;
    fn(`[${level}] ${msg}`);
}
/** 等待毫秒 */
function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}
/**
 * 截图 — 捕获 canvas 当前帧
 * @param name 截图名称
 */
function screenshot(name) {
    const canvas = document.getElementById('gameCanvas');
    if (!canvas)
        return null;
    try {
        const dataUrl = canvas.toDataURL('image/png');
        _shotCount++;
        _shots.push({ name, dataUrl, ts: now() });
        const card = document.createElement('div');
        card.className = 'shot-card';
        const img = document.createElement('img');
        img.src = dataUrl;
        const label = document.createElement('div');
        label.className = 'shot-label';
        label.textContent = `#${_shotCount} ${name} (${now()})`;
        card.appendChild(img);
        card.appendChild(label);
        shotPane().appendChild(card);
        shotCountEl().textContent = String(_shotCount);
        return dataUrl;
    }
    catch (e) {
        log(`截图失败 [${name}]: ${e.message}`, 'fail');
        return null;
    }
}
/** 设置进度 (0~100) */
function progress(pct) {
    progressBar().style.width = Math.max(0, Math.min(100, pct)) + '%';
}
/** 获取所有截图记录（用于报告导出） */
function getShots() {
    return _shots.slice();
}
/** 清空日志 */
function clearLog() {
    logPane().innerHTML = '';
}
/** 简单断言 */
function assert(cond, msg) {
    if (cond) {
        log('✓ ' + msg, 'pass');
    }
    else {
        log('✗ ' + msg, 'fail');
    }
    return cond;
}

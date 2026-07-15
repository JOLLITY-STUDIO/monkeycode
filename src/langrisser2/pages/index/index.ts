/**
 * pages/index/index.ts — 游戏主页面逻辑
 *
 * 职责:
 *   1. 获取 Canvas 节点 (type="2d")
 *   2. 创建 MiniProgramPlatform → MiniGame
 *   3. 管理游戏生命周期 (onShow/onHide/onUnload)
 *   4. 将 WXML 触摸事件转发给平台适配器
 */

import { MiniProgramPlatform } from '../../game/platform/miniprogram.js';
import { MiniGame } from '../../game/platform/miniMain.js';

Page({
  data: {
    /** 状态栏文字 */
    statusText: 'Langrisser II — 初始化中...',
    /** Canvas 显示宽度 (px) */
    canvasDisplayW: 300,
    /** Canvas 显示高度 (px) */
    canvasDisplayH: 210,
  },

  /** MiniGame 实例 */
  _game: null as MiniGame | null,
  /** 平台适配器 */
  _platform: null as MiniProgramPlatform | null,
  /** 游戏是否已启动 */
  _started: false,

  onLoad() {
    console.log('[Page] 游戏页面加载');

    // 计算 Canvas 显示尺寸 (宽高比 320:224 = 10:7)
    let screenW: number, screenH: number;
    try {
      // 使用新版 API (wx.getSystemInfoSync 已废弃)
      const winInfo = wx.getWindowInfo();
      screenW = winInfo.windowWidth;
      screenH = winInfo.windowHeight;
    } catch {
      const sysInfo = wx.getSystemInfoSync();
      screenW = sysInfo.windowWidth;
      screenH = sysInfo.windowHeight;
    }

    // 横屏适配 (留出状态栏空间)
    const maxW = Math.min(screenW - 20, 640);
    const maxH = Math.min(screenH - 60, 448);

    let displayW = maxW;
    let displayH = displayW * (224 / 320);

    if (displayH > maxH) {
      displayH = maxH;
      displayW = displayH * (320 / 224);
    }

    this.setData({
      canvasDisplayW: Math.floor(displayW),
      canvasDisplayH: Math.floor(displayH),
    });

    console.log('[Page] Canvas 显示尺寸:', displayW, 'x', displayH);
  },

  onReady() {
    console.log('[Page] 页面就绪');

    // 创建平台适配器 (延迟到 onReady 以确保 Canvas 节点已挂载)
    this._platform = new MiniProgramPlatform({
      page: this,
      canvasId: 'gameCanvas',
    });

    this._game = new MiniGame(this._platform);

    // ── 自动启动游戏 ──
    this._autoStart();
  },

  /** 页面就绪后自动启动游戏 */
  async _autoStart() {
    if (!this._game) return;

    try {
      this.setData({ statusText: 'Langrisser II — 启动中...' });
      await this._game.start();
      this._started = true;
      console.log('[Page] 游戏自动启动成功');
    } catch (e) {
      console.error('[Page] 游戏启动失败:', e);
      this.setData({ statusText: `错误: ${(e as Error).message}` });
    }
  },

  onShow() {
    console.log('[Page] 页面显示');
  },

  onHide() {
    console.log('[Page] 页面隐藏');
    // 隐藏时暂停游戏循环
    if (this._game) {
      this._game.stop();
      this._started = false;
    }
  },

  onUnload() {
    console.log('[Page] 页面卸载');
    // 清理游戏实例
    if (this._game) {
      this._game.destroy();
      this._game = null;
    }
    if (this._platform) {
      this._platform.destroy();
      this._platform = null;
    }
  },

  // ============================================================
  // 触摸事件 — WXML → Platform (Canvas 节点不支持 addEventListener)
  // ============================================================

  /** WXML 触摸事件转发 */
  onCanvasTouch(e: WechatMiniprogram.TouchEvent) {
    if (this._platform) {
      this._platform.handleTouch(e);
    }
  },
});

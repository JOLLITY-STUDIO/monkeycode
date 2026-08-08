/**
 * 天使之翼1 — 游戏主页面
 * 微信小程序页面，负责:
 *   1. 初始化Canvas
 *   2. 创建 Tsubasa 实例
 *   3. 处理触摸/键盘输入
 *   4. 显示实时数据面板
 */

import { Tsubasa } from '../../src/core/Tsubasa';
import { BUTTON } from '../../src/core/types';
import { initChrBanks, CHR_BANKS } from '../../src/assets/chr/chr_data';
import { loadAllPrgBanks } from '../../src/data/raw/prg_bank_data';

/** 页面数据接口 */
interface PageData {
  showDebug: boolean;
  aiMode: boolean;
  debugInfo: {
    frame: number;
    gameStateName: string;
    scoreA: number;
    scoreB: number;
    matchPhase: number;
  };
  matchDebug: {
    time: string;
    phaseText: string;
    events: string[];
  };
  fps: number;
}

Page({
  data: {
    showDebug: false,
    aiMode: false,
    debugInfo: {
      frame: 0,
      gameStateName: 'INIT',
      scoreA: 0,
      scoreB: 0,
      matchPhase: 0,
    },
    matchDebug: {
      time: '00:00',
      phaseText: '',
      events: [],
    },
    fps: 0,
  } as PageData,

  /** Tsubasa 游戏实例 */
  _game: null as Tsubasa | null,

  /** Canvas 节点 */
  _canvas: null as any,

  /** Canvas 上下文 */
  _ctx: null as CanvasRenderingContext2D,

  /** 调试FPS累计 */
  _fpsFrames: 0,
  _fpsTimer: 0,

  onLoad() {
    console.log('[GamePage] 页面加载');
  },

  onReady() {
    this._initCanvas();
  },

  onUnload() {
    console.log('[GamePage] 页面卸载');
    if (this._game) {
      this._game.pause();
    }
  },

  /** 初始化Canvas并创建游戏实例 */
  async _initCanvas() {
    try {
      // 获取Canvas节点和上下文 (微信小程序2D Canvas)
      const query = wx.createSelectorQuery().in(this);
      query.select('#game-canvas')
        .fields({ node: true, size: true })
        .exec((res: any) => {
          if (!res || !res[0]) {
            console.error('[GamePage] Canvas节点未找到');
            return;
          }

          const canvas = res[0].node;
          const ctx = canvas.getContext('2d');

          // 设置Canvas尺寸: NES原始分辨率 256×240
          canvas.width = 256;
          canvas.height = 240;

          this._canvas = canvas;
          this._ctx = ctx;

          // 创建游戏实例 (传入 canvas 节点用于离屏 Canvas)
          this._game = new Tsubasa(ctx, {
            scale: 1,
            debug: true,
            aiMode: this.data.aiMode,
          }, canvas);

          // 注册到全局供调试页面访问
          const app = getApp();
          app.globalData.game = this._game;

          // 加载 PRG Bank 数据 (游戏逻辑)
          try {
            loadAllPrgBanks((bankId: number, data: Uint8Array) => {
              this._game!.loadPrgBank(bankId, data);
            });
            console.log('[GamePage] 已加载所有 PRG Bank');
          } catch (err) {
            console.error('[GamePage] 加载 PRG Bank 失败:', err);
          }

          // 加载 CHR Bank 数据 (图形资源)
          try {
            initChrBanks();
            const bankCount = Math.min(CHR_BANKS.length, 32);
            for (let bankId = 0; bankId < bankCount; bankId++) {
              const bankData = CHR_BANKS[bankId];
              if (bankData && bankData.length > 0) {
                this._game.loadChrBank(bankId, bankData);
              }
            }
            console.log(`[GamePage] 已加载 ${bankCount} 个 CHR Bank`);
          } catch (err) {
            console.error('[GamePage] 加载 CHR Bank 失败:', err);
          }

          // 设置调试信息更新
          this._setupDebugUpdate();

          // 启动游戏
          this._game.start();
          
          console.log('[GamePage] 游戏已启动');
        });
    } catch (err) {
      console.error('[GamePage] 初始化Canvas失败:', err);
    }
  },

  /** 设置调试信息定时更新 */
  _setupDebugUpdate() {
    // 每30帧更新一次调试信息
    if (this._game) {
      const app = getApp();
      if (app && app.globalData && app.globalData.game) {
        const game = app.globalData.game as Tsubasa;
        // 使用游戏循环回调
        let frameCount = 0;
        setInterval(() => {
          this.updateDebugInfo();
          this._updateMatchDebug();
        }, 500); // 每0.5秒
      }
    }
  },
  
  /** 更新比赛调试信息 */
  _updateMatchDebug() {
    if (!this._game) return;
    
    try {
      const bank0Core = (this._game as any)._bank0Core;
      if (bank0Core) {
        const engine = bank0Core.getMatchEngine();
        if (engine) {
          const events = bank0Core.getMatchEvents ? bank0Core.getMatchEvents() : [];
          this.setData({
            matchDebug: {
              time: engine.getTimeText ? engine.getTimeText() : '--:--',
              phaseText: engine.getPhaseText ? engine.getPhaseText() : '',
              events: events.slice(-5).map((e: any) => `[${String(e)}]`),
            },
          });
        }
      }
    } catch (e) { /* ignore */ }
  },

  // ==================== 触摸事件处理 ====================

  onTouchStart(e: any) {
    if (!this._game) return;
    // 双指触摸 → START 按钮
    if (e.touches.length >= 2) {
      this._game.pressButton('START');
    }
  },

  onTouchMove(e: any) {
    // 暂不处理滑动
  },

  onTouchEnd(e: any) {
    if (!this._game) return;
    // 释放所有按键
    this._game.setButton1(0);
  },

  // ==================== 页面方法 ====================

  /** 切换调试面板 */
  toggleDebug() {
    this.setData({ showDebug: !this.data.showDebug });
  },

  /** 切换AI模式 */
  toggleAi() {
    const aiMode = !this.data.aiMode;
    this.setData({ aiMode });
    
    if (this._game) {
      if (aiMode) {
        this._game.enableAi();
      } else {
        this._game.disableAi();
      }
    }
  },

  /** 更新调试信息 */
  updateDebugInfo() {
    if (!this._game) return;
    
    const info = this._game.getDebugInfo();
    this.setData({
      debugInfo: {
        frame: info.frame,
        gameStateName: info.gameStateName,
        scoreA: info.scoreA,
        scoreB: info.scoreB,
        matchPhase: info.matchPhase,
      },
      fps: this._game.getFps(),
    });
  },
});

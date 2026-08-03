/**
 * 游戏页面 - 微信小程序
 *
 * 使用 Canvas 2D API (type="2d") 运行天使之翼 H5
 */
import { Tsubasa } from '../../src/core/Tsubasa';
import { MpPlatform } from '../../src/platform/miniprogram/MpPlatform';
import { Button } from '../../src/core/types';

/** 按键名 → Button 枚举映射 */
const BTN_MAP: Record<string, Button> = {
  UP: Button.UP,
  DOWN: Button.DOWN,
  LEFT: Button.LEFT,
  RIGHT: Button.RIGHT,
  A: Button.A,
  B: Button.B,
  START: Button.START,
  SELECT: Button.SELECT,
};

Page({
  data: {
    /** FPS 显示文本 */
    fpsText: '',
    /** 调试信息 */
    debugText: '',
  },

  /** 游戏实例 */
  game: null as Tsubasa | null,

  /** FPS 定时器 */
  _fpsTimer: 0,

  onLoad() {
    console.log('[MiniProgram] Game page loaded');
  },

  onReady() {
    this.initGame();
  },

  onUnload() {
    if (this._fpsTimer) clearInterval(this._fpsTimer);
    if (this.game) {
      this.game.destroy();
      this.game = null;
    }
  },

  /** 初始化游戏 */
  async initGame() {
    try {
      // 1. 获取 Canvas 节点 (必须在 onReady 中)
      const query = wx.createSelectorQuery();
      const canvasNode: any = await new Promise((resolve, reject) => {
        query.select('#game-canvas')
          .fields({ node: true, size: true })
          .exec((res: any) => {
            if (!res || !res[0] || !res[0].node) {
              reject(new Error('Canvas node not found'));
              return;
            }
            resolve(res[0].node);
          });
      });

      // 2. 设置 Canvas 尺寸 (NES: 256×240, 2x 缩放 = 512×480)
      const dpr = wx.getSystemInfoSync().pixelRatio;
      canvasNode.width = 256 * 2;
      canvasNode.height = 240 * 2;

      // 3. 获取 2D 上下文
      const ctx = canvasNode.getContext('2d');
      if (!ctx) {
        throw new Error('Cannot get Canvas 2D context');
      }

      // 4. 创建平台适配器
      const platform = new MpPlatform();
      // 设置主 canvas 引用（用于 requestAnimationFrame 和 createImage）
      platform.setMainCanvas(canvasNode);

      // 5. 创建游戏实例
      this.game = new Tsubasa(platform, ctx as any, {
        spriteBasePath: '/public/sprites/',
        scale: 2,
        autoLoadSprites: true,
        debug: true,
      });

      // 6. 启动
      await this.game.start();
      console.log('[MiniProgram] Game started');

      // 7. FPS 监控
      this._fpsTimer = setInterval(() => {
        if (!this.game || this.game.getState() !== 'running') return;
        this.setData({
          fpsText: `FPS: ${this.game.getFps()} | State: ${this.game.getCurrentGameState()}`,
        });
      }, 500) as any;

    } catch (err) {
      console.error('[MiniProgram] Failed to init game:', err);
      wx.showToast({
        title: '游戏初始化失败',
        icon: 'error',
        duration: 3000,
      });
    }
  },

  /** 虚拟按钮按下 */
  onBtnDown(e: any) {
    const btn = e.currentTarget?.dataset?.btn;
    if (!btn || !this.game) return;
    this.game.pressButton(BTN_MAP[btn]);
    // 防止事件冒泡导致 canvas 上的 touch 事件重复触发
    // (canvas touch 不做按键映射，仅由虚拟按钮处理)
  },

  /** 虚拟按钮释放 */
  onBtnUp(e: any) {
    const btn = e.currentTarget?.dataset?.btn;
    if (!btn || !this.game) return;
    this.game.releaseButton(BTN_MAP[btn]);
  },

  /** Canvas 触摸开始 - 可用于直接触摸屏操作（预留） */
  onTouchStart(e: any) {
    // 预留：可根据触摸坐标映射方向键
    // const touch = e.touches[0];
    // const x = touch.x, y = touch.y;
  },

  /** Canvas 触摸结束 */
  onTouchEnd(_e: any) {
    // 预留
  },

  /** Canvas 触摸移动 */
  onTouchMove(_e: any) {
    // 预留
  },
});

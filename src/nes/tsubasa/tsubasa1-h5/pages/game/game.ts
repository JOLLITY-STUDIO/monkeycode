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
    /** 自动播放状态 */
    autoPlay: false,
    /** 自动播放日志 (最新一条) */
    autoPlayLog: '',
    /** 调试菜单是否显示 */
    showDebugMenu: false,
  },

  /** 游戏实例 */
  game: null as Tsubasa | null,

  /** FPS 定时器 */
  _fpsTimer: 0,

  /** 是否为测试模式 (默认关闭，正常游戏模式；?test=1 切换到测试模式) */
  _testMode: false,

  /** 日志消失定时器 */
  _logTimer: 0,

  onLoad(options: any) {
    console.log('[MiniProgram] Game page loaded');
    // 默认正常模式；通过页面参数 ?test=1 切换到测试模式
    if (options?.test === '1') {
      this._testMode = true;
    }
    // 支持 ?auto=1 启动即开启自动模式
    if (options?.auto === '1') {
      // 将在 initGame 中启用
      this.data.autoPlay = true;
    }
    console.log('[MiniProgram] Test mode:', this._testMode);
  },

  onReady() {
    this.initGame();
  },

  onHide() {
    // 页面被隐藏（navigateTo 到其他页面、切后台等）→ 暂停游戏
    if (this.game && this.game.getState() === 'running') {
      console.log('[MiniProgram] Game paused (page hidden)');
      this.game.pause();
    }
  },

  onShow() {
    // 页面重新显示 → 恢复游戏
    if (this.game && this.game.getState() === 'paused') {
      console.log('[MiniProgram] Game resumed (page shown)');
      this.game.resume();
    }
  },

  onUnload() {
    if (this._fpsTimer) clearInterval(this._fpsTimer);
    if (this._logTimer) clearTimeout(this._logTimer);
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

      // 2. Canvas 缓冲区 = NES 原生 256×240（永远不变）
      //    视觉放大由 CSS 控制，不修改缓冲区
      canvasNode.width = 256;
      canvasNode.height = 240;
      console.log('[MiniProgram] Canvas buffer: 256×240 (NES native)');

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
      // 小程序中 public/sprites/ 在项目根目录下，路径为 /public/sprites/
      this.game = new Tsubasa(platform, ctx as any, {
        spriteBasePath: '/public/sprites/',
        scale: 1,
        autoLoadSprites: !this._testMode, // 测试模式不加载 CHR
        debug: true,
      });

      // 设置自动播放日志回调
      this.game.setAutoPlayLogCallback((msg: string) => {
        this.setData({ autoPlayLog: msg });
        if (this._logTimer) clearTimeout(this._logTimer);
        this._logTimer = setTimeout(() => {
          this.setData({ autoPlayLog: '' });
        }, 3000) as any;
      });

      // 设置比赛结束回调
      this.game.setAutoPlayMatchEndCallback((score: [number, number], _time: number) => {
        console.log(`[MiniProgram] ⚽ 比赛结束! ${score[0]} - ${score[1]}`);
        wx.showToast({
          title: `比赛结束 ${score[0]}-${score[1]}`,
          icon: 'none',
          duration: 2000,
        });
      });

      // 6. 启动
      if (this._testMode) {
        await this.game.startTestMode();
        console.log('[MiniProgram] Game started in TEST MODE');
      } else {
        await this.game.start();
        console.log('[MiniProgram] Game started');

        // 如果 URL 参数指定 auto=1，自动开启
        if (this.data.autoPlay) {
          this.game.enableAutoPlay();
        }
      }

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

  /** 切换自动播放 */
  onAutoToggle() {
    if (!this.game || this.game.getState() !== 'running') return;
    const isNowAuto = this.game.toggleAutoPlay();
    this.setData({ autoPlay: isNowAuto });
    wx.showToast({
      title: isNowAuto ? '🤖 自动模式开启' : '👤 手动模式',
      icon: 'none',
      duration: 1500,
    });
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

  /** 调试菜单切换 */
  onDebugMenuToggle() {
    this.setData({ showDebugMenu: !this.data.showDebugMenu });
  },

  /** 导航到调试页面 */
  onNavToDebug(e: any) {
    const page = e.currentTarget.dataset.page;
    this.setData({ showDebugMenu: false });
    wx.navigateTo({
      url: `/pages/${page}/${page}`,
    });
  },
});

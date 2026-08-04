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

/** NES 画面宽高比 */
const NES_RATIO = 256 / 240;  // ≈ 1.0667

/** 计算 Canvas 的 CSS 显示尺寸 (保持 256:240 比例撑满可用空间) */
function calcCanvasSize(): { width: number; height: number } {
  const sysInfo = wx.getSystemInfoSync();
  const screenW = sysInfo.windowWidth;
  const screenH = sysInfo.windowHeight;

  // 估算不可用的垂直空间:
  //   - canvas border 8rpx + margin-top 12rpx ≈ 10px
  //   - 底部控件固定定位约 170px (80rpx×2行 + 60rpx定位 + 30rpx padding)
  //   - 预留内边距 16px
  const reservedVert = 10 + 170 + 16;  // ≈ 196px
  const maxCanvasH = screenH - reservedVert;
  const maxCanvasW = screenW - 16;  // 左右各 8px 边距

  // 按 256:240 比例计算
  let w: number, h: number;
  const ratioH = maxCanvasW / NES_RATIO;  // 以宽度为限制时的高度
  if (ratioH <= maxCanvasH) {
    // 宽度受限
    w = maxCanvasW;
    h = ratioH;
  } else {
    // 高度受限
    h = maxCanvasH;
    w = maxCanvasH * NES_RATIO;
  }

  // 取整数
  w = Math.floor(w);
  h = Math.floor(h);

  console.log(`[MiniProgram] Canvas CSS: ${w}×${h} (screen ${screenW}×${screenH}, max ${maxCanvasW}×${maxCanvasH})`);
  return { width: w, height: h };
}

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
    /** Canvas CSS style 字符串 (动态计算保持 256:240 比例) */
    canvasStyle: 'width:512px;height:480px;',
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
      // 0. 计算 Canvas 响应式尺寸 (必须在 binding data 之前)
      const cssSize = calcCanvasSize();
      const canvasStyle = `width:${cssSize.width}px;height:${cssSize.height}px;`;
      this.setData({ canvasStyle });

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

      // 2. 设置 Canvas 缓冲区 (内部渲染分辨率, 2x = 512×480 保证像素清晰)
      //    CSS 显示尺寸由 WXML style 绑定控制，独立于缓冲区
      const scale = 2;
      canvasNode.width = 256 * scale;
      canvasNode.height = 240 * scale;

      // 直接设置 canvas 节点的 style 作为 WXML 绑定的 fallback
      if (canvasNode.style) {
        canvasNode.style.width = cssSize.width + 'px';
        canvasNode.style.height = cssSize.height + 'px';
      }

      console.log(`[MiniProgram] Canvas buffer: ${canvasNode.width}×${canvasNode.height}, CSS display: ${cssSize.width}×${cssSize.height}`);

      // 验证实际渲染尺寸 (延迟一帧确保 setData 生效)
      setTimeout(() => {
        wx.createSelectorQuery()
          .select('#game-canvas')
          .boundingClientRect((rect: any) => {
            if (rect) {
              const actualRatio = (rect.width / rect.height).toFixed(3);
              const expectedRatio = (256 / 240).toFixed(3);
              console.log(`[MiniProgram] Canvas actual render: ${rect.width}×${rect.height} ratio=${actualRatio} (expected=${expectedRatio})`);
              if (Math.abs(rect.width / rect.height - 256 / 240) > 0.05) {
                console.warn('[MiniProgram] ⚠️ Canvas aspect ratio mismatch!');
              }
            }
          })
          .exec();
      }, 100);

      // 3. 获取 2D 上下文
      const ctx = canvasNode.getContext('2d');
      if (!ctx) {
        throw new Error('Cannot get Canvas 2D context');
      }

      // === 直接 Canvas 测试: 验证 canvas 上下文本身可用 ===
      try {
        console.log('[MiniProgram] Canvas direct test: filling RED rect...');
        console.log('[MiniProgram] Canvas buffer size:', canvasNode.width, 'x', canvasNode.height);
        console.log('[MiniProgram] ctx type:', typeof ctx, 'fillRect:', typeof ctx.fillRect);
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(0, 0, canvasNode.width, canvasNode.height);
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(50, 50, 100, 100);
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px sans-serif';
        ctx.fillText('DIRECT CANVAS TEST', 60, 120);
        console.log('[MiniProgram] Canvas direct test DONE - should see RED bg + GREEN square + WHITE text');
      } catch (e: any) {
        console.error('[MiniProgram] Canvas direct test FAILED:', e.message, e.stack);
      }

      // ==================================================

      // 4. 创建平台适配器
      const platform = new MpPlatform();
      // 设置主 canvas 引用（用于 requestAnimationFrame 和 createImage）
      platform.setMainCanvas(canvasNode);

      // 5. 创建游戏实例
      // 小程序中 public/sprites/ 在项目根目录下，路径为 /public/sprites/
      this.game = new Tsubasa(platform, ctx as any, {
        spriteBasePath: '/public/sprites/',
        scale: 2,
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
});

/**
 * 天使之翼2 — 游戏页面 (双 Canvas 对比模式)
 * TS 内核 (左侧) + jsnes 参考 (右侧)，同帧同输入同步运行
 */
import { startGame, resetGame, stopGame } from '../../src/main';
import { createMiniPlatform, MiniGameHandle } from '../../src/platform/miniprogram';
import { BUTTON } from '../../src/types';
import { JsnesKernel } from '../../src/jsnes/jsnes_kernel';

Page({
  data: {
    statusText: '初始化中...',
  },

  gameHandle: null as MiniGameHandle | null,
  jsnesKernel: null as JsnesKernel | null,
  jsnesAnimId: -1,
  /** jsnes canvas 节点 (用于 requestAnimationFrame) */
  jsnesCanvas: null as any,
  dpadState: { up: false, down: false, left: false, right: false },
  btnState: { a: false, b: false, start: false, select: false },

  onLoad() {
    console.log('[tsubasa] Game page loading');

    // 创建平台适配器
    const handle = createMiniPlatform();
    handle.setStatusCb((text: string) => {
      this.setData({ statusText: text });
    });
    this.gameHandle = handle;

    // 获取两个 Canvas
    this.initCanvases(handle);
  },

  onUnload() {
    console.log('[tsubasa] Game page unloading');
    stopGame();
    this.stopJsnes();
    this.gameHandle = null;
    this.jsnesKernel = null;
  },

  /** 获取两个 Canvas 2D 节点 */
  initCanvases(handle: MiniGameHandle) {
    const query = wx.createSelectorQuery();
    query.select('#game-canvas')
      .fields({ node: true, size: true })
      .select('#jsnes-canvas')
      .fields({ node: true, size: true })
      .exec((res: any) => {
        if (!res || !res[0] || !res[0].node) {
          console.error('[tsubasa] TS canvas not found');
          this.setData({ statusText: 'TS Canvas 获取失败' });
          return;
        }
        if (!res[1] || !res[1].node) {
          console.error('[tsubasa] jsnes canvas not found');
          this.setData({ statusText: 'jsnes Canvas 获取失败' });
          return;
        }

        const tsCanvas = res[0].node;
        tsCanvas.width = 256;
        tsCanvas.height = 240;

        const jsnesCanvas = res[1].node;
        jsnesCanvas.width = 256;
        jsnesCanvas.height = 240;
        this.jsnesCanvas = jsnesCanvas;

        handle.setCanvasNode(tsCanvas);

        console.log('[tsubasa] Both canvases ready');

        // 启动 TS 内核
        startGame(handle.platform);

        // 启动 jsnes 内核
        this.startJsnes(jsnesCanvas);

        this.setData({ statusText: '双内核运行中 | TS ← → jsnes' });
      });
  },

  /** 启动 jsnes 内核 + 帧循环 */
  startJsnes(canvas: any): void {
    try {
      this.jsnesKernel = new JsnesKernel(canvas);
      this.jsnesKernel.start();
      this.jsnesFrameLoop();
    } catch (e) {
      console.error('[tsubasa] jsnes init error:', e);
      this.setData({ statusText: 'jsnes 启动失败: ' + String(e) });
    }
  },

  /** jsnes 帧循环 (与 TS 内核共享 requestAnimationFrame 节奏) */
  jsnesFrameLoop(): void {
    if (!this.jsnesKernel?.running) return;

    // 同步输入
    const input = this.computeInput();
    this.jsnesKernel.setInput(input);

    // 执行一帧
    this.jsnesKernel.frame();

    // 渲染到 jsnes canvas
    this.jsnesKernel.renderToCanvas();

    // 下一帧 — 小程序环境必须用 canvas 节点的 requestAnimationFrame
    const canvas = this.jsnesCanvas;
    if (canvas?.requestAnimationFrame) {
      this.jsnesAnimId = canvas.requestAnimationFrame(() => this.jsnesFrameLoop());
    } else if (typeof requestAnimationFrame === 'function') {
      this.jsnesAnimId = requestAnimationFrame(() => this.jsnesFrameLoop()) as any;
    } else {
      this.jsnesAnimId = setTimeout(() => this.jsnesFrameLoop(), 16) as any;
    }
  },

  /** 停止 jsnes */
  stopJsnes(): void {
    if (this.jsnesAnimId >= 0) {
      const canvas = this.jsnesCanvas;
      if (canvas?.cancelAnimationFrame) {
        canvas.cancelAnimationFrame(this.jsnesAnimId);
      } else if (typeof cancelAnimationFrame === 'function') {
        cancelAnimationFrame(this.jsnesAnimId);
      } else {
        clearTimeout(this.jsnesAnimId);
      }
      this.jsnesAnimId = -1;
    }
    if (this.jsnesKernel) {
      this.jsnesKernel.stop();
      this.jsnesKernel = null;
    }
    this.jsnesCanvas = null;
  },

  /** 当前输入 */
  computeInput(): number {
    let m = 0;
    if (this.dpadState.up)    m |= BUTTON.UP;
    if (this.dpadState.down)  m |= BUTTON.DOWN;
    if (this.dpadState.left)  m |= BUTTON.LEFT;
    if (this.dpadState.right) m |= BUTTON.RIGHT;
    if (this.btnState.a)      m |= BUTTON.A;
    if (this.btnState.b)      m |= BUTTON.B;
    if (this.btnState.start)  m |= BUTTON.START;
    if (this.btnState.select) m |= BUTTON.SELECT;
    return m;
  },

  updateInput() {
    const mask = this.computeInput();
    this.gameHandle?.setInput(mask);
    // 实时同步输入给 jsnes
    this.jsnesKernel?.setInput(mask);
  },

  // ---- 方向键 ----

  onDpadDown(e: any) {
    const dir = e.currentTarget.dataset.dir;
    (this.dpadState as any)[dir] = true;
    this.updateInput();
  },

  onDpadUp(e: any) {
    const dir = e.currentTarget.dataset.dir;
    (this.dpadState as any)[dir] = false;
    this.updateInput();
  },

  // ---- 功能键 ----

  onBtnDown(e: any) {
    const btn = e.currentTarget.dataset.btn;
    (this.btnState as any)[btn] = true;
    this.updateInput();
  },

  onBtnUp(e: any) {
    const btn = e.currentTarget.dataset.btn;
    (this.btnState as any)[btn] = false;
    this.updateInput();
  },

  // ---- Canvas 触摸 (备用) ----

  onTouchStart(e: any) {},
  onTouchMove(e: any) {},
  onTouchEnd(e: any) {},
});

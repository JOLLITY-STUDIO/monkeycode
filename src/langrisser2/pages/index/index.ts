/**
 * pages/index/index.ts — 游戏主页面
 *
 * 两条路径可选 (默认翻译路径):
 *   翻译路径: BootRom + RomInits + RomTaskSystem (68K 汇编 → TS 翻译)
 *   模拟路径: Game → Cpu/Memory (逐条解释 68K 指令)
 *
 * 切换方式: 修改 _useTranslation = false 即可切到模拟路径
 */

import { WechatPlatform } from '../../game/platform/WechatPlatform';
import { Game } from '../../game/Game';
import { RomLoader } from '../../game/core/RomLoader';
import { Ram } from '../../game/core/Ram';
import { VdpChip } from '../../game/vdp/VdpChip';
import { Renderer } from '../../game/vdp/Renderer';
import { BootRom } from '../../game/boot/BootRom';
import { RomInits } from '../../game/rom/RomInits';
import { RomTaskSystem } from '../../game/rom/RomTaskSystem';

Page({
  data: {
    statusText: 'Langrisser II — 初始化中...',
    canvasDisplayW: 300,
    canvasDisplayH: 210,
  },

  // ═══════════════════════════════════════════════════════════════════
  // 分支选择 (默认: 翻译路径)
  // ═══════════════════════════════════════════════════════════════════
  _useTranslation: true as boolean,

  // ═══════════════════════════════════════════════════════════════════
  // 平台 & 通用
  // ═══════════════════════════════════════════════════════════════════
  _platform: null as WechatPlatform | null,
  _animFrameId: 0,
  _running: false,

  // ═══════════════════════════════════════════════════════════════════
  // 模拟路径 (Game.ts → Cpu/Memory)
  // ═══════════════════════════════════════════════════════════════════
  _game: null as Game | null,

  // ═══════════════════════════════════════════════════════════════════
  // 翻译路径
  // ═══════════════════════════════════════════════════════════════════
  _rom: null as RomLoader | null,
  _ram: null as Ram | null,
  _vdp: null as VdpChip | null,
  _renderer: null as Renderer | null,
  _romInits: null as RomInits | null,
  _taskSystem: null as RomTaskSystem | null,

  onLoad() {
    console.log('[Page] 加载');
    console.log('[Page] 路径:', this._useTranslation ? '翻译路径 (BootRom + RomInits)' : '模拟路径 (Cpu/Memory)');

    // 计算 Canvas 显示尺寸 (320:224 = 10:7)
    let screenW: number, screenH: number;
    try {
      const winInfo = wx.getWindowInfo();
      screenW = winInfo.windowWidth;
      screenH = winInfo.windowHeight;
    } catch {
      const sysInfo = wx.getSystemInfoSync();
      screenW = sysInfo.windowWidth;
      screenH = sysInfo.windowHeight;
    }

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
  },

  onReady() {
    console.log('[Page] 就绪');

    const query = wx.createSelectorQuery();
    query.select('#gameCanvas')
      .fields({ node: true, size: true })
      .exec((res: any[]) => {
        if (!res || !res[0]) {
          console.error('[Page] Canvas 节点未找到!');
          this.setData({ statusText: '错误: Canvas 未找到' });
          return;
        }

        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');

        // 设置 Canvas 逻辑大小: 320×224
        canvas.width = 320;
        canvas.height = 224;

        // 创建平台适配器 (两条路径共用)
        this._platform = new WechatPlatform(canvas, ctx);

        // 初始化硬件核心 (两条路径共用)
        this._ram = new Ram();
        this._vdp = new VdpChip();
        this._renderer = new Renderer(this._vdp);

        if (this._useTranslation) {
          // 翻译路径: 也创建 Game (保底), 但启动用翻译链
          this._game = new Game(this._platform);
          this._autoStartTranslation();
        } else {
          // 模拟路径: 使用 Game → Cpu/Memory
          this._game = new Game(this._platform);
          this._autoStartEmulator();
        }
      });
  },

  // ═══════════════════════════════════════════════════════════════════
  // 翻译路径启动
  // ═══════════════════════════════════════════════════════════════════
  async _autoStartTranslation() {
    if (!this._platform || !this._ram || !this._vdp || !this._renderer) return;

    try {
      this.setData({ statusText: 'Langrisser II — 翻译路径启动中...' });

      // 1. 加载 ROM
      const romBuffer = await this._platform.loadRomBinary();
      this._rom = new RomLoader(romBuffer);
      console.log(`[Page] ROM 加载: ${this._rom.size} 字节, 游戏: ${this._rom.readGameName()}`);

      // 2. Boot 序列 (步骤 1-5: TMSS/VDP/Z80/校验/RAM)
      this.setData({ statusText: '执行 Boot 序列 (步骤 1-5)...' });
      const boot = new BootRom(this._rom, this._ram, this._vdp);
      this._romInits = boot.execute();

      if (!this._romInits) {
        console.error('[Page] Boot 失败 — ROM 校验错误');
        this.setData({ statusText: '错误: ROM 校验失败' });
        return;
      }
      console.log('[Page] ✓ Boot 序列完成');

      // 3. 系统初始化 (步骤 6-13)
      this.setData({ statusText: '执行系统初始化 (步骤 6-13)...' });
      this._romInits.executeAllInits();
      console.log('[Page] ✓ 系统初始化完成');

      // 4. 任务调度系统
      this.setData({ statusText: '启动任务调度系统...' });
      this._taskSystem = new RomTaskSystem(this._rom.getData(), this._ram, this._vdp);

      // 5. 输出 VDP 状态
      console.log('[Page] VDP 寄存器:', Array.from(this._vdp.reg).map((v, i) =>
        `R${i}=${v.toString(16).padStart(2, '0')}`).join(' '));
      console.log('[Page] ✓ 翻译路径就绪, 开始 60fps 主循环');

      this.setData({ statusText: 'Langrisser II — 翻译路径运行中' });

      // 6. 开始 60fps 主循环
      this._running = true;
      this._translationLoop();

    } catch (e) {
      console.error('[Page] 翻译路径启动失败:', e);
      this.setData({ statusText: `错误: ${(e as Error).message}` });
    }
  },

  /**
   * 翻译路径 60fps 主循环
   *
   * 每帧:
   *   1. taskSystem.frameUpdate() — 驱动 ROM 翻译后的逻辑
   *   2. vdp.stepFrame()          — VDP 帧步进
   *   3. renderFrame()            — VDP → ImageData → Canvas
   */
  _translationLoop: function (this: any) {
    if (!this._running) return;

    const taskSystem = this._taskSystem as RomTaskSystem;
    const vdp = this._vdp as VdpChip;
    const renderer = this._renderer as Renderer;
    const platform = this._platform as WechatPlatform;

    // 1. 任务调度 (翻译后的 ROM 逻辑)
    taskSystem.frameUpdate();

    // 2. VDP 帧步进
    vdp.stepFrame();

    // 3. 渲染
    this._renderTranslationFrame();

    // 4. 下一帧
    this._animFrameId = platform.requestFrame(() => this._translationLoop());
  },

  /** VDP → Canvas 渲染 (翻译路径) */
  _renderTranslationFrame() {
    const platform = this._platform as WechatPlatform;
    const renderer = this._renderer as Renderer;
    const ctx = platform.ctx;

    ctx.clearRect(0, 0, platform.displayWidth, platform.displayHeight);
    const imageData = renderer.renderFrame(ctx);
    ctx.putImageData(imageData, 0, 0);
  },

  // ═══════════════════════════════════════════════════════════════════
  // 模拟路径启动 (原有逻辑, 保持不变)
  // ═══════════════════════════════════════════════════════════════════
  async _autoStartEmulator() {
    if (!this._game) return;

    try {
      this.setData({ statusText: 'Langrisser II — 模拟路径启动中...' });
      await this._game.start();
      console.log('[Page] 模拟路径启动成功');
      this.setData({ statusText: 'Langrisser II — 模拟路径运行中' });
    } catch (e) {
      console.error('[Page] 模拟路径启动失败:', e);
      this.setData({ statusText: `错误: ${(e as Error).message}` });
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // 生命周期
  // ═══════════════════════════════════════════════════════════════════

  onShow() {
    console.log('[Page] 显示');
  },

  onHide() {
    console.log('[Page] 隐藏');
    this._stop();
  },

  onUnload() {
    console.log('[Page] 卸载');
    this._stop();
    this._game = null;
    this._rom = null;
    this._ram = null;
    this._vdp = null;
    this._renderer = null;
    this._romInits = null;
    this._taskSystem = null;
    this._platform = null;
  },

  /** 停止运行 (两条路径共用) */
  _stop() {
    this._running = false;
    if (this._animFrameId) {
      this._platform?.cancelFrame(this._animFrameId);
      this._animFrameId = 0;
    }
    // 模拟路径也需要停止 CPU
    if (this._game) {
      try { this._game.stop(); } catch {}
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // 触摸事件转发
  // ═══════════════════════════════════════════════════════════════════
  onCanvasTouch(e: WechatMiniprogram.TouchEvent) {
    if (this._platform) {
      const touches = (e.touches || []).map((t: any) => ({
        x: t.x,
        y: t.y,
        identifier: t.identifier,
      }));
      this._platform.handleTouch('start', touches);
    }
  },
});

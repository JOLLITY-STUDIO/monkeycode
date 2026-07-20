/**
 * 天使之翼2 — 游戏页面 (双 Canvas 对比模式)
 * 左侧: disasm TS 内核 | 右侧: jsnes 参考
 */
import { startGame, resetGame, stopGame } from '../../src/main';
import { createMiniPlatform, MiniGameHandle } from '../../src/platform/miniprogram';
import { BUTTON } from '../../src/types';
import { JsnesKernel } from '../../src/jsnes/jsnes_kernel';

/** 生成简单时间戳字符串，如 "0720_1430" */
function ts(): string {
  const d = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(d.getMonth() + 1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}`;
}

/** 补零两位 */
function pad2(n: number) { return n.toString().padStart(2, '0'); }

Page({
  data: {
    statusText: '初始化中...',
    isLandscape: false,
    /** 顶部安全区高度 (状态栏 + 导航栏) */
    shellTop: 0,
    /** 屏幕宽度 */
    screenWidth: 375,
    /** 屏幕高度 */
    screenHeight: 667,
    /** ROM header 标题 — 从 iNES header 读取 */
    romTitle: '',
    /** trace 文件是否已生成 */
    traceReady: false,
    /** turbo 快进模式: 0=正常 2=2x 3=3x */
    turbo: 0,
    /** 设置面板是否展开 */
    settingsOpen: false,
    /** 是否显示 FPS */
    showFps: false,
    /** 当前 FPS 数值 (jsnes) */
    fps: 0,
    /** 存档槽列表 */
    saveSlots: [] as { name: string; time: string; size: number }[],
    /** 摇杆当前方向 (用于视觉高亮) */
    joystickDir: '',
  },

  gameHandle: null as MiniGameHandle | null,
  jsnesKernel: null as JsnesKernel | null,
  jsnesAnimId: -1,
  jsnesCanvas: null as any,
  dpadState: { up: false, down: false, left: false, right: false },
  btnState: { a: false, b: false, start: false, select: false },

  /** 键盘 → NES 按键映射 (PC 小程序) */
  KEY_MAP: {
    ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
    KeyF: 'a', KeyD: 'b',
    Enter: 'start', Space: 'select', ShiftLeft: 'select',
  } as Record<string, string>,

  onLoad() {
    console.log('[tsubasa] Game page loading');

    this.updateShellLayout();
    this.loadRomTitle();
    this._bindKeys();

    const handle = createMiniPlatform();
    handle.setStatusCb((text: string) => {
      this.setData({ statusText: text });
    });
    this.gameHandle = handle;

    this.initCanvases(handle);
  },

  loadRomTitle() {
    this.setData({ romTitle: 'Captain Tsubasa II - Super Striker (Japan)' });
  },

  /** 获取设备顶部栏高度 & 屏幕尺寸，用于绘制外壳 */
  updateShellLayout() {
    try {
      const info = wx.getSystemInfoSync();
      const menuRect = wx.getMenuButtonBoundingClientRect();
      // 导航栏高度 = 胶囊按钮 bottom + 胶囊按钮与顶部间距*2
      const navBarHeight = (menuRect.top - info.statusBarHeight) * 2 + menuRect.height;
      const shellTop = info.statusBarHeight + navBarHeight;

      this.setData({
        isLandscape: info.windowWidth > info.windowHeight,
        shellTop,
        screenWidth: info.windowWidth,
        screenHeight: info.windowHeight,
      });
      console.log('[tsubasa] shellTop=%d (statusBar=%d + navBar=%d), screen=%dx%d',
        shellTop, info.statusBarHeight, navBarHeight, info.windowWidth, info.windowHeight);
    } catch (_) {
      // fallback
      this.setData({ shellTop: 44 });
    }
  },

  /** 窗口尺寸变化 → 重新检测 */
  onResize() {
    this.updateShellLayout();
    // 延迟查询 dpad (等布局完成)
    setTimeout(() => this._queryDpadRect(), 100);
  },

  onUnload() {
    console.log('[tsubasa] Game page unloading');
    this._unbindKeys();
    stopGame();
    this.stopJsnes();
    this.gameHandle = null;
    this.jsnesKernel = null;
  },

  /** 获取两个 type=2d Canvas 节点 */
  initCanvases(handle: MiniGameHandle) {
    // 模拟器切换设备时 canvas 可能还没渲染好，延迟重试
    const doQuery = () => {
      const query = wx.createSelectorQuery();
      query.select('#game-canvas')
        .fields({ node: true, size: true })
        .select('#jsnes-canvas')
        .fields({ node: true, size: true })
        .exec((res: any) => {
          if (!res || !res[0] || !res[0].node) {
            console.warn('[tsubasa] TS canvas not found, retry in 300ms');
            setTimeout(doQuery, 300);
            return;
          }
          if (!res[1] || !res[1].node) {
            console.warn('[tsubasa] jsnes canvas not found, retry in 300ms');
            setTimeout(doQuery, 300);
            return;
          }

          const tsCanvas = res[0].node;
          const jsnesCanvas = res[1].node;

          // canvas 内部分辨率与 NES PPU 输出匹配 (256x240), CSS 负责缩放
          tsCanvas.width = 256;
          tsCanvas.height = 240;
          jsnesCanvas.width = 256;
          jsnesCanvas.height = 240;
          this.jsnesCanvas = jsnesCanvas;

          handle.setCanvasNode(tsCanvas);

          console.log('[tsubasa] Both type=2d canvases ready (256x240)');

          // 查询 dpad 位置 (用于圆圈摇杆)
          this._queryDpadRect();

          // 左侧: disasm TS 内核 (异步加载分包)
          this._startTSKernel(handle);
          // 右侧: jsnes 参考内核
          this.startJsnes(jsnesCanvas);
        });
    };
    doQuery();
  },

  /** 异步启动 TS 内核查 (需等分包 ROM 数据加载) */
  async _startTSKernel(handle: MiniGameHandle) {
    try {
      await startGame(handle.platform);
    } catch (e) {
      console.error('[tsubasa] TS kernel init error:', e);
      this.setData({ statusText: 'TS 内核启动失败: ' + String(e) });
    }
    this.setData({ statusText: 'TS disasm ← → jsnes 参考' });
  },

  /** 启动 jsnes 内核 + 帧循环 (接收 type=2d canvas node) */
  startJsnes(canvas: any): void {
    try {
      this.jsnesKernel = new JsnesKernel(canvas);
      this.jsnesKernel.start();
      this.jsnesFrameLoop();
      // [已注释] 延迟 trace 第 1 帧 NMI handler → 控制台输出 (修复 TS 内核用)
      // setTimeout(() => this._bootAndTrace(), 200);
    } catch (e) {
      console.error('[tsubasa] jsnes init error:', e);
      this.setData({ statusText: 'jsnes 启动失败: ' + String(e) });
    }
  },

  /** 启动后自动 trace 1 帧 NMI handler → 文件 */
  _bootAndTrace(): void {
    if (!this.jsnesKernel) return;
    const path = `${wx.env.USER_DATA_PATH}/nmi_trace.txt`;
    this.jsnesKernel.traceForFrames(0xC000, 0xFFFF, 1, path);
    const ops = this.jsnesKernel.traceResult?.length || 0;
    this.setData({ statusText: `trace: ${ops} ops → 点"导出"复制到剪贴板`, traceReady: true });
  },

  /** 导出 trace 文件到剪贴板 */
  exportTrace(): void {
    try {
      const path = `${wx.env.USER_DATA_PATH}/nmi_trace.txt`;
      const fs = wx.getFileSystemManager();
      const content = fs.readFileSync(path, 'utf8');
      wx.setClipboardData({
        data: content,
        success: () => {
          wx.showToast({ title: '已复制到剪贴板', icon: 'success' });
        },
        fail: (e: any) => {
          wx.showToast({ title: '复制失败: ' + (e.errMsg || e.message), icon: 'none' });
        },
      });
    } catch (e: any) {
      wx.showToast({ title: '读取失败: ' + (e.errMsg || e.message), icon: 'none' });
    }
  },

  /** 手动触发 NMI 追踪 (调试用) */
  captureNmiTrace(): void {
    if (!this.jsnesKernel) return;
    const tag = ts();
    const path = `${wx.env.USER_DATA_PATH}/nmi_trace_${tag}.txt`;
    this.jsnesKernel.traceForFrames(0xC000, 0xFFFF, 3, path);
    this.setData({ statusText: `NMI trace → nmi_trace_${tag}.txt` });
  },

  /** FPS 计数器 */
  _fpsFrameCount: 0 as number,
  _fpsLastTime: 0 as number,

  /** jsnes 帧循环 — setTimeout 驱动 */
  jsnesFrameLoop(): void {
    if (!this.jsnesKernel?.running) return;

    if (this.data.turbo) {
      // turbo: 每轮 ~14ms 内模拟多帧，实现加速
      // 2x=每轮2帧, 3x=每轮3帧；每帧都传输入保证比赛操作不丢失
      const turboFrames = this.data.turbo; // 2 or 3
      for (let f = 0; f < turboFrames; f++) {
        this.jsnesKernel.setInput(this.computeInput());
        this.jsnesKernel.frame();
      }
      this.jsnesKernel.renderToCanvas();
      // 用 0ms 让帧循环无间歇连续执行
      this.jsnesAnimId = setTimeout(() => this.jsnesFrameLoop(), 0) as any;
    } else {
      // 正常: ~16ms 每帧
      this.jsnesKernel.setInput(this.computeInput());
      this.jsnesKernel.frame();
      this.jsnesKernel.renderToCanvas();
      this.jsnesAnimId = setTimeout(() => this.jsnesFrameLoop(), 16) as any;
    }

    // FPS 统计 (只在显示 FPS 时才计算)
    if (this.data.showFps) {
      this._fpsFrameCount++;
      const now = Date.now();
      if (!this._fpsLastTime) this._fpsLastTime = now;
      const elapsed = now - this._fpsLastTime;
      if (elapsed >= 500) {
        const fps = Math.round(this._fpsFrameCount / (elapsed / 1000));
        this.setData({ fps });
        this._fpsFrameCount = 0;
        this._fpsLastTime = now;
      }
    }
  },

  /** 停止 jsnes */
  stopJsnes(): void {
    if (this.jsnesAnimId >= 0) {
      clearTimeout(this.jsnesAnimId);
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
    // 防御: 小程序热更新可能丢失非 data 属性
    if (!this.dpadState) this.dpadState = { up: false, down: false, left: false, right: false };
    if (!this.btnState)  this.btnState  = { a: false, b: false, start: false, select: false };
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
    // 防御: 小程序热更新可能丢失非 data 属性
    if (!this.dpadState && !this.btnState) return;
    const mask = this.computeInput();
    this.gameHandle?.setInput(mask);
    this.jsnesKernel?.setInput(mask);
  },

  // ---- 键盘支持 (PC 小程序) ----

  _bindKeys() {
    // @ts-ignore — wx.onKeyDown/onKeyUp 仅在 PC 端可用
    if (!wx.onKeyDown || !wx.onKeyUp) {
      console.log('[tsubasa] wx.onKeyDown/onKeyUp not available — no PC keyboard');
      return;
    }
    let fired = false;
    this._onKeyDown = (e: any) => {
      if (!fired) {
        // 首次收到事件时 dump 完整结构，用于诊断 match 哪个字段
        console.log('[tsubasa] keydown event dump', JSON.parse(JSON.stringify(e)));
        fired = true;
      }
      this._handleKey(e, true);
    };
    this._onKeyUp = (e: any) => this._handleKey(e, false);
    wx.onKeyDown(this._onKeyDown);
    wx.onKeyUp(this._onKeyUp);
    console.log('[tsubasa] PC keyboard listeners registered');
  },

  _unbindKeys() {
    if (this._onKeyDown) {
      // @ts-ignore
      wx.offKeyDown?.(this._onKeyDown);
      // @ts-ignore
      wx.offKeyUp?.(this._onKeyUp);
    }
  },

  _handleKey(e: any, pressed: boolean) {
    // 优先 .code (如 "KeyF", "ArrowUp")，PC 客户端无 .code 时 fallback 到 .key
    const code = e.code || e.key;
    if (!code) return;
    const dir = this.KEY_MAP[code];
    if (!dir) {
      // 未匹配到映射，静默忽略
      return;
    }
    // 防御: 小程序热更新可能丢失非 data 属性
    if (!this.dpadState) this.dpadState = { up: false, down: false, left: false, right: false };
    if (!this.btnState)  this.btnState  = { a: false, b: false, start: false, select: false };
    // 方向键在 dpadState
    if (dir === 'up' || dir === 'down' || dir === 'left' || dir === 'right') {
      (this.dpadState as any)[dir] = pressed;
    } else {
      (this.btnState as any)[dir] = pressed;
    }
    this.updateInput();
  },

  // ---- 圆圈摇杆 (高容错率方向键) ----

  _joystickActive: null as string | null,
  _joyTouchId: -1 as number,
  /** dpad 元素尺寸 (px)，在 onReady 时通过 SelectorQuery 获取 */
  _dpadSize: 108 as number,
  /** dpad 左上角相对于页面的坐标 */
  _dpadX: 0 as number,
  _dpadY: 0 as number,

  /** 在 Canvas ready 后查询 dpad 位置和尺寸 */
  _queryDpadRect() {
    const query = wx.createSelectorQuery();
    query.select('.dpad-joystick').boundingClientRect((rect: any) => {
      if (rect) {
        // 横屏 / 竖屏下 dpad 尺寸不同
        this._dpadSize = rect.width > 0 ? rect.width : (this.data.isLandscape ? 106 : 124);
        this._dpadX = rect.left;
        this._dpadY = rect.top;
        console.log(`[tsubasa] dpad rect: ${rect.width}x${rect.height} @ (${rect.left},${rect.top})`);
      }
    }).exec();
  },

  /** 根据触点相对圆心位置，返回方向 (基于 XY 轴分割，45° 对角线) */
  _joyDir(tx: number, ty: number): string {
    const r = this._dpadSize / 2;
    const cx = this._dpadX + r, cy = this._dpadY + r;
    const dx = tx - cx, dy = ty - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const deadRad = r * 0.22;
    if (dist < deadRad) return ''; // 死区

    // 用绝对值比较简化方向判断：以 |dx| vs |dy| 分主方向,
    // 再用 dx/dy 符号判定具体方向。
    // 45° 分界线：|dx| > |dy| 为水平主导（左/右），否则垂直主导（上/下）
    if (Math.abs(dx) > Math.abs(dy)) {
      return dx > 0 ? 'right' : 'left';
    } else {
      return dy > 0 ? 'down' : 'up';
    }
  },

  onJoystickStart(e: any) {
    const t = e.touches[0];
    if (!t) return;
    this._joyTouchId = t.identifier;
    // 小程序 touch 对象没有 t.x/t.y，用 clientX/clientY（视口坐标）配合 _dpadX/_dpadY
    const tx = t.clientX !== undefined ? t.clientX : t.x;
    const ty = t.clientY !== undefined ? t.clientY : t.y;
    const dir = this._joyDir(tx, ty);
    this._applyJoy(dir);
  },

  onJoystickMove(e: any) {
    for (let i = 0; i < e.touches.length; i++) {
      if (e.touches[i].identifier === this._joyTouchId) {
        const t = e.touches[i];
        const tx = t.clientX !== undefined ? t.clientX : t.x;
        const ty = t.clientY !== undefined ? t.clientY : t.y;
        const dir = this._joyDir(tx, ty);
        this._applyJoy(dir);
        return;
      }
    }
  },

  onJoystickEnd(e: any) {
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === this._joyTouchId) {
        this._joyTouchId = -1;
        this._applyJoy('');
        return;
      }
    }
  },

  _applyJoy(dir: string) {
    if (dir === this._joystickActive) return;
    // 防御：小程序热更新可能丢失非 data 属性
    if (!this.dpadState) {
      this.dpadState = { up: false, down: false, left: false, right: false };
    }
    if (this._joystickActive) {
      (this.dpadState as any)[this._joystickActive] = false;
    }
    this._joystickActive = dir || null;
    if (dir) (this.dpadState as any)[dir] = true;
    this.updateInput();
    this.setData({ joystickDir: dir });
  },

  // ---- 设置面板 ----

  onSettingsToggle() {
    const opening = !this.data.settingsOpen;
    this.setData({ settingsOpen: opening });
    if (opening) {
      // 打开设置时暂停游戏
      this.jsnesKernel?.pause();
      this._refreshSaveSlots();
    } else {
      // 关闭设置时恢复游戏
      this.jsnesKernel?.resume();
      if (this.jsnesKernel?.running) {
        this.jsnesFrameLoop();
      }
    }
  },

  onFpsToggle() {
    const showFps = !this.data.showFps;
    this.setData({ showFps });
    if (!showFps) {
      this._fpsFrameCount = 0;
      this._fpsLastTime = 0;
      this.setData({ fps: 0, settingsOpen: false });
    }
  },

  // ---- 存档管理 ----

  SAVE_DIR: `${wx.env.USER_DATA_PATH}/saves`,

  /** 刷新存档槽列表 */
  _refreshSaveSlots() {
    try {
      const fs = wx.getFileSystemManager();
      const dir = this.SAVE_DIR;
      try { fs.accessSync(dir); } catch (_) { fs.mkdirSync(dir, true); }
      const slots: { name: string; time: string; size: number }[] = [];
      for (let i = 0; i < 10; i++) {
        const path = `${dir}/slot_${i}.json`;
        try {
          const stat = fs.statSync(path);
          const d = new Date(stat.lastModifiedTime);
          const time = `${d.getMonth()+1}/${d.getDate()} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
          slots.push({ name: `存档 ${i + 1}`, time, size: stat.size });
        } catch (_) {
          slots.push({ name: `存档 ${i + 1}`, time: '', size: 0 });
        }
      }
      this.setData({ saveSlots: slots });
    } catch (e) { /* ignore */ }
  },

  /** 保存到指定槽位 */
  onSaveSlot(e: any) {
    const idx: number = e.currentTarget.dataset.index;
    if (!this.jsnesKernel) return;
    try {
      const state = this.jsnesKernel.saveState();
      const json = JSON.stringify(state);
      const fs = wx.getFileSystemManager();
      const dir = this.SAVE_DIR;
      try { fs.accessSync(dir); } catch (_) { fs.mkdirSync(dir, true); }
      const path = `${dir}/slot_${idx}.json`;
      fs.writeFileSync(path, json, 'utf8');
      wx.showToast({ title: `已保存到槽 ${idx + 1}`, icon: 'success', duration: 1200 });
      this._refreshSaveSlots();
    } catch (e: any) {
      wx.showToast({ title: '保存失败: ' + (e.errMsg || e.message), icon: 'none' });
    }
  },

  /** 从指定槽位加载 */
  onLoadSlot(e: any) {
    const idx: number = e.currentTarget.dataset.index;
    if (!this.jsnesKernel) return;
    try {
      const fs = wx.getFileSystemManager();
      const path = `${this.SAVE_DIR}/slot_${idx}.json`;
      const json = fs.readFileSync(path, 'utf8');
      const state = JSON.parse(json);
      this.jsnesKernel.loadState(state);
      wx.showToast({ title: `已加载存档 ${idx + 1}`, icon: 'success', duration: 1200 });
    } catch (e: any) {
      wx.showToast({ title: '加载失败: 存档不存在', icon: 'none' });
    }
  },

  /** 删除指定槽位 */
  onDeleteSlot(e: any) {
    const idx: number = e.currentTarget.dataset.index;
    try {
      const fs = wx.getFileSystemManager();
      const path = `${this.SAVE_DIR}/slot_${idx}.json`;
      try { fs.unlinkSync(path); } catch (_) { /* ignore */ }
      wx.showToast({ title: `已删除存档 ${idx + 1}`, icon: 'success', duration: 1200 });
      this._refreshSaveSlots();
    } catch (e: any) {
      wx.showToast({ title: '删除失败', icon: 'none' });
    }
  },

  /** 导出存档到剪贴板 (JSON 文本) */
  onExportSave(e: any) {
    const idx: number = e.currentTarget.dataset.index;
    try {
      const fs = wx.getFileSystemManager();
      const path = `${this.SAVE_DIR}/slot_${idx}.json`;
      const json = fs.readFileSync(path, 'utf8');
      wx.setClipboardData({
        data: json,
        success: () => wx.showToast({ title: `存档 ${idx + 1} 已复制`, icon: 'success', duration: 1500 }),
        fail: (err: any) => wx.showToast({ title: '复制失败', icon: 'none' }),
      });
    } catch (e: any) {
      wx.showToast({ title: '导出失败: 存档不存在', icon: 'none' });
    }
  },

  /** 从剪贴板导入存档到指定槽位 (会覆盖已有存档) */
  onImportSave(e: any) {
    const idx: number = e.currentTarget.dataset.index;
    const that = this;
    wx.getClipboardData({
      success(res: any) {
        const text = res.data;
        if (!text || text.length < 10) {
          wx.showToast({ title: '剪贴板无有效存档数据', icon: 'none' });
          return;
        }
        try {
          JSON.parse(text); // 验证 JSON 合法性
          const fs = wx.getFileSystemManager();
          const dir = that.SAVE_DIR;
          try { fs.accessSync(dir); } catch (_) { fs.mkdirSync(dir, true); }
          const path = `${dir}/slot_${idx}.json`;
          fs.writeFileSync(path, text, 'utf8');
          wx.showToast({ title: `已导入到存档 ${idx + 1}`, icon: 'success', duration: 1500 });
          that._refreshSaveSlots();
        } catch (e: any) {
          wx.showToast({ title: '无效的存档数据', icon: 'none' });
        }
      },
      fail() {
        wx.showToast({ title: '无法读取剪贴板', icon: 'none' });
      },
    });
  },

  // ---- turbo 切换 ----

  onTurboToggle() {
    // 循环: 0(正常) → 2(2x) → 3(3x) → 0
    const next = this.data.turbo === 0 ? 2 : this.data.turbo === 2 ? 3 : 0;
    this.setData({ turbo: next });
  },

  // ---- 方向键 ----

  onDpadDown(e: any) {
    if (!this.dpadState) this.dpadState = { up: false, down: false, left: false, right: false };
    const dir = e.currentTarget.dataset.dir;
    (this.dpadState as any)[dir] = true;
    this.updateInput();
  },

  onDpadUp(e: any) {
    if (!this.dpadState) this.dpadState = { up: false, down: false, left: false, right: false };
    const dir = e.currentTarget.dataset.dir;
    (this.dpadState as any)[dir] = false;
    this.updateInput();
  },

  // ---- 功能键 ----

  onBtnDown(e: any) {
    if (!this.btnState) this.btnState = { a: false, b: false, start: false, select: false };
    const btn = e.currentTarget.dataset.btn;
    (this.btnState as any)[btn] = true;
    this.updateInput();
  },

  onBtnUp(e: any) {
    if (!this.btnState) this.btnState = { a: false, b: false, start: false, select: false };
    const btn = e.currentTarget.dataset.btn;
    (this.btnState as any)[btn] = false;
    this.updateInput();
  },
});

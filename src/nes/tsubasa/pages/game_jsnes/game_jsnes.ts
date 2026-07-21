/**
 * 天使之翼2 — tsnes 单内核页面
 * 单一画布、纯 tsnes 模拟器，用于逐步翻译为 TypeScript
 */
import { BUTTON } from '../../src/types';
import { TsnesKernel } from '../../src/tsnes/tsnes_kernel';

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
    /** ROM header 标题 */
    romTitle: '',
    /** turbo 快进模式: 0=正常 2=2x 3=3x */
    turbo: 0,
    /** 设置面板是否展开 */
    settingsOpen: false,
    /** 是否显示 FPS */
    showFps: false,
    /** 当前 FPS 数值 */
    fps: 0,
    /** 存档槽列表 */
    saveSlots: [] as { name: string; time: string; size: number }[],
    /** 摇杆当前方向 (用于视觉高亮) */
    joystickDir: '',
  },

  tsnesKernel: null as TsnesKernel | null,
  tsnesAnimId: -1,
  tsnesCanvas: null as any,
  dpadState: { up: false, down: false, left: false, right: false },
  btnState: { a: false, b: false, start: false, select: false },

  /** 键盘 → NES 按键映射 (PC 小程序) */
  KEY_MAP: {
    ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
    KeyF: 'a', KeyD: 'b',
    Enter: 'start', Space: 'select', ShiftLeft: 'select',
  } as Record<string, string>,

  onLoad() {
    console.log('[tsnes] Game page loading');

    this.updateShellLayout();
    this.loadRomTitle();
    this._bindKeys();

    this.initCanvas();
  },

  loadRomTitle() {
    this.setData({ romTitle: 'Captain Tsubasa II - Super Striker (Japan) [tsnes]' });
  },

  /** 获取设备顶部栏高度 & 屏幕尺寸 */
  updateShellLayout() {
    try {
      const info = wx.getSystemInfoSync();
      const menuRect = wx.getMenuButtonBoundingClientRect();
      const navBarHeight = (menuRect.top - info.statusBarHeight) * 2 + menuRect.height;
      const shellTop = info.statusBarHeight + navBarHeight;

      this.setData({
        isLandscape: info.windowWidth > info.windowHeight,
        shellTop,
        screenWidth: info.windowWidth,
        screenHeight: info.windowHeight,
      });
      console.log('[tsnes] shellTop=%d (statusBar=%d + navBar=%d), screen=%dx%d',
        shellTop, info.statusBarHeight, navBarHeight, info.windowWidth, info.windowHeight);
    } catch (_) {
      this.setData({ shellTop: 44 });
    }
  },

  /** 窗口尺寸变化 → 重新检测 */
  onResize() {
    this.updateShellLayout();
    setTimeout(() => this._queryDpadRect(), 100);
  },

  onUnload() {
    console.log('[tsnes] Game page unloading');
    this._unbindKeys();
    this.stopTsnes();
    this.tsnesKernel = null;
  },

  /** 获取单个 type=2d Canvas 节点 */
  initCanvas() {
    const doQuery = () => {
      const query = wx.createSelectorQuery();
      query.select('#game-canvas')
        .fields({ node: true, size: true })
        .exec((res: any) => {
          if (!res || !res[0] || !res[0].node) {
            console.warn('[tsnes] canvas not found, retry in 300ms');
            setTimeout(doQuery, 300);
            return;
          }

          const canvas = res[0].node;
          canvas.width = 256;
          canvas.height = 240;
          this.tsnesCanvas = canvas;

          console.log('[tsnes] type=2d canvas ready (256x240)');

          this._queryDpadRect();
          this.startTsnes(canvas);
        });
    };
    doQuery();
  },

  /** 启动 tsnes 内核 + 帧循环 */
  startTsnes(canvas: any): void {
    try {
      this.tsnesKernel = new TsnesKernel(canvas);
      this.tsnesKernel.start();
      this.tsnesFrameLoop();
    } catch (e) {
      console.error('[tsnes] init error:', e);
      this.setData({ statusText: 'tsnes 启动失败: ' + String(e) });
    }
  },

  /** tsnes 帧循环 — setTimeout 驱动 */
  tsnesFrameLoop(): void {
    if (!this.tsnesKernel?.running) return;

    if (this.data.turbo) {
      const turboFrames = this.data.turbo;
      for (let f = 0; f < turboFrames; f++) {
        this.tsnesKernel.setInput(this.computeInput());
        this.tsnesKernel.frame();
      }
      this.tsnesKernel.renderToCanvas();
      this.tsnesAnimId = setTimeout(() => this.tsnesFrameLoop(), 0) as any;
    } else {
      this.tsnesKernel.setInput(this.computeInput());
      this.tsnesKernel.frame();
      this.tsnesKernel.renderToCanvas();
      this.tsnesAnimId = setTimeout(() => this.tsnesFrameLoop(), 16) as any;
    }

    // FPS 统计
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

  /** 停止 tsnes */
  stopTsnes(): void {
    if (this.tsnesAnimId >= 0) {
      clearTimeout(this.tsnesAnimId);
      this.tsnesAnimId = -1;
    }
    if (this.tsnesKernel) {
      this.tsnesKernel.stop();
      this.tsnesKernel = null;
    }
    this.tsnesCanvas = null;
  },

  /** 当前输入掩码 */
  computeInput(): number {
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
    if (!this.dpadState && !this.btnState) return;
    const mask = this.computeInput();
    this.tsnesKernel?.setInput(mask);
  },

  // ---- 键盘支持 (PC 小程序) ----

  _bindKeys() {
    // @ts-ignore
    if (!wx.onKeyDown || !wx.onKeyUp) {
      console.log('[tsnes] wx.onKeyDown/onKeyUp not available');
      return;
    }
    let fired = false;
    this._onKeyDown = (e: any) => {
      if (!fired) {
        console.log('[tsnes] keydown event dump', JSON.parse(JSON.stringify(e)));
        fired = true;
      }
      this._handleKey(e, true);
    };
    this._onKeyUp = (e: any) => this._handleKey(e, false);
    wx.onKeyDown(this._onKeyDown);
    wx.onKeyUp(this._onKeyUp);
    console.log('[tsnes] PC keyboard listeners registered');
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
    const code = e.code || e.key;
    if (!code) return;
    const dir = this.KEY_MAP[code];
    if (!dir) return;
    if (!this.dpadState) this.dpadState = { up: false, down: false, left: false, right: false };
    if (!this.btnState)  this.btnState  = { a: false, b: false, start: false, select: false };
    if (dir === 'up' || dir === 'down' || dir === 'left' || dir === 'right') {
      (this.dpadState as any)[dir] = pressed;
    } else {
      (this.btnState as any)[dir] = pressed;
    }
    this.updateInput();
  },

  // ---- 圆圈摇杆 ----

  _joystickActive: null as string | null,
  _joyTouchId: -1 as number,
  _dpadSize: 108 as number,
  _dpadX: 0 as number,
  _dpadY: 0 as number,

  _queryDpadRect() {
    const query = wx.createSelectorQuery();
    query.select('.dpad-joystick').boundingClientRect((rect: any) => {
      if (rect) {
        this._dpadSize = rect.width > 0 ? rect.width : (this.data.isLandscape ? 106 : 124);
        this._dpadX = rect.left;
        this._dpadY = rect.top;
        console.log(`[tsnes] dpad rect: ${rect.width}x${rect.height} @ (${rect.left},${rect.top})`);
      }
    }).exec();
  },

  _joyDir(tx: number, ty: number): string {
    const r = this._dpadSize / 2;
    const cx = this._dpadX + r, cy = this._dpadY + r;
    const dx = tx - cx, dy = ty - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const deadRad = r * 0.22;
    if (dist < deadRad) return '';
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
      this.tsnesKernel?.pause();
      this._refreshSaveSlots();
    } else {
      this.tsnesKernel?.resume();
      if (this.tsnesKernel?.running) {
        this.tsnesFrameLoop();
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

  _fpsFrameCount: 0 as number,
  _fpsLastTime: 0 as number,

  SAVE_DIR: `${wx.env.USER_DATA_PATH}/saves`,

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

  onSaveSlot(e: any) {
    const idx: number = e.currentTarget.dataset.index;
    if (!this.tsnesKernel) return;
    try {
      const state = this.tsnesKernel.saveState();
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

  onLoadSlot(e: any) {
    const idx: number = e.currentTarget.dataset.index;
    if (!this.tsnesKernel) return;
    try {
      const fs = wx.getFileSystemManager();
      const path = `${this.SAVE_DIR}/slot_${idx}.json`;
      const json = fs.readFileSync(path, 'utf8');
      const state = JSON.parse(json);
      this.tsnesKernel.loadState(state);
      wx.showToast({ title: `已加载存档 ${idx + 1}`, icon: 'success', duration: 1200 });
    } catch (e: any) {
      wx.showToast({ title: '加载失败: 存档不存在', icon: 'none' });
    }
  },

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

  onExportSave(e: any) {
    const idx: number = e.currentTarget.dataset.index;
    try {
      const fs = wx.getFileSystemManager();
      const path = `${this.SAVE_DIR}/slot_${idx}.json`;
      const json = fs.readFileSync(path, 'utf8');
      wx.setClipboardData({
        data: json,
        success: () => wx.showToast({ title: `存档 ${idx + 1} 已复制`, icon: 'success', duration: 1500 }),
        fail: () => wx.showToast({ title: '复制失败', icon: 'none' }),
      });
    } catch (e: any) {
      wx.showToast({ title: '导出失败: 存档不存在', icon: 'none' });
    }
  },

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
          JSON.parse(text);
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

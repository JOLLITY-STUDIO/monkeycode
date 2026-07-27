/**
 * 天使之翼2 — 双 Canvas 对比调试
 * 左: tsnes 框架 (6502 原始模拟器)
 * 右: tsubasanes (纯 TS 语义化重写占位)
 */
import NES from '../../src/tsubasanes/src/nes';
import Controller from '../../src/tsubasanes/src/controller';
import { romUint8Array } from '../../src/rom_data';

/** 补零两位 */
function pad2(n: number) { return n.toString().padStart(2, '0'); }

interface CanvasSlot {
  canvas: any;
  ctx: any;
  imgData: any;
  frameBuf: Uint32Array | null;
}

Page({
  data: {
    statusText: '初始化中...',
    isLandscape: false,
    shellTop: 0,
    screenWidth: 375,
    screenHeight: 667,
    romTitle: '',
    turbo: 0,
    settingsOpen: false,
    showFps: false,
    fps: 0,
    saveSlots: [] as { name: string; time: string; size: number }[],
    joystickDir: '',
  },

  nesLeft: null as NES | null,
  nesRight: null as NES | null,
  animId: -1 as number,
  slotLeft: null as CanvasSlot | null,
  slotRight: null as CanvasSlot | null,
  canvasesReady: 0,
  dpadState: { up: false, down: false, left: false, right: false },
  btnState: { a: false, b: false, start: false, select: false },

  KEY_MAP: {
    ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
    KeyF: 'a', KeyD: 'b',
    Enter: 'start', Space: 'select', ShiftLeft: 'select',
  } as Record<string, string>,

  onLoad() {
    console.log('[tsubasanes] Game page loading');
    this.updateShellLayout();
    this.loadRomTitle();
    this._bindKeys();
    this.setData({ statusText: '正在初始化 NES 模拟器...' });
    this.initCanvas();
  },

  loadRomTitle() {
    this.setData({ romTitle: 'Captain Tsubasa II - Super Striker (Japan)' });
  },

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
    } catch (_) {
      this.setData({ shellTop: 44 });
    }
  },

  onResize() {
    this.updateShellLayout();
    setTimeout(() => this._queryDpadRect(), 100);
  },

  onUnload() {
    console.log('[tsubasanes] Game page unloading');
    this._unbindKeys();
    this.stopEngine();
    this.nesLeft = null;
    this.nesRight = null;
  },

  // ================================================================
  //  Canvas 初始化 — 双 canvas (左 tsnes, 右 tsubasanes)
  // ================================================================

  initCanvas() {
    const query = wx.createSelectorQuery();
    query.select('#tsnes-canvas')
      .fields({ node: true, size: true });
    query.select('#tsubasa-canvas')
      .fields({ node: true, size: true });
    query.exec((res: any) => {
      const leftInfo  = res[0];
      const rightInfo = res[1];
      if (!leftInfo?.node || !rightInfo?.node) {
        console.warn('[tsubasanes] canvases not ready, retry in 300ms');
        setTimeout(() => this.initCanvas(), 300);
        return;
      }

      // 左 canvas — tsnes
      const cnvL = leftInfo.node;
      cnvL.width = 256;
      cnvL.height = 240;
      this.slotLeft = {
        canvas: cnvL,
        ctx: cnvL.getContext('2d'),
        imgData: null,
        frameBuf: null,
      };
      console.log('[tsubasanes] tsnes canvas ready (256x240)');

      // 右 canvas — tsubasanes
      const cnvR = rightInfo.node;
      cnvR.width = 256;
      cnvR.height = 240;
      this.slotRight = {
        canvas: cnvR,
        ctx: cnvR.getContext('2d'),
        imgData: null,
        frameBuf: null,
      };
      console.log('[tsubasanes] tsubasanes canvas ready (256x240)');

      this._queryDpadRect();
      this.startNes();
    });
  },

  // ================================================================
  //  双 NES 实例
  // ================================================================

  startNes(): void {
    try {
      const rom = romUint8Array();
      console.log('[tsubasanes] Loading ROM, size:', rom.length);

      // 左 — tsnes
      this.nesLeft = new NES({
        emulateSound: false,
        onFrame: (buffer: Uint32Array) => {
          if (this.slotLeft) this.slotLeft.frameBuf = buffer;
          this.renderSlot(this.slotLeft);
        },
        onStatusUpdate: (s: string) => {
          console.log('[tsnes-left]', s);
        },
      });
      this.nesLeft.loadROM(rom);

      // 右 — tsubasanes
      this.nesRight = new NES({
        emulateSound: false,
        onFrame: (buffer: Uint32Array) => {
          if (this.slotRight) this.slotRight.frameBuf = buffer;
          this.renderSlot(this.slotRight);
        },
        onStatusUpdate: (s: string) => {
          console.log('[tsubasa-right]', s);
        },
      });
      this.nesRight.loadROM(rom);

      this.setData({ statusText: '双引擎对比运行中 (L: tsnes | R: TS)' });
      this.frameLoop();
    } catch (e: any) {
      console.error('[tsubasanes] NES init error:', e);
      this.setData({ statusText: '启动失败: ' + String(e) });
    }
  },

  renderSlot(slot: CanvasSlot | null): void {
    if (!slot || !slot.frameBuf || !slot.ctx) return;
    const ctx = slot.ctx;
    if (!slot.imgData) {
      slot.imgData = ctx.createImageData(256, 240);
    }
    const data = slot.imgData.data;
    const src = slot.frameBuf;
    for (let i = 0, j = 0; i < src.length; i++, j += 4) {
      const p = src[i];
      data[j]     = p & 0xff;
      data[j + 1] = (p >> 8) & 0xff;
      data[j + 2] = (p >> 16) & 0xff;
      data[j + 3] = 0xff;
    }
    ctx.putImageData(slot.imgData, 0, 0);
  },

  stopEngine(): void {
    if (this.animId >= 0) {
      clearTimeout(this.animId);
      this.animId = -1;
    }
    this.nesLeft = null;
    this.nesRight = null;
    this.slotLeft = null;
    this.slotRight = null;
    this.canvasesReady = 0;
  },

  // ================================================================
  //  帧循环
  // ================================================================

  frameLoop(): void {
    if (!this.nesLeft && !this.nesRight) return;
    const turbo = this.data.turbo;
    const frames = turbo ? turbo : 1;

    try {
      this.applyInput();
      for (let f = 0; f < frames; f++) {
        if (this.nesLeft)  this.nesLeft.frame();
        if (this.nesRight) this.nesRight.frame();
      }
    } catch (e: any) {
      console.error('[tsubasanes] frame error:', e);
      this.setData({ statusText: '运行错误: ' + String(e) });
      return;
    }

    this.animId = setTimeout(() => this.frameLoop(), turbo ? 0 : 16) as any;

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

  _fpsFrameCount: 0 as number,
  _fpsLastTime: 0 as number,

  // ================================================================
  //  输入
  // ================================================================

  applyInput(): void {
    const st = this.dpadState || (this.dpadState = { up: false, down: false, left: false, right: false });
    const bt = this.btnState || (this.btnState = { a: false, b: false, start: false, select: false });

    const doInput = (key: number, pressed: boolean) => {
      if (pressed) {
        if (this.nesLeft)  this.nesLeft.buttonDown(1, key);
        if (this.nesRight) this.nesRight.buttonDown(1, key);
      } else {
        if (this.nesLeft)  this.nesLeft.buttonUp(1, key);
        if (this.nesRight) this.nesRight.buttonUp(1, key);
      }
    };
    doInput(Controller.BUTTON_UP, st.up);
    doInput(Controller.BUTTON_DOWN, st.down);
    doInput(Controller.BUTTON_LEFT, st.left);
    doInput(Controller.BUTTON_RIGHT, st.right);
    doInput(Controller.BUTTON_A, bt.a);
    doInput(Controller.BUTTON_B, bt.b);
    doInput(Controller.BUTTON_START, bt.start);
    doInput(Controller.BUTTON_SELECT, bt.select);
  },

  // ---- 键盘支持 ----

  _bindKeys() {
    // @ts-ignore
    if (!wx.onKeyDown || !wx.onKeyUp) {
      console.log('[tsubasanes] wx.onKeyDown/onKeyUp not available');
      return;
    }
    this._onKeyDown = (e: any) => this._handleKey(e, true);
    this._onKeyUp = (e: any) => this._handleKey(e, false);
    wx.onKeyDown(this._onKeyDown);
    wx.onKeyUp(this._onKeyUp);
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
    if (Math.abs(dx) > Math.abs(dy)) return dx > 0 ? 'right' : 'left';
    return dy > 0 ? 'down' : 'up';
  },

  onJoystickStart(e: any) {
    const t = e.touches[0];
    if (!t) return;
    this._joyTouchId = t.identifier;
    this._applyJoy(this._joyDir(t.clientX ?? t.x, t.clientY ?? t.y));
  },

  onJoystickMove(e: any) {
    for (let i = 0; i < e.touches.length; i++) {
      if (e.touches[i].identifier === this._joyTouchId) {
        const t = e.touches[i];
        this._applyJoy(this._joyDir(t.clientX ?? t.x, t.clientY ?? t.y));
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
    if (!this.dpadState) this.dpadState = { up: false, down: false, left: false, right: false };
    if (this._joystickActive) (this.dpadState as any)[this._joystickActive] = false;
    this._joystickActive = dir || null;
    if (dir) (this.dpadState as any)[dir] = true;
    this.setData({ joystickDir: dir });
  },

  // ---- 设置面板 ----

  onSettingsToggle() {
    const opening = !this.data.settingsOpen;
    this.setData({ settingsOpen: opening });
    if (opening) {
      this.stopTimer();
      this._refreshSaveSlots();
    } else {
      if (this.nesLeft || this.nesRight) this.frameLoop();
    }
  },

  stopTimer(): void {
    if (this.animId >= 0) {
      clearTimeout(this.animId);
      this.animId = -1;
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
          const time = `${d.getMonth() + 1}/${d.getDate()} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
          slots.push({ name: `存档 ${i + 1}`, time, size: stat.size });
        } catch (_) {
          slots.push({ name: `存档 ${i + 1}`, time: '', size: 0 });
        }
      }
      this.setData({ saveSlots: slots });
    } catch (e) { /* ignore */ }
  },

  onSaveSlot(e: any) {
    // TODO: Engine save state support
    wx.showToast({ title: '存档功能待开发', icon: 'none' });
  },

  onLoadSlot(e: any) {
    wx.showToast({ title: '读档功能待开发', icon: 'none' });
  },

  onDeleteSlot(e: any) {
    wx.showToast({ title: '删除功能待开发', icon: 'none' });
  },

  onExportSave(e: any) {
    wx.showToast({ title: '导出功能待开发', icon: 'none' });
  },

  onImportSave(e: any) {
    wx.showToast({ title: '导入功能待开发', icon: 'none' });
  },

  // ---- turbo ----

  onTurboToggle() {
    const next = this.data.turbo === 0 ? 2 : this.data.turbo === 2 ? 3 : 0;
    this.setData({ turbo: next });
  },

  // ---- 方向键 ----

  onDpadDown(e: any) {
    if (!this.dpadState) this.dpadState = { up: false, down: false, left: false, right: false };
    (this.dpadState as any)[e.currentTarget.dataset.dir] = true;
  },

  onDpadUp(e: any) {
    if (!this.dpadState) this.dpadState = { up: false, down: false, left: false, right: false };
    (this.dpadState as any)[e.currentTarget.dataset.dir] = false;
  },

  // ---- 功能键 ----

  onBtnDown(e: any) {
    if (!this.btnState) this.btnState = { a: false, b: false, start: false, select: false };
    (this.btnState as any)[e.currentTarget.dataset.btn] = true;
  },

  onBtnUp(e: any) {
    if (!this.btnState) this.btnState = { a: false, b: false, start: false, select: false };
    (this.btnState as any)[e.currentTarget.dataset.btn] = false;
  },
});

/**
 * NES 模拟器 — 可移植分包页面
 *
 * 依赖：
 *   ../src/platform/miniprogram  — 平台适配
 *   ../src/types                  — BUTTON 常量
 *   ../src/jsnes/jsnes_kernel     — jsnes 内核
 *
 * 仅包含 jsnes 仿真 + ROM 数据，不含 TS 反汇编/调试功能。
 */
import { createMiniPlatform, MiniGameHandle } from '../../src/platform/miniprogram';
import { BUTTON } from '../../src/types';
import { JsnesKernel } from '../../src/jsnes/jsnes_kernel';

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
    /** turbo 快进模式: 0=正常 2=2x 3=3x */
    turbo: 0,
    /** 设置面板是否展开 */
    settingsOpen: false,
    /** 是否显示 FPS */
    showFps: false,
    /** 是否锁定横屏 */
    lockLandscape: true,
    /** 当前 FPS 数值 (jsnes) */
    fps: 0,
    /** 存档槽列表 */
    saveSlots: [] as { name: string; time: string; size: number }[],
    /** 摇杆当前方向 (用于视觉高亮) */
    joystickDir: '',
    /** 缩放模式: 'fit'=原比例撑满 | 'stretch'=全屏拉伸 | 'native'=原生256x240 */
    scaleMode: 'fit' as 'fit' | 'stretch' | 'native',
    /** 是否显示 HUD 虚拟按键 */
    showHud: true,
    /** canvas CSS 显示样式 — fit/native 时设为 "width:Xpx;height:Ypx", stretch 时为空走 CSS 100% */
    canvasStyle: '' as string,
    /** 浮动工具栏显隐 (视频播放器风格, 3s 自动隐藏) */
    showToolbar: true as boolean,
    /** 外壳颜色: purple | cream | pink | black */
    shellColor: 'purple' as 'purple' | 'cream' | 'pink' | 'black',
    /** 设置子页面: ''=主菜单 | 'save'=存档管理 */
    settingsPage: '' as string,
  },

  gameHandle: null as MiniGameHandle | null,
  jsnesKernel: null as JsnesKernel | null,
  jsnesAnimId: -1,
  jsnesCanvas: null as any,
  dpadState: null as any,
  btnState: null as any,

  /** 键盘 → NES 按键映射 (PC 小程序) */
  KEY_MAP: {
    ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
    KeyF: 'a', KeyD: 'b',
    Enter: 'start', Space: 'select', ShiftLeft: 'select',
  } as Record<string, string>,

  onLoad() {
    console.log('[nes-emulator] Page loading');

    // 初始化输入状态
    this.dpadState = { up: false, down: false, left: false, right: false };
    this.btnState = { a: false, b: false, start: false, select: false };

    // 默认锁定横屏
    this.setData({ lockLandscape: true });
    wx.setPageOrientation({ orientation: 'landscape' });

    this.updateShellLayout();
    this.loadRomTitle();
    this._bindKeys();

    const handle = createMiniPlatform();
    handle.setStatusCb((text: string) => {
      this.setData({ statusText: text });
    });
    this.gameHandle = handle;

    this.initCanvases(handle);

    // 启动工具栏 3s 自动隐藏计时器
    this._resetToolbarTimer();
  },

  loadRomTitle() {
    this.setData({ romTitle: 'Captain Tsubasa II - Super Striker (Japan)' });
  },

  /** 获取设备顶部栏高度 & 屏幕尺寸，用于绘制外壳 */
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
      console.log('[nes-emulator] shellTop=%d (statusBar=%d + navBar=%d), screen=%dx%d',
        shellTop, info.statusBarHeight, navBarHeight, info.windowWidth, info.windowHeight);
    } catch (_) {
      this.setData({ shellTop: 44 });
    }
  },

  /** 窗口尺寸变化 → 重新检测 */
  onResize() {
    this.updateShellLayout();
    this._applyCanvasScale(this.data.scaleMode);
    setTimeout(() => this._queryDpadRect(), 100);
  },

  onUnload() {
    console.log('[nes-emulator] Page unloading');
    this._unbindKeys();
    this.stopJsnes();
    this.gameHandle = null;
    this.jsnesKernel = null;
  },

  /** 获取 type=2d Canvas 节点 */
  initCanvases(handle: MiniGameHandle) {
    const doQuery = () => {
      const query = wx.createSelectorQuery();
      query.select('#jsnes-canvas')
        .fields({ node: true, size: true })
        .exec((res: any) => {
          if (!res || !res[0] || !res[0].node) {
            console.warn('[nes-emulator] jsnes canvas not found, retry in 300ms');
            setTimeout(doQuery, 300);
            return;
          }

          const jsnesCanvas = res[0].node;
          jsnesCanvas.width = 256;
          jsnesCanvas.height = 240;
          this.jsnesCanvas = jsnesCanvas;

          console.log('[nes-emulator] type=2d canvas ready (256x240)');
          this._queryDpadRect();
          this.startJsnes(jsnesCanvas);
        });
    };
    doQuery();
  },

  /** 启动 jsnes 内核 + 帧循环 */
  startJsnes(canvas: any): void {
    try {
      this.jsnesKernel = new JsnesKernel(canvas);
      this.jsnesKernel.start();
      this._applyCanvasScale(this.data.scaleMode);
      this.jsnesFrameLoop();
    } catch (e) {
      console.error('[nes-emulator] jsnes init error:', e);
      this.setData({ statusText: 'jsnes 启动失败: ' + String(e) });
    }
  },

  // ---- FPS / delta-time 循环 ----

  _fpsFrameCount: 0 as number,
  _fpsLastTime: 0 as number,
  _nesAccumulator: 0 as number,
  _lastFrameTime: 0 as number,
  NES_FRAME_MS: 1000 / 60 as number,

  /** jsnes 帧循环 — delta-time 驱动 */
  jsnesFrameLoop(): void {
    if (!this.jsnesKernel?.running) return;

    const now = Date.now();

    if (this.data.turbo) {
      const turboFrames = this.data.turbo;
      for (let f = 0; f < turboFrames; f++) {
        this.jsnesKernel.setInput(this.computeInput());
        this.jsnesKernel.frame();
      }
      this.jsnesKernel.renderToCanvas();
      this.jsnesAnimId = setTimeout(() => this.jsnesFrameLoop(), 0) as any;

      if (this.data.showFps) {
        this._fpsFrameCount++;
      }
    } else {
      if (!this._lastFrameTime) this._lastFrameTime = now;
      const elapsed = now - this._lastFrameTime;
      this._lastFrameTime = now;
      this._nesAccumulator += elapsed;

      if (this._nesAccumulator > this.NES_FRAME_MS * 3) {
        this._nesAccumulator = this.NES_FRAME_MS * 3;
      }

      let framesDone = 0;
      while (this._nesAccumulator >= this.NES_FRAME_MS && framesDone < 4) {
        this.jsnesKernel.setInput(this.computeInput());
        this.jsnesKernel.frame();
        this._nesAccumulator -= this.NES_FRAME_MS;
        framesDone++;
      }

      if (framesDone > 0) {
        this.jsnesKernel.renderToCanvas();
      }

      this.jsnesAnimId = setTimeout(() => this.jsnesFrameLoop(), 8) as any;

      if (this.data.showFps) {
        this._fpsFrameCount += framesDone;
      }
    }

    if (this.data.showFps) {
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
    if (!this.dpadState || !this.btnState) return 0;
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
    this.jsnesKernel?.setInput(mask);
  },

  // ---- 键盘支持 (PC 小程序) ----

  _bindKeys() {
    // @ts-ignore
    if (!wx.onKeyDown || !wx.onKeyUp) {
      console.log('[nes-emulator] wx.onKeyDown/onKeyUp not available — no PC keyboard');
      return;
    }
    let fired = false;
    this._onKeyDown = (e: any) => {
      if (!fired) {
        console.log('[nes-emulator] keydown event dump', JSON.parse(JSON.stringify(e)));
        fired = true;
      }
      this._handleKey(e, true);
    };
    this._onKeyUp = (e: any) => this._handleKey(e, false);
    wx.onKeyDown(this._onKeyDown);
    wx.onKeyUp(this._onKeyUp);
    console.log('[nes-emulator] PC keyboard listeners registered');
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
  _toolbarTimer: 0 as number,
  TOOLBAR_TIMEOUT: 3000 as number,
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
        console.log(`[nes-emulator] dpad rect: ${rect.width}x${rect.height} @ (${rect.left},${rect.top})`);
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
    this.setData({ settingsOpen: opening, showToolbar: true });
    if (opening) {
      if (this._toolbarTimer) clearTimeout(this._toolbarTimer);
      this.jsnesKernel?.pause();
      this._refreshSaveSlots();
    } else {
      this.jsnesKernel?.resume();
      if (this.jsnesKernel?.running) {
        this.jsnesFrameLoop();
      }
      this._resetToolbarTimer();
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

  onLockLandscapeToggle() {
    const lock = !this.data.lockLandscape;
    this.setData({ lockLandscape: lock });
    if (lock) {
      wx.setPageOrientation({ orientation: 'landscape' });
    } else {
      wx.setPageOrientation({ orientation: 'auto' });
    }
  },

  onScaleModeToggle() {
    const modes: ('fit' | 'stretch' | 'native')[] = ['fit', 'stretch', 'native'];
    const cur = this.data.scaleMode;
    const idx = modes.indexOf(cur);
    const next = modes[(idx + 1) % modes.length];
    this.setData({ scaleMode: next });
    this._applyCanvasScale(next);
  },

  _applyCanvasScale(mode: 'fit' | 'stretch' | 'native') {
    // 直接从系统 API 读取最新尺寸
    // 画布现在是 page-root 的直接 flex 子元素, 不嵌套在壳中, 计算更简单
    const info = wx.getSystemInfoSync();
    const sw = info.windowWidth;
    const sh = info.windowHeight;
    const isPortrait = sw <= sh;

    if (mode === 'native') {
      this.setData({ canvasStyle: 'width: 256px; height: 240px;' });
    } else if (mode === 'stretch') {
      this.setData({ canvasStyle: '' });
    } else {
      // fit: 保持 256:240 比例
      // 竖屏: 扣除顶栏安全区 + HUD(170px)
      // 横屏: game-screen flex:1 撑满剩余空间 (topbar 在 fit 模式被 CSS 隐藏)
      const availH = isPortrait ? (sh - this.data.shellTop - 170) : sh;
      const availW = sw;
      const scale = Math.min(availW / 256, Math.max(availH / 240, 0.5));
      const w = Math.round(256 * scale);
      const h = Math.round(240 * scale);
      this.setData({ canvasStyle: `width: ${w}px; height: ${h}px;` });
    }
  },

  onNoop() {},

  onHudToggle() {
    this.setData({ showHud: !this.data.showHud });
  },

  onShellColorToggle() {
    const colors: ('purple' | 'cream' | 'pink' | 'black')[] = ['purple', 'cream', 'pink', 'black'];
    const idx = colors.indexOf(this.data.shellColor);
    this.setData({ shellColor: colors[(idx + 1) % colors.length] });
  },

  onSettingsPage(e: any) {
    const page = e.currentTarget.dataset.page || '';
    this.setData({ settingsPage: page });
  },

  onSettingsClose() {
    this.setData({ settingsOpen: false, settingsPage: '' });
  },

  // ---- 浮动工具栏 ----

  onCanvasTap() {
    const show = !this.data.showToolbar;
    this.setData({ showToolbar: show });
    if (show) this._resetToolbarTimer();
  },

  onToolbarAction(e: any) {
    this._resetToolbarTimer();
  },

  onToolbarSettings() {
    this._resetToolbarTimer();
    this.onSettingsToggle();
  },

  onToolbarScale() {
    this._resetToolbarTimer();
    this.onScaleModeToggle();
  },

  onToolbarLock() {
    this._resetToolbarTimer();
    this.onLockLandscapeToggle();
  },

  onToolbarHud() {
    this._resetToolbarTimer();
    this.onHudToggle();
  },

  _resetToolbarTimer() {
    if (this._toolbarTimer) clearTimeout(this._toolbarTimer);
    this._toolbarTimer = setTimeout(() => {
      this.setData({ showToolbar: false });
    }, this.TOOLBAR_TIMEOUT) as any;
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
        fail: (err: any) => wx.showToast({ title: '复制失败', icon: 'none' }),
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
});

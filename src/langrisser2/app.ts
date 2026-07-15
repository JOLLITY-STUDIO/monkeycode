/**
 * app.ts — Langrisser II 小程序入口
 *
 * 对应 Web 版 index.html + main.ts 的起始逻辑
 * 职责: 平台 polyfill + 系统信息采集
 *
 * 关键 polyfill (顶层执行, 确保所有模块加载前已注入):
 *   - window 全局对象 (SoundSystem.ts 依赖 window.AudioContext)
 *   - localStorage (SaveSystem.ts 依赖)
 */

// ═══════════════════════════════════════════════════════════════════════════
// 【关键】顶层 polyfill — 必须在任何其他模块导入/执行之前注入
// 小程序模块作用域中不存在 window 全局变量
// ═══════════════════════════════════════════════════════════════════════════
const _g = globalThis as any;

if (typeof _g.window === 'undefined') {
  _g.window = _g;
}

if (typeof _g.AudioContext === 'undefined') {
  _g.AudioContext = class StubAudioContext {
    readonly sampleRate = 44100;
    readonly state = 'suspended';
    readonly destination = { connect() {}, disconnect() {} };
    createGain() { return { connect() {}, disconnect() {}, gain: { value: 1 } }; }
    createBuffer(c: number, l: number, _sr: number) {
      return { length: l, numberOfChannels: c, getChannelData(_ch: number) { return new Float32Array(l); } };
    }
    createBufferSource() {
      return { buffer: null, connect() {}, disconnect() {}, start() {}, onended: null as any };
    }
    resume() { return Promise.resolve(); }
    close() {}
  };
}

if (typeof _g.localStorage === 'undefined') {
  _g.localStorage = {
    getItem(key: string): string | null {
      try { const v = wx.getStorageSync(key); return v || null; } catch { return null; }
    },
    setItem(key: string, value: string): void {
      try { wx.setStorageSync(key, value); } catch {}
    },
    removeItem(key: string): void {
      try { wx.removeStorageSync(key); } catch {}
    },
    clear(): void {
      try { wx.clearStorageSync(); } catch {}
    },
    get length(): number {
      try { return wx.getStorageInfoSync().keys.length; } catch { return 0; }
    },
    key(index: number): string | null {
      try { return wx.getStorageInfoSync().keys[index] || null; } catch { return null; }
    },
  };
}

console.log('[Polyfill] window, AudioContext, localStorage — 已注入');

// ═══════════════════════════════════════════════════════════════════════════
// 小程序 App
// ═══════════════════════════════════════════════════════════════════════════

interface IAppOption {
  globalData: {
    canvasWidth: number;
    canvasHeight: number;
    pixelRatio: number;
    screenWidth: number;
    screenHeight: number;
    audioReady: boolean;
  };
}

App<IAppOption>({
  globalData: {
    canvasWidth: 320,
    canvasHeight: 224,
    pixelRatio: 1,
    screenWidth: 375,
    screenHeight: 667,
    audioReady: false,
  },

  onLaunch() {
    try {
      // 使用新版 API (wx.getSystemInfoSync 已废弃)
      const winInfo = wx.getWindowInfo();
      const devInfo = wx.getDeviceInfo();
      const appInfo = wx.getAppBaseInfo();

      this.globalData.pixelRatio = winInfo.pixelRatio;
      this.globalData.screenWidth = winInfo.screenWidth;
      this.globalData.screenHeight = winInfo.screenHeight;

      console.log('[App] 小程序启动', {
        platform: devInfo.platform,
        version: appInfo.SDKVersion,
        screenW: winInfo.screenWidth,
        screenH: winInfo.screenHeight,
        pixelRatio: winInfo.pixelRatio,
      });
    } catch {
      // 回退到旧 API
      const sysInfo = wx.getSystemInfoSync();
      this.globalData.pixelRatio = sysInfo.pixelRatio;
      this.globalData.screenWidth = sysInfo.screenWidth;
      this.globalData.screenHeight = sysInfo.screenHeight;
      console.log('[App] 小程序启动 (旧 API)');
    }

    // 预检查存储空间
    try {
      const info = wx.getStorageInfoSync();
      console.log('[App] 存储空间:', info.currentSize, '/', info.limitSize, 'KB');
    } catch {
      // 忽略
    }
  },

  onShow() {
    console.log('[App] 小程序显示');
  },

  onHide() {
    console.log('[App] 小程序隐藏');
  },
});

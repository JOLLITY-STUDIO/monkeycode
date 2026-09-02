import {
  AudioScene,
  SeEvent,
  BGM_MANIFEST,
  SE_MANIFEST,
  BGM_VOLUME,
  SE_VOLUME,
} from './soundManifest';

/**
 * 小程序音频控制器 (BGM + SE)。
 *
 * - BGM: 单例 InnerAudioContext, 按场景循环播放, 切场景时同 src 不重复加载。
 * - SE: 每个音效独立 InnerAudioContext, 播放结束后自动销毁。
 * - 音量 / 开关可通过 wx storage 持久化 (键名与 options-scene 保持一致)。
 */

const STORAGE_BGM = 'esds_bgm_enabled';
const STORAGE_SE = 'esds_se_enabled';
const STORAGE_BGM_VOL = 'esds_bgm_volume';
const STORAGE_SE_VOL = 'esds_se_volume';

class AudioService {
  private _bgmCtx: WechatMiniprogram.InnerAudioContext | null = null;
  private _currentBgmSrc = '';
  private _sePool: WechatMiniprogram.InnerAudioContext[] = [];

  bgmEnabled = true;
  seEnabled = true;
  bgmVolume = BGM_VOLUME;
  seVolume = SE_VOLUME;

  constructor() {
    this._loadSettings();
  }

  /** 从 storage 读取开关/音量设置。 */
  private _loadSettings() {
    try {
      const bgm = wx.getStorageSync(STORAGE_BGM);
      this.bgmEnabled = bgm === '' ? true : Boolean(bgm);
    } catch (_e) {
      this.bgmEnabled = true;
    }
    try {
      const se = wx.getStorageSync(STORAGE_SE);
      this.seEnabled = se === '' ? true : Boolean(se);
    } catch (_e) {
      this.seEnabled = true;
    }
    try {
      const bgmVol = wx.getStorageSync(STORAGE_BGM_VOL);
      this.bgmVolume = typeof bgmVol === 'number' ? bgmVol : BGM_VOLUME;
    } catch (_e) {
      this.bgmVolume = BGM_VOLUME;
    }
    try {
      const seVol = wx.getStorageSync(STORAGE_SE_VOL);
      this.seVolume = typeof seVol === 'number' ? seVol : SE_VOLUME;
    } catch (_e) {
      this.seVolume = SE_VOLUME;
    }
  }

  /** 保存开关/音量设置。 */
  private _saveSettings() {
    try {
      wx.setStorageSync(STORAGE_BGM, this.bgmEnabled ? 1 : 0);
      wx.setStorageSync(STORAGE_SE, this.seEnabled ? 1 : 0);
      wx.setStorageSync(STORAGE_BGM_VOL, this.bgmVolume);
      wx.setStorageSync(STORAGE_SE_VOL, this.seVolume);
    } catch (_e) {
      // storage 异常时忽略, 不影响播放
    }
  }

  /** 按场景播放 BGM。 */
  playBgmForScene(scene: AudioScene) {
    const src = BGM_MANIFEST[scene];
    if (!src) return;
    this.playBgm(src);
  }

  /** 直接播放指定 BGM。 */
  playBgm(src: string) {
    if (!this.bgmEnabled) {
      this._currentBgmSrc = src;
      return;
    }
    if (this._currentBgmSrc === src && this._bgmCtx) {
      // 同一段 BGM 已在播放, 不重置
      return;
    }
    this._stopBgmInternal();
    this._currentBgmSrc = src;

    try {
      const ctx = wx.createInnerAudioContext();
      ctx.src = src;
      ctx.loop = true;
      ctx.volume = this.bgmVolume;
      ctx.autoplay = false;
      ctx.onError((err) => {
        console.warn('[AudioService] BGM error', src, err);
      });
      ctx.play();
      this._bgmCtx = ctx;
    } catch (e) {
      console.warn('[AudioService] create BGM context failed', e);
    }
  }

  /** 停止当前 BGM。 */
  stopBgm() {
    this._stopBgmInternal();
    this._currentBgmSrc = '';
  }

  private _stopBgmInternal() {
    if (this._bgmCtx) {
      try {
        this._bgmCtx.stop();
        this._bgmCtx.destroy();
      } catch (_e) {
        // ignore
      }
      this._bgmCtx = null;
    }
  }

  /** 播放指定事件音效。 */
  playSe(event: SeEvent) {
    const src = SE_MANIFEST[event];
    if (!src) return;
    this.playSeSrc(src);
  }

  /** 直接播放任意 SE 文件。 */
  playSeSrc(src: string) {
    if (!this.seEnabled) return;

    try {
      const ctx = wx.createInnerAudioContext();
      ctx.src = src;
      ctx.volume = this.seVolume;
      ctx.autoplay = false;

      const release = () => {
        try {
          ctx.destroy();
        } catch (_e) {
          // ignore
        }
        const idx = this._sePool.indexOf(ctx);
        if (idx >= 0) this._sePool.splice(idx, 1);
      };

      ctx.onEnded(release);
      ctx.onError((err) => {
        console.warn('[AudioService] SE error', src, err);
        release();
      });

      this._sePool.push(ctx);
      ctx.play();
    } catch (e) {
      console.warn('[AudioService] create SE context failed', e);
    }
  }

  /** 设置 BGM 开关。 */
  setBgmEnabled(enabled: boolean) {
    this.bgmEnabled = enabled;
    this._saveSettings();
    if (!enabled) {
      this._stopBgmInternal();
    } else if (this._currentBgmSrc) {
      this.playBgm(this._currentBgmSrc);
    }
  }

  /** 设置 SE 开关。 */
  setSeEnabled(enabled: boolean) {
    this.seEnabled = enabled;
    this._saveSettings();
  }

  /** 设置 BGM 音量。 */
  setBgmVolume(vol: number) {
    this.bgmVolume = Math.max(0, Math.min(1, vol));
    this._saveSettings();
    if (this._bgmCtx) {
      this._bgmCtx.volume = this.bgmVolume;
    }
  }

  /** 设置 SE 音量。 */
  setSeVolume(vol: number) {
    this.seVolume = Math.max(0, Math.min(1, vol));
    this._saveSettings();
  }

  /** 页面卸载时调用, 释放所有音频资源。 */
  destroy() {
    this.stopBgm();
    this._sePool.forEach((ctx) => {
      try {
        ctx.stop();
        ctx.destroy();
      } catch (_e) {
        // ignore
      }
    });
    this._sePool = [];
  }
}

export const audioService = new AudioService();

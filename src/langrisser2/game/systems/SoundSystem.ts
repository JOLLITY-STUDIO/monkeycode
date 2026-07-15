/**
 * SoundSystem — Langrisser II 音乐系统 (平台无关版)
 *
 * Z80 驱动 YM2612 音乐播放
 *   - 浏览器: window.AudioContext
 *   - 小程序: IPlatform.createAudioContext() → wx.createWebAudioContext()
 *
 * 音乐数据: 从 ROM 提取并 Base64 编码为 TS 文件 (game/data/music/)
 */

import { YM2612 } from '../hw/fm/YM2612.js';
import { GamePhase } from '../core/SceneManager.js';
import { MUSIC_DATA_BY_ID, MUSIC_IDS, decodeBase64ToUint8Array } from '../data/MusicIndex.js';
import type {
  IPlatform, IAudioContext, IAudioNode, IAudioBuffer, IAudioSourceNode,
} from '../platform/Platform.js';

export class SoundSystem {
  private ym2612 = new YM2612();

  /** 平台音频上下文 (浏览器 AudioContext 或小程序 IAudioContext) */
  private audioCtx: AudioContext | IAudioContext | null = null;
  /** 增益节点 */
  private audioGain: GainNode | IAudioNode | null = null;

  private isPlaying = false;
  private currentMusicId = -1;
  private volume = 0.7;

  private musicPlayer: MusicPlayer | null = null;

  /** 可选的平台层 (小程序通过此接口创建音频上下文) */
  private _platform: IPlatform | null = null;

  constructor(platform?: IPlatform) {
    this._platform = platform ?? null;
  }

  // ================================================================
  // 音频初始化 (自动检测平台)
  // ================================================================

  async startAudio(): Promise<void> {
    if (this.audioCtx) return;

    // 小程序平台
    if (this._platform) {
      try {
        const mpCtx = await this._platform.createAudioContext();
        this.audioCtx = mpCtx;
        this.audioGain = mpCtx.createGain();
        this.audioGain.connect(mpCtx.destination);
        // @ts-ignore — IAudioNode 无 gain, 但实际有
        if (this.audioGain && (this.audioGain as any).gain) {
          (this.audioGain as any).gain.value = this.volume;
        }
        console.log('[SoundSystem] 小程序 WebAudio 上下文就绪');
        return;
      } catch (e) {
        console.warn('[SoundSystem] 小程序 WebAudio 不可用:', e);
        // 继续尝试浏览器回退
      }
    }

    // 浏览器平台
    if (typeof window !== 'undefined') {
      try {
        const AudioCtx = window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.audioCtx = new AudioCtx();
        this.audioGain = this.audioCtx.createGain();
        (this.audioGain as GainNode).gain.value = this.volume;
        (this.audioGain as GainNode).connect(this.audioCtx.destination);
        console.log('[SoundSystem] 浏览器 AudioContext 就绪');
      } catch (e) {
        console.warn('[SoundSystem] 浏览器 AudioContext 不可用:', e);
      }
    }

    if (!this.audioCtx) {
      console.warn('[SoundSystem] 音频初始化失败 — 静音模式');
    }
  }

  // ================================================================
  // 音乐控制
  // ================================================================

  playMusic(musicId: number): void {
    if (this.currentMusicId === musicId && this.isPlaying) return;

    this.stopMusic();
    this.currentMusicId = musicId;

    const musicEntry = MUSIC_DATA_BY_ID[musicId];
    if (!musicEntry) {
      console.warn(`[SoundSystem] Music ${musicId} not found`);
      return;
    }

    // 自动初始化音频 (首次调用)
    if (!this.audioCtx) {
      this.startAudio().then(() => this._startPlayback(musicEntry));
      return;
    }

    this._startPlayback(musicEntry);
  }

  private _startPlayback(musicEntry: { base64: string }): void {
    if (!this.audioCtx) return;

    const musicData = decodeBase64ToUint8Array(musicEntry.base64);
    this.isPlaying = true;
    this.musicPlayer = new MusicPlayer(this.ym2612, musicData);
    this._startAudioLoop();

    console.log(`[SoundSystem] 播放 Music #${this.currentMusicId} (${musicData.length} bytes)`);
  }

  stopMusic(): void {
    this.isPlaying = false;
    this.currentMusicId = -1;
    this.musicPlayer = null;
    this.ym2612.reset();
  }

  // ================================================================
  // 音频控制
  // ================================================================

  playSFX(sfxId: number): void {
    // TODO: 音效
  }

  setVolume(vol: number): void {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audioGain) {
      // 兼容 GainNode 和 IAudioNode
      if ('gain' in this.audioGain) {
        (this.audioGain as GainNode).gain.value = this.volume;
      }
    }
  }

  getVolume(): number { return this.volume; }
  isMusicPlaying(): boolean { return this.isPlaying; }
  getCurrentMusicId(): number { return this.currentMusicId; }
  getAvailableMusicIds(): number[] { return MUSIC_IDS; }

  // ================================================================
  // 场景音乐映射
  // ================================================================

  playPhaseMusic(phase: GamePhase): void {
    const musicMap: Record<GamePhase, number> = {
      [GamePhase.TITLE]: 0,
      [GamePhase.NAME_INPUT]: 0,
      [GamePhase.SCENARIO_INTRO]: 0,
      [GamePhase.DEPLOY]: 3,
      [GamePhase.BATTLE_MAP]: 1,
      [GamePhase.CHAR_ACTION]: 2,
      [GamePhase.START_MENU]: 0,
      [GamePhase.BATTLE_ANIM]: 0,
      [GamePhase.SHOP]: 4,
      [GamePhase.DIALOGUE]: 5,
      [GamePhase.INTERMISSION]: 6,
      [GamePhase.SAVE_LOAD]: 0,
      [GamePhase.CREDITS]: 8,
      [GamePhase.OPENING]: 7,
    };

    const musicId = musicMap[phase];
    if (musicId !== undefined && musicId >= 0) {
      this.playMusic(musicId);
    }
  }

  // ================================================================
  // 音频循环 (平台无关)
  // ================================================================

  private _startAudioLoop(): void {
    if (!this.audioCtx) return;

    const sampleRate = this.audioCtx.sampleRate;
    const isBrowser = typeof window !== 'undefined' && this.audioCtx instanceof (window.AudioContext || class {});

    const processAudio = async () => {
      if (!this.isPlaying || !this.audioCtx || !this.audioGain) return;

      // 更新 YM2612
      if (this.musicPlayer) {
        this.musicPlayer.update();
      }

      const samples = 512;
      const output = this.ym2612.update(samples);

      // 创建音频缓冲 (浏览器)
      if (isBrowser) {
        const ctx = this.audioCtx as AudioContext;
        const buffer = ctx.createBuffer(2, samples, sampleRate);
        const left = buffer.getChannelData(0);
        const right = buffer.getChannelData(1);
        for (let i = 0; i < samples; i++) {
          left[i] = output[i * 2] * this.volume;
          right[i] = output[i * 2 + 1] * this.volume;
        }

        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(this.audioGain as AudioNode);
        source.start();

        source.onended = () => {
          if (this.isPlaying) processAudio();
        };
      } else {
        // 小程序音频上下文
        const ctx = this.audioCtx as IAudioContext;
        const buffer = ctx.createBuffer(2, samples, sampleRate);
        const left = buffer.getChannelData(0);
        const right = buffer.getChannelData(1);
        for (let i = 0; i < samples; i++) {
          left[i] = output[i * 2] * this.volume;
          right[i] = output[i * 2 + 1] * this.volume;
        }

        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(this.audioGain as IAudioNode);
        source.start();

        source.onended = () => {
          if (this.isPlaying) processAudio();
        };
      }
    };

    processAudio();
  }

  update(): void {
    if (!this.isPlaying || !this.musicPlayer) return;
    this.musicPlayer.update();
  }

  // ================================================================
  // 清理
  // ================================================================

  destroy(): void {
    this.stopMusic();

    if (this.audioCtx) {
      try {
        if (typeof this.audioCtx === 'object' && 'close' in this.audioCtx) {
          (this.audioCtx as AudioContext).close();
        }
      } catch {}
      this.audioCtx = null;
    }

    if (this.audioGain) {
      try { this.audioGain.disconnect(); } catch {}
      this.audioGain = null;
    }
  }
}

// ================================================================
// MusicPlayer — YM2612 数据流播放器
// ================================================================

class MusicPlayer {
  private ym2612: YM2612;
  private data: Uint8Array;
  private offset = 0;

  private currentPort = 0;
  private currentAddr = 0;

  constructor(ym2612: YM2612, data: Uint8Array) {
    this.ym2612 = ym2612;
    this.data = data;
  }

  update(): void {
    // 循环模式: 到达结尾或 0xFF 0xFD 标记 → 重置
    if (this.offset >= this.data.length) {
      this.offset = 0;
      return;
    }

    const addrByte = this.data[this.offset];

    // 0xFF 0xFD = 循环标记
    if (addrByte === 0xFF && this.offset + 1 < this.data.length && this.data[this.offset + 1] === 0xFD) {
      this.offset = 0;
      return;
    }

    // 0xFF = 跳过 (零数据)
    if (addrByte === 0xFF && this.offset + 1 < this.data.length) {
      this.offset += 2;
      return;
    }

    // YM2612 地址写入
    this.currentAddr = addrByte;
    this.currentPort = (this.currentAddr >= 0x80) ? 1 : 0;

    if (this.currentPort === 0) {
      this.ym2612.write(0x4000, this.currentAddr & 0x7F);
    } else {
      this.ym2612.write(0x4002, this.currentAddr & 0x7F);
    }

    this.offset++;

    if (this.offset >= this.data.length) {
      this.offset = 0;
      return;
    }

    // YM2612 数据写入
    const dataByte = this.data[this.offset];
    if (this.currentPort === 0) {
      this.ym2612.write(0x4001, dataByte);
    } else {
      this.ym2612.write(0x4003, dataByte);
    }

    this.offset++;
  }
}

/** 全局单例 (向后兼容) */
export let soundSystem: SoundSystem;
export function initSoundSystem(platform?: IPlatform): SoundSystem {
  soundSystem = new SoundSystem(platform);
  return soundSystem;
}

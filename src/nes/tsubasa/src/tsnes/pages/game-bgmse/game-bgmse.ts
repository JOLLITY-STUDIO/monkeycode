/**
 * game-bgmse — BGM / SE / BGM+SE 多实例混合播放测试
 *
 * 三个按钮:
 *   1. BGM only — 纯 0x58 (开场BGM) 播放
 *   2. SE only  — 纯 SE (SQ2+NOISE) 播放
 *   3. BGM+SE   — 两个 Player 实例同时渲染，叠加输出
 *
 * 原理: 每个 Tsubasa2AudioPlayer 自带独立 PAPU，
 *       各自生成 PCM 采样，加法混合后播给 ScriptProcessor。
 */
import { Tsubasa2AudioPlayer } from '../../mini-audio/bgm-data/index';
import {
  BGM_58_RAW, BGM_58_TRACK_SQ1, BGM_58_TRACK_SQ2, BGM_58_TRACK_TRI, BGM_58_TRACK_NOISE,
  BGM_58_NES_BASE,
} from '../../mini-audio/bgm-data/bgm-sid/BGM_0x58';

const SAMPLE_RATE = 48000;
const SCRIPT_BUF = 2048;
const MAX_FRAMES = 1800; // 30 秒

// 简单测试 SE: dur=2, 升调 → $FF 结束
const TEST_SE_SQ2: readonly number[] = [0x82, 0x00, 0x02, 0x04, 0x06, 0x08, 0x0A, 0x0C, 0x0E, 0xFF];
const TEST_SE_NOISE: readonly number[] = [0x82, 0x10, 0x11, 0x12, 0x13, 0x14, 0x0F, 0x0E, 0x0D, 0xFF];

Page({
  data: {
    status: '初始化...',
    ready: false,
    playing: false,
    playingLabel: '',
    bgmLen: 0,
    seLen: 0,
  },

  // PCM 缓冲区
  _pcmBgm: null as Float32Array | null,
  _pcmSe: null as Float32Array | null,
  _pcmBoth: null as Float32Array | null,
  _activePcm: null as Float32Array | null,
  _playPos: 0,
  _ctx: null as any,
  _scriptNode: null as any,

  // ═══ 生命周期 ═══

  onLoad() {
    setTimeout(() => this._preRenderAll(), 50);
  },

  onUnload() { this._destroy(); },

  // ═══ 预渲染: BGM + SE + 混合 ═══

  _preRenderAll() {
    try {
      // ── 1. BGM ──
      this.setData({ status: '渲染 BGM...' });
      this._pcmBgm = this._renderPlayer(
        BGM_58_TRACK_SQ1, BGM_58_TRACK_SQ2, BGM_58_TRACK_TRI, BGM_58_TRACK_NOISE,
        BGM_58_RAW, BGM_58_NES_BASE,
      );

      // ── 2. SE (SQ2 + NOISE, one-shot) ──
      this.setData({ status: '渲染 SE...' });
      this._pcmSe = this._renderPlayer(
        [], TEST_SE_SQ2, [], TEST_SE_NOISE,
        undefined, undefined, true,
      );

      // ── 3. BGM + SE 混合（两个独立实例同时渲染） ──
      this.setData({ status: '渲染 BGM+SE 混合...' });
      this._pcmBoth = this._renderMixed(
        BGM_58_TRACK_SQ1, BGM_58_TRACK_SQ2, BGM_58_TRACK_TRI, BGM_58_TRACK_NOISE,
        TEST_SE_SQ2, TEST_SE_NOISE,
        BGM_58_RAW, BGM_58_NES_BASE,
      );

      this.setData({
        ready: true,
        bgmLen: this._pcmBgm?.length ?? 0,
        seLen: this._pcmSe?.length ?? 0,
        status: `就绪 | BGM ${Math.round((this._pcmBgm?.length ?? 0) / SAMPLE_RATE)}s | SE ${Math.round((this._pcmSe?.length ?? 0) / SAMPLE_RATE)}s`,
      });
      console.log('[BGMSE] 预渲染完成 BGM:', this._pcmBgm?.length, 'SE:', this._pcmSe?.length, 'BOTH:', this._pcmBoth?.length);
    } catch (e: any) {
      console.error('[BGMSE] 失败:', e);
      this.setData({ status: '失败: ' + (e.message || '') });
    }
  },

  /** 渲染单个 Player 到 PCM */
  _renderPlayer(
    sq1: readonly number[], sq2: readonly number[], tri: readonly number[], noise: readonly number[],
    shared?: readonly number[], nesBase?: number,
    oneShot = false,
  ): Float32Array {
    const player = new Tsubasa2AudioPlayer(SAMPLE_RATE);
    const samples: number[] = [];
    player.setSampleCallback((l: number, r: number) => {
      samples.push((l + r) * 0.5);
    });
    if (oneShot) player.setOneShot(true);
    player.load(sq1, sq2, tri, noise, shared, nesBase);
    player.start();

    for (let f = 0; f < MAX_FRAMES; f++) {
      player.tick();
      if (!player.progress.playing) break;
    }
    return new Float32Array(samples);
  },

  /** 渲染两个 Player 混合：BGM + SE 逐帧交替 tick，采样加法叠加 */
  _renderMixed(
    sq1: readonly number[], sq2: readonly number[], tri: readonly number[], noise: readonly number[],
    seSQ2: readonly number[], seNOISE: readonly number[],
    shared?: readonly number[], nesBase?: number,
  ): Float32Array {
    const bgmSamples: number[] = [];
    const seSamples: number[] = [];

    const bgmPlayer = new Tsubasa2AudioPlayer(SAMPLE_RATE);
    bgmPlayer.setSampleCallback((l: number, r: number) => {
      bgmSamples.push((l + r) * 0.5);
    });
    bgmPlayer.load(sq1, sq2, tri, noise, shared, nesBase);
    bgmPlayer.start();

    const sePlayer = new Tsubasa2AudioPlayer(SAMPLE_RATE);
    sePlayer.setOneShot(true);
    sePlayer.setSampleCallback((l: number, r: number) => {
      seSamples.push((l + r) * 0.5);
    });
    sePlayer.load([], seSQ2, [], seNOISE);
    sePlayer.start();

    for (let f = 0; f < MAX_FRAMES; f++) {
      bgmPlayer.tick();
      sePlayer.tick();
      if (!bgmPlayer.progress.playing && !sePlayer.progress.playing) break;
    }

    // 逐采样加法混合
    const maxLen = Math.max(bgmSamples.length, seSamples.length);
    const mixed = new Float32Array(maxLen);
    for (let i = 0; i < maxLen; i++) {
      const a = bgmSamples[i] ?? 0;
      const b = seSamples[i] ?? 0;
      mixed[i] = Math.max(-1, Math.min(1, (a + b) * 0.7));
    }
    return mixed;
  },

  // ═══ 播放 ═══

  _playPcm(pcm: Float32Array, label: string) {
    if (this.data.playing) this._stop();
    this._activePcm = pcm;
    this._playPos = 0;

    const ctx = wx.createWebAudioContext();
    this._ctx = ctx;
    const self = this;
    const node = ctx.createScriptProcessor(SCRIPT_BUF, 0, 1);
    node.onaudioprocess = function (e: any) {
      const out = e.outputBuffer.getChannelData(0);
      const needed = (out as Float32Array).length;

      for (let i = 0; i < needed; i++) {
        if (self._playPos >= (self._activePcm?.length ?? 0)) break;
        const sample = self._activePcm![self._playPos] ?? 0;
        self._playPos++;
        (out as any)[i] = Math.max(-1, Math.min(1, sample));
      }
    };
    node.connect(ctx.destination);
    this._scriptNode = node;
    ctx.resume();

    this.setData({ playing: true, playingLabel: label, status: `播放: ${label}` });
  },

  _stop() {
    this._destroy();
    this.setData({ playing: false, playingLabel: '', status: '已停止' });
  },

  _destroy() {
    if (this._scriptNode) {
      try { (this._scriptNode as any).onaudioprocess = null; } catch (_) {}
      this._scriptNode = null;
    }
    this._ctx = null;
  },

  // ═══ 按钮事件 ═══

  playBgm() {
    if (!this._pcmBgm) return;
    this._playPcm(this._pcmBgm, 'BGM only');
  },

  playSe() {
    if (!this._pcmSe) return;
    this._playPcm(this._pcmSe, 'SE only');
  },

  playBoth() {
    if (!this._pcmBoth) return;
    this._playPcm(this._pcmBoth, 'BGM + SE');
  },

  stopAudio() {
    this._stop();
  },
});

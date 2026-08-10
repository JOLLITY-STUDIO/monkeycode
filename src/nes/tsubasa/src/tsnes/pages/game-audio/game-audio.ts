/**
 * game-audio — A/B 音频对比
 *
 * A 侧: NES CPU 全模拟器 → PAPU (原始 ROM 音频路径)
 * B 侧: TS 纯引擎 Tsubasa2AudioPlayer → PAPU (无 CPU 依赖)
 *
 * 双栏波形 + 独立通道开关 + 对比播放 (AB / A only / B only)
 */
import NES from '../../src/nes';
import { NES_PRG_ROM, NES_CHR_ROM } from '../../mini-audio/rom-data/index-full';
import { Tsubasa2AudioPlayer, BGM00_RAW, BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE } from '../../mini-audio/bgm-data/index';

const SAMPLE_RATE = 48000;
const PRE_RENDER_FRAMES = 300; // ~5 秒
const SCRIPT_BUF = 2048;

// ─── iNES header: 256KB PRG + 128KB CHR + MMC3 + NTSC ───
// mini-audio 精简 ROM：32 × 8KB PRG，0 CHR
const INES_HEADER = new Uint8Array([
  0x4E, 0x45, 0x53, 0x1A, // NES\x1a
  0x10,                     // PRG: 16 × 16KB = 256KB
  0x10,                     // CHR: 16 × 8KB = 128KB
  0x40,                     // Mapper 4 (MMC3) low nibble
  0x00,                     // Mapper 0 high nibble, iNES 1.0
  0, 0, 0, 0, 0, 0, 0, 0, // padding
  0x01,                     // NTSC
]);

// ─── 波形参数 ───
const WAVE_BUF_MAX = 48000; // ~1秒

Page({
  data: {
    // 状态
    status: '正在加载...',
    ready: false,
    playing: false,
    progress: 0,
    totalFrames: PRE_RENDER_FRAMES,
    elapsedFrames: 0,
    elapsedTime: '0:00',

    // A/B 选择: 'ab' | 'a' | 'b'
    compareMode: 'ab',

    // A 侧通道 (仅供展示，NES 模拟器不能按通道静音)
    chA_SQ1: true,
    chA_SQ2: true,
    chA_TRI: true,
    chA_NOISE: true,

    // B 侧通道 (TS 引擎可操作)
    chB_SQ1: true,
    chB_SQ2: true,
    chB_TRI: true,
    chB_NOISE: true,

    // Canvas 尺寸
    canvasWidth: 375,
    canvasHeight: 100,
  },

  // ─── 内部状态 ───
  _pcmA: null as Float32Array | null, // NES 模拟器 PCM
  _pcmB: null as Float32Array | null, // TS 引擎 PCM
  _playPos: 0,                         // 当前播放采样位置
  _ctx: null as any,
  _scriptNode: null as any,
  _canvasCtxA: null as any,
  _canvasCtxB: null as any,
  _canvasLoop: null as ReturnType<typeof setInterval> | null,
  _waveBufA: [] as number[],
  _waveBufB: [] as number[],

  // ══════════════════════════════════════
  // 生命周期
  // ══════════════════════════════════════

  onLoad() {
    const sysInfo = wx.getSystemInfoSync();
    this.setData({
      canvasWidth: sysInfo.windowWidth - 32,
    });
  },

  onReady() {
    this.setData({ status: '正在预渲染 NES 模拟器音频 (A)...' });
    // 延迟一下让 Canvas 节点挂载
    setTimeout(() => this._initCanvases(), 100);
  },

  onUnload() {
    this._destroy();
  },

  // ══════════════════════════════════════
  // Canvas 初始化
  // ══════════════════════════════════════

  _initCanvases() {
    const query = wx.createSelectorQuery();
    query.select('#waveA')
      .fields({ node: true, size: true });
    query.select('#waveB')
      .fields({ node: true, size: true });
    query.exec((res: any) => {
      const a = res[0];
      const b = res[1];
      if (!a?.node || !b?.node) {
        setTimeout(() => this._initCanvases(), 200);
        return;
      }

      this._setupCanvas(a, '_canvasCtxA');
      this._setupCanvas(b, '_canvasCtxB');

      // 开始预渲染
      this._preRenderAll();
    });
  },

  _setupCanvas(info: any, key: string) {
    const canvas = info.node;
    const ctx = canvas.getContext('2d');
    const dpr = wx.getSystemInfoSync().pixelRatio;
    const w = this.data.canvasWidth;
    const h = this.data.canvasHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
    (this as any)[key] = ctx;
  },

  // ══════════════════════════════════════
  // 预渲染 PCM
  // ══════════════════════════════════════

  async _preRenderAll() {
    const frames = PRE_RENDER_FRAMES;

    try {
      // A 侧: NES 模拟器
      this.setData({ status: 'A侧: 运行 NES CPU 模拟器...' });
      this._pcmA = await this._renderNes(frames);

      // B 侧: TS 引擎
      this.setData({ status: 'B侧: 渲染 TS 音频引擎...' });
      this._pcmB = this._renderTs(frames);

      this.setData({
        ready: true,
        status: '就绪 — 点击播放对比',
        progress: 0,
      });
    } catch (e: any) {
      console.error('[game-audio] 预渲染失败:', e);
      this.setData({ status: '预渲染失败: ' + (e.message || '') });
    }
  },

  /**
   * A 侧: NES CPU 全模拟
   * 每 10 帧 yield 一次让 UI 更新
   */
  _renderNes(frameCount: number): Promise<Float32Array> {
    return new Promise((resolve, reject) => {
      try {
        const prg = new Uint8Array(NES_PRG_ROM);
        const chr = new Uint8Array(NES_CHR_ROM);
        const rom = new Uint8Array(INES_HEADER.length + prg.length + chr.length);
        rom.set(INES_HEADER, 0);
        rom.set(prg, INES_HEADER.length);
        rom.set(chr, INES_HEADER.length + prg.length);

        const nes = new NES({ emulateSound: true, sampleRate: SAMPLE_RATE });
        const samples: number[] = [];
        (nes as any).opts.onAudioSample = (l: number, r: number) => {
          samples.push((l + r) * 0.5);
        };

        nes.loadROM(rom);

        const self = this;
        let f = 0;

        function step() {
          const batch = 10;
          const end = Math.min(f + batch, frameCount);
          for (; f < end; f++) {
            nes.frame();
          }

          self.setData({ progress: f, status: `A侧: ${f}/${frameCount} 帧` });

          if (f < frameCount) {
            setTimeout(step, 0);
          } else {
            resolve(new Float32Array(samples));
          }
        }

        step();
      } catch (e) {
        console.error('[game-audio] NES 模拟渲染失败:', e);
        reject(e);
      }
    });
  },

  /**
   * B 侧: TS 纯引擎
   */
  _renderTs(frameCount: number): Float32Array {
    const player = new Tsubasa2AudioPlayer(SAMPLE_RATE);
    player.load(
      BGM00_TRACK_SQ1, BGM00_TRACK_SQ2,
      BGM00_TRACK_TRI, BGM00_TRACK_NOISE,
      BGM00_RAW, 0xB7AD,
    );
    player.channelMuteMask = this._getMuteMask('B');
    player.start();

    const samples: number[] = [];
    player.setSampleCallback((l: number, r: number) => {
      samples.push((l + r) * 0.5);
    });

    for (let f = 0; f < frameCount && player.progress.playing; f++) {
      player.tick();
    }

    player.setSampleCallback(null);
    return new Float32Array(samples);
  },

  _rerenderB() {
    if (!this.data.ready) return;
    this._pcmB = this._renderTs(PRE_RENDER_FRAMES);
    // 如果正在播放，重新定位
    if (this.data.playing) {
      this._playPos = Math.min(this._playPos, this._pcmB.length);
    }
  },

  // ══════════════════════════════════════
  // 播放控制
  // ══════════════════════════════════════

  _play() {
    if (this.data.playing || !this._pcmA || !this._pcmB) return;

    try {
      const ctx = wx.createWebAudioContext();
      this._ctx = ctx;

      const self = this;
      const node = ctx.createScriptProcessor(SCRIPT_BUF, 0, 1);
      node.onaudioprocess = function (e: any) {
        const out = e.outputBuffer.getChannelData(0);
        const needed = (out as Float32Array).length;
        const mode = self.data.compareMode;

        for (let i = 0; i < needed; i++) {
          if (self._playPos >= (self._pcmA?.length ?? 0)) break;

          const a = self._pcmA![self._playPos] ?? 0;
          const b = self._pcmB![self._playPos] ?? 0;
          self._playPos++;

          let sample = 0;
          if (mode === 'a') sample = a;
          else if (mode === 'b') sample = b;
          else sample = (a + b) * 0.5; // AB 混合

          (out as any)[i] = Math.max(-1, Math.min(1, sample));

          // 记录波形
          if (i % 4 === 0) {
            self._waveBufA.push(a);
            self._waveBufB.push(b);
            if (self._waveBufA.length > WAVE_BUF_MAX) self._waveBufA.shift();
            if (self._waveBufB.length > WAVE_BUF_MAX) self._waveBufB.shift();
          }
        }
      };

      node.connect(ctx.destination);
      this._scriptNode = node;
      ctx.resume();

      this.setData({ playing: true, status: '对比播放中 ♪' });
      this._startCanvasLoop();
    } catch (e: any) {
      console.error('[game-audio] 播放失败:', e);
      this.setData({ status: '播放失败: ' + (e.message || '') });
    }
  },

  _pause() {
    this._stopCanvasLoop();
    if (this._ctx) {
      try { this._ctx.suspend(); } catch (_) { /* ignore */ }
    }
    this.setData({ playing: false, status: '已暂停 ⏸' });
  },

  _stop() {
    this._stopCanvasLoop();
    this._destroy();
    this._playPos = 0;
    this._waveBufA = [];
    this._waveBufB = [];
    if (this.data.ready) {
      this.setData({ playing: false, elapsedFrames: 0, elapsedTime: '0:00', status: '就绪 — 点击播放对比' });
    }
    this._drawBgs();
  },

  _destroy() {
    this._stopCanvasLoop();
    if (this._scriptNode) {
      try { (this._scriptNode as any).onaudioprocess = null; } catch (_) {}
      this._scriptNode = null;
    }
    this._ctx = null;
  },

  togglePlay() {
    if (this.data.playing) {
      this._pause();
    } else {
      this._play();
    }
  },

  // ══════════════════════════════════════
  // A/B 切换
  // ══════════════════════════════════════

  setCompareMode(e: any) {
    const mode = e.currentTarget.dataset.mode;
    this.setData({ compareMode: mode });
  },

  // ══════════════════════════════════════
  // 通道开关 (B 侧)
  // ══════════════════════════════════════

  _getMuteMask(side: string): number {
    const d = this.data as any;
    let mask = 0;
    if (!d[`ch${side}_SQ1`]) mask |= 8;
    if (!d[`ch${side}_SQ2`]) mask |= 4;
    if (!d[`ch${side}_TRI`]) mask |= 2;
    if (!d[`ch${side}_NOISE`]) mask |= 1;
    return mask;
  },

  toggleChannelB(e: any) {
    const ch = e.currentTarget.dataset.ch as string;
    const key = `chB_${ch}`;
    this.setData({ [key]: !(this.data as any)[key] } as any);
    // 重新渲染 B 侧 PCM
    this._rerenderB();
  },

  // ─── A 侧通道仅展示，不可操作 ───
  noop() { /* A 侧通道不可操作 */ },

  // ══════════════════════════════════════
  // Canvas 波形
  // ══════════════════════════════════════

  _drawBgs() {
    this._drawBg(this._canvasCtxA, 'A: NES模拟器');
    this._drawBg(this._canvasCtxB, 'B: TS引擎');
  },

  _drawBg(ctx: any, label: string) {
    if (!ctx) return;
    const w = this.data.canvasWidth;
    const h = this.data.canvasHeight;

    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, w, h);

    // 中心线
    ctx.strokeStyle = '#333355';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();

    // 标签
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(label, 6, 14);
  },

  _drawWave(ctx: any, buf: number[], color: string) {
    if (!ctx) return;
    const w = this.data.canvasWidth;
    const h = this.data.canvasHeight;

    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, w, h);

    // 中心线
    ctx.strokeStyle = '#222244';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();

    if (buf.length < 2) {
      ctx.fillStyle = '#ffd700';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('', 6, 14); // 占位，drawWave 后由外层 drawFrame 统一绘制
      return;
    }

    const step = buf.length / w;
    const halfH = h / 2;

    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let x = 0; x < w; x++) {
      const idx = Math.floor(x * step);
      const sample = buf[idx] ?? 0;
      const y = halfH + sample * halfH * 0.85;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  },

  _drawFrame() {
    // 两个 Canvas 同时绘制
    this._drawWave(this._canvasCtxA, this._waveBufA, '#ff6b6b');
    this._drawWave(this._canvasCtxB, this._waveBufB, '#6bb5ff');

    // 加标签
    [this._canvasCtxA, this._canvasCtxB].forEach((ctx, i) => {
      if (!ctx) return;
      ctx.fillStyle = '#ffd700';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(i === 0 ? 'A: NES模拟器' : 'B: TS引擎', 6, 14);
    });

    // 更新进度
    const frames = Math.floor((this._playPos / SAMPLE_RATE) * 60);
    const secs = Math.floor(this._playPos / SAMPLE_RATE);
    const mins = Math.floor(secs / 60);
    const sec = secs % 60;
    const timeStr = `${mins}:${sec.toString().padStart(2, '0')}`;
    this.setData({
      elapsedFrames: frames,
      elapsedTime: timeStr,
      progress: Math.min(Math.floor(frames / PRE_RENDER_FRAMES * 100), 100),
    });
  },

  _startCanvasLoop() {
    if (this._canvasLoop !== null) return;
    this._canvasLoop = setInterval(() => this._drawFrame(), 16);
  },

  _stopCanvasLoop() {
    if (this._canvasLoop !== null) {
      clearInterval(this._canvasLoop);
      this._canvasLoop = null;
    }
  },
});

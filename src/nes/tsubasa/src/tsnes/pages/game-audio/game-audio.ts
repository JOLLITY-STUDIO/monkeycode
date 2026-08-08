/**
 * game-audio — 使用 mini-audio NesAudio 模拟器直接运行游戏，播放开场 BGM。
 * 干净页面：加载 ROM → 渲染 PCM → WebAudio 播放。
 */
import { NesAudio } from '../../mini-audio/emu/nes-audio';
import { NES_PRG_ROM, NES_CHR_ROM, AUDIO_BANK_IDS } from '../../mini-audio/rom-data/index';

const TOTAL_FRAMES = 4500; // 完整开场动画循环
const SCRIPT_BUF = 2048;

interface AudioState {
  ctx: WxWebAudioContext | null;
  scriptNode: WxScriptProcessorNode | null;
  buffer: Float32Array;
  readPos: number;
  playing: boolean;
}

const state: AudioState = {
  ctx: null,
  scriptNode: null,
  buffer: new Float32Array(0),
  readPos: 0,
  playing: false,
};

Page({
  data: {
    status: '加载 ROM...',
    frameCount: 0,
    totalFrames: TOTAL_FRAMES,
    sampleCount: 0,
    playing: false,
    bankCount: AUDIO_BANK_IDS.length,
  },

  onLoad() {
    this.setData({
      status: `加载 ROM (${AUDIO_BANK_IDS.length} banks)...`,
      bankCount: AUDIO_BANK_IDS.length,
    });
  },

  onReady() {
    // 延迟一点让 UI 先渲染
    setTimeout(() => {
      this.renderAndPlay();
    }, 200);
  },

  onUnload() {
    this.destroyAudio();
  },

  /** 渲染 PCM 并开始播放 */
  renderAndPlay() {
    this.setData({ status: '渲染 PCM 中... (0 帧)' });

    // 分批渲染，每 500 帧更新 UI
    const CHUNK = 500;
    let chunkIndex = 0;

    const prgArr = new Uint8Array(NES_PRG_ROM as number[]);
    const chrArr = new Uint8Array(NES_CHR_ROM as number[]);
    const nes = new NesAudio();
    nes.loadROMArrays(prgArr, chrArr);

    const samples: number[] = [];
    nes.opts.onAudioSample = (l: number, r: number) => {
      samples.push((l + r) / 2);
    };

    const runChunk = () => {
      const start = chunkIndex * CHUNK;
      const end = Math.min(start + CHUNK, TOTAL_FRAMES);
      for (let f = start; f < end; f++) {
        nes.frame();
      }
      chunkIndex++;

      this.setData({
        frameCount: end,
        sampleCount: samples.length,
        status: `渲染 PCM 中... (${end}/${TOTAL_FRAMES} 帧)`,
      });

      if (end < TOTAL_FRAMES) {
        setTimeout(runChunk, 10);
      } else {
        this.setData({ status: '渲染完成，开始播放...' });
        state.buffer = new Float32Array(samples);
        this.startPlayback();
      }
    };

    runChunk();
  },

  /** WebAudio 播放 */
  startPlayback() {
    try {
      const ctx = wx.createWebAudioContext();
      state.ctx = ctx;

      const node = ctx.createScriptProcessor(SCRIPT_BUF, 0, 1);
      node.onaudioprocess = (_e: any) => {
        const output = (_e as any).outputBuffer?.getChannelData(0);
        if (!output) return;
        const buf = state.buffer;
        const len = output.length;
        if (buf.length === 0) {
          for (let i = 0; i < len; i++) output[i] = 0;
        } else {
          for (let i = 0; i < len; i++) {
            output[i] = buf[state.readPos] || 0;
            state.readPos++;
            if (state.readPos >= buf.length) state.readPos = 0; // 循环
          }
        }
      };
      node.connect(ctx.destination);
      state.scriptNode = node;
      state.playing = true;

      this.setData({
        status: '播放中 ♪',
        playing: true,
        frameCount: TOTAL_FRAMES,
      });
    } catch (e: any) {
      this.setData({ status: 'WebAudio 初始化失败: ' + (e.message || '') });
    }
  },

  /** 切换播放/暂停 */
  togglePlay() {
    if (!state.ctx) {
      // 还没渲染完
      return;
    }
    if (state.playing) {
      try { state.ctx.suspend(); } catch (_e) {}
      state.playing = false;
      this.setData({ playing: false, status: '已暂停' });
    } else {
      try { state.ctx.resume(); } catch (_e) {}
      state.playing = true;
      this.setData({ playing: true, status: '播放中 ♪' });
    }
  },

  /** 重头播放 */
  restart() {
    state.readPos = 0;
    if (!state.playing) {
      if (state.ctx) {
        try { state.ctx.resume(); } catch (_e) {}
        state.playing = true;
      }
    }
    this.setData({ playing: true, status: '播放中 ♪' });
  },

  destroyAudio() {
    if (state.scriptNode) {
      try { (state.scriptNode as any).onaudioprocess = null; } catch (_e) {}
      state.scriptNode = null;
    }
    state.ctx = null;
    state.playing = false;
  },
});

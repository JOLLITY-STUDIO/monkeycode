/**
 * mini-audio-page — 使用真实 NES 模拟器播放开场 BGM
 * 
 * 不再使用 mini-audio CPU clone（已验证有 bug），
 * 直接使用 src/nes.ts 真实模拟器渲染音频。
 */
import NES from '../../src/nes';
import { NES_PRG_ROM, NES_CHR_ROM } from '../../rom-data/index';

const NES_HEADER = new Uint8Array([
  0x4E, 0x45, 0x53, 0x1A,   // NES␚
  0x10, 0x10, 0x40, 0x08,
  0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x01,   // NTSC
]);

const SAMPLE_RATE = 48000;
const OPENER_FRAMES = 4500;   // 开场 BGM 完整帧数 (~75秒, F281 开始有声音)
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

/** 使用真实 NES 模拟器生成开场 BGM 音频 */
function renderOpenerBGM(): { samples: Float32Array; frameCount: number; sampleCount: number } {
  const prg = new Uint8Array(NES_PRG_ROM);
  const chr = new Uint8Array(NES_CHR_ROM);
  const rom = new Uint8Array(NES_HEADER.length + prg.length + chr.length);
  rom.set(NES_HEADER, 0);
  rom.set(prg, NES_HEADER.length);
  rom.set(chr, NES_HEADER.length + prg.length);

  const samples: number[] = [];
  const nes = new NES({ emulateSound: true, sampleRate: SAMPLE_RATE });
  nes.loadROM(rom);

  // ── 挂钩 onAudioSample 取 PCM ──
  const origOpts = (nes as any).opts;
  origOpts.onAudioSample = (left: number, right: number) => {
    samples.push((left + right) * 0.5);
  };

  // ── 运行 OPENER_FRAMES 帧（无输入，自动走开场动画 → BGM）──
  const startFrame = Date.now();
  for (let f = 0; f < OPENER_FRAMES; f++) {
    try { nes.frame(); } catch (_e) { break; }
  }
  console.log(`[mini-audio] 渲染 ${OPENER_FRAMES} 帧, ${samples.length} samples, 耗时 ${Date.now() - startFrame}ms`);

  return {
    samples: new Float32Array(samples),
    frameCount: OPENER_FRAMES,
    sampleCount: samples.length,
  };
}

Page({
  data: {
    status: '初始化中...',
    sampleCount: 0,
    currentSe: '开场BGM',
  },

  onLoad() {},
  onReady() { this.startAudio(); },
  onShow() { this.tryResume(); },
  onHide() { /* 不暂停 */ },
  onUnload() { this.destroyAudio(); },

  startAudio() {
    try {
      this.setData({ status: '正在渲染开场BGM (NES 模拟器)...' });

      // 在下一个 tick 渲染，避免阻塞 UI
      setTimeout(() => {
        const result = renderOpenerBGM();
        if (result.sampleCount < 100) {
          this.setData({ status: '渲染失败: 无音频数据' });
          return;
        }

        state.buffer = result.samples;
        state.readPos = 0;

        try {
          const ctx = wx.createWebAudioContext();
          state.ctx = ctx;

          const node = ctx.createScriptProcessor(SCRIPT_BUF, 0, 1);
          node.onaudioprocess = (e: WxAudioProcessEvent) => {
            const buf = state.buffer;
            const output = e.outputBuffer.getChannelData(0);
            const len = output.length;
            if (buf.length === 0) {
              for (let i = 0; i < len; i++) output[i] = 0;
            } else {
              for (let i = 0; i < len; i++) {
                output[i] = buf[state.readPos] || 0;
                state.readPos++;
                if (state.readPos >= buf.length) state.readPos = 0;
              }
            }
          };
          node.connect(ctx.destination);
          state.scriptNode = node;
          ctx.resume();
          state.playing = true;

          this.setData({
            status: '播放中 ♪ 开场BGM',
            sampleCount: result.sampleCount,
            currentSe: '开场BGM (~75秒)',
          });
        } catch (e: any) {
          this.setData({ status: 'WebAudio 初始化失败: ' + (e.message || '') });
        }
      }, 100);

    } catch (e: any) {
      this.setData({ status: '初始化失败: ' + (e.message || '') });
    }
  },

  tryResume() {
    if (state.ctx && !state.playing) {
      try {
        state.ctx.resume();
        state.playing = true;
        this.setData({ status: '播放中 ♪ 已恢复' });
      } catch (_e) { /* ignore */ }
    }
  },

  destroyAudio() {
    if (state.scriptNode) {
      try { state.scriptNode.onaudioprocess = null; } catch (_e) {}
      state.scriptNode = null;
    }
    state.ctx = null;
    state.playing = false;
  },
});

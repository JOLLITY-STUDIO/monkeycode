/**
 * mini-audio-page — 使用 BGM00Player 播放开场动画 BGM。
 * 纯 TS 音序器 + PAPU，无需 CPU 模拟、MMC3、ROM 读取。
 */
import {
  BGM00Player,
  BGM00_RAW,
  BGM00_META,
  BGM00_TRACK_SQ1,
  BGM00_TRACK_SQ2,
  BGM00_TRACK_TRI,
  BGM00_TRACK_NOISE,
} from '../../mini-audio/bgm-data/index';
import { NES_PRG_ROM } from '../../mini-audio/rom-data/index-full';

const SAMPLE_RATE = 48000;
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

/** 分块渲染 BGM00，避免阻塞主线程 */
function renderBGM00Async(
  maxFrames: number,
  onProgress: (frame: number) => void,
  onDone: (samples: Float32Array, frameCount: number) => void,
): void {
  const player = new BGM00Player(SAMPLE_RATE);
  player.setPrgRom(NES_PRG_ROM);
  player.load(BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE, BGM00_RAW, 0xB7AD);
  if (!player.start()) {
    onDone(new Float32Array(0), 0);
    return;
  }

  const pcm: number[] = [];
  const chunk = 60; // 每批 60 帧 ≈ 1 秒
  let frame = 0;

  function step() {
    const target = Math.min(frame + chunk, maxFrames);
    let playing = true;
    player.setSampleCallback((l: number, r: number) => { pcm.push((l + r) * 0.5); });
    while (frame < target && playing) {
      player.tick();
      frame++;
      playing = player.progress.playing;
    }
    player.setSampleCallback(null);

    onProgress(frame);

    if (frame < maxFrames && playing) {
      setTimeout(step, 0);
    } else {
      onDone(new Float32Array(pcm), frame);
    }
  }

  setTimeout(step, 0);
}

Page({
  data: {
    status: '初始化中...',
    sampleCount: 0,
    currentBgm: BGM00_META.name,
    bgmInfo: BGM00_META,
  },

  onLoad() {
    this.setData({ status: '准备就绪', bgmInfo: BGM00_META });
  },
  onReady() { this.startAudio(); },
  onShow() { this.tryResume(); },
  onHide() {},
  onUnload() { this.destroyAudio(); },

  /** 播放 BGM00 */
  playBGM() {
    this.destroyAudio();
    this.startAudio();
  },

  startAudio() {
    try {
      this.setData({ status: '渲染中... BGM00', sampleCount: 0 });

      renderBGM00Async(
        1800,
        (frame) => {
          if (frame % 120 === 0) {
            this.setData({ status: `渲染中... ${Math.round(frame / 60)}s` });
          }
        },
        (samples, frameCount) => {
          if (samples.length < 100) {
            this.setData({ status: '无音频数据' });
            return;
          }

          state.buffer = samples;
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
              status: '播放中 ♪ ' + BGM00_META.name,
              sampleCount: samples.length,
            });
          } catch (e: any) {
            this.setData({ status: 'WebAudio 初始化失败: ' + (e.message || '') });
          }
        },
      );
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
      } catch (_e) {}
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

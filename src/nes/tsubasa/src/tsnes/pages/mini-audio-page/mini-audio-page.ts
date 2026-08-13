/**
 * mini-audio-page — 使用 Tsubasa2AudioPlayer 播放开场动画 BGM (0x58)。
 * 纯 TS 音序器 + PAPU，无需 CPU 模拟、MMC3、ROM 读取。
 */
import { Tsubasa2AudioPlayer } from '../../mini-audio/bgm-data/index';
import {
  BGM_58_RAW,
  BGM_58_META,
  BGM_58_TRACK_SQ1,
  BGM_58_TRACK_SQ2,
  BGM_58_TRACK_TRI,
  BGM_58_TRACK_NOISE,
  BGM_58_NES_BASE,
} from '../../mini-audio/bgm-data/bgm-sid/BGM_0x58';
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

/** 分块渲染开场 BGM (0x58)，避免阻塞主线程 */
function renderBGM58Async(
  maxFrames: number,
  onProgress: (frame: number) => void,
  onDone: (samples: Float32Array, frameCount: number) => void,
): void {
  const player = new Tsubasa2AudioPlayer(SAMPLE_RATE);
  player.setPrgRom(NES_PRG_ROM);
  player.load(BGM_58_TRACK_SQ1, BGM_58_TRACK_SQ2, BGM_58_TRACK_TRI, BGM_58_TRACK_NOISE, BGM_58_RAW, BGM_58_NES_BASE);
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
    currentBgm: BGM_58_META.name,
    bgmInfo: BGM_58_META,
  },

  onLoad() {
    this.setData({ status: '准备就绪', bgmInfo: BGM_58_META });
  },
  onReady() { this.startAudio(); },
  onShow() { this.tryResume(); },
  onHide() {},
  onUnload() { this.destroyAudio(); },

  /** 播放开场 BGM (0x58) */
  playBGM() {
    this.destroyAudio();
    this.startAudio();
  },

  startAudio() {
    try {
      this.setData({ status: '渲染中... 0x58 开场BGM', sampleCount: 0 });

      renderBGM58Async(
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
              status: '播放中 ♪ ' + BGM_58_META.name,
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

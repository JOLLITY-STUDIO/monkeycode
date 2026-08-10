/**
 * game-audio — A/B 对比页面：精简模拟器 vs 纯 TS 音序器 (BGM00Player)。
 *
 * 上半部分：mini-audio NesAudio 模拟器（原始参考）
 * 下半部分：BGM00Player 直接音序器（新实现）
 * 两者完全独立：独立渲染、独立 WebAudio、独立日志。
 */
import { NesAudio } from '../../mini-audio/emu/nes-audio';
// 切换版本:
//   './index'       — 精简版 (9 bank)
//   './index-full'  — 完整版 (32 bank, DMC+音效)
import { NES_PRG_ROM, NES_CHR_ROM, AUDIO_BANK_IDS } from '../../mini-audio/rom-data/index-full';
import {
  BGM00Player,
  BGM00_RAW,
  BGM00_TRACK_SQ1,
  BGM00_TRACK_SQ2,
  BGM00_TRACK_TRI,
  BGM00_TRACK_NOISE,
} from '../../mini-audio/bgm-data/index';

const SAMPLE_RATE = 48000;
const SCRIPT_BUF = 2048;

const EMU_TOTAL_FRAMES = 4500; // ~75s
const SEQ_TOTAL_FRAMES = 1800; // ~30s，覆盖完整 BGM00 轨道

interface AudioEngineState {
  ctx: WxWebAudioContext | null;
  scriptNode: WxScriptProcessorNode | null;
  buffer: Float32Array;
  readPos: number;
  playing: boolean;
}

function createEngineState(): AudioEngineState {
  return {
    ctx: null,
    scriptNode: null,
    buffer: new Float32Array(0),
    readPos: 0,
    playing: false,
  };
}

const emuState: AudioEngineState = createEngineState();
const seqState: AudioEngineState = createEngineState();

/** 分块渲染 BGM00Player，避免阻塞主线程 */
function renderBGM00Async(
  maxFrames: number,
  onProgress: (frame: number) => void,
  onDone: (samples: Float32Array, frameCount: number) => void,
): void {
  const player = new BGM00Player(SAMPLE_RATE);
  player.setPrgRom(NES_PRG_ROM); // DMC 采样从 PRG bank 30/31 读取
  player.load(BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE, BGM00_RAW, 0xB7AD);
  if (!player.start()) {
    onDone(new Float32Array(0), 0);
    return;
  }

  const pcm: number[] = [];
  const chunk = 60;
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
    bankCount: AUDIO_BANK_IDS.length,

    // 精简模拟器
    emuStatus: '等待渲染...',
    emuFrameCount: 0,
    emuTotalFrames: EMU_TOTAL_FRAMES,
    emuSampleCount: 0,
    emuPlaying: false,

    // 纯 TS 音序器
    seqStatus: '等待渲染...',
    seqFrameCount: 0,
    seqTotalFrames: SEQ_TOTAL_FRAMES,
    seqSampleCount: 0,
    seqPlaying: false,
  },

  onLoad() {
    this.setData({
      emuStatus: `加载 ROM (${AUDIO_BANK_IDS.length} banks)...`,
      seqStatus: '准备音序器...',
      bankCount: AUDIO_BANK_IDS.length,
    });
  },

  onReady() {
    // 延迟让 UI 先渲染
    setTimeout(() => {
      this.renderEmu();
      this.renderSeq();
    }, 200);
  },

  onUnload() {
    this.destroyEmu();
    this.destroySeq();
  },

  // ════════════════════════════════════════════════
  // 精简模拟器 (NesAudio)
  // ════════════════════════════════════════════════

  renderEmu() {
    this.setData({ emuStatus: '渲染 PCM 中... (0 帧)' });

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
      const end = Math.min(start + CHUNK, EMU_TOTAL_FRAMES);
      for (let f = start; f < end; f++) {
        nes.frame();
      }
      chunkIndex++;

      this.setData({
        emuFrameCount: end,
        emuSampleCount: samples.length,
        emuStatus: `渲染 PCM 中... (${end}/${EMU_TOTAL_FRAMES} 帧)`,
      });

      if (end < EMU_TOTAL_FRAMES) {
        setTimeout(runChunk, 10);
      } else {
        emuState.buffer = new Float32Array(samples);
        this.setData({
          emuStatus: '渲染完成，等待播放',
          emuPlaying: false,
        });
      }
    };

    runChunk();
  },

  startEmuPlayback() {
    try {
      const ctx = wx.createWebAudioContext();
      emuState.ctx = ctx;

      const node = ctx.createScriptProcessor(SCRIPT_BUF, 0, 1);
      node.onaudioprocess = (e: WxAudioProcessEvent) => {
        const buf = emuState.buffer;
        const output = e.outputBuffer.getChannelData(0);
        const len = output.length;
        if (buf.length === 0) {
          for (let i = 0; i < len; i++) output[i] = 0;
        } else {
          for (let i = 0; i < len; i++) {
            output[i] = buf[emuState.readPos] || 0;
            emuState.readPos++;
            if (emuState.readPos >= buf.length) emuState.readPos = 0;
          }
        }
      };
      node.connect(ctx.destination);
      emuState.scriptNode = node;
      ctx.resume();
      emuState.playing = true;

      this.setData({
        emuStatus: '播放中 ♪ 精简模拟器',
        emuPlaying: true,
      });
    } catch (e: any) {
      this.setData({ emuStatus: 'WebAudio 初始化失败: ' + (e.message || '') });
    }
  },

  toggleEmu() {
    if (!emuState.ctx) {
      this.startEmuPlayback();
      return;
    }
    if (emuState.playing) {
      try { emuState.ctx.suspend(); } catch (_e) {}
      emuState.playing = false;
      this.setData({ emuPlaying: false, emuStatus: '已暂停 — 精简模拟器' });
    } else {
      try { emuState.ctx.resume(); } catch (_e) {}
      emuState.playing = true;
      this.setData({ emuPlaying: true, emuStatus: '播放中 ♪ 精简模拟器' });
    }
  },

  restartEmu() {
    emuState.readPos = 0;
    if (!emuState.playing) {
      if (emuState.ctx) {
        try { emuState.ctx.resume(); } catch (_e) {}
        emuState.playing = true;
      } else {
        this.startEmuPlayback();
      }
    }
    this.setData({ emuPlaying: true, emuStatus: '播放中 ♪ 精简模拟器' });
  },

  destroyEmu() {
    if (emuState.scriptNode) {
      try { (emuState.scriptNode as any).onaudioprocess = null; } catch (_e) {}
      emuState.scriptNode = null;
    }
    emuState.ctx = null;
    emuState.playing = false;
  },

  // ════════════════════════════════════════════════
  // 纯 TS 音序器 (BGM00Player)
  // ════════════════════════════════════════════════

  renderSeq() {
    this.setData({ seqStatus: '渲染 PCM 中... (0 帧)' });

    renderBGM00Async(
      SEQ_TOTAL_FRAMES,
      (frame) => {
        this.setData({
          seqFrameCount: frame,
          seqStatus: `渲染 PCM 中... (${frame}/${SEQ_TOTAL_FRAMES} 帧)`,
        });
      },
      (samples, frameCount) => {
        seqState.buffer = samples;
        this.setData({
          seqFrameCount: frameCount,
          seqSampleCount: samples.length,
          seqStatus: '渲染完成，等待播放',
          seqPlaying: false,
        });
      },
    );
  },

  startSeqPlayback() {
    try {
      const ctx = wx.createWebAudioContext();
      seqState.ctx = ctx;

      const node = ctx.createScriptProcessor(SCRIPT_BUF, 0, 1);
      node.onaudioprocess = (e: WxAudioProcessEvent) => {
        const buf = seqState.buffer;
        const output = e.outputBuffer.getChannelData(0);
        const len = output.length;
        if (buf.length === 0) {
          for (let i = 0; i < len; i++) output[i] = 0;
        } else {
          for (let i = 0; i < len; i++) {
            output[i] = buf[seqState.readPos] || 0;
            seqState.readPos++;
            if (seqState.readPos >= buf.length) seqState.readPos = 0;
          }
        }
      };
      node.connect(ctx.destination);
      seqState.scriptNode = node;
      ctx.resume();
      seqState.playing = true;

      this.setData({
        seqStatus: '播放中 ♪ 纯 TS 音序器',
        seqPlaying: true,
      });
    } catch (e: any) {
      this.setData({ seqStatus: 'WebAudio 初始化失败: ' + (e.message || '') });
    }
  },

  toggleSeq() {
    if (!seqState.ctx) {
      this.startSeqPlayback();
      return;
    }
    if (seqState.playing) {
      try { seqState.ctx.suspend(); } catch (_e) {}
      seqState.playing = false;
      this.setData({ seqPlaying: false, seqStatus: '已暂停 — 纯 TS 音序器' });
    } else {
      try { seqState.ctx.resume(); } catch (_e) {}
      seqState.playing = true;
      this.setData({ seqPlaying: true, seqStatus: '播放中 ♪ 纯 TS 音序器' });
    }
  },

  restartSeq() {
    seqState.readPos = 0;
    if (!seqState.playing) {
      if (seqState.ctx) {
        try { seqState.ctx.resume(); } catch (_e) {}
        seqState.playing = true;
      } else {
        this.startSeqPlayback();
      }
    }
    this.setData({ seqPlaying: true, seqStatus: '播放中 ♪ 纯 TS 音序器' });
  },

  destroySeq() {
    if (seqState.scriptNode) {
      try { (seqState.scriptNode as any).onaudioprocess = null; } catch (_e) {}
      seqState.scriptNode = null;
    }
    seqState.ctx = null;
    seqState.playing = false;
  },
});

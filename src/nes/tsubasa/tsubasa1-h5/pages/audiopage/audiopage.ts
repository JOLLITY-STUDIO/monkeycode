/**
 * 音频测试页面 - 直接测试 Web Audio API 和 NES 风格音频
 *
 * 使用微信小程序的 wx.createWebAudioContext() API
 * 不依赖外部游戏引擎，完全独立的音频测试环境
 */

declare const wx: any;

/** 音轨定义 */
interface TrackDef {
  name: string;
  desc: string;
  /** 各通道的音符序列 (pulse1, pulse2, triangle, noise) */
  sequences: NoteEvent[][];
}

/** 音符事件 */
interface NoteEvent {
  /** MIDI 音符编号 (0-127, -1=休止符) */
  note: number;
  /** 持续时间 (ms) */
  duration: number;
}

/** 音效定义 */
interface SfxDef {
  name: string;
  /** 快速序列: [note, duration_ms, ...] */
  notes: number[];
}

/** NES 音符周期表 (NTSC) — MIDI号 → 频率Hz */
const NOTE_FREQ: Record<number, number> = {};
{
  const A4 = 440;
  for (let midi = 0; midi <= 127; midi++) {
    NOTE_FREQ[midi] = A4 * Math.pow(2, (midi - 69) / 12);
  }
}

// ═══════════════════════════════════════════════
// 测试曲目数据
// ═══════════════════════════════════════════════

/** 简单旋律 - 类似标题画面的上行音阶 */
const TRACK_TITLE: NoteEvent[][] = [
  // Pulse 1: 旋律
  [
    { note: 60, duration: 300 }, { note: 64, duration: 300 },
    { note: 67, duration: 300 }, { note: 72, duration: 600 },
    { note: 71, duration: 300 }, { note: 67, duration: 300 },
    { note: 69, duration: 300 }, { note: 65, duration: 600 },
    { note: -1, duration: 200 },
    { note: 60, duration: 300 }, { note: 64, duration: 300 },
    { note: 67, duration: 300 }, { note: 72, duration: 600 },
    { note: 74, duration: 300 }, { note: 72, duration: 300 },
    { note: 71, duration: 300 }, { note: 67, duration: 900 },
  ],
  // Pulse 2: 和声
  [
    { note: 48, duration: 600 }, { note: -1, duration: 300 },
    { note: 52, duration: 600 }, { note: -1, duration: 300 },
    { note: 53, duration: 600 }, { note: -1, duration: 300 },
    { note: 55, duration: 600 }, { note: -1, duration: 300 },
    { note: 48, duration: 600 }, { note: -1, duration: 300 },
    { note: 52, duration: 600 }, { note: -1, duration: 300 },
    { note: 50, duration: 600 }, { note: -1, duration: 300 },
    { note: 48, duration: 900 }, { note: -1, duration: 200 },
  ],
  // Triangle: 低音
  [
    { note: 36, duration: 1200 },
    { note: 40, duration: 1200 },
    { note: 41, duration: 1200 },
    { note: 43, duration: 1200 },
    { note: 36, duration: 1200 },
    { note: 40, duration: 1200 },
    { note: 38, duration: 1200 },
    { note: 36, duration: 1200 },
  ],
  // Noise: 节奏 (note字段忽略, duration=间隔)
  [
    { note: 0, duration: 250 }, { note: -1, duration: 250 },
    { note: 0, duration: 250 }, { note: -1, duration: 250 },
    { note: 0, duration: 250 }, { note: -1, duration: 250 },
    { note: 0, duration: 250 }, { note: -1, duration: 250 },
    { note: 0, duration: 250 }, { note: -1, duration: 250 },
    { note: 0, duration: 250 }, { note: -1, duration: 250 },
    { note: 0, duration: 250 }, { note: -1, duration: 250 },
    { note: 0, duration: 250 }, { note: -1, duration: 250 },
  ],
];

/** 菜单选择界面BGM - 循环短旋律 */
const TRACK_MENU: NoteEvent[][] = [
  [
    { note: 67, duration: 200 }, { note: 69, duration: 200 },
    { note: 71, duration: 200 }, { note: 72, duration: 400 },
    { note: 71, duration: 200 }, { note: 69, duration: 200 },
    { note: 67, duration: 400 }, { note: -1, duration: 200 },
    { note: 64, duration: 200 }, { note: 65, duration: 200 },
    { note: 67, duration: 200 }, { note: 69, duration: 400 },
    { note: 67, duration: 200 }, { note: 65, duration: 200 },
    { note: 64, duration: 600 },
  ],
  [
    { note: 55, duration: 300 }, { note: 57, duration: 300 },
    { note: 55, duration: 300 }, { note: 60, duration: 300 },
    { note: 59, duration: 300 }, { note: 57, duration: 300 },
    { note: 55, duration: 300 }, { note: -1, duration: 300 },
    { note: 52, duration: 450 }, { note: 53, duration: 450 },
    { note: 55, duration: 300 }, { note: 52, duration: 600 },
  ],
  [
    { note: 43, duration: 600 }, { note: 40, duration: 600 },
    { note: 43, duration: 600 }, { note: 45, duration: 600 },
    { note: 43, duration: 600 }, { note: 40, duration: 600 },
  ],
  [
    { note: 0, duration: 300 }, { note: -1, duration: 150 },
    { note: 0, duration: 150 }, { note: -1, duration: 150 },
    { note: 0, duration: 300 }, { note: -1, duration: 150 },
    { note: 0, duration: 150 }, { note: -1, duration: 300 },
    { note: 0, duration: 300 }, { note: -1, duration: 300 },
    { note: 0, duration: 150 }, { note: -1, duration: 150 },
    { note: 0, duration: 150 }, { note: -1, duration: 300 },
  ],
];

/** 比赛中BGM */
const TRACK_MATCH: NoteEvent[][] = [
  [
    { note: 60, duration: 150 }, { note: 64, duration: 150 },
    { note: 67, duration: 150 }, { note: 72, duration: 150 },
    { note: 71, duration: 150 }, { note: 67, duration: 150 },
    { note: 64, duration: 150 }, { note: 60, duration: 150 },
    { note: 62, duration: 150 }, { note: 65, duration: 150 },
    { note: 69, duration: 150 }, { note: 74, duration: 150 },
    { note: 72, duration: 150 }, { note: 69, duration: 150 },
    { note: 65, duration: 150 }, { note: 62, duration: 150 },
    { note: 64, duration: 150 }, { note: 67, duration: 150 },
    { note: 71, duration: 150 }, { note: 76, duration: 150 },
    { note: 74, duration: 150 }, { note: 71, duration: 150 },
    { note: 67, duration: 150 }, { note: 64, duration: 300 },
  ],
  [
    { note: 48, duration: 150 }, { note: -1, duration: 10 },
    { note: 52, duration: 150 }, { note: -1, duration: 10 },
    { note: 55, duration: 150 }, { note: -1, duration: 10 },
    { note: 60, duration: 150 }, { note: -1, duration: 10 },
    { note: 59, duration: 150 }, { note: -1, duration: 10 },
    { note: 55, duration: 150 }, { note: -1, duration: 10 },
    { note: 52, duration: 150 }, { note: -1, duration: 10 },
    { note: 48, duration: 150 }, { note: -1, duration: 10 },
    { note: 50, duration: 150 }, { note: -1, duration: 10 },
    { note: 53, duration: 150 }, { note: -1, duration: 10 },
    { note: 57, duration: 150 }, { note: -1, duration: 10 },
    { note: 62, duration: 150 }, { note: -1, duration: 10 },
    { note: 60, duration: 300 },
  ],
  [
    { note: 36, duration: 300 }, { note: 36, duration: 300 },
    { note: 38, duration: 300 }, { note: 38, duration: 300 },
    { note: 40, duration: 300 }, { note: 40, duration: 300 },
    { note: 36, duration: 300 }, { note: 36, duration: 300 },
  ],
  [
    { note: 0, duration: 100 }, { note: -1, duration: 50 },
    { note: 0, duration: 100 }, { note: -1, duration: 50 },
    { note: 0, duration: 100 }, { note: -1, duration: 50 },
    { note: 0, duration: 100 }, { note: -1, duration: 50 },
    { note: 0, duration: 100 }, { note: -1, duration: 50 },
    { note: 0, duration: 100 }, { note: -1, duration: 50 },
    { note: 0, duration: 100 }, { note: -1, duration: 50 },
    { note: 0, duration: 150 },
  ],
];

/** 进球音效 */
const SFX_GOAL: number[] = [
  60, 100, 64, 100, 67, 100, 72, 300,
  -1, 100, 72, 400,
];

/** 犯规/吹哨音效 */
const SFX_WHISTLE: number[] = [
  84, 200, 83, 200, 82, 400,
];

/** 胜利音乐 */
const SFX_VICTORY: number[] = [
  60, 150, 64, 150, 67, 150, 72, 300,
  72, 150, 74, 150, 76, 300,
  79, 600,
];

/** 选择确认音效 */
const SFX_SELECT: number[] = [
  72, 80,
];

/** 移动光标音效 */
const SFX_CURSOR: number[] = [
  60, 50,
];

// ═══════════════════════════════════════════════
// NES 通道类型
// ═══════════════════════════════════════════════

const CHANNEL_NAMES = ['Pulse 1', 'Pulse 2', 'Triangle', 'Noise'];
const WAVE_TYPES: OscillatorType[] = ['square', 'square', 'triangle', 'square'];

interface ChState {
  osc: any;
  gain: any;
  active: boolean;
  freq: number;
  volume: number;
  noteIndex: number;
  noteTimer: number;
}

Page({
  data: {
    masterVolume: 70,
    currentTrack: -1,
    tracks: [
      { name: '标题画面 (Title)', desc: 'C大调上行旋律' },
      { name: '菜单选择 (Menu)', desc: '短循环BGM' },
      { name: '比赛BGM (Match)', desc: '快速节奏旋律' },
    ] as Array<{ name: string; desc: string }>,
    audioReady: false,
    playing: false,
    channels: [
      { name: 'Pulse 1', active: false, volume: 0, freq: 0 },
      { name: 'Pulse 2', active: false, volume: 0, freq: 0 },
      { name: 'Triangle', active: false, volume: 0, freq: 0 },
      { name: 'Noise', active: false, volume: 0, freq: 0 },
    ],
    sfxList: [
      { name: '⚽ 进球' },
      { name: '📢 哨声' },
      { name: '🏆 胜利' },
      { name: '✅ 确认' },
      { name: '➡ 移动' },
    ],
    logs: [] as string[],
  },

  /** Web Audio Context */
  _ctx: null as any,
  /** 通道状态 */
  _chs: [] as ChState[],
  /** 选中的曲目序列 */
  _trackSeq: [] as NoteEvent[][],
  /** 播放定时器 */
  _playTimer: null as any,
  /** 全局 masterGain */
  _masterGain: null as any,
  /** 噪声缓冲区 */
  _noiseBuffer: null as any,

  onLoad() {
    this.addLog('页面加载，初始化音频...');
    this.initAudio();
  },

  onUnload() {
    this.stopPlayback();
    this.destroyAudio();
  },

  /** 初始化 Web Audio */
  initAudio() {
    try {
      if (typeof wx !== 'undefined' && typeof wx.createWebAudioContext === 'function') {
        this._ctx = wx.createWebAudioContext();
        this.addLog(`✅ WebAudioContext 创建成功 (SR=${this._ctx.sampleRate}Hz)`);
      } else {
        this.addLog('❌ wx.createWebAudioContext 不可用');
        return;
      }

      // 创建主音量节点
      this._masterGain = this._ctx.createGain();
      this._masterGain.gain.value = this.data.masterVolume / 100 * 0.5;
      this._masterGain.connect(this._ctx.destination);

      // 创建噪声缓冲区
      this.createNoiseBuffer();

      // 初始化 4 个通道
      for (let ch = 0; ch < 4; ch++) {
        this._chs.push({
          osc: null,
          gain: null,
          active: false,
          freq: 0,
          volume: 0,
          noteIndex: 0,
          noteTimer: 0,
        });
      }

      this.setData({ audioReady: true });
      this.addLog('✅ 音频引擎就绪');

      // 启动状态更新循环 (每100ms刷新UI)
      this.startStatusLoop();
    } catch (e: any) {
      this.addLog(`❌ 初始化失败: ${e?.message || e}`);
    }
  },

  /** 创建噪声缓冲区 (1秒白噪声) */
  createNoiseBuffer() {
    if (!this._ctx) return;
    const sampleRate = this._ctx.sampleRate;
    const len = sampleRate;
    this._noiseBuffer = this._ctx.createBuffer(1, len, sampleRate);
    const data = this._noiseBuffer.getChannelData(0);
    for (let i = 0; i < len; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  },

  /** 销毁音频资源 */
  destroyAudio() {
    for (const cs of this._chs) {
      this.stopChannel(cs);
    }
    this._chs = [];
    if (this._masterGain) {
      this._masterGain.disconnect();
      this._masterGain = null;
    }
    this._ctx = null;
    this._noiseBuffer = null;
  },

  // ═══════════════════════════════════════════════
  // 播放控制
  // ═══════════════════════════════════════════════

  onPlay() {
    if (this.data.currentTrack < 0) {
      wx.showToast({ title: '请先选择曲目', icon: 'none' });
      return;
    }

    const idx = this.data.currentTrack;
    const allTracks = [TRACK_TITLE, TRACK_MENU, TRACK_MATCH];
    this._trackSeq = allTracks[idx];

    this.resetAllChannels();
    this.startPlayback();

    this.setData({ playing: true });
    this.addLog(`▶ 播放: ${this.data.tracks[idx].name}`);
  },

  onPause() {
    if (!this.data.playing) return;
    this.stopPlayback();
    this.silenceAllChannels();
    this.setData({ playing: false });
    this.addLog('⏸ 暂停');
  },

  onStop() {
    this.stopPlayback();
    this.resetAllChannels();
    this.silenceAllChannels();
    this.setData({
      playing: false,
      currentTrack: -1,
    });
    this.addLog('⏹ 停止');
  },

  // ═══════════════════════════════════════════════
  // 曲目选择
  // ═══════════════════════════════════════════════

  onTrackSelect(e: any) {
    const idx = e.currentTarget.dataset.index;
    this.setData({ currentTrack: idx });
    this.addLog(`🎵 选中: ${this.data.tracks[idx].name}`);
  },

  // ═══════════════════════════════════════════════
  // 音量
  // ═══════════════════════════════════════════════

  onVolumeChange(e: any) {
    const vol = e.detail.value;
    this.setData({ masterVolume: vol });
    if (this._masterGain) {
      this._masterGain.gain.value = vol / 100 * 0.5;
    }
  },

  // ═══════════════════════════════════════════════
  // 音效
  // ═══════════════════════════════════════════════

  onSfxPlay(e: any) {
    const idx = e.currentTarget.dataset.index;
    const sfxDataList = [SFX_GOAL, SFX_WHISTLE, SFX_VICTORY, SFX_SELECT, SFX_CURSOR];
    const names = ['进球', '哨声', '胜利', '确认', '移动'];

    this.playSfx(sfxDataList[idx]);
    this.addLog(`🔊 音效: ${names[idx]}`);
  },

  /** 播放音效 - 使用 Pulse 1 通道 */
  playSfx(notes: number[]) {
    if (!this._ctx || !this._masterGain) return;

    const osc = this._ctx.createOscillator();
    osc.type = 'square';
    const gain = this._ctx.createGain();
    gain.gain.value = 0.15;
    osc.connect(gain);
    gain.connect(this._masterGain);

    let time = this._ctx.currentTime;
    for (let i = 0; i < notes.length; i += 2) {
      const note = notes[i];
      const dur = (notes[i + 1] || 100) / 1000;
      if (note >= 0) {
        const freq = NOTE_FREQ[note] || 440;
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0.15, time);
      } else {
        gain.gain.setValueAtTime(0, time);
      }
      time += dur;
    }

    // 结束时停止
    gain.gain.setValueAtTime(0, time);
    osc.start();
    osc.stop(time + 0.1);
    setTimeout(() => {
      try { osc.disconnect(); gain.disconnect(); } catch (_) { /* 忽略 */ }
    }, (time - this._ctx.currentTime + 0.2) * 1000);
  },

  // ═══════════════════════════════════════════════
  // 核心播放引擎
  // ═══════════════════════════════════════════════

  /** 重置所有通道状态 */
  resetAllChannels() {
    for (let ch = 0; ch < 4; ch++) {
      const cs = this._chs[ch];
      cs.noteIndex = 0;
      cs.noteTimer = 0;
    }
  },

  /** 静音所有通道 */
  silenceAllChannels() {
    for (const cs of this._chs) {
      if (cs.gain) {
        cs.gain.gain.value = 0;
      }
    }
  },

  /** 开始播放循环 (~60fps) */
  startPlayback() {
    if (this._playTimer) return;

    let lastTime = Date.now();
    const tick = () => {
      if (!this.data.playing) return;

      const now = Date.now();
      const dt = Math.min(now - lastTime, 50); // cap at 50ms
      lastTime = now;

      this.updateMusic(dt);
      this._playTimer = setTimeout(tick, 16); // ~60fps
    };

    this._playTimer = setTimeout(tick, 16);
  },

  /** 停止播放循环 */
  stopPlayback() {
    if (this._playTimer) {
      clearTimeout(this._playTimer);
      this._playTimer = null;
    }
  },

  /** 每帧更新音乐播放 */
  updateMusic(dt: number) {
    for (let ch = 0; ch < 4; ch++) {
      const cs = this._chs[ch];
      const seq = ch < this._trackSeq.length ? this._trackSeq[ch] : null;
      if (!seq || seq.length === 0) continue;

      // 递减计时器
      cs.noteTimer -= dt;
      if (cs.noteTimer <= 0) {
        // 播放当前音符
        const event = seq[cs.noteIndex];
        if (event) {
          this.playChannelNote(ch, event);
          cs.noteTimer = event.duration;
          cs.noteIndex = (cs.noteIndex + 1) % seq.length; // 循环
        }
      }
    }
  },

  /** 在指定通道播放音符 */
  playChannelNote(ch: number, event: NoteEvent) {
    const cs = this._chs[ch];

    if (ch === 3) {
      // Noise 通道
      this.ensureNoiseChannel(cs);
      if (event.note >= 0 && cs.gain) {
        cs.gain.gain.value = 0.08;
        cs.active = true;
        cs.volume = 0.08;
        cs.freq = 0;
      } else {
        if (cs.gain) cs.gain.gain.value = 0;
        cs.active = false;
        cs.volume = 0;
      }
      return;
    }

    // Pulse / Triangle 通道
    if (event.note < 0) {
      // 休止符
      if (cs.gain) cs.gain.gain.value = 0;
      cs.active = false;
      cs.volume = 0;
      return;
    }

    const freq = NOTE_FREQ[event.note] || 440;

    if (!cs.osc) {
      // 首次创建 oscillator
      cs.osc = this._ctx.createOscillator();
      cs.osc.type = WAVE_TYPES[ch];
      cs.gain = this._ctx.createGain();
      cs.gain.gain.value = 0;
      cs.osc.connect(cs.gain);
      cs.gain.connect(this._masterGain);
      cs.osc.start();
    }

    // 设置频率和音量
    cs.osc.frequency.value = freq;
    cs.gain.gain.value = 0.12; // 通道音量
    cs.active = true;
    cs.freq = freq;
    cs.volume = 0.12;
  },

  /** 确保噪声通道活跃 */
  ensureNoiseChannel(cs: ChState) {
    if (cs.osc || !this._ctx || !this._noiseBuffer) return;

    cs.osc = this._ctx.createBufferSource();
    cs.osc.buffer = this._noiseBuffer;
    cs.osc.loop = true;
    cs.gain = this._ctx.createGain();
    cs.gain.gain.value = 0;
    cs.osc.connect(cs.gain);
    cs.gain.connect(this._masterGain);
    cs.osc.start();
  },

  /** 停止通道 */
  stopChannel(cs: ChState) {
    if (cs.osc) {
      try { cs.osc.stop(); } catch (_) { /* 忽略 */ }
      try { cs.osc.disconnect(); } catch (_) { /* 忽略 */ }
      cs.osc = null;
    }
    if (cs.gain) {
      try { cs.gain.disconnect(); } catch (_) { /* 忽略 */ }
      cs.gain = null;
    }
    cs.active = false;
  },

  // ═══════════════════════════════════════════════
  // UI 更新循环
  // ═══════════════════════════════════════════════

  _statusInterval: null as any,

  startStatusLoop() {
    this._statusInterval = setInterval(() => {
      if (!this.data.playing) return;
      const channels = this._chs.map((cs, i) => ({
        name: CHANNEL_NAMES[i],
        active: cs.active,
        volume: cs.volume,
        freq: Math.round(cs.freq),
      }));
      this.setData({ channels });
    }, 100);
  },

  // ═══════════════════════════════════════════════
  // 日志
  // ═══════════════════════════════════════════════

  addLog(msg: string) {
    const logs = [...this.data.logs, `[${new Date().toLocaleTimeString()}] ${msg}`];
    // 只保留最近 50 条
    if (logs.length > 50) logs.shift();
    this.setData({ logs });
  },
});

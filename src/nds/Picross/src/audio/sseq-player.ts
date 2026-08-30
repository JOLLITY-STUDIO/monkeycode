/**
 * sseq-player.ts — 实时播放 NDS SSEQ 音乐（基于 ROM 提取的 wave + 事件数据）
 *
 * 数据结构：
 *   songs[name] = { tempo, tracks: [{prog,pan,volume,expression,regs,notes,totalTicks}], loopPoint, totalTicks }
 *   waves[wkey] = { rate, loop, loopStart, loopEnd, type, off, len }
 *   waves.bin    : 所有 PCM16 LE 样本串接（按 waves[wkey].off 索引）
 *
 * 播放策略：
 *   - 加载时一次性把所有 wkey 的样本解码为 AudioBuffer
 *   - 播放时按 tick 调度：每 tick = 60/tempo/48 秒
 *   - 每个 note 创建 BufferSource，playbackRate = 2^((key-root)/12) * rate/32768
 *   - gain 包络用 att/dec/sus/rel 近似 NDS ADSR
 *   - 循环：playthrough 后从 loopPoint 重新开始
 *
 * 平台：
 *   - 微信小程序：wx.createWebAudioContext() (基础库 2.19.0+)
 *   - HTML 测试：window.AudioContext
 *   - 不支持环境：静默降级
 */
import songsData from '../data/bgm/songs';
import wavesIndexData from '../data/bgm/waves';

export type SseqSongName = keyof typeof songsData;

interface Note { t: number; k: number; v: number; d: number; }
interface Region {
  key?: number; topKey?: number; wkey: string; root: number;
  att: number; dec: number; sus: number; rel: number; pan: number;
}
interface Track {
  id: string; prog: number; pan: number; volume: number; expression: number;
  regs: Region[]; notes: Note[]; loopPoint: number | null; totalTicks: number;
}
interface Song { tempo: number; tracks: Track[]; loopPoint: number | null; totalTicks: number; }
interface WaveInfo {
  rate: number; loop: boolean; loopStart: number; loopEnd: number;
  type: number; off: number; len: number;
}

const songs = songsData as unknown as Record<string, Song>;
const wavesIndex = wavesIndexData as unknown as Record<string, WaveInfo>;

export class SseqPlayer {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private buffers = new Map<string, AudioBuffer>();
  private wavesBytes: ArrayBuffer | null = null;
  private playing = false;
  private playName: string | null = null;
  private muted = false;
  private volume = 0.5;
  private loopTimeout: any = null;
  private onEnd: (() => void) | null = null;
  private scheduledUntil = 0; // 当前已调度到的绝对时间（秒）
  private startTime = 0;
  private currentSong: Song | null = null;
  private noteIdx: number[] = []; // 每个轨道下一个待播放 note 的索引
  private sampleRate = 44100;

  /** 惰性创建 AudioContext */
  ensure(): boolean {
    if (this.ctx) return true;
    try {
      const g: any = typeof wx !== 'undefined' ? wx : null;
      if (g && typeof g.createWebAudioContext === 'function') {
        this.ctx = g.createWebAudioContext();
      } else if (typeof window !== 'undefined') {
        const w: any = window;
        const AC = w.AudioContext || w.webkitAudioContext;
        if (AC) this.ctx = new AC();
      }
    } catch (e) { this.ctx = null; }
    if (this.ctx) {
      this.sampleRate = this.ctx.sampleRate || 44100;
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : this.volume;
      this.master.connect(this.ctx.destination);
    }
    return !!this.ctx;
  }

  setMuted(m: boolean): void {
    this.muted = m;
    if (this.master) this.master.gain.value = m ? 0 : this.volume;
  }

  setVolume(v: number): void {
    this.volume = v;
    if (this.master && !this.muted) this.master.gain.value = v;
  }

  /** 加载 waves.bin 并按 wkey 解码为 AudioBuffer（惰性：首次播放某歌曲时） */
  async loadWaves(): Promise<void> {
    if (this.wavesBytes) return;
    const url = 'assets/audio/bgm/waves.bin';
    // 微信 / 浏览器 fetch
    const f: any = typeof fetch !== 'undefined' ? fetch : null;
    if (f) {
      const resp = await f(url);
      this.wavesBytes = await resp.arrayBuffer();
    }
    // 解码每个用到的 wkey（解码按需：首次播放时）
  }

  /** 解码指定 wkey 为 AudioBuffer（缓存） */
  private getBuffer(wkey: string): AudioBuffer | null {
    if (!this.ctx || !this.wavesBytes) return null;
    if (this.buffers.has(wkey)) return this.buffers.get(wkey)!;
    const info = wavesIndex[wkey];
    if (!info) return null;
    const bytes = new Int16Array(this.wavesBytes, info.off, info.len);
    const buf = this.ctx.createBuffer(1, info.len, info.rate);
    const ch = buf.getChannelData(0);
    for (let i = 0; i < info.len; i++) ch[i] = bytes[i] / 32768;
    this.buffers.set(wkey, buf);
    return buf;
  }

  /** 查找匹配 key 的 region（按 track.regs 顺序） */
  private pickRegion(regs: Region[], key: number): Region | null {
    if (regs.length === 0) return null;
    // Range 类型（按音高 +i）
    if ('firstPitch' in (regs[0] as any) || regs[0].key !== undefined) {
      // Range
      for (const r of regs) {
        if (r.key === key) return r;
      }
      return regs[0];
    }
    // Regional 类型（按 topKey 累计上限）
    let last = -1;
    for (const r of regs) {
      const top = r.topKey ?? 127;
      if (key <= top) return r;
      last = top;
    }
    return regs[regs.length - 1];
  }

  /** 调度一个音符 */
  private scheduleNote(track: Track, note: Note, startSec: number): void {
    if (!this.ctx || !this.master) return;
    const regs = track.regs;
    if (regs.length === 0) return;
    const reg = this.pickRegion(regs, note.k);
    if (!reg) return;
    const buf = this.getBuffer(reg.wkey);
    if (!buf) return;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    src.loop = (wavesIndex[reg.wkey]?.loop) || false;
    // pitch shift: playbackRate = 2^((note.k - root)/12) * (bufRate / outputRate)
    const pitchDelta = (note.k - (reg.root || 60));
    src.playbackRate.value = Math.pow(2, pitchDelta / 12);

    // gain 包络: NDS ADSR (att/dec/sus/rel 0-127)
    const dur = (note.d * 60) / (this.currentSong?.tempo || 120) / 48;
    const gain = this.ctx.createGain();
    const vel = (note.v / 127);
    // 简易包络：attack 5%，decay+sustain 占 70%，release 25%
    const a = Math.min(0.05, dur * 0.5);
    const r = Math.min(dur * 0.25, 0.5);
    const peak = vel * (track.volume / 127) * (track.expression / 127);
    const susLevel = peak * (1 - (reg.sus / 127) * 0.5); // sustain 越高电平越低
    gain.gain.setValueAtTime(0, startSec);
    gain.gain.linearRampToValueAtTime(peak, startSec + Math.max(0.005, a));
    gain.gain.linearRampToValueAtTime(susLevel, startSec + dur * 0.75);
    gain.gain.setValueAtTime(susLevel, Math.max(startSec + a + 0.001, startSec + dur - r));
    gain.gain.linearRampToValueAtTime(0, startSec + dur);

    // pan (0=left, 64=center, 127=right)
    const panVal = (track.pan - 64) / 64;
    const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
    if (panner) panner.pan.value = Math.max(-1, Math.min(1, panVal));

    src.connect(gain);
    if (panner) { gain.connect(panner); panner.connect(this.master); }
    else gain.connect(this.master);

    src.start(startSec);
    src.stop(startSec + dur + 0.05);
  }

  /** 调度一个时间窗口内的所有 note */
  private scheduleWindow(fromTick: number, toTick: number, startSec: number): void {
    if (!this.currentSong) return;
    const tempo = this.currentSong.tempo || 120;
    const secPerTick = 60 / tempo / 48;
    for (let i = 0; i < this.currentSong.tracks.length; i++) {
      const t = this.currentSong.tracks[i];
      let idx = this.noteIdx[i];
      while (idx < t.notes.length) {
        const n = t.notes[idx];
        if (n.t >= toTick) break;
        const noteStart = startSec + (n.t - fromTick) * secPerTick;
        this.scheduleNote(t, n, noteStart);
        idx++;
      }
      this.noteIdx[i] = idx;
    }
  }

  /** 启动播放（循环整个歌曲） */
  async play(name: string, opts?: { onEnd?: () => void; loop?: boolean }): Promise<void> {
    if (!this.ensure()) return;
    if (!(name in songs)) return;
    if (!this.wavesBytes) await this.loadWaves();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended' && (this.ctx as any).resume) (this.ctx as any).resume();
    this.stop();
    this.playName = name;
    this.playing = true;
    this.onEnd = opts?.onEnd || null;
    this.currentSong = songs[name];
    this.noteIdx = this.currentSong.tracks.map(() => 0);
    this.startTime = this.ctx.currentTime + 0.05;
    const tempo = this.currentSong.tempo || 120;
    const secPerTick = 60 / tempo / 48;
    const songDur = this.currentSong.totalTicks * secPerTick;
    // 先排程到 lookahead
    this.scheduledUntil = 0;
    this.scheduleWindow(0, this.currentSong.totalTicks, this.startTime);
    this.scheduledUntil = songDur;
    // 循环：每首歌播完后从头开始（或从 loopPoint）
    const loopSec = songDur + 0.1;
    const tick = () => {
      if (!this.playing || !this.currentSong || !this.ctx) return;
      if (this.ctx.currentTime >= this.startTime + songDur) {
        if (opts?.loop === false) {
          this.playing = false;
          if (this.onEnd) this.onEnd();
          return;
        }
        // 循环：从头开始
        this.startTime = this.ctx.currentTime + 0.05;
        this.noteIdx = this.currentSong.tracks.map(() => 0);
        this.scheduleWindow(0, this.currentSong.totalTicks, this.startTime);
      }
      this.loopTimeout = setTimeout(tick, 200);
    };
    this.loopTimeout = setTimeout(tick, 200);
  }

  stop(): void {
    this.playing = false;
    this.playName = null;
    this.currentSong = null;
    if (this.loopTimeout) {
      clearTimeout(this.loopTimeout);
      this.loopTimeout = null;
    }
  }

  isPlaying(): boolean { return this.playing; }
  getPlayingName(): string | null { return this.playName; }
}

/** 全局单例 */
export const sseqPlayer = new SseqPlayer();

/**
 * game-audio — A/B APU 写入自动对比
 *
 * A 侧: NES CPU 全模拟器 → PAPU（参考标准）
 * B 侧: TS 纯引擎 Tsubasa2AudioPlayer → PAPU（无 CPU）
 *
 * 策略:
 * 1. A 侧跑 4500 帧，记录每帧 APU 写入
 * 2. B 侧跑 BGM00 完整时长，记录 APU 写入
 * 3. 自动找同步点：在 A 侧 trace 中搜索 B 侧前 50 条写入的最佳匹配位置
 * 4. 对齐后逐帧对比
 */
import NES from '../../src/nes';
import PAPU from '../../src/papu/index';
import { NES_PRG_ROM, NES_CHR_ROM } from '../../mini-audio/rom-data/index-full';
import {
  Tsubasa2AudioPlayer,
  BGM00_RAW, BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE,
} from '../../mini-audio/bgm-data/index';

const SAMPLE_RATE = 48000;
const NES_TOTAL_FRAMES = 4500;
const SCRIPT_BUF = 2048;
const WAVE_BUF_MAX = 48000;

const INES_HEADER = new Uint8Array([
  0x4E, 0x45, 0x53, 0x1A,
  0x10, 0x10, 0x40, 0x08,
  0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x01,
]);

// ─── 类型 ───
interface ApuWrite { f: number; addr: number; val: number; ch: string; }

function chName(addr: number): string {
  if (addr < 0x4004) return 'SQ1';
  if (addr < 0x4008) return 'SQ2';
  if (addr < 0x400C) return 'TRI';
  if (addr < 0x4010) return 'NOISE';
  if (addr < 0x4014) return 'DMC';
  if (addr === 0x4015) return 'STAT';
  return `$${addr.toString(16)}`;
}

// 同步搜索窗口（B 侧前 N 条写入用于匹配）
const SYNC_SAMPLE_COUNT = 50;

Page({
  data: {
    status: '初始化...',
    ready: false,
    playing: false,
    progress: 0,
    totalFrames: NES_TOTAL_FRAMES,

    // 对比结果
    emuTotalWrites: 0,
    playerTotalWrites: 0,
    syncOffset: 0,
    syncScore: '0',
    matchFrames: 0,
    diffFrames: 0,
    cmpResult: '',
    cmpReady: false,

    // 播放
    compareMode: 'ab',
    elapsedFrames: 0,
    elapsedTime: '0:00',

    // B 侧通道
    chB_SQ1: true, chB_SQ2: true, chB_TRI: true, chB_NOISE: true,

    // Canvas
    canvasWidth: 375,
    canvasHeight: 100,
  },

  // ─── 内部状态 ───
  _pcmA: null as Float32Array | null,
  _pcmB: null as Float32Array | null,
  _emuTrace: [] as ApuWrite[],
  _playerTrace: [] as ApuWrite[],
  _playPos: 0,
  _ctx: null as any,
  _scriptNode: null as any,
  _canvasCtxA: null as any,
  _canvasCtxB: null as any,
  _canvasLoop: null as ReturnType<typeof setInterval> | null,
  _waveBufA: [] as number[],
  _waveBufB: [] as number[],

  // ═══ 生命周期 ═══

  onLoad() {
    const sysInfo = wx.getSystemInfoSync();
    this.setData({ canvasWidth: sysInfo.windowWidth - 32 });
  },

  onReady() {
    setTimeout(() => this._initCanvases(), 100);
  },

  onUnload() { this._destroy(); },

  // ═══ Canvas ═══

  _initCanvases() {
    const query = wx.createSelectorQuery();
    query.select('#waveA').fields({ node: true, size: true });
    query.select('#waveB').fields({ node: true, size: true });
    query.exec((res: any) => {
      if (!res[0]?.node || !res[1]?.node) {
        setTimeout(() => this._initCanvases(), 200);
        return;
      }
      this._setupCanvas(res[0], '_canvasCtxA');
      this._setupCanvas(res[1], '_canvasCtxB');
      this._preRenderAll();
    });
  },

  _setupCanvas(info: any, key: string) {
    const canvas = info.node;
    const ctx = canvas.getContext('2d');
    const dpr = wx.getSystemInfoSync().pixelRatio;
    canvas.width = this.data.canvasWidth * dpr;
    canvas.height = this.data.canvasHeight * dpr;
    ctx.scale(dpr, dpr);
    (this as any)[key] = ctx;
  },

  // ═══ 预渲染 ═══

  async _preRenderAll() {
    try {
      // ── A 侧: NES 模拟器 ──
      this.setData({ status: 'A侧: NES 模拟器 4500帧 + APU trace...' });
      const { pcm: pcmA, trace: emuTrace } = await this._renderNes(NES_TOTAL_FRAMES);
      this._pcmA = pcmA;
      this._emuTrace = emuTrace;
      this.setData({
        emuTotalWrites: emuTrace.length,
        status: `A侧完成: ${emuTrace.length} APU写入 | B侧: TS引擎...`,
        progress: 0,
      });

      // ── B 侧: TS 引擎 ──
      const { pcm: pcmB, trace: playerTrace } = this._renderTs();
      this._pcmB = pcmB;
      this._playerTrace = playerTrace;
      this.setData({ playerTotalWrites: playerTrace.length });

      // ── 自动找同步点 ──
      const { offset, score } = this._findSyncOffset(emuTrace, playerTrace);
      this.setData({ syncOffset: offset, syncScore: score });

      // ── 对齐对比 ──
      this.setData({ status: '对比 APU 写入...' });
      const cmp = this._compareAligned(emuTrace, playerTrace, offset);
      this.setData({
        matchFrames: cmp.match,
        diffFrames: cmp.diff,
        cmpResult: cmp.text,
        cmpReady: true,
        ready: true,
        status: `对比完成: ${cmp.match}/${cmp.match + cmp.diff} 帧匹配 | 同步偏移 F${offset}`,
        progress: 0,
      });

      console.log('[game-audio] 同步偏移:', offset, '得分:', score, '\n对比:', cmp.text);
    } catch (e: any) {
      console.error('[game-audio] 失败:', e);
      this.setData({ status: '失败: ' + (e.message || '') });
    }
  },

  // ═══ A 侧: NES 模拟器 + APU trace ═══

  _renderNes(frameCount: number): Promise<{ pcm: Float32Array; trace: ApuWrite[] }> {
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
        const trace: ApuWrite[] = [];

        // hook APU
        const papu = (nes as any).papu as PAPU;
        const origWr = papu.writeReg.bind(papu);
        let fCount = 0;
        papu.writeReg = function (addr: number, val: number) {
          if (addr >= 0x4000 && addr <= 0x4017) {
            const ch = chName(addr);
            if (ch) trace.push({ f: fCount, addr, val, ch });
          }
          return origWr(addr, val);
        };

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
            fCount = f;
            nes.frame();
          }
          fCount = f;

          self.setData({ progress: Math.floor((f / frameCount) * 100) });

          if (f < frameCount) {
            setTimeout(step, 0);
          } else {
            resolve({ pcm: new Float32Array(samples), trace });
          }
        }

        step();
      } catch (e) {
        reject(e);
      }
    });
  },

  // ═══ B 侧: TS 引擎 + APU trace ═══

  _renderTs(): { pcm: Float32Array; trace: ApuWrite[] } {
    const player = new Tsubasa2AudioPlayer(SAMPLE_RATE);
    const trace: ApuWrite[] = [];
    const samples: number[] = [];

    player.setSampleCallback((l: number, r: number) => {
      samples.push((l + r) * 0.5);
    });

    // Hook APU 写入 - 必须在 load/start 之前
    const papu = player.papu as PAPU;
    const origWr = papu.writeReg.bind(papu);
    let fCount = 0;
    papu.writeReg = function (addr: number, val: number) {
      if (addr >= 0x4000 && addr <= 0x4017) {
        const ch = chName(addr);
        if (ch) trace.push({ f: fCount, addr, val, ch });
      }
      return origWr(addr, val);
    };

    player.channelMuteMask = this._getMuteMask('B');
    player.load(
      BGM00_TRACK_SQ1, BGM00_TRACK_SQ2,
      BGM00_TRACK_TRI, BGM00_TRACK_NOISE,
      BGM00_RAW, 0xB7AD,
    );
    player.start();

    this.setData({ status: `B侧: TS引擎解析BGM00...` });

    // 跑到 BGM 播完（自动循环一次也可以，但我们只跑第一轮）
    let maxFrames = 3000;
    for (let f = 0; f < maxFrames; f++) {
      fCount = f;
      player.tick();
      if (!player.progress.playing) {
        // 自动重启再跑一轮，确保覆盖完整 BGM
        // 但 trace 会继续累加。我们只对比第一轮。
        break;
      }
    }

    player.setSampleCallback(null);
    return { pcm: new Float32Array(samples), trace };
  },

  // ═══ 自动同步 ═══

  /**
   * 在 emu trace 中搜索 player trace 前 N 条写入的最佳匹配位置。
   * 返回 { offset: 最佳偏移帧, score: 匹配得分 }
   */
  _findSyncOffset(emuTrace: ApuWrite[], playerTrace: ApuWrite[]): { offset: number; score: string } {
    if (playerTrace.length < 5 || emuTrace.length < 10) {
      return { offset: 0, score: '不足' };
    }

    // 取 B 侧前 SYNC_SAMPLE_COUNT 条写入作为匹配指纹
    const sample = playerTrace.slice(0, SYNC_SAMPLE_COUNT);
    const firstBFrame = sample[0].f;
    const lastBFrame = sample[sample.length - 1].f;

    let bestOffset = 0;
    let bestScore = -Infinity;

    // 在 A 侧 trace 中按帧滑动搜索
    const emuByFrame = new Map<number, ApuWrite[]>();
    for (const w of emuTrace) {
      if (!emuByFrame.has(w.f)) emuByFrame.set(w.f, []);
      emuByFrame.get(w.f)!.push(w);
    }

    const maxEmuFrame = emuTrace[emuTrace.length - 1].f;
    const searchEnd = maxEmuFrame - (lastBFrame - firstBFrame) - 1;

    for (let offsetF = 0; offsetF < searchEnd; offsetF++) {
      let score = 0;
      let matched = 0;
      let checked = 0;

      for (const sw of sample) {
        const emuF = sw.f - firstBFrame + offsetF;
        const emuWrites = emuByFrame.get(emuF);
        checked++;
        if (emuWrites) {
          for (const ew of emuWrites) {
            if (ew.addr === sw.addr && ew.val === sw.val) {
              matched++;
              break;
            }
          }
        }
      }

      // 加权：更多匹配 = 更高分
      score = matched * 10 - (matched < checked / 2 ? 100 : 0);

      if (score > bestScore) {
        bestScore = score;
        bestOffset = offsetF;
      }

      // 早停：如果已经接近完美
      if (matched >= sample.length * 0.9) break;
    }

    return {
      offset: bestOffset,
      score: `${Math.round(bestScore / sample.length * 100) / 100}`,
    };
  },

  // ═══ 对比 ═══

  _compareAligned(emuTrace: ApuWrite[], playerTrace: ApuWrite[], syncOffset: number) {
    // 对齐：B 侧第 0 帧 ↔ A 侧第 syncOffset 帧
    const firstBFrame = playerTrace.length > 0 ? playerTrace[0].f : 0;

    // A 侧 trace 偏移
    const emuAligned = emuTrace
      .filter(w => w.f >= syncOffset)
      .map(w => ({ ...w, f: w.f - syncOffset }));

    // B 侧 trace 偏移
    const playerAligned = playerTrace.map(w => ({ ...w, f: w.f - firstBFrame }));

    function frameMap(writes: ApuWrite[]): Map<number, Array<[number, number]>> {
      const m = new Map<number, Array<[number, number]>>();
      for (const w of writes) {
        if (!m.has(w.f)) m.set(w.f, []);
        m.get(w.f)!.push([w.addr, w.val]);
      }
      return m;
    }

    const emuMap = frameMap(emuAligned);
    const playerMap = frameMap(playerAligned);

    const maxF = Math.max(
      emuAligned.length > 0 ? emuAligned[emuAligned.length - 1].f : 0,
      playerAligned.length > 0 ? playerAligned[playerAligned.length - 1].f : 0,
    );

    let match = 0;
    let diff = 0;
    const diffDetails: string[] = [];
    let emuOnlyFrames = 0;
    let plrOnlyFrames = 0;

    for (let f = 0; f <= maxF; f++) {
      const ev = emuMap.get(f) || [];
      const pv = playerMap.get(f) || [];
      if (ev.length === 0 && pv.length === 0) continue;

      if (ev.length === 0) { plrOnlyFrames++; diff++; continue; }
      if (pv.length === 0) { emuOnlyFrames++; diff++; continue; }

      const eSet = new Set(ev.map(a => `${a[0].toString(16)}:${a[1].toString(16)}`));
      const pSet = new Set(pv.map(a => `${a[0].toString(16)}:${a[1].toString(16)}`));

      if (eSet.size === pSet.size && [...eSet].every(x => pSet.has(x))) {
        match++;
      } else {
        diff++;
        if (diffDetails.length < 60) {
          const frameDiff: string[] = [];
          frameDiff.push(`F${f} DIFF | EMU(${eSet.size}) vs PLR(${pSet.size})`);

          // 显示差异的寄存器
          const evMap = new Map(ev.map(a => [a[0], a[1]]));
          const pvMap = new Map(pv.map(a => [a[0], a[1]]));
          const allAddrs = new Set([...evMap.keys(), ...pvMap.keys()]);

          for (const addr of [...allAddrs].sort((a, b) => a - b)) {
            const ev2 = evMap.get(addr);
            const pv2 = pvMap.get(addr);
            if (ev2 !== undefined && pv2 !== undefined && ev2 === pv2) {
              // 匹配项跳过
            } else {
              const mark = ev2 === undefined ? 'PLR-ONLY' : pv2 === undefined ? 'EMU-ONLY' : '≠';
              frameDiff.push(`  $${addr.toString(16).padStart(4, '0')}: EMU=${ev2 !== undefined ? '0x' + ev2.toString(16).padStart(2, '0') : '--'} PLR=${pv2 !== undefined ? '0x' + pv2.toString(16).padStart(2, '0') : '--'} ${mark}`);
            }
          }
          diffDetails.push(frameDiff.join('\n'));
        }
      }
    }

    // 通道统计
    function chStats(writes: ApuWrite[], label: string): string[] {
      const s: Record<string, number> = {};
      const wroteFrames = new Set<number>();
      for (const w of writes) {
        s[w.ch] = (s[w.ch] || 0) + 1;
        wroteFrames.add(w.f);
      }
      const lines: string[] = [];
      lines.push(`${label}: ${writes.length} writes / ${wroteFrames.size} frames`);
      for (const ch of ['SQ1', 'SQ2', 'TRI', 'NOISE', 'STAT']) {
        if (s[ch]) lines.push(`  ${ch}: ${s[ch]} writes`);
      }
      return lines;
    }

    const lines: string[] = [];
    lines.push(`同步偏移: F${syncOffset}`);
    lines.push(`Emu BGM 范围: ${emuAligned.length} writes / F0~F${emuAligned.length > 0 ? emuAligned[emuAligned.length - 1].f : 0}`);
    lines.push(`Player: ${playerAligned.length} writes / F0~F${playerAligned.length > 0 ? playerAligned[playerAligned.length - 1].f : 0}`);
    lines.push(`匹配帧: ${match} | 差异帧: ${diff} (EMU独有:${emuOnlyFrames} PLR独有:${plrOnlyFrames})`);
    lines.push(`匹配率: ${(match / Math.max(match + diff, 1) * 100).toFixed(1)}%`);
    lines.push('');
    lines.push('--- 通道统计 ---');
    lines.push(...chStats(emuAligned, 'EMU'));
    lines.push('');
    lines.push(...chStats(playerAligned, 'PLR'));

    if (diffDetails.length > 0) {
      lines.push('');
      lines.push('--- 差异详情 (前60帧) ---');
      lines.push(...diffDetails.slice(0, 60));
    }

    // 前 15 帧详细对比
    lines.push('');
    lines.push('--- F0-F14 逐帧明细 ---');
    for (let f = 0; f <= 14; f++) {
      const ev = emuMap.get(f) || [];
      const pv = playerMap.get(f) || [];
      const eStrs = ev.map(a => `$${a[0].toString(16)}=0x${a[1].toString(16)}`);
      const pStrs = pv.map(a => `$${a[0].toString(16)}=0x${a[1].toString(16)}`);
      const mark = ev.length === pv.length && ev.every((e, i) => e[0] === pv[i]?.[0] && e[1] === pv[i]?.[1]) ? '✓' : '✗';
      lines.push(`F${f} ${mark} EMU: [${eStrs.join(',')}] | PLR: [${pStrs.join(',')}]`);
    }

    return { match, diff, text: lines.join('\n') };
  },

  // ═══ 播放 ═══

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
          else sample = (a + b) * 0.5;

          (out as any)[i] = Math.max(-1, Math.min(1, sample));

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
      this.setData({ playing: true, status: '对比播放中' });
      this._startCanvasLoop();
    } catch (e: any) {
      console.error('[game-audio] 播放失败:', e);
      this.setData({ status: '播放失败: ' + (e.message || '') });
    }
  },

  _pause() {
    this._stopCanvasLoop();
    if (this._ctx) { try { this._ctx.suspend(); } catch (_) {} }
    this.setData({ playing: false, status: '已暂停' });
  },

  _stop() {
    this._stopCanvasLoop();
    this._destroy();
    this._playPos = 0;
    this._waveBufA = [];
    this._waveBufB = [];
    if (this.data.ready) {
      this.setData({ playing: false, elapsedFrames: 0, elapsedTime: '0:00', status: '就绪' });
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
    if (this.data.playing) this._pause();
    else this._play();
  },

  setCompareMode(e: any) {
    this.setData({ compareMode: e.currentTarget.dataset.mode });
  },

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
    this._rerenderB();
  },

  _rerenderB() {
    if (!this.data.ready) return;
    const { pcm, trace } = this._renderTs();
    this._pcmB = pcm;
    this._playerTrace = trace;
    const offset = this.data.syncOffset;
    const cmp = this._compareAligned(this._emuTrace, trace, offset);
    this.setData({
      playerTotalWrites: trace.length,
      matchFrames: cmp.match,
      diffFrames: cmp.diff,
      cmpResult: cmp.text,
      status: `通道变更后: ${cmp.match}/${cmp.match + cmp.diff} 帧匹配`,
    });
    if (this.data.playing) {
      this._playPos = Math.min(this._playPos, this._pcmB.length);
    }
  },

  noop() {},

  // ═══ Canvas 绘制 ═══

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
    ctx.strokeStyle = '#333355';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(label, 6, 14);
  },

  _drawWave(ctx: any, buf: number[], color: string, label: string) {
    if (!ctx) return;
    const w = this.data.canvasWidth;
    const h = this.data.canvasHeight;

    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#222244';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();

    if (buf.length < 2) return;

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

    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(label, 6, 14);
  },

  _drawFrame() {
    this._drawWave(this._canvasCtxA, this._waveBufA, '#ff6b6b', 'A: NES模拟器');
    this._drawWave(this._canvasCtxB, this._waveBufB, '#6bb5ff', 'B: TS引擎');

    const frames = Math.floor((this._playPos / SAMPLE_RATE) * 60);
    const secs = Math.floor(this._playPos / SAMPLE_RATE);
    const mins = Math.floor(secs / 60);
    const sec = secs % 60;
    this.setData({
      elapsedFrames: frames,
      elapsedTime: `${mins}:${sec.toString().padStart(2, '0')}`,
      progress: Math.min(Math.floor(frames / NES_TOTAL_FRAMES * 100), 100),
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

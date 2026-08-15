/**
 * ============================================================================
 * jsnes 内核适配器 — 用于双 canvas 对比调试
 *
 * 直接加载原始 .nes ROM 文件，喂给 jsnes 完整 NES 仿真器。
 * 每帧输出 PPU 帧缓冲到 canvas，与手写 TS 版本并排对比。
 * ============================================================================
 */

// @ts-ignore — jsnes 是 .js 模块
import NES from './src/nes';

import { BUTTON } from '../types';
import { romUint8Array } from '../rom_data';

// ============================================================================
// 类型定义
// ============================================================================

interface MemAccess {
  addr: number;
  val: number;
  kind: 'load' | 'write';
}

interface TraceFrame {
  /** 指令地址 (PC) */
  pc: number;
  /** opcode 字节 */
  opcode: number;
  /** 主要访存操作 (扣除 opcode fetch 后) */
  ops: MemAccess[];
  /** 入口寄存器: A, X, Y, SP, P */
  regIn: number[];
  /** 所属 bank 编号 (如未计算则为 -1) */
  bank?: number;
}

// ============================================================================
// CPU 指令追踪器
// ============================================================================

class CpuTracer {
  private cpu: any;
  private origLoad: Function;
  private origWrite: Function;
  private origLoadCart: Function;
  private traceEnabled = false;

  /** 追踪的 PC 范围 [low, high] */
  pcLow = 0;
  pcHigh = 0;

  /** 当前指令的第一条 trace */
  private curPc = -1;
  private curOpTrace: TraceFrame | null = null;

  /** 本次追踪记录的所有指令帧 */
  frames: TraceFrame[] = [];

  constructor(nes: any) {
    this.cpu = nes.cpu;
    // 保存原始方法引用 (bind this)
    this.origLoad = this.cpu.load.bind(this.cpu);
    this.origWrite = this.cpu.write.bind(this.cpu);
    this.origLoadCart = this.cpu.loadFromCartridge.bind(this.cpu);
  }

  /** 启动追踪 */
  enable(pcLow: number, pcHigh: number): void {
    this.pcLow = pcLow;
    this.pcHigh = pcHigh;
    this.frames = [];
    this.curPc = -1;
    this.curOpTrace = null;
    this.traceEnabled = true;

    const self = this;

    this.cpu.loadFromCartridge = function (addr: number): number {
      const val = self.origLoadCart(addr);
      if (self.traceEnabled) {
        const pc = (this as any).REG_PC as number;
        const pcActual = pc + 1; // REG_PC 比真实 PC 少 1
        if (pcActual >= self.pcLow && pcActual <= self.pcHigh) {
          self._onOpFetch(this, addr, val);
        }
      }
      return val;
    };

    this.cpu.load = function (addr: number): number {
      const val = self.origLoad(addr);
      if (self.traceEnabled && self.curOpTrace) {
        self.curOpTrace.ops.push({ addr, val, kind: 'load' });
      }
      return val;
    };

    this.cpu.write = function (addr: number, val: number): void {
      if (self.traceEnabled && self.curOpTrace) {
        self.curOpTrace.ops.push({ addr, val, kind: 'write' });
      }
      return self.origWrite(addr, val);
    };
  }

  /** 停止追踪并返回结果 */
  disable(): TraceFrame[] {
    // 把当前指令收尾
    this._flushOp();
    this.traceEnabled = false;
    // 恢复原始方法
    this.cpu.loadFromCartridge = this.origLoadCart;
    this.cpu.load = this.origLoad;
    this.cpu.write = this.origWrite;
    return this.frames;
  }

  /** CPU fetch 字节时的回调 — 检测指令边界 */
  private _onOpFetch(cpu: any, addr: number, val: number): void {
    const pc = cpu.REG_PC as number;
    if (pc !== this.curPc) {
      // PC 变了 → 新指令开始
      this._flushOp();
      this.curPc = pc;
      this.curOpTrace = {
        pc: pc + 1,   // 真实指令地址
        opcode: val,
        ops: [],      // 不含 opcode fetch 自身
        regIn: [
          cpu.REG_ACC, cpu.REG_X, cpu.REG_Y,
          cpu.REG_SP, cpu.getStatus(),
        ],
      };
    }
    // 其它 fetch (操作数字节等) 不做特殊处理，load/write 钩子会捕捉
  }

  /** 把当前指令收进帧数组 */
  private _flushOp(): void {
    if (this.curOpTrace) {
      this.frames.push(this.curOpTrace);
      this.curOpTrace = null;
    }
  }
}

// ============================================================================
// jsnes 内核类
// ============================================================================

const SCREEN_W = 256;
const SCREEN_H = 240;
const SAMPLE_RATE = 48000;
/** ScriptProcessorNode buffer size 采样数 (越小延迟越低) */
const SCRIPT_BUF = 2048;

export class JsnesKernel {
  nes: any;
  canvas: any;
  running = false;

  /** PPU 帧缓冲快照 (Uint32Array, NES BGR 格式) */
  frameBuffer: Uint32Array | null = null;

  /** ImageData 复用 */
  private imageData: ImageData | null = null;
  /** Canvas 2D context (主画布) */
  private ctx: CanvasRenderingContext2D | null = null;

  /** CPU 追踪器 (ROM 加载后创建) */
  private _tracer: CpuTracer | null = null;
  /** 追踪结果暂存 */
  get traceResult(): TraceFrame[] | null { return this._traceResult; }
  private _traceResult: TraceFrame[] | null = null;

  // ====== 音频: ring buffer → WebAudioContext → ScriptProcessorNode → speaker ======
  /** 环形缓冲 (立体声交错: L,R,L,R,...) */
  private _ring: Float32Array;
  private _ringCap: number;
  private _ringW = 0;   // 写入位置
  private _ringR = 0;   // 读取位置 (ScriptProcessor 消费)
  private _audioCtx: any = null;
  private _audioNode: any = null;

  constructor(canvas: any) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) throw new Error('[jsnes] Cannot get 2d context');
    this.ctx = ctx;
    // 像素画关平滑
    ctx.imageSmoothingEnabled = false;
    this.imageData = ctx.createImageData(SCREEN_W, SCREEN_H);

    // ~200ms 立体声缓冲
    this._ringCap = SAMPLE_RATE >> 2 << 2; // 48000 → 48000 samples × 2 channels
    this._ring = new Float32Array(this._ringCap);

    const self = this;
    this.nes = new NES({
      onFrame: (buffer: Uint32Array) => {
        self.frameBuffer = buffer;
      },
      onStatusUpdate: (msg: string) => {
        console.log('[jsnes]', msg);
      },
      onAudioSample: (left: number, right: number) => {
        self._onAudioSample(left, right);
      },
      emulateSound: true,
      sampleRate: SAMPLE_RATE,
    });
  }

  // ---- 音频管线 ----

  /** jsnes APU 采样 → 环形缓冲 */
  private _onAudioSample(left: number, right: number): void {
    const cap = this._ringCap;
    const next = (this._ringW + 2) % cap;
    if (next === this._ringR) {
      // 缓冲满了，丢掉最旧的保持实时
      this._ringR = (this._ringR + 2) % cap;
    }
    this._ring[this._ringW] = left;
    this._ring[this._ringW + 1] = right;
    this._ringW = next;
  }

  /** 启动 WebAudioContext → ScriptProcessorNode → speaker */
  private _startAudio(): void {
    if (this._audioCtx) return;
    try {
      const ctx = wx.createWebAudioContext();
      // createScriptProcessor(缓冲区大小, 输入通道数, 输出通道数)
      const node = ctx.createScriptProcessor(SCRIPT_BUF, 0, 2);
      const self = this;

      node.onaudioprocess = (e: any) => {
        const outL = e.outputBuffer.getChannelData(0);
        const outR = e.outputBuffer.getChannelData(1);
        const len = outL.length;
        const cap = self._ringCap;

        let r = self._ringR;
        let w = self._ringW;

        for (let i = 0; i < len; i++) {
          if (r === w) {
            // 缓冲空 → 填充静音
            outL[i] = 0;
            outR[i] = 0;
          } else {
            outL[i] = self._ring[r];
            outR[i] = self._ring[r + 1];
            r = (r + 2) % cap;
          }
        }
        self._ringR = r;
      };

      node.connect(ctx.destination);
      this._audioCtx = ctx;
      this._audioNode = node;
      console.log('[jsnes] audio started via WebAudioContext');
    } catch (e: any) {
      console.warn('[jsnes] WebAudioContext unavailable:', e.message);
    }
  }

  /** 停止音频 */
  private _stopAudio(): void {
    if (this._audioNode) {
      try {
        this._audioNode.disconnect();
        this._audioNode.onaudioprocess = null;
      } catch (_) { /* ignore */ }
      this._audioNode = null;
    }
    if (this._audioCtx) {
      try { this._audioCtx.close(); } catch (_) { /* ignore */ }
      this._audioCtx = null;
    }
    this._ringW = 0;
    this._ringR = 0;
  }

  /** 直接加载原始 .nes ROM 数据并启动 */
  start(): void {
    try {
      const romData = romUint8Array();
      console.log('[jsnes] ROM decoded: %d bytes', romData.length);

      // 打印 iNES 头诊断
      if (romData.length >= 16 && romData[0] === 0x4E) {
        const prg16k = romData[4];
        const chr8k = romData[5];
        const mapper = ((romData[6] >> 4) | (romData[7] & 0xF0));
        console.log('[jsnes] iNES: PRG=%d×16KB, CHR=%d×8KB, mapper=%d, flags6=0x%s flags7=0x%s size=%d',
          prg16k, chr8k, mapper,
          romData[6].toString(16), romData[7].toString(16), romData.length);
      }

      this.nes.loadROM(romData);
      this._tracer = new CpuTracer(this.nes);
      this._startAudio();
      this.running = true;
      console.log('[jsnes] ROM loaded, CPU running');
    } catch (e: any) {
      console.error('[jsnes] ROM load failed:', e.message || e);
      throw e;
    }
  }

  /** 停止 */
  stop(): void {
    this.running = false;
    this._stopAudio();
  }

  /** 重启 */
  reset(): void {
    console.log('[jsnes] Reset');
    this.nes.reset();
    this.frameBuffer = null;
    // reset 后重建 mapper, 重新绑定 tracer
    if (this._tracer) {
      this._tracer = new CpuTracer(this.nes);
    }
  }

  /** 暂停 — 保留完整状态，仅停止帧循环 */
  pause(): void {
    this.running = false;
  }

  /** 恢复 — 重新激活帧循环 */
  resume(): void {
    this.running = true;
  }

  /** 序列化 emulator 完整状态 (存档) */
  saveState(): object {
    return this.nes.toJSON();
  }

  /** 从存档恢复 emulator 完整状态 */
  loadState(state: object): void {
    this.nes.fromJSON(state);
    this.frameBuffer = null;
    // fromJSON 内部重置了 CPU/PPU，需重建 tracer
    if (this._tracer) {
      this._tracer = new CpuTracer(this.nes);
    }
  }

  /** 执行一帧 */
  frame(): void {
    if (!this.running) return;
    try {
      this.nes.frame();
    } catch (e) {
      console.error('[jsnes] frame error:', e);
      this.running = false;
    }
  }

  /** 拉伸/全屏时调用: 修改主 canvas 像素尺寸, drawImage 会自动 GPU 放大 */
  resizeCanvas(w: number, h: number): void {
    if (!this.canvas) return;
    this.canvas.width = w;
    this.canvas.height = h;
    if (this.ctx) {
      this.ctx.imageSmoothingEnabled = false;
    }
  }

  /** 渲染当前帧缓冲到 Canvas (同步 putImageData) */
  renderToCanvas(): void {
    if (!this.frameBuffer || !this.ctx || !this.imageData) return;

    // jsnes PPU 输出 BGR 格式 (Uint32 = 0x00BBGGRR)
    // 转为 RGBA: 只需把 alpha 置为 0xFF
    const buf32 = new Uint32Array(this.imageData.data.buffer);
    const fb = this.frameBuffer;
    for (let i = 0; i < SCREEN_W * SCREEN_H; i++) {
      buf32[i] = fb[i] | 0xFF000000;
    }

    this.ctx.putImageData(this.imageData, 0, 0);
  }

  /**
   * 设置手柄输入
   * @param controller 1号手柄
   * @param mask BUTTON 位掩码 (jsnes 的 buttonDown/buttonUp 逐个触发)
   */
  private prevButtons = 0;
  setInput(mask: number): void {
    // 用 jsnes 的 buttonDown/buttonUp API
    const btnMap: [number, number][] = [
      [BUTTON.A, 0],      // jsnes button 0 = A
      [BUTTON.B, 1],      // jsnes button 1 = B
      [BUTTON.SELECT, 2], // jsnes button 2 = Select
      [BUTTON.START, 3],  // jsnes button 3 = Start
      [BUTTON.UP, 4],     // jsnes button 4 = Up
      [BUTTON.DOWN, 5],   // jsnes button 5 = Down
      [BUTTON.LEFT, 6],   // jsnes button 6 = Left
      [BUTTON.RIGHT, 7],  // jsnes button 7 = Right
    ];

    for (const [tsBtn, jsnesBtn] of btnMap) {
      const wasPressed = (this.prevButtons & tsBtn) !== 0;
      const isPressed = (mask & tsBtn) !== 0;

      if (isPressed && !wasPressed) {
        this.nes.buttonDown(1, jsnesBtn);
      } else if (!isPressed && wasPressed) {
        this.nes.buttonUp(1, jsnesBtn);
      }
    }
    this.prevButtons = mask;
  }

  // ==========================================================================
  // CPU 追踪 API
  // ==========================================================================

  /**
   * 开启 CPU 追踪，记录指定 PC 范围内的所有指令及其内存操作。
   * @param pcLow  范围低地址 (含)
   * @param pcHigh 范围高地址 (含)
   */
  traceStart(pcLow: number, pcHigh: number): void {
    if (!this._tracer) {
      console.warn('[jsnes] tracer not ready — ROM not loaded');
      return;
    }
    this._traceResult = null;
    this._tracer.enable(pcLow, pcHigh);
  }

  /**
   * 关闭 CPU 追踪。
   */
  traceStop(): void {
    if (!this._tracer) return;
    this._traceResult = this._tracer.disable();
  }

  /** 将 trace 结果格式化为文本 */
  private _formatTrace(): string {
    const traces = this._traceResult;
    if (!traces || traces.length === 0) return '(empty)';

    const lines: string[] = [];
    lines.push(`==== TRACE DUMP (${traces.length} ops) ====`);
    for (const t of traces) {
      const regStr = `A=${h2(t.regIn[0])} X=${h2(t.regIn[1])} Y=${h2(t.regIn[2])} SP=${h2(t.regIn[3])}`;
      const opStr = t.ops.map(o =>
        o.kind === 'write'
          ? `W[${h4(o.addr)}]=${h2(o.val)}`
          : `R[${h4(o.addr)}]=${h2(o.val)}`
      ).join(' ');
      lines.push(`  $${h4(t.pc)}  op=$${h2(t.opcode)}  ${regStr}  ${opStr || '(无访存)'}`);
    }
    return lines.join('\n');
  }

  /** 将 trace 结果写入控制台 (模拟器可直接复制) */
  traceToConsole(label?: string): void {
    const traces = this._traceResult;
    if (!traces || traces.length === 0) {
      console.log(`[trace] (empty)${label ? ' ' + label : ''}`);
      return;
    }
    console.log(`[trace] === ${label || 'dump'} (${traces.length} ops) ===`);
    for (const t of traces) {
      const reg = `A=${h2(t.regIn[0])} X=${h2(t.regIn[1])} Y=${h2(t.regIn[2])} SP=${h2(t.regIn[3])}`;
      const mem = t.ops.map(o => o.kind === 'write'
        ? `W[${h4(o.addr)}]=${h2(o.val)}`
        : `R[${h4(o.addr)}]=${h2(o.val)}`).join(' ');
      console.log(`  $${h4(t.pc)}  op=$${h2(t.opcode)}  ${reg}  ${mem || '(none)'}`);
    }
    console.log('[trace] === end ===');
  }

  /** 将 trace 结果写入文件 */
  traceToFile(filePath?: string): void {
    const traces = this._traceResult;
    if (!traces || traces.length === 0) {
      console.log('[jsnes] trace empty, skip write');
      return;
    }
    const content = this._formatTrace();
    const path = filePath || `${wx.env.USER_DATA_PATH}/nmi_trace.txt`;

    try {
      const fs = wx.getFileSystemManager();
      fs.writeFileSync(path, content, 'utf8');
      console.log(`[jsnes] trace → ${path} (${traces.length} ops)`);
    } catch (e: any) {
      console.error('[jsnes] trace write failed:', e.message);
      // 兜底：文件写入失败时 console 输出
      console.log(content);
    }
  }

  /**
   * 自动追踪：跑 N 帧，追踪指定 PC 范围后写文件。
   */
  traceForFrames(pcLow: number, pcHigh: number, frameCount: number, filePath?: string): void {
    this.traceStart(pcLow, pcHigh);
    for (let i = 0; i < frameCount; i++) {
      this.frame();
    }
    this.traceStop();
    this.traceToFile(filePath);
  }
}

// ---- 辅助格式化 ----

function h2(v: number): string {
  return (v & 0xFF).toString(16).padStart(2, '0');
}

function h4(v: number): string {
  return (v & 0xFFFF).toString(16).padStart(4, '0');
}

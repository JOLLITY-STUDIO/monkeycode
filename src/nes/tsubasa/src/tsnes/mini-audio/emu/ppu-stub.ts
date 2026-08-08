/**
 * PPU Stub — 音频驱动专用。
 * 仅跟踪帧定时与 NMI，不产生像素。
 *
 * 使用 NES 风格扫描线 (0-261)，直接对标真实 PPU 时序：
 *   NES 0-239:   可见区域
 *   NES 240:     后渲染 → vblankPending=true
 *   NES 241-260: VBlank
 *   NES 261:     预渲染
 *
 *   每行 341 dots。帧总共 262 × 341 = 89342 dots。
 *   关键: vblankPending 初始 false，防止第一帧过早触发 NMI。
 */

const DOTS_PER_LINE = 341;
const TOTAL_LINES = 262;           // NES 扫描线
const DOTS_PER_FRAME = DOTS_PER_LINE * TOTAL_LINES;

// NES 扫描线关键位置
const POSTRENDER_LINE = 240;       // 后渲染 → vblankPending
const VBLANK_START_LINE = 241;     // VBlank 开始 → NMI 触发
const FRAME_END_LINE = TOTAL_LINES; // = 262 → frameEnded

export class PPUStub {
  private _dots = 0;
  frameEnded = false;

  private _ctrl1 = 0;
  private _status = 0;
  private _nmiTriggered = false;

  // ★ 防止第一帧触发 NMI：必须完成一整帧（经过 line 240）后才允许。
  private _vblankPending = false;
  // 记录上一帧结束时 dots，用于计算帧内位置
  private _frameBaseDots = 0;

  // 总线残留值
  openBusLatch = 0;
  openBusDecayFrames = 0;

  // 桩占位
  vramMem = new Uint8Array(0x4000);
  ptTile = new Array(512).fill(null).map(() => ({ _stub: true }));
  sramMem = new Uint8Array(256);

  private _cpu: any = null;

  bindCPU(cpu: any): void { this._cpu = cpu; }

  // ────────── 生命周期 ──────────

  startFrame(): void {
    this.frameEnded = false;
    this._nmiTriggered = false;
    this._status &= 0x7f;
    this._frameBaseDots = this._dots;
  }

  advanceDots(n: number): void {
    const prevPos = this._dots - this._frameBaseDots;
    this._dots += n;
    const curPos = this._dots - this._frameBaseDots;

    // 帧内扫描线（绝对递增，0→261→262...不 wrap）
    const prevLine = Math.floor(prevPos / DOTS_PER_LINE);
    const curLine = Math.floor(curPos / DOTS_PER_LINE);

    // ── 1. 后渲染行 (NES 240) → vblankPending ──
    if (prevLine < POSTRENDER_LINE && curLine >= POSTRENDER_LINE) {
      this._vblankPending = true;
    }

    // ── 2. VBlank 开始 (NES 241) → NMI 触发 ──
    if (prevLine < VBLANK_START_LINE && curLine >= VBLANK_START_LINE) {
      this._status |= 0x80;
      if (this._vblankPending) {
        this._tryNmi();
      }
    }

    // ── 3. 帧结束 (NES 262/出界) ──
    if (curLine >= FRAME_END_LINE) {
      this.frameEnded = true;
      // 对齐到帧边界
      this._frameBaseDots = Math.floor(this._dots / DOTS_PER_FRAME) * DOTS_PER_FRAME;
    }

    // 安全阀
    if (curPos >= DOTS_PER_FRAME * 3) {
      this.frameEnded = true;
    }
  }

  /** NES 扫描线号 (0-261, >=262 为出界，不 wrap) */
  private _nesLine(dots: number): number {
    return Math.floor(dots / DOTS_PER_LINE) % TOTAL_LINES;
  }

  private _tryNmi(): void {
    if (!this._nmiTriggered && (this._ctrl1 & 0x80) !== 0 && this._cpu) {
      this._nmiTriggered = true;
      this._cpu.nmiRaised = true;
    }
  }

  // ────────── PPU 寄存器 ──────────

  setMirroring(_t: number): void {}

  /** $2000 写 */
  updateControlReg1(value: number): void {
    this._ctrl1 = value;
    // 如果 VBlank 已经在等，且 NMI 使能写入 1，立即触发。
    if ((value & 0x80) !== 0 && (this._status & 0x80) !== 0 && !this._nmiTriggered && this._cpu) {
      this._nmiTriggered = true;
      this._cpu.nmiRaised = true;
    }
  }

  /** $2001 写 */
  updateControlReg2(_value: number): void {}

  /** $2002 读 */
  readStatusRegister(): number {
    const val = this._status;
    this._status &= 0x7f; // 清 VBlank 标志
    return val;
  }

  // ────────── 其他 PPU 操作（无作用） ──────────

  triggerRendering(): void {}

  sramLoad(): number { return 0; }
  vramLoad(): number { return 0; }

  writeSRAMAddress(_v: number): void {}
  sramWrite(_v: number): void {}
  scrollWrite(_v: number): void {}
  writeVRAMAddress(_v: number): void {}
  vramWrite(_v: number): void {}

  sramDMA(value: number, cpu: any): void {
    // DMA 消耗 ~513 CPU 周期
    const odd = (cpu._cpuCycleBase + cpu.instrBusCycles) & 1;
    cpu.haltCycles(odd ? 514 : 513);
  }

  isPixelWhite(_x: number, _y: number): boolean { return false; }

  toJSON(): any { return {}; }
  fromJSON(_s: any): void {}
}

export default PPUStub;

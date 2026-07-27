// ============================================================================
// engine.ts — 游戏引擎
//
// 单帧流程:
//   1. 输入处理 → Joypad 更新
//   2. 场景更新 → SceneManager.update(input)
//   3. PPU 渲染 → frameBuffer
//   4. 输出 → Canvas / onFrame 回调
// ============================================================================

import { Ppu } from './ppu/ppu';
import { renderToCanvas } from './ppu/renderer';
import { JoypadState, createJoypad } from './core/input';
import { wram, clear as clearMem } from './core/memory';
import { Mmc3State, createMmc3, initDefault as initMmc3 } from './core/mmc3';
import { SceneManager } from './scene/manager';
import { SceneId, NO_INPUT } from './scene/types';
import type { JoypadInput } from './scene/types';
import { OpeningScene } from './scene/opening';
import { TitleScene } from './scene/title';
import { BytecodeInterpreter } from './scene/bytecode';

export interface EngineConfig {
  canvas?: CanvasRenderingContext2D | null;
  autoStart?: boolean;
  onFrame?: (buffer: Uint32Array) => void;
}

export class Engine {
  ppu: Ppu = new Ppu();
  joypad: JoypadState = createJoypad();
  mmc3: Mmc3State = createMmc3();
  mem: Uint8Array = wram;
  scenes: SceneManager = new SceneManager();
  /** 字节码解释器 — 对应 ROM Bank 0 $8464 */
  bytecode: BytecodeInterpreter = new BytecodeInterpreter(this.ppu);

  canvas: CanvasRenderingContext2D | null = null;
  onFrame: ((buffer: Uint32Array) => void) | null = null;
  running: boolean = false;
  frameCount: number = 0;

  constructor(cfg: EngineConfig = {}) {
    this.canvas = cfg.canvas ?? null;
    this.onFrame = cfg.onFrame ?? null;
    // 注入 bytecode → scene manager (进度表自动加载需要)
    this.scenes.bytecode = this.bytecode;
    if (cfg.autoStart !== false) this.reset();
  }

  // ============================================================
  // 生命周期
  // ============================================================

  /**
   * 语义化 RESET — 对应 ROM $C64E → $C400 硬件初始化后
   *   1. PPU 初始化 → PPUCTRL=$08, PPUMASK=$1E
   *   2. 内存清零 → ZP + WRAM
   *   3. VRAM 清零 → nametables
   *   4. MMC3 初始映射
   *   5. 场景引擎入口 → $26=0 (TECMO_LOGO), $27=0
   */
  reset(): void {
    // 1. PPU 初始化 (对应 $C400: LDA #$08 STA $2000; LDA #$1E STA $2001)
    this.ppu.reset();
    this.ppuCtrl(0x08);   // NMI off, BG table $0000
    this.ppuMask(0x1e);   // show BG + sprites
    this.ppuScroll(0, 0);

    // 2. 清零内存 (对应 $C64E: 8×256 页清零)
    clearMem();

    // 3. MMC3 初始映射
    this.mmc3 = createMmc3();
    initMmc3(this.mmc3);

    // 4. Joypad
    this.joypad = createJoypad();

    this.frameCount = 0;

    // 5. 场景引擎入口 — $26=0, $27=0 → TECMO_LOGO
    this.scenes = new SceneManager();
    this.scenes.bytecode = this.bytecode; // 注入字节码解释器
    this.scenes.registerAll([new OpeningScene(), new TitleScene()]);
    this.scenes.switchImmediate(SceneId.TECMO_LOGO);
    this.running = true;
  }

  start(): void { this.running = true; }
  pause(): void { this.running = false; }

  // ============================================================
  // 帧循环
  // ============================================================

  tick(input: JoypadInput = NO_INPUT): void {
    if (!this.running) return;

    // 1. 输入
    this._mapInput(input);

    // 2. 场景更新
    this.scenes.update(input);
    this._pollTransition();

    // 3. 字节码解释器执行 — 对应 ROM Bank 0 $8464 每帧步进
    this.bytecode.runFrame();

    // 4. PPU 渲染
    this.ppu.render();

    // 5. 输出
    const buf = this.ppu.frameBuffer;
    if (this.canvas) renderToCanvas(this.canvas, buf);
    if (this.onFrame) this.onFrame(buf);

    this.frameCount++;
  }

  // ============================================================
  // RAF 循环
  // ============================================================

  private _rafId: number = 0;
  private _boundTick = () => {
    if (!this.running) return;
    this.tick();
    this._rafId = requestAnimationFrame(this._boundTick);
  };

  startRAF(): void {
    this.running = true;
    if (!this._rafId) this._rafId = requestAnimationFrame(this._boundTick);
  }

  stopRAF(): void {
    cancelAnimationFrame(this._rafId);
    this._rafId = 0;
  }

  // ============================================================
  // 内部
  // ============================================================

  private _mapInput(input: JoypadInput): void {
    let mask = 0;
    if (input.a)      mask |= 128;
    if (input.b)      mask |= 64;
    if (input.select) mask |= 32;
    if (input.start)  mask |= 16;
    if (input.up)     mask |= 8;
    if (input.down)   mask |= 4;
    if (input.left)   mask |= 2;
    if (input.right)  mask |= 1;
    this.joypad.mask = mask;
  }

  private _pollTransition(): void {
    const cur = this.scenes.current;
    if (cur && cur.nextSceneId >= 0) {
      this.scenes.request(cur.nextSceneId);
    }
  }

  // ============================================================
  // PPU 快捷方法
  // ============================================================

  ppuCtrl(val: number): void { this.ppu.writeReg(8192, val); }
  ppuMask(val: number): void { this.ppu.writeReg(8193, val); }
  ppuScroll(x: number, y: number): void { this.ppu.setScroll(x, y); }
  vramWrite(addr: number, val: number): void { this.ppu.writeVRAM(addr, val); }
  chrBank(idx: number, data: Uint8Array): void { this.ppu.setChrBank(idx, data); }
  setPal(idx: number, col: number): void { this.ppu.palette[idx & 31] = col; }

  destroy(): void {
    this.stopRAF();
    this.running = false;
    this.canvas = null;
    this.onFrame = null;
  }
}

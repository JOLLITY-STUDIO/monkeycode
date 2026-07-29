/**
 * Debug hooks — 参照 FCEUX 的 X6502_Debug() / CPUHook 模式
 *
 * 在 CPU 指令执行后注入回调，供 debug 插件使用。
 * 不做断点/单步调试 — 调试器功能太复杂且 tsnes 暂不需要。
 */

import type CPU from '../cpu';
import type NES from '../nes';

// ==================== Instruction Info ====================
// 对应 FCEUX traceRecord_t

export interface DebugInstrInfo {
  /** 指令起始地址 */
  pc: number;
  /** 操作码 */
  opcode: number;
  /** 指令消耗周期 (含中断) */
  cycles: number;
  /** 帧计数 */
  frameCount: number;
  /** 累计指令数 */
  instrCount: number;
  /** CPU 寄存器快照 */
  reg: {
    A: number; X: number; Y: number; S: number; P: number;
  };
}

export type PostInstrHook = (info: DebugInstrInfo) => void;
export type FrameHook = (frame: number) => void;

// ==================== Hook Manager ====================

export class DebugHookManager {
  private _postHooks: PostInstrHook[] = [];
  private _frameHooks: FrameHook[] = [];
  private _nes: NES | null = null;
  private _enabled = false;

  public instrCount = 0;

  // ---------- 注册 / 注销 ----------

  onPostInstr(hook: PostInstrHook): void { this._postHooks.push(hook); }
  offPostInstr(hook: PostInstrHook): void {
    this._postHooks = this._postHooks.filter(h => h !== hook);
  }

  onFrame(hook: FrameHook): void { this._frameHooks.push(hook); }
  offFrame(hook: FrameHook): void {
    this._frameHooks = this._frameHooks.filter(h => h !== hook);
  }

  // ---------- 挂载 / 卸载 ----------

  attach(nes: NES): void {
    if (this._enabled) return;
    this._nes = nes;
    this._enabled = true;

    // 挂载 frame hook
    const origOnFrame = nes.opts.onFrame;
    if (origOnFrame) {
      const self = this;
      nes.opts.onFrame = function (buffer: Uint32Array) {
        for (const h of self._frameHooks) {
          try { h(nes.fpsFrameCount); } catch (e) { console.error('[debug] frameHook error:', e); }
        }
        self.instrCount = 0;
        origOnFrame.call(this, buffer);
      };
    }

    // 挂载 CPU 指令 hook
    const cpu = nes.cpu;
    const origCb = cpu._traceCb;
    const self = this;

    cpu._traceCb = function (
      this: CPU, pc: number, opcode: number, cycles: number, frameCount: number
    ) {
      if (origCb) {
        try { origCb.call(this, pc, opcode, cycles, frameCount); } catch {}
      }

      if (self._postHooks.length > 0) {
        self.instrCount++;
        const info: DebugInstrInfo = {
          pc,
          opcode,
          cycles,
          frameCount,
          instrCount: self.instrCount,
          reg: {
            A: this.REG_ACC,
            X: this.REG_X,
            Y: this.REG_Y,
            S: this.REG_SP & 0xff,
            P: this.REG_STATUS,
          },
        };
        for (const h of self._postHooks) {
          try { h(info); } catch (e) { console.error('[debug] postHook error:', e); }
        }
      }
    } as any;
  }

  detach(): void {
    if (!this._enabled) return;
    const cpu = this._nes?.cpu;
    if (cpu && cpu._traceCb) {
      cpu._traceCb = null;
    }
    this._nes = null;
    this._enabled = false;
  }

  get nes(): NES | null { return this._nes; }
  get enabled(): boolean { return this._enabled; }
}

/** 全局单例 (参照 FCEUX FCEUI_Debugger) */
export const debugHooks = new DebugHookManager();

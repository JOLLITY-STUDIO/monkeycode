/**
 * ============================================================================
 * Scene Manager — ported from PRG bank 00 (scene dispatch engine)
 * 
 * The original 6502 code at $8000-$9FFF handled:
 *   1. Scene dispatch via jump table ($8000: LDA $27, ASL, TAX, JMP (table,X))
 *   2. Scene initialization and cleanup
 *   3. Script engine (bytecode interpreter at $82ED)
 *   4. Text rendering and screen transitions
 * 
 * In the H5 version, scene dispatch becomes a TypeScript switch/map pattern,
 * and the bytecode interpreter becomes a clean function rather than raw hex.
 * ============================================================================
 */

import { GameState } from './game-state';
import { BytecodeOp } from './types';
import { RomReader } from '../data/rom-reader';

/**
 * Each scene has an update function that returns the new dispatch index
 * (or -1 to stay in the current state).
 */
type SceneUpdateFn = (gs: GameState) => void;

export class SceneManager {
  state: GameState;
  private _sceneHandlers: Map<number, SceneUpdateFn> = new Map();
  private _stopRequested: boolean = false;
  private _rom: RomReader;

  constructor(state: GameState, rom?: RomReader) {
    this.state = state;
    this._rom = rom ?? new RomReader();
  }

  /** Register a handler for a dispatch index */
  registerState(index: number, handler: SceneUpdateFn): void {
    this._sceneHandlers.set(index, handler);
  }

  /**
   * Main update — called every frame by the game loop.
   * Dispatches to the current scene state handler.
   */
  update(): void {
    const handler = this._sceneHandlers.get(this.state.dispatchIndex);
    if (handler) {
      handler(this.state);
    } else {
      // Unknown state — fallback to default scene dispatch
      this._defaultDispatch();
    }
  }

  requestStop(): void { this._stopRequested = true; }
  get stopRequested(): boolean { return this._stopRequested; }

  /**
   * Default scene dispatch — simplified version of the original
   * $8000 dispatch table logic. In the original:
   *   LDA $27 ; ASL ; TAX
   *   LDA jumpTable+1,X ; PHA
   *   LDA jumpTable,X   ; PHA
   *   RTS  (jump to handler)
   */
  private _defaultDispatch(): void {
    const s = this.state;
    const idx = s.dispatchIndex;

    // Scene types that trigger scene transition
    if (idx === 0) {
      // Init state — done by boot sequence
      s.dispatchIndex = 1;
    } else if (idx === 1) {
      // Running state — process bytecode/script engine
      this._runBytecodeEngine();
    } else if (idx === 2) {
      // Match engine
      this._runMatchScene();
    } else if (idx === 3) {
      // Dialog/cutscene mode
      this._runDialogScene();
    } else if (idx === 4) {
      // Fade out / scene transition
      s.dispatchIndex = 0;
      s.progress.sceneId++;
    } else if (idx === 5) {
      // End of game sequence
      this._stopRequested = true;
    }
  }

  // ─── Bytecode Script Engine ───────────────────────────────

  /**
   * Run the bytecode/script interpreter.
   * 
   * Original 6502: $82ED script engine. Reads bytecode from the 
   * current script pointer, interpreting control codes ($D8-$FF)
   * and outputting literal characters ($00-$D7) as text.
   * 
   * We call into a dedicated ScriptEngine for this logic.
   */
  private _runBytecodeEngine(): void {
    const s = this.state;

    // Check if script is running
    if ((s.scriptStatus & 0x80) !== 0) {
      // Script has a new command to process
      const bytecode = this._readScriptByte();

      if (bytecode === BytecodeOp.TERMINATOR) {
        s.scriptStatus &= 0x7F; // Clear new-cmd flag
        s.dispatchIndex = 0;
        return;
      }

      // Character literal
      if (bytecode <= BytecodeOp.CHAR_MAX) {
        this._outputCharacter(bytecode);
        return;
      }

      // Control codes
      this._handleControlCode(bytecode);
    }
  }

  /** Read the next byte from the script pointer */
  private _readScriptByte(): number {
    const addr = this.state.scriptPtr;
    this.state.scriptPtr = (addr + 1) & 0xFFFF;
    // Read from ROM using the MMC3 bank mapping
    return this._rom.read(addr);
  }

  /** Output a character to the text display */
  private _outputCharacter(charCode: number): void {
    // Map NES character code to ASCII / tile
    // The game uses a custom tile-based font
    // In the full implementation, this adds to the display list
    this.state.writeDisplayList([charCode]);
    this.state.scriptCol++;
    if (this.state.scriptCol > 31) {
      this.state.scriptCol = 0;
      this.state.scriptRow++;
    }
  }

  /** Handle a bytecode control code */
  private _handleControlCode(op: number): void {
    const s = this.state;

    if (op >= BytecodeOp.PALETTE_CTRL && op <= 0xDF) {
      // Palette/brightness control
      s.bgBrightness = op - BytecodeOp.PALETTE_CTRL;
    } else if (op >= BytecodeOp.COLUMN_CTRL && op <= 0xE7) {
      // Column position control
      const colVal = op - BytecodeOp.COLUMN_CTRL;
      s.scriptCol = (colVal + s.minCol) & 0x1F;
    } else if (op === BytecodeOp.CLEAR_SCREEN) {
      // Clear screen
      s.nametable0.fill(0);
      s.nametable1.fill(0);
      s.scriptRow = 0;
      s.scriptCol = 0;
    } else if (op === BytecodeOp.FADE_SCENE) {
      // Fade out and transition
      s.dispatchIndex = 4;
    } else if (op === BytecodeOp.SUB_CTRL) {
      // Sub-control — read next byte for specific operation
      const subCode = this._readScriptByte();
      this._handleSubControl(subCode);
    }
    // Additional control codes handled as needed
  }

  private _handleSubControl(code: number): void {
    // Handle sub-control operations (scrolling, palette fades, etc.)
  }

  // ─── Match Scene ──────────────────────────────────────────

  private _runMatchScene(): void {
    // Ported from bank 01 (match engine)
    // Handles: player movement, ball physics, goal checks, score updates
    // In the full implementation, this calls into MatchEngine
  }

  // ─── Dialog Scene ─────────────────────────────────────────

  private _runDialogScene(): void {
    // Handles dialog/cutscene sequences between matches
  }

  // ─── Boot Sequence ────────────────────────────────────────

  /**
   * Initialize the game from a cold boot.
   * Ported from the original bank 31 reset vector ($E000+).
   * 
   * Original flow:
   *   1. Disable NMI, clear decimal mode
   *   2. Init PPU (wait 2 vblanks)
   *   3. Clear RAM ($0000-$07FF)
   *   4. Set stack pointer to $50
   *   5. Init MMC3 banks
   *   6. Load CHR banks
   *   7. Jump to main loop ($E0DF / bank 00 $8000)
   */
  boot(): void {
    const s = this.state;

    // Reset all state to initial values
    s.dispatchIndex = 0;
    s.sceneFlags = 0;
    s.scriptStatus = 0;
    s.scriptPtr = 0;
    s.scrollX = 0;
    s.scrollY = 0;
    s.ppuCtrl = 0;
    s.ppuMask = 0x06; // Show background
    s.ppuAddr = 0;
    s.bgBrightness = 15;
    s.sprBrightness = 15;

    s.nametable0.fill(0);
    s.nametable1.fill(0);
    s.attribute0.fill(0);
    s.attribute1.fill(0);
    s.oamShadow.fill(0xF8); // Y=$F8 = off-screen (hidden sprite)
    s.paletteBuffer.fill(0x0F); // Black
    s.tmp.fill(0);
    s.matchCalc.fill(0);
    s.teamSlots.fill(0);

    s.timing.frameCount = 0;
    s.timing.sceneFrame = 0;
    s.input.current = 0;
    s.input.pressed = 0;
    s.input.previous = 0;

    s.progress.sceneId = 0;   // Start at TECMO logo
    s.progress.maxSceneReached = 0;
    s.progress.matchHalf = 0;

    // PRG bank init: R6=0 ($8000), R7=1 ($A000)
    s.prgBank6 = 0;
    s.prgBank7 = 1;

    // Sync ROM reader bank mapping
    this._rom.setBank6(0);
    this._rom.setBank7(1);

    // CHR bank init (from MMC3 default)
    s.chrBank2 = 0;
    s.chrBank3 = 1;
    s.chrBank4 = 2;
    s.chrBank5 = 3;

    if (this.config.debug) {
      console.log('[SceneManager] Boot complete. Entering main loop.');
    }
  }

  private config = { debug: false };
  setDebug(debug: boolean): void { this.config.debug = debug; }

  /** Get current debug state summary */
  getDebugInfo(): Record<string, unknown> {
    const s = this.state;
    return {
      sceneId: s.progress.sceneId,
      dispatchIndex: s.dispatchIndex,
      frameCount: s.timing.frameCount,
      sceneFrame: s.timing.sceneFrame,
      scriptPtr: `0x${s.scriptPtr.toString(16)}`,
      inputState: `0x${s.input.current.toString(16)}`,
    };
  }
}

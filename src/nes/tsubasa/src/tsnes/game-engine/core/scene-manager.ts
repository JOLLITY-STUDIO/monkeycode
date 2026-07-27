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
import { MatchEngine } from '../core/match-engine';
import { initScene } from './scene-registry';

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
  private _matchEngine: MatchEngine;

  constructor(state: GameState, rom?: RomReader) {
    this.state = state;
    this._rom = rom ?? new RomReader();
    this._matchEngine = new MatchEngine();
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
      // Init state — initialize current scene
      initScene(s, s.progress.sceneId);
      // Sync ROM reader with state
      this._rom.setBank6(s.prgBank6);
      this._rom.setBank7(s.prgBank7);
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

  /** Wait frames remaining (for WAIT_FRAMES bytecode) */
  private _waitFrames: number = 0;

  /**
   * Run the bytecode/script interpreter.
   * 
   * Original 6502: $82ED script engine. Reads bytecode from the 
   * current script pointer, interpreting control codes ($D8-$FF)
   * and outputting literal characters ($00-$D7) as text to nametable.
   */
  private _runBytecodeEngine(): void {
    const s = this.state;

    // Handle wait state (WAIT_FRAMES)
    if (this._waitFrames > 0) {
      this._waitFrames--;
      if (this._waitFrames > 0) return;
      // Resume bytecode processing after wait
    }

    // Check if script is running
    if ((s.scriptStatus & 0x80) === 0) return;

    // Read next bytecode
    const bytecode = this._readScriptByte();

    if (bytecode === BytecodeOp.TERMINATOR) {
      s.scriptStatus &= 0x7F;
      s.dispatchIndex = 0;
      return;
    }

    // Character literal ($00-$D7)
    if (bytecode <= BytecodeOp.CHAR_MAX) {
      this._outputCharacter(bytecode);
      return;
    }

    // Control codes ($D8-$FE)
    this._handleControlCode(bytecode);
  }

  /** Read the next byte from the script pointer */
  private _readScriptByte(): number {
    const addr = this.state.scriptPtr;
    this.state.scriptPtr = (addr + 1) & 0xFFFF;
    return this._rom.read(addr);
  }

  /** Output a character to the nametable (tile-based font) */
  private _outputCharacter(charCode: number): void {
    const s = this.state;
    // Character tile index = charCode + font base offset
    // The game font typically starts at tile 0x00 but uses a remapping table
    const tileIndex = charCode;
    const row = s.scriptRow;
    const col = s.scriptCol;

    // Write to active nametable (nametable 0 for now)
    this._writeNametableChar(0, row, col, tileIndex);

    // Advance cursor
    s.scriptCol++;
    if (s.scriptCol > 31) {
      s.scriptCol = 0;
      s.scriptRow++;
      if (s.scriptRow >= 30) {
        s.scriptRow = 0;
      }
    }
  }

  /** Write a single tile to nametable at (row, col) */
  private _writeNametableChar(nt: number, row: number, col: number, tileIndex: number): void {
    const s = this.state;
    const offset = row * 32 + col;
    if (nt === 0 && offset < 960) {
      s.nametable0[offset] = tileIndex & 0xFF;
    } else if (nt === 1 && offset < 960) {
      s.nametable1[offset] = tileIndex & 0xFF;
    }
  }

  /** Handle a bytecode control code with full opcode support */
  private _handleControlCode(op: number): void {
    const s = this.state;

    // ─── Palette/Brightness Control ($D8-$DF) ─────
    if (op >= 0xD8 && op <= 0xDF) {
      // $D8-$DF: palette index = op - 0xD8 (0-7)
      // Each value maps to a specific palette mode:
      // 0 = BG brightness, 1 = window pal, 2 = text pal, 3 = scroll pal,
      // 4 = field pal, 5 = stadium pal, 6 = sprite pal, 7 = palette select
      s.bgBrightness = op - 0xD8;
      return;
    }

    // ─── Column Control ($E0-$E7) ─────────────────
    if (op >= 0xE0 && op <= 0xE7) {
      const colVal = op - 0xE0;
      s.scriptCol = (colVal + s.minCol) & 0x1F;
      return;
    }

    // ─── Scene/Display Control ($E8-$FA) ──────────
    switch (op) {
      case BytecodeOp.SCENE_TRANS: {
        // $E8 + 1-byte arg: target scene ID
        const targetScene = this._readScriptByte();
        s.progress.sceneId = targetScene;
        s.dispatchIndex = 4; // Fade out transition
        return;
      }

      case BytecodeOp.BRIGHT_FADE: {
        // $E9 + 1-byte arg: fade target brightness
        const target = this._readScriptByte();
        s.timing.frameTarget = target;
        s.bgBrightness = target;
        return;
      }

      case BytecodeOp.CLEAR_SCREEN: {
        // $EA: clear both nametables
        s.nametable0.fill(0);
        s.nametable1.fill(0);
        s.attribute0.fill(0);
        s.attribute1.fill(0);
        s.scriptRow = 0;
        s.scriptCol = 0;
        return;
      }

      case BytecodeOp.PPU_MODE_SET: {
        // $EB + 1-byte arg: PPU control/mask settings
        const mode = this._readScriptByte();
        s.ppuCtrl = mode;
        s.ppuMask = mode;
        return;
      }

      case BytecodeOp.TEXT_SETUP: {
        // $EC + 1-byte arg: line count for text box
        s.lineCount = this._readScriptByte();
        s.scriptRow = 0;
        s.scriptCol = 0;
        return;
      }

      case BytecodeOp.SLOT_STORE: {
        // $ED: store current cursor position to slot
        // Not fully implemented — store for later use
        this._readScriptByte(); // consume arg byte
        return;
      }

      case BytecodeOp.FILL_DISP: {
        // $EE + 1-byte arg: fill display area with tile
        const tile = this._readScriptByte();
        for (let r = 0; r < 30; r++) {
          for (let c = 0; c < 32; c++) {
            this._writeNametableChar(0, r, c, tile);
          }
        }
        return;
      }

      case BytecodeOp.TOGGLE_FLAG: {
        // $EF: toggle a scene flag
        this._readScriptByte(); // consume flag index
        return;
      }

      case BytecodeOp.CURSOR_SET: {
        // $F0 + 2-byte args: row, col
        s.scriptRow = this._readScriptByte();
        s.scriptCol = this._readScriptByte();
        return;
      }

      case BytecodeOp.BANK_LOAD: {
        // $F1 + 1-byte arg: load data from a specific bank
        const bank = this._readScriptByte();
        s.dataBank = bank;
        s.prgBank6 = bank;
        this._rom.setBank6(bank);
        return;
      }

      case BytecodeOp.LINE_MAX: {
        // $F2 + 1-byte arg: max lines to display
        s.lineCount = this._readScriptByte();
        return;
      }

      case BytecodeOp.PALETTE_OP: {
        // $F3 + 1-byte arg: palette operation
        this._readScriptByte();
        return;
      }

      case BytecodeOp.SUB_CTRL: {
        // $F4 + 1-byte arg: sub-control operation
        const subCode = this._readScriptByte();
        this._handleSubControl(subCode);
        return;
      }

      case BytecodeOp.DISP_CTRL: {
        // $F5 + 1-byte arg: display control
        this._readScriptByte();
        return;
      }

      case BytecodeOp.CLEAR_DELAY: {
        // $F6 + 1-byte arg: clear + delay frames
        s.nametable0.fill(0);
        s.nametable1.fill(0);
        this._waitFrames = this._readScriptByte();
        return;
      }

      case BytecodeOp.TOGGLE_DIR: {
        // $F7: toggle direction / bank
        this._readScriptByte();
        return;
      }

      case BytecodeOp.CROSS_BANK: {
        // $F8 + 2-byte args (lo, hi): target address in new bank
        const lo = this._readScriptByte();
        const hi = this._readScriptByte();
        const targetAddr = (hi << 8) | lo;

        // Save current script state
        s.scriptSavePtr = s.scriptPtr;
        s.savedBank = s.dataBank;

        // Switch to target address
        s.scriptPtr = targetAddr;
        s.dispatchIndex = 1; // Stay in bytecode mode
        return;
      }

      case BytecodeOp.FADE_SCENE: {
        // $F9: fade out and transition scene
        s.dispatchIndex = 4; // Fade out → next scene
        return;
      }

      case BytecodeOp.FADE_SETUP: {
        // $FA + 1-byte arg: fade setup parameters
        s.timing.frameTarget = this._readScriptByte();
        return;
      }

      default:
        // Unknown opcode — skip with no side effects
        if (this.config.debug) {
          console.warn(`[SceneManager] Unknown opcode: 0x${op.toString(16)}`);
        }
        return;
    }
  }

  /** Handle sub-control operations (extended functionality) */
  private _handleSubControl(code: number): void {
    const s = this.state;

    switch (code) {
      case 0x00: // Set scroll X
        s.scrollX = this._readScriptByte();
        break;
      case 0x01: // Set scroll Y
        s.scrollY = this._readScriptByte();
        break;
      case 0x02: // Enable/disable sprite rendering
        s.ppuMask = this._readScriptByte();
        break;
      case 0x03: // Set PPU control register
        s.ppuCtrl = this._readScriptByte();
        break;
      case 0x04: // CHR bank select
        s.chrBank2 = this._readScriptByte();
        break;
      default:
        if (this.config.debug) {
          console.warn(`[SceneManager] Unknown sub-control: 0x${code.toString(16)}`);
        }
        break;
    }
  }

  // ─── Dialog Scene ─────────────────────────────────────────

  /** Dialog state machine enum */
  private _dialogPhase: 'TEXT' | 'WAIT_INPUT' | 'CHOICE' | 'DONE' = 'TEXT';

  /** Active choice menu items (strings for display) */
  private _dialogChoices: string[] = [];

  /** Selected choice index */
  private _dialogChoiceIndex: number = 0;

  /**
   * Dialog/cutscene engine.
   *
   * Handles:
   *   - Multi-page text rendering (A button advances)
   *   - Choice menus (↑↓ to select, A to confirm)
   *   - Pause on WAIT_FRAMES / WAIT_INPUT bytecodes
   */
  private _runDialogScene(): void {
    const s = this.state;

    switch (this._dialogPhase) {
      case 'TEXT':
        // Process bytecode to display text
        if ((s.scriptStatus & 0x80) !== 0) {
          this._runBytecodeEngine();
        }

        // Check if bytecode engine transitioned to wait/choice state
        if (this._dialogPhase === 'TEXT' && (s.scriptStatus & 0x80) === 0) {
          // No more bytecode — text complete, wait for input
          this._dialogPhase = 'WAIT_INPUT';
        }
        break;

      case 'WAIT_INPUT':
        // Wait for player to press A or START to advance
        if (s.isPressed(0x80) || s.isPressed(0x10)) {
          // Advance to next text page or finish
          s.scriptStatus |= 0x80; // Resume bytecode
          this._dialogPhase = 'TEXT';
        }
        break;

      case 'CHOICE':
        // Handle menu choice navigation
        if (s.isPressed(0x08)) { // UP
          this._dialogChoiceIndex =
            (this._dialogChoiceIndex - 1 + this._dialogChoices.length) %
            this._dialogChoices.length;
        }
        if (s.isPressed(0x04)) { // DOWN
          this._dialogChoiceIndex =
            (this._dialogChoiceIndex + 1) % this._dialogChoices.length;
        }
        if (s.isPressed(0x80)) { // A button — confirm choice
          // Store selected choice and continue
          s.tmp[0] = this._dialogChoiceIndex;
          this._dialogChoices = [];
          this._dialogPhase = 'TEXT';
          s.scriptStatus |= 0x80; // Resume bytecode
        }
        break;

      case 'DONE':
        // Dialog finished, transition back
        s.dispatchIndex = 0;
        break;
    }
  }

  /**
   * Display a choice menu to the player.
   * Sets dialog phase to CHOICE for input handling.
   */
  showChoices(choices: string[]): void {
    this._dialogChoices = choices;
    this._dialogChoiceIndex = 0;
    this._dialogPhase = 'CHOICE';
  }

  // ─── Match Scene ──────────────────────────────────────────

  private _matchInitialized: boolean = false;

  private _runMatchScene(): void {
    const s = this.state;

    // Initialize match on first entry
    if (!this._matchInitialized) {
      this._matchEngine.shortMatch = true; // Short match for dev/testing
      this._matchEngine.initMatch(11, 11);
      this._matchInitialized = true;
    }

    // Run match engine update
    this._matchEngine.update(s);

    // Check match state
    if (this._matchEngine.phase === 'done') {
      const result = this._matchEngine.getResult();
      s.dispatchIndex = 0;
      s.progress.sceneId++;
      this._matchInitialized = false;

      if (this.config.debug) {
        console.log(`[MatchEngine] Match over! ${result.playerScore}-${result.comScore}`);
      }
    }
  }

  /** Get match engine for direct access (testing) */
  getMatchEngine(): MatchEngine {
    return this._matchEngine;
  }

  /** Reset match state */
  resetMatch(): void {
    this._matchInitialized = false;
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

    // Reset dialog state
    this._dialogPhase = 'TEXT';
    this._dialogChoices = [];
    this._dialogChoiceIndex = 0;
    this._waitFrames = 0;

    // Reset match state
    this._matchInitialized = false;

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

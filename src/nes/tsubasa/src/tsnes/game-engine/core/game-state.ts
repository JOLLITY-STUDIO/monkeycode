/**
 * ============================================================================
 * Game State — replaces all 6502 ZP ($00-$FF) and WRAM ($0100-$07FF)
 * 
 * Previously these were raw memory locations accessed via LDA/STA. 
 * Now they are named fields on a plain TypeScript class, with helper
 * methods that mirror the original 6502 data manipulation patterns.
 * ============================================================================
 */

import {
  InputState, FrameTiming, GameProgress, BytecodeOp,
  DisplayListEntry, TileData, Player, Team,
} from './types';

/** NES screen is 256×240. We map to a logical buffer. */
const SCREEN_TILE_W = 32;
const SCREEN_TILE_H = 30;

export class GameState {
  // ─── Input ────────────────────────────────────────────
  input: InputState = { current: 0, pressed: 0, previous: 0 };

  // ─── Frame / Timing ───────────────────────────────────
  timing: FrameTiming = {
    frameCount: 0,
    sceneFrame: 0,
    frameTarget: 0,
    vblankReady: false,
  };

  // ─── Game Progress ────────────────────────────────────
  progress: GameProgress = {
    sceneId: 0,
    maxSceneReached: 0,
    stageNumber: 0,
    matchHalf: 0,
    rosterFlag: 0,
  };

  // ─── Scene / Dispatch ─────────────────────────────────
  /** Scene dispatch index (previously ZP_DISPATCH_INDEX at $27) */
  dispatchIndex: number = 0;
  /** Scene flags (previously ZP_SCENE_FLAGS at $5B) */
  sceneFlags: number = 0;
  /** NMI trigger (previously ZP_NMI_TRIGGER at $E0) */
  nmiTrigger: number = 0;
  /** VBlank done flag (previously ZP_VBLANK_DONE at $E1) */
  vblankDone: number = 0;

  // ─── Script / Bytecode Engine ─────────────────────────
  /** Script engine status (previously ZP_SCRIPT_STATUS at $4C, bit7=new cmd) */
  scriptStatus: number = 0;
  /** Script data pointer (previously ZP_SCRIPT_PTR at $4D-$4E) */
  scriptPtr: number = 0;
  /** Script row position (previously ZP_SCRIPT_ROW at $4F) */
  scriptRow: number = 0;
  /** Script column position (previously ZP_SCRIPT_COL at $50) */
  scriptCol: number = 0;
  /** Cursor column (previously ZP_CURSOR_COL at $53) */
  cursorCol: number = 0;
  /** Min column limit (previously ZP_MIN_COL at $54) */
  minCol: number = 0;
  /** Text line count (previously ZP_LINE_COUNT at $55) */
  lineCount: number = 0;
  /** Data bank number (previously ZP_DATA_BANK at $56) */
  dataBank: number = 0;
  /** Saved script pointer (previously ZP_SCRIPT_SAVE at $58-$59) */
  scriptSavePtr: number = 0;
  /** Saved data bank (previously ZP_SAVED_BANK at $5A) */
  savedBank: number = 0;

  // ─── Display / Rendering ──────────────────────────────
  /** Display list buffer (replaces $05E8-$0627 display list) */
  displayList: number[] = [];
  /** Display list write pointer (replaces $0628) */
  displayListWritePtr: number = 0;
  /** Display list busy flag (replaces $0629, bit6=skip) */
  displayListBusy: number = 0;
  /** Palette buffer 32 bytes (replaces $062A-$0649) */
  paletteBuffer: Uint8Array = new Uint8Array(32);
  /** OAM shadow 256 bytes (replaces $0468-$0567) */
  oamShadow: Uint8Array = new Uint8Array(256);

  /** BG brightness (previously ZP_BG_BRIGHTNESS at $4A) */
  bgBrightness: number = 15;
  /** Sprite brightness (previously ZP_SPR_BRIGHTNESS at $4B) */
  sprBrightness: number = 15;

  // ─── PPU State (for Canvas rendering) ─────────────────
  /** Nametable tiles — 2 screens of 32×30 = 2048 bytes */
  nametable0: Uint8Array = new Uint8Array(960);
  nametable1: Uint8Array = new Uint8Array(960);
  /** Attribute tables — 2 screens of 64 bytes */
  attribute0: Uint8Array = new Uint8Array(64);
  attribute1: Uint8Array = new Uint8Array(64);
  /** Scroll X/Y */
  scrollX: number = 0;
  scrollY: number = 0;
  /** PPU control mirror (previously ZP_PPUCTRL_MIRROR at $20) */
  ppuCtrl: number = 0;
  /** PPU mask mirror (previously ZP_PPUMASK_MIRROR at $21) */
  ppuMask: number = 0;
  /** PPU address latch (previously ZP_PPU_ADDR at $E6-$E7) */
  ppuAddr: number = 0;
  /** PPU register latch (toggle for $2005/$2006 writes) */
  ppuAddrLatch: boolean = false;
  /** CHR bank cache — MMC3 R2-R5 (PPU $1000-$1FFF) */
  chrBank2: number = 0;  // $1000-$13FF
  chrBank3: number = 0;  // $1400-$17FF
  chrBank4: number = 0;  // $1800-$1BFF
  chrBank5: number = 0;  // $1C00-$1FFF

  // ─── MMC3 State (for bank references) ─────────────────
  /** PRG bank slots — MMC3 $8000-$9FFF (R6), $A000-$BFFF (R7) */
  prgBank6: number = 0;
  prgBank7: number = 1;
  /** Fixed PRG banks */
  prgBankC000: number = 30;
  prgBankE000: number = 31;

  // ─── Match / Field Data ───────────────────────────────
  /** Match calculation buffer (replaces $0656-$06FF) */
  matchCalc: Uint8Array = new Uint8Array(170);
  /** Team slots (replaces $0700-$07FF, 256 bytes) */
  teamSlots: Uint8Array = new Uint8Array(256);
  /** Roster data — 11 players × 12 bytes = 132 bytes ($0300-$0383) */
  rosterData: Uint8Array = new Uint8Array(132);
  /** Formation data — 10 positions × 4 bytes ($0408-$042B) */
  formationData: Uint8Array = new Uint8Array(40);
  /** Field player positions ($0446 and beyond, stored in OAM shadow area) */

  // ─── Player/Team Objects ──────────────────────────────
  playerTeam?: Team;
  comTeam?: Team;

  // ─── Scratch / Temp ───────────────────────────────────
  /** General temp vars (previously ZP_TMP at $00-$0E) */
  tmp: Uint8Array = new Uint8Array(16);
  /** Loop counter (previously ZP_LOOP_COUNTER at $3A) */
  loopCounter: number = 0;

  // ─── High-level helpers ───────────────────────────────

  /** Get current scene ID */
  get sceneId(): number { return this.progress.sceneId; }
  set sceneId(v: number) { this.progress.sceneId = v; }

  /** Check if a button was newly pressed this frame */
  isPressed(button: number): boolean {
    return (this.input.pressed & button) !== 0;
  }

  /** Check if a button is held */
  isHeld(button: number): boolean {
    return (this.input.current & button) !== 0;
  }

  /** Get nametable byte at (x, y) */
  getNametableTile(nametable: number, x: number, y: number): number {
    const offset = y * SCREEN_TILE_W + x;
    return nametable === 0
      ? this.nametable0[offset]
      : this.nametable1[offset];
  }

  /** Set nametable byte at (x, y) */
  setNametableTile(nametable: number, x: number, y: number, value: number): void {
    const offset = y * SCREEN_TILE_W + x;
    if (nametable === 0) {
      this.nametable0[offset] = value;
    } else {
      this.nametable1[offset] = value;
    }
  }

  /** Write to display list buffer (like $05E8 writes during game logic) */
  writeDisplayList(data: number[]): void {
    for (const byte of data) {
      if (this.displayListWritePtr < this.displayList.length) {
        this.displayList[this.displayListWritePtr++] = byte;
      }
    }
  }

  /** Clone critical state for save/restore */
  clone(): GameState {
    const gs = new GameState();
    gs.input = { ...this.input };
    gs.timing = { ...this.timing };
    gs.progress = { ...this.progress };
    gs.dispatchIndex = this.dispatchIndex;
    gs.sceneFlags = this.sceneFlags;
    gs.scriptStatus = this.scriptStatus;
    gs.scriptPtr = this.scriptPtr;
    gs.scrollX = this.scrollX;
    gs.scrollY = this.scrollY;
    gs.ppuCtrl = this.ppuCtrl;
    gs.ppuMask = this.ppuMask;
    gs.paletteBuffer = new Uint8Array(this.paletteBuffer);
    gs.oamShadow = new Uint8Array(this.oamShadow);
    gs.nametable0 = new Uint8Array(this.nametable0);
    gs.nametable1 = new Uint8Array(this.nametable1);
    gs.attribute0 = new Uint8Array(this.attribute0);
    gs.attribute1 = new Uint8Array(this.attribute1);
    gs.tmp = new Uint8Array(this.tmp);
    gs.matchCalc = new Uint8Array(this.matchCalc);
    gs.rosterData = new Uint8Array(this.rosterData);
    gs.formationData = new Uint8Array(this.formationData);
    gs.teamSlots = new Uint8Array(this.teamSlots);
    return gs;
  }
}

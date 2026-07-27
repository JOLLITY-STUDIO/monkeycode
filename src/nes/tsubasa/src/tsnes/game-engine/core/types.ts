/**
 * ============================================================================
 * Tsubasa H5 Game Engine — Core Type Definitions
 * 
 * Replaces all 6502 ZP/WRAM hardware addresses with structured TypeScript types.
 * All names use modern English naming conventions.
 * ============================================================================
 */

// ─── Player / Team ──────────────────────────────────────────

export interface PlayerStats {
  /** 0-15 base stats for each category (speed, power, technique, etc.) */
  stats: [number, number, number, number, number, number, number];
  /** Special move IDs (max 4) */
  specialMoves: number[];
  /** Jersey number */
  jerseyNumber: number;
  /** Position on field (0=GK, 1=DF, 2=MF, 3=FW) */
  position: PlayerPosition;
}

export enum PlayerPosition {
  GK = 0,
  DF = 1,
  MF = 2,
  FW = 3,
}

export interface Player {
  id: number;
  name: string;
  stats: PlayerStats;
  /** 12-byte field data for match: X, Y, speed, stamina, etc. */
  fieldData: Uint8Array;
}

export interface Team {
  name: string;
  players: Player[];
  formation: Formation;
  /** 0 = P1 (left side), 1 = P2 / COM (right side) */
  side: 0 | 1;
}

export interface Formation {
  positions: { x: number; y: number }[];
}

// ─── Game Progress ──────────────────────────────────────────

export interface GameProgress {
  /** Current scene ID (previously ZP_SCENE_ID) */
  sceneId: number;
  /** Max scene reached (previously ZP_E4_SEEN_MAX) */
  maxSceneReached: number;
  /** Selected stage/menu option */
  stageNumber: number;
  /** Match half: 0=first, 1=second */
  matchHalf: number;
  /** Roster type flag */
  rosterFlag: number;
}

// ─── Input ──────────────────────────────────────────────────

/** Joypad button bitmask — matches NES controller layout */
export enum Button {
  A       = 0x80,
  B       = 0x40,
  SELECT  = 0x20,
  START   = 0x10,
  UP      = 0x08,
  DOWN    = 0x04,
  LEFT    = 0x02,
  RIGHT   = 0x01,
}

export interface InputState {
  /** Current frame button state */
  current: number;
  /** Newly pressed this frame */
  pressed: number;
  /** Previous frame state */
  previous: number;
}

// ─── Scene ──────────────────────────────────────────────────

export enum SceneType {
  TECMO_LOGO    = 0x00,
  TITLE         = 0x02,
  LOAD_GAME     = 0x03,
  MAIN_MENU     = 0x04,
  STORY_INTRO   = 0x05,
  BRAZIL_LEAGUE = 0x06,
  BRAZIL_DIALOG = 0x07,
  BRAZIL_END    = 0x08,
  HIGH_SCHOOL   = 0x0C,
  HIGH_SCHOOL_DIALOG = 0x0D,
  HIGH_SCHOOL_END = 0x0E,
  JAPAN_CUP     = 0x10,
  JAPAN_CUP_DIALOG = 0x11,
  WORLD_YOUTH   = 0x12,
  WORLD_YOUTH_DIALOG = 0x13,
  WORLD_YOUTH_END = 0x14,
  ENDING        = 0x1E,
  FINAL_ENDING  = 0x20,
}

export enum SceneState {
  INIT    = 0,
  TITLE   = 1,
  RUNNING = 2,
  FADE_IN = 3,
  FADE_OUT = 4,
  WAIT_INPUT = 5,
}

// ─── Script / Bytecode ──────────────────────────────────────

export enum BytecodeOp {
  // $00-$D7: literal character output
  CHAR_MIN       = 0x00,
  CHAR_MAX       = 0xD7,
  // $D8-$DF: palette control
  PALETTE_CTRL   = 0xD8,
  // $E0-$E7: column control
  COLUMN_CTRL    = 0xE0,
  // $E8-$FA: scene/display control
  SCENE_TRANS    = 0xE8,
  BRIGHT_FADE    = 0xE9,
  CLEAR_SCREEN   = 0xEA,
  PPU_MODE_SET   = 0xEB,
  TEXT_SETUP     = 0xEC,
  SLOT_STORE     = 0xED,
  FILL_DISP      = 0xEE,
  TOGGLE_FLAG    = 0xEF,
  CURSOR_SET     = 0xF0,
  BANK_LOAD      = 0xF1,
  LINE_MAX       = 0xF2,
  PALETTE_OP     = 0xF3,
  SUB_CTRL       = 0xF4,
  DISP_CTRL      = 0xF5,
  CLEAR_DELAY    = 0xF6,
  TOGGLE_DIR     = 0xF7,
  CROSS_BANK     = 0xF8,
  FADE_SCENE     = 0xF9,
  FADE_SETUP     = 0xFA,
  // $FB-$FE: display control / text formatting
  SCRIPT_FLUSH   = 0xFB,  // Process display + continue (no arg)
  TEXT_ADVANCE   = 0xFC,  // Process display + advance PPU addr (1 arg)
  SCRIPT_HOLD    = 0xFD,  // Hold/wait operation (1 arg)
  LINE_BREAK     = 0xFE,  // Line break / carriage return (no arg)
  TERMINATOR     = 0xFF,
}

// ─── Display ────────────────────────────────────────────────

export interface DisplayListEntry {
  /** PPU address (2 bytes) */
  address: number;
  /** Tile data (variable length) */
  data: Uint8Array;
}

export interface TileData {
  pixels: Uint8Array;  // 8x8 = 64 pixels
  palette: number;     // palette index 0-3
}

// ─── Audio ─────────────────────────────────────────────────

export interface AudioCommand {
  channel: number;
  command: number;
  pitch: number;
  volume: number;
  duration: number;
}

// ─── Frame Timing ───────────────────────────────────────────

export interface FrameTiming {
  /** Frame counter (previously ZP_FRAME_COUNTER) */
  frameCount: number;
  /** Scene-local frame counter */
  sceneFrame: number;
  /** Target frame count for scene transitions */
  frameTarget: number;
  /** NMI-like trigger for display list processing */
  vblankReady: boolean;
}

// ─── Engine Config ──────────────────────────────────────────

export interface EngineConfig {
  /** Canvas width in logical pixels */
  canvasWidth: number;
  /** Canvas height in logical pixels */
  canvasHeight: number;
  /** Target FPS */
  fps: number;
  /** Enable debug logging */
  debug: boolean;
  /** Platform adapter */
  platform: 'web' | 'miniprogram';
}

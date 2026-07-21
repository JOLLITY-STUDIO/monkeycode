/**
 * 足球小将 II (Captain Tsubasa II) NES - 引擎上下文
 * 遊戲引擎的整體執行狀態，對應 ASM 中所有 ZP + RAM 變數
 *
 * 關鍵原則:
 *   - 這是邏輯模型，不實際操作 NES 硬體
 *   - 所有數值用十進制常量/命名變數
 *   - RAM 位址透過 _constants.ts 的命名常量對照
 */

import {
  // 遮罩
  TERMINATOR, SENTINEL,
  MASK_LO4, MASK_HI2, MASK_HI3, MASK_ALIGN_8, MASK_CLR_SIGN,
  BIT_7, BIT_6, BIT_4, BIT_3,
  // PPU
  PPUCTRL, PPUMASK, PPUADDR, PPUDATA, PPUSCROLL,
  PPUCTRL_NMI, PPUMASK_SHOW_SPR, PPUMASK_SHOW_BG,
  PPU_NT0_HI,
  // 精靈
  SPRITE_HIDE_Y,
  // MMC3
  MMC3_BANK_SEL, MMC3_BANK_DATA,
  MMC3_REG_PRG_LO, MMC3_REG_CHR_2K_LO,
  // RAM 位址
  ZP_NMI_TRIGGER, ZP_VBLANK_DONE,
  ZP_PPUCTRL_MIRROR, ZP_PPUMASK_MIRROR,
  ZP_PPUSCROLL_X, ZP_PPUSCROLL_Y,
  ZP_FRAME_CNT, ZP_SCENE_BANK, ZP_SCENE_STATE,
  ZP_JOYPAD1, ZP_JOYPAD1_NEW, ZP_JOYPAD1_PREV,
  ZP_SCRIPT_LO, ZP_SCRIPT_HI, ZP_SCRIPT_ROW, ZP_SCRIPT_COL,
  ZP_LINE_LIMIT, ZP_TEXT_LINES, ZP_CUR_BANK,
  ZP_SCREEN_COL, ZP_SCREEN_ROW, ZP_SCANLINE,
  ZP_DIGIT_100, ZP_DIGIT_10,
  ZP_DISP_ATTR_X, ZP_DISP_ATTR_Y, ZP_SCENE_STATUS,
  ZP_FLAGS, ZP_ATTR_IDX,
  ZP_LOOP_CNT, ZP_34, ZP_PTR_36,
  ZP_SPR_ATTR, ZP_SPR_DIR, ZP_SPR_PTR_LO, ZP_SPR_PTR_HI,
  ZP_SPR_IDX, ZP_SPR_OBJ,
  ZP_NMI_TIMER, ZP_PPU_MODE,
  ZP_SCROLL_Y, ZP_SCROLL_X_NT,
  ZP_OBJ_PTR_LO, ZP_OBJ_PTR_HI,
  ZP_PPUADDR_LO, ZP_PPUADDR_HI,
  ZP_ROW_CNT, ZP_BANK_TMP, ZP_GEN_EA, ZP_GEN_EB,
  ZP_GLOBAL_LO, ZP_GLOBAL_HI,
  ZP_LOOP_CNT_40, ZP_JOYPAD_TMP,
  ZP_SCROLL_X_POS, ZP_SCROLL_REL,
  ZP_CHR_BANK_2, ZP_CHR_BANK_3, ZP_CHR_BANK_4, ZP_CHR_BANK_5,
  OAM_BUF, DISP_EXT, DISPLAY_LIST,
  DISPLAY_LIST_END, DISPLAY_LIST_ATTR, ATTR_BUF,
  FIELD_PLAYER_BUF, FIELD_CALC_BUF,
  TEAM_SLOT,
  // 遊戲常量
  TEXT_MAX_LINES, SCENE_STATE_INIT,
} from './_constants';

import type {
  Byte, Word,
  CpuState, PpuState,
  ZeroPage, OamEntry, DisplayEntry, DisplayList, AttrBuffer,
  JoypadState, Mmc3State,
  NesRam as NesRamType,
} from './_types';

// ============================================================
// 遊戲引擎上下文 (單例)
// ============================================================

/**
 * 遊戲引擎上下文
 * 封裝所有 NES RAM 狀態，以命名變數代替地址操作
 */
export class GameContext {
  /** NES 完整 RAM */
  readonly ram: NesRamType;

  /** CPU 狀態 */
  cpu: CpuState;

  /** PPU 狀態快照 */
  ppu: PpuState;

  /** MMC3 狀態 */
  mmc3: Mmc3State;

  constructor(rawRam?: Byte[]) {
    // 初始化 2KB RAM
    const zp  = new Uint8Array(256);
    const stk = new Uint8Array(256);
    const oam = new Uint8Array(256);
    const gen = new Uint8Array(1280); // $0300-$07FF

    if (rawRam) {
      for (let i = 0; i < Math.min(rawRam.length, 2048); i++) {
        const a = rawRam[i];
        if (i < 256) zp[i] = a;
        else if (i < 512) stk[i - 256] = a;
        else if (i < 768) oam[i - 512] = a;
        else gen[i - 768] = a;
      }
    }

    this.ram = createNesRam(zp, stk, oam, gen);
    this.cpu = createCpuState();
    this.ppu = createPpuState();
    this.mmc3 = createMmc3State();
  }

  // ---- 零頁便捷存取 ----

  /** NMI 觸發旗標 */
  get nmiTrigger(): Byte { return this.ram.u8(ZP_NMI_TRIGGER); }
  set nmiTrigger(v: Byte) { this.ram.setU8(ZP_NMI_TRIGGER, v); }

  /** VBlank 完成 */
  get vblankDone(): Byte { return this.ram.u8(ZP_VBLANK_DONE); }
  set vblankDone(v: Byte) { this.ram.setU8(ZP_VBLANK_DONE, v); }

  /** PPUCTRL 鏡像 */
  get ppuCtrl(): Byte { return this.ram.u8(ZP_PPUCTRL_MIRROR); }
  set ppuCtrl(v: Byte) { this.ram.setU8(ZP_PPUCTRL_MIRROR, v); }

  /** PPUMASK 鏡像 */
  get ppuMask(): Byte { return this.ram.u8(ZP_PPUMASK_MIRROR); }
  set ppuMask(v: Byte) { this.ram.setU8(ZP_PPUMASK_MIRROR, v); }

  /** PPU 滾動 X 鏡像 (快取) */
  get ppuScrollXM(): Byte { return this.ram.u8(ZP_PPUSCROLL_X); }
  set ppuScrollXM(v: Byte) { this.ram.setU8(ZP_PPUSCROLL_X, v); }

  /** PPU 滾動 Y 鏡像 (快取) */
  get ppuScrollYM(): Byte { return this.ram.u8(ZP_PPUSCROLL_Y); }
  set ppuScrollYM(v: Byte) { this.ram.setU8(ZP_PPUSCROLL_Y, v); }

  /** 幀計數器 */
  get frameCnt(): Byte { return this.ram.u8(ZP_FRAME_CNT); }
  set frameCnt(v: Byte) { this.ram.setU8(ZP_FRAME_CNT, v); }

  /** 場景 bank */
  get sceneBank(): Byte { return this.ram.u8(ZP_SCENE_BANK); }
  set sceneBank(v: Byte) { this.ram.setU8(ZP_SCENE_BANK, v); }

  /** 場景狀態 */
  get sceneState(): Byte { return this.ram.u8(ZP_SCENE_STATE); }
  set sceneState(v: Byte) { this.ram.setU8(ZP_SCENE_STATE, v); }

  /** 手柄 1 目前輸入 */
  get joypad1(): Byte { return this.ram.u8(ZP_JOYPAD1); }
  /** 手柄 1 本幀新按 */
  get joypad1New(): Byte { return this.ram.u8(ZP_JOYPAD1_NEW); }
  /** 手柄 1 上幀 */
  get joypad1Prev(): Byte { return this.ram.u8(ZP_JOYPAD1_PREV); }

  /** 取得手柄完整狀態 */
  getJoypadState(): JoypadState {
    return {
      current: this.joypad1,
      newPress: this.joypad1New,
      prev: this.joypad1Prev,
    };
  }

  /** 腳本指標 */
  get scriptPtr(): Word {
    return (this.ram.u8(ZP_SCRIPT_HI) << 8) | this.ram.u8(ZP_SCRIPT_LO);
  }
  set scriptPtr(v: Word) {
    this.ram.setU8(ZP_SCRIPT_LO, v & 255);
    this.ram.setU8(ZP_SCRIPT_HI, (v >> 8) & 255);
  }

  /** 腳本行/列 */
  get scriptRow(): Byte { return this.ram.u8(ZP_SCRIPT_ROW); }
  set scriptRow(v: Byte) { this.ram.setU8(ZP_SCRIPT_ROW, v); }
  get scriptCol(): Byte { return this.ram.u8(ZP_SCRIPT_COL); }
  set scriptCol(v: Byte) { this.ram.setU8(ZP_SCRIPT_COL, v); }

  /** 螢幕位置 */
  get screenRow(): Byte { return this.ram.u8(ZP_SCREEN_ROW); }
  set screenRow(v: Byte) { this.ram.setU8(ZP_SCREEN_ROW, v); }
  get screenCol(): Byte { return this.ram.u8(ZP_SCREEN_COL); }
  set screenCol(v: Byte) { this.ram.setU8(ZP_SCREEN_COL, v); }
  get scanline(): Byte { return this.ram.u8(ZP_SCANLINE); }

  /** 文本行 */
  get lineLimit(): Byte { return this.ram.u8(ZP_LINE_LIMIT); }
  set lineLimit(v: Byte) { this.ram.setU8(ZP_LINE_LIMIT, v); }
  get textLines(): Byte { return this.ram.u8(ZP_TEXT_LINES); }
  set textLines(v: Byte) { this.ram.setU8(ZP_TEXT_LINES, v); }

  /** 當前 bank */
  get curBank(): Byte { return this.ram.u8(ZP_CUR_BANK); }
  set curBank(v: Byte) { this.ram.setU8(ZP_CUR_BANK, v); }

  /** 數字顯示 */
  get digit100(): Byte { return this.ram.u8(ZP_DIGIT_100); }
  set digit100(v: Byte) { this.ram.setU8(ZP_DIGIT_100, v); }
  get digit10(): Byte { return this.ram.u8(ZP_DIGIT_10); }
  set digit10(v: Byte) { this.ram.setU8(ZP_DIGIT_10, v); }

  /** 顯示屬性計數 */
  get dispAttrX(): Byte { return this.ram.u8(ZP_DISP_ATTR_X); }
  set dispAttrX(v: Byte) { this.ram.setU8(ZP_DISP_ATTR_X, v); }
  get dispAttrY(): Byte { return this.ram.u8(ZP_DISP_ATTR_Y); }
  set dispAttrY(v: Byte) { this.ram.setU8(ZP_DISP_ATTR_Y, v); }

  /** 場景狀態碼 */
  get sceneStatus(): Byte { return this.ram.u8(ZP_SCENE_STATUS); }
  set sceneStatus(v: Byte) { this.ram.setU8(ZP_SCENE_STATUS, v); }

  /** 通用旗標 */
  get flags(): Byte { return this.ram.u8(ZP_FLAGS); }
  set flags(v: Byte) { this.ram.setU8(ZP_FLAGS, v); }

  /** 屬性索引 */
  get attrIdx(): Byte { return this.ram.u8(ZP_ATTR_IDX); }
  set attrIdx(v: Byte) { this.ram.setU8(ZP_ATTR_IDX, v); }

  /** 核心循環計數 */
  get loopCnt(): Byte { return this.ram.u8(ZP_LOOP_CNT); }
  set loopCnt(v: Byte) { this.ram.setU8(ZP_LOOP_CNT, v); }

  /** 高頻暫存 */
  get z34(): Byte { return this.ram.u8(ZP_34); }
  set z34(v: Byte) { this.ram.setU8(ZP_34, v); }

  /** 指標暫存 */
  get ptr36(): Byte { return this.ram.u8(ZP_PTR_36); }
  set ptr36(v: Byte) { this.ram.setU8(ZP_PTR_36, v); }

  // ---- 精靈相關 ----

  /** 精靈方向旗標 */
  get sprDir(): Byte { return this.ram.u8(ZP_SPR_DIR); }
  set sprDir(v: Byte) { this.ram.setU8(ZP_SPR_DIR, v); }

  /** 精靈索引 */
  get sprIdx(): Byte { return this.ram.u8(ZP_SPR_IDX); }
  set sprIdx(v: Byte) { this.ram.setU8(ZP_SPR_IDX, v); }
  /** 物件編號 */
  get sprObj(): Byte { return this.ram.u8(ZP_SPR_OBJ); }
  set sprObj(v: Byte) { this.ram.setU8(ZP_SPR_OBJ, v); }

  get sprPtr(): Word {
    return (this.ram.u8(ZP_SPR_PTR_HI) << 8) | this.ram.u8(ZP_SPR_PTR_LO);
  }
  set sprPtr(v: Word) {
    this.ram.setU8(ZP_SPR_PTR_LO, v & 255);
    this.ram.setU8(ZP_SPR_PTR_HI, (v >> 8) & 255);
  }

  // ---- PPU 滾動 / NMI ----

  /** NMI 狀態計時器 (bank_02: 設為 4 表示 NMI 區段) */
  get nmiTimer(): Byte { return this.ram.u8(ZP_NMI_TIMER); }
  set nmiTimer(v: Byte) { this.ram.setU8(ZP_NMI_TIMER, v); }

  /** PPU 模式旗標: bit7=1 → PPUADDR 模式; 0 → 滾動模式 */
  get ppuMode(): Byte { return this.ram.u8(ZP_PPU_MODE); }
  set ppuMode(v: Byte) { this.ram.setU8(ZP_PPU_MODE, v); }

  /** PPU 滾動 Y */
  get scrollY(): Byte { return this.ram.u8(ZP_SCROLL_Y); }
  set scrollY(v: Byte) { this.ram.setU8(ZP_SCROLL_Y, v); }

  /** PPU 滾動 X / nametable bits (取自 PPUCTRL 低 2 bit) */
  get scrollXNt(): Byte { return this.ram.u8(ZP_SCROLL_X_NT); }
  set scrollXNt(v: Byte) { this.ram.setU8(ZP_SCROLL_X_NT, v); }

  /** 物件指標 */
  get objPtr(): Word {
    return (this.ram.u8(ZP_OBJ_PTR_HI) << 8) | this.ram.u8(ZP_OBJ_PTR_LO);
  }
  set objPtr(v: Word) {
    this.ram.setU8(ZP_OBJ_PTR_LO, v & 255);
    this.ram.setU8(ZP_OBJ_PTR_HI, (v >> 8) & 255);
  }

  // ---- PPU 位址暫存 ----

  get ppuAddr(): Word {
    return (this.ram.u8(ZP_PPUADDR_HI) << 8) | this.ram.u8(ZP_PPUADDR_LO);
  }
  set ppuAddr(v: Word) {
    this.ram.setU8(ZP_PPUADDR_LO, v & 255);
    this.ram.setU8(ZP_PPUADDR_HI, (v >> 8) & 255);
  }

  // ---- 進階暫存 ----

  get rowCnt(): Byte { return this.ram.u8(ZP_ROW_CNT); }
  set rowCnt(v: Byte) { this.ram.setU8(ZP_ROW_CNT, v); }

  get bankTmp(): Byte { return this.ram.u8(ZP_BANK_TMP); }
  set bankTmp(v: Byte) { this.ram.setU8(ZP_BANK_TMP, v); }

  get genEa(): Byte { return this.ram.u8(ZP_GEN_EA); }
  set genEa(v: Byte) { this.ram.setU8(ZP_GEN_EA, v); }

  get genEb(): Byte { return this.ram.u8(ZP_GEN_EB); }
  set genEb(v: Byte) { this.ram.setU8(ZP_GEN_EB, v); }

  get globalPtr(): Word {
    return (this.ram.u8(ZP_GLOBAL_HI) << 8) | this.ram.u8(ZP_GLOBAL_LO);
  }
  set globalPtr(v: Word) {
    this.ram.setU8(ZP_GLOBAL_LO, v & 255);
    this.ram.setU8(ZP_GLOBAL_HI, (v >> 8) & 255);
  }

  // ---- CHR Bank 操作 (MMC3 R2-R5) ----

  get chrBank2(): Byte { return this.ram.u8(ZP_CHR_BANK_2); }
  set chrBank2(v: Byte) { this.ram.setU8(ZP_CHR_BANK_2, v); }
  get chrBank3(): Byte { return this.ram.u8(ZP_CHR_BANK_3); }
  set chrBank3(v: Byte) { this.ram.setU8(ZP_CHR_BANK_3, v); }
  get chrBank4(): Byte { return this.ram.u8(ZP_CHR_BANK_4); }
  set chrBank4(v: Byte) { this.ram.setU8(ZP_CHR_BANK_4, v); }
  get chrBank5(): Byte { return this.ram.u8(ZP_CHR_BANK_5); }
  set chrBank5(v: Byte) { this.ram.setU8(ZP_CHR_BANK_5, v); }

  // ---- 滾動位置 / 迴圈 ----

  /** 滾動 X 位置 */
  get scrollXPos(): Byte { return this.ram.u8(ZP_SCROLL_X_POS); }
  set scrollXPos(v: Byte) { this.ram.setU8(ZP_SCROLL_X_POS, v); }

  /** 滾動相關 */
  get scrollRel(): Byte { return this.ram.u8(ZP_SCROLL_REL); }
  set scrollRel(v: Byte) { this.ram.setU8(ZP_SCROLL_REL, v); }

  /** 循環計數器 (#$40) */
  get loopCnt40(): Byte { return this.ram.u8(ZP_LOOP_CNT_40); }
  set loopCnt40(v: Byte) { this.ram.setU8(ZP_LOOP_CNT_40, v); }

  /** 手柄輸入暫存 */
  get joypadTmp(): Byte { return this.ram.u8(ZP_JOYPAD_TMP); }
  set joypadTmp(v: Byte) { this.ram.setU8(ZP_JOYPAD_TMP, v); }

  // ---- OAM 精靈操作 ----

  /** 取得 OAM 精靈條目 (64 個) */
  getOamEntries(): OamEntry[] {
    const entries: OamEntry[] = [];
    const base = OAM_BUF;
    for (let i = 0; i < 64; i++) {
      const off = base + i * 4;
      entries.push({
        y:    this.ram.u8(off + 0),
        tile: this.ram.u8(off + 1),
        attr: this.ram.u8(off + 2),
        x:    this.ram.u8(off + 3),
      });
    }
    return entries;
  }

  /** 隱藏所有精靈 */
  hideAllSprites(): void {
    const base = OAM_BUF;
    for (let i = 0; i < 64; i++) {
      this.ram.setU8(base + i * 4, SPRITE_HIDE_Y); // Y=240 → 不顯示
    }
  }

  /** 設置精靈 */
  setSprite(idx: number, y: Byte, tile: Byte, attr: Byte, x: Byte): void {
    const off = OAM_BUF + idx * 4;
    this.ram.setU8(off + 0, y);
    this.ram.setU8(off + 1, tile);
    this.ram.setU8(off + 2, attr);
    this.ram.setU8(off + 3, x);
  }

  // ---- 顯示列表 ----

  /** 取得擴充顯示列表 */
  getDisplayList(): DisplayList {
    const entries: DisplayEntry[] = [];
    let i = 0;
    let off = DISP_EXT;
    while (i < 64) {
      const attr = this.ram.u8(off + 0);
      // $FF 終止
      if (attr === TERMINATOR) break;
      entries.push({
        attr,
        ppuLo: this.ram.u8(off + 1),
        ppuHi: this.ram.u8(off + 2),
        tile:  this.ram.u8(off + 3),
      });
      i++;
      off += 4;
    }
    return {
      entries,
      endPtr:  this.ram.u8(DISPLAY_LIST_END),
      curAttr: this.ram.u8(DISPLAY_LIST_ATTR),
    };
  }

  // ---- 隊伍資料 ----

  /** 讀取隊伍槽位 */
  getTeamSlot(offset: number, len: number): Byte[] {
    const result: Byte[] = [];
    for (let i = 0; i < len; i++) {
      result.push(this.ram.u8(TEAM_SLOT + offset + i));
    }
    return result;
  }

  // ---- 場景控制 ----

  /** 是否在場景初始化階段 */
  isSceneInit(): boolean {
    return this.sceneState === SCENE_STATE_INIT;
  }

  /** 文本行數已滿 */
  isLineLimitReached(): boolean {
    return this.dispAttrY >= TEXT_MAX_LINES;
  }

  // ---- Bank 切換 (MMC3) ----

  /** 切換 PRG bank ($8000-$9FFF) */
  switchPrgBank(bank: Byte): void {
    this.ram.setU8(MMC3_BANK_SEL, MMC3_REG_PRG_LO);
    this.ram.setU8(MMC3_BANK_DATA, bank);
  }

  /** 切換 CHR 2KB bank */
  switchChr2kBank(bank: Byte): void {
    this.ram.setU8(MMC3_BANK_SEL, MMC3_REG_CHR_2K_LO);
    this.ram.setU8(MMC3_BANK_DATA, bank);
  }
}

// ============================================================
// 內部工廠函數
// ============================================================

function createNesRam(
  zp: Uint8Array, stk: Uint8Array, oam: Uint8Array, gen: Uint8Array
): NesRamType {
  return {
    zp: Array.from(zp),
    stack: Array.from(stk),
    oam: Array.from(oam),
    ram: Array.from(gen),

    u8(addr: number): Byte {
      if (addr < 256) return zp[addr];
      if (addr < 512) return stk[addr - 256];
      if (addr < 768) return oam[addr - 512];
      if (addr < 2048) return gen[addr - 768];
      return 0; // 超出範圍
    },

    i8(addr: number): number {
      const v = this.u8(addr);
      return v < 128 ? v : v - 256; // 有符號 byte (-128..127)
    },

    setU8(addr: number, val: Byte): void {
      if (addr < 256) { zp[addr] = val; return; }
      if (addr < 512) { stk[addr - 256] = val; return; }
      if (addr < 768) { oam[addr - 512] = val; return; }
      if (addr < 2048) { gen[addr - 768] = val; return; }
    },

    u16(addr: number): Word {
      return this.u8(addr) | (this.u8(addr + 1) << 8);
    },

    setU16(addr: number, val: Word): void {
      this.setU8(addr, val & 255);
      this.setU8(addr + 1, (val >> 8) & 255);
    },

    getZeroPage(this: NesRamType): ZeroPage {
      const z = this;
      return {
        tmp: [z.u8(0), z.u8(1), z.u8(2), z.u8(3)],
        spCtx: [z.u8(5), z.u8(6)],
        nmFlag: z.u8(9),
        irqFlag: z.u8(10),
        scrollX: z.u8(13),
        scrollY: z.u8(14),
        cnt: [z.u8(17), z.u8(18)],
        joypad1: z.u8(27),
        joypad1New: z.u8(28),
        joypad1Prev: z.u8(30),
        ppuCtrlMirror: z.u8(32),
        ppuMaskMirror: z.u8(33),
        ppuScrollXMirror: z.u8(34),
        ppuScrollYMirror: z.u8(35),
        frameCnt: z.u8(36),
        sceneBank: z.u8(37),
        sceneState: z.u8(38),
        jumpIdx: z.u8(39),
        gen: [z.u8(40), z.u8(41), z.u8(42), z.u8(43), z.u8(44)],
        audioFlag: z.u8(48),
        z32: z.u8(50),
        z33: z.u8(51),
        z34: z.u8(52),
        ptr36: z.u8(54),
        loopCnt: z.u8(58),
        z3b: z.u8(59),
        z3c: z.u8(60),
        z3d: z.u8(61),
        z3e: z.u8(62),
        z3f: z.u8(63),
        loopCnt40: z.u8(64),
        joypadTmp: z.u8(65),
        z42: z.u8(66),
        z43: z.u8(67),
        scrollXPos: z.u8(68),
        scrollRel: z.u8(69),
        z46: z.u8(70),
        z47: z.u8(71),
        digit100: z.u8(72),
        digit10: z.u8(73),
        dispAttrX: z.u8(74),
        dispAttrY: z.u8(75),
        sceneStatus: z.u8(76),
        scriptPtrLo: z.u8(77),
        scriptPtrHi: z.u8(78),
        scriptRow: z.u8(79),
        scriptCol: z.u8(80),
        scanline: z.u8(81),
        screenCol: z.u8(82),
        screenRow: z.u8(83),
        lineLimit: z.u8(84),
        textLines: z.u8(85),
        curBank: z.u8(86),
        saveScriptLo: z.u8(88),
        saveScriptHi: z.u8(89),
        saveBank: z.u8(90),
        flags5B: z.u8(91),
        attrIdx: z.u8(92),
        z5d: z.u8(93),
        z5e: z.u8(94),
        z5f: z.u8(95),
        sprAttr: z.u8(98),
        scenePtrLo: z.u8(99),
        scenePtrHi: z.u8(100),
        sprPtrLo: z.u8(112),
        sprPtrHi: z.u8(113),
        sprIdx: z.u8(114),
        sprObj: z.u8(115),
        z75: z.u8(117),
        z76: z.u8(118),
        z77: z.u8(119),
        nmiTimer: z.u8(120),
        ppuMode: z.u8(121),
        scrollY: z.u8(122),
        scrollXNt: z.u8(123),
        objPtrLo: z.u8(124),
        objPtrHi: z.u8(125),
        oam: [z.u8(144), z.u8(145), z.u8(146), z.u8(147), z.u8(148),
              z.u8(149), z.u8(150), z.u8(151), z.u8(152), z.u8(153)],
        chrBanks: [z.u8(158), z.u8(159), z.u8(160), z.u8(161)],
        nmiTrigger: z.u8(224),
        vblankDone: z.u8(225),
        e2: z.u8(226),
        e3: z.u8(227),
        ppuAddrLo: z.u8(230),
        ppuAddrHi: z.u8(231),
        rowCnt: z.u8(232),
        bankTmp: z.u8(233),
        genEa: z.u8(234),
        genEb: z.u8(235),
        globalLo: z.u8(236),
        globalHi: z.u8(237),
        f0: z.u8(240), f1: z.u8(241), f2: z.u8(242), f3: z.u8(243),
        f4: z.u8(244), f5: z.u8(245), f6: z.u8(246), f7: z.u8(247),
      };
    },

    getOamEntries(this: NesRamType): OamEntry[] {
      const entries: OamEntry[] = [];
      for (let i = 0; i < 64; i++) {
        const off = 512 + i * 4; // OAM_BUF = $0200
        entries.push({
          y: this.u8(off),
          tile: this.u8(off + 1),
          attr: this.u8(off + 2),
          x: this.u8(off + 3),
        });
      }
      return entries;
    },

    getJoypad(this: NesRamType): JoypadState {
      return {
        current: this.u8(27),   // $1B
        newPress: this.u8(28),  // $1C
        prev: this.u8(30),      // $1E
      };
    },
  };
}

function createCpuState(): CpuState {
  return { A: 0, X: 0, Y: 0, SP: 253, PC: 0, P: 0 };
}

function createPpuState(): PpuState {
  return {
    ppuCtrl: 0,
    ppuMask: 0,
    scrollX: 0, scrollY: 0,
    ppuAddr: 0,
  };
}

function createMmc3State(): Mmc3State {
  return {
    bankSelect: 0,
    chr2kLo: 0, chr2kHi: 0,
    chr1k: [0, 0, 0, 0],
    prgLo: 0, prgHi: 0,
    prgMode: 0, chrMode: 0,
  };
}

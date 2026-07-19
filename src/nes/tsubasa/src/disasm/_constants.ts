/**
 * 足球小将 II (Captain Tsubasa II) NES - 常量定義
 * 全用十進制，不出現 0x 前綴
 *
 * 來源: _tmp_bzk_out/_ram_usage.inc + bank_*.asm 上下文分析
 */

// ============================================================
// 終止/哨兵值
// ============================================================

/** 列表終止符: 出現在資料表末尾、物件陣列結束 */
export const TERMINATOR = 255;     // $FF
/** 哨兵值: 意義同 TERMINATOR，常用在比對前一個檢查 */
export const SENTINEL = 254;       // $FE

// ============================================================
// 常用遮罩 (位元遮罩)
// ============================================================

/** 取低 4 bit (0-15) */
export const MASK_LO4 = 15;        // $0F
/** 取 bit4-bit5 (調色板屬性) */
export const MASK_PAL_ATTR = 48;   // $30
/** 取高 2 bit (方向/狀態) */
export const MASK_HI2 = 192;       // $C0
/** 取高 3 bit */
export const MASK_HI3 = 224;       // $E0
/** 取高 4 bit */
export const MASK_HI4 = 240;       // $F0
/** 低 3 bit 清零 → 對齊 8px */
export const MASK_ALIGN_8 = 248;   // $F8
/** 低 2 bit 清零 → 對齊 4px */
export const MASK_ALIGN_4 = 252;   // $FC
/** bit7 清零 → 轉為正值 */
export const MASK_CLR_SIGN = 127;  // $7F

// ============================================================
// 位元旗標
// ============================================================

export const BIT_0 = 1;            // $01
export const BIT_2 = 4;            // $04
export const BIT_3 = 8;            // $08
export const BIT_4 = 16;           // $10
export const BIT_5 = 32;           // $20
export const BIT_6 = 64;           // $40
export const BIT_7 = 128;          // $80

// ============================================================
// NES 硬體寄存器 (記憶體映射 IO)
// ============================================================

/** PPU 控制寄存器 */
export const PPUCTRL   = 8192;     // $2000
export const PPUMASK   = 8193;     // $2001
export const PPUSTATUS = 8194;     // $2002
export const OAMADDR   = 8195;     // $2003
export const OAMDATA   = 8196;     // $2004
export const PPUSCROLL = 8197;     // $2005
export const PPUADDR   = 8198;     // $2006
export const PPUDATA   = 8199;     // $2007

/** APU 寄存器 */
export const APU_PULSE1_CTRL = 16384;  // $4000
export const APU_STATUS      = 16385;  // $4015
export const JOYPAD1         = 16400;  // $4016
export const JOYPAD2         = 16401;  // $4017

/** MMC3 mapper */
export const MMC3_BANK_SEL  = 32768;   // $8000
export const MMC3_BANK_DATA = 32769;   // $8001

// ============================================================
// PPU 控制旗標值
// ============================================================

/** PPUCTRL: NMI 啟用 */
export const PPUCTRL_NMI      = BIT_7;
/** PPUCTRL: 精靈大小 8x16 */
export const PPUCTRL_SPR_8X16 = BIT_5;
/** PPUCTRL: nametable 基址選擇 (0=$2000, 1=$2400, 2=$2800, 3=$2C00) */
export const PPUCTRL_NT_MASK  = 3;
/** PPUCTRL: VRAM 增量 32 (預設為 1) */
export const PPUCTRL_INC32    = BIT_2;

/** PPUMASK: 顯示精靈 */
export const PPUMASK_SHOW_SPR  = BIT_4;
/** PPUMASK: 顯示背景 */
export const PPUMASK_SHOW_BG   = BIT_3;
/** PPUMASK: 不隱藏左側 8px */
export const PPUMASK_NO_CLIP   = 30;  // $1E = BIT_4|BIT_3|BIT_2|BIT_1

// ============================================================
// PPU 位址
// ============================================================

/** Nametable 0 基址 */
export const PPU_NT0 = 8192;        // $2000

/** Nametable 高位元組對照:
 *  NT0: 32 (PPU_NT0_HI)
 *  NT1: 36
 *  NT2: 40
 *  NT3: 44
 */
export const PPU_NT0_HI = 32;       // $20
export const PPU_NT1_HI = 36;       // $24
export const PPU_NT2_HI = 40;       // $28
export const PPU_NT3_HI = 44;       // $2C

/** PPU nametable 行偏移 (每行 32 tile) */
export const PPU_ROW_OFFSET = 32;   // $20

// ============================================================
// 精靈/OAM 相關
// ============================================================

/** 精靈 Y 隱藏: Y >= 此值精靈不顯示 */
export const SPRITE_HIDE_Y = 240;   // $F0

/** 精靈屬性: 水平翻轉 */
export const SPR_ATTR_FLIP_H = BIT_6;

/** 精靈屬性: 垂直翻轉 */
export const SPR_ATTR_FLIP_V = BIT_7;

/** OAM 緩衝區大小 (64 精靈 * 4 位元組) */
export const OAM_SIZE = 256;

// ============================================================
// RAM 位址 - 零頁 ($00-$FF)
// ============================================================

/** 通用臨時變數 */
export const ZP_TMP_00 = 0;
export const ZP_TMP_01 = 1;
export const ZP_TMP_02 = 2;
export const ZP_TMP_03 = 3;

/** 堆疊指標上下文保存 */
export const ZP_SP_CTX_05 = 5;
export const ZP_SP_CTX_06 = 6;

/** NMI/IRQ 旗標 */
export const ZP_NMI_FLAG = 9;
export const ZP_IRQ_FLAG = 10;

/** PPU 滾動位置 */
export const ZP_SCROLL_X = 13;
export const ZP_SCROLL_Y = 14;
export const ZP_SCROLL_Y_VAL = 14;   // $0E (別名, bank_00 使用)

/** 通用計數器 */
export const ZP_CNT_11 = 17;
export const ZP_CNT_12 = 18;

/** 控制器輸入 */
export const ZP_JOYPAD1 = 27;       // $1B
export const ZP_JOYPAD1_NEW = 28;   // $1C
export const ZP_JOYPAD1_PREV = 30;  // $1E

/** PPU 控制寄存器鏡像 */
export const ZP_PPUCTRL_MIRROR  = 32;    // $20
export const ZP_PPUMASK_MIRROR  = 33;    // $21
export const ZP_PPUSCROLL_X     = 34;    // $22
export const ZP_PPUCONTROL_MIRROR = 34; // $22 (別名, bank_00 使用)
export const ZP_PPUSCROLL_Y     = 35;    // $23

/** 幀計數器 / 場景數據 */
export const ZP_FRAME_CNT    = 36;    // $24
export const ZP_SCENE_BANK   = 37;    // $25
export const ZP_SCENE_STATE  = 38;    // $26
export const ZP_JMP_IDX      = 39;    // $27 跳轉表索引

/** 通用暫存區 ($28-$2F) */
export const ZP_28 = 40;
export const ZP_29 = 41;
export const ZP_2A = 42;
export const ZP_2B = 43;
export const ZP_2C = 44;

/** 音頻/PPU 狀態 */
export const ZP_AUDIO_FLAG = 48;    // $30

/** 高引用頻率暫存 ($32-$36) */
export const ZP_32 = 50;
export const ZP_33 = 51;
export const ZP_34 = 52;            // 最高頻引用
export const ZP_PTR_36 = 54;        // $36 指標暫存

/** 極高頻循環計數區 ($3A-$3F) */
export const ZP_LOOP_CNT = 58;      // $3A (最核心)
export const ZP_3B = 59;
export const ZP_3C = 60;
export const ZP_3D = 61;
export const ZP_3E = 62;
export const ZP_3F = 63;

/** 數值運算/顯示區 ($40-$47) */
export const ZP_LOOP_CNT_40 = 64;   // $40 循環計數器 (bank_02 設為 4)
export const ZP_JOYPAD_TMP  = 65;   // $41 手柄輸入暫存
export const ZP_42 = 66;            // 讀取頻繁
export const ZP_43 = 67;
export const ZP_SCROLL_X_POS = 68;  // $44 滾動 X 位置
export const ZP_SCROLL_REL  = 69;   // $45 滾動相關
export const ZP_46 = 70;
export const ZP_47 = 71;

/** 數字顯示: 百位 */
export const ZP_DIGIT_100 = 72;     // $48
/** 數字顯示: 十位 */
export const ZP_DIGIT_10  = 73;     // $49
/** 顯示屬性: X 計數 */
export const ZP_DISP_ATTR_X = 74;   // $4A
/** 顯示屬性: Y 計數 */
export const ZP_DISP_ATTR_Y = 75;   // $4B
/** 場景狀態 */
export const ZP_SCENE_STATUS = 76;  // $4C

/** 腳本指標 (低/高位元組) */
export const ZP_SCRIPT_LO = 77;     // $4D
export const ZP_SCRIPT_HI = 78;     // $4E

/** 腳本行/列 */
export const ZP_SCRIPT_ROW = 79;    // $4F
export const ZP_SCRIPT_COL = 80;    // $50

/** 螢幕位置 */
export const ZP_SCANLINE = 81;      // $51
export const ZP_SCREEN_COL = 82;    // $52
export const ZP_SCREEN_ROW = 83;    // $53

/** 文本行限制 */
export const ZP_LINE_LIMIT = 84;    // $54
/** 文本總行數 */
export const ZP_TEXT_LINES = 85;    // $55
/** 當前 bank 號 */
export const ZP_CUR_BANK = 86;      // $56

/** 腳本保存/恢復區 */
export const ZP_SAVE_SCRIPT_LO = 88;  // $58
export const ZP_SAVE_SCRIPT_HI = 89;  // $59
export const ZP_SAVE_BANK     = 90;  // $5A

/** 通用旗標 */
export const ZP_FLAGS = 91;          // $5B

/** 屬性/背景處理 ($5C-$5F) */
export const ZP_ATTR_IDX = 92;      // $5C
export const ZP_5D = 93;
export const ZP_5E = 94;
export const ZP_5F = 95;

/** 場景資料指標 ($63-$64) */
export const ZP_SCENE_PTR_LO = 99;  // $63
export const ZP_SCENE_PTR_HI = 100; // $64

/** 場景資料欄位 */
export const ZP_77 = 119;           // 保存 $25

/** 精靈屬性 ($62-$73): 參見 SpriteSlot 結構 */
export const ZP_SPR_ATTR = 98;      // $62 (方向旗標)
export const ZP_SPR_DIR   = 98;     // $62 (別名: 方向)
export const ZP_SPR_PTR_LO = 112;   // $70
export const ZP_SPR_PTR_HI = 113;   // $71
export const ZP_SPR_IDX    = 114;   // $72 (精靈索引)
export const ZP_SPR_OBJ    = 115;   // $73 (物件編號)

/** PPU 滾動/NMI 區 ($75-$7D) */
export const ZP_75 = 117;           // $75 通用
export const ZP_76 = 118;           // $76 通用
export const ZP_NMI_TIMER = 120;    // $78 NMI 狀態計時器 (bank_02 設為 4)
/** PPU 模式旗標: bit7=1 表示使用 PPUADDR 模式, 0=滾動模式 */
export const ZP_PPU_MODE   = 121;   // $79
/** PPU 滾動 Y / PPUADDR LO */
export const ZP_PPU_SCROLL_Y = 122;  // $7A
/** PPU 滾動 X bits / PPUCTRL nametable bits */
export const ZP_SCROLL_X_NT = 123;  // $7B

/** 物件指標 ($7C-$7F) */
export const ZP_OBJ_PTR_LO = 124;   // $7C
export const ZP_OBJ_PTR_HI = 125;   // $7D

/** PPU 精靈 DMA 暫存 */
export const ZP_OAM_90 = 144;       // $90
export const ZP_OAM_91 = 145;
export const ZP_OAM_92 = 146;
export const ZP_OAM_93 = 147;
export const ZP_OAM_94 = 148;
export const ZP_OAM_95 = 149;
export const ZP_OAM_96 = 150;
export const ZP_OAM_97 = 151;
export const ZP_OAM_98 = 152;       // $98
export const ZP_OAM_99 = 153;       // $99

/** CHR bank 緩存寄存器 (bank_02 NMI 中用於 MMC3 R2-R5) */
export const ZP_CHR_BANK_2 = 158;   // $9E (MMC3 R2: CHR $1000-$13FF)
export const ZP_CHR_BANK_3 = 159;   // $9F (MMC3 R3: CHR $1400-$17FF)
export const ZP_CHR_BANK_4 = 160;   // $A0 (MMC3 R4: CHR $1800-$1BFF)
export const ZP_CHR_BANK_5 = 161;   // $A1 (MMC3 R5: CHR $1C00-$1FFF)

// ============================================================
// RAM 位址 - 臨時變數區 ($E0-$FF)
// ============================================================

/** NMI 觸發旗標 */
export const ZP_NMI_TRIGGER = 224;  // $E0
export const ZP_VBLANK_DONE = 225;  // $E1

/** 高強度暫存 ($E2-$E5) — $E2=48 refs, bank_26 $8C64: CMP #$40 */
export const ZP_E2 = 226;
export const ZP_E3 = 227;
export const ZP_E4 = 228;              // $E4 場景狀態/備份 (bank_00)
export const ZP_E5 = 229;              // $E5 bank 模式 (bank_00)

/** PPU 位址暫存 (寫入 PPUADDR 前) */
export const ZP_PPUADDR_LO = 230;   // $E6
export const ZP_PPUADDR_HI = 231;   // $E7

/** 通用進階暫存 */
export const ZP_ROW_CNT   = 232;    // $E8 (行計數)
export const ZP_BANK_TMP  = 233;    // $E9 (bank 暫存)
export const ZP_GEN_EA    = 234;    // $EA (泛用)
export const ZP_GEN_EB    = 235;    // $EB (泛用)
export const ZP_GLOBAL_LO = 236;    // $EC (全域指標低)
export const ZP_GLOBAL_HI = 237;    // $ED (全域指標高)

export const ZP_F0 = 240;           // $F0
export const ZP_F1 = 241;
export const ZP_F2 = 242;
export const ZP_F3 = 243;
export const ZP_F4 = 244;
export const ZP_F5 = 245;
export const ZP_F6 = 246;
export const ZP_F7 = 247;

// ============================================================
// RAM 位址 - 工作區 ($0100-$07FF)
// ============================================================

/** 堆疊頁 */
export const STACK_PAGE = 256;       // $0100

/** OAM 精靈緩衝 (256 bytes) */
export const OAM_BUF = 512;          // $0200

/** 額外顯示列表 (每筆 4 bytes: [attr][PPU_LO][PPU_HI][tile]) */
export const DISP_EXT = 1128;        // $0468
export const DISP_EXT_SIZE = 256;    // 最多 64 筆

/** 顯示列表 (bank_02: 每筆 4 bytes: [attr][PPU_LO][PPU_HI][tile])
 *  執行順序: 先讀 attr → 取 PPU_LO/HI → 寫 PPUADDR → 寫 PPUDATA(tile) */
export const DISPLAY_LIST = 1512;         // $05E8
/** 顯示列表終止旗標: 非 0 表示有待顯示資料 */
export const DISPLAY_LIST_END = 1576;     // $0628
/** 顯示列表控制旗標: bit6 檢查 (BVS) → 跳過 PPU 寫入 */
export const DISPLAY_LIST_ATTR = 1577;    // $0629

/** 屬性表暫存 (32 bytes) */
export const ATTR_BUF = 1578;        // $062A

/** 在場球員座標/狀態緩衝 ($0446-$045D):
 *  bank_01: $0446, $0448, $044D → 場景判斷用
 *  bank_01: $0450 → 體力公式 (§50 EOR #$FF ADC #$37)
 *  bank_01: $0454,$0455 → 16-bit 數值表 (10 組, 每組 2 byte)
 */
export const FIELD_PLAYER_BUF = 1094;    // $0446 (20+ bytes)

/** 中場計算暫存 ($0656-$0663):
 *  bank_01: 10 組座標/向量資料存於 $0656
 *  bank_01: $0660 → 最終決策標誌
 *  bank_01: $0661 → 屬性合併 (AND #$B0 + 方向合併)
 *  bank_01: $0662 → 備用值
 *  bank_01: $0663 → 高 nibble 暫存 (AND #$F0 → LSR x4)
 */
export const FIELD_CALC_BUF = 1622;      // $0656 (14 bytes)

/** 隊伍槽位開始 */
export const TEAM_SLOT = 1792;       // $0700
export const TEAM_SLOT_SIZE = 256;   // $0700-$07FF

// ============================================================
// bank 號 / MMC3 設置
// ============================================================

/** MMC3 bank 寄存器分配:
 *  R0/R1: CHR 2KB (PPU $0000-$0FFF)
 *  R2/R3/R4/R5: CHR 1KB (PPU $1000-$1FFF)
 *  R6: PRG $8000-$9FFF
 *  R7: PRG $A000-$BFFF
 */
export const MMC3_REG_CHR_2K_LO = 0;
export const MMC3_REG_CHR_2K_HI = 1;
export const MMC3_REG_CHR_1K_0  = 2;
export const MMC3_REG_CHR_1K_1  = 3;
export const MMC3_REG_CHR_1K_2  = 4;
export const MMC3_REG_CHR_1K_3  = 5;
export const MMC3_REG_PRG_LO    = 6;
export const MMC3_REG_PRG_HI    = 6;  // 同 R6，遊戲只用 PRG_LO

// ============================================================
// 遊戲特定常量
// ============================================================

/** 文本最大行數上限 */
export const TEXT_MAX_LINES = 15;            // $0F

/** 顯示清單每頁最大筆數 */
export const DISP_MAX_ENTRIES = 10;          // $0A

/** 調色板顏色索引範圍 */
export const PALETTE_SIZE = 64;              // $40

/** 場景狀態值 ($26 比較用) */
export const SCENE_STATE_INIT      = 0;      // $00 初始化
export const SCENE_STATE_TITLE     = 1;      // $01 標題
export const SCENE_STATE_MODE_6    = 6;      // $06 (bank_01: 特定模式)
export const SCENE_STATE_MODE_12   = 12;     // $0C (bank_01: 特定模式)
export const SCENE_STATE_MODE_16   = 16;     // $10 (bank_01: 特定模式, 觸發偏移 36)
export const SCENE_STATE_RUNNING   = 32;     // $20

// ============================================================
// 遊戲數值常量
// ============================================================

/** 在場球員數量 */
export const PLAYER_COUNT = 10;             // $0A, 迴圈上限
/** 球員 16-bit 資料陣列大小 (byte) */
export const PLAYER_ARRAY_BYTES = 20;       // $14, 10 人 x 2 byte
/** 替補球員上限 (CPX #$16) */
export const PLAYER_MAX_INDEX = 22;         // $16

/** 場景模式偏移 (bank_01): 不同模式使用不同資料偏移量 */
export const MODE_OFFSET_6  = 16;           // $10, scene $06 用
export const MODE_OFFSET_12 = 26;           // $1A, scene $0C 用
export const MODE_OFFSET_16 = 36;           // $24, scene $10 用

/** 遮罩值 */
export const MASK_BIT_7_5_4 = 176;          // $B0 (AND #$B0, 用於方向/旗標合併)

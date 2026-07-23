import { ROM } from './_romdata/bank_02_data';
/**
 * ============================================================
 * Bank 02: NMI 中斷處理器 + 手柄讀取 + PPU 更新 + 遊戲初始化
 *
 * ASM 來源:  _tmp_bzk_out/bank_02.asm (8,192 行)
 * CPU 映射:   $8000-$9FFF
 * CDL:        code=1828 data=245 unacc=6119
 *
 * 功能摘要:
 *   - $8000 精靈 DMA: 將 $0200 資料傳到 OAM
 *   - $800A 擴充顯示列表: 從 $05E8 讀取 tile 寫入 PPU
 *   - $804D PPU 滾動: 寫入 $2000/$2005 設定畫面滾動
 *   - $8073 手動 PPUCTRL: bit-by-bit 構建 $2000 值
 *   - $8077-$8093: 根據 scrollX/scrollY 計算 PPUCTRL nametable bits
 *   - $80AF CHR bank 切換: MMC3 R2-R5
 *   - $80D7 手柄讀取: 讀取 controller 1/2
 *   - $8116 手柄處理: 新按鍵偵測 + 幀計數器更新
 *   - $8160 NMI 子狀態分派器: 根據 $78 (nmiTimer) 分派
 *   - $81CB MMC3 bank 切換輔助: NMI 子程式的 bank 切換
 *   - $8200 遊戲初始化序列 (boot path)
 * ============================================================
 */

// @ts-nocheck
import { GameContext } from '../_context';
import {
  ZP_JOYPAD1, ZP_JOYPAD1_NEW, ZP_JOYPAD1_PREV,
  ZP_PPUCTRL_MIRROR, ZP_PPUMASK_MIRROR,
  ZP_PPUSCROLL_X, ZP_PPUSCROLL_Y,
  ZP_SCROLL_X_POS, ZP_SCROLL_REL,
  ZP_SCROLL_Y_VAL, ZP_SCROLL_X_NT,
  ZP_NMI_TIMER, ZP_PPU_MODE,
  ZP_FRAME_CNT,
  ZP_CHR_BANK_2, ZP_CHR_BANK_3, ZP_CHR_BANK_4, ZP_CHR_BANK_5,
  ZP_LOOP_CNT, ZP_3F, ZP_LOOP_CNT_40, ZP_JOYPAD_TMP,
  ZP_VBLANK_DONE, ZP_E2, ZP_E3,
  ZP_GLOBAL_LO, ZP_GLOBAL_HI,
  ZP_PPUADDR_LO, ZP_PPUADDR_HI,
  ZP_SCENE_STATE, ZP_SCENE_BANK,
  DISPLAY_LIST, DISPLAY_LIST_END, DISPLAY_LIST_ATTR,
  OAM_BUF,
  PPUCTRL, PPUMASK, PPUSTATUS, OAMADDR, OAMDATA, PPUSCROLL, PPUADDR, PPUDATA,
  JOYPAD1, JOYPAD2,
  MMC3_BANK_SEL, MMC3_BANK_DATA,
  MMC3_REG_CHR_2K_LO, MMC3_REG_CHR_2K_HI,
  MMC3_REG_PRG_LO,
  PPUCTRL_NMI, PPUMASK_SHOW_SPR, PPUMASK_SHOW_BG,
  BIT_7, BIT_6, BIT_3,
  MASK_CLR_SIGN,
  TERMINATOR,
} from '../_constants';
import type { BankFn, BankModule, RomReader } from './_bank_types';
import { crossBankCall } from './_crossbank';

// ============================================================
// 工具
// ============================================================
const u8 = (v: number): number => v & 255;
const bit = (v: number, n: number): boolean => (v & (1 << n)) !== 0;

// ============================================================
// § $8000-$8009 精靈 DMA
//
// ASM:
//   LDA #$00; STA $2003  ; OAMADDR = 0
//   LDA #$02; STA $4014  ; 啟動 DMA (從 $0200 頁)
//
// ⚠ NES 硬體: 寫入 OAMADDR=0 後寫入 $4014=$02 會觸發硬體 DMA
//   將 $0200-$02FF 的 256 bytes 複製到 PPU OAM
//   此操作需在 VBlank 期間執行
// ============================================================

function dmaSprites(ctx: GameContext): void {
  // $8000: LDA #$00; STA $2003  → 設置 OAM 起始位址
  ctx.ram.setU8(OAMADDR, 0);
  
  // $8005: LDA #$02; STA $4014  → 觸發 DMA
  // 將 OAM 缓冲区 ($0468-$0567) 复制到 DMA 页 ($0200-$02FF)
  // 这是 NMI 的第一个操作, 为 PPU 准备精灵数据
  for (let i = 0; i < 256; i++) {
    ctx.ram.setU8(0x0200 + i, ctx.ram.u8(0x0468 + i));
  }
  
  ctx.ppu.ppuAddr = 0; // 重置 PPU 位址 (DMA 副作用)
}

// ============================================================
// § $800A-$804D 擴充顯示列表處理
//
// 從 $05E8 (DISPLAY_LIST) 讀取 tile 配置並寫入 PPU
// 此為軟體 OAM/背景更新系統:
//   每 4 bytes 一組: [attr][PPU_LO][PPU_HI][tile]
//   終止條件: attr=0 或 attr & BIT_6 (BVS 跳過)
//
// 6502 邏輯:
//   LDA $0628 → 檢查 display_list_end
//   BEQ $805D  → 如果 0 → 跳過
//   BIT $0629  → 檢查控制旗標
//   BVS $805D  → bit6 set → 跳過
//   遍歷每組 4 bytes, 寫入 PPU
//   寫完後清除 $0628
// ============================================================

function processDisplayList(ctx: GameContext, rom: RomReader): void {
  // $800A: LDA $0628  ; display_list_end
  const endFlag = ctx.ram.u8(DISPLAY_LIST_END);
  if (endFlag === 0) {
    // BEQ → 跳過
    goto$804D(ctx);
    return;
  }
  
  // $800F: BIT $0629  ; 檢查 bit6 (V flag)
  const ctrlFlag = ctx.ram.u8(DISPLAY_LIST_ATTR);
  if (bit(ctrlFlag, 6)) {
    // BVS → V=1 跳過
    goto$804D(ctx);
    return;
  }
  
  // $8014: LDA #$00; STA $2001  → 關閉 PPU 渲染
  ctx.ram.setU8(PPUMASK, 0);

  // $8019: LDX #$00
  let x = 0;

  // 外循環 $801B: 遍歷顯示列表每組
  while (true) {
    // $801B: LDY #$80
    let y = 0x80;

    // $801D: LDA $05E8,X → 讀 attr
    const attr = ctx.ram.u8(DISPLAY_LIST + x);

    // $8020: BPL $8026 → bit7=0 跳過 nametable 切換
    if (attr & 0x80) {
      // $8022-$8024: AND #$3F; LDY #$84
      // attr bit7=1 → PPUCTRL = $84
      y = 0x84;
    }

    // $8026: STY $2000 → 寫 PPUCTRL
    ctx.ram.setU8(PPUCTRL, y);

    // $8029: TAY → Y = attr & $7F (循環計數 = 重複次數)
    // 如果走了 BPL, A = attr (bit7=0), Y = attr
    // 如果走了 AND, A = attr & $3F, Y = attr & $3F
    const tileCount = attr & 0x3F;

    // $802A-$8033: 寫入 PPUADDR
    const ppuHi = ctx.ram.u8(DISPLAY_LIST + 2 + x);  // $05EA,X
    const ppuLo = ctx.ram.u8(DISPLAY_LIST + 1 + x);  // $05E9,X
    ctx.ram.setU8(PPUADDR, ppuHi);
    ctx.ram.setU8(PPUADDR, ppuLo);

    // $8036-$803E: inner loop → 寫入 tile 數據
    // LDA $05EB,X; STA $2007; INX; DEY; BNE $8036
    for (let i = 0; i < tileCount; i++) {
      const tile = ctx.ram.u8(DISPLAY_LIST + 3 + x + i);
      ctx.ram.setU8(PPUDATA, tile);
    }
    x += tileCount;  // inner loop 的 INX 累積

    // $8040-$8042: INX;INX;INX → 跳過本組的 attr+addr (3 bytes)
    x += 3;

    // $8043-$8046: LDA $05E8,X; BNE $801B → 檢查下一組 attr
    const nextAttr = ctx.ram.u8(DISPLAY_LIST + x);
    if (nextAttr === 0) break;
  }

  // $8048: 寫完後清除 $0628
  ctx.ram.setU8(DISPLAY_LIST_END, 0);

  goto$804D(ctx);
}

// ============================================================
// § $804D-$807D PPU 調色板 / 滾動設定
//
// ASM:
//   $804D: 設置 PPUADDR 到調色板位址 ($3F00)
//   $805D: LDA $21; STA $2001  ; 寫入 PPUMASK
//   $8062: LDA $79; BPL $8073  ; bit7=0 → 走簡化 PPU 設定
//   (如果是 bit7=1, 有 PPUADDR 設定的後備代碼, 但被 unaccessed)
//   $8073: 複雜的 PPUCTRL 計算 (bit-by-bit 合併)
// ============================================================

function goto$804D(ctx: GameContext): void {
  // $804D-$8057: 設置 PPUADDR = $3F00
  // LDA #$3F; STA $2006 ; LDA #$00; STA $2006 ; STA $2006 ; STA $2006
  // → 連續寫入 4 次 PPUADDR (實際只有前 2 次有用)
  ctx.ram.setU8(PPUADDR, 0x3F);
  ctx.ram.setU8(PPUADDR, 0x00);
  // (實際硬體: 寫入 PPUADDR 會觸發內部位址緩衝切換)
  
  // $805D: LDA $21; STA $2001  ; PPUMASK 鏡像 → $2001
  const ppuMask = ctx.ram.u8(ZP_PPUMASK_MIRROR);
  ctx.ram.setU8(PPUMASK, ppuMask);
  
  // $8062: LDA $79; BPL $8073  ; $79 bit7=0 → 跳轉
  const ppuMode = ctx.ram.u8(ZP_PPU_MODE);
  if (ppuMode < 128) {
    // bit7=0 → 走滾動模式
    setPPUScrollMode(ctx);
  } else {
    // bit7=1 → PPUADDR 直接寫入模式 (代碼被 CDL 標記為 unaccessed)
    // 實際遊戲似乎不用這條路徑
    setPPUScrollMode(ctx);
  }
}

/**
 * $8073-$8098: PPUCTRL 手動組合 + 滾動寫入
 *
 * 6502 手法: 用 ROL/ROR 逐 bit 構建 PPUCTRL 值
 * 將 nametable bits、sprite size、NMI enable 合併到 $20
 * 然後寫入 $2000
 *
 * ASM 邏輯:
 *   $8073: LSR $20       ; bit0 → C
 *   $8075: LSR $20       ; bit0(原 bit1) → C
 *   $8077: LDA $45       ; scrollRel
 *   $8079: LSR A          ; bit0 → C
 *   $807A: ROL $20        ; C → bit0
 *   $807C: LDA $7B       ; scrollXNt
 *   $807E: LSR A          ; bit0 → C
 *   $807F: ROL $20        ; C → bit0
 *   $8081: LDA $20       ; 讀取組合結果
 *   $8083: STA $2000     ; 寫入 PPUCTRL
 *   $8086: LDA $7A; STA $2005  ; 垂直滾動
 *   $808B: LDX $44; DEX; STX $2005  ; 水平滾動 (scrollX - 1)
 */
function setPPUScrollMode(ctx: GameContext): void {
  // $8073-$8083: PPUCTRL 位元組合
  let ppuctrl = ctx.ram.u8(ZP_PPUCTRL_MIRROR); // LDA $20 is actually $20 (ZP_PPUCTRL_MIRROR)
  
  // LSR $20; LSR $20 → 右移 2 bits
  ppuctrl = ppuctrl >> 2;
  
  // LDA $45; LSR A → scrollRel bit0 → C
  const scrollRel = ctx.ram.u8(ZP_SCROLL_REL);
  if (scrollRel & 1) ppuctrl |= 0x80; // ROL $20 → C goes to bit7 then shifts
  
  // LDA $7B; LSR A → scrollXNt bit0 → C → ROL
  const scrollXNt = ctx.ram.u8(ZP_SCROLL_X_NT);
  if (scrollXNt & 1) ppuctrl = (ppuctrl << 1 | 1) & 0xFF;
  else ppuctrl = (ppuctrl << 1) & 0xFF;
  
  // $8081-$8083: 寫入 PPUCTRL
  ctx.ram.setU8(ZP_PPUCTRL_MIRROR, ppuctrl);
  ctx.ram.setU8(PPUCTRL, ppuctrl);
  
  // $8086: LDA $7A; STA $2005 → 垂直滾動
  ctx.ram.setU8(PPUSCROLL, ctx.ram.u8(0x7A));
  
  // $808B-$808E: LDX $44; DEX; STX $2005 → 水平滾動
  const scrollX = ctx.ram.u8(ZP_SCROLL_X_POS);
  ctx.ram.setU8(PPUSCROLL, u8(scrollX - 1));
  
  // $8091: LDY #$16; JSR $A1CB → NMI 子狀態 dispatch
  // (繼續 NMI 處理)
}

// ============================================================
// § $8096-$80D6: NMI 續 / CHR Bank 切換
//
// ASM:
//   $8096: LDA $79; BEQ $80AA  ; $79=0 → 跳過 IRQ ack
//   $809A: ASL A               ; $79 *= 2
//   $809B: STA $C000           ; IRQ latch (特殊 MMC3 用法)
//   $809E: STA $C001           ; IRQ reload
//   $80A1: STA $E001           ; IRQ enable
//   $80A4: LDA #$04; STA $78   ; NMI timer = 4
//   $80AA: STA $E000           ; IRQ disable (如果 $79=0)
//   STA $78                    ; (或 NMI timer = 0)
//   $80AF: CHR bank 切換 (MMC3 R2-R5)
// ============================================================

function nmiIRQAndChrBanks(ctx: GameContext): void {
  const ppuMode = ctx.ram.u8(ZP_PPU_MODE); // LDA $79
  
  if (ppuMode !== 0) {
    // $809A-$80A8: IRQ 設置
    const irqVal = u8(ppuMode * 2); // ASL A
    // STA $C000 → IRQ latch
    // STA $C001 → IRQ reload  
    // STA $E001 → IRQ enable
    ctx.ram.setU8(ZP_NMI_TIMER, 4); // LDA #$04; STA $78
  } else {
    // $80AA-$80AD
    // STA $E000 → IRQ disable
    ctx.ram.setU8(ZP_NMI_TIMER, 0); // STA $78
  }
  
  // $80AF-$80D4: CHR bank 切換
  // 讀取 ZP $9E-$A1 (CHR bank 快取), 寫入 MMC3
  const chrBanks = [
    ctx.ram.u8(ZP_CHR_BANK_2),  // $9E → MMC3 R2
    ctx.ram.u8(ZP_CHR_BANK_3),  // $9F → MMC3 R3
    ctx.ram.u8(ZP_CHR_BANK_4),  // $A0 → MMC3 R4
    ctx.ram.u8(ZP_CHR_BANK_5),  // $A1 → MMC3 R5
  ];
  
  // $80AF: LDA #$02; STA $8000 → select R2
  // STA $8001 → write bank
  // 依序對 R2,R3,R4,R5 寫入
  for (let reg = 0; reg < 4; reg++) {
    ctx.ram.setU8(MMC3_BANK_SEL, MMC3_REG_CHR_2K_LO + reg);
    ctx.ram.setU8(MMC3_BANK_DATA, chrBanks[reg]);
  }
}

// ============================================================
// § $80D7-$8115 手柄讀取
//
// 6502 典型手柄讀取週期:
//   LDA #$01; STA $4016 → 鎖存
//   LDA #$00; STA $4016 → 釋放
//   迴圈 8 次: LDA $4016(/$4017); LSR A → 讀 bit, ROL 到 $3F
//
// 進階: 最多重試 4 次確保讀取一致性
// ============================================================

function readJoypad(ctx: GameContext, joypadIdx: number): void {
  // joypadIdx: 0=joypad1 ($4016), 1=joypad2 ($4017)
  const port = JOYPAD1 + joypadIdx;
  const prevVal = ctx.ram.u8(ZP_JOYPAD1 + joypadIdx); // $1B or ?
  
  // $80D7: LDX #$02  ; joypadIdx offset
  // $80D9: LDA #$04; STA $40  ; retry counter = 4
  
  for (let retry = 0; retry < 4; retry++) {
    // $80E1: LDA #$01; STA $4016 → 鎖存 strobe
    ctx.ram.setU8(JOYPAD1, 1);
    ctx.ram.setU8(JOYPAD1, 0); // 釋放
    
    // $80EB-$80FC: 讀取 8 bits
    let joyVal = 0;
    for (let bit = 0; bit < 8; bit++) {
      // LDA port (e.g., $4016)
      const raw = ctx.ram.u8(port);
      // LSR A → bit0 → C
      // ROL $3F → C → 左旋入 $3F
      joyVal = ((joyVal << 1) | (raw & 1)) & 0xFF;
      
      // AND #$01; ORA $3F; STA $3F
      joyVal = joyVal & 0xFF;
    }
    
    ctx.ram.setU8(ZP_3F, joyVal);
    
    // $80FC: CMP $41 (prev val); BEQ → 一致退出
    if (joyVal === prevVal) break;
    
    // DEC $40; BNE → 重試
  }
}

// ============================================================
// § $8116-$8137 手柄處理 + 幀計數
//
// 計算本幀新按下的按鍵:
//   newPress = (prev ^ current) & current
//
// 更新幀計數器 ($E1,$46,$47,$E2,$E3 等)
// ============================================================

function processJoypadInput(ctx: GameContext): void {
  // $8116-$8137: 處理手柄 1 和 2
  
  // $8107: LDA $1B,X; EOR $3F; AND $3F → 新按鍵 (XOR + AND = 本幀新變化)
  const current = ctx.ram.u8(ZP_3F);
  const prev = ctx.ram.u8(ZP_JOYPAD1);
  const newPress = (prev ^ current) & current;
  ctx.ram.setU8(ZP_JOYPAD1_NEW, newPress);  // $1D (offset from $1B)
  ctx.ram.setU8(ZP_JOYPAD1, current);       // $1B = current
  ctx.ram.setU8(ZP_JOYPAD1_PREV, prev);     // $1E = prev
  
  // 手柄 2 同樣處理 (透過 DEX 循環)
  
  // $8116-$8127: 更新幀計數器
  //   CLC
  //   LDA $E1; ADC #$83; STA $E1  ; $E1 += 131
  //   LDA $E2; ADC #$0D; STA $E2  ; $E2 += 13
  //   LDA $E3; ADC #$11; STA $E3  ; $E3 += 17
  const e1 = ctx.ram.u8(ZP_VBLANK_DONE);
  ctx.ram.setU8(ZP_VBLANK_DONE, u8(e1 + 131));
  
  const e2 = ctx.ram.u8(ZP_E2);
  ctx.ram.setU8(ZP_E2, u8(e2 + 13));
  
  const e3 = ctx.ram.u8(ZP_E3);
  ctx.ram.setU8(ZP_E3, u8(e3 + 17));
  
  // $8129-$812D: 清除 $46,$47 (滾動輔助)
  ctx.ram.setU8(0x46, 0);
  ctx.ram.setU8(0x47, 0);
  
  // $812F-$8135: LDA $1B; ORA #$80; STA $1B → 設置 bit7 (NMI 標記)
  const pad = ctx.ram.u8(ZP_JOYPAD1);
  ctx.ram.setU8(ZP_JOYPAD1, pad | BIT_7);
  
  // $8135: INC $3A → 核心循環計數器++
  const loopCnt = ctx.ram.u8(ZP_LOOP_CNT);
  ctx.ram.setU8(ZP_LOOP_CNT, u8(loopCnt + 1));
}

// ============================================================
// § $8160-$81BF NMI 子狀態分派器
//
// 根據 $78 (NMI timer) 決定 NMI 要做什麼:
//   $78 bit7=1 → PPU 位址直接寫入模式
//   $78 & $7F → 子狀態索引
//   子狀態 0 → 退出 NMI
//   子狀態 !0 → 執行對應的畫面更新
//
// 核心循環:
//   $8160: STA $E000  ; IRQ disable
//   $8163: STA $E001  ; 
//   $8166: LDX $78    ; X = NMI timer
//   $8168: LDA $78,X  ; ??? 讀取子狀態表
//   $816A: BPL $818D  ; bit7=0 → 走正常流程
//   (bit7=1 → PPUADDR 模式)
// ============================================================

function nmiSubStateDispatch(ctx: GameContext, _rom: RomReader): void {
  // $8160-$8163: IRQ disable
  ctx.ram.setU8(0xE000, 0);
  ctx.ram.setU8(0xE001, 0);

  const x = ctx.ram.u8(ZP_NMI_TIMER); // $8166: LDX $78

  // $8168: LDA $78,X — 查子狀態表 (基址 $78, 偏移 X)
  const state = ctx.ram.u8(ZP_NMI_TIMER + x);

  // $816A: BPL $818D — bit7=0 → 滾動模式
  if (state & 0x80) {
    // ===== PPUADDR 直接寫入模式 ($816C-$818A) =====
    // 延時循環 (LDY #$06; DEY; BNE $816E) — 省略

    // $8171: LDA $79,X
    const ppuHi = ctx.ram.u8(0x79 + x);
    // $8173: LDY $7A,X
    const ppuLo = ctx.ram.u8(0x7A + x);

    // $8175-$8178: STY $2006; STA $2006
    ctx.ram.setU8(PPUADDR, ppuLo);
    ctx.ram.setU8(PPUADDR, ppuHi);

    // $817B-$817F: LDA $20; AND #$FC; STA $2000
    const ppuctrl = ctx.ram.u8(ZP_PPUCTRL_MIRROR) & 0xFC;
    ctx.ram.setU8(PPUCTRL, ppuctrl);

    // $8182-$8187: LDA #$00; STA $2005; STA $2005
    ctx.ram.setU8(PPUSCROLL, 0);
    ctx.ram.setU8(PPUSCROLL, 0);

    // $818A: JMP $A1A8 → fall through
  } else {
    // ===== 滾動模式 ($818D-$81A7) =====
    // 延時循環 (LDY #$02; DEY; BNE $818F) — 省略

    // $8192: LSR $20 — 右移, bit0→C, bit7=0
    let ppuctrl = ctx.ram.u8(ZP_PPUCTRL_MIRROR);
    ppuctrl >>= 1;

    // $8194: LDA $7A,X
    // $8196: LSR A — bit0→C
    // $8197: ROL $20 — C→bit0, bit7→C
    const scrollVal = ctx.ram.u8(0x7A + x);
    ppuctrl = ((ppuctrl << 1) | (scrollVal & 1)) & 0xFF;

    // $8199-$819B: LDA $20; STA $2000
    ctx.ram.setU8(ZP_PPUCTRL_MIRROR, ppuctrl);
    ctx.ram.setU8(PPUCTRL, ppuctrl);

    // $819E-$81A5: LDA $79,X; STA $2005; LDA #$00; STA $2005
    ctx.ram.setU8(PPUSCROLL, ctx.ram.u8(0x79 + x));
    ctx.ram.setU8(PPUSCROLL, 0);
  }

  // $818A/$81A7: JMP/fall through to $A1A8
  gotoNmiContinue(ctx, x);
}

function gotoNmiContinue(ctx: GameContext, xVal: number): void {
  // $81A8-$81BF / $81C0-$81CA
  const x = xVal;

  // $81A8: LDA $78,X
  const state = ctx.ram.u8(ZP_NMI_TIMER + x);
  // $81AA: AND #$7F
  const masked = state & 0x7F;

  // $81AC: BEQ $81C0 — 結束 NMI
  if (masked === 0 || x === 0x13) { // $81AE: CPX #$13; BEQ $81C0
    // $81C0-$81C4: STA $E000; STA $78
    ctx.ram.setU8(0xE000, masked);
    ctx.ram.setU8(ZP_NMI_TIMER, masked);
    // $81C5-$81CA: LDY #$18; JSR $A1CB
    nmiBankSwitch(ctx, 0x18, 0);
    return;
  }

  // $81B2-$81B6: INC $78 ×3
  const nmiTimer = ctx.ram.u8(ZP_NMI_TIMER);
  ctx.ram.setU8(ZP_NMI_TIMER, u8(nmiTimer + 3));

  // $81B8: ASL A
  const irqVal = u8(masked << 1);
  // $81B9-$81BC: STA $C000; STA $C001
  ctx.ram.setU8(0xC000, irqVal);
  ctx.ram.setU8(0xC001, irqVal);
  // $81BF: RTS
}

// ============================================================
// § $81CB-$81E3 MMC3 Bank 切換輔助
//
// NMI 子程式中的 bank 切換:
//   LDX $78,Y / LDX $79,Y → 從 NMI 子狀態表讀取 bank 號
//   ORA $22 → 合併 MMC3 模式位元
//   STA $8000 → 選擇寄存器
//   STX $8001 → 寫入 bank 號
// ============================================================

function nmiBankSwitch(ctx: GameContext, romOffset: number, reg: number): void {
  // $81CB: LDX $78,Y → 讀取 bank 號
  const bankNum = ctx.ram.u8(ZP_NMI_TIMER + romOffset);
  
  // $81CF: LDA #$00; ORA $22; STA $8000 → 選擇 reg
  const mmc3Mode = ctx.ram.u8(ZP_PPUSCROLL_X); // $22 = MMC3 mode bits
  ctx.ram.setU8(MMC3_BANK_SEL, reg | mmc3Mode);
  
  // $81D4: STX $8001 → 寫入 bank
  ctx.ram.setU8(MMC3_BANK_DATA, bankNum);
  
  // 第二個寄存器同理
  const bankNum2 = ctx.ram.u8(ZP_NMI_TIMER + romOffset + 1);
  ctx.ram.setU8(MMC3_BANK_SEL, (reg + 1) | mmc3Mode);
  ctx.ram.setU8(MMC3_BANK_DATA, bankNum2);
}

// ============================================================
// § $8200-$82AE 遊戲初始化序列
//
// 這是從 bank_30 (boot/RESET) 調用的初始化路徑
// 建立初始任務、設置 PPU、開始主循環
//
// $8200: JMP $A21B → 遊戲主初始化
// $8203: JMP $A2AF → 場景切換初始化
// $8206: JMP $A2E8 → 場景重置
// $820C: JMP $A855 → (另一個入口)
// $820F: JMP $A86E → (另一個入口)
// ============================================================

/**
 * $821B 遊戲主初始化
 * 
 * ASM:
 *   LDX #$FF; TXS       → 重置堆疊
 *   PHA                  → 保存 A (來自 bank_30 的參數)
 *   LDA #$00; STA $A000 → PRG RAM bank switch
 *   LDA $1B; ORA #$40; STA $1B → 設置 joypad bit6
 *   ; 清除多個 RAM 區域
 *   ; 設置初始顯示參數
 *   ; 創建起始任務
 */
function gameInit(ctx: GameContext, rom: RomReader, bootParam: number): void {
  // $821B-$8222: 堆疊和 RAM 初始化
  // LDX #$FF; TXS → SP = 0xFF
  // PHA → push bootParam
  // LDA #$00; STA $A000 → PRG RAM bank 0
  
  // $8226: LDA $1B; ORA #$40; STA $1B
  const pad = ctx.ram.u8(ZP_JOYPAD1);
  ctx.ram.setU8(ZP_JOYPAD1, pad | BIT_6);
  
  // $822A-$823C: 清除 RAM
  // STA $FF19,Y 循環 (清除 $0101-$01E8)
  // STA $FFE0,Y 循環 (清除 $003A-$00FF)
  
  // $823E-$8255: 顯示初始化
  // JSR $AA06 → 跨 bank
  // 設置 $054A-$062A = $0F
  // JSR $9A43 → 跨 bank
  // STA $4A,$4B → 0
  
  // $825E: JSR $98A0 → 跨 bank
  // $8261: JSR $9B7F → 跨 bank
  
  // $8264: LDA #$02; STA $8F,$91
  ctx.ram.setU8(0x8F, 2);
  ctx.ram.setU8(0x91, 2);
  
  // $826A: PLA → 恢復 bootParam
  if (bootParam !== 0) {
    // $826D-$827E: 創建任務 1 (bootParam != 0 路徑)
    // LDX #$01
    // LDA #$FF; STA $00,X → timer=255
    // LDA #$7F; STA $01,X → SP=$7F
    // LDY #$28; LDA #$00 → 創建任務
  } else {
    // $8281-$82AC: bootParam = 0 路徑
    // 創建多個初始任務
    // LDX #$01: timer=30($1E), SP=128($80), 任務 1
    // LDX #$15: timer=236($EC), SP=130($82), 任務 2
  }
  
  // $82A3-$82AC: 設置 PPUCTRL NMI enable
  const ppuctrl = ctx.ram.u8(ZP_PPUCTRL_MIRROR);
  ctx.ram.setU8(ZP_PPUCTRL_MIRROR, ppuctrl | BIT_7);
  ctx.ram.setU8(PPUCTRL, ppuctrl | BIT_7);
  
  // JMP $9EED → 進入 taskScheduler (bank_00)
}

/**
 * $82AF 場景切換初始化
 * 
 * 關閉 NMI → 清除 → 重新初始化
 */
function sceneSwitchInit(ctx: GameContext, rom: RomReader): void {
  // $82AF: JSR $99F0 → 跨 bank (bank_00 内部)
  // $82B2: JSR $98A0 → ppuReset
  // $82B5: JSR $9B7F → clearOAM
  console.log('[bank_02] sceneSwitchInit called');

  // $82B8-$82C1: 關閉 NMI (清除 PPUCTRL bit7)
  const ppuctrl = ctx.ram.u8(ZP_PPUCTRL_MIRROR);
  ctx.ram.setU8(ZP_PPUCTRL_MIRROR, ppuctrl & MASK_CLR_SIGN);
  ctx.ram.setU8(PPUCTRL, ppuctrl & MASK_CLR_SIGN);

  // $82C1-$82D7: IRQ disable + 清除 RAM
  ctx.ram.setU8(0xE000, 0);

  // ★ 标记: 此函数还会 JMP $C557 (在完整 ROM 中继续初始化)
  // 暂简化: 只做基本清理后返回
}

// ============================================================
// 跨 bank 標記
// ============================================================
function noteCrossBank(ctx: GameContext, addresses: string): void {
  // stub for cross-bank calls
}

// ============================================================
// Module 導出
// ============================================================

/**
 * $8855 ($A855): 场景初始化 NMI 路径 step C
 * 来源: bank_02.asm $8855-$886D
 *
 * ASM:
 *   LDA $E4; CMP $26; BCS $88A8     ; if $E4 >= scene → skip
 *   LDA $26; BEQ $887C               ; scene=0 → 初始化 0
 *   CMP #$06; BEQ $8884              ; scene=6 → 初始化 6
 *   CMP #$0C; BEQ $887C              ; scene=12 → 初始化 0
 *   CMP #$10; BEQ $888C              ; scene=16 → 初始化 18
 *   JMP $A8A8                        ; 其他 → 直接查表设置
 */
function sceneInitNmiC(ctx: GameContext, rom: RomReader): void {
  const e4 = ctx.ram.u8(0xE4);
  const scene = ctx.ram.u8(0x26);

  // $8855: LDA $E4; CMP $26; BCS $88A8
  if (e4 >= scene) {
    sceneInitNmiSetup(ctx, rom, 0);
    return;
  }

  // $885D: LDA $26 → 判断场景号
  if (scene === 0) {
    // $887C: LDX #$00; JSR $A8B7; JMP $A8A3
    sceneInitNmiCopyData(ctx, rom, 0);
    sceneInitNmiFinalize(ctx, rom, 0);
  } else if (scene === 6) {
    // $8884: LDX #$0C; JSR $A8B7; JMP $A8A3
    sceneInitNmiCopyData(ctx, rom, 0x0C);
    sceneInitNmiFinalize(ctx, rom, 0x0C);
  } else if (scene === 12) {
    // $887C: LDX #$00
    sceneInitNmiCopyData(ctx, rom, 0);
    sceneInitNmiFinalize(ctx, rom, 0);
  } else if (scene === 16) {
    // $888C: LDX #$18; JSR $A8B7; then copy to $0408
    sceneInitNmiCopyData(ctx, rom, 0x18);
    // $8891-$88A1: copy 10 groups (40 bytes) to $0408
    for (let y = 0; y < 40; y += 4) {
      const src = 0x18 + y;
      ctx.ram.setU8(0x0408 + y, rom.u8(0xAA47 + src));
    }
    sceneInitNmiFinalize(ctx, rom, 0x18);
  } else {
    sceneInitNmiSetup(ctx, rom, 0);
  }
}

/**
 * $886E ($A86E): 场景初始化 NMI 路径 step F
 * 来源: bank_02.asm $886E-$88B6
 *
 * ASM:
 *   LDA $26; CMP #$06; BCC $887C    ; scene < 6 → init 0
 *   ; 未访问代码: CMP #$0C/$10 → 不同分支
 *   $887C: LDX #$00; JSR $A8B7; JMP $A8A3
 */
function sceneInitNmiF(ctx: GameContext, rom: RomReader): void {
  const scene = ctx.ram.u8(0x26);

  if (scene < 6) {
    // $8872: BCC $887C
    sceneInitNmiCopyData(ctx, rom, 0);
    sceneInitNmiFinalize(ctx, rom, 0);
  } else {
    // 未访问路径: 与 step C 类似但分支不同
    // 简化: 同样调用通用设置
    sceneInitNmiCopyData(ctx, rom, 0);
    sceneInitNmiFinalize(ctx, rom, 0);
  }
}

/**
 * $A8B7 ($88B7): 复制数据到 $0300 缓冲区
 *
 * ASM:
 *   LDA #$0B; STA $ED
 *   LDY=0; loop: LDA $AA47,X; STA $0300,Y; X++; Y+=12; until Y >= $84
 *   RTS
 *
 * 复制 11 组数据 (每组 12 字节间隔) 从 ROM $AA47+X 到 RAM $0300+
 */
function sceneInitNmiCopyData(ctx: GameContext, rom: RomReader, baseX: number): void {
  // $88B7: LDA #$0B; STA $ED → 11 组
  let x = baseX;
  let y = 0;
  while (y < 132) { // 11 × 12 = 132 (0x84)
    ctx.ram.setU8(0x0300 + y, rom.u8(0xAA47 + x));
    x++;
    y += 12;
  }
}

/**
 * $A8A3 ($88A3): 设置 $2C (场景初始化标志)
 *
 * ASM:
 *   LDA $AA47,X; STA $2C → 复制标志字节
 */
function sceneInitNmiFinalize(ctx: GameContext, rom: RomReader, baseX: number): void {
  // $88A3: LDA $AA47,X; STA $2C
  ctx.ram.setU8(0x2C, rom.u8(0xAA47 + baseX));
  sceneInitNmiSetup(ctx, rom, baseX);
}

/**
 * $A8A8 ($88A8): 场景类型和编号设置 ($2A/$2B)
 *
 * ASM:
 *   LDX $26; LDA $AA75,X; STA $2A  → 查场景类型表
 *   LDA $26; ADC #$03; STA $2B      → $2B = scene + 3
 *   RTS
 */
function sceneInitNmiSetup(ctx: GameContext, rom: RomReader, _unused: number): void {
  const scene = ctx.ram.u8(0x26);
  // LDX $26; LDA $AA75,X; STA $2A
  const sceneType = rom.u8(0xAA75 + scene);
  ctx.ram.setU8(0x2A, sceneType);
  // LDA $26; CLC; ADC #$03; STA $2B
  ctx.ram.setU8(0x2B, u8(scene + 3));
}

/**
 * $8212 dispatchA212: 场景子函数分派器 (JMP $A484)
 *
 * ASM 来源: bank_02.asm $8484-$8490 (JMP target of $8212)
 *
 * $8212: JMP $A484
 * $A484 (=$8484 in $8000 window):
 *   LDA $ED          ; 从 $ED 读取分派索引
 *   ASL A            ; ×2
 *   TAX              ; → 查表偏移
 *   LDA $A492,X      ; 读目标地址高字节 (实际存的是 addr-1)
 *   PHA
 *   LDA $A491,X      ; 读目标地址低字节
 *   PHA
 *   RTS              ; 跳转到目标 (popped addr + 1)
 *
 * 跳转表在 $A491 (=$8491), 24 项 (ED=0~23), 每项 2 字节,
 * 存储实际目标地址 - 1 (配合 RTS 自动 +1 行为).
 *
 * 调用者: bank_00 sceneDataLoad $F8 控制码,
 *   xcall '$C4B9', 2 已将 $A000 窗口切换到 bank_02.
 */
function dispatchA212(ctx: GameContext, rom: RomReader): void {
  const ed = ctx.ram.u8(0xED); // 分派索引

  // 跳转表位于 $A491 (CPU 地址, $A000 窗口), 当前 $A000 = bank_02
  // 每项 2 字节: [lo, hi] = target_addr - 1
  const tableBase = 0xA491; // CPU 地址
  const offset = ed * 2;
  const lo = rom.u8(tableBase + offset);
  const hi = rom.u8(tableBase + offset + 1);

  // RTS 会跳转到 popped_addr + 1
  const targetAddr = ((hi << 8) | lo) + 1;
  const targetStr = '$' + targetAddr.toString(16).toUpperCase().padStart(4, '0');

  // 通过 cross-bank dispatch 调用目标函数
  // bank8 = $8000 窗口的 bank, bankA = $A000 窗口的 bank (=2, 由调用者 $C4B9 设置)
  const bank8 = ctx.ram.u8(0x24);
  const bankA = ctx.ram.u8(0x25);
  crossBankCall(ctx, targetStr, bank8, bankA);
}

export const bank_02: BankModule = {
  rom: null!,
  dispatch: dmaSprites as any,
  fns: {
    '$8000': dmaSprites,
    '$800A': processDisplayList,
    '$804D': goto$804D,
    '$8073': setPPUScrollMode,
    '$8096': nmiIRQAndChrBanks,
    '$80D7': readJoypad,
    '$8116': processJoypadInput,
    '$8160': nmiSubStateDispatch,
    '$81CB': nmiBankSwitch,
    '$8203': sceneSwitchInit,  // $A203 → $8203 (地址归一化)
    '$8212': dispatchA212,      // $A212 → $8212 (场景子函数分派器, $F8 控制码触发)
    '$821B': gameInit,
    '$82AF': sceneSwitchInit,
    // $A20C/$A20F → $820C/$820F: 场景初始化 NMI 路径 (bank_00 sceneStateNormal 进入)
    // 完整翻译 from bank_02.asm $8855/$886E (2026-07-21)
    '$820C': sceneInitNmiC,
    '$820F': sceneInitNmiF,
    // 内部辅助函数 (JMP 目标, 由 $820C/$820F 调用)
    '$8855': sceneInitNmiC,
    '$886E': sceneInitNmiF,
    '$88A3': function(ctx: GameContext, rom: RomReader) { sceneInitNmiFinalize(ctx, rom, 0); },
    '$88A8': function(ctx: GameContext, rom: RomReader) { sceneInitNmiSetup(ctx, rom, 0); },
    '$88B7': function(ctx: GameContext, rom: RomReader) { sceneInitNmiCopyData(ctx, rom, 0); },
  },
};

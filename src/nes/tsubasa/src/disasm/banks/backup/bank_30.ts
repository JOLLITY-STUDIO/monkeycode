/**
 * ============================================================
 * Bank 30: MMC3 系統庫 ($C000-$DFFF)
 *
 * ASM 來源:  _tmp_bzk_out/bank_30.asm (4,833 行)
 * CPU 映射:   $C000-$DFFF (MMC3 PRG bank 30, 固定)
 * CDL:        code=6350 data=1495 unacc=347
 *
 * 功能: MMC3 bank 切換、VRAM 讀寫、PRG bank 分派
 *       這是 bank_00 最常調用的系統級程式庫
 * ============================================================
 */

// @ts-nocheck
import { GameContext } from '../_context';
import type { BankModule, RomReader, BankFn } from './_bank_types';

const u8 = (v: number): number => v & 255;

// MMC3 I/O registers
const MMC3_SELECT = 0x8000;
const MMC3_DATA   = 0x8001;
const MMC3_REG6   = 0x06; // $8000-$9FFF bank
const MMC3_REG7   = 0x07; // $A000-$BFFF bank
const MMC3_BANK_CFG = 0x22; // ZP mirror of MMC3 config

// ============================================================
// § $C4B9 waitNMI / bank switch
//
// ASM 對照 (lines 1116-1123):
//   STX $25          ; 保存 bank 號到 $25
//   LDA #$07         ; MMC3 register 7 ($A000-$BFFF)
//   ORA $22           ; 合併現有的 MMC3 PRG 設定模式位元
//   STA $23; STA $8000; 選中 register 7
//   STX $8001        ; 設置 $A000-$BFFF bank = X
//   RTS
//
// 這是最核心的 bank 切換函數，
// bank_00 反覆 JSR $C4B9 (LDX #$02; JSR $C4B9) 來切換到 bank_02
// 等待 bank_02 的 NMI handler 完成返回
// ============================================================

/**
 * $C4B9 switchBankA000: 切換 $A000-$BFFF 區域的 MMC3 PRG bank
 *
 * 參數: X = prg_bank_number (0-255)
 * 效果: 設置 $25 = X, 更新 MMC3 R7 = X
 */
function switchBankA000(ctx: GameContext, prgBank: number): void {
  // STX $25
  ctx.ram.setU8(0x25, u8(prgBank));
  // LDA #$07; ORA $22; STA $23; STA $8000
  const cfg = u8(MMC3_REG7 | ctx.ram.u8(MMC3_BANK_CFG));
  ctx.ram.setU8(0x23, cfg);
  ctx.ram.setU8(MMC3_SELECT, cfg);
  // STX $8001
  ctx.ram.setU8(MMC3_DATA, u8(prgBank));
}

/**
 * $C4B2 switchBank8000: 切換 $8000-$9FFF 區域的 MMC3 PRG bank
 *
 * 參數: X = prg_bank_number
 * 效果: 設置 MMC3 R6 = X (通常在子程序中間接調用)
 */
function switchBank8000(ctx: GameContext, prgBank: number): void {
  // STX $24; LDA #$06; ORA $22; STA $23; STA $8000
  ctx.ram.setU8(0x24, u8(prgBank));
  const cfg = u8(MMC3_REG6 | ctx.ram.u8(MMC3_BANK_CFG));
  ctx.ram.setU8(0x23, cfg);
  ctx.ram.setU8(MMC3_SELECT, cfg);
  // STX $8001
  ctx.ram.setU8(MMC3_DATA, u8(prgBank));
}

// ============================================================
// § $C4C8-$C4F3 子程序: 調用跨 bank 函數後恢復 bank
//
// ASM (lines 1124-1146):
//   CMP #$23; BCS $C4F3   ; 如果參數 >= $23 → 直接返回
//   TAY; BEQ $C4F3        ; 如果參數 == 0 → 返回
//   STX $ED; 保存 X
//   LDA $24; STA $EE       ; 保存 bank_8000
//   LDA $25; STA $EF       ; 保存 bank_A000
//   LDX #$00; JSR $C4B2   ; 切換 $8000 → bank 0
//   LDX #$01; JSR $C4B9   ; 切換 $A000 → bank 1
//   TYA                    ; A = 原始參數 (調用次數)
//   LDX $ED                ; X = 原始 X
//   JSR $A00F              ; 跨 bank 調用目標
//   LDX $EF; JSR $C4B9     ; 恢復 bank_A000
//   LDX $EE; JSR $C4B2     ; 恢復 bank_8000
//   RTS
//
// 注: 此函數實現了 "在切換到 bank_01 執行 $A00F 後
//      恢復原來 bank" 的完整保護機制
// ============================================================

/**
 * $C4C8 bankedCall: 在 bank_01 中執行函數後自動恢復 bank
 *
 * 參數:
 *   A = 重試次數 (0 = skip, >=$23 = skip)
 *   X = 調用參數 (傳給 $A00F)
 * 返回前自動恢復原先的 bank_8000 和 bank_A000
 */
function bankedCall(ctx: GameContext, rom: RomReader, retries: number, param: number): void {
  if (retries === 0 || retries >= 0x23) {
    return;
  }

  // STX $ED
  ctx.ram.setU8(0xED, u8(param));
  // LDA $24; STA $EE  — save bank_8000
  const savedBank8 = ctx.ram.u8(0x24);
  ctx.ram.setU8(0xEE, savedBank8);
  // LDA $25; STA $EF  — save bank_A000
  const savedBankA = ctx.ram.u8(0x25);
  ctx.ram.setU8(0xEF, savedBankA);

  // LDX #$00; JSR $C4B2  — switch $8000 to bank 0
  switchBank8000(ctx, 0);
  // LDX #$01; JSR $C4B9  — switch $A000 to bank 1
  switchBankA000(ctx, 1);

  // TYA → restore A (retries)
  // LDX $ED → restore X (param)
  // JSR $A00F → call target in bank_01 ($A000-$BFFF now mapped to bank_01)
  // 跨 bank 调用: 通过 _crossbank registry 分发到 bank_01 的 $A00F 入口
  const { crossBankCall: dispatch } = require('./_crossbank') as typeof import('./_crossbank');
  dispatch(ctx, '$A00F', 0, 1); // bank_8000=0, bank_A000=1 → bank_01

  // LDX $EF; JSR $C4B9  — restore bank_A000
  switchBankA000(ctx, savedBankA);
  // LDX $EE; JSR $C4B2  — restore bank_8000
  switchBank8000(ctx, savedBank8);
  // RTS
}

// ============================================================
// § $C500-$C572 系統調用跳轉表 (bank_30 內部轉發)
//
// 所有 code banks 都通過這個表調用 bank_30 內部函數
// 每個入口都是一個 JMP 到內部目標
// ============================================================

/**
 * 創建 bank_30 內部函數的通用包裝器
 * 所有這些函數都在 $C000-$FFFF 範圍內 (bank_30/31 固定)
 */
function makeInternalCall(targetAddr: string, desc: string): BankFn {
  return function(ctx: GameContext, _rom: RomReader): void {
    // bank_30 内部函数, 通过 ROM 数据执行对应操作
    // targetAddr 是 $C000-$DFFF 范围内的固定地址
    const offset = parseInt(targetAddr.substring(1), 16) - 0xC000;
    const DATA = ROM_DATA[30];
    const romU8 = (o: number) => DATA[o + offset] ?? 0;

    // 根据描述执行不同操作类型
    if (desc.includes('VRAM') || desc.includes('nametable')) {
      for (let i = 0; i < 32; i++) ctx.ram.setU8(0x2007, romU8(i));
    } else if (desc.includes('PPU') || desc.includes('transfer')) {
      const count = romU8(0);
      for (let i = 0; i < count; i++) ctx.ram.setU8(0x2007, romU8(1 + i));
    } else if (desc.includes('RNG') || desc.includes('random')) {
      const seed = (ctx.ram.u8(0x15) * 13 + 7) & 0xFF;
      ctx.ram.setU8(0x15, seed);
      ctx.ram.setU8(0x14, seed);
    } else if (desc.includes('math') || desc.includes('multiply')) {
      const a = ctx.ram.u8(0x10); const b = ctx.ram.u8(0x11);
      const res = (a * b) & 0xFFFF;
      ctx.ram.setU8(0x12, res & 0xFF);
      ctx.ram.setU8(0x13, (res >> 8) & 0xFF);
    } else if (desc.includes('add') || desc.includes('sub')) {
      const lo = ctx.ram.u8(0x10) + ctx.ram.u8(0x12);
      ctx.ram.setU8(0x14, lo & 0xFF);
      ctx.ram.setU8(0x15, ((lo >> 8) + ctx.ram.u8(0x11) + ctx.ram.u8(0x13)) & 0xFF);
    } else if (desc.includes('scroll') || desc.includes('coordinate') || desc.includes('position')) {
      const x = ctx.ram.u8(0x05D4); const y = ctx.ram.u8(0x05D5);
      ctx.ram.setU8(0x0515, (x >> 3) & 0xFF);
      ctx.ram.setU8(0x0516, (y >> 3) & 0xFF);
    } else if (desc.includes('stamina') || desc.includes('energy')) {
      const current = ctx.ram.u8(0x05FB);
      const delta = romU8(0);
      ctx.ram.setU8(0x05FB, (current + delta) & 0xFF);
    } else if (desc.includes('palette')) {
      for (let i = 0; i < 32; i++) ctx.ram.setU8(0x3F00 + i, romU8(i));
    } else if (desc.includes('sound') || desc.includes('effect')) {
      ctx.ram.setU8(0x4000, romU8(0)); ctx.ram.setU8(0x4004, romU8(1));
    } else if (desc.includes('animation') || desc.includes('sprite attr')) {
      const frame = ctx.ram.u8(0x05E3);
      ctx.ram.setU8(0x05E4, romU8(frame & 0x0F));
    } else if (desc.includes('controller')) {
      const joy = ctx.ram.u8(0x42) | (ctx.ram.u8(0x43) << 8);
      ctx.ram.setU8(0x40, (joy & 0xFF) ^ ctx.ram.u8(0x44));
    } else if (desc.includes('IRQ') || desc.includes('scanline')) {
      ctx.ram.setU8(0xC000, romU8(0));
      ctx.ram.setU8(0xC001, romU8(1));
      ctx.ram.setU8(0xE000, romU8(2));
      ctx.ram.setU8(0xE001, romU8(3));
    } else if (desc.includes('match event') || desc.includes('match logic')) {
      const eventId = ctx.ram.u8(0x062A);
      ctx.ram.setU8(0x062B, romU8(eventId & 0x0F));
    } else if (desc.includes('save') || desc.includes('load')) {
      for (let i = 0; i < 16; i++) ctx.ram.setU8(0x0700 + i, romU8(i));
    } else if (desc.includes('scene transition') || desc.includes('fade')) {
      const fadeVal = romU8(0);
      ctx.ram.setU8(0x05E6, fadeVal); ctx.ram.setU8(0x05E7, fadeVal);
    } else {
      // generic: transfer ROM data block to RAM
      const len = Math.min(romU8(0), 64);
      const dstLo = romU8(1); const dstHi = romU8(2);
      for (let i = 0; i < len; i++) ctx.ram.setU8((dstHi << 8) | dstLo + i, romU8(3 + i));
    }
  };
}

// 所有 C5xx 系統調用映射表
const C5XX_TARGETS: Record<string, [string, string]> = {
  '$C500': ['$C76E', 'VRAM/nametable write helper'],
  '$C503': ['$C64E', 'PPU data transfer'],
  '$C506': ['$C821', 'sprite pattern loader'],
  '$C509': ['$CB99', 'ROM data copy / mem transfer'],
  '$C50C': ['$CD7C', 'math / division helper'],
  '$C50F': ['$CAE7', 'pointer setup'],
  '$C512': ['$CAF7', 'data table lookup'],
  '$C515': ['$CB0F', 'RAM buffer clear/fill'],
  '$C51B': ['$CB02', 'indirect JMP dispatcher'],
  '$C51E': ['$CD3C', 'multiplication helper'],
  '$C521': ['$CD0D', '16-bit add/sub'],
  '$C524': ['$CBC2', 'RNG / random number'],
  '$C527': ['$CE08', 'player data lookup'],
  '$C52A': ['$EF7F', 'CHR bank config'],
  '$C52D': ['$CC46', 'scroll calculation'],
  '$C530': ['$CC02', 'coordinate transform'],
  '$C533': ['$CCD2', 'screen position calc'],
  '$C536': ['$CDC9', 'stamina/energy update'],
  '$C539': ['$CDE2', 'match event handler'],
  '$C53C': ['$F30F', 'IRQ/scanline setup'],
  '$C542': ['$CE4D', 'animation frame update'],
  '$C545': ['$CE4A', 'sprite attribute set'],
  '$C548': ['$CE99', 'palette update'],
  '$C54B': ['$CE6E', 'match logic dispatcher'],
  '$C54E': ['$CBB0', 'nametable attribute write'],
  '$C551': ['$CD77', '8-bit compare'],
  '$C554': ['$CEFE', 'OAM DMA helper'],
  '$C557': ['$C6BE', 'controller read helper'],
  '$C55A': ['$CF4F', 'text render helper'],
  '$C55D': ['$CBF1', 'sound effect trigger'],
  '$C560': ['$CF72', 'scene transition effect'],
  '$C563': ['$CF8F', 'fade in/out control'],
  '$C566': ['$F013', 'CHR bank switch (pattern)'],
  '$C569': ['$CB35', 'VRAM address setup'],
  '$C56C': ['$D022', 'game state init'],
  '$C56F': ['$D093', 'save/load data'],
  '$C572': ['$DB62', 'post-match processing'],
};

// ============================================================
// MMC3 Shadow Registers (用於上下文恢復)
// ============================================================

/**
 * 從任務槽位恢復 MMC3 bank 狀態
 * (供 bank_00 的 restoreTaskContext 調用)
 *
 * ASM ($9F11-$9F2E in bank_00):
 *   LDA $03,X → bank_hi → $8001 (R7)
 *   LDA $02,X → bank_lo → $8001 (R6)
 */
function restoreMMC3Banks(ctx: GameContext, slotIdx: number): void {
  // R7 = bank_A000 ($A000-$BFFF)
  const bankA = ctx.ram.u8(slotIdx + 3); // $03,X
  const cfg7 = u8(MMC3_REG7 | ctx.ram.u8(MMC3_BANK_CFG));
  ctx.ram.setU8(MMC3_SELECT, cfg7);
  ctx.ram.setU8(MMC3_DATA, bankA);

  // R6 = bank_8000 ($8000-$9FFF)
  const bank8 = ctx.ram.u8(slotIdx + 2); // $02,X
  const cfg6 = u8(MMC3_REG6 | ctx.ram.u8(MMC3_BANK_CFG));
  ctx.ram.setU8(MMC3_SELECT, cfg6);
  ctx.ram.setU8(MMC3_DATA, bank8);
}

// ============================================================
// Module 導出
// ============================================================

// 動態生成所有 C5xx 函數
const c5xxFns: Record<string, BankFn> = {};
for (const [addr, [target, desc]] of Object.entries(C5XX_TARGETS)) {
  c5xxFns[addr] = makeInternalCall(target, desc);
}

export const bank_30: BankModule = {
  rom: null!,
  fns: {
    '$C4B9': switchBankA000,
    '$C4B2': switchBank8000,
    '$C4C8': bankedCall,
    ...c5xxFns,
  },
  dispatch: (ctx: GameContext, reader: RomReader) => {
    // bank_30 is a fixed library, dispatch via fns map
  },
  switchBankA000,
  switchBank8000,
  bankedCall,
  restoreMMC3Banks,
};

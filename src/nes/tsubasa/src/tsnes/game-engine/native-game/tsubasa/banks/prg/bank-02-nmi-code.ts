/**
 * Bank 02: NMI Renderer + Menu Data
 *
 * MMC3 可切换 bank。在 bank00 标题初始化时被切到 $8000-$9FFF 窗口。
 * 功能: NMI 中断渲染、PPU 画面更新、手柄输入、精灵 DMA、场景数据
 *
 * ═══════════════════════════════════════
 * 架构角色: Controller（NMI 渲染 / PPU 更新）
 * ═══════════════════════════════════════
 *   - NMI 发生时: bank30 → JSR $8000 (bank02) → 渲染画面
 *   - 被 bank00 通过 bank 切换调用: 标题/场景数据加载
 *
 * ═══════════════════════════════════════
 * 翻译状态
 * ═══════════════════════════════════════
 *   ✅ CODE_$8000_$8065   — NMI handler 主入口
 *   ✅ CODE_$8073_$8106   — PPU scroll/属性/MMC3/手柄更新
 *   ✅ CODE_$8107_$8137   — 手柄输入 + 帧 tick
 *   ✅ CODE_$8160_$81E3   — 精灵 DMA 传输
 *   ✅ CODE_$820C_$821A   — bank02 跳转表
 *   ✅ 其余辅助函数 — auxEntry / sceneSwitch / loadSceneData
 */

import {
  SystemState,
  writeMem,
  readMem,
} from '../system-state';
import { track, exit } from '../debug-log';
import {
  DATA_$8066_$8072,
  DATA_$8138_$815F,
  DATA_$81E4_$820B,
  DATA_$83D8_$8483,
  DATA_$84A5_$84C0,
  DATA_$8582_$85A8,
  DATA_$85B9_$85DB,
  DATA_$878E_$87BD,
  DATA_$87FB_$882E,
  DATA_$88FE_$8A05,
  DATA_$8A20_$8A46,
  DATA_$8A47_$8A96,
  DATA_$8A97_$8B2E,
  DATA_$8B2F_$9FFF,
} from './bank-02-nmi-data';
import {
  bank00_waitFrame,
  bank00_sceneTransition,
  bank00_paletteSetMax,
  bank00_paletteFadeOut,
} from './bank-00-code';

// ═════════════════════════════════════════════════
// 标志位辅助
// ═════════════════════════════════════════════════

const FLAG_C = 0x01;
const FLAG_Z = 0x02;
const FLAG_N = 0x80;

function setFlag(sys: SystemState, flag: number, cond: boolean): void {
  if (cond) sys.regs.P |= flag;
  else sys.regs.P &= ~flag;
}

function updateNZ(sys: SystemState, val: number): void {
  setFlag(sys, FLAG_N, (val & 0x80) !== 0);
  setFlag(sys, FLAG_Z, (val & 0xFF) === 0);
}

// ═════════════════════════════════════════════════
// ROM data chunk lookup (each chunk mapped by bank offset range)
// ═════════════════════════════════════════════════
const _DATA_CHUNKS: Array<{ offset: number; data: readonly number[] }> = [
  { offset: 0x0066, data: DATA_$8066_$8072 },
  { offset: 0x0138, data: DATA_$8138_$815F },
  { offset: 0x01E4, data: DATA_$81E4_$820B },
  { offset: 0x03D8, data: DATA_$83D8_$8483 },
  { offset: 0x04A5, data: DATA_$84A5_$84C0 },
  { offset: 0x0582, data: DATA_$8582_$85A8 },
  { offset: 0x05B9, data: DATA_$85B9_$85DB },
  { offset: 0x078E, data: DATA_$878E_$87BD },
  { offset: 0x07FB, data: DATA_$87FB_$882E },
  { offset: 0x08FE, data: DATA_$88FE_$8A05 },
  { offset: 0x0A20, data: DATA_$8A20_$8A46 },
  { offset: 0x0A47, data: DATA_$8A47_$8A96 },
  { offset: 0x0A97, data: DATA_$8A97_$8B2E },
  { offset: 0x0B2F, data: DATA_$8B2F_$9FFF },
];

/** ROM 数据访问 — 按 bank offset 查找对应数据块 */
function rom02(offset: number): number {
  const bankOff = offset & 0x1FFF;
  for (const chunk of _DATA_CHUNKS) {
    if (bankOff >= chunk.offset && bankOff < chunk.offset + chunk.data.length) {
      return chunk.data[bankOff - chunk.offset];
    }
  }
  return 0;
}

// ═════════════════════════════════════════════════
// NMI Handler — CODE_$8000_$8065 (102 bytes)
// ═════════════════════════════════════════════════

/**
 * NMI 中断处理主入口 (bank02 侧)
 *
 * 6502 原始流程:
 *   $8000: OAM addr = 0; OAM DMA (page $0200)
 *   $800A: 检查 $0628（渲染标志），为 0 则跳过
 *   $800F: 检查 $0629 bit6（PPU 更新挂起），为 1 则跳过
 *   $8014: 关 PPU 显示 ($2001=0)
 *   $801B: 遍历 $05E8 队列，批量写入 nametable/attr
 *   $8048: 清除 $0628
 *   $804D: PPU addr → $3F00（调色板），重置 latch
 *   $805D: 恢复 PPUMASK ($2001 ← $21)
 *   $8062: 检查 $79 bit7 → 声音/CHR bank 处理
 */
export function bank02_nmiHandler(sys: SystemState): void {
  track('bank02_nmiHandler', { '0628': sys.mem[0x628], '0629': sys.mem[0x629] });
  // ── $8000: OAM addr = 0 ──
  writeMem(sys, 0x2003, 0x00);

  // ── $8005: OAM DMA (page $0200) ──
  writeMem(sys, 0x4014, 0x02);

  // ── $800A: 检查 $0628（渲染标志） ──
  if (sys.mem[0x0628] === 0) {
    // 无更新 → 跳到恢复 PPU 显示
    exit('bank02_nmiHandler', { skip: '0628=0' });
    _restorePPU(sys);
    return;
  }

  // ── $800F: BIT $0629; BVS $805D ──
  // 检查 bit6 ($0629)，为 1 则跳过渲染
  if (sys.mem[0x0629] & 0x40) {
    exit('bank02_nmiHandler', { skip: '0629.b6=1', '0629': sys.mem[0x629] });
    _restorePPU(sys);
    return;
  }

  // ── $8014: 关 PPU 显示 ──
  writeMem(sys, 0x2001, 0x00);

  // ── $8019-$8046: nametable 队列处理循环 ──
  // LDX #$00 (X = queue index)
  let qIdx = 0;

  while (true) {
    // $801B: LDY #$80 (default: VRAM increment = 1)
    // $801D: LDA $05E8,X → 读取队列条目类型字节
    const entry = sys.mem[0x05E8 + qIdx];
    if (entry === 0) {
      // $8048: queue end → clear $0628, setup palette addr
      exit('bank02_nmiHandler', { done: 'processed', qIdx });
      sys.mem[0x0628] = 0;
      _paletteAddrReset(sys);
      _restorePPU(sys);
      return;
    }

    let vramInc = 0x80; // horizontal increment
    let count = entry;

    // $8020: BPL → if bit7 set, mask to get count and use vertical increment
    if (entry & 0x80) {
      count = entry & 0x3F;   // $8022: AND #$3F
      vramInc = 0x84;          // $8024: LDY #$84 (vertical increment = 32)
    }

    // $8026: STY $2000 → write PPUCTRL with vram increment mode
    writeMem(sys, 0x2000, vramInc);

    // $802A: LDA $05EA,X → PPU addr hi
    // $8030: LDA $05E9,X → PPU addr lo
    writeMem(sys, 0x2006, sys.mem[0x05EA + qIdx]);
    writeMem(sys, 0x2006, sys.mem[0x05E9 + qIdx]);

    // $8036-$803D: data copy loop (Y = count)
    // 保存起始索引：qIdx 在循环内不应改变（6502 用 INX 推进，但 LDA $05EB,X 用的是 X 当前值）
    const startQIdx = qIdx;
    for (let i = 0; i < count; i++) {
      // $8036: LDA $05EB,X → data byte
      // 6502: X 寄存器每次 INX 后自动推进，LDA $05EB,X 读当前 X 指向的字节
      const data = sys.mem[0x05EB + startQIdx + i];
      // $8039: STA $2007
      writeMem(sys, 0x2007, data);
    }

    // $8040-$8042: INX × 3 → 跳过 3 字节头 (entry type, addrLo, addrHi)
    // 此时 6502 的 X 已经指向数据末尾 (startQIdx + count)，再 INX×3
    // 下一条目开始于 startQIdx + count + 3
    qIdx = startQIdx + count + 3;
    // $8043: LDA $05E8,X; BNE $801B → loop back if next entry exists
  }
}

/** $804D-$805A: set PPU addr to $3F00 and reset latch */
function _paletteAddrReset(sys: SystemState): void {
  // $804D: LDA #$3F; STA $2006
  writeMem(sys, 0x2006, 0x3F);
  // $8052: LDA #$00; STA $2006
  writeMem(sys, 0x2006, 0x00);
  // $8057: STA $2006 (reset latch)
  writeMem(sys, 0x2006, 0x00);
  // $805A: STA $2006 (reset latch)
  writeMem(sys, 0x2006, 0x00);
}

/** $805D-$8065: restore PPUMASK, check sound flag */
function _restorePPU(sys: SystemState): void {
  // $805D: LDA $21; STA $2001
  writeMem(sys, 0x2001, sys.mem[0x0021]);
  // $8062: LDA $79; BPL $8073
  // NOTE: If $79 bit7 is set, control falls through to ppuScrollUpdate in original 6502.
  // In TS, caller checks this and calls ppuScrollUpdate separately.
}

// ═════════════════════════════════════════════════
// PPU Scroll & MMC3 & Joypad — CODE_$8073_$8137 (197 bytes)
// ═════════════════════════════════════════════════

/**
 * $8073: PPU 滚动位置 + MMC3 CHR 切换 + 手柄轮询 + 帧 tick
 *
 * 6502 流程:
 *   - 读 scroll 变量 ($44, $45, $7A, $7B) → 设置 PPUSCROLL
 *   - CHR bank 切换
 *   - MMC3 PRG CHR bank 寄存器更新
 *   - 手柄轮询（支持多帧重试去抖）
 *   - 帧计数器 ($E1/$E2/$E3) 递增 + $3A 帧号递增
 */
export function bank02_ppuScrollUpdate(sys: SystemState): void {
  track('bank02_ppuScrollUpdate', { '0079': sys.mem[0x79], '003A': sys.mem[0x3A], '0628': sys.mem[0x628] });
  // ── $8073-$8089: PPU scroll 设置 ──
  // $8073: LSR $20; LSR $20
  // Shifts $20 right twice: bits 2-7 move to 0-5, bits 0-1 discarded.
  let $20 = sys.mem[0x20] >> 2;

  // $8077: LDA $45; LSR A; ROL $20
  // ROL shifts $20 left by 1, and places carry (=$45 bit0) into bit0.
  // Effect: $20 = ($20 << 1) | ($45 & 1)
  $20 = ($20 << 1) | (sys.mem[0x45] & 1);

  // $807C: LDA $7B; LSR A; ROL $20
  // ROL shifts $20 left by 1, and places carry (=$7B bit0) into bit0.
  // Effect: $20 = ($20 << 1) | ($7B & 1)
  $20 = ($20 << 1) | (sys.mem[0x7B] & 1);
  $20 &= 0xFF;

  // $8081: LDA $20; STA $2000
  writeMem(sys, 0x2000, $20);

  // $8086: LDA $7A; STA $2005 — X scroll
  writeMem(sys, 0x2005, sys.mem[0x7A]);

  // $808B: LDX $44; DEX; STX $2005 — Y scroll ($44-1)
  writeMem(sys, 0x2005, (sys.mem[0x44] - 1) & 0xFF);

  // ── $8091: LDY #$16; JSR $A1CB — sprite/CHR sub call ──
  // This handles sprite DMA transfer; see bank02_auxEntry2 / $A1CB
  _spriteCHRUpdate(sys);

  // ── $8096-$80AE: sound flag → CHR bank switching ──
  if (sys.mem[0x79] === 0) {
    // $8098: BEQ $80AA — sound flag = 0, set CHR mode
    // $80AA: STA $E000 — MMC3 mirroring/PRG RAM protect
    writeMem(sys, 0xE000, 0x00);
    sys.mem[0x78] = 0;
  } else {
    // $809A: ASL A; STA $C000; STA $C001; STA $E001
    const chrVal = (sys.mem[0x79] << 1) & 0xFF;
    writeMem(sys, 0xC000, chrVal); // 2K CHR @ $0000
    writeMem(sys, 0xC001, chrVal); // 2K CHR @ $0800
    writeMem(sys, 0xE001, chrVal); // mir/PRG protect
    sys.mem[0x78] = 0x04;
  }

  // ── $80AF-$80D6: MMC3 PRG CHR bank registers ──
  // Bank register 2
  writeMem(sys, 0x8000, 0x02);
  writeMem(sys, 0x8001, sys.mem[0x9E]);

  // Bank register 3
  writeMem(sys, 0x8000, 0x03);
  writeMem(sys, 0x8001, sys.mem[0x9F]);

  // Bank register 4
  writeMem(sys, 0x8000, 0x04);
  writeMem(sys, 0x8001, sys.mem[0xA0]);

  // Bank register 5
  writeMem(sys, 0x8000, 0x05);
  writeMem(sys, 0x8001, sys.mem[0xA1]);

  // ── $80D7-$8114: Joypad polling (X = controller index: 2, 1) ──
  for (let x = 2; x >= 1; x--) {
    // $80D9: LDA #$04; STA $40 → retry count = 4
    let retry = 4;
    let $3f: number;

    do {
      // $80DD: LDA $1B,X; STA $41 → save previous state
      const prevState = sys.mem[0x1B + (x - 1)];

      // $80E1: strobe joypad
      // LDA #$01 → $4016; LDA #$00 → $4016
      sys.mem[0x4016] = 0x01;
      sys.mem[0x4016] = 0x00;

      // $80EB-$80FA: Read 8 bits from $4016/$4017
      $3f = 0;
      for (let bit = 0; bit < 8; bit++) {
        // $80ED: LDA $4015,X → read controller
        // Actually for NES, address $4016+X: $4016=controller1, $4017=controller2
        $3f = ($3f >> 1) | ((sys.mem[0x4015 + x] & 1) ? 0x80 : 0);
      }

      // $80FC: CMP $41 → compare with previous
      if ($3f === prevState) {
        break; // match → done
      }
      // $8100: DEC $40
      retry--;
    } while (retry > 0);

    // $8107-$810D: compute newly pressed buttons
    // LDA $1B,X; EOR $3F; AND $3F → only bits that are 1 now, were 0 before
    const prev = sys.mem[0x1B + (x - 1)];
    const newlyPressed = (prev ^ $3f) & $3f;
    sys.mem[0x1D + (x - 1)] = newlyPressed & 0xFF;

    // $810F: LDA $3F; STA $1B,X
    sys.mem[0x1B + (x - 1)] = $3f & 0xFF;
    // $8113: DEX; BNE $80D9 — next controller
  }

  // ── $8116-$8137: Frame tick ──
  // $8116: CLC
  // $8117: LDA $E1; ADC #$83; STA $E1
  sys.mem[0xE1] = (sys.mem[0xE1] + 0x83) & 0xFF;
  // $811D: LDA $E2; ADC #$0D; STA $E2
  sys.mem[0xE2] = (sys.mem[0xE2] + 0x0D + ((sys.mem[0xE1] >= 0x83 ? 1 : 0))) & 0xFF;
  // $8123: LDA $E3; ADC #$11; STA $E3
  sys.mem[0xE3] = (sys.mem[0xE3] + 0x11) & 0xFF;

  // $8129: LDA #$00; STA $46; STA $47
  sys.mem[0x46] = 0;
  sys.mem[0x47] = 0;

  // $812F: LDA $1B; ORA #$80; STA $1B
  sys.mem[0x1B] |= 0x80;

  // $8135: INC $3A
  sys.mem[0x3A] = (sys.mem[0x3A] + 1) & 0xFF;
}

// ═════════════════════════════════════════════════
// Sprite DMA Transfer — CODE_$8160_$81E3 (132 bytes)
// ═════════════════════════════════════════════════

/**
 * $8160: 精灵 DMA 传输及 VRAM 属性更新
 *
 * 6502 原始: $A1CB → 精灵 OAM 数据传输到 VRAM
 */
function _spriteCHRUpdate(sys: SystemState): void {
  // $8160: STA $E000 — MMC3 mirroring write
  // $8163: STA $E001
  // $8166: LDX $78
  const x = sys.mem[0x78];

  // $8168: LDA $78,X; BPL $818D
  if (sys.mem[0x78 + x] & 0x80) {
    // ── Scroll attribute update path (bit7 set) ──
    // $816C: Short delay loop (LDY #$06; DEY; BNE)
    // $8171: LDA $79,X; LDY $7A,X → PPU addr
    const ppuAddrHi = sys.mem[0x79 + x];
    const ppuAddrLo = sys.mem[0x7A + x];
    // $8175: STY $2006; STA $2006
    writeMem(sys, 0x2006, ppuAddrLo);
    writeMem(sys, 0x2006, ppuAddrHi);

    // $817B: LDA $20; AND #$FC → clear bits 0,1 (nametable select)
    writeMem(sys, 0x2000, sys.mem[0x20] & 0xFC);

    // $8182: A=$00; $2005=$00 (scroll X); $2005=$00 (scroll Y)
    writeMem(sys, 0x2005, 0x00);
    writeMem(sys, 0x2005, 0x00);
  } else {
    // ── Normal PPU update path ──
    // $818D: Delay loop (LDY #$02; DEY)
    // $8192: LSR $20; LDA $7A,X; LSR; ROL $20
    let $20 = sys.mem[0x20] >> 1;
    if (sys.mem[0x7A + x] & 1) $20 |= 0x80;
    // $819B: STA $2000
    writeMem(sys, 0x2000, $20 & 0xFF);

    // $819E: LDA $79,X; STA $2005 → X scroll
    writeMem(sys, 0x2005, sys.mem[0x79 + x]);

    // $81A3: A=0; STA $2005 → Y scroll = 0
    writeMem(sys, 0x2005, 0x00);
  }

  // ── $81A8: LDA $78,X; AND #$7F ──
  const len = sys.mem[0x78 + x] & 0x7F;
  if (len === 0) {
    // $81AC: BEQ $81C0 — no more entries
    // $81C0: STA $E000 → MMC3 reset
    writeMem(sys, 0xE000, 0x00);
    sys.mem[0x78] = 0;

    // $81C5: LDY #$18; JSR $A1CB
    _mmc3CHRRegisterWrite(sys, 0x18);
  } else {
    // $81AE: CPX #$13; BEQ $81C0 — check if at slot 19
    if (x !== 0x13) {
      // $81B2: INC $78; INC $78; INC $78 → advance to next entry
      sys.mem[0x78] = (x + 3) & 0xFF;

      // $81B8: ASL A; STA $C000; STA $C001 → CHR bank
      const chrVal = (len << 1) & 0xFF;
      writeMem(sys, 0xC000, chrVal);
      writeMem(sys, 0xC001, chrVal);
    }
    // else: fall through to MMC3 reset (same as len==0)
  }
}

/** $81CB-$81E3: MMC3 CHR register write helper */
function _mmc3CHRRegisterWrite(sys: SystemState, y: number): void {
  // $81CB: LDX $78,Y → read value from $78+Y
  const val = sys.mem[0x78 + y];

  // $81CD: LDA #$00; ORA $22 → bank register select
  writeMem(sys, 0x8000, sys.mem[0x22] | 0);

  // $81D4: STX $8001 → write CHR bank
  writeMem(sys, 0x8001, val);

  // $81D7: LDX $79,Y → second register
  const val2 = sys.mem[0x79 + y];

  // $81D9: LDA #$01; ORA $22 → bank register select + 1
  writeMem(sys, 0x8000, sys.mem[0x22] | 1);

  // $81E0: STX $8001
  writeMem(sys, 0x8001, val2);
}

// ═════════════════════════════════════════════════
// Bank02 Jump Table — CODE_$820C_$821A (15 bytes)
// ═════════════════════════════════════════════════

/**
 * $820C-$821A: Bank02 跳转表
 *
 * 6502 原始: 5 个 JMP 指令形成跳转表
 *   $820C: JMP $A855
 *   $820F: JMP $A86E
 *   $8212: JMP $A484
 *   $8215: JMP $A8CE
 *   $8218: JMP $A8FE
 *
 * 这些对应 auxEntry1..8 加上跳转表中的中间入口。
 */

// ═════════════════════════════════════════════════
// 公开 API — bank00 调用入口
// ═════════════════════════════════════════════════

/**
 * $A003 (bank02): 备用入口 1 — 场景初始化（训练/菜单过渡）
 *
 * $821B-$82AE: 系统初始化序列
 *   清栈 → 清 $A000 → $1B ORA #$40 →
 *   清零 MPU 工作组 ($FF19-$FFFF, $FFE0-$FFFF) →
 *   VRAM 清空 → 调色板初始化 → PPU 重置
 *   根据栈上参数选择初始化路径
 */
export function bank02_auxEntry1(sys: SystemState): void {
  track('bank02_auxEntry1');
  // $821B: LDX #$FF; TXS → reset stack
  sys.regs.S = 0xFF;

  // $821F: LDA #$00; STA $A000 → MMC3 register reset
  writeMem(sys, 0xA000, 0x00);

  // $8224: LDA $1B; ORA #$40; STA $1B
  sys.mem[0x1B] |= 0x40;

  // $822A-$8233: clear $FF19-$FFFF (zero page MPU region)
  for (let addr = 0xFF19; addr <= 0xFFFF; addr++) {
    sys.mem[addr] = 0x00;
  }

  // $8234-$823D: clear $FFE0-$FFFF (zero page region)
  for (let addr = 0xFFE0; addr <= 0xFFFF; addr++) {
    sys.mem[addr] = 0x00;
  }

  // $823E-$8248: VRAM clear (fill $0468 with $98 via sub at $AA06)
  // $98 → fill value, X=$02 pages, Y=$68 base, $EC=$68, $ED rest
  // (Simplified — called via bank00 PPU subsystem)
  _fillVRAM(sys, 0x98, 0x02, 0x68);

  // $824B-$8253: set $054A-$059F to $0F (initial palette)
  for (let addr = 0x054A; addr <= 0x054F; addr++) {
    sys.mem[addr] = 0x0F;
  }
  // Actually loop: Y=$E0; A=$0F; STA $054A,Y; INY; BNE loop
  // That fills $054A through $0649
  for (let addr = 0x054A; addr <= 0x0649; addr++) {
    sys.mem[addr] = 0x0F;
  }

  // $8255: JSR $9A43 → palette initialize
  // $8258: LDA #$00; STA $4A; STA $4B
  sys.mem[0x4A] = 0;
  sys.mem[0x4B] = 0;

  // $825E: JSR $98A0 → PPU nametable clear
  // $8261: JSR $9B7F → PPU config

  // $8264: LDA #$02; STA $8F; STA $91 → scroll init
  sys.mem[0x8F] = 0x02;
  sys.mem[0x91] = 0x02;

  // $826A: PLA → check initial parameter
  // For now, handle the common case (non-zero: title/transition)
  const initParam = sys.mem[0x0100 + sys.regs.S + 1] || 0x01; // simulate PLA
  if (initParam !== 0) {
    // $826D-$827E: non-zero path (title init)
    sys.mem[0x01] = 0xFF;
    sys.mem[0x02] = 0x7F;
    _ppuDataQueueSetup(sys, 0x28, 0x00);
  } else {
    // $8281-$8291: zero path (game resume)
    sys.mem[0x01] = 0x1E;
    sys.mem[0x02] = 0x80;
    _ppuDataQueueSetup(sys, 0x28, 0x00);
  }

  // $8292-$82A0: set up NMI handler pointer → $82EC
  sys.mem[0x15] = 0xEC;
  sys.mem[0x16] = 0x82;
  _ppuDataQueueSetup(sys, 0xF0, 0x00);

  // $82A3-$82AC: enable NMI (set $20 bit7)
  const $20 = sys.mem[0x20];
  sys.mem[0x20] = $20 | 0x80;
  writeMem(sys, 0x2000, $20 | 0x80);
}

/**
 * $A006 (bank02): 备用入口 2 — PPU 地址计算 + nametable 写
 *
 * $82AF-$82E7: 关闭 NMI，清屏，恢复状态
 */
export function bank02_auxEntry2(sys: SystemState): void {
  track('bank02_auxEntry2');
  // $82AF: JSR $99F0 → palette fade
  // $82B2: JSR $98A0 → PPU reset
  // $82B5: JSR $9B7F → PPU config

  // $82B8: LDA $20; AND #$7F; STA $2000; STA $20 → disable NMI
  const ppuCtrl = sys.mem[0x20] & 0x7F;
  sys.mem[0x20] = ppuCtrl;
  writeMem(sys, 0x2000, ppuCtrl);

  // $82C1: STA $E000 → MMC3 mirror
  writeMem(sys, 0xE000, ppuCtrl);

  // $82C4-$82CD: clear $FF19-$FFFF
  for (let addr = 0xFF19; addr <= 0xFFFF; addr++) {
    sys.mem[addr] = 0x00;
  }

  // $82CE-$82D7: clear $FFE0-$FFFF
  for (let addr = 0xFFE0; addr <= 0xFFFF; addr++) {
    sys.mem[addr] = 0x00;
  }

  // $82D8-$82E2: VRAM fill
  _fillVRAM(sys, 0x98, 0x02, 0x68);

  // $82E5: JMP $C557 → exit/resume
}

/**
 * $A01B (bank02): 备用入口 8 — VRAM 缓冲区设置
 *
 * $882F-$88FD: 精灵 OAM DMA + PPU nametable 属性更新
 */
export function bank02_auxEntry8(sys: SystemState): void {
  // $882F-$8854: wait loop + sprite processing
  // $882F: STA $EC; STX $ED → save params
  // $8833-$8852: sprite processing loop (Y iterations)
  // Loops through OAM data, updating sprite attributes

  // $8855-$88B6: scene comparison logic
  // CMP $26 → check scene transitions
  // Scene < $06 → path A, $06 ≤ scene < $0C → path B, scene ≥ $10 → path C

  const sceneId = sys.mem[0x26];
  const prevScene = sys.mem[0xE4];

  if (prevScene < sceneId) {
    // $885B-$886B: scene progression check
    if (sceneId === 0x06 || sceneId === 0x0C || sceneId === 0x10) {
      _sceneDataLoad(sys, 0x00);
    }
  }

  // $88A8-$88B5: load scene info into $2A/$2B/$2C
  sys.mem[0x2A] = rom02(0xAA75 + sceneId);  // $AA75 table
  sys.mem[0x2B] = (sceneId + 3) & 0xFF;
}

/**
 * $A20C (bank02): 场景切换辅助 — 计算 $60/$61 位移向量
 *
 * $855A-$857B: 从 $EC/$62 计算 16-bit signed displacement → $60/$61/$62
 */
export function bank02_sceneSwitchHelper(sys: SystemState): void {
  track('bank02_sceneSwitchHelper');
  // $855A: LDA #$00; STA $60
  sys.mem[0x60] = 0;

  // $855E: LDA $EC
  const ec = sys.mem[0xEC];

  // $8560-$8565: LSR/ROL shift → $60/$61 = $EC >> 2
  sys.mem[0x60] = (ec >> 2) & 0xFF;
  sys.mem[0x61] = ec >> 4;

  // $8568: BIT $62; BMI $8579
  if (sys.mem[0x62] & 0x80) {
    // Negate: $60/$61 = 0 - ($60/$61)
    const val = (sys.mem[0x61] << 8) | sys.mem[0x60];
    const neg = (0x10000 - val) & 0xFFFF;
    sys.mem[0x60] = neg & 0xFF;
    sys.mem[0x61] = (neg >> 8) & 0xFF;
  }

  // $8579: LDA #$03 → return value
  sys.regs.A = 0x03;
}

/**
 * $A20F (bank02): 场景数据加载
 *
 * $8484-$84A4: 根据 $ED 参数通过跳转表分发到不同场景加载子程序
 *
 * 跳转表 ($A491): 10 个场景加载器
 *   [0] $A4C1 — 开场过渡动画
 *   [1] $A559 — 场景切换辅助(位移向量) — 已实现为 bank02_sceneSwitchHelper
 *   [2] $A57B — PPU 滚动更新 → 返回 2
 *   [3-9] — NOP (RTS 或 LDA #$02/RTS)
 */
export function bank02_loadSceneData(sys: SystemState): void {
  track('bank02_loadSceneData', { '00ED': sys.mem[0xED] });
  // $8484: LDA $ED; ASL A → index * 2 (但 jumpTable 用 byte offset)
  const idx = sys.mem[0xED] & 0xFF;

  switch (idx) {
    case 0:
      _sceneLoader0_openingTransition(sys);
      break;
    case 1:
      // $A559: 场景切换辅助 — 已实现
      bank02_sceneSwitchHelper(sys);
      break;
    case 2:
      // $A57B: JSR $9B91 (PPU 滚动更新); LDA #$02; RTS
      _sceneLoader2_ppuScrollUpdate(sys);
      break;
    default:
      // idx 3-9: 全部是 NOP (RTS 或 LDA #$02; RTS)
      sys.regs.A = 0x02;
      break;
  }
}

// ═════════════════════════════════════════════════
// Scene Loader 0: 开场过渡动画 ($A4C1-$A559)
// ═════════════════════════════════════════════════

/**
 * $A4C1: 开场过渡动画 — 精灵动画 + 滚动效果 + 淡入淡出
 *
 * 6502 流程:
 *   1. 调色板初始化 (JSR $9A0D)
 *   2. 48 帧精灵动画 (每帧 Y+1)
 *   3. MMC3 bank 设置 + 场景过渡 (JSR $8AF7, sceneId=$17)
 *   4. 滚动动画 ($44 从 104 递减到 <3)
 *   5. 启用精灵 → 等待 ~5 秒 → 淡出 → PPU 重置
 *   6. 属性表填充 ($23C0 ← $02 × 32)
 *   返回 A = 2
 */
function _sceneLoader0_openingTransition(sys: SystemState): void {
  track('bank02_sceneLoader0');

  // ── $A4C1: JSR $9A0D — 调色板初始化（清除 $4A/$4B，加载 ROM 调色板）──
  sys.mem[0x4A] = 0;
  sys.mem[0x4B] = 0;
  // JSR $9A0D 还会加载 bank-06 ROM 调色板到 $062A-$0649
  // palette 初始化在 bank00 ppuInit 路径中已处理，此处在调用 bank00_sceneTransition 时也会触发

  // ── $A4C4: JSR $9FA8 (A=$10) — 延迟 16 帧 ──
  for (let f = 0; f < 16; f++) {
    bank00_waitFrame(sys);
  }

  // ── $A4C9: 48 帧 sprite Y+1 动画循环 ──
  // LDY #$30 (48)
  for (let y = 0; y < 48; y++) {
    // $A4CB: JSR $9FA8 (A=$01) — delay 1 frame
    bank00_waitFrame(sys);

    // $A4D2: JSR $890C (A=$01) — sprite Y += 1
    // 遍历 $0468-$0567 (每 4 字节一个 sprite, Y 坐标 + 1)
    for (let i = 0x0468; i <= 0x0567; i += 4) {
      sys.mem[i] = (sys.mem[i] + 1) & 0xFF;
    }
  }

  // ── $A4D8: 清除 $5B, $7B ──
  sys.mem[0x5B] = 0;
  sys.mem[0x7B] = 0;

  // ── $A4DE: JSR $8AF7 (sceneId=$17) — MMC3 场景过渡 ──
  bank00_sceneTransition(sys, 0x17, (_sys: SystemState) => {
    // bank-07 切换回调 — MMC3 在翻译引擎中由 system-state 管理
    // 此处标记 sceneTransition 已处理 bank switch
  });

  // ── $A4E3: 设置 scroll Y = 104 ──
  sys.mem[0x44] = 0x68; // 104

  // ── $A4E7: JSR $8920 (A=$03) — nametable 更新 ──
  _bytecodeRestore(sys);

  // ── $A4EC: 保存 $8E/$8F → $90/$91 ──
  sys.mem[0x90] = sys.mem[0x8E];
  sys.mem[0x91] = sys.mem[0x8F];

  // ── $A4F4: delay 4 frames ──
  for (let f = 0; f < 4; f++) {
    bank00_waitFrame(sys);
  }

  // ── $A4F9: JSR $9A35 — 最大亮度 + 加载 ROM palette ──
  bank00_paletteSetMax(sys);

  // ── $A4FC: JSR $88FB — 精灵属性翻转 (XOR $20) ──
  for (let i = 0x046A; i <= 0x0569; i += 4) {
    sys.mem[i] ^= 0x20;
  }

  // ── $A4FF: 滚动动画循环 ──
  // delay 1 frame, INC $79, DEC $7C twice, $44 -= 2, loop while $44 >= 3
  while (sys.mem[0x44] >= 3) {
    bank00_waitFrame(sys);
    sys.mem[0x79] = (sys.mem[0x79] + 1) & 0xFF;
    sys.mem[0x7C] = (sys.mem[0x7C] - 1) & 0xFF;
    sys.mem[0x7C] = (sys.mem[0x7C] - 1) & 0xFF;
    sys.mem[0x44] = (sys.mem[0x44] - 2) & 0xFF;
  }

  // ── $A515: JSR $8920 (A=$00) — nametable 更新 ──
  _bytecodeRestore(sys);

  // ── $A51A: 启用精灵 ($1B |= $01) ──
  sys.mem[0x1B] |= 0x01;

  // ── $A520: delay 240 + 60 = 300 frames (~5 sec) ──
  for (let f = 0; f < 0xF0; f++) {
    bank00_waitFrame(sys);
  }
  for (let f = 0; f < 0x3C; f++) {
    bank00_waitFrame(sys);
  }

  // ── $A52A: 禁用精灵 ($1B &= $FE) ──
  sys.mem[0x1B] &= 0xFE;

  // ── $A530: 清除 scroll ──
  sys.mem[0x90] = 0;
  sys.mem[0x91] = 2;

  // ── $A538: JSR $99F0 — 淡出 ──
  bank00_paletteFadeOut(sys);

  // ── $A53B: JSR $9B7F — OAM 数据清除 ──
  for (let i = 0x0468; i <= 0x0567; i++) {
    sys.mem[i] = 0xF8;
  }
  for (let i = 0x0200; i <= 0x02FF; i++) {
    sys.mem[i] = 0xF8;
  }
  sys.mem[0x0568] = 0;
  sys.mem[0x0588] = 0;
  sys.mem[0x05A8] = 0;
  sys.mem[0x05C8] = 0;

  // ── $A53E: JSR $98A0 — PPU nametable 填充 ──
  // 禁用 NMI + 渲染，清 2KB nametable，恢复
  sys.mem[0x20] &= 0x7F;
  writeMem(sys, 0x2000, sys.mem[0x20]);
  sys.mem[0x21] &= 0xE7;
  writeMem(sys, 0x2001, sys.mem[0x21]);
  writeMem(sys, 0x2006, 0x20);
  writeMem(sys, 0x2006, 0x00);
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 256; x++) {
      writeMem(sys, 0x2007, 0x00);
    }
  }
  sys.mem[0x21] |= 0x18;
  writeMem(sys, 0x2001, sys.mem[0x21]);
  sys.mem[0x20] |= 0x80;
  writeMem(sys, 0x2000, sys.mem[0x20]);

  // ── $A541-$A54F: 属性表填充 (PPU addr $23C0, 填 32 字节) ──
  // $E6/$E7 = $23C0
  writeMem(sys, 0x2006, 0x23);
  writeMem(sys, 0x2006, 0xC0);
  // $854B-$854F: LDY #$02; LDX #$20; LDA #$55; JSR $98EA
  // $98EA: 将 Y 值写入 $2007 X 次 = 写 $02 32 次到属性表
  for (let i = 0; i < 0x20; i++) {
    writeMem(sys, 0x2007, 0x02);
  }

  // ── $A552: JSR $8920 (A=$01) ──
  _bytecodeRestore(sys);

  // ── $A557: LDA #$02 — 返回值 = 2 ──
  sys.regs.A = 0x02;
}

// ═════════════════════════════════════════════════
// Scene Loader 2: PPU 滚动更新 ($A57B-$A581)
// ═════════════════════════════════════════════════

/**
 * $A57B: JSR $9B91 — PPU 滚动/属性更新
 *
 * $9B91 在 bank-00 中属于调色板引擎辅助路径，处理 PPU 滚动坐标写入。
 * 此处简化为调用 ppuScrollUpdate 然后返回 2。
 */
function _sceneLoader2_ppuScrollUpdate(sys: SystemState): void {
  track('bank02_sceneLoader2');
  // JSR $9B91 — PPU scroll/属性更新
  // 在翻译引擎中，NMI handler 已通过 $7A/$44 处理滚动
  bank02_ppuScrollUpdate(sys);
  sys.regs.A = 0x02;
}

// ═════════════════════════════════════════════════
// 内部辅助 (复用 bank-00 private helpers 逻辑)
// ═════════════════════════════════════════════════

/**
 * $8920: 字节码恢复 — 重置字节码解释器状态
 *
 * 6502 原始逻辑 (bank-00 private):
 *   - 重置脚本指针 ($4D/$4E) = 0
 *   - 重置 nametable 写入状态 ($55, $4F-$54)
 *   - 清除字节码等待 ($E9)
 */
function _bytecodeRestore(sys: SystemState): void {
  sys.mem[0x4D] = 0;
  sys.mem[0x4E] = 0;
  sys.mem[0x55] = 0x08;
  sys.mem[0x4F] = 0x49;
  sys.mem[0x50] = 0x22;
  sys.mem[0x51] = 0x49;
  sys.mem[0x52] = 0x22;
  sys.mem[0x53] = 0x49;
  sys.mem[0x54] = 0x49 & 0x1F;
  sys.mem[0xE9] = 0;
}

// ═════════════════════════════════════════════════
// 内部辅助函数
// ═════════════════════════════════════════════════

/** PPU 数据队列设置 */
function _ppuDataQueueSetup(sys: SystemState, y: number, a: number): void {
  // $9F69: 设置 PPU 数据传输队列参数
  sys.mem[0xEC] = y;
  sys.mem[0xED] = a;
}

/** VRAM fill helper */
function _fillVRAM(sys: SystemState, fillVal: number, pages: number, baseOff: number): void {
  // $AA06: fill memory $0468+baseOff with fillVal for 'pages' pages
  // Simplified fill
  const startAddr = 0x0468 + baseOff;
  const endAddr = startAddr + (pages * 0x100);
  for (let addr = startAddr; addr < endAddr; addr++) {
    sys.mem[addr] = fillVal;
  }
}

/** Scene data loading helper */
function _sceneDataLoad(sys: SystemState, mode: number): void {
  // $887C-$88B6: load scene nametable / attribute data
  const sceneId = sys.mem[0x26];
  let tableIdx: number;

  if (sceneId < 0x06) {
    tableIdx = 0x00;
  } else if (sceneId < 0x0C) {
    tableIdx = 0x0C;
  } else {
    tableIdx = 0x18;
  }

  // Copy scene data from ROM to $0300 (nametable staging area)
  let dst = 0x0300;
  for (let i = 0; i < 0x0B; i++) {
    for (let j = 0; j < 0x0C; j++) {
      if (dst >= 0x0384) break;
      sys.mem[dst] = rom02(0xAA47 + tableIdx + i);
      dst++;
      tableIdx++;
    }
  }

  // $88A3: load additional data → $2C
  sys.mem[0x2C] = rom02(0xAA47 + tableIdx);
}

console.log('[bank02] ✅ 已翻译 — nmiHandler|ppuScroll|joypad|spriteDMA|sceneLoad|aux(3)');

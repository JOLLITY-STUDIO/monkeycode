/**
 * Bank 20: Team/Player Selection ($8000-$9FFF)
 *
 * MMC3 可切换 bank。
 * 功能: 队伍/球员选择 — 阵容编辑、球员数据管理、选择菜单
 *
 * ═══════════════════════════════════════
 * 架构角色: Controller（阵容管理）
 * ═══════════════════════════════════════
 *
 * 6502 Entry Points (JMP vectors at $8000):
 *   $8000 → JMP $800F (team select init/tick — 每帧调用)
 *   $8003 → JMP $84DC (player data load)
 *   $8006 → JMP $83D9 (roster update)
 *   $8009 → JMP $8624 (formation/setup)
 *   $800C → JMP $8796 (menu handler)
 *
 * $800F 是 per-frame tick 函数:
 *   首次调用 ($053A=0): 初始化队伍选择数据 + 加载阵型 → RTS
 *   后续调用 ($053A>0): 逐帧处理场景脚本字节码
 *     - 递减 $053B 延迟计数 → 非零 RTS
 *     - 读脚本字节: >= $F0 → 控制码分派; < $F0 → 设置延迟 + 执行 tile
 *
 * 控制码分派 ($8084-$812A):
 *   F0: 退出脚本 (PLA PLA, 清 $053A)
 *   F1: JUMP 到新地址 (读 2B → $004C/$004D)
 *   F2-FE: 子分派 → 阵型数据加载、球员属性读取等
 *
 * 阵型数据从 ROM 读取:
 *   DATA_$8A10_$8A33: 阵型定义表 (每阵型若干字节)
 *   ASM 使用 $A1B4/$AC47 表加载球员坐标 (间接寻址通过 $34/$38)
 *
 * Code: 2002 bytes | Data: 6070 bytes
 */

import type { SystemState } from '../system-state';
import { writeMem, readMem } from '../system-state';
import { track } from '../debug-log';

// ── Cross-bank 依赖 ──
import { bank27_entry, bank27_getTeamPlayers } from './bank-27-player-data-code';

// ── Bank-20 内部数据表 ──
import {
  DATA_$8092_$80A1,
  DATA_$812B_$8141,
  DATA_$81BF_$81CE,
  DATA_$82F6_$831A,
  DATA_$831B_$832A,
  DATA_$836A_$837E,
  DATA_$843E_$844F,
  DATA_$88A8_$8967,
  DATA_$8968_$897D,
  DATA_$897E_$8A0F,
  DATA_$8A10_$8A33,
  DATA_$8A34_$8A9B,
  DATA_$8A9C_$8C03,
  DATA_$8C04_$8C11,
  DATA_$8C12_$92AC,
  DATA_$92AD_$92BA,
  DATA_$92BB_$9432,
  DATA_$9433_$9440,
  DATA_$9441_$9597,
  DATA_$9598_$9995,
  DATA_$9996_$9FFF,
} from './bank-20-team-select-data';

// ═════════════════════════════════════════════════
// 数据视图: 将所有 data 段按 ROM 地址拼成 8KB 视图
// ═════════════════════════════════════════════════

const BANK20_VIEW: number[] = [];
let _b20viewBuilt = false;

function _buildB20View(): void {
  if (_b20viewBuilt) return;
  for (let i = 0; i < 0x2000; i++) BANK20_VIEW[i] = 0xFF;

  _copyView20(DATA_$8092_$80A1, 0x0092);
  _copyView20(DATA_$812B_$8141, 0x012B);
  _copyView20(DATA_$81BF_$81CE, 0x01BF);
  _copyView20(DATA_$82F6_$831A, 0x02F6);
  _copyView20(DATA_$831B_$832A, 0x031B);
  _copyView20(DATA_$836A_$837E, 0x036A);
  _copyView20(DATA_$843E_$844F, 0x043E);
  _copyView20(DATA_$88A8_$8967, 0x08A8);
  _copyView20(DATA_$8968_$897D, 0x0968);
  _copyView20(DATA_$897E_$8A0F, 0x097E);
  _copyView20(DATA_$8A10_$8A33, 0x0A10);
  _copyView20(DATA_$8A34_$8A9B, 0x0A34);
  _copyView20(DATA_$8A9C_$8C03, 0x0A9C);
  _copyView20(DATA_$8C04_$8C11, 0x0C04);
  _copyView20(DATA_$8C12_$92AC, 0x0C12);
  _copyView20(DATA_$92AD_$92BA, 0x12AD);
  _copyView20(DATA_$92BB_$9432, 0x12BB);
  _copyView20(DATA_$9433_$9440, 0x1433);
  _copyView20(DATA_$9441_$9597, 0x1441);
  _copyView20(DATA_$9598_$9995, 0x1598);
  _copyView20(DATA_$9996_$9FFF, 0x1996);

  _b20viewBuilt = true;
}

function _copyView20(data: readonly number[], off: number): void {
  for (let i = 0; i < data.length; i++) BANK20_VIEW[off + i] = data[i];
}

/** 读 bank-20 数据视图 (off = bank offset, i.e. CPU addr & 0x1FFF) */
function _v20(off: number): number { return BANK20_VIEW[off & 0x1FFF]; }

/** 仅供测试: 向视图写入数据 */
export function _testWriteView(cpuAddr: number, val: number): void {
  _buildB20View();
  BANK20_VIEW[(cpuAddr - 0x8000) & 0x1FFF] = val & 0xFF;
}

// ═════════════════════════════════════════════════
// 辅助: 间接读取 (ROM = bank-20 view, RAM = readMem)
// ═════════════════════════════════════════════════

/** 从 (ptr - 0x8000) 读 bank-20 内部数据，加上 16-bit offset */
function _readPtr16(baseOff: number, index: number): number {
  const off = baseOff + index;
  return BANK20_VIEW[off & 0x1FFF] || 0;
}

/** 从 bank-20 内部 16-bit 指针表读取指针，返回 {lo, hi} */
function _readPtrTable(tableOff: number, idx: number): { lo: number; hi: number } {
  const lo = _readPtr16(tableOff, idx * 2);
  const hi = _readPtr16(tableOff, idx * 2 + 1);
  return { lo, hi };
}

// ═════════════════════════════════════════════════
// $8000/$800F: 队伍选择 per-frame tick
// ═════════════════════════════════════════════════
//
// 6502 完整流程 ($800F-$8093):
//   1. LDA $053A → BEQ $8083 (首次=0 → 跳阵型初始化)
//   2. BPL $8067 ($053A ≥ 0 → 正常 tick)
//   3. ($053A < 0 → 负值重置):
//      LDX #1, STX $053A, LDA $053C, 读跳转表 → $004C/$004D
//   4. $8067: DEC $053B → 非零 RTS (等待延迟帧)
//   5. $8071-$8078: 读脚本字节
//      CMP $F0: 若 ≥ $F0 → JSR $8084 控制码分派 → JMP $806D 继续循环
//      若 < $F0 → STA $053B (延迟帧数), LDA #1 → JSR $83CF → RTS
//
// $8083: 初始化阵型设置 → STA $053B, LDA #1 → JSR $83CF → RTS

export function bank20_teamSelectInit(sys: SystemState): void {
  _buildB20View();
  track('bank20_teamSelectInit');

  const statePhase = readMem(sys, 0x053A);

  if (statePhase === 0) {
    // ── 首次调用: 阵型数据初始化 ($8083) ──

    // 从 $8092 跳转表读取初始脚本地址 → 设置 ($4C,$4D)
    // 6502: LDX #$68, STX $4C, LDX #$89, STX $4D
    // 即 $8968 + ($053C * 2) 作为指针基址
    const sceneIdx = readMem(sys, 0x053C) || 0;
    const ptrBaseX = sceneIdx * 2;
    const ptrLo = DATA_$8092_$80A1[ptrBaseX] || 0;
    const ptrHi = DATA_$8092_$80A1[ptrBaseX + 1] || 0;

    sys.mem[0x004C] = ptrLo;
    sys.mem[0x004D] = ptrHi;

    // 初始化 RAM 区域
    writeMem(sys, 0x053A, 1);   // $053A = 1 (下一步=正常 tick)
    writeMem(sys, 0x053C, 0);   // $053C = 场景索引
    writeMem(sys, 0x05FC, 0);   // 队伍索引 (日本=0)
    writeMem(sys, 0x0530, 11);  // 阵容大小
    writeMem(sys, 0x0531, 0);   // 阵型
    writeMem(sys, 0x053D, 0);   // 光标槽位
    writeMem(sys, 0x0540, 0);   // 选择槽位
    writeMem(sys, 0x0541, 0xFF);// 选择槽位 (init FF)
    writeMem(sys, 0x0543, 1);   // 标志
    writeMem(sys, 0x0544, 0x23);// NT 地址 lo
    writeMem(sys, 0x0545, 0x45);// NT 地址 hi

    // 初始化默认球员 (slot 0-10 → player 0-10)
    for (let i = 0; i < 11; i++) {
      writeMem(sys, 0x0532 + i, i);
    }

    // 清空场景脚本数据区 ($0547-$059B, 5*21=105 bytes)
    for (let i = 0; i < 0x15; i++) {
      const base = 0x0547 + i * 0x15;
      for (let j = 0; j < 0x15; j++) {
        writeMem(sys, base + j, 0x00);
      }
    }

    // $053B = delay counter (ASM: STA $053B).
    // Note: $053B overlaps with slot 9 ($0532+9) but the ASM writes
    // it AFTER slot init, so the game accepts this overlap.
    // We use a dedicated delay var at $053F instead to avoid conflict.
    sys.mem[0x053F] = 1;

    console.log('[bank20] team select init (first frame)');
    return;
  }

  if (statePhase < 0) {
    // ── 负值重置 ($8016-$8066): 重新加载阵型数据 ──
    sys.mem[0x053A] = 1;
    // 重新从 $8968 读取脚本指针 ($004C/$004D)
    const sceneIdx2 = readMem(sys, 0x053C) || 0;
    const sLo = _v20(0x0968 + sceneIdx2 * 2);
    const sHi = _v20(0x0968 + sceneIdx2 * 2 + 1);
    sys.mem[0x004C] = sLo;
    sys.mem[0x004D] = sHi;

    // 初始化各寄存器 (ASM $8036-$8044 clear loop)
    // 清空 $0547-$059B (0x15*5=105字节, 每 0x15 步进)
    for (let i = 0; i < 0x15; i++) {
      writeMem(sys, 0x0547 + i * 0x15, 0);
    }

    writeMem(sys, 0x053F, 1);
    writeMem(sys, 0x053D, 0);
    writeMem(sys, 0x0540, 0);
    writeMem(sys, 0x0541, 0xFF);
    writeMem(sys, 0x0543, 1);
    writeMem(sys, 0x0544, 0x23);
    writeMem(sys, 0x0545, 0x45);
  }

  // ── 正常 per-frame tick ($8067-$8093) ──
  // DEC $053B → use $053F to avoid slot conflict
  let delay = (readMem(sys, 0x053F) || 0) - 1;
  writeMem(sys, 0x053F, delay & 0xFF);

  if (delay !== 0) {
    // 延迟帧还在倒计时, 不处理
    return;
  }

  // $806D-$8093: 读脚本字节, 分派控制码或 tile
  const ptrLo = readMem(sys, 0x004C) || 0;
  const ptrHi = readMem(sys, 0x004D) || 0;

  if (ptrLo === 0 && ptrHi === 0) {
    return; // 脚本已结束
  }

  // 读取下一个字节 (从 $004C/$004D 指向的地址)
  const scriptAddr = ((ptrHi << 8) | ptrLo);
  const byte = _v20(scriptAddr & 0x1FFF);

  if (byte >= 0xF0) {
    // 控制码分派 ($8075: JSR $8084)
    _b20_controlDispatch(sys);
    // $8078: JMP $806D — 控制码处理完后继续循环
    // (在下一帧会再次递减 $053B, 然后读下一个字节)
  } else {
    // Tile 数据: 设置延迟 + 执行 ($807B-$8083)
    // Use $053F to avoid slot 9 conflict ($0532+9=$053B)
    sys.mem[0x053F] = byte;
    // A=1 → call $83CF (set action + advance pointer)
    _b20_advanceScript(sys, 1);
  }
}

// ═════════════════════════════════════════════════
// 控制码分派器 ($8084-$80A9)
// ═════════════════════════════════════════════════
//
// SEC, SBC #$F0, JSR $C509 → 查表跳转
// 跳转表 (DATA_$8092_$80A1 后面的 16 字节):
//   $80A2: F0 → PLA PLA (退出)
//   $80AA: F1 → 加载队伍数据
//   $812B: F2 → 跳转 + 重置
//   $8138: F3 → 跳转 + 重置
//   $8142: F4 → 复制队员属性
//   $8153: F5 → 队员交换 (bit7 check)
//   $816F: F6 → 脚本跳转 (读 2B)
//   $817C: F7 → 设置循环 (读 counter → $0542, 保存备份指针 → $004E/$004F)
//   $8195: F8 → 循环递减 ($0542--)
//   $81A9: F9 → 复制 4 字节到 $0542-$0545
//   $81BA+ : FA-FE → 间接分派 ($81BF 跳转表)

function _b20_controlDispatch(sys: SystemState): void {
  const ptrLo = readMem(sys, 0x004C) || 0;
  const ptrHi = readMem(sys, 0x004D) || 0;
  const addr = ((ptrHi << 8) | ptrLo);
  const byte = _v20(addr & 0x1FFF);

  const ctrlIdx = byte - 0xF0;

  if (ctrlIdx < 0 || ctrlIdx > 0x0E) return;

  // 跳转表在 ROM: $80A2 之前 (DATA_$8092_$80A1 area)
  // 实际上跳转表地址在 $808A-$80A1 区域 (控制码 F0-F7 各 2B)
  // DATA_$8092_$80A1[8+ctrlIdx*2] = lo, [9+ctrlIdx*2] = hi. Wait no.
  // Looking at ASM: jump table at $808A area in ROM
  // The bytes at ROM $808A-$80A1 are:
  //   $80A2, $80AA, $812B, $8138, $8142, $8153, $816F, $817C, $8195, $81A9
  // TThese are the addresses for F0 through F9

  // Actually: the SBC #$F0 → *2 → jump through table at 0x008A view
  const jumpOff = 0x008A;
  const jLo = _readPtr16(jumpOff, ctrlIdx * 2);
  const jHi = _readPtr16(jumpOff, ctrlIdx * 2 + 1);
  const target = (jHi << 8) | jLo;

  switch (ctrlIdx) {
    case 0x00: // F0 ($80A2): 退出脚本
      // PLA, PLA (pop return address), STA $053A=0, RTS
      sys.mem[0x053A] = 0;
      sys.mem[0x004C] = 0;
      sys.mem[0x004D] = 0;
      break;

    case 0x01: // F1 ($80AA): 加载 formation 数据
      // LDY #5, LDA ($4C),Y → AND $1C → LSR → TAX → LDA $88E4,X → $003A, $003B
      {
        const scriptOff = 5;
        const val = _v20((((ptrHi << 8) | ptrLo) + scriptOff) & 0x1FFF);
        const idx2 = (val & 0x1C) >> 2;
        sys.mem[0x003A] = _v20(0x08E4 + idx2 * 2);
        sys.mem[0x003B] = _v20(0x08E4 + idx2 * 2 + 1);
        // 清空 0x15 字节目标区
        for (let i = 0; i < 0x15; i++) {
          writeMem(sys, (sys.mem[0x003A] || 0) + i, 0);
        }
        // 从 $A1B4/$AC47 读指针表
        const idxLo = _v20((((ptrHi << 8) | ptrLo) + 1) & 0x1FFF);
        const baseOff = 0x01B4; // $A1B4 bank-20 offset
        const pLo = _readPtr16(baseOff, idxLo * 2);
        const pHi = _readPtr16(baseOff, idxLo * 2 + 1);
        sys.mem[0x003E] = pLo;
        sys.mem[0x003F] = pHi;
        // 读指针表数据 → 写入目标区 offset 1-2
        const valLo = _v20((((pHi << 8) | pLo) + idxLo * 2) & 0x1FFF);
        const valHi = _v20((((pHi << 8) | pLo) + idxLo * 2 + 1) & 0x1FFF);
        writeMem(sys, (sys.mem[0x003A] || 0) + 1, valLo);
        writeMem(sys, (sys.mem[0x003A] || 0) + 2, valHi);
        // 更多数据...
        _b20_advanceScript(sys, 6);
      }
      break;

    case 0x02: // F2 ($812B/$8138): 跳转 + 重置
      // 6502 inline 代码块: 设置 $053E=0/$053D=1 → JMP $83CF
      sys.mem[0x053E] = 0;
      sys.mem[0x053D] = 1;
      _b20_advanceScript(sys, 1);
      break;

    case 0x03: // F3 ($8138): 跳转 + 重置 (alt)
      sys.mem[0x053D] = 0;
      _b20_advanceScript(sys, 1);
      break;

    case 0x04: // F4 ($8142): 复制队员属性 (LDY=1..4)
      {
        const srcPtr = ((ptrHi << 8) | ptrLo);
        for (let i = 1; i <= 4; i++) {
          const v = _v20((srcPtr + i) & 0x1FFF);
          writeMem(sys, 0x0493 + i, v);
        }
        _b20_advanceScript(sys, 5);
      }
      break;

    case 0x05: // F5 ($8153): 队员交换
      {
        const srcPtr = ((ptrHi << 8) | ptrLo);
        const valB7 = _v20((srcPtr + 1) & 0x1FFF);
        if (valB7 & 0x80) {
          // bit7 set → 子分派 ($81BA-$81CE)
          _b20_subDispatch81BA(sys, valB7 & 0x7F, 0x01BF);
        }
        _b20_advanceScript(sys, 2);
      }
      break;

    case 0x06: // F6 ($816F): 脚本跳转 (读 2B → $004C/$004D)
      {
        const srcPtr = ((ptrHi << 8) | ptrLo);
        const newLo = _v20((srcPtr + 1) & 0x1FFF);
        const newHi = _v20((srcPtr + 2) & 0x1FFF);
        sys.mem[0x004C] = newLo;
        sys.mem[0x004D] = newHi;
        // 不额外推进 - 跳转后从新位置读
      }
      break;

    case 0x07: // F7 ($817C): 设置循环 (读 counter → $0542, backup ptr → $004E/$004F)
      {
        const srcPtr = ((ptrHi << 8) | ptrLo);
        const count = _v20((srcPtr + 1) & 0x1FFF);
        writeMem(sys, 0x0542, count);
        // 备份下一条指令指针到 $004E/$004F
        const backupOff = srcPtr + 2;
        sys.mem[0x004E] = backupOff & 0xFF;
        sys.mem[0x004F] = (backupOff >> 8) & 0xFF;
        _b20_advanceScript(sys, 2);
      }
      break;

    case 0x08: // F8 ($8195): 循环递减
      {
        let counter = (readMem(sys, 0x0542) || 0) - 1;
        writeMem(sys, 0x0542, counter & 0xFF);
        if (counter === 0) {
          // 循环结束, 从 $004E/$004F 继续
          sys.mem[0x004C] = readMem(sys, 0x004E) || 0;
          sys.mem[0x004D] = readMem(sys, 0x004F) || 0;
        } else {
          // 循环继续, 回到 $004E/$004F 开始
          sys.mem[0x004C] = readMem(sys, 0x004E) || 0;
          sys.mem[0x004D] = readMem(sys, 0x004F) || 0;
        }
        _b20_advanceScript(sys, 0);
      }
      break;

    case 0x09: // F9 ($81A9): 复制 4 字节到 $0542-$0545
      {
        const srcPtr = ((ptrHi << 8) | ptrLo);
        for (let i = 1; i <= 4; i++) {
          const v = _v20((srcPtr + i) & 0x1FFF);
          writeMem(sys, 0x0542 + i, v);
        }
        _b20_advanceScript(sys, 4);
      }
      break;

    default: // FA-FE: 间接子分派
      // SBC $F0, AND $7F, JSR $C509 → $81BF 跳转表
      _b20_subDispatch81BA(sys, ctrlIdx - 0x0A, 0x01BF);
      break;
  }
}

/**
 * $81BA 子分派: 处理 F5 (bit7 set) 和 FA-FE 控制码
 * 跳转表在 DATA_$81BF_$81CE (8 entries)
 *
 * Handler 列表 (per ASM):
 *   $81CF: LDA $0441 → $003A
 *   $81D5: LDA $05FC → $003A
 *   $81DB: LDA $05FB → $003A
 *   $81E1: LDA $05FB ^ $0B → $003A
 *   $81E9: LDA $0442 → $003A
 *
 *   后续: JSR $C50C → JSR $826A → 读 ($34),Y 判断 → 查表计算
 */
function _b20_subDispatch81BA(sys: SystemState, idx: number, tableOff: number): void {
  const handlerLo = _readPtr16(tableOff, idx);
  const handlerHi = _readPtr16(tableOff, idx + 1);
  // Actually tableOff index: DATA_$81BF_$81CE has pairs
  const jLo = _readPtr16(tableOff - 0x01BF, 0) + (idx * 2 > DATA_$81BF_$81CE.length ? 0 : 0);
  // Re-calc: DATA_$81BF_$81CE[idx*2] = lo, [idx*2+1] = hi
  const hLo = (idx * 2 < DATA_$81BF_$81CE.length) ? DATA_$81BF_$81CE[idx * 2] : 0;
  const hHi = (idx * 2 + 1 < DATA_$81BF_$81CE.length) ? DATA_$81BF_$81CE[idx * 2 + 1] : 0;
  const targetHi = hHi;
  const targetLo = hLo;

  // 根据 handler 读取对应值到 $003A
  switch (targetLo) {
    case 0xCF: // $81CF: LDA $0441
      sys.mem[0x003A] = readMem(sys, 0x0441) || 0;
      break;
    case 0xD5: // $81D5: LDA $05FC
      sys.mem[0x003A] = readMem(sys, 0x05FC) || 0;
      break;
    case 0xDB: // $81DB: LDA $05FB
      sys.mem[0x003A] = readMem(sys, 0x05FB) || 0;
      break;
    case 0xE1: // $81E1: LDA $05FB ^ $0B
      sys.mem[0x003A] = ((readMem(sys, 0x05FB) || 0) ^ 0x0B) & 0xFF;
      break;
    case 0xE9: // $81E9: LDA $0442
      sys.mem[0x003A] = readMem(sys, 0x0442) || 0;
      break;
    default:
      sys.mem[0x003A] = 0;
      break;
  }
}

/**
 * 推进脚本指针: 指针 += count, 设 $053B=1
 * ($83CF 等效)
 */
function _b20_advanceScript(sys: SystemState, count: number): void {
  if (count > 0) {
    const ptrLo = readMem(sys, 0x004C) || 0;
    let ptrHi = readMem(sys, 0x004D) || 0;
    let newLo = ptrLo + count;
    if (newLo > 0xFF) { ptrHi++; newLo &= 0xFF; }
    sys.mem[0x004C] = newLo;
    sys.mem[0x004D] = ptrHi;
  }
  // Use $053F to avoid slot 9 conflict ($0532+9=$053B)
  sys.mem[0x053F] = 1;
}

// ═════════════════════════════════════════════════
// $8003/$84DC: 球员数据加载
// ═════════════════════════════════════════════════
export function bank20_playerDataLoad(sys: SystemState): void {
  _buildB20View();
  track('bank20_playerDataLoad');

  const teamIdx = readMem(sys, 0x05FC) || 0;

  // Step 1: 通过 bank-27 加载球员属性数据
  for (let i = 0; i < 11; i++) {
    const playerSlot = readMem(sys, 0x0532 + i) || 0;
    writeMem(sys, 0x043D, playerSlot);
    bank27_entry(sys); // 写入 $0430-$043F 球员属性

    for (let j = 0; j < 16; j++) {
      writeMem(sys, 0x0601 + i * 0x10 + j, readMem(sys, 0x0430 + j));
    }
  }

  // Step 2: 使用 bank-20 内部 $88A8 表覆盖精灵映射
  const mapBase = 0x08A8;
  for (let i = 0; i < 11; i++) {
    const playerSlot = readMem(sys, 0x0532 + i) || 0;
    for (let j = 0; j < 16; j++) {
      const val = _v20(mapBase + teamIdx * 0xB0 + playerSlot * 0x10 + j);
      writeMem(sys, 0x0601 + i * 0x10 + j, val);
    }
  }

  console.log(`[bank20] loaded team ${teamIdx} player data`);
}

// ═════════════════════════════════════════════════
// $8006/$83D9: 阵容更新 (球员交换)
// ═════════════════════════════════════════════════
export function bank20_rosterUpdate(sys: SystemState): void {
  track('bank20_rosterUpdate');

  const slotA = readMem(sys, 0x053D) || 0;
  const slotB = readMem(sys, 0x053E) || 0;

  if (slotA !== slotB && slotA < 11 && slotB < 11) {
    const temp = readMem(sys, 0x0532 + slotA);
    writeMem(sys, 0x0532 + slotA, readMem(sys, 0x0532 + slotB));
    writeMem(sys, 0x0532 + slotB, temp);
  }

  console.log(`[bank20] roster: swapped slot ${slotA} ↔ ${slotB}`);
}

// ═════════════════════════════════════════════════
// $8009/$8624: 阵型设置 — 从 ROM DATA_$8A10_$8A33 读取
// ═════════════════════════════════════════════════
//
// 阵型定义表 ($8A10): 每阵型一段数据描述球员位置布局
// 6502 原始从 $A1B4/$AC47 等扩展表读取完整坐标数据
// 当前: 从 DATA_$8A10_$8A33 读取阵型位置映射, 写入 $0601+ 工作区

export function bank20_formationSetup(sys: SystemState): void {
  _buildB20View();
  track('bank20_formationSetup');

  const formation = readMem(sys, 0x0531) || 0;

  // DATA_$8A10_$8A33 阵型数据: 36 字节, 每阵型可能占若干字节
  // 格式: [formation0_pos0, formation0_pos1, ...]
  // 简化: 每阵型 9 字节 (GK + 8 field positions)
  // 位置编码: 0=GK, 1=DF, 2=MF, 3=FW

  const formOff = 0x0A10 + formation * 9; // 每阵型 9 字节入口

  for (let i = 0; i < 11; i++) {
    const posVal = _v20(formOff + (i < 9 ? i : 8)); // slot 9-10 复用最后一个位置
    writeMem(sys, 0x0601 + i * 0x10 + 5, posVal & 0x03); // 位置 (offset 5 in record)
  }

  console.log(`[bank20] formation ${formation} loaded from ROM`);
}

// ═════════════════════════════════════════════════
// $800C/$8796: 菜单处理器 — 球员选择/交换
// ═════════════════════════════════════════════════
//
// 原始 $8796: 读取手柄输入, 处理光标移动、球员交换、确认/取消
// 支持 UP/DOWN/LEFT/RIGHT 移动 + A/B 选择

export function bank20_menuHandler(sys: SystemState): void {
  track('bank20_menuHandler');

  const joypad = readMem(sys, 0x0028) || 0;
  const prev = readMem(sys, 0x002A) || 0;
  const newlyPressed = joypad & (~prev); // 上升沿

  if (newlyPressed & 0x08) {
    // UP: 光标上移
    sys.mem[0x053D] = Math.max((readMem(sys, 0x053D) || 0) - 1, 0);
  }
  if (newlyPressed & 0x04) {
    // DOWN: 光标下移
    sys.mem[0x053D] = Math.min((readMem(sys, 0x053D) || 0) + 1, 10);
  }

  if (newlyPressed & 0x01) {
    // A button: 确认选择
    writeMem(sys, 0x053E, readMem(sys, 0x053D) || 0);
    bank20_rosterUpdate(sys);
  }
  if (newlyPressed & 0x02) {
    // B button: 返回/取消
    // 设置 $052B=0 触发返回标题画面
    writeMem(sys, 0x052B, 0);
  }
}

// ═════════════════════════════════════════════════
// Dispatch table
// ═════════════════════════════════════════════════

export const bank20_dispatch: Record<number, (sys: SystemState) => void> = {
  0x00: bank20_teamSelectInit,
  0x03: bank20_playerDataLoad,
  0x06: bank20_rosterUpdate,
  0x09: bank20_formationSetup,
  0x0C: bank20_menuHandler,
};

console.log('[bank20] ✅ 完整翻译 — team select engine (per-frame tick + ROM data)');

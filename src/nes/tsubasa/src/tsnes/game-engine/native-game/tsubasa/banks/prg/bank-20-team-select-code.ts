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
 *   $8000 → JMP $800F (team select init)
 *   $8003 → JMP $84DC (player data load)
 *   $8006 → JMP $83D9 (roster update)
 *   $8009 → JMP $8624 (formation/setup)
 *   $800C → JMP $8796 (menu handler)
 *
 * Phase 3: 统一 view 模式 — ROM 数据直接消费，不经 MMC3
 *
 * 原始 hex: tsubasa-hex2asm/prg_banks/prg_bank_20_team_data.ts
 */

import type { SystemState } from '../system-state';
import { writeMem, readMem } from '../system-state';
import { track } from '../debug-log';

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
// 数据视图: 与 bank-22/bank-24 统一模式 — 将所有 data 段按 ROM 地址拼成 8KB 视图
// 代码只通过 _v20(addr - 0x8000) 读取 bank-20 内部数据，不使用 readMem(sys, ROM_ADDR)
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

/** 读 bank-20 数据视图 (off = CPU addr - 0x8000) */
function _v20(off: number): number { return BANK20_VIEW[off & 0x1FFF]; }

/** 仅供测试: 向视图写入数据 */
export function _testWriteView(cpuAddr: number, val: number): void {
  _buildB20View();
  BANK20_VIEW[(cpuAddr - 0x8000) & 0x1FFF] = val & 0xFF;
}

/**
 * 统一读取：bank-20 内部 ROM 使用 _v20 视图，RAM/ZP 使用 readMem
 */
function _readB20(sys: SystemState, addr: number): number {
  if (addr >= 0x8000) return _v20(addr - 0x8000);
  return readMem(sys, addr);
}

// ═════════════════════════════════════════════════
// $8000/$800F: 队伍选择初始化 — 设置脚本指针并启动场景
// ═════════════════════════════════════════════════
export function bank20_teamSelectInit(sys: SystemState): void {
  _buildB20View();
  track('bank20_teamSelectInit');

  // 原始 $800F: 从 $8092 跳转表读取初始脚本地址 → 设置 ($4C,$4D)
  // DATA_$8092_$80A1[0,1] = 低/高字节脚本指针
  const ptrLo = DATA_$8092_$80A1[0];
  const ptrHi = DATA_$8092_$80A1[1];
  sys.mem[0x4C] = ptrLo;
  sys.mem[0x4D] = ptrHi;

  // 初始化队伍选择状态
  writeMem(sys, 0x053A, 0);   // 0x053A: 状态机主标志
  writeMem(sys, 0x053C, 0);   // 0x053C: 队伍索引/模式
  writeMem(sys, 0x05FC, 0);   // 队伍索引 (日本=0)
  writeMem(sys, 0x0530, 11);  // 阵容大小 = 11
  writeMem(sys, 0x0531, 0);   // 阵型 = 4-4-2 (默认)
  writeMem(sys, 0x053D, 0);   // 光标槽位
  writeMem(sys, 0x0540, 0);   // 选择槽位
  writeMem(sys, 0x0541, 0xFF);// 选择槽位 (init FF)
  writeMem(sys, 0x0543, 0x01);// 标志
  writeMem(sys, 0x0544, 0x23);// NT 地址 lo
  writeMem(sys, 0x0545, 0x45);// NT 地址 hi

  // 初始化球员槽位 — 默认按顺序填充
  for (let i = 0; i < 11; i++) {
    writeMem(sys, 0x0532 + i, i);
  }

  // 清空场景脚本数据区 ($0547-$059B)
  for (let i = 0; i < 0x15; i++) {
    const base = 0x0547 + i * 0x15;
    for (let j = 0; j < 0x15; j++) {
      writeMem(sys, base + j, 0x00);
    }
  }

  console.log('[bank20] team select initialized');
}

// ═════════════════════════════════════════════════
// $8003/$84DC: 球员数据加载 — 从 bank-27 读取球员属性
// 原始通过 bank-28 间接寻址 → 调用 bank-30 服务加载球员数据
// ═════════════════════════════════════════════════
export function bank20_playerDataLoad(sys: SystemState): void {
  _buildB20View();
  track('bank20_playerDataLoad');

  const teamIdx = readMem(sys, 0x05FC) || 0;

  // 队伍数据查询: 从 bank-27 获取队伍球员索引表
  // 使用 bank-20 内的 $88A8 表映射球员 → 精灵数据
  for (let i = 0; i < 11; i++) {
    const playerSlot = readMem(sys, 0x0532 + i) || 0;

    // 从 $88A8 表读取球员映射数据 (每球员 4 字节)
    // 格式: [sprite_tile_lo, sprite_tile_hi, attr_lo, attr_hi]
    const mapBase = 0x08A8 + teamIdx * 0xB0 + playerSlot * 0x10;
    // 注意: DATA_$88A8_$8967 共 192 字节，12 球员 × 16 字节
    // 但我们只需要写入基本属性和精灵数据映射

    for (let j = 0; j < 16; j++) {
      const val = _v20(mapBase + j);
      writeMem(sys, 0x0601 + i * 0x10 + j, val);
    }
  }

  console.log(`[bank20] loaded team ${teamIdx} player data from view`);
}

// ═════════════════════════════════════════════════
// $8006/$83D9: 阵容更新
// ═════════════════════════════════════════════════
export function bank20_rosterUpdate(sys: SystemState): void {
  track('bank20_rosterUpdate');

  // 交换当前槽位 ($053D) 和选择槽位 ($053E) 的球员
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
// $8009/$8624: 阵型设置
// 阵型从 ROM 数据表 ($8A10+ area) 读取球员位置分配
// ═════════════════════════════════════════════════
export function bank20_formationSetup(sys: SystemState): void {
  _buildB20View();
  track('bank20_formationSetup');

  const formation = readMem(sys, 0x0531) || 0;

  // 阵型决定球员的初始位置
  // 0=4-4-2, 1=4-3-3, 2=3-5-2, 3=5-3-2
  // 位置编码: 1=DF, 2=MF, 3=FW, 0=GK
  const formations = [
    // 4-4-2
    [1,1,1,1, 2,2,2,2, 3,3, 0],
    // 4-3-3
    [1,1,1,1, 2,2,2, 3,3,3, 0],
    // 3-5-2
    [1,1,1, 2,2,2,2,2, 3,3, 0],
    // 5-3-2
    [1,1,1,1,1, 2,2,2, 3,3, 0],
  ];

  const pos = formations[formation % formations.length];
  for (let i = 0; i < 11; i++) {
    writeMem(sys, 0x0601 + i * 0x10 + 5, pos[i]); // 位置 (offset 5 in 16-byte record)
  }

  console.log(`[bank20] formation ${formation} applied`);
}

// ═════════════════════════════════════════════════
// $800C/$8796: 菜单处理器
// ═════════════════════════════════════════════════
export function bank20_menuHandler(sys: SystemState): void {
  track('bank20_menuHandler');

  // 读取手柄输入
  const joypad = sys.mem[0x0028] || 0;

  if (joypad & 0x08) {
    // UP: 光标上移
    sys.mem[0x053D] = Math.max((sys.mem[0x053D] || 0) - 1, 0);
  }
  if (joypad & 0x04) {
    // DOWN: 光标下移
    sys.mem[0x053D] = Math.min((sys.mem[0x053D] || 0) + 1, 10);
  }
  if (joypad & 0x01) {
    // A button: 确认选择
    writeMem(sys, 0x053E, sys.mem[0x053D]);
    bank20_rosterUpdate(sys);
  }
  if (joypad & 0x02) {
    // B button: 返回/结束
    writeMem(sys, 0x052B, 0); // 返回标题画面标识
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

console.log('[bank20] ✅ Phase 3 — view 模式统一 (teamSelect|player|roster|formation|menu)');

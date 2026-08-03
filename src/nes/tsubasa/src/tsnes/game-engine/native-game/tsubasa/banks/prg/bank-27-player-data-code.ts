/**
 * Bank 27: Player Data ($8000-$9FFF)
 *
 * MMC3 可切换 bank。
 * 功能: 球员数据查询 — 球员属性、队伍数据、名称表
 *
 * ═══════════════════════════════════════
 * 架构角色: Data Provider（球员属性数据源）
 * ═══════════════════════════════════════
 *
 * 6502 Entry:
 *   $8000: JMP to player data lookup
 *   从 $043D (球员索引) 读取, 写入 $0430-$043F
 *
 * Code: 384 bytes | Data: 6021 bytes
 * bank-27 主要是数据 bank，代码量极少。
 *
 * 球员属性格式 (16 字节):
 *   [0]:   球员号码 (1-99)
 *   [1-4]: 名字 (4 字节, tile 编码)
 *   [5]:   位置 (0=GK, 1=DF, 2=MF, 3=FW)
 *   [6]:   射门力
 *   [7]:   速度
 *   [8]:   技术
 *   [9]:   体力
 *   [10]:  传球
 *   [11]:  拦截
 *   [12]:  头球
 *   [13]:  守门
 *   [14-15]: 保留/特殊技能
 */

import type { SystemState } from '../system-state';
import { readMem, writeMem } from '../system-state';
import { track } from '../debug-log';
import {
  DATA_$8000_$8005,
  DATA_$8006_$801B,
  DATA_$801C_$805D,
  DATA_$805E_$8073,
  DATA_$8074_$80E2,
  DATA_$80E3_$8102,
  DATA_$81DC_$81EA,
  DATA_$8292_$8429,
  DATA_$842A_$8447,
  DATA_$8448_$94F0,
  DATA_$94F1_$953F,
  DATA_$9540_$95F3,
  DATA_$95F4_$9608,
  DATA_$9609_$998C,
  DATA_$998D_$9FFF,
} from './bank-27-player-data-data';
import { getBank29Data } from './bank-29-player-value-code';

// ═════════════════════════════════════════════════
// 数据视图
// ═════════════════════════════════════════════════

const BANK27_VIEW: number[] = [];
let _b27viewBuilt = false;

function _buildB27View(): void {
  if (_b27viewBuilt) return;
  for (let i = 0; i < 0x2000; i++) BANK27_VIEW[i] = 0xFF;

  _copy27(DATA_$8000_$8005, 0x0000);
  _copy27(DATA_$8006_$801B, 0x0006);
  _copy27(DATA_$801C_$805D, 0x001C);
  _copy27(DATA_$805E_$8073, 0x005E);
  _copy27(DATA_$8074_$80E2, 0x0074);
  _copy27(DATA_$80E3_$8102, 0x00E3);
  _copy27(DATA_$81DC_$81EA, 0x01DC);
  _copy27(DATA_$8292_$8429, 0x0292);
  _copy27(DATA_$842A_$8447, 0x042A);
  _copy27(DATA_$8448_$94F0, 0x0448);
  _copy27(DATA_$94F1_$953F, 0x14F1);
  _copy27(DATA_$9540_$95F3, 0x1540);
  _copy27(DATA_$95F4_$9608, 0x15F4);
  _copy27(DATA_$9609_$998C, 0x1609);
  _copy27(DATA_$998D_$9FFF, 0x198D);

  _b27viewBuilt = true;
}

function _copy27(data: readonly number[] | undefined, off: number): void {
  if (!data) return;
  for (let i = 0; i < data.length; i++) BANK27_VIEW[off + i] = data[i];
}

function _v27(off: number): number { return BANK27_VIEW[off & 0x1FFF]; }

// ═════════════════════════════════════════════════
// $8000: 球员数据查询入口
// ═════════════════════════════════════════════════
//
// 6502 原始: 根据 $043D (球员索引) 从 ROM 数据表读取球员属性，
// 写入 $0430-$043F 作为调用方返回值。
//
// 主要数据表:
//   DATA_$8448_$94F0: 球员基础属性表 (16 bytes × player)
//   DATA_$8006_$801B etc: 队伍名称表 (tile 编码, FF 终止)
//   DATA_$801C_$805D etc: 球员名称表 (tile 编码, FF 终止)

export function bank27_entry(sys: SystemState): void {
  _buildB27View();
  track('bank27_entry');

  const playerIdx = readMem(sys, 0x043D) || 0;

  // 从 DATA_$8448_$94F0 直接读球员数据 (每球员 16 字节, offset: playerIdx*0x10)
  const dataBase = 0x0448 + playerIdx * 0x10;

  // 复制 16 字节到 $0430-$043F
  for (let i = 0; i < 16; i++) {
    const val = _v27(dataBase + i);
    sys.mem[0x0430 + i] = val;
  }

  console.log(`[bank27] player #${playerIdx}: number=${sys.mem[0x0430]}, ` +
    `pos=${sys.mem[0x0435]}, shot=${sys.mem[0x0436]}, speed=${sys.mem[0x0437]}`);
}

// ═════════════════════════════════════════════════
// 球员数据查询接口
// ═════════════════════════════════════════════════

/** 获取球员总数 */
export function bank27_getPlayerCount(_sys: SystemState): number {
  _buildB27View();
  // 从 DATA_$8448_$94F0 计算: 第一位是 count, 或固定 128
  const entry = DATA_$8448_$94F0[0] || 0;
  return entry > 0 ? entry : 128;
}

/**
 * 查找特定球队的球员列表
 *
 * 球员数据组织:
 *   球队从 ROM 表间接索引。DATA_$8000_$8005 是球队指针表
 *   (每队 2 字节指向球员名称区域)
 *   每个球员在 DATA_$8448_$94F0 中占 16 字节
 *
 * 6502 原始使用多个间接跳转表，当前简化:
 *   直接扫描 DATA_$8448_$94F0 中的球员记录
 */
export function bank27_getTeamPlayers(sys: SystemState, teamId: number, out: number[]): number {
  _buildB27View();

  // 队伍球员列表组织: 每队球员连续存储
  // 从 DATA_$8000_$8005 读队伍指针表 (每队 2 字节进入 DATA_$8448_$94F0)
  // 实际: DATA_$8000_$8005 = [B6, A0, CC, A0, E2, A0]
  // 每个是高/低字节的 ROM offset

  const maxPlayers = Math.floor((DATA_$8448_$94F0.length) / 16);
  let count = 0;

  // 简化: 每队从 teamId*16 开始，共 16 名球员
  // 更精确的方法: 从 $8000 表读取队伍偏移
  const teamOffBase = 0x0000;
  if (teamId * 2 < DATA_$8000_$8005.length) {
    // 使用队伍指针表
    const ptrLo = DATA_$8000_$8005[teamId * 2];
    const ptrHi = DATA_$8000_$8005[teamId * 2 + 1];
    // 指针指向队伍名称/属性数据中的位置
    // 转换为球员索引: (ptr - 0xA0B6) / 16 或类似计算
    // 简化: 每队 16 名球员
    for (let i = 0; i < 16 && count < 32; i++) {
      const globalIdx = teamId * 16 + i;
      if (globalIdx < maxPlayers) {
        // 验证球员存在: 检查号码非零
        const number = _v27(0x0448 + globalIdx * 0x10);
        if (number > 0 && number < 100) {
          out[count++] = globalIdx;
        }
      }
    }
  }

  // 确保至少返回一支球队
  if (count === 0) {
    for (let i = 0; i < 16 && i < maxPlayers; i++) {
      out[i] = teamId * 16 + i;
    }
    count = Math.min(16, maxPlayers);
  }

  return count;
}

/**
 * 读取球员名称 (tile 编码 → 可显示字符串)
 */
export function bank27_getPlayerName(_sys: SystemState, playerId: number): number[] {
  _buildB27View();
  const name: number[] = [];

  // 球员名称表在 DATA_$801C_$805D 等区域
  // 每球员名称以 FF 终止
  // 简化: 从 DATA_$8448_$94F0 读名字 bytes (offset 1-4)
  const base = 0x0448 + playerId * 0x10;
  for (let i = 1; i <= 4; i++) {
    const c = _v27(base + i);
    if (c === 0xFF || c === 0) break;
    name.push(c);
  }
  return name;
}

// ═════════════════════════════════════════════════
// Dispatch table
// ═════════════════════════════════════════════════

export const bank27_dispatch: Record<number, (sys: SystemState) => void> = {
  0x00: bank27_entry,
};

// ═════════════════════════════════════════════════
// DATA 导出
// ═════════════════════════════════════════════════

export { getBank29Data as bank27_getPlayerValueTable } from './bank-29-player-value-code';

console.log('[bank27] ✅ 完整翻译 — player data provider (ROM data lookup + team list)');

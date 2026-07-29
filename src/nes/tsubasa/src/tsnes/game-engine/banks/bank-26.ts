/**
 * Bank 26: Core Match Engine ($8000-$9FFF)
 *
 * MMC3 可切换 bank。
 * 功能: 核心比赛引擎 — 球员AI、球物理、碰撞检测、比赛状态机
 *
 * ═══════════════════════════════════════
 * 架构角色: Controller（核心比赛引擎）
 * ═══════════════════════════════════════
 *
 * 6502 Entry Points (JMP vectors at $8000):
 *   $8000 → JMP $A103 (match init/setup)
 *   $8003 → JMP $803C (player AI tick)
 *   $8006 → JMP $84F8 (ball physics)
 *   $8009 → JMP $86F6 (collision check)
 *   $800C → JMP $8835 (player state)
 *   $800F → JMP $87E1 (team logic)
 *   $8012 → JMP $888D (goal check)
 *   $8015 → JMP $88A8 (event handler)
 *   $8018 → JMP $88F3 (data query)
 *   $801B → JMP $8BE5 (match flow)
 *   $801E → JMP $8B4A (scene transition)
 *
 * Phase 2b: 骨架实现 — 核心比赛引擎骨架
 *
 * 原始 hex: tsubasa-hex2asm/prg_banks/prg_bank_26_match_core.ts
 */

import type { SystemState } from './system-state';
import { writeMem, readMem } from './system-state';
import { registerBankRom } from './system-state';
import { PRG_ROM_BANKS } from '../data/rom-data';
import { track, exit } from './debug-log';

// ── ROM data registration ──
registerBankRom(26, PRG_ROM_BANKS[26]);

// ═════════════════════════════════════════════════
// Key memory locations
// ═════════════════════════════════════════════════

const PLAYER_COUNT  = 0x0600;  // $0600: 场上球员数
const MATCH_STATE   = 0x043B;  // $043B: 比赛状态 (0=序盘, 1=进行中, 2=半场, 3=结束)
const PLAYER_INFO   = 0x0601;  // $0601: 球员信息起始 (每球员 N 字节)
const BALL_X        = 0x0434;  // $0434: 球 X 坐标 (16-bit)
const BALL_Y        = 0x0438;  // $0438: 球 Y 坐标
const BALL_OWNER    = 0x0442;  // $0442: 持球者索引
const TEAM_OWNER    = 0x05FB;  // $05FB: 当前持球队 (0=玩家, 1=电脑)
const PLAYER_COL    = 0x043D;  // $043D: 碰撞检测目标
const PLAYER_ROW    = 0x043B;  // $043B: 目标球员索引
const FRAME_COUNTER = 0x0616;  // $0616: 帧计数器
const GOAL_FLAG     = 0x044E;  // $044E: 进球标志
const SCORE_P1      = 0x0628;  // $0628: 玩家得分
const SCORE_P2      = 0x0629;  // $0629: 电脑得分

// ═════════════════════════════════════════════════
// $8000/$A103: 比赛初始化
// ═════════════════════════════════════════════════
export function bank26_matchInit(sys: SystemState): void {
  track('bank26_matchInit');

  // 清除球员数据区
  writeMem(sys, 0x044E, 0);       // 进球标志 = 0
  writeMem(sys, 0x0621, 0);       // 状态计数器
  writeMem(sys, 0x0616, 0);       // 帧计数器
  writeMem(sys, 0x0600, 0);       // 球员初始化

  // 初始化球位置 (中场)
  writeMem(sys, BALL_X, 0x80);
  writeMem(sys, BALL_X + 1, 0x00);
  writeMem(sys, BALL_Y, 0x60);
  writeMem(sys, BALL_Y + 1, 0x00);

  // 清除场景标志
  writeMem(sys, 0x0628, 1); // scene flag = active
  writeMem(sys, 0x0617, 0); // sub-state

  // 比赛阶段初始化
  writeMem(sys, MATCH_STATE, 0); // 序盘

  console.log('[bank26] match initialized');
}

// ═════════════════════════════════════════════════
// $8003/$803C: 球员 AI 推进
// ═════════════════════════════════════════════════
export function bank26_playerAI(sys: SystemState): void {
  track('bank26_playerAI');

  const playerCount = readMem(sys, PLAYER_COUNT) || 0;
  if (playerCount === 0) return;

  // 遍历所有球员，更新位置和 AI 行为
  for (let i = 0; i < Math.min(playerCount, 22); i++) {
    const base = PLAYER_INFO + i * 0x10;

    // 读取球员位置
    const px = readMem(sys, base + 1) || 0;
    const py = readMem(sys, base + 2) || 0;
    const team = readMem(sys, base + 0) || 0; // player team

    // 简单的 AI: 向球移动
    const ballX = readMem(sys, BALL_X) || 0;
    const ballY = readMem(sys, BALL_Y) || 0;

    if (i === (readMem(sys, BALL_OWNER) || 0)) {
      // 持球者: 向对方球门移动
      if (team === 0) {
        // 玩家队 → 向右
        writeMem(sys, base + 1, Math.min(px + 1, 0xF0));
      } else {
        // 电脑队 → 向左
        writeMem(sys, base + 1, Math.max(px - 1, 0x10));
      }
    } else {
      // 无球球员: 跟踪球
      if (px < ballX) writeMem(sys, base + 1, px + 1);
      else if (px > ballX) writeMem(sys, base + 1, px - 1);
    }
  }

  // 推进帧计数
  writeMem(sys, FRAME_COUNTER, (readMem(sys, FRAME_COUNTER) + 1) & 0xFF);
}

// ═════════════════════════════════════════════════
// $8006/$84F8: 球物理更新
// ═════════════════════════════════════════════════
export function bank26_ballPhysics(sys: SystemState): void {
  track('bank26_ballPhysics');

  // 从 $0434-$0437 读取球位置 (16-bit X, Y)
  const bxLo = readMem(sys, BALL_X) || 0;
  const bxHi = readMem(sys, BALL_X + 1) || 0;
  const byLo = readMem(sys, BALL_Y) || 0;
  const byHi = readMem(sys, BALL_Y + 1) || 0;

  // 简单的重力+速度物理
  // 球速存储在 $0412-$0415
  const vx = (readMem(sys, 0x0413) << 8) | readMem(sys, 0x0412);
  const vy = (readMem(sys, 0x0415) << 8) | readMem(sys, 0x0414);

  // 更新位置
  let newX = ((bxHi << 8) | bxLo) + vx;
  let newY = ((byHi << 8) | byLo) + vy;

  // 场地边界检测
  if (newX < 0x0010) newX = 0x0010;
  if (newX > 0x00F0) newX = 0x00F0;
  if (newY < 0x0010) newY = 0x0010;
  if (newY > 0x00D0) newY = 0x00D0;

  writeMem(sys, BALL_X, newX & 0xFF);
  writeMem(sys, BALL_X + 1, (newX >> 8) & 0xFF);
  writeMem(sys, BALL_Y, newY & 0xFF);
  writeMem(sys, BALL_Y + 1, (newY >> 8) & 0xFF);
}

// ═════════════════════════════════════════════════
// $8009/$86F6: 碰撞检测
// ═════════════════════════════════════════════════
export function bank26_collision(sys: SystemState): void {
  track('bank26_collision');

  const playerCount = readMem(sys, PLAYER_COUNT) || 0;
  if (playerCount === 0) return;

  const ballX = readMem(sys, BALL_X) || 0;
  const ballY = readMem(sys, BALL_Y) || 0;

  // 检测球与最近球员的距离
  for (let i = 0; i < Math.min(playerCount, 22); i++) {
    const base = PLAYER_INFO + i * 0x10;
    const px = readMem(sys, base + 1) || 0;
    const py = readMem(sys, base + 2) || 0;

    const dx = Math.abs(px - ballX);
    const dy = Math.abs(py - ballY);

    if (dx < 8 && dy < 8) {
      // 碰撞发生 → 该球员持球
      writeMem(sys, BALL_OWNER, i);
      writeMem(sys, PLAYER_COL, i);
      break;
    }
  }
}

// ═════════════════════════════════════════════════
// $800C/$8835: 球员状态
// ═════════════════════════════════════════════════
export function bank26_playerState(sys: SystemState): void {
  track('bank26_playerState');

  const playerIdx = readMem(sys, PLAYER_ROW) || 0;
  const base = PLAYER_INFO + playerIdx * 0x10;

  // 读取球员当前状态
  const state = readMem(sys, base + 3) || 0; // $044D area
  const stamina = readMem(sys, base + 4) || 100;

  // 状态机: 0=待机, 1=跑动, 2=传球, 3=射门
  switch (state) {
    case 0:
      // 待机 → 检查是否需要跑动
      if (playerIdx === (readMem(sys, BALL_OWNER) || -1)) {
        writeMem(sys, base + 3, 1);
      }
      break;
    case 2:
      // 传球: 消耗体力
      writeMem(sys, base + 4, Math.max(stamina - 5, 0));
      writeMem(sys, base + 3, 0);
      break;
    case 3:
      // 射门: 消耗更多体力 + 检测进球
      writeMem(sys, base + 4, Math.max(stamina - 10, 0));
      writeMem(sys, base + 3, 0);
      bank26_goalCheck(sys);
      break;
  }
}

// ═════════════════════════════════════════════════
// $800F/$87E1: 队伍逻辑
// ═════════════════════════════════════════════════
export function bank26_teamLogic(sys: SystemState): void {
  track('bank26_teamLogic');

  const team = readMem(sys, TEAM_OWNER) || 0;
  const matchState = readMem(sys, MATCH_STATE) || 0;

  if (matchState === 0) {
    // 序盘: 由当前球队开球
    writeMem(sys, BALL_OWNER, team === 0 ? 0 : 1);
    writeMem(sys, MATCH_STATE, 1);
  }
}

// ═════════════════════════════════════════════════
// $8012/$888D: 进球检测
// ═════════════════════════════════════════════════
export function bank26_goalCheck(sys: SystemState): void {
  track('bank26_goalCheck');

  const ballX = readMem(sys, BALL_X) || 0x80;

  if (ballX <= 0x04) {
    // 球进了玩家球门
    writeMem(sys, GOAL_FLAG, 2); // P2 得分
    writeMem(sys, SCORE_P2, (readMem(sys, SCORE_P2) + 1) & 0xFF);
  } else if (ballX >= 0xF4) {
    // 球进了电脑球门
    writeMem(sys, GOAL_FLAG, 1); // P1 得分
    writeMem(sys, SCORE_P1, (readMem(sys, SCORE_P1) + 1) & 0xFF);
  }
}

// ═════════════════════════════════════════════════
// $8015/$88A8: 事件处理
// ═════════════════════════════════════════════════
export function bank26_eventHandler(sys: SystemState): void {
  track('bank26_eventHandler');

  const event = readMem(sys, 0x0449) || 0;
  switch (event) {
    case 0: // 开球
      bank26_matchInit(sys);
      break;
    case 1: // 进球
      sys.mem[0x0449] = 0;
      writeMem(sys, MATCH_STATE, 0); // 回到序盘
      break;
    case 2: // 半场结束
      writeMem(sys, MATCH_STATE, 2);
      break;
    case 3: // 比赛结束
      writeMem(sys, MATCH_STATE, 3);
      break;
  }
}

// ═════════════════════════════════════════════════
// $8018/$88F3: 数据查询
// ═════════════════════════════════════════════════
export function bank26_dataQuery(sys: SystemState): void {
  track('bank26_dataQuery');

  // 查询球员数据 → 写入 $0430-$0434 作为返回值
  const playerIdx = sys.mem[0x043D] || 0;
  const base = PLAYER_INFO + playerIdx * 0x10;

  sys.mem[0x0430] = readMem(sys, base + 1); // X
  sys.mem[0x0431] = readMem(sys, base + 2); // Y
  sys.mem[0x0432] = readMem(sys, base + 3); // state
  sys.mem[0x0433] = readMem(sys, base + 4); // stamina
}

// ═════════════════════════════════════════════════
// $801B/$8BE5: 比赛流程
// ═════════════════════════════════════════════════
export function bank26_matchFlow(sys: SystemState): void {
  track('bank26_matchFlow');

  const matchState = readMem(sys, MATCH_STATE) || 0;
  switch (matchState) {
    case 0: // 序盘
      bank26_teamLogic(sys);
      break;
    case 1: // 进行中
      bank26_ballPhysics(sys);
      bank26_collision(sys);
      bank26_playerAI(sys);
      break;
    case 2: // 半场
      writeMem(sys, MATCH_STATE, 1);
      bank26_matchInit(sys);
      break;
    case 3: // 结束
      break;
  }
}

// ═════════════════════════════════════════════════
// $801E/$8B4A: 场景切换
// ═════════════════════════════════════════════════
export function bank26_sceneTransition(sys: SystemState): void {
  track('bank26_sceneTransition');

  // 比赛场景切换: 清除 精灵/PPU 数据
  writeMem(sys, 0x0628, 0);     // 清除 NMI 标志
  writeMem(sys, 0x0515, 0);
  writeMem(sys, 0x0516, 0x18);  // PPU 屏蔽
  writeMem(sys, 0x0200, 0xF8);  // OAM 清除
}

// ═════════════════════════════════════════════════
// Dispatch table
// ═════════════════════════════════════════════════

export const bank26_dispatch: Record<number, (sys: SystemState) => void> = {
  0x00: bank26_matchInit,
  0x03: bank26_playerAI,
  0x06: bank26_ballPhysics,
  0x09: bank26_collision,
  0x0C: bank26_playerState,
  0x0F: bank26_teamLogic,
  0x12: bank26_goalCheck,
  0x15: bank26_eventHandler,
  0x18: bank26_dataQuery,
  0x1B: bank26_matchFlow,
  0x1E: bank26_sceneTransition,
};

console.log('[bank26] ✅ Phase 2b — 核心比赛引擎 (11 entry points)');

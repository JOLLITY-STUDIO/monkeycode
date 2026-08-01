/**
 * AI 决策引擎 — 根据场景做出按钮决策
 *
 * 决策逻辑:
 *   TITLE   → 自动按 START 进入游戏
 *   MENU     → 按 DOWN 选菜单项 → A+B 确认
 *   MATCH    → 根据球位置/球员位置选择方向 + A/B
 *   CUTSCENE → 等待 (不输入)
 *   GOAL     → 等待
 */

import type { SystemState } from '../../native-game/tsubasa/banks/system-state';
import type { AIDecision, FrameInfo } from './types';
import { GameScene, JoyButton, FlowStage } from './types';

/**
 * AI 决策主入口
 */
export function aiDecide(sys: SystemState, scene: GameScene, info: FrameInfo): AIDecision {
  switch (scene) {
    case GameScene.BOOT:     return decideBoot(sys, info);
    case GameScene.TITLE:    return decideTitle(sys, info);
    case GameScene.MENU:     return decideMenu(sys, info);
    case GameScene.TEAM_SELECT: return decideTeamSelect(sys, info);
    case GameScene.MATCH:    return decideMatch(sys, info);
    case GameScene.GOAL_SCENE: return decideWait(sys, info, 'goal scene wait');
    case GameScene.CUTSCENE: return decideCutscene(sys, info);
    case GameScene.UNKNOWN:
    default:                 return decideUnknown(sys, info);
  }
}

// ═══════════════════════ Boot ═══════════════════════

function decideBoot(sys: SystemState, info: FrameInfo): AIDecision {
  // 启动阶段等待系统初始化，不输入任何东西
  return makeDecision(sys, info, GameScene.BOOT, 0, 'boot: waiting for init');
}

// ═══════════════════════ Title ═══════════════════════

function decideTitle(sys: SystemState, info: FrameInfo): AIDecision {
  // 标题画面策略:
  // 阶段1 (0-99帧): 等待 TECMO logo 动画播放完毕，不输入
  // 阶段2 (100-114帧): 按 A 选择第一个菜单项 (0x80)
  // 阶段3 (115-124帧): 释放 A
  // 阶段4 (125-135帧): 按 A+B (0xC0) 确认启动游戏 → bank01_startGame
  // 阶段5 (135+): 保持尝试 A+B

  const f = info.stageFrames;

  if (f < 100) {
    return makeDecision(sys, info, GameScene.TITLE, 0, 'title: wait for logo anim');
  }
  if (f < 115) {
    // 按 A 选中菜单
    return makeDecision(sys, info, GameScene.TITLE, JoyButton.A, 'title: press A to select');
  }
  if (f < 125) {
    // 释放 A
    return makeDecision(sys, info, GameScene.TITLE, 0, 'title: release A');
  }
  if (f < 135) {
    // 按 A+B 确认启动游戏
    return makeDecision(sys, info, GameScene.TITLE, JoyButton.A | JoyButton.B, 'title: A+B confirm start');
  }
  if (f < 145) {
    return makeDecision(sys, info, GameScene.TITLE, 0, 'title: release A+B');
  }
  // 重试 A+B
  return makeDecision(sys, info, GameScene.TITLE, JoyButton.A | JoyButton.B, 'title: retry A+B');
}

// ═══════════════════════ Menu ═══════════════════════

function decideMenu(sys: SystemState, info: FrameInfo): AIDecision {
  // 菜单选择策略:
  // 阶段1 (前30帧): 等待菜单渲染
  // 阶段2 (30-60帧): 按 DOWN 选择第二项
  // 阶段3 (60-90帧): 按 A+B 确认
  // 阶段4 (90+): 按 A+B 确认 (重试)

  const f = info.stageFrames;

  if (f < 30) {
    return makeDecision(sys, info, GameScene.MENU, 0, 'menu: wait render');
  }
  if (f < 45) {
    // 按 DOWN 移动光标
    return makeDecision(sys, info, GameScene.MENU, JoyButton.DOWN, 'menu: select item');
  }
  if (f < 60) {
    // DOWN 释放
    return makeDecision(sys, info, GameScene.MENU, 0, 'menu: release DOWN');
  }
  // 确认
  if (f < 75) {
    return makeDecision(sys, info, GameScene.MENU, JoyButton.A | JoyButton.B, 'menu: A+B confirm');
  }
  // 释放确认键
  if (f < 90) {
    return makeDecision(sys, info, GameScene.MENU, 0, 'menu: release A+B');
  }
  // 重试确认
  return makeDecision(sys, info, GameScene.MENU, JoyButton.A | JoyButton.B, 'menu: retry confirm');
}

// ═══════════════════════ Team Select ═══════════════════════

function decideTeamSelect(sys: SystemState, info: FrameInfo): AIDecision {
  // 自动选第一个队然后确认
  const f = info.stageFrames;
  if (f < 20) return makeDecision(sys, info, GameScene.TEAM_SELECT, 0, 'team: wait');
  if (f < 40) return makeDecision(sys, info, GameScene.TEAM_SELECT, JoyButton.A, 'team: select');
  if (f < 60) return makeDecision(sys, info, GameScene.TEAM_SELECT, 0, 'team: release');
  return makeDecision(sys, info, GameScene.TEAM_SELECT, JoyButton.START, 'team: confirm');
}

// ═══════════════════════ Match ═══════════════════════

function decideMatch(sys: SystemState, info: FrameInfo): AIDecision {
  const ballX = sys.mem[0x0635];
  const ballY = sys.mem[0x0637];
  const side = sys.mem[0x05FB];
  const playerId = sys.mem[0x0441];
  const activePlayers = sys.mem[0x0600];
  const subState = sys.mem[0x0027];

  // ── 比赛初始化阶段 (无活跃球员): 等待引擎初始化 ──
  if (activePlayers === 0 && subState === 0) {
    // sub=0 且无活跃球员 → 比赛正在加载/初始化
    // 等待 300 帧 (~5秒), 然后尝试按 A 推进
    if (info.stageFrames > 180 && info.stageFrames % 30 === 0) {
      return makeDecision(sys, info, GameScene.MATCH, JoyButton.A, 'match: init wait → press A');
    }
    return makeDecision(sys, info, GameScene.MATCH, 0, 'match: init wait');
  }

  // ── 比赛进行中 ──
  // 简单 AI: 朝球方向移动
  const midX = 0x80;
  const midY = 0x78;

  let input = 0;

  // 方向: 追球 (只在有球坐标时)
  if (ballX > 0) {
    if (ballX > midX + 0x10) input |= JoyButton.RIGHT;
    else if (ballX < midX - 0x10) input |= JoyButton.LEFT;

    if (ballY > midY + 0x10) input |= JoyButton.DOWN;
    else if (ballY < midY - 0x10) input |= JoyButton.UP;
  }

  // 接近球时: 按 A 抢断 / 传球
  if (ballX > 0) {
    const dx = Math.abs(ballX - midX);
    const dy = Math.abs(ballY - midY);
    if (dx < 0x18 && dy < 0x18) {
      if (side === 0) {
        input |= JoyButton.A;
      }
    }
  }

  // 周期性按 B 传球 (每30帧一次)
  if (info.stageFrames % 30 < 3) {
    input |= JoyButton.B;
  }

  return makeDecision(sys, info, GameScene.MATCH,
    input,
    `match: ball=(${ballX.toString(16)},${ballY.toString(16)}) side=${side.toString(16)} player=${playerId.toString(16)} active=${activePlayers} input=${input.toString(16)}`);
}

// ═══════════════════════ Cutscene ═══════════════════════

function decideCutscene(sys: SystemState, info: FrameInfo): AIDecision {
  // 过场: 等待动画播放，每120帧按一次 START 尝试跳过
  const skipInterval = 120;
  const input = (info.stageFrames > 30 && info.stageFrames % skipInterval === 0)
    ? JoyButton.START
    : 0;
  return makeDecision(sys, info, GameScene.CUTSCENE,
    input,
    input ? 'cutscene: try skip' : 'cutscene: wait');
}

// ═══════════════════════ 通用等待 ═══════════════════════

function decideWait(sys: SystemState, info: FrameInfo, reason: string): AIDecision {
  return makeDecision(sys, info, GameScene.GOAL_SCENE, 0, reason);
}

// ═══════════════════════ Unknown ═══════════════════════

function decideUnknown(sys: SystemState, info: FrameInfo): AIDecision {
  // 未知场景: 等待，不主动按键避免误操作
  // 偶尔按 A 尝试唤醒
  const mode = sys.mem[0x0700];
  if (mode === 0x01) {
    // match 模式下未知状态 → 可能正在初始化，等待即可
    return makeDecision(sys, info, GameScene.UNKNOWN, 0, 'unknown/match: wait');
  }
  const input = info.stageFrames > 120 && info.stageFrames % 60 === 0
    ? JoyButton.A : 0;
  return makeDecision(sys, info, GameScene.UNKNOWN,
    input,
    input ? 'unknown: try A' : 'unknown: wait');
}

// ═══════════════════════ 辅助 ═══════════════════════

function makeDecision(
  sys: SystemState, info: FrameInfo,
  scene: GameScene, input: number, reason: string,
): AIDecision {
  const snapshot: Record<string, number> = {
    mode: sys.mem[0x0700],
    sub: sys.mem[0x0027],
    side: sys.mem[0x05FB],
    player: sys.mem[0x0441],
    ballX: sys.mem[0x0635],
    ballY: sys.mem[0x0637],
    active: sys.mem[0x0600],
    match: sys.mem[0x043B],
    event: sys.mem[0x0612],
  };

  return {
    frame: info.frame,
    scene,
    input,
    reason,
    stateSnapshot: snapshot,
  };
}

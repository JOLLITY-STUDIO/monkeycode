/**
 * 场景感知器 — 从 SystemState 识别当前游戏场景
 */
import type { SystemState } from '../../native-game/tsubasa/banks/system-state';
import { GameScene } from './types';

/** 核心内存地址 */
const ADDR = {
  GAME_MODE:     0x0700,  // 游戏模式 (0x33=标题, 0x01=游戏开始)
  SUB_STATE:     0x0027,  // 场景子状态 (0-5)
  SIDE:          0x05FB,  // 方队 (0=TeamA, 0x0B=TeamB)
  CURRENT_PLAYER:0x0441,  // 当前球员
  BALL_X:        0x0635,  // 球 X
  BALL_Y:        0x0637,  // 球 Y
  ACTIVE_PLAYERS:0x0600,  // 活跃球员数
  PLAYER_COUNT:  0x0600,  // 同 active players
  MATCH_STATE:   0x043B,  // 比赛状态
  EVENT_CMD:     0x0612,  // 事件命令
  CURSOR_FLAGS:  0x00ED,  // 光标/菜单标志
  SCENE_FLAGS:   0x0516,  // 场景标记
  SCENE_PROG:    0x0539,  // 场景进度
  JOYPAD1:       0x001E,  // 手柄 1
};

/**
 * 场景识别 — 根据内存状态判断当前游戏场景
 */
export function perceiveScene(sys: SystemState): GameScene {
  const mode = sys.mem[ADDR.GAME_MODE];
  const subState = sys.mem[ADDR.SUB_STATE];
  const activePlayers = sys.mem[ADDR.ACTIVE_PLAYERS];

  // ── 标题画面 ──
  if (mode === 0x33) {
    return GameScene.TITLE;
  }

  // ── 启动阶段 ──
  if (mode === 0x00 && subState === 0) {
    return GameScene.BOOT;
  }

  // ── 比赛模式 ($0700=0x01: 已进入比赛引擎) ──
  // 优先判断 $0700=0x01, 因为标题画面退出后直接进入比赛模式
  // sub=0: 比赛初始化/加载中; sub=1/2: 比赛中; sub=3/4: 过场/进球
  if (mode === 0x01) {
    if (subState === 3 || subState === 4) {
      const ballX = sys.mem[ADDR.BALL_X];
      if (ballX < 0x30 || ballX >= 0xD0) {
        return GameScene.GOAL_SCENE;
      }
      return GameScene.CUTSCENE;
    }
    // sub=0/1/2: 比赛引擎运行中
    return GameScene.MATCH;
  }

  // ── 菜单 (备用: $0700 不是 0x01 也不是 0x33) ──
  if (subState === 1 || subState === 2) {
    if (activePlayers > 0 && sys.mem[ADDR.BALL_X] !== 0) {
      return GameScene.MATCH;
    }
    return GameScene.MENU;
  }

  // ── 通用比赛检测 (备用) ──
  if (activePlayers > 0) {
    return GameScene.MATCH;
  }

  // ── 选队 ──
  if (subState === 5) {
    return GameScene.TEAM_SELECT;
  }

  // ── 未知 ──
  return GameScene.UNKNOWN;
}

/**
 * 提取关键状态快照 (用于日志)
 */
export function snapshotState(sys: SystemState): Record<string, number> {
  return {
    mode:        sys.mem[ADDR.GAME_MODE],
    subState:    sys.mem[ADDR.SUB_STATE],
    side:        sys.mem[ADDR.SIDE],
    player:      sys.mem[ADDR.CURRENT_PLAYER],
    ballX:       sys.mem[ADDR.BALL_X],
    ballY:       sys.mem[ADDR.BALL_Y],
    active:      sys.mem[ADDR.ACTIVE_PLAYERS],
    matchState:  sys.mem[ADDR.MATCH_STATE],
    eventCmd:    sys.mem[ADDR.EVENT_CMD],
    joypad:      sys.mem[ADDR.JOYPAD1],
    cursor:      sys.mem[ADDR.CURSOR_FLAGS],
  };
}

/**
 * 检测场景是否改变
 */
export function sceneChanged(prev: GameScene, curr: GameScene): boolean {
  return prev !== curr;
}

/**
 * 返回场景的中文描述
 */
export function sceneLabel(scene: GameScene): string {
  const labels: Record<string, string> = {
    [GameScene.BOOT]:        '系统启动',
    [GameScene.TITLE]:       '标题画面',
    [GameScene.MENU]:        '菜单选择',
    [GameScene.TEAM_SELECT]: '球队选择',
    [GameScene.CUTSCENE]:    '过场动画',
    [GameScene.MATCH]:       '比赛进行',
    [GameScene.GOAL_SCENE]:  '进球场景',
    [GameScene.HALFTIME]:    '中场休息',
    [GameScene.GAME_OVER]:   '游戏结束',
    [GameScene.ENDING]:      '通关结局',
    [GameScene.PAUSED]:      '暂停',
    [GameScene.UNKNOWN]:     '未知场景',
  };
  return labels[scene] ?? `未知(${scene})`;
}

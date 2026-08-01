/**
 * AI Player 核心类型定义
 */

import type { SystemState } from '../../native-game/tsubasa/banks/system-state';

/** 游戏场景类型 */
export enum GameScene {
  UNKNOWN      = 'unknown',
  BOOT         = 'boot',
  TITLE        = 'title',
  MENU         = 'menu',
  TEAM_SELECT  = 'team_select',
  CUTSCENE     = 'cutscene',
  MATCH        = 'match',
  GOAL_SCENE   = 'goal_scene',
  HALFTIME     = 'halftime',
  GAME_OVER    = 'game_over',
  ENDING       = 'ending',
  PAUSED       = 'paused',
}

/** 手柄按钮位掩码 */
export const enum JoyButton {
  RIGHT  = 0x01,
  LEFT   = 0x02,
  DOWN   = 0x04,
  UP     = 0x08,
  START  = 0x10,
  SELECT = 0x20,
  B      = 0x40,
  A      = 0x80,
}

/** AI 决策记录 */
export interface AIDecision {
  frame: number;
  scene: GameScene;
  input: number;           // 注入的按钮值 (JoyButton 复合)
  reason: string;
  stateSnapshot: Record<string, number>;  // 关键状态快照
}

/** 帧日志 */
export interface FrameLog {
  frame: number;
  scene: GameScene;
  input: number;
  keyState: Record<string, number>;
  decision: string;
  duration: number;  // ms
}

/** 流程检查点 */
export interface FlowCheckpoint {
  frame: number;
  scene: GameScene;
  label: string;
  passed: boolean;
  detail: string;
}

/** 游戏流程阶段 */
export enum FlowStage {
  BOOTING        = 'booting',
  TITLE_SCREEN   = 'title_screen',
  MENU_NAVIGATE  = 'menu_navigate',
  TEAM_SELECT    = 'team_select',
  PRE_MATCH      = 'pre_match',
  MATCH_PLAYING  = 'match_playing',
  HALFTIME       = 'halftime',
  SECOND_HALF    = 'second_half',
  POST_MATCH     = 'post_match',
  ENDING         = 'ending',
  COMPLETE       = 'complete',
  ERROR          = 'error',
}

/** AI Player 配置 */
export interface AIPlayerConfig {
  /** 加速倍数 (跳帧) — 0 表示不加速 */
  speedMultiplier: number;
  /** 最大帧数 (防止死循环) */
  maxFrames: number;
  /** 是否记录详细日志 */
  verbose: boolean;
  /** 日志输出路径 */
  logPath: string;
  /** 是否在错误时停止 */
  stopOnError: boolean;
  /** AI 决策延迟帧 (模拟人类反应) */
  reactionFrames: number;
}

/** 决策函数类型 */
export type DecideFn = (sys: SystemState, scene: GameScene, frameInfo: FrameInfo) => AIDecision;
export type PerceiveFn = (sys: SystemState) => GameScene;
export type ValidateFn = (sys: SystemState, stage: FlowStage, logs: FrameLog[]) => FlowCheckpoint;

export interface FrameInfo {
  frame: number;
  scene: GameScene;
  prevInput: number;
  stage: FlowStage;
  stageFrames: number;
  totalFrames: number;
  stuckCounter: number;
}

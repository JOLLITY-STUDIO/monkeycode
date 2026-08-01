/**
 * 流程验证器 — 检查游戏进度是否合理
 */
import type { SystemState } from '../../native-game/tsubasa/banks/system-state';
import type { FrameLog, FlowCheckpoint } from './types';
import { GameScene, FlowStage } from './types';
import { sceneLabel } from './scene-perceptor';

/**
 * 根据当前状态判断流程阶段
 */
export function detectFlowStage(sys: SystemState, scene: GameScene): FlowStage {
  const mode = sys.mem[0x0700];
  const subState = sys.mem[0x0027];

  if (mode === 0x00 || (mode === 0x33 && sys.frameCount < 10)) {
    return FlowStage.BOOTING;
  }
  if (mode === 0x33) {
    return FlowStage.TITLE_SCREEN;
  }
  if (mode === 0x01 && (subState === 1 || subState === 2)) {
    return FlowStage.MENU_NAVIGATE;
  }
  if (subState === 5) {
    return FlowStage.TEAM_SELECT;
  }
  // Match check
  if (sys.mem[0x0600] > 0) {
    const matchState = sys.mem[0x043B];
    if (matchState >= 3) return FlowStage.SECOND_HALF;
    if (matchState >= 2) return FlowStage.HALFTIME;
    return FlowStage.MATCH_PLAYING;
  }
  return FlowStage.POST_MATCH;
}

/**
 * 流程合理性验证 — 返回检查点
 */
export function validateFlow(
  sys: SystemState,
  stage: FlowStage,
  prevStage: FlowStage,
  logs: FrameLog[],
): FlowCheckpoint {
  const scene = scene as any; // use current scene detection

  // 阶段不可回退检查
  const stageOrder: FlowStage[] = [
    FlowStage.BOOTING,
    FlowStage.TITLE_SCREEN,
    FlowStage.MENU_NAVIGATE,
    FlowStage.TEAM_SELECT,
    FlowStage.PRE_MATCH,
    FlowStage.MATCH_PLAYING,
    FlowStage.HALFTIME,
    FlowStage.SECOND_HALF,
    FlowStage.POST_MATCH,
    FlowStage.ENDING,
    FlowStage.COMPLETE,
  ];

  const currentIdx = stageOrder.indexOf(stage);
  const prevIdx = stageOrder.indexOf(prevStage);

  // 异常回退
  if (currentIdx < prevIdx && prevStage !== FlowStage.ERROR) {
    return {
      frame: sys.frameCount,
      scene: GameScene.UNKNOWN,
      label: `流程回退: ${prevStage} → ${stage}`,
      passed: false,
      detail: `游戏从 ${prevStage} 回退到 ${stage}，异常! 帧: ${sys.frameCount}`,
    };
  }

  // 停滞检测
  const stuckThreshold = 1000;
  const sameSceneFrames = countSameSceneFrames(logs);
  if (sameSceneFrames > stuckThreshold) {
    return {
      frame: sys.frameCount,
      scene: GameScene.UNKNOWN,
      label: `停滞检测: 同一场景 ${sameSceneFrames} 帧`,
      passed: false,
      detail: `游戏在同一场景停滞 ${sameSceneFrames} 帧，可能卡死`,
    };
  }

  // 通过
  return {
    frame: sys.frameCount,
    scene: GameScene.UNKNOWN,
    label: `流程正常: ${stage}`,
    passed: true,
    detail: `当前阶段 ${stage}，运行正常`,
  };
}

function countSameSceneFrames(logs: FrameLog[]): number {
  if (logs.length === 0) return 0;

  const lastScene = logs[logs.length - 1].scene;
  let count = 0;
  for (let i = logs.length - 1; i >= 0; i--) {
    if (logs[i].scene === lastScene) count++;
    else break;
  }
  return count;
}

/**
 * 检查是否有任何进展 (帧间状态变化)
 */
export function detectStuck(
  sys: SystemState,
  prevSys: SystemState | null,
): boolean {
  if (!prevSys) return false;

  // 检查关键内存是否变化
  const keys = [0x0700, 0x0027, 0x05FB, 0x0441, 0x0600, 0x043B, 0x0612];
  for (const addr of keys) {
    if (sys.mem[addr] !== prevSys.mem[addr]) return false; // 有变化 = 没卡死
  }

  // 所有关键地址都没变 → 可能卡死
  return true;
}

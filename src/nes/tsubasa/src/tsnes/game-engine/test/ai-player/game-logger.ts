/**
 * 游戏日志系统 — 记录每帧操作、状态变化、流程检查点
 */
import * as fs from 'fs';
import * as path from 'path';
import type { FrameLog, FlowCheckpoint, AIDecision } from './types';
import { GameScene, FlowStage } from './types';
import { sceneLabel } from './scene-perceptor';

export class GameLogger {
  private logs: FrameLog[] = [];
  private checkpoints: FlowCheckpoint[] = [];
  private startTime: number;
  private lastScene: GameScene = GameScene.UNKNOWN;
  private sceneEntryFrame: number = 0;
  private outputPath: string;
  private verbose: boolean;
  private totalInputs: number = 0;
  private totalFrames: number = 0;
  private sceneDurations: Map<GameScene, number> = new Map();

  constructor(outputPath: string, verbose: boolean) {
    this.outputPath = outputPath;
    this.verbose = verbose;
    this.startTime = Date.now();
  }

  /** 记录一帧 */
  logFrame(frame: number, scene: GameScene, decision: AIDecision, elapsedMs: number): void {
    this.totalFrames++;
    if (decision.input !== 0) this.totalInputs++;

    // 场景切换
    if (scene !== this.lastScene) {
      const duration = frame - this.sceneEntryFrame;
      if (this.lastScene !== GameScene.UNKNOWN) {
        this.sceneDurations.set(this.lastScene,
          (this.sceneDurations.get(this.lastScene) ?? 0) + duration);
        if (this.verbose) {
          console.log(`  [场景切换] ${sceneLabel(this.lastScene)} → ${sceneLabel(scene)} (持续 ${duration} 帧)`);
        }
      }
      this.lastScene = scene;
      this.sceneEntryFrame = frame;
    }

    const entry: FrameLog = {
      frame,
      scene,
      input: decision.input,
      keyState: decision.stateSnapshot,
      decision: decision.reason,
      duration: elapsedMs,
    };

    this.logs.push(entry);

    // 详细日志 (每10帧一次或有输入时)
    if (this.verbose && (frame % 10 === 0 || decision.input !== 0)) {
      const inputStr = decision.input !== 0
        ? `输入:0x${decision.input.toString(16).padStart(2,'0')}`
        : '无输入';
      console.log(`  [帧 ${frame}] ${sceneLabel(scene)} | ${inputStr} | ${decision.reason}`);
    }
  }

  /** 记录检查点 */
  checkpoint(label: string, scene: GameScene, passed: boolean, detail: string): void {
    const cp: FlowCheckpoint = {
      frame: this.totalFrames,
      scene,
      label,
      passed,
      detail,
    };
    this.checkpoints.push(cp);

    const icon = passed ? '✅' : '❌';
    console.log(`\n${icon} [检查点] 帧 ${this.totalFrames} | ${label}`);
    console.log(`   ${detail}`);
    if (!passed) {
      console.log(`   ⚠️ 检查未通过!`);
    }
  }

  /** 获取当前帧数 */
  get totalFramesCount(): number { return this.totalFrames; }

  /** 写入最终报告 */
  writeReport(finalStage: FlowStage): string {
    const elapsed = Date.now() - this.startTime;
    const reportLines: string[] = [];

    reportLines.push('');
    reportLines.push('═'.repeat(70));
    reportLines.push('                AI PLAYER 游戏流程报告');
    reportLines.push('═'.repeat(70));
    reportLines.push('');
    reportLines.push(`  状态:       ${finalStage}`);
    reportLines.push(`  总帧数:     ${this.totalFrames}`);
    reportLines.push(`  总时间:     ${(elapsed / 1000).toFixed(2)}s`);
    reportLines.push(`  输入事件:   ${this.totalInputs}`);
    reportLines.push(`  平均帧率:   ${(this.totalFrames / (elapsed / 1000)).toFixed(1)} fps`);
    reportLines.push('');

    reportLines.push('── 各场景耗时 ──');
    for (const [scene, frames] of this.sceneDurations) {
      reportLines.push(`  ${sceneLabel(scene).padEnd(12)} ${frames} 帧`);
    }
    reportLines.push('');

    reportLines.push('── 流程检查点 ──');
    for (const cp of this.checkpoints) {
      const icon = cp.passed ? '✅' : '❌';
      reportLines.push(`  ${icon} 帧${cp.frame.toString().padStart(6)} | ${cp.label.padEnd(20)} | ${cp.detail}`);
    }
    reportLines.push('');

    reportLines.push('── 决策摘要 (前50条+后20条) ──');
    const toShow = [
      ...this.logs.slice(0, 50).filter(l => l.input !== 0),
      ...(this.logs.length > 200
        ? [{ frame: -1, scene: GameScene.UNKNOWN, input: 0, keyState: {}, decision: '... 省略中间帧 ...', duration: 0 } as FrameLog]
        : []),
      ...this.logs.slice(-20).filter(l => l.input !== 0),
    ];
    for (const log of toShow) {
      if (log.frame === -1) {
        reportLines.push(`  ...`);
        continue;
      }
      reportLines.push(
        `  帧${log.frame.toString().padStart(6)} | ${sceneLabel(log.scene).padEnd(12)} | ` +
        `输入:0x${log.input.toString(16).padStart(2,'0')} | ${log.decision}`);
    }
    reportLines.push('');

    reportLines.push('── 完整帧日志 (输入事件) ──');
    const inputEvents = this.logs.filter(l => l.input !== 0);
    reportLines.push(`  共 ${inputEvents.length} 个输入事件:`);
    for (const log of inputEvents) {
      reportLines.push(
        `  帧${log.frame.toString().padStart(6)} | ${sceneLabel(log.scene).padEnd(12)} | ` +
        `0x${log.input.toString(16).padStart(2,'0')} | ${log.decision}`);
    }

    reportLines.push('');
    reportLines.push('═'.repeat(70));
    reportLines.push(`  报告生成时间: ${new Date().toISOString()}`);
    reportLines.push('═'.repeat(70));

    const report = reportLines.join('\n');

    // 写入文件
    const dir = path.dirname(this.outputPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(this.outputPath, report, 'utf-8');

    return report;
  }

  /** 写入 JSON 日志 (结构化数据, 供脚本解析) */
  writeJsonLog(jsonPath: string): void {
    const dir = path.dirname(jsonPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const data = {
      totalFrames: this.totalFrames,
      totalInputs: this.totalInputs,
      elapsedMs: Date.now() - this.startTime,
      checkpoints: this.checkpoints,
      sceneDurations: Object.fromEntries(this.sceneDurations),
      inputEvents: this.logs.filter(l => l.input !== 0).map(l => ({
        frame: l.frame,
        scene: l.scene,
        input: l.input,
        reason: l.decision,
        state: l.keyState,
      })),
    };

    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf-8');
  }
}

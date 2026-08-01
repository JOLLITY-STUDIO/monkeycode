/**
 * AI Player 主运行器 — 自动游玩游戏，记录每一步操作
 *
 * 用法: npx tsx game-engine/test/ai-player/run-ai-player.ts
 *
 * 功能:
 *   1. 启动游戏 (boot.ts → translate_BANK31_RESET)
 *   2. 逐帧运行主循环 (tick_BANK31_mainLoop)
 *   3. AI 感知场景 → 决策按钮 → 注入输入
 *   4. 记录每一步操作到日志
 *   5. 验证流程合理性
 *   6. 自动加速 (跳帧)
 *   7. 跑到通关或报错
 */

import * as path from 'path';
import type { SystemState } from '../../native-game/tsubasa/banks/system-state';
import { createSystemState } from '../../native-game/tsubasa/banks/system-state';
import { translate_BANK31_RESET, tick_BANK31_mainLoop } from '../../native-game/tsubasa/banks/prg/bank-31-code';

import type { AIDecision, AIPlayerConfig, FrameInfo } from './types';
import { GameScene, FlowStage, JoyButton } from './types';
import { perceiveScene, snapshotState, sceneLabel } from './scene-perceptor';
import { aiDecide } from './ai-decision';
import { GameLogger } from './game-logger';
import { detectFlowStage, validateFlow, detectStuck } from './flow-validator';

// ═══════════════════════════════════════════
// Mock PPU/APU (同 test-bank-31 的方式)
// ═══════════════════════════════════════════

function createMockPPU() {
  let ctrl1 = 0, ctrl2 = 0, statusReg = 0;
  let vramAddr = 0, sramAddr = 0;
  const vram = new Uint8Array(0x4000);
  const sram = new Uint8Array(0x100);
  const oam = new Uint8Array(0x100);

  return {
    updateControlReg1(v: number) { ctrl1 = v; },
    updateControlReg2(v: number) { ctrl2 = v; },
    readStatusRegister() { const s = statusReg; statusReg &= 0x7F; return s; },
    sramLoad() { return sram[sramAddr & 0xFF]; },
    vramLoad() { return vram[vramAddr & 0x3FFF]; },
    writeSRAMAddress(v: number) { sramAddr = (sramAddr & 0xFF00) | v; },
    sramWrite(v: number) { sram[sramAddr & 0xFF] = v; sramAddr++; },
    scrollWrite(v: number) { /* scroll */ },
    writeVRAMAddress(v: number) { vramAddr = (vramAddr & 0x00FF) | (v << 8); },
    vramWrite(v: number) { vram[vramAddr & 0x3FFF] = v; vramAddr++; },
    sramDMA(v: number) {
      const base = (v & 0x07) << 8;
      for (let i = 0; i < 0x100; i++) oam[i] = sram[(base + i) & 0xFF];
    },
    // Extra fields
    nes: null as any,
    vramMem: vram,
    sramMem: sram,
    oamMem: oam,
    getCtrl1() { return ctrl1; },
    getCtrl2() { return ctrl2; },
  };
}

function createMockAPU() {
  return {
    writeReg(_addr: number, _val: number) {},
  };
}

// ═══════════════════════════════════════════
// 默认配置
// ═══════════════════════════════════════════

const DEFAULT_CONFIG: AIPlayerConfig = {
  speedMultiplier: 5,     // 5倍速: 每5帧做1次决策
  maxFrames: 60000,       // 最大60k帧 ≈ 16分钟 (60fps)
  verbose: true,
  logPath: path.resolve(__dirname, 'output', 'ai-player-report.txt'),
  stopOnError: false,
  reactionFrames: 3,      // 3帧反应时间
};

// ═══════════════════════════════════════════
// AI Player 类
// ═══════════════════════════════════════════

class AIPlayer {
  private sys!: SystemState;
  private config: AIPlayerConfig;
  private logger: GameLogger;
  private scene: GameScene = GameScene.BOOT;
  private prevScene: GameScene = GameScene.BOOT;
  private stage: FlowStage = FlowStage.BOOTING;
  private prevStage: FlowStage = FlowStage.BOOTING;
  private prevInput: number = 0;
  private stageFrames: number = 0;
  private stuckCounter: number = 0;
  private prevStateMem: Uint8Array | null = null;
  private frame: number = 0;
  private running: boolean = true;
  private jsonLogPath: string;

  constructor(config: Partial<AIPlayerConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.logger = new GameLogger(this.config.logPath, this.config.verbose);
    this.jsonLogPath = this.config.logPath.replace('.txt', '.json');
  }

  /** 初始化游戏 */
  init(): void {
    console.log('═'.repeat(60));
    console.log('         AI PLAYER — 天使之翼2 自动通关系统');
    console.log('═'.repeat(60));
    console.log(`  加速倍数: ${this.config.speedMultiplier}x`);
    console.log(`  最大帧数: ${this.config.maxFrames}`);
    console.log(`  日志路径: ${this.config.logPath}`);
    console.log('═'.repeat(60));
    console.log('');

    // 创建 Mock PPU/APU
    const ppu = createMockPPU() as any;
    const papu = createMockAPU() as any;

    // 创建 SystemState
    this.sys = createSystemState(ppu, papu);

    console.log('[AI] 系统初始化完成');
    console.log('[AI] 开始执行 RESET...');

    // 执行 RESET → 进入游戏
    try {
      translate_BANK31_RESET(this.sys);
    } catch (e: any) {
      console.log(`[AI] RESET 阶段错误: ${e.message}`);
      this.logger.checkpoint('RESET', GameScene.BOOT, false, `RESET 异常: ${e.message}`);
      // 继续运行看是否能恢复
    }

    console.log('[AI] RESET 完成，进入主循环');
    this.logger.checkpoint('游戏启动', GameScene.BOOT, true, 'RESET 向量执行完成');
  }

  /** 运行主循环 */
  async run(): Promise<void> {
    this.init();

    let tickIdx = 0;
    const N = this.config.speedMultiplier;

    while (this.running && this.frame < this.config.maxFrames) {
      // ═══════════════════ 加速: 每 N 帧做一次 AI 决策 ═══════════════════
      if (tickIdx % N === 0) {
        const frameStart = Date.now();

        // 感知场景
        this.scene = perceiveScene(this.sys);

        if (this.scene !== this.prevScene) {
          this.stageFrames = 0;
          this.stuckCounter = 0;
          if (this.config.verbose) {
            console.log(`\n[场景变化] ${sceneLabel(this.prevScene)} → ${sceneLabel(this.scene)} (帧 ${this.frame})`);
          }
        }

        // 流程阶段检测
        this.stage = detectFlowStage(this.sys, this.scene);

        if (this.stage !== this.prevStage) {
          this.logger.checkpoint(
            `进入: ${this.stage}`,
            this.scene,
            true,
            `从 ${this.prevStage} → ${this.stage}，帧 ${this.frame}`,
          );
          this.prevStage = this.stage;
        }

        // 停滞检测
        if (detectStuck(this.sys, this.prevStateMem ? { ...this.sys, mem: this.prevStateMem } as any : null)) {
          this.stuckCounter++;
          if (this.stuckCounter > 300) {
            console.log(`\n⚠️ [停滞警告] 帧 ${this.frame}: 连续 ${this.stuckCounter} 决策帧无状态变化`);
            this.logger.checkpoint('停滞检测', this.scene, false,
              `连续 ${this.stuckCounter} 决策帧无状态变化，可能卡死`);
            if (this.config.stopOnError) break;
          }
        } else {
          this.stuckCounter = 0;
        }

        // 保存当前状态副本
        this.prevStateMem = new Uint8Array(this.sys.mem);

        // ═══════════════════ AI 决策 ═══════════════════
        const frameInfo: FrameInfo = {
          frame: this.frame,
          scene: this.scene,
          prevInput: this.prevInput,
          stage: this.stage,
          stageFrames: this.stageFrames,
          totalFrames: this.frame,
          stuckCounter: this.stuckCounter,
        };

        const decision = this.aiDecide(frameInfo);

        // ═══════════════════ 注入输入 ═══════════════════
        this.sys.mem[0x001C] = this.prevInput;
        this.sys.mem[0x001E] = decision.input;
        this.prevInput = decision.input;

        // ═══════════════════ 日志 ═══════════════════
        const elapsed = Date.now() - frameStart;
        this.logger.logFrame(this.frame, this.scene, decision, elapsed);

        // 进度报告 (每1000帧)
        if (this.frame % 1000 === 0) {
          const snap = snapshotState(this.sys);
          console.log(`  [进度] 帧 ${this.frame}/${this.config.maxFrames} | ` +
            `${sceneLabel(this.scene)} | mode=0x${snap.mode.toString(16)} sub=0x${snap.subState.toString(16)}`);
        }

        this.prevScene = this.scene;
      }

      // ═══════════════════ 运行游戏 tick (每帧都运行) ═══════════════════
      try {
        tick_BANK31_mainLoop(this.sys);
      } catch (e: any) {
        this.logger.checkpoint('帧运行错误', this.scene, false,
          `帧 ${this.frame} 异常: ${e.message}`);
        console.log(`\n❌ [错误] 帧 ${this.frame}: ${e.message}`);
        if (this.config.stopOnError) {
          this.running = false;
          break;
        }
        this.sys.mem[0x001E] = 0;
      }

      this.frame++;
      this.stageFrames++;
      tickIdx++;

      // 通关检测
      if (this.stage === FlowStage.COMPLETE || this.stage === FlowStage.ENDING) {
        console.log('\n🎉 游戏通关!');
        this.logger.checkpoint('通关', this.scene, true, '游戏流程完成');
        break;
      }

      // 错误状态检测
      if (this.stage === FlowStage.ERROR) {
        console.log('\n❌ 游戏进入错误状态');
        break;
      }
    }

    // ═══════════════════ 最终报告 ═══════════════════
    this.finish();
  }

  /** AI 决策 (带错误处理) */
  private aiDecide(info: FrameInfo): AIDecision {
    try {
      return aiDecide(this.sys, this.scene, info);
    } catch (e: any) {
      return {
        frame: info.frame,
        scene: this.scene,
        input: 0,
        reason: `决策错误: ${e.message}`,
        stateSnapshot: snapshotState(this.sys),
      };
    }
  }

  /** 完成 */
  private finish(): void {
    this.running = false;

    // 写文本报告
    const report = this.logger.writeReport(this.stage);
    console.log(report);

    // 写 JSON 日志
    this.logger.writeJsonLog(this.jsonLogPath);
    console.log(`\n[JSON日志] ${this.jsonLogPath}`);

    const totalElapsed = (Date.now() - (this.logger as any).startTime || 0) / 1000;
    console.log(`\n总耗时: ${totalElapsed.toFixed(2)}s`);
    console.log(`最终阶段: ${this.stage}`);
    console.log(`总帧数: ${this.frame}`);
    console.log('\n═'.repeat(60));
    console.log('  AI PLAYER 运行结束');
    console.log('═'.repeat(60));
  }
}

// ═══════════════════════════════════════════
// 入口
// ═══════════════════════════════════════════

async function main() {
  const player = new AIPlayer({
    speedMultiplier: 5,
    maxFrames: 60000,
    verbose: true,
    stopOnError: false,
  });

  await player.run();

  // 退出码
  const stage = (player as any).stage;
  if (stage === FlowStage.COMPLETE || stage === FlowStage.ENDING) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('AI Player 致命错误:', err);
  process.exit(1);
});

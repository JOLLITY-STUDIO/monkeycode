/**
 * Scene0Controller — 场景 0 主循环翻译（opening screen / title menu）
 *
 * ⚠️ 职责归类（BUG #014 + OpeningScene 接管）：
 *   - **boot logo + 完整片头（NES f10-f3599：Tecmo logo / NTV / 10 屏字幕 / story_cup）
 *     不属于 Scene0** —— 由 OpeningSceneController（sceneId=100，GT 表驱动）播放
 *   - Scene0 真实窗口 = **NES f3600-f4096**（emu-full GT 实证）：
 *     BgFadeOut 渐隐 story_cup → Drift30 → 标题装载 → 显示/滚动 → FadeOutAll
 *   - Scene0 主体 = PRG $84C1-$8559 主菜单展开序列（从 BgFadeOut 起，无 boot FadeIn）
 *
 * @bank 02 ($A000-$BFFF 在 R7=2) / ROM $A4C1-$A558（Scene0 handler 入口）
 *
 * ROM 序列（code_sub.s $84C1-$8559，Scene0 主展开序列，**不是 first frame**）：
 *   JSR $9A0D        → BG 渐隐（fade.bg→0，每帧 fadeWrite）
 *   LDA #$10/$9FA8   → 等 16 帧
 *   LDY #$30 循环    → 0x30 次：每帧 [等 1 帧 + 所有精灵 Y+=1]
 *   $005B=0 $007B=0
 *   LDA #$17/$8AF7   → loadChrConfig(0x17)
 *   $0044=$68        → scrollY = 0x68
 *   LDA #$03/$8920   → loadSceneData(3)
 *   $0090=$008E $0091=$008F → 滚动指针复制
 *   LDA #$04/$9FA8   → 等 4 帧
 *   JSR $9A35        → BG 调色板组 0 + fade 满亮
 *   JSR $88FB        → 所有精灵 attr ^= $20
 *   滚动循环         → 每帧 [$0079++ + $007C-=2 + $0044-=2]
 *   LDA #$00/$8920   → loadSceneData(0)
 *   $001B|=1
 *   LDA #$F0/$9FA8   → 等 240 帧 → 再等 60 帧
 *   $001B&=~1        → 滚动复位
 *   JSR $99F0        → BG+SPR 渐隐
 *   JSR $9B7F        → hideOam
 *   JSR $98A0        → 清 NT
 *   $23C0 填充       → 2 行 × 0x20 字节 = 0x55
 *   LDA #$01/$8920   → loadSceneData(1)
 *   LDA #$02 / RTS   → 返回 2（hub idle）
 *
 * H5 落地（去 CPU 化）：
 *   - 全部"等 N 帧"由 Bank00SchedulerService 派发（PRG $9FA8 pushState 翻译）
 *   - phase 推进通过 waitDone flag + scheduleAfter() 统一接口
 *   - 不再用 this.counter 手写自减
 *   - Wait240 + Wait60 是两段独立调度（240 帧 → 60 帧 → ResetScroll），
 *     共 300 帧（与原 ROM 一致）
 */
import { SceneController } from './SceneController';
import type { NtStreamLoaderService } from '../system/NtStreamLoaderService';
import type { SceneStateMachine } from '../system/SceneStateMachine';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
import type { AudioService } from '../audio/AudioService';
export declare class Scene0Controller extends SceneController {
    readonly sceneId = 0;
    private readonly prim;
    private readonly tileBuilder;
    private ntStreamLoader;
    private sceneStateMachine;
    private audio;
    private phase;
    /**
     * scheduler callback 抵达标志（PRG $9FA8 pushState 翻译）：
     *   false → 等 timer 帧
     *   true  → 可以推进下一 phase / 执行阶段转换
     *
     * 由 Bank00SchedulerService 派发，替代手写 this.counter 自减。
     */
    private waitDone;
    /**
     * Drift30 phase per-frame loop counter — PRG LDY #$30 翻译。
     *
     * 准确语义：
     *   - ROM $84C9 LDY #$30（Y=48）
     *   - ROM $84D2 DEY / $84D5 BNE 循环（Y 自减到 0 退出）
     *   - ROM 内每次循环：$84CD JSR $9FA8（等 1 帧） + $84D0 JSR $890C（精灵 Y+=1）
     *
     * 与 waitDone 的关键差异：
     *   - waitDone = scheduler 等 N 帧（PRG LDA #$XX + JSR $9FA8）一次性
     *   - driftRemaining = CPU Y 寄存器循环 index，每帧自减 + 执行 per-frame action
     *
     * 数量级不同：
     *   - 16 帧 delay（PRG $84C4 LDA #$10）由 scheduler pushState 等帧
     *   - 48 次漂移（PRG $84C9 LDY #$30）由 driftRemaining 计数，每次 shift
     *
     * 初始化时机：Drift30 phase 进入前的 onArrival callback 内 set 为 0x30
     * 终止时机：0x30 次循环后 driftRemaining = 0，切到 Phase.LoadChr17
     */
    private driftRemaining;
    constructor(store: DataStore, input: InputService);
    attachAudio(audio: AudioService): void;
    attachNtStreamLoader(nt: NtStreamLoaderService): void;
    attachSceneStateMachine(sm: SceneStateMachine): void;
    /**
     * 调度下一 phase（PRG $9FA8 pushState 翻译）。
     *
     * 行为：
     *   1. 立即 phase = target
     *   2. waitDone = false（scheduler 抵达前不前进）
     *   3. pushState(timer) 入队 Bank00SchedulerService
     *   4. callback → waitDone = true → 调 onArrival
     *
     * @param target 目标 phase
     * @param timer 等待帧数（0 = 立即推进）
     * @param onArrival callback 抵达后执行（可选）
     */
    private scheduleNextPhase;
    onEnter(): void;
    onUpdate(_frame: number): number | undefined;
    onRender(): void;
}

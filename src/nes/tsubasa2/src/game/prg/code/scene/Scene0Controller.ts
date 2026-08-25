/**
 * Scene0Controller — 场景 0 完整 ROM 序列（bank02 $A4C1-$A558 逐指令翻译）
 *
 * @bank 02 ($8000-$9FFF) / ROM $A4C1-$A558
 *
 * ROM 序列（code_sub.s $84C1-$8559）：
 *   JSR $9A0D        → BG 渐隐（fade.bg→0，每帧 fadeWrite）
 *   LDA #$10/$9FA8   → 等 16 帧
 *   LDY #$30 循环    → 0x30 帧：每帧 [所有精灵 Y+=1]
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
 *   LDA #$F0/$9FA8   → 等 240 帧
 *   LDA #$3C/$9FA8   → 等 60 帧
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
 */
import { SceneController } from './SceneController';
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
import { TileBuilderService } from '../system/TileBuilderService';
import type { NtStreamLoaderService } from '../system/NtStreamLoaderService';
import type { SceneStateMachine } from '../system/SceneStateMachine';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
import type { AudioService } from '../audio/AudioService';

/** 状态机阶段 */
const enum Phase {
  Init = 0,
  FadeIn = 1,
  BgFadeOut = 2,
  Wait16 = 3,
  Drift30 = 4,
  LoadChr17 = 5,
  Wait4 = 6,
  FullBright = 7,
  FlipAttr = 8,
  Scroll51 = 9,
  StopScroll = 10,
  Wait240 = 11,
  Wait60 = 12,
  ResetScroll = 13,
  FadeOutAll = 14,
  Cleanup = 15,
  LoadBlock1 = 16,
  Done = 17,
}

export class Scene0Controller extends SceneController {
  readonly sceneId = 0;
  private readonly prim: RenderingPrimitivesService;
  private readonly tileBuilder: TileBuilderService;
  private ntStreamLoader: NtStreamLoaderService | null = null;
  private sceneStateMachine: SceneStateMachine | null = null;
  private audio: AudioService | null = null;
  private phase = Phase.Init;
  /**
   * scheduler callback 抵达标志（PRG $9FA8 pushState 翻译）：
   *   false → 等 timer 帧
   *   true  → 可以推进下一 phase / 执行阶段转换
   *
   * 由 Bank00SchedulerService 派发，替代手写 this.counter 自减。
   */
  private waitDone = true;
  /**
   * Drift30 phase per-frame loop counter（PRG LDY #$30 翻译）。
   * 与 waitDone 不同语义：Drift30 是 CPU Y 寄存器循环 index（per-frame action），
   * 而非 scheduler timer（等 N 帧）。
   */
  private driftRemaining = 0;

  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.prim = new RenderingPrimitivesService(store);
    this.tileBuilder = new TileBuilderService(store, null /* ppu wired at boot */);
  }

  attachAudio(audio: AudioService): void {
    this.audio = audio;
  }

  attachNtStreamLoader(nt: NtStreamLoaderService): void {
    this.ntStreamLoader = nt;
  }

  attachSceneStateMachine(sm: SceneStateMachine): void {
    this.sceneStateMachine = sm;
  }

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
  private scheduleNextPhase(target: Phase, timer: number, onArrival?: () => void): void {
    this.phase = target;
    this.waitDone = false;
    if (timer <= 0) {
      this.waitDone = true;
      if (onArrival) onArrival();
      return;
    }
    this.scheduleAfter(timer, () => {
      this.waitDone = true;
      if (onArrival) onArrival();
    });
  }

  onEnter(): void {
    // 首帧 boot: CHR + palette + OAM 全清 + Tecmo logo NT/sprite + bgm
    this.prim.loadChrConfig(0x17);
    this.prim.loadScene0Palettes();
    this.prim.hideOam();
    this.store.writeByte(0x005b, 1);
    this.prim.queueScene0LogoNt(0);
    this.prim.queueScene0LogoNt(1);
    this.prim.loadScene0Oam();
    this.audio?.playBgm(0x01);
    this.phase = Phase.FadeIn;
    this.waitDone = true;
  }

  onUpdate(_frame: number): number | undefined {
    const store = this.store;
    const prim = this.prim;
    switch (this.phase) {
      case Phase.FadeIn: {
        if (prim.fadeInStep()) {
          this.scheduleNextPhase(Phase.BgFadeOut, 0);
        }
        return undefined;
      }
      case Phase.BgFadeOut: {
        if (prim.fadeBgOutStep()) {
          // LDA #$10 / JSR $9FA8：等 16 帧后启动 Drift30 循环
          this.scheduleNextPhase(Phase.Drift30, 0x10, () => {
            // Drift30 phase entry: 启动 0x30 帧循环 (PRG LDY #$30)
            this.driftRemaining = 0x30;
          });
        }
        return undefined;
      }
      case Phase.Wait16: {
        // 兼容路径：若外部强行 phase = Wait16 → 等 16 帧后启动 Drift30
        if (!this.waitDone) return undefined;
        this.scheduleNextPhase(Phase.Drift30, 0x10, () => {
          this.driftRemaining = 0x30;
        });
        return undefined;
      }
      case Phase.Drift30: {
        // LDY #$30 循环：每帧 所有精灵 Y += 1（PRG $890C 翻译），共 0x30 帧
        this.tileBuilder.shiftAllSpriteY(1);
        this.driftRemaining = (this.driftRemaining - 1) & 0xff;
        if (this.driftRemaining === 0) {
          this.scheduleNextPhase(Phase.LoadChr17, 0);
        }
        return undefined;
      }
      case Phase.LoadChr17: {
        store.writeByte(0x005b, 0);
        store.writeByte(0x007b, 0);
        prim.loadChrConfig(0x17);
        if (this.sceneStateMachine) {
          this.sceneStateMachine.loadHandler(0x17);
        }
        if (this.ntStreamLoader) {
          const entries = this.ntStreamLoader.parseSceneStream(0x17);
          this.ntStreamLoader.applyEntries(entries);
        }
        store.writeByte(0x0049, 0x09);
        store.scene.scrollY = 0x68;
        prim.loadSceneData(3);
        store.writeByte(0x0090, store.readByte(0x008e));
        store.writeByte(0x0091, store.readByte(0x008f));
        // LDA #$04 / JSR $9FA8：等 4 帧后切 FullBright
        this.scheduleNextPhase(Phase.FullBright, 0x04);
        return undefined;
      }
      case Phase.Wait4: {
        if (!this.waitDone) return undefined;
        this.scheduleNextPhase(Phase.FullBright, 0x04);
        return undefined;
      }
      case Phase.FullBright: {
        prim.loadBgPalette(store.readByte(0x0048) & 0x3f);
        prim.loadSprPalette(store.readByte(0x0049) & 0x3f);
        store.fade.bg = 0x0f;
        store.fade.spr = 0x0f;
        prim.fadeWrite();
        this.scheduleNextPhase(Phase.FlipAttr, 0);
        return undefined;
      }
      case Phase.FlipAttr: {
        // PRG $88FB 翻译：所有精灵 attr ^= $20（水平翻转）
        this.tileBuilder.flipAllSpritePalettes();
        this.scheduleNextPhase(Phase.Scroll51, 0);
        return undefined;
      }
      case Phase.Scroll51: {
        // 滚动循环：每帧 [$0079++ + $007C-=2 + $0044-=2]，直到 $0044<3
        store.scene.scrollFlag = (store.scene.scrollFlag + 1) & 0xff;
        store.writeByte(0x007c, (store.readByte(0x007c) - 2) & 0xff);
        const y = (store.scene.scrollY - 2) & 0xff;
        store.scene.scrollY = y;
        if ((y & 0xff) < 0x03) {
          this.scheduleNextPhase(Phase.StopScroll, 0);
        }
        return undefined;
      }
      case Phase.StopScroll: {
        // LDA #$00 / JSR $8920 → loadSceneData(0) + $001B |= 1
        prim.loadSceneData(0);
        store.scene.flags = store.scene.flags | 0x01;
        // LDA #$F0 / JSR $9FA8：等 240 帧后切 ResetScroll
        this.scheduleNextPhase(Phase.ResetScroll, 0xf0);
        return undefined;
      }
      case Phase.Wait240: {
        if (!this.waitDone) return undefined;
        this.scheduleNextPhase(Phase.ResetScroll, 0xf0);
        return undefined;
      }
      case Phase.Wait60: {
        if (!this.waitDone) return undefined;
        this.scheduleNextPhase(Phase.ResetScroll, 0x3c);
        return undefined;
      }
      case Phase.ResetScroll: {
        store.scene.flags = store.scene.flags & 0xfe;
        store.writeByte(0x0090, 0);
        store.writeByte(0x0091, 2);
        this.scheduleNextPhase(Phase.FadeOutAll, 0);
        return undefined;
      }
      case Phase.FadeOutAll: {
        if (prim.fadeOutStep()) {
          this.scheduleNextPhase(Phase.Cleanup, 0);
        }
        return undefined;
      }
      case Phase.Cleanup: {
        prim.hideOam();
        prim.clearNametable();
        prim.fillNametableRows(0xc0, 0x23, 0x02, 0x20, 0x55);
        this.scheduleNextPhase(Phase.LoadBlock1, 0);
        return undefined;
      }
      case Phase.LoadBlock1: {
        prim.loadSceneData(1);
        this.phase = Phase.Done;
        return 0x02; // hub idle（Scene2）
      }
      default:
        return 0x02;
    }
  }

  onRender(): void {
    // 渲染全部由缓冲（NT 渲染/OAM/调色板）驱动，无需额外绘制
  }
}

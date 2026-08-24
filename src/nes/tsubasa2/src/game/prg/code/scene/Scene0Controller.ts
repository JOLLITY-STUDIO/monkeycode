/**
 * Scene0Controller — 场景 0（开场序列）
 *
 * 行为翻译（去 CPU 化）：
 *   1. 渐显 + 等 16 帧
 *   2. 精灵 Y 下漂 0x30 次
 *   3. 装载场景 3 NT（按行展开，renderCommit 消费）
 *   4. 调色板装载 + 满渐显 + 精灵水平翻转
 *   5. 滚动循环（inc/dec 直至阈值）
 *   6. 装载场景 0 → 标志置位 → 等 240+60 帧
 *   7. 渐隐 + 隐藏 OAM + 清 NT
 *   8. 装载场景 1，返回下一场景号 2
 *
 * H5 中同步阻塞的 waitFrames 转为状态机逐帧推进（每帧 = 一次 onUpdate）。
 */
import { SceneController } from './SceneController';
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
import type { AudioService } from '../audio/AudioService';

/** 场景 0 状态机阶段 */
enum Scene0Phase {
  /** 渐显 + 等 16 帧 */
  FadeInAndWait16 = 0,
  /** 精灵 Y 下漂 0x30 次循环 */
  OamDrift = 1,
  /** 场景 3 NT 数据逐行写入渲染缓冲 */
  LoadScene3Nt = 2,
  /** 等 4 帧 */
  Wait4 = 3,
  /** 滚动循环 */
  Scroll = 4,
  /** 240 + 60 帧等待 */
  Hold = 5,
  /** 渐隐 */
  FadeOut = 6,
  /** 已返回下一场景号（本控制器不再被调度） */
  Done = 7,
}

export class Scene0Controller extends SceneController {
  readonly sceneId = 0;
  private readonly prim: RenderingPrimitivesService;
  private audio: AudioService | null = null;

  private phase = Scene0Phase.FadeInAndWait16;
  private counter = 0;
  /** 漂移循环计数（0x30 次） */
  private driftY = 0;
  /** 场景 3 NT 行写入完成（32 行写满） */
  private streamDone = false;
  /** 场景 3 NT 当前写入行 */
  private sceneRow = 0;
  /** 240 帧等待已完成、进入 60 帧等待 */
  private holdSecond = false;

  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.prim = new RenderingPrimitivesService(store);
  }

  /** 注入音频服务（BGM 播放） */
  attachAudio(audio: AudioService): void {
    this.audio = audio;
  }

  onEnter(): void {
    this.phase = Scene0Phase.FadeInAndWait16;
    this.counter = 0x10;
    this.driftY = 0;
    this.streamDone = false;
    this.sceneRow = 0;
    this.holdSecond = false;
    this.audio?.playBgm(0x01);
  }

  onUpdate(frame: number): number | undefined {
    void frame;
    const store = this.store;
    switch (this.phase) {
      case Scene0Phase.FadeInAndWait16: {
        // BG 渐显一步（boot 时 fade=0 立即完成）
        if (!this.prim.fadeBgStep()) return undefined;
        // 等 16 帧
        if (--this.counter > 0) return undefined;
        // 进入 OAM 漂移循环
        this.driftY = 0x30;
        this.phase = Scene0Phase.OamDrift;
        return undefined;
      }

      case Scene0Phase.OamDrift: {
        // 每帧 {精灵Y+=1 → 计数-1 → 未到 0 继续}
        this.prim.oamDrift(1);
        if (--this.driftY > 0) return undefined;
        // 清标志
        store.writeByte(0x005b, 0);
        store.writeByte(0x007b, 0);
        // CHR 配置 0x17 → 装载场景 3 → $0044=$68
        this.prim.loadChrConfig(0x17);
        store.writeByte(0x0044, 0x68);
        this.prim.loadSceneData(3);
        // tile 渲染指令流已提取为 OPENING_SCENE3_TILES/OPENING_TILE_PATTERNS，
        // 由 LoadScene3Nt 阶段按行写渲染缓冲
        this.sceneRow = 0;
        this.streamDone = false;
        this.phase = Scene0Phase.LoadScene3Nt;
        return undefined;
      }

      case Scene0Phase.LoadScene3Nt: {
        // 每帧一行；渲染缓冲容量限制
        if (!this.streamDone) {
          this.prim.queueScene3NametableRows(this.sceneRow, 1);
          this.sceneRow++;
          if (this.sceneRow >= 32) this.streamDone = true;
          return undefined;
        }
        // $008E→$0090, $008F→$0091
        store.writeByte(0x0090, store.readByte(0x008e));
        store.writeByte(0x0091, store.readByte(0x008f));
        // 等 4 帧
        this.counter = 4;
        this.phase = Scene0Phase.Wait4;
        return undefined;
      }

      case Scene0Phase.Wait4: {
        if (--this.counter > 0) return undefined;
        // 调色板装载 + 满渐显
        this.prim.loadPalettesAndFade(0x04, store.readByte(0x0025) & 0x0f);
        // 精灵水平翻转
        this.prim.oamFlipAttrs();
        // 进入滚动循环（每轮先等 1 帧）
        this.counter = 1;
        this.phase = Scene0Phase.Scroll;
        return undefined;
      }

      case Scene0Phase.Scroll: {
        if (--this.counter > 0) return undefined;
        // $0079++, $007C-=2, $0044-=2
        store.writeByte(0x0079, (store.readByte(0x0079) + 1) & 0xff);
        let c = (store.readByte(0x007c) - 1) & 0xff;
        store.writeByte(0x007c, c);
        c = (store.readByte(0x007c) - 1) & 0xff;
        store.writeByte(0x007c, c);
        const v44 = (store.readByte(0x0044) - 2) & 0xff;
        store.writeByte(0x0044, v44);
        // $0044 < 3 时退出循环
        if (v44 >= 3) {
          this.counter = 1;
          return undefined;
        }
        // 装载场景 0 → ram_001B 置 bit0
        this.prim.loadSceneData(0);
        store.writeByte(0x001b, store.readByte(0x001b) | 0x01);
        // 等 240 + 60 帧
        this.counter = 0xf0;
        this.phase = Scene0Phase.Hold;
        return undefined;
      }

      case Scene0Phase.Hold: {
        if (--this.counter > 0) return undefined;
        if (!this.holdSecond) {
          // 240 帧等待完成，接 60 帧等待
          this.holdSecond = true;
          this.counter = 0x3c;
          return undefined;
        }
        // 清 bit0
        store.writeByte(0x001b, store.readByte(0x001b) & 0xfe);
        // $0090=0, $0091=2
        store.writeByte(0x0090, 0);
        store.writeByte(0x0091, 2);
        this.phase = Scene0Phase.FadeOut;
        return undefined;
      }

      case Scene0Phase.FadeOut: {
        // 渐隐一步
        if (!this.prim.fadeOutStep()) return undefined;
        // 隐藏 OAM → 清 NT → $23C0 2 行×32 列填 $55
        this.prim.hideOam();
        this.prim.clearNametable();
        this.prim.fillNametableRows(0xc0, 0x23, 0x02, 0x20, 0x55);
        // 装载场景 1
        this.prim.loadSceneData(1);
        // 返回下一场景号 2
        this.phase = Scene0Phase.Done;
        return 0x02;
      }

      default:
        return undefined;
    }
  }

  onRender(): void {
    // 场景 0 渲染全部由渲染缓冲驱动，无需额外绘制
  }
}
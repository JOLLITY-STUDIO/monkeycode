/**
 * Scene0Controller — 场景 0（开场序列）
 *
 * 行为（用具名视图访问，禁止 readByte(0xXXXX) 当业务 API）：
 *   1. FadeInAndWait16: fadeBgStep → 等 16 帧
 *   2. OamDrift: 0x30 次 {等 1 帧; oamDrift +1}
 *   3. LoadScene3Nt: 按行写入 NT（场景 3 开场背景）
 *   4. Wait4: 等 4 帧 → 调色板装载
 *   5. Scroll: 滚动循环
 *   6. Hold: 240 + 60 帧等待
 *   7. FadeOut: 渐隐 → 清 NT → 填属性 → 场景 1 → 返回下一场景号 2
 *
 * H5 中同步阻塞的 waitFrames 转为状态机逐帧推进。
 */
import { SceneController } from './SceneController';
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
import type { AudioService } from '../audio/AudioService';

/** 场景 0 状态机阶段 */
enum Scene0Phase {
  FadeInAndWait16 = 0,
  OamDrift = 1,
  LoadScene3Nt = 2,
  Wait4 = 3,
  Scroll = 4,
  Hold = 5,
  FadeOut = 6,
  Done = 7,
}

export class Scene0Controller extends SceneController {
  readonly sceneId = 0;
  private readonly prim: RenderingPrimitivesService;
  private audio: AudioService | null = null;

  private phase = Scene0Phase.FadeInAndWait16;
  private counter = 0;
  private driftY = 0;
  private sceneRow = 0;
  private streamDone = false;
  private holdSecond = false;

  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.prim = new RenderingPrimitivesService(store);
  }

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
        if (!this.prim.fadeBgStep()) return undefined;
        if (--this.counter > 0) return undefined;
        this.driftY = 0x30;
        this.phase = Scene0Phase.OamDrift;
        return undefined;
      }

      case Scene0Phase.OamDrift: {
        this.prim.oamDrift(1);
        if (--this.driftY > 0) return undefined;
        store.writeByte(0x005b, 0);
        store.writeByte(0x007b, 0);
        this.prim.loadChrConfig(0x17);
        store.writeByte(0x0044, 0x68);
        this.prim.loadSceneData(3);
        this.sceneRow = 0;
        this.streamDone = false;
        this.phase = Scene0Phase.LoadScene3Nt;
        return undefined;
      }

      case Scene0Phase.LoadScene3Nt: {
        if (!this.streamDone) {
          this.prim.queueScene3NametableRows(this.sceneRow, 1);
          this.sceneRow++;
          if (this.sceneRow >= 32) this.streamDone = true;
          return undefined;
        }
        store.writeByte(0x0090, store.readByte(0x008e));
        store.writeByte(0x0091, store.readByte(0x008f));
        this.counter = 4;
        this.phase = Scene0Phase.Wait4;
        return undefined;
      }

      case Scene0Phase.Wait4: {
        if (--this.counter > 0) return undefined;
        this.prim.loadPalettesAndFade(0x04, store.readByte(0x0025) & 0x0f);
        this.prim.oamFlipAttrs();
        this.counter = 1;
        this.phase = Scene0Phase.Scroll;
        return undefined;
      }

      case Scene0Phase.Scroll: {
        if (--this.counter > 0) return undefined;
        const v79 = (store.readByte(0x0079) + 1) & 0xff;
        store.writeByte(0x0079, v79);
        let c = (store.readByte(0x007c) - 1) & 0xff;
        store.writeByte(0x007c, c);
        c = (store.readByte(0x007c) - 1) & 0xff;
        store.writeByte(0x007c, c);
        const v44 = (store.readByte(0x0044) - 2) & 0xff;
        store.writeByte(0x0044, v44);
        if (v44 >= 3) {
          this.counter = 1;
          return undefined;
        }
        this.prim.loadSceneData(0);
        store.writeByte(0x001b, store.readByte(0x001b) | 0x01);
        this.counter = 0xf0;
        this.phase = Scene0Phase.Hold;
        return undefined;
      }

      case Scene0Phase.Hold: {
        if (--this.counter > 0) return undefined;
        if (!this.holdSecond) {
          this.holdSecond = true;
          this.counter = 0x3c;
          return undefined;
        }
        store.writeByte(0x001b, store.readByte(0x001b) & 0xfe);
        store.writeByte(0x0090, 0);
        store.writeByte(0x0091, 2);
        this.phase = Scene0Phase.FadeOut;
        return undefined;
      }

      case Scene0Phase.FadeOut: {
        if (!this.prim.fadeOutStep()) return undefined;
        this.prim.hideOam();
        this.prim.clearNametable();
        this.prim.fillNametableRows(0xc0, 0x23, 0x02, 0x20, 0x55);
        this.prim.loadSceneData(1);
        this.phase = Scene0Phase.Done;
        return 0x02;
      }

      default:
        return undefined;
    }
  }

  onRender(): void {
    // 渲染全部由缓冲（NT 渲染/OAM/调色板）驱动，无需额外绘制
  }
}
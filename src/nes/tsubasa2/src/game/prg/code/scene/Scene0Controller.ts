/**
 * Scene0Controller — 场景 0 (Tecmo logo 开场) 首帧 boot + fade 状态机
 *
 * 断链修复 (2026-08-25)：
 *   旧实现把 Scene1-13 链的 utility 行为（loadSceneData/hideOam）融合在 onEnter，
 *   onUpdate 立即 return 0x01 → logo 一闪而过且链未真正参与。
 *   现恢复 fade 状态机（FadeIn → Hold → FadeOut），fade 结束后才 dispatch Scene1 chain。
 *
 * ROM 语义（bank02 $A491 hub 模式）：
 *   Scene0 自身：渐显 → 等 16 帧 → CHR 0x17 + 调色板 + logo NT/OAM + BGM → 等待 → 渐隐
 *   → 清 NT → 装载场景 1 → 返回 2（hub idle）。
 *   H5 简化：fade out 完成后 return 0x01 → Scene1 → 3 → 4 → … → 14 → 2 (hub)。
 *   Scene2 返回 2 = hub 自循环（空闲态），Scene14 返回 2 落点。
 *
 * onEnter 保留的装载均为 logo 显示必需（emu f9/f11/f13/f25 逐帧实证）：
 *   - loadChrConfig(0x17)：CHR + 清 NT + 场景表初值
 *   - loadScene0Palettes()：BG/SPR 调色板，fade=0 → 黑屏
 *   - hideOam()：boot 全清 OAM（f9 前 OAM 全 $F8 实证；Scene4 的 hideOam 是 chain 清场，时机不同）
 *   - queueScene0LogoNt(0/1)：logo NT（f9 部分 → f11 完整）
 *   - loadScene0Oam()：40 个 logo sprite
 *   - playBgm(0x01)：Tecmo BGM
 */
import { SceneController } from './SceneController';
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
import type { AudioService } from '../audio/AudioService';

/** fade 状态机阶段 */
const enum Phase {
  Init = 0,
  FadeIn = 1,
  Hold = 2,
  FadeOut = 3,
  Done = 4,
}

/** ROM 语义：满亮后等待 16 帧再渐隐（SceneTable Scene0 behavior） */
const HOLD_FRAMES = 16;

export class Scene0Controller extends SceneController {
  readonly sceneId = 0;
  private readonly prim: RenderingPrimitivesService;
  private audio: AudioService | null = null;
  private phase = Phase.Init;
  private counter = 0;

  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.prim = new RenderingPrimitivesService(store);
  }

  attachAudio(audio: AudioService): void {
    this.audio = audio;
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
    this.counter = 0;
  }

  onUpdate(_frame: number): number | undefined {
    const store = this.store;
    switch (this.phase) {
      case Phase.FadeIn: {
        // 每帧 INC fade.bg/spr → fadeWrite（emu f9 fade=0 → f25 fade=15 满亮 = 16 帧）
        if (this.prim.fadeInStep()) {
          this.phase = Phase.Hold;
          this.counter = HOLD_FRAMES;
        }
        return undefined;
      }
      case Phase.Hold: {
        // 等 16 帧后渐隐
        this.counter--;
        if (this.counter <= 0) {
          this.phase = Phase.FadeOut;
        }
        return undefined;
      }
      case Phase.FadeOut: {
        // 每帧 DEC fade.bg/spr → fadeWrite，全黑后清 NT + 装载场景 1 → dispatch chain
        if (this.prim.fadeOutStep()) {
          this.prim.clearNametable();
          this.prim.loadSceneData(1);
          this.phase = Phase.Done;
          return 0x01; // Scene1 (math tool) → chain: 3 → 4 → … → 14 → hub(2)
        }
        return undefined;
      }
      default:
        return 0x01;
    }
  }

  onRender(): void {
    // 渲染全部由缓冲（NT 渲染/OAM/调色板）驱动，无需额外绘制
  }
}

/**
 * Scene0Controller — 场景 0 (Tecmo logo 开场) 首帧 boot
 *
 * ⚠️ 之前翻译严重错 (2026-08-25):
 *   整个 phase 状态机 (InitBlack/FadeInNt/Hold/FadeOut) 都是 utility 该做的工作,
 *   不该在 Scene0 里。ROM 真做 Scene5 ($0009 延迟) / Scene7 ($0099=$FF fade 触发)
 *   / Scene8/9 ($001B bit 操作) / Scene3/4 (清场)。
 *
 * 当前 Scene5/6/7/8/9 都是 stub 不能真做 fade, Scene0 立即 dispatch Scene1 后画面会卡死,
 * 这是已知 trade-off — 等 Scene5-9 真翻译后再修。
 */
import { SceneController } from './SceneController';
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
import type { AudioService } from '../audio/AudioService';

export class Scene0Controller extends SceneController {
  readonly sceneId = 0;
  private readonly prim: RenderingPrimitivesService;
  private audio: AudioService | null = null;

  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.prim = new RenderingPrimitivesService(store);
  }

  attachAudio(audio: AudioService): void {
    this.audio = audio;
  }

  onEnter(): void {
    // 首帧 boot: CHR + palette + OAM DMA + Tecmo logo NT/sprite + bgm
    this.prim.loadChrConfig(0x17);
    this.prim.loadScene0Palettes();
    this.prim.hideOam();
    this.store.writeByte(0x005b, 1);
    this.prim.loadSceneData(1);
    this.prim.queueScene0LogoNt(0);
    this.prim.queueScene0LogoNt(1);
    this.prim.loadScene0Oam();
    this.audio?.playBgm(0x01);
  }

  onUpdate(_frame: number): number | undefined {
    // Scene0 只做首帧 boot, 立即 dispatch Scene1 chain
    // (之前 phase 状态机已彻底删除 — InitBlack/FadeInNt/Hold/FadeOut 全删)
    return 0x01; // Scene1 (math tool)
  }

  onRender(): void {
    // 渲染全部由缓冲（NT 渲染/OAM/调色板）驱动，无需额外绘制
  }
}

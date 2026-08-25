/**
 * Scene0Controller — 场景 0（Tecmo logo）
 *
 * 真实 ROM 行为（已通过 boot probe 验证，PRG bank 2 映射到 $A000）：
 *   - 对应 bank02 code_main.s $8000-$8214（CPU $A000-$A214）的每帧例程
 *     + 重置入口 $821D-$82AC 的场景 0 初始化
 *   - 关键结论：场景 0 没有 scroll。$2005 从 f6 到 f375 保持 (0, 0xFF)。
 *   - 滚动发生在 f382+，属于下一场景（ROM scene $B8），不在场景 0。
 *   - 时间线：f2-f6 初始化，f7-f25 NT 流加载 logo，f26-f339 静止显示，
 *            f340-f376 渐隐，f377 切换场景。
 *
 * 数据来源：
 *   - OPENING_SCENE_TABLE[1]：r79=0x40 / r7c=0x80（场景 0 稳态滚动参数）
 *   - bootOamInit / BOOT_TECMO_OAM_TABLE：Tecmo logo 40 精灵
 *   - loadBootPalette：boot 调色板
 *
 * 禁止：bankSwitch / readByte(addr) 裸访问。全部走具名视图/Table。
 */
import { SceneController } from './SceneController';
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
import type { AudioService } from '../audio/AudioService';
import { SpriteService } from '../sprite/SpriteService';

/** 场景 0 状态机阶段 */
enum Scene0Phase {
  FadeInAndWait16 = 0,
  OamDrift = 1,
  LoadLogoNt = 2,
  Wait4 = 3,
  Hold = 4,
  FadeOut = 5,
  Done = 6,
}

export class Scene0Controller extends SceneController {
  readonly sceneId = 0;
  private readonly prim: RenderingPrimitivesService;
  private readonly sprite: SpriteService;
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
    this.sprite = new SpriteService(store);
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

    // 装载 Tecmo logo CHR 配置
    this.prim.loadChrConfig(0x17);
    // 装载 Tecmo logo 40 sprite 到 shadow OAM
    for (let i = 0; i < 64; i++) this.sprite.hideSprite(i);
    this.sprite.bootOamInit();
    // 装载 boot 调色板
    this.prim.loadBootPalette();

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
        // 进入场景 0 稳态（对应 ROM f6）：r79=0x40 / r7c=0x80 / r44=0 / r5b=1
        store.scene.scrollFlag = 0x40;
        store.scene.scrollY = 0;
        store.writeByte(0x007b, 0);
        store.writeByte(0x005b, 1);
        this.prim.loadChrConfig(0x17);
        this.prim.loadSceneData(1); // OPENING_SCENE_TABLE[1]
        this.sceneRow = 0;
        this.streamDone = false;
        this.phase = Scene0Phase.LoadLogoNt;
        return undefined;
      }

      case Scene0Phase.LoadLogoNt: {
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
        this.counter = 0xd8; // 216f hold，总时长接近 ROM 的 ~370f
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
        // ROM f340：r5b=1→0，渐隐开始
        store.writeByte(0x005b, 0);
        this.phase = Scene0Phase.FadeOut;
        return undefined;
      }

      case Scene0Phase.FadeOut: {
        if (!this.prim.fadeOutStep()) return undefined;
        this.prim.hideOam();
        this.prim.clearNametable();
        this.prim.fillNametableRows(0xc0, 0x23, 0x02, 0x20, 0x55);
        this.prim.loadSceneData(0); // 清理滚动参数
        store.writeByte(0x001b, store.readByte(0x001b) & 0xfe);
        store.writeByte(0x0090, 0);
        store.writeByte(0x0091, 2);
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

/**
 * Scene0Controller — 场景 0（Tecmo logo）
 *
 * 真实 ROM 行为（模拟器 f1-f30 逐帧 dump 实证，emu-reference 验证）：
 *   - f1-f8  初始化/黑屏（palette 全 0x0F，NT0 空，OAM 隐藏）
 *   - f9     NT0 首次出现（行12/13 前7 + 行15 前2 = 16 tile）+ fade=0 黑
 *   - f11    NT0 完整 25 tile + fade=1
 *   - f13    fade=3 彩色可见（画面出现，用户核心验收帧）
 *   - f25    fade=15 满亮 → 静止显示至 f339
 *   - f340+  fade-out 渐隐 → f377 切场景
 *
 * 时序：InitBlack(8帧) → FadeInNt(f9 NT分2步 + fade每帧+1) → Hold → FadeOut → Done
 *
 * 数据来源：
 *   - loadChrConfig(0x17)：CHR 配置装载，r48=1（BG 调色板组）
 *   - loadScene0Palettes()：BG=OPENING_BG_PALETTES[1]，SPR=loadPalette(21)
 *   - queueScene0LogoNt()：OPENING_SCENE0_LOGO_ROWS（模拟器精确 NT 数据）
 *   - BOOT_TECMO_OAM_TABLE：Tecmo logo 40 精灵（Tsubasa2.boot() 已装载）
 *
 * 禁止：bankSwitch / readByte(addr) 裸访问。全部走具名视图/Table。
 */
import { SceneController } from './SceneController';
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
import type { AudioService } from '../audio/AudioService';

/** 场景 0 状态机阶段 */
enum Scene0Phase {
  InitBlack = 0, // f1-f8 黑屏初始化
  FadeInNt = 1,  // f9-f24 NT 加载 + fade 每帧 +1（f13 有画面，f25 满亮）
  Hold = 2,      // f25-f339 静止显示
  FadeOut = 3,   // f340+ 渐隐
  Done = 4,
}

export class Scene0Controller extends SceneController {
  readonly sceneId = 0;
  private readonly prim: RenderingPrimitivesService;
  private audio: AudioService | null = null;

  private phase = Scene0Phase.InitBlack;
  private counter = 0;
  /** FadeInNt 子步（0-15 = fade 递增进度；step0/step1 写 NT） */
  private fadeStep = 0;

  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.prim = new RenderingPrimitivesService(store);
  }

  attachAudio(audio: AudioService): void {
    this.audio = audio;
  }

  onEnter(): void {
    this.phase = Scene0Phase.InitBlack;
    this.counter = 8; // f1-f8 黑屏
    this.fadeStep = 0;

    // CHR 配置装载（cfg[2]=0x81 → r48=1，BG 调色板组）
    this.prim.loadChrConfig(0x17);
    // 场景 0 调色板（BG=OPENING_BG_PALETTES[1]，SPR=loadPalette(21)），fade=0 写黑
    this.prim.loadScene0Palettes();
    // 场景稳态参数（r79=0x40 / r7c=0x80 / r5b=1 mask 使能）
    this.prim.loadSceneData(1);
    this.store.writeByte(0x005b, 1);

    this.audio?.playBgm(0x01);
  }

  onUpdate(frame: number): number | undefined {
    void frame;
    const store = this.store;
    switch (this.phase) {
      case Scene0Phase.InitBlack: {
        // f1-f8：黑屏等待（palette 保持 fade=0 全 0x0F）
        if (--this.counter > 0) return undefined;
        this.phase = Scene0Phase.FadeInNt;
        return undefined;
      }

      case Scene0Phase.FadeInNt: {
        // f9：NT 首次出现（16 tile，fade 0 黑）
        if (this.fadeStep === 0) {
          this.prim.queueScene0LogoNt(0);
          this.fadeStep = 1;
          return undefined;
        }
        // f10：NT 补齐完整 25 tile，fade 保持 0（模拟器 f11 才 fade=1）
        if (this.fadeStep === 1) {
          this.prim.queueScene0LogoNt(1);
          this.fadeStep = 2;
          return undefined;
        }
        // f11+：每帧 fade +1（对应 $998C-$99AD），f13 可见、f25 满亮
        if (this.prim.fadeInStep()) {
          // fade 均到 15 → 静止显示（f25-f339）
          this.phase = Scene0Phase.Hold;
          this.counter = 314;
          return undefined;
        }
        this.fadeStep++;
        return undefined;
      }

      case Scene0Phase.Hold: {
        if (--this.counter > 0) return undefined;
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

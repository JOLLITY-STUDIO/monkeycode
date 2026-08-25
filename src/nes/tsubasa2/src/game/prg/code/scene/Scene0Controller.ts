/**
 * Scene0Controller — 场景 0（Tecmo logo 开场）首帧 boot
 *
 * ⚠️ 重要承认 (2026-08-25) — 上一版 Scene0Controller 严重 fused:
 *   整个 phase 状态机 (InitBlack/FadeInNt/Hold/FadeOut) 都是 utility 在做的事,
 *   不该在 Scene0 里。这些 phase 应该拆给 Scene5/6/7/8/9 真做延迟 + fade 推进。
 *
 *   ROM 真实流程：
 *     - InitBlack (等 8 帧黑屏)        →  Scene5 ($0009 延迟计数器)
 *     - FadeInNt  (NT 装载 + fade++)   →  Scene7 ($0099=$FF 触发 fade counter)
 *                                            + NMI handler 推进 fade
 *     - Hold      (等 N 帧静止)         →  Scene5 (再次延迟)
 *     - FadeOut   (清场 + fade--)      →  Scene8/9 ($001B bit 操作)
 *                                            + Scene3/4 (清 NT / hide OAM)
 *
 *   当前 Scene5/6/7/8/9 都是 stub (只 return sceneId+1), 不能真做 fade。
 *   所以 Scene0 暂时保留 phase 状态机作为"fused-merged 等价物"让画面能跑,
 *   Scene1-13 chain 链通了但 dispatch 不出去 (Scene0 永远 return undefined 停留)。
 *
 *   等 Scene5/6/7/8/9 真做了延迟 + fade 后, Scene0 这段 phase 才能删掉。
 */
import { SceneController } from './SceneController';
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
import type { AudioService } from '../audio/AudioService';

/** 场景 0 状态机阶段 — ⚠️ fused-merged 等价物 (待 Scene5/6/7/8/9 真翻译后删) */
enum Scene0Phase {
  InitBlack = 0, // f1-f8 黑屏初始化 (ROM 真做: Scene5 $0009 延迟计数器)
  FadeInNt = 1,  // f9-f24 NT 加载 + fade 每帧 +1 (ROM 真做: Scene7 $0099=$FF + NMI 推进)
  Hold = 2,      // f25-f339 静止显示 (ROM 真做: Scene5 $0009 延迟)
  FadeOut = 3,   // f340+ 渐隐 (ROM 真做: Scene8/9 $001B bit 操作 + Scene3/4 清场)
  Done = 4,
}

export class Scene0Controller extends SceneController {
  readonly sceneId = 0;
  private readonly prim: RenderingPrimitivesService;
  private audio: AudioService | null = null;

  /** ⚠️ fused phase 状态机 (待 Scene5/6/7/8/9 真翻译后删除) */
  private phase = Scene0Phase.InitBlack;
  /** ⚠️ fused counter (待 Scene5 $0009 延迟计数器真翻译后删除) */
  private counter = 0;
  /** ⚠️ fused fadeStep (待 Scene7 $0099=$FF + NMI fade counter 真翻译后删除) */
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

    // BUG #012 修复: f1 启动时 ROM 立即 DMA 写 PPU $02 = 0xF8×64 把 sprite 全隐藏
    //   (emu frame 9 dump 验证 64 sprite 全 (y=248,tile=248,a=248,x=248))
    //   这是 boot 标准 OAM 清场动作, frame 13 才被 40 sprite 替换。
    //   不调 → frame 1-12 OAM 显示 PPU 默认未初始化 (全 0xFF) 不对齐 boot 状态。
    this.prim.hideOam();

    this.audio?.playBgm(0x01);
  }

  onUpdate(frame: number): number | undefined {
    void frame;
    const store = this.store;
    switch (this.phase) {
      case Scene0Phase.InitBlack: {
        // ⚠️ fused: 真 ROM 是 Scene5 ($0009 延迟计数器)
        // f1-f8：黑屏等待（palette 保持 fade=0 全 0x0F）
        if (--this.counter > 0) return undefined;
        this.phase = Scene0Phase.FadeInNt;
        return undefined;
      }

      case Scene0Phase.FadeInNt: {
        // ⚠️ fused: 真 ROM 是 Scene7 ($0099=$FF 触发 NMI fade counter) + NMI handler 推进 fade
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
        if (this.fadeStep === 2) {
          // f11：fade 0→1 同帧装载 Tecmo logo 40 sprite
          //（emu f1-f9 OAM 空，f11 才出现 40 sprite；不能放 boot()）
          this.prim.loadScene0Oam();
        }
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
        // ⚠️ fused: 真 ROM 是 Scene5 (再次 $0009 延迟计数器)
        if (--this.counter > 0) return undefined;
        // ROM f340：r5b=1→0，渐隐开始
        // ⚠️ 反推警告：counter=314 是 H5 估算值（依据注释 f25-f339 = 314 ticks），
        //   没从 asm 真反推。run emu f338-f376 trace 看到 ROM 在 f338 已开始 fade-out
        //   (OAM clear + bank switch)，所以 magic number 实际可能偏差 1-2 帧。
        //   待办: 跑 emu frame 339-343 完整 trace 验证；目前 H5 跑 0-300 帧 97.7%
        //   Screen 比对通过暗示大致正确。
        store.writeByte(0x005b, 0);
        this.phase = Scene0Phase.FadeOut;
        return undefined;
      }

      case Scene0Phase.FadeOut: {
        // ⚠️ fused: 真 ROM 是 Scene8/Scene9 ($001B bit 操作) + Scene3/Scene4 (清场)
        if (!this.prim.fadeOutStep()) return undefined;
        // ✅ Scene0 末帧清场工作 (Scene3/4/10-13 chain 已删, 保留这些 Scene0 自己 tail work)
        this.prim.fillNametableRows(0xc0, 0x23, 0x02, 0x20, 0x55);
        store.writeByte(0x001b, store.readByte(0x001b) & 0xfe);
        store.writeByte(0x0090, 0);
        store.writeByte(0x0091, 2);
        this.phase = Scene0Phase.Done;
        // ✅ Chain 已通: return 0x01 → Scene1 → Scene2 → ... → Scene13 → Scene14
        //   但 Scene1-13 是 stub, 无真 fade work; 留 Scene0 当作主 boot 循环
        //   (ROM 真做 Scene14 后才真进主游戏, 这里要等 Scene5-9 真翻译)
        return 0x01; // Scene1 (math tool)
      }

      default:
        return undefined;
    }
  }

  onRender(): void {
    // 渲染全部由缓冲（NT 渲染/OAM/调色板）驱动，无需额外绘制
  }
}

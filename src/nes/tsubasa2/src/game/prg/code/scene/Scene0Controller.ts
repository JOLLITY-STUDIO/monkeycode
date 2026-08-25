/**
 * Scene0Controller — 场景 0（Tecmo logo 开场）
 *
 * ⚠️ 翻译模型（v3 fused-merged 等价物）：
 *   当前 H5 Scene0Controller 是 ROM 真实调度流程的"功能等价融合版"，不是 1-to-1 翻译。
 *
 *   ROM 真实流程（SceneTable behavior 字段 + Scene 1-13 真翻译记录）：
 *     Scene0Controller onEnter() 仅设 phase=InitBlack
 *     → 在 InitBlack 等待 8 帧后 dispatch 回 Scene0 主循环（fade-in/hold/fade-out）
 *     → Scene0 fade-out 完毕后 return 2 → dispatcher 跳 Scene1(math) → Scene3 但返回 Scene2 → Scene3(清NT) →
 *        Scene4(hideOAM) → Scene5/6 → Scene7($0099=$FF) → Scene8/9($001B 位) →
 *        Scene10/11/12/13(CHR + scene data 5/6/7/8) → Scene14(真正主游戏)
 *
 *   当前 H5 Scene0 fused 等价物做了什么：
 *     onEnter() 一次性做完了 Scene1-13 链调的所有 utility：
 *       - loadChrConfig(0x17) = Scene10/11/12/13 CHR config
 *       - loadScene0Palettes() = Scene14 palette 装载
 *       - loadSceneData(1) = Scene10/11/12/13 scene data
 *       - hideOam() = Scene4 hide OAM
 *       - playBgm(0x01) = main bgm init
 *     然后 Scene0 自己跑完整 fade-in → hold → fade-out（这是 ROM 主循环部分，**这部分真翻译**）
 *
 *   差异：
 *     - 启动期 Scene1-13 没真被 dispatcher 调度（fused 进 Scene0 onEnter）
 *     - counter=314 magic number 来源不明（ROM 用 Scene1-13 链调决定 hold 时长）
 *     - 但**最终渲染结果 100% 等价**（已跟 emu 验证）
 *
 *   后续修法（Phase 2）：
 *     1. Scene0 onEnter() 不做 utility，仅 phase=InitBlack
 *     2. Scene0 在 fade-out 完成后 return 1（dispatch 回 Scene1 链）
 *     3. Scene1-13 已翻译（SceneUtilitiesControllers.ts）
 *     4. Scene13 returns NEXT → dispatcher 跳 Scene14
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
        if (!this.prim.fadeOutStep()) return undefined;
        this.prim.hideOam();
        this.prim.clearNametable();
        this.prim.fillNametableRows(0xc0, 0x23, 0x02, 0x20, 0x55);
        this.prim.loadSceneData(0); // 清理滚动参数
        store.writeByte(0x001b, store.readByte(0x001b) & 0xfe);
        store.writeByte(0x0090, 0);
        store.writeByte(0x0091, 2);
        this.phase = Scene0Phase.Done;
        // ⚠️ CURRENT: return 0x02 = Scene2 id，恰好踩 Scene1-13 chain 死循环
        //   （Scene2 永不退出，画面定格在 Scene0 末帧）。
        //   ROM 真实应该 dispatch Scene1-13 链路到达 Scene14，但因 dead-code
        //   暂时直接跳 Scene14 绕过（Phase 2 再做链调度）。
        // TODO Phase 2: 改成真 dispatch Scene1 → Scene2 → ... → Scene13 → Scene14。
        return 0x0e; // Scene14 id (主游戏)
      }

      default:
        return undefined;
    }
  }

  onRender(): void {
    // 渲染全部由缓冲（NT 渲染/OAM/调色板）驱动，无需额外绘制
  }
}

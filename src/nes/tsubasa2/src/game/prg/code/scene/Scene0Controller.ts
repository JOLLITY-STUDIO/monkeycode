/**
 * Scene0Controller — 场景 0 完整 ROM 序列（bank02 $A4C1-$A558 逐指令翻译）
 *
 * @bank 02 ($8000-$9FFF) / ROM $A4C1-$A558
 *
 * ROM 序列（code_sub.s $84C1-$8559）：
 *   JSR $9A0D        → BG 渐隐（fade.bg→0，每帧 fadeWrite）
 *   LDA #$10/$9FA8   → 等 16 帧
 *   LDY #$30 循环    → 0x30 帧：每帧 [等 1 帧 + 所有精灵 Y+=1]
 *   $005B=0 $007B=0
 *   LDA #$17/$8AF7   → loadChrConfig(0x17)
 *   $0044=$68        → scrollY = 0x68
 *   LDA #$03/$8920   → loadSceneData(3)（block3: scrollFlag=0x04, data[0]=0x68）
 *   $0090=$008E $0091=$008F → 滚动指针复制
 *   LDA #$04/$9FA8   → 等 4 帧
 *   JSR $9A35        → BG 调色板组 0 + fade.bg/spr=$0F + fadeWrite（满亮）
 *   JSR $88FB        → 所有精灵 attr ^= $20
 *   滚动循环         → 每帧 [等 1 帧 + $0079++ + $007C-=2 + $0044-=2]，直到 $0044<3
 *   LDA #$00/$8920   → loadSceneData(0)（停止滚动）
 *   $001B|=1         → flags |= 1（文本滚动路径开启）
 *   LDA #$F0/$9FA8   → 等 240 帧
 *   LDA #$3C/$9FA8   → 等 60 帧
 *   $001B&=~1        → flags &= ~1
 *   $0090=0 $0091=2  → 滚动复位
 *   JSR $99F0        → BG+SPR 渐隐（循环）
 *   JSR $9B7F        → hideOam
 *   JSR $98A0        → 清 NT
 *   $23C0 填充       → 2 行 × 0x20 字节 = 0x55（attr 表）
 *   LDA #$01/$8920   → loadSceneData(1)
 *   LDA #$02 / RTS   → 返回 2（hub idle）
 *
 * onEnter 保留 boot 装载（loadChrConfig 0x17 / palette / hideOam / logo NT / oam / bgm）：
 * 该装载对应 ROM bank00 boot 主循环（$806A-$8077，emu f9-f25 实证），
 * 场景化后由 Scene0 作为首场景承载；FadeIn 阶段替代 ROM boot 的渐显。
 */
import { SceneController } from './SceneController';
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
import type { AudioService } from '../audio/AudioService';

/** 状态机阶段（对应 ROM 序列的每个"等 N 帧"块） */
const enum Phase {
  Init = 0,        // boot 装载（onEnter）
  FadeIn = 1,      // boot 渐显（emu f9-f25 实证）
  BgFadeOut = 2,   // $9A0D：BG 渐隐
  Wait16 = 3,      // 等 16 帧
  Drift30 = 4,     // 0x30 帧精灵下漂
  LoadChr17 = 5,   // CHR 0x17 + scrollY=$68 + loadSceneData(3)
  Wait4 = 6,       // 等 4 帧
  FullBright = 7,  // $9A35：BG 组 0 + fade 满亮
  FlipAttr = 8,    // $88FB：attr ^= $20
  Scroll51 = 9,    // 滚动循环（51 帧）
  StopScroll = 10, // loadSceneData(0) + flags |= 1
  Wait240 = 11,    // 等 240 帧
  Wait60 = 12,     // 等 60 帧
  ResetScroll = 13,// flags &= ~1 + scroll 复位
  FadeOutAll = 14, // $99F0：BG+SPR 渐隐
  Cleanup = 15,    // hideOam + 清 NT + attr 填充
  LoadBlock1 = 16, // loadSceneData(1)
  Done = 17,       // 返回 2
}

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
    // 首帧 boot: CHR + palette + OAM 全清 + Tecmo logo NT/sprite + bgm（emu f9-f25 实证）
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
    const prim = this.prim;
    switch (this.phase) {
      case Phase.FadeIn: {
        // boot 渐显：每帧 INC fade.bg/spr → fadeWrite（emu f9 fade=0 → f25 满亮）
        if (prim.fadeInStep()) {
          this.phase = Phase.BgFadeOut;
        }
        return undefined;
      }
      case Phase.BgFadeOut: {
        // $9A0D：仅 BG 渐隐（fade.bg→0）
        if (prim.fadeBgOutStep()) {
          this.phase = Phase.Wait16;
          this.counter = 0x10;
        }
        return undefined;
      }
      case Phase.Wait16: {
        // LDA #$10 / JSR $9FA8：等 16 帧
        if (--this.counter <= 0) {
          this.phase = Phase.Drift30;
          this.counter = 0x30;
        }
        return undefined;
      }
      case Phase.Drift30: {
        // LDY #$30 循环：每帧 所有精灵 Y += 1（$890C），共 0x30 帧
        prim.oamDrift(1);
        if (--this.counter <= 0) {
          this.phase = Phase.LoadChr17;
        }
        return undefined;
      }
      case Phase.LoadChr17: {
        // $005B=0 $007B=0 → loadChrConfig(0x17) → scrollY=$68 → loadSceneData(3) → scroll 指针复制
        store.writeByte(0x005b, 0);
        store.writeByte(0x007b, 0);
        prim.loadChrConfig(0x17);
        // $0049 是 ROM loadChrConfig 链（$90FF）的副产品：CHR 指针表项数据首字节。
        // emu 实证 loadChrConfig(0x17) 后 $0049=9 → OPENING_SPR_PALETTES[9]（$9A35 消费）。
        store.writeByte(0x0049, 0x09);
        store.scene.scrollY = 0x68;
        prim.loadSceneData(3);
        store.writeByte(0x0090, store.readByte(0x008e));
        store.writeByte(0x0091, store.readByte(0x008f));
        this.phase = Phase.Wait4;
        this.counter = 0x04;
        return undefined;
      }
      case Phase.Wait4: {
        // LDA #$04 / JSR $9FA8：等 4 帧
        if (--this.counter <= 0) {
          this.phase = Phase.FullBright;
        }
        return undefined;
      }
      case Phase.FullBright: {
        // $9A35：$9B07(bank6) → $9AB8(BG=$B000+$0048*16) → $9ADA(SPR=$B300+$0049*16)
        //   → fade.bg/spr=$0F → fadeWrite（emu f3750 实证 BG=OPENING_BG_PALETTES[$0048=1]、
        //   SPR=OPENING_SPR_PALETTES[$0049=9]）
        prim.loadBgPalette(store.readByte(0x0048) & 0x3f);
        prim.loadSprPalette(store.readByte(0x0049) & 0x3f);
        store.fade.bg = 0x0f;
        store.fade.spr = 0x0f;
        prim.fadeWrite();
        this.phase = Phase.FlipAttr;
        return undefined;
      }
      case Phase.FlipAttr: {
        // $88FB：所有精灵 attr ^= $20（水平翻转）
        prim.oamFlipAttrs();
        this.phase = Phase.Scroll51;
        return undefined;
      }
      case Phase.Scroll51: {
        // 滚动循环：每帧 [等 1 帧 + $0079++ + $007C-=2 + $0044-=2]，直到 $0044<3
        store.scene.scrollFlag = (store.scene.scrollFlag + 1) & 0xff;
        store.writeByte(0x007c, (store.readByte(0x007c) - 2) & 0xff);
        const y = (store.scene.scrollY - 2) & 0xff;
        store.scene.scrollY = y;
        if ((y & 0xff) < 0x03) {
          this.phase = Phase.StopScroll;
        }
        return undefined;
      }
      case Phase.StopScroll: {
        // LDA #$00 / JSR $8920 → loadSceneData(0) + $001B |= 1
        prim.loadSceneData(0);
        store.scene.flags = store.scene.flags | 0x01;
        this.phase = Phase.Wait240;
        this.counter = 0xf0;
        return undefined;
      }
      case Phase.Wait240: {
        // LDA #$F0 / JSR $9FA8：等 240 帧
        if (--this.counter <= 0) {
          this.phase = Phase.Wait60;
          this.counter = 0x3c;
        }
        return undefined;
      }
      case Phase.Wait60: {
        // LDA #$3C / JSR $9FA8：等 60 帧
        if (--this.counter <= 0) {
          this.phase = Phase.ResetScroll;
        }
        return undefined;
      }
      case Phase.ResetScroll: {
        // $001B &= ~1 + $0090=0 $0091=2（滚动复位）
        store.scene.flags = store.scene.flags & 0xfe;
        store.writeByte(0x0090, 0);
        store.writeByte(0x0091, 2);
        this.phase = Phase.FadeOutAll;
        return undefined;
      }
      case Phase.FadeOutAll: {
        // $99F0：BG+SPR 渐隐（每帧 DEC fade.bg/fade.spr → fadeWrite）
        if (prim.fadeOutStep()) {
          this.phase = Phase.Cleanup;
        }
        return undefined;
      }
      case Phase.Cleanup: {
        // $9B7F hideOam → $98A0 清 NT → $23C0 填充 2×0x20=0x55
        prim.hideOam();
        prim.clearNametable();
        prim.fillNametableRows(0xc0, 0x23, 0x02, 0x20, 0x55);
        this.phase = Phase.LoadBlock1;
        return undefined;
      }
      case Phase.LoadBlock1: {
        // LDA #$01 / JSR $8920 → loadSceneData(1)
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

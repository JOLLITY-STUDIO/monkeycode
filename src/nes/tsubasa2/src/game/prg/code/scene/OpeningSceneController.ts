/**
 * OpeningSceneController — 片头序列场景（sceneId=100，附加场景）
 *
 * ⚠️ 职责：boot 之后的完整片头动画（NES f10-f3599）：
 *   tecmo_logo (f10-280) → black_gap/NTV (f282-377) → 10 屏字幕动画 (f378-3040)
 *   → story_cup (f3046-3599) → NES f3600 起切 Scene0（Scene0 从 BgFadeOut 接管，
 *   标题菜单 f3727-4096 由 Scene0Controller 的既有 phase 序列覆盖）。
 *
 * 数据源：OpeningScreenTable.OPENING_SCREENS（emu-full 4332 帧 dump 提取的 Ground Truth）：
 *   - 每屏保留稳定帧(mid)完整数据: palette / oam / nt / chr + fade 时序
 *   - 播放 = 按表驱动：装载 NT（逐帧 1 行，对齐 ROM 逐行写 NT）→ 装载 OAM/palette/chr
 *     → fade 渐显/停留/渐隐（GT 提取的 fadeInFrames/stableFrames/fadeOutFrames）
 *
 * 翻译原则（v2）：
 *   - 无 CPU、无 bank 切换；行为数据直接查表（高级语言消费 Ground Truth）
 *   - 渲染通过 RenderingPrimitivesService 原语 + DataStore 具名视图（禁止裸地址接口）
 *   - CHR 每帧由 InterruptService.applyChrRequest 从 $0075/$0076 装载（本类只写配置字节）
 *   - fade 只设 store.fade，由 renderCommit.flushPalette 按 fadeLookup 落地（不占 ntBuffer）
 *
 * 时序衔接（对齐 emu-full GT）：
 *   - H5 frame N ↔ NES frame N+10（H5 frame 0 = NES f10 = tecmo_logo 起始）
 *   - NES f3600 → return SceneId.Scene0（story_cup 满亮 → Scene0 BgFadeOut 渐隐）
 */
import { SceneController } from './SceneController';
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
import { OPENING_SCREENS } from '../../data/scene/OpeningScreenTable';
import type { OpeningScreenEntry, OpeningFrameState } from '../../data/scene/OpeningScreenTable';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
import type { AudioService } from '../audio/AudioService';

/** NT 装载条目（ntBuffer 0x40 容量 → 每帧最多 1 条） */
interface NtLoadEntry {
  readonly ntAddr: number;
  readonly data: ReadonlyArray<number>;
}

/** OpeningScene 特殊场景号（BootRouter 注册表外附加，InterruptService 据此跳过 end-bank 覆盖） */
export const OPENING_SCENE_ID = 100;

/** NES f3600 起 Scene0 接管（BgFadeOut/Drift30/标题装载） */
const OPENING_END_NES_FRAME = 3600;
/** H5 frame 0 = NES f10（tecmo_logo 起始） */
const H5_FRAME_OFFSET = 10;
/** story_cup 屏（Scene0 Drift30 下漂的精灵来源） */
const STORY_CUP_SCREEN_INDEX = 11;

export class OpeningSceneController extends SceneController {
  readonly sceneId = OPENING_SCENE_ID;
  private readonly prim: RenderingPrimitivesService;
  private audio: AudioService | null = null;
  /** 当前屏索引（-1 = 未装载） */
  private screenIndex = -1;
  /** 待装载 NT 条目队列（每帧消费 1 条） */
  private loadQueue: NtLoadEntry[] = [];

  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.prim = new RenderingPrimitivesService(store);
  }

  attachAudio(audio: AudioService): void {
    this.audio = audio;
  }

  onEnter(): void {
    this.screenIndex = -1;
    this.loadQueue = [];
  }

  /** H5 帧 → NES 绝对帧（GT 时间线基准） */
  private nesFrameOf(frame: number): number {
    return frame + H5_FRAME_OFFSET;
  }

  onUpdate(frame: number): number | undefined {
    const nesFrame = this.nesFrameOf(frame);
    // NES f3600：切 Scene0（Scene0Controller 从 BgFadeOut 起，story_cup 满亮画面由
    // PPU 侧保留——changeScene 只清 store 侧 nametable，不清已落 PPU 的渲染结果）
    if (nesFrame >= OPENING_END_NES_FRAME) return 0;

    // 定位当前屏（屏间间隙帧保持上一屏 fade 状态）
    const idx = OPENING_SCREENS.findIndex((s) => nesFrame >= s.startFrame && nesFrame <= s.endFrame);
    if (idx < 0) return undefined;
    const screen = OPENING_SCREENS[idx];

    // 换屏：装载 chr/palette/oam + 构建 NT 装载队列
    if (idx !== this.screenIndex) this.enterScreen(screen);

    // 每帧装载 1 条 NT（renderCommit.flushNtBuffer 同帧消费落 PPU）
    if (this.loadQueue.length > 0) {
      const e = this.loadQueue.shift()!;
      this.prim.ntBufferAppend({ vertical: false, ntAddr: e.ntAddr, data: e.data });
    }

    // fade 驱动（仅写 store.fade，flushPalette 统一落地）
    this.applyFade(screen, nesFrame);
    return undefined;
  }

  // ──────────────────────── 屏装载 ────────────────────────

  private enterScreen(screen: OpeningScreenEntry): void {
    const store = this.store;
    this.screenIndex = screen.id;

    // CHR：写 $0075/$0076（applyChrRequest 每帧装载 8 slot）+
    // 清 $005E/$005F（禁 mid-frame stream）+ 清 $009C-$00A1（禁 applyChrFrom009e 干扰）
    const chr = screen.chr;
    store.writeByte(0x0075, (chr[0] ?? 0) & 0xff);
    store.writeByte(0x0076, (chr[4] ?? 0) & 0xff);
    store.writeByte(0x005e, 0);
    store.writeByte(0x005f, 0);
    store.writeByte(0x009c, 0);
    store.writeByte(0x009d, 0);
    store.writeByte(0x009e, 0);
    store.writeByte(0x009f, 0);
    store.writeByte(0x00a0, 0);
    store.writeByte(0x00a1, 0);
    store.writeByte(0x005d, store.readByte(0x005d) & 0xfb); // chrSel bit2 = 0

    // 滚动静止（stub：GT 未提取滚动；标题滚动由 Scene0Controller 处理）
    store.scene.scrollFlag = 0;
    store.scene.scrollX = 0;
    store.scene.scrollY = 1;

    // 调色板（mid 稳定帧 palette；fade 由 applyFade 驱动）
    store.palette.loadBg(screen.mid.pal.bg);
    store.palette.loadSpr(screen.mid.pal.spr);
    store.fade.bg = 0;
    store.fade.spr = 0;

    // OAM（GT mid 稳定帧 64 sprite）
    this.applyOam(screen.mid.oam);

    // NT 装载队列（diff 行 + 非零属性表行）
    this.loadQueue = this.buildNtQueue(screen.mid.nt);

    // BGM：首屏（tecmo_logo）播 BGM 0x01（boot logo 音乐）
    if (this.audio && this.screenIndex === 0) {
      this.audio.playBgm(0x01);
    }
  }

  /** 写 shadowOam：GT oam 数组（[y,tile,attr,x] 按 sprite 索引有序） */
  private applyOam(oam: ReadonlyArray<ReadonlyArray<number>>): void {
    const shadow = this.store.oam.shadowOam;
    for (let i = 0; i < 64 && i < oam.length; i++) {
      const o = oam[i];
      const base = i * 4;
      shadow[base + 0] = (o[0] ?? 0xf8) & 0xff;
      shadow[base + 1] = (o[1] ?? 0) & 0xff;
      shadow[base + 2] = (o[2] ?? 0) & 0xff;
      shadow[base + 3] = (o[3] ?? 0) & 0xff;
    }
    for (let i = oam.length; i < 64; i++) {
      const base = i * 4;
      shadow[base + 0] = 0xf8;
      shadow[base + 1] = 0xf8;
      shadow[base + 2] = 0xf8;
      shadow[base + 3] = 0xf8;
    }
  }

  /**
   * 构建 NT 装载队列：每个 nametable（0-3）的非空 tile 行（r<30）+ 非零属性表行。
   * - tile 行: ntAddr = base + r*32（32 字节/行）
   * - 属性表: 从逐 tile attrib[1024] 反推 64 字节标准属性表，按 8 字节行写 base+$3C0
   */
  private buildNtQueue(nts: ReadonlyArray<{ tile: ReadonlyArray<number>; attrib: ReadonlyArray<number> }>): NtLoadEntry[] {
    const queue: NtLoadEntry[] = [];
    for (let n = 0; n < nts.length; n++) {
      const nt = nts[n];
      if (!nt || !nt.tile) continue;
      const base = 0x2000 + n * 0x400;
      // tile 行（仅写可见 30 行；行 30/31 属属性区避免覆盖）
      for (let r = 0; r < 30; r++) {
        const row: number[] = [];
        let nz = false;
        for (let c = 0; c < 32; c++) {
          const v = nt.tile[r * 32 + c] ?? 0;
          row.push(v);
          if (v !== 0) nz = true;
        }
        if (nz) queue.push({ ntAddr: base + r * 32, data: row });
      }
      // 属性表 64 字节（attrib[1024] 逐 tile 组 → 4x4 块编码）
      if (!nt.attrib || nt.attrib.length < 1024) continue;
      const attrTable = new Array<number>(64).fill(0);
      for (let ar = 0; ar < 8; ar++) {
        for (let ac = 0; ac < 8; ac++) {
          const tl = (nt.attrib[ar * 4 * 32 + ac * 4] ?? 0) & 3;
          const tr = (nt.attrib[ar * 4 * 32 + ac * 4 + 1] ?? 0) & 3;
          const bl = (nt.attrib[(ar * 4 + 2) * 32 + ac * 4] ?? 0) & 3;
          const br = (nt.attrib[(ar * 4 + 2) * 32 + ac * 4 + 1] ?? 0) & 3;
          attrTable[ar * 8 + ac] = tl | (tr << 2) | (bl << 4) | (br << 6);
        }
      }
      for (let ar = 0; ar < 8; ar++) {
        const row = attrTable.slice(ar * 8, ar * 8 + 8);
        if (row.some((v) => v !== 0)) {
          queue.push({ ntAddr: (base + 0x3c0 + ar * 8) & 0x3fff, data: row });
        }
      }
    }
    return queue;
  }

  /** fade 驱动（GT 时序：fadeIn → stable 满亮 → fadeOut 渐隐） */
  private applyFade(screen: OpeningScreenEntry, nesFrame: number): void {
    const store = this.store;
    const local = nesFrame - screen.startFrame;
    let fade: number;
    if (local < screen.fadeInFrames) {
      fade = screen.fadeInFrames <= 0 ? 0x0f : Math.floor((local * 0x0f) / screen.fadeInFrames);
    } else if (local < screen.fadeInFrames + screen.stableFrames) {
      fade = 0x0f;
    } else {
      const fo = local - screen.fadeInFrames - screen.stableFrames;
      fade = screen.fadeOutFrames <= 0 ? 0x0f : 0x0f - Math.floor((fo * 0x0f) / screen.fadeOutFrames);
    }
    const v = Math.max(0, Math.min(0x0f, fade)) & 0x0f;
    store.fade.bg = v;
    store.fade.spr = v;
  }

  /**
   * 供 Scene0Controller 承接 story_cup 精灵（f3600 切场景时 changeScene 清 OAM，
   * Scene0 Drift30 需要 story_cup 的 64 sprite 下漂）。
   */
  static loadStoryCupOam(store: DataStore): void {
    const screen: OpeningScreenEntry | undefined = OPENING_SCREENS[STORY_CUP_SCREEN_INDEX];
    if (!screen) return;
    const oam = screen.mid.oam;
    const shadow = store.oam.shadowOam;
    for (let i = 0; i < 64 && i < oam.length; i++) {
      const o = oam[i];
      const base = i * 4;
      shadow[base + 0] = (o[0] ?? 0xf8) & 0xff;
      shadow[base + 1] = (o[1] ?? 0) & 0xff;
      shadow[base + 2] = (o[2] ?? 0) & 0xff;
      shadow[base + 3] = (o[3] ?? 0) & 0xff;
    }
  }

  /** 供 Scene0Controller 读取 story_cup 的 mid palette（BG 渐隐底色） */
  static storyCupPalette(): { bg: ReadonlyArray<number>; spr: ReadonlyArray<number> } | null {
    const screen: OpeningScreenEntry | undefined = OPENING_SCREENS[STORY_CUP_SCREEN_INDEX];
    return screen ? screen.mid.pal : null;
  }
}

export type { OpeningScreenEntry, OpeningFrameState };

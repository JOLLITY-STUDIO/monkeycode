/**
 * OpeningSceneController — 片头序列场景(sceneId=100,附加场景)
 *
 * 数据源:OpeningFrameTable.ts(emu-full f10-f4200 逐帧 Ground Truth)
 *   - 每帧完整驱动:CHR per-scanline 计划 / palette / OAM diff / NT tile diff / 属性表 diff / scroll 寄存器
 *   - 完全逐帧还原片头动画(Tecmo logo / NTV logo / 10 屏字幕 / story_cup / title 装载与显示)
 *
 * 渲染协作:
 *   - CHR:本类只记录当前帧的 per-scanline plan,由 Tsubasa2.frame 在 PPU 渲染前
 *     通过 HeadlessRuntime.setPerScanlineChrPlan 交给 PPU mmap hook 按 scanline 切换
 *   - NT:本类把 diff 行暂存在队列,Tsubasa2.frame 在 renderCommit 后、PPU 渲染前
 *     调用 applyNtToPpu(ppu) 直接写入 ppu.nameTable
 *   - scroll:applyNtToPpu 在 PPU 渲染前把 GT 的 {v,h,vt,ht,fv,fh} 写入 PPU 寄存器,
 *     驱动 renderBgScanline 的 nametable 选择(cntV/cntH)
 *   - palette/OAM:通过 store 标准视图写入,由 InterruptService.renderCommit 正常提交
 *
 * 翻译原则(v2):无 CPU、无 bank 切换;行为数据直接查表。
 */
import { SceneController } from './SceneController';
import {
  getOpeningFrame,
  OpeningFrameEntry,
  OpeningFrameChr,
  OpeningFrameNtRow,
  OpeningFrameScroll,
} from '../../data/scene/OpeningFrameTable';
import {
  OPENING_SCREENS,
  getOpeningScreen,
  OpeningFrameState,
} from '../../data/scene/OpeningScreenTable';
import { Button } from '../system/InputService';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
import type { AudioService } from '../audio/AudioService';

/** OpeningScene 特殊场景号(BootRouter 注册表外附加) */
export const OPENING_SCENE_ID = 100;

/** 片头序列终点:emu-full 实测 f4200 切黑屏,GT 驱动含 f4200 后转 Scene2(hub) */
const OPENING_END_NES_FRAME = 4201;
/** H5 frame 0 = NES f10(tecmo_logo 起始) */
const H5_FRAME_OFFSET = 10;
/** story_cup 屏(Scene0 Drift30 下漂的精灵来源) */
const STORY_CUP_SCREEN_INDEX = 11;
/** title_menu 屏(START 跳过开场后落点)— emu f3727-f4096 title 显示 */
const TITLE_MENU_SCREEN_INDEX = 12;

export class OpeningSceneController extends SceneController {
  readonly sceneId = OPENING_SCENE_ID;
  private audio: AudioService | null = null;
  /** 当前帧 GT 数据 */
  private currentFrame: OpeningFrameEntry | null = null;
  /** 当前帧 CHR per-scanline 计划 */
  private currentChrPlan: ReadonlyArray<OpeningFrameChr> = [];
  /** 待写入 ppu.nameTable 的 NT tile 变化行 */
  private ntQueue: OpeningFrameNtRow[] = [];
  /** 待写入 ppu.nameTable 的属性表变化行 */
  private attrQueue: OpeningFrameNtRow[] = [];
  /** 当前帧 GT scroll 寄存器(供 applyNtToPpu 写入 PPU) */
  private currentScroll: OpeningFrameScroll = { v: 0, h: 0, vt: 0, ht: 0, fv: 0, fh: 0 };

  constructor(store: DataStore, input: InputService) {
    super(store, input);
  }

  attachAudio(audio: AudioService): void {
    this.audio = audio;
  }

  onEnter(): void {
    this.currentFrame = null;
    this.currentChrPlan = [];
    this.ntQueue = [];
    this.attrQueue = [];
    this.currentScroll = { v: 0, h: 0, vt: 0, ht: 0, fv: 0, fh: 0 };

    // PPU 状态:GT 数据表已经包含真实 fade 后的 palette,这里把 fade 固定为满亮,
    // 让 InterruptService.flushPalette 直接输出 palette 原值。
    this.store.fade.bg = 0x0f;
    this.store.fade.spr = 0x0f;
    // BG 从 $0000,SPR 从 $1000;NMI 由 renderCommit 第 8 步统一置位
    this.store.ppuState.ctrl = 0x88;
    // 显示 BG + SPR,不禁用左 8 列(与 emu 一致)
    this.store.ppuState.mask = 0x1e;
    // scrollFlag bit7=1:跳过 InterruptService.applyScrollBank02 以 scene.scrollX/scrollY
    // 覆盖 scroll 的路径;GT 直接通过 applyNtToPpu 写 PPU scroll 寄存器。
    this.store.scene.scrollX = 0;
    this.store.scene.scrollY = 1;
    this.store.scene.scrollFlag = 0x80;

    // 禁用 InterruptService 的 applyChrRequest / midFrameChrSwitch / applyChrFrom009e 路径,
    // 这些会覆盖本类的 per-scanline CHR 计划。
    this.store.writeByte(0x0075, 0);
    this.store.writeByte(0x0076, 0);
    this.store.writeByte(0x005e, 0);
    this.store.writeByte(0x005f, 0);
    this.store.writeByte(0x009c, 0);
    this.store.writeByte(0x009d, 0);
    this.store.writeByte(0x009e, 0);
    this.store.writeByte(0x009f, 0);
    this.store.writeByte(0x00a0, 0);
    this.store.writeByte(0x00a1, 0);

    // tecmo_logo 首屏播 BGM 0x01(与 boot logo 音乐一致)
    if (this.audio) {
      this.audio.playBgm(0x01);
    }
  }

  /** H5 帧 -> NES 绝对帧(GT 时间线基准) */
  private nesFrameOf(frame: number): number {
    return frame + H5_FRAME_OFFSET;
  }

  /**
   * START 跳过标志 — 用户按下 START 后,ROM 不走 Scene0 phase 序列过渡,
   * 而是直接装载并显示 title 屏。H5 翻译:在 OpeningScene 内部冻结,
   * apply 最后一帧 GT,然后 onUpdate 不再 advance (保留 PPU 上的 title GT 数据)。
   *
   * 不通过 BootRouter.changeScene(0/2) 切换 controller,因为:
   *   - changeScene 会 clear NT/OAM/shadowOam,把刚 apply 的 title GT 数据擦除
   *   - ROM 真实行为(emu press-start-to-title.log 实证):NMI dispatcher 直接调
   *     title handler,没有任何"渐隐→漂移→装载→滚动→显示"过渡 phase
   *
   * 注意:store.scene.currentSceneId 保持 OpeningSceneId (= 100),
   * 让 Tsubasa2.frame() 的 OpeningScene 分支继续调 applyNtToPpu + getChrPlan,
   * 确保最后一帧 GT 数据被写到 PPU;之后 ntQueue 由 applyFrameData 不再被写入,
   * getChrPlan 返回被冻结的 title CHR plan,画面稳定。
   */
  private skipped = false;

  onUpdate(frame: number): number | undefined {
    if (this.skipped) return undefined;

    const nesFrame = this.nesFrameOf(frame);

    // === START 按下:跳过开场,直接装载 title_menu 屏(贴 ROM 行为) ===
    // ROM asm 行为(emu press-start-to-title.log 实证):NMI dispatcher 检测 START →
    // 立刻装载 title NT/OAM/palette/CHR,无 Scene0 phase 序列过渡。
    // H5 翻译:OpeningScreenTable[12] = title_menu 包含完整 title 显示 GT。
    //   - 装 NT 4 nametables tile + attrib → store.writeByte 写到 PPU $2000-
    //   - 装 64 sprite OAM (4-tuple [y,tile,attr,x]) → store.oam.shadowOam
    //   - 装 BG/SPR palette → store.palette.loadBg/loadSpr
    //   - 装 CHR plan → this.currentChrPlan (HeadlessRuntime per-scanline)
    // 然后 set skipped=true 冻结 controller,后续帧不再 applyFrameData。
    if (this.input.isPressed(1, Button.Start)) {
      this.applyTitleMenuScreen();
      this.skipped = true;
      return undefined;
    }

    if (nesFrame >= OPENING_END_NES_FRAME) {
      // 片头完整播完(含 title 装载/显示),转 Scene2(hub idle)保持最后画面,
      // 不再走 Scene0 的 BgFadeOut/Drift30 近似逻辑。
      return 2;
    }
    const fr = getOpeningFrame(nesFrame);
    if (!fr) return undefined;
    this.applyFrameData(fr);
    return undefined;
  }

  /** 把单帧 GT 数据(palette/OAM/CHR plan/NT/attr/scroll)应用到 store + 控制器内部缓冲 */
  private applyFrameData(fr: OpeningFrameEntry): void {
    this.currentFrame = fr;

    // 调色板:仅在有变化时写入(节省写入)
    if (fr.p) {
      this.store.palette.loadBg(fr.p.bg);
      this.store.palette.loadSpr(fr.p.spr);
    }

    // OAM:应用与上帧的差异
    this.applyOamDiff(fr.o);

    // CHR 计划:由 Tsubasa2.frame 渲染前交给 HeadlessRuntime
    this.currentChrPlan = fr.c;

    // NT 与属性表变化行:供 applyNtToPpu 在 renderCommit 后写入 ppu
    this.ntQueue = fr.n.slice();
    this.attrQueue = fr.a.slice();

    // scroll 寄存器:供 applyNtToPpu 在 PPU 渲染前写入
    this.currentScroll = fr.s;
  }

  /** 供 Tsubasa2.frame 取本帧 CHR per-scanline 计划 */
  getChrPlan(): ReadonlyArray<OpeningFrameChr> {
    return this.currentChrPlan;
  }

  /**
   * 在 InterruptService.renderCommit 之后、PPU 渲染之前调用。
   * 直接把本帧 NT/属性表 diff 写入 ppu.nameTable,并写入 GT scroll 寄存器,
   * 让 PPU renderBgScanline 按 cntV/cntH 选择正确的 nametable。
   */
  applyNtToPpu(ppu: any): void {
    if (!ppu || !ppu.nameTable) return;

    // GT 驱动 scroll 寄存器:决定 nametable 选择(v/h)与细/粗滚动(vt/ht/fv/fh)
    const s = this.currentScroll;
    ppu.regV = s.v & 1;
    ppu.regH = s.h & 1;
    ppu.regVT = s.vt & 0x1f;
    ppu.regHT = s.ht & 0x1f;
    ppu.regFV = s.fv & 7;
    ppu.regFH = s.fh & 7;

    // GT 数据的 ni 是逻辑 nametable 号（0-3），必须经 PPU ntable1 映射表转换
    // 为物理 nameTable 索引。水平镜像时 NT1($2400) 与 NT0($2000) 共享物理表 0，
    // 若直接 ppu.nameTable[row.ni] 会把数据写到孤立的 nameTable[1]，导致渲染时读不到。
    for (const row of this.ntQueue) {
      const nt = ppu.nameTable[ppu.ntable1[row.ni]];
      if (!nt || !nt.tile) continue;
      const base = row.r * 32;
      for (let c = 0; c < 32; c++) {
        nt.tile[base + c] = row.d[c] & 0xff;
      }
    }
    for (const row of this.attrQueue) {
      const nt = ppu.nameTable[ppu.ntable1[row.ni]];
      if (!nt || !nt.attrib) continue;
      this.applyAttrRow(nt, row.r, row.d);
    }
    this.ntQueue = [];
    this.attrQueue = [];
  }

  /** 标准 64 字节属性表行 -> 960 项逐 tile attrib(PPU 期望 palette group 偏移 0/4/8/12) */
  private applyAttrRow(nt: any, ar: number, row8: ReadonlyArray<number>): void {
    for (let ac = 0; ac < 8; ac++) {
      const v = row8[ac] & 0xff;
      const baseY = ar * 4;
      const baseX = ac * 4;
      // NES quirk:属性表字节同时写入 tile[0x3C0+addr]("attributes as tiles",
      // 滚动进入属性表区域时按 tile 取;emu nt.json 的 tile[960..1023] 含此)
      if (nt.tile) nt.tile[0x3c0 + ar * 8 + ac] = v;
      for (let dy = 0; dy < 4; dy++) {
        for (let dx = 0; dx < 4; dx++) {
          // group = 2x2 子块索引:dy>=2 -> bit2, dx>=2 -> bit0(勿再 <<1,
          // 否则 dy=2 得 4,超出 8 位导致下半块永远读到 0)
          const group = (dy & 2) | ((dx & 2) >> 1); // 0,1,2,3
          const pal = (v >> (group * 2)) & 3;
          const ty = baseY + dy;
          const tx = baseX + dx;
          // 写满 32x32(含 30-31 行),与硬件 writeAttrib 一致(emu attrib 数组含 960-1023)
          if (ty < 32 && tx < 32) {
            nt.attrib[ty * 32 + tx] = pal << 2;
          }
        }
      }
    }
  }

  /**
   * START 跳过开场 → 直接装载 title_menu 屏(EMU f3727-f4096 title 显示 GT)。
   *
   * 与 BootRouter.changeScene(0) 不同(后者会触发 Scene0 phase 序列过渡):
   *   - 这里一次性把 4 个 nametables tile + attrib + 64 sprite + palette + CHR plan
   *     全部写入 store,由 InterruptService.renderCommit 下一帧统一刷到 PPU。
   *   - 不清 OAM/shadowOam(直接覆盖)
   *   - 不走 Scene0 phase 序列(BgFadeOut/Drift30/LoadChr17/Scroll51/Wait240 etc.)
   *
   * 数据源:`OpeningScreenTable.TITLE_MENU_SCREEN_INDEX` (id=12)
   * - mid.pal:  BG/SPR palette (16 byte each)
   * - mid.oam:  64 sprite [Y, tile, attr, X] 4-tuple
   * - mid.nt:   4 个 nametable (tile[32x32] + attrib[32x32])
   * - screen.chr: 8 个 1KB CHR bank 编号 (per-scanline 单 plan)
   */
  private applyTitleMenuScreen(): void {
    const screen = OPENING_SCREENS[TITLE_MENU_SCREEN_INDEX];
    if (!screen) return;
    const store = this.store;
    const mid: OpeningFrameState = screen.mid;

    // 1. Palette: BG + SPR (满亮 — mid.pal 已是 fade 后的真实色)
    store.palette.loadBg(mid.pal.bg);
    store.palette.loadSpr(mid.pal.spr);

    // 2. OAM: 64 sprite (4-tuple [Y, tile, attr, X] → shadowOam)
    this.applyOamFull(mid.oam);

    // 3. NT: 4 个 nametables 完整 tile + attrib (写到 store,$2000+$3C0-$23FF)
    //    store.writeByte 缓存 → renderCommit step 1 flushVram 推到 PPU VRAM
    for (let ni = 0; ni < mid.nt.length && ni < 4; ni++) {
      const n = mid.nt[ni];
      const nametableBase = 0x2000 + ni * 0x400;
      // tile[0..1023] → $2000+$1FFF
      for (let i = 0; i < 1024 && i < n.tile.length; i++) {
        store.writeByte(nametableBase + i, n.tile[i] & 0xff);
      }
      // attrib[0..1023] → $23C0-$23FF (NES 属性表区域,起 nametableBase+$3C0)
      const attribBase = nametableBase + 0x3C0;
      for (let i = 0; i < 1024 && i < n.attrib.length; i++) {
        store.writeByte(attribBase + i, n.attrib[i] & 0xff);
      }
    }

    // 4. CHR plan: 全屏使用 title_menu 装载的 bank set
    //    (per-scanline plan 一段 [s=0, b=chr[]],HeadlessRuntime 在 scanline 0 切)
    this.currentChrPlan = [{ s: 0, b: screen.chr.slice() }];

    // 5. PPU 显示状态:保留 onEnter 的 BG $0000 + SPR $1000 + NMI on,
    //    确保 fade 满亮,picture 立即可见
    store.ppuState.ctrl = 0x88;
    store.ppuState.mask = 0x1e;
    store.fade.bg = 0x0f;
    store.fade.spr = 0x0f;

    // 6. scroll: 重置为 (0,0) (title 是静态画面)
    this.currentScroll = { v: 0, h: 0, vt: 0, ht: 0, fv: 0, fh: 0 };
    store.scene.scrollX = 0;
    store.scene.scrollY = 0;
    store.scene.scrollFlag = 0x80; // 保留:跳过 renderCommit.applyScrollBank02 覆盖
  }

  /** 应用 OAM 全量 (4-tuple [Y, tile, attr, X])到 shadowOam — 64 sprite 完整覆盖 */
  private applyOamFull(oam: ReadonlyArray<ReadonlyArray<number>>): void {
    const shadow = this.store.oam.shadowOam;
    for (let i = 0; i < 64 && i < oam.length; i++) {
      const o = oam[i];
      const base = i * 4;
      shadow[base + 0] = (o[0] ?? 0xf8) & 0xff; // Y
      shadow[base + 1] = (o[1] ?? 0) & 0xff;    // tile
      shadow[base + 2] = (o[2] ?? 0) & 0xff;    // attr
      shadow[base + 3] = (o[3] ?? 0) & 0xff;    // X
    }
    // 剩余 sprite 隐藏
    for (let i = oam.length; i < 64; i++) {
      const base = i * 4;
      shadow[base + 0] = 0xf8;
      shadow[base + 1] = 0xf8;
      shadow[base + 2] = 0xf8;
      shadow[base + 3] = 0xf8;
    }
  }

  /** 应用 OAM diff 到 shadowOam */
  private applyOamDiff(diff: ReadonlyArray<ReadonlyArray<number>>): void {
    const shadow = this.store.oam.shadowOam;
    for (const entry of diff) {
      const idx = entry[0] ?? 0;
      if (idx < 0 || idx >= 64) continue;
      const base = idx * 4;
      shadow[base + 0] = (entry[1] ?? 0xf8) & 0xff;
      shadow[base + 1] = (entry[2] ?? 0) & 0xff;
      shadow[base + 2] = (entry[3] ?? 0) & 0xff;
      shadow[base + 3] = (entry[4] ?? 0) & 0xff;
    }
  }

  /**
   * 供 Scene0Controller 承接 story_cup 精灵(f3600 切场景时 changeScene 清 OAM,
   * Scene0 Drift30 需要 story_cup 的 64 sprite 下漂)。
   */
  static loadStoryCupOam(store: DataStore): void {
    const screen = OPENING_SCREENS[STORY_CUP_SCREEN_INDEX];
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

  /** 供 Scene0Controller 读取 story_cup 的 mid palette(BG 渐隐底色) */
  static storyCupPalette(): { bg: ReadonlyArray<number>; spr: ReadonlyArray<number> } | null {
    const screen = OPENING_SCREENS[STORY_CUP_SCREEN_INDEX];
    return screen ? screen.mid.pal : null;
  }
}

export type { OpeningFrameEntry };

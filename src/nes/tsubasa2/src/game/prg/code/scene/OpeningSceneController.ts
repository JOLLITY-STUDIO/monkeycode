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
} from '../../data/scene/OpeningScreenTable';
import { Button } from '../system/InputService';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
import type { AudioService } from '../audio/AudioService';
import { TITLE_MENU_SCENE_ID } from './TitleMenuSceneController';

/** OpeningScene 特殊场景号(BootRouter 注册表外附加) */
export const OPENING_SCENE_ID = 100;

/** 片头序列终点:emu-full 实测 f4200 切黑屏,GT 驱动含 f4200 后转 Scene2(hub) */
const OPENING_END_NES_FRAME = 4201;
/** H5 frame 0 = NES f10(tecmo_logo 起始) */
const H5_FRAME_OFFSET = 10;
/** story_cup 屏(Scene0 Drift30 下漂的精灵来源) */
const STORY_CUP_SCREEN_INDEX = 11;

export class OpeningSceneController extends SceneController {
  readonly sceneId = OPENING_SCENE_ID;
  private audio: AudioService | null = null;
  /** H5 内部片头帧计数器（onUpdate 自增；每帧 +1）。 */
  private h5Frame = 0;
  /** 当前帧 GT 数据 */
  private currentFrame: OpeningFrameEntry | null = null;
  /** 当前帧 CHR per-scanline 计划 */
  private currentChrPlan: ReadonlyArray<OpeningFrameChr> = [];
  /** 待写入 ppu.nameTable 的 NT tile 变化行 */
  private ntQueue: OpeningFrameNtRow[] = [];
  /** 待写入 ppu.nameTable 的属性表变化行 */
  private attrQueue: OpeningFrameNtRow[] = [];
  /** 当前帧 GT scroll 寄存器(供 applyNtToPpu 写入 PPU) */
  private currentScroll: OpeningFrameScroll = { v: 0, h: 0, vt: 0, ht: 0, fv: 0, fh: 0, cv: 0, ch: 0, cvt: 0, cht: 0 };

  constructor(store: DataStore, input: InputService) {
    super(store, input);
  }

  attachAudio(audio: AudioService): void {
    this.audio = audio;
  }

  onEnter(): void {
    this.h5Frame = 0;
    this.currentFrame = null;
    this.currentChrPlan = [];
    this.ntQueue = [];
    this.attrQueue = [];
    this.currentScroll = { v: 0, h: 0, vt: 0, ht: 0, fv: 0, fh: 0, cv: 0, ch: 0, cvt: 0, cht: 0 };

    // PPU 状态:GT 数据表已经包含真实 fade 后的 palette,这里把 fade 固定为满亮
    // 原样输出 palette 索引。注意 FadeView 读写 $004A/$004B 带 & 0x0F 掩码,
    // 写 0x10 会被截断成 0 → flushPalette 全写 0x0F 黑屏;满亮必须写 0x0F(=15,
    // fade 表 block 1-3 第 14/15 项均为原色回显,0x0F 是正确 sentinel)。
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
  private nesFrameOf(): number {
    return this.h5Frame + H5_FRAME_OFFSET;
  }

  /**
   * START 跳过标志(进 TitleMenuScene 后此 flag 不再生效,跳走由 BootRouter 控制)。
   * 保留仅供 OpeningScene 内连续双帧 START 防御性 short-circuit。
   */
  private skipped = false;

  onUpdate(_frame: number): number | undefined {
    if (this.skipped) return undefined;

    // === START 按下:跳过开场,跳到 TitleMenuScene(贴 ROM 行为) ===
    // ROM asm 行为(emu press-start-to-title.log 实证):NMI dispatcher 检测 START →
    // 立刻装载 title 屏(由独立 TitleMenuSceneController 承接,非 OpeningScene)。
    // H5 翻译:OpeningSceneController 不再持有 title 装载逻辑,
    //   return TITLE_MENU_SCENE_ID → BootRouter.changeScene(200) →
    //   clearNametable/hideOam 自动洗 → TitleMenuSceneController.onEnter
    //   一次性装载完整 title 屏 GT(palette/NT/OAM/CHR plan)。
    if (this.input.isPressed(1, Button.Start)) {
      this.skipped = true;
      return TITLE_MENU_SCENE_ID;
    }

    // 片头推进(逐帧走 GT 数据)
    // ⚠ 时序：先取当前 h5Frame 对应 NES 帧，再自增，确保 H5 第 0 帧渲染 GT f10。
    // 旧实现先自增导致第 0 帧渲染 f11，首帧 120 行 NT 数据被跳过。
    const nesFrame = this.nesFrameOf();
    this.h5Frame++;

    if (this.h5Frame >= OPENING_END_NES_FRAME - H5_FRAME_OFFSET) {
      // === 片头播完但用户没按 START:重新跑 opening ===
      // 原始 ROM 行为:opening 后无操作保持显示 → 用户按 START → title。
      // H5 翻译:opening 已播完但 START 未按 → 重置 h5Frame=0,下一帧从 f10 重新播。
      // (因为 GT 是逐帧表,h5Frame 直接归零即可;内部 NT/OAM/scroll state 由 applyFrameData(f0) 重铺)
      this.resetForLoop();
      return undefined;
    }

    const fr = getOpeningFrame(nesFrame);
    if (!fr) return undefined;
    this.applyFrameData(fr);
    return undefined;
  }

  /**
   * 重置 opening 内部状态以便从 f10 重新播(用户未按 START 走 loop)。
   * 不重置 skipped 标志 — 用户 START 后永远不进 opening。
   * 不重置 audio / ppuState.ctrl / mask / scrollFlag 等 onEnter 级别一次性设置 — 这些在 onEnter 已经设过,
   * 不需要每帧重置。
   */
  private resetForLoop(): void {
    this.h5Frame = 0;
    this.currentFrame = null;
    this.currentChrPlan = [];
    this.ntQueue = [];
    this.attrQueue = [];
    this.currentScroll = { v: 0, h: 0, vt: 0, ht: 0, fv: 0, fh: 0, cv: 0, ch: 0, cvt: 0, cht: 0 };
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
    // V0.7+ 防御:mini-program runtime 用 esbuild minifier, 一些属性访问 fr 不存在
    // (e.g. `ppu.regV` 在某帧 attr bit 变化时可能未初始化), 让 ReferenceError 跳出.
    // 静默吞掉, console.warn 仅一次用于诊断。
    try {
      this._applyNtToPpuImpl(ppu);
    } catch (e) {
      if (!this._applyNtLogged) {
        console.warn('[OpeningScene.applyNtToPpu] 内部异常已 catch, 后续帧继续. err=', (e as Error).message);
        this._applyNtLogged = true;
      }
    }
  }

  private _applyNtLogged = false;

  /** applyNtToPpu 真实实现 (V0.7+ try/catch 包裹) */
  private _applyNtToPpuImpl(ppu: any): void {
    // GT 驱动 scroll 寄存器:决定 nametable 选择(v/h)与细/粗滚动(vt/ht/fv/fh)
    const s = this.currentScroll;
    ppu.regV = s.v & 1;
    ppu.regH = s.h & 1;
    ppu.regVT = s.vt & 0x1f;
    ppu.regHT = s.ht & 0x1f;
    ppu.regFV = s.fv & 7;
    ppu.regFH = s.fh & 7;

    // 渲染起始计数器:
    // 取 GT 的 pre-render 时刻 reg* 值(v,h,vt,ht,fv,fh)作为本帧渲染起始。
    // PPU pre-render scanline 会把 cnt* 从 reg*(或本 override)初始化,dummy
    // 渲染推进后进入可见行。GT 的 cv/ch/cvt/cht 是同刻计数器(与 reg* 相等),
    // 仅作参考;override 统一用 reg*。
    // 说明:GT s 字段来自 emu pre-render 真值(vblank $2005/$2006 写入之后),
    // 已覆盖标题帘幕滚动(f3725-3782 的 vt/fv 逐帧变化),无需再特判。
    ppu.renderStartOverride = {
      cntFV: s.fv & 7,
      cntV: s.v & 1,
      cntH: s.h & 1,
      cntVT: s.vt & 0x1f,
      cntHT: s.ht & 0x1f,
    };

    // GT 数据的 ni 来自 emu nt.json 的物理 nameTable 索引(0-3),直接写到
    // ppu.nameTable[ni] 即可。不要经 ntable1 再做逻辑→物理映射,否则水平镜像
    // 下 NT1/NT3 的零行会覆盖到 NT0/NT2 的同名物理表,把真实数据洗成 0。
    for (const row of this.ntQueue) {
      const nt = ppu.nameTable[row.ni];
      if (!nt || !nt.tile) continue;
      const base = row.r * 32;
      for (let c = 0; c < 32; c++) {
        nt.tile[base + c] = row.d[c] & 0xff;
      }
    }
    for (const row of this.attrQueue) {
      const nt = ppu.nameTable[row.ni];
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

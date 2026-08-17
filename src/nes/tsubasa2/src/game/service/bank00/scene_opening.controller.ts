/**
 * 标题场景控制器 — 标题菜单背景 (Cut 0x17)
 *
 * ⚠️ 重要修正: 原先把 Cut 0x17 误判为“开场动画 (TECMO Theater)”，
 * 实际通过 screenshots 与 CHR bank 暴力渲染对比确认:
 *   Cut 0x17 的 NT 数据渲染出来的是【标题菜单背景】
 *   (大标题“キャプテン翼”、KICK OFF/CONTINUE 菜单框、奖杯、版权信息)。
 * 真正的开场动画 (小女孩 + TECMO THEATER 字母) 是另一段逻辑，数据待提取。
 *
 * 职责边界:
 *   - 负责 SceneRoot.TITLE 阶段的标题菜单背景 NT + 调色板
 *   - 不负责 BOOT 阶段真正的 TECMO Theater 开场动画 (TODO)
 *   - 由 BootService 在 TITLE 阶段调用 init() 灌入背景
 *
 * H5: 每帧调用 update()，由外部渲染器消费 displayState 绘制。
 */

import type { DataStore } from '../../data/DataStore';
import { BUTTON } from '../../../core/types';
import { OpeningShot } from '../../data/scene/index';
import { ScriptVM, type ScriptVMState, type ScriptTextLine } from './script-vm';
import { CUT_0x17_NT0, CUT_0x17_ATTR0, CUT_0x17_BG_PALETTE, CUT_0x17_SPR_PALETTE, CUT_0x17_BG_GRP, CUT_0x17_SPR_GRP } from '../../data/ppu/nametable/cut/cut_0x17_nt';
import { MODE_BLOCK_PTRS, applyModeBlocks } from '../../data/ppu/nametable/cut/cut0x17-mode-blocks';
import PRG_BANK_06 from '../../data/prg-bank-06';
import { NES_PALETTE } from '../../data/ppu/pallete/nes-pallete-table';
import type { PaletteTable, PaletteEntry } from '../../model/types';

// ═══════════════════════════════════════════════════════════════
// Cut 0x17 标题菜单真实 CHR bank (暴力渲染验证: bank 14/15 可出画面)
// ═══════════════════════════════════════════════════════════════

/** 标题菜单背景 NT tile 所在的 CHR bank (原写死 0 导致黑屏) */
const CUT_0x17_CHR_BANK = 14;

// ═══════════════════════════════════════════════════════════════
// 开场镜头表 (TODO: 待真正 TECMO Theater 开场数据提取后填充)
// 当前开场数据未提取, 镜头表为空桩; 硬编码镜头驱动逻辑暂不启用。
// ═══════════════════════════════════════════════════════════════
const SHOT_TEXT: Record<number, { jp: string; en: string }> = {};
const SHOT_FRAMES: Record<number, number> = {};


// ═══════════════════════════════════════════════════════════════
// 显示状态 (消费型 — 每帧由 Render 消费后重置)
// ═══════════════════════════════════════════════════════════════

export interface OpeningDisplayState {
  /** 当前镜头索引 */
  shot: OpeningShot;

  /** 当前镜头已过帧数 */
  shotFrame: number;

  /** 当前镜头总帧数 */
  shotTotalFrames: number;

  /** 显示文本 */
  text: string;

  /** 文本副标题 */
  subText: string;

  /** 是否显示 Logo */
  showLogo: boolean;

  /** 是否显示人物肖像 */
  showPortrait: boolean;

  /** 镜头切换过渡 (0-1) */
  transitionAlpha: number;

  /** 当前镜头是否完成 */
  shotComplete: boolean;

  /** 背景颜色索引 */
  bgColor: number;

  /** 文本闪烁标志 (每30帧切换) */
  textBlink: boolean;

  // ── 脚本驱动字段 (仅脚本模式有效) ──

  /** 是否使用脚本驱动模式 */
  scriptDriven: boolean;

  /** 脚本当前场景数据 ID (LOAD_SCENE_DATA 参数) */
  scriptSceneDataId: number;

  /** 脚本当前显示模式 (SET_MODE 参数) */
  scriptMode: number;

  /** 脚本加载的精灵 ID 列表 (LOAD_SPRITE 参数) */
  scriptSpriteIds: number[];

  /** 脚本对象队列 (QUEUE_OBJ 参数) */
  scriptObjectQueue: number[];

  /** 脚本文本行 (TEXT 指令累积, 每行一个字符串) */
  scriptTextLines: string[];

  /** 脚本文本行原始字节 (TEXT 指令累积, 供 CHR tile 渲染) */
  scriptTextBytes: number[][];

  /** 打字机渐显: 当前已显示的字符总数 (跨所有行累计) */
  textRevealChars: number;

  /** 文本位置 X (SET_POS, tile 坐标; -1 = 未设置走默认居中) */
  scriptPosX: number;

  /** 文本位置 Y (SET_POS, tile 坐标; -1 = 未设置走默认居中) */
  scriptPosY: number;

  /** 脚本剩余等待帧数 (WAIT 指令) */
  scriptWaitFrames: number;

  /** 脚本是否在循环 (SET_PTR 跳回已访问地址) */
  scriptLooping: boolean;

  /** 脚本最后执行的指令 (调试用) */
  scriptLastInstr: string;
}

// ═══════════════════════════════════════════════════════════════
// 开场镜头控制器
// ═══════════════════════════════════════════════════════════════

export class OpeningSceneController {
  private _store: DataStore;

  /** 当前镜头 */
  private _shot: OpeningShot = OpeningShot.LOGO;

  /** 当前镜头帧计数 */
  private _shotFrame = 0;
 

  /** 是否完成全部开场 */
  private _complete = false;

  /** 上次按键值 (上升沿检测) */
  private _lastButtons = 0;

  /** 文本闪烁计时 */
  private _blinkTimer = 0;

  /** 过渡计时 */
  private _transitionTimer = 0;

  /** START 被按下 (当前帧) */
  private _startPressed = false;

  // ── 脚本驱动模式 ──

  /**
   * 是否启用脚本驱动模式。
   *
   * ⚠️ 注意: 脚本 0x00 是「标题/KICK OFF 菜单」脚本 (含 KICK OFF/CONTINUE
   * 文本字节 + SET_PTR $A020 循环), 不是 TECMO Theater 开场动画脚本。
   * 若从开场第一帧加载执行, 其标题文本字节会被渲染成乱码叠在开场画面上。
   * 因此开场动画 (Cut 0x17) 采用硬编码时间表驱动, 与原始 Bank00 主循环行为一致。
   */
  private _useScript = false;

  /** 脚本虚拟机实例 (脚本驱动模式专用, 默认未启用) */
  private _vm: ScriptVM | null = null;

  /** 脚本执行状态快照 (每帧更新) */
  private _vmState: ScriptVMState | null = null;

  /** 脚本循环次数 (脚本 0x00 是循环脚本) */
  private _scriptLoopCount = 0;

  /**
   * Cut 0x17 NT 是否已灌入 DataStore。
   * 注: Bank00 主循环的首帧会执行 ntAttrClear() 清空 NT,
   *     因此开场控制器的首帧 update() 必须重新灌入一次。
   */
  private _cutApplied = false;

  /** 上一次脚本场景数据 ID (LOAD_SCENE_DATA 变化时重灌 NT) */
  private _lastSceneDataId = -1;

  /** 上一次脚本显示模式 (SET_MODE 变化时触发模式块精灵加载) */
  private _lastMode = -1;

  /**
   * 首帧/场景变化时需要重灌 Cut 0x17 背景。
   * Bank00 主循环首帧执行 ntAttrClear() 会清空 NT,
   * 因此 init() 灌入的数据在首帧 update() 前会被抹掉。
   */
  private _needsReapply = true;

  /** 脚本模式下的镜头映射 (sceneDataId+mode → OpeningShot) */
  private static readonly SCRIPT_SHOT_MAP: Record<string, OpeningShot> = {
    '1_0': OpeningShot.LOGO,        // 场景1 + mode 0 → LOGO
    '1_5': OpeningShot.TSUBASA,     // 场景1 + mode 5 → TSUBASA (角色展示)
    '1_2': OpeningShot.HYUGA,       // 场景1 + mode 2 → HYUGA
    '1_1': OpeningShot.MISAKI,      // 场景1 + mode 1 → MISAKI
  };

  /** 硬编码镜头 → SET_MODE 模式块 (原版脚本 0x00 各镜头实际使用的 mode) */
  private static readonly SHOT_MODE: Record<number, number> = {
    [OpeningShot.LOGO]: 0,          // TECMO 字母
    [OpeningShot.TSUBASA]: 1,       // 翼名字横幅
    [OpeningShot.HYUGA]: 2,         // 日向名字横幅
    [OpeningShot.MISAKI]: 1,        // 岬 (模式块 1: 通用名字横幅区)
    [OpeningShot.WAKABAYASHI]: 2,   // 若林 (模式块 2: 通用名字横幅区)
    [OpeningShot.WORLD_CUP]: 3,     // 世界杯标题文字块
  };

  constructor(store: DataStore) {
    this._store = store;
  }

  // ── 公开属性 ──

  get shot(): OpeningShot { return this._shot; }
  get complete(): boolean { return this._complete; }

  /** 当前显示状态快照 (View 层消费) */
  getDisplayState(): OpeningDisplayState {
    return this._buildDisplayState();
  }
 
  /** 推进到下一镜头 (外部兜底计时驱动) */
  nextShot(): void {
    this._startPressed = false;
    this._nextShot();
  }
 

  // ──────────────────────────────────────────────
  // 初始化 (对应 sceneLoad(0x17) 后首次进入)
  // ──────────────────────────────────────────────

  /**
   * 初始化开场镜头序列。
   * 对应原始 $8053-$8077 (scene init chain):
   *   NT clear → palette → sceneLoad → VRAM → PPU
   *
   * 脚本模式: 创建 ScriptVM 加载脚本 0x00, 启动执行
   */
  init(): void {
    this._shot = OpeningShot.LOGO;
    this._shotFrame = 0;
    this._complete = false;
    this._blinkTimer = 0;
    this._transitionTimer = 0;
    this._startPressed = false;
    this._scriptLoopCount = 0;
    this._cutApplied = false;
    this._lastSceneDataId = -1;
    this._lastMode = -1;
    this._needsReapply = true;

    // 将 Cut 0x17 解码数据 (bank07 指针 → bank08 meta-tile) 灌入数据中心
    // 注: 首帧 update() 会因 Bank00 ntClear() 再重灌一次 (_needsReapply)
    this._applyCutData();
    this._cutApplied = true;

    // 不再应用 LOGO 模式块 — 那是开场动画 (TECMO 字母) 内容,
    // 标题菜单背景仅由 Cut 0x17 NT 数据构成 (已修正为正确 CHR bank 14)

    // 设 ram_00ED=0x0A → 对应 $808D
    this._store.write('ram_00ED', 0x0A);

    // 启动脚本虚拟机 (脚本 0x00 = BOOT/标题画面)
    if (this._useScript) {
      try {
        this._vm = new ScriptVM(0x00);
        this._vm.start();
        this._vmState = this._vm.getState();
      } catch (e) {
        // 脚本加载失败, 降级到硬编码模式
        console.warn('[OpeningScene] 脚本 0x00 加载失败, 降级到硬编码模式:', e);
        this._useScript = false;
        this._vm = null;
        this._vmState = null;
      }
    }
  }

  // ──────────────────────────────────────────────
  // Cut 0x17 解码数据应用 (纯数据 → DataStore)
  // ──────────────────────────────────────────────

  /**
   * BOOT 阶段占位初始化 (TECMO 字母模式块)。
   * ⚠️ 真正的开场动画 (小女孩 + TECMO THEATER 字母) 数据尚未提取 (TODO),
   *     此处仅清屏 + 应用模式块 0 (TECMO 字母) 作为过渡画面。
   *     标题菜单背景 (Cut 0x17) 在 TITLE 阶段由 init() 灌入。
   */
  initBoot(): void {
    // 清空 NT0 (对应 ntAttrClear 语义)
    for (let y = 0; y < 30; y++) {
      for (let x = 0; x < 32; x++) {
        this._store.writeNT(0, x, y, { tile: 0, palette: 0, bank: 0, flipH: false, flipV: false, behindBg: false });
      }
    }
    // TECMO 字母模式块 (mode 0, 占位开场画面)
    this._applyModeSprites(0);
  }

  /**
   * 将 Cut 0x17 (标题菜单背景) 的 NT/属性/调色板数据写入数据中心。
   * 数据由 _extract_scene17_pure_ts.cjs 纯 TS 解码生成 (bank07 指针 → bank08 meta-tile)。
   *
   * 对应原始链路: $8AF7 场景加载 → $8E15 渲染 NT → $8FD1 属性 → 调色板写 $3F00
   */
  private _applyCutData(): void {
    const store = this._store;

    // 0) 场景调色板组号 ($8AF7 语义: header h[2]&0x3F → ram_0048, SPR 默认 0 → ram_0049)
    //    场景 0x17: BG grp=1, SPR grp=0 (供 $9A35/mainLoopInit2 paletteLoad 使用)
    store.write('ram_0048', CUT_0x17_BG_GRP);
    store.write('ram_0049', CUT_0x17_SPR_GRP);

    // 0.5) 清空 NT (对应原版 CLEAR_RESET 语义): 防止旧镜头 tile/模式块残留叠加
    for (let y = 0; y < 30; y++) {
      for (let x = 0; x < 32; x++) {
        store.writeNT(0, x, y, { tile: 0, palette: 0, bank: 0, flipH: false, flipV: false, behindBg: false });
      }
    }

    // 1) NT0: 扁平 960 字节 → 32×30 tile 网格 (tile 0 = 空, palette 由 ATTR 象限推导)
    for (let i = 0; i < 960; i++) {
      const x = i % 32;
      const y = (i / 32) | 0;
      const tile = CUT_0x17_NT0[i];
      if (tile === 0) continue;
      // NES 属性表: 每个字节覆盖 2×2 tile, 象限 2bit 决定 palette 组
      const attrIdx = ((y >> 2) << 3) | (x >> 2);
      const q = (((y & 2) >> 1) << 1) | ((x & 2) >> 1);
      const palette = (CUT_0x17_ATTR0[attrIdx] >> (q * 2)) & 3;
      store.writeNT(0, x, y, { tile, palette, bank: CUT_0x17_CHR_BANK, flipH: false, flipV: false, behindBg: false });
    }

    // 2) 调色板: 16 字节 NES 索引 → RGBA PaletteTable ($3F00/$3F10 语义)
    store.setPaletteTable(this._nesPaletteToTable(
      CUT_0x17_BG_PALETTE,
      CUT_0x17_SPR_PALETTE,
    ));
  }

  /** 16 字节 NES 调色板索引 → PaletteTable (BG 第 1 色为通用背景色) */
  private _nesPaletteToTable(bg: readonly number[], spr: readonly number[]): PaletteTable {
    const toColor = (idx: number) => {
      const p = idx * 3;
      return { r: NES_PALETTE[p], g: NES_PALETTE[p + 1], b: NES_PALETTE[p + 2], a: 255 };
    };
    const bg0 = toColor(bg[0] ?? 0x0F);
    const mkEntry = (arr: readonly number[], start: number): PaletteEntry => ({
      colors: [bg0, toColor(arr[start + 1]), toColor(arr[start + 2]), toColor(arr[start + 3])],
    });
    return {
      bgPalettes: [
        mkEntry(bg, 0),
        mkEntry(bg, 4),
        mkEntry(bg, 8),
        mkEntry(bg, 12),
      ],
      sprPalettes: [
        mkEntry(spr, 0),
        mkEntry(spr, 4),
        mkEntry(spr, 8),
        mkEntry(spr, 12),
      ],
    };
  }

  /**
   * 加载指定显示模式的精灵/NT 模式块 (SET_MODE 语义)。
   *
   * 原版: bank6 $BB40 指针表 + $97B6 解码 → PPU Buffer → NMI 刷 Nametable。
   * H5: 解析模式块 → 直接写 DataStore NT。
   *
   * mode 0-3 有有效块链 (已验证); mode 4+ 原版即指向垃圾区不产生画面,
   * 表缩为 4 项后自然 return, 与原始行为一致。
   */
  private _applyModeSprites(mode: number): void {
    if (mode < 0 || mode >= MODE_BLOCK_PTRS.length) return;

    const ptr = MODE_BLOCK_PTRS[mode];
    const count = applyModeBlocks(this._store, ptr, (off: number) => {
      // 指针低 13 位即 bank6 数组偏移 (已验证)
      return off >= 0 && off < PRG_BANK_06.length ? PRG_BANK_06[off] : 0xFF;
    }, CUT_0x17_CHR_BANK);
    if (count > 0) {
      console.log(`[OpeningScene] SET_MODE ${mode} → 模式块写入 ${count} 块`);
    }
  }

  // ──────────────────────────────────────────────
  // 每帧更新 (由 Bank00.update() 每帧调用)
  // ──────────────────────────────────────────────

  /**
   * 每帧调用。处理动画帧推进和按键。
   *
   * 脚本模式: 先更新 ScriptVM, 再根据脚本状态映射镜头
   * 硬编码模式: 使用 SHOT_FRAMES 时间表推进镜头
   *
   * @param buttons 当前帧按键 bitmask
   * @returns 当前显示状态
   */
  update(buttons: number): OpeningDisplayState {
    this._detectInput(buttons);

    if (this._useScript && this._vm) {
      // 首帧重灌背景: Bank00 主循环首帧 ntAttrClear() 已清空 NT
      if (this._needsReapply) {
        this._applyCutData();
        this._needsReapply = false;
      }
      this._updateScriptAnimation();
    } else {
      // 首帧重灌背景 (硬编码模式同样需要): Bank00 ntAttrClear() 首帧会清空 NT
      if (this._needsReapply) {
        this._applyCutData();
        this._applyModeSprites(OpeningSceneController.SHOT_MODE[this._shot] ?? 0);
        this._needsReapply = false;
      }
      this._updateAnimation();
    }

    return this._buildDisplayState();
  }

  // ──────────────────────────────────────────────
  // 脚本驱动动画更新
  // ──────────────────────────────────────────────

  /**
   * 脚本驱动动画更新:
   *   1. 检测循环 → 循环超过 1 次后进入标题画面
   *   2. START 跳过当前 WAIT (将 waitFrames 清零)
   *   3. 调用 ScriptVM.update() 执行指令
   *   4. 根据脚本状态映射当前镜头
   */
  private _updateScriptAnimation(): void {
    if (this._complete || !this._vm) return;

    this._blinkTimer++;
    if (this._blinkTimer >= 60) {
      this._blinkTimer = 0;
    }
    if (this._transitionTimer > 0) {
      this._transitionTimer--;
    }

    // 脚本循环检测: 循环后开场结束, 标题场景由 BootService 流转
    if (this._vm.isLooping && this._scriptLoopCount === 0) {
      this._scriptLoopCount = 1;
      this._complete = true;
      return;
    }

    // START 跳过当前 WAIT (脚本模式)
    if (this._startPressed && this._vmState && this._vmState.waitFrames > 0) {
      // 跳过等待: 直接执行下一批指令
      // 注: ScriptVM 内部 waitFrames 是递减的, 这里通过多次 update 加速
      // 简化实现: 标记 START 已处理
      this._startPressed = false;
    }

    // 执行脚本
    const prevState = this._vmState;
    this._vmState = this._vm.update();

    // 镜头切换检测: sceneDataId 或 mode 变化时触发过渡
    if (prevState && this._vmState) {
      if (prevState.sceneDataId !== this._vmState.sceneDataId
          || prevState.mode !== this._vmState.mode) {
        this._transitionTimer = 15;
        this._shotFrame = 0;
      }
    }

    // 场景数据变化 → 重灌背景 (LOAD_SCENE_DATA 语义: 重新渲染场景)
    if (this._vmState && this._vmState.sceneDataId !== this._lastSceneDataId) {
      this._lastSceneDataId = this._vmState.sceneDataId;
      this._applyCutData();
    }

    // 显示模式变化 → 加载该模式对应的精灵/NT 模式块
    if (this._vmState && this._vmState.mode !== this._lastMode) {
      this._lastMode = this._vmState.mode;
      this._applyModeSprites(this._vmState.mode);
    }

    // 映射脚本状态到镜头
    this._mapScriptToShot();

    this._shotFrame++;
  }

  /**
   * 将脚本状态映射到 OpeningShot 枚举
   * 基于 sceneDataId + mode 组合查找
   */
  private _mapScriptToShot(): void {
    if (!this._vmState) return;

    const key = `${this._vmState.sceneDataId}_${this._vmState.mode}`;
    const mappedShot = OpeningSceneController.SCRIPT_SHOT_MAP[key];

    if (mappedShot !== undefined && mappedShot !== this._shot) {
      this._shot = mappedShot;
      this._shotFrame = 0;
      this._transitionTimer = 15;
    }
  }

  // ──────────────────────────────────────────────
  // 输入处理
  // ──────────────────────────────────────────────

  private _detectInput(buttons: number): void {
    // START 上升沿检测
    const startMask = BUTTON.START;
    const startEdge = (buttons & startMask) && !(this._lastButtons & startMask);
    this._startPressed = !!startEdge;

    this._lastButtons = buttons;
  }

  // ──────────────────────────────────────────────
  // 动画推进
  // ──────────────────────────────────────────────

  private _updateAnimation(): void {
    if (this._complete) return;

    this._shotFrame++;
    this._blinkTimer++;

    // 文本闪烁: 每 30 帧切换
    if (this._blinkTimer >= 60) {
      this._blinkTimer = 0;
    }

    // 过渡效果: 前 15 帧 fade in, 后 15 帧 fade out
    if (this._transitionTimer > 0) {
      this._transitionTimer--;
    }

    const maxFrames = 180;

    // START 跳过当前镜 或 帧数到达 → 下一镜 (最后一镜播完 → complete, 由 BootService 流转到 TITLE)
    if (this._startPressed || this._shotFrame >= maxFrames) {
      this._startPressed = false;
      this._nextShot();
    }
  }

  /**
   * 推进到下一镜头。
   */
  private _nextShot(): void {
    const nextShot = this._shot + 1;

    // 最后一镜 (WORLD_CUP) 播完 → 开场结束, 由 BootService 流转到 TITLE 场景
    if (OpeningShot[nextShot] === undefined) {
      this._complete = true;
      return;
    }

    this._shot = nextShot;
    this._shotFrame = 0;
    this._transitionTimer = 15; // fade transition

    // 每镜应用对应的模式块 (TECMO 字母 / 名字横幅 / 标题文字),
    // 对应原版脚本 SET_MODE 语义
    const mode = OpeningSceneController.SHOT_MODE[nextShot];
    if (mode !== undefined) {
      this._applyModeSprites(mode);
    }
  }

  // ──────────────────────────────────────────────
  // 构建显示状态 (供渲染器消费)
  // ──────────────────────────────────────────────

  private _buildDisplayState(): OpeningDisplayState {
    const shotInfo = SHOT_TEXT[this._shot];
    const maxFrames = 180;

    // 过渡透明度计算
    let alpha = 1.0;
    if (this._transitionTimer > 10) {
      alpha = (15 - this._transitionTimer) / 5; // 0→1 in first 5 frames
    }

    // 脚本驱动字段 (脚本模式下从 vmState 读取, 硬编码模式下为默认值)
    const scriptDriven = this._useScript && this._vmState !== null;
    const vmState = this._vmState;

    // 文本来源: 脚本模式优先使用 ScriptVM 累积的真实文本行 (字节)
    let text = shotInfo?.jp ?? '';
    let subText = shotInfo?.en ?? '';
    let scriptTextBytes: number[][] = [];
    if (scriptDriven && vmState && vmState.textLines.length > 0) {
      text = vmState.textLines.map(l => l.text).join(' ');
      scriptTextBytes = vmState.textLines.map(l => l.bytes);
      subText = shotInfo?.en ?? '';
    } else {
      scriptTextBytes = [];
    }

    // 打字机渐显: 镜头内每 2 帧显示 1 个字符 (60fps → 30 字符/秒)
    let textRevealChars = Number.MAX_SAFE_INTEGER;
    if (scriptTextBytes.length > 0) {
      let total = 0;
      for (const line of scriptTextBytes) total += line.length;
      textRevealChars = Math.min(total, Math.floor(this._shotFrame / 2));
    }

    // 位置: SET_POS 显式设置时使用 tile 坐标, 未设置 (0,0) 走渲染器默认
    const scriptPosX = vmState && (vmState.posX !== 0 || vmState.posY !== 0) ? vmState.posX : -1;
    const scriptPosY = vmState && (vmState.posX !== 0 || vmState.posY !== 0) ? vmState.posY : -1;

    return {
      shot: this._shot,
      shotFrame: this._shotFrame,
      shotTotalFrames: maxFrames,
      text,
      subText,
      showLogo: this._shot === OpeningShot.LOGO,
      showPortrait: this._shot >= OpeningShot.TSUBASA
        && this._shot <= OpeningShot.WAKABAYASHI,
      transitionAlpha: Math.min(alpha, 1.0),
      shotComplete: this._shotFrame >= maxFrames,
      bgColor: this._getBgColor(),
      textBlink: this._blinkTimer < 30,

      // 脚本驱动字段
      scriptDriven,
      scriptSceneDataId: vmState?.sceneDataId ?? 0,
      scriptMode: vmState?.mode ?? 0,
      scriptSpriteIds: vmState?.spriteIds ? [...vmState.spriteIds] : [],
      scriptObjectQueue: vmState?.objectQueue ? [...vmState.objectQueue] : [],
      scriptTextLines: vmState?.textLines ? vmState.textLines.map(l => l.text) : [],
      scriptTextBytes,
      textRevealChars,
      scriptPosX,
      scriptPosY,
      scriptWaitFrames: vmState?.waitFrames ?? 0,
      scriptLooping: vmState?.isLooping ?? false,
      scriptLastInstr: vmState?.lastInstruction ?? '',
    };
  }

  /**
   * 每镜背景颜色 (简化: 用 NES 调色板索引)
   */
  private _getBgColor(): number {
    switch (this._shot) {
    case OpeningShot.LOGO: return 0x0F; // 黑
    case OpeningShot.TSUBASA: return 0x12; // 深蓝
    case OpeningShot.HYUGA: return 0x06; // 深红
    case OpeningShot.MISAKI: return 0x1A; // 绿
    case OpeningShot.WAKABAYASHI: return 0x05; // 深黄
    case OpeningShot.WORLD_CUP: return 0x0F; // 黑
    default: return 0x0F;
    }
  }
 

  // ──────────────────────────────────────────────
  // 获取当前镜头对应的 RAM 数据
  // ──────────────────────────────────────────────

  /**
   * 获取开场镜头的原始 ROM 数据偏移
   * (供后续 NT/sprite 渲染使用)
   */
  getRomDataOffset(): number {
    // Scene 0x17 data is in Bank 07 referenced by Bank02 pointer table
    // The scene pointer table is at Bank02 $A092 area
    // For now return 0 — actual scene data to be extracted from ROM
    return 0;
  }
}

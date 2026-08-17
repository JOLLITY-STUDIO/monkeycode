/**
 * Bank 00 Service — 核心系统服务层
 *
 * 原始 PRG 数据已直接 import (rom-data/prg-bank-00.ts)，无 MMC3 bank 切换。
 * Bank 00 是所有 bank 共享调用的系统服务层，H5 中就是一个普通 Service 对象，
 * 其他 bank 直接调用其方法。
 *
 * 翻译来源 (bank_00 汇编关键函数):
 *   $9EED — 主循环入口
 *   $98A0 — Nametable 全屏清零
 *   $9B11 — Nametable + 属性表清零
 *   $8297 — 文本 buffer 参数设置 (A=palIdx → $E7, $E6=1) — 非调色板!
 *   $9085 — 文本 buffer 构建 (palIdx → bank7 指针表 → 32B 文本指令流)
 *   $8AF7 — 场景描述读取 (A=scene_id → Bank 02 场景指针表)
 *   $890C — VRAM 地址/滚动设置
 *   $88FB — PPU 寄存器设置
 *   $9A43 — 主循环初始化 part1
 *   $9A35 — 主循环初始化 part2
 *   $9B7F — 未知初始化
 *   $9F69 — 数据写入辅助
 *   $9B28 — PPU Buffer 空间分配
 *   $9B5E — PPU Buffer 结束标记
 *   $9BA0 — 等待 VBlank
 *   $84C1 — Bank 02 入口分发
 *   $801F — 场景初始化链入口
 *   $8091 — 主输入循环
 */

import { DataStore, RAM_KEYS } from '../../data/DataStore';
import { palWriteAll, palExportRGBA } from '../../data/ppu/pallete/paletteManager';
import { SCENE_BG_PALETTE, SCENE_SPR_PALETTE } from '../../data/ppu/pallete/scene-palette-table';
import { SCENE_BG_GRP } from '../../data/ppu/pallete/scene-palette-group';
import { SceneRoot } from '../../data/scene/index';
import {
  CUT_0x17_NT0,
  CUT_0x17_ATTR0,
} from '../../data/ppu/nametable/cut/cut_0x17_nt';

/* eslint-disable @typescript-eslint/no-unused-vars */

// ── 常量 ──

/** PPU Buffer 地址 ($05E8-$0628, 64B) */
const PPU_BUF_BASE = 'ppuBuf_';
const PPU_BUF_SIZE = 64;

/** PPU Buffer 写指针 */
const PPU_BUF_PTR = 'ppuBufPtr';

/** 帧状态标志 */
const FRAME_FLAG   = 'frameFlag';   // ram_001E: bit4=vblank done, bit5=?
const SCENE_ID     = 'sceneId';     // ram_0026
const RAM_1B       = 'ram_1B';      // ram_001B: 场景状态标志

// PPU 寄存器镜像
const PPUCTRL_MIRROR  = 'ppuctrl';   // ram_0020
const PPUMASK_MIRROR  = 'ppumask';   // ram_0021

// ═══════════════════════════════════════════════════════════════
// Bank 00 Service
// ═══════════════════════════════════════════════════════════════

export class Bank00Service {
  /** 当前帧计数 */
  private _frameCount = 0;

  /** 主循环是否运行中 */
  private _running = false;

  constructor(private _store: DataStore) {}

  // ── 公共接口 ──

  get store(): DataStore { return this._store; }

  get frameCount(): number { return this._frameCount; }

  // ──────────────────────────────────────────────
  // $98A0: Nametable 全屏清零
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $98A0: 禁用 NMI → 禁用渲染 → 写 PPUADDR=$2000 → 2048 个 $00 → 恢复。
   * H5: 直接清零 DataStore 的 nt0/nt1 网格。
   */
  ntClear(): void {
    for (let y = 0; y < 30; y++) {
      for (let x = 0; x < 32; x++) {
        this._store.nt0[y][x].tile = 0;
        this._store.nt0[y][x].palette = 0;
        this._store.nt1[y][x].tile = 0;
        this._store.nt1[y][x].palette = 0;
      }
    }
  }

  // ──────────────────────────────────────────────
  // $9B11: Nametable + 属性表清零
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $9B11: 清零 Nametable 和 attribute table。
   * H5: ntClear() 已经完成。
   */
  ntAttrClear(): void {
    this.ntClear();
  }

  // ──────────────────────────────────────────────
  // $8297 & $9085: 文本 buffer 构建 (非调色板!)
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $8297: A=palIdx → 存 $E7 → $E6=1 → 指针 $4D=$E5 → JSR $9085。
   *
   * 重要修正: 原始 $8297/$9085 实际是【文本 buffer 构建】而非调色板加载!
   *   $9085: 清 PPU buffer → 读 (ram_004D) 参数 → palIdx 查 bank7 指针表
   *          ($A000+palIdx*2 → $A0D4...$A294) → 复制 32B 文本指令流 → 写 buffer。
   *   表中含 '$6698/$6699 递增 NT 地址' 等文本渲染指令, 证实非调色板。
   * 真实调色板由 $9AB8/$9ADA (paletteLoad) 从 bank06 表加载。
   *
   * H5: 文本渲染由文本脚本引擎处理, 此处仅记录参数 (ram_00E6/ram_00E7)。
   *
   * @param palIdx 文本 buffer 索引 (Reset 时 A=0x0D)
   */
  paletteInit(palIdx: number): void {
    // $8297: STA $E7 (palIdx) → LDA #$01 → STA $E6 (模式=文本 buffer)
    this._store.write('ram_00E7', palIdx & 0xFF);
    this._store.write('ram_00E6', 1);
  }

  /**
   * 对应原始 $9085: 文本 buffer 构建入口。
   * H5: 文本渲染由脚本引擎处理, 无需写入 paletteRAM。
   *
   * @param data 保留参数 (原为 32B 文本指令流)
   */
  paletteWriteBuf(_data: number[]): void {
    // 无操作 — 文本 buffer 构建已由文本脚本引擎接管
  }

  /**
   * 对应原始 $9A31: 主循环初始化参数。
   * 汇编: STA ram_0048 (BG 组号) → STX ram_0049 (SPR 组号) → 落到 $9A35 (调色板加载链)。
   * H5: 记录组号到数据中心后执行 mainLoopInit2()。
   *
   * @param bgGrp  BG 调色板组号 (A)
   * @param sprGrp SPR 调色板组号 (X)
   */
  mainInitParam(bgGrp: number, sprGrp: number): void {
    this._store.write('ram_0048', bgGrp & 0xFF);
    this._store.write('ram_0049', sprGrp & 0xFF);
    this.mainLoopInit2();
  }

  /**
   * 对应原始 $9AB8 (BG) + $9ADA (SPR): 调色板组加载。
   * $9AB8: $B000 + bgGrp*16 (bank06 偏移 $1000 + bgGrp*16) → PPU Buffer 前 16 字节
   * $9ADA: $B300 + sprGrp*16 (bank06 偏移 $1300 + sprGrp*16) → PPU Buffer 后 16 字节
   * H5: 直接从场景调色板表 (scene-palette-table.ts) 取 16 字节组写入 paletteRAM。
   *
   * @param bgGrp  BG 调色板组号 (ram_0048, 场景 header h[2]&0x3F)
   * @param sprGrp SPR 调色板组号 (ram_0049, setup 0x80+ 操作码或默认 0)
   */
  paletteLoad(bgGrp: number, sprGrp: number): void {
    const data = new Array<number>(32);
    const bgIdx = (bgGrp & 0x7F) * 16;
    const sprIdx = (sprGrp & 0x7F) * 16;
    for (let i = 0; i < 16; i++) {
      data[i] = SCENE_BG_PALETTE[bgIdx + i] ?? 0x0F;
      data[i + 16] = SCENE_SPR_PALETTE[sprIdx + i] ?? 0x0F;
    }
    palWriteAll(data);

    // 同步到 DataStore.paletteTable，供 H5 帧合成器消费
    const rgba = palExportRGBA();
    for (let p = 0; p < 4; p++) {
      const bgColors = [];
      const sprColors = [];
      for (let c = 0; c < 4; c++) {
        const bg = rgba[p * 4 + c];
        const spr = rgba[16 + p * 4 + c];
        bgColors.push({ r: bg[0], g: bg[1], b: bg[2], a: bg[3] });
        sprColors.push({ r: spr[0], g: spr[1], b: spr[2], a: spr[3] });
      }
      this._store.writeBgPalette(p as 0 | 1 | 2 | 3, { colors: bgColors });
      this._store.writeSprPalette(p as 0 | 1 | 2 | 3, { colors: sprColors });
    }
  }

  // ──────────────────────────────────────────────
  // $8AF7: 场景描述读取
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $8AF7: A=sceneId → $ED → 切 Bank07 → 读 Bank02 场景指针表 → 解析场景数据。
   * H5: 根据 sceneId 加载对应场景配置。
   *
   * 场景 header[2]&0x3F = BG 调色板组号 → ram_0048 (供 mainLoopInit2 → paletteLoad)。
   *
   * @param sceneId 场景编号 (Reset: 0x17 = Tecmo Theater)
   */
  sceneLoad(sceneId: number): void {
    this._store.write(SCENE_ID, sceneId & 0xFF);
    // $8AF7: header h[2]&0x3F → ram_0048 (真实 bank7 场景表)
    const bgGrp = SCENE_BG_GRP[sceneId & 0xFF] ?? 0;
    this._store.write('ram_0048', bgGrp & 0xFF);
    // SPR 组号由场景 setup 指令设置, 默认 0
    this._store.write('ram_0049', 0);

    // H5: 直接把场景的 NT tile + 属性表写入 DataStore
    if (sceneId === 0x17) {
      this._loadCut0x17();
    }
  }

  /** 加载镜头 0x17 (标题菜单背景) 的 NT/ATTR 到 DataStore */
  private _loadCut0x17(): void {
    // CHR bank: 原始 $CA22 设 ram_0490=0/ram_0491=2 (BG bank 对),
    // 与 scene_opening.controller 暴力渲染验证一致 = 14
    const CHR_BANK = 14;
    const nt = CUT_0x17_NT0;
    const attr = CUT_0x17_ATTR0;

    for (let y = 0; y < 30; y++) {
      for (let x = 0; x < 32; x++) {
        const tile = nt[y * 32 + x] ?? 0;
        const pal = this._attrPalette(attr, x, y);
        this._store.writeNT(0, x, y, {
          tile,
          palette: pal,
          bank: CHR_BANK,
          flipH: false,
          flipV: false,
          behindBg: false,
        });
      }
    }
  }

  /** 由 NES 属性表解析 tile (x,y) 的调色板组 (0-3) */
  private _attrPalette(attr: readonly number[], tx: number, ty: number): number {
    const ax = tx >> 2;
    const ay = ty >> 2;
    const byte = attr[(ay << 3) + ax] ?? 0;
    const subX = (tx >> 1) & 1;
    const subY = (ty >> 1) & 1;
    const shift = (subY << 2) | (subX << 1);
    return (byte >> shift) & 0x03;
  }

  // ──────────────────────────────────────────────
  // $890C: VRAM 地址/滚动设置
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $890C: A=索引(0x30) → 从数据表读滚动偏移 → 设置 PPU $2006/$2005。
   * H5: 设置 DataStore scroll 偏移。
   *
   * @param idx VRAM 索引参数 (Reset: 0x30)
   */
  vramAddrSetup(idx: number): void {
    // $890C 从 Bank 00 数据表读取滚动/VRAM 偏移
    // 具体数值待从 ROM 提取，当前设默认值
    this._store.scrollX = 0;
    this._store.scrollY = 0;
  }

  // ──────────────────────────────────────────────
  // $88FB: PPU 寄存器设置
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $88FB: PPUCTRL/PPUMASK/PPUSCROLL 设置。
   * H5: 设置 PPU 寄存器镜像值。
   */
  ppuRegSetup(): void {
    // PPUCTRL = $08 (NMI on, 使用 NT0, 8×8 sprites)
    this._store.write(PPUCTRL_MIRROR, 0x08);
    // PPUMASK = $1E (BG on, SPR on, 允许左 8px 渲染)
    this._store.write(PPUMASK_MIRROR, 0x1E);
  }

  // ──────────────────────────────────────────────
  // $9A43 & $9A35: 主循环初始化
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $9A43: 主循环初始化 part1。
   */
  mainLoopInit1(): void {
    this._store.write('ram_004C', 0x8A);
  }

  /**
   * 对应原始 $9A35: 主循环初始化 part2。
   * 汇编链: JSR $9B07 → JSR $9AB8 (BG 调色板) → JSR $9ADA (SPR 调色板)
   *         → LDX $E9 → JSR $C4B9 → $9A43 (ram_004A=ram_004B=0x0F) → JMP $9A71。
   * H5: 用 ram_0048/ram_0049 组号加载真实调色板 → 返回主循环。
   */
  mainLoopInit2(): void {
    // $9AB8/$9ADA: 从场景调色板表加载 BG/SPR 组
    const bgGrp = this._store.read('ram_0048') ?? 0;
    const sprGrp = this._store.read('ram_0049') ?? 0;
    this.paletteLoad(bgGrp, sprGrp);
    // $9A43: ram_004A/ram_004B = 0x0F
    this._store.write('ram_004A', 0x0F);
    this._store.write('ram_004B', 0x0F);
    this._store.write('ram_004C', 0x8A);
    this._store.write('ram_005B', 0);
    this._store.write('ram_0005', 0);
    this._store.write('ram_0006', 0);
    this._store.write('ram_0009', 0);
    this._store.write('ram_000A', 0);
    this._store.write('ram_0011', 0);
    this._store.write('ram_0012', 0);
    this._store.write('ram_000D', 0);
    this._store.write('ram_000E', 0);
  }

  // ──────────────────────────────────────────────
  // $9B7F: PPU 初始化 / 未知初始化
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $9B7F: 场景初始化链中的一个环节。
   * 具体功能待从汇编进一步分析。
   */
  initHelper(): void {
    // 功能待补充
  }

  /** 别名: $9B7F PPU 初始化 — 与 initHelper() 相同 */
  ppuInit(): void {
    this.initHelper();
  }

  // ──────────────────────────────────────────────
  // $99F0: 未知初始化 (被 entryB $82AF 调用)
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $99F0: 密码/选择画面等场景的前置初始化。
   * 具体功能待从汇编分析。
   */
  unknownInit(): void {
    // 功能待补充 — 对应 asm $99F0
  }

  // ──────────────────────────────────────────────
  // $9F69: 数据写入辅助
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $9F69: 数据写入辅助 (A=0x28 → Y=0x00?)。
   * 具体功能待从汇编进一步分析。
   */
  dataWriteHelper(a: number): void {
    // 功能待补充
  }

  // ──────────────────────────────────────────────
  // $9BA0: 等待 VBlank
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $9BA0: 等待 NMI 标志 → 设 $E6=$00, $E7=$00 → RTS。
   * H5: frame 同步 — 标记帧完成。
   */
  waitVBlank(): void {
    this._store.write('vblankReady', 1);
    this._store.write('ram_00E6', 0);
    this._store.write('ram_00E7', 0);
  }

  // ──────────────────────────────────────────────
  // $9EED: 主循环入口
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $9EED: LDX #$02 → JSR $C4B9 → JMP $A203。
   * 永不退出的帧循环入口。Bank 02 $A21B 最后 JMP 此处。
   * H5: 启动帧循环 → 标记首帧 VBlank 已就绪。
   */
  mainLoop(): void {
    this._running = true;
    // 首帧即允许 update() 进入 $801F 场景初始化
    this.setVBlankFlag();
  }

  /** 主循环是否运行中 */
  get isRunning(): boolean { return this._running; }

  // ──────────────────────────────────────────────
  // 每帧更新 (Bank 00 帧循环核心)
  // ──────────────────────────────────────────────

  /**
   * 对应原始 Bank 00 帧循环: $8017 → $801F → ... 状态机。
   * 每帧调用。
   *
   * $801F 入口逻辑:
   *   1. 等待 VBlank (bit4)
   *   2. 若 ram_1B bit0 == 0，执行完整场景初始化 (调色板/场景/VRAM/PPU)
   *   3. 置 ram_1B bit0 = 1，后续帧跳过
   *
   * @param buttons 当前帧按键 bitmask
   * @returns 场景是否变更
   */
  update(buttons: number): boolean {
    if (!this._running) return false;

    this._frameCount++;

    const frameFlag = this._store.read(FRAME_FLAG);

    // 等待 VBlank 标志
    if ((frameFlag & 0x10) === 0) {
      return false;
    }

    // ── $801F: 场景初始化链入口 ──
    this.sceneInitEntry();

    // 场景流转由 BootService 场景路由器接管 (BOOT/TITLE/MEETING/MATCH)
    return false;
  }

  // ──────────────────────────────────────────────
  // PPU Buffer 操作
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $9B28: PPU Buffer 空间分配。
   * 检查剩余空间 → 分配 → 返回写偏移。
   *
   * @param size 需要分配的字节数
   * @returns 可写入的缓冲区偏移
   */
  ppuBufAlloc(size: number): number {
    const ptr = this._store.read(PPU_BUF_PTR);
    if (ptr + size > PPU_BUF_SIZE) return -1;
    return ptr;
  }

  /**
   * 对应原始 $9B5E: PPU Buffer 结束标记。
   * 在末尾写 0x00 → 更新指针。
   */
  ppuBufEnd(): void {
    const ptr = this._store.read(PPU_BUF_PTR);
    this._store.write(PPU_BUF_BASE + ptr, 0x00);
  }

  /**
   * 写单个字节到 PPU Buffer。
   */
  ppuBufWrite(offset: number, value: number): void {
    this._store.write(PPU_BUF_BASE + offset, value & 0xFF);
  }

  // ──────────────────────────────────────────────
  // $84C1: Bank 02 跳转表分发
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $84C1: Bank 02 跳转表分发。
   * 查表跳转到 Bank 02 的不同入口 ($A003/$A006/$A009/$A00C/$A00F/$A012/$A015/$A018)。
   * H5: 记录入口索引，由调用方直接调用 Bank02Service 对应方法。
   */
  bank02Dispatch(index: number): void {
    this._store.write('bank02_entry', index);
  }

  // ──────────────────────────────────────────────
  // $801F: 场景初始化链入口
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $801F: 等待 VBlank → 清 PPU Buffer → 检查 ram_1B bit0 → 场景初始化。
   *
   * 这是 Bank00 主循环每帧都会进入的入口。首帧 ram_1B bit0 == 0，会触发完整初始化：
   *   - NT + Attribute 清零 ($9B11)
   *   - 调色板初始化 ($8297, A=0x0D)
   *   - 场景描述加载 ($8AF7, A=0x17 = Tecmo Theater)
   *   - VRAM 地址/滚动设置 ($890C, A=0x30)
   *   - PPU 寄存器设置 ($88FB)
   * 然后置 ram_1B bit0 = 1，后续帧跳过。
   */
  sceneInitEntry(): void {
    this.waitVBlank();

    // 清零 PPU Buffer
    for (let i = 0; i < PPU_BUF_SIZE; i++) {
      this._store.write(PPU_BUF_BASE + i, 0);
    }
    this._store.write(PPU_BUF_PTR, 0);

    // $801F 核心分支: ram_1B bit0 == 0 时执行完整场景初始化
    const ram1b = this._store.read(RAM_1B);
    if ((ram1b & 0x01) === 0) {
      this._doFullSceneInit();
      this._store.write(RAM_1B, ram1b | 0x01);
    }
  }

  /**
   * 完整场景初始化 ($801F → 新场景):
   *   NT+Attr 清零 → 文本 buffer → 场景加载 → VRAM → PPU 寄存器
   */
  private _doFullSceneInit(): void {
    // JSR $9B11: NT + Attribute 清零
    this.ntAttrClear();

    // JSR $8297: 文本 buffer 参数设置 (A=0x0D, 非调色板)
    this.paletteInit(0x0D);

    // STA $7B = 0: 滚动/显示状态变量清零
    this._store.write('ram_007B', 0);

    // JSR $8AF7: 场景描述加载 (A=0x17, Tecmo Theater)
    this.sceneLoad(0x17);

    // JSR $890C: VRAM 地址/滚动设置 (A=0x30)
    this.vramAddrSetup(0x30);

    // JSR $88FB: PPU 寄存器设置
    this.ppuRegSetup();

    // H5: 用 sceneLoad 设置的 ram_0048/0049 加载调色板到 DataStore (原 $9A35 链)
    this.mainLoopInit2();
  }

  // ──────────────────────────────────────────────
  // 辅助: 设置帧状态标志 (供 Bank02 NMI 设置)
  // ──────────────────────────────────────────────

  setVBlankFlag(): void {
    let flag = this._store.read(FRAME_FLAG);
    flag |= 0x10; // bit4 = VBlank 完成
    this._store.write(FRAME_FLAG, flag);
  }

  // ──────────────────────────────────────────────
  // 辅助: 读取场景数据
  // ──────────────────────────────────────────────

  getSceneId(): number {
    return this._store.read(SCENE_ID);
  }
}

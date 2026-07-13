/**
 * 标题画面场景 - 基于 ROM 真实资源
 *
 * 数据来源:
 *   - 资源 0x8001 (entry 0): LZSS 压缩的 tile 数据, 加载到 VRAM 0x0000
 *   - 调色板: 待确认 (可能从 ROM 0x05DC00 区域加载)
 *   - Nametable: 待确认
 *
 * 任务链 (ROM):
 *   FUN_0000c914  → 加载资源 0x8001 到 VRAM 0
 *   FUN_0000c92c  → 任务 2 (设置 DAT_ffff8004 = c93a)
 *   FUN_0000c93a  → 设置显示参数 (DAT_ffff95a2 = 0x05DF40)
 *   FUN_0000c9a0  → 调用子函数初始化各种显示层
 *   FUN_0000ca00  → 调色板加载 + sprite 设置
 *   FUN_0000ca68  → 再次加载资源 0x8001
 *
 * @see execution-trace.md "标题画面任务链" 章节
 */

import { VDP } from '../hw/vdp/vdp.js';
import { RomReader, loadResource } from '../hw/resource.js';

/**
 * 标题画面资源 ID
 * 根据 ROM FUN_0000c914 分析: D0 = 0x8001
 * 资源索引 = (0x8001 - 0x8000) >> 1 = 0
 */
export const TITLE_TILE_RESOURCE_ID = 0x8001;

/**
 * 标题画面配置
 */
export interface TitleScreenConfig {
  /** 是否显示标题文字 */
  showTitle?: boolean;
  /** 是否闪烁 "PRESS START" */
  blinkPressStart?: boolean;
}

/**
 * 标题画面场景
 *
 * 负责:
 *   1. 从 ROM 加载标题画面 tile 数据到 VRAM
 *   2. 设置调色板 (CRAM)
 *   3. 配置 Plane A/B nametable
 *   4. 设置精灵
 *   5. 动画效果 (闪烁的 PRESS START 等)
 */
export class TitleScreen {
  private vdp: VDP;
  private rom: RomReader;
  private frameCount: number = 0;
  private config: Required<TitleScreenConfig>;

  /**
   * @param vdp VDP 实例
   * @param rom ROM 读取器 (用于加载资源)
   * @param config 配置选项
   */
  constructor(vdp: VDP, rom: RomReader, config: TitleScreenConfig = {}) {
    this.vdp = vdp;
    this.rom = rom;
    this.config = {
      showTitle: true,
      blinkPressStart: true,
      ...config,
    };
  }

  /**
   * 初始化标题画面
   *
   * 对应 ROM 的 FUN_0000c914 → FUN_0000ca00 任务链
   * 逐步加载资源、设置调色板、配置 nametable
   */
  async init(): Promise<void> {
    // 第 1 步: 加载 tile 资源到 VRAM
    // 对应 FUN_0000c914: MOVE.W #$8001, D0; MOVE.L #0, A1; JSR $99b2
    await this.loadTileData();

    // 第 2 步: 设置调色板
    // 对应 FUN_0000ca00 中调用的 FUN_0000a78c
    this.setupPalette();

    // 第 3 步: 配置 Plane A nametable (前景层)
    this.setupPlaneA();

    // 第 4 步: 配置 Plane B nametable (背景层)
    this.setupPlaneB();

    // 第 5 步: 配置精灵 (标题文字等)
    this.setupSprites();

    // 第 6 步: 开启显示
    this.vdp.displayEnabled = true;
  }

  /**
   * 每帧更新 (用于动画效果)
   */
  update(): void {
    this.frameCount++;

    // PRESS START 闪烁效果 (每 30 帧切换一次)
    if (this.config.blinkPressStart) {
      const visible = Math.floor(this.frameCount / 30) % 2 === 0;
      this.updatePressStartVisibility(visible);
    }
  }

  // ============================================================
  // 内部方法
  // ============================================================

  /**
   * 加载 tile 数据到 VRAM
   *
   * 对应 ROM FUN_0000c914:
   *   MOVE.W #$8001, D0    ; 资源 ID
   *   MOVE.L #$00000000, A1 ; 目标地址 VRAM 0
   *   JSR $000099b2        ; LoadResource
   */
  private async loadTileData(): Promise<void> {
    const result = loadResource(this.rom, TITLE_TILE_RESOURCE_ID);

    // 将解压后的数据写入 VRAM
    const data = result.data;
    for (let i = 0; i < data.length; i++) {
      this.vdp.writeVRAM(i, data[i]);
    }

    const numTiles = Math.floor(data.length / 32);
    console.log(`[TitleScreen] 加载 tile 资源: ${numTiles} 个 tile (${data.length} 字节)`);
    console.log(`[TitleScreen] 资源 ID: 0x${TITLE_TILE_RESOURCE_ID.toString(16)}`);
  }

  /**
   * 设置调色板
   *
   * 注意: 这是一个占位实现，使用一组合理的默认调色板
   * 真实调色板需要从 ROM 中提取 (待完善)
   *
   * 调色板布局 (Genesis VDP):
   *   Palette 0: 背景色 + UI 元素
   *   Palette 1: 背景层颜色 (天空等)
   *   Palette 2: 标题文字颜色 (金色等)
   *   Palette 3: 精灵颜色
   */
  private setupPalette(): void {
    // 调色板 0: 黑 + 白 + 灰阶 (通用)
    const palette0 = [
      0x0000, // 0: 黑 (透明/背景色)
      0x0EEE, // 1: 白
      0x0CCC, // 2: 浅灰
      0x0AAA, // 3: 中灰
      0x0888, // 4: 灰
      0x0666, // 5: 深灰
      0x0444, // 6: 暗灰
      0x0222, // 7: 极暗灰
      0x0E00, // 8: 红
      0x00E0, // 9: 绿
      0x000E, // 10: 蓝
      0x0EE0, // 11: 黄
      0x0E0E, // 12: 紫
      0x00EE, // 13: 青
      0x0EEE, // 14: 白
      0x0000, // 15: 黑
    ];

    // 调色板 1: 蓝色系 (天空/水背景)
    const palette1 = [
      0x0000, // 0: 透明
      0x0002, // 1: 极深蓝
      0x0004, // 2: 深蓝
      0x0006, // 3: 中深蓝
      0x0008, // 4: 中蓝
      0x000A, // 5: 浅中蓝
      0x000C, // 6: 浅蓝
      0x000E, // 7: 亮蓝
      0x022E, // 8: 淡蓝
      0x044E, // 9: 更淡
      0x066E, // 10: 非常淡
      0x088E, // 11: 偏白的蓝
      0x0AAE, // 12: 很淡
      0x0CCE, // 13: 极淡
      0x0EEE, // 14: 白
      0x0000, // 15: 黑
    ];

    // 调色板 2: 金色系 (标题文字)
    const palette2 = [
      0x0000, // 0: 透明
      0x0420, // 1: 暗金
      0x0640, // 2: 深金
      0x0860, // 3: 中金
      0x0A80, // 4: 亮金
      0x0CA0, // 5: 浅金
      0x0EC0, // 6: 淡金
      0x0EE0, // 7: 黄
      0x0EE2, // 8: 浅黄
      0x0EE4, // 9: 更浅
      0x0EE6, // 10: 很淡
      0x0EE8, // 11: 非常淡
      0x0EEA, // 12: 极淡
      0x0EEC, // 13: 接近白
      0x0EEE, // 14: 白
      0x0420, // 15: 暗金 (描边色)
    ];

    // 调色板 3: 杂色 (精灵用)
    const palette3 = [
      0x0000, // 0: 透明
      0x0E00, // 1: 红
      0x0E40, // 2: 橙
      0x0E80, // 3: 黄橙
      0x0EE0, // 4: 黄
      0x00E0, // 5: 绿
      0x00EE, // 6: 青
      0x000E, // 7: 蓝
      0x0E0E, // 8: 紫
      0x0EEE, // 9: 白
      0x0888, // 10: 灰
      0x0444, // 11: 深灰
      0x0222, // 12: 暗灰
      0x0600, // 13: 暗红
      0x0060, // 14: 暗绿
      0x0006, // 15: 暗蓝
    ];

    // 写入 CRAM
    for (let i = 0; i < 16; i++) {
      this.vdp.writeCRAM(i, palette0[i]);
      this.vdp.writeCRAM(16 + i, palette1[i]);
      this.vdp.writeCRAM(32 + i, palette2[i]);
      this.vdp.writeCRAM(48 + i, palette3[i]);
    }

    console.log('[TitleScreen] 调色板已设置 (4 组 × 16 色)');
  }

  /**
   * 设置 Plane A (前景层) nametable
   *
   * 注意: 这是一个占位实现，用来显示 tile sheet
   * 真实 nametable 需要从 ROM 中提取 (待完善)
   */
  private setupPlaneA(): void {
    const planeBase = this.vdp.planeABaseAddr;
    const planeWidth = 64; // nametable 宽度 (tile 数)

    // 先清零
    for (let y = 0; y < 32; y++) {
      for (let x = 0; x < 64; x++) {
        this.setNtEntry(planeBase + (y * planeWidth + x) * 2, 0, 0, false, false, 0);
      }
    }

    // 计算我们加载了多少 tile
    // 资源 0x8001 解压后的数据大小决定了 tile 数量
    // 暂时假设是 256 个 tile (8KB / 32 = 256)
    const numTiles = 256;
    const cols = 32; // 每行显示多少个 tile

    // 显示 tile 表 (用于调试)
    for (let t = 0; t < numTiles; t++) {
      const tx = t % cols;
      const ty = Math.floor(t / cols);
      if (ty >= 28) break;

      // 居中显示
      const offsetX = Math.floor((40 - cols) / 2);
      const offsetY = 2;

      this.setNtEntry(
        planeBase + ((ty + offsetY) * planeWidth + (tx + offsetX)) * 2,
        t,       // tile 索引
        0,       // 调色板 0 (先用灰阶看图案)
        false, false, 0
      );
    }

    console.log('[TitleScreen] Plane A nametable 已设置 (tile sheet 视图)');
  }

  /**
   * 设置 Plane B (背景层) nametable
   */
  private setupPlaneB(): void {
    const planeBase = this.vdp.planeBBaseAddr;
    const planeWidth = 64;

    // 用调色板 1 (蓝色系) 的纯色 tile 填充背景
    // tile 0 是透明的，所以我们用一个有颜色的 tile
    // 暂时用 tile 0 + 调色板 1 索引 1 来看背景
    // 但 tile 0 的颜色 0 是透明的，所以我们需要用其他 tile

    // 先全部填成背景色 (调色板 1 的索引 1 是蓝色)
    // 我们需要创建一个纯色 tile...
    // 暂时用 tile 1 + 调色板 1 (如果 tile 1 有内容的话)

    for (let y = 0; y < 32; y++) {
      for (let x = 0; x < 64; x++) {
        // 用调色板 1 的纯色
        // 暂时先透明，让背景色透出来
        this.setNtEntry(planeBase + (y * planeWidth + x) * 2,
          0, 1, false, false, 0);
      }
    }

    // 设置背景色为蓝色 (调色板 0 颜色 0 是透明，实际用 R7 的背景色)
    // VDP 寄存器 R7 控制背景色
    // 暂时用默认的

    console.log('[TitleScreen] Plane B nametable 已设置');
  }

  /**
   * 设置精灵
   *
   * 标题画面的 "LANGRESSER" 文字可能是用精灵显示的
   * 暂时先不设置精灵
   */
  private setupSprites(): void {
    // TODO: 从 ROM 中提取精灵数据
    console.log('[TitleScreen] 精灵设置 (待实现)');
  }

  /**
   * 更新 "PRESS START" 文字的可见性
   */
  private updatePressStartVisibility(visible: boolean): void {
    // TODO: 实现闪烁效果
  }

  /**
   * 设置 nametable 条目
   *
   * Genesis VDP nametable 格式:
   *   15  14  13  12  11  10   9   8   7   6   5   4   3   2   1   0
   *   +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
   *   | P |  PAL  | V | H |        TILE INDEX (11 bits)             |
   *   +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
   *
   * P = Priority (1 = 高优先级, 在精灵之上)
   * PAL = Palette select (2 bits: 0-3)
   * V = Vertical flip
   * H = Horizontal flip
   * TILE INDEX = 11-bit tile number (0-2047)
   */
  private setNtEntry(
    addr: number,
    tileIndex: number,
    palette: number,
    hFlip: boolean,
    vFlip: boolean,
    priority: number
  ): void {
    let word = tileIndex & 0x07FF;
    if (hFlip) word |= 0x0800;
    if (vFlip) word |= 0x1000;
    word |= (palette & 0x03) << 13;
    word |= (priority & 0x01) << 15;

    this.vdp.writeVRAM(addr, (word >> 8) & 0xFF);
    this.vdp.writeVRAM(addr + 1, word & 0xFF);
  }
}

/**
 * 快速设置标题画面 (用于测试)
 *
 * @param vdp VDP 实例
 * @param rom ROM 读取器
 */
export async function setupTitleScreen(vdp: VDP, rom: RomReader): Promise<void> {
  const title = new TitleScreen(vdp, rom);
  await title.init();
}

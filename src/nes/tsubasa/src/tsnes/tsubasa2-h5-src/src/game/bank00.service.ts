/**
 * Bank 00 Service — 核心系统服务层
 *
 * CPU 映射: $8000-$9FFF (MMC3 R6 select)
 * PRG offset: 0x000010-0x00200F
 *
 * Bank 00 是所有 bank 共享调用的系统服务层。
 * H5 版本: 不模拟 MMC3 bank 切换，Bank 00 就是一个普通 Service 对象，
 * 其他 bank 直接调用其方法。
 *
 * 对应原始汇编中的关键函数:
 *   $9EED — 主循环入口
 *   $98A0 — Nametable 全屏清零
 *   $9B11 — Nametable + 属性表清零
 *   $8297 — 调色板初始化 (A=0x0D)
 *   $9085 — 调色板数据写入 PPU Buffer
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
 *   $9FA8 — Bank 切换 (原: MMC3 寄存器写入 → H5: 本地栈帧管理)
 *   $84C1 — Bank 02 入口分发
 *   $801F — 场景初始化链入口
 *   $8091 — 主输入循环
 */

import { DataStore, RAM_KEYS } from '../data/DataStore';
import { palWriteAll } from '../data/pallete/paletteManager';
import { SceneRoot } from '../data/scene/index';
import { OpeningSceneController, OpeningDisplayState } from './scene_opening.controller';

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
const BANK_CUR     = 'bankCur';     // ram_0019: 当前 bank 编号
const RAM_1B       = 'ram_1B';      // ram_001B: 场景状态标志

// PPU 寄存器镜像
const PPUCTRL_MIRROR  = 'ppuctrl';   // ram_0020
const PPUMASK_MIRROR  = 'ppumask';   // ram_0021

// ── 调色板数据表 (Bank 00 $9085 内置表, 32B) ──
// 对应的 `A=0x0D` 参数加载此表，写入 PPU $3F00-$3F1F

/** 调色板数据表 (32 字节, NES 颜色索引 0-63)
 *  来源: Bank 00 ROM offset ~0x1095 (待从 ROM 验证精确位置) */
const PALETTE_TABLE_0D: number[] = [
  // BG 0
  0x0F, 0x30, 0x10, 0x00,
  // BG 1
  0x0F, 0x30, 0x10, 0x00,
  // BG 2
  0x0F, 0x30, 0x10, 0x00,
  // BG 3
  0x0F, 0x30, 0x10, 0x00,
  // SPR 0
  0x0F, 0x37, 0x27, 0x17,
  // SPR 1
  0x0F, 0x30, 0x10, 0x00,
  // SPR 2
  0x0F, 0x30, 0x10, 0x00,
  // SPR 3
  0x0F, 0x30, 0x10, 0x00,
];

// ═══════════════════════════════════════════════════════════════
// Bank 00 Service
// ═══════════════════════════════════════════════════════════════

export class Bank00Service {
  /** 当前帧计数 */
  private _frameCount = 0;

  /** 主循环是否运行中 */
  private _running = false;

  /** 开场场景控制器 */
  private _openingScene?: OpeningSceneController;

  /** 当前显示状态 (供渲染器读取) */
  private _displayState: OpeningDisplayState | null = null;

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
  // $8297 & $9085: 调色板初始化
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $8297: A=palIdx → 存 $E7 → $E6=1 → 指针 $4D=$E5 → JSR $9085。
   * H5: 直接选择调色板表写入 paletteRAM。
   *
   * @param palIdx 调色板参数 (Reset 时 A=0x0D)
   */
  paletteInit(palIdx: number): void {
    // 根据 palIdx 选择数据表（目前仅实现 0x0D）
    if (palIdx === 0x0D) {
      palWriteAll(PALETTE_TABLE_0D);
    }
    // 其他 palIdx 的表待从 ROM 提取
  }

  /**
   * 对应原始 $9085: 从 Bank 00 内置表读取 32B → 写入 PPU Buffer。
   * H5: 直接写入 paletteRAM。
   *
   * @param data 32 字节 NES 颜色索引数组
   */
  paletteWriteBuf(data: number[]): void {
    palWriteAll(data);
  }

  // ──────────────────────────────────────────────
  // $8AF7: 场景描述读取
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $8AF7: A=sceneId → $ED → 切 Bank07 → 读 Bank02 场景指针表 → 解析场景数据。
   * H5: 根据 sceneId 加载对应场景配置。
   *
   * @param sceneId 场景编号 (Reset: 0x17 = Tecmo Theater)
   */
  sceneLoad(sceneId: number): void {
    this._store.write(SCENE_ID, sceneId & 0xFF);

    // 场景 0x17 (TECMO Theater) → 创建开场控制器
    if (sceneId === 0x17) {
      this._openingScene = new OpeningSceneController(this._store);
      this._openingScene.init();
    }
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
   * 设置 ram_004C=$8A → 返回主循环。
   */
  mainLoopInit2(): void {
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
  // $9B7F: 未知初始化
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $9B7F: 场景初始化链中的一个环节。
   * 具体功能待从汇编进一步分析。
   */
  initHelper(): void {
    // 功能待补充
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

    const sceneId = this._store.read(SCENE_ID);

    // 场景 0x17 (TECMO Theater) → 开场动画控制器
    if (sceneId === 0x17 && this._openingScene && !this._openingScene.complete) {
      this._displayState = this._openingScene.update(buttons);

      // 检测开场完成 → 场景切换
      if (this._openingScene.complete) {
        // → 进入赛前会议流程 (场景切换)
        this._store.write(SCENE_ID, SceneRoot.MEETING);
      }
      return true;
    }

    return false;
  }

  /** 获取当前显示状态 (供渲染器消费) */
  get displayState(): OpeningDisplayState | null {
    return this._displayState;
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
  // $9FA8: Bank 切换 (H5: 本地栈帧管理)
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $9FA8: A=bank编号 → 保存到 ram_0019 → 保存寄存器 → JMP $9EFB。
   * H5: 不需要 MMC3 写入，仅记录当前活跃的 bank 编号。
   *
   * @param bankId 目标 Bank 编号
   */
  bankSwitch(bankId: number): void {
    this._store.write(BANK_CUR, bankId & 0xFF);
  }

  /**
   * 对应原始 $84C1: Bank 02 跳转表分发。
   * 查表跳转到 Bank 02 的不同入口 ($A003/$A006/$A009/$A00C/$A00F/$A012/$A015/$A018)。
   * H5: 根据索引调用 Bank02Service 的对应方法。
   */
  bank02Dispatch(index: number): void {
    this._store.write('bank02_entry', index);
    this.bankSwitch(2);
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
   *   NT+Attr 清零 → 调色板 → 场景加载 → VRAM → PPU 寄存器
   */
  private _doFullSceneInit(): void {
    // JSR $9B11: NT + Attribute 清零
    this.ntAttrClear();

    // JSR $8297: 调色板初始化 (A=0x0D, Tecmo Theater 用)
    this.paletteInit(0x0D);

    // STA $7B = 0: 滚动/显示状态变量清零
    this._store.write('ram_007B', 0);

    // JSR $8AF7: 场景描述加载 (A=0x17, Tecmo Theater)
    this.sceneLoad(0x17);

    // JSR $890C: VRAM 地址/滚动设置 (A=0x30)
    this.vramAddrSetup(0x30);

    // JSR $88FB: PPU 寄存器设置
    this.ppuRegSetup();
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

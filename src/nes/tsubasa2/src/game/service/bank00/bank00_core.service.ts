/**
 * Bank 00 Service — 核心系统服务层 (业务逻辑)
 *
 * 原始 PRG 数据已直接 import (rom-data/prg-bank-00.ts)，无 MMC3 bank 切换。
 * Bank 00 是所有 bank 共享调用的系统服务层，H5 中就是一个普通 Service 对象，
 * 其他 bank 直接调用其方法。
 *
 * 渲染/展示部分已剥离到 View (view/bank00/Bank00RenderView):
 *   NT 渲染 / 调色板 / OAM 精灵 / PPU Buffer / 帧同步
 * Service 保留业务逻辑 (状态机/场景调度/帧循环) 并委托渲染方法。
 *
 * 翻译来源 (bank_00 汇编关键函数):
 *   $9EED — 主循环入口
 *   $8AF7 — 场景描述读取 (业务部分: SCENE_ID/组号)
 *   $9A43 — 主循环初始化 part1
 *   $9A35 — 主循环初始化 part2 (业务部分)
 *   $9F69 — 数据写入辅助
 *   $9BA0 — 等待 VBlank (调度)
 *   $84C1 — Bank 02 入口分发
 *   $801F — 场景初始化链入口
 *   $8091 — 主输入循环
 * 渲染函数委托: $98A0/$9B11/$8297/$9085/$9AB8/$9ADA/$890C/$88FB/$9B7F/$9B91/$9B28/$9B5E → Bank00RenderView
 */

import { DataStore, RAM_KEYS } from '../../data/DataStore';
import { getSceneBgGrp } from '../../data/bank07-data';
import { SceneRoot } from '../../data/scene/index';
import { Bank00RenderView } from '../../view/bank00/Bank00RenderView';

/* eslint-disable @typescript-eslint/no-unused-vars */

/** 帧状态标志 */
const FRAME_FLAG   = 'frameFlag';   // ram_001E: bit4=vblank done, bit5=?
const SCENE_ID     = 'sceneId';     // ram_0026
const RAM_1B       = 'ram_1B';      // ram_001B: 场景状态标志



// ═══════════════════════════════════════════════════════════════
// Bank 00 Service
// ═══════════════════════════════════════════════════════════════

export class Bank00Service {
  /** 当前帧计数 */
  private _frameCount = 0;

  /** 主循环是否运行中 */
  private _running = false;

  /** 渲染展示层 (View) — NT/调色板/OAM/PPU Buffer */
  private _render!: Bank00RenderView;

  constructor(private _store: DataStore) {
    this._render = new Bank00RenderView(_store);
  }

  // ── 公共接口 ──

  get store(): DataStore { return this._store; }

  get frameCount(): number { return this._frameCount; }

  /** 渲染展示层 (View) — 供外部直接访问渲染方法 */
  get renderView(): Bank00RenderView { return this._render; }

  // ──────────────────────────────────────────────
  // $98A0: Nametable 全屏清零
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $98A0: NT 全屏清零 (渲染部分)。
   * 实现在 view/bank00/Bank00RenderView.ntClear()。
   */
  ntClear(): void {
    this._render.ntClear();
  }

  // ──────────────────────────────────────────────
  // $9B11: Nametable + 属性表清零
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $9B11: 清零 Nametable 和 attribute table。
   * 实现在 view/bank00/Bank00RenderView.ntAttrClear()。
   */
  ntAttrClear(): void {
    this._render.ntAttrClear();
  }

  // ──────────────────────────────────────────────
  // $8297 & $9085: 文本 buffer 构建 (非调色板!)
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $8297: 文本 buffer 参数设置 (渲染部分)。
   * 实现在 view/bank00/Bank00RenderView.paletteInit()。
   *
   * @param palIdx 文本 buffer 索引 (Reset 时 A=0x0D)
   */
  paletteInit(palIdx: number): void {
    this._render.paletteInit(palIdx);
  }

  /**
   * 对应原始 $9085: 文本 buffer 构建入口 (渲染部分, no-op)。
   * 实现在 view/bank00/Bank00RenderView.paletteWriteBuf()。
   */
  paletteWriteBuf(_data: number[]): void {
    this._render.paletteWriteBuf(_data);
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
   * 对应原始 $9AB8 (BG) + $9ADA (SPR): 调色板组加载 (渲染部分)。
   * 实现在 view/bank00/Bank00RenderView.paletteLoad()。
   *
   * @param bgGrp  BG 调色板组号 (ram_0048, 场景 header h[2]&0x3F)
   * @param sprGrp SPR 调色板组号 (ram_0049, setup 0x80+ 操作码或默认 0)
   */
  paletteLoad(bgGrp: number, sprGrp: number): void {
    this._render.paletteLoad(bgGrp, sprGrp);
  }

  // ──────────────────────────────────────────────
  // $8AF7: 场景描述读取
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $8AF7: A=sceneId → $ED → 切 Bank07 → 读 Bank02 场景指针表 → 解析场景数据。
   * H5: 根据 sceneId 加载对应场景配置 (业务部分)。
   * 渲染部分 (NT 写入) 委托 view.loadSceneNT()。
   *
   * 场景 header[2]&0x3F = BG 调色板组号 → ram_0048 (供 mainLoopInit2 → paletteLoad)。
   *
   * @param sceneId 场景编号 (Reset: 0x17 = Tecmo Theater)
   */
  sceneLoad(sceneId: number): void {
    this._store.write(SCENE_ID, sceneId & 0xFF);
    // $8AF7: 切 Bank07 → 场景指针表 → header h[2]&0x3F → ram_0048
    const bgGrp = getSceneBgGrp(sceneId & 0xFF);
    this._store.write('ram_0048', bgGrp & 0xFF);
    // SPR 组号由场景 setup 指令设置, 默认 0
    this._store.write('ram_0049', 0);

    // 渲染部分: 把场景的 NT tile + 属性表写入 DataStore。
    // ⚠️ 注意: 若场景初始化链中后续有 ntClear (如 $A4C0 链 $A538 JSR $98A0),
    // 背景会被清掉, 需在 ntClear 之后调用 renderSceneNT() 重新写入 (见 $A4C0 链)。
    this._render.loadSceneNT(sceneId);
  }

  /** 仅渲染部分: 重新写入场景 NT tile + 属性表 (供 ntClear 之后恢复背景用)。 */
  renderSceneNT(sceneId: number): void {
    this._render.loadSceneNT(sceneId);
  }

  // ──────────────────────────────────────────────
  // $890C: VRAM 地址/滚动设置 (渲染部分)
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $890C: A=索引(0x30) → 从数据表读滚动偏移 → 设置 PPU $2006/$2005。
   * 实现在 view/bank00/Bank00RenderView.vramAddrSetup()。
   *
   * @param idx VRAM 索引参数 (Reset: 0x30)
   */
  vramAddrSetup(idx: number): void {
    this._render.vramAddrSetup(idx);
  }

  // ──────────────────────────────────────────────
  // $88FB: PPU 寄存器设置 (渲染部分)
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $88FB: PPUCTRL/PPUMASK/PPUSCROLL 设置。
   * 实现在 view/bank00/Bank00RenderView.ppuRegSetup()。
   */
  ppuRegSetup(): void {
    this._render.ppuRegSetup();
  }

  // ──────────────────────────────────────────────
  // $9A43 & $9A35: 主循环初始化
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $9A43: 主循环初始化 part1。
   * 汇编: LDA #$0F → STA ram_004A → STA ram_004B → JMP $9A71。
   * 渐显初始值写入委托 view.setFadeCounters()。
   */
  mainLoopInit1(): void {
    this._render.setFadeCounters(0x0F, 0x0F);
  }

  /**
   * 对应原始 $9A35: 主循环初始化 part2。
   * 汇编链: JSR $9B07 → JSR $9AB8 (BG 调色板) → JSR $9ADA (SPR 调色板)
   *         → LDX $E9 → JSR $C4B9 → $9A43 (ram_004A=ram_004B=0x0F) → JMP $9A71。
   * H5: 渲染部分 (调色板加载 + 渐显初始值) 委托 view, 其余为业务状态清零。
   */
  mainLoopInit2(): void {
    // $9AB8/$9ADA: 从场景调色板表加载 BG/SPR 组 (渲染)
    const bgGrp = this._store.read('ram_0048') ?? 0;
    const sprGrp = this._store.read('ram_0049') ?? 0;
    this._render.paletteLoad(bgGrp, sprGrp);
    // $9A43: ram_004A/ram_004B = 0x0F (渲染渐显初始值)
    this._render.setFadeCounters(0x0F, 0x0F);
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
  dataWriteHelper(a: number, y?: number): void {
    void a;
    void y;
    // 功能待补充
  }

  // ──────────────────────────────────────────────
  // Bank 02 共享调用 ($8895/$8920/$8976/$9A0D/$98EA/
  //                  $9F89/$9F96/$9B91/$9FA8)
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $8895: 设置场景参数 + 数据指针。
   * 汇编:
   *   STA ram_0057; LDX #$0D; LDA #$A8; STA ram_0000,X
   *   LDA #$88; STA ram_0001,X; LDY #$A0; LDA #$00
   *   JSR $9F69 (dataWriteHelper(0x00, 0xA0)); RTS
   *
   * @param a 场景参数 (写入 ram_0057)
   */
  sceneParamSet(a: number): void {
    const s = this._store;
    s.write('ram_0057', a & 0xFF);
    s.write('ram_000D', 0xA8);
    s.write('ram_000E', 0x88);
    this.dataWriteHelper(0x00, 0xA0);
  }

  /**
   * 对应原始 $8920: 场景数据加载。
   * 汇编: LDX #$13 → JSR $9DEE → 指针 += $BF00 → JSR $C4B9
   *   等待 ram_0078==0 → 读 19 字节到 ram_0079/007A/007B..
   * H5: ROM 数据已内嵌, 无动态源。保留参数记录 + TODO。
   *
   * @param param 数据组编号 (A)
   */
  tableLoad(param: number): void {
    const s = this._store;
    // TODO: 从 (ram_00EC) 指向的数据源读取 → ram_0079/007B.. (数据源待接线)
    s.write('ram_0079', param & 0xFF); // 记录参数
    s.write('ram_007A', 0);
    for (let i = 0; i < 0x12; i++) {
      s.write(`ram_007${(i + 1).toString(16).toUpperCase()}`, 0);
    }
  }

  /**
   * 对应原始 $8976: 数据源切换。
   * 汇编: 4D/4E → EA/EB; E6=2; E7=X; E8=Y; 4D=$E5; 4E=0;
   *   JSR $9085 (文本 buffer); 恢复 4D/4E。
   *
   * @param x 参数 → ram_00E7
   * @param y 参数 → ram_00E8
   */
  dataSourceSwitch(x: number, y: number): void {
    const s = this._store;
    s.write('ram_00EA', s.read('ram_004D'));
    s.write('ram_00EB', s.read('ram_004E'));
    s.write('ram_00E6', 2);
    s.write('ram_00E7', x & 0xFF);
    s.write('ram_00E8', y & 0xFF);
    s.write('ram_004D', 0xE5);
    s.write('ram_004E', 0x00);
    this.paletteWriteBuf([]);
    s.write('ram_004D', s.read('ram_00EA'));
    s.write('ram_004E', s.read('ram_00EB'));
  }

  /**
   * 对应原始 $9A0D: 帧计数器等待 (调色板渐显推进)。
   * 汇编: ram_004A != 0 时 DEC + JSR $9A71 + JSR $9FA8(1) + 循环。
   * 渐显推进委托 view.fadeWait()。
   */
  waitCounter(): void {
    this._render.fadeWait();
  }

  /**
   * 对应原始 $98EA: PPU 16 字节块填充。
   * 汇编: A=填充值; Y=行数; X=行字节数 → $9B28 buffer + $9B5E 结束。
   * H5: PPU buffer 由帧合成器消费, 记录请求标志。
   *
   * @param y 行数
   * @param x 每行字节数
   * @param a 填充值
   */
  ppuFill98EA(y: number, x: number, a: number): void {
    // TODO: 将 a 填充到 ram_00E6/00E7 指向的 NT 区域
    void y; void x; void a;
    this._store.write('ppuFillPending', 1);
  }

  /**
   * 对应原始 $9F89: OAM 终止判定。
   * 汇编: ram_0001,X != 0 且 ram_0000,X == 0 → ram_0000,X = 1。
   *
   * @param x zp 索引
   */
  oamTerm89(x: number): void {
    const s = this._store;
    if (s.read(`ram_000${x.toString(16).toUpperCase()}`) !== 0) {
      if (s.read(`ram_000${(x + 1).toString(16).toUpperCase()}`) === 0) {
        s.write(`ram_000${x.toString(16).toUpperCase()}`, 1);
      }
    }
  }

  /**
   * 对应原始 $9F96: OAM 终止处理。
   * 汇编: ram_0000,X == 0xFF → JSR $9FA8(1); 然后 ram_0000,X = 0。
   *
   * @param x zp 索引
   */
  oamTerm96(x: number): void {
    const s = this._store;
    // $9F96: ram_0000,X == 0xFF 时原 JSR $9FA8(1) (bank 切换, H5 no-op) 已省略
    s.write(`ram_000${x.toString(16).toUpperCase()}`, 0);
  }

  /**
   * 对应原始 $9B91: OAM 区域标志清零 (渲染部分)。
   * 实现在 view/bank00/Bank00RenderView.oamFlagClear()。
   */
  oamFlagClear(): void {
    this._render.oamFlagClear();
  }

  // ──────────────────────────────────────────────
  // $9BA0: 等待 VBlank
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $9BA0: 等待 NMI 标志 → 设 $E6=$00, $E7=$00 → RTS。
   * 渲染部分 (帧同步标记) 实现在 view/bank00/Bank00RenderView.waitVBlank()。
   */
  waitVBlank(): void {
    this._render.waitVBlank();
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
   * 对应原始 $9B28: PPU Buffer 空间分配 (渲染部分)。
   * 实现在 view/bank00/Bank00RenderView.ppuBufAlloc()。
   *
   * @param size 需要分配的字节数
   * @returns 可写入的缓冲区偏移
   */
  ppuBufAlloc(size: number): number {
    return this._render.ppuBufAlloc(size);
  }

  /**
   * 对应原始 $9B5E: PPU Buffer 结束标记 (渲染部分)。
   * 实现在 view/bank00/Bank00RenderView.ppuBufEnd()。
   */
  ppuBufEnd(): void {
    this._render.ppuBufEnd();
  }

  /**
   * 写单个字节到 PPU Buffer (渲染部分)。
   */
  ppuBufWrite(offset: number, value: number): void {
    this._render.ppuBufWrite(offset, value);
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

    // 清零 PPU Buffer (渲染部分)
    this._render.ppuBufClear();

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

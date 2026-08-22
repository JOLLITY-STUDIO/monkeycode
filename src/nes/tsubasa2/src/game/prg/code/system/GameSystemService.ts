/**
 * GameSystemService — 游戏主循环 / 场景调度 / 渲染原语 / 地图画面绘制
 * @bank 00 ($8000-$9FFF)
 *
 * 职责: mainLoop 主循环 $9EED、场景装载 $8AF7 sceneLoad、脚本分派入口、
 * 共享渲染原语 (ntClear/ntAttrClear/ppuBufAlloc/oamFlagClear/ppuFill/
 * paletteLoad/fade 等)。渲染原语直接作为方法写 DataStore
 * (NT/调色板/OAM/PPU buffer 区域), 不再有独立 RenderView。
 *
 * 含 $8EF0 地图画面绘制子程 (code_render.s):
 *   入口 A = metatile 索引; 切 bank8; LDA($00EA),Y 读 bank8 metatile 字典;
 *   画到 NT/OAM; 切回 bank7. 全项目仅此 1 处切 bank8 (读 bank08-map-metatile.ts).
 *   注意: 只管"地图画面绘制"(球场/比赛背景), 不管"界面渲染"(标题/密码/菜单
 *   走 bank02 NMI 回调, 不读 bank8).
 *
 * 调色板动态控制 (bank00 决定用哪组, bank06 提供数据):
 *   调色板索引由脚本指令/场景数据运行时决定, 非固定写死:
 *   - 脚本指令 $F3 palette(idx): ScriptEngine.opPalette() (asm $8681) 读 operand 设 ram_0048/0049
 *   - 场景描述符 ctrl 字段: code_scene.s:56-59 (asm $8B47) LDA($0063),Y; AND #$3F; STA $0048
 *   - bank28/bank30 也会写 ram_0048 (比赛配置/其他)
 *   索引设定后调 paletteLoadBG/paletteLoadSPR, 从 bank06 的 PALETTE_BG_06/PALETTE_SPR_06
 *   按索引×16 取 16 字节 → RAM $062A(BG)/$063A(SPR), 再 paletteWriteAll → PPU.
 *   PALETTE_BG_06/PALETTE_SPR_06 各 256 字节 (16组×16B), 静态表, 直接 import 不切 bank.
 *
 * 命名规范: 旧名 Bank00Service → 新名 GameSystemService。
 */
import { DataStore } from '../../data/store/DataStore';
import {
  WAIT_FRAME_TABLE,
  PAL_HELPER_TABLE,
  FRAME_WAIT_TABLE,
  SCENE_NEXT_8398,
  SCENE_FLAG_83BA,
  SCENE_SCRIPT_83DC,
  SCENE_SCRIPT_83FE,
  SCENE_SCRIPT_8420,
  SCENE_SCRIPT_8442,
  PALETTE_ANIM_87B3,
} from '../../data/tables/bank00-tables';
import {
  getSceneData as getBank07SceneData,
  SCENE_PTR_TABLE,
} from '../../data/tables/bank07-scenes-metatile';
import { PALETTE_BG_06, PALETTE_SPR_06 } from '../../data/scene/textscript/scripts-bank-06';

/** 4 位大写十六进制 RAM 键 */
function ramKey(addr: number): string {
  return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
}

export class GameSystemService {
  protected _store: DataStore;

  // 脚本状态缓存 (对应零页 $004D/$004E 等, 由 ScriptEngine 共享)
  protected _scriptPtr = 0;      // $004D/$004E
  protected _scriptBank = 0;     // $0056
  protected _textBufPtr = 0;     // $004F/$0050
  protected _textVramPtr = 0;    // $0051/$0052
  protected _textPos = 0;        // $0053
  protected _textLineLen = 0;    // $0054
  protected _lineCount = 0;      // $0055

  constructor(store: DataStore) {
    this._store = store;
  }

  // ════════════════════════════════════════════════
  // 零页读/写辅助
  // ════════════════════════════════════════════════

  protected rd(addr: number): number {
    return this._store.read(ramKey(addr));
  }
  protected wr(addr: number, v: number): void {
    this._store.write(ramKey(addr), v);
  }
  protected rdPtr(lo: number, hi: number): number {
    return this.rd(lo) | (this.rd(hi) << 8);
  }
  protected wrPtr(lo: number, hi: number, v: number): void {
    this.wr(lo, v & 0xff);
    this.wr(hi, (v >> 8) & 0xff);
  }

  // ════════════════════════════════════════════════
  // $9FA8 waitCounter — 等待 vblank 帧边界 (原 $9FA8)
  // 实现: 轮询 ram_001E bit4 (vblank 标志), 帧合成器设置。
  // ════════════════════════════════════════════════
  waitCounter(): void {
    // $9FA8: LDA #$00; STA $0019; 压栈 X/Y/E6-ED; 保存调度器栈帧 → 挂起当前协程
    this.wr(0x0019, 0);
    // 在翻译版帧模型中, 同步等待 vblank 由帧循环调度; 这里仅为语义占位。
    // 真实 H5 帧循环在调用 update() 前已保证处于 vblank 帧边界。
    void this.rd(0x0019);
  }

  // ════════════════════════════════════════════════
  // $98EA ppuFill — 用 A 填充 (ram_00E7<<8|ram_00E6) VRAM 区域
  // 入口: A=填充值, ram_00E6/00E7=VRAM 地址, X=列数, Y=行数
  // $98EA 是带调色板渐隐版本; $98F2 起核心循环。
  // ════════════════════════════════════════════════
  ppuFill(fill: number, vramAddr: number, cols: number, rows: number): void {
    // $98EA: LDA #$00; STA $00EB
    this.wr(0x00EB, 0);
    // $98EC: LDA $004A; ORA $004B; BEQ $992C  (若正在渐隐则跳过直接模式)
    if ((this.rd(0x004A) | this.rd(0x004B)) === 0) {
      this.ppuFillDirect(fill, vramAddr, cols, rows);
      return;
    }
    // $98F2 缓冲模式: 用 PPU buffer 逐块填充
    this.ppuFillBuffered(fill, vramAddr, cols, rows);
  }

  /** $98F2-$9929 缓冲模式 (PPU buffer) */
  private ppuFillBuffered(fill: number, vramAddr: number, cols: number, rows: number): void {
    this.wr(0x00E8, rows & 0xff);
    this.wr(0x00E9, cols & 0xff);
    let e9 = cols & 0xff;
    const rowCount = rows & 0xff;
    let addr = vramAddr;
    for (let r = 0; r < rowCount; r++) {
      let x = this.ppuBufAlloc(fill, e9, addr & 0xff);
      let n = e9;
      while (n > 0) {
        this.writePpuBuf(x, 0);
        x = (x + 1) & 0xff;
        n--;
      }
      this.ppuBufEnd(x);
      addr += 0x20;
    }
  }

  /** $992C-$9979 直接模式 (不建 PPU buffer, 直写 NT) */
  private ppuFillDirect(fill: number, vramAddr: number, cols: number, rows: number): void {
    // $992C-$993C: 写 $2000/$2001 寄存器 (渲染开启) — 翻译版 no-op (帧合成器渲染)
    this.wr(0x00E9, cols & 0xff);
    this.wr(0x00E8, rows & 0xff);
    // $9942-$9965: 写 NT 网格
    let addr = vramAddr;
    for (let r = 0; r < (rows & 0xff); r++) {
      for (let c = 0; c < (cols & 0xff); c++) {
        this.writeNTByte(addr, fill);
        addr++;
      }
      addr += 0x20 - (cols & 0xff);
    }
  }

  /** $98E8 — ppuFill 入口别名 (A 已置好, ram_00E6/00E7/00E9/X/Y) */
  ppuFill98E8(): void {
    // $98E8: LDY #$00; LDA #$00; STA $00EB (与 $98EA 相同入口)
    this.wr(0x00EB, 0);
    const vramAddr = this.rdPtr(0x00E6, 0x00E7);
    const cols = this.rd(0x00E9);
    const rows = this.rd(0x00E8);
    void vramAddr; void cols; void rows;
  }

  /** 写单个 NT 字节 (地址 → 网格坐标) */
  writeNTByte(vramAddr: number, val: number): void {
    const a = vramAddr & 0x3ff;
    const nt = vramAddr < 0x2400 ? 0 : 1;
    const x = a % 32;
    const y = (a / 32) | 0;
    if (x < 32 && y < 30) {
      this._store.writeNT(nt as 0 | 1, x, y, { tile: val, palette: 0, bank: 0, flipH: false, flipV: false, behindBg: false });
    }
  }

  // ════════════════════════════════════════════════
  // $98A0 ntClear — 清空 NT0 ($2000-$23FF)
  // ════════════════════════════════════════════════
  ntClear(): void {
    // $98A0-$98B9: 关渲染写寄存器
    // $98BC-$98C8: 写 0x800 (2 NT) 个 tile = 0
    for (let y = 0; y < 30; y++) {
      for (let x = 0; x < 32; x++) {
        this._store.writeNT(0, x, y, { tile: 0, palette: 0, bank: 0, flipH: false, flipV: false, behindBg: false });
        this._store.writeNT(1, x, y, { tile: 0, palette: 0, bank: 0, flipH: false, flipV: false, behindBg: false });
      }
    }
  }

  // ════════════════════════════════════════════════
  // $9B11 ntAttrClear — 清调色板 fade 计数器 + 属性区
  // ════════════════════════════════════════════════
  ntAttrClear(): void {
    // $9B11-$9B19: $0048/$0049/$004A/$004B = 0
    this.wr(0x0048, 0);
    this.wr(0x0049, 0);
    this.wr(0x004A, 0);
    this.wr(0x004B, 0);
    // $9B1B: A=0x0F; $9B1F-$9B23: $054A-$063F = 0x0F
    this._store.copy(ramKey(0x054A), new Uint8Array(0xF6).fill(0x0F), 0xF6);
    // $9B25: JMP $9A71 (paletteWriteAll)
    this.paletteWriteAll();
  }

  // ════════════════════════════════════════════════
  // $9B28 ppuBufAlloc — 分配 PPU buffer 槽 (A=控制, X=长度, Y=目标)
  // 返回: 写入后的 X 索引 (下一槽起始)
  // ════════════════════════════════════════════════
  ppuBufAlloc(ctrl: number, len: number, dst: number): number {
    // $9B29 BIT $0629; BVC → 若忙则等一帧重试
    // 翻译版: 忙时轮询 (语义上由帧循环保证非忙)
    let x = this.rd(0x0628);
    while ((this.rd(0x0629) & 0x40) !== 0) {
      // $9B2E-$9B34: 等帧后重试
      this.waitCounter();
      x = this.rd(0x0628);
    }
    // $9B37: A = (A & 0x3F) + $0628; if >= 0x3D 等帧重试
    const c = (ctrl & 0x3f) + this.rd(0x0628);
    if (c >= 0x3d) {
      this.waitCounter();
      return this.ppuBufAlloc(ctrl, len, dst);
    }
    // $9B42: $0629 |= (A | 0x40)
    this.wr(0x0629, ((ctrl & 0x3f) | 0x40) & 0xff);
    x = this.rd(0x0628);
    // $9B47-$9B57: $05EA+X = X-reg(源高), $05E9+X = Y(源低), $05E8+X = A(控制)
    this.writePpuBuf(x, ctrl & 0x3f);
    this.writePpuBuf(x + 1, dst & 0xff);
    this.writePpuBuf(x + 2, (dst >> 8) & 0xff);
    this.wr(0x0629, (this.rd(0x0629) & 0xbf) & 0xff);
    x = (x + 3) & 0xff;
    this.wr(0x0628, x);
    return x;
  }

  /** $9B5E ppuBufEnd — 结束 PPU buffer (写终止符) */
  ppuBufEnd(x: number): void {
    this.writePpuBuf(x, 0);
    this.wr(0x0628, x);
    this.wr(0x0629, this.rd(0x0629) & 0xbf);
  }

  /** 写 PPU buffer 字节 $05E8+X */
  writePpuBuf(x: number, v: number): void {
    this._store.write(ramKey(0x05E8 + x), v);
  }
  readPpuBuf(x: number): number {
    return this._store.read(ramKey(0x05E8 + x));
  }

  // ════════════════════════════════════════════════
  // $9B91 oamFlagClear — 清精灵组计数标志 ($0568/$0588/$05A8/$05C8)
  // ════════════════════════════════════════════════
  oamFlagClear(): void {
    this.wr(0x0568, 0);
    this.wr(0x0588, 0);
    this.wr(0x05A8, 0);
    this.wr(0x05C8, 0);
  }

  // ════════════════════════════════════════════════
  // $9B7F initHelper — 清空全部精灵 (影子 OAM + 硬件 OAM + 组计数)
  // ════════════════════════════════════════════════
  initHelper(): void {
    // $9B81-$9B8F: 影子 OAM $0468-$0567 与 硬件 OAM $0200-$02FF 全填 $F8
    this._store.oamShadow.clearAll(0xf8);
    this._store.oamShadow.clearHw(0xf8);
    // $9B91 oamFlagClear
    this.oamFlagClear();
  }

  // ════════════════════════════════════════════════
  // $9A71 paletteWriteAll — 写调色板到 PPU buffer ($3F00)
  // 读取 $062A 起的调色板数据, 用 PAL_HELPER_TABLE 做渐显偏移。
  // ════════════════════════════════════════════════
  paletteWriteAll(): void {
    // $9A71: LDA #$20 (长度 0x20 = 32)
    let x = this.ppuBufAlloc(0x20, 0x20, 0x3f00);
    this.wr(0x00E7, x);
    // $9A7E-$9A9B: 32 字节调色板
    for (let y = 0; y < 0x20; y++) {
      const v = this.rd(0x062A + y) & 0x30;
      const a = y < 0x10 ? this.rd(0x004A) : this.rd(0x004B);
      this.paletteWriteByte(y, v + a);
    }
    // $9A9C: LDX $00E7; JSR $9B5E
    this.ppuBufEnd(this.rd(0x00E7));
  }

  /** $9AA2 paletteWriteByte — 写单个调色板字节到 buffer */
  private paletteWriteByte(y: number, val: number): void {
    let x = this.rd(0x00E7);
    // $9AA3: LDA $9EA2,X 查表
    const base = PAL_HELPER_TABLE[val & 0xff] ?? 0;
    // $9AA8: 值 = ($062A+Y & 0x0F) | 表
    const b = (this.rd(0x062A + y) & 0x0f) | base;
    this.writePpuBuf(x, b);
    this.wr(0x00E7, x + 1);
  }

  // ════════════════════════════════════════════════
  // $9AB8 paletteLoadBG — 从 bank06 读 BG 调色板到 $062A
  // $9ADA paletteLoadSPR — 从 bank06 读 SPR 调色板到 $063A
  // 调色板数据已从 bank06 提取为 PALETTE_BG_06 / PALETTE_SPR_06, 直接 import 读取。
  // ════════════════════════════════════════════════
  paletteLoadBG(): void {
    // $9AB8: 索引 = $0048; 每组 16 字节; 从 PALETTE_BG_06[索引*16 .. +16] → $062A
    const idx = this.rd(0x0048);
    this.paletteCopy16(PALETTE_BG_06, idx, 0x062A);
  }

  paletteLoadSPR(): void {
    // $9ADA: 索引 = $0049; 每组 16 字节; 从 PALETTE_SPR_06[索引*16 .. +16] → $063A
    const idx = this.rd(0x0049);
    this.paletteCopy16(PALETTE_SPR_06, idx, 0x063A);
  }

  /** 从调色板表复制 16 字节到指定 RAM 区 (索引 × 16 = 组偏移) */
  private paletteCopy16(table: readonly number[], idx: number, dst: number): void {
    const off = (idx * 16) & 0xff;
    for (let i = 0; i < 0x10; i++) {
      this.wr(dst + i, table[off + i] ?? 0);
    }
  }

  // ════════════════════════════════════════════════
  // $9A43 paletteSetFull — 立即置满调色板渐显 ($004A/$004B=$0F)
  // ════════════════════════════════════════════════
  paletteSetFull(): void {
    this.wr(0x004A, 0x0f);
    this.wr(0x004B, 0x0f);
    this.paletteWriteAll();
  }

  // ════════════════════════════════════════════════
  // $9A31 mainInitParam — 初始化调色板并置满 (对应 $9A31)
  // 入口 A=BG索引, X=SPR索引
  // ════════════════════════════════════════════════
  mainInitParam(bgIdx: number, sprIdx: number): void {
    this.wr(0x0048, bgIdx);
    this.wr(0x0049, sprIdx);
    this.paletteLoadBG();
    this.paletteLoadSPR();
    this.paletteSetFull();
  }

  // ════════════════════════════════════════════════
  // $9A35 mainLoopInit2 — 初始化调色板 (仅 BG 索引)
  // ════════════════════════════════════════════════
  mainLoopInit2(bgIdx: number): void {
    this.wr(0x0048, bgIdx);
    this.paletteLoadBG();
    this.paletteSetFull();
  }

  /** $9A4C mainInitParamBgOnly — 仅 BG 置满 */
  mainInitParamBgOnly(bgIdx: number): void {
    this.wr(0x0048, bgIdx);
    this.paletteLoadBG();
    this.wr(0x004A, 0x0f);
    this.paletteWriteAll();
  }

  /** $9A60 mainInitParamSprOnly — 仅 SPR 置满 */
  mainInitParamSprOnly(sprIdx: number): void {
    this.wr(0x0049, sprIdx);
    this.paletteLoadSPR();
    this.wr(0x004B, 0x0f);
    this.paletteWriteAll();
  }

  // ════════════════════════════════════════════════
  // $9B07 bankSwitch — 已移除 (原 JSR $C4B9 切 PRG bank)
  // 去CPU化: H5 直接 import 各 bank 数据, 无需切 bank.
  // 原 ram_0025 (当前 bank 号) / ram_00E9 (bankSwitch 复用) 语义已废弃.
  // ════════════════════════════════════════════════

  // ════════════════════════════════════════════════
  // $99F0 fadeOut — 调色板渐隐 (递减 $004A/$004B)
  // ════════════════════════════════════════════════
  fadeOut(): void {
    // $99F0-$9A0C 循环
    while (true) {
      const a = this.rd(0x004A);
      const b = this.rd(0x004B);
      if ((a | b) === 0) break;
      if (a !== 0) this.wr(0x004A, a - 1);
      if (this.rd(0x004B) !== 0) this.wr(0x004B, this.rd(0x004B) - 1);
      this.paletteWriteAll();
      this.waitCounter();
    }
  }

  // ════════════════════════════════════════════════
  // $997A fadeIn — 调色板渐显 (递增加载调色板至满)
  // ════════════════════════════════════════════════
  fadeIn(): void {
    this.paletteLoadBG();
    this.paletteLoadSPR();
    // $998C-$99AB 循环递增
    while (true) {
      const a = this.rd(0x004A);
      const b = this.rd(0x004B);
      if (a < 0x0f) this.wr(0x004A, a + 1);
      if (this.rd(0x004B) < 0x0f) this.wr(0x004B, this.rd(0x004B) + 1);
      this.paletteWriteAll();
      this.waitCounter();
      if (this.rd(0x004A) + this.rd(0x004B) >= 0x1e) break;
    }
  }

  // ════════════════════════════════════════════════
  // $99D1 fadeInSpr — 仅 SPR 渐显
  // ════════════════════════════════════════════════
  fadeInSpr(): void {
    this.paletteLoadSPR();
    while (true) {
      const b = this.rd(0x004B);
      if (b >= 0x0f) break;
      this.wr(0x004B, b + 1);
      this.paletteWriteAll();
      this.waitCounter();
    }
  }

  // ════════════════════════════════════════════════
  // $9BA0 waitVBlank — 渐隐 + 清屏 + 清精灵 (场景切换前)
  // ════════════════════════════════════════════════
  waitVBlank(): void {
    this.fadeOut();
    this.ntClear();
    this.initHelper();
  }

  // ════════════════════════════════════════════════
  // $9F69 dataWriteHelper(a, y, x) — 调度器栈帧构建
  // 原 $9F69: STA $0002,X; DEY; LDA $0000,X; STA $0101,Y;
  //   LDA $0001,X; STA $0102,Y; STY $0001,X; LDA #$FF; STA $0000,X
  // 调用方需传零页基址 x。等价于把回调指针挂到调度器栈。
  // ════════════════════════════════════════════════
  dataWriteHelper(a: number, y: number, x: number): void {
    this.wr(0x0002 + x, a);
    y = (y - 1) & 0xff;
    this.wr(0x0101 + y, this.rd(0x0000 + x));
    this.wr(0x0102 + y, this.rd(0x0001 + x));
    this.wr(0x0001 + x, y);
    this.wr(0x0000 + x, 0xff);
  }

  // ════════════════════════════════════════════════
  // $8920 tableLoad — 从 bank06 加载 19 字节场景表到 $0079/$007B
  // 原 $8920: LDX #$13; JSR $9DEE; 指针=$A0BF+...; 读 bank06
  // ════════════════════════════════════════════════
  tableLoad(a: number): void {
    // $9DEE: $00ED=A; $00EC=0; 乘 0x13 (19)
    let ec = 0;
    let ed = a;
    for (let i = 0; i < 8; i++) {
      ec <<= 1; ed <<= 1;
      if (ed & 0x100) { ec += 0x13; ed &= 0xff; }
      ec &= 0xff; ed &= 0xff;
    }
    // 指针 = $A000 + ec/ed + $BF00 调整 → 实际 bank06 表
    // bank06 数据区由 bank06 侧提供 (KV: sceneTable)
    const tbl = this._store.get<readonly number[]>(`sceneTable_${(ed & 0xff).toString(16)}`) ?? [];
    this.wr(0x0079, tbl[0] ?? 0);
    this.wr(0x007A, 0);
    for (let i = 1; i < 19; i++) {
      this.wr(0x007B + (i - 1), tbl[i] ?? 0);
    }
  }

  // ════════════════════════════════════════════════
  // $8AF7 sceneLoad — 场景装载
  // 入口: A=场景 id → ram_00ED
  // ════════════════════════════════════════════════
  sceneLoad(sceneId: number): void {
    this.wr(0x00ED, sceneId);
    this.wr(0x0009, 0);
    this.wr(0x000A, 0);
    this.wr(0x000D, 0);
    this.wr(0x000E, 0);
    this.wr(0x005B, this.rd(0x005B) & 0x7f);
    // $8B09-$8B0F: 切 bank07 读场景数据 — 去CPU化: H5 直接 import bank07 数据, 无需切 bank
    // $8B12-$8B1A: 清 $0552-$063F
    for (let i = 0; i < 0xEE; i++) this.wr(0x0552 + i, 0);

    // $8B1C-$8B39: 查 SCENE_PTR_TABLE[sceneId] 得场景数据入口, 读前 6 字节 SceneData
    const sceneData = this.getSceneData(sceneId);
    if (sceneData) {
      this.applySceneData(sceneData);
    }
    // $8CB7: 切回场景 bank — 去CPU化: 无需切回, H5 数据始终可见
  }

  /**
   * 从 bank07 场景表读场景数据 (原 asm $8B1C-$8B6B)。
   * 查 SCENE_PTR_TABLE 得入口地址, 读前 6 字节解析为 SceneData。
   */
  private getSceneData(sceneId: number): SceneData | null {
    if (sceneId < 0 || sceneId >= SCENE_PTR_TABLE.length) return null;
    // 场景原始字节 (从 bank07-tables 获取)
    const raw = this.getSceneRawBytes(sceneId);
    if (!raw || raw.length < 6) return null;
    // $8B3D-$8B6B: 解析前 6 字节
    const ptrLo = raw[0];
    const ptrHi = raw[1];
    const ctrl = raw[2];
    const palette = ctrl & 0x3F;
    const dir = (ctrl >> 6) & 0x03;
    const w = raw[3];
    const h = raw[4];
    const pos = raw[5];
    return { ptrLo, ptrHi, palette, dir, w, h, pos, ctrl };
  }

  /** 获取场景原始字节 (从 bank07 完整 8KB 数据按指针表提取) */
  private getSceneRawBytes(sceneId: number): readonly number[] | null {
    return getBank07SceneData(sceneId);
  }

  /** 应用场景数据 (从 bank07 场景表) */
  private applySceneData(sd: SceneData): void {
    this.wr(0x0075, sd.ptrLo);
    this.wr(0x0076, sd.ptrHi);
    this.wr(0x0048, sd.palette);
    // $005B bit0 (方向)
    this.wr(0x005B, (this.rd(0x005B) & 0xfe) | (sd.dir & 1));
    // $005E/$005F 尺寸
    this.wr(0x005E, sd.w);
    this.wr(0x005F, sd.h);
    this.wr(0x005C, sd.pos & 0xff);
    this.wr(0x005D, (sd.pos >> 8) & 0xff);
    this.wr(0x0060, sd.dir);
    this.wr(0x0062, sd.ctrl);
    void sd;
  }

  // ════════════════════════════════════════════════
  // 每帧推进 (原 mainLoop $9EED 分发)
  // ════════════════════════════════════════════════
  update(frame: number): void {
    void frame;
    // mainLoop 核心: 遍历调度器任务槽, 递减计数器, 执行就绪协程。
    // 翻译版由外部帧循环驱动; 这里委托调度协程执行。
    this.scheduleStep();
  }

  /** $9EEF-$9FFF 调度器单步 */
  private scheduleStep(): void {
    // 调度器任务槽遍历 ($0000+X 计数器, X=0,4,8,...)
    for (let x = 0; x < 0x19; x += 4) {
      const c = this.rd(0x0000 + x);
      if (c === 0) continue;
      if (c === 0xff) {
        this.wr(0x0000 + x, 0);
        continue;
      }
      this.wr(0x0000 + x, c - 1);
      if (c - 1 === 0) {
        this.wr(0x0000, x);
        this.wr(0x0001, 0);
        // 执行就绪协程 (回调挂在 $0002+X bank / $0101+Y)
        // 由外部通过协程注入; 翻译版 no-op 记录
      }
    }
  }
}

/** 场景数据结构 (bank07 提供) */
export interface SceneData {
  ptrLo: number;
  ptrHi: number;
  palette: number;
  dir: number;
  w: number;
  h: number;
  pos: number;
  ctrl: number;
}

  // ════════════════════════════════════════════════════════════
  // bank30 JMP 派发表函数 ($C509-$C54E)
  // 供 MatchSceneService (bank19) 等调用, 原 asm $C500 派发表项。
  // ════════════════════════════════════════════════════════════

  /**
   * $C515 → $CB0F: 协程让出核心。
   * asm: LDA #$00; STA $007F; 保存 X/Y; LDX $0000 (协程槽);
   *   存 bank24/25/标志/栈指针 到协程槽; JMP $CAA5 (调度器)。
   * H5 版: 不做真正协程切换, 用帧计数模拟 (标记等待, 下一帧推进)。
   * @param a 让出参数 (1=等1帧, 2=等2帧, $60=等96帧等)
   */
  coroutineYield(a: number = 1): void {
    void a;
    // H5 版 no-op: 协程让出由 update() 帧推进控制
    // 实际 asm 保存协程上下文到 $0000+ 槽, 切换到下一协程
  }

  /**
   * $C509 → $CB99: 通用查表/标志检查。
   * asm $CB99: TAY; 查表; 返回。
   * H5 版 stub。
   */
  subC509(a: number): number {
    return a;  // stub: 原样返回
  }

  /**
   * $C50C → $CD7C: 比赛阶段→RAM玩家数据指针查表。
   * asm $CD77: LDA $05FB; EOR #$0B; ASL; TAY; LDA $CD89,Y; STA $0034; LDA $CD8A,Y; STA $0035。
   * $CD89 表 32 项 16 位指针, 全在 $0300-$042C (RAM 玩家数据区)。
   * 已查证: 索引 = (比赛阶段 ^ $0B) << 1。
   */
  subC50C(): void {
    const phase = this.rd(0x05FB);
    const idx = ((phase ^ 0x0B) << 1) & 0xFF;
    // $CD89 表 (bank30 内, 32 项 16 位指针)
    const table = RAM_PTR_TABLE_CD89;
    const ptr = table[idx] ?? 0;
    this.wr(0x0034, ptr & 0xFF);
    this.wr(0x0035, (ptr >> 8) & 0xFF);
  }

  /**
   * $C524 → $CBC2: 坐标变换。
   * asm $CBC2: 读 ram_00E6/00E7, 算 NT 地址偏移。
   * H5 版 stub (由渲染管线覆盖)。
   */
  subC524(a: number): number {
    return a;  // stub
  }

  /**
   * $C530 → $CC02: NT 填充 (按 X/Y 参数填 NT 区)。
   * asm $CC02: 读参数, 设 PPU 地址, 循环写 $2007。
   * H5 版: 委托 ppuFill。
   */
  subC530(x: number, a: number): void {
    // X = NT 区索引, A = 填充值
    this.ppuFill(a, 0x2000 + x * 0x0400, 32, 30);
  }

  /**
   * $C533 → $CCD2: NT 刷新 (PPU buffer → PPU VRAM)。
   * asm $CCD2: 读 $05E8 buffer, 写 $2006/$2007。
   * H5 版: no-op (帧合成器直接从 DataStore 读 NT)。
   */
  subC533(): void {
    // H5 版: NT 刷新由 writeStoreToPpu (组合根) 每帧做, 此处 no-op
  }

  /**
   * $C54E → $CBB0: 读数据+设精灵。
   * asm $CBB0: 读参数, 设精灵属性。
   * H5 版 stub。
   */
  subC54E(a: number): void {
    void a;  // stub
  }
}

/** $CD89 指针表 (bank30, 32 项 16 位 RAM 玩家数据指针) */
const RAM_PTR_TABLE_CD89: readonly number[] = [
  0x0300, 0x030C, 0x0318, 0x0324, 0x0330, 0x033C, 0x0348, 0x0354,
  0x0360, 0x036C, 0x0378, 0x0384, 0x0390, 0x039C, 0x03A8, 0x03B4,
  0x03C0, 0x03CC, 0x03D8, 0x03E4, 0x03F0, 0x03FC, 0x0408, 0x040C,
  0x0410, 0x0414, 0x0418, 0x041C, 0x0420, 0x0424, 0x0428, 0x042C,
];

export default GameSystemService;

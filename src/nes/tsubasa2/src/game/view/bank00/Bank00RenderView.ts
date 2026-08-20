/**
 * Bank 00 Render View — bank00 渲染展示层 (View)
 *
 * 把 bank0 中"渲染/展示"相关逻辑从 service 剥离，统一收敛到 View：
 *
 *   NT 渲染   $98A0  NT 全屏清零        → ntClear()
 *             $9B11  NT + 属性表清零     → ntAttrClear()
 *             $8AF7  场景描述加载(渲染部)→ loadSceneNT()
 *             $890C  VRAM 地址/滚动设置  → vramAddrSetup()
 *             $88FB  PPU 寄存器设置      → ppuRegSetup()
 *   调色板    $9AB8  BG 调色板组加载     → paletteLoad() 前半
 *             $9ADA  SPR 调色板组加载    → paletteLoad() 后半
 *             $9EA2  渐显矩阵表          → PAL_FADE_MATRIX
 *             $9A71  调色板渐显渲染      → (帧合成器消费 paletteTable)
 *             $8297/$9085 文本 buffer 参数 → paletteInit()/paletteWriteBuf()
 *   OAM 精灵  $9B7F  清空全部精灵        → spriteClear()
 *             $9B6F  保存起点坐标        → spriteSetStart()
 *             $9B74  保存终点坐标+闭合标志 → spriteSetEnd()
 *             $9B91  精灵组计数清零      → oamFlagClear()
 *   帧同步    $9BA0  等待 VBlank         → waitVBlank()
 *   PPU Buffer $9B28 空间分配            → ppuBufAlloc()
 *             $9B5E  结束标记            → ppuBufEnd()
 *
 * 分层职责 (MVC):
 *   service (业务)  → 决定"何时显示什么"
 *   view (本类)     → 把状态/数据映射写入 DataStore (NT/OAM/palette)
 *   core (合成器)   → 消费 DataStore 合成像素帧
 */

import { DataStore } from '../../data/DataStore';
import { palWriteAll, palExportRGBA } from '../../data/prg/ppu/pallete/paletteManager';
import { SCENE_BG_PALETTE, SCENE_SPR_PALETTE } from '../../data/prg/ppu/pallete/scene-palette-table';
import {
  CUT_0x17_NT0,
  CUT_0x17_ATTR0,
} from '../../data/prg/ppu/nametable/cut/cut_0x17_nt';
import type { PaletteColor } from '../../model/types';

/* eslint-disable @typescript-eslint/no-unused-vars */

// ── 常量 ──

/** PPU Buffer 地址 ($05E8-$0628, 64B) */
const PPU_BUF_BASE = 'ppuBuf_';
const PPU_BUF_SIZE = 64;

/** PPU Buffer 写指针 */
const PPU_BUF_PTR = 'ppuBufPtr';

/**
 * 调色板渐显矩阵表 (bank0 $9EA2, 4×16)。
 * 原始 $9A71: X = (数据&$30) + 渐显进度 → 查此表得到该调色板值的"渐显行"。
 * 行 0 全 0F (黑/隐藏)，行 1-3 随进度逐行显色。
 */
const PAL_FADE_MATRIX: readonly number[] = [
  0x0f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x0f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x10, 0x10, 0x20, 0x20, 0x30, 0x30, 0x20, 0x20, 0x10,
  0x0f, 0x00, 0x00, 0x00, 0x10, 0x10, 0x10, 0x20, 0x20, 0x20, 0x30, 0x30, 0x30, 0x20, 0x20, 0x20,
  0x0f, 0x00, 0x10, 0x10, 0x10, 0x20, 0x20, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30,
];

export class Bank00RenderView {
  private _store: DataStore;

  constructor(store: DataStore) {
    this._store = store;
  }

  // ═══════════════════════════════════════════════════════════
  // NT 渲染
  // ═══════════════════════════════════════════════════════════

  /**
   * 对应 $98A0: NT 全屏清零 (禁用渲染 → 2048 个 $00 → 恢复)。
   * H5: 清零 DataStore nt0/nt1 网格。
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

  /** 对应 $9B11: NT + 属性表清零。H5 中 ntClear() 已覆盖。 */
  ntAttrClear(): void {
    this.ntClear();
  }

  /**
   * 对应 $8AF7 的渲染部分: 把场景描述数据写入 NT。
   * 业务部分 (SCENE_ID/ram_0048 组号) 留在 service.sceneLoad。
   * 当前已解析场景: 0x17 = Tecmo Theater (标题菜单背景)。
   */
  loadSceneNT(sceneId: number): void {
    if ((sceneId & 0xFF) === 0x17) {
      this._loadCut0x17();
    }
  }

  /** 加载镜头 0x17 (标题菜单背景) 的 NT/ATTR 到 DataStore */
  private _loadCut0x17(): void {
    // CHR bank: 原始 BG 2KB CHR bank = 0/2, 对应 H5 8KB bank 0
    // (NT tile 索引即 PPU pattern-table 0 偏移, 无需 slot 转换)
    const CHR_BANK = 0;
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

  /** 对应 $890C: VRAM 地址/滚动设置 → DataStore scroll 偏移 */
  vramAddrSetup(_idx: number): void {
    this._store.scrollX = 0;
    this._store.scrollY = 0;
  }

  /** 对应 $88FB: PPU 寄存器设置 (H5: PPU 寄存器镜像) */
  ppuRegSetup(): void {
    // PPUCTRL = $08 (NMI on, 使用 NT0, 8×8 sprites)
    this._store.write('ppuctrl', 0x08);
    // PPUMASK = $1E (BG on, SPR on, 允许左 8px 渲染)
    this._store.write('ppumask', 0x1E);
  }

  // ═══════════════════════════════════════════════════════════
  // 调色板渲染
  // ═══════════════════════════════════════════════════════════

  /**
   * 对应 $9AB8 (BG) + $9ADA (SPR): 调色板组加载 → DataStore.paletteTable。
   * $9AB8: $B000 + bgGrp*16 (bank06 偏移 $1000 + bgGrp*16)
   * $9ADA: $B300 + sprGrp*16 (bank06 偏移 $1300 + sprGrp*16)
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
      const bgColors: PaletteColor[] = [];
      const sprColors: PaletteColor[] = [];
      for (let c = 0; c < 4; c++) {
        const bg = rgba[p * 4 + c];
        const spr = rgba[16 + p * 4 + c];
        bgColors.push({ r: bg[0], g: bg[1], b: bg[2], a: bg[3] });
        sprColors.push({ r: spr[0], g: spr[1], b: spr[2], a: spr[3] });
      }
      const bgEntry = { colors: bgColors as [PaletteColor, PaletteColor, PaletteColor, PaletteColor] };
      const sprEntry = { colors: sprColors as [PaletteColor, PaletteColor, PaletteColor, PaletteColor] };
      this._store.writeBgPalette(p as 0 | 1 | 2 | 3, bgEntry);
      this._store.writeSprPalette(p as 0 | 1 | 2 | 3, sprEntry);
    }
  }

  /**
   * 对应 $8297: 文本 buffer 参数设置 (A=palIdx → $E7, $E6=1)。
   * 注意: 非调色板, 是文本 buffer 构建参数。
   */
  paletteInit(palIdx: number): void {
    this._store.write('ram_00E7', palIdx & 0xFF);
    this._store.write('ram_00E6', 1);
  }

  /** 对应 $9085: 文本 buffer 构建 (H5: 由文本脚本引擎接管) */
  paletteWriteBuf(_data: number[]): void {
    // 无操作 — 文本 buffer 构建已由文本脚本引擎接管
  }

  /** 设置调色板渐显进度计数器 ram_004A/004B (对应 $9A43: = 0x0F) */
  setFadeCounters(a: number, b: number): void {
    this._store.write('ram_004A', a & 0xFF);
    this._store.write('ram_004B', b & 0xFF);
  }

  /**
   * 对应 $9A0D: 调色板渐显帧等待。
   * 原始: ram_004A != 0 → DEC + 渐显渲染 + 帧等待。
   * H5: 渐显由帧合成器逐帧消费 paletteTable, 此处仅推进帧边界。
   *
   * @returns true=本轮推进了一帧渐显 (ram_004A 已递减); false=已到 0
   */
  fadeWait(): boolean {
    const a = this._store.read('ram_004A');
    if (a !== 0) {
      this._store.write('ram_004A', (a - 1) & 0xFF);
      return true;
    }
    return false;
  }

  // ═══════════════════════════════════════════════════════════
  // OAM 精灵
  // ═══════════════════════════════════════════════════════════

  /**
   * 对应 $9B7F: 清空全部精灵。
   * 原始: OAM 缓冲 $0468-$04FF 全部填 $F8 (屏幕外隐藏),
   *       直接 OAM $0200-$02FF 也填 $F8, + 4 组精灵计数清零。
   * H5: 影子 OAM KV 区 ($0468/$0200) 填 $F8 + OamManager 槽 inactive + 组计数清零。
   */
  spriteClear(): void {
    const s = this._store;
    // $9B83: ram_0468-X (X=$00..$FF, 256B) 填 $F8 — 影子 OAM
    s.oamShadow.clearAll();
    // $9B8B: ram_0200-X 填 $F8 — 直接 OAM
    s.oamShadow.clearHw();
    // OamManager 槽 inactive (OamView 桥接层消费)
    const oam = this._store.oam;
    const count = oam.slotCount();
    for (let i = 0; i < count; i++) {
      oam.setPos(i, 0, 0xf8, false);
    }
    this.oamFlagClear();
  }

  /** 对应 $9B6F: 保存精灵起点坐标 → ram_009E/009F */
  spriteSetStart(x: number, y: number): void {
    this._store.write('ram_009E', x & 0xFF);
    this._store.write('ram_009F', y & 0xFF);
  }

  /**
   * 对应 $9B74: 保存精灵终点坐标 → ram_00A0/00A1,
   * 并把起点 ram_009E 的 bit7 置位 (第二点已确定/区域闭合标志)。
   */
  spriteSetEnd(x: number, y: number): void {
    this._store.write('ram_00A0', x & 0xFF);
    this._store.write('ram_00A1', y & 0xFF);
    const start = this._store.read('ram_009E') | 0x80;
    this._store.write('ram_009E', start);
  }

  /**
   * 对应 $9B91: 精灵组计数清零 ($0568/0588/05A8/05C8, 4 组 × $20)。
   */
  oamFlagClear(): void {
    const s = this._store;
    s.write('ram_0568', 0);
    s.write('ram_0588', 0);
    s.write('ram_05A8', 0);
    s.write('ram_05C8', 0);
  }

  // ═══════════════════════════════════════════════════════════
  // 帧同步
  // ═══════════════════════════════════════════════════════════

  /**
   * 对应 $9BA0 (等待 VBlank 一部分): 标记帧完成, 清 $E6/$E7。
   * H5: frame 同步。
   */
  waitVBlank(): void {
    this._store.write('vblankReady', 1);
    this._store.write('ram_00E6', 0);
    this._store.write('ram_00E7', 0);
  }

  // ═══════════════════════════════════════════════════════════
  // PPU Buffer (对应 $05E8-$0628 区)
  // ═══════════════════════════════════════════════════════════

  /** 清零 PPU Buffer + 重置写指针 (场景初始化链每帧调用) */
  ppuBufClear(): void {
    for (let i = 0; i < PPU_BUF_SIZE; i++) {
      this._store.write(PPU_BUF_BASE + i, 0);
    }
    this._store.write(PPU_BUF_PTR, 0);
  }

  /** 对应 $9B28: PPU Buffer 空间分配 (检查剩余空间, 返回写偏移) */
  ppuBufAlloc(size: number): number {
    const ptr = this._store.read(PPU_BUF_PTR);
    if (ptr + size > PPU_BUF_SIZE) return -1;
    return ptr;
  }

  /** 对应 $9B5E: PPU Buffer 结束标记 (末尾写 0x00 → 更新指针) */
  ppuBufEnd(): void {
    const ptr = this._store.read(PPU_BUF_PTR);
    this._store.write(PPU_BUF_BASE + ptr, 0x00);
  }

  /** 写单个字节到 PPU Buffer */
  ppuBufWrite(offset: number, value: number): void {
    this._store.write(PPU_BUF_BASE + offset, value & 0xFF);
  }

  /**
   * 对应 $98EA 的渲染部分: 把单个填充值写入 NT/属性表区域 (Y 行 × X 字节)。
   * 原始把 ram_00E6/00E7 指向的 VRAM 区域逐行 (每行 +$20) 填充 A。
   * H5: 把目标 VRAM 字节映射到 DataStore nt0/nt1 网格:
   *   - $2000-$23BF (NT tile 区): 写 tile 索引
   *   - $23C0-$23FF (NT0 属性区): 写调色板组 (每属性字节覆盖 2×2 tile 块)
   *   - $2400-$27FF (NT1, 水平镜像): 同理映射到 nt1
   *
   * @param vramAddr 起始 VRAM 地址 (ram_00E6/00E7 拼合)
   * @param rows 行数 (Y)
   * @param cols 每行字节数 (X)
   * @param value 填充值 (A)
   */
  ppuFillRegion(vramAddr: number, rows: number, cols: number, value: number): void {
    const s = this._store;
    const val = value & 0xFF;
    let addr = vramAddr & 0xFFFF;
    const rowStep = 0x20;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        this._applyVramByte((addr + c) & 0xFFFF, val);
      }
      addr = (addr + rowStep) & 0xFFFF;
    }
  }

  /** 把单个 VRAM 地址的字节写入对应 NT 网格 (tile 区或属性区) */
  private _applyVramByte(addr: number, val: number): void {
    const s = this._store;
    if (addr < 0x2000 || addr > 0x27FF) return;
    const base = addr & 0xFFF;   // 相对 nametable 起始 $2000/$2400 的偏移
    const ntSel = (addr & 0x400) !== 0 ? 1 : 0;
    if (base < 0x3C0) {
      // NT tile 区: 偏移即 tile 序号
      const t = base & 0x3FF;
      const tx = t % 32;
      const ty = Math.floor(t / 32);
      if (ty < 30) {
        const entry = s.readNT(ntSel as 0 | 1, tx, ty) ?? {
          tile: 0, palette: 0, bank: 0, flipH: false, flipV: false, behindBg: false,
        };
        s.writeNT(ntSel as 0 | 1, tx, ty, { ...entry, tile: val });
      }
    } else {
      // 属性表区 ($23C0-$23FF / $27C0-$27FF): 每字节含 4 个 2-bit 调色板组
      const aoff = base - 0x3C0;   // 0..63
      const ax = aoff % 8;
      const ay = Math.floor(aoff / 8);
      const pal = val & 0x03;      // 取低 2 bit 作为调色板组
      for (let dy = 0; dy < 2; dy++) {
        for (let dx = 0; dx < 2; dx++) {
          const tx = ax * 4 + dx;
          const ty = ay * 4 + dy;
          if (ty < 30 && tx < 32) {
            const entry = s.readNT(ntSel as 0 | 1, tx, ty) ?? {
              tile: 0, palette: 0, bank: 0, flipH: false, flipV: false, behindBg: false,
            };
            s.writeNT(ntSel as 0 | 1, tx, ty, { ...entry, palette: pal });
          }
        }
      }
    }
  }
}

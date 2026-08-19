/**
 * Data Query Service — Bank 01 (CPU $A000-$BFFF, PRG offset $2010-$400F)
 *
 * 功能: 球员/队伍数据查询 + 选项屏幕管理 + PPU 渲染工具
 *
 * Bank 01 的 9 个公共入口 (对应 $A000-$A01B JMP 跳板, Bank30 $C53C 调用):
 *   入口0 $A01E — 球员数据处理 (按队伍/位置查询能力值)
 *   入口1 $A10D — 数据/选项屏幕初始化
 *   入口2 $A4EB — PPU 图形数据显示
 *   入口3 $A64C — Nametable 屏幕内容绘制
 *   入口4 $A6D2 — PPU 属性块写入
 *   入口5 $AFC2 — 字符数据解码/显示
 *   入口6 $AF79 — VRAM 缓冲区写入 1
 *   入口7 $AF8A — VRAM 缓冲区写入 2
 *   入口8 $B050 — Bank 切换 + 数据加载
 *   入口9 $A39B — 球队数据初始化
 */
import { DataStore } from '../data/DataStore';
import type { Player, Team, PlayerStats } from '../model/types';
import { PlayerPosition, FormationType } from '../model/types';
import {
  COPY_B271,
  GFX_PTR_BCF3,
  GFX_PTR_BD64,
  GFX_PTR_BDA8,
  LOOKUP_16BIT,
  MENU_TBL,
  OPTION_FLAG_B255,
  OPTION_SCREEN_Y,
  PLAYER_DATA_BC6E,
  PLAYER_GFX_TBL,
  POS_TABLE_AD8A,
  ROSTER_PTR,
  SCENE_STAT_B393,
  SCENE_STAT_B3B5,
  SCENE_STAT_B3D7,
  SCENE_STAT_B3F9,
  SCENE_STAT_B41B,
  SCENE_SUB_TBL,
  SCRIPT_ENTRY2,
  SCRIPT_ENTRY4A,
  SEARCH_IDX,
  SEARCH_TABLE,
  TEAM_BLOCK_06,
  TEAM_BLOCK_0C,
  TEAM_BLOCK_10,
  TEAM_GFX_BASE,
} from '../data/bank01-more-tables';
import { CHAR_MAP_DOUBLE } from './bank00/char-map';
import { ScriptVM } from './bank00/script-vm';
import { getScriptData } from './bank00/script-data-loader';

// ── Bank 01 常量 ──

/** ram_00ED: 当前选项屏幕光标 (0-17) */
const KEY_ED = 'ram_00ED';
/** ram_00EC: 当前菜单索引 (0-64) */
const KEY_EC = 'ram_00EC';
/** ram_001C: 按键输入 */
const KEY_1C = 'ram_001C';
/** ram_001B: 状态标志 */
const KEY_1B = 'ram_001B';
/** ram_004C: PPU 写入控制 */
const KEY_4C = 'ram_004C';

// ── Bank 01 跳转表偏移 (CDL 标记 D1 已访问) ──
// 对应 asm $A000-$A01B JMP 跳板表

const JUMP_TARGETS: Record<number, { addr: number; name: string }> = {
  0:  { addr: 0xA01E, name: '球员数据处理入口' },
  1:  { addr: 0xA10D, name: '数据/选项屏幕初始化' },
  2:  { addr: 0xA4EB, name: 'PPU 图形数据显示' },
  3:  { addr: 0xA64C, name: '屏幕内容绘制' },
  4:  { addr: 0xA6D2, name: 'PPU 属性块写入' },
  5:  { addr: 0xAFC2, name: '字符数据解码/显示' },
  6:  { addr: 0xAF79, name: 'VRAM 缓冲区写入 1' },
  7:  { addr: 0xAF8A, name: 'VRAM 缓冲区写入 2' },
  8:  { addr: 0xB050, name: 'Bank 切换 + 数据加载' },
  9:  { addr: 0xA39B, name: '球队数据初始化' },
};

// ── 跨 Bank 数据 (固定例程引用, 原硬件经 $8000/$A000 窗口同时可见) ──

/**
 * Bank30 $CD89 — 球队能力指针表 (32 × 16bit RAM 地址)。
 * $C50C: ram_0034/35 = 16bit[$CD89 + ((ram_05FB ^ 0x0B) << 1)]
 */
const TEAM_STAT_PTR_CD89: readonly number[] = [
  0x00, 0x03, 0x0C, 0x03, 0x18, 0x03, 0x24, 0x03, 0x30, 0x03, 0x3C, 0x03, 0x48, 0x03, 0x54, 0x03,
  0x60, 0x03, 0x6C, 0x03, 0x78, 0x03, 0x84, 0x03, 0x90, 0x03, 0x9C, 0x03, 0xA8, 0x03, 0xB4, 0x03,
  0xC0, 0x03, 0xCC, 0x03, 0xD8, 0x03, 0xE4, 0x03, 0xF0, 0x03, 0xFC, 0x03, 0x08, 0x04, 0x0C, 0x04,
  0x10, 0x04, 0x14, 0x04, 0x18, 0x04, 0x1C, 0x04, 0x20, 0x04, 0x24, 0x04, 0x28, 0x04, 0x2C, 0x04,
];

/**
 * Bank31 $F329 — 球员图形指针表 (16bit 指针, 指向 CHR 数据)。
 * $C53C → $F30F: ram_0030/31 = 16bit[$F329 + (A << 1)]
 */
const PLAYER_GFX_PTR_F329: readonly number[] = [
  0xEB, 0x05, 0x09, 0xF5, 0x0D, 0xF5, 0x12, 0xF5, 0x15, 0xF5, 0x1A, 0xF5, 0x1F, 0xF5, 0x24, 0xF5,
  0x29, 0xF5, 0x2E, 0xF5, 0x34, 0xF5, 0x37, 0xF5, 0x3C, 0xF5, 0x40, 0xF5, 0x44, 0xF5, 0x49, 0xF5,
  0x4E, 0xF5, 0x53, 0xF5, 0x57, 0xF5, 0x5B, 0xF5, 0x5E, 0xF5, 0x63, 0xF5, 0x67, 0xF5, 0x6B, 0xF5,
  0x6F, 0xF5, 0x73, 0xF5,
];

/** 队伍阵容块指针表 (entry8 $B050 用): 场景 6/0xC/0x10 → 表 */ 
const TEAM_BLOCK_BY_SCENE: Record<number, readonly number[]> = {
  0x06: TEAM_BLOCK_06,
  0x0C: TEAM_BLOCK_0C,
  0x10: TEAM_BLOCK_10,
};

// ═══════════════════════════════════════════════════════════════
// DataQueryService
// ═══════════════════════════════════════════════════════════════

export class DataQueryService {
  /** 球员表 (id → Player) */
  private _players: Map<number, Player> = new Map();

  /** 队伍表 (id → Team) */
  private _teams: Map<number, Team> = new Map();

  /** 选项屏幕状态 */
  private _optionScreen = {
    active: false,
    cursorPos: 0,
    menuIndex: 0,
  };

  constructor(private _store: DataStore) {}

  // ── 主入口 (每帧调用) ──
  // $A201: 主循环 → 屏幕选择管理器

  /** 选项屏幕入口 (BootService TITLE→MEETING 时调用) */
  initOptionScreen(): void {
    this.entry1_OptionScreenInit();
  }

  update(_buttons: number, _frameCount: number): void {
    const ed = this._store.read(KEY_ED);
    const ec = this._store.read(KEY_EC);

    // 选项屏幕状态机
    if (this._optionScreen.active) {
      this._optionScreenUpdate();
    }

    // 根据 $ED / $EC 分发到对应处理
    const target = JUMP_TARGETS[ed];
    if (target) {
      this._dispatchEntry(ed);
    }
  }

  // ── 跳转表分发 (对应 Bank 01 $A000-$A01B) ──

  /**
   * 入口0 (A=0): 球员数据处理 — 读取队伍/球员属性表，计算能力值
   * 对应 asm $A01E-$A10C (CPU 窗口), 完整 1:1 转写:
   *   1. $A01E-$A038: 由 ram_0448/0446/044D + 场景号计算 ram_0660/0661 标志
   *   2. $A03B-$A08B: 10 项能力编码循环 (ram_0454 查询表 × LOOKUP_16BIT)
   *   3. $A08D-$A0AC: 汇总求和 → ram_0662/0663/0661
   *   4. $A0AF-$A0F2: 18 行数据显示循环 ($A438 字段提取 → $88CA 字符显示)
   *   5. $A0F4-$A10C: 帧等待 + $98E8 块填充 (4 行 × 11 列, 地址 $228A)
   */
  entry0_PlayerData(): void {
    const s = this._store;
    // 从 RAM 读取查询参数: ram_0448 (队伍ID), ram_0446 (位置), ram_044D (球员索引)
    const teamId = s.read('ram_0448');
    const playerIdx = s.read('ram_044D');

    // ── ① $A01E-$A02C: ram_0660 = ((scene<<1)|bit0(0448))<<1 | (0446>=5) ──
    // LDA ram_0448; LSR → carry=bit0; LDA ram_0026; ROL → A=(scene<<1)|carry;
    // CLC; LDX ram_0446; CPX #$05 → carry=(posIdx>=5); ROL
    const carry0 = teamId & 1;
    const sceneId = s.read('ram_0026');
    const a1 = ((sceneId << 1) | carry0) & 0xFF;
    // 第二 ROL 的 carry = bit7(a1) = scene bit6 (供后续 ROR 使用)
    const carryScene = (sceneId >> 6) & 1;
    const posIdx = s.read('ram_0446');
    s.write('ram_0660', ((a1 << 1) | (posIdx >= 5 ? 1 : 0)) & 0xFF);

    // ── ② $A02F-$A038: ram_0661 = ((ram_00E1>>1)|((044D&1)<<7)) & 0xB0 ──
    // LDA ram_044D; ROR (carry=044D&1) → LDA ram_00E1; ROR; AND #$B0
    const carryP = playerIdx & 1;
    const e1 = s.read('ram_00E1');
    s.write('ram_0661', (((e1 >> 1) | (carryP << 7)) & 0xB0));

    // ── ③ $A03B-$A08B: 10 项能力编码循环 ──
    // 每项: 查询值 V = ram_0454[i*2..+1] (16-bit, 调用方预填)
    //   E7 = LOOKUP_16BIT 最大 ≤ V 的表项索引 ($B02E)
    //   q  = (V - LOOKUP[E7]) / ((LOOKUP[E7+1] - LOOKUP[E7]) >> 2) ($9E0C 16位除法)
    //   ram_0656[i] = (E7 << 2) | q
    for (let i = 0; i < 10; i++) {
      const query = this._query16(i);
      const e7 = this._lookupIndex16(query);
      const tableVal = this._lookupValue16(e7);
      const rem = (query - tableVal) & 0xFFFF;
      let delta = 0;
      if (e7 < 63) delta = (this._lookupValue16(e7 + 1) - tableVal) & 0xFFFF;
      delta >>= 2;
      const q = delta > 0 ? Math.min(3, Math.floor(rem / delta)) : 0;
      // ram_0656,X = (ram_00E7 << 2) | ram_00EC ($807E-$8084)
      s.write(`ram_${(0x0656 + i).toString(16).toUpperCase()}`, ((e7 << 2) | q) & 0xFF);
    }

    // ── ④ $A08D-$A0AC: 汇总计算 ──
    // ram_0663 = ram_00E2 & 0xF0;  ram_00EB = (ram_0663>>4) | ram_0661
    const e2 = s.read('ram_00E2');
    s.write('ram_0663', e2 & 0xF0);
    let eb = ((e2 >> 4) & 0x0F) | s.read('ram_0661');

    // $A402: 16-bit 求和 = (0661&0xF0) + 0663 + Σ(ram_0656[0..10]) + $0309
    let sum = (s.read('ram_0661') & 0xF0) + s.read('ram_0663');
    for (let x = 0; x < 11; x++) sum += this._r8(0x0656 + x);
    sum += 0x0309;
    // $80A0: ram_0662 = sum lo; ram_0661 |= sum hi & 0x0F
    s.write('ram_0662', sum & 0xFF);
    s.write('ram_0661', s.read('ram_0661') | ((sum >> 8) & 0x0F));

    // ── ⑤ $A0AF-$A0F2: 18 行数据显示循环 (ram_00ED = 0..0x11) ──
    for (let ed = 0; ed < 0x12; ed++) {
      // JSR $A438: 按 POS_TABLE_AD8A[ed] 提取状态字段
      const field = this._extractStatField(ed);
      // $80B8-$80BE: 扫描 OPTION_FLAG_B255 找到匹配项
      let x = 0;
      while (x < OPTION_FLAG_B255.length && OPTION_FLAG_B255[x] !== field) x++;
      if (x >= OPTION_FLAG_B255.length) x = 0; // 防御: 正常流程必然命中
      // $80C0-$80CE: ed < 0x0F 时 ram_00EB++ 且 X = (X + ram_00EB) & 0x3F
      if (ed < 0x0F) {
        eb = (eb + 1) & 0xFF;
        x = (x + eb) & 0x3F;
      }
      // $80CF: char = PLAYER_DATA_BC6E[X]; $80D6-$80DD: Y = OPTION_SCREEN_Y[ed]+$80, X=$22
      const ch = PLAYER_DATA_BC6E[x % PLAYER_DATA_BC6E.length];
      this._charDisplay(ch, (OPTION_SCREEN_Y[ed] + 0x80) & 0xFF, 0x22);
      // $80E4-$80EA: ram_0099 bit7 置位时 EOR #$41 (破折号切换)
      if (s.read('ram_0099') & 0x80) {
        s.write('ram_0099', s.read('ram_0099') ^ 0x41);
      }
    }

    // ── ⑥ $A0F4-$A10C: 帧等待 + PPU 块填充 ──
    // $9FA8(1) bank 切换 (H5 no-op); 等待 ram_001E bit7 (帧同步, H5 由帧循环保证)
    this._bankSwitch(1);
    // $98E8: Y=4 行, X=$0B 列, 起始地址 $228A, 填充 0x00
    this._ppuBlockFill(4, 0x0B, 0x228A, 0x00);

    // H5 适配: 将解码结果提供给模型层
    void this._decodePlayerStats(teamId, playerIdx);
  }

  /**
   * 入口1 (A=1): 选项屏幕初始化
   * 对应 asm $A10D-$A1A5 (~200 bytes)
   */
  entry1_OptionScreenInit(): void {
    const s = this._store;
    this._optionScreen.active = true;
    this._optionScreen.cursorPos = 0;
    this._optionScreen.menuIndex = 0;

    s.write(KEY_ED, 0);
    s.write(KEY_EC, 0);
    s.write(KEY_4C, 0x8A);
    s.write('ram_0700', 0x33);

    // 清零 $0566-$0665
    for (let i = 0x0566; i <= 0x0665; i++) {
      s.write(`ram_${i.toString(16)}`, 0);
    }
  }

  /**
   * 入口2 (A=2): PPU 图形数据显示
   * 对应 asm $A4EB-$A64B
   */
  entry2_PpuGraphics(): void {
    // 从 ROM 图形数据表写入 PPU/NameTable
    // TODO: 翻译 $A4EB
  }

  /**
   * 入口3 (A=3): 屏幕内容绘制 (Nametable tile)
   * 对应 asm $A64C-$A6D1
   */
  entry3_ScreenDraw(): void {
    // 绘制 Nametable 背景 tile
    // TODO: 翻译 $A64C
  }

  /**
   * 入口4 (A=4): PPU 属性块写入
   * 对应 asm $A6D2-$AF78
   */
  entry4_AttrBlock(): void {
    // 写入 attribute table (每个 16×16 区域 2-bit palette select)
    // TODO: 翻译 $A6D2
  }

  /**
   * 入口5 (A=5): 字符数据解码/显示
   * 对应 asm $AFC2-$AF78
   */
  entry5_CharDecode(): void {
    // 从 ROM 字符表解码绘制到屏幕
    // TODO: 翻译 $AFC2
  }

  /**
   * 入口6 (A=6): VRAM 缓冲区写入 1
   * 对应 asm $AF79-$AF89:
   *   E6/E7 = TEAM_GFX_BASE[scene*2] (16bit) → $AF9E
   *   $AF9E: 对 ram_0454[0..0x16] 每项 16bit 累加 E6/E7
   */
  entry6_VramBuf1(): void {
    const s = this._store;
    const scene = s.read('ram_0026');
    const base = this._read16t(TEAM_GFX_BASE, scene * 2);
    this._add16ToQuery(base);
  }

  /**
   * 入口7 (A=7): VRAM 缓冲区写入 2
   * 对应 asm $AF8A-$AF9D:
   *   E6/E7 = TEAM_GFX_BASE[scene*2] >> 2 (16bit 右移 2 位) → $AF9E
   */
  entry7_VramBuf2(): void {
    const s = this._store;
    const scene = s.read('ram_0026');
    const base = this._read16t(TEAM_GFX_BASE, scene * 2) >> 2;
    this._add16ToQuery(base);
  }

  /** $AF9E: 对 ram_0454[0..0x16] 每项 16bit 累加 base (溢出饱和 FF FF) */
  private _add16ToQuery(base: number): void {
    const s = this._store;
    const bLo = base & 0xFF;
    const bHi = (base >> 8) & 0xFF;
    for (let x = 0; x < 0x16; x += 2) {
      const lo0 = this._r8(0x0454 + x);
      const hi0 = this._r8(0x0455 + x);
      const sumLo = lo0 + bLo;
      const sumHi = hi0 + bHi + (sumLo >> 8);
      const lo = (sumHi >> 8) !== 0 ? 0xFF : (sumLo & 0xFF); // BCC → 饱和
      const hi = (sumHi >> 8) !== 0 ? 0xFF : (sumHi & 0xFF);
      s.write(`ram_${(0x0454 + x).toString(16).toUpperCase()}`, lo);
      s.write(`ram_${(0x0455 + x).toString(16).toUpperCase()}`, hi);
    }
  }

  /** 读内置 16bit 表 (little-endian) */
  private _read16t(t: readonly number[], i: number): number {
    const lo = t[i] ?? 0;
    const hi = t[i + 1] ?? 0;
    return (hi << 8) | lo;
  }

  /**
   * 入口8 (A=8): Bank 切换 + 数据加载
   * 对应 asm $B050-$B0BF:
   *   场景 6/0xC/0x10 → 选 TEAM_BLOCK_06/0C/10;
   *   先把 ram_0368-0453 复制到 ram_056A (队伍状态备份);
   *   再把阵容表块 10×2 字节拷入 ram_0454 查询表。
   */
  entry8_DataLoad(): void {
    const s = this._store;
    const scene = s.read('ram_0026');
    const block = TEAM_BLOCK_BY_SCENE[scene];
    if (!block) return; // 场景不是 6/0xC/0x10 → $90A0 RTS

    // $9076-$907D: ram_0368,Y → ram_056A,Y (256 字节拷贝)
    for (let y = 0; y < 0x100; y++) {
      s.write(`ram_${(0x056A + y).toString(16).toUpperCase()}`, this._r8(0x0368 + y));
    }

    // $9083-$909E: ram_0454[Y] = ram_0656[block[i]]; 10 次, Y 步进 2
    let y = 0;
    for (let i = 0; i < 10; i++) {
      const xi = block[i] ?? 0;
      s.write(`ram_${(0x0454 + y).toString(16).toUpperCase()}`, this._r8(0x0656 + xi));
      s.write(`ram_${(0x0455 + y).toString(16).toUpperCase()}`, this._r8(0x0657 + xi));
      y += 2;
    }
  }

  /**
   * 入口9 (A=9): 球队数据初始化
   * 对应 asm $A39B-$A3CF:
   *   第 1 轮: EA=0, 11 次 $A3B4;
   *   场景 >= 0x10 时第 2 轮: EA=0x16, 10 次 $A3B4。
   *   $A3B4: ptr = $CD89[(ram_05FB^0x0B)*2]; ram[ptr+3] = LOOKUP_16BIT 最大 ≤ ram_0454[EA] 的索引。
   */
  entry9_TeamDataInit(): void {
    const s = this._store;
    const scene = s.read('ram_0026');
    this._teamDataInitLoop(0, 0x0B);
    if (scene >= 0x10) this._teamDataInitLoop(0x16, 0x0A);
  }

  /** $A3B4: EA 起始索引 + EB 次数 */
  private _teamDataInitLoop(start: number, count: number): void {
    const s = this._store;
    let ea = start;
    let eb = count;
    while (eb > 0) {
      const ptr = this._teamDataPtr();
      const query = this._query16(ea);
      const idx = this._lookupIndex16(query);
      s.write(`ram_${(ptr + 3).toString(16).toUpperCase()}`, idx);
      ea = (ea + 1) & 0xFF;
      eb--;
    }
  }

  /** Bank30 $C50C → $CD7C: 返回球队能力块 RAM 基址 (ram_0034/35) */
  private _teamDataPtr(): number {
    const x = (this._store.read('ram_05FB') ^ 0x0B) & 0xFF;
    return this._read16t(TEAM_STAT_PTR_CD89, (x * 2) & 0xFE);
  }

  // ── 内部: 跳转分发 ──

  private _dispatchEntry(entryIndex: number): void {
    switch (entryIndex) {
      case 0: this.entry0_PlayerData(); break;
      case 1: this.entry1_OptionScreenInit(); break;
      case 2: this.entry2_PpuGraphics(); break;
      case 3: this.entry3_ScreenDraw(); break;
      case 4: this.entry4_AttrBlock(); break;
      case 5: this.entry5_CharDecode(); break;
      case 6: this.entry6_VramBuf1(); break;
      case 7: this.entry7_VramBuf2(); break;
      case 8: this.entry8_DataLoad(); break;
      case 9: this.entry9_TeamDataInit(); break;
    }
  }

  // ── 内部: 选项屏幕状态机 ──

  private _optionScreenUpdate(): void {
    const s = this._store;
    const btn = s.read(KEY_1C);

    // bit0-3 检测 (A/B/SELECT/START)
    if (btn & 0x01) {  // A → 确认
      this._optionConfirm();
    }
    if (btn & 0x04) {  // SELECT → 上移
      this._optionCursorUp();
    }
    if (btn & 0x08) {  // START → 下移
      this._optionCursorDown();
    }
  }

  private _optionConfirm(): void {
    const ed = this._store.read(KEY_ED);
    // $B255 表: 每个选项对应一个action (非$FF=选择数据, $FF=状态切换)
    // TODO: 读取 $B255 表判断选项类型
    this._store.write('ram_0701', 0x12);
  }

  private _optionCursorUp(): void {
    let ed = this._store.read(KEY_ED);
    ed = ed > 0 ? ed - 1 : 17;
    this._store.write(KEY_ED, ed);
    this._optionScreen.cursorPos = ed;
  }

  private _optionCursorDown(): void {
    let ed = this._store.read(KEY_ED);
    ed = (ed + 1) % 18;
    this._store.write(KEY_ED, ed);
    this._optionScreen.cursorPos = ed;
  }

  // ── 内部: 球员数据解码 ──

  /**
   * 从 ram_0656 解码缓冲中读取 10 项能力编码，提供给 H5 模型层。
   * 原始数据经 entry0 的 $A03B-$A08B 循环解码后存放于 ram_0656-065F。
   *
   * 编码格式 (每字节): [3:0] = LOOKUP_16BIT 表项索引 << 2 | [1:0] 细分值
   *
   * @param teamId 队伍ID (ram_0448)
   * @param playerIdx 队内球员索引 (ram_044D)
   */
  private _decodePlayerStats(teamId: number, playerIdx: number): number[] {
    const raw: number[] = [];
    for (let i = 0; i < 10; i++) raw.push(this._r8(0x0656 + i));
    // H5 适配: 暂存查询参数供模型层注册 (字段语义映射见 _extractStatField / $A438)
    this._store.write('ram_0672', teamId & 0xFF);
    this._store.write('ram_0673', playerIdx & 0xFF);
    return raw;
  }

  // ── 内部: 内存读写辅助 (KV 键: ram_XXXX 大写 16 进制) ──

  /** 读 ram_XXXX (大写十六进制键名) */
  private _r8(addr: number): number {
    return this._store.read(`ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`);
  }

  /** 对应 bank01 $B016: 读取 ram_0454 查询表 16-bit 值 (A=索引, 取低 4 位) */
  private _query16(index: number): number {
    const base = 0x0454 + (index & 0x0F) * 2;
    return this._r8(base) | (this._r8(base + 1) << 8);
  }

  /** 对应 bank01 $B045: LOOKUP_16BIT[index] 16-bit 查表 (Y/X 返回值合并) */
  private _lookupValue16(index: number): number {
    const i = Math.max(0, Math.min(63, index | 0)) * 2;
    return (LOOKUP_16BIT[i] ?? 0) | ((LOOKUP_16BIT[i + 1] ?? 0) << 8);
  }

  /** 对应 bank01 $B02E: 扫描 LOOKUP_16BIT 返回最大 ≤ value 的表项索引 */
  private _lookupIndex16(value: number): number {
    for (let i = 63; i >= 0; i--) {
      if (value >= this._lookupValue16(i)) return i;
    }
    return 0;
  }

  /**
   * 对应 bank01 $A438: 状态字段提取。
   * X = 屏幕行索引 (0-17); Y = POS_TABLE_AD8A[X] (能力槽); 选择器 = X & 3:
   *   0: lo >> 2
   *   1: ((lo & 0x03) << 4) | (hi >> 4)   ($845E: 16-bit 移位组合)
   *   2: ((lo & 0x0F) << 2) | ((hi >> 6) & 0x03)  ($844E)
   *   3: lo & 0x3F
   */
  private _extractStatField(x: number): number {
    const y = POS_TABLE_AD8A[x % POS_TABLE_AD8A.length] ?? 0;
    const lo = this._r8(0x0656 + y);
    const hi = this._r8(0x0657 + y);
    switch (x & 3) {
      case 0: return (lo >> 2) & 0xFF;
      case 1: return (((lo & 0x03) << 4) | (hi >> 4)) & 0xFF;
      case 2: return (((lo & 0x0F) << 2) | ((hi >> 6) & 0x03)) & 0xFF;
      default: return lo & 0x3F;
    }
  }

  // ── 内部: PPU Buffer 记录 (对应 bank00 $9B28/$9B5E/$88CA/$98E8) ──
  // 记录格式: [control, PPU addr lo, PPU addr hi] + 数据 + 0x00 终止

  /** 对应 bank00 $9B28: 分配 PPU Buffer 记录头, 返回数据区写偏移 */
  private _ppuBufAlloc(control: number, addrLo: number, addrHi: number): number {
    const s = this._store;
    const ptr = s.read('ppuBufPtr');
    if (ptr + (control & 0x3F) + 3 > 64) return ptr; // 空间不足 (H5 简化处理)
    s.write(`ppuBuf_${ptr}`, control & 0xFF);
    s.write(`ppuBuf_${ptr + 1}`, addrLo & 0xFF);
    s.write(`ppuBuf_${ptr + 2}`, addrHi & 0xFF);
    return ptr + 3;
  }

  /** 对应 bank00 $9B5E: PPU Buffer 记录 0x00 终止 + 指针推进 */
  private _ppuBufEnd(x: number): void {
    this._store.write(`ppuBuf_${x}`, 0);
    this._store.write('ppuBufPtr', x);
  }

  /**
   * 对应 bank00 $88CA: 字符显示 (A=char, Y=PPU addr lo, X=PPU addr hi)。
   * char < $A0: 单 tile [0x00, char];  char >= $A0: 双 tile [hiTile($94/$95), loTile($8A14)]
   */
  private _charDisplay(ch: number, addrLo: number, addrHi: number): void {
    let x = this._ppuBufAlloc(0x82, addrLo, addrHi);
    if (ch < 0xA0) {
      this._store.write(`ppuBuf_${x}`, 0);
      this._store.write(`ppuBuf_${x + 1}`, ch & 0xFF);
      x += 2;
    } else {
      const hi = ch >= 0xC8 ? 0x95 : 0x94;
      const lo = CHAR_MAP_DOUBLE[ch]?.loTile ?? 0;
      this._store.write(`ppuBuf_${x}`, hi);
      this._store.write(`ppuBuf_${x + 1}`, lo);
      x += 2;
    }
    this._ppuBufEnd(x);
  }

  /**
   * 对应 bank00 $98E8: PPU 块填充。
   * Y=行数, X=每行字节数, ram_00E6/00E7=起始 PPU 地址, 填充值 0; 行间地址 +$20。
   */
  private _ppuBlockFill(rows: number, bytesPerRow: number, startAddr: number, fill: number): void {
    let addr = startAddr & 0xFFFF;
    for (let r = 0; r < rows; r++) {
      const x = this._ppuBufAlloc(bytesPerRow, addr & 0xFF, (addr >> 8) & 0xFF);
      for (let b = 0; b < bytesPerRow; b++) {
        this._store.write(`ppuBuf_${x + b}`, fill & 0xFF);
      }
      this._ppuBufEnd(x + bytesPerRow);
      addr = (addr + 0x20) & 0xFFFF;
    }
  }

  /** 对应 bank00 $9FA8: bank 切换 (H5: 数据已内嵌, no-op) */
  private _bankSwitch(_param: number): void {
    // no-op
  }

  // ── 公开: 数据注册接口 ──

  registerPlayer(p: Player): void {
    this._players.set(p.id, p);
  }

  getPlayer(id: number): Player | undefined {
    return this._players.get(id);
  }

  getPlayersByPosition(pos: PlayerPosition): Player[] {
    return [...this._players.values()].filter(p => p.position === pos);
  }

  getPlayersByTeam(teamId: number): Player[] {
    return [...this._players.values()].filter(p => p.teamId === teamId);
  }

  get allPlayers(): Player[] {
    return [...this._players.values()];
  }

  registerTeam(t: Team): void {
    this._teams.set(t.id, t);
  }

  getTeam(id: number): Team | undefined {
    return this._teams.get(id);
  }

  getTeamPlayers(teamId: number): Player[] {
    return this.getPlayersByTeam(teamId);
  }

  get allTeams(): Team[] {
    return [...this._teams.values()];
  }

  findTeamByPlayer(playerId: number): Team | undefined {
    const player = this._players.get(playerId);
    if (!player) return undefined;
    return this._teams.get(player.teamId);
  }
}

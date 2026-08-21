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
import { RamStore } from '../../../core/ram';
import type { Player, Team, PlayerStats } from '../data/model-types';
import { PlayerPosition, FormationType } from '../data/model-types';
import { MeetingMenu, TeamDataMenu, ChangeMenu, LevelMenu } from '../data/scene/index';
import {
  CHR_COPY_A,
  CHR_COPY_B,
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
  SCENE_TEAM_BITS,
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

/** 真实 RAM 键 (4 位大写补零, 与全库 ram_XXXX 约定一致, 防断链) */
function ramKey(addr: number): string {
  return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
}

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

/** チームデータ子菜单完整显示状态 (View 层消费) */
export interface TeamDataDisplayState {
  /** 菜单层级 (0=主, 1=チームデータ子, 2=二级, 3=三级选选手) */
  menuLevel: number;
  /** チームデータ子菜单光标 (TeamDataMenu: 0-4) */
  subCursor: number;
  /** 子菜单确认项 (null=未确认, TeamDataMenu值=已确认) */
  subConfirmed: number | null;
  /** 二级光标 (阵型4/防守3/换人3/等级4) */
  level2Cursor: number;
  /** 二级选项数 */
  level2Max: number;
  /** 三级光标 (选手列表) */
  level3Cursor: number;
  /** 三级选项数 */
  level3Max: number;
  /** 当前阵型 */
  formation: FormationType;
  /** 当前防守类型 */
  defense: number;
  /** 换人: 换下选手 (-1=未选) */
  swapOutIdx: number;
  /** 换人: 换上选手 (-1=未选) */
  swapInIdx: number;
  /** 等级查看: 当前选中选手 */
  selectedPlayerIdx: number;
  /** 等级查看: 详情模式 (0=能力, 1=必杀技) */
  levelDetailMode: number;
}

export class DataQueryService {
  /** 球员表 (id → Player) */
  private _players: Map<number, Player> = new Map();

  /** 队伍表 (id → Team) */
  private _teams: Map<number, Team> = new Map();

  /** 选项屏幕状态 (对应 MeetingMenu 状态机) */
  private _optionScreen = {
    active: false,
    cursorPos: 0,       // MeetingMenu 光标 (0-3: 情報/スコアメモ/チームデータ/キックオフ)
    menuIndex: 0,       // 当前菜单层级 (0=主菜单, 1=チームデータ子菜单, 2=二级操作, 3=三级操作)
    subCursor: 0,       // 子菜单光标 (TeamDataMenu: 0-4)
    confirmed: null as null | number,  // 确认的菜单项 (null=未确认, MeetingMenu值=已确认)
    subConfirmed: null as null | number, // 子菜单确认项
    // 二级操作状态 (阵型/防守选择, 换人/等级的子菜单)
    level2Cursor: 0,    // 二级光标 (阵型4项/防守3项/换人子菜单3项/等级子菜单4项)
    level2Max: 0,       // 二级选项数 (阵型=4, 防守=3, 换人=3, 等级=4)
    formation: FormationType.FORM_433,   // 当前阵型 (写 ram_0448 区)
    defense: 0,         // 当前防守类型 (0=normal, 1=press, 2=counter)
    // 三级操作状态 (换人选手选择/等级查看详情)
    level3Cursor: 0,    // 三级光标 (选手列表 0-10)
    level3Max: 0,       // 三级选项数 (选手数 11)
    selectedPlayerIdx: 0, // 换人/等级查看选中的选手索引 (0-10, 对应场上11人)
    swapOutIdx: -1,     // 换人: 已选换下选手 (-1=未选)
    swapInIdx: -1,      // 换人: 已选换上选手 (-1=未选)
    levelDetailMode: 0, // 等级查看详情模式 (0=能力, 1=必杀技)
  };

  constructor(private _store: RamStore) {}

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
      s.write(ramKey(0x0656 + i), ((e7 << 2) | q) & 0xFF);
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
    // 等待 ram_001E bit7 (帧同步, H5 由帧循环保证)
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
      s.write(ramKey(i), 0);
    }
  }

  /**
   * 入口2 (A=2): PPU 图形数据显示
   * 对应 asm $A4EB-$A64B (PRG offset $84EB-$864B, 跨 code_main.s 尾部 + code_sub.s 头部)。
   *
   * 流程:
   *   1. $84EB-$8500: 设置两个背景色块 (X=$6A/Y=$6B, X=$7A/Y=$7B), 调用 $9B6F/$9B74/$9B7F 填充 PPU 缓冲,
   *      再经 $B0C0 加载数据脚本 SCRIPT_ENTRY1。
   *   2. $8503-$8525: 清 ram_0044/45, 把 COPY_B271 表复制到 ram_039C (256B), 由场景号经
   *      SCENE_TEAM_BITS(BCD1) 高位 >>3 查 GFX_PTR_BCF3 → $9D27 复制图形。
   *   3. $8529-$8541: 场景号低位 <<1 查 GFX_PTR_BD64, 复制数据到 $22E8 地址 ($9D50, 7×$22)。
   *   4. $8544-$8559: 经 $A63C 显示阶段号 ($21D0) 与半场比分 ($2250)。
   *   5. $855C-$857B: 设置字幕精灵状态, 帧等待循环。
   *   6. $857D-$859A: 重置光标, 循环调用 $A611 写入球队数据 (0B/0A 次)。
   *   7. $859D-$85C2: 依场景判断后调 SCENE_STAT_B3F9 补绘。
   */
  entry2_PpuGraphics(): void {
    const s = this._store;

    // ── ① $84EB-$8500: 背景色块 + 数据脚本 ──
    // JSR $9B6F/$9B74/$9B7F: 清屏/块填充 (H5 简化: 经 _ppuBlockFill 写入缓冲)
    this._ppuBlockFill(1, 0x0B, 0x20C4, 0x00);
    this._ppuBlockFill(1, 0x0B, 0x2124, 0x00);
    // $8500: LDY #$05; LDX #$B3 → $B0C0 加载 SCRIPT_ENTRY1 (View 层经 ScriptVM 消费)
    // $8503/$8505: STA $0044; STA $0045 (零页, 场景/阶段号清空)
    s.write('ram_0044', 0);
    s.write('ram_0045', 0);

    // $850B: LDA $B271,Y → STA $039C,Y (256B 复制 COPY_B271 → ram_039C)
    for (let y = 0; y < 0x100; y++) {
      s.write(ramKey(0x039C + y), COPY_B271[y % COPY_B271.length] ?? 0);
    }

    // $8514-$8526: 场景号 → SCENE_TEAM_BITS 高位 → GFX_PTR_BCF3 → 复制图形
    const scene = s.read('ram_0026');
    const teamBits = SCENE_TEAM_BITS[scene] ?? 0;
    const gfxIdx = ((teamBits >> 4) & 0x0F) * 2;
    // JSR $9D27: 复制 GFX_PTR_BCF3[gfxIdx] 指向的图形数据 (H5: 记录指针供 View 渲染)
    s.write('ram_0030', GFX_PTR_BCF3[gfxIdx] ?? 0);
    s.write('ram_0031', GFX_PTR_BCF3[gfxIdx + 1] ?? 0);

    // $8529-$8541: 场景低位 <<1 → GFX_PTR_BD64 → 复制到 $22E8 (7×$22)
    const dataIdx = ((teamBits & 0x0F) << 1) & 0xFE;
    s.write('ram_00E8', 7);
    s.write('ram_00E9', 0x22);
    s.write('ram_0030', GFX_PTR_BD64[dataIdx] ?? 0);
    s.write('ram_0031', GFX_PTR_BD64[dataIdx + 1] ?? 0);
    this._ppuBlockFill(7, 0x22, 0x22E8, 0x00);

    // $8544-$8559: 经 $A63C 显示阶段号 ($21D0) 与半场比分 ($2250)
    const stage = s.read('ram_002A');
    this._writeDecNumber(stage, 0x21D0);      // $854A: JSR $A63C(阶段号, PPU $21D0)
    // $854D-$8559: 半场比分 = ram_002B - (ram_002B > $24 ? 1 : 0)
    //   LDA #$24; CMP $002B → carry=(#$24 < $002B); LDA $002B; SBC #$00
    const b2b = s.read('ram_002B');
    const half = (b2b - (b2b > 0x24 ? 1 : 0)) & 0xFF;
    this._writeDecNumber(half, 0x2250);       // $8559: JSR $A63C(半场比分, PPU $2250)

    // $855C-$8566: 字幕精灵初始状态
    s.write('ram_007B', 0);
    s.write('ram_008E', 0);
    s.write('ram_008F', 0x2E);

    // $8568-$857B: 帧等待循环 (LDA #$04; LDX #$37; JSR $997A; 轮询 $001E)
    // H5: 由帧循环保证, no-op

    // $857D-$859A: 重置光标, $A611 循环写入球队数据
    s.write('ram_00ED', 0);
    s.write('ram_00EC', 0);
    this._writeTeamStats(0, 0x0B);
    if (scene >= 0x10) this._writeTeamStats(0x16, 0x0A);

    // $859D-$85C2: 依场景判断, 调 SCENE_STAT_B3F9 补绘。
    // 流程: E4 >= scene → 直接检查 (BCS $85B1); 否则先跳过 scene==06/0C/10 检查。
    // 最终汇聚条件: scene 非 06/0C/10 且 ram_00EC != 0 → 提取+汇总显示 + 重置光标。
    if (scene !== 0x06 && scene !== 0x0C && scene !== 0x10 && s.read('ram_00EC') !== 0) {
      // $85B5-$85C2: LDX scene; LDA $B3F9,X; JSR $8464; JSR $82A9; STA $00ED(#0)
      this._drawStatFromScene(scene);
      s.write('ram_00ED', 0);
    }
  }

  /**
   * 入口3 (A=3): 屏幕内容绘制 (Nametable tile)
   * 对应 asm $A64C-$A6D1 (PRG offset $864C-$86D1)。
   *
   * 分发器: 依 SCENE_STAT_B393[scene] 经 $8464 提取状态 → $9C3A 载 $ADD0 指针表 → $9C28
   * 经 $8673 指针表跳转 ($A67B 主绘制 / $A69F 次级 / $A6BE / $A6C4)。各分支均以
   * $82A9 汇总、$A01E 解码、$99F0 块填充实现屏幕绘制。
   */
  entry3_ScreenDraw(): void {
    const s = this._store;
    const scene = s.read('ram_0026');

    // $864C-$8657: JSR $98A0 + $9B7F (清 PPU 缓冲); LDX scene; LDA $B393[scene]
    const st = SCENE_STAT_B393[scene] ?? 0;
    // $8657 $8464 + $865A $82A9: 用 X=scene 提取状态字段并汇总显示
    //   ($8464 的提取完全由 X 决定: selector = scene&3, POS_TABLE 索引 = scene)
    this._drawStatFromScene(scene);

    // $865D-$8666: LDA #$01; JSR $8920; $9C3A 载 $ADD0 指针表 (screen 子程序表)
    // $8670: JMP $9C28 → 经 $A673 指针表跳转 (选择器 = $9BE8 返回值 & 3)
    //   $A67B: 主 Nametable 绘制 (SCENE_SUB_TBL[scene] → $8464 → $82A9 → 循环)
    //   $A69F: $A01E 解码 + $8464($4E) → 块填充 (SCENE_STAT_B3D7[scene])
    //   $A6BE: JSR $A721 → 返回 $A64C
    //   $A6C4: SCENE_STAT_B41B[scene] → 跳 $A715
    this._drawScreenBranch(scene, st);
  }

  /**
   * 入口4 (A=4): PPU 属性块写入
   * 对应 asm $A6D2-$AF78 (PRG offset $86D2-$8778)。
   *
   * 依 SCENE_STAT_B3B5[scene] 选属性块, 经 $82A9 汇总后写入 attribute table
   * ($23D6 起), 并用 $97AB/$B0C0 载入脚本 SCRIPT_ENTRY4A/B 渲染。
   */
  entry4_AttrBlock(): void {
    const s = this._store;
    const scene = s.read('ram_0026');

    s.write('ram_0700', 0x55);   // $86D4: STA $0700 (#$55)
    // $86D7/$86DA: JSR $98A0 + $9B7F (清 PPU 缓冲)

    // $86DD-$86E2: LDX scene; LDA $B3B5[scene]; $8464 提取
    let st = SCENE_STAT_B3B5[scene] ?? 0;
    // $86E5: JMP $A6F9
    // $86F4: 部分场景 CLC; ADC #$01 (偏移 1)
    st = ((st + 1) & 0xFF);
    // $86F6: $8464 提取 → $82A9 汇总

    // $86FC-$8703: $9C3A 载 $ADD6 指针表 + JSR $9BE8 (bank0 公共原语, 返回值 A)
    // $8706: CMP #$02; BEQ $8710 → A==2 时 ram_0700 = 0x31 分支
    //   (注: $9BE8 为 bank0 公共渲染原语, 返回值经 bank00_core.service.ts 连通后精确化;
    //    此处以 st 近似 A, B3B5 值均为 0x47/0x49/0x4B, 故通常走补绘分支)
    if (st === 2) {
      s.write('ram_0700', 0x31);
    } else {
      // $870A: JSR $A721 → JMP $A6E8 循环补绘 (屏幕补绘子程, H5 单次通过)
      this._screenPatchA721();
    }

    // $8719-$8720: $97AB 载入 PPU_BUF_A 数据 (View 层消费)
    this._renderScriptEntry4(scene);

    // 属性块写入: 每 16×16 区域 2-bit palette select
    this._ppuBlockFill(4, 0x08, 0x23C0, 0x00);
  }

  /**
   * 入口5 (A=5): 字符数据解码/显示 (花名册指针位置计算)
   * 对应 asm $AFC2-$9012 (PRG offset $8FC2-$9012)。
   *
   * 流程:
   *   1. $8FC4: JSR $B023 (SEARCH 搜索, 依场景 ram_002A 选段)
   *   2. $8FC7-$8FD0: (result>>1) + X → 查 ROSTER_PTR → roster 索引
   *   3. $8FD4-$8FE5: scene<<1 查 TEAM_GFX_BASE, 16-bit >> 2
   *   4. $8FF1-$9012: result & 0x0F <<1 → 对 ram_0454 16-bit 累加 (饱和 FF)
   */
  entry5_CharDecode(): void {
    const s = this._store;
    const x = s.read('ram_call_x');
    const scene = s.read('ram_0026');
    const stage = s.read('ram_002A');

    // $8FC4: JSR $B023 → SEARCH_IDX[stage] + SEARCH_TABLE 查表
    const searchIdx = (SEARCH_IDX[stage] ?? 0);
    const result = SEARCH_TABLE[searchIdx] ?? 0;
    s.write('ram_00EB', result & 0xFF);

    // $8FC9-$8FD0: (result & 0xF0)>>1 + X → ROSTER_PTR 索引
    const ptrIdx = (((result & 0xF0) >> 1) + x) & 0xFF;
    const roster = ROSTER_PTR[ptrIdx % ROSTER_PTR.length] ?? 0;

    // $8FD4-$8FE5: scene<<1 → TEAM_GFX_BASE 16-bit >> 2 (ROR/LSR 组合, 结果在 A:ED)
    const base = this._read16t(TEAM_GFX_BASE, (scene << 1) & 0xFE) >> 2;
    // $8FE6: JSR $9DEE (bank0 公共渲染原语, A/ED 16bit 规范化 → 经 bank00_core 连通)
    // $8FE9-$8FEF: ASL $00EC; ROL $00ED ×2 → (base>>2)<<2 恢复近似原值, H5 简化合并入 base

    // $8FF1-$9012: (result & 0x0F)<<1 → 对 ram_0454 16-bit 累加 base (溢出饱和 FF FF)
    const idx = (result & 0x0F) << 1;
    const lo0 = this._r8(0x0454 + idx);
    const hi0 = this._r8(0x0455 + idx);
    const sumLo = lo0 + base;
    const sumHi = hi0 + (sumLo >> 8);
    const carry = sumHi >> 8;
    const lo = carry !== 0 ? 0xFF : (sumLo & 0xFF);
    const hi = carry !== 0 ? 0xFF : (sumHi & 0xFF);
    s.write(ramKey(0x0454 + idx), lo);
    s.write(ramKey(0x0455 + idx), hi);

    // roster 索引用作 View 层花名册渲染定位
    void roster;
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
      s.write(ramKey(0x0454 + x), lo);
      s.write(ramKey(0x0455 + x), hi);
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
      s.write(ramKey(0x056A + y), this._r8(0x0368 + y));
    }

    // $9083-$909E: ram_0454[Y] = ram_0656[block[i]]; 10 次, Y 步进 2
    let y = 0;
    for (let i = 0; i < 10; i++) {
      const xi = block[i] ?? 0;
      s.write(ramKey(0x0454 + y), this._r8(0x0656 + xi));
      s.write(ramKey(0x0455 + y), this._r8(0x0657 + xi));
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
      s.write(ramKey(ptr + 3), idx);
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

  // ── 内部: 选项屏幕状态机 (MeetingMenu 真实菜单) ──

  /**
   * MeetingMenu 状态机 (说明书: 情報/スコアメモ/チームデータ/キックオフ)
   * 上下移光标, A 确认, B 返回子菜单
   */
  private _optionScreenUpdate(): void {
    const s = this._store;
    const btn = s.read(KEY_1C);

    if (this._optionScreen.menuIndex === 0) {
      // 主菜单 (MeetingMenu 4项) — 按键位对齐 BUTTON 枚举 (UP=0x10, DOWN=0x20, A=1, B=2)
      if (btn & 0x10) this._meetingCursorUp();     // UP (BUTTON.UP = 1<<4)
      if (btn & 0x20) this._meetingCursorDown();   // DOWN (BUTTON.DOWN = 1<<5)
      if (btn & 0x01) this._meetingConfirm();       // A (BUTTON.A = 1<<0)
    } else if (this._optionScreen.menuIndex === 1) {
      // チームデータ子菜单 (TeamDataMenu 5项: 阵型/防守/换人/等级/返回)
      if (btn & 0x10) this._subCursorUp();
      if (btn & 0x20) this._subCursorDown();
      if (btn & 0x01) this._subConfirm();
      if (btn & 0x02) { // B 返回主菜单 (BUTTON.B = 1<<1)
        this._optionScreen.menuIndex = 0;
      }
    } else if (this._optionScreen.menuIndex === 2) {
      // 二级操作 (阵型/防守选择, 换人/等级子菜单)
      this._level2Update();
    } else if (this._optionScreen.menuIndex === 3) {
      // 三级操作 (选选手: 换人换上换下, 等级查看选手)
      this._level3Update();
    }
  }

  /** MeetingMenu 光标上移 (4项循环) */
  private _meetingCursorUp(): void {
    const cur = this._optionScreen.cursorPos;
    this._optionScreen.cursorPos = (cur + 3) % 4; // -1 mod 4
    // 注: 不写 ram_00ED — 光标与 JUMP_TARGETS 分发共用 ram_00ED 会造成
    // 下一帧 dispatch entry1 重置光标 (bug 修复 2026-08)。boot 路由用 getConfirmedMenu()。
  }

  /** MeetingMenu 光标下移 (4项循环) */
  private _meetingCursorDown(): void {
    const cur = this._optionScreen.cursorPos;
    this._optionScreen.cursorPos = (cur + 1) % 4;
    // 注: 不写 ram_00ED — 同上, 避免触发 JUMP_TARGETS 分发重置菜单状态
  }

  /**
   * MeetingMenu A 确认 (说明书):
   *   情報(0) → 显示对手信息 (TODO: 渲染)
   *   スコアメモ(1) → 显示密码 (TODO: 渲染)
   *   チームデータ(2) → 进子菜单 (menuIndex=1)
   *   キックオフ(3) → 开球, 返回 STORY (进比赛)
   */
  private _meetingConfirm(): void {
    const sel = this._optionScreen.cursorPos;
    this._optionScreen.confirmed = sel;
    if (sel === MeetingMenu.TEAM_DATA) {
      // 进チームデータ子菜单
      this._optionScreen.menuIndex = 1;
      this._optionScreen.subCursor = 0;
      this._optionScreen.confirmed = null; // 子菜单未确认
    }
    // 情報/スコアメモ/キックオフ 的具体行为由 _meetingCoroutine 根据 getConfirmedMenu() 判断
  }

  /** TeamDataMenu 光标上移 (5项循环) */
  private _subCursorUp(): void {
    this._optionScreen.subCursor = (this._optionScreen.subCursor + 4) % 5;
  }

  /** TeamDataMenu 光标下移 (5项循环) */
  private _subCursorDown(): void {
    this._optionScreen.subCursor = (this._optionScreen.subCursor + 1) % 5;
  }

  /**
   * TeamDataMenu A 确认 (说明书):
   *   フォーメーション(0) → 选阵型 (4:3:3/4:4:2/3:5:2/ブラジル) → 进二级选择
   *   ディフェンスタイプ(1) → 选防守 (ノーマル/プレス/カウンター) → 进二级选择
   *   チェンジ(2) → 换人子菜单 (ポジション/メンバー/もどる) → 进二级选择
   *   レベル(3) → 等级子菜单 (せんてい/とくぎ/もどる) → 进二级选择
   *   もどる(4) → 返回主菜单
   */
  private _subConfirm(): void {
    const sel = this._optionScreen.subCursor;
    this._optionScreen.subConfirmed = sel;
    switch (sel) {
      case TeamDataMenu.FORMATION:
        // 进阵型选择二级菜单 (4项循环)
        this._optionScreen.menuIndex = 2;
        this._optionScreen.level2Cursor = this._optionScreen.formation;
        this._optionScreen.level2Max = 4;
        break;
      case TeamDataMenu.DEFENSE_TYPE:
        // 进防守选择二级菜单 (3项循环)
        this._optionScreen.menuIndex = 2;
        this._optionScreen.level2Cursor = this._optionScreen.defense;
        this._optionScreen.level2Max = 3;
        break;
      case TeamDataMenu.CHANGE:
        // 进换人子菜单二级 (ChangeMenu 3项: ポジション/メンバー/もどる)
        this._optionScreen.menuIndex = 2;
        this._optionScreen.level2Cursor = 0;
        this._optionScreen.level2Max = 3;
        this._optionScreen.swapOutIdx = -1;
        this._optionScreen.swapInIdx = -1;
        break;
      case TeamDataMenu.LEVEL:
        // 进等级子菜单二级 (LevelMenu 4项: せんてい/とくぎ/とくぎせつめい/もどる)
        this._optionScreen.menuIndex = 2;
        this._optionScreen.level2Cursor = 0;
        this._optionScreen.level2Max = 4;
        this._optionScreen.selectedPlayerIdx = 0;
        break;
      case TeamDataMenu.BACK:
        // 返回主菜单
        this._optionScreen.menuIndex = 0;
        this._optionScreen.subCursor = 0;
        this._optionScreen.subConfirmed = null;
        break;
    }
  }

  /**
   * 二级操作状态机 (阵型/防守选择, 换人/等级子菜单):
   *   上下移光标, A 确认, B 返回チームデータ子菜单
   */
  private _level2Update(): void {
    const btn = this._store.read(KEY_1C);
    if (btn & 0x10) this._level2CursorUp();     // UP
    if (btn & 0x20) this._level2CursorDown();   // DOWN
    if (btn & 0x01) this._level2Confirm();       // A 确认
    if (btn & 0x02) { // B 返回チームデータ子菜单
      this._optionScreen.menuIndex = 1;
      this._optionScreen.level2Cursor = 0;
    }
  }

  private _level2CursorUp(): void {
    const max = this._optionScreen.level2Max;
    this._optionScreen.level2Cursor = (this._optionScreen.level2Cursor + max - 1) % max;
  }

  private _level2CursorDown(): void {
    const max = this._optionScreen.level2Max;
    this._optionScreen.level2Cursor = (this._optionScreen.level2Cursor + 1) % max;
  }

  /**
   * 二级 A 确认: 按 subConfirmed 分发
   *   FORMATION  → 写阵型, 返回子菜单
   *   DEFENSE    → 写防守, 返回子菜单
   *   CHANGE     → 按 ChangeMenu[level2Cursor] 分: ポジション/メンバー→进三级选选手, もどる→回子菜单
   *   LEVEL      → 按 LevelMenu[level2Cursor] 分: せんてい/とくぎ→进三级选选手, もどる→回子菜单
   */
  private _level2Confirm(): void {
    const sel = this._optionScreen.subConfirmed;
    const cur = this._optionScreen.level2Cursor;
    if (sel === TeamDataMenu.FORMATION) {
      this._optionScreen.formation = cur;
      this._store.write('ram_0048', cur);
      this._returnToSubMenu();
    } else if (sel === TeamDataMenu.DEFENSE_TYPE) {
      this._optionScreen.defense = cur;
      this._store.write('ram_0049', cur);
      this._returnToSubMenu();
    } else if (sel === TeamDataMenu.CHANGE) {
      // ChangeMenu: 0=ポジション, 1=メンバー, 2=もどる
      if (cur === ChangeMenu.BACK) {
        this._returnToSubMenu();
      } else {
        // ポジション/メンバー → 进三级选选手 (场上 11 人)
        this._optionScreen.menuIndex = 3;
        this._optionScreen.level3Cursor = 0;
        this._optionScreen.level3Max = 11;
        this._optionScreen.swapOutIdx = -1;
        this._optionScreen.swapInIdx = -1;
      }
    } else if (sel === TeamDataMenu.LEVEL) {
      // LevelMenu: 0=せんてい(选选手), 1=とくぎ(看必杀技), 2=とくぎせつめい, 3=もどる
      if (cur === LevelMenu.BACK) {
        this._returnToSubMenu();
      } else {
        // 选选手 → 进三级选选手 (场上 11 人)
        this._optionScreen.menuIndex = 3;
        this._optionScreen.level3Cursor = 0;
        this._optionScreen.level3Max = 11;
        this._optionScreen.levelDetailMode = cur === LevelMenu.SPECIAL_DETAIL ? 1 : 0;
      }
    }
  }

  /** 返回チームデータ子菜单 (二级→一级) */
  private _returnToSubMenu(): void {
    this._optionScreen.menuIndex = 1;
    this._optionScreen.level2Cursor = 0;
    this._optionScreen.level3Cursor = 0;
    this._optionScreen.swapOutIdx = -1;
    this._optionScreen.swapInIdx = -1;
  }

  /**
   * 三级操作状态机 (选选手):
   *   换人: 先选换下(swapOutIdx), 再选换上(swapInIdx), A 确认交换写 RAM
   *   等级: 选选手查看能力/必杀技, A 确认显示详情
   *   B 返回二级菜单
   */
  private _level3Update(): void {
    const btn = this._store.read(KEY_1C);
    if (btn & 0x10) this._level3CursorUp();
    if (btn & 0x20) this._level3CursorDown();
    if (btn & 0x01) this._level3Confirm();
    if (btn & 0x02) {
      // B 返回二级菜单
      this._optionScreen.menuIndex = 2;
      this._optionScreen.level3Cursor = 0;
      this._optionScreen.swapOutIdx = -1;
      this._optionScreen.swapInIdx = -1;
    }
  }

  private _level3CursorUp(): void {
    const max = this._optionScreen.level3Max;
    this._optionScreen.level3Cursor = (this._optionScreen.level3Cursor + max - 1) % max;
  }

  private _level3CursorDown(): void {
    const max = this._optionScreen.level3Max;
    this._optionScreen.level3Cursor = (this._optionScreen.level3Cursor + 1) % max;
  }

  /**
   * 三级 A 确认: 按 subConfirmed 分发
   *   CHANGE: 第一次选 = 换下(swapOutIdx), 第二次选 = 换上(swapInIdx), 确认交换
   *   LEVEL:  选选手 → 标记 selectedPlayerIdx, 查看详情 (能力/必杀技)
   */
  private _level3Confirm(): void {
    const sel = this._optionScreen.subConfirmed;
    const cur = this._optionScreen.level3Cursor;
    if (sel === TeamDataMenu.CHANGE) {
      // 换人: 两步选择
      if (this._optionScreen.swapOutIdx < 0) {
        // 第一步: 选换下选手
        this._optionScreen.swapOutIdx = cur;
      } else if (this._optionScreen.swapInIdx < 0 && cur !== this._optionScreen.swapOutIdx) {
        // 第二步: 选换上选手 (不能与换下相同)
        this._optionScreen.swapInIdx = cur;
        // 执行交换 (写队伍块 ram_0368-0453 区选手索引, 见 _swapPlayers 说明)
        this._swapPlayers(this._optionScreen.swapOutIdx, this._optionScreen.swapInIdx);
        // 交换完成 → 返回チームデータ子菜单
        this._returnToSubMenu();
      }
    } else if (sel === TeamDataMenu.LEVEL) {
      // 等级查看: 选选手, 显示详情 (能力/必杀技)
      this._optionScreen.selectedPlayerIdx = cur;
      // 详情数据由 entry0_PlayerData ($A01E, 本 bank 已转写) 解码,
      // 写 ram_044D (队内球员索引) + ram_0446 (位置) 触发 18 行能力数据显示
      this._store.write('ram_044D', cur & 0xFF);
      this._store.write('ram_0446', 0); // 默认查看首位置槽能力面板
      // 真实 ROM 行为: 等级查看即调用 entry0_PlayerData 显示选手能力面板 (能力+必杀技)。
      // 此处标记 selectedPlayerIdx, 由 View 层消费 getTeamDataDisplayState() 渲染面板。
      // 留在三级菜单允许继续选其他选手, B 返回二级
    }
  }

  /**
   * 执行换人: 交换场上两个选手的位置/索引。
   *
   * 队伍块布局 (bank01 已逆向确认):
   *   - ram_0368-0453 为队伍数据块 (entry8 $B050 将其整体备份到 ram_056A)。
   *   - 场上 11 人能力区 ram_0300 + idx*0x0C (12B/人), 替补区 ram_0408+ (全库 RAM 对齐约定)。
   *   - 换人 = 交换场上一人与替补的 12B 能力块 (ram_0300+outIdx*0C ↔ ram_0408+subIdx*0C)。
   *
   * 说明: チームデータ 换人菜单为 H5 状态机 (ChangeMenu), 原版 ROM 的换人界面由另一屏幕流处理,
   *       bank01 asm 中无对应单例换人例程, 故无法从 bank01 确认最终写回的确切字节偏移。
   *       此处暂以 ram_0050/0051 记录"换下/换上"索引, 比赛引擎消费时据此在队伍块内做实际交换。
   */
  private _swapPlayers(outIdx: number, inIdx: number): void {
    // 写换人记录: ram_0050=换下索引, ram_0051=换上索引 (待比赛引擎据队伍块做交换)
    this._store.write('ram_0050', outIdx & 0xFF);
    this._store.write('ram_0051', inIdx & 0xFF);
  }

  /** 获取主菜单确认项 (null=未确认, MeetingMenu值=已确认) */
  getConfirmedMenu(): number | null {
    return this._optionScreen.confirmed;
  }

  /** 获取当前主菜单光标 */
  getMeetingCursor(): number {
    return this._optionScreen.cursorPos;
  }

  /** 获取当前子菜单层级 (0=主, 1=チームデータ) */
  getMenuIndex(): number {
    return this._optionScreen.menuIndex;
  }

  /** 获取子菜单光标 */
  getSubCursor(): number {
    return this._optionScreen.subCursor;
  }

  /** 获取二级菜单光标 (阵型/防守选择) */
  getLevel2Cursor(): number {
    return this._optionScreen.level2Cursor;
  }

  /** 获取当前阵型 */
  getFormation(): FormationType {
    return this._optionScreen.formation;
  }

  /** 获取当前防守类型 */
  getDefense(): number {
    return this._optionScreen.defense;
  }

  /** 获取菜单层级 (0=主, 1=チームデータ子, 2=二级选择, 3=三级选选手) */
  getMenuLevel(): number {
    return this._optionScreen.menuIndex;
  }

  /** 获取三级光标 (选选手) */
  getLevel3Cursor(): number {
    return this._optionScreen.level3Cursor;
  }

  /** 获取换人: 换下选手索引 (-1=未选) */
  getSwapOutIdx(): number {
    return this._optionScreen.swapOutIdx;
  }

  /** 获取换人: 换上选手索引 (-1=未选) */
  getSwapInIdx(): number {
    return this._optionScreen.swapInIdx;
  }

  /** 获取等级查看: 当前选中选手索引 */
  getSelectedPlayerIdx(): number {
    return this._optionScreen.selectedPlayerIdx;
  }

  /** 获取等级查看: 详情模式 (0=能力, 1=必杀技) */
  getLevelDetailMode(): number {
    return this._optionScreen.levelDetailMode;
  }

  /** 获取チームデータ子菜单完整显示状态 (View 层消费) */
  getTeamDataDisplayState(): TeamDataDisplayState {
    return {
      menuLevel: this._optionScreen.menuIndex,
      subCursor: this._optionScreen.subCursor,
      subConfirmed: this._optionScreen.subConfirmed,
      level2Cursor: this._optionScreen.level2Cursor,
      level2Max: this._optionScreen.level2Max,
      level3Cursor: this._optionScreen.level3Cursor,
      level3Max: this._optionScreen.level3Max,
      formation: this._optionScreen.formation,
      defense: this._optionScreen.defense,
      swapOutIdx: this._optionScreen.swapOutIdx,
      swapInIdx: this._optionScreen.swapInIdx,
      selectedPlayerIdx: this._optionScreen.selectedPlayerIdx,
      levelDetailMode: this._optionScreen.levelDetailMode,
    };
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

  // ── 内部: entry2/3/4/5 渲染辅助 (对应 asm 子程 $A611/$A63C/$8464/$82A9/$9C3A) ──

  /**
   * 对应 asm $A611 (entry2 用): 连续写球队数据。
   * 以 ram_0454 查询表依 LOOKUP_16BIT 解码后写入队伍能力块。
   * @param start 起始索引 ($00EC)
   * @param count 次数 ($00ED)
   */
  private _writeTeamStats(start: number, count: number): void {
    const s = this._store;
    for (let i = 0; i < count; i++) {
      const idx = (start + i) & 0xFF;
      const query = this._query16(idx);
      const e7 = this._lookupIndex16(query);
      const ptr = this._teamDataPtr();
      s.write(ramKey(ptr + 3), e7);
    }
  }

  /**
   * 对应 asm $A63C (entry2 用): 显示十进制数字。
   * 把数字按 16-bit 查表后经 $8C55 循环除10 (余数+0x33=tile_id) 写 PPU 缓冲。
   * @param value 数值 (0-99)
   * @param ppuAddr 显示起始 PPU 地址 (lo 位由调用方固定)
   */
  private _writeDecNumber(value: number, ppuAddr: number): void {
    const s = this._store;
    const v = value & 0xFF;
    // 十位
    let ten = Math.floor(v / 10);
    let one = v % 10;
    // $8C55 循环除10: 余数 + 0x33 = tile_id
    this._charDisplay((ten + 0x33) & 0xFF, ppuAddr & 0xFF, (ppuAddr >> 8) & 0xFF);
    this._charDisplay((one + 0x33) & 0xFF, (ppuAddr + 1) & 0xFF, (ppuAddr >> 8) & 0xFF);
  }

  /**
   * 对应 asm $8464 (状态字段提取) + $82A9 (汇总显示)。
   * $8464 的提取完全由 X 寄存器决定 (selector=X&3, POS_TABLE 索引=X)，忽略 A 输入值；
   * 各调用点 X 均被 `LDX $0026` 设为 scene，故参数即 scene。
   * 提取场景状态字段并写 PPU 缓冲 ($22xx 区)。
   * @param x X 值 (通常 = scene)
   */
  private _drawStatFromScene(x: number): void {
    const field = this._extractStatField(x);
    // $82A9: 汇总后经 $88CA 显示 (PPU 缓冲 $22xx 区)
    this._charDisplay(field & 0x3F, 0x80, 0x22);
  }

  /**
   * 对应 asm $9C28 指针表分发 (entry3 用): 依场景状态选择绘制分支。
   * 各分支 ($A67B/$A69F/$A6BE/$A6C4) 调用 $8464/$82A9/$A01E/$99F0 完成屏幕绘制。
   */
  private _drawScreenBranch(scene: number, st: number): void {
    // 分发表 $A673 (4 入口) 选择器 = $9BE8 返回值 & 3 (近似 st&3)
    const branch = st & 3;
    if (branch === 0) {
      // $A67B: 主 Nametable 绘制。
      // $867D: LDA $B371,X (SCENE_SUB_TBL[scene]); JSR $8464 (X=scene 提取); JSR $82A9 汇总
      this._drawStatFromScene(scene);
      // $8688-$869C: 等待 + $99F0 块填充 + JMP $A652 (循环), H5 简化 no-op
    } else if (branch === 1) {
      // $A69F: $86A2-$86B8: LDX scene; LDA $B3D7,X; JSR $8464; JSR $82A9;
      //   JSR $A01E (解码); LDA #$4E; JSR $8464; JSR $82A9; JSR $99F0
      this._drawStatFromScene(scene);
      this._ppuBlockFill(4, 0x0B, 0x228A, 0x00);
    } else if (branch === 2) {
      // $A6BE: JSR $A721 补绘 → 回 $A64C
      this._screenPatchA721();
    } else {
      // $A6C4: $86C6-$86CF: LDX scene; LDA $B41B,X; JSR $8464; JSR $82A9; JMP $A715
      this._drawStatFromScene(scene);
    }
  }

  /**
   * 对应 asm $A721 ($8721-$877E) — 屏幕补绘子程 (entry3 $A6BE 分支 / entry4 $870A 调用)。
   *
   * 流程 (H5 适配: waitVBlank/帧等待/PPU 渲染/脚本载入均按 no-op 或记录语义简化):
   *   1. $8721-$8728: waitVBlank + OAM 起点设置 ($9B6F) → no-op
   *   2. $872B-$872F: tableLoad ($8920) + ram_007B=0 → no-op
   *   3. $8732-$8738: ram_008E=0, ram_008F=$2E
   *   4. $873A-$8740: ram_002A(场景)==2 → 跳 $A84E 分支
   *   5. $8743-$875C: 脚本载入 ($B0C0) + PPU 地址 $2088 ($AEAC) → 记录语义
   *   6. $875F-$8768: 精灵区填充 ram_0468[0..FF] = CHR_COPY_A (→ $ACA2 表)
   *   7. $876A-$876E: 帧等待 ($997A) → no-op
   *   8. $8771-$877E: 帧等待变体 + 分发表分发 ($9C28, 表在 $A781)
   */
  private _screenPatchA721(): void {
    const s = this._store;

    // $8721: JSR $9BA0 (waitVBlank, H5 帧同步 no-op)
    // $8724-$8728: LDX #$1F; LDY #$2E; JSR $9B6F (OAM 起点设置 → no-op)
    // $872B-$872D: LDA #$00; STA $007B (字幕精灵状态清零)
    s.write('ram_007B', 0);
    // $872F: JSR $8920 (tableLoad → no-op)

    // $8732-$8738: ram_008E=0, ram_008F=$2E
    s.write('ram_008E', 0);
    s.write('ram_008F', 0x2E);

    // $873A-$8740: LDA $002A; CMP #$02; BNE; JMP $A84E (场景==2 走 $A84E 分支)
    if (s.read('ram_002A') === 2) {
      this._a84e();
      return;
    }

    // $8743-$8747: LDY #$3D; LDX #$B4; JSR $B0C0 (脚本载入 → View 层经 ScriptVM 消费)
    // $874A-$874C: LDA #$00; JSR $ADE9 (no-op)
    // $874F-$8757: LDA #$88; STA $00E6; LDA #$20; STA $00E7; JSR $AEAC (PPU 地址 $2088)
    s.write('ram_00E6', 0x88);
    s.write('ram_00E7', 0x20);
    // $875A-$875C: LDA #$00; JSR $AE01 (no-op)

    // $875F-$8768: LDY #$FC; 循环 ram_0468[0..FF] = CHR_COPY_A[Y] (→ $ACA2 精灵填充表)
    for (let y = 0; y < 0x100; y++) {
      s.write(ramKey(0x0468 + y), CHR_COPY_A[y % CHR_COPY_A.length] ?? 0);
    }

    // $876A-$876E: LDA #$03; LDX #$39; JSR $997A (帧等待/渐显 → no-op)
    // $8771-$877E: 帧等待变体 + 分发表分发 (JSR $9BE3; LDY #$81; LDX #$A7; JMP $9C28)
    this._a771();
  }

  /** $8771 ($A771): 帧等待变体 + 首分发表分发 (表在 $A781) */
  private _a771(): void {
    // $8771-$8777: LDA #$FC; LDX #$38; LDY #$78; JSR $9BE3 (帧等待 → no-op)
    // $877A-$877E: LDY #$81; LDX #$A7; JMP $9C28 → 分发表 $A781
    //   表: $A78B / $A7AC / $A7C5 / $AADD / $AA73 / $EBA0
    this._dispatchA721(0);
  }

  /** 首分发表 ($A781) 分发: 6 目标, 选择器 = ram_0450 & 5 */
  private _dispatchA721(_phase: number): void {
    const sel = this._store.read('ram_0450') & 0x05;
    switch (sel) {
      case 0: this._a78b(); break;
      case 1: this._a7ac(); break;
      case 2: this._a7c5(); break;
      case 3: this._aadd(); break;
      case 4: this._aa73(); break;
      default:
        // $EBA0 — 跨 bank 屏幕渲染 (经 $9C28 bank 切换), H5: 记录语义 no-op
        break;
    }
  }

  /**
   * $A78B ($878D-$87A9): 首分发表分支 1 — 加载精灵数据 + 帧等待 tail。
   * $878D-$8794: LDX #$B6; JSR $97AB; LDX #$90; JSR $AE1E (数据/精灵载入 → 记录语义)
   * $8797-$879C: LDA #$00; JSR $AE3A; LDA #$F8; STA $0560 (ram_0560=$F8)
   * $87A1: JSR $AA77 (精灵表载入)
   * $87A4-$87A9: LDA #$38; STA $0564; JMP $A771 (tail)
   */
  private _a78b(): void {
    const s = this._store;
    s.write('ram_0560', 0xF8);
    this._aa77();
    s.write('ram_0564', 0x38);
    this._a771();
  }

  /**
   * $A7AC ($87AF-$87C2): 首分发表分支 2 — 精灵数据载入 + 帧等待 tail。
   * $87AF-$87B0: LDY #$90; LDX #$B7; JSR $97AB (数据载入 → 记录语义)
   * $87B3-$87B7: LDY #$A2; LDX #$AD; JSR $AE77 (精灵地址设置 → 记录语义)
   * $87BA: JSR $AA77 (精灵表载入)
   * $87BD-$87C2: LDA #$48; STA $0564; JMP $A771 (tail)
   */
  private _a7ac(): void {
    const s = this._store;
    this._aa77();
    s.write('ram_0564', 0x48);
    this._a771();
  }

  /**
   * $A7C5 ($87C5-$8839): 首分发表分支 3 — 场景子屏幕绘制 (输入等待循环 + 二次渲染)。
   * $87C5-$87CC: LDA #$58; STA $0564; LDA #$94; STA $004C
   * $87CF-$87D2: LDY #$A8; LDX #$AD; JSR $9C3A (载 $ADD0 指针表)
   * $87D5-$87E1: 输入等待循环 (JSR $9FA8/$9CC9; BIT $001E; BVS $883C; BPL $87D5)
   *             → H5 单次通过; BVS(溢出标志)=取消跳 $883C
   * $87E3-$87E8: LDA #$01; STA $0562; JSR $9CD3
   * $87EB-$87F2: LDY #$AE; LDX #$AD; LDA $0560; JSR $9C3C
   * $87F5-$8801: 输入等待循环 (同上, 单次通过)
   * $8803-$881B: LDY $0560; LDX #$00; JSR $9D08; ... JSR $AF67 (读取精灵/光标数据 → 记录语义)
   * $881E-$8826: LDA #$88; STA $00E6; LDA #$20; STA $00E7; JSR $AEAC (PPU 地址 $2088)
   * $8829-$8831: LDA #$F8; STA $055C; STA $0560; LDA #$00; STA $0562; JSR $AE01
   * $8839: JMP $A7CE (二次渲染流, 记录语义 — 与 $A84E 共用 $A7CE 段)
   */
  private _a7c5(): void {
    const s = this._store;
    s.write('ram_0564', 0x58);
    s.write('ram_004C', 0x94);
    // $87CF: LDY #$A8; LDX #$AD; JSR $9C3A (载 $ADD0 指针表 → 记录语义)
    // $87D5-$87E1: 输入等待循环 ($9FA8/$9CC9 + $001E bit 轮询) → H5 帧循环保证, 单次通过
    //   若溢出标志 (BVS) 置位 → 取消走 $883C
    if ((s.read('ram_001E') & 0x40) !== 0) {
      this._a883c();
      return;
    }
    s.write('ram_0562', 1);
    // $87EB-$87F2: LDY #$AE; LDX #$AD; LDA $0560; JSR $9C3C (载数据 → 记录语义)
    // $87F5-$8801: 输入等待循环 → 单次通过; BVS → 取消走 $883C
    if ((s.read('ram_001E') & 0x40) !== 0) {
      this._a883c();
      return;
    }
    // $8803-$881B: LDY $0560; LDX #$00; JSR $9D08; ... JSR $AF67 (读精灵/光标 → 记录语义)
    // $881E-$8826: LDA #$88; STA $00E6; LDA #$20; STA $00E7; JSR $AEAC (PPU 地址 $2088)
    s.write('ram_00E6', 0x88);
    s.write('ram_00E7', 0x20);
    // $8829-$8831: LDA #$F8; STA $055C; STA $0560; LDA #$00; STA $0562; JSR $AE01
    s.write('ram_055C', 0xF8);
    s.write('ram_0560', 0xF8);
    s.write('ram_0562', 0);
    // $8839: JMP $A7CE (二次渲染流, 记录语义)
  }

  /** $883C ($A83C): 取消/回退分支 — 清 PPU 控制 + 回 $A771 tail */
  private _a883c(): void {
    const s = this._store;
    // $883C-$8840: LDA #$00; STA $004C; JSR $AE01
    s.write('ram_004C', 0);
    // $8843-$8848: LDA #$F8; STA $055C; STA $0560
    s.write('ram_055C', 0xF8);
    s.write('ram_0560', 0xF8);
    // $884B: JMP $A771 (tail)
    this._a771();
  }

  /**
   * $A84E ($884E-$889A) — 场景==2 专用补绘分支 (含二次分发表 $A89D)。
   * $884E-$8857: LDY #$51; LDX #$B4; JSR $B0C0; LDA #$FC; JSR $ADE9 (脚本载入 → 记录语义)
   * $885A-$886D: PPU 地址 $2085 ($AEAC) + $2099 ($AEBE)
   * $8870-$8872: LDA #$D8; JSR $AE01
   * $8875-$8878: JSR $B0A1; JSR $AA7F (精灵区渲染)
   * $887B-$8884: ram_0468[0..FF] = CHR_COPY_B (→ $ACB8 精灵填充表)
   * $8886-$8893: 帧等待 ($997A + $9BE3 变体)
   * $8896-$889A: LDY #$9D; LDX #$A8; JMP $9C28 → 二次分发表 $A89D
   */
  private _a84e(): void {
    const s = this._store;
    // $885A-$886D: PPU 地址 $2085 + $2099 (记录语义)
    s.write('ram_00E6', 0x85);
    s.write('ram_00E7', 0x20);
    // $8875-$8878: JSR $B0A1; JSR $AA7F (精灵区渲染)
    this._aa7f();
    // $887B-$8884: LDY #$FC; 循环 ram_0468[0..FF] = CHR_COPY_B[Y] (→ $ACB8 表)
    for (let y = 0; y < 0x100; y++) {
      s.write(ramKey(0x0468 + y), CHR_COPY_B[y % CHR_COPY_B.length] ?? 0);
    }
    // $8886-$8893: 帧等待 ($997A + $9BE3) → no-op
    // $8896-$889A: LDY #$9D; LDX #$A8; JMP $9C28 → 二次分发表 $A89D
    this._dispatchA84e(0);
  }

  /** 二次分发表 ($A89D) 分发: 表 $A8A7/$A8CA/$A8E5/$AADD/$AA73/$EBA0 */
  private _dispatchA84e(_phase: number): void {
    const sel = this._store.read('ram_0450') & 0x05;
    switch (sel) {
      case 0: this._a8a7(); break;
      case 1: this._a8ca(); break;
      case 2: this._a8e5(); break;
      case 3: this._aadd(); break;
      case 4: this._aa73(); break;
      default:
        // $EBA0 — 跨 bank 屏幕渲染 (no-op)
        break;
    }
  }

  /** $A8A7 ($88A9-$88C7): 二次分支 1 — 精灵数据载入 + $A88D tail */
  private _a8a7(): void {
    const s = this._store;
    // $88A9-$88B7: LDX #$B6; LDA #$FB; JSR $97AD; LDX #$68; JSR $AE1E; LDA #$D8; JSR $AE3A (记录语义)
    // $88BA-$88BC: LDA #$F8; STA $0560
    s.write('ram_0560', 0xF8);
    // $88BF: JSR $A719
    this._a719();
    // $88C2-$88C7: LDA #$38; STA $0564; JMP $A88D
    s.write('ram_0564', 0x38);
    this._a88d();
  }

  /** $A8CA ($88CB-$88E2): 二次分支 2 — 精灵数据载入 + $A88D tail */
  private _a8ca(): void {
    const s = this._store;
    // $88CB-$88D7: LDY #$90; LDX #$B7; LDA #$FB; JSR $97AD; LDY #$B8; LDX #$AD; JSR $AE77 (记录语义)
    // $88DA: JSR $A719
    this._a719();
    // $88DD-$88E2: LDA #$48; STA $0564; JMP $A88D
    s.write('ram_0564', 0x48);
    this._a88d();
  }

  /** $A8E5 ($88E5-$8839): 二次分支 3 — 场景子屏幕绘制 (输入等待循环) */
  private _a8e5(): void {
    const s = this._store;
    // $88E5-$88EC: LDA #$58; STA $0564; LDA #$94; STA $004C
    s.write('ram_0564', 0x58);
    s.write('ram_004C', 0x94);
    // $88EE-$88F2: LDY #$BE; LDX #$AD; JSR $9C3A (载 $ADD0 指针表 → 记录语义)
    // $88F5-$88FA: LDA $0450; CMP #$03 (对比屏幕子状态)
    // $88FC-$8900: LDA #$B8; STA $00E6 (PPU 地址高字节)
    if ((s.read('ram_0450') & 0xFF) < 3) {
      s.write('ram_00E6', 0xB8);
    }
    // $8900-$890F: 输入等待循环 ($9FA8/$9CC9; BIT $001E; BVC/BPL) → H5 单次通过
    //   若溢出标志 (BVC) 置位 → 跳 $AA5F (跨 bank 脚本)
    // $8911-$891B: LDA #$01; STA $0562; LDA $0560; CMP #$C8 (比对位置)
    s.write('ram_0562', 1);
    // $891D: LDA $0560 >= $C8 → JMP $A9C0 (输入处理) 否则 fallthrough
    if ((s.read('ram_0560') & 0xFF) >= 0xC8) {
      this._a9c0();
      return;
    }
    // $8920: LDA #$01; JSR $9CD3; ... (连续输入/位置处理, 记录语义)
    // $8A5F: 取消分支 → $004C=0; $055C=$F8; $0560=$F8; JMP $A88D
    s.write('ram_055C', 0xF8);
    s.write('ram_0560', 0xF8);
    this._a88d();
  }

  /** $A9C0 ($89C0): 二次分支 3 的位置/输入处理辅助段 (记录语义) */
  private _a9c0(): void {
    // $89C0-$89CF: LDY #$CA; LDX #$AD; JSR $9C3A; LDA #$FF; STA $00E9; LDY #$A8; LDX #$C0; JSR $AABF
    // $89D4-$89E0: LDA #$C8; STA $055C; ... (位置计算, 记录语义)
    this._store.write('ram_00E9', 0xFF);
    this._store.write('ram_055C', 0xC8);
    // 后续输入处理流 (记录语义, H5 由 View 层消费)
  }

  /** $A88D ($888D): 二次帧等待变体 + 二次分发表分发 (表在 $A89D) */
  private _a88d(): void {
    // $888D-$8893: LDA #$FC; LDX #$38; LDY #$78; JSR $9BE3 (帧等待 → no-op)
    // $8896-$889A: LDY #$9D; LDX #$A8; JMP $9C28 → 二次分发表 $A89D
    this._dispatchA84e(0);
  }

  /** $AADD ($8ADD): 共享分支 — 场景计时/半场比分绘制 ($0060/$0061), 记录语义 */
  private _aadd(): void {
    const s = this._store;
    // $8ADD-$8AE3: LDA #$28; STA $0060; LDA #$18; STA $0061 (计时 $28:18)
    s.write('ram_0060', 0x28);
    s.write('ram_0061', 0x18);
    // $8AE5+: 脚本载入 + 半场比分/阶段号绘制 (记录语义, View 层经 ScriptVM 消费)
  }

  /** $AA73 ($8A73): 共享分支 — JSR $99F0 (块填充) + RTS */
  private _aa73(): void {
    // $8A73-$8A76: JSR $99F0 (块填充 → 记录语义)
  }

  /** $AA77 ($8A77): 精灵表载入 — LDY #$B3; LDX #$B4; JSR $97AB; RTS */
  private _aa77(): void {
    // $8A77-$8A7B: LDY #$B3; LDX #$B4; JSR $97AB (载入精灵表数据 → 记录语义)
    // $8A7E: RTS
  }

  /** $A719 ($8719): 数据载入辅助 — LDY #$83; LDX #$B5; JSR $97AB; RTS */
  private _a719(): void {
    // $8719-$871D: LDY #$83; LDX #$B5; JSR $97AB (载入数据 → 记录语义)
    // $8720: RTS
  }

  /**
   * $AA7F ($8A7F-$8ABE): 精灵区渲染循环 (光标/选手精灵写入 ram_0468 区)。
   * ram_0450(选手数)==0 → 直接返回; 否则依 ram_00E7 槽位逐个写入精灵数据。
   */
  private _aa7f(): void {
    const s = this._store;
    if (s.read('ram_0450') === 0) return;
    let e7 = 0x28;
    for (;;) {
      // $8A88: LDY ram_00E7; LDX #$C0; JSR $AABF (查询槽位)
      // $8A91-$8A97: TXA << 2 + $E0 → 精灵槽地址
      // $8A98-$8AB0: 写 ram_0468 区精灵数据 (X 偏移, tile/属性)
      // $8AB3-$8AB8: ram_00E7 += $10
      e7 = (e7 + 0x10) & 0xFF;
      if (e7 >= 0xB9) break;
    }
  }

  /**
   * 对应 asm $97AB/$B0C0 (entry4 用): 载入脚本 SCRIPT_ENTRY4A/B 供 View 层经 ScriptVM 渲染。
   */
  private _renderScriptEntry4(scene: number): void {
    // 场景<0x10 → SCRIPT_ENTRY4A, 否则 SCRIPT_ENTRY4B (View 层按场景选脚本块渲染)
    const script = scene < 0x10 ? SCRIPT_ENTRY4A : SCRIPT_ENTRY4A;  // TODO: SCRIPT_ENTRY4B 待翻译, 暂用 4A
    void script;
  }

  // ── 内部: PPU Buffer 记录 (对应 bank00 $9B28/$9B5E/$88CA/$98E8) ──
  // 记录格式: [control, PPU addr lo, PPU addr hi] + 数据 + 0x00 终止

  /** 对应 bank00 $9B28: 分配 PPU Buffer 记录头, 返回数据区写偏移 */
  // 真实地址: NMI 渲染缓冲 $05E8 区, 指针 ram_0628 ($9B48: LDX $0628)
  private _ppuBufAlloc(control: number, addrLo: number, addrHi: number): number {
    const s = this._store;
    const ptr = s.read('ram_0628');
    if (ptr + (control & 0x3F) + 3 > 64) return ptr; // 空间不足 (H5 简化处理)
    s.write(ramKey(0x05E8 + ptr), control & 0xFF);
    s.write(ramKey(0x05E8 + ptr + 1), addrLo & 0xFF);
    s.write(ramKey(0x05E8 + ptr + 2), addrHi & 0xFF);
    return ptr + 3;
  }

  /** 对应 bank00 $9B5E: PPU Buffer 记录 0x00 终止 + 指针推进 */
  private _ppuBufEnd(x: number): void {
    this._store.write(ramKey(0x05E8 + x), 0);
    this._store.write('ram_0628', x);
  }

  /**
   * 对应 bank00 $88CA: 字符显示 (A=char, Y=PPU addr lo, X=PPU addr hi)。
   * char < $A0: 单 tile [0x00, char];  char >= $A0: 双 tile [hiTile($94/$95), loTile($8A14)]
   */
  private _charDisplay(ch: number, addrLo: number, addrHi: number): void {
    let x = this._ppuBufAlloc(0x82, addrLo, addrHi);
    if (ch < 0xA0) {
      this._store.write(ramKey(0x05E8 + x), 0);
      this._store.write(ramKey(0x05E8 + x + 1), ch & 0xFF);
      x += 2;
    } else {
      const hi = ch >= 0xC8 ? 0x95 : 0x94;
      const lo = CHAR_MAP_DOUBLE[ch]?.loTile ?? 0;
      this._store.write(ramKey(0x05E8 + x), hi);
      this._store.write(ramKey(0x05E8 + x + 1), lo);
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
        this._store.write(ramKey(0x05E8 + x + b), fill & 0xFF);
      }
      this._ppuBufEnd(x + bytesPerRow);
      addr = (addr + 0x20) & 0xFFFF;
    }
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

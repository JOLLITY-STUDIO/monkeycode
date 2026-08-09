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
import { SCENE_TABLE } from '../data/scene/index';

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
   * 对应 asm $A01E-$A0D0 (~190 bytes)
   */
  entry0_PlayerData(): void {
    const s = this._store;
    // 从 RAM 读取查询参数: ram_0448 (teamId?), ram_0446 (position?), ram_044D (playerIndex)
    const teamId = s.read('ram_0448');
    const posIdx = s.read('ram_0446');
    const playerIdx = s.read('ram_044D');

    // 查球员数据表 → 写入 $0656-$0665 缓冲区 (10名球员)
    // 调用 $B016 (加法)/$B02E (减法)/$B045 (乘法) 数学函数
    // TODO: 从 ROM 数据表提取球员能力值
    this._decodePlayerStats(teamId, playerIdx);
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
   * 对应 asm $AF79-$AF89
   */
  entry6_VramBuf1(): void {
    // 将数据从 RAM 缓冲区复制到 VRAM (PPU 写入)
    // TODO: 翻译 $AF79
  }

  /**
   * 入口7 (A=7): VRAM 缓冲区写入 2
   * 对应 asm $AF8A-$B04F
   */
  entry7_VramBuf2(): void {
    // VRAM 写入第 2 路径
    // TODO: 翻译 $AF8A
  }

  /**
   * 入口8 (A=8): Bank 切换 + 数据加载
   * 对应 asm $B050-$C???
   */
  entry8_DataLoad(): void {
    // MMC3 bank select → 加载其他 Bank 数据表
    // H5: 直接引用对应 Bank 数据即可
    // TODO: 翻译 $B050
  }

  /**
   * 入口9 (A=9): 球队数据初始化
   * 对应 asm $A39B-$A3CF
   */
  entry9_TeamDataInit(): void {
    // 初始化队伍阵型、球员列表
    // 从 ROM 队伍数据表 ($A4xx+) 加载到 RAM
    // TODO: 翻译 $A39B
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
   * 从 ROM 数据表解码球员能力值。
   * 原始数据在 Banks 03-10 的球员数据表中，每条记录 32-64 bytes，
   * 包含: 名字、位置、6项能力值、必杀技ID列表。
   *
   * @param teamId 队伍ID
   * @param playerIdx 队内球员索引
   */
  private _decodePlayerStats(teamId: number, playerIdx: number): void {
    // 球员数据表格式 (每条 ~32 bytes):
    //   [0-1] 名字指针 / [2] 位置档位 [3-7] 能力值曲线索引
    //   [8-12] 能力值增量 / [13-18] 姓名编码
    //   [19-30] 必杀技ID * 6 bytes (shot/pass/dribble/tackle/save) * 2
    //   [31] 进场画面/特殊标志

    // ROM 数据表偏移: Bank 03-10
    // TODO: 从 ROM data bank 提取并转换为 Player 对象
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

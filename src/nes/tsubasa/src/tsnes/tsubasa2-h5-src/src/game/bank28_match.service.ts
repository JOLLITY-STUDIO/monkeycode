/**
 * Bank 28 Service — 比赛对阵/阵型/等级配置服务
 *
 * CPU 映射: $8000-$9FFF (MMC3 R6 切换, Bank #0x1C = 28)
 * PRG offset: 0x38010-0x3A00F
 *
 * H5 版本: 无 MMC3, 无 CPU 模拟。数据来自 `data/bank28-tables.ts`,
 * 本 service 直接翻译 bank_28 全部业务逻辑, 供 Bank30/Bank26/Bank31 调用。
 *
 * 原始入口 (bank_28.asm $8003 跳转表):
 *   [0] $8B22  场景/角色定位
 *   [1] $8609  角色属性/位置查询
 *   [2] $8C06  比赛状态初始化
 *   [3] $8D58  等级/经验映射
 *   [4] $819D  主队对阵配置加载
 *   [5] $8224  客队对阵配置加载
 *   [6] $828F  阵型配置加载
 *   [7] $852E  队伍数据查询
 *   [8] $846A  区域/坐标检查
 *   [9] $82CA  OAM 初始化
 */

import { DataStore } from '../data/DataStore';
import {
  B28_CPU_BASE,
  readB28,
  readB28U16,
  T_ROLE_TYPE,
  T_ATTR_BASE,
  T_POS_8206,
  T_TEAM_824C,
  T_TEAM_82C0,
  T_POS_8604,
  T_POS_86B5,
  T_POS_87C3,
  T_POS_89AF,
  T_ROLE_TYPE2,
  T_DIST_DIR,
  T_ZONE_COORD,
  T_SCENE_PTR,
  SCENE_DATA,
  T_MATCH_CFG_PTR,
  T_MATCH_CFG2_PTR,
  T_MATCH_CFG3_PTR,
  T_LEVEL_MAP,
} from '../data/bank28-tables';

// ── RAM 键 (语义化, 替代 NES ZP/内存地址) ──
const KEY_32 = 'ram_0032'; // 16bit 指针/临时 lo
const KEY_33 = 'ram_0033'; // 16bit 指针/临时 hi
const KEY_34 = 'ram_0034'; // 间接指针 lo
const KEY_38 = 'ram_0038'; // 间接指针 hi
const KEY_61 = 'ram_0061'; // 指针 lo
const KEY_62 = 'ram_0062'; // 指针 hi

// $043B-$044E 比赛配置区
const KEY_043B = 'ram_043B'; // 主队/当前队伍索引
const KEY_043C = 'ram_043C'; // 主队阵型/场景参数
const KEY_043D = 'ram_043D'; // 客队/对手队伍索引
const KEY_043E = 'ram_043E'; // 客队阵型参数
const KEY_043F = 'ram_043F'; // 从配置块读取的 byte2
const KEY_0440 = 'ram_0440'; // 从配置块读取的 byte3 & 3
const KEY_0441 = 'ram_0441'; // 主队角色类型/属性参数
const KEY_0442 = 'ram_0442'; // 客队角色类型/属性参数
const KEY_0443 = 'ram_0443'; // 从配置块 byte3 高 5bit
const KEY_0444 = 'ram_0444'; // 从配置块读取的 byte0
const KEY_0445 = 'ram_0445'; // 从配置块读取的 byte0 (客队)
const KEY_044E = 'ram_044E'; // 全局偏移/标志

// $04A5 OAM 缓冲区
const BASE_04A5 = 0x04A5;

// $05FB / $0515 / $0628 状态标志
const KEY_0515 = 'ram_0515';
const KEY_05FB = 'ram_05FB';
const KEY_0628 = 'ram_0628';
const KEY_0635 = 'ram_0635';
const KEY_0637 = 'ram_0637';
const KEY_0638 = 'ram_0638';

// 调用者传入的 X 参数 (对应 NES X 寄存器)
const KEY_CALL_X = 'ram_call_x';

// ── 常量 ──
const SCENE_ENTRY_SIZE = 12; // 每个场景 12B 数据

/** 16bit 间接读 (模拟 LDA (ptr),Y) */
interface IndirectPtr { lo: number; hi: number; }

// ═══════════════════════════════════════════════════════════════
// Bank 28 Service
// ═══════════════════════════════════════════════════════════════

export class Bank28MatchService {
  constructor(private _store: DataStore) {}

  // ──────────────────────────────────────────────
  // $8003: 入口跳转表 + 等级查询
  // ──────────────────────────────────────────────

  /**
   * 对应原始 $8003 跳转表分发。
   * 原始代码: 10 条 JMP + 一个公用等级查询尾部。
   * @param index 跳转表索引 0-9
   */
  dispatch(index: number): void {
    switch (index) {
      case 0: this.entryScenePosition(); break;
      case 1: this.entryRoleQuery(); break;
      case 2: this.entryMatchInit(); break;
      case 3: this.entryLevelMap(); break;
      case 4: this.entryHomeMatchConfig(); break;
      case 5: this.entryAwayMatchConfig(); break;
      case 6: this.entryFormationConfig(); break;
      case 7: this.entryTeamQuery(); break;
      case 8: this.entryZoneCheck(); break;
      case 9: this.entryOamInit(); break;
    }
  }

  /**
   * $8003 尾部: 按经验值查等级表 $9E4E。
   * asm: LDA $9E4E,Y → ram_0032, ram_0033=0, RTS
   * @param exp 经验值 (0-255)
   * @returns 等级 (映射后的值)
   */
  lookupLevel(exp: number): number {
    const y = exp & 0xFF;
    const level = T_LEVEL_MAP[y];
    this._store.write(KEY_32, level);
    this._store.write(KEY_33, 0);
    return level;
  }

  // ──────────────────────────────────────────────
  // [4] $819D: 主队对阵配置加载
  // ──────────────────────────────────────────────

  /**
   * 对应 $819D-$8223: 加载主队比赛配置。
   *
   * 流程:
   *   Y = ram_043B*3 + ram_044E (+ 修正项)
   *   X = T_POS_8206[Y] (若为 $FF → 跳过)
   *   调用 $803A 属性查询
   *   读 T_MATCH_CFG_PTR[ram_043B] 指向的配置块
   *   写入 ram_0444/043F/0440/0443
   *   最后查等级表返回
   */
  entryHomeMatchConfig(): void {
    const s = this._store;
    const teamIdx = s.read(KEY_043B);
    const add = s.read(KEY_044E);
    const sceneParam = s.read(KEY_043C);

    let y = teamIdx * 3 + add;
    if ((teamIdx & 0x80) === 0) {
      // $81B0: ram_043C & 0x7F >= 3 时减去 ram_044E
      if ((sceneParam & 0x7F) >= 3) {
        y -= add;
      }
    }
    y &= 0xFF;

    const pos = T_POS_8206[y];
    if (pos === 0xFF) {
      this._skipTo8203();
      return;
    }

    s.write(KEY_CALL_X, pos); // 临时保存 X (对应 NES X 寄存器)
    s.write(KEY_0441, pos);
    this._queryRoleAttributes(pos);

    s.write('ram_tempY', y); // 保存 Y

    const ptrIdx = teamIdx * 2;
    const cfgAddr = readB28U16(0x9460 + ptrIdx);
    this._loadMatchConfigBlock(cfgAddr, true);

    // 返回时查等级表: $8278
    this._finalizeLevelFrom032();
  }

  // ──────────────────────────────────────────────
  // [5] $8224: 客队对阵配置加载
  // ──────────────────────────────────────────────

  /**
   * 对应 $8224-$828E: 加载客队比赛配置。
   * 使用 T_TEAM_824C 和 T_MATCH_CFG2_PTR。
   */
  entryAwayMatchConfig(): void {
    const s = this._store;
    const teamIdx = s.read(KEY_043D);
    const add = s.read(KEY_044E);

    let y = teamIdx * 3 + add;
    y &= 0xFF;

    const pos = T_TEAM_824C[y];
    s.write(KEY_0442, pos);
    this._queryRoleAttributes(pos);

    const ptrIdx = teamIdx * 2;
    const cfgAddr = readB28U16(0x9554 + ptrIdx);
    this._loadMatchConfigBlock(cfgAddr, false);
    this._finalizeLevelFrom032();
  }

  // ──────────────────────────────────────────────
  // [6] $828F: 阵型配置加载
  // ──────────────────────────────────────────────

  /**
   * 对应 $828F-$82C9: 加载阵型相关配置。
   * 使用 T_TEAM_82C0 和 T_MATCH_CFG3_PTR。
   */
  entryFormationConfig(): void {
    const s = this._store;
    let teamIdx = s.read(KEY_043D);
    if (teamIdx === 3) teamIdx = 2; // $8290: CPY #$03 → DEY
    teamIdx += 3;
    teamIdx &= 0xFF;

    const pos = T_TEAM_82C0[teamIdx];
    const style = s.read(KEY_05FB) ^ 0x0B;
    s.write(KEY_0442, pos);
    this._queryRoleAttributes(pos, style);

    const ptrIdx = s.read(KEY_043D) * 2;
    const cfgAddr = readB28U16(0x959E + ptrIdx);
    s.write(KEY_0445, 0);
    this._loadMatchConfigBlock(cfgAddr, false);
    this._finalizeLevelFrom032();
  }

  // ──────────────────────────────────────────────
  // [1] $8609: 角色属性/位置查询
  // ──────────────────────────────────────────────

  /**
   * 对应 $8609-$8772: 角色(球员)属性或位置查询。
   * 入口参数在 ram_043C/ram_043D/ram_0621 等。
   */
  entryRoleQuery(): void {
    const s = this._store;
    const sceneIdx = s.read('ram_0621');
    const roleType = T_POS_89AF[sceneIdx & 0x03];
    s.write(KEY_0441, roleType);
    // $8618: JSR $803A
    this._queryRoleAttributes(roleType);
    // 后续位置表 T_POS_8604 / T_POS_86B5 / T_POS_87C3 处理
    this._rolePositionResolve(sceneIdx);
  }

  // ──────────────────────────────────────────────
  // [0] $8B22: 场景/角色定位
  // ──────────────────────────────────────────────

  /**
   * 对应 $8B22-$8B7D: 按场景 ID 读取角色位置数据。
   * 使用 T_SCENE_PTR → SCENE_DATA。
   */
  entryScenePosition(): void {
    const s = this._store;
    const sceneId = s.read('ram_00ED') & 0x1F;
    const ptrIdx = sceneId * 2;
    const dataAddr = readB28U16(0x8E1B + ptrIdx);
    const base = dataAddr - B28_CPU_BASE;

    // 每个场景 12B 数据, 每项 2B LE (坐标/属性指针)
    for (let i = 0; i < 6; i++) {
      const lo = SCENE_DATA[base + i * 2];
      const hi = SCENE_DATA[base + i * 2 + 1];
      const val = lo | (hi << 8);
      s.write(`scene_pos_${i}`, val);
    }
  }

  /** 读取某个场景第 slot 个 2B 数据 */
  readSceneData(sceneId: number, slot: number): number {
    const ptrIdx = (sceneId & 0x1F) * 2;
    const dataAddr = readB28U16(0x8E1B + ptrIdx);
    const base = dataAddr - B28_CPU_BASE + (slot & 0x07) * 2;
    return SCENE_DATA[base] | (SCENE_DATA[base + 1] << 8);
  }

  // ──────────────────────────────────────────────
  // [2] $8C06: 比赛状态初始化
  // ──────────────────────────────────────────────

  /**
   * 对应 $8C06-$8D57: 比赛相关状态/计时器初始化。
   * 包含对 ram_04A5 区域、ram_0500+ 状态标志的设置。
   */
  entryMatchInit(): void {
    const s = this._store;
    // 清零/初始化比赛状态区
    for (let i = 0x500; i <= 0x57F; i++) {
      s.write(`ram_${i.toString(16)}`, 0);
    }
    // 默认计时器
    s.write('match_timer_lo', 0x00);
    s.write('match_timer_hi', 0x00);
    s.write('match_phase', 0);
  }

  // ──────────────────────────────────────────────
  // [3] $8D58: 等级/经验映射入口
  // ──────────────────────────────────────────────

  /**
   * 对应 $8D58-$8DDF: 经验 → 等级 主入口。
   * 通常从 Bank26/30 调用, 读取 ram_0032 中的经验值。
   */
  entryLevelMap(): void {
    const exp = this._store.read(KEY_32) & 0xFF;
    this.lookupLevel(exp);
  }

  // ──────────────────────────────────────────────
  // [7] $852E: 队伍数据查询
  // ──────────────────────────────────────────────

  /**
   * 对应 $852E-$8595: 按队伍/角色查表。
   * 使用 T_ROLE_TYPE2, T_DIST_DIR 等。
   */
  entryTeamQuery(): void {
    const s = this._store;
    const roleIdx = s.read('ram_00ED') & 0x0F;
    const roleType = T_ROLE_TYPE2[roleIdx];
    s.write(KEY_0441, roleType);
    this._queryRoleAttributes(roleType);
  }

  // ──────────────────────────────────────────────
  // [8] $846A: 区域/坐标检查
  // ──────────────────────────────────────────────

  /**
   * 对应 $846A-$84FE: 检查 (X,Y) 是否落在某个 T_ZONE_COORD 区域。
   * 结果写入 ram_0628 (0=外, 0x80=内)。
   */
  entryZoneCheck(): void {
    const s = this._store;
    s.write(KEY_0628, 0);

    const sceneParam = s.read(KEY_043C) & 0x3F;
    if (sceneParam !== 0) return;

    let x = s.read(KEY_0635) & 0xFF;
    let y = s.read(KEY_0637) & 0xFF;
    x = this._coordinateTransform(x);

    if (x >= 0x60) return;

    // Y 取符号绝对值
    if (y & 0x80) y = (~y) & 0xFF;

    // 调用固定区 helper C539 后, 在 T_ZONE_COORD 中匹配
    // H5: 直接做区域匹配
    const result = this._findZone(x, y);
    if (result !== 0 && result !== 4) {
      s.write(KEY_0628, 0x80);
    }
  }

  // ──────────────────────────────────────────────
  // [9] $82CA: OAM 初始化
  // ──────────────────────────────────────────────

  /**
   * 对应 $82CA-$8469: 初始化 OAM/精灵缓冲区 ram_04A5 区域。
   * 循环 12 组, 每组 24B 复制。
   */
  entryOamInit(): void {
    const s = this._store;
    // $C52D: 固定区 helper — H5 无需硬件操作
    this._fixedC52D(0);

    s.write('ram_0011', 0);
    s.write('ram_0012', 0);
    s.write(KEY_61, 0x4A);
    s.write(KEY_62, 0x83);

    let a = 0;
    for (let group = 0; group < 12; group++) {
      this._oamInitGroup(a);
      a = (a + 1) & 0xFF;
      this._oamInitGroup(a);
      a = (a + 1) & 0xFF;
      if ((a + 1) >= 0x0C) break;
      a = (a + 1) & 0xFF;
    }
  }

  // ════════════════════════════════════════════
  // 内部: $803A 属性查询
  // ════════════════════════════════════════════

  /**
   * 对应 $803A-$818A: 角色属性/能力指针查询。
   * 输入 A=角色类型/参数, X=场景索引/队伍相关, 输出 ram_0032:0033。
   *
   * 核心逻辑:
   *   1. 若 (ram_0034),0 == 0: 走 T_ROLE_TYPE 路径
   *   2. 读取属性基址 T_ATTR_BASE, 计算指针
   *   3. 按 X 范围(0-25/25+/etc)查不同数据区
   */
  private _queryRoleAttributes(roleType: number, paramA?: number): void {
    const s = this._store;
    const a = paramA ?? roleType;
    const x = s.read(KEY_CALL_X) & 0xFF;

    // $C50C: 固定区 helper — H5 直接读取 ram_0034/0038 指针
    const ptr34 = this._readIndirectPtr(KEY_34, KEY_38);
    const flag = readB28(ptr34.lo + (ptr34.hi << 8)); // (0034),0

    if (flag === 0) {
      // 走 T_ROLE_TYPE 表
      const idx = (a - 0x0B) & 0xFF;
      const y = T_ROLE_TYPE[idx] ?? 0;
      // 从 (0038),Y 读值
      const ptr38 = this._readIndirectPtr(KEY_38, 'ram_0039');
      const v = readB28(ptr38.lo + (ptr38.hi << 8) + y);
      this._computeAttribute(v, x);
      return;
    }

    // flag != 0: 直接处理 CMP #$23 分支
    this._computeAttribute(a, x);
  }

  /** $803A-$818A 的属性计算核心 */
  private _computeAttribute(initialValue: number, x: number): void {
    const s = this._store;
    let val = initialValue & 0xFF;
    let hi = 0;

    if (val >= 0x23) {
      // 读取 (0034),1 和 (0034),2 进行修正
      const ptr34 = this._readIndirectPtr(KEY_34, KEY_38);
      const base = ptr34.lo + (ptr34.hi << 8);
      const b1 = readB28(base + 1);
      if (b1 & 0x80) {
        val = readB28(base + 2);
      }
      val = (val - 0x23) & 0xFF;
    }

    // 乘以 4/8/16 等
    let lo = val;
    hi = 0;
    // ASL×2
    lo = (lo << 1) & 0xFF;
    hi = (hi << 1) | (lo >> 8);
    lo = (lo << 1) & 0xFF;
    hi = (hi << 1) | (lo >> 8);

    // 加 T_ATTR_BASE[Y]
    const y = 0; // 简化: 默认加 $8199
    lo = (lo + T_ATTR_BASE[y]) & 0xFF;
    hi = (hi + T_ATTR_BASE[y + 1]) & 0xFF;

    s.write(KEY_32, lo);
    s.write(KEY_33, hi);

    // X 范围分支
    if (x >= 0x1F) {
      // $813F 分支
      this._attributeHighRange(x);
      return;
    }

    // $809A 分支
    if (x === 0 || x === 0x0B || x === 0x1E || x === 0x1F) {
      // 特殊处理
      this._attributeSpecial(x);
    }
  }

  /** $813F: X >= $1F 的高范围处理 */
  private _attributeHighRange(x: number): void {
    const s = this._store;
    if (x < 0x25) {
      // $8141-$818A
      let ptr = (s.read(KEY_32) | (s.read(KEY_33) << 8));
      const v = readB28(ptr + 1);
      let lo = (v << 2) & 0xFF;
      let hi = v >> 6;
      lo = (lo + (lo << 1)) & 0xFF;
      hi = (hi + (hi << 1) + (lo >> 8)) & 0xFF;
      lo = (lo + 0xAE) & 0xFF;
      hi = (hi + 0xAF) & 0xFF;
      const idx = ((x - 0x1F) * 2) & 0xFF;
      const xLo = readB28(lo + (hi << 8) + idx);
      const xHi = readB28(lo + (hi << 8) + idx + 1);
      s.write(KEY_32, xLo);
      s.write(KEY_33, xHi);
    } else {
      // $817E: X >= $25
      const ptr = (s.read(KEY_32) | (s.read(KEY_33) << 8));
      const y = (x - 0x23) & 0xFF;
      s.write(KEY_32, readB28(ptr + y));
      s.write(KEY_33, 0);
    }
  }

  /** $80A8-$818A 特殊属性处理 */
  private _attributeSpecial(x: number): void {
    const s = this._store;
    const ptr = s.read(KEY_32) | (s.read(KEY_33) << 8);
    let v = readB28(ptr);
    let hi = 0;

    if (x !== 0) {
      // 乘以 8 加基址
      v = (v << 3) & 0xFF;
      hi = v >> 8;
      v = (v + 0x86) & 0xFF;
      hi = (hi + 0xAE) & 0xFF;
      let y2 = x;
      if (x !== 0) y2 = (x - 0x17) & 0xFF;
      v = readB28(v + (hi << 8) + y2);
    }

    // $80F9 后续: 读取 (0034),3 作为偏移
    const offset = s.read('ram_0037') & 0xFF;
    if (x === 0) {
      v = (v + offset) & 0xFF;
      if (v >= 0x5F) v = 0x5F;
    } else {
      v = (v + (offset << 1)) & 0xFF;
      if (v >= 0xC0) v &= 0xBF;
    }

    s.write(KEY_32, v);
    s.write(KEY_33, 0);
  }

  // ════════════════════════════════════════════
  // 内部: 配置块读取
  // ════════════════════════════════════════════

  /**
   * 读取 4B 对阵配置块:
   *   byte0 → ram_0444/0445
   *   byte1 → X
   *   byte2 → ram_043F
   *   byte3 & 03 → ram_0440
   *   byte3 >> 3 → ram_0443
   */
  private _loadMatchConfigBlock(cpuAddr: number, isHome: boolean): void {
    const s = this._store;
    const base = cpuAddr - B28_CPU_BASE;
    const b0 = readB28(cpuAddr);
    const b1 = readB28(cpuAddr + 1);
    const b2 = readB28(cpuAddr + 2);
    const b3 = readB28(cpuAddr + 3);

    s.write(isHome ? KEY_0444 : KEY_0445, b0);
    s.write(KEY_043F, b2);
    s.write(KEY_0440, b3 & 0x03);
    s.write(KEY_0443, (b3 & 0xF8) >> 3);
    s.write('ram_0032', b1); // 后续等级查询用
  }

  /** $8278-$828E: 从 ram_0032 查等级表 */
  private _finalizeLevelFrom032(): void {
    const s = this._store;
    let x = s.read(KEY_32) & 0xFF;
    if (x >= 0xC0) x = 0xBF;
    const level = T_LEVEL_MAP[x];
    s.write(KEY_32, level);
    s.write(KEY_33, 0);
  }

  private _skipTo8203(): void {
    // $8203 死循环/空实现占位
  }

  // ════════════════════════════════════════════
  // 内部: 角色位置解析
  // ════════════════════════════════════════════

  private _rolePositionResolve(sceneIdx: number): void {
    const s = this._store;
    const idx = sceneIdx & 0x03;
    // 根据原始代码不同分支使用 T_POS_8604 / T_POS_86B5 / T_POS_87C3
    // 这里统一做简化映射
    const posTables = [T_POS_8604, T_POS_86B5, T_POS_87C3, T_POS_8604];
    const table = posTables[idx] ?? T_POS_8604;
    const result = table[0] ?? 0;
    s.write('ram_role_pos', result);
  }

  // ════════════════════════════════════════════
  // 内部: OAM 初始化辅助
  // ════════════════════════════════════════════

  private _oamInitGroup(a: number): void {
    const s = this._store;
    // 等待 ram_0515 == 0
    while ((s.read(KEY_0515) & 0xFF) !== 0) {
      /* spin — 原始为忙等 */
    }
    s.write(KEY_0515, 0x01);

    let x = 0;
    this._oamWriteSlot(x, a);
    x += 3;

    // 从 (0061) 复制 24B
    const ptr = this._readIndirectPtr(KEY_61, KEY_62);
    const base = ptr.lo + (ptr.hi << 8);
    for (let y = 0; y < 0x18; y++) {
      s.write(`ram_${(BASE_04A5 + x + y).toString(16)}`, readB28(base + y));
    }
    x += 0x18;
    s.write(`ram_${(BASE_04A5 + x).toString(16)}`, 0);

    // 更新 0061:0062
    const newBase = base + 0x18;
    s.write(KEY_61, newBase & 0xFF);
    s.write(KEY_62, (newBase >> 8) & 0xFF);

    s.write(KEY_0515, 0x80);
  }

  private _oamWriteSlot(x: number, a: number): void {
    const s = this._store;
    s.write(`ram_${(BASE_04A5 + x).toString(16)}`, 0x18);
    s.write(`ram_${(BASE_04A5 + x + 1).toString(16)}`, 0x40);

    let v = a + 0x11;
    v = v >> 3;
    v |= 0x20;
    s.write(`ram_${(BASE_04A5 + x + 2).toString(16)}`, v);
  }

  // ════════════════════════════════════════════
  // 内部: 区域检查辅助
  // ════════════════════════════════════════════

  private _coordinateTransform(x: number): number {
    const s = this._store;
    if ((s.read(KEY_05FB) & 0xFF) === 0) {
      return (~x) & 0xFF;
    }
    return x;
  }

  private _findZone(x: number, y: number): number {
    for (let i = 0; i < T_ZONE_COORD.length; i += 2) {
      const zx = T_ZONE_COORD[i];
      const zy = T_ZONE_COORD[i + 1];
      if (zx === x && zy === y) {
        return i >> 1;
      }
    }
    return 0xFF;
  }

  // ════════════════════════════════════════════
  // 内部: 固定区 helper 占位
  // ════════════════════════════════════════════

  /** $C52D: 通常是 PPU/OAM 相关硬件初始化 — H5 无需操作 */
  private _fixedC52D(_arg: number): void {
    // no-op in H5
  }

  // ════════════════════════════════════════════
  // 内部: 工具函数
  // ════════════════════════════════════════════

  private _readIndirectPtr(loKey: string, hiKey: string): IndirectPtr {
    return {
      lo: this._store.read(loKey) & 0xFF,
      hi: this._store.read(hiKey) & 0xFF,
    };
  }

  // ──────────────────────────────────────────────
  // 公共数据访问 (供其他 bank service 使用)
  // ──────────────────────────────────────────────

  /** 读 bank28 原始字节 */
  read(cpuAddr: number): number {
    return readB28(cpuAddr);
  }

  /** 读 bank28 16bit LE */
  read16(cpuAddr: number): number {
    return readB28U16(cpuAddr);
  }

  /** 查等级表 */
  getLevel(exp: number): number {
    return T_LEVEL_MAP[exp & 0xFF];
  }

  /** 按队伍索引读 T_POS_8206 */
  getPosition8206(index: number): number {
    return T_POS_8206[index & 0xFF] ?? 0xFF;
  }

  /** 按队伍索引读 T_TEAM_824C */
  getTeam824C(index: number): number {
    return T_TEAM_824C[index & 0xFF] ?? 0xFF;
  }

  /** 按队伍索引读 T_TEAM_82C0 */
  getTeam82C0(index: number): number {
    return T_TEAM_82C0[index & 0xFF] ?? 0xFF;
  }

  /** 按角色类型索引读 T_ROLE_TYPE */
  getRoleType(index: number): number {
    return T_ROLE_TYPE[index & 0xFF] ?? 0;
  }

  /** 按角色类型索引读 T_ROLE_TYPE2 */
  getRoleType2(index: number): number {
    return T_ROLE_TYPE2[index & 0xFF] ?? 0;
  }

  /** 按索引读 T_DIST_DIR (2B/项) */
  getDistDir(index: number): { dist: number; flags: number } {
    const i = (index & 0x0F) * 2;
    return { dist: T_DIST_DIR[i], flags: T_DIST_DIR[i + 1] };
  }

  /** 按索引读 T_ZONE_COORD (2B/项) */
  getZoneCoord(index: number): { x: number; y: number } {
    const i = (index & 0x1F) * 2;
    return { x: T_ZONE_COORD[i], y: T_ZONE_COORD[i + 1] };
  }

  /** 按场景 ID 读场景数据指针 */
  getSceneDataPtr(sceneId: number): number {
    return readB28U16(0x8E1B + (sceneId & 0x1F) * 2);
  }
}

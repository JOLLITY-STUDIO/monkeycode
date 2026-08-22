/**
 * MatchConfigService — bank28 比赛对阵/阵型/等级配置 ($8000-$9FFF, 运行时 $A000-$BFFF)
 * @bank 28
 *
 * 职责: 比赛配置表 (对阵/阵型/等级/OAM), $8528 队伍表, $8A9D 属性角色表。
 *
 * 入口 (跳转表 $8000-$800D):
 *   $8000 → JMP $802D: 主配置查询 (比赛索引 → 配置数据)
 *   $8003 → JMP $8B22: 队伍数据加载
 *   $8006 → JMP $8609: 阵型数据加载
 *   $8009 → JMP $8C06: 等级/属性设置
 *   $800C → JMP $8D58: OAM/精灵配置
 *   $8013-$8024: 内部跳转表 (8 项子程入口)
 *
 * $802D 主配置查询:
 *   $802E: LDA $9E4E,Y (查 $9E4E 队伍索引表)
 *   $8030: STA $0032; LDA #$00; STA $0033 (指针=$0032/$0033)
 *   $8039: RTS
 *
 * $803A 球员数据查询:
 *   $803A: PHA; JSR $C50C (查 RAM 玩家数据指针)
 *   $803E: LDY #$00; LDA ($0034),Y (读球员数据)
 *   $8042: BNE $8050 (非0则继续)
 *   $8044-$804D: PLA; PHA; SEC; SBC #$0B; TAY; LDA $818E,Y; TAY
 *     (查 $818E 偏移表)
 *   $804E: LDA ($0038),Y (读属性)
 *   $8050: CMP #$23; PHP (比较 $23=属性阈值)
 *   $8053: BCC $8064 (< $23 直接用)
 *   $8055-$8062: ≥ $23 查扩展属性 (读 $0034+1/+2)
 *   $8064-$8090: 算属性索引 (×4 + $8199 偏移表)
 *   $8092: PLA; CPX #$1F; BCC $809A (< $1F 继续)
 *   $8097: JMP $813F (≥ $1F 特殊处理)
 *
 * RAM 关键:
 *   $0032/$0033: 配置数据指针
 *   $0034/$0035: 球员数据指针 (由 $C50C 设置)
 *   $0038/$0039: 属性数据指针
 *
 * 数据表:
 *   $818E: 球员属性偏移表
 *   $8199: 属性索引偏移表
 *   $8528: 队伍表 (对阵/阵型)
 *   $8A9D: 属性角色表
 *   $9E4E: 队伍索引表 (比赛索引 → 队伍)
 *   $9FCE: 属性数据基址 ($AE86/$9FCE)
 *
 * 命名规范: 旧名 Bank28MatchService → 新名 MatchConfigService。
 */
import { DataStore } from '../../data/store/DataStore';
import type { GameSystemService } from '../system/GameSystemService';

/** 4 位大写十六进制 RAM 键 */
function ramKey(addr: number): string {
  return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
}

export class MatchConfigService {
  protected _store: DataStore;
  protected _system: GameSystemService;

  constructor(store: DataStore, system: GameSystemService) {
    this._store = store;
    this._system = system;
  }

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
  // 跳转表入口 (bank28 头 $8000-$800D)
  // ════════════════════════════════════════════════

  /** $8000 → $802D: 主配置查询 (比赛索引 → 队伍索引 → 配置指针) */
  configQuery(matchIndex: number): void { this.sub802D(matchIndex); }

  /** $8003 → $8B22: 队伍数据加载 */
  teamDataLoad(): void { this.sub8B22(); }

  /** $8006 → $8609: 阵型数据加载 */
  formationLoad(): void { this.sub8609(); }

  /** $8009 → $8C06: 等级/属性设置 */
  levelStatsSet(): void { this.sub8C06(); }

  /** $800C → $8D58: OAM/精灵配置 */
  oamConfig(): void { this.sub8D58(); }

  // ════════════════════════════════════════════════
  // 读取比赛配置 (原 readMatchConfig)
  // ════════════════════════════════════════════════
  getConfig(matchIndex: number): Readonly<Record<string, number>> {
    // 查 $9E4E 队伍索引表得队伍 id, 返回配置
    this.sub802D(matchIndex);
    const teamId = this.rd(0x0032);
    return { teamId, matchIndex };
  }

  // ════════════════════════════════════════════════
  // $802D: 主配置查询
  // asm: LDA $9E4E,Y; STA $0032; LDA #$00; STA $0033; RTS
  // 查 $9E4E 队伍索引表 (Y=比赛索引), 结果存 $0032/$0033
  // ════════════════════════════════════════════════
  private sub802D(matchIndex: number): void {
    const teamId = this.readMemByte(0x9E4E + matchIndex);
    this.wr(0x0032, teamId);
    this.wr(0x0033, 0);
  }

  // ════════════════════════════════════════════════
  // $803A: 球员数据查询
  // asm: PHA; JSR $C50C; LDY #$00; LDA ($0034),Y; ...
  //   查 RAM 玩家数据指针, 读球员数据, 算属性索引
  //   涉及 $818E/$8199 偏移表, $AE86/$9FCE 属性基址
  // ════════════════════════════════════════════════
  playerDataQuery(playerId: number): number {
    this._system.subC50C();
    const ptr = this.rdPtr(0x0034, 0x0035);
    const data = this.readMemByte(ptr);
    if (data === 0) {
      // 查 $818E 偏移表
      const off = this.readMemByte(0x818E + ((playerId - 0x0B) & 0xFF));
      const attrPtr = this.rdPtr(0x0038, 0x0039);
      return this.readMemByte(attrPtr + off);
    }
    return data;
  }

  // ════════════════════════════════════════════════
  // 跳转表入口目标 stub
  // ════════════════════════════════════════════════

  /** $8B22: 队伍数据加载 */
  private sub8B22(): void { /* TODO: 翻译 $8B22 队伍数据加载 */ }

  /** $8609: 阵型数据加载 */
  private sub8609(): void { /* TODO: 翻译 $8609 阵型数据加载 */ }

  /** $8C06: 等级/属性设置 */
  private sub8C06(): void { /* TODO: 翻译 $8C06 等级/属性设置 */ }

  /** $8D58: OAM/精灵配置 */
  private sub8D58(): void { /* TODO: 翻译 $8D58 OAM/精灵配置 */ }

  // ════════════════════════════════════════════════
  // 内存读取辅助
  // ════════════════════════════════════════════════
  private readMemByte(addr: number): number {
    if (addr < 0x0800) {
      return this.rd(addr);
    }
    // ROM 区: bank28 数据 (stub, 待 import bank28 数据表)
    return 0;
  }
}

export default MatchConfigService;

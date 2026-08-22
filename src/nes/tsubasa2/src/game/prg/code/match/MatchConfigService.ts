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
  // 跳转表入口目标 — 已翻译
  // ════════════════════════════════════════════════

  /**
   * $8B22: 队伍数据加载
   * asm $8B22-$8B93: 循环 $0B→$15 清零球员数据; 查 $BAB2 表得队伍
   * 数据指针; 读阵型/球员数; 循环配置球员数据; 调整 $0446
   */
  private sub8B22(): void {
    // $8B22-$8B37: 循环清零球员数据 ($0B→$15)
    for (let a = 0x0B; a < 0x16; a++) {
      this._system.subC50C(); // 读 $05FB 设 $0034/$0035
      const pp = this.rdPtr(0x0034, 0x0035);
      this.writeIndirect(pp, 0, 0);
      this.writeIndirect(pp, 1, 0);
    }
    // $8B39-$8B49: 队伍数据指针
    const ti = ((this.rd(0x002B) - 3) & 0xFF) << 1;
    const lo = this.readMemByte(0xBAB2 + ti);
    const hi = this.readMemByte(0xBAB3 + ti);
    this.wrPtr(0x0038, 0x0039, (hi << 8) | lo);
    // $8B4D-$8B5A: 读[0] 低4位→$002E, 高4位→$002F
    const tp = this.rdPtr(0x0038, 0x0039);
    const b0 = this.readIndirect(tp, 0);
    this.wr(0x002E, b0 & 0x0F);
    this.wr(0x002F, (b0 >> 4) & 0x0F);
    // $8B5D-$8B7B: 循环读队伍数据 (Y=9 起)
    this.wr(0x003A, 9);
    for (let i = 0; i < 64; i++) {
      const y = this.rd(0x003A);
      const val = this.readIndirect(tp, y);
      if (val === 0x0F) break; // 结束标记
      this._system.subC50C();
      const pd = this.readIndirect(tp, (y + 1) & 0xFF);
      this.wr(0x003A, (y + 2) & 0xFF);
      this.writeIndirect(this.rdPtr(0x0034, 0x0035), 0, pd);
    }
    // $8B7E-$8B93: 调整 $0446
    let dx = this.rd(0x0446);
    if (dx !== 0x05) {
      dx = 0;
      if (this.rd(0x0384) === 0x26) dx = 2;
    }
    this.wr(0x0446, dx);
  }

  /**
   * $8609: 阵型数据加载
   * asm $8609-$863E: 检查 $05FB; =0 则遍历 $0600 项阵型列表
   */
  private sub8609(): void {
    if (this.rd(0x05FB) !== 0) { this.sub875D(); return; }
    const cnt = this.rd(0x0600);
    if (cnt === 0) return;
    for (let x = 0; x < cnt; x++) {
      this._system.coroutineYield(1);
      this.sub863F(this.rd(0x0601 + x));
      this.wr(0x060B + x, this.rd(0x043D));
      this.wr(0x0606 + x, this.rd(0x043E));
    }
  }

  /**
   * $8C06: 等级/属性设置
   * asm $8C06-$8C7E: 入口 A=$0441, X=$043B;
   * 检查阵型类型/队伍侧; 调 $8DC9 获取指针;
   * 读两字节判断; 遍历属性表
   */
  private sub8C06(): void {
    const pid = this.rd(0x0441);
    const side = this.rd(0x043B);
    if (this.rd(0x044E) !== 0 && side >= 2) {
      this.wr(0x0430, 0); return;
    }
    this.sub8DC9(pid, side);
    const slot = this.rd(0x0430);
    const y = (slot << 1) & 0xFF;
    const p = this.rdPtr(0x0048, 0x0049);
    const v0 = this.readIndirect(p, y);
    const v1 = this.readIndirect(p, (y + 1) & 0xFF);
    if (v0 === v1 && v0 === 0) { this.wr(0x0430, 0); return; }
    if (v0 !== v1) { this.wr(0x0048, v0); this.wr(0x0049, v1); }
    this.wr(0x0430, 0);
    this.wr(0x0046, this._system.subC509(pid) & 0xFF);
    // $8C4A-$8C7C: 遍历属性表
    let ai = this.rd(0x0046);
    for (let i = 0; i < 64; i++) {
      const ab = this.readIndirect(this.rdPtr(0x0048, 0x0049), ai);
      this.wr(0x0047, (ab >> 2) & 0x3F);
      const st = ab & 0x03;
      if (st === 0x03) return;
      if (st !== this.rd(0x044E)) this.sub8C7F();
      ai = (ai + 1) & 0xFF;
      this.wr(0x0046, ai);
      const ck = this.rd(0x0047);
      if (ck === 0x08 || ck === 0x09 || ck === 0x0A ||
          ck === 0x11 || ck === 0x13) {
        ai = (ai + 1) & 0xFF;
        this.wr(0x0046, ai);
      }
    }
  }

  /**
   * $8D58: OAM/精灵配置
   * asm $8D58-$8DC8: 入口 A=$0442, X=$043D;
   * A=0/$0B→$8DA6 路径; 否则按队伍侧/阵型类型分支
   */
  private sub8D58(): void {
    const fid = this.rd(0x0442);
    const side = this.rd(0x043D);
    if (fid === 0 || fid === 0x0B) {
      this.sub8DA6Path(fid, side); return;
    }
    if (side >= 3) { this.wr(0x0430, 0); return; }
    if (this.rd(0x044E) !== 0 && side !== 2) {
      this.wr(0x0430, 0); return;
    }
    this.sub8DC9(fid, side);
    const slot = this.rd(0x0430);
    const y = (((slot + 4) & 0xFF) << 1) & 0xFF;
    const p = this.rdPtr(0x0048, 0x0049);
    const v0 = this.readIndirect(p, y);
    const v1 = this.readIndirect(p, (y + 1) & 0xFF);
    if (v0 === v1 && v0 === 0) { this.wr(0x0430, 0); return; }
    if (v0 !== v1) { this.wr(0x0048, v0); this.wr(0x0049, v1); }
    this.wr(0x0430, 0);
    this._system.subC509(fid);
  }

  /** $8DA6 路径 (A=0 或 A=$0B): 获取指针, 比较两字节 */
  private sub8DA6Path(fid: number, side: number): void {
    this.sub8DC9(fid, side);
    const p = this.rdPtr(0x0048, 0x0049);
    const v0 = this.readIndirect(p, 0);
    const v1 = this.readIndirect(p, 1);
    if (v0 === v1 && v0 === 0) { this.wr(0x0430, 0); return; }
    this.wr(0x0431, v0); this.wr(0x0430, 1);
  }

  /** $8DC9: 获取阵型数据指针 (公共子程) */
  private sub8DC9(pid: number, side: number): void {
    this.wr(0x0430, side);
    this.wr(0x0047, pid);
    this._system.subC50C();
    const pd = this.readIndirect(this.rdPtr(0x0034, 0x0035), 0);
    const x = (pd << 1) & 0xFF;
    this.wr(0x0048, this.readMemByte(0x8E1B + x));
    this.wr(0x0049, this.readMemByte(0x8E1C + x));
  }

  /** $8C7F: 属性调整 — LDA $0047; SEC; SBC #$03; JSR $C509 */
  private sub8C7F(): void {
    this._system.subC509((this.rd(0x0047) - 3) & 0xFF);
  }

  /** $863F: 阵型子程 — STA $0442; JSR $8A62; 查阵型表 */
  private sub863F(fid: number): void {
    this.wr(0x0442, fid);
    this.sub8A62();
    this.wr(0x003C, 0);
    if (fid === 0x0B) { this.sub85B5(); return; }
    const y = this.rd(0x0621);
    const v = this.readMemByte(0x86B5 + y);
    this.wr(0x003C, v);
    if (v === 0) { this.sub8663(); }
    else { this.sub8AB3(); this.sub868E(); }
  }

  /** $875D: $05FB≠0 路径 */
  private sub875D(): void { /* TODO: 翻译 $875D 阵型其他处理 */ }

  /** $8A62: 查球员属性指针 (入口部分) */
  private sub8A62(): void {
    this._system.subC50C();
    const ptr = this.rdPtr(0x0034, 0x0035);
    if (this.readIndirect(ptr, 0) !== 0) return;
    // $8A6C-$8AA7: 查 $8A9D 属性角色表 (需入口 A, 省略)
  }

  /** $863F 内部子程 stub */
  private sub85B5(): void { /* TODO: 翻译 $85B5 阵型特殊路径 */ }
  private sub8663(): void { /* TODO: 翻译 $8663 位置属性计算 */ }
  private sub8AB3(): void { /* TODO: 翻译 $8AB3 阵型属性设置 */ }
  private sub868E(): void { /* TODO: 翻译 $868E 阵型后续处理 */ }

  // ════════════════════════════════════════════════
  // 间接读写辅助 (RAM 间接寻址)
  // ════════════════════════════════════════════════
  private readIndirect(ptr: number, offset: number): number {
    const addr = (ptr + offset) & 0xFFFF;
    return this.readMemByte(addr);
  }
  private writeIndirect(ptr: number, offset: number, v: number): void {
    const addr = (ptr + offset) & 0xFFFF;
    if (addr < 0x0800) { this.wr(addr, v & 0xFF); }
  }

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

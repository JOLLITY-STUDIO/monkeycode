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
import {
  TBL_818E, TBL_8199, TBL_8206, TBL_824C, TBL_82C0, TBL_8528,
  TBL_8604, TBL_86AF, TBL_86B5, TBL_86C0, TBL_86F1, TBL_8716,
  TBL_87BD, TBL_87C3, TBL_87CD, TBL_88DD, TBL_8900, TBL_8956,
  TBL_8A9D, TBL_8B9E, TBL_8BBE, TBL_8C3B, TBL_8C84, TBL_8D9D,
  TBL_8E1B, TBL_9460, TBL_9554, TBL_959E, TBL_9E4E, TBL_BAB2,
  DATA_LINEUP_834A, DATA_FPTR_8E2B, DATA_FORM_9474, DATA_ATTR_95D6,
  DATA_9FCE, DATA_AE86,
} from '../../data/tables/bank28-tables';

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
  // $8039/$803A: 球员数据查询 (属性查表)
  // asm $8039-$818D (已按 ROM 原始字节逐指令核对, 含 $813F 特殊路径)
  //   入口 A=属性请求值(球员id/$0441/$0442/$05FB^$0B), X=位置索引(调用点查表值)
  //   $803A: JSR $C50C → $0034/$0035 = 球员数据指针 (C=ASL进位=(phase^$0B)bit7)
  //   $003E: LDA ($0034),Y; ≠0 → 直接用 RAM 值; =0 → 查 $818E 偏移表取 $0038 属性
  //   ≥$23 扩展路径: 用 playerData[1]/[2] 覆盖属性值, -$23
  //   ×4 (或 ×12) + $8199 基址 → $0032/$0033 = 属性表指针
  //   特殊 id {0,$0B,$1E,$1F} → $AE86(×8) GK 属性表
  //   普通 id → $9FCE(×12) 属性表; X≥$1F → $AFAE+base[1]×12 指针表
  // ════════════════════════════════════════════════
  playerDataQuery(playerId: number, posX: number = 0): number {
    const x = posX & 0xFF;
    // $803A: JSR $C50C (读 $05FB 设 $0034/$0035; 返回时 C = ASL 进位)
    this._system.subC50C();
    const phase = this.rd(0x05FB);
    const cC50C = ((phase ^ 0x0B) & 0x80) !== 0;
    const ptr34 = this.rdPtr(0x0034, 0x0035);
    // $803B/$803E: LDY #$00; LDA ($0034),Y
    let a = this.readIndirect(ptr34, 0);
    // $8040: BNE $8050 — RAM 值非 0 直接进入, C 为 $C50C 遗留
    let carryGe23 = cC50C;
    if (a === 0) {
      // $8042-$804D: A = playerId-$0B; Y=$818E[Y]; A=($0038),Y (属性)
      const y = this.readMemByte(0x818E + ((playerId - 0x0B) & 0xFF));
      a = this.readIndirect(this.rdPtr(0x0038, 0x0039), y);
      // $804E: CMP #$23 → C = (A >= $23)
      carryGe23 = a >= 0x23;
      // $8050: PHP
      // $8052: BCC $8064 — A < $23 跳过扩展
      if (!carryGe23) {
        // 直接到 $8064
      } else {
        // $8053-$8061: p1≥0 用属性, 否则用 p2; SBC #$23 (C=1)
        const p1 = this.readIndirect(ptr34, 1);
        if ((p1 & 0x80) !== 0) {
          a = this.readIndirect(ptr34, 2);
        }
        a = (a - 0x23) & 0xFF;
      }
    } else if (carryGe23) {
      // d0 ≠ 0 且 C=1: $8053-$8061 (p1 负数 → p2; SBC #$23)
      const p1 = this.readIndirect(ptr34, 1);
      if ((p1 & 0x80) !== 0) {
        a = this.readIndirect(ptr34, 2);
      }
      a = (a - 0x23) & 0xFF;
    }
    // $8064-$808D: (A×4 或 A×12) + $8199 偏移 (Y=0 → $95D6; Y=2 → $9662)
    const base16 = (((a * 4) * (carryGe23 ? 3 : 1)) + (carryGe23 ? 0x9662 : 0x95D6)) & 0xFFFF;
    this.wrPtr(0x0032, 0x0033, base16);
    // $8090: PLA → A = playerId (栈平衡, H5 无共享栈, 省略)
    // $8092: CPX #$1F; BCC $809A — X ≥ $1F → $813F 指针表路径
    if (x >= 0x1F) { return this.sub813F(playerId, x, base16); }
    // $809A-$80A6: 特殊 id 判定 (0/$0B/$1E/$1F → Z=1)
    const special = playerId === 0 || playerId === 0x0B || playerId === 0x1E || playerId === 0x1F;
    // $80A8: LDY #$00; LDA ($0032),Y; STY $0033; PLP
    const base0 = this.readIndirect(base16, 0);
    // $80AF: PLP → Z; $80B0: BNE $80D1
    if (!special) {
      // $80D1-$80F3: base0×12 + $9FCE 基址 (普通球员属性表)
      const ptr = (0x9FCE + base0 * 12) & 0xFFFF;
      this.wrPtr(0x0032, 0x0033, ptr);
      // $80F6/$80F7: TXA; TAY → Y=X; $80F9: TXA; $80FA: BEQ $8113
      return this.readAttrTail(ptr, x);
    }
    // $80B0-$80C1 (special): base0×8 + $AE86 基址 (GK 属性表)
    const ptr = (0xAE86 + base0 * 8) & 0xFFFF;
    this.wrPtr(0x0032, 0x0033, ptr);
    // $80C3-$80CB: Y = X==0 ? 0 : X-$17; $80CC: LDA ($0032),Y; JMP $80F9
    const y = x === 0 ? 0 : (x - 0x17) & 0xFF;
    return this.readAttrTail(ptr, x, y);
  }

  /**
   * $80F9 公共尾 (普通路径 Y=X; special 路径 Y=presetY):
   *   X≠0: val = 表[Y] + p3×2, 上限 $BF → $0032 = val
   *   X==0: val = 表[0] + p3, 上限 $5F; 经 ($0032)=$0E ($0033)=$9F/$A0
   *     读 RAM $069F+val 16bit 表 → ($0032,$0033)
   */
  private readAttrTail(ptr: number, x: number, presetY?: number): number {
    const y = presetY ?? x;
    const base = this.readIndirect(ptr, y);
    if (x === 0) {
      // $8113: val = 表[0] + p3, 上限 $5F
      const p3 = this.readIndirect(this.rdPtr(0x0034, 0x0035), 3);
      let val = (base + p3) & 0xFF;
      if (val > 0x5F) val = 0x5F;
      // $8125: LDY #$9F; ASL; BCC $812B; INY → $0033=$9F/$A0; $0032=$0E
      this.wr(0x0033, 0x9F + ((val >> 7) & 1));
      this.wr(0x0032, 0x0E);
      // $8131-$813C: 指针 $0E9F+val → RAM 镜像 $069F+val, 读 16bit
      const ra = (0x0E9F + val) & 0x07FF;
      const v16 = this.readMemByte(ra) | (this.readMemByte((ra + 1) & 0x07FF) << 8);
      this.wrPtr(0x0032, 0x0033, v16);
      return v16 & 0xFF;
    }
    // $80FC-$8107: val = 表[Y] + p3×2 (16bit 语义含 ASL 进位)
    const p3 = this.readIndirect(this.rdPtr(0x0034, 0x0035), 3);
    let val = (base + p3 * 2) & 0xFF;
    // $810A-$8110: 上限 $BF → $0032
    if (val > 0xBF) val = 0xBF;
    this.wr(0x0032, val);
    return val;
  }

  /** $813F: X ≥ $1F 特殊路径 — base[1]×12 + $AFAE 指针表, 返回 16bit 指针 */
  private sub813F(playerId: number, x: number, base16: number): number {
    // $813F: CPX #$25; BCS $817E (X ≥ $25 → 表直读)
    if (x >= 0x25) {
      // $817E: TXA; SEC; SBC #$23; TAY; LDA ($0032),Y; STA $0032; LDA #$00; STA $0033
      const y = (x - 0x23) & 0xFF;
      const v = this.readIndirect(base16, y);
      this.wrPtr(0x0032, 0x0033, v);
      return v;
    }
    // $8143-$8169: ptr = $AFAE + base[1]×12
    const b1 = this.readIndirect(base16, 1);
    const ptr = (0xAFAE + b1 * 12) & 0xFFFF;
    // $816B-$817B: Y = (X-$1F)*2; ($0032,$0033) = 指针表 16bit 项
    const y = ((x - 0x1F) * 2) & 0xFF;
    const lo = this.readIndirect(ptr, y);
    const hiB = this.readIndirect(ptr, (y + 1) & 0xFF);
    const p = (hiB << 8) | lo;
    this.wrPtr(0x0032, 0x0033, p);
    void playerId;
    return p;
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
    // $8C31: LDA $0430 (slot); $8C38: JSR $C509; 表 $8C3B: $8C46/$8D41/$8D4E/$8D55
    //   cmd0 → $8C46: 跳过 LDA#$00;STA$0046 ($0046 保留原值) 直接进主循环
    //   cmd1/2/3 → $8D41/$8D4E/$8D55 (其他阵型处理, TODO)
    if (slot !== 0) {
      void slot;
    }
    // $8C46 起: LDY $0046; 主循环 ($0046 保留)
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
    // JSR $C509 (cmd=fid 原值) 分派 — 目标子程待翻译
    void fid;
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

  /** $8C7F: 属性调整 — LDA $0047; SEC; SBC #$03; JSR $C509 (表 $8C84 32 项, 待翻译) */
  private sub8C7F(): void {
    void ((this.rd(0x0047) - 3) & 0xFF);
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

  /**
   * $8A62: 查球员属性指针 (入口部分)。
   * asm $8A62-$8AA7: JSR $C50C; 读球员数据[0]; ≠0 则查 $8A9D 表算属性索引。
   */
  private sub8A62(): void {
    this._system.subC50C();
    const ptr = this.rdPtr(0x0034, 0x0035);
    const d0 = this.readIndirect(ptr, 0);
    if (d0 === 0) return;
    // $8A6C: 查 $8A9D 属性角色表
    const x = this.rd(0x0441) & 0xFF;
    const y = this.readMemByte(0x8A9D + x);
    const teamPtr = this.rdPtr(0x0038, 0x0039);
    const attrVal = this.readIndirect(teamPtr, y);
    // 算属性索引 (SBC #$23; ASL×2; ADC)
    let a = (attrVal - 0x23) & 0xFF;
    let lo = a, hi = 0;
    for (let i = 0; i < 2; i++) {
      hi = ((hi << 1) | (lo >> 7)) & 0xFF;
      lo = (lo << 1) & 0xFF;
    }
    this.wr(0x003A, lo);
    hi = ((hi << 1) | (lo >> 7)) & 0xFF;
    lo = (lo << 1) & 0xFF;
    lo = (lo + this.rd(0x003A)) & 0xFF;
  }

  /**
   * $8663: 位置属性计算 (v===0 路径)。
   * asm $8663-$868D:
   *   LDA $0635; EOR #$FF; TAX (X = ~$0635)
   *   LDA #$14; CPX #$A0; BCS $868E (≥$A0 → $868E)
   *   LDA #$10; CPX #$60; BCS $868E (≥$60 → $868E)
   *   LDA $0637; BPL $867C; EOR #$FF; TAY (Y = ~$0637 if neg)
   *   JSR $C539 (角度计算)
   *   LDX #$00; CMP $8BBE,X; BEQ $868B; INX; INX; BNE (查表)
   *   LDA $8BBF,X (取结果)
   *   → fall through $868E
   */
  private sub8663(): void {
    // X = ~$0635
    const x = (this.rd(0x0635) ^ 0xFF) & 0xFF;
    // LDA #$14; CPX #$A0; BCS $868E
    let a = 0x14;
    if (x >= 0xA0) { this.sub868E(a, x); return; }
    // LDA #$10; CPX #$60; BCS $868E
    a = 0x10;
    if (x >= 0x60) { this.sub868E(a, x); return; }
    // LDA $0637; BPL $867C; EOR #$FF; TAY
    let y = this.rd(0x0637);
    if ((y & 0x80) !== 0) y = (y ^ 0xFF) & 0xFF;
    // JSR $C539 (角度计算 — bank30, stub)
    // 查 $8BBE 表 (2 字节步长)
    let xi = 0;
    const cmpVal = 0; // $C539 返回值 stub
    while (xi < 0x100) {
      if (cmpVal === this.readMemByte(0x8BBE + xi)) break;
      xi = (xi + 2) & 0xFF;
      if (xi === 0) break;
    }
    a = this.readMemByte(0x8BBF + xi);
    this.sub868E(a, x);
  }

  /**
   * $868E: 阵型后续处理 (LDY #$07; JSR $8ADE; 算坐标; JSR $8B0B; 设 $043D/$043E)。
   * asm $868E-$86B0:
   *   LDY #$07; JSR $8ADE
   *   CLC; LDA $003C; ADC #$AE; STA $003C
   *   TXA; ADC #$B8; STA $003D
   *   JSR $8B0B; STA $043D; LDA #$00; STA $043E
   *   LDA $003F; JSR $C509
   */
  private sub868E(a?: number, x?: number): void {
    void a; void x;
    // LDY #$07; JSR $8ADE — 属性计算子程 (stub)
    // CLC; LDA $003C; ADC #$AE; STA $003C
    const c = (this.rd(0x003C) + 0xAE) & 0xFF;
    this.wr(0x003C, c);
    // TXA; ADC #$B8; STA $003D (X 来自调用方, stub 用 0)
    this.wr(0x003D, (0 + 0xB8) & 0xFF);
    // JSR $8B0B — stub
    // STA $043D; LDA #$00; STA $043E
    this.wr(0x043D, c);
    this.wr(0x043E, 0x00);
    // LDA $003F; JSR $C509 — 分派待翻译
    void this.rd(0x003F);
  }

  /**
   * $8AB3: 阵型属性设置 (查 $8B9E 表)。
   * asm $8AB3-$8AE9:
   *   LDA $0635; BPL $8ABA; EOR #$FF; TAX (X = ~$0635 if neg)
   *   LDA $0637; BPL $8AC2; EOR #$FF; TAY (Y = ~$0637 if neg)
   *   JSR $C539 (角度计算)
   *   LDX #$00; CMP $8B9E,X; BEQ $8AD1; INX; INX; BNE (查表)
   *   LDA $8B9F,X; LDX $003C; CPX #$01; BEQ $8ADD
   *   CLC; ADC #$0C; RTS
   *   $8ADD: STA $003E; ...
   */
  private sub8AB3(): void {
    let x = this.rd(0x0635);
    if ((x & 0x80) !== 0) x = (x ^ 0xFF) & 0xFF;
    let y = this.rd(0x0637);
    if ((y & 0x80) !== 0) y = (y ^ 0xFF) & 0xFF;
    // JSR $C539 (角度计算 — bank30, stub)
    const cmpVal = 0; // stub
    // 查 $8B9E 表 (2 字节步长)
    let xi = 0;
    while (xi < 0x100) {
      if (cmpVal === this.readMemByte(0x8B9E + xi)) break;
      xi = (xi + 2) & 0xFF;
      if (xi === 0) break;
    }
    let a = this.readMemByte(0x8B9F + xi);
    // LDX $003C; CPX #$01; BEQ $8ADD
    if (this.rd(0x003C) === 0x01) {
      // $8ADD: STA $003E
      this.wr(0x003E, a);
    } else {
      // CLC; ADC #$0C; RTS
      a = (a + 0x0C) & 0xFF;
      this.wr(0x003E, a);
    }
  }

  /**
   * $85B5: 阵型特殊路径 (fid===$0B)。
   * asm $85B5-$8603: 与 $863F 类似但用 $8604 表代替 $86B5。
   *   LDA #$00; STA $003D
   *   LDX $0621; LDY $8604,X; TYA; ASL; ASL; STA $003E
   *   INY×4; LDA ($003A),Y; ASL; ROL $003D; ASL; ROL $003D; STA $003C
   *   LDX $003D; ASL; ROL $003D; ADC $003C; STA $003C; TXA; ADC $003D; TAX
   *   LDA $003C; CLC; ADC #$2E; STA $003C; TXA; ADC #$BA; STA $003D
   *   JSR $8B0B; STA $043D; TAX; LDA $0442; JSR $8DA6
   *   LDA $0430; BEQ $8600; LDA $0431; $8600: STA $043E; RTS
   */
  private sub85B5(): void {
    this.wr(0x003D, 0x00);
    const x = this.rd(0x0621);
    let y = this.readMemByte(0x8604 + x);
    // TYA; ASL; ASL; STA $003E
    this.wr(0x003E, (y << 2) & 0xFF);
    // INY×4
    y = (y + 4) & 0xFF;
    // LDA ($003A),Y
    const ptr3A = this.rdPtr(0x003A, 0x003B);
    let lo = this.readIndirect(ptr3A, y);
    // ASL; ROL $003D; ASL; ROL $003D
    let hi = this.rd(0x003D);
    for (let i = 0; i < 2; i++) {
      hi = ((hi << 1) | (lo >> 7)) & 0xFF;
      lo = (lo << 1) & 0xFF;
    }
    this.wr(0x003C, lo);
    // LDX $003D; ASL; ROL $003D; ADC $003C; STA $003C; TXA; ADC $003D; TAX
    let hi2 = hi;
    hi2 = ((hi2 << 1) | (lo >> 7)) & 0xFF;
    lo = (lo << 1) & 0xFF;
    lo = (lo + this.rd(0x003C)) & 0xFF;
    let x2 = (hi + hi2) & 0xFF;
    // LDA $003C; CLC; ADC #$2E; STA $003C
    const c = (lo + 0x2E) & 0xFF;
    this.wr(0x003C, c);
    // TXA; ADC #$BA; STA $003D
    this.wr(0x003D, (x2 + 0xBA) & 0xFF);
    // JSR $8B0B; STA $043D; TAX
    // LDA $0442; JSR $8DA6
    // LDA $0430; BEQ $8600; LDA $0431; STA $043E; RTS
    this.wr(0x043D, c);
    if (this.rd(0x0430) !== 0) {
      this.wr(0x043E, this.rd(0x0431));
    } else {
      this.wr(0x043E, this.rd(0x0431));
    }
  }

  /**
   * $875D: $05FB≠0 路径 (阵型其他处理)。
   * asm $875D-$87EC: 与 sub863F 结构相同但用 $87C3 表代替 $86B5。
   *   LDA $0441; JSR $8A62
   *   LDY $0621; LDA $87C3,Y; STA $003C; BEQ $8773
   *   JSR $8AB3; JMP $879C
   *   $8773: LDA #$14; LDX $0635; CPX #$A0; BCS $879C
   *   LDA #$10; CPX #$60; BCS $879C
   *   LDY $0637; BPL $878B; TYA; EOR #$FF; TAY; JSR $C539
   *   LDX #$00; CMP $8BBE,X; BEQ $8799; INX; INX; BNE
   *   LDA $8BBF,X; LDY #$04; JSR $8ADE
   *   CLC; LDA $003C; ADC #$2E; STA $003C; TXA; ADC #$B1; STA $003D
   *   JSR $8B0B; STA $043B; LDA #$00; STA $043C; LDA $003F; JSR $C509
   *   JMP $8A3F (跳转后续处理)
   */
  private sub875D(): void {
    // LDA $0441; JSR $8A62
    this.wr(0x0441, this.rd(0x0441));
    this.sub8A62();
    // LDY $0621; LDA $87C3,Y; STA $003C; BEQ $8773
    const y0 = this.rd(0x0621);
    const v = this.readMemByte(0x87C3 + y0);
    this.wr(0x003C, v);
    if (v !== 0) {
      // JSR $8AB3; JMP $879C
      this.sub8AB3();
      this.sub879C();
    } else {
      // $8773: LDA #$14; LDX $0635; CPX #$A0; BCS $879C
      const x = this.rd(0x0635);
      if (x >= 0xA0) {
        this.sub879C();
        return;
      }
      // LDA #$10; CPX #$60; BCS $879C
      if (x >= 0x60) {
        this.sub879C();
        return;
      }
      // LDY $0637; BPL $878B; TYA; EOR #$FF; TAY; JSR $C539
      let y = this.rd(0x0637);
      if ((y & 0x80) !== 0) y = (y ^ 0xFF) & 0xFF;
      // JSR $C539 (角度计算 — bank30, stub)
      // LDX #$00; CMP $8BBE,X; BEQ $8799; INX; INX; BNE
      const cmpVal = 0; // stub
      let xi = 0;
      while (xi < 0x100) {
        if (cmpVal === this.readMemByte(0x8BBE + xi)) break;
        xi = (xi + 2) & 0xFF;
        if (xi === 0) break;
      }
      const a = this.readMemByte(0x8BBF + xi);
      // LDY #$04; JSR $8ADE (stub)
      void a;
      // CLC; LDA $003C; ADC #$2E; STA $003C
      const c = (this.rd(0x003C) + 0x2E) & 0xFF;
      this.wr(0x003C, c);
      // TXA; ADC #$B1; STA $003D
      this.wr(0x003D, (0 + 0xB1) & 0xFF);
      // JSR $8B0B; STA $043B; LDA #$00; STA $043C
      this.wr(0x043B, c);
      this.wr(0x043C, 0x00);
      // LDA $003F; JSR $C509 — 分派待翻译
      void this.rd(0x003F);
      // JMP $8A3F — 后续处理 (stub)
    }
  }

  /** $879C: $875D 的 $8AB3 后续路径 (类似 sub868E) */
  private sub879C(): void {
    // CLC; LDA $003C; ADC #$2E; STA $003C
    const c = (this.rd(0x003C) + 0x2E) & 0xFF;
    this.wr(0x003C, c);
    // TXA; ADC #$B1; STA $003D
    this.wr(0x003D, (0 + 0xB1) & 0xFF);
    // JSR $8B0B; STA $043B; LDA #$00; STA $043C
    this.wr(0x043B, c);
    this.wr(0x043C, 0x00);
    // LDA $003F; JSR $C509 — 分派待翻译
    void this.rd(0x003F);
  }

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

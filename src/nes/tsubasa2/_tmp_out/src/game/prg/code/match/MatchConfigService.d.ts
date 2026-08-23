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
export declare class MatchConfigService {
    protected _store: DataStore;
    protected _system: GameSystemService;
    constructor(store: DataStore, system: GameSystemService);
    protected rd(addr: number): number;
    protected wr(addr: number, v: number): void;
    protected rdPtr(lo: number, hi: number): number;
    protected wrPtr(lo: number, hi: number, v: number): void;
    /** $8000 → $802D: 主配置查询 (比赛索引 → 队伍索引 → 配置指针) */
    configQuery(matchIndex: number): void;
    /** $8003 → $8B22: 队伍数据加载 */
    teamDataLoad(): void;
    /** $8006 → $8609: 阵型数据加载 */
    formationLoad(): void;
    /** $8009 → $8C06: 等级/属性设置 */
    levelStatsSet(): void;
    /** $800C → $8D58: OAM/精灵配置 */
    oamConfig(): void;
    getConfig(matchIndex: number): Readonly<Record<string, number>>;
    private sub802D;
    playerDataQuery(playerId: number, posX?: number): number;
    /**
     * $80F9 公共尾 (普通路径 Y=X; special 路径 Y=presetY):
     *   X≠0: val = 表[Y] + p3×2, 上限 $BF → $0032 = val
     *   X==0: val = 表[0] + p3, 上限 $5F; 经 ($0032)=$0E ($0033)=$9F/$A0
     *     读 RAM $069F+val 16bit 表 → ($0032,$0033)
     */
    private readAttrTail;
    /**
     * $8ADE-$8B09: 属性索引计算。
     * asm (ROM 字节精确对位, 反汇编器 $8ADE 有 1 字节错位):
     *   $8ADE: STA $003E      — 入口 A(表值) 存 $003E
     *   $8AE0: LDA $003C; STA $003F — $003F = $003C (调用前值)
     *   $8AE4: TYA; CLC; ADC $003C; TAY — Y = Y + $003C
     *   $8AE9: LDA ($003A),Y — v = 指针 $003A 读
     *   $8AEB-$8AF9: 4× (ASL; ROL $003D) — v×16 (16bit)
     *   $8AFB: STA $003C; $8AFD: LDX $003D
     *   $8AFF: ASL; ROL $003D — v×32 (16bit)
     *   ADC $003C; STA $003C — 低字节 = ×32低 + ×16低 + C
     *   TXA; ADC $003D; TAX — 高字节 = ×16高 + ×32高 + carry
     *   → 结果: $003C/$003D = v×48 (16bit), 返回 X = 高字节
     * @param y 入口 Y 索引
     * @param aIn 入口 A 表值 (存 $003E)
     * @returns X = 16bit 结果高字节
     */
    private sub8ADE;
    /**
     * $8B0B-$8B1F: 读 ($003C),Y 取属性位。
     * asm:
     *   $8B0A: LDA $00E2; AND #$07; LSR — C = bit0
     *   $8B10: PHP (压 C); CLC; ADC $003E; TAY
     *   $8B15: LDA ($003C),Y; PLP; BCS $8B1F — C=1 原样返回
     *   $8B19-$8B1E: LSR×4; AND #$0F — C=0 取高 4 位
     */
    private sub8B0B;
    /**
     * $8732-$8743: sub868E 收尾 — LDA $0442; LDX $043D; JSR $8D58;
     * $0430≠0 → $043E = $0431
     */
    private sub8732;
    /** $86BA (cmd0 分派): LDA $043D; JSR $C509 → 表 $86C0 */
    private sub86BA;
    /** $86EB (cmd1 分派): LDA $043D; JSR $C509 → 表 $86EE */
    private sub86EB;
    /** $8710 (cmd2 分派): LDA $043D; JSR $C509 → 表 $8713 */
    private sub8710;
    /** $813F: X ≥ $1F 特殊路径 — base[1]×12 + $AFAE 指针表, 返回 16bit 指针 */
    private sub813F;
    /**
     * $8B22: 队伍数据加载
     * asm $8B22-$8B93: 循环 $0B→$15 清零球员数据; 查 $BAB2 表得队伍
     * 数据指针; 读阵型/球员数; 循环配置球员数据; 调整 $0446
     */
    private sub8B22;
    /**
     * $8609: 阵型数据加载
     * asm $8609-$863E: 检查 $05FB; =0 则遍历 $0600 项阵型列表
     */
    private sub8609;
    /**
     * $8C06: 等级/属性设置
     * asm $8C06-$8C7E: 入口 A=$0441, X=$043B;
     * 检查阵型类型/队伍侧; 调 $8DC9 获取指针;
     * 读两字节判断; 遍历属性表
     */
    private sub8C06;
    /**
     * $8D58: OAM/精灵配置
     * asm $8D58-$8DC8: 入口 A=$0442, X=$043D;
     * A=0/$0B→$8DA6 路径; 否则按队伍侧/阵型类型分支
     */
    private sub8D58;
    /** $8DA6 路径 (A=0 或 A=$0B): 获取指针, 比较两字节 */
    private sub8DA6Path;
    /** $8DC9: 获取阵型数据指针 (公共子程) */
    private sub8DC9;
    /** $8C7F: 属性调整 — LDA $0047; SEC; SBC #$03; JSR $C509 (表 $8C84 32 项, 待翻译) */
    private sub8C7F;
    /** $863F: 阵型子程 — STA $0442; JSR $8A62; 查阵型表 */
    private sub863F;
    /**
     * $8A62: 查球员属性指针 (入口部分)。
     * asm $8A62-$8AA7: JSR $C50C; 读球员数据[0]; ≠0 则查 $8A9D 表算属性索引。
     */
    private sub8A62;
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
    private sub8663;
    /**
     * $868E: 阵型后续处理 — 入口是 $868E: LDY #$07 指令 (非 JSR 目标)。
     * asm $868E-$86B0:
     *   $868E: LDY #$07; $8690: JSR $8ADE  — sub8ADE(7, a), 返回 X=16bit 结果高字节
     *   $8693: CLC; LDA $003C; ADC #$AE; STA $003C
     *   $869A: TXA; ADC #$B8; STA $003D   — X 来自 sub8ADE 返回 (非调用方)
     *   $869F: JSR $8B0B; STA $043D; LDA #$00; STA $043E
     *   $86AA: LDA $003F; JSR $C509
     * @param a 入口 A (来自 $8AB3 返回值 / $8BBF 表值 / #$14 / #$10)
     */
    private sub868E;
    /**
     * $8AB3: 阵型属性设置 (查 $8B9E 表)。
     * asm (ROM 字节精确对位, 参考反汇编器错位 1 字节: $8ADD 是 RTS 非 STA $003E):
     *   LDA $0635; BPL $8ABA; EOR #$FF; TAX (X = ~$0635 if neg)
     *   LDA $0637; BPL $8AC2; EOR #$FF; TAY (Y = ~$0637 if neg)
     *   JSR $C539 (角度计算)
     *   LDX #$00; CMP $8B9E,X; BEQ $8AD1; INX; INX; BNE (查表)
     *   $8AD1: LDA $8B9F,X     — A = 表值
     *   $8AD4: LDX $003C; $8AD6: CPX #$01; $8AD8: BEQ $8ADD
     *   $8ADD: RTS             — X==$01 → A 原样返回 (BEQ 直达 RTS)
     *   $8ADA: CLC; $8ADB: ADC #$0C; RTS — X!=$01 → A+$0C 返回
     * 两条路径均 RTS 返回 A, 本子程不写 $003E。
     * $8ADE: STA $003E 是独立子程入口; 本子程返回的 A 被调用方
     * 用作 JSR $8ADE 的 aIn (sub868E/sub879C 内部 STA $003E)。
     * @returns A 值 ($8BBF,X 表值 或 +$0C)
     */
    private sub8AB3;
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
    private sub85B5;
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
    private sub875D;
    /**
     * $879C: $875D 的 $8AB3 后续路径 — 入口是 $879C: LDY #$04 指令。
     * asm $879C-$87BA (与 $868E 同构, Y=4, 偏移 $2E/$B1):
     *   $879C: LDY #$04; $879E: JSR $8ADE  — sub8ADE(4, a), 返回 X=16bit 结果高字节
     *   $87A1: CLC; LDA $003C; ADC #$2E; STA $003C
     *   $87A8: TXA; ADC #$B1; STA $003D   — X 来自 sub8ADE 返回
     *   $87AD: JSR $8B0B; STA $043B; LDA #$00; STA $043C
     *   $87B8: LDA $003F; JSR $C509
     * @param a 入口 A (来自 $8AB3 返回值 / $8BBF 表值 / #$14 / #$10)
     */
    private sub879C;
    private readIndirect;
    private writeIndirect;
    /** ROM 数据表映射: addr 落在表范围内 → 读具名表 (重叠区具体表优先) */
    private static readonly ROM_TABLES;
    private readMemByte;
}
export default MatchConfigService;

/**
 * MatchEngineService — bank26 比赛核心引擎 ($8000-$9FFF, 运行时 $A000-$BFFF)
 * @bank 26
 *
 * 职责: 比赛主循环、回合状态机、球员移动/传球/射门、比赛时钟。
 *   入口 $803E: 比赛主循环 (清状态 → JSR $C600 → 回合分派 → 球员行动 → 帧推进)。
 *   $8000-$803C: 跳转表 (12项 JMP, 各比赛子程入口)。
 *   $803E-$8127: 主循环 (回合推进/球员选择/行动分派)。
 *   $8127+: 回合结束/比赛结束处理。
 *
 * 代码量: code_main 981行 + code_sub 1065行 + code_data 1083行 = 3129行指令 (最大 bank)。
 * 消费方: bank00 (主循环调度) 切 bank26 执行比赛。
 *
 * 命名规范: 旧名 Bank26Service → 新名 MatchEngineService。
 */
import { DataStore } from '../../data/store/DataStore';
import type { GameSystemService } from '../system/GameSystemService';
export declare class MatchEngineService {
    protected _store: DataStore;
    protected _system: GameSystemService;
    constructor(store: DataStore, system: GameSystemService);
    protected rd(addr: number): number;
    protected wr(addr: number, v: number): void;
    /** 读 16 位指针 (小端 lo + (hi << 8)) */
    protected rdPtr(lo: number, hi: number): number;
    /** $800C: JMP $8835 — 比赛初始化 */
    matchInit(): void;
    /** $800F: JMP $87E1 — 回合开始 */
    turnStart(): void;
    /** $8012: JMP $888D — 球员选择 */
    playerSelect(): void;
    /** $8015: JMP $88A8 — 行动选择 */
    actionSelect(): void;
    /** $801E: JMP $8B4A — 比赛续行 */
    matchContinue(): void;
    /** $8021: JMP $8F72 — 回合推进 */
    turnAdvance(): void;
    /** $8024: JMP $8CA4 — 球员移动 */
    playerMove(): void;
    /** $8027: JMP $8127 — 回合结束 */
    turnEnd(): void;
    /** $802A: JMP $A1EB — 比赛结束 */
    matchEnd(): void;
    /** $802D: JMP $987B — 精灵更新 */
    spriteUpdate(): void;
    /** $8030: JMP $95E1 — 传球 */
    passBall(): void;
    /** $8033: JMP $8E86 — 射门 */
    shoot(): void;
    /** $8036: JMP $85AC — 盘带 */
    dribble(): void;
    /** $8039: JMP $904E — 抢断 */
    tackle(): void;
    /**
     * $803E 比赛主循环入口。
     * asm $803E-$8127:
     *   LDA #$00; STA $044E; STA $0621  ← 清状态
     *   JSR $C600 (bank30 初始化)
     *   LDA #$02; JSR $C54B (bank30 辅助)
     *   JSR $8F72 (回合推进)
     *   LDA $0600; BNE $805A  ← 检查回合数
     *   STA $0617; JMP $8127  ← 回合=0 跳结束
     *   $805A: JSR $8223 (回合初始化)
     *   设 ram_0616=0 (当前球员索引)
     *   算 ram_0617 (剩余球员数)
     *   循环: 选球员 → 查行动类型 → 分派(移动/传球/射门/盘带/抢断)
     *   每个球员行动后 INC $0616, 循环到所有球员行动完
     *   JSR $9085 (帧推进); JSR $C606 (协程让出)
     *   LDA $043B; JSR $C509 (查表) → 跳转表分派
     */
    mainLoop(frame: number): void;
    /**
     * $8074-$80DC: 球员行动循环。
     * 遍历所有球员, 查行动类型 ($060B,X), 按类型分派。
     */
    private playerActionLoop;
    /**
     * $80FE 跳转表: 5路比赛阶段分派。
     * $80FE: $8070/$8118/$811E/$8120/$8170
     */
    private phaseDispatch;
    /**
     * $8835: 比赛初始化 — 遍历球员, 逐个调用球员选择+行动选择
     * asm $8835-$888A
     */
    private sub8835;
    /**
     * $87E1: 回合开始 — 球员自动行动检测 (遍历10个球员)
     * asm $87E1-$8834
     */
    private sub87E1;
    /** $888D: 球员选择 — 查表+属性计算+行动后处理 */
    private sub888D;
    /** $88A8: 行动选择 — 查 $0612 分派, 读球员速度 */
    private sub88A8;
    /** $88BB: 读球员速度向量到 $0635/$0637 */
    private sub88BB;
    /** $88D5: 速度方向切换 */
    private sub88D5;
    /** $8B4A: 比赛续行 — 检查比赛状态, 重置回合, 调回合开始 */
    private sub8B4A;
    /** $8F72: 回合推进 — 计算球员位置 (角度+距离 → 坐标) */
    private sub8F72;
    /** $8CA4: 球员移动 — 检查位置边界, 决定移动方向 */
    private sub8CA4;
    /** $8127: 回合结束 — 调 $90DD, 清 $0617, 回主循环 */
    private sub8127;
    /** $A1EB: 比赛结束 — asm 地址超出 bank26 范围, 可能跨 bank */
    private subA1EB;
    /** $987B: 精灵更新 — 初始化精灵缓冲, 循环等待输入 */
    private sub987B;
    /** $95E1: 传球 — 球员选择 + 方向 + 传球动画 */
    private sub95E1;
    /** $8E86: 射门 — 检查条件, 设置射门参数, 跳转盘带 */
    private sub8E86;
    /** $85AC: 盘带 — 球员设置 + 精灵更新 + 清零球员数据 */
    private sub85AC;
    /** $904E: 抢断 — 检查 $044B, 清零球员数据 */
    private sub904E;
    /**
     * $8223: 回合初始化。
     * asm $8223-$8277:
     *   LDX #$00; LDA $0601,X (读球员方向); JSR $C50C (查 RAM 指针)
     *   LDY #$00; LDA ($0034),Y (读球员数据[0])
     *   CMP #$14; BEQ $823E (=$14 跳)
     *   CMP #$49; BEQ $823E (=$49 跳)
     *   INX; CPX $0600; BNE $8225 (循环所有球员)
     *   RTS
     *   $823E: LDA $043B; BNE $8277 (非队伍0跳)
     *   LDA $060B,X; BNE $8277 (行动类型非0跳)
     *   LDA $0606,X; CMP #$01; BNE $8277 (球员ID非1跳)
     *   $824F-$8274: 交换当前球员与最后球员的方向/行动/ID
     *     (把球员1放到最后, 让其最后行动)
     *   $8277: RTS
     */
    private sub8223;
    /**
     * $8176: 球员行动前处理。
     * asm $8176-$819B:
     *   LDX $043B (队伍索引); CPX #$02; BEQ $819B (队伍2=CPU跳过)
     *   LDA #$00; STA $062D (清标志)
     *   LDA $8278,X (查 $8278 表); JSR $C54E
     *   LDA $0444; AND #$03; STA $044E (取低2位)
     *   JSR $C624 (bank30 辅助)
     *   LDA $0617; ORA #$80; STA $0617 (设 bit7 = 行动前处理完成)
     *   $819B: RTS
     */
    private sub8176;
    /**
     * $8FF3: 球员行动执行。
     * asm $8FF3-$904D:
     *   LDA $05FB (比赛阶段); BNE $8FFB (非0跳)
     *   STA $003A; RTS (阶段0=直接返回)
     *   $8FFB: LDA #$00; STA $003A
     *   LDY #$00; LDA ($0034),Y (读球员数据[0])
     *   CMP #$20; BNE $902F (≠$20 跳)
     *   $9007: LDA $05FB; BNE $9018 (阶段非0跳)
     *   LDA $043B; BNE $9018 (队伍非0跳)
     *   LDA $043C; CMP #$03; BCS $902F (≥3跳)
     *   $9018: LDA $0440; LSR; TAX (X=$0440>>1)
     *   LDA $043F; ROR; CLC; ADC $043F; STA $043F ($043F = $043F*2+carry)
     *   TXA; ADC $0440; STA $0440 ($0440 = X + $0440 + carry)
     *   $902F: LDY #$01; SEC; LDA ($0034),Y (读[1])
     *   SBC $043F; TAX (X = [1] - $043F)
     *   INY; LDA ($0034),Y (读[2])
     *   SBC $0440; BPL $9047 (≥0 跳)
     *   $9040: LDX #$00; LDA #$00; SEC; ROR $003A (负数清零, $003A 移位)
     *   $9047: STA ($0034),Y (写回[2])
     *   DEY; TXA; STA ($0034),Y (写回[1])
     *   RTS
     *
     * 语义: 球员位置移动。$043F/$0440 是速度向量, 球员数据[1]/[2] 是位置。
     * 阶段0=不移动, 阶段非0=按速度更新位置。
     */
    private sub8FF3;
    /**
     * $8EE9: 属性查表 (球员位置 → 属性值)。
     * asm $8EE9-$8F1E:
     *   JSR $8D06 (球员位置读取)
     *   LDA $0071; LSR; LSR; STA $0619 ($0619 = $0071 >> 2)
     *   LDA $061D; STA $0070
     *   LDA $061C; ASL; ROL $0070 (×2) ×5 (共 ×32 = 左移5位)
     *   STA $006F
     *   JSR $C51E (bank30 除法: $006F/$0070 → A:Y)
     *   LDA $006F; LDY $0070; BEQ $8F1A
     *   LDA #$FF (除数为0 → $FF)
     *   $8F1A: LDX #$00; LDY #$00; RTS
     *
     * 语义: 球员位置 ($061C/$061D) 左移5位后除以 $0071>>2, 得属性索引。
     */
    private sub8EE9;
    /**
     * $8132: 行动后处理。
     * asm $8132-$814B:
     *   PHA (保存 A)
     *   LDA $043D (行动类型); ASL; ASL; TAX (×4)
     *   PLA (恢复 A)
     *   LDY #$00; CMP $828C,X; BCS $8145 (≥阈值跳)
     *   $813C: INY; INX; BNE $813C (循环查表)
     *   $8145: STY $0612 (存结果); RTS
     * 注: $828C 表 4 字节一组, 查 A 落在哪组
     */
    private sub8132;
    /**
     * $814C: 精灵更新检查。
     * asm $814C-$816E:
     *   BIT $0617; BMI $8154 (bit7=1 跳)
     *   JSR $8E33 (精灵位置更新)
     *   $8154: LDA #$00; JSR $C54E (bank30 辅助)
     *   LDA $0612; JSR $C509 (查表分派)
     *   跳转表 6 项: $8169/$819C/$81BC/$81D1/$81EA/$8BBA
     *   $816C: SEC; JMP $9095 (跳 $9095)
     */
    private sub814C;
    /**
     * $9085: 帧推进。
     * asm $9085-$908E:
     *   LDX $043B (队伍索引)
     *   LDA $908E,X (查 $908E 表, 8 项: $02,$01,$01,$04,$04,$01,$02,$08)
     *   JMP $C603 (跳 bank30 $C603 — H5 stub)
     */
    private sub9085;
    /**
     * $8170: 阶段4+ (bit7 检查)。
     * asm $8170-$8175:
     *   BIT $0617; BPL $8176 (bit7=0 → 跳 $8176 球员行动前处理)
     *   RTS (bit7=1 → 已处理, 直接返回)
     */
    private sub8170;
    /** $8070: 阶段0 — 无操作, 继续主循环 */
    private sub8070;
    /** $8118: 阶段1 — 重置栈指针, 跳 bank30 $C60F */
    private sub8118;
    /** $811E: 阶段2 — JSR $8170 后重置栈, 跳 bank30 $C621 */
    private sub811E;
    /** $8120: 阶段3 — JSR $90DD 后清 $0617, 回主循环 */
    private sub8120;
    /** $8169: 精灵组分派0 — JSR $8BBA; 位置减法; JMP $9095 */
    private sub8169;
    /** $819C: 精灵组分派1 — JSR $8BC8; CLC; JSR $9095; 清 $0600; JMP $8BDF */
    private sub819C;
    /** $81BC: 精灵组分派2 — JSR $8BC8; CLC; JSR $9095; JSR $C606; JSR $81ED; JMP $C60F */
    private sub81BC;
    /** $81D1: 精灵组分派3 — JMP $9366 */
    private sub81D1;
    /** $81EA: 精灵组分派4 — JMP $9366 */
    private sub81EA;
    /** $8BBA: 精灵组分派5 — 球员选择+查指针+调 $C4C8 */
    private sub8BBA;
    /** $8E33: 精灵位置更新 */
    private sub8E33;
    /**
     * $9095: 通用辅助 (SEC/CLC 入口)。
     * asm: LDA $043D; ASL; TAX; PLP; BCC; INX; LDA $90F4,X; ...
     */
    private sub9095;
    /** $8D06: 球员位置读取 (读 $0034 指针, 算 $061C/$061D) */
    private sub8D06;
    /** $8BC8: 精灵组辅助 (LDX #$03; LDA $0442; ...) */
    private sub8BC8;
    /** $81ED: 球员方向检查+速度设置 */
    private sub81ED;
    /** $8E6E: 方向设置 */
    private sub8E6E;
    /** $90DD: 帧推进辅助 */
    private sub90DD;
    /** $8CEA: 方向翻转 */
    private sub8CEA;
    private readMemByte;
    private writeMemByte;
}
export default MatchEngineService;

/**
 * MatchHudService — bank24 比赛 HUD 文本流渲染 + 精灵加载 ($8000-$9FFF, 运行时 $A000-$BFFF)
 * @bank 24
 *
 * 职责: 比赛 HUD (比分/时钟/体力条) 文本流渲染。
 *
 * 入口 (跳转表 $8000-$800D):
 *   $8000 → JMP $800F: 主 HUD 渲染循环
 *   $8003 → JMP $86F8: HUD 初始化
 *   $8006 → JMP $8779: 比分显示
 *   $8009 → JMP $87E6: 时钟显示
 *   $800C → JMP $8851: 体力条显示
 *
 * $800F 主渲染循环:
 *   $8010: BIT $063F; BPL $8017 (检查渲染开启)
 *   $8014: JMP $C512 (关闭则返回)
 *   $8017: LDA #$20; STA $005F; LDA #$92; STA $0060 (指针=$9220 HUD 脚本表)
 *   $801F: LDA $05EA; ASL; BCC $8027; INC $0060 (×2 查表, 进位加高字节)
 *   $8027: TAY; LDA ($005F),Y; TAX; INY; LDA ($005F),Y; STA $0060; STX $005F
 *     (查指针表得 HUD 脚本入口 → $005F/$0060)
 *   $8032: 清 $05E9/$05E5/$05E4/$05F4 (渲染状态)
 *   $8040: LDA #$01; STA $05E3 (设激活)
 *   $8045: LDA #$01; JSR $C515 (协程让出 1 帧)
 *   $804A: JSR $8053 (渲染分派)
 *   $804D: JSR $C560 (帧结束)
 *   $8050: JMP $8045 (循环)
 *
 * $8053 渲染分派:
 *   $8053: LDA $05E3; BNE $8059 (激活?)
 *   $8058: RTS (未激活返回)
 *   $8059: LDA $05E9; BEQ $8062 (延迟计数)
 *   $805E: DEC $05E9; RTS (递减延迟)
 *   $8062: LDA $05E4; JSR $C509 (查命令索引)
 *   $8068: 跳转表 4 项: $806E/$82F2/$82AC/$E505
 *   $8071: INC $05E5; LDA ($005F),Y (读脚本字节)
 *   $8076: CMP #$F0; BCC $8080 (< $F0 = 延迟值)
 *   $807A: JSR $8087 (≥ $F0 = 命令分派)
 *   $807D: JMP $806E (继续)
 *   $8080: STA $05E9 (存延迟); INC $05E4; RTS
 *
 * $8087 命令分派 (查 $808B 跳转表):
 *   AND #$0F; JSR $C509; 跳转表 6 项:
 *   $8098/$80A0/$80B5/$80B8/$80CB/$81FD
 *
 * RAM 关键:
 *   $005F/$0060: HUD 脚本指针
 *   $05E3: 激活标志
 *   $05E4: 命令索引
 *   $05E5: 字节计数
 *   $05E9: 延迟计数
 *   $05EA: HUD 索引 (查 $9220 表)
 *   $063F: 渲染开启标志 (bit7)
 *
 * 命名规范: 旧名 Bank24HudService → 新名 MatchHudService。
 */
import { DataStore } from '../../data/store/DataStore';
import type { GameSystemService } from '../system/GameSystemService';
export declare class MatchHudService {
    protected _store: DataStore;
    protected _system: GameSystemService;
    /** 跨子程进位标志 (对应 6502 carry, 由 sub8513/sub8534 传递) */
    protected _carry: boolean;
    /** 6502 A 寄存器 (跨子程传递) */
    protected _ra: number;
    /** 6502 X 寄存器 (跨子程传递) */
    protected _rx: number;
    /** 6502 Y 寄存器 (跨子程传递) */
    protected _ry: number;
    /** 6502 Z 标志 (sub8C9F 返回) */
    protected _rz: number;
    /** HUD 脚本流中止标志 (对应 asm 中 PLA PLA RTS 弹出返回地址的行为) */
    protected _hudStop: boolean;
    constructor(store: DataStore, system: GameSystemService);
    protected rd(addr: number): number;
    protected wr(addr: number, v: number): void;
    protected rdPtr(lo: number, hi: number): number;
    protected wrPtr(lo: number, hi: number, v: number): void;
    /** $8000 → $800F: 主 HUD 渲染循环 */
    hudRenderLoop(): void;
    /** $8003 → $86F8: HUD 初始化 */
    hudInit(): void;
    /** $8006 → $8779: 比分显示 */
    scoreDisplay(): void;
    /** $8009 → $87E6: 时钟显示 */
    clockDisplay(): void;
    /** $800C → $8851: 体力条显示 */
    staminaBarDisplay(): void;
    render(frame: number): void;
    private sub800F;
    private sub8053;
    private sub8087;
    /** $8098: 命令0 — 结束渲染 (清 $05E3) */
    private sub8098;
    /**
     * $80A0: 命令1 — 等待帧循环 (轮询 $001C bit7)
     * asm: LDA #$01; JSR $C515; LDA $001C; BPL $80A0; 清 $05E9; INC $05E4; PLA PLA RTS
     */
    private sub80A0;
    /** $80B5: 命令2 — 尾调用 $C52D */
    private sub80B5;
    /**
     * $80B8: 命令3 — 指针跳转 (从脚本流读 2 字节指针)
     * asm: LDY $05E5; LDA ($005F),Y; TAX; INY; LDA ($005F),Y; STA $0060; STX $005F; 清 $05E5
     */
    private sub80B8;
    /**
     * $80CB: 命令4 — 子表跳转 (查 $80EA 子表后跳转)
     * asm: LDY $05E5; LDA ($005F),Y; JSR $80EA; TXA; ASL; SEC; ADC $05E5; TAY;
     *   读 2 字节指针; 设新指针; 清 $05E5
     */
    private sub80CB;
    /**
     * $80EA: 子表索引分派 (被 $80CB 调用, 返回 X)。
     * asm $80EA: JSR $C509; 跳转表 $80ED 8 项:
     *   $80FD/$8106/$810E/$811E/$8122/$8138/$81CE/$81E4
     * 各目标子程计算 X (精灵组/属性索引) 后 RTS, 调用方 TXA 取 X。
     */
    private sub80EA;
    /**
     * $81FD: 命令5 — NT 填充 + 读延迟
     * asm: JSR $C52D; LDA #$0D; STA $05F3; LDA #$80; STA $05F4;
     *   LDY $05E5; LDA ($005F),Y; STA $05E9; INC $05E5; PLA PLA RTS
     */
    private sub81FD;
    /**
     * $86F8: HUD 初始化 — 读 $0532 标志, 查 $AD6E 指针表,
     *   处理精灵属性数据流 ($046F 区), 调 $C533 NT 刷新。
     */
    private sub86F8;
    /** $8723-$8776: HUD 初始化数据处理循环 */
    private hudInitProcess;
    /**
     * $8779: 比分显示 — 读 $0534 标志, 查 $AD1C 指针表,
     *   处理比分数据 ($0490/$0491 VRAM 地址)。
     */
    private sub8779;
    /** $87A4-$87E3: 比分显示数据处理循环 */
    private scoreDisplayProcess;
    /**
     * $87E6: 时钟显示 — 读 $0536 标志, 查 $AD54 指针表,
     *   处理时钟数据 ($0538 值)。
     */
    private sub87E6;
    /** $8815-$884E: 时钟显示数据处理循环 */
    private clockDisplayProcess;
    /**
     * $8851: 体力条显示 — 查 $B3CF/$B3BD 表, 渲染体力条精灵。
     */
    private sub8851;
    /** $88B9: 体力条精灵渲染子程 */
    private sub88B9;
    private sub82F2;
    private sub835E;
    /** $83A4: cmd0 — 球员状态查表 (查 $83BF 表) */
    private hE0;
    /** $83CA: cmd1 — 球员方向查表 (查 $83DC 表) */
    private hE1;
    /** $83E2: cmd2 — 球员状态条件写入 (复杂分支) */
    private hE2;
    private hE2_83FB;
    private hE2_8413;
    /** $8443: cmd3 — 球员方向条件写入 */
    private hE3;
    /** $8467: cmd4 — 球员1名字写入 */
    private hE4_4467;
    /** $846D: cmd5 — 比赛阶段EOR写入 */
    private hE5_846D;
    /** $8475: cmd6 — 比赛阶段+队伍写入 */
    private hE6_8475;
    /** $8478: 通用 — 队伍分数+0x76 写入 */
    private sub8478;
    /** $848D: cmd7 — $0600 数字写入 */
    private hE7_848D;
    /** $8493: cmd8 — $0601 数字写入 */
    private hE8_8493;
    /** $8499: cmd9 — $0602 名字写入 */
    private hE9_8499;
    /** $849F: cmd10 — $0603 名字写入 */
    private hE10_849F;
    /** $84A5: cmd11 — $05FC 名字写入 */
    private hE11_84A5;
    /** $84AB: cmd12 — $043D 查 $84C7 表写入 */
    private hE12_84AB;
    /** $84CE: cmd13 — 比赛阶段EOR名字写入 */
    private hE13_84CE;
    /** $84D6: cmd14 — $0442 名字写入 */
    private hE14_84D6;
    /** $84DC: cmd15/16 — $0616 右移+0x34 数字写入 */
    private hE15_84DC;
    /** $84E6: cmd17 — $002A+0x76 (检查$24) */
    private hE17_84E6;
    /** $84EC: cmd18 — $002B+0x76 (检查$24) */
    private hE18_84EC;
    /** $84FB: cmd19 — 球员1查 $852C 表后调 $8534 */
    private hE19_84FB;
    /** $8507: cmd20 — 球员2查 $852C 表后调 $8534 */
    private hE20_8507;
    /** $85BB: cmd23 — 重复写 0x7C tile (N 次) */
    private hE23_85BB;
    /** $85D6: cmd28 — 中止脚本流 (PLA PLA RTS) */
    private hE28_85D6;
    /** $85FE: cmd30 — 等待帧 (循环到 $05E3 bit7 置位) */
    private hE30_85FE;
    /** $8621: cmd31 — 停止 HUD (LDA #$00; STA $05E3; PLA PLA RTS) */
    private hE31_8621;
    /** $8629: NT 写入 (LDX $003A; STA $04A8,X; LDX $003B; TYA; STA $04A8,X; INC $003A/$003B) */
    private sub8629;
    /** $863C: 字符串写入 (JSR $C53C 设 $0030; 循环读 ($0030),Y 写 NT) */
    private sub863C;
    /** $8653: 球员名写入 (STA $003D; JSR $C50C; 读 ($0034),Y; BEQ→查 $8686 表) */
    private sub8653;
    /** $86B2: 数字写入 (ADC #$33; JMP $8629) */
    private sub86B2;
    /** $C53C: 设 $0030/$0031 = $05EE (名字缓冲) — H5 port */
    private _fixedC53C;
    /** $8513: 球员 ID 查 $852C 表 (8项), 返回 carry + $003D */
    private sub8513;
    /** $8534: 球员名查 $8589 指针表 + 字符串写入 */
    private sub8534;
    /** $8918: 体力条精灵组渲染 (查 $8D9E/$8D9F/$8DA0 表写 $04A8) */
    private sub8918;
    /** $8949: 精灵属性循环 (读 ($0050),Y 分派 $8986) */
    private sub8949;
    /** $8976: 精灵属性循环结束 */
    private sub8949End;
    /** $8986: 精灵属性数据读取 (读 ($0050),Y 设 $003D/$003E/$003F; 循环 ($003E),Y) */
    private sub8986;
    /** $89B4: 命令分派 (SEC; SBC #$E0; 查 ~60 项跳转表) */
    private sub89B4;
    private hD0_89FA;
    private hD1_8A00;
    private hD2_8A06;
    private hD3_8A0C;
    private hD4_8A12;
    private hD5_8A22;
    private hD9_8A40;
    private sub8A43_8A56;
    private hDA_8A43;
    private hDB_8A58;
    private hDC_8A86;
    private hDD_8A90;
    private hDE_8A95;
    private hDF_8AAC;
    private hE0_8AB2;
    private hE1_8ABB;
    private hE2_8AC2;
    private hE3_8AD6;
    private hE4_8ADC;
    private hE5_8AE4;
    private hE6_8AEB;
    private hE7_8B0A;
    private hE8_8B31;
    private hE9_8B48;
    private hEA_8B87;
    private hEB_8BD6;
    private hEF_8BF0;
    private hF0_8C06;
    private hF1_8C47;
    private hF2_8C4A;
    private hF4_8CA5;
    /** $8C55: 数字→tile 写入 (16位除10循环) */
    private sub8C55;
    /** $8C7A: 余数→tile (CLC; ADC #$33; JSR $8C85) */
    private sub8C7A;
    /** $8C85: NT 写入 (LDX $003D; DEC $003C; BNE→STA $04A8,X; INC $003C) */
    private sub8C85;
    /** $8C9F: NT 写入 + INC $003D (JSR $8C85; INC $003D; RTS) */
    private sub8C9F;
    /** $8CA5: 球员名条件写入 (读 ($003E),Y; BNE→查表; BEQ→$C50C+$8C55) */
    private sub8CA5;
    /** $8CDC: 球员名查 $8D04 表写入 (JSR $C50C; 读 ($0034),Y; BNE→$8D6C) */
    private sub8CDC;
    /** $8D1A: 球员名写入 (JSR $C50C; 读 ($0034),Y; BNE→$8D6C; 查 $8D40 表) */
    private sub8D1A;
    /** $8D6C: 字符串写入循环 (JSR $C53C; 读 ($0030),Y; CMP #$E0; BCS→exit; JSR $C524; JSR $8C9F; INY) */
    private sub8D6C;
    /** $C51E: 16位除法 ($006F/$0070 ÷ $0071, 商→$006F/$0070, 余数→$0072) — H5 port */
    private _fixedC51E;
    private readMemByte;
    /** 读 bank24 ROM 数据字节 (通过 DataStore KV 'bank24_rom') */
    private readRomByte;
}
export default MatchHudService;

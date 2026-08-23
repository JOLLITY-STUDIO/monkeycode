/**
 * AudioService — NES APU 音频引擎 (bank12)
 * @bank 12 ($8000-$9FFF, MMC3 R6 可切)
 *
 * 职责: BGM/SE 播放请求, 通道状态管理, 帧推进 (APU 寄存器 $4000-$4017 写入)。
 *
 * asm 结构:
 *   code_main.s $8000-$8252: 主入口 (BGM/SE 请求分派, 帧推进主循环)
 *   code_sub.s  $8253-$84A2: 音符解析/音高计算/包络/振动等子程
 *   code_data.s $84A3-$8BFF: 内联数据 + 通道初始化/音符表查询
 *
 * RAM 布局 ($0700-$07FF 音频专用区):
 *   $0700-$0705: BGM/SE 请求队列 (6 项)
 *   $0706: 通道使能位掩码 (bit0-3 = 方波1/2+三角+噪音)
 *   $0707-$070A: 各通道音符计数器
 *   $0727-$07FF: 通道参数区 (每通道 16 字节, 共 8 通道)
 *   $07A7-$07B7: 音高偏移/频率低字节
 *   $07BF-$07C7: 频率高字节/音色索引
 *   $07CF-$07DF: 包络衰减计数器
 *   $07E0-$07E8: APU 寄存器缓存 ($4003/$4007 等)
 *   $07E9: BGM 播放标志
 *   $07EA-$07F4: 通道状态标志
 *   $07FC: 当前 BGM bank 选择 ($07/$0D/$0E/$0F)
 *
 * APU 寄存器映射:
 *   $4000/$4004/$400C: 方波1/2/噪音 控制 (包络+占空比)
 *   $4001/$4005/$400D: 方波1/2/噪音 扫描
 *   $4002/$4006/$400E: 频率低字节
 *   $4003/$4007/$400F: 频率高字节+长度计数器
 *   $4008/$400A/$400B: 三角波控制/频率
 *   $4015: 通道使能
 *   $4017: 帧 IRQ 控制
 *
 * 数据来源: bank13/14/15 (纯数据 bank, BGM 乐谱 + 音色表)
 */
import { DataStore } from '../../data/store/DataStore';
/**
 * SE (音效) 指针表 (原 bank12 $8BDA, 8 项 × 2byte LE)。
 * 每项指向 bank12 内的 SE 数据块。
 * 由 ROM dump (bank12 偏移 0x0BDA) 提取。
 * TODO: 从 ROM 填充真实指针
 */
export declare const SE_POINTER_TABLE: Readonly<Record<number, number>>;
/**
 * BGM bank 选择表 (原 bank12 $0700 区逻辑)。
 * $07FC 值 → BGM 数据组索引 (非直接 bank 号)。
 * bank12 自身不切 bank, 由外部 (bank30/NMI) 根据 $07FC 切 R7 bank。
 *
 * tsnes 实测 (开场+比赛 3900帧):
 *   R6 ($8000): bank 0, 12 (bank12 = 音频引擎)
 *   R7 ($A000): bank 0, 2, 3, 6, 7, 8, 9, 10, 15
 *   bank 13/14/17/18 未加载 (可能用于特定 BGM 曲目)
 */
export declare const BGM_BANK_TABLE: Readonly<Record<number, number>>;
/**
 * BGM 数据映射 (ID → bank + 描述)。
 * bank13/14/15 是纯数据 bank, 各含 BGM 乐谱数据。
 */
export declare const BGM_DATA_MAP: Readonly<Record<number, string>>;
/** APU 通道枚举 */
export declare enum ApuChannel {
    PULSE1 = 0,// 方波1 ($4000-$4003)
    PULSE2 = 1,// 方波2 ($4004-$4007)
    TRIANGLE = 2,// 三角波 ($4008-$400B)
    NOISE = 3,// 噪音 ($400C-$400F)
    DPCM = 4
}
export declare class AudioService {
    protected _store: DataStore;
    constructor(store: DataStore);
    protected rd(addr: number): number;
    protected wr(addr: number, v: number): void;
    protected rdPtr(lo: number, hi: number): number;
    protected wrPtr(lo: number, hi: number, v: number): void;
    /** 写 APU 寄存器 (通过 DataStore KV 'apu_XXXX') */
    protected wrApu(addr: number, v: number): void;
    protected rdApu(addr: number): number;
    /**
     * 主入口: 处理 BGM/SE 请求队列。
     * asm $8000: 遍历 $0700[0-5], 按 ID 范围写 $07FC, 调 $805E 播放。
     * @return true = 有请求被处理
     */
    requestPlay(id: number): boolean;
    /**
     * $805E-$80B7: BGM 请求处理 (遍历 $0700[5], 检查 ID 范围)。
     * asm: LDX #$05; LDY $0700,X; BEQ $80B7 (无请求跳);
     *   CPY #$72; BCS $80B7; CPY #$31; BNE $80AF;
     *   $31 特殊: 设 $07DF/$07CF 等 = $19, $07D0/$07D4 = $0A;
     *   $80AF: JSR $8349 (通道初始化); 清 $0700,X
     */
    protected sub805E(): void;
    /**
     * 帧推进: 遍历所有通道, 更新音符计数器, 写 APU 寄存器。
     * asm $80BA: 设 $00F0/$00F1 = $0727 (通道参数基址);
     *   $00F2 = 0 (通道索引); $00F3 = 8 (通道数);
     *   $80CA: LDA $0706 (使能位); LSR; BCC $80D2 (禁用跳);
     *     ORA #$80; STA $0706; BCC $810C
     *   $80D7: LDX $00F2; DEC $0707,X (音符计数器-1); BNE $80E1
     *     JSR $83CB (音符结束处理); 重新读音符数据
     *   $80E1: DEC $0709,X (包络计数器-1); BNE $8109
     *     读包络数据, 设 $0709/$070A; JSR $81DB (音高计算)
     *   $8109: JSR $81DB (音高更新)
     *   $810C: $00F0 += $10; $00F2 += 4; DEC $00F3; BNE $80CA
     *   $811D: 第二阶段 (8 通道 × $40 步长, $00F2 递减)
     */
    update(): void;
    /** $80CA-$811B: 阶段1 单通道更新 */
    protected _phase1Loop(): void;
    /** $811D-$8162: 阶段2 (步长 $40, $00F2 递减) */
    protected _phase2Loop(): void;
    /**
     * $816E: APU 寄存器写入 (按通道索引写 $4000/$4004/$400C 等)。
     * asm: LDA #$03; EOR $00F2; ASL; ASL; TAX (X = (3 ^ $00F2) × 4)
     *   LDY #$06; LDA ($00F0),Y (读通道参数[6]); PHA
     *   LDA $00F2; STA $00FB; CMP #$01; BNE $8189
     *   $01 通道: PLA; AND #$0F; ORA #$80; BNE $81A4
     *   其他: PLA; ORA #$30; STA $4000,X (控制寄存器)
     *   LDA #$10; LDY #$05; AND ($00F0),Y; BNE $81A7
     *   LDA #$08; LDY $00FB; STA $07E4,Y; STA $4001,X (扫描)
     *   JMP $81B1
     *   $81A4: STA $4000,X
     *   $81A7: LDY #$08; LDA ($00F0),Y; BPL $81DA
     *     AND #$7F; STA ($00F0),Y
     *   LDY #$07; LDA ($00F0),Y; STA $4002,X (频率低)
     *   INY; LDA ($00F0),Y; ORA #$18
     *   LDY $00FB; BEQ $81CA; CPY #$01; BEQ $81CA
     *   CMP $07E0,Y; BEQ $81DA (与缓存相同跳)
     *   STA $4003,X (频率高+长度); STA $07E0,Y (缓存)
     *   LDA $07E4,Y; BNE $81DA
     *   LDA #$00; STA $07E0,Y
     *   RTS
     */
    protected sub816E(): void;
    /**
     * $81DB: 音高计算 (读包络, 算频率偏移, 写通道参数)。
     * asm $81DB-$8252:
     *   LDY #$05; LDA ($00F0),Y; TAX; AND #$F0; STA $00F6
     *   AND #$20; BEQ $81EE (bit5=振动标志)
     *   LDA #$0F; STA $00F7; BNE $8233
     *   $81EE: TXA; AND #$0F; STA $00F7 (包络值)
     *   LDY $00F3; DEY; LDX $07CF,Y; BEQ $8233
     *   DEX; TXA; STA $07CF,Y; BNE $8233
     *   LDA $00F7; CLC; ADC #$01; CMP #$0F; STA $00F7; BNE $8217
     *   LDA #$00; STA $07D7,Y; LDA #$80; STA $07E8
     *   $8217: LDA $00F7; ORA $00F6; TAX; LDY #$05; STA ($00F0),Y
     *   TXA; AND #$0F; STA $00F7; LDY $00F3; DEY; LDX $07CF,Y
     *   BNE $8233; LDA $07D7,Y; STA $07CF,Y
     *   $8233: LDX $00F2; LDA $070A,X; SEC; SBC $00F7; BPL $823F
     *   LDA #$00; ORA $00F6; LDY #$06; STA ($00F0),Y
     *   LDX $00F3; DEX; LDA $07AF,X; CMP #$01; BEQ $8257; CMP #$02; BNE $8256
     */
    protected sub81DB(): void;
    /**
     * $8257: 音符事件分派 (查 $8269 跳转表)。
     * asm: LDA $07C7,X; ASL; TAY; LDA $8269,Y; STA $00F9;
     *   LDA $826A,Y; STA $00FA; JMP ($00F9)
     */
    protected sub8257(): void;
    /** $827D: 音符频率设置 (+0 偏移) */
    protected sub827D(): void;
    /** $8297: 音符频率设置 (+2 偏移) */
    protected sub8297(): void;
    /** $82B4: 音符频率设置 (-1 偏移) */
    protected sub82B4(): void;
    /** $82C9: 音符频率设置 (-2 偏移) */
    protected sub82C9(): void;
    /** $82A4: 通道计数器递增 + 环绕 */
    protected sub82A4(): void;
    /** $82D2: 音符事件分派2 (查 $82E4 表) */
    protected sub82D2(): void;
    /** $82F4: 音符频率 (+3 偏移) */
    protected sub82F4(): void;
    /** $8309: 音符频率 (+6 偏移) */
    protected sub8309(): void;
    /** $830E: 音符频率 (直接设) */
    protected sub830E(): void;
    /** $831B: 通道计数器递增 + 环绕 (上限 8) */
    protected sub831B(): void;
    /** $832B: 音符频率 (-3 偏移) */
    protected sub832B(): void;
    /** $8340: 音符频率 (-6 偏移) */
    protected sub8340(): void;
    /**
     * $8349: BGM/SE 通道初始化。
     * asm $8349-$83CA:
     *   STX $00F5; LDA #$00; STA $0700,X; DEY; TYA; ASL; TAY
     *   LDA $8BDA,Y; STA $00F0; LDA $8BDB,Y; STA $00F1 (查 SE 指针表)
     *   LDY #$00; LDA ($00F0),Y; BPL $836C (负值=结束)
     *   LDX #$0F; STX $4015 (启用所有通道); LDX $00F5; RTS
     *   $836C: STA $00F4; LDA #$08; SBC $00F4; TAX
     *   清零通道参数区 ($07A7/$07AF/$07E3/$07E2/$07EA/$07CF/$07D7/$07DF/$07F4/$07E8)
     *   LDA $00F4; ASL×4; TAX; INY; LDA ($00F0),Y; STA $0727,X
     *   INY; LDA ($00F0),Y; STA $0728,X
     *   LDA #$00; STA $072C,X; LDA #$0F; STA $0730,X
     *   LDA $00F4; ASL×2; TAX; LDA #$01; STA $0707,X
     *   LSR; LDX $00F4; ROL; DEX; BPL $83BE; ORA $0706; STA $0706
     *   INY; BPL $8360 (循环读通道参数)
     */
    protected sub8349(id: number): void;
    /**
     * $83CB: 音符结束处理 (读下一音符数据)。
     * asm $83CB-$83EB:
     *   LDA #$CF; LDY #$05; AND ($00F0),Y; STA ($00F0),Y (清 bit6/7)
     *   LDY #$00; LDA ($00F0),Y; STA $00F4; INY; LDA ($00F0),Y; STA $00F5
     *   DEY; LDA ($00F4),Y; BPL $8404 (负值=控制字节)
     *   INY; CMP #$E0; BCC $83ED; JSR $84C9 (≥$E0 跳转)
     *   CMP #$B0; BCC $83F4 (≥$B0 跳)
     *   INY; BPL $83DF (循环)
     *   $83F4: AND #$3F; TAX; LDA $8725,X (查音符表)
     *   LDX $00F2; STA $0707,X; STA $0708,X; BPL $83DF
     */
    protected sub83CB(): void;
    /**
     * $84C9: 扩展命令分派 (查 $84DA 跳转表)。
     * asm: AND #$1F; ASL; TAX; LDA $84DA,X; STA $00F6;
     *   LDA $84DB,X; STA $00F7; JMP ($00F6)
     */
    protected sub84C9(data: number): void;
    /**
     * $84A3: 通道参数写入 (设 $07BF,X + 清标志)。
     * asm: STA $07BF,X; LDX $00F3; DEX; LDA #$00; STA $07F4,X
     *   LDA $07EA,X; BNE $84C0; LDX $00F2; LDA #$01; STA $0709,X
     *   LDA #$00; LDY #$04; STA ($00F0),Y
     *   $84C0: LDX $00F2; LDA $0708,X; STA $0707,X; RTS
     */
    protected sub84A3(a: number): void;
    /**
     * $851A: 全部停止 (清 $07F2/$0700-$0705)。
     * asm: LDA #$00; STA $07F2; STA $0700-$0705; RTS
     */
    stopAll(): void;
    /**
     * $8533: 单通道停止 (清 $07EA,X)。
     * asm: LDX $00F3; DEX; LDA #$00; STA $07EA,X; RTS
     */
    protected sub8533(): void;
    /**
     * $853D: 设通道音量 (LDA #$0F; STA $07EA,X 等)。
     * asm: LDX $00F3; DEX; LDA #$0F; STA $07EA,X; ...
     */
    protected sub853D(): void;
    /** 重新加载包络数据 (从 $00F0 指针读) */
    protected _reloadEnvelope(x: number): void;
}
export default AudioService;

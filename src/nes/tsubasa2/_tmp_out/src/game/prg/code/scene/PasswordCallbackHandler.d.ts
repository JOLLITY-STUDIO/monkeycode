/**
 * PasswordCallbackHandler — 密码界面回调处理器
 * @bank 02 ($A000-$BFFF 窗口)
 *
 * 职责: 密码界面渲染 ($84C1-$8559, NMI 回调 idx 0),
 *       密码→数据解码校验 ($82E8-$8335, NMI 回调 idx 23)。
 *
 * 被 BootRouter.resetEntry 在 idx 0/23 时调用, 不独立分发。
 */
import { DataStore } from '../../data/store/DataStore';
export declare class PasswordCallbackHandler {
    protected _store: DataStore;
    /** 假名网格 CHR tile 集合长度 (100 字节, asm $58-$70) */
    static readonly GRID_TILE_COUNT = 100;
    constructor(store: DataStore);
    protected rd(addr: number): number;
    protected wr(addr: number, v: number): void;
    /**
     * $9FA8 waitCounter — 等待 vblank 帧边界 (bank00 $9FA8)。
     * asm: STA $0019 (存帧数到 ram_0019); 压栈寄存器; 挂起协程 → 帧调度恢复。
     * 翻译版: 帧同步由外部帧循环驱动, 此处写 ram_0019 (帧数, 语义占位)。
     * @param frames 等待帧数 (A 寄存器, asm 传入)
     */
    protected waitCounter(frames?: number): void;
    /**
     * $9A35 renderRefresh — 渲染刷新 + 渐隐初始化 (bank00 $9A35)。
     * asm: JSR $9B07 (NT 刷新); JSR $9AB8 (OAM 刷新); JSR $9ADA (调色板刷新);
     *      LDX $00E9; JSR $C4B9 (切 bank); LDA #$0F; STA $004A; STA $004B; JMP $9A71 (渐隐)
     * 翻译版: NT/OAM/调色板刷新由 PpuSync 驱动, 此处设渐隐计数器。
     */
    protected renderRefresh(): void;
    /**
     * $9A0D clearScreen — 清屏 (bank00 $9A0D)。
     * 翻译版: 清 OAM + NT。
     */
    protected clearScreen(): void;
    /**
     * $890C spriteBlink — 精灵闪烁 (bank02 $890C)。
     * asm: 切换精灵可见性 (ram_001B bit0 交替)。
     * @param val 闪烁值 (A 寄存器)
     */
    protected spriteBlink(val: number): void;
    /**
     * $8920 drawFrame — 画帧 (bank02 $8920)。
     * asm: 两次 ppuFill ($2000/$2400 区) + OAM 清除。
     * @param _frameId 帧编号 (A 寄存器, 未被子程使用)
     */
    protected drawFrame(_frameId: number): void;
    /** ppuFill 辅助: 填 NT 区 rows 行 × cols 列 */
    private ppuFill;
    /**
     * $98EA ppuFillByte — 用指定值填 NT 区 (bank00 $98EA)。
     * @param fill 填充值 (A 寄存器)
     * @param baseAddr NT 基址 (ram_00E6/00E7)
     * @param rows 行数 (Y 寄存器)
     * @param cols 列数 (X 寄存器)
     */
    protected ppuFillByte(fill: number, baseAddr: number, rows: number, cols: number): void;
    /**
     * $99F0 / $98A0 / $9B7F — 清屏/OAM 清除 (bank00)。
     * 翻译版: 委托给 clearScreen。
     */
    protected clearAll(): void;
    /**
     * $8AF7 sceneLoad — 场景装载 (bank00 $8AF7)。
     * 翻译版: 写 ram_00ED + 清状态 (跨 service, 此处仅写场景索引)。
     * @param sceneId 场景 ID (A 寄存器)
     */
    protected sceneLoad(sceneId: number): void;
    /**
     * 渲染密码界面 (对应原始 $84C1-$8559)。
     *
     * asm 流程:
     *   $84C1: JSR $9A0D (清屏)
     *   $84C4: LDA #$10; JSR $9FA8 (等 16 帧)
     *   $84C9: LDY #$30; 循环 48 次: LDA #$01; JSR $9FA8 (等 1 帧); JSR $890C (精灵闪烁); DEY; BNE
     *   $84D8: 清 ram_005B/007B
     *   $84DE: LDA #$17; JSR $8AF7 (装载密码场景 0x17)
     *   $84E3: ram_0044=0x68; LDA #$03; JSR $8920 (画帧 3)
     *   $84EC: ram_0090=ram_008E; ram_0091=ram_008F
     *   $84F4: LDA #$04; JSR $9FA8 (等 4 帧)
     *   $84F9: JSR $9A35 (渲染刷新); JSR $88FB (OAM 拷贝)
     *   $84FF: 循环: LDA #$01; JSR $9FA8; INC $0079; DEC $007C×2; ram_0044-=2;
     *          CMP #$03; BCS $84FF (ram_0044 >= 3 时循环)
     *   $8515: LDA #$00; JSR $8920 (画帧 0)
     *   $851A: ram_001B |= $01
     *   $8520: LDA #$F0; JSR $9FA8 (等 240 帧)
     *   $8525: LDA #$3C; JSR $9FA8 (等 60 帧)
     *   $852A: ram_001B &= $FE
     *   $8530: ram_0090=0; ram_0091=2
     *   $8538: JSR $99F0; JSR $9B7F; JSR $98A0 (清屏/OAM/NT)
     *   $8541: ram_00E6=$C0; ram_00E7=$23; LDY #$02; LDX #$20; LDA #$55; JSR $98EA (填 $23C0 区 2×32 = $55)
     *   $8552: LDA #$01; JSR $8920 (画帧 1)
     *   $8557: LDA #$02; RTS (返回分支 2)
     */
    render(): number;
    /**
     * $88FB oamCopy — OAM 拷贝 (bank02 $88D0/$88FB)。
     * 把工作精灵表 $0468 拷贝到 OAM $0200。
     */
    protected oamCopy(): void;
    /**
     * 密码→数据解码 (对应原始 $82E8-$8335)。
     *
     * asm 流程:
     *   $82E8: LDA $57; BMI $8338 (bit7=1 跳到密码分支)
     *   $82EC: STA $00ED (存 ram_0057 值到 ram_00ED)
     *   $82EE: LDA #$00; LDY #$FA; 循环 STA $FFEC,Y (清 $05E6-$05EB 区 6 字节)
     *   $82FA: LDA #$01; JSR $9FA8 (等 1 帧)
     *   $82FD: LDY $00ED
     *   $82FF-$8333: 密码解码循环 (5 次, ram_00EC 从 0 步进 3 到 0x0F):
     *     LDA #$00; STA $00EC; TYA; AND #$0F; LSR; TAX
     *     LDA $AADF,Y; CLC; ADC $00E6,X; STA $00E6,X (低字节累加, 增量=tbl[Y])
     *     LDX $00EC; LDA $AAE0,Y; ADC $007A,X; STA $007A,X (高字节累加, 增量=tbl[Y+1], 表重叠 1 字节)
     *     LDA $AAE0,Y; BPL $8322 (bit7=0 跳过符号扩展)
     *     LDA #$FF; BNE $8324 (bit7=1 符号扩展 $FF)
     *     $8322: LDA #$00; ADC $007B,X; STA $007B,X (进位累加)
     *     INY; INY; ram_00EC += 3; CMP #$0F; BNE $8303 (循环 5 次)
     *   $8335: JMP $A2F8 (跳到后续处理)
     *
     * 位置增量表 $AADF (16 字节, 2026-08 已校准):
     *   $10,$00,$10,$00,$40,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00,$00
     * Y=0/2/4/6/8 时 LO=tbl[Y]=$10/$10/$40/$00/$00, HI=tbl[Y+1]=$00 (全零, 无符号扩展)。
     *
     * 密码输入通过 OAM 精灵选择假名 (由其他 NMI 回调处理), 不是字符串。
     * 此方法读 ram_0057 (密码种子) 做解码, 不接收字符串参数。
     */
    check(): boolean;
}
export default PasswordCallbackHandler;

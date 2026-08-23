/**
 * PlayerQueryService — 球员/队伍数据查询 + 选项屏幕管理
 * @bank 01 ($A000-$BFFF 窗口)
 *
 * 9 路入口跳板:
 *   entry0 $A01E 球员数据处理 (查能力值/建立阵容)
 *   entry1 $A10D 数据/选项屏幕初始化
 *   entry2 $A4EB PPU 图形数据显示   (TODO)
 *   entry3 $A64C NT 屏幕内容绘制    (TODO)
 *   entry4 $A6D2 PPU 属性块写入     (TODO)
 *   entry5 $AFC2 字符数据解码/显示  (TODO)
 *   entry6 $AF79 VRAM 缓冲区写入 1
 *   entry7 $AF8A VRAM 缓冲区写入 2
 *   entry8 $B050 Bank 切换 + 数据加载
 *   entry9 $A39B 球队数据初始化
 *
 * 数值显示链路: ROM 编码值 → LOOKUP_16BIT 查表 → 真实数值
 * → $8C55 循环除10 (16bit除法) → 余数+0x33=tile_id → 写 ram_04A8 PPU Buffer。bank01 不只是查球员，它负责整个"球员数据查询+数值显示+阵容菜单"界面。
 */
import { DataStore } from '../../data/store/DataStore';
export declare class PlayerQueryService {
    protected _store: DataStore;
    constructor(store: DataStore);
    /**
     * 球员数据查询 (entry0 $A01E)。按 playerId 在阵容区查能力值/建立阵容数据。
     *
     * 对应原始 $A01E: 读取 $0448/$0026/$0446/$044D/$00E1 组合出队形,
     * 遍历 10 名球员建立 $0656 区阵容, 计算球员实际能力 ($0454 经验区)。
     *
     * 参数: playerId = 球员索引; field = 能力字段 (0=体力/其余查能力表)。
     * 返回: 该字段查表后的真实数值。
     */
    queryPlayer(playerId: number, field: number): number;
    /** 读阵容区 $0656+ 球员原始编码 (与原 $A438 段语义对应, 见 code_main.s) */
    protected _readPlayerStat(playerId: number, field: number): number;
    /**
     * 选项屏幕初始化 (entry1 $A10D)。
     *
     * 对应原始 $A10D: 清空 $0566-$0656 区, 建立阵容显示指针,
     * 循环调用 $88CA 字符显示写标题, 载入队伍数据, 进入选项菜单状态机。
     */
    initOptionScreen(): void;
    /** 标题字符循环 (原 $813B-$817B, 5 行 × 13 字符) */
    protected _drawTitleChars(): void;
    /** 选项菜单更新 (原 $A1A6 起的循环) */
    protected _optionScreenUpdate(): void;
    /**
     * 按键轮询 (原 $A1AE-$A3D0 按键状态机)。
     * asm $81AE: BIT $001E; BPL→JMP $A260; BVC→JMP $A231;
     *   AND #$20; BEQ; JMP $A252; AND #$10; BEQ; JMP $A26C;
     *   AND #$0F; BEQ $81A6 (无按键→回循环);
     *   LDY #$14; STY $00EA; LDX $00EC; LDA $B1E8,X; JSR $A4D8;
     *   读 $001C AND #$0F → TAX; LDA $B2ED,X; 按方向调整光标;
     *   JMP $A201 (光标更新)
     */
    protected _optionScreenPoll(): void;
    /** $A260: A键确认 */
    protected _confirmSelection(): void;
    /** $A231: B键取消 */
    protected _cancelSelection(): void;
    /** $A252: Select键 */
    protected _selectPressed(): void;
    /** $A26C: Start键 */
    protected _startPressed(): void;
    /** $A201: 方向键移动光标 */
    protected _moveCursor(dir: number): void;
    /**
     * 查 LOOKUP_16BIT 表取数值 (原 $B045):
     *   ASL; TAX; LDA $BA90,X; TAY; LDA $BA91,X → 16bit(lo/hi)。
     * 表以 16bit 小端存, 字节偏移 = index*2, 故数组按 index 直接取。
     */
    protected _lookupValue16(index: number): number;
    /**
     * 从表尾向前查表求索引 (原 $B02E):
     *   LDX #$80 起步, DEX×2 每次递减 2 (字节偏移), 比对 16bit,
     *   找到第一个 <= 目标值的位置, 返回 idx = X>>1。
     */
    protected _lookupIndex16(value: number): number;
    /**
     * 读 $0454 经验值区 16bit (原 $B016):
     *   LDA $0026 → 查表后索引; 读 $0454+X 16bit; 返回 Y=lo/X=hi。
     */
    protected _query16(idx: number): number;
    /** 提取能力字段 (原 $8464, 阵容 16bit 编码拆位) */
    protected _extractStatField(v: number): number;
    /**
     * PPU 缓冲分配 (原 $997A, bank00 跨 bank 调用)。
     * asm $997A: 设 ram_04A8 PPU Buffer 区, 分配写入槽。
     * 复用 GameSystemService.ppuBufAlloc 语义。
     */
    protected _ppuBufAlloc(): void;
    /**
     * PPU 缓冲结束 (原 $997E, bank00 跨 bank 调用)。
     * asm $997E: 写终止符到 PPU Buffer。
     */
    protected _ppuBufEnd(): void;
    /**
     * 字符显示 (原 $88CA, 双 tile 字符映射)。
     * asm $88CA: 查 CHAR_MAP_DOUBLE 表, 写 2 个 tile 到 PPU buffer。
     * 每个 8×16 字符 = 2 个 8×8 tile (上/下)。
     */
    protected _charDisplay(ch: number, dst: number, bank: number): void;
    /**
     * PPU 块填充 (原 $9895, bank00 跨 bank 调用)。
     * asm $9895: 用 tile 填充 NT 区域 (dst, count)。
     */
    protected _ppuBlockFill(tile: number, dst: number, count: number): void;
    /** 读字节 (原 $C527 查表) */
    protected _r8(v: number): number;
    /**
     * entry2 PPU 图形数据显示 (原 $A4EB = $84EB)。
     * asm $84EB: LDX #$6A; LDY #$6B; JSR $9B6F (设滚动);
     *   LDX #$7A; LDY #$7B; JSR $9B74; JSR $9B7F (清精灵);
     *   LDY #$05; LDX #$B3; JSR $B0C0 (设CHR bank);
     *   清 $0044/$0045; 拷贝 $B271+Y → $039C+Y (Y=$CC-$FF);
     *   查 $BCD1 表 (队伍→阵型), 算 $BCF3/$BD64 指针;
     *   JSR $9D27 (写队名); JSR $9D50 (写阵型名);
     *   JSR $A63C (写数字到 NT); 设 $00E8/$00E9 PPU 地址;
     *   循环写球员数据到屏幕
     */
    entry2_PpuGraphics(): void;
    /**
     * entry3 NT 屏幕内容绘制 (原 $A64C = $864C)。
     * asm $864C: JSR $98A0 (清NT); JSR $9B7F (清精灵);
     *   LDX $0026; LDA $B393,X; JSR $8464; JSR $82A9;
     *   LDA #$01; JSR $8920 (PPU buffer);
     *   LDY #$D0; LDX #$AD; JSR $9C3A; JSR $9BE8;
     *   LDY #$73; LDX #$A6; JMP $9C28
     */
    entry3_ScreenDraw(): void;
    /**
     * entry4 PPU 属性块写入 (原 $A6D2 = $86D2)。
     * asm $86D2: LDA #$55; STA $0700; JSR $98A0 (清NT);
     *   JSR $9B7F (清精灵); LDX $0026; LDA $B3B5,X; JSR $8464;
     *   JMP $A6F9 (后续绘制)
     */
    entry4_AttrBlock(): void;
    /**
     * entry5 字符数据解码/显示 (原 $AFC2 = $8FC2)。
     * asm $8FC2: STX $00EC; JSR $B023; STA $00EB;
     *   AND #$F0; LSR; CLC; ADC $00EC; TAX;
     *   LDA $BA1C,X; TAX (查表);
     *   LDA $0026; ASL; TAY; LDA $BA4D,Y; STA $00ED;
     *   LDA $BA4C,Y; ROR $00ED; LSR; ROR $00ED (16→10位变换);
     *   循环写球员数据
     */
    entry5_CharDecode(): void;
    /**
     * entry6 VRAM 缓冲区写入 1 (原 $AF79 = $8F79)。
     * asm $8F79: LDA $0026; ASL; TAX; LDA $BA4C,X; STA $00E6;
     *   LDA $BA4D,X; STA $00E7; JMP $AF9E (跳到 entry5 内部)
     */
    entry6_VramBuf1(): void;
    /**
     * entry7 VRAM 缓冲区写入 2 (原 $AF8A = $8F8A)。
     * asm $8F8A: LDA $0026; ASL; TAX; LDA $BA4C,X; STA $00E6;
     *   LDA $BA4D,X; LSR; ROR $00E6; LSR; ROR $00E6; STA $00E7;
     *   (16位指针右移2位 = ÷4)
     *   LDX #$00; 循环: LDA $0454,X; CLC; ADC $00E6; STA $0454,X;
     *   LDA $0455,X; ADC $00E7; STA $0455,X; INX×2; CPX #$08; BNE
     */
    entry7_VramBuf2(): void;
    /**
     * entry8 Bank 切换 + 数据加载 (原 $B050 = $9050)。
     * asm $9050: LDA $0026; CMP #$10; BEQ $906C;
     *   CMP #$0C; BEQ $9065; CMP #$06; BNE $90A0;
     *   LDY #$10; LDX #$BB; JMP $B070 (team=6 → $BB10);
     *   LDY #$1A; LDX #$BB; JMP $B070 (team=12 → $BB1A);
     *   LDY #$24; LDX #$BB; JMP $B070 (team=16 → $BB24);
     *   $90A0: 其他队伍处理
     *   $B070: STY $00E6; STX $00E7 (设数据指针);
     *   循环: LDY #$EC; LDA $0368,Y; STA $056A,Y; INY; CPY #$F4; BNE
     *   (拷贝 $0368-$03F3 → $056A-$05F5)
     */
    entry8_DataLoad(): void;
    /** entry9 球队数据初始化 (原 $A39B) */
    entry9_TeamDataInit(): void;
    /**
     * $81E0: 方向键移动光标主体。
     * asm $81E0-$8216:
     *   LDA $001C; AND #$0F; TAX; LDA $B2ED,X (查方向偏移表)
     *   BMI $81F7 (负值跳)
     *   CLC; ADC $00EC (加光标位置); CMP #$41; BCC $8201 (<$41 ok)
     *   SEC; SBC #$41 (≥$41 则减 $41, 环绕); JMP $A201
     *   $81F7: 负值路径: CLC; ADC $00EC; CMP #$41; BCC $8201
     *          CLC; ADC #$41 (≥$41 加 $41); $8201: STA $00EC
     *   $8203: TAX; LDA $B1E8,X (查菜单项); AND #$C0; ASL; ROL; ROL; TAY
     *   LDA $B229,Y; TAY; LDA $B1E8,X; JSR $A4D8; LDA #$01; JSR $9FA8
     *   JSR $A3D0 (精灵设置); LDA $001C; AND #$0F; BNE $8228
     *   JMP $A1A6 (无按键回循环)
     *   $8228: DEC $00EA; BNE $8217 (循环等待释放); LDY #$08; JMP $A1D4
     */
    protected sub81E0(): void;
    /**
     * $8231: A键确认 (二级菜单选择)。
     * asm $8231-$826C:
     *   LDX $00EC; LDA $B255,X; CMP #$FF; BEQ $826C (=FF跳)
     *   TXA; LDY $00ED; STA $0664,Y (存选择到 $0664)
     *   LDA $BC6E,X; LDX $00ED; LDY $B241,X; LDX #$21; JSR $88CA (显示)
     *   LDA #$12; STA $0701; LDX $00ED; INX; CPX #$12; BCC $825B
     *   LDX #$00; STX $00ED; JMP $A1A6
     */
    protected sub8231(): void;
    /**
     * $826C: 三级菜单 (球员选择确认)。
     * asm $826C-$82B0:
     *   LDX $00EC; LDA $B1E8,X; LDY #$00; JSR $A4D8
     *   LDX $0673; LDA $B255,X; AND #$30; STA $00EB
     *   LDX $0675; LDA $B255,X; AND #$0F; ORA $00EB; STA $00EB
     *   LDX #$00; 循环: LDA $0664,X; CPX #$0F; BCS $829C
     *     INC $00EB; SEC; SBC $00EB; AND #$3F
     *   $829C: TAY; LDA $B255,Y; JSR $A474; INX; CPX #$12; BNE $828E
     *   JSR $A402; LDA $0662; CMP $00EC; BNE $82BB
     *   LDA $0661; AND #$0F; CMP $00ED; BEQ $82DD
     */
    protected sub826C(): void;
    /**
     * $82BB: 确认选择 (非匹配路径)。
     * asm: LDA #$F8; STA $0558; STA $055C; LDA #$43; STA $0700;
     *   LDA #$01; STA $007E; LDA #$78; JSR $9FA8; LDA #$00; STA $007E;
     *   LDA #$33; STA $0700; JMP $A19F
     */
    protected sub82BB(): void;
    /**
     * $82DD: 球员经验值/等级计算。
     * asm $82DD-$836B:
     *   LDA #$00; STA $00E6; TAX
     *   循环: LDA $0656,X; LSR×2; STA $00E7; JSR $B045; STY $00EC; STX $00ED
     *   LDA $00E7; CMP #$3F; BCS $8352; CLC; ADC #$01; JSR $B045
     *   TYA; SEC; SBC $00EC; STA $00EA; TXA; SBC $00ED; STA $00EB
     *   LSR $00EB; ROR $00EA; LSR $00EB; ROR $00EA (÷4)
     *   LDX $00E6; LDA $0656,X; LDY $00EA; LDX $00EB; AND #$03
     *   BEQ $8338 (余0); ASL $00EA; ROL $00EB; CMP #$02; BEQ $832D
     *   BCC $8338; ASL $00EA; ROL $00EB; JMP $A338
     *   $832D: TYA; CLC; ADC $00EA; STA $00EA; TXA; ADC $00EB; STA $00EB
     *   $8338: LDA $00EC; CLC; ADC $00EA; STA $00EC
     *   LDA $00ED; ADC $00EB; STA $00ED
     *   SEC; SBC #$01; STA $00ED (减1)
     *   $8352: LDA $00E6; ASL; TAX; LDA $00EC; STA $0454,X; LDA $00ED; STA $0455,X
     *   INC $00E6; CMP #$0A; BEQ $836B; JMP $A2DF
     *   $836B: LDA $0660; LSR×2; STA $0026; LDA $0660; AND #$03; LSR; STA $0448
     *   LDA #$00; BCC $8381; LDA #$05; STA $0446
     *   LDA $0661; ROL; LDA #$00; ROL; STA $044D
     *   LDA #$00; STA $004C; LDA #$01; STA $0700; JSR $9BA0; RTS
     */
    protected sub82DD(): void;
    /**
     * $A3D0: 精灵设置 (光标 Y 坐标)。
     * asm $83D0-$8401:
     *   LDA $003A; AND #$04; BEQ $83F9 (bit2=0 跳)
     *   LDX $00ED; LDA $B22D,X; AND #$80; LSR; SEC; ROR; LSR; STA $0558
     *   CLC; ADC #$08; STA $055C
     *   LDA $B22D,X; AND #$7F; CLC; ADC #$50; STA $055B; STA $055F; RTS
     *   $83F9: LDA #$F8; STA $0558; STA $055C; RTS (隐藏精灵)
     */
    protected subA3D0(): void;
    /**
     * $8402: 球员位置计算 (遍历 11 球员, 累加位置偏移)。
     * asm $8402-$8466:
     *   LDA $0661; AND #$F0; CLC; ADC $0663; STA $00EC; LDA #$00; ADC #$00; STA $00ED
     *   LDX #$00; 循环 11 次: LDA $0656,X; CLC; ADC $00EC; STA $00EC; LDA $00ED; ADC #$00; STA $00ED; INX
     *   CPX #$0B; BNE $8415
     *   LDA $00EC; CLC; ADC #...; 算后续地址
     */
    protected sub8402(): void;
    /**
     * $8464: 读球员数据 (按索引+偏移查 $0656/$0657 表, 返回 A)。
     * asm $8464-$8473: LDY $AD8A,X; TXA; AND #$03; BEQ $846E
     *   =3: LDA $0656,Y; AND #$3F; RTS
     *   =2: LDA $0657,Y; ASL; STA $00EC; LDA $0656,Y; AND #$0F; ROL; ASL $00EC; ROL; RTS
     *   =1: LDA $0656,Y; LSR; STA $00EC; LDA $0657,Y; ROR; LSR $00EC; ROR; LSR; LSR; RTS
     *   =0: LDA $0656,Y; LSR; LSR; RTS
     */
    protected sub8464(x: number): number;
    /**
     * $8474: 写球员数据 (与 $8464 对应的写入版本)。
     * asm $8474-$84D7: AND #$3F; STA $00EC; LDY $AD8A,X; TXA; AND #$03; 分支
     */
    protected sub8474(x: number, value: number): void;
    /**
     * $84D8: PPU 地址设置 + 调 $9895 块填充。
     * asm $84D8-$84E8: STY $00E8; AND #$3F; CLC; ADC #$D8; TAY;
     *   LDX #$23; LDA #$01; STA $00E9; LDA $00E8; JMP $9895
     */
    protected sub84D8(a: number, y: number): void;
    /**
     * $8509-$8610: entry2 后半段 (球员数据写入 NT)。
     * asm: 拷贝 $B271+Y → $039C+Y (Y=$CC-$FF);
     *   查 $BCD1 表 (队伍→阵型), 算 $BCF3/$BD64 指针;
     *   JSR $9D27 (写队名); JSR $9D50 (写阵型名);
     *   LDA $002A; JSR $A63C (写数字到 NT);
     *   LDA #$04; LDX #$37; JSR $997A (PPU buffer);
     *   循环等待按键释放;
     *   JSR $99F0; JSR $98A0 (清屏);
     *   LDA #$0B; JSR $A611 (球员数据循环);
     *   队伍≥$10: LDA #$16; JSR $A611;
     *   球员数据循环: LDX $00ED; LDA $0656,X; JSR $C53C;
     *   查 $BC58 表设 PPU 地址; JSR $9D50 (写阵型名);
     *   INC $00EA; INC $00ED; DEC $00EC; BEQ $860A;
     *   CPX #$0B; BNE $85C6; JSR $89A3; JSR $98E8; JMP $A5C6
     */
    protected sub8509_PlayerDataLoop(): void;
    /** $85C6-$85F1: 球员数据写入循环 */
    protected _playerDataWriteLoop(): void;
    /**
     * $A611: 球员数据初始化循环。
     * asm $8611-$863B: STA $00EB; LDA $00ED; JSR $C50C;
     *   LDY #$00; LDA ($0034),Y; JSR $B013; JSR $B02E;
     *   LDY #$03; CMP ($0034),Y; BEQ $8635; STA ($0034),Y;
     *   LDY #$00; LDA ($0034),Y; LDX $00EC; STA $0656,X; INC $00EC;
     *   $8635: INC $00ED; DEC $00EB; BNE $8613; RTS
     */
    protected subA611(count: number): void;
    /**
     * $A63C: 数字写入 NT (查 $BDA8 表)。
     * asm $863C-$8649: STY $00E8; STX $00E9; ASL; TAX;
     *   LDY $BDA8,X; LDA $BDA9,X; TAX; JMP $9D50
     */
    protected subA63C(a: number, y: number, x: number): void;
    /**
     * $A6E8: entry3 后续 (清屏 + 查队伍表 + 写文本)。
     * asm $86E8-$870D: JSR $98A0; JSR $9B7F; LDX $0026; LDA $B3B5,X;
     *   CLC; ADC #$01; JSR $8464; JSR $82A9;
     *   LDY #$D6; LDX #$AD; JSR $9C3A; JSR $9BE8;
     *   CMP #$02; BEQ $8710; JSR $A721; JMP $A6E8
     *   $8710: LDA #$31; STA $0700; JSR $9BA0; RTS
     */
    protected subA6E8(): void;
    /**
     * $A721: 子菜单绘制。
     * asm $8721-$8723: JSR $9BA0; RTS (实际代码在 $8724 起)
     * $8724: LDX #$1F; LDY #$2E; JSR $9B6F (设滚动);
     *   LDA #$00; STA $007B; JSR $8920 (PPU buffer);
     *   LDA #$00; STA $008E; LDA #$2E; STA $008F;
     *   LDA $002A; CMP #$02; BNE $8743; JMP $A84E
     *   $8743: LDY #$3D; LDX #$B4; JSR $B0C0 (CHR bank);
     *   LDA #$00; JSR $ADE9; LDA #$88; STA $00E6; LDA #$20; STA $00E7;
     *   JSR $AEAC; LDA #$00; JSR $AE01;
     *   LDY #$FC; 循环: LDA $ACA2,Y; STA $0468,Y; INY; BNE
     *   LDA #$03; LDX #$39; JSR $997A
     */
    protected subA721(): void;
    /**
     * $A779: 子菜单精灵设置。
     * asm $8779-$878D: LDX #$B6; LDY #$AA; JSR $97AB; ... (省略详细)
     */
    protected subA779(): void;
    /**
     * $8920: PPU buffer 分配 (bank01 侧入口)。
     * asm $8920-$8953: 读 ram_008E (buffer 状态); 设 ram_04A8 区;
     *   写 ram_00E8/$00E9 PPU 地址; 设 ram_008F;
     *   循环填充 ram_04A8 (Y 计数)
     */
    protected sub8920(): void;
    /**
     * $A7CE: 子菜单绘制 (含按键循环)。
     * asm $87C5-$884B:
     *   LDA #$58; STA $0564; LDA #$94; STA $004C
     *   LDX #$AD; JSR $9C3A; LDA #$01; JSR $9FA8 (等待1帧)
     *   JSR $9CC9 (按键检测); BIT $001E; BVS $883C (B键取消)
     *   BPL $87D5 (A键确认); LDA #$01; STA $0562; JSR $9CD3
     *   LDY #$AE; LDX #$AD; LDA $0560; JSR $9C3C; LDA #$01; JSR $9FA8
     *   JSR $9CC9; BIT $001E; BVS $883C; BPL $87F5
     *   LDY $0560; LDX #$00; JSR $9D08; LDA $0034; STA $00E6; LDA $0035; STA $00E7
     *   LDY $055C; LDX #$00; JSR $9D08; JSR $AF67
     *   LDA #$88; STA $00E6; LDA #$20; STA $00E7; JSR $AEAC
     *   LDA #$F8; STA $055C; STA $0560; LDA #$00; STA $0562; JSR $AE01
     *   JMP $A7CE
     *   $883C: LDA #$00; STA $004C; JSR $AE01; LDA #$F8; STA $055C; STA $0560; JMP $A771
     */
    protected subA7CE(): void;
    /**
     * $A84E: 子菜单 (阵型=2 路径)。
     * asm $884E-$889A: LDY #$51; LDX #$B4; JSR $B0C0;
     *   LDA #$FC; JSR $ADE9; LDA #$85; STA $00E6; LDA #$20; STA $00E7; JSR $AEAC;
     *   LDA #$99; STA $00E6; LDA #$20; STA $00E7; JSR $AEBE;
     *   LDA #$D8; JSR $AE01; JSR $B0A1; JSR $AA7F;
     *   LDY #$FC; 循环: LDA $ACB8,Y; STA $0468,Y; INY; BNE;
     *   LDA #$03; LDX #$39; JSR $997A;
     *   LDA #$FC; LDX #$38; LDY #$78; JSR $9BE3;
     *   LDY #$9D; LDX #$A8; JMP $9C28
     */
    protected subA84E(): void;
    /**
     * $8C55: 数据流解析 (查 $BB2E 表, 设 $005C/$005D 指针, 循环读数据)。
     * asm $8C2E-$8C5E:
     *   JSR $997E (PPU buffer 结束); LDA #$01; JSR $9FA8 (等待1帧)
     *   BIT $001E; BVC $8C3D (B键跳); JMP $AAE5
     *   $8C3D: BPL $8C31 (A键确认); LDY #$00; LDA ($0034),Y
     *   LDX #$27; DEX×3; BPL $8C4D; JMP $AAE5
     *   $8C4D: CMP $BB2E,X; BNE $8C45 (查表)
     *   LDA $BB2F,X; STA $005C; LDA $BB30,X; STA $005D; LDA #$00; STA $005E
     *   $8C5E: LDY #$00; LDA ($005C),Y (读数据流)
     *     BPL $8C83 (正数跳); CMP #$FF; BNE $8C6D; JMP $AD23 (FF=结束)
     *     $8C6D: CMP #$FE; BNE $8C7B; LDA $0446; CMP #$05; BEQ $8C8C; JMP $AD13
     *     $8C7B: LDA $0448; LSR; BCS $8C8C; LDA #$1E; CMP $0026; BCC $8C8C; BEQ $8C8C; JMP $AD13
     *   $8C8C: INY; LDA ($005C),Y; JSR $C53C (查表)
     *     LDA $005E; ASL; TAX; LDA $BC48,X; STA $00E8; LDA $BC49,X; STA $00E9
     *     LDY #$00; LDA ($0030),Y; CMP #$FC; BCS $8CBE
     *     LDY $00E8; LDX $00E9; JSR $88CA (字符显示)
     *     INC $0030; BNE $8CB5; INC $0031
     *     $8CB5: INC $00E8; BNE $8CBB; INC $00E9
     *     $8CBB: JMP $ACA0
     *   $8CBE: LDA #$00; STA $044E; LDY #$02; LDA ($005C),Y; STA $043B; STA $043D;
     *     INY; LDA ($005C),Y; STA $043C; STA $043E;
     *     LDA $005F; STA $0441; STA $0442; INY; LDA ($005C),Y; JSR $C54B
     *     LDA $043F; STA $00EC; LDA $0440; STA $00ED; JSR $9E4F
     */
    protected sub8C55(): void;
    /**
     * $88CA: 字符显示 (双 tile 映射)。
     * asm $88CA-$891F: 查 CHAR_MAP_DOUBLE 表, 写 2 个 tile 到 PPU buffer。
     *   LDA $B8A8,Y (查字符表); STA $00E6; INY; LDA $B8A9,Y; STA $00E7
     *   LDY #$00; LDA ($00E6),Y (读 tile 高字节); STA $003A; INY
     *   LDA ($00E6),Y (读 tile 低字节); STA $003B
     *   写 PPU buffer (ram_04A8 区)
     */
    protected sub88CA(): void;
    /**
     * $8F91: entry7 VRAM 缓冲写入 2 后半段 (16位指针÷4 + 经验值循环加偏移)。
     * asm $8F91-$8FC1:
     *   STA $00E6; LDA $BA4D,X; LSR; ROR $00E6; LSR; ROR $00E6; STA $00E7 (÷4)
     *   LDX #$00; 循环: LDA $0454,X; CLC; ADC $00E6; STA $0454,X;
     *     LDA $0455,X; ADC $00E7; STA $0455,X; BCC $8FBB;
     *     LDA #$FF; STA $0454,X; STA $0455,X (溢出设 $FF)
     *   $8FBB: INX; INX; CPX #$16; BCC $8FA0; RTS
     */
    protected sub8F91(): void;
    /**
     * $8FC2: entry5 字符解码后半段 (查 $BA1C 表 + 经验值加偏移)。
     * asm $8FC2-$9012:
     *   STX $00EC; JSR $B023; STA $00EB; AND #$F0; LSR; CLC; ADC $00EC; TAX
     *   LDA $BA1C,X; TAX
     *   LDA $0026; ASL; TAY; LDA $BA4D,Y; STA $00ED;
     *   LDA $BA4C,Y; ROR $00ED; LSR; ROR $00ED; LSR (16位÷4)
     *   JSR $9DEE
     *   ASL $00EC; ROL $00ED; ASL $00EC; ROL $00ED (×4)
     *   LDA $00EB; AND #$0F; ASL; TAX
     *   LDA $0454,X; CLC; ADC $00ED; STA $0454,X
     *   LDA $0455,X; ADC #$00; STA $0455,X; BCC $9012
     *   LDA #$FF; STA $0454,X; STA $0455,X; RTS
     */
    protected sub8FC2(): void;
    /**
     * $9013: 查经验值表 (返回 Y:X = 16位经验值)。
     * asm $9013-$9022:
     *   JSR $B023; AND #$0F; ASL; TAX; LDA $0454,X; TAY; LDA $0455,X; TAX; RTS
     */
    protected sub9013(): {
        lo: number;
        hi: number;
    };
    /**
     * $9023: 查队伍偏移表 (返回 A = $B9D6,X)。
     * asm $9023-$902D:
     *   LDX $002A; CLC; ADC $B9D3,X; TAX; LDA $B9D6,X; RTS
     */
    protected sub9023(a: number): number;
    /**
     * $902E: 二分查找 (查 $BA90 16位表)。
     * asm $902E-$9044:
     *   STY $00E6; STX $00E7; LDX #$80; DEX; DEX
     *   $9034: LDA $00E6; CMP $BA90,X; LDA $00E7; SBC $BA91,X; BCC $9034
     *   TXA; LSR; RTS
     */
    protected sub902E(y: number, x: number): number;
    /**
     * $9045: 查 $BA90 表 (反向, 返回 Y:X)。
     * asm $9045-$904F:
     *   ASL; TAX; LDA $BA90,X; TAY; LDA $BA91,X; TAX; RTS
     */
    protected sub9045(a: number): {
        lo: number;
        hi: number;
    };
    /**
     * $90A0: entry8 其他队伍处理。
     * asm $90A0-$90BF:
     *   LDX $0027; BEQ $90BF (队伍2=0 跳)
     *   LDY #$C8; LDX #$B9; JSR $97B6 (精灵设置)
     *   LDY #$52; LDX #$22; LDA #$01; STA $00E9
     *   LDA $0450; EOR #$FF; CLC; ADC #$37; JSR $9895 (块填充)
     *   $90BF: RTS
     */
    protected sub90A0(): void;
    /**
     * $90C0: 脚本分派器 (查 $B0D7 跳转表)。
     * asm $90C0-$90D4:
     *   STY $00EC; STX $00ED; LDY #$00; LDA ($00EC),Y; ASL; TAX
     *   LDA $B0D7,X; STA $00E6; LDA $B0D8,X; STA $00E7; JMP ($00E6)
     */
    protected sub90C0(y: number, x: number): void;
    /**
     * $A3B4: 循环设球员数据 (JSR $C50C; 读球员数据; JSR $B013; JSR $B02E; 写回)
     */
    protected _subA3B4(count: number): void;
}
export default PlayerQueryService;

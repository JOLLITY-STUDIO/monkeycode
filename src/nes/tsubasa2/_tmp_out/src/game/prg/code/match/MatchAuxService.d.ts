/**
 * MatchAuxService — bank20 比赛辅助 (计时状态机/计分板/精灵渲染) ($8000-$9FFF, 运行时 $A000-$BFFF)
 * @bank 20
 *
 * 职责: 4 路 dispatch (计时/计分板/精灵渲染), 15 code 段, 16 内部函数。
 * 数据表: 来自 data/tables/bank20-tables.ts（从 asm/bank20/data_tables.s 提取）。
 *
 * 入口 (跳转表 $8000-$800D):
 *   $8000 → JMP $800F: 主 dispatch (读 $053A 分派)
 *   $8003 → JMP $84DC: 计时器更新
 *   $8006 → JMP $83D9: 计分板更新
 *   $8009 → JMP $8624: 精灵渲染
 *   $800C → JMP $8796: 其他辅助
 *
 * 翻译状态: 全 bank 代码逐行翻译（$8000-$88A7 全部指令覆盖, 数据走 bank20-tables）。
 *
 * RAM 关键:
 *   $004C/$004D: 计时数据指针
 *   $053A: dispatch 索引 (0=结束, 正=递减, 负=启动)
 *   $053B: 激活标志/延迟计数
 *   $053C: 计时器 id
 *   $053D-$0545: 计时参数/缓冲区
 *   $0547-$05C6: 计时缓冲区 (0x15 步长 × 8 组)
 *   $003C/$003D: 精灵组指针 (sprite group)
 *   $003E/$003F: 数据指针 (sprite batch / 计时数据)
 *   $062D: 比赛模式 (低 4 位 = 精灵渲染模式)
 *
 * 命名规范: 旧名 Bank20Service → 新名 MatchAuxService。
 */
import { DataStore } from '../../data/store/DataStore';
import type { GameSystemService } from '../system/GameSystemService';
export declare class MatchAuxService {
    protected _store: DataStore;
    protected _system: GameSystemService;
    constructor(store: DataStore, system: GameSystemService);
    protected rd(addr: number): number;
    protected wr(addr: number, v: number): void;
    protected rdPtr(lo: number, hi: number): number;
    protected wrPtr(lo: number, hi: number, v: number): void;
    /** $8000 → $800F: 主 dispatch (计时状态机) */
    timerDispatch(): void;
    /** $8003 → $84DC: 计时器更新 */
    timerUpdate(): void;
    /** $8006 → $83D9: 计分板更新 */
    scoreboardUpdate(): void;
    /** $8009 → $8624: 精灵渲染 */
    spriteRender(): void;
    /** $800C → $8796: 其他辅助 */
    auxMisc(): void;
    update(frame: number): void;
    private sub800F;
    /** $8067: 递减激活标志, 0 时读下一计时字节 ($8067-$806C) */
    private sub8067;
    /** $806D: 读计时数据字节并处理 ($806D-$8083) */
    private sub806D;
    private sub8084;
    /** $83CF: 设 dispatch 索引 (LDA #A; JSR $83CF) */
    private sub83CF;
    /** $80A2: cmd0 — 结束计时 (PLA; LDA #$00; STA $053A; RTS) */
    private sub80A2;
    /** $80AA: cmd1 — 精灵组设置 (读计时数据初始化精灵组缓冲) */
    private sub80AA;
    /** $812B: cmd2 — 设 $053E=0, $053D=1, JMP $83CF */
    private sub812B;
    /** $8138: cmd3 — 计分板重置 (LDA #$00; STA $053D; LDA #$01; JMP $83CF) */
    private sub8138;
    /** $8142: cmd4 — 写计分板数据到 $0493-Y (LDY #$01 起 4 字节) */
    private sub8142;
    /** $8153: cmd5 — 子命令分派 + 调色板拷贝 */
    private sub8153;
    /** $81BA: 子命令分派 (AND #$7F; JSR $C509; 查跳转表 8 项) */
    private sub81BA;
    /** $81CF: LDA $0441; JMP $81EC (球员数据查询, 源=$0441) */
    private sub81CF;
    /** $81D5: LDA $05FC; JMP $81EC (源=$05FC) */
    private sub81D5;
    /** $81DB: LDA $05FB; JMP $81EC (源=$05FB) */
    private sub81DB;
    /** $81E1: LDA $05FB; EOR #$0B; JMP $81EC (源=$05FB^$0B) */
    private sub81E1;
    /** $81E9: 子命令 1 (未确定, 回退到 $81EC 源=$003A) */
    private sub81E9;
    /**
     * $81EC: 球员数据查询。
     * asm $81EC-$8263:
     *   LDA $0442; STA $003A; JSR $C50C; JSR $826A; LDY #$00; LDA ($0034),Y
     *   BEQ $8201; JSR $8282; LDX #$00; BEQ $8213
     *   $8201: LDA $002B; SEC; SBC #$03; LDX #$02
     *          LDY $003A; BEQ $8211; CPY #$0B; BNE $8213; LDX #$04
     *          $8211: STA $003A
     *   $8213: LDY #$00; STY $003B; TAY; ASL; ROL $003B; ASL; ROL $003B
     *          ADC $003A; STA $003A; LDA #$00; ADC $003B; STA $003B
     *          CLC; LDA $003A; ADC $8264,X; STA $003A; LDA $003B; ADC $8265,X; STA $003B
     *          LDY #$00; LDA ($003A),Y; INY; PHA
     *          循环 16 次写 $047F (state table)...
     *          PLA; RTS
     */
    private sub81EC;
    /**
     * $826A: 球员 ID → 精灵索引查表。
     * asm: LDY #$00; LDA ($0034),Y; PHP; TAX; LDA $88F0,X; PLP
     *   BNE $827E; LDX $003A; CPX #$0B; BNE $827E; LDA #$04; STA $0546
     *   $827E: RTS
     */
    private sub826A;
    /**
     * $8282: 球员状态判断 (返回 X = 状态类型)。
     * asm: LDX #$01; STA $003B; CMP #$01; BEQ $8296
     *   LDX #$00; CMP #$0F; BCC $8296; CMP #$17; BCS $8296; LDX #$02
     *   $8296: TXA; JSR $C509; 跳转表 [$82A0/$82A3/$82AD]
     * 返回: X = 0/1/2 (状态类型)
     */
    private sub8282;
    /** $82A0: 状态类型 0 处理器 (队伍标志检查, 返回队伍索引) */
    private sub82A0;
    /** $82A3: 状态类型 1 处理器 (LDX $002A; 判断后返回) */
    private sub82A3;
    /** $82AD: 状态类型 2 处理器 (队伍标志检查 + $003B 偏移) */
    private sub82AD;
    /**
     * $82BC: 计时数据读取 + 地址计算 (查 $82F6 表)。
     * asm: LDY #$02; LDA ($004C),Y; BPL $82C5; JSR $8316
     *   LDX #$00; STX $003B; ASL; ROL $003B ×4 (×16)
     *   ADC #$CF; STA $003A; LDA $003B; ADC #$BA; STA $003B
     *   LDA $82F6,X; BPL $82E9
     */
    private sub82BC;
    /** $82E4: 表项写入 $046F (X=0..0x1F) */
    private sub82E4;
    /** $8316: 子命令扩展 (AND #$7F; JSR $C509; 查跳转表 8 项) */
    private sub8316;
    /** $832B: LDA #$00; LDX $002A; BEQ $8334; LDA #$01; RTS */
    private sub832B;
    /** $8335: LDA #$03; LDX $002A; CPX #$01; BEQ $8341; CLC; ADC #$01; RTS */
    private sub8335;
    /** $8342: LDA #$05; JMP $8337 */
    private sub8342;
    /** $8347: CLC; PHP; LDA #$2E; LDX $002B; CPX #$12; BEQ $835D; ... */
    private sub8347;
    /** $8361: SEC; JMP $8348 */
    private sub8361;
    /** $8365: LDA #$0B; JMP $8337 */
    private sub8365;
    /** $836A: CLC; PHP; LDA #$15; LDX $002A; CPX #$02; BEQ $8373; LDA #$26; PLP; ADC #$00; RTS */
    private sub836A;
    /** $837B: SEC; JMP $836B */
    private sub837B;
    /** $8348 带 carry=1 入口 (用于 $8361) */
    private sub8348C;
    /** $837F: 子命令 5/6 处理器 (队伍/计分板 tile 写入) */
    private sub837F;
    /** $83AE: cmd6 — 清计时缓冲区项 (LDY #$01; LDA ($004C),Y; TAX; LDA #$00; STA $0547,X) */
    private sub83AE;
    /** $83BD: cmd7 — 设 $0540/$0541 (LDY #$01 起 2 字节) */
    private sub83BD;
    /** $816F: cmd8 — 读新指针 (LDY #$01; LDA ($004C),Y; TAX; INY; LDA ($004C),Y; STX $004C; STA $004D) */
    private sub816F;
    /** $817C: cmd9 — 设循环计数 (LDY #$01; LDA ($004C),Y; STA $0542; 计算回跳指针 → $004E/$004F) */
    private sub817C;
    /** $8195: cmd10 — 循环 (LDA #$01; DEC $0542; BEQ 前进; 否则回跳) */
    private sub8195;
    /** $81A9: cmd11 — 设 $0543-$0545 (LDY #$01 起 3 字节) */
    private sub81A9;
    private sub84DC;
    /** $84EF: 精灵组计数为 0 → 读数据初始化新精灵批 */
    private sub84EF;
    /** $852A: 更新精灵位置 */
    private sub852A;
    /** $857A: 读数据命令 (读数据字节并分派命令) */
    private sub857A;
    /** $858D: 命令 4 — 读新数据指针 */
    private sub858D;
    /** $85A0: 命令 0 — 停止精灵组 ($003C,$11 = $FF) */
    private sub85A0;
    /** $85A9: 命令 1 — 设精灵组坐标/属性 (JSR $85E7; 读 2 组坐标) */
    private sub85A9;
    /** $85D5: 命令 2 — 置精灵组 bit4 (JSR $85E7; LDY #$00; LDA ($003C),Y; ORA #$10; STA ($003C),Y) */
    private sub85D5;
    /** $85E1: 命令 3 — 停止并置 bit4 (JSR $85A9; JMP $85D8) */
    private sub85E1;
    /** $85E7: 读 $0040 数据到 $003C,$11 (LDY $0040; LDA ($003E),Y; LDY #$11; STA ($003C),Y; INC $0040) */
    private sub85E7;
    /** $85F2: 坐标累加 (X = 高低字节索引, Y = 数据偏移) */
    private sub85F2;
    /** $860D: 坐标累加 (从 $003E 指针, X = 目标偏移, Y = 源偏移) */
    private sub860D;
    private sub83D9;
    /** $83E9: 计分板计数为 0 → 读数据 */
    private sub83E9;
    /** $8409: 计分板数据循环 */
    private sub8409Loop;
    /** $8438: 计分板命令分派 (SEC; SBC #$F0; JSR $C509; 跳转表 9 项) */
    private sub8438;
    /** $8450: 计分板命令 0 — 停止 (LDY #$10; LDA #$FF; STA ($003C),Y; PLA; PLA; RTS) */
    private sub8450;
    /** $8459: 计分板命令 1 — 置 bit5 (LDA #$20; BNE $845F) */
    private sub8459;
    /** $845D: 计分板命令 2 — 置 bit6 (LDA #$40) */
    private sub845D;
    /** $845F: ORA ($003C),Y; STA ($003C),Y (LDY #$00) */
    private sub845F;
    /** $8466: 计分板命令 3 — 读新指针 (LDY $0040; LDA ($003E),Y; TAX; INY; LDA ($003E),Y; STA $003F; STX $003E; LDA #$00; STA $0040) */
    private sub8466;
    /** $8477: 计分板命令 4 — 保存回跳指针 (LDY $0040; 读 2 字节 → $003C+13/+14) */
    private sub8477;
    /** $8496: 计分板命令 5 — 循环/回跳 */
    private sub8496;
    /** $84B3: 计分板命令 6 — 设 +13/+14 指针 (LDY $0040; 读 2 字节 → $003C+13/+14) */
    private sub84B3;
    /** $84C7: 计分板命令 7 — 停止 (LDY $0040; LDA ($003E),Y; LDY #$12; STA ($003C),Y; JMP $8450) */
    private sub84C7;
    /** $84D2: 计分板命令 8 — 读 $0040 数据 → $0546 */
    private sub84D2;
    private sub8624;
    /** $8637: 精灵渲染主循环 */
    private sub8637;
    /** $864D: 渲染单个精灵 (写 OAM) */
    private sub864D;
    /** $86CF: 结束一个精灵的渲染 (INC $0046; 检查 $16) */
    private sub86CF;
    /** 完成精灵写入 (INX×4; STX $003B; INC $0048) */
    private finishSprite;
    /** $86DB: 精灵数据查询 (JSR $C50C; 渲染模式分派; 返回 carry = 是否渲染) */
    private sub86DB;
    /** $871D: 渲染模式 0/1/4 — 返回 SEC (渲染) */
    private sub871D;
    /** $871F: 渲染模式 2 — 玩家筛选 */
    private sub871F;
    /** $873B: 渲染模式 3 — 玩家筛选 (用 $0600 列表) */
    private sub873B;
    /** $8753: 渲染模式分派 (LDA $062D; AND #$0F; JSR $C509) */
    private sub8753;
    /** $8768: LDA $0624; JSR $C536; JMP $87E7 */
    private sub8768;
    /** $8771: LDA $05FC; JSR $C50C; 读取坐标 → 设置精灵 */
    private sub8771;
    /** $8784: LDA $0624; JSR $87A7; PHA; LDA $0624; JSR $87C7; PLA; TAX; JMP $87E7 */
    private sub8784;
    /** $87A7: 坐标计算循环 (X 轴) */
    private sub87A7;
    /** $87C7: 坐标计算循环 (Y 轴) */
    private sub87C7;
    /** $87E7: 设置精灵 (TXA; CLC; ADC #$FD; ...) */
    private sub87E7;
    /** $881D: 当前控制精灵渲染 */
    private sub881D;
    /**
     * $86F2: 特殊精灵 tile 计算 (sp < 0x0B 时调用)
     * TODO: 真实实现 — asm bank22 $86F2, 读 $0201/$0202 数据返回特殊 tile
     */
    private sub86F2;
    /** $8861: 特殊精灵显示 (LDA $002C; ...) */
    private sub8861;
    private sub8796;
    /** $C545: 读坐标 → 返回 (baseLo | baseHi<<8) */
    private subC545;
    /** $C542: 读坐标 → 返回 */
    private subC542;
    /** $C536: 精灵坐标换算 (转发) */
    private subC536;
    protected wrInd(ptrLo: number, offset: number, val: number): void;
    protected rdInd(ptrLo: number, offset: number): number;
    private readMemByte;
    /** 读 bank20 ROM 数据字节 (通过 DataStore KV 'bank20_rom'; 未注册时回退表) */
    private readRomByte;
    /** 未注册 ROM 时, 从 bank20-tables 结构化表回退 */
    private readTableFallback;
}
export default MatchAuxService;

/**
 * SpriteService — 精灵模板解码器 (bank22)
 * @bank 22 ($8000-$9FFF, MMC3 R6/R7 可切)
 *
 * ⚠ 注意: 本 Service 不是全局唯一的 OAM 写入入口!
 *   NES 天使之翼2 有多个 bank 直接写 OAM ($0200):
 *     - bank11 MatchTurnService.sub8525 — 滚动精灵组 (球场滚动时写 OAM)
 *     - bank19 MatchSceneService.sub90AF/sub9127 — 场景精灵 (比赛画面精灵初始化)
 *     - bank20 MatchAuxService.sub8624 — 比赛辅助精灵 (计时器/计分板)
 *     - bank24 MatchHudService — HUD 精灵 (比分/时钟/体力条直接写 OAM)
 *     - bank26 MatchEngineService.sub987B — 精灵缓冲初始化
 *   本 Service (bank22) 只负责其中"模板驱动"的部分:
 *     从精灵描述符 ($003C) 查模板指针表, 解码模板流, 批量写 OAM。
 *     主要用于球员/必杀技特效等复杂多帧精灵组的生成。
 *
 * 消费方: bank00 协程调度器 ($9F0F) 间接切换到 bank22 执行。
 *   bank 号存在 $0002+X (R6) / $0003+X (R7) 表, 运行时动态设值。
 *
 * 职责: 读精灵描述符 ($003C) → 查模板指针表 → 解码模板流 → 写 OAM ($0200)。
 *
 * asm 结构 (code_main.s $8003-$81D1, 共 252 个代码地址):
 *   $8003: 主入口 (JMP $8003)
 *   $8005-$8098: 坐标变换 (读描述符, 算位移, 查模板指针)
 *   $8098: JSR $8187 (方向偏移计算)
 *   $809B-$8108: 模板流解码循环 (按类型分派: 0=$80C0, 非0=$80AD/$80B3)
 *   $80C0-$8160: 精灵写入 OAM (Y位移+X位移+tile+属性)
 *   $8164-$8184: 子模板跳转 (读新指针)
 *   $8187-$81D1: 方向偏移计算 (bit6/bit5 翻转)
 *
 * RAM 关键:
 *   $003C/$003D: 精灵描述符指针
 *   $003E/$003F: 精灵基准 X 坐标 (16bit)
 *   $0040/$0041: 精灵基准 Y 坐标 (16bit)
 *   $0042/$0043: 模板流指针
 *   $0044: 模板流偏移 Y
 *   $0045: 精灵计数器
 *   $0046: Y 坐标计算结果
 *   $0047: X 坐标计算结果
 *   $0048: OAM 精灵计数
 *   $0049: 方向标志 (bit6=X翻转, bit5=Y翻转, bit0-1=属性)
 *   $003B: OAM 写入偏移
 *   $0517: 全局方向标志
 *   $0538: 滚动偏移
 *   $0540/$0541: Y 坐标裁剪范围
 *
 * 数据表 (sprite-table.ts):
 *   DISP_81D2 (40B): Y 位移表
 *   DISP_81FA (64B): X 位移表
 *   TEMPLATE_PTR_8280 (47×2B): 模板指针表
 */
import { DataStore } from '../../data/store/DataStore';
import { GameSystemService } from '../system/GameSystemService';
export declare class SpriteService {
    protected _store: DataStore;
    protected _system: GameSystemService;
    constructor(store: DataStore, system: GameSystemService);
    protected rd(addr: number): number;
    protected wr(addr: number, v: number): void;
    protected rdPtr(lo: number, hi: number): number;
    protected wrPtr(lo: number, hi: number, v: number): void;
    /**
     * $8003: 主入口。
     * asm $8005: LDY #$00; STY $003F; STY $0041
     *   LDA ($003C),Y; LSR; ROL $003F; LSR; ROL $0041 (提取 bit6/bit7 → $003F/$0041)
     *   LDA ($003C),Y; AND #$60; ASL; EOR $0517; STA $0049 (方向标志)
     *   LDY #$08; LDA ($003C),Y; SEC; SBC #$80; TAX (X = 描述符[8] - $80)
     *   LDA $003F; SBC #$00; TAY (Y = $003F - carry)
     *   LDA #$00; STA $003F
     *   LDA $0538; EOR #$FF; CLC; ADC #$01; BPL $8038; DEC $003F (滚动取反)
     *   STA $003E (X 位移)
     *   TXA; CLC; ADC $003E; TAX; TYA; ADC $003F; TAY (加滚动到坐标)
     *   BIT $0517; BVC $8055 (bit5=方向翻转)
     *   TXA; EOR #$FF; TAX; TYA; EOR #$FF; TAY; INX; BNE; INY; INY (取反+1)
     *   BIT $0049; BVC $8062 (bit5=偏移调整)
     *   SEC; TXA; SBC #$08; TAX; TYA; SBC #$00; TAY (X-8)
     *   STX $003E; STY $003F (存基准X)
     *   LDY #$0C; LDA ($003C),Y; SEC (读描述符[12])
     *   BIT $0049; BPL $8072; SBC #$88 (方向调整)
     *   STA $0040; LDA $0041; SBC #$00; STA $0041 (存基准Y)
     *   LDA #$80; STA $0042; LDA #$82; STA $0043 (模板指针表基址 $8280)
     *   LDY #$12; LDA ($003C),Y; ASL; BCC; INC $0043 (读描述符[18], ×2查表)
     *   TAY; LDA ($0042),Y; TAX; INY; LDA ($0042),Y; STA $0043; STX $0042 (查模板指针)
     *   JSR $8187 (方向偏移计算)
     *   LDY #$00; STY $0044 (模板流偏移=0)
     */
    spawn(groupId: number): void;
    /**
     * $809F: 模板流解码循环。
     * asm: LDY $0044; LDA ($0042),Y; AND #$07; BNE $80AD
     *   =0: JSR $80C0 (Y位移组); JMP $809F
     *   ≠0: JSR $80B3 (X位移组); JMP $809F
     *   循环直到模板流结束
     */
    private _decodeLoop;
    /**
     * $80B3: X 位移组命令分派。
     * asm: INC $0044; JSR $C509
     *   跳转表 $80B5: $8100/$8164/$8175
     * @returns false = 结束循环
     */
    private sub80B3;
    /**
     * $80C0: Y 位移组 — 读模板流, 写 OAM 精灵。
     * asm $80C0-$8160:
     *   LDY $0044; LDA ($0042),Y; AND #$38; LSR×3; STA $0045 (精灵计数)
     *   INY; LDA ($0042),Y; TAX; LDA $81D2,X (查 Y 位移表)
     *   BIT $0049; BPL; EOR #$FF; CLC; ADC #$01 (方向翻转)
     *   CLC; ADC $0040; STA $0046 (Y坐标 = 位移 + 基准Y)
     *   TXA; ADC $0041; BNE $80FD (超出范围→跳过)
     *   CMP $0540; BCC; CMP $0541; BEQ/BCS (裁剪检查)
     *   循环: INY; LDA ($0042),Y; LSR×2; TAX; LDA $81FA,X (查 X 位移表)
     *   方向翻转; CLC; ADC $003E; STA $0047 (X坐标)
     *   写 OAM: $0200+X = Y, $0203+X = X, $0202+X = 属性, $0201+X = tile
     *   INX×4; STX $003B; INC $0048; INY; DEC $0045; BPL (循环)
     *   STY $0044; RTS
     * @returns false = 模板流结束
     */
    private sub80C0;
    /**
     * $8164: 子模板跳转 (读新指针, 重置偏移)。
     * asm: PLA; RTS (返回到调用方)
     *   .byte $A4,$44 = LDY $0044
     *   LDA ($0042),Y; TAX; INY; LDA ($0042),Y; STA $0043; STX $0042
     *   LDA #$00; STA $0044; RTS
     */
    private sub8164;
    /**
     * $8175: 精灵计数扩展。
     * asm: LDA $0546; CMP #$0C; BCC $817E; SBC #$0C
     *   ASL; CLC; ADC $0044; STA $0044; JMP $8164
     */
    private sub8175;
    /**
     * $8187: 方向偏移计算 (bit6/bit5 翻转 + 描述符[0]/[19]/[20] 偏移)。
     * asm $8187-$81D1:
     *   LDY #$00; LDA ($003C),Y; EOR $0517; AND #$40; PHP (bit6 方向)
     *   LDY #$13; LDA ($003C),Y; BEQ $81B1 (描述符[19]=0 跳)
     *   LDX #$00; PLP; PHP; BEQ $81A2; EOR #$FF; CLC; ADC #$01 (翻转)
     *   PHA; PLA; BPL; DEX; CLC; ADC $003E; STA $003E; TXA; ADC $003F; STA $003F
     *   $81B1: INY; LDA ($003C),Y; BEQ $81D0 (描述符[20]=0 跳)
     *   LDX #$00; PLP; PHP; BPL $81C1; EOR #$FF; CLC; ADC #$01 (翻转)
     *   CLC; ADC $0040; STA $0040; TXA; ADC $0041; STA $0041
     *   PLP; RTS
     */
    private sub8187;
    private readMem;
}
export default SpriteService;

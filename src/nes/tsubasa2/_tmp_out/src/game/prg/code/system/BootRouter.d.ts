/**
 * BootRouter — bank 02 完整翻译 ($8000-$9FFF, 运行时 $A000-$BFFF 窗口)
 *
 * 职责:
 *   §1 NMI 渲染主程 ($8000-$815F): OAM DMA、NT buffer 写入、滚动寄存器、手柄读取、MMC3 bank 切换
 *   §2 滚动/CHR bank 辅助 ($8160-$81E3): 滚动设置 A/B、MMC3 CHR bank 切换
 *   §3 跳转表 + pre-main-loop ($820C-$82E5): 4 入口跳转表、pre-main-loop 初始化
 *   §4 $8484 场景分发器 ($8484-$8490): LDA ram_00ED; ASL; TAX; 查 PASSWORD_DISPATCH_TABLE ($A491) → PHA/PHA/RTS 跳转
 *   §5 密码场景分支 ($8338-$83D5): 密码校验分支
 *   §6 24 入口场景帧处理 ($855A-$87FA): $8484 分发表的目标子程, 每个返回下一帧分支号
 *   §7 精灵/阵容辅助 ($872C-$88FD): 精灵批量生成、精灵表拷贝、阵容装载、OAM 拷贝
 *
 *   ram_00ED = 场景索引 (0-23), 由 GameSystemService.sceneLoad / 脚本 OpSceneLoad (0xFA) 写入。
 *   分发表共 24 项 16 位入口地址, 索引即 ram_00ED 值。
 *
 *   注意: "场景帧处理分发"与 bank0 $8AF7 sceneLoad (场景装载/初始化) 是两个不同概念:
 *   - sceneLoad(sceneId) (bank0 $8AF7): 装载场景, 写 ram_00ED, 清状态, 切 bank
 *   - $8484 dispatcher (bank02): 每帧按 ram_00ED 分发到场景帧处理子程
 *
 * 已在其他 service 覆盖 (不在此重复):
 *   - $82E8 密码→数据解码 → PasswordCallbackHandler.check
 *   - $84C1 密码界面初始化 → PasswordCallbackHandler.render
 *
 * 命名规范: 旧名 DispatchService → 新名 BootRouter。
 */
import { DataStore } from '../../data/store/DataStore';
import { PasswordCallbackHandler } from '../scene/PasswordCallbackHandler';
import { BootBackgroundRenderer } from '../scene/BootBackgroundRenderer';
/**
 * NMI 回调索引 (对应 NMI_CALLBACK_TABLE 的 24 项入口)。
 *
 * 这些是 NMI 每帧按 ram_00ED 索引调用的子程, 不是游戏场景:
 *   - 渲染/NT 填充/OAM 清空/精灵属性设置
 *   - 阵容数据装载到 RAM
 *   - 密码界面绘制/续关/校验
 *   - bank 切换/标志置位
 *
 * 游戏场景 (标题/会议/比赛/结果) 由脚本引擎 OpSceneLoad (0xFA) 驱动,
 * 走 bank00 sceneLoad → 主循环调度, 与此表无关。
 *
 * 分发表存储的是"目标-1" (PHA/PHA/RTS 跳转, RTS 弹出后 +1), 实际执行 = 表值+1。
 */
export declare enum NmiCallbackIndex {
    /** idx 0 → 表值 $A4C0, 实际执行 $84C1: 密码界面初始化 (清屏+48 假名网格滚动+sceneLoad(0x17)) */
    CALLBACK_00_PASSWORD_INIT = 0,
    /** idx 1 → 表值 $A559, 实际执行 $855A: 角度计算 (ram_00EC>>2 → ram_0060/61, ram_0062 bit7=0 取补) */
    CALLBACK_01_ANGLE_CALC = 1,
    /** idx 2 → 表值 $A57B, 实际执行 $857C: 辅助子程 (JSR $9B91) */
    CALLBACK_02_AUX_9B91 = 2,
    /** idx 3 → 表值 $A581, 实际执行 $8582: 双 NT 区填充 ($2000 0x10 行 + $2400 0x20 行, JSR $98EA) */
    CALLBACK_03_NT_FILL = 3,
    /** idx 4 → 表值 $A5A2, 实际执行 $85A3: OAM 清空 (JSR $9B7F) */
    CALLBACK_04_OAM_CLEAR = 4,
    /** idx 5 → 表值 $A5A8, 实际执行 $85A9: 精灵辅助 (LDX #$09; JSR $9F96) */
    CALLBACK_05_SPRITE_9F96 = 5,
    /** idx 6 → 表值 $A5B0, 实际执行 $85B1: 精灵辅助 (LDX #$09; JSR $9F89) */
    CALLBACK_06_SPRITE_9F89 = 6,
    /** idx 7 → 表值 $A5B8, 实际执行 $85B9: 标志置位 (ram_0099 = $FF) */
    CALLBACK_07_FLAG_0099 = 7,
    /** idx 8 → 表值 $A5BF, 实际执行 $85C0: 切 PRG bank0 (MMC3) + ram_001B 清 bit6 */
    CALLBACK_08_BIT6_CLEAR = 8,
    /** idx 9 → 表值 $A5CD, 实际执行 $85CE: 切 PRG bank1 (MMC3) + ram_001B 置 bit6 */
    CALLBACK_09_BIT6_SET = 9,
    /** idx 10 → 表值 $A5DB, 实际执行 $85DC: 阵容装载 0x00 + 帧绘制 5 */
    CALLBACK_10_ROSTER_LOAD0 = 10,
    /** idx 11 → 表值 $A5E8, 实际执行 $85E9: 阵容装载 0x10 + 帧绘制 6 (ram_000D 分支) */
    CALLBACK_11_ROSTER_LOAD10 = 11,
    /** idx 12 → 表值 $A602, 实际执行 $8603: 阵容装载 0x30 + 帧绘制 8 (ram_000D 分支) */
    CALLBACK_12_ROSTER_LOAD30 = 12,
    /** idx 13 → 表值 $A61C, 实际执行 $861D: 阵容装载 0x20 + 帧绘制 7 */
    CALLBACK_13_ROSTER_LOAD20 = 13,
    /** idx 14 → 表值 $A629, 实际执行 $862A: 精灵/滚动辅助 */
    CALLBACK_14_SPRITE_SCROLL = 14,
    /** idx 15 → 表值 $A650, 实际执行 $8651: 密码续关数据装载 ($AA97 表) */
    CALLBACK_15_CONTINUE_LOAD = 15,
    /** idx 16 → 表值 $A69C, 实际执行 $869D: 比赛阵容装载 (ram_04E5 分支) */
    CALLBACK_16_MATCH_ROSTER = 16,
    /** idx 17 → 表值 $A77A, 实际执行 $877B: 阵容装载 0x80 */
    CALLBACK_17_ROSTER_LOAD80 = 17,
    /** idx 18 → 表值 $A782, 实际执行 $8783: 等待 + OAM 拷贝 $88FB */
    CALLBACK_18_WAIT_OAM_COPY = 18,
    /** idx 19 → 表值 $A78D, 实际执行 $878E: 精灵属性置 bit3 + 转密码续关装载 */
    CALLBACK_19_SPRITE_ATTR_BIT3 = 19,
    /** idx 20 → 表值 $A7BD, 实际执行 $87BE: 等待 + 精灵属性设置 */
    CALLBACK_20_SPRITE_ATTR = 20,
    /** idx 21 → 表值 $A7CE, 实际执行 $87CF: 阵容装载 0x81 */
    CALLBACK_21_ROSTER_LOAD81 = 21,
    /** idx 22 → 表值 $A7D6, 实际执行 $87D7: 精灵属性置 bit2 128 帧循环 */
    CALLBACK_22_SPRITE_ATTR_BIT2 = 22,
    /** idx 23 (0x17) → 表值 $A7FA, 实际执行 $87FB: 密码校验/续关解码 */
    CALLBACK_23_PASSWORD_CHECK = 23
}
/** @deprecated 旧名 TaskIndex, 等价于 NmiCallbackIndex */
export declare const TaskIndex: typeof NmiCallbackIndex;
export declare class BootRouter {
    protected _store: DataStore;
    protected _password: PasswordCallbackHandler;
    protected _bgRenderer: BootBackgroundRenderer;
    /** BOOT 开场背景已渲染标志 (只在 BOOT 初始化时渲染一次) */
    protected _bootBgRendered: boolean;
    constructor(store: DataStore);
    /** 4 位大写十六进制 RAM 键 */
    protected rk(addr: number): string;
    protected rd(addr: number): number;
    protected wr(addr: number, v: number): void;
    protected rdPtr(lo: number, hi: number): number;
    protected wrPtr(lo: number, hi: number, v: number): void;
    /**
     * NMI 回调分发 (resetEntry) — 依据 ram_00ED 索引分发到对应回调子程。
     * 对应原始 $8484 分发器 + resetEntry (asm $8281/$826D 区)。
     *
     * @param index 回调索引 (ram_00ED)
     */
    resetEntry(index: number): void;
    /** $8484 分发回调 (由 update 每帧调用) */
    onDispatched(index: number, _target: number): void;
    /** 密码校验 — 委托给 PasswordCallbackHandler.check (读 ram_0057 做解码) */
    verifyPassword(): boolean;
    /** idx 0 回调: BOOT 初始化 (对应原始 $821D-$8281) */
    protected _initBoot(): void;
    /** 通用回调处理 (其余索引由 §6 callbackNN 方法覆盖) */
    protected _initScene(_index: number): void;
    /**
     * $8484 场景分发器 (对应原始 $8484:)。
     * LDA ram_00ED → ASL → TAX → 查 PASSWORD_DISPATCH_TABLE → 跳转。
     *
     * TS 版用 16 位数组索引替代 ASL + 字节查表 (ASL 是字节偏移, 数组索引已隐含)。
     *
     * @param index 场景索引 (ram_00ED 值, 0-23)
     * @returns 被分发到的目标地址 (16 位, $A000 窗口偏移), 或 -1 越界。
     */
    dispatchByIndex(index: number): number;
    /**
     * 场景分发主入口 (对应原始 $8484 的调用语义)。
     * 翻译版不执行 6502 的 PHA/RTS 跳转, 直接调 resetEntry 分发。
     */
    dispatchPassword(index: number): number;
    /** 每帧推进路由: 依据 ram_00ED 分发当前场景 */
    update(frame: number): void;
    /**
     * $8000-$815F NMI 渲染主程。
     *
     * asm 流程:
     *   $8000-$800D: OAM DMA (写 $2003/$4014, ram_0628 标志检查)
     *   $800F-$8046: NT buffer 写入 (ram_05E8 表 → $2006/$2007)
     *   $8048-$805A: 清 ram_0628 + $2006 复位
     *   $805D-$808E: 滚动寄存器写入 ($2000/$2001/$2005)
     *   $8091-$80AF: MMC3 IRQ 计数器设置 + bank 切换
     *   $80B1-$80D4: CHR bank 切换 ($8000/$8001 寄存器)
     *   $80D7-$8137: 手柄读取 (8 位循环, ram_001B 区)
     *   $8116-$8137: ram_00E1/E2/E3 累加 + ram_003A 递增
     *
     * 翻译版: PPU/OAM/滚动由 core/ppu + PpuSync 驱动, 手柄由 Controller 驱动,
     *         MMC3 bank 切换由 mapper4.prgBankMap 维护。
     *         此方法翻译 asm 语义, 硬件操作通过 DataStore 缓存状态。
     */
    nmiRender(): void;
    /**
     * 写单个 VRAM 字节 ($2007 写语义, 原版 PPU 地址自动递增)。
     * 翻译版直写 DataStore (去 CPU 化, 无 PPU 寄存器):
     *   $2000-$2FFF (NT 区) → writeNT 网格 (nt0: $2000 基址 / nt1: $2800 基址,
     *                与 src/game/index.ts writeNameTable 的物理布局一致)
     *   $3F00-$3FFF (调色板区) → paletteTable (NES 调色板索引 → RGB)
     *   其他地址 (图案表/滚动寄存器等) → 由 CHR/滚动管线管理, 此处忽略
     */
    protected writeVramByte(vramAddr: number, val: number): void;
    /**
     * 写单个调色板字节 ($3F00-$3F1F, NES 调色板索引 → DataStore.paletteTable RGB)。
     * $3F00-$3F0F = BG 4 组 (每 4 字节一组: 通用色+3 色), $3F10-$3F1F = SPR 4 组。
     * 镜像位 ($3F04/$3F08/$3F0C = $3F00, $3F14/$3F18/$3F1C = $3F10) 直接写同色值,
     * 与真实 PPU 镜像结果一致 (游戏整段写 $3F00 时该位本来就是通用色)。
     */
    protected writePaletteIndex(palByte: number, nesIdx: number): void;
    /**
     * $8160-$81BF 滚动设置 A。
     * asm: STA $E000/$E001 (MMC3 IRQ 关闭), LDX $0078; LDA $0078,X;
     *      BPL $818D (bit7=0 走简单滚动);
     *      bit7=1: 延迟 6 循环, LDA $0079,X (Y 滚动), LDY $007A,X (X 滚动),
     *              写 $2006 (NT 选择), $2000 &= $FC (清滚动位), $2005=0/0, JMP $A1A8;
     *      bit7=0 ($818D): 延迟 2 循环, LSR $0020, LDA $007A,X; LSR; ROL $0020,
     *              $2000=$0020, $2005=$0079,X, $2005=0。
     *
     * @param x ram_0078 索引
     */
    scrollSetupA(x: number): void;
    /**
     * $81C0-$81CA 滚动设置 B。
     * asm: STA $E000 (关 IRQ), STA $0078 (设索引), LDY #$18, JSR $A1CB (延迟), RTS。
     */
    scrollSetupB(): void;
    /**
     * $81CB-$81E3 MMC3 CHR bank 切换。
     * asm: LDX $0078,Y (X = ram[$0078+Y], 零页 Y 变址);
     *      LDA #$00; ORA $0022; STA $8000; STX $8001 (写 CHR bank 寄存器 0);
     *      LDX $0079,Y (X = ram[$0079+Y]);
     *      LDA #$01; ORA $0022; STA $8000; STX $8001 (写 CHR bank 寄存器 1)。
     *
     * 零页 $0078/$0079 是两个相邻的 CHR bank 值表 (每项 1 字节), Y 是索引。
     * 翻译版: 读 DataStore 零页区, 写 CHR bank 缓存供 mapper4 使用。
     *
     * @param y 索引 (Y 寄存器值, 读 ram[$0078+Y] 和 ram[$0079+Y])
     */
    chrBankSwitch(y: number): void;
    /**
     * $820C-$8215 4 入口跳转表。
     * asm: JMP $A855 / $A86E / $A484 / $A8CE
     *
     * @param index 0-3 选择跳转目标
     * @returns 目标地址 (运行时 $A000 窗口)
     */
    jumpTable4(index: number): number;
    /**
     * $82AC-$82E5 pre-main-loop 初始化。
     * asm: JSR $99F0 (清屏), JSR $9B7F (oamClear), 关 NMI ($2000 &= $7F),
     *      清 $FF19-$FFFF 区 (0xE8 字节), 清 $FFE0-$FFFF 区 (0x20 字节),
     *      设 ram_00EC=$68, LDA #$98/LDX #$02/LDY #$04, JSR $AA06 (调色板),
     *      JMP $C557 (进入主循环)。
     */
    preMainLoopInit(): void;
    /**
     * $8338-$83D5 密码场景分支。
     * asm: CMP #$81 (ram_0057 bit7); BEQ $83A3;
     *      $833C: LDX #$67; LDA #$05; JSR $C4BD (切 bank5);
     *      $8343: 清 ram_00ED; 写精灵表 $0468-$0498 (9 球员, X 从 $78 步进 4 到 $FC);
     *      $8372: JSR $9FA8; 等级调节表 $AB1F/$AB21/$AB22;
     *      $83A3: ram_0568 |= $10; JSR $9FA8; ram_0044/0046=$08; ram_056D-=4;
     *             JSR $9FA8; ram_0044=0; ram_0046=$F8; ram_056D+=4; JMP $A3AB。
     *
     * @returns 下一帧分支号 (asm RTS 返回值, 此子程无 RTS 走 JMP)
     */
    passwordBranch(): number;
    /**
     * $8895 rosterLoadMain — 装载主力阵容到 $0408 区。
     * asm $8891: LDY #$00; 循环 LDA $AA47,X; STA $0408,Y; INX; TYA; CLC; ADC #$04;
     *            TAY; CMP #$28; BCC (10 球员循环, $0408 起每 4 字节 1 球员)。
     * @param teamIdx 球队索引 (X 寄存器, 指向 ROSTER_TABLE 偏移)
     */
    protected rosterLoadMain(teamIdx: number): void;
    /**
     * $8920 drawFrame — 画帧 (NT 填充 + OAM 清除)。
     * asm: LDA #$00; STA $00E6; LDA #$20; STA $00E7; LDY #$10; LDX #$20; JSR $98EA (ppuFill $2000 区 16×32);
     *      LDA #$00; STA $00E6; LDA #$24; STA $00E7; LDY #$20; LDX #$20; JSR $98EA (ppuFill $2400 区 32×32);
     *      JSR $9B7F (OAM 清除); RTS
     *
     * 入口 A 寄存器 (frameId) 未被子程使用 ($8920 第一条是 LDA #$00 覆盖 A)。
     */
    protected drawFrame(_frameId: number): void;
    /** ppuFill 辅助: 填 NT 区 16 行 × 32 列 (对应 JSR $98EA, Y=0x10, X=0x20) */
    private ppuFill16x32;
    /** ppuFill 辅助: 填 NT 区 32 行 × 32 列 (对应 JSR $98EA, Y=0x20, X=0x20) */
    private ppuFill32x32;
    /**
     * $9B91 scene02Helper — 清 4 个状态字节 (bank00 $9B91)。
     * asm: LDA #$00; STA $0568; STA $0588; STA $05A8; STA $05C8; RTS
     */
    protected scene02Helper(): void;
    /**
     * $9F96 scene04Helper — 检查协程槽 $0000,X 是否 $FF (bank00 $9F96)。
     * asm: LDA $0000,X; CMP #$FF; BNE $9FA1; LDA #$01; JSR $9FA8; LDA #$00; STA $0000,X; RTS
     * 入口 X=9 (LDX #$09), 检查协程槽 $0009。
     */
    protected scene04Helper(): void;
    /**
     * $9F89 scene05Helper — 协程槽条件置位 (bank00 $9F89)。
     * asm: LDA $0001,X; BEQ $9F95; LDA $0000,X; BNE $9F95; LDA #$01; STA $0000,X; RTS
     * 入口 X=9, 若 $000A=0 或 $0009≠0 则跳过, 否则 $0009=1。
     */
    protected scene05Helper(): void;
    /**
     * $9FA8 waitCounter — 等待 vblank 帧边界 (bank00 $9FA8)。
     * asm: STA $0019; 压栈 X/Y/ED/EC/EB/EA/E9/E8/E7/E6; 挂起协程 → 帧调度恢复。
     * 翻译版: 帧同步由外部帧循环驱动, 此处清 ram_0019 标志 (语义占位)。
     */
    protected waitCounter(): void;
    /**
     * $88FB oamCopy88FB — OAM 拷贝 ($88D0 的别名入口)。
     */
    protected oamCopy88FB(): void;
    /**
     * $8976 scene14Helper — 场景 14 数据装载 (bank02 $8976, 被反汇编误标为 .byte)。
     * asm 调用: LDX #$BD; LDY #$23; JSR $8976 (参数 X=$BD, Y=$23)。
     * 功能: 按 X/Y 参数装载场景数据到 RAM (具体逻辑待反汇编修复后精确翻译)。
     */
    protected scene14Helper(x: number, y: number): void;
    /**
     * $9A35 scene14Helper2 — 渲染刷新 + 渐隐初始化 (bank00 $9A35)。
     * asm: JSR $9B07 (NT 刷新); JSR $9AB8 (OAM 刷新); JSR $9ADA (调色板刷新);
     *      LDX $00E9; JSR $C4B9 (切 bank); LDA #$0F; STA $004A; STA $004B; JMP $9A71 (渐隐)
     * 翻译版: 渐隐计数器设为 15, 帧循环驱动渐隐效果。
     */
    protected scene14Helper2(): void;
    /**
     * $A82F scene14Sprite — 精灵属性清除 (运行时 $A82F = asm $882F = spriteAttrClear)。
     * asm: STA $00EC (结束地址); STX $00ED (起始地址); LDY=循环次数;
     *      循环: LDA $0468,X; CMP #$82; BCS; LDA $046A,X; AND #$F3; STA $046A,X;
     *      INX×4; CPX $00EC; BNE; DEY; BNE。
     * @param yCycles 循环帧数 (Y 寄存器)
     * @param xStart 起始地址 (X 寄存器 → ram_00ED)
     * @param ecEnd 结束地址 (A 寄存器 → ram_00EC)
     */
    protected scene14Sprite(yCycles: number, xStart: number, ecEnd: number): void;
    /**
     * $855A-$8579 场景 idx 1 帧处理 (角度计算)。
     * asm: LDA #$00; STA $0060; LDA $00EC; LSR; ROR $0060; LSR; ROR $0060;
     *      STA $0061; BIT $0062; BMI $8579;
     *      LDA #$00; SEC; SBC $0060; STA $0060; LDA #$00; SBC $0061; STA $0061;
     *      LDA #$03; RTS
     *
     * 计算 ram_00EC >> 2 → ram_0060/0061 (16 位), 若 ram_0062 bit7=0 则取补。
     */
    callback01(): number;
    /** $857C-$8580 场景 idx 2 帧处理。asm: JSR $9B91; LDA #$02; RTS */
    callback02(): number;
    /** $85A2-$85AF 场景 idx 4 帧处理。asm: LDX #$09; JSR $9F96; LDA #$02; RTS */
    callback04(): number;
    /** $85B1-$85B7 场景 idx 5 帧处理。asm: LDX #$09; JSR $9F89; LDA #$02; RTS */
    callback05(): number;
    /** $85DC-$85E7 场景 idx 8 帧处理。asm: LDA #$00; JSR $8895; LDA #$05; JSR $8920; LDA #$02; RTS */
    callback08(): number;
    /**
     * $85E9-$85F8 场景 idx 9 帧处理 (带 ram_000D 分支)。
     * asm: LDA $000D; BNE $85FA; LDA #$10; JSR $8895; LDA #$06; JSR $8920; LDA #$02; RTS
     */
    callback09(): number;
    /** $85FA-$8601 场景 idx 10 帧处理。asm: LDA #$00; STA $000D; STA $000E; LDA #$02; RTS */
    callback10(): number;
    /**
     * $8603-$8612 场景 idx 11 帧处理 (带 ram_000D 分支)。
     * asm: LDA $000D; BNE $8614; LDA #$30; JSR $8895; LDA #$08; JSR $8920; LDA #$02; RTS
     */
    callback11(): number;
    /** $8614-$861B 场景 idx 12 帧处理。asm: LDA #$00; STA $000D; STA $000E; LDA #$02; RTS */
    callback12(): number;
    /** $861D-$8628 场景 idx 13 帧处理。asm: LDA #$20; JSR $8895; LDA #$07; JSR $8920; LDA #$02; RTS */
    callback13(): number;
    /**
     * $862A-$864E 场景 idx 14 帧处理。
     * asm: LDX #$BD; LDY #$23; JSR $8976; JSR $9A35; LDA #$01; JSR $9FA8;
     *      ram_058F &= $7F; ram_004C=$82; LDY #$28; LDX #$20; LDA #$C8; JSR $A82F;
     *      LDA #$02; RTS
     */
    callback14(): number;
    /**
     * $8651-$869A 场景 idx 15 帧处理 (密码续关数据装载)。
     * asm: LDA #$00; STA $00ED; LDY $00ED; LDA $AA97,Y → ram_00EA/00EB;
     *      ram_007B &1 <<2 | ram_00EB; TAX; INY; LDA $AA97,Y → ram_00EB; INY;
     *      LDA $AA97,Y; INY; STY $00ED; LDY $00EB; JSR $9B28; AND #$7F; STA $00EB;
     *      循环: LDA #$00; STA $05E8,X; INX; DEC $00EB; BNE (清 NT buffer);
     *      JSR $9B5E; BIT ram_00EA; BMI $869A; BVC $8655; JSR $9FA8; JMP $A655;
     *      LDA #$02; RTS
     */
    callback15(): number;
    /**
     * $869D-$86D2 场景 idx 16 帧处理 (比赛阵容装载 A)。
     * asm: LDA $04E5; CMP #$FF; BEQ $86D4; JSR $A767;
     *      LDY #$80; ram_00EA=0; LDX #$2F; ram_00ED=$FF; ram_00EC=$FE; ram_00EB=$07;
     *      LDA #$F7; JSR $A72C; LDY #$D8; LDX #$30; ram_00ED=$01; ram_00EC=$FF;
     *      ram_00EB=$FC; JSR $A72C; LDA #$02; RTS
     */
    callback16(): number;
    /**
     * $86D4-$872A 场景 idx 16b 帧处理 (比赛阵容装载 B)。
     * asm: JSR $A767; LDY #$80; LDX #$2F; ram_00EA=$02; ram_00ED=$FF; ram_00EC=$FE;
     *      ram_00EB=$07; LDA #$F7; JSR $A72C; LDX #$08; LDA #$FE; JSR $A72C;
     *      LDY #$FC; 拷贝 $A67B 表 → $0460; LDY #$B8; LDX #$1C; ram_00ED=$02;
     *      ram_00EC=$FF; ram_00EB=$03; LDA #$F6; JSR $A72C;
     *      LDY #$D8; $046A |= $02 循环; LDA #$02; RTS
     */
    scene16b_frame(): number;
    /** $877B-$8780 场景 idx 17 帧处理。asm: LDA #$80; JSR $8895; LDA #$02; RTS */
    callback17(): number;
    /** $8783-$878C 场景 idx 18 帧处理。asm: LDA #$02; JSR $9FA8; JSR $88FB; LDA #$02; RTS */
    callback18(): number;
    /**
     * $87BE-$87CD 场景 idx 20 帧处理。
     * asm: LDA #$01; JSR $9FA8; LDY #$28; LDX #$64; LDA #$B0; JSR $A82F; LDA #$02; RTS
     */
    callback20(): number;
    /** $87CF-$87D5 场景 idx 21 帧处理。asm: LDA #$81; JSR $8895; LDA #$02; RTS */
    callback21(): number;
    /**
     * $87D7-$87F9 场景 idx 22 帧处理 (精灵属性批量设置)。
     * asm: LDY #$80; LDA #$01; JSR $9FA8; LDX #$20;
     *      循环: LDA $0468,X; BPL $87ED; LDA $046A,X; ORA #$04; STA $046A,X;
     *      INX×4; CPX #$C4; BNE; DEY; BNE; LDA #$02; RTS
     *
     * 128 帧 (Y=0x80) 循环, 每帧扫描 $0468-$04C4 工作精灵表 (X 从 0x20 步进 4),
     * 若精灵 Y 坐标 ($0468,X) < 0x80 (BPL), 则给属性字节 ($046A,X) 置 bit2。
     */
    callback22(): number;
    /**
     * $872C-$8765 精灵批量生成。
     * asm: STA $00E9; 循环 X 次:
     *      ram_04E4 += ram_00ED; ram_04E7 += ram_00EC;
     *      if (ram_04E7 & ram_00EB == 0): 写 $0468-$046B,Y 4 字节;
     *      JSR $9FA8; DEX; BNE
     *
     * @param count 生成数量 (X 寄存器)
     */
    spriteBatchGen(count: number): void;
    /**
     * $8767-$8771 精灵表拷贝。
     * asm: LDY #$FC; 循环: LDA $A677,Y; STA $03E8,Y; INY; BNE
     * 把 $A677 表 (4 字节: $79,$FF,$03,$C2) 拷贝到 $03E8 区。
     * Y 从 $FC 开始, INY 到 $00 时 BNE 失败退出, 共拷 4 字节 ($FC/$FD/$FE/$FF → $03E4-$03E7)。
     */
    spriteTableCopy(): void;
    /**
     * $882F-$8853 精灵属性清除。
     * asm: STA $00EC; STX $00ED; LDA #$01; JSR $9FA8;
     *      循环: LDA $0468,X; CMP #$82; BCS; LDA $046A,X; AND #$F3; STA $046A,X;
     *      INX×4; CPX $00EC; BNE; DEY; BNE
     *
     * @param ec 结束地址低字节 (ram_00EC, CPX 比较)
     * @param ed 起始地址高字节 (ram_00ED, 未直接使用)
     * @param yCycles 循环次数 (Y 寄存器, 外层帧数)
     */
    spriteAttrClear(ec: number, ed: number, yCycles: number): void;
    /**
     * $8857-$88B5 阵容装载。
     * asm: LDA $00E4; CMP $0026; BCS $88A8;
     *      $0026 分支: 0→$887C, 6→$8884, 0C→$887C, 10→$888C;
     *      $887C: LDX #$00; JSR $A8B7; JMP $A8A3;
     *      $8884: LDX #$0C; JSR $A8B7; JMP $A8A3;
     *      $888C: LDX #$18; JSR $A8B7;
     *      $8891: LDY #$00; LDA $AA47,X; STA $0408,Y; INX; TYA; CLC; ADC #$04;
     *             TAY; CMP #$28; BCC (10 球员循环);
     *      $88A3: LDA $AA75,X; STA $002A; ram_0026+3 → ram_002B
     *
     * 按 ram_0026 (球队索引) 选 ROSTER_TABLE 偏移, 装载 10 球员到 $0408 区。
     */
    rosterLoad(): void;
    /** $88A3 属性装载: LDA $AA75,X; STA $002A; ram_0026+3 → ram_002B */
    private rosterAttrLoad;
    /**
     * $88B7-$88CC 阵容装载 B (替补席)。
     * asm: LDA #$0B; STA $00ED; LDY #$00;
     *      循环: LDA $AA47,X; STA $0300,Y; INX; TYA; CLC; ADC #$0C; TAY;
     *             CMP #$84; BCC (11 球员循环, 0x0C 字节步长);
     *      RTS
     *
     * @param xStart 起始索引 (X 寄存器, 指向 ROSTER_TABLE 偏移)
     */
    rosterLoadB(xStart: number): void;
    /**
     * $88D0-$88FD OAM 拷贝。
     * asm: LDA #$01; JSR $9FA8; LDY #$00;
     *      循环: LDX $0468,Y; LDA $046A,Y; AND #$0C; BEQ $88E1;
     *             LDX #$F8; (隐藏精灵);
     *      TXA; STA $0200,Y (OAM Y);
     *      LDA $0469,Y; STA $0201,Y (OAM tile);
     *      LDA $046A,Y; STA $0202,Y (OAM attr);
     *      LDA $046B,Y; STA $0203,Y (OAM X);
     *      INY×4; BNE (64 精灵循环)
     *
     * 把 $0468-$0467,FF 区 (工作精灵表) 拷贝到 $0200-$02FF (OAM)。
     * 隐藏条件: $046A,Y & $0C != 0 → Y = $F8 (屏幕外)
     */
    oamCopy(): void;
}
export default BootRouter;

/**
 * HardwareInitService — 硬件初始化 (RESET 后第一件事)
 * @bank 30 ($C000-$DFFF 固定窗口)
 *
 * 职责: RESET 向量链 ($FFF0→$C503→$C64E 主初始化)、场景重置辅助 $CEFE、
 * bank 窗口配置 + 场景引导 $C400、精灵区清理 $CF1F、名称表清理 $CB35/$CB5C、
 * OAM 全离屏填充 $CB8B。
 *
 * 翻译版不写 MMC3/PPU/APU 寄存器 (帧合成器按 DataStore 消费), 直接初始化
 * RAM 默认值并驱动 BootRouter 进入 BOOT 场景。
 *
 * 命名规范: 旧名 Bank30Service → 新名 HardwareInitService。
 */
import { DataStore } from '../../data/store/DataStore';
import type { GameSystemService } from './GameSystemService';
import type { BootRouter } from './BootRouter';
import type { SkillService } from '../skill/SkillService';
export declare class HardwareInitService {
    protected _store: DataStore;
    protected _system: GameSystemService;
    protected _scene: BootRouter;
    protected _skill: SkillService;
    /** PrgBankService 引用 — 初始 bank 配置 ($C4B2/$C4B9), 组合根注入 */
    protected _pb: import('./PrgBankService').default | null;
    constructor(store: DataStore, system: GameSystemService, scene: BootRouter, skill: SkillService);
    /** 注入 PrgBankService (初始 bank 配置), 组合根注入 */
    setPrgBank(pb: import('./PrgBankService').default): void;
    protected rd(addr: number): number;
    protected wr(addr: number, v: number): void;
    init(): void;
    /** 统计 NT0 非零 tile 数 (调试用) */
    protected countNt(): number;
    resetScene(sceneId: number): void;
    bootScene(sceneId: number): void;
    clearNameTables(): void;
    /** $CB5C: 清一个名称表 (0x300+0x40 字节) + 回卷 0,0 */
    protected clearOneNameTable(addr: number): void;
    fillOamOffscreen(): void;
    clearSpriteRam(): void;
    /**
     * $C515 → $CB0F: 协程让出核心。
     * asm: LDA #$00; STA $007F; 保存 X/Y; LDX $0000 (协程槽);
     *   存 bank24/25/标志/栈指针 到协程槽; JMP $CAA5 (调度器)。
     * H5 版: 不做真正协程切换, 用帧计数模拟 (标记等待, 下一帧推进)。
     * @param a 让出参数 (1=等1帧, 2=等2帧, $60=等96帧等)
     */
    coroutineYield(a?: number): void;
    /**
     * $C50C → $CD7C: 比赛阶段→RAM玩家数据指针查表。
     * asm $CD77: LDA $05FB; EOR #$0B; ASL; TAY; LDA $CD89,Y; STA $0034; LDA $CD8A,Y; STA $0035。
     * $CD89 表 32 项 16 位指针, 全在 $0300-$042C (RAM 玩家数据区)。
     * 已查证: 索引 = (比赛阶段 ^ $0B) << 1。
     */
    subC50C(): void;
    /**
     * $C524 → $CBC2: 坐标变换 (A 输入 → A 输出, Y 为分段标志)。
     * asm $CBC2: 分段比较 $A0/$C8/$1F/$B4, 移位/加减换算精灵坐标。
     * 字节已验证 (bank30 off $BC2): 逐指令翻译, 无 stub。
     */
    subC524(a: number): number;
    /**
     * $C530 → $CC02: 调色板表拷贝 (NOT NT fill)。
     * asm $CC02 (bank30 off $C02, 字节已验证):
     *   源指针 $65/$66 = $FBCC + A*12 (A*8 高字节进位 + ADC #$CC/#$FB);
     *   16 次循环写 $046F+X: X&3==0 写 $0F (透明), 否则 LDA($65),Y (Y 回绕 256→$0F);
     *   结束 $046C=0x20 (下一精灵批计数基址)。
     * @param x 目标 $046F 偏移 (0x10=背景组 / 0x00=精灵组)
     * @param a 源调色板组索引 ($15/$16 由 matchInit9349 传入)
     */
    subC530(x: number, a: number): void;
    /**
     * $C52D → $CC46: 精灵批初始化。
     * asm (bank30 off $C46, 字节已验证): 清 $05F4; PHA #$06; 让出; 等 $0515=0;
     *   $0515=1; 清 $04A5-$04F4 (0x50B); $04A5/$04C0=$18; $04A6=$20;
     *   PLA(#$06)|#$08 → LSR/ROR $04A6 ×2 → $04A7/$04C2=$23, $04C1=$A8;
     *   $0515=$80。消费方: bank19 event0 ($B1A6)。
     */
    subC52D(): void;
    /**
     * $C533 → $CCD2: NT 刷新 (PPU buffer → PPU VRAM)。
     * asm $CCD2: 读 $05E8 buffer, 写 $2006/$2007。
     * H5 版: no-op (帧合成器直接从 DataStore 读 NT)。
     */
    subC533(): void;
    /**
     * $C54E → $CBB0: 设精灵批等待标志。
     * asm (bank30 off $BB0, 字节已验证): STA $0518; LDA #$80; STA $0516;
     *   LDA #$00; STA $0005; LDA #$00; JSR $CB0F (让出)。
     * 消费方: bank19 event0 ($B1A6) — 参数为精灵批索引。
     */
    subC54E(a: number): void;
}
export default HardwareInitService;

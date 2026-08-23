/**
 * InterruptService — NMI/IRQ 帧服务
 * @bank 31 ($E000-$FFFF 固定窗口, 含 Reset/NMI/IRQ 向量) + bank30 NMI 处理 $C500
 *
 * 真实向量: NMI=$C500 (→$C76E), RESET=$FFF0 (→$C503→bank30 $C64E), IRQ=$C506 (→$C821)。
 * 翻译版无 CPU 中断: 帧循环直接调 nmi() 完成 NMI 语义的每帧更新。
 *
 * 命名规范: 旧名 Bank31Service/InterruptService → 新名 InterruptService。
 */
import { DataStore } from '../../data/store/DataStore';
import type { GameSystemService } from './GameSystemService';
import type { BootRouter } from './BootRouter';
/** bank 配置表 (结构化数据, 原 MMC3 窗口映射) */
export interface BankConfig {
    bank: number;
    window: 'A000' | 'C000' | 'E000';
}
export declare class InterruptService {
    protected _store: DataStore;
    protected _system: GameSystemService | null;
    /** bank02 NMI 渲染执行器 (BootRouter.nmiRender, $8000-$8137) — 组合根注入 */
    protected _router: BootRouter | null;
    /** MMC3 mapper 引用 (CHR bank 切换 $C9E9, 组合根注入) */
    protected _mmap: any;
    protected _chrInitialized: boolean;
    /** 上一帧输入掩码 (用于计算按下沿 ram_001E) */
    protected _prevInput: number;
    constructor(store: DataStore, system?: GameSystemService);
    /** 挂接主循环服务 (组合根注入) */
    attachSystem(system: GameSystemService): void;
    /** 挂接 bank02 NMI 渲染执行器 (组合根注入) */
    attachRouter(router: BootRouter): void;
    /** 挂接 MMC3 mapper (CHR bank 切换 $C9E9, 组合根注入) */
    attachMapper(mmap: any): void;
    protected rd(addr: number): number;
    protected wr(addr: number, v: number): void;
    reset(): void;
    nmi(frame: number): void;
    protected _commitVramBuffer(): void;
    protected _readInput(): void;
    /**
     * $C9E9: MMC3 CHR bank 配置 — 读 $0490-$0497 bank 表, 模拟 $8000/$8001 写入。
     * 原版: $0022→$8000(选slot), $0490,X→$8001(bank值), mapper4 收到后 load1kVromBank。
     * $0490-$0497: 8 字节, 前 2 字节是 R0/R1 (2KB pair), 后 6 字节是 R2-R5 (1KB each)。
     * $C9E9 逻辑: X=0(SPR)或4(BG), 读 $0490[X],X+1 作为 R0/R1, X^4 切换读 R2-R5。
     */
    protected _configureChrBanks(): void;
}
export default InterruptService;

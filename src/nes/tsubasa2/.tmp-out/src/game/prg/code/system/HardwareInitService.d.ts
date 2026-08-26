/**
 * HardwareInitService — 系统初始化 / 主循环调度 / 通用算子
 *
 * 行为翻译（去 CPU 化）：
 * - reset()：RESET 序列：RAM 清零 → OAM 隐藏 → 游戏 RAM 清零 →
 *   CTRL/MASK/bank 基址初始化 → 调色板装载 → 渲染队列入队 → boot 任务注册
 * - clearGameRam() / clearNameTables()：游戏 RAM / NT 大块清零
 * - prepareScene()：场景切换前序（关 IRQ / 隐藏 OAM / 清 NT / PPU CTRL+MASK）
 * - tick()：任务槽调度器（7 槽 × 4 字节；H5 回调版替代原 CPU 栈跳转）
 * - triggerTask() / suspendTask() / registerTask()：任务生命周期
 * - requestAudio() / playSe()：音频请求入队（由 AudioService 消费）
 * - 算子：mult16 / div16 / fieldCoordToTile / gridOffsetBy12 / clearAllPlayers / 碰撞检测
 *
 * 所有数据已声明式化；BOOT_05EB_TABLE / PLAYER_PTR_TABLE 为具名常量。
 */
import type { DataStore } from '../../data/store/DataStore';
/** 球员数据槽（声明式具名表，替代原 PLAYER_PTR_TABLE 数字数组） */
export interface PlayerSlotEntry {
    /** 球员 ID（0-$15 共 22 项；ID 22+ 为预留/共享区） */
    readonly playerId: number;
    /** 数据基址（每球员 12 字节结构，[base+6]=X, [base+8]=Y） */
    readonly baseAddr: number;
}
/**
 * 球员数据槽表（32 项，$0300-$042C 区间）
 * 原 PLAYER_PTR_TABLE 为 16-bit LE 数字数组，查找逻辑（ID → RAM 基址）反推。
 * 具象化后：每项带 playerId，Service 直接 find(playerId).baseAddr。
 */
export declare const PLAYER_SLOTS: ReadonlyArray<PlayerSlotEntry>;
export declare class HardwareInitService {
    readonly store: DataStore;
    constructor(store: DataStore);
    /**
     * RESET 序列：
     * 1. RAM 清零 + RAM_INIT_TABLE
     * 2. OAM 全部 $F8
     * 3. 游戏 RAM 大块清零（$0468-$05FF / $0668-$06FE / $003A-$00DE）
     * 4. CTRL=$08 / MASK=$1E / bank 基址=0
     * 5. 调色板渲染流头（$046C/D/E）
     * 6. 调色板装载 BG($046F) + SPR($047F)
     * 7. 渲染队列入队调色板流 [$046C]
     * 8. BOOT_05EB 表复制
     * 9. 注册 boot 三个任务
     * 10. 开 NMI（CTRL |= $80, $0019 同步）
     * 11. CHR 请求表初始（req0=0, req1=2, $0022=0）
     * 12. 帧计数归零
     */
    reset(): void;
    /**
     * 调色板装载：index → 16 字节 → $046F+x。
     * 装载后 $046C=$20（流长度标记，供队列入队）。
     * @param x  目标偏移（0 或 $10）
     * @param index 调色板表索引
     */
    loadPaletteAt(x: number, index: number): void;
    /**
     * $0498 渲染队列入队。
     * 条目 3 字节 [bank, ptrLo, ptrHi]，指向 RLE 流（$0498 队列消费）。
     * 流头：[count][addrLo][addrHi][data×count]，0 终止。
     * @param bank PRG bank 号（H5 已无 PRG 流读取，仅保留 RAM 视图）
     * @param ptr 流起始 CPU 地址（RAM 区读 store）
     */
    queueRenderEntry(bank: number, ptr: number): void;
    /** 游戏 RAM 大块清零（$0468-$05FF / $0668-$06FE / $003A-$00DE） */
    clearGameRam(): void;
    /**
     * 清空 NameTable 0/1（$2000 与 $2400 起各 0x04C0 字节 + 64 属性）。
     * 经 DataStore VRAM 写透直接落地 PPU。
     */
    clearNameTables(): void;
    /** 清单个 NT（基址高字节 0x20/0x24） */
    clearOneNameTable(hi: number): void;
    /**
     * 场景切换前序：关 IRQ / 隐藏 OAM / 清 NT / PPU CTRL+MASK / bank 基址=0
     */
    prepareScene(sceneId: number): void;
    /** 任务槽基址（7 个槽 × 4 字节） */
    private static readonly TASK_SLOTS;
    /** H5 任务回调表（原 CPU 栈跳转 → 函数调用）；未注册回调的槽只做 RAM 状态推进 */
    private readonly taskCallbacks;
    /**
     * 主循环 tick（任务调度器）：
     * 7 个任务槽 × 4 字节 [state, sp, entryHi, entryLo]：
     * - state=0 空槽跳过
     * - state=$FF 首次启动 → 执行回调
     * - state=N 倒计时；DEC-1；到 0 → 执行回调
     * H5 由 BootRouter 每帧调用。
     */
    tick(): void;
    /** 槽触发 → 执行 H5 回调（原 RTS 弹栈跳入口） */
    private dispatchTask;
    /**
     * 触发任务（槽 sp≠0 且状态==0 → 状态=1，下一帧执行）。
     */
    triggerTask(slotIndex: number): void;
    /**
     * 音频请求入队（$0700 起 5 槽，空槽写入 A）。
     * 消费方：AudioService。
     */
    requestAudio(a: number): void;
    /**
     * SE 请求（$0518=SE id，$0516=$80 待待消标志，$0005 清槽）。
     * 消费方：AudioService。
     */
    playSe(seId: number): void;
    /**
     * 球员数据指针查表。
     * A = $05FB ^ $0B；A <<= 1；ptr = PLAYER_PTR_TABLE[A>>1]（16bit LE）。
     * 结果写入 $0034/$0035（原版间接指针视图），并返回。
     */
    resolvePlayerPointer(): number;
    /**
     * 除 12 网格偏移（菜单 12 列布局）。
     * 入 A（0-255）；商 q=A/12、余 r=A%12。
     * 出 {x=r*8+$54, y=q*8+$34}（网格坐标）。
     */
    gridOffsetBy12(a: number): {
        x: number;
        y: number;
    };
    /**
     * 场地像素坐标 → 瓦片网格换算。
     * X=px-$30（0..$A0），Y=py-$50（0..$60）内才有效；
     * 循环 DEX/ADC#$0C 累积行偏移：col 递减至负 → 返回 A；
     * A 溢出回 0 → 返回 $FF（越界/网格线命中）。
     */
    fieldCoordToTile(px: number, py: number): number;
    /**
     * 清空球员数据（ID 0-$15，共 22 项）：
     *   逐项查 PLAYER_SLOTS → [baseAddr+$0A]=0；
     *   ID==0 或 ID==$0B 时额外 [baseAddr+$07]=0。
     */
    clearAllPlayers(): void;
    /**
     * 按 ID 查球员数据基址（PLAYER_SLOTS 具名查询）。
     * 结果写入 $0034/$0035（原版间接指针视图），并返回。
     */
    resolvePlayerPointerById(id: number): number;
    /**
     * 球员碰撞检测：
     * 球员指针指向数据的 [y+6]（X 坐标）、[y+8]（Y 坐标）；
     * 与 $0635/$0637 差值的绝对值均 < $0047（半径）→ 碰撞（返回 true）。
     */
    checkPlayerCollision(ptr: number): boolean;
    /**
     * 16bit × 16bit 乘法（$0067/$0068 × $0069/$006A → $006B-$006E 32bit）。
     * 逐位 ROR 移位累加（ROR $0068 → ROR $0067 → 进位入累加器高位）。
     */
    mult16(): void;
    /**
     * 16bit ÷ 16bit（$006F/$0070 ÷ $0071/$0074 → 商 $006F/$0070、余 $0072/$0073）。
     * 恢复除除：每次迭代余数左移并入被除后最高位，够减则减并置商位。
     */
    div16(): void;
    /**
     * 注册任务（H5 回调版）：
     * - 入口地址写入 $0101+sp（hi@+0/lo@+1）
     * - 槽状态置 $FF
     * - 注册 H5 回调（原 CPU 入口对应函数）
     */
    registerTask(slotIndex: number, sp: number, entryHi: number, entryLo: number, fn?: () => void): void;
    /**
     * 挂起当前任务（最近触发槽）：置 countdown。
     * 0 = 下一帧恢复。
     */
    suspendTask(countdown: number): void;
    /** 最近触发槽（$CB0F 挂起目标） */
    private lastFiredSlot;
}

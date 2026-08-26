/**
 * ScriptEngine — 剧情脚本执行引擎
 *
 * 来源：bank00/code_sub.s $90B0-$94FF 调度器（多 slot VM，每 slot 一个 VM）。
 * TS 翻译为面向对象单 VM 模式（slot=0），保留 OP 分派语义：
 *   1. 当前 IP 读 1 字节 opcode
 *   2. CMP #$6D：< 直接模式 handler；>= 间接模式（减 $6D 当索引查表）
 *   3. handler 消费参数，副作用推进 IP
 *
 * 行为由 OPCODE_HANDLERS 注册；每个 handler 返回 false 表示本帧不再继续（吃满帧）。
 *
 * 部署：Scene18/Story 场景按帧调用 step()，handler 通过 side-effect 写到 DataStore 各视图。
 */
import type { DataStore } from '../../data/store/DataStore';
import type { ScriptLoader } from './ScriptLoader';
/** 脚本运行状态（对应每个 VM slot 的状态结构） */
export interface ScriptContext {
    /** 当前指令指针（脚本数据内偏移，等价 asm $004D/$004E） */
    ip: number;
    /** 参数栈（等价 asm 隐式栈，TS 显式） */
    stack: number[];
    /** 等待帧计数（WAIT opcode 倒数，对应 asm 帧计数器） */
    waitFrames: number;
    /** 是否等待用户输入（任意键继续 / 选择） */
    waitingInput: boolean;
    /** 段号（多段脚本时切换） */
    segmentId: number;
    /** 结束标志 */
    finished: boolean;
    /** 当前装载的指令流（只读视图，对应 asm $00ED 标识的 VM slot） */
    bytes: ReadonlyArray<number>;
}
/** 调度器的间接模式查找（bank18 段指针表中 2 字节地址 → opcode 入口） */
export interface IndirectResolver {
    (opcodeMinusBase: number): number;
}
/**
 * ScriptEngine 调度器
 *
 * 设计：调度循环在 step() 内每帧推进 0..N 个 opcode 直到
 *  handler 返回 false / WAIT_N / 未注册 opcode。保证与原版行为一致。
 */
export declare class ScriptEngine {
    readonly store: DataStore;
    readonly loader: ScriptLoader;
    /** 间接模式 handler 解析器（bank18 → 入口地址）；可省略走默认 null */
    readonly indirect: IndirectResolver | null;
    constructor(store: DataStore, loader: ScriptLoader, 
    /** 间接模式 handler 解析器（bank18 → 入口地址）；可省略走默认 null */
    indirect?: IndirectResolver | null);
    /**
     * 装载并启动一段脚本
     * 对应 asm `LDA $00ED; STX $00ED; LDA ($004D),Y`：装载段流 → 初始化上下文。
     */
    start(scriptId: number): ScriptContext | null;
    /**
     * 装载指定 IP 起点的子段（Call/Return 用）
     * 对应 asm $9201-$923E 的子段调用路径。
     */
    startAt(bytes: ReadonlyArray<number>, startIp: number): ScriptContext;
    /**
     * 推进一步（执行一帧脚本）
     * 返回：true = 仍在运行（VM 还想继续）；false = 本帧已饱和。
     * 等价 asm dispatch loop $90E4-$94D2。
     */
    step(ctx: ScriptContext): boolean;
    /**
     * 缺省间接解析器：从 BANK18_DATA_TABLES 中读出 16-bit 入口（reserve placeholder）。
     * 真实项目应使用 StoryController 注入专用解析器。
     */
    static defaultIndirectFromBank18(_opcodeMinusBase: number): number;
    /**
     * 范围检查常量（暴露供测试/调试用）。
     */
    static readonly DIRECT_MAX: number;
    static readonly INDIRECT_BASE: number;
}

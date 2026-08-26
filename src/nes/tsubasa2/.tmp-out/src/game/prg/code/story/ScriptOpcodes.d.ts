/**
 * ScriptOpcodes — 剧情脚本操作码定义
 *
 * 来源：bank00/code_sub.s $90B0-$94FF 调度器 + bank03-bank10/bank18 数据表
 * 翻译原则：
 *   - opcode 数值与 asm 完全一致，禁止臆造
 *   - 高位语义区段（CMP 阈值 $6D = 109）：
 *     - [0x00, 0x6C] 直接模式：handler 在 bank00 中直接执行
 *     - [0x6D, 0xFF] 间接模式：handler 地址存在 bank18 数据表中，跳转读取
 *   - 每个 opcode 的 handler 用 `(ctx, args) => void` 形式注入 ScriptEngine
 */
import type { ScriptContext } from './ScriptEngine';
import type { CharMap } from './CharMap';
/** 处理器签名：opcode 字节 | 上下文 | 读取字节流的 lambda */
export type OpcodeHandler = (ctx: ScriptContext, read: () => number) => boolean | void;
/** 操作码枚举（值与 asm 一致） */
export declare enum ScriptOpcode {
    /** [0x00] NOP / 占位（asm 中 0 终止符） */
    Nop = 0,
    /** [0x01] 显示一个文本字符（CharMap → tile，写 NT/OAM） */
    TextChar = 1,
    /** [0x02] 等待帧数（1 字节参数） */
    WaitFrames = 2,
    /** [0x03] 等待用户输入（A/B/任意键） */
    WaitInput = 3,
    /** [0x04] 无条件跳转（2 字节相对偏移） */
    Jump = 4,
    /** [0x05] 条件分支（取标志位） */
    Branch = 5,
    /** [0x06] 子段调用 */
    Call = 6,
    /** [0x07] 子段返回 */
    Return = 7,
    /** [0x08] 设置调色板索引（2 字节：pal, count） */
    SetPalette = 8,
    /** [0x09] 装载 OAM 精灵（来自数据指针） */
    LoadSprite = 9,
    /** [0x0A] 播放 BGM（1 字节：songId） */
    PlayBgm = 10,
    /** [0x0B] 播放 SE（1 字节：seId） */
    PlaySe = 11,
    /** [0x0C] 等 N 个 VBlank（rti 计数） */
    WaitVBlank = 12,
    /** [0x0D] 段结束标记 */
    EndSegment = 13,
    /** [0x0E] 跳转到段号（重置 IP） */
    JumpSegment = 14,
    /** [0xFF] 脚本结束（整段终止） */
    EndScript = 255
}
/** 直接模式上限阈值（与 asm CMP #$6D 一致） */
export declare const OPCODE_DIRECT_MAX = 108;
/** 间接模式起点（与 asm CMP #$6D + SEC SBC #$6D 一致） */
export declare const OPCODE_INDIRECT_BASE = 109;
/**
 * 计算 opcode 模式（直接 / 间接）并返回归一化索引。
 */
export declare function classifyOpcode(opcode: number): {
    direct: boolean;
    index: number;
};
/**
 * 框架接口：ScriptEngine 通过该接口消费业务能力（不直接依赖具体 Service）
 */
export interface ScriptRuntime {
    /** 读 RAM（按 4 位大写补零地址，如 'ram_0025'） */
    readRam(addr: number): number;
    /** 写 RAM */
    writeRam(addr: number, value: number): void;
    /** CharMap（字符 → tile） */
    charMap?: CharMap | null;
    /** 播放 BGM */
    playBgm?(id: number): void;
    /** 播放 SE */
    playSe?(id: number): void;
    /** 装载 OAM 精灵（按 sprite id 写入 $0200） */
    loadSprite?(id: number, x: number, y: number, attr: number): void;
    /** 设置 BG/SPR 调色板 */
    setPalette?(bgIdx: number, sprIdx: number): void;
}
/** 注册运行时（StoryController / Story 服务启动时调用一次） */
export declare function setScriptRuntime(rt: ScriptRuntime | null): void;
/** opcode → handler 注册表 */
export declare const OPCODE_HANDLERS: Partial<Record<ScriptOpcode, OpcodeHandler>>;
/** 注册一个 opcode handler（允许外部 Service 注入自定义实现） */
export declare function registerHandler(opcode: ScriptOpcode, handler: OpcodeHandler): void;
/** 取 opcode handler */
export declare function getHandler(opcode: ScriptOpcode): OpcodeHandler | null;
/** 初始化 opcode 表（注册所有内置 handler） */
export declare function initScriptOpcodes(): void;

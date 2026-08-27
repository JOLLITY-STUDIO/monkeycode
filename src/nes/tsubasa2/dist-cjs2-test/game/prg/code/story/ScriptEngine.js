"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptEngine = void 0;
const ScriptOpcodes_1 = require("./ScriptOpcodes");
/**
 * ScriptEngine 调度器
 *
 * 设计：调度循环在 step() 内每帧推进 0..N 个 opcode 直到
 *  handler 返回 false / WAIT_N / 未注册 opcode。保证与原版行为一致。
 */
class ScriptEngine {
    constructor(store, loader, 
    /** 间接模式 handler 解析器（bank18 → 入口地址）；可省略走默认 null */
    indirect = null) {
        this.store = store;
        this.loader = loader;
        this.indirect = indirect;
    }
    /**
     * 装载并启动一段脚本
     * 对应 asm `LDA $00ED; STX $00ED; LDA ($004D),Y`：装载段流 → 初始化上下文。
     */
    start(scriptId) {
        const seg = this.loader.loadSegment(scriptId);
        if (!seg)
            return null;
        return {
            ip: 0,
            stack: [],
            waitFrames: 0,
            waitingInput: false,
            segmentId: scriptId,
            finished: seg.bytes.length === 0,
            bytes: seg.bytes,
        };
    }
    /**
     * 装载指定 IP 起点的子段（Call/Return 用）
     * 对应 asm $9201-$923E 的子段调用路径。
     */
    startAt(bytes, startIp) {
        return {
            ip: startIp & 0xffff,
            stack: [],
            waitFrames: 0,
            waitingInput: false,
            segmentId: -1,
            finished: bytes.length === 0,
            bytes,
        };
    }
    /**
     * 推进一步（执行一帧脚本）
     * 返回：true = 仍在运行（VM 还想继续）；false = 本帧已饱和。
     * 等价 asm dispatch loop $90E4-$94D2。
     */
    step(ctx) {
        if (ctx.finished)
            return false;
        if (ctx.waitFrames > 0) {
            ctx.waitFrames--;
            return ctx.waitFrames > 0;
        }
        if (ctx.waitingInput)
            return false;
        // [对应 asm $90B0 dispatch]
        while (ctx.ip < ctx.bytes.length) {
            const opcode = ctx.bytes[ctx.ip] & 0xff;
            ctx.ip++;
            // 段结束（直接退出）
            if (opcode === ScriptOpcodes_1.ScriptOpcode.EndSegment) {
                ctx.finished = true;
                return false;
            }
            if (opcode === ScriptOpcodes_1.ScriptOpcode.EndScript) {
                ctx.finished = true;
                return false;
            }
            // 读字节流 lambda（handler 消费参数）
            const read = () => {
                if (ctx.ip >= ctx.bytes.length)
                    return 0;
                const v = ctx.bytes[ctx.ip] & 0xff;
                ctx.ip++;
                return v;
            };
            // 1) 优先查直接模式 handler
            let handler = (0, ScriptOpcodes_1.getHandler)(opcode);
            let isIndirect = false;
            let indirectIdx = 0;
            // 2) 落空时按 asm CMP #$6D 路由：< 直接 / >= 间接
            if (!handler) {
                const cls = (0, ScriptOpcodes_1.classifyOpcode)(opcode);
                if (cls.direct) {
                    // 未实现的直接模式 opcode → 跳过下一字节（保守处理）
                    if (ctx.ip < ctx.bytes.length)
                        ctx.ip++;
                    continue;
                }
                if (!this.indirect) {
                    // 没装 indirect 解析器：跳过两字节操作数
                    if (ctx.ip + 1 < ctx.bytes.length)
                        ctx.ip += 2;
                    continue;
                }
                isIndirect = true;
                indirectIdx = cls.index;
                // 间接模式：handler 必须由外部注入（通过 registerHandler 注册）。
                // 否则跳过两字节地址
                if (!handler) {
                    if (ctx.ip + 1 < ctx.bytes.length)
                        ctx.ip += 2;
                    continue;
                }
            }
            // 执行 handler（消费 0..N 个操作数）
            const cont = handler(ctx, read);
            if (cont === false)
                return true; // handler 显式说"本帧到此"
            if (ctx.waitFrames > 0)
                return true; // 进入等待
            if (ctx.waitingInput)
                return false;
        }
        ctx.finished = true;
        return false;
    }
    /**
     * 缺省间接解析器：从 BANK18_DATA_TABLES 中读出 16-bit 入口（reserve placeholder）。
     * 真实项目应使用 StoryController 注入专用解析器。
     */
    static defaultIndirectFromBank18(_opcodeMinusBase) {
        return 0;
    }
}
exports.ScriptEngine = ScriptEngine;
/**
 * 范围检查常量（暴露供测试/调试用）。
 */
ScriptEngine.DIRECT_MAX = ScriptOpcodes_1.OPCODE_DIRECT_MAX;
ScriptEngine.INDIRECT_BASE = ScriptOpcodes_1.OPCODE_INDIRECT_BASE;

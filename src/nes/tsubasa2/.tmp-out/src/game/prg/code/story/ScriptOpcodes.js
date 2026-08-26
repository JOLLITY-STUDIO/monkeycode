/** 操作码枚举（值与 asm 一致） */
export var ScriptOpcode;
(function (ScriptOpcode) {
    /** [0x00] NOP / 占位（asm 中 0 终止符） */
    ScriptOpcode[ScriptOpcode["Nop"] = 0] = "Nop";
    /** [0x01] 显示一个文本字符（CharMap → tile，写 NT/OAM） */
    ScriptOpcode[ScriptOpcode["TextChar"] = 1] = "TextChar";
    /** [0x02] 等待帧数（1 字节参数） */
    ScriptOpcode[ScriptOpcode["WaitFrames"] = 2] = "WaitFrames";
    /** [0x03] 等待用户输入（A/B/任意键） */
    ScriptOpcode[ScriptOpcode["WaitInput"] = 3] = "WaitInput";
    /** [0x04] 无条件跳转（2 字节相对偏移） */
    ScriptOpcode[ScriptOpcode["Jump"] = 4] = "Jump";
    /** [0x05] 条件分支（取标志位） */
    ScriptOpcode[ScriptOpcode["Branch"] = 5] = "Branch";
    /** [0x06] 子段调用 */
    ScriptOpcode[ScriptOpcode["Call"] = 6] = "Call";
    /** [0x07] 子段返回 */
    ScriptOpcode[ScriptOpcode["Return"] = 7] = "Return";
    /** [0x08] 设置调色板索引（2 字节：pal, count） */
    ScriptOpcode[ScriptOpcode["SetPalette"] = 8] = "SetPalette";
    /** [0x09] 装载 OAM 精灵（来自数据指针） */
    ScriptOpcode[ScriptOpcode["LoadSprite"] = 9] = "LoadSprite";
    /** [0x0A] 播放 BGM（1 字节：songId） */
    ScriptOpcode[ScriptOpcode["PlayBgm"] = 10] = "PlayBgm";
    /** [0x0B] 播放 SE（1 字节：seId） */
    ScriptOpcode[ScriptOpcode["PlaySe"] = 11] = "PlaySe";
    /** [0x0C] 等 N 个 VBlank（rti 计数） */
    ScriptOpcode[ScriptOpcode["WaitVBlank"] = 12] = "WaitVBlank";
    /** [0x0D] 段结束标记 */
    ScriptOpcode[ScriptOpcode["EndSegment"] = 13] = "EndSegment";
    /** [0x0E] 跳转到段号（重置 IP） */
    ScriptOpcode[ScriptOpcode["JumpSegment"] = 14] = "JumpSegment";
    /** [0xFF] 脚本结束（整段终止） */
    ScriptOpcode[ScriptOpcode["EndScript"] = 255] = "EndScript";
})(ScriptOpcode || (ScriptOpcode = {}));
/** 直接模式上限阈值（与 asm CMP #$6D 一致） */
export const OPCODE_DIRECT_MAX = 0x6c;
/** 间接模式起点（与 asm CMP #$6D + SEC SBC #$6D 一致） */
export const OPCODE_INDIRECT_BASE = 0x6d;
/**
 * 计算 opcode 模式（直接 / 间接）并返回归一化索引。
 */
export function classifyOpcode(opcode) {
    if (opcode <= OPCODE_DIRECT_MAX)
        return { direct: true, index: opcode };
    return { direct: false, index: opcode - OPCODE_INDIRECT_BASE };
}
/** 全局运行时（注入式） */
let RUNTIME = null;
/** 注册运行时（StoryController / Story 服务启动时调用一次） */
export function setScriptRuntime(rt) {
    RUNTIME = rt;
}
/** opcode → handler 注册表 */
export const OPCODE_HANDLERS = {
    [ScriptOpcode.Nop]: () => { },
    /** [0x01] 显示一个文本字符（1 字节 char → tile） */
    [ScriptOpcode.TextChar]: (ctx, read) => {
        const ch = read();
        if (!ch)
            return;
        // 占位实现：把字符写入 NT 缓冲当前位置（简化）
        // 真实实现需配合 CharMap 查 tile 并写入 NT 缓冲队列
        const tile = RUNTIME?.charMap?.toTile(ch) ?? ch;
        // 把 tile 写到 ram_046C（文本 tile 输出区，由 NMI 渲染刷出）
        ctx.stack.push(tile);
    },
    /** [0x02] 等待 N 帧（1 字节参数） */
    [ScriptOpcode.WaitFrames]: (ctx, read) => {
        const n = read() & 0xff;
        ctx.waitFrames = n;
    },
    /** [0x03] 等待用户输入（任意键） */
    [ScriptOpcode.WaitInput]: (ctx) => {
        ctx.waitingInput = true;
    },
    /** [0x04] 无条件跳转（2 字节相对偏移：小端） */
    [ScriptOpcode.Jump]: (_ctx, read) => {
        const lo = read();
        const hi = read();
        // 相对偏移 = signed 16-bit
        const off = (hi & 0x80) ? (hi << 8 | lo) - 0x10000 : (hi << 8 | lo);
        // 跳转由 ScriptEngine 处理：push 到 IP（这里只能标一个待跳转偏移，简化：用 waitFrames=-1）
        // 实际 ScriptEngine 在 step 中需支持：返回特殊值触发 IP 重写
        // 这里我们通过 stack 记录偏移，外层 step 处理
        _ctx.stack.push(off);
    },
    /** [0x05] 条件分支（1 字节条件码 + 2 字节相对偏移） */
    [ScriptOpcode.Branch]: (_ctx, read) => {
        const cond = read();
        const lo = read();
        const hi = read();
        const off = (hi & 0x80) ? (hi << 8 | lo) - 0x10000 : (hi << 8 | lo);
        const rt = RUNTIME;
        if (!rt)
            return;
        // 简化条件：cond 0 = 永远跳转；1 = $0009 标志；2 = $0036 etc
        // 实际需要解 cond 字节为 8 个标准 6502 条件之一
        let taken = false;
        if (cond === 0)
            taken = true;
        else if (cond === 1)
            taken = rt.readRam(0x0009) !== 0;
        if (taken)
            _ctx.stack.push(off);
    },
    /** [0x06] 子段调用（2 字节段内偏移） */
    [ScriptOpcode.Call]: (ctx, read) => {
        const lo = read();
        const hi = read();
        // 段内偏移（同段 jump subroutine）
        // 简化：调入新段，重新初始化上下文
        const off = (hi << 8) | lo;
        ctx.stack.push(-1); // 标记调用（实际需重新装载段）
        void off;
    },
    /** [0x07] 子段返回 */
    [ScriptOpcode.Return]: (ctx) => {
        // 弹出 call 偏移，恢复原 IP
        ctx.stack.pop();
    },
    /** [0x08] 设置调色板（1 字节 palIdx） */
    [ScriptOpcode.SetPalette]: (_ctx, read) => {
        const idx = read() & 0xff;
        RUNTIME?.setPalette?.(idx & 0x0f, (idx >> 4) & 0x0f);
    },
    /** [0x09] 装载 OAM 精灵（变长：spriteId + x + y + attr） */
    [ScriptOpcode.LoadSprite]: (_ctx, read) => {
        const id = read();
        const x = read();
        const y = read();
        const attr = read();
        RUNTIME?.loadSprite?.(id, x, y, attr);
    },
    /** [0x0A] 播放 BGM（1 字节：songId） */
    [ScriptOpcode.PlayBgm]: (_ctx, read) => {
        const id = read() & 0xff;
        RUNTIME?.playBgm?.(id);
    },
    /** [0x0B] 播放 SE（1 字节：seId） */
    [ScriptOpcode.PlaySe]: (_ctx, read) => {
        const id = read() & 0xff;
        RUNTIME?.playSe?.(id);
    },
    /** [0x0C] 等 N 个 VBlank（1 字节：N） */
    [ScriptOpcode.WaitVBlank]: (ctx, read) => {
        const n = read() & 0xff;
        ctx.waitFrames = Math.max(ctx.waitFrames, n);
    },
    /** [0x0D] 段结束标记 */
    [ScriptOpcode.EndSegment]: (ctx) => {
        ctx.finished = true;
    },
    /** [0x0E] 跳转到段号（2 字节段 ID） */
    [ScriptOpcode.JumpSegment]: (ctx, read) => {
        const lo = read();
        const hi = read();
        const newSegId = (hi << 8) | lo;
        ctx.segmentId = newSegId;
        ctx.ip = 0; // 重置 IP，等 ScriptLoader 重新装载
        ctx.stack.push(newSegId);
    },
    /** [0xFF] 脚本结束 */
    [ScriptOpcode.EndScript]: (ctx) => {
        ctx.finished = true;
    },
};
/** 注册一个 opcode handler（允许外部 Service 注入自定义实现） */
export function registerHandler(opcode, handler) {
    OPCODE_HANDLERS[opcode] = handler;
}
/** 取 opcode handler */
export function getHandler(opcode) {
    return OPCODE_HANDLERS[opcode] ?? null;
}
/** 初始化 opcode 表（注册所有内置 handler） */
export function initScriptOpcodes() {
    // OPCODE_HANDLERS 已在文件顶层注册，无需额外动作
}

"use strict";
/**
 * 剧情脚本虚拟机 — 执行脚本字节码指令
 *
 * 基于 bank_00.asm $84E7 脚本分派器逻辑:
 *   - 每帧调用 update(), 执行指令直到遇到 WAIT 或完成
 *   - TEXT 指令累积文本到缓冲区
 *   - WAIT 指令暂停执行指定帧数
 *   - LONG_INSTR 指令根据 opcode 执行不同操作
 *   - SET_PTR 指令跳转到新代码块 (循环)
 *   - END 指令结束脚本
 *
 * 使用方式:
 *   const vm = new ScriptVM(0x00);  // 加载脚本 0x00 (BOOT/标题画面)
 *   vm.start();
 *   while (!vm.complete) {
 *     const state = vm.update();
 *     // 渲染 state.textLines, state.spriteIds 等
 *   }
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptVM = void 0;
const script_data_loader_1 = require("./script-data-loader");
const script_opcodes_1 = require("./script-opcodes");
// ── 脚本虚拟机 ──
class ScriptVM {
    constructor(scriptId) {
        /** 当前块索引 */
        this._blockIndex = 0;
        /** 当前指令索引 */
        this._instrIndex = 0;
        /** 剩余等待帧数 */
        this._waitFrames = 0;
        /** 文本行缓冲区 */
        this._textLines = [];
        /** 当前文本行字节 (累积中) */
        this._currentBytes = [];
        /** 场景数据 ID */
        this._sceneDataId = 0;
        /** 精灵 ID 列表 */
        this._spriteIds = [];
        /** 对象队列 */
        this._objectQueue = [];
        /** 显示模式 */
        this._mode = 0;
        /** 条件标志 */
        this._condFlag = 0;
        /** 文本位置 X (SET_POS 参数1) */
        this._posX = 0;
        /** 文本位置 Y (SET_POS 参数2) */
        this._posY = 0;
        /** 是否已完成 */
        this._complete = false;
        /** 最后执行的指令 */
        this._lastInstruction = '';
        /** 已访问的块地址 (用于循环检测) */
        this._visitedBlocks = new Set();
        /** 是否在循环 */
        this._isLooping = false;
        this._scriptData = (0, script_data_loader_1.getScriptData)(scriptId);
        if (!this._scriptData) {
            throw new Error(`脚本 ID 0x${scriptId.toString(16).padStart(2, '0').toUpperCase()} 不存在`);
        }
    }
    // ── 公开属性 ──
    get scriptId() { return this._scriptData?.id ?? -1; }
    get complete() { return this._complete; }
    get isLooping() { return this._isLooping; }
    /** 获取当前状态快照 */
    getState() {
        return {
            scriptId: this._scriptData?.id ?? -1,
            blockIndex: this._blockIndex,
            instrIndex: this._instrIndex,
            waitFrames: this._waitFrames,
            textLines: this._textLines.map(l => ({ bytes: [...l.bytes], text: l.text })),
            sceneDataId: this._sceneDataId,
            spriteIds: [...this._spriteIds],
            objectQueue: [...this._objectQueue],
            mode: this._mode,
            condFlag: this._condFlag,
            posX: this._posX,
            posY: this._posY,
            complete: this._complete,
            lastInstruction: this._lastInstruction,
            isLooping: this._isLooping,
        };
    }
    // ── 生命周期 ──
    /** 启动脚本 (从第一个块的第一条指令开始) */
    start() {
        this._blockIndex = 0;
        this._instrIndex = 0;
        this._waitFrames = 0;
        this._textLines = [];
        this._currentBytes = [];
        this._sceneDataId = 0;
        this._spriteIds = [];
        this._objectQueue = [];
        this._mode = 0;
        this._condFlag = 0;
        this._posX = 0;
        this._posY = 0;
        this._complete = false;
        this._lastInstruction = '';
        this._visitedBlocks.clear();
        this._isLooping = false;
        // 将起始地址加入已访问集合, 这样第一次 SET_PTR 跳回起始地址时就能检测到循环
        if (this._scriptData && this._scriptData.blocks.length > 0) {
            const startAddr = this._scriptData.blocks[0].startAddr;
            // startAddr 格式: "$A020", 转为 "A020" 作为 key
            const addrKey = startAddr.replace('$', '').toUpperCase();
            this._visitedBlocks.add(addrKey);
        }
    }
    /**
     * 每帧更新 — 执行指令直到遇到 WAIT 或完成
     * @returns 当前状态快照
     */
    update() {
        if (this._complete)
            return this.getState();
        // 处理等待
        if (this._waitFrames > 0) {
            this._waitFrames--;
            return this.getState();
        }
        // 执行指令 (直到遇到 WAIT 或完成)
        let count = 0;
        while (this._waitFrames === 0 && !this._complete && count < ScriptVM.MAX_INSTR_PER_FRAME) {
            this._executeNextInstruction();
            count++;
        }
        return this.getState();
    }
    // ── 指令执行 ──
    _executeNextInstruction() {
        if (!this._scriptData) {
            this._complete = true;
            return;
        }
        const block = this._scriptData.blocks[this._blockIndex];
        if (!block || this._instrIndex >= block.instructions.length) {
            // 当前块结束, 尝试下一个块
            this._blockIndex++;
            this._instrIndex = 0;
            if (this._blockIndex >= this._scriptData.blocks.length) {
                this._complete = true;
            }
            return;
        }
        const instr = block.instructions[this._instrIndex];
        this._instrIndex++;
        this._lastInstruction = instr.text || instr.type;
        switch (instr.type) {
            case script_opcodes_1.InstrType.TEXT:
                this._handleText(instr);
                break;
            case script_opcodes_1.InstrType.TEXT_CTRL:
                this._handleTextCtrl(instr);
                break;
            case script_opcodes_1.InstrType.WAIT:
                this._handleWait(instr);
                break;
            case script_opcodes_1.InstrType.LONG_INSTR:
                this._handleLongInstr(instr);
                break;
            case script_opcodes_1.InstrType.UNKNOWN:
                // 未知指令, 跳过
                break;
        }
    }
    // ── 文本处理 ──
    /** 将当前累积的文本字节推入行缓冲区 */
    _flushLine() {
        if (this._currentBytes.length > 0) {
            this._textLines.push({
                bytes: [...this._currentBytes],
                text: this._currentBytes
                    .map(b => b < 0xA0 ? String.fromCharCode(b) : `[${b.toString(16).toUpperCase()}]`)
                    .join(''),
            });
            this._currentBytes = [];
        }
    }
    _handleText(instr) {
        if (instr.bytes && instr.bytes.length > 0) {
            // 保留原始文本字节 — 渲染层直接按 CHR tile 渲染, 不依赖 Unicode 映射
            this._currentBytes.push(...instr.bytes);
        }
        else if (instr.text) {
            // 兼容: 无字节时推入调试文本对应的字节 (不渲染)
            this._currentBytes.push(...Array.from(instr.text).map(c => c.charCodeAt(0) & 0xFF));
        }
    }
    _handleTextCtrl(instr) {
        // 文本格式控制: E0/E1 换行, E2-E7 其他格式控制
        if (instr.opcode === 0xE0 || instr.opcode === 0xE1) {
            this._flushLine();
        }
    }
    _handleWait(instr) {
        this._waitFrames = instr.frames ?? 0;
        // 等待前, 将当前文本行推入缓冲区
        this._flushLine();
    }
    // ── 长指令处理 ──
    _handleLongInstr(instr) {
        if (instr.opcode === undefined)
            return;
        switch (instr.opcode) {
            case 0xE8: // LOAD_SCENE_DATA
                this._sceneDataId = instr.params?.[0] ?? 0;
                break;
            case 0xEA: // CLEAR_RESET
                this._textLines = [];
                this._currentBytes = [];
                this._spriteIds = [];
                this._objectQueue = [];
                break;
            case 0xEC: // COND_SET
                this._condFlag = instr.params?.[0] ?? 0;
                break;
            case 0xED: // QUEUE_OBJ
                if (instr.params && instr.params.length > 0) {
                    this._objectQueue.push(instr.params[0]);
                }
                break;
            case 0xEE: // CLEAR_WINDOW
                this._textLines = [];
                this._currentBytes = [];
                break;
            case 0xF0: // SET_POS — 设置文本位置 [x][y] (原始 ram_004F/0050)
                this._posX = instr.params?.[0] ?? 0;
                this._posY = instr.params?.[1] ?? 0;
                break;
            case 0xF1: // LOAD_SPRITE
                if (instr.params && instr.params.length > 0) {
                    this._spriteIds.push(instr.params[0]);
                }
                break;
            case 0xF2: // SET_MODE
                this._mode = instr.params?.[0] ?? 0;
                break;
            case 0xFC: // ADVANCE_PTR
                // 推进指针: 将当前文本行推入缓冲区
                this._flushLine();
                break;
            case 0xFE: // SET_PTR (跳转)
                this._handleSetPtr(instr);
                break;
            case 0xFF: // END
                this._complete = true;
                break;
            // 以下指令暂不实现具体逻辑, 仅记录
            case 0xE9: // YIELD2_CHECK
            case 0xEB: // YIELD_CALL
            case 0xEF: // TOGGLE_FLAG
            case 0xF3: // VAR_LEN
            case 0xF4: // SUB_DISPATCH
            case 0xF5: // SUB_DISPATCH2
            case 0xF6: // CALL_FA8
            case 0xF7: // TOGGLE_BANK
            case 0xF8: // VAR_DATA
            case 0xF9: // CALL_8AF7
            case 0xFA: // CALL_8AF7B
            case 0xFB: // CALL_9085
            case 0xFD: // YIELD_FA8
                // 这些指令需要更复杂的游戏状态交互, 暂时跳过
                break;
        }
    }
    // ── 跳转处理 (SET_PTR) ──
    _handleSetPtr(instr) {
        if (!this._scriptData || !instr.params || instr.params.length < 2)
            return;
        const targetAddr = (instr.params[1] << 8) | instr.params[0];
        const targetKey = `${targetAddr.toString(16).toUpperCase()}`;
        // 循环检测: 如果目标地址已访问过, 标记为循环
        if (this._visitedBlocks.has(targetKey)) {
            this._isLooping = true;
        }
        this._visitedBlocks.add(targetKey);
        // 查找目标块
        const targetBlock = this._findBlockByAddr(targetAddr);
        if (targetBlock >= 0) {
            this._blockIndex = targetBlock;
            this._instrIndex = 0;
        }
    }
    /** 通过起始地址查找块索引 */
    _findBlockByAddr(addr) {
        if (!this._scriptData)
            return -1;
        const addrStr = '$' + addr.toString(16).padStart(4, '0').toUpperCase();
        for (let i = 0; i < this._scriptData.blocks.length; i++) {
            if (this._scriptData.blocks[i].startAddr === addrStr) {
                return i;
            }
        }
        return -1;
    }
    // ── 调试 ──
    /** 获取脚本信息 */
    getScriptInfo() {
        if (!this._scriptData)
            return 'No script loaded';
        const blockCount = this._scriptData.blocks.length;
        const totalInstrs = this._scriptData.blocks.reduce((sum, b) => sum + b.instructions.length, 0);
        return `Script 0x${this._scriptData.id.toString(16).padStart(2, '0').toUpperCase()} ` +
            `(${blockCount} blocks, ${totalInstrs} instructions)`;
    }
}
exports.ScriptVM = ScriptVM;
/** 每帧最大执行指令数 (防止死循环) */
ScriptVM.MAX_INSTR_PER_FRAME = 200;

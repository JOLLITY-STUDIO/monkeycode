"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptEngine = void 0;
const ScriptLoader_1 = __importDefault(require("./ScriptLoader"));
const CharMap_1 = require("./CharMap");
const ScriptOpcodes_1 = require("./ScriptOpcodes");
/** 4 位大写十六进制 RAM 键 */
function ramKey(addr) {
    return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
}
class ScriptEngine {
    /** 脚本流指针 (ram_004D/004E) */
    get scriptPtr() {
        return this._store.read('ram_004D') | (this._store.read('ram_004E') << 8);
    }
    set scriptPtr(v) {
        this._store.write('ram_004D', v & 0xff);
        this._store.write('ram_004E', (v >> 8) & 0xff);
    }
    constructor(store) {
        /** GameSystemService 引用 (调色板加载/tableLoad 等委托 system) */
        this._system = null;
        /** PPU buffer 写入位置指针 (原 asm $0000 in $9B28 context, H5 用类成员避免与协程槽冲突) */
        this._bufWritePos = 0;
        /** 让帧标志 — 等待类指令 (waitFrame/fadeIn/fadeOut/waitAnim/spriteFlip) 置位, update 返回 true */
        this._yieldFrame = false;
        this._store = store;
    }
    /** 注入 GameSystemService (调色板加载/tableLoad 委托) */
    setSystem(sys) {
        this._system = sys;
    }
    /** 装载脚本 id (原 $8464 scriptLoader) */
    loadScript(scriptId) {
        ScriptLoader_1.default.load(this._store, scriptId);
        // 重置 PPU buffer 写入位置
        this._bufWritePos = 0;
        // ppuFill 属性区 ($23E0, 0x20 列 × 1 行, 值 $55)
        // 原 $84B0-$84BE; 由 system ppuFill 完成 (此处委托渲染)
        this.fillAttribute();
        // $84C1: 切回原 bank (ram_00ED)
        this._store.write('ram_0025', this._store.read('ram_00ED'));
    }
    /** 填充属性区 (原 $84B0-$84BE ppuFill) */
    fillAttribute() {
        // $23E0-$23FF 属性区填 $55
        for (let i = 0; i < 0x20; i++) {
            const a = 0x23e0 + i;
            const nt = a < 0x2400 ? 0 : 1;
            const off = a & 0x3ff;
            const x = off % 32;
            const y = (off / 32) | 0;
            if (y < 30) {
                this._store.writeNT(nt, x, y, { tile: this._store.readNT(nt, x, y)?.tile ?? 0, palette: 0x55, bank: 0, flipH: false, flipV: false, behindBg: false });
            }
        }
    }
    /**
     * 每帧推进脚本 (原脚本分派器 $84E7)。
     * 普通指令同帧连续执行, 遇等待类指令 (waitFrame/fadeIn/fadeOut/waitAnim 等) 返回 true 让帧。
     * 用 ram_0056 (脚本 bank) 判断是否已装载 (ScriptLoader.load 设 ptr=0 是合法值, 不能用 ptr===0 判断)。
     *
     * @returns true = 本帧需让出 (等待类指令已执行, 下帧继续), false = 可同帧继续执行
     */
    update(frame) {
        void frame;
        // ram_0056 = 脚本 bank, 0 表示未装载
        if (this._store.read('ram_0056') === 0)
            return true;
        // 普通指令同帧连续执行, 直到遇到等待类指令 (置位 _yieldFrame) 才让帧
        let guard = 0;
        do {
            this.step();
            guard++;
        } while (!this._yieldFrame && guard < 4096);
        const yieldFrame = this._yieldFrame;
        this._yieldFrame = false;
        return yieldFrame;
    }
    /** 分派一步 (原 $84E7) */
    step() {
        const code = this.readScriptByte();
        // $84E7 CMP #$D8
        if (code < 0xd8) {
            this.handleChar(code);
            return;
        }
        if (code < 0xe0) {
            this.handleWaitFrame(code);
            return;
        }
        if (code < 0xe8) {
            this.handleLineEdit(code);
            return;
        }
        this.handleLongOp(code);
    }
    /** 读脚本流当前字节 (不推进指针) */
    readScriptByte() {
        const ptr = this.scriptPtr;
        const data = this.scriptStream();
        return data[ptr] ?? 0xff;
    }
    /** 当前脚本流 (来自 ScriptLoader 装载的 flatten 场景段字节流, 缓存在 DataStore) */
    scriptStream() {
        const bank = this._store.read('ram_0056');
        return this._store.get(`scriptStream_${bank}`) ?? [];
    }
    /** 推进脚本指针 A 字节并返回 (原 $8879) */
    advancePtr(a) {
        this.scriptPtr = (this.scriptPtr + a) & 0xffff;
    }
    /** 读脚本流当前字节并推进 (原读取序列) */
    readByteAdvance() {
        const ptr = this.scriptPtr;
        const data = this.scriptStream();
        const b = data[ptr] ?? 0xff;
        this.advancePtr(1);
        return b;
    }
    /** 普通字符 (原 $84EF 字符分支 + $88CA) */
    handleChar(code) {
        const x = this._store.read('ram_0052');
        const y = this._store.read('ram_0053');
        const tiles = CharMap_1.CharMap.decode(code);
        // 写字符 tile 到文本 buffer (PPU buffer)
        this.writeCharTiles(x, y, tiles);
        // $84F6 INC $0053
        this._store.write('ram_0053', this._store.read('ram_0053') + 1);
        // $84F8 LDA $0055; BEQ → 若行长度非 0 则处理换行
        if (this._store.read('ram_0055') !== 0) {
            // $895D 换行处理
            this.handleLineWrap();
        }
        // $84FF LDA #$01; JMP $8879 (推进指针 1)
        this.advancePtr(1);
    }
    /** 写字符 tile (原 $88CA) */
    writeCharTiles(vramHi, pos, tiles) {
        // 分配 PPU buffer (原 $9B28 ppuBufAlloc: A=$82 控制字节, X=长度, Y=目标地址)
        // H5: 委托 GameSystemService.ppuBufAlloc, 用 ram_0628 作为统一写入位置
        if (!this._system)
            return;
        const dst = (vramHi << 8) | (pos & 0xff);
        // ctrl=0x82 (bit7=1 NT模式 + count=2), len=tiles.length, dst=VRAM地址
        const x = this._system.ppuBufAlloc(0x82, tiles.length, dst);
        // 写 tile 数据到 buffer (ppuBufAlloc 已写 ctrl+addrLo+addrHi, 返回数据区起始 x)
        for (let i = 0; i < tiles.length; i++) {
            this._system.writePpuBuf(x + i, tiles[i]);
        }
        // 结束 buffer (写终止符)
        this._system.ppuBufEnd(x + tiles.length);
        // 设 NT buffer 更新标志 (nmiRender 检查 ram_0628 非 0 才处理 — ppuBufEnd 已设 ram_0628)
    }
    /** 行换行处理 (原 $895D) */
    handleLineWrap() {
        // $895D-$8975: 闪烁/换行等待
        let n = this._store.read('ram_0055');
        while (n > 0) {
            this.waitCounter();
            n--;
        }
        // 原版换行等待让帧
        this._yieldFrame = true;
    }
    /** 等待帧指令 0xD8-0xDF (原 $8504 分支) */
    handleWaitFrame(code) {
        const idx = code - 0xd8;
        const frames = ScriptOpcodes_1.WAIT_FRAME_TABLE[idx] ?? 1;
        // $8510 JSR $899A (设精灵标志)
        this.setSpriteFlag();
        // 等待 frames 帧
        for (let i = 0; i < frames; i++)
            this.waitCounter();
        // 原版 $8514 JSR $9FA8 让帧 — 等待指令让帧
        this._yieldFrame = true;
        this.advancePtr(1);
    }
    /** $899A 设精灵标志 */
    setSpriteFlag() {
        // $899A: LDA $0099; AND #$80; ORA #$40; STA $0099
        this._store.write('ram_0099', (this._store.read('ram_0099') & 0x80) | 0x40);
    }
    /** 行编辑指令 0xE1-0xE7 (原 $851C 分支) */
    handleLineEdit(code) {
        // $8520 SEC; SBC #$E1; EOR #$FF; CLC; ADC $0053; STA $0053
        let d = (code - 0xe1) ^ 0xff;
        d = (d + this._store.read('ram_0053')) & 0xff;
        this._store.write('ram_0053', d);
        // $852A AND #$1F; CMP $0054; BCS $8532; STA $0054
        if ((d & 0x1f) < this._store.read('ram_0054')) {
            this._store.write('ram_0054', d & 0x1f);
        }
        this.advancePtr(1);
    }
    /** 长指令 0xE8-0xFF (原 $8537 分支 → 跳处理器) */
    handleLongOp(code) {
        const op = code & 0xff;
        switch (op) {
            case ScriptOpcodes_1.ScriptOp.OpTableLoad:
                this.opTableLoad();
                break;
            case ScriptOpcodes_1.ScriptOp.OpFadeIn:
                this.opFadeIn();
                break;
            case ScriptOpcodes_1.ScriptOp.OpFadeOutClear:
                this.opFadeOutClear();
                break;
            case ScriptOpcodes_1.ScriptOp.OpAnimSeq:
                this.opAnimSeq();
                break;
            case ScriptOpcodes_1.ScriptOp.OpTextSeq:
                this.opTextSeq();
                break;
            case ScriptOpcodes_1.ScriptOp.OpFindSlot:
                this.opFindSlot();
                break;
            case ScriptOpcodes_1.ScriptOp.OpClearText:
                this.opClearText();
                break;
            case ScriptOpcodes_1.ScriptOp.OpSpriteFlip:
                this.opSpriteFlip();
                break;
            case ScriptOpcodes_1.ScriptOp.OpTextPos:
                this.opTextPos();
                break;
            case ScriptOpcodes_1.ScriptOp.OpTextPtr:
                this.opTextPtr();
                break;
            case ScriptOpcodes_1.ScriptOp.OpLineLen:
                this.opLineLen();
                break;
            case ScriptOpcodes_1.ScriptOp.OpPalette:
                this.opPalette();
                break;
            case ScriptOpcodes_1.ScriptOp.OpSubDispatch:
                this.opSubDispatch();
                break;
            case ScriptOpcodes_1.ScriptOp.OpSetPtr:
                this.opSetPtr();
                break;
            case ScriptOpcodes_1.ScriptOp.OpWaitAnim:
                this.opWaitAnim();
                break;
            case ScriptOpcodes_1.ScriptOp.OpToggle:
                this.opToggle();
                break;
            case ScriptOpcodes_1.ScriptOp.OpExternal:
                this.opExternal();
                break;
            case ScriptOpcodes_1.ScriptOp.OpFlagBit:
                this.opFlagBit();
                break;
            case ScriptOpcodes_1.ScriptOp.OpSceneLoad:
                this.opSceneLoad();
                break;
            case ScriptOpcodes_1.ScriptOp.OpClearBuf:
                this.opClearBuf();
                break;
            case ScriptOpcodes_1.ScriptOp.OpVramAdvance:
                this.opVramAdvance();
                break;
            case ScriptOpcodes_1.ScriptOp.OpFillWait:
                this.opFillWait();
                break;
            case ScriptOpcodes_1.ScriptOp.OpJump:
                this.opJump();
                break;
            case ScriptOpcodes_1.ScriptOp.OpEnd:
                this.opEnd();
                break;
            default:
                this.advancePtr(1);
                break;
        }
    }
    // ── 长指令处理器 (对应 $8545 表处理器) ──
    /** $E8 $8574: tableLoad — 读参数并加载场景表, 推进 2 */
    opTableLoad() {
        this.advancePtr(1);
        const a = this.readByteAdvance();
        // 由 system 完成 tableLoad (加载 19 字节到 ram_0079/007B)
        this.tableLoad(a);
        this.advancePtr(0);
    }
    /** $E9 $857F: fadeIn */
    opFadeIn() {
        this.advancePtr(1);
        this.waitCounter();
        this.fadeIn();
    }
    /** $EA $858C: fadeOut + 清屏 */
    opFadeOutClear() {
        this.advancePtr(1);
        this.fadeOut();
        this.initHelper();
        this.ntClear();
    }
    /** $EB $85C3: 动画序列 */
    opAnimSeq() {
        this.advancePtr(1);
        this.setSpriteFlag();
        this.animateSprites();
        this.fillText();
    }
    /** $EC $85D1: 文本字符序列 */
    opTextSeq() {
        // 读多个字符直到 $FF
        this.advancePtr(1);
        let c = this.readByteAdvance();
        while (c !== 0xff) {
            this.writeCharTiles(this._store.read('ram_0052'), this._store.read('ram_0053'), CharMap_1.CharMap.decode(c));
            this._store.write('ram_0053', this._store.read('ram_0053') + 1);
            c = this.readByteAdvance();
        }
        // $85E2: ram_0652 = 0
        this._store.write('ram_0652', 0);
        this.advancePtr(0);
    }
    /** $ED $85EB: 查找空场景槽 ($0700-X) */
    opFindSlot() {
        this.advancePtr(1);
        let x = 0;
        while (this._store.read('ram_0700' + '') !== undefined && this._store.read('ram_0700') !== 0) {
            x++;
            if (x >= 5)
                break;
        }
        const v = this.readByteAdvance();
        this._store.write(ramKey(0x0700 + x), v);
        this.advancePtr(0);
    }
    /** $EE $8603: 清文本区 */
    opClearText() {
        this.advancePtr(1);
        // $8603-$8610: 清 $21XX 文本区
        this.clearTextRegion();
    }
    /** $EF $8617: 精灵翻转标志 */
    opSpriteFlip() {
        this.advancePtr(1);
        this.waitCounter();
        // $861D-$8625: $0099 = ($0099 & 0x80) ^ 0x80 | 0x40
        this._store.write('ram_0099', ((this._store.read('ram_0099') & 0x80) ^ 0x80) | 0x40);
    }
    /** $F0 $862B: 文本位置设置 (读 2 字节到 $004F/$0050) */
    opTextPos() {
        this.advancePtr(1);
        const a = this.readByteAdvance();
        this._store.write('ram_004F', a);
        this._store.write('ram_0051', a);
        const b = this.readByteAdvance();
        this._store.write('ram_0050', b);
        this._store.write('ram_0052', b);
        // 继续分派 (指针已推进) — 不递归调 step, 让外层 update 驱动
    }
    /** $F1 $8649: 文本指针 (bank06) */
    opTextPtr() {
        this.advancePtr(1);
        // 读 2 字节指针 → 文本地址
        const lo = this.readByteAdvance();
        const hi = this.readByteAdvance();
        this._store.write('ram_00E6', lo);
        this._store.write('ram_00E7', hi);
    }
    /** $F2 $8677: 行长度设置 */
    opLineLen() {
        this.advancePtr(1);
        const a = this.readByteAdvance();
        this._store.write('ram_0055', a);
    }
    /** $F3 $8681: 调色板设置 */
    opPalette() {
        this.advancePtr(1);
        const a = this.readByteAdvance();
        if (a === 0) {
            // $8687: mainLoopInit2
            this.mainLoopInit2();
            this.advancePtr(1);
            return;
        }
        if (a === 0xff) {
            // $86A7: 3-param 调色板 (mainInitParam)
            this.advancePtr(1);
            const spr = this.readByteAdvance();
            this.advancePtr(1);
            const bg = this.readByteAdvance();
            this.mainInitParam(bg, spr);
            this.advancePtr(1);
            return;
        }
        if (a & 0x80) {
            this.mainInitParamSprOnly(a & 0x7f);
            this.advancePtr(1);
            return;
        }
        this.mainInitParamBgOnly(a);
        this.advancePtr(1);
    }
    /** $F4 $86B7: 子指令分发 */
    opSubDispatch() {
        this.advancePtr(1);
        const sub = this.readByteAdvance();
        switch (sub) {
            case 0x00:
                this.subFadeInBg();
                break;
            case 0x01:
                this.subFadeInSpr();
                break;
            case 0x02:
                this.subWait();
                break;
            case 0x03:
                this.subWait();
                break;
            case 0x04:
                this.subPalAnim(false);
                break;
            case 0x05:
                this.subPalAnim(true);
                break;
            case 0x06:
                this.subClearSprites();
                break;
            default:
                this.advancePtr(0);
                break;
        }
    }
    /** $F5 $87B7: 脚本指针设置 */
    opSetPtr() {
        this.advancePtr(1);
        // 读字符直到 $FF, ORA #$80 → ram_004C
        let c = this.readByteAdvance();
        while (c !== 0xff) {
            c = (c | 0x80) & 0xff;
            break;
        }
        this._store.write('ram_004C', c);
        this.advancePtr(0);
    }
    /** $F6 $87CA: 等待+动画 */
    opWaitAnim() {
        this.advancePtr(1);
        this.setSpriteFlag();
        this.advancePtr(1);
        const a = this.readByteAdvance();
        this.waitCounter(a);
    }
    /** $F7 $87D8: 标志切换 */
    opToggle() {
        this.advancePtr(1);
        // $87D9 LDA $0009; BEQ $87E5
        if (this._store.read('ram_0009') === 0) {
            this._store.write('ram_007B', this._store.read('ram_007B') ^ 1);
            this._store.write('ram_007A', 0);
            this._store.write('ram_0044', 0);
            this._store.write('ram_0045', 0);
            this.advancePtr(0);
        }
    }
    /** $F8 $87F7: 外部调用 (bank02) */
    opExternal() {
        this.advancePtr(1);
        const a = this.readByteAdvance();
        this._store.write('ram_00ED', a);
        const b = this.readByteAdvance();
        this._store.write('ram_00EC', b);
        this.callExternal(a, b);
    }
    /** $F9 $8813: $005B 位操作 (读 1 字节操作数, bit7 决定 set/clear bit2) */
    opFlagBit() {
        this.advancePtr(1);
        const a = this.readByteAdvance();
        // $8813: BMI $8814 (bit7=1 → AND #$FB 清 bit2), else $881B (ORA #$04 设 bit2)
        if ((a & 0x80) !== 0) {
            this._store.write('ram_005B', this._store.read('ram_005B') & 0xFB);
        }
        else {
            this._store.write('ram_005B', this._store.read('ram_005B') | 0x04);
        }
    }
    /** $FA $881A: sceneLoad */
    opSceneLoad() {
        this.advancePtr(1);
        const a = this.readByteAdvance();
        this.sceneLoad(a);
        this.advancePtr(0);
    }
    /** $FB $8830: 清文本 buffer + sub9085 场景数据装载 + 继续 */
    opClearBuf() {
        this.clearTextBuffer();
        this.advancePtr(1);
        // $8831: JSR $9085 — 场景数据装载 (注册 sub9148 协程消费 $0568 场景数据写 NT+OAM)
        // sub8297 会覆盖 ram_004D (段数据指针), 需要保存/恢复脚本指针
        const savedPtr = this.scriptPtr;
        const savedBank = this._store.read('ram_0056');
        this._system?.sub8297(0x0D);
        // 恢复脚本指针 (sub9085 末尾设 ram_004D 为段末尾, 覆盖了脚本指针)
        this.scriptPtr = savedPtr;
        this._store.write('ram_0056', savedBank);
    }
    /** $FC $8836: 等待 + 文本 VRAM 前进 */
    opVramAdvance() {
        this.setSpriteFlag();
        this.waitCounter(4);
        // $883F-$884A: $0051 += 0x40, $0052 += carry
        const l = (this._store.read('ram_0051') + 0x40) & 0xff;
        const h = (this._store.read('ram_0052') + (this._store.read('ram_0051') + 0x40 > 0xff ? 1 : 0)) & 0xff;
        this._store.write('ram_0051', l);
        this._store.write('ram_0052', h);
        this.advancePtr(1);
        // 不递归调 step
    }
    /** $FD $8854: 填充 + 等待 */
    opFillWait() {
        this.fillText();
        this.waitCounter(4);
        this.advancePtr(1);
        // 不递归调 step
    }
    /** $FE $8861: 跳转 (读 2 字节指针) */
    opJump() {
        this.advancePtr(1);
        const lo = this.readByteAdvance();
        const hi = this.readByteAdvance();
        this.scriptPtr = (hi << 8) | lo;
    }
    /** $FF $886F: 脚本结束 */
    opEnd() {
        this.scriptPtr = 0;
    }
    // ── 子指令处理器 ──
    subFadeInBg() {
        this.fadeIn();
        this.advancePtr(0);
    }
    subFadeInSpr() {
        this.fadeInSpr();
        this.advancePtr(0);
    }
    subWait() {
        this.waitCounter(2);
    }
    subPalAnim(_reverse) {
        // $86F5: 4 步调色板动画
        this.waitCounter(4);
        this.advancePtr(0);
    }
    subClearSprites() {
        this.initHelper();
        this.waitCounter(1);
        this.advancePtr(0);
    }
    // ── 外部委托 (由 system/其它域提供) ──
    tableLoad(a) { this._system?.tableLoad(a); }
    fadeIn() { this._system?.fadeIn(); }
    fadeInSpr() { this._system?.fadeInSpr(); }
    fadeOut() { this._system?.fadeOut(); }
    initHelper() { this._system?.initHelper(); }
    ntClear() { this._system?.ntClear(); }
    mainLoopInit2() {
        // 委托 GameSystemService.sub9A35 (paletteLoadBG + paletteLoadSPR + 置满)
        this._system?.sub9A35();
    }
    mainInitParam(bg, spr) {
        // 设 ram_0048 (BG idx) / ram_0049 (SPR idx) 后调 mainLoopInit2
        this._store.write('ram_0048', bg & 0xff);
        this._store.write('ram_0049', spr & 0xff);
        this._system?.sub9A35();
    }
    mainInitParamBgOnly(bg) {
        this._store.write('ram_0048', bg & 0xff);
        this._system?.paletteLoadBG();
    }
    mainInitParamSprOnly(spr) {
        this._store.write('ram_0049', spr & 0xff);
        this._system?.paletteLoadSPR();
    }
    animateSprites() { }
    fillText() { }
    clearTextRegion() { }
    clearTextBuffer() { }
    callExternal(_a, _b) { }
    sceneLoad(a) {
        this._system?.sceneLoad(a);
    }
    /** 帧等待 (原 JSR $9FA8 语义) */
    waitCounter(frames = 1) {
        // 翻译版: 每帧一步, 帧间同步由外部调度保证
        void frames;
    }
}
exports.ScriptEngine = ScriptEngine;
exports.default = ScriptEngine;

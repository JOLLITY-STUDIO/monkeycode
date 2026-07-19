"use strict";
/**
 * RomProgram — ROM 转写为 TypeScript 的运行时基类
 *
 * 这个类提供所有 ROM 逻辑转写后需要的运行时环境:
 * - 68K 寄存器状态 (D0-D7, A0-A7, SR/CCR, PC)
 * - 工作 RAM (64KB)
 * - ROM 数据只读访问
 * - VDP 桥接 (写寄存器、DMA、VRAM)
 * - 资源解压桥接
 * - 输入桥接
 *
 * 生成的 TS 代码 extends 这个类，每个 ROM 函数对应一个 TS 方法。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RomProgram = exports.RAM_VARS = exports.CCR = void 0;
const Lzss_1 = require("../resource/Lzss");
const NibbleRle_1 = require("../resource/NibbleRle");
const Bitplane_1 = require("../resource/Bitplane");
const types_1 = require("../core/types");
/** 68K 条件码位 (在 SR 中的位置) */
exports.CCR = {
    C: 0, // Carry
    V: 1, // Overflow
    Z: 2, // Zero
    N: 3, // Negative
    X: 4, // Extend
};
/** ROM 已知的全局 RAM 变量地址 (从逆向分析中获得的命名映射) */
exports.RAM_VARS = {
    /** 任务调度指针 — 当前要执行的任务编号 */
    TASK_PTR: 0xFF8004,
    /** 游戏阶段 (5=部署, 10=战斗, etc.) */
    GAME_PHASE: 0xFFA61C,
    /** 标题画面状态标志 */
    TITLE_FLAG: 0xFFA6D4,
    /** 场景索引 */
    SCENE_INDEX: 0xFFA6D0,
    /** VBlank 回调函数指针 */
    VBLANK_CB: 0xFF8008,
    /** DMA 队列指针 */
    DMA_QUEUE: 0xFF800C,
    /** 当前帧计数 */
    FRAME_COUNTER: 0xFFA600,
    /** 输入状态 (按键位掩码) */
    INPUT_CURRENT: 0xFFA602,
    INPUT_PREV: 0xFFA604,
    INPUT_PRESSED: 0xFFA606,
    /** 随机数种子 */
    RNG_SEED: 0xFFA610,
    /** 光标位置 */
    CURSOR_X: 0xFFA620,
    CURSOR_Y: 0xFFA622,
};
class RomProgram {
    // ============================================================
    // 硬件桥接
    // ============================================================
    ram;
    vdp;
    romData;
    // ============================================================
    // 68K 寄存器
    // ============================================================
    reg;
    // ============================================================
    // 解压器
    // ============================================================
    lzss;
    nibbleRle;
    bitplane;
    // ============================================================
    // 标志
    // ============================================================
    halted = false;
    constructor(romData, ram, vdp) {
        this.romData = romData;
        this.ram = ram;
        this.vdp = vdp;
        this.reg = {
            d0: 0, d1: 0, d2: 0, d3: 0,
            d4: 0, d5: 0, d6: 0, d7: 0,
            a0: 0, a1: 0, a2: 0, a3: 0,
            a4: 0, a5: 0, a6: 0, a7: 0,
            sr: 0x2000, // 初始: Supervisor 模式
            pc: 0,
        };
        this.lzss = new Lzss_1.Lzss();
        this.nibbleRle = new NibbleRle_1.NibbleRle();
        this.bitplane = new Bitplane_1.Bitplane();
    }
    // ============================================================
    // ROM 只读访问 (保持和原始 ROM 一致的地址空间)
    // ============================================================
    /** 读 ROM 字节 (24-bit 地址, 自动镜像) */
    rom8(addr) {
        return this.romData[addr & 0x1FFFFF] ?? 0;
    }
    /** 读 ROM Word (大端序) */
    rom16(addr) {
        const a = addr & 0x1FFFFF;
        return ((this.romData[a] ?? 0) << 8) | (this.romData[a + 1] ?? 0);
    }
    /** 读 ROM Long (大端序) */
    rom32(addr) {
        const a = addr & 0x1FFFFF;
        return ((this.romData[a] ?? 0) << 24)
            | ((this.romData[a + 1] ?? 0) << 16)
            | ((this.romData[a + 2] ?? 0) << 8)
            | ((this.romData[a + 3] ?? 0));
    }
    // ============================================================
    // CCR 条件码辅助
    // ============================================================
    /** 获取 CCR 字节 (SR 低字节) */
    get ccr() { return this.reg.sr & 0xFF; }
    /** 设置完整 CCR */
    set ccr(v) { this.reg.sr = (this.reg.sr & 0xFF00) | (v & 0xFF); }
    /** 获取/设置单个标志 */
    flagC() { return ((this.reg.sr >> exports.CCR.C) & 1) !== 0; }
    flagV() { return ((this.reg.sr >> exports.CCR.V) & 1) !== 0; }
    flagZ() { return ((this.reg.sr >> exports.CCR.Z) & 1) !== 0; }
    flagN() { return ((this.reg.sr >> exports.CCR.N) & 1) !== 0; }
    flagX() { return ((this.reg.sr >> exports.CCR.X) & 1) !== 0; }
    setC(v) { this.setFlag(exports.CCR.C, v); }
    setV(v) { this.setFlag(exports.CCR.V, v); }
    setZ(v) { this.setFlag(exports.CCR.Z, v); }
    setN(v) { this.setFlag(exports.CCR.N, v); }
    setX(v) { this.setFlag(exports.CCR.X, v); }
    setFlag(bit, v) {
        if (v)
            this.reg.sr |= (1 << bit);
        else
            this.reg.sr &= ~(1 << bit);
    }
    /** 根据值设置 NZ 标志 (负/零) */
    setNZ8(v) { this.setZ((v & 0xFF) === 0); this.setN((v & 0x80) !== 0); }
    setNZ16(v) { this.setZ((v & 0xFFFF) === 0); this.setN((v & 0x8000) !== 0); }
    setNZ32(v) { this.setZ(v === 0); this.setN((v & 0x80000000) !== 0); }
    /** 根据值设置 C/X 标志 */
    setCX8(v, carry) { this.setC(carry); this.setX(carry); }
    setCX16(v, carry) { this.setC(carry); this.setX(carry); }
    // ============================================================
    // VDP 桥接 — 完整 API (对应 ROM 中 VDP 操作的全部模式)
    // 基于 Ghidra 反编译 + M68K 反汇编验证
    // ============================================================
    /** VDP 状态寄存器标志 (bit 9 = DMA 忙, bit 3 = VBlank 中, bit 2 = sprite 溢出, bit 1 = sprite 碰撞) */
    _vdpStatus = 0;
    /** VDP 寄存器 1 缓存 (0xFF81A9) */
    _vdpReg1Cache = 0;
    /** 写 VDP 寄存器 */
    vdpWriteReg(regNum, value) {
        this.vdp.writeRegister(regNum & 0x1F, value & 0xFF);
        if ((regNum & 0x1F) === 1)
            this._vdpReg1Cache = value & 0xFF;
    }
    /** 设置 VRAM 写地址 (CD=01, 通过两阶段 CTRL 写) */
    vdpSetVramWrite(addr) {
        this.vdp.ports.write(types_1.VDP_PORTS.CTRL, 0x4000 | (addr & 0x3FFF));
        this.vdp.ports.write(types_1.VDP_PORTS.CTRL, (addr >> 14) & 0x07);
    }
    /** 设置 VRAM 读地址 (CD=00) */
    vdpSetVramRead(addr) {
        this.vdp.ports.write(types_1.VDP_PORTS.CTRL, addr & 0x3FFF);
        this.vdp.ports.write(types_1.VDP_PORTS.CTRL, (addr >> 14) & 0x07);
    }
    /** 写 VRAM Word (通过 DATA 端口, 自动递增) */
    vdpWriteVram(value) {
        this.vdp.ports.write(types_1.VDP_PORTS.DATA, value & 0xFFFF);
    }
    /** 读 VRAM Word (通过 DATA 端口, 自动递增) */
    vdpReadVram() {
        return this.vdp.ports.read(types_1.VDP_PORTS.DATA);
    }
    /** 写 VRAM Word 到指定地址 (两步: 设地址 + 写数据) */
    vdpWriteVramAt(addr, value) {
        this.vdpSetVramWrite(addr);
        this.vdpWriteVram(value);
    }
    /** 批量写 VRAM 从 RAM 缓冲区 (对应 0xFFF5/0xFFF6 命令) */
    vdpWriteVramBlock(ramSrc, countWords) {
        const offset = ramSrc - types_1.ADDRESS_SPACE.RAM.start;
        for (let i = 0; i < countWords; i++) {
            const word = this.ram.read16(ramSrc + i * 2);
            this.vdpWriteVram(word);
        }
    }
    /** 批量读 VRAM 到 RAM 缓冲区 (对应 0xFFF7 命令) */
    vdpReadVramBlock(ramDst, countWords) {
        for (let i = 0; i < countWords; i++) {
            const word = this.vdpReadVram();
            this.ram.write16(ramDst + i * 2, word);
        }
    }
    /** 设置 CRAM 写地址 (CD=11, bit13=1, 通过单阶段 CTRL 写) */
    vdpSetCramWrite(addr) {
        this.vdp.ports.write(types_1.VDP_PORTS.CTRL, 0xC000 | (addr & 0x7E));
        this.vdp.ports.write(types_1.VDP_PORTS.CTRL, (addr >> 8) & 0xFF);
    }
    /** 写 CRAM Word */
    vdpWriteCram(value) {
        this.vdp.ports.write(types_1.VDP_PORTS.DATA, value & 0xFFFF);
    }
    /** 批量写 CRAM 从 RAM 缓冲区 (对应 0xFFFA 命令) */
    vdpWriteCramBlock(ramSrc, countWords) {
        for (let i = 0; i < countWords; i++) {
            const word = this.ram.read16(ramSrc + i * 2);
            this.vdpWriteCram(word);
        }
    }
    /** 设置 VSRAM 写地址 (CD=01, bit13=1, 对应 $8F02-$8Fxx 序列) */
    vdpSetVsramWrite(addr) {
        this.vdp.ports.write(types_1.VDP_PORTS.CTRL, 0x4000 | 0x0010 | (addr & 0x7F));
        this.vdp.ports.write(types_1.VDP_PORTS.CTRL, (addr >> 8) & 0xFF);
    }
    /** 写 VSRAM Word */
    vdpWriteVsram(value) {
        this.vdp.ports.write(types_1.VDP_PORTS.DATA, value & 0xFFFF);
    }
    /** 设置 VRAM Fill 模式 (DMA fill, 对应 0xFFFC/0xFFFD 命令中的 $8F00 系列地址写) */
    vdpStartVramFill(value, countWords) {
        // Sequential write: VRAM address + count writes of same value
        for (let i = 0; i < countWords; i++) {
            this.vdpWriteVram(value);
        }
    }
    /** ROM → VRAM DMA (通过设置 VDP 寄存器触发, 对应 0xFFF9 命令) */
    vdpDmaRomToVram(romSrc, lenWords, vramDest) {
        // ROM source → VRAM: 直接拷贝 ROM 字节到 VRAM (大端序 word)
        this.vdpSetVramWrite(vramDest);
        for (let i = 0; i < lenWords; i++) {
            this.vdpWriteVram(this.rom16(romSrc + i * 2));
        }
    }
    /** 68K RAM → VRAM DMA (对应 0xFFF6/0xFFF8/0xFFF9 命令中 $C00004 长字写) */
    vdpDmaRamToVram(ramSrc, lenWords, vramDest) {
        this.vdpSetVramWrite(vramDest);
        for (let i = 0; i < lenWords; i++) {
            this.vdpWriteVram(this.ram.read16(ramSrc + i * 2));
        }
    }
    /** 68K RAM → CRAM DMA (对应 0xFFFA 命令中的 $C00004 长字写) */
    vdpDmaRamToCram(ramSrc, countWords, cramDest) {
        this.vdpSetCramWrite(cramDest * 2); // CRAM uses word address * 2
        this.vdpWriteCramBlock(ramSrc, countWords);
    }
    /** 68K RAM → VSRAM DMA (对应 0xFFFB 命令中的 $C00004 长字写) */
    vdpDmaRamToVsram(ramSrc, countWords) {
        for (let i = 0; i < countWords; i++) {
            this.vdpWriteVsram(this.ram.read16(ramSrc + i * 2));
        }
    }
    /**
     * 直接写 VRAM 字节 (绕过 VDP 端口, 直接操作 VRAM 内存)
     * 用于大量 tile 数据加载 (标题画面、地图等)
     */
    vdpWriteVramBytes(vramAddr, bytes) {
        this.vdp.vram.writeBytes(vramAddr, bytes);
    }
    /**
     * 从解压缓冲区写 VRAM (对应 FUN_000099b2 之后的 DMA)
     * $FF1000 (decompress buffer) → VRAM
     */
    vdpFlushDecompressBuffer(decompressedSize, vramDest) {
        this.vdpSetVramWrite(vramDest);
        const offset = types_1.RESOURCES.DECOMPRESS_RAM - types_1.ADDRESS_SPACE.RAM.start;
        for (let i = 0; i < decompressedSize; i += 2) {
            const word = this.ram.read16(types_1.RESOURCES.DECOMPRESS_RAM + i);
            this.vdpWriteVram(word);
        }
    }
    /** 获取 VDP 状态 (模拟 CTRL 端口读) */
    vdpGetStatus() {
        // 简化: 返回前次值 + 刷新 VBlank 标志
        const status = this._vdpStatus;
        this._vdpStatus &= ~0x0008; // 清 VBlank
        return status;
    }
    /** 设置 VBlank 标志 (主循环中每帧调用) */
    vdpSetVBlank() {
        this._vdpStatus |= 0x0008; // VBlank = active
    }
    /** 获取缓存的 VDP 寄存器 1 值 */
    get vdpReg1Cache() { return this._vdpReg1Cache; }
    set vdpReg1Cache(v) { this._vdpReg1Cache = v & 0xFF; }
    // ============================================================
    // 资源解压桥接
    // ============================================================
    /**
     * 解压 ROM 中的资源到 RAM 缓冲区
     * 对应 ROM 中的 FUN_000099b2 (资源加载函数)
     *
     * @param resId  资源 ID (ROM 资源指针表中的索引)
     * @param destAddr RAM 目标地址 (通常是 $FF1000 解压缓冲区)
     * @returns 解压后的字节数
     */
    decompressResource(resId, destAddr = types_1.RESOURCES.DECOMPRESS_RAM) {
        // $8001 等资源 ID 的高位是资源类型标记 (如 $8000=图形, $A000=音频)
        // 真实索引 = resId & $0FFF (12-bit, 最多支持 4096 个资源条目)
        const index = resId & 0x0FFF;
        const ptr = this.rom32(types_1.RESOURCES.POINTER_TABLE_ROM + index * 4);
        if (ptr === 0) {
            console.warn(`[RomProgram] decompressResource($0x${resId.toString(16)}): index=${index}, 资源指针=0 → 跳过`);
            return 0;
        }
        /**
         * ★ 资源头部格式 (5 bytes, ROM 已验证):
         *    ptr+0: 压缩类型 (1 byte)
         *    ptr+1: 解压后大小 (2 bytes, big-endian)
         *    ptr+3: VRAM 目标地址 (2 bytes, big-endian)
         *    ptr+5: 压缩数据流开始
         */
        const typeByte = this.rom8(ptr);
        const type = typeByte;
        const decompSize = this.rom16(ptr + 1); // 从 5-byte 头读取解压后大小
        const streamAddr = ptr + 5; // 压缩流从 byte 5 开始
        console.log(`[RomProgram] decompressResource($0x${resId.toString(16)}): index=${index}, ptr=$0x${ptr.toString(16)}, type=$0x${typeByte.toString(16)}, decompSize=${decompSize}, stream@$0x${streamAddr.toString(16)}`);
        // Ram 缓冲区偏移 (= destAddr 在 Ram 内部 Uint8Array 中的索引)
        // ★ 用 & 0xFFFF 处理 RAM 镜像地址 (如 0xFFFF1000 → 0x1000)
        const ramOffset = destAddr & 0xFFFF;
        // 轻量 ROM reader (匹配 RomLoader 的 read8/read16 + size 接口, 供解压器使用)
        const romReader = {
            read8: (addr) => this.romData[addr & 0x1FFFFF] ?? 0,
            read16: (addr) => {
                const a = addr & 0x1FFFFF;
                return ((this.romData[a] ?? 0) << 8) | (this.romData[a + 1] ?? 0);
            },
            size: this.romData.length,
        };
        let outSize = 0;
        switch (type) {
            case types_1.CompressType.LZSS:
                // ★ LZSS 压缩流不包含自己的 size 头, 使用 5-byte 头中的 decompSize
                outSize = Lzss_1.Lzss.decompress(romReader, streamAddr, this.ram.data, ramOffset, decompSize);
                break;
            case types_1.CompressType.NIBBLE_RLE:
                outSize = NibbleRle_1.NibbleRle.decompress(romReader, streamAddr, this.ram.data, ramOffset);
                break;
            case types_1.CompressType.BITPLANE:
                outSize = Bitplane_1.Bitplane.decompress(romReader, streamAddr, this.ram.data, ramOffset);
                break;
        }
        return outSize;
    }
    // ============================================================
    // 命名的 RAM 变量访问
    // ============================================================
    /** 访问命名 RAM 变量 (自动处理大端序) */
    readRamVar(addr, size = 2) {
        switch (size) {
            case 1: return this.ram.read8(addr);
            case 2: return this.ram.read16(addr);
            case 4: return this.ram.read32(addr);
        }
    }
    writeRamVar(addr, value, size = 2) {
        switch (size) {
            case 1:
                this.ram.write8(addr, value);
                break;
            case 2:
                this.ram.write16(addr, value);
                break;
            case 4:
                this.ram.write32(addr, value);
                break;
        }
    }
    // ============================================================
    // 调试
    // ============================================================
    /** 打印当前寄存器状态 */
    dumpRegs() {
        const r = this.reg;
        return `D0=${r.d0.toString(16)} D1=${r.d1.toString(16)} ` +
            `A0=${r.a0.toString(16)} A1=${r.a1.toString(16)} ` +
            `A7=${r.a7.toString(16)} SR=${r.sr.toString(16)}`;
    }
}
exports.RomProgram = RomProgram;

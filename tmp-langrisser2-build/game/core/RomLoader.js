"use strict";
/**
 * ROM 二进制加载器
 * 对应 ROM 文件: Langrisser II (Japan).md (2MB)
 *
 * 原则: 所有 ROM 访问都通过此模块，不直接操作 ArrayBuffer.
 * 对上层提供按地址读取的能力，模拟 68K CPU 读 ROM 的效果.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RomLoader = void 0;
const types_1 = require("./types");
class RomLoader {
    /** 2MB ROM 原始数据 */
    data;
    constructor(buffer) {
        if (buffer) {
            this.load(buffer);
        }
    }
    // ============================================================
    // 加载
    // ============================================================
    /** 从 ArrayBuffer 加载 ROM */
    load(buffer) {
        if (buffer.byteLength !== types_1.ROM_RANGE.size) {
            throw new Error(`ROM 大小不正确: 期望 ${types_1.ROM_RANGE.size} (${types_1.ROM_RANGE.size / 1024}KB), ` +
                `实际 ${buffer.byteLength}`);
        }
        this.data = new Uint8Array(buffer);
    }
    /** 已加载 */
    get loaded() {
        return !!this.data;
    }
    /** ROM 总大小 */
    get size() {
        return this.data?.length ?? 0;
    }
    // ============================================================
    // 按地址读取
    // ============================================================
    /** 读 1 字节 */
    read8(addr) {
        return this.data[addr];
    }
    /** 大端序读 16-bit word (68K 原生字节序) */
    read16(addr) {
        return (this.data[addr] << 8) | this.data[addr + 1];
    }
    /** 大端序读 32-bit long */
    read32(addr) {
        return (this.data[addr] << 24)
            | (this.data[addr + 1] << 16)
            | (this.data[addr + 2] << 8)
            | this.data[addr + 3];
    }
    /** 读指定长度的原始字节数组 */
    readBytes(addr, length) {
        return this.data.slice(addr, addr + length);
    }
    // ============================================================
    // 区域访问
    // ============================================================
    /** 中断向量表 ($000-$0FF) */
    readInterruptVectors() {
        return {
            ssp: this.read32(0x000),
            reset: this.read32(0x004),
            busError: this.read32(0x008),
            addrError: this.read32(0x00C),
            illegalInstr: this.read32(0x010),
            divideByZero: this.read32(0x014),
            chkException: this.read32(0x018),
            trapvException: this.read32(0x01C),
            privilege: this.read32(0x020),
            trace: this.read32(0x024),
            line1010: this.read32(0x028),
            line1111: this.read32(0x02C),
            hblank: this.read32(0x070),
            vblank: this.read32(0x078),
        };
    }
    /** VDP 初始寄存器配置表 ($80B2, 24 字节)
     *  现场 Reset 流程从此处逐字节加载 VDP 寄存器
     */
    readVdpInitRegs() {
        return this.readBytes(0x80B2, 24);
    }
    /** VDP 寄存器初始化值（解析为 16-bit word 数组）
     *  格式: $8000 | regValue → write to VDP_CTRL
     *       $0000 → MOVE to VRAM (写入 VRAM 地址值)
     */
    readVdpInitData() {
        const bytes = this.readVdpInitRegs();
        const result = [];
        let i = 0;
        while (i < bytes.length) {
            const b = bytes[i];
            if (b === 0) {
                // $0000 → MOVE to VRAM
                i++;
                if (i + 1 < bytes.length) {
                    const word = (bytes[i] << 8) | bytes[i + 1];
                    result.push({ isReg: false, value: word });
                    i += 2;
                }
                else {
                    break;
                }
            }
            else {
                // $80xx → 寄存器设置
                const reg = b & 0x1F;
                i++;
                if (i < bytes.length) {
                    result.push({ isReg: true, reg, value: bytes[i] });
                    i++;
                }
                else {
                    break;
                }
            }
        }
        return result;
    }
    /** 校验和数据 ($200-$7FF0, 需要计算)
     *  ROM 中存放的期望校验和: 位于 $18E (16-bit word)
     *  Langrisser II 期望: $D79F (已 ROM 验证)
     */
    computeChecksum() {
        let sum = 0;
        // Genesis 校验覆盖从 $200 到 ROM 末尾
        for (let addr = 0x200; addr < this.data.length; addr += 2) {
            sum += this.read16(addr);
        }
        return sum & 0xFFFF;
    }
    /** 校验和验证
     *  期望值: $D79F (ROM $18E 存储值, 已通过 ROM 验证)
     */
    verifyChecksum() {
        return this.computeChecksum() === 0xD79F;
    }
    /** Z80 程序数据 ($80xx 附近的 Z80 bus 程序)
     *  ROM $80DA-$80FE 的 37 字节 (0x25)
     */
    readZ80BootCode() {
        return this.readBytes(0x80DA, 0x25);
    }
    /** 资源指针表项 (ROM $0B0000+)
     *  每项 2 字节: 相对于 $0B0000 的偏移
     *  指针表前 $7F80 字节 (理论上容纳 $3FC0 个指针)
     */
    readResourcePointer(resourceId) {
        const ptrAddr = types_1.ROM_REGIONS.resourcePtr.start + resourceId * 2;
        const offset = this.read16(ptrAddr);
        return types_1.ROM_REGIONS.resourcePtr.start + offset;
    }
    // ============================================================
    // 字符读取
    // ============================================================
    /** ROM 头: 游戏名称 ($120-$14F, 48 字节 Shift-JIS) */
    readGameName() {
        const bytes = this.readBytes(0x120, 48);
        // 简易 Shift-JIS 解码 (只处理 ASCII 范围)
        return [...bytes]
            .filter(b => b >= 0x20 && b < 0x7F)
            .map(b => String.fromCharCode(b))
            .join('')
            .trim();
    }
    /** ROM 头: 产品编号 ($180-$1xx) */
    readProductCode() {
        const bytes = this.readBytes(0x180, 14);
        return [...bytes]
            .filter(b => b >= 0x20 && b < 0x7F)
            .map(b => String.fromCharCode(b))
            .join('')
            .trim();
    }
    // ============================================================
    // 别名 / 方便方法
    // ============================================================
    /** 获取 ROM 的 ArrayBuffer (用于转发给其他系统) */
    getArrayBuffer() {
        return this.data.buffer.slice(this.data.byteOffset, this.data.byteOffset + this.data.byteLength);
    }
    /** 获取 ROM 数据的 Uint8Array 视图 */
    getData() {
        return this.data;
    }
}
exports.RomLoader = RomLoader;

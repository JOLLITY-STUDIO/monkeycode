"use strict";
/**
 * 通用 NES RAM 总线 — cpu.mem 的替代品（翻译版无 CPU）。
 *
 * 与模拟器模式 1:1 保持 NES 内存地图语义：
 *   $0000-$1FFF  CPU RAM，硬件自动镜像到 2KB（mem[addr & 0x7ff]）
 *   $2000-$4017  设备区（PPU/APU/IO），由注册设备(device)拦截；
 *                未注册时降级为直接读写（保持 cpu.mem 行为）
 *   $4018-$FFFF  直接读写（SRAM/PRG 窗口等）
 *
 * 翻译版 bank 代码通过本类读写 RAM 变量（零页、$0300 球员区等），
 * 不需要 6502 指令执行。其他 NES 游戏翻译版同样适用。
 *
 * 本类两种用法（Redis 风格 + byte 总线）：
 *   1. KV（推荐，存任何类型）: get('player.01') / set('player.01', {...})
 *   2. byte 总线（与模拟器 1:1）: read('ram_005E') / write('ram_005E', 0)
 *      也支持地址数字: read(0x005E) / write(0x005E, 0)
 *      字符串解析规则：'ram_XXXX' / '$XXXX' / '0xXXXX' → 十六进制地址。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RamStore = void 0;
exports.createRamStore = createRamStore;
const nes_ram_1 = require("./nes-ram");
class RamStore {
    constructor() {
        /** 滚动偏移 (pixel 单位) */
        this.scrollX = 0;
        this.scrollY = 0;
        this.mem = new Uint8Array(0x10000);
        this.mem.fill(0xff, 0, 0x2000);
        this.kv = new Map();
        this.devices = new Map();
        this.deviceMask = new Map();
        this.oam = new nes_ram_1.OamManager();
        this.oamShadow = new nes_ram_1.ShadowOam();
        this.sprites = [];
        this.paletteTable = (0, nes_ram_1.createBlankPaletteTable)();
        this.nt0 = (0, nes_ram_1.createBlankNT)();
        this.nt1 = (0, nes_ram_1.createBlankNT)();
        this.zp = new Uint8Array(256);
        this.oam.attach(this);
        this.oamShadow.attach(this);
        this.oamShadow.reset();
    }
    /** 存任意类型值（Redis 风格）。key 为任意字符串，不走地址解析 */
    set(key, value) {
        this.kv.set(key, value);
    }
    /** 取任意类型值。key 为任意字符串，不走地址解析 */
    get(key) {
        return this.kv.get(key);
    }
    has(key) {
        return this.kv.has(key);
    }
    delete(key) {
        return this.kv.delete(key);
    }
    /** 注册精确地址设备（$2000+ 寄存器区） */
    registerDevice(addr, dev) {
        this.devices.set(addr, dev);
    }
    /** 注册掩码设备：addr & mask === key 时命中（如 PPU $2000-$3FFF 8 个寄存器镜像） */
    registerDeviceMask(mask, key, dev) {
        this.deviceMask.set(key, { mask, dev });
    }
    unregisterAllDevices() {
        this.devices.clear();
        this.deviceMask.clear();
    }
    /** 解析 KV 键 / 地址为 16bit 地址：'ram_005E'|'$005E'|'0x005E'|0x005E → 0x005E */
    resolve(key) {
        if (typeof key === 'number')
            return key & 0xffff;
        let a = key.trim();
        if (a.startsWith('ram_'))
            a = a.slice(4);
        else if (a.startsWith('$'))
            a = a.slice(1);
        else if (a.startsWith('0x'))
            a = a.slice(2);
        return parseInt(a, 16) & 0xffff;
    }
    /** 读一个字节。$0000-$1FFF 走 2KB 镜像；$2000+ 优先设备拦截。 */
    read(addr) {
        const a = this.resolve(addr);
        if (a < 0x2000) {
            return this.mem[a & 0x7ff];
        }
        const dev = this.devices.get(a);
        if (dev && dev.read) {
            return dev.read(a);
        }
        for (const { mask, dev: d } of this.deviceMask.values()) {
            if ((a & mask) === mask) {
                if (d.read)
                    return d.read(a);
                break;
            }
        }
        return this.mem[a];
    }
    /** 写一个字节。$0000-$1FFF 走 2KB 镜像；$2000+ 优先设备拦截。 */
    write(addr, val) {
        const a = this.resolve(addr);
        const v = val & 0xff;
        if (a < 0x2000) {
            this.mem[a & 0x7ff] = v;
            return;
        }
        const dev = this.devices.get(a);
        if (dev && dev.write) {
            dev.write(a, v);
            return;
        }
        for (const { mask, dev: d } of this.deviceMask.values()) {
            if ((a & mask) === mask) {
                if (d.write)
                    d.write(a, v);
                return;
            }
        }
        this.mem[a] = v;
    }
    /** 读 16bit 小端 */
    read16(addr) {
        const a = this.resolve(addr);
        return this.read(a) | (this.read(a + 1) << 8);
    }
    /** 写 16bit 小端 */
    write16(addr, val) {
        const a = this.resolve(addr);
        this.write(a, val & 0xff);
        this.write(a + 1, (val >> 8) & 0xff);
    }
    /** 连续拷贝：把一段字节写入 RAM */
    copy(dst, src, length) {
        const d = this.resolve(dst);
        for (let i = 0; i < length; i++) {
            this.write(d + i, src[i]);
        }
    }
    /** 连续读出：RAM 一段拷贝到目标数组 */
    slice(addr, length) {
        const a = this.resolve(addr);
        const out = new Uint8Array(length);
        for (let i = 0; i < length; i++) {
            out[i] = this.read(a + i);
        }
        return out;
    }
    // ── NT 操作 ──
    /** 写 NT 入口 */
    writeNT(ntSelect, tileX, tileY, entry) {
        const nt = ntSelect === 0 ? this.nt0 : this.nt1;
        if (tileY >= 0 && tileY < nt.length && tileX >= 0 && tileX < 32) {
            nt[tileY][tileX] = Object.assign({}, entry);
        }
    }
    /** 读指定 NT 入口（调试用） */
    readNT(ntSelect, tileX, tileY) {
        const nt = ntSelect === 0 ? this.nt0 : this.nt1;
        if (tileY >= 0 && tileY < nt.length && tileX >= 0 && tileX < 32) {
            return nt[tileY][tileX];
        }
        return null;
    }
    // ── OAM 操作 ──
    /** 清空全部精灵 (委托 OamManager.reset) */
    clearOAM() {
        this.oam.reset();
    }
    // ── 调色板操作 ──
    /** 写入单组 BG 调色板 */
    writeBgPalette(index, entry) {
        this.paletteTable.bgPalettes[index] = { colors: [...entry.colors] };
    }
    /** 写入单组精灵调色板 */
    writeSprPalette(index, entry) {
        this.paletteTable.sprPalettes[index] = { colors: [...entry.colors] };
    }
    /** 写单个精灵调色板颜色 */
    writeSprColor(palIdx, colorIdx, color) {
        this.paletteTable.sprPalettes[palIdx].colors[colorIdx] = Object.assign({}, color);
    }
    /** 写单个 BG 调色板颜色 */
    writeBgColor(palIdx, colorIdx, color) {
        this.paletteTable.bgPalettes[palIdx].colors[colorIdx] = Object.assign({}, color);
    }
    /** 批量替换调色板表 (深拷贝 PaletteColor, 防止共享源常量对象被原地修改) */
    setPaletteTable(table) {
        this.paletteTable = {
            bgPalettes: table.bgPalettes.map((e) => ({
                colors: e.colors.map((c) => (Object.assign({}, c))),
            })),
            sprPalettes: table.sprPalettes.map((e) => ({
                colors: e.colors.map((c) => (Object.assign({}, c))),
            })),
        };
    }
    /** 清空 RAM 区（$0000-$1FFF）+ KV + 重置 NES 外设（NT/精灵/调色板/影子 OAM） */
    reset() {
        this.mem.fill(0xff, 0, 0x2000);
        this.kv.clear();
        this.zp.fill(0);
        this.nt0 = (0, nes_ram_1.createBlankNT)();
        this.nt1 = (0, nes_ram_1.createBlankNT)();
        this.sprites = [];
        this.paletteTable = (0, nes_ram_1.createBlankPaletteTable)();
        this.oam.reset();
        this.oamShadow.reset();
    }
    toJSON() {
        return { mem: Array.from(this.mem) };
    }
    fromJSON(s) {
        if (s && s.mem) {
            this.mem.set(s.mem.subarray ? s.mem : Uint8Array.from(s.mem));
        }
    }
}
exports.RamStore = RamStore;
/** 便捷工厂：一个独立的 2KB 工作 RAM（翻译版常用） */
function createRamStore() {
    return new RamStore();
}

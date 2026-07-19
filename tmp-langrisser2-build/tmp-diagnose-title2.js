"use strict";
/**
 * 诊断脚本2：直接加载标题数据并渲染，跳过 CPU Boot
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const Ram_1 = require("./game/core/Ram");
const RomLoader_1 = require("./game/core/RomLoader");
const VdpChip_1 = require("./game/vdp/VdpChip");
const Renderer_1 = require("./game/vdp/Renderer");
const RomProgram_1 = require("./game/rom/RomProgram");
const TitleScreenData_1 = require("./game/data/TitleScreenData");
const types_1 = require("./game/core/types");
const SRC_DIR = __dirname.includes('tmp-langrisser2-build')
    ? path.resolve(__dirname, '../src/langrisser2')
    : __dirname;
// ============================================================
// 辅助函数
// ============================================================
function hexDump(label, bytes, offset = 0, len = 64) {
    let out = '';
    for (let i = offset; i < Math.min(offset + len, bytes.length); i += 16) {
        const hex = Array.from(bytes.slice(i, Math.min(i + 16, bytes.length)))
            .map(b => b.toString(16).padStart(2, '0')).join(' ');
        out += `  ${i.toString(16).padStart(4, '0')}: ${hex}\n`;
    }
    console.log(`${label}:\n${out}`);
}
const fakeCtx = {
    canvas: null,
    width: types_1.DISPLAY.WIDTH,
    height: types_1.DISPLAY.HEIGHT,
    clearRect: () => { },
    createImageData: (w, h) => ({
        width: w,
        height: h,
        data: new Uint8ClampedArray(w * h * 4),
    }),
    putImageData: () => { },
};
fakeCtx.canvas = {
    width: types_1.DISPLAY.WIDTH,
    height: types_1.DISPLAY.HEIGHT,
    getContext: () => fakeCtx,
};
function loadRomBuffer() {
    const romPath = path.resolve(SRC_DIR, '20260713/Langrisser II (Japan).md');
    const buf = fs.readFileSync(romPath);
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}
/** 调查指针表：2-byte 偏移 vs 4-byte 绝对地址 */
function investigatePointerTable(rom) {
    const TABLE = types_1.RESOURCES.POINTER_TABLE_ROM; // 0x0B0000
    const TITLE_RESOURCES = [0x8001, 0x8003, 0x8008];
    console.log('\n=== 指针表调查 (ROM $0B0000) ===');
    // Dump 前 64 bytes of pointer table
    hexDump('指针表前 64 bytes', rom.readBytes(TABLE, 64));
    for (const resId of TITLE_RESOURCES) {
        const index = resId & 0x0FFF;
        console.log(`\n-- 资源 $${resId.toString(16)} (index=$DEC{index}) --`);
        // 路径A: 4-byte 绝对地址 (RomProgram.decompressResource 使用)
        const ptr32 = rom.read32(TABLE + index * 4);
        console.log(`  方式A (4-byte): rom32(0x${(TABLE + index * 4).toString(16)}) = 0x${ptr32.toString(16)}`);
        if ((ptr32 & 0x1FFFFF) < rom.size) {
            const typeByte = rom.read8(ptr32 & 0x1FFFFF);
            const sizeBE = rom.read16((ptr32 + 1) & 0x1FFFFF);
            console.log(`    → type=0x${typeByte.toString(16)}, next16=0x${sizeBE.toString(16)} (${sizeBE})`);
            hexDump(`    资源头 + 前48 bytes`, rom.readBytes((ptr32 & 0x1FFFFF), 64));
        }
        // 路径B: 2-byte 相对偏移 (AssetLoader.lookupResource 使用)
        const offset16 = rom.read16(TABLE + index * 2);
        const resourceAddr = TABLE + offset16;
        console.log(`  方式B (2-byte): offset=0x${offset16.toString(16)} → addr=0x${resourceAddr.toString(16)}`);
        if (offset16 !== 0 && (resourceAddr & 0x1FFFFF) < rom.size) {
            const typeByte = rom.read8(resourceAddr & 0x1FFFFF);
            const decompSize = rom.read16((resourceAddr + 1) & 0x1FFFFF);
            const vramDest = rom.read16((resourceAddr + 3) & 0x1FFFFF);
            console.log(`    → 5-byte header: type=0x${typeByte.toString(16)}, size=0x${decompSize.toString(16)}, vram=0x${vramDest.toString(16)}`);
            hexDump(`    5-byte header + 前59 bytes`, rom.readBytes((resourceAddr & 0x1FFFFF), 64));
        }
    }
}
function loadTitleData(rom, vdp) {
    const ram = new Ram_1.Ram();
    const prog = new RomProgram_1.RomProgram(rom.getData(), ram, vdp);
    // 先调查指针表
    investigatePointerTable(rom);
    // 设置 VDP 寄存器（与 RomTaskSystem._transl_C7F6 一致）
    vdp.writeRegister(0x01, 0x74);
    vdp.writeRegister(0x0C, 0x81);
    vdp.writeRegister(0x02, 0x30);
    vdp.writeRegister(0x04, 0x07);
    vdp.writeRegister(0x0D, 0x3F);
    vdp.writeRegister(0x0F, 0x02);
    vdp.writeRegister(0x07, 0x00);
    vdp.writeRegister(0x10, 0x05);
    // 加载 CRAM
    const colors = [];
    for (let i = 0; i < 64; i++) {
        const lo = TitleScreenData_1.TITLE_CRAM[i * 2];
        const hi = TitleScreenData_1.TITLE_CRAM[i * 2 + 1];
        colors.push(((hi << 8) | lo) & 0x80FF);
    }
    vdp.cram.loadColors(colors);
    // ============================================
    // 方式 A: RomProgram.decompressResource (4-byte entries)
    // ============================================
    console.log('\n=== 方式A: RomProgram.decompressResource (4-byte entries) ===');
    const TITLE_RESOURCES = [0x8001, 0x8003, 0x8008];
    const RAM_DECOMP_BUF = 0xFF1000; // 使用非镜像地址，避免 RomProgram 内部 offset 计算问题
    let vramAddr = 0x0000;
    for (const resId of TITLE_RESOURCES) {
        // ★ 先直接从 ROM 读 stream 头，验证 LZSS 数据能被正确读取
        const index = resId & 0x0FFF;
        const ptr = rom.read32(0x0B0000 + index * 4);
        console.log(`  资源 $${resId.toString(16)} ptr=0x${ptr.toString(16)}`);
        const streamStart = ptr + 5;
        const streamByte0 = rom.read8(streamStart);
        const streamByte1 = rom.read8(streamStart + 1);
        console.log(`  ROM stream[0]=0x${streamByte0.toString(16)}, stream[1]=0x${streamByte1.toString(16)}, decompSize=${rom.read16(ptr + 1)}`);
        const size = prog.decompressResource(resId, RAM_DECOMP_BUF);
        // ★ 直接检查 ram.data[0x1000]
        console.log(`  资源 $${resId.toString(16)}: decompSize=${size}, ram.data[0x1000]=${ram.data[0x1000]}, [0x1001]=${ram.data[0x1001]}, [0x1002]=${ram.data[0x1002]}, [0x1003]=${ram.data[0x1003]}`);
        if (size > 0) {
            const bytes = ram.readBytes(RAM_DECOMP_BUF, size);
            let nz = 0;
            for (let i = 0; i < Math.min(100, bytes.length); i++)
                if (bytes[i] !== 0)
                    nz++;
            console.log(`  readBytes first 100: ${nz} non-zero`);
            vdp.vram.writeBytes(vramAddr, bytes);
            vramAddr += size;
        }
        else {
            console.warn(`  资源 $${resId.toString(16)} 解压失败`);
        }
    }
    console.log(`vramAddr after method A: 0x${vramAddr.toString(16)}`);
    // ============================================
    // 方式 B: AssetLoader 方式 (2-byte entries + 5-byte header)
    // ============================================
    console.log('\n=== 方式B: AssetLoader 方式 (2-byte offsets + 5-byte header) ===');
    const ramB = new Ram_1.Ram();
    const romData = rom.getData();
    let vramAddrB = 0x8000; // 写到 VRAM 另一区域避免混淆
    for (const resId of TITLE_RESOURCES) {
        const index = resId & 0x0FFF;
        const offset16 = rom.read16(types_1.RESOURCES.POINTER_TABLE_ROM + index * 2);
        const resourceAddr = (types_1.RESOURCES.POINTER_TABLE_ROM + offset16) & 0x1FFFFF;
        const typeByte = rom.read8(resourceAddr);
        const decompSize = rom.read16(resourceAddr + 1);
        const vramDestHdr = rom.read16(resourceAddr + 3);
        const dataAddr = (resourceAddr + 5) & 0x1FFFFF;
        console.log(`  资源 $${resId.toString(16)}: type=0x${typeByte.toString(16)} decompSize=${decompSize} vramDest=0x${vramDestHdr.toString(16)} data@0x${dataAddr.toString(16)}`);
        // 简单复制 (不解压) — 先看看数据是什么
        const rawData = rom.readBytes(dataAddr, Math.min(decompSize, 64));
        hexDump(`  原始数据[dataAddr]前 64 bytes`, rawData);
    }
    // 加载 nametable
    vdp.vram.writeBytes(0xC000, TitleScreenData_1.TITLE_NAMETABLE_A);
    vdp.vram.writeBytes(0xE000, TitleScreenData_1.TITLE_NAMETABLE_B);
}
function dumpAndSave(vdp, renderer) {
    console.log('\n=== VDP 状态 ===');
    console.log('planeAAddr:', '0x' + vdp.planeAAddr.toString(16));
    console.log('planeBAddr:', '0x' + vdp.planeBAddr.toString(16));
    console.log('planeWidth:', vdp.planeWidth, 'planeHeight:', vdp.planeHeight);
    console.log('backgroundColor:', vdp.backgroundColor);
    console.log('\n=== CRAM palette 0 ===');
    for (let i = 0; i < 16; i++) {
        const raw = vdp.cram.getColor(i);
        const rgba = vdp.cram.getRGBA(0, i);
        console.log(`  [${i}] 0x${raw.toString(16).padStart(4, '0')} → RGBA(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`);
    }
    console.log('\n=== Plane A 前 16 个 entry ===');
    for (let i = 0; i < 16; i++) {
        const word = vdp.vram.readWordLE(vdp.planeAAddr + i * 2);
        console.log(`  [${i}] word=0x${word.toString(16).padStart(4, '0')} tile=${word & 0x7FF} pal=${(word >> 13) & 3}`);
    }
    console.log('\n=== Tile 0-3 非零字节 ===');
    for (let t = 0; t < 4; t++) {
        const tile = vdp.vram.readTileData(t * 32);
        const nz = Array.from(tile).filter(b => b !== 0).length;
        console.log(`  tile ${t}: ${nz}/32 非零`);
    }
    const fb = renderer.getFrameBuffer();
    const bg = vdp.cram.getRGBA(0, 0);
    let nonBg = 0;
    for (let i = 0; i < fb.length; i += 4) {
        if (fb[i] !== bg.r || fb[i + 1] !== bg.g || fb[i + 2] !== bg.b)
            nonBg++;
    }
    console.log(`\n=== Framebuffer: 非背景像素 ${nonBg} / ${fb.length / 4} (${(nonBg / (fb.length / 4) * 100).toFixed(4)}%) ===`);
    // 保存 PPM
    const ppmPath = path.resolve(SRC_DIR, 'tmp-diagnose-title2.ppm');
    const data = Buffer.alloc(types_1.DISPLAY.WIDTH * types_1.DISPLAY.HEIGHT * 3);
    let off = 0;
    for (let i = 0; i < fb.length; i += 4) {
        data[off++] = fb[i];
        data[off++] = fb[i + 1];
        data[off++] = fb[i + 2];
    }
    fs.writeFileSync(ppmPath, Buffer.concat([Buffer.from(`P6\n${types_1.DISPLAY.WIDTH} ${types_1.DISPLAY.HEIGHT}\n255\n`), data]));
    console.log('已保存 PPM:', ppmPath);
}
async function main() {
    const rom = new RomLoader_1.RomLoader(loadRomBuffer());
    console.log('ROM 加载:', rom.size, 'bytes');
    const vdp = new VdpChip_1.VdpChip();
    const renderer = new Renderer_1.Renderer(vdp);
    loadTitleData(rom, vdp);
    // 渲染
    renderer.renderFrame(fakeCtx);
    dumpAndSave(vdp, renderer);
}
main().catch(e => { console.error(e); process.exit(1); });

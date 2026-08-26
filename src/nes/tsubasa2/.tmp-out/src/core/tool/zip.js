/**
 * Zip (stored, no compression) + CRC32 utilities
 * 从 h5game.ts 抽离出来的纯工具函数，与游戏/页面逻辑无关
 */
function crc32(data) {
    let crc = 0xffffffff;
    for (const b of data) {
        crc ^= b;
        for (let i = 0; i < 8; i++) {
            crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
        }
    }
    return (crc ^ 0xffffffff) >>> 0;
}
function totalSize(parts) {
    return parts.reduce((s, p) => s + p.length, 0);
}
function concatU8(parts) {
    const total = totalSize(parts);
    const out = new Uint8Array(total);
    let off = 0;
    for (const p of parts) {
        out.set(p, off);
        off += p.length;
    }
    return out;
}
/** String → UTF-8 Uint8Array */
export function strToUTF8(str) {
    const bytes = [];
    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);
        if (code < 0x80) {
            bytes.push(code);
        }
        else if (code < 0x800) {
            bytes.push(0xC0 | (code >> 6), 0x80 | (code & 0x3F));
        }
        else {
            bytes.push(0xE0 | (code >> 12), 0x80 | ((code >> 6) & 0x3F), 0x80 | (code & 0x3F));
        }
    }
    return new Uint8Array(bytes);
}
/**
 * 最小化 zip（stored 不压缩），输入 {filename: Uint8Array}
 */
export function makeZip(files) {
    const enc = new TextEncoder();
    const parts = [];
    const cd = [];
    for (const [name, data] of Object.entries(files)) {
        const nameBytes = enc.encode(name);
        const crc = crc32(data);
        cd.push({ nameBytes, offset: totalSize(parts), size: data.length, crc });
        const lfh = new Uint8Array(30 + nameBytes.length);
        const dv = new DataView(lfh.buffer);
        dv.setUint32(0, 0x04034b50, true);
        dv.setUint16(4, 20, true);
        dv.setUint16(6, 0, true);
        dv.setUint16(8, 0, true);
        dv.setUint16(10, 0, true);
        dv.setUint16(12, 0, true);
        dv.setUint32(14, crc, true);
        dv.setUint32(18, data.length, true);
        dv.setUint32(22, data.length, true);
        dv.setUint16(26, nameBytes.length, true);
        dv.setUint16(28, 0, true);
        lfh.set(nameBytes, 30);
        parts.push(lfh, data);
    }
    let cdOffset = totalSize(parts);
    const cdParts = [];
    for (const e of cd) {
        const cdh = new Uint8Array(46 + e.nameBytes.length);
        const dv = new DataView(cdh.buffer);
        dv.setUint32(0, 0x02014b50, true);
        dv.setUint16(4, 20, true);
        dv.setUint16(6, 20, true);
        dv.setUint16(8, 0, true);
        dv.setUint16(10, 0, true);
        dv.setUint16(12, 0, true);
        dv.setUint16(14, 0, true);
        dv.setUint32(16, e.crc, true);
        dv.setUint32(20, e.size, true);
        dv.setUint32(24, e.size, true);
        dv.setUint16(28, e.nameBytes.length, true);
        dv.setUint16(30, 0, true);
        dv.setUint16(32, 0, true);
        dv.setUint16(34, 0, true);
        dv.setUint16(36, 0, true);
        dv.setUint32(38, 0, true);
        dv.setUint32(42, e.offset, true);
        cdh.set(e.nameBytes, 46);
        cdParts.push(cdh);
    }
    let cdSize = totalSize(cdParts);
    parts.push(...cdParts);
    const eocd = new Uint8Array(22);
    const dv2 = new DataView(eocd.buffer);
    dv2.setUint32(0, 0x06054b50, true);
    dv2.setUint16(4, 0, true);
    dv2.setUint16(6, 0, true);
    dv2.setUint16(8, cd.length, true);
    dv2.setUint16(10, cd.length, true);
    dv2.setUint32(12, cdSize, true);
    dv2.setUint32(16, cdOffset, true);
    dv2.setUint16(20, 0, true);
    parts.push(eocd);
    return concatU8(parts);
}

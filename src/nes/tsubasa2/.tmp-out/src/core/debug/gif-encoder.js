/**
 * GIF89a 编码器 — 支持透明背景、循环播放
 *
 * 从 RGBA Uint32Array 帧序列编码为 GIF 动画文件。
 * 透明像素 (alpha=0) 映射到调色板索引 0。
 */
// ── LZW 编码 ──
function lzwEncode(indices, minCodeSize) {
    const clearCode = 1 << minCodeSize;
    const eoiCode = clearCode + 1;
    const maxTable = 4096;
    const output = [];
    let codeSize = minCodeSize + 1;
    let bits = 0;
    let bitCount = 0;
    function emit(code) {
        bits |= (code << bitCount);
        bitCount += codeSize;
        while (bitCount >= 8) {
            output.push(bits & 0xFF);
            bits >>= 8;
            bitCount -= 8;
        }
    }
    // key = (prefix << 8) | byte
    const dict = new Map();
    let nextCode = clearCode + 2;
    let limit = 1 << codeSize;
    emit(clearCode);
    if (indices.length === 0) {
        emit(eoiCode);
        if (bitCount > 0)
            output.push(bits & 0xFF);
        return output;
    }
    let current = indices[0];
    for (let i = 1; i < indices.length; i++) {
        const byte = indices[i];
        const key = (current << 8) | byte;
        if (dict.has(key)) {
            current = dict.get(key);
        }
        else {
            emit(current);
            if (nextCode < maxTable) {
                dict.set(key, nextCode++);
                if (nextCode > limit && codeSize < 12) {
                    codeSize++;
                    limit = (1 << codeSize) - 1;
                    if (limit > maxTable)
                        limit = maxTable;
                }
            }
            current = byte;
        }
        // 字典满时重置（nextCode 达 4096 时无法继续添加）
        if (nextCode >= maxTable) {
            emit(clearCode);
            dict.clear();
            codeSize = minCodeSize + 1;
            limit = (1 << codeSize) - 1;
            nextCode = clearCode + 2;
        }
    }
    emit(current);
    emit(eoiCode);
    if (bitCount > 0) {
        output.push(bits & 0xFF);
    }
    return output;
}
// ── 位运算工具 ──
function writeLE16(arr, val) {
    arr.push(val & 0xFF, (val >> 8) & 0xFF);
}
function writeSubBlocks(data) {
    const result = [];
    for (let i = 0; i < data.length; i += 255) {
        const chunk = data.slice(i, i + 255);
        result.push(chunk.length);
        for (const b of chunk)
            result.push(b);
    }
    result.push(0); // block terminator
    return result;
}
// ── 调色板构建 ──
function buildPalette(frames) {
    // 收集所有唯一颜色 (忽略透明 0x00000000)
    const colorSet = new Set();
    for (const frame of frames) {
        const px = frame.pixels;
        for (let i = 0; i < px.length; i++) {
            const c = px[i];
            if (c !== 0)
                colorSet.add(c);
        }
    }
    let colors;
    if (colorSet.size <= 254) {
        colors = Array.from(colorSet);
    }
    else {
        // 颜色太多 → 保留最高频的 254 色，其余映射到最近颜色
        const freq = new Map();
        for (const frame of frames) {
            const px = frame.pixels;
            for (let i = 0; i < px.length; i++) {
                const c = px[i];
                if (c !== 0)
                    freq.set(c, (freq.get(c) ?? 0) + 1);
            }
        }
        colors = Array.from(freq.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 254)
            .map(e => e[0]);
    }
    // 索引 0 = 透明
    const palette = new Uint8Array((colors.length + 1) * 3);
    const colorToIndex = new Map();
    colorToIndex.set(0, 0); // 透明 → 索引 0
    // 透明色占位 (RGB 0,0,0)
    palette[0] = 0;
    palette[1] = 0;
    palette[2] = 0;
    for (let i = 0; i < colors.length; i++) {
        const c = colors[i];
        const idx = i + 1;
        colorToIndex.set(c, idx);
        palette[idx * 3] = (c >> 16) & 0xFF;
        palette[idx * 3 + 1] = (c >> 8) & 0xFF;
        palette[idx * 3 + 2] = c & 0xFF;
    }
    return { palette, colorToIndex, colorCount: colors.length + 1 };
}
// ── 帧编码 ──
function encodeFrame(frame, colorToIndex, minCodeSize) {
    const indices = [];
    const px = frame.pixels;
    for (let i = 0; i < px.length; i++) {
        // 找不到的颜色映射到最接近的（这里用 0=透明 fallback）
        indices.push(colorToIndex.get(px[i]) ?? 0);
    }
    const lzw = lzwEncode(indices, minCodeSize);
    const result = [];
    // Graphic Control Extension
    // packed: bit0=透明标记, bit2-4=disposal method (2=还原背景)
    // 0x09 = (2 << 2) | 0x01
    result.push(0x21, 0xF9, 0x04); // extension intro
    result.push(0x09); // disposal method 2 + transparent flag
    writeLE16(result, frame.delay); // delay time
    result.push(0x00); // transparent color index = 0
    result.push(0x00); // block terminator
    // Image Descriptor
    result.push(0x2C); // image separator
    writeLE16(result, 0); // left
    writeLE16(result, 0); // top
    writeLE16(result, frame.width); // width
    writeLE16(result, frame.height); // height
    result.push(0x00); // no local color table, no interlace
    // LZW minimum code size
    result.push(minCodeSize);
    // Image data (sub-blocks)
    for (const b of writeSubBlocks(lzw)) {
        result.push(b);
    }
    return result;
}
// ── 主入口 ──
export function encodeGif(frames, options) {
    if (frames.length === 0) {
        throw new Error('encodeGif: 至少需要一帧');
    }
    const w = frames[0].width;
    const h = frames[0].height;
    const { palette, colorToIndex, colorCount } = buildPalette(frames);
    // 计算 minCodeSize: ceil(log2(colorCount))，至少 2
    let minCodeSize = 2;
    while ((1 << minCodeSize) < colorCount)
        minCodeSize++;
    if (minCodeSize < 2)
        minCodeSize = 2;
    // 调色板补齐到 2^minCodeSize
    const palSize = 1 << minCodeSize;
    const fullPal = new Uint8Array(palSize * 3);
    fullPal.set(palette.subarray(0, Math.min(palette.length, palSize * 3)));
    const result = [];
    // ── Header ──
    result.push(0x47, 0x49, 0x46, 0x38, 0x39, 0x61); // "GIF89a"
    // ── Logical Screen Descriptor ──
    writeLE16(result, w);
    writeLE16(result, h);
    // packed: global color table=1, 8-bit resolution, sorted=0, size = palSize-1
    result.push(0xF0 | (palSize - 1)); // 0xF0 = 0b1111_0000 → global table, color res=7, sorted=0
    result.push(0x00); // background color index
    result.push(0x00); // pixel aspect ratio (1:1)
    // ── Global Color Table ──
    for (const b of fullPal)
        result.push(b);
    // ── Netscape Extension (loop count) ──
    if (options?.loop !== false) {
        result.push(0x21, 0xFF, 0x0B); // application extension
        for (const ch of 'NETSCAPE2.0')
            result.push(ch.charCodeAt(0));
        result.push(0x03, 0x01); // sub-block
        result.push(0x00, 0x00); // loop forever
        result.push(0x00); // block terminator
    }
    // ── Frames ──
    for (const frame of frames) {
        for (const b of encodeFrame(frame, colorToIndex, minCodeSize)) {
            result.push(b);
        }
    }
    // ── Trailer ──
    result.push(0x3B);
    return new Uint8Array(result);
}

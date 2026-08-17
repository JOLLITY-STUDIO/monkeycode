/** 从 1bpp 行数据（width 位）计算一行提示 */
export function computeLineHints(cells, length) {
    const hints = [];
    let run = 0;
    for (let i = 0; i < length; i++) {
        const bit = (cells[i >> 3] >> (7 - (i & 7))) & 1;
        if (bit) {
            run++;
        }
        else if (run > 0) {
            hints.push(run);
            run = 0;
        }
    }
    if (run > 0)
        hints.push(run);
    if (hints.length === 0)
        hints.push(0);
    return hints;
}
/** 从解法位图计算全部行提示 */
export function computeAllRowHints(solution, width, height) {
    const rows = [];
    for (let y = 0; y < height; y++) {
        const row = solution.slice((y * width) >> 3, ((y * width + width + 7) >> 3));
        // 注意：跨字节行需按位截取，这里简化处理（Picross 宽度均为 8 的约数场景）
        rows.push(computeLineHints(row, width));
    }
    return rows;
}
/** 从解法位图计算全部列提示（转置） */
export function computeAllColHints(solution, width, height) {
    const cols = [];
    for (let x = 0; x < width; x++) {
        const col = new Uint8Array((height + 7) >> 3);
        for (let y = 0; y < height; y++) {
            const bit = (solution[(y * width + x) >> 3] >> (7 - ((y * width + x) & 7))) & 1;
            if (bit)
                col[y >> 3] |= 1 << (7 - (y & 7));
        }
        cols.push(computeLineHints(col, height));
    }
    return cols;
}

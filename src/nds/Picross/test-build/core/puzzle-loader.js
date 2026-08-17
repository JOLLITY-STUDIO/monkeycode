/** hex 字符串（1bpp 行主序）→ Uint8Array */
export function hexToBytes(hex) {
    const out = new Uint8Array(hex.length / 2);
    for (let i = 0; i < out.length; i++)
        out[i] = parseInt(hex.substr(i * 2, 2), 16);
    return out;
}
/** PuzzleData → Puzzle（供引擎使用） */
export function puzzleFromData(d) {
    return {
        id: d.id,
        name: d.name,
        width: d.width,
        height: d.height,
        difficulty: d.difficulty,
        unlocked: d.unlocked,
        solution: hexToBytes(d.solutionHex),
    };
}

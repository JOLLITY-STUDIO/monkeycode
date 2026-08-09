// PPU Palette RAM $3F00-$3F1F (32字节)
// BG 调色板：$3F00-$3F0F (4组×4色)
// Sprite 调色板：$3F10-$3F1F (4组×4色)
export const paletteRAM = new Uint8Array(32);

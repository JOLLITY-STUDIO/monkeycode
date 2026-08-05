"""Extract full 8KB CHR banks from ROM as PNG (128x256 pixels = 16x32 tiles).

Overwrites existing chr_bank_XX.png in public/sprites/ with complete 8KB data.
Uses NES master palette (64 colors) from public/nes_palette.json so the
2bpp tile data is rendered with correct colors instead of grayscale.
"""
import json
import os
from PIL import Image

ROM_PATH = '_tmp_disasm_out/Captain Tsubasa (Japan).nes'
OUT_DIR = 'public/sprites'
PALETTE_JSON = 'public/nes_palette.json'

# NES 2bpp uses 2 bits per pixel, so each pixel index is 0..3.
# We expose 4 entries per "color group" so that pixel index N picks the
# palette slot for that color group. To keep things simple we just use the
# first 4 entries of the NES master palette as the 2bpp -> RGB mapping.
# (YY-CHR / FCEUX style: 0=transparent, 1=highlight, 2=normal, 3=shadow.)
NES_PALETTE_2BPP = [0x0D, 0x20, 0x30, 0x10]  # $0D=black, $20=blue, $30=white, $10=gray

TILES_WIDE = 16
TILES_TALL = 32  # 8KB = 512 tiles = 16x32

def load_palette():
    """Load the NES master palette and return a 256-entry RGB list for PIL.

    Each CHR pixel is a 2-bit value (0..3), so PIL's palette index 0..3
    drives the visible color. We fill those 4 slots with NES palette entries
    that give good contrast (black / blue / white / gray) — a "debug"
    palette that works for any CHR bank, independent of which NES palette
    group the actual sprite uses at runtime. The remaining 252 slots are
    filled with the full NES master palette so that any other tools that
    re-interpret the PNG have access to the whole NES palette.
    """
    with open(PALETTE_JSON, 'r', encoding='utf-8') as f:
        data = json.load(f)
    rgb = data['colors_rgb']
    nes = [tuple(c) for c in rgb]
    flat = []
    # Debug mapping for the 4 possible 2bpp pixel values
    flat.extend(nes[0x0F])  # 0 -> black
    flat.extend(nes[0x11])  # 1 -> NES blue
    flat.extend(nes[0x30])  # 2 -> white
    flat.extend(nes[0x10])  # 3 -> light gray
    # Fill the rest of the 256-entry palette with the NES master palette,
    # wrapping if needed.
    for i in range(4, 256):
        flat.extend(nes[i % 64])
    return flat[:768]

PALETTE = load_palette()

def chr_to_tiles(chr_bytes):
    """Decode NES 2bpp CHR data into list of 64-pixel tile arrays (0-3)."""
    tiles = []
    for t in range(len(chr_bytes) // 16):
        base = t * 16
        p0 = chr_bytes[base:base+8]
        p1 = chr_bytes[base+8:base+16]
        px = []
        for row in range(8):
            b0, b1 = p0[row], p1[row]
            for bit in range(7, -1, -1):
                px.append(((b1 >> bit) & 1) << 1 | ((b0 >> bit) & 1))
        tiles.append(px)
    return tiles

def tiles_to_image(tiles):
    """Render tiles into a PIL image (16x32 grid = 128x256 px)."""
    img = Image.new('P', (TILES_WIDE * 8, TILES_TALL * 8))
    img.putpalette(PALETTE)
    for idx, tile in enumerate(tiles):
        tx = (idx % TILES_WIDE) * 8
        ty = (idx // TILES_WIDE) * 8
        for row in range(8):
            for col in range(8):
                img.putpixel((tx + col, ty + row), tile[row * 8 + col])
    return img

def main():
    with open(ROM_PATH, 'rb') as f:
        chr_start = 16 + 0x20000  # header + PRG 128KB
        f.seek(chr_start)
        chr_data = f.read(0x20000)

    assert len(chr_data) == 0x20000, f'Expected 128KB CHR, got {len(chr_data)}'

    for bank_n in range(16):
        offset = bank_n * 0x2000
        bank_bytes = chr_data[offset : offset + 0x2000]  # 8KB
        tiles = chr_to_tiles(bank_bytes)
        assert len(tiles) == 512, f'Bank {bank_n:02X}: {len(tiles)} tiles'

        img = tiles_to_image(tiles)
        img.save(os.path.join(OUT_DIR, f'chr_bank_{bank_n:02X}.png'))
        print(f'  chr_bank_{bank_n:02X}.png  {len(tiles)} tiles  {img.size[0]}x{img.size[1]}px')

    print(f'\nDone. 16 CHR bank PNGs written to {OUT_DIR}/')

if __name__ == '__main__':
    main()
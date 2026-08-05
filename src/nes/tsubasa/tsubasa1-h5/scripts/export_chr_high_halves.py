"""Generate missing high-half CHR bank PNGs (4KB each).

Each CHR Bank in MMC1 is 8KB but the existing PNGs only cover the low 4KB.
This script extracts the high 4KB (offset $1000-$1FFF) of each bank and saves
as chr_bank_NN_high.png so we have both halves.
"""
import os
from PIL import Image

ROM_PATH = '_tmp_disasm_out/Captain Tsubasa (Japan).nes'
OUT_DIR = 'public/sprites'

# Palette: 4 grayscale levels + black padding
PALETTE = [0,0,0, 255,255,255, 200,200,200, 100,100,100] + [0,0,0]*252

def chr_to_pixels(chr_bytes):
    """Convert NES 2bpp CHR tile data to pixel arrays.

    Each tile = 16 bytes (8 plane0 + 8 plane1), 8x8 pixels, 2bpp.
    Returns list of 64-element pixel value lists (0-3).
    """
    tiles = []
    for tile_idx in range(len(chr_bytes) // 16):
        base = tile_idx * 16
        plane0 = chr_bytes[base:base+8]
        plane1 = chr_bytes[base+8:base+16]
        pixels = []
        for row in range(8):
            b0 = plane0[row]
            b1 = plane1[row]
            for bit in range(7, -1, -1):
                p = ((b1 >> bit) & 1) << 1 | ((b0 >> bit) & 1)
                pixels.append(p)
        tiles.append(pixels)
    return tiles

def render_tiles_to_image(tiles, w=16, h=16):
    """Render 256 tiles (16x16 grid) into 128x128 PNG image."""
    img = Image.new('P', (w*8, h*8))
    img.putpalette(PALETTE)
    for idx, tile in enumerate(tiles):
        tx = (idx % w) * 8
        ty = (idx // w) * 8
        for row in range(8):
            for col in range(8):
                img.putpixel((tx+col, ty+row), tile[row*8+col])
    return img

def main():
    with open(ROM_PATH, 'rb') as f:
        chr_offset = 16 + 0x20000  # header(16) + PRG(128K)
        # Read all 16 CHR banks (8KB each = 128KB total)
        f.seek(chr_offset)
        chr_data = f.read(0x20000)

    assert len(chr_data) == 0x20000, f'Expected 128KB, got {len(chr_data)}'

    # Verify existing chr_bank_0F.png matches ROM low 4KB of bank 0F
    bank0F_low = chr_data[0xF*0x2000:0xF*0x2000 + 0x1000]
    existing = Image.open(os.path.join(OUT_DIR, 'chr_bank_0F.png')).convert('RGB')

    low_tiles = chr_to_pixels(bank0F_low)
    img_low = render_tiles_to_image(low_tiles).convert('RGB')
    diff = sum(1 for y in range(128) for x in range(128)
               if existing.getpixel((x,y)) != img_low.getpixel((x,y)))
    print(f'Verification: chr_bank_0F.png vs ROM Bank 0F low 4KB diff={diff} pixels (0=match)')
    assert diff < 10, 'Existing PNG does not match ROM data - re-check extraction!'

    # Generate high-half PNG for each bank
    for bank_n in range(16):
        bank_data = chr_data[bank_n*0x2000:(bank_n+1)*0x2000]
        high_data = bank_data[0x1000:0x2000]  # second half
        high_tiles = chr_to_pixels(high_data)
        img = render_tiles_to_image(high_tiles)
        hex_n = f'{bank_n:02X}'
        out = os.path.join(OUT_DIR, f'chr_bank_{hex_n}_high.png')
        img.save(out)
        print(f'  Saved {out} (Bank {hex_n} high 4KB)')

    print(f'\nDone! 16 high-half PNGs generated in {OUT_DIR}/')

if __name__ == '__main__':
    main()
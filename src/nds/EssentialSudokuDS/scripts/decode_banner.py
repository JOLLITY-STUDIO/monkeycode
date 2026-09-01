"""Decode NDS banner (icon bitmap + multi-lang titles).

NDS Banner layout (GBATEK § 9.7):
- Bytes 0x000-0x01FF (512 B): 4bpp 32x32 icon data, linear pixel pairs.
- Bytes 0x0200-0x0203: u16 version (1/2/3)
  - v1: icon only, no palette, no titles
  - v2: + 16-color palette + 6-language UTF-16LE titles
  - v3: extends v2 with Chinese/Japanese titles
- v2+ only:
  - Bytes 0x0210-0x021F: CRC16 of icon area
  - Bytes 0x0220-0x023F: 16-color palette, BGR555 (LE u16 per color)
  - Bytes 0x0240-0x083F: 6-language titles (256 bytes each, UTF-16LE):
    Japanese, English, French, German, Italian, Spanish
"""
import os
import struct
import sys
import json

BANNER = r'D:\studio\github\monkeycode\src\nds\EssentialSudokuDS\rom-data\banner.bin'
OUT_DIR = r'D:\studio\github\monkeycode\src\nds\EssentialSudokuDS\rom-data\extracted'


def u16le(b, o):
    return struct.unpack('<H', b[o:o + 2])[0]


def bgr555_to_rgb(c):
    """Convert NDS BGR555 to 24-bit RGB tuple."""
    r5 = (c & 0x001F)
    g5 = (c & 0x03E0) >> 5
    b5 = (c >> 10) & 0x001F
    return (r5 * 8, g5 * 8, b5 * 8)


def render_4bpp_to_pixels(banner_bytes):
    """Convert 4bpp 32x32 icon bytes to 32x32x3 RGB pixels.

    Returns: list of 32 lists of 32 (r, g, b) tuples.
    """
    pixels = [[(0, 0, 0) for _ in range(32)] for _ in range(32)]
    for byte_idx in range(min(512, len(banner_bytes))):
        byte_val = banner_bytes[byte_idx]
        high = (byte_val >> 4) & 0x0F
        low = byte_val & 0x0F
        pix_idx = byte_idx * 2  # each byte = 2 pixels
        row = pix_idx // 32
        col = pix_idx % 32
        if row >= 32:
            break
        # Default grayscale: index → gray level (0..255)
        pixels[row][col] = (high * 17, high * 17, high * 17)
        if col + 1 < 32:
            pixels[row][col + 1] = (low * 17, low * 17, low * 17)
    return pixels


def decode_titles(banner_bytes):
    """Decode 6 v2+ titles at offsets 0x240, 0x340, 0x440, 0x540, 0x640, 0x740."""
    titles = {}
    languages = ['Japanese', 'English', 'French', 'German', 'Italian', 'Spanish']
    for i, lang in enumerate(languages):
        title_off = 0x240 + i * 0x100
        if title_off + 0x100 > len(banner_bytes):
            continue
        title_bytes = banner_bytes[title_off:title_off + 0x100]
        # Strip null terminator
        try:
            title = title_bytes.decode('utf-16-le').rstrip('\x00').strip()
        except UnicodeDecodeError:
            title = ''
        if title:
            titles[lang] = title
    return titles


def pixels_to_ppm(pixels, path):
    """Write RGB pixels to PPM (P3 ASCII format, no numpy/PIL needed)."""
    w = len(pixels[0])
    h = len(pixels)
    with open(path, 'w', encoding='ascii') as f:
        f.write(f'P3\n{w} {h}\n255\n')
        for row in pixels:
            for r, g, b in row:
                f.write(f'{r} {g} {b}\n')


def pixels_to_png_via_bmp(pixels, path):
    """Write RGB pixels as a 24-bit BMP file (universally readable)."""
    w = len(pixels[0])
    h = len(pixels)

    # BMP file header (14 bytes)
    row_size = (w * 3 + 3) & ~3  # rows padded to multiple of 4 bytes
    img_size = row_size * h
    file_size = 14 + 40 + img_size + 0  # file header + info header + image data

    with open(path, 'wb') as f:
        # File header
        f.write(b'BM')
        f.write(struct.pack('<I', file_size))
        f.write(struct.pack('<HH', 0, 0))  # reserved
        f.write(struct.pack('<I', 14 + 40))  # data offset

        # Info header (BITMAPINFOHEADER)
        f.write(struct.pack('<I', 40))
        f.write(struct.pack('<i', w))
        f.write(struct.pack('<i', h))
        f.write(struct.pack('<HH', 1, 24))
        f.write(struct.pack('<I', 0))
        f.write(struct.pack('<I', img_size))
        f.write(struct.pack('<i', 0))
        f.write(struct.pack('<i', 0))
        f.write(struct.pack('<I', 0))
        f.write(struct.pack('<I', 0))

        # Pixel data, BGR with row padding
        for row in pixels:
            for r, g, b in row:
                f.write(bytes([b, g, r]))
            padding = (4 - (w * 3) % 4) % 4
            if padding > 0:
                f.write(b'\x00' * padding)


def main():
    if not os.path.exists(BANNER):
        print('Banner not found:', BANNER)
        sys.exit(1)

    with open(BANNER, 'rb') as f:
        banner = f.read()

    print(f'== Banner: {len(banner)} bytes ==')

    # Check version
    version = u16le(banner, 0x200) if len(banner) > 0x202 else 0
    print(f'  Version field (0x200): 0x{version:04x}')

    # Earlier byte might also indicate version
    first_byte = banner[0] if banner else 0
    print(f'  Byte 0: 0x{first_byte:02x}')

    # Render icon (use first 512 bytes as icon)
    pixels = render_4bpp_to_pixels(banner)

    os.makedirs(OUT_DIR, exist_ok=True)
    out_bmp = os.path.join(OUT_DIR, 'banner-icon-grayscale.bmp')
    pixels_to_png_via_bmp(pixels, out_bmp)
    print(f'  Wrote: {out_bmp}')

    # Find palette (v2+) at 0x220
    palette = []
    if len(banner) >= 0x240:
        for i in range(16):
            off = 0x220 + i * 2
            col = u16le(banner, off)
            rgb = bgr555_to_rgb(col)
            palette.append((col, rgb))

    titles = decode_titles(banner)

    # Save JSON metadata
    out_json = os.path.join(OUT_DIR, 'banner-info.json')
    with open(out_json, 'w', encoding='utf-8') as f:
        json.dump({
            'size': len(banner),
            'first_byte': f'0x{first_byte:02x}',
            'version_field_at_0x200': f'0x{version:04x}',
            'palette_bgr555': [c for c, _ in palette],
            'palette_rgb': [list(rgb) for _, rgb in palette],
            'titles': titles,
        }, f, ensure_ascii=False, indent=2)
    print(f'  Wrote: {out_json}')

    if titles:
        print('  Titles found:')
        for lang, t in titles.items():
            print(f'    {lang}: {t!r}')
    else:
        print('  No titles decoded (banner probably v1 — icon only)')

    # If palette exists, render icon with palette colors
    if palette and any(c != 0 for c, _ in palette):
        palette_pixels = [[(0, 0, 0) for _ in range(32)] for _ in range(32)]
        for byte_idx in range(512):
            byte_val = banner[byte_idx]
            high = (byte_val >> 4) & 0x0F
            low = byte_val & 0x0F
            pix_idx = byte_idx * 2
            row = pix_idx // 32
            col = pix_idx % 32
            if row >= 32:
                break
            _, rgb_h = palette[high]
            _, rgb_l = palette[low]
            palette_pixels[row][col] = rgb_h
            if col + 1 < 32:
                palette_pixels[row][col + 1] = rgb_l
        out_bmp_p = os.path.join(OUT_DIR, 'banner-icon-palette.bmp')
        pixels_to_png_via_bmp(palette_pixels, out_bmp_p)
        print(f'  Wrote: {out_bmp_p}')


if __name__ == '__main__':
    main()

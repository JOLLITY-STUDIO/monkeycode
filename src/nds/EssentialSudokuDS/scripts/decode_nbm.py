"""
V0.5.2 — NBM (Imagineer proprietary NDS resource format) 解码器

用途: 把 Essential Sudoku DS (Europe).nds 内 42 个 NBM 资源解码为 PNG (pre-multiplied alpha).

格式 (反推总结, 部分字段语义 V0.5.5+ 待 Ghidra 进一步确认):

File layout (LE 大序):
  Header (16 bytes):
    [0..3]   format_flag (u32 LE)
              - 0x00000001 = 4bpp paletted image (主流)
              - 0x00001000 = small 16x16 icon (wireless series)
              - 0x01000001 = extended variant (title.nbm big)
              - 0x00008000 = sub-variant (menu_csol)
    [4..7]   width_px (u32 LE)
    [8..9]   u16 BE - 似乎 0xE003 / 0x0000 / 0x1F00 - palette/color flag? 未完全反推
    [10..11] u16 BE - color depth flag? 0xFF4F / 0x4210 / etc
    [12..15] u16+16 - palette offset / sprite 标记? 未完全反推

  Palette (32 bytes, 16 colors × 2 bytes BGR555 LE):
    从 offset 16 开始 (header 16 byte + palette 32 byte)
    OR 从 offset 8 (跟某些 variant)

  Tile data:
    4bpp paletted 8x8 tiles, layout:
      每 tile 32 byte (16 行 × 2 byte/行, 8 pixel/行)
      tile order: row-major
      pixel order within tile: row-major
      每个 nibble (low/high) = palette index 0-15

Size验证 (V0.5.2):
  168 byte wireless 16x16:
    16 hdr / 32 palette / 128 tile data (= 16*16 pixel / 2 nibble)
    total = 16 + 32 + 128... but actual 168 = 16 byte not header alone
  → 可能 header 是 8 byte not 16.
  Re-verified:
    width LE u32 @ [4..7]
    b[0..3] = format flag
    b[8..N] = palette (32 byte)
    b[8+32..EOF] = tile data

实际验证: 16 byte hdr + 32 byte palette = 48 byte header. 168 - 48 = 120 byte. 120 byte * 2 (4bpp) = 240 pixel, 不是 256. 略差.

Final commit:
    b[0..3] format flag (u32 LE)
    b[4..7] width_px (u32 LE)
    b[8..8+31] palette (32 bytes, 16 colors x 2 BGR555 LE)
    b[40..EOF] 4bpp tile data

Verification (re-do with b[16]=palette, header=16):
  168 byte: 16 hdr + 32 pal + 120 tile data.  120 * 2 = 240 pixel, 16x16=256 pixel, mismatch 16.
  Actually wireless icon bytes are: 16 + 32 + 120 = 168 ✓ as total BUT tile 120 < 128.

Or: header is 8 byte (just b0-7), palette at b8-39 (32 byte), tile at b40-EOF:
  wireless 168 = 40 (header+palette) + 128 tile data ✓ (16*16/2 = 128) ✓

This is the correct layout!

OK 让我做最终版 + 验证 dwlogo:
  dwlogo 32808 = 40 + 32768 tile_data. 32768 * 2 = 65536 pixel = 256*256 ✓

Hence layout:
  byte 0..3 = format flag (u32 LE, lower=4bpp paletted image?)
  byte 4..7 = width_px (u32 LE)
  byte 8..39 = palette (32 bytes, 16 colors x 2 bytes BGR555 LE)
  byte 40..EOF = 4bpp tile data (width*height/2)

Height derived from (size - 40) / (width / 2) = (size - 40) * 2 / width
"""
import os
import sys
import json
import struct

# Workspace paths
WORKSPACE = r'D:\studio\github\monkeycode\src\nds\EssentialSudokuDS'
ROM = os.path.join(WORKSPACE, 'work', 'Essential Sudoku DS (Europe).nds')
FNT_MAPPING = os.path.join(WORKSPACE, 'rom-data', 'fnt-mapping.json')
OUT_DIR = os.path.join(WORKSPACE, 'rom-data', 'extracted', 'nbm')

# Palette: 16 colors x 2 bytes BGR555 LE → RGBA8888
# 透明规则 (V0.19.8):
#   - BGR555 == 0x0000         → color 0, 全透明 (原始规则, staff 系列黑底)
#   - (BGR555 & 0x7FFF) == 0x03E0 → chroma key 纯绿 (0,248,0), 全透明
#     0x03E0 = 0b0000001111100000: red=0, green=0x1F→248, blue=0
#     兼容 bit15 置位变体 (title.nbm p0=0x83E0), 即 NDS 标准 transparent green
#     此前只查 c==0 导致 UI 大面积绿底方块 (14/42 张 NBM)
def palette_to_rgba(palette_bytes: bytes) -> list:
    colors = []
    for i in range(16):
        c = struct.unpack('<H', palette_bytes[i * 2:i * 2 + 2])[0]
        # BGR555 → RGB888
        r = (c & 0x1F) << 3
        g = ((c >> 5) & 0x1F) << 3
        b = ((c >> 10) & 0x1F) << 3
        a = 255
        if c == 0 or (c & 0x7FFF) == 0x03E0:
            a = 0  # color 0 / chroma key green = transparent
        colors.append((r, g, b, a))
    return colors


def decode_nbm_to_png(path_in: str, name: str, data: bytes, out_dir: str) -> dict:
    if len(data) < 40:
        return {'ok': False, 'reason': 'too small'}
    flag = struct.unpack('<I', data[0:4])[0]
    width = struct.unpack('<I', data[4:8])[0]
    if width == 0 or width > 4096:
        return {'ok': False, 'reason': f'invalid width {width}'}
    height = (len(data) - 40) * 2 // width
    if height == 0 or height > 4096:
        return {'ok': False, 'reason': f'invalid height {height}'}
    palette_bytes = data[8:40]
    tile_data = data[40:]
    colors = palette_to_rgba(palette_bytes)

    # Render pixels: width × height, 4bpp (each byte = 2 pixels, low nibble first)
    pixels = []
    for y in range(height):
        row = []
        for x in range(width):
            idx = (y * width + x) // 2
            if idx >= len(tile_data):
                row.append((0, 0, 0, 0))
                continue
            byte = tile_data[idx]
            nibble = byte & 0x0F if (x % 2 == 0) else (byte >> 4) & 0x0F
            row.append(colors[nibble])
        pixels.append(row)

    # Write BMP (no PIL/numpy dep)
    out_path = os.path.join(out_dir, name + '.bmp')
    write_bmp(out_path, width, height, pixels)
    return {'ok': True, 'flag': flag, 'width': width, 'height': height, 'bmp': out_path}


def write_bmp(path: str, width: int, height: int, pixels) -> None:
    row_size = width * 4
    img_size = row_size * height
    file_size = 54 + img_size
    header = bytearray([
        0x42, 0x4D,  # 'BM'
        file_size & 0xFF, (file_size >> 8) & 0xFF, (file_size >> 16) & 0xFF, (file_size >> 24) & 0xFF,
        0, 0, 0, 0,
        54, 0, 0, 0,
        40, 0, 0, 0,
        width & 0xFF, (width >> 8) & 0xFF, (width >> 16) & 0xFF, (width >> 24) & 0xFF,
        height & 0xFF, (height >> 8) & 0xFF, (height >> 16) & 0xFF, (height >> 24) & 0xFF,
        1, 0, 32, 0,  # planes=1, bpp=32
        0, 0, 0, 0,
        img_size & 0xFF, (img_size >> 8) & 0xFF, (img_size >> 16) & 0xFF, (img_size >> 24) & 0xFF,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
    ])
    with open(path, 'wb') as f:
        f.write(header)
        # BMP rows are bottom-up
        for row in reversed(pixels):
            for r, g, b, a in row:
                f.write(bytes([b, g, r, a]))


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    files = json.load(open(FNT_MAPPING))['files']
    nbms = [f for f in files if isinstance(f, dict) and 'nbm' in f.get('name', '').lower()]
    summary = []
    with open(ROM, 'rb') as rom:
        for f in sorted(nbms, key=lambda x: x.get('file_id', 0) or 0):
            off = int(f['offset'], 16) if isinstance(f['offset'], str) else f['offset']
            sz = f['size']
            rom.seek(off)
            data = rom.read(sz)
            res = decode_nbm_to_png(ROM, f['name'], data, OUT_DIR)
            summary.append({
                'name': f['name'],
                'file_id': f.get('file_id'),
                **res,
            })
    out_json = os.path.join(WORKSPACE, 'rom-data', 'extracted', 'nbm-info.json')
    with open(out_json, 'w') as g:
        json.dump({'total': len(summary), 'results': summary}, g, indent=2)
    ok_cnt = sum(1 for s in summary if s.get('ok'))
    print('Decoded %d / %d → %s' % (ok_cnt, len(summary), out_json))


if __name__ == '__main__':
    main()

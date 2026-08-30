# _tools/dive_dump.py  (V2)
#
# 暴力破解 PC Engine CD 镜像中的所有图形素材
#   - 8x8 ANK + 12x12 KANJI 字体
#   - MPEG 视频流切片 (留 .m2v 让 ffmpeg/MPEG-tool 再转)
#   - BM FORMAT 区 (256x224 4bpp 原始位图解码)
#   - Tile (8x8 4bpp) 暴力扫
#   - Scene 32x32 tile 拼接
#   - Palette 区检测 (16 byte/palette)
#
# 输出: _tools/extracted/dump/

import os, sys, struct, math, re, hashlib
from pathlib import Path
from typing import List, Tuple

# ----- 路径 -----
ROOT       = Path(__file__).resolve().parent
DATA_ROOT  = ROOT / "extracted"
BIN_FILE   = DATA_ROOT / "Sexy Idol Mahjong - Yakyuuken no Uta (Japan).bin"
TRACK02    = DATA_ROOT / "track_data" / "track_02" / "user_data.bin"
TRACK26    = DATA_ROOT / "track_data" / "track_26" / "user_data.bin"
OUT_DIR    = DATA_ROOT / "dump"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# ----- 依赖 -----
try:
    from PIL import Image
    HAVE_PIL = True
except ImportError:
    HAVE_PIL = False
    sys.exit("[!] pip install pillow")


# =====================================================================
#   PCE palette: 9-bit composite  -> RGB888
#   实际格式: 2 byte/pixel — high byte GGGBBBBB low byte xRRRRRGG plus dim
#   业界简化: 0x1F 直接 << 3 拉伸成 8-bit
# =====================================================================

PALETTE_GRAYSCALE = [(v, v, v) for v in [0,17,34,51,68,85,102,119,136,153,170,187,204,221,238,255]]
PALETTE_HUDSON_DARK = [
    (0,0,0), (0,0,170), (0,170,0), (0,170,170),
    (170,0,0), (170,0,170), (170,85,0), (170,170,170),
    (85,85,85), (85,85,255), (85,255,85), (85,255,255),
    (255,85,85), (255,85,255), (255,255,85), (255,255,255),
]
PALETTE_PCE_DEFAULT = [
    (0,0,0), (0,0,204), (0,204,0), (0,204,204),
    (204,0,0), (204,0,204), (204,102,0), (204,204,204),
    (102,102,102), (102,102,255), (102,255,102), (102,255,255),
    (255,102,102), (255,102,255), (255,255,102), (255,255,255),
]
PALETTE_VIBRANT = [
    (0,0,0), (16,16,128), (16,128,16), (16,128,128),
    (128,16,16), (128,16,128), (128,96,16), (200,200,200),
    (80,80,80), (80,80,240), (80,240,80), (80,240,240),
    (240,80,80), (240,80,240), (240,240,80), (240,240,240),
]
PALETTE_GOLD = [
    (0,0,0), (32,16,0), (64,32,0), (96,48,0),
    (128,64,0), (160,80,0), (192,96,0), (224,112,0),
    (255,128,0), (255,144,32), (255,160,64), (255,176,96),
    (255,192,128), (255,208,160), (255,224,192), (255,255,255),
]
PALETTE_PINK = [
    (0,0,0), (32,8,16), (64,16,32), (96,24,48),
    (128,32,64), (160,40,80), (192,48,96), (224,56,112),
    (255,80,128), (255,96,144), (255,112,160), (255,128,176),
    (255,144,192), (255,160,208), (255,176,224), (255,255,255),
]
PALETTES = {
    "grayscale": PALETTE_GRAYSCALE,
    "hudson":    PALETTE_HUDSON_DARK,
    "pce":       PALETTE_PCE_DEFAULT,
    "vibrant":   PALETTE_VIBRANT,
    "gold":      PALETTE_GOLD,
    "pink":      PALETTE_PINK,
}


# =====================================================================
#   PCE 8x8 4bpp tile 解码
# =====================================================================

def decode_pce_tile_4bpp(tile_bytes: bytes) -> List[List[int]]:
    """32 byte 8x8 4bpp tile -> pixel[8][8] 4-bit 索引."""
    assert len(tile_bytes) == 32
    rows = []
    for y in range(8):
        row_bytes = tile_bytes[y*4:(y+1)*4]
        pixels = []
        for x in range(8):
            # PCE 真实 tile 字节序: 一个 byte 一像素 - 分两个 4-bit 平面存储:
            #   high byte = 像素 0..3 的低 4 位, 像素 4..7 的高 4 位
            #   low byte  = 像素 0..3 的高 4 位, 像素 4..7 的低 4 位
            # 简化: 交错读 (兼容多数 PCE 编码)
            if x < 4:
                p = (row_bytes[x//2] >> (4 if x%2==0 else 0)) & 0x0F
            else:
                p = (row_bytes[2 + x//2-2] >> (4 if (x-4)%2==0 else 0)) & 0x0F
            pixels.append(p)
        rows.append(pixels)
    return rows


def decode_tile_v2(tile_bytes: bytes) -> List[List[int]]:
    """解码 32 byte tile: 8 row × 4 byte, 每 byte 给 2 像素 (高 nibble 给左, 低 nibble 给右)."""
    assert len(tile_bytes) == 32
    rows = []
    for y in range(8):
        for pair in range(2):
            pass
        # 每 byte = 1 pixel, 高 nibble = 左像素, 低 nibble = 右像素
        row_bytes = tile_bytes[y*4:(y+1)*4]
        pixels = []
        for b in row_bytes:
            pixels.append((b >> 4) & 0x0F)
            pixels.append(b & 0x0F)
        rows.append(pixels)
    return rows


def render_tile_png(tile_bytes: bytes, palette_name: str = "pce", scale: int = 4) -> Image.Image:
    rows = decode_tile_v2(tile_bytes)
    pal = PALETTES.get(palette_name, PALETTE_PCE_DEFAULT)
    W, H = 8*scale, 8*scale
    img = Image.new("RGB", (W, H), (0,0,0))
    for y, row in enumerate(rows[:8]):
        for x, p in enumerate(row[:8]):
            color = pal[p]
            for dy in range(scale):
                for dx in range(scale):
                    img.putpixel((x*scale+dx, y*scale+dy), color)
    return img


# =====================================================================
#   MPEG sequence header (00 00 01 B3)
# =====================================================================

def find_mpeg_sequences(buf: bytes, max_frames: int = 12):
    pat = b"\x00\x00\x01\xB3"
    seqs = []
    i = 0
    while len(seqs) < max_frames:
        j = buf.find(pat, i)
        if j == -1: break
        end = buf.find(pat, j+4)
        if end == -1: end = min(j+2*1024*1024, len(buf))
        seqs.append((j, end-j))
        i = end
    return seqs


# =====================================================================
#   BM FORMAT (raw 4bpp bitmap)
# =====================================================================

def try_bm_decode(buf, offset, w, h, palette_name="pce"):
    bytes_needed = w*h//2
    if offset + bytes_needed > len(buf): return None
    raw = buf[offset:offset+bytes_needed]
    pal = PALETTES.get(palette_name, PALETTE_PCE_DEFAULT)
    img = Image.new("RGB", (w, h), (0,0,0))
    for y in range(h):
        for x in range(w//2):
            b = raw[y*(w//2) + x]
            lo = b >> 4
            hi = b & 0x0F
            img.putpixel((x*2, y), pal[lo % 16])
            img.putpixel((x*2+1, y), pal[hi % 16])
    return img


# =====================================================================
#   海量 tile scan
# =====================================================================

def hashbytes(b): return hashlib.md5(b).hexdigest()[:10]


def scan_tile_blocks_full(buf, name, out_dir, stride=16, max_blocks=400):
    out_dir.mkdir(parents=True, exist_ok=True)
    seen = set()
    n = 0
    for off in range(0, len(buf) - 32, stride):
        block = buf[off:off+32]
        if block == b"\x00"*32: continue
        if len(set(block)) <= 1: continue
        h = hashbytes(block)
        if h in seen: continue
        seen.add(h)
        try:
            img = render_tile_png(block, "pce", scale=4)
            img.save(out_dir / f"tile_{name}_off{off:08X}_h{h}.png")
            n += 1
            if n >= max_blocks:
                print(f"  [tile-scan:{name}] hit max {max_blocks}, stopped")
                break
        except: pass
    print(f"  [tile-scan:{name}] {n} unique tiles")
    return n


# =====================================================================
#   Scene 32x32 tile 拼接
# =====================================================================

def scan_scenes(buf, name, out_dir, grid_w=32, grid_h=32, max_scenes=16, step=0x4000):
    out_dir.mkdir(parents=True, exist_ok=True)
    scene_size = grid_w * grid_h * 32
    n = 0
    for off in range(0, min(len(buf), 8*1024*1024), step):
        if off + scene_size > len(buf): break
        seg = buf[off:off+scene_size]
        if seg == b"\x00" * scene_size: continue
        if len(set(seg[:512])) <= 4: continue
        try:
            W, H = grid_w*8*2, grid_h*8*2
            img = Image.new("RGB", (W, H), (0,0,0))
            pal = PALETTE_PCE_DEFAULT
            for ty in range(grid_h):
                for tx in range(grid_w):
                    tile_off = off + (ty*grid_w + tx) * 32
                    if tile_off + 32 > len(buf): break
                    block = buf[tile_off:tile_off+32]
                    rows = decode_tile_v2(block)
                    for y, row in enumerate(rows[:8]):
                        for x, p in enumerate(row[:8]):
                            c = pal[p]
                            for dy in range(2):
                                for dx in range(2):
                                    img.putpixel(((tx*8+x)*2+dx, (ty*8+y)*2+dy), c)
            img.save(out_dir / f"scene_{name}_off{off:08X}.png")
            n += 1
            if n >= max_scenes: break
        except: continue
    print(f"  [scene-scan:{name}] {n} scene snapshots")
    return n


# =====================================================================
#   ANK font (8x8) — 256 char × 32 byte
# =====================================================================

def dump_ank_font(buf, name, off, out_dir):
    out_dir.mkdir(parents=True, exist_ok=True)
    try:
        chars = []
        for i in range(256):
            b = buf[off+i*32:off+i*32+32]
            if len(b) != 32: return False
            img = render_tile_png(b, "grayscale", scale=4)
            chars.append(img)
        sheet = Image.new("RGB", (16*8*4, 16*8*4), (255,255,255))
        for idx, img in enumerate(chars):
            img2 = img.resize((8*4, 8*4), Image.NEAREST)
            cx, cy = idx % 16, idx // 16
            sheet.paste(img2, (cx*32, cy*32))
        sheet.save(out_dir / f"ank_font_{name}_off{off:X}.png")
        print(f"  [font:{name}] ANK at 0x{off:X}")
        return True
    except: return False


# =====================================================================
#   KANJI font (12x12) — 48 byte/char (PCE HuC6270 4bpp 12x12)
# =====================================================================

def decode_kanji_char_12x12(tile_bytes):
    """48 byte 12x12 char -> 12x12 4-bit 索引. 实际格式: 6 byte / row × 12 row."""
    assert len(tile_bytes) == 48, len(tile_bytes)
    rows = []
    for y in range(12):
        row_bytes = tile_bytes[y*4:(y+1)*4]
        pixels = []
        for b in row_bytes:
            pixels.append((b >> 4) & 0x0F)
            pixels.append(b & 0x0F)
        pixels = pixels[:12]
        if len(pixels) < 12:
            pixels += [0]*(12-len(pixels))
        rows.append(pixels)
    return rows


def render_kanji_png(tile_bytes, palette_name="grayscale", scale=4):
    rows = decode_kanji_char_12x12(tile_bytes)
    pal = PALETTES.get(palette_name, PALETTE_GRAYSCALE)
    W, H = 12*scale, 12*scale
    img = Image.new("RGB", (W, H), (255,255,255))
    for y, row in enumerate(rows):
        for x, p in enumerate(row):
            c = pal[p]
            for dy in range(scale):
                for dx in range(scale):
                    img.putpixel((x*scale+dx, y*scale+dy), c)
    return img


def dump_kanji_font(buf, name, off, out_dir, char_count=64):
    """dump N 个 KANJI 字符成横排 sheet."""
    out_dir.mkdir(parents=True, exist_ok=True)
    try:
        chars = []
        for i in range(char_count):
            start = off + i*48
            if start + 48 > len(buf): break
            block = buf[start:start+48]
            img = render_kanji_png(block, "grayscale", scale=2)
            chars.append(img)
        if not chars: return False
        cell_w, cell_h = 24, 24
        sheet = Image.new("RGB", (char_count*cell_w + 8, cell_h + 8), (255,255,255))
        for idx, img in enumerate(chars):
            sheet.paste(img.resize((cell_w, cell_h), Image.NEAREST), (idx*cell_w + 4, 4))
        sheet.save(out_dir / f"kanji_font_{name}_off{off:X}.png")
        print(f"  [font:{name}] KANJI at 0x{off:X} ({len(chars)} chars)")
        return True
    except: return False


# =====================================================================
#   Palette 区段检测: 16 byte/palette, 类似 PCE HuC6270 调色板 (蓝/绿/红/giga)
#   真实 PCE 调色板格式: 0x1F = GGRR / BBBB - 16 byte 16 色调色板 (low+high nibble)
# =====================================================================

def find_palette_strips(buf, name, out_dir, min_distinct=8, stride=64, max_strips=24):
    out_dir.mkdir(parents=True, exist_ok=True)
    saved = 0
    for off in range(0, len(buf) - 32, stride):
        seg = buf[off:off+32]
        distinct = len(set(seg))
        if distinct < min_distinct: continue
        # 启发: 32 byte 调色板有 <= 16 个唯一值
        if distinct > 16: continue
        # 简化判断: 平均 byte 变化率小
        transitions = sum(1 for i in range(31) if seg[i] != seg[i+1])
        if transitions < 6 or transitions > 28: continue
        # 保存 - 渲染一个 16x1 palette 条作为色彩输出
        if saved < max_strips:
            img = Image.new("RGB", (16*16, 32), (255,255,255))
            for i in range(16):
                c = seg[2*i] if i < 16 else 0
                # PCE: c 字节 = GGGRRRRR (高 3 bit R, 中 3 bit G - 但标准格式是 0xGGG + 0xRRR + 0xBBB 拆分)
                r = (c >> 0) & 7
                g = (c >> 5) & 7
                color = (r << 5, g << 5, 0)
                for x in range(16):
                    img.putpixel((i*16+x, 0), color)
                    img.putpixel((i*16+x, 31), color)
            img.save(out_dir / f"palette_{name}_off{off:08X}.png")
            saved += 1
    print(f"  [palette:{name}] {saved} palette strips saved")


# =====================================================================
#   Main
# =====================================================================

def main():
    print("=" * 70)
    print(" 暴力破解 PC Engine CD 镜像中的所有素材 (V2)")
    print("=" * 70)

    for label, path in [("track02", TRACK02), ("track26", TRACK26)]:
        if not path.exists():
            print(f"[!] {path} 不存在"); continue
        print(f"\n>>> {label} {path.stat().st_size} bytes")

        with open(path, 'rb') as f:
            buf = f.read()

        # MPEG slices
        mpegs = find_mpeg_sequences(buf, max_frames=8)
        mpeg_dir = OUT_DIR / "mpeg"
        mpeg_dir.mkdir(parents=True, exist_ok=True)
        for k, (off, length) in enumerate(mpegs):
            (mpeg_dir / f"{label}_mpeg_{k}.m2v").write_bytes(buf[off:off+length])
        print(f"  [mpeg] {len(mpegs)} slices -> {mpeg_dir}")

        # BM FORMAT
        bm_dir = OUT_DIR / "bm_raw"; bm_dir.mkdir(parents=True, exist_ok=True)
        for w, h in [(256,224), (320,224), (256,192), (512,224)]:
            for cand_off in [0x00003AD6, 0x100, 0x1000, 0x10000, 0x80000]:
                if cand_off + w*h//2 > len(buf): continue
                img = try_bm_decode(buf, cand_off, w, h)
                if img:
                    img.save(bm_dir / f"{label}_off{cand_off:X}_{w}x{h}.png")

        # ANK font 探测
        font_dir = OUT_DIR / "font"; font_dir.mkdir(parents=True, exist_ok=True)
        for off in range(0, min(len(buf), 1*1024*1024)-0x800, 0x800):
            if dump_ank_font(buf, label, off, font_dir): break

        # KANJI font 探测 (12x12, 48 byte/char)
        for off in range(0, min(len(buf), 2*1024*1024)-0x3000, 0x800):
            if dump_kanji_font(buf, label, off, font_dir, char_count=48): pass

        # Palette strip 探测
        find_palette_strips(buf, label, OUT_DIR / "palette" / label)

        # Tile scan (全 17MB, 800 tiles)
        scan_tile_blocks_full(buf, label, OUT_DIR / "tile" / label, max_blocks=400)

        # Scene scan (前 8MB, 12 scene)
        scan_scenes(buf, label, OUT_DIR / "scene" / label, max_scenes=12)

    # ===== 主 .bin dump (前 16MB) =====
    if BIN_FILE.exists():
        print(f"\n>>> main bin {BIN_FILE.stat().st_size} bytes (scan 16MB head)")
        with open(BIN_FILE, 'rb') as f:
            main_bin = f.read(16*1024*1024)
        mpegs = find_mpeg_sequences(main_bin, max_frames=4)
        mpeg_dir = OUT_DIR / "mpeg"; mpeg_dir.mkdir(parents=True, exist_ok=True)
        for k, (off, length) in enumerate(mpegs):
            (mpeg_dir / f"bin_main_mpeg_{k}.m2v").write_bytes(main_bin[off:off+min(length, 4*1024*1024)])
        print(f"  [mpeg:bin] {len(mpegs)} slices saved")
        find_palette_strips(main_bin, "bin_main", OUT_DIR / "palette" / "bin_main")
        scan_tile_blocks_full(main_bin, "bin_main", OUT_DIR / "tile" / "bin_main", max_blocks=300)
        scan_scenes(main_bin, "bin_main", OUT_DIR / "scene" / "bin_main", max_scenes=8)

    # 总结
    print("\n" + "=" * 70)
    print(" 总结")
    print("=" * 70)
    n_png = sum(1 for _ in OUT_DIR.rglob("*.png"))
    n_m2v = sum(1 for _ in (OUT_DIR / "mpeg").glob("*.m2v")) if (OUT_DIR / "mpeg").exists() else 0
    print(f"  PNG: {n_png}, MPEG slices: {n_m2v}")
    print(f"  输出: {OUT_DIR}")


if __name__ == "__main__":
    main()

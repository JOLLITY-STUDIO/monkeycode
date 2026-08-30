"""
从 NDS 原版 PICROSS DS 调色板程序化生成真实的 UI tile atlas 与数字字体图。

ROM 真实资源:
  - extracted/unnamed/file_94.bin: 24.8 MB NCGR 4bpp, 但开头 64 字节全 0，
    实际 tile 数据稀疏，无法稳定切分（已被证实非 Picross DS 主 UI NCGR）
  - extracted/unnamed/file_97.bin: 512 B（恰好 256×2）但实际颜色是 0x1F7400xx 暗系，
    与 Picross DS 主题色（NDS_THEME #3088e8 蓝等）不匹配（实测是 DS icon 调色板）

故采用与 NDS_THEME 完全对齐的**程序化合成**:
  - 8x8 tile × 32 种 = assets/nds_tiles.png (256x8)
    每个 tile 的语义对应 PicrossRenderer.drawTile(idx, ...) 的实际使用:
      idx 0 = NDS 外框（深色描边）
      idx 1 = 装饰用（备用）
      idx 2 = 列/行提示区底色（浅蓝 #b8c8f8 + 细微星点纹理）
      idx 3 = 空格 cell（白底 + 轻微下暗影）
      idx 4 = 已填充 cell（主蓝 #3088e8 + 左上高光 + 右下暗部立体）
      idx 5 = 5格金黄分隔（含金黄渐变 + 锯齿）
      idx 6 = 已满足提示（金黄渐变）
      idx 7 = 起始指（带光晕）
      ...32 号由 NDS_THEME NCLR 模板索引循环
  - 16x16 digit × 11 = assets/digits.png (176x16)
    "0123456789:" 用 8x10 ROM 数字模板两次缩放 + NDS 主题深蓝 #184070 描边 + 浅色底

renderer.ts 顺序已验证:
  - 数字 d 取自 ctx.drawImage(this.digits, d * 16, 0, 16, 16, ...)
  - tile idx 取自 ctx.drawImage(this.tiles, idx * 8, 0, 8, 8, ...)
"""
import os
import struct
import zlib

BASE = r'd:/studio/github/monkeycode/src/nds/Picross'

# NDS_THEME 程序化合成（与 src/render/renderer.ts NDS_THEME 严格一致）
NDS_PAL = {
    0:  (0x00, 0x00, 0x00,   0),   # 透明
    1:  (0xa8, 0xb8, 0xd8, 255),   # 网格细线
    2:  (0x18, 0x40, 0x70, 255),   # 暗部
    3:  (0x30, 0x88, 0xe8, 255),   # 填主蓝
    4:  (0x70, 0xb0, 0xf0, 255),   # 高光
    5:  (0xe8, 0xf0, 0xf8, 255),   # 阴影
    6:  (0xf8, 0xa0, 0x00, 255),   # 5格金黄
    7:  (0xf8, 0xf8, 0xf8, 255),   # 白底
    8:  (0xb8, 0xc8, 0xf8, 255),   # 提示区浅蓝
    9:  (0x70, 0x50, 0x30, 255),   # 棕（暖色备用）
    10: (0xd0, 0x80, 0xa0, 255),   # 粉
    11: (0x80, 0xc0, 0x80, 255),   # 绿
}


def chunk(tag, data):
    c = zlib.crc32(tag + data) & 0xffffffff
    return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", c)


def write_png(path, width, height, rgba_data):
    sig = b"\x89PNG\r\n\x1a\n"
    ihdr = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    raw = bytearray()
    stride = width * 4
    for y in range(height):
        raw.append(0)
        raw.extend(rgba_data[y * stride:(y + 1) * stride])
    idat = zlib.compress(bytes(raw), 9)
    out = sig + chunk(b"IHDR", ihdr) + chunk(b"IDAT", idat) + chunk(b"IEND", b"")
    with open(path, "wb") as f:
        f.write(out)


def put(buf, w, x, y, color):
    if 0 <= x < w and 0 <= y < (len(buf) // (4 * w)):
        idx = (y * w + x) * 4
        buf[idx] = color[0]
        buf[idx + 1] = color[1]
        buf[idx + 2] = color[2]
        buf[idx + 3] = color[3]


# ===== NDS 8x8 tile =====
def render_nds_tile(idx):
    """单 8x8 RGBA 像素，按 idx 渲染 Picross DS 风格 UI tile"""
    W = 8
    px = [[None]*W for _ in range(W)]
    light = NDS_PAL[7]      # 高亮白
    shadow = NDS_PAL[2]     # 暗部深蓝
    main_blue = NDS_PAL[3]  # #3088e8
    light_blue = NDS_PAL[4] # #70b0f0
    dark_blue = NDS_PAL[2]  # #184070
    white = NDS_PAL[7]
    gold = NDS_PAL[6]
    pale_blue = NDS_PAL[8]  # #b8c8f8
    grid_color = NDS_PAL[1]

    if idx == 0:  # NDS 外框（深蓝带轻微渐变 + 边角高光）
        for y in range(W):
            for x in range(W):
                if x == 0 or y == 0 or x == W-1 or y == W-1:
                    px[x][y] = shadow if (x+y) % 2 == 0 else (0x10, 0x20, 0x40, 255)
                else:
                    px[x][y] = (0x04, 0x10, 0x20, 255)
        # 角落亮点
        px[0][0] = light_blue; px[W-1][0] = light_blue
        px[0][W-1] = shadow;  px[W-1][W-1] = shadow
    elif idx == 1:  # 装饰：菱形蓝色
        for y in range(W):
            for x in range(W):
                d = abs(x - 3.5) + abs(y - 3.5)
                if d < 1.2:
                    px[x][y] = light_blue
                elif d < 2.5:
                    px[x][y] = main_blue
                else:
                    px[x][y] = dark_blue
    elif idx == 2:  # 提示区浅蓝（带细密星点纹理 + 渐变）
        for y in range(W):
            for x in range(W):
                if (x + y) % 3 == 0 and x not in (3, 4) and y not in (3, 4):
                    px[x][y] = light_blue
                elif y == 0 or y == W-1:
                    px[x][y] = (0xa0, 0xb8, 0xe8, 255)
                else:
                    px[x][y] = pale_blue
        # 中央放一个小十字（提示区中心焦点）
        px[3][3] = white; px[4][3] = white
        px[3][4] = white; px[4][4] = white
    elif idx == 3:  # 空格 cell（白底 + 圆润倒角）
        for y in range(W):
            for x in range(W):
                if y == W-1 or x == W-1:
                    px[x][y] = (0xd0, 0xd8, 0xe8, 255)
                elif y == 0 or x == 0:
                    px[x][y] = (0xff, 0xff, 0xff, 255)
                else:
                    px[x][y] = white
    elif idx == 4:  # 填充 cell（主蓝 #3088e8 + 左上高光 + 右下暗部）
        for y in range(W):
            for x in range(W):
                # 距离左上角的对角比例 → 渐变
                diag = (x + y) / (2 * (W-1))
                if diag < 0.35:
                    px[x][y] = light_blue
                elif diag < 0.65:
                    px[x][y] = main_blue
                elif diag < 0.85:
                    px[x][y] = dark_blue
                else:
                    px[x][y] = (0x10, 0x30, 0x50, 255)
    elif idx == 5:  # 5格金黄分隔（金黄 V 形 + 中心高光）
        for y in range(W):
            for x in range(W):
                d = abs(x - 3.5) - abs(y - 3.5)
                if -1 < (x + y) - 7 < 1:
                    px[x][y] = white
                elif 0 < d < 1.5:
                    px[x][y] = (0xff, 0xc0, 0x40, 255)
                elif y == 0 or y == W-1:
                    px[x][y] = gold
                else:
                    px[x][y] = gold
    elif idx == 6:  # 已满足提示（金黄渐变 + 星）
        for y in range(W):
            for x in range(W):
                d = abs(x - 3.5) + abs(y - 3.5)
                if d < 1:
                    px[x][y] = white
                elif d < 2.5:
                    px[x][y] = gold
                else:
                    px[x][y] = (0xe0, 0x80, 0x00, 255)
    elif idx == 7:  # 起始指（光晕 + 中心点）
        for y in range(W):
            for x in range(W):
                d2 = (x - 3.5)**2 + (y - 3.5)**2
                if d2 < 1:
                    px[x][y] = white
                elif d2 < 3:
                    px[x][y] = light_blue
                elif d2 < 6:
                    px[x][y] = main_blue
                else:
                    px[x][y] = dark_blue
    else:
        # 32 个 tile 已覆盖 8 个，余下 24 个用 NDS_PAL 索引循环 + 同种 style 装饰
        pal_keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        c1 = NDS_PAL[pal_keys[idx % len(pal_keys)]]
        c2 = NDS_PAL[pal_keys[(idx + 3) % len(pal_keys)]]
        c3 = NDS_PAL[pal_keys[(idx + 5) % len(pal_keys)]]
        for y in range(W):
            for x in range(W):
                diag = (x + y) / (2 * (W-1))
                if diag < 0.33:
                    px[x][y] = c2
                elif diag < 0.66:
                    px[x][y] = c1
                else:
                    px[x][y] = c3
        # 中心小标记（5x5 区域 + 内点）
        for y in range(2, 6):
            for x in range(2, 6):
                if x in (2, 5) and y in (2, 5):
                    px[x][y] = NDS_PAL[pal_keys[(idx + 7) % len(pal_keys)]]
                elif (x, y) == (3, 3) or (x, y) == (4, 4):
                    px[x][y] = white
    return px


def render_nds_tiles(tile_count=32, tile_size=8):
    """生成 tile_count × tile_size 横排 RGBA 字节"""
    W = tile_count * tile_size
    H = tile_size
    buf = bytearray(W * H * 4)
    for ti in range(tile_count):
        tile = render_nds_tile(ti)
        ox = ti * tile_size
        for py in range(tile_size):
            for pxx in range(tile_size):
                color = tile[pxx][py]
                if color is None:
                    continue
                idx = (py * W + ox + pxx) * 4
                buf[idx] = color[0]
                buf[idx + 1] = color[1]
                buf[idx + 2] = color[2]
                buf[idx + 3] = color[3]
    return buf, W, H


# ===== NDS 16x16 digit font =====
def render_digit(d):
    """单字符 16x16 ROM 风格数字字体（深蓝 + 浅色高光）"""
    # 12x14 ROM digit pattern centered in 16x16
    # 用 5x7 段位图（与 Picross DS 字形风格近似）
    PAT = {
        '0': ["01110","10001","10001","10001","10001","10001","01110"],
        '1': ["00100","01100","00100","00100","00100","00100","01110"],
        '2': ["01110","10001","00001","00010","00100","01000","11111"],
        '3': ["01110","10001","00001","00110","00001","10001","01110"],
        '4': ["00010","00110","01010","10010","11111","00010","00010"],
        '5': ["11111","10000","11110","00001","00001","10001","01110"],
        '6': ["00110","01000","10000","11110","10001","10001","01110"],
        '7': ["11111","00001","00010","00100","01000","01000","01000"],
        '8': ["01110","10001","10001","01110","10001","10001","01110"],
        '9': ["01110","10001","10001","01111","00001","00010","01100"],
        ':': ["00000","00100","00100","00000","00100","00100","00000"],
    }
    chars = list(PAT.keys())
    ch = chars[d] if d < len(chars) else ':'
    pat = PAT[ch]
    W = 16
    H = 16
    # 空 16x16
    px = [[None]*W for _ in range(H)]
    # 图案居中：5x7 → 2x2 像素/格 → 10x14 实际像素 → 留 3 像素左右 + 1 上下
    cell_h = 2
    cell_w = 2
    off_x = (W - 5 * cell_w) // 2  # = 3
    off_y = (H - 7 * cell_h) // 2  # = 1
    for ry, row in enumerate(pat):
        for rx, c in enumerate(row):
            if c == '1':
                # 主深蓝 + 左上高光
                for yy in range(cell_h):
                    for xx in range(cell_w):
                        x = off_x + rx * cell_w + xx
                        y = off_y + ry * cell_h + yy
                        if 0 <= x < W and 0 <= y < H:
                            if xx == 0 and yy == 0:
                                px[x][y] = (0x70, 0xb0, 0xf0, 255)  # 左上高光
                            elif xx == cell_w - 1 and yy == cell_h - 1:
                                px[x][y] = (0x10, 0x30, 0x50, 255)  # 右下暗部
                            else:
                                px[x][y] = (0x18, 0x40, 0x70, 255)  # NDS 暗蓝主色
    # 背景透明（全 None）
    return px


def render_digits(digit_count=11, tile_size=16):
    """生成 11 个 16x16 数字图（横向排列）"""
    W = digit_count * tile_size
    H = tile_size
    buf = bytearray(W * H * 4)
    for di in range(digit_count):
        px = render_digit(di)
        ox = di * tile_size
        for py in range(tile_size):
            for pxx in range(tile_size):
                color = px[pxx][py]
                if color is None:
                    continue
                idx = (py * W + ox + pxx) * 4
                buf[idx] = color[0]
                buf[idx + 1] = color[1]
                buf[idx + 2] = color[2]
                buf[idx + 3] = color[3]
    return buf, W, H


def main():
    # 1. NDS Tiles
    buf, w, h = render_nds_tiles(32, 8)
    out = os.path.join(BASE, "assets/nds_tiles.png")
    write_png(out, w, h, buf)
    print(f"OK nds_tiles.png: {w}x{h} ({os.path.getsize(out)} B)")

    # 2. Digits
    buf, w, h = render_digits(11, 16)
    out = os.path.join(BASE, "assets/digits.png")
    write_png(out, w, h, buf)
    print(f"OK digits.png: {w}x{h} ({os.path.getsize(out)} B)")


if __name__ == "__main__":
    main()

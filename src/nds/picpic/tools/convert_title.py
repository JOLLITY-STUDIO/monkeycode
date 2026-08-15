# -*- coding: utf-8 -*-
"""title 资源提取：NCLR 调色板 + LZ10 解压 NCGR 瓦片 + NSCR 地图 → TS 模块
输出: miniprogram/engine/data/title/
"""
import struct, os, re, json

BASE = os.path.join(os.path.dirname(__file__), '..', 'roms', 'extracted', 'title')
OUT = os.path.join(os.path.dirname(__file__), '..', 'miniprogram', 'engine', 'data', 'title')
os.makedirs(OUT, exist_ok=True)

# ---------- LZ10 解压 ----------
def lz10(data):
    assert data[0] == 0x10, 'not lz10: %02x' % data[0]
    size = data[1] | (data[2] << 8) | (data[3] << 16)
    out = bytearray()
    i = 4
    while len(out) < size:
        flags = data[i]; i += 1
        for b in range(8):
            if len(out) >= size:
                break
            if flags & (0x80 >> b):
                lo, hi = data[i], data[i + 1]; i += 2
                ln = (lo >> 4) + 3
                off = ((lo & 0xF) << 8) | hi
                for _ in range(ln):
                    out.append(out[-off - 1])
            else:
                out.append(data[i]); i += 1
    return bytes(out[:size])

def bgr555_to_rgb(c):
    r = (c & 0x1F) * 255 // 31
    g = ((c >> 5) & 0x1F) * 255 // 31
    b = ((c >> 10) & 0x1F) * 255 // 31
    return [r, g, b]

# ---------- 提取 ----------
def nclr_palettes(name):
    """返回 16 组 x 16 色（4bpp 多组），或 1 组 x 16"""
    d = open(os.path.join(BASE, name), 'rb').read()
    n = (len(d) - 0x28) // 2
    colors = struct.unpack_from('<%dH' % n, d, 0x28)
    groups = [colors[i * 16:(i + 1) * 16] for i in range(n // 16)]
    return [[bgr555_to_rgb(c) for c in g] for g in groups]

def nscr_map(name):
    d = open(os.path.join(BASE, name), 'rb').read()
    entries = struct.unpack_from('<%dH' % ((len(d) - 0x28) // 2), d, 0x28)
    return list(entries)

def ncgr_tiles(lz_name):
    """LZ 解压 → NCGR，返回 (tile_size_bytes, tiles_bytes)
    NCGR 结构: 0x00 'RGCN' + 0x04 0xFEFF/0x0101 + 0x08 文件长(4B)
              + 0x10 'CHAR' + 0x14 char数据长(4B) + 0x20 起 char 数据
    """
    d = open(os.path.join(BASE, lz_name), 'rb').read()
    raw = lz10(d)
    assert raw[:4] == b'RGCN', lz_name
    data_off = 0x20
    tiles = raw[data_off:]
    return len(tiles), tiles

def ts_uint8(name, data, wrap=24):
    lines = []
    for i in range(0, len(data), wrap):
        chunk = data[i:i + wrap]
        lines.append('  ' + ','.join(str(b) for b in chunk) + ',')
    return 'new Uint8Array([\n' + '\n'.join(lines) + '\n])'

# ---------- 调色板 ----------
pal_src = {
    'bg_title': 'bg_title.NCLR',
    'button_title': 'button_title.NCLR',
    'button': 'button.NCLR',
    'autosave': 'autosave.NCLR',
    'axss': 'axss.NCLR',
    'besttime': 'besttime.NCLR',
    'btn_down': 'btn_down.NCLR',
    'btn_XtoKill': 'btn_XtoKill.NCLR',
    'success': 'success.NCLR',
}
pal_lines = ['// Pic Pic title 画面调色板（NCLR → RGB，每组 16 色，4bpp 多组）', '']
for tsname, fname in pal_src.items():
    groups = nclr_palettes(fname)
    arr = ','.join('[' + ','.join(str(c) for c in g) + ']' for g in groups)
    pal_lines.append('export const %s_PAL: number[][][] = [%s];' % (tsname.upper(), arr))
pal_lines.append('')
pal_lines.append('export const TITLE_PALS = { bg_title: BG_TITLE_PAL, button_title: BUTTON_TITLE_PAL, button: BUTTON_PAL, autosave: AUTOSAVE_PAL, axss: AXSS_PAL, besttime: BESTTIME_PAL, btn_down: BTN_DOWN_PAL, btn_XtoKill: BTN_XTOKILL_PAL, success: SUCCESS_PAL };')
with open(os.path.join(OUT, 'palettes.ts'), 'w', encoding='utf-8') as f:
    f.write('\n'.join(pal_lines))
print('palettes.ts', os.path.getsize(os.path.join(OUT, 'palettes.ts')))

# ---------- 瓦片 + 地图 ----------
# (TS 名, LZ 文件, NSCR 文件, 注释)
assets = [
    ('BG_TITLE_T', 'bg_title_t_LZ.bin', 'bg_title_t.NSCR', '上屏背景 256x192'),
    ('BG_TITLE_V', 'bg_title_v_LZ.bin', 'bg_title_v.NSCR', '下屏背景 256x192'),
    ('SUCCES', 'succes_LZ.bin', 'succes.NSCR', 'SUCCESS logo 字幕'),
    ('CONCEPTIS', 'conceptis_LZ.bin', 'conceptis.NSCR', 'Conceptis logo 字幕'),
    ('BUTTON_TITLE_OFF', 'button_title_off_LZ.bin', None, 'Touch to START 按钮（未按下）'),
    ('BTN_DOWN', 'btn_down_LZ.bin', None, '下箭头按钮'),
    ('BTN_XTOKILL', 'btn_XtoKill_LZ.bin', None, 'X 删除按钮'),
    ('BUTTON_SELECT', 'button_select_LZ.bin', None, '档案选择按钮'),
]

# 先收集所有 NSCR 用到的最多瓦片数，用于裁剪
for tsname, lz, nscr, comment in assets:
    tile_len, tiles = ncgr_tiles(lz)
    tiles_per = tile_len // 32
    lines = ['// %s：%s' % (tsname, comment), '']
    if nscr:
        m = nscr_map(nscr)
        used = max((e & 0x3FF) for e in m) + 1
        need = max(used, 256)
        if need < tiles_per:
            tiles = tiles[:need * 32]
            tiles_per = need
        mlines = ['export const %s_MAP: number[] = [' % tsname]
        for i in range(0, len(m), 16):
            mlines.append('  ' + ','.join(hex(e) for e in m[i:i + 16]) + ',')
        mlines.append('];')
        lines.append('\n'.join(mlines))
        lines.append('')
    lines.append('export const %s_TILES = %s;' % (tsname, ts_uint8(tsname, tiles)))
    with open(os.path.join(OUT, tsname.lower() + '.ts'), 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print('%s tiles=%d (%d 瓦片) %s' % (tsname, len(tiles), len(tiles) // 32, ('map=%d' % len(m)) if nscr else 'no-map'))

# ---------- 索引 ----------
idx = ['// title 资源索引', '']
for tsname, lz, nscr, comment in assets:
    idx.append("import { %s_TILES%s } from './%s';" % (tsname, ', %s_MAP' % tsname if nscr else '', tsname.lower()))
idx.append("import { BG_TITLE_PAL, BUTTON_TITLE_PAL, BUTTON_PAL, AUTOSAVE_PAL, AXSS_PAL, BESTTIME_PAL, BTN_DOWN_PAL, BTN_XTOKILL_PAL, SUCCESS_PAL } from './palettes';")
idx.append('')
idx.append('export const TITLE_BG = { map: BG_TITLE_T_MAP, tiles: BG_TITLE_T_TILES, pal: BG_TITLE_PAL };')
idx.append('export const TITLE_BG_V = { map: BG_TITLE_V_MAP, tiles: BG_TITLE_V_TILES, pal: BG_TITLE_PAL };')
idx.append('export const TITLE_LOGO_SUCCES = { map: SUCCES_MAP, tiles: SUCCES_TILES, pal: SUCCESS_PAL };')
idx.append('export const TITLE_LOGO_CONCEPTIS = { map: CONCEPTIS_MAP, tiles: CONCEPTIS_TILES, pal: SUCCESS_PAL };')
idx.append('export const TITLE_BTN_START = { tiles: BUTTON_TITLE_OFF_TILES, pal: BUTTON_TITLE_PAL };')
idx.append('export const TITLE_BTN_DOWN = { tiles: BTN_DOWN_TILES, pal: BTN_DOWN_PAL };')
idx.append('export const TITLE_BTN_XTOKILL = { tiles: BTN_XTOKILL_TILES, pal: BTN_XTOKILL_PAL };')
idx.append('export const TITLE_BTN_SELECT = { tiles: BUTTON_SELECT_TILES, pal: BUTTON_TITLE_PAL };')
with open(os.path.join(OUT, 'index.ts'), 'w', encoding='utf-8') as f:
    f.write('\n'.join(idx))
print('index.ts written')

"""
MEETING 场景渲染工具
从 scene_meeting.json 的 tilemap bytes 渲染 11×16 tile 背景图
参数可选: 调色板 / pattern table 0 / pattern table 1

使用:
    from scene_meeting_render import MeetingScene
    ms = MeetingScene()
    ms.render()  # 默认参数输出 scene_meeting_tt_xy2.png
    ms.render(scale=4, palette_idx=0, table=0)  # 自定义参数
"""

import json
import os
import struct
import zlib

_DIR = os.path.dirname(os.path.abspath(__file__))

# ======================== NES 调色板 ========================
NES_PALETTE_RGB = [
    0x7C7C7C, 0x0000FC, 0x0000BC, 0x4428BC, 0x940084, 0xA80020, 0xA81000,
    0x881400, 0x503000, 0x007800, 0x006800, 0x005800, 0x004058, 0x000000,
    0x000000, 0x000000, 0xBCBCBC, 0x0078F8, 0x0058F8, 0x6844FC, 0xD800CC,
    0xE40058, 0xF83800, 0xE45C10, 0xAC7C00, 0x00B800, 0x00A800, 0x00A844,
    0x008888, 0x000000, 0x000000, 0x000000, 0xF8F8F8, 0x3CBCFC, 0x6888FC,
    0x9878F8, 0xF878F8, 0xF85898, 0xF87858, 0xFEA044, 0xF8B800, 0xB8F818,
    0x58D854, 0x58F898, 0x00E8D8, 0x787878, 0x000000, 0x000000, 0xFCFCFC,
    0xA4E4FC, 0xB8B8F8, 0xD8B8F8, 0xF8B8F8, 0xF8A4C0, 0xF0D0B0, 0xFCE0A8,
    0xF8D878, 0xD8F878, 0xB8F8B8, 0xB8F8D8, 0x00FCFC, 0xF8D8F8, 0x000000,
    0x000000,
]

# 几套预设调色板 (按 PPU palette RAM 格式, 4个4色子调色板各4色)
#   子调色板: [bg_color, c1, c2, c3]
#   PPU palette: addr $3F00 = bg, $3F01-$3F0F = 4 sub-palettes
PRESET_PALETTES = {
    # 0: 默认深蓝底 (通用)
    0: [0x0F, 0x00, 0x10, 0x20],   # bg: 黑,深蓝,灰蓝,白
    # 1: 偏暖
    1: [0x0F, 0x06, 0x16, 0x27],
    # 2: 绿色调
    2: [0x0F, 0x0A, 0x1A, 0x2A],
    # 3: 棕色
    3: [0x0F, 0x07, 0x17, 0x28],
}


class MeetingScene:
    """
    读取 scene_meeting.json，渲染 tilemap 背景图。
    """

    def __init__(self):
        json_path = os.path.join(_DIR, '..', 'disasm', 'banks', '_romdata', 'scene_meeting.json')
        with open(json_path, 'r') as f:
            self._data = json.load(f)
        self._tilemap = self._data['bytes']  # 176 bytes, 11×16

    # ---- 基础信息 ----

    @property
    def rows(self) -> int:
        return self._data['rows']  # 11

    @property
    def cols(self) -> int:
        return self._data['bytesPerRow']  # 16

    @property
    def tilemap(self) -> list:
        """返回 11×16 tile 索引二维列表"""
        return [self._tilemap[r * 16 : r * 16 + 16] for r in range(self.rows)]

    def getBytes(self) -> list:
        """返回原始 tilemap bytes (176)"""
        return self._tilemap

    def tile_at(self, row: int, col: int) -> int:
        return self._tilemap[row * 16 + col]

    def meeting_box_tiles(self) -> dict:
        """返回 MEETING 框内 tile 信息"""
        return self._data['meetingRows']

    # ---- CHR 加载 ----

    def _load_chr_rom(self, rom_path: str = None) -> bytes:
        """从 .nes ROM 文件读取 CHR 数据"""
        if rom_path is None:
            rom_path = os.path.join(_DIR, '..', 'romdata',
                                     'Captain Tsubasa II - Super Striker (Japan).nes')
        with open(rom_path, 'rb') as f:
            header = f.read(16)
        prg_banks = header[4]  # 16KB units
        chr_banks = header[5]  # 8KB units
        with open(rom_path, 'rb') as f:
            f.seek(16 + prg_banks * 16384)
            chr_data = f.read(chr_banks * 8192)
        return chr_data

    def _load_chr_json(self, bank: int) -> bytes:
        """从 chrBanks.json 加载单个 CHR bank"""
        json_path = os.path.join(_DIR, 'chrBanks.json')
        with open(json_path, 'r') as f:
            all_banks = json.load(f)
        key = f'bank_{bank:02x}'
        if key not in all_banks:
            raise KeyError(f'CHR {key} not found in chrBanks.json')
        arr = all_banks[key]
        if isinstance(arr, dict) and 'data' in arr:
            return bytes(arr['data'])
        if isinstance(arr, list):
            return bytes(arr)
        return bytes(arr)

    def load_chr(self, bank: int = 0, source: str = 'json') -> bytes:
        """加载 8KB CHR bank (256 tiles × 16 bytes)"""
        if source == 'json':
            return self._load_chr_json(bank)
        else:
            chr_data = self._load_chr_rom(source)
            offset = bank * 8192
            return chr_data[offset:offset + 8192]

    def get_tile_glyph(self, chr_data: bytes, tile_id: int) -> list:
        """返回 tile 的 8×8 像素色深 (0-3), 每行一个 int (8像素位掩码)"""
        off = tile_id * 16
        rows = []
        for y in range(8):
            lo = chr_data[off + y]
            hi = chr_data[off + y + 8]
            row = 0
            for x in range(8):
                bit = 7 - x
                c = ((lo >> bit) & 1) | (((hi >> bit) & 1) << 1)
                row = (row << 2) | c
            rows.append(row)
        return rows

    # ---- 渲染 ----

    def render(
        self,
        palette: list = None,
        chr_table: int = 0,      # pattern table index (0 or 1)
        chr_source: str = 'json', # 'json' 或 rom 路径
        scale: int = 4,
        output: str = None,
    ) -> str:
        """
        渲染场景到 PNG。

        参数:
            palette: 4×4 PPU 子调色板 [[bg,c1,c2,c3], ...] 或 None 用预设
            chr_table: 使用哪个 8KB pattern table (0~15, 每个 8KB)
            chr_source: 'json' 或 .nes 路径
            scale: 放大倍数 (1=128×88, 4=512×352)
            output: 输出 PNG 路径, None=自动命名
        返回: 输出文件路径
        """
        if palette is None:
            palette_raw = PRESET_PALETTES[0] * 4  # 所有子调色板用同一套
        elif isinstance(palette[0], int):
            palette_raw = palette  # 已扁平化
        else:
            palette_raw = [c for sub in palette for c in sub]

        chr_data = self.load_chr(chr_table, chr_source)

        w = self.cols * 8
        h = self.rows * 8
        pixels = bytearray(w * h * 3)  # RGB

        for r in range(self.rows):
            for c in range(self.cols):
                tid = self._tilemap[r * 16 + c]
                glyph = self.get_tile_glyph(chr_data, tid)
                for y in range(8):
                    row_data = glyph[y]
                    for x in range(8):
                        ci = (row_data >> ((7 - x) * 2)) & 3
                        if ci == 0:
                            color_idx = palette_raw[0]
                        else:
                            color_idx = palette_raw[ci]  # bg sub-palette
                        rgb = NES_PALETTE_RGB[color_idx & 0x3F]
                        py = r * 8 + y
                        px = c * 8 + x
                        off = (py * w + px) * 3
                        pixels[off] = (rgb >> 16) & 0xFF
                        pixels[off + 1] = (rgb >> 8) & 0xFF
                        pixels[off + 2] = rgb & 0xFF

        # 放大
        if scale > 1:
            sw, sh = w, h
            w2, h2 = sw * scale, sh * scale
            scaled = bytearray(w2 * h2 * 3)
            for py in range(sh):
                for px in range(sw):
                    soff = (py * sw + px) * 3
                    for dy in range(scale):
                        for dx in range(scale):
                            doff = ((py * scale + dy) * w2 + (px * scale + dx)) * 3
                            scaled[doff] = pixels[soff]
                            scaled[doff + 1] = pixels[soff + 1]
                            scaled[doff + 2] = pixels[soff + 2]
            pixels = scaled
            w, h = w2, h2

        # 输出 PNG
        if output is None:
            output = os.path.join(_DIR, f'scene_meeting_t{chr_table}_s{scale}x.png')
        self._write_png(output, w, h, bytes(pixels))
        print(f'  → {output}  ({w}x{h})')
        return output

    # ---- PNG 写入 ----

    @staticmethod
    def _write_png(path: str, width: int, height: int, rgb: bytes):
        """写入 RGB PNG 文件"""

        def chunk(chunk_type: bytes, data: bytes) -> bytes:
            c = chunk_type + data
            return struct.pack('>I', len(data)) + c + struct.pack('>I', zlib.crc32(c) & 0xFFFFFFFF)

        sig = b'\x89PNG\r\n\x1a\n'
        ihdr = chunk(b'IHDR', struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0))

        # 每行加 filter byte 0
        raw = b''
        row_len = width * 3
        for y in range(height):
            raw += b'\x00' + rgb[y * row_len:(y + 1) * row_len]
        idat = chunk(b'IDAT', zlib.compress(raw, 9))
        iend = chunk(b'IEND', b'')

        with open(path, 'wb') as f:
            f.write(sig + ihdr + idat + iend)


# ======================== 直接运行 ========================
if __name__ == '__main__':
    ms = MeetingScene()

    print(f'scene_meeting.json: {ms.rows}×{ms.cols} tiles ({len(ms.getBytes())} bytes)')
    print(f'meeting box: TIME={ms.meeting_box_tiles()["time"]}, '
          f'MEET={ms.meeting_box_tiles()["meet"]}, '
          f'ING={ms.meeting_box_tiles()["ing"]}')

    # 用 chrBanks.json CHR bank_00 渲染
    for t in [0, 1]:
        for s in [2, 4]:
            ms.render(chr_table=t, chr_source='json', scale=s)

# -*- coding: utf-8 -*-
"""
ndsrom.py — Pic Pic (Japan) 全新逆向分析基础库
=====================================================
从 ROM 二进制直接解析，不依赖任何历史测试产物。

源 ROM：Pic Pic - Toku to E ni Naru 3-tsu no Puzzle (Japan).nds
  title=PICTURE-PIX gamecode=A6PJ maker=8N （原版干净头）
  ARM9 entry=0x02000800 ram=0x02000000 size=0x92A18
  FNT=0xBF600 FAT=0xCCA00 3410 文件

职责：
  1. NDS 头解析（外层头 + 备用头探测）
  2. FNT/FAT 文件系统解析
  3. ARM9/ARM7 二进制提取
  4. 反汇编工具（capstone）
"""
import struct
from pathlib import Path

ROM_PATH = Path(r'd:\studio\github\monkeycode\src\nds\picpic\roms\Pic Pic - Toku to E ni Naru 3-tsu no Puzzle (Japan).nds')


class NdsRom:
    def __init__(self, path=ROM_PATH):
        self.path = Path(path)
        self.data = self.path.read_bytes()
        self.size = len(self.data)

    # ------------------------------------------------------------------ header
    def header(self, off=0):
        """解析位于 off 处的 NDS 头（外层 0x000 或备用）。"""
        d = self.data
        h = {
            'off': off,
            'title': d[off:off + 12].decode('ascii', 'replace').rstrip('\x00 '),
            'gamecode': d[off + 0x0C:off + 0x10].decode('ascii', 'replace'),
            'makercode': d[off + 0x10:off + 0x12].decode('ascii', 'replace'),
            'unitcode': d[off + 0x12],
            'enc_seed': d[off + 0x13],
            'capacity': d[off + 0x14],
            'arm9_rom_off': self.u32(off + 0x20),
            'arm9_entry': self.u32(off + 0x24),
            'arm9_ram': self.u32(off + 0x28),
            'arm9_size': self.u32(off + 0x2C),
            'arm7_rom_off': self.u32(off + 0x30),
            'arm7_entry': self.u32(off + 0x34),
            'arm7_ram': self.u32(off + 0x38),
            'arm7_size': self.u32(off + 0x3C),
            'fnt_off': self.u32(off + 0x40),
            'fnt_size': self.u32(off + 0x44),
            'fat_off': self.u32(off + 0x48),
            'fat_size': self.u32(off + 0x4C),
            'arm9_ovl_off': self.u32(off + 0x50),
            'arm9_ovl_size': self.u32(off + 0x54),
            'arm7_ovl_off': self.u32(off + 0x58),
            'arm7_ovl_size': self.u32(off + 0x5C),
            'romctrl': self.u32(off + 0x60),
            'banneroff': self.u32(off + 0x68),
            'secure_checksum': self.u16(off + 0x6C),
            'romsize': self.u32(off + 0x80) or self.u32(off + 0x7C),
            'headersize': self.u32(off + 0x84),
            'title_long': d[off + 0x88:off + 0x88 + 128].decode('utf-16-le', 'replace').rstrip('\x00'),
        }
        return h

    # ------------------------------------------------------------ fat / fnt
    def fat(self, off, size):
        """FAT 表：[start, end) 文件范围。"""
        entries = []
        for i in range(size // 8):
            start, end = struct.unpack_from('<II', self.data, off + i * 8)
            entries.append((start, end))
        return entries

    def fnt_parse(self, off=None):
        """FNT 完整解析（已验证格式，见 tools/fs_tree2.py）：
        主表: fnt_off 起，首 u32 = 主表字节大小（目录数 × 8）
        目录表: 文件 [len][name]，目录 [len|0x80][name][u16 sub]，sub 编码 0xF000|dir_id
        返回 (dirs, tables, dir_names)
          dirs[i]   = {'id','x','parent','first_file'}
          tables[i] = (files, subdirs)  # files=[(pos,name)], subdirs=[(sid,name)]
        """
        d = self.data
        if off is None:
            off = self.header(0)['fnt_off']
        main_bytes = struct.unpack_from('<I', d, off)[0]
        ndirs = main_bytes // 8
        root_tbl = off + main_bytes
        dirs = []
        for i in range(ndirs):
            x = struct.unpack_from('<I', d, off + i * 8)[0]
            b = struct.unpack_from('<I', d, off + i * 8 + 4)[0]
            pflag = b >> 16
            dirs.append({'id': i, 'x': x, 'parent': pflag & 0x0FFF,
                         'first_file': b & 0xFFFF})
        tables = []
        cur = root_tbl
        for i in range(ndirs):
            files, subdirs = [], []
            while True:
                c = d[cur]
                if c == 0:
                    cur += 1
                    break
                nlen = c & 0x7F
                if c & 0x80:
                    name = d[cur + 1:cur + 1 + nlen].decode('ascii', 'replace')
                    sub = struct.unpack_from('<H', d, cur + 1 + nlen)[0]
                    subdirs.append((sub & 0x0FFF, name))
                    cur += 1 + nlen + 2
                else:
                    name = d[cur + 1:cur + 1 + nlen].decode('ascii', 'replace')
                    files.append((cur, name))
                    cur += 1 + nlen
            tables.append((files, subdirs))
        dir_names = {0: 'ROOT'}
        for _, subdirs in tables:
            for sid, name in subdirs:
                if sid not in dir_names:
                    dir_names[sid] = name
        return dirs, tables, dir_names

    def file_info(self, fid, dirs=None, tables=None):
        """文件 id → (path, start, end)。"""
        if dirs is None:
            dirs, tables, _ = self.fnt_parse()
        fat = self.fat(self.header(0)['fat_off'], self.header(0)['fat_size'])
        # 找文件所在目录：first_file <= fid < 下一目录 first_file
        for i, dd in enumerate(dirs):
            ff = dd['first_file']
            nf = dirs[i + 1]['first_file'] if i + 1 < len(dirs) else len(fat)
            if ff <= fid < nf:
                idx = fid - ff
                files, _ = tables[i]
                if idx < len(files):
                    _, name = files[idx]
                    return (name, fat[fid][0], fat[fid][1])
        return (None, 0, 0)

    def read_file(self, fid, dirs=None, tables=None):
        """文件 id → 字节。"""
        if dirs is None:
            dirs, tables, _ = self.fnt_parse()
        fat = self.fat(self.header(0)['fat_off'], self.header(0)['fat_size'])
        s, e = fat[fid]
        return self.data[s:e]

    def find_path(self, path, dirs=None, tables=None):
        """路径（如 'map_d/4000101_Cat & mouse.map'）→ (fid, bytes)。"""
        if dirs is None:
            dirs, tables, _ = self.fnt_parse()
        parts = path.split('/')
        dir_id = 0
        for p in parts[:-1]:
            found = None
            for sid, name in tables[dir_id][1]:
                if name.lower() == p.lower():
                    found = sid
                    break
            if found is None:
                return (None, b'')
            dir_id = found
        for idx, (_, name) in enumerate(tables[dir_id][0]):
            if name.lower() == parts[-1].lower():
                fid = dirs[dir_id]['first_file'] + idx
                return (fid, self.read_file(fid, dirs, tables))
        return (None, b'')

    # ----------------------------------------------------------------- tools
    def u8(self, o):
        return self.data[o]

    def u16(self, o):
        return struct.unpack_from('<H', self.data, o)[0]

    def u32(self, o):
        return struct.unpack_from('<I', self.data, o)[0]

    def arm9(self, h):
        return self.data[h['arm9_rom_off']:h['arm9_rom_off'] + h['arm9_size']]

    def arm7(self, h):
        return self.data[h['arm7_rom_off']:h['arm7_rom_off'] + h['arm7_size']]


def hexstr(b):
    return b.hex(' ')


def find_nds_header(data, max_scan=0x200000):
    """在 ROM 中搜索可能的备用 NDS 头（检查 gamecode 位置）。"""
    hits = []
    idx = 0
    while True:
        idx = data.find(b'NTRJ', idx)
        if idx < 0 or idx > max_scan:
            break
        # 检查前后字段合理性：title 前 12 字节可打印，其后偏移0x20 是 u32
        if idx >= 0x0C and idx <= max_scan:
            title = data[idx - 0x0C:idx]
            arm9_off = struct.unpack_from('<I', data, idx + 0x20 - 0x0C)[0] if idx >= 0x0C + 0x20 else 0
            hits.append((idx, title, arm9_off))
        idx += 1
    return hits


if __name__ == '__main__':
    rom = NdsRom()
    print('ROM size : 0x%X (%d bytes)' % (rom.size, rom.size))
    print('--- 外层头 ---')
    for k, v in rom.header(0).items():
        print('  %-18s: %s' % (k, v))

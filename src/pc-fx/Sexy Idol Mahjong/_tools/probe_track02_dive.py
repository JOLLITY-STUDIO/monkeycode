import os, struct
BASE = r'd:\studio\github\monkeycode\src\pc-fx\Sexy Idol Mahjong\_tools\extracted\track_data\track_02'
ud_path = os.path.join(BASE, 'user_data.bin')

with open(ud_path, 'rb') as f:
    ud = f.read()

def hexdump(data, off, length, prefix=' '):
    print(f'\n=== hexdump @ 0x{off:08X} len={length} ===')
    for i in range(0, length, 16):
        adr = off + i
        chunk = data[adr:adr+16]
        hex_ = ' '.join(f'{b:02X}' for b in chunk)
        asc_ = ''.join(chr(b) if 0x20 <= b < 0x7F else '.' for b in chunk)
        print(f'{prefix}{adr:08X}  {hex_:<48}  {asc_}')

def hexdump_range(start, end):
    hexdump(ud, start, end-start)

# 1) BM FORMAT! 区段
print('=== 0x00003AD6 BM FORMAT! area ===')
hexdump_range(0x00003A80, 0x00003CA0 + 0x40)

# 2) GPC area
print('\n=== 0x00F9AB81 GPC area ===')
hexdump_range(0x00F9AB40, 0x00F9AC60)

# 3) MPEG area
print('\n=== 0x008E6328 MPEG sequence header ===')
hexdump_range(0x008E6310, 0x008E6400)

# 找 MPEG audio sync (0xFFE0/0xFFFB) 区段
print('\n=== MPEG audio scan ===')
for sync in (b'\xff\xe0', b'\xff\xfb', b'\xff\xfa', b'\x1f\xe0', b'\x1f\xfb'):
    p = ud.find(sync)
    cnt = 0
    while p >= 0 and cnt < 5:
        ctx = ud[p:p+12].hex(' ')
        print(f'  {sync.hex(" ")} @ 0x{p:08X}: {ctx}')
        p = ud.find(sync, p+1)
        cnt += 1

# 4) 找所有的 ROM load 标志 (banks) - 16 位 load size + 32 位 addr
# Hudson ACE System 风格
print('\n=== Hunt for Hudson resource table headers ===')
# Tile data 通常 16x16 pixel, 16 色 → 16 byte/tile, 调色板 32 byte
# 试 0x200-aligned 段大小（512 byte = 32 tile, 1024 = 64 tile）
patterns = [
    ('16b_align512', 16, 512),  # 16 个 16-byte tile, 16x16 tile 有 32 byte, 这里 16 byte 单 plane
]
for name, _, align in patterns:
    cnt = 0
    for off in range(0, len(ud) - align, align):
        # 试 tile palette 指示：4 个 RGB 值, GBGR 格式 (PCE palette 是 16-bit G/R 单独 byte)
        # 高频情况：调色板 0..15 大部分为零 + 全白（bg）
        ...
print()

# 5) 找所有可能的 tile 区段：连续的 16-byte 全偶数（tile plane 0）段
# tile plane 0 每 byte 表示 4 个 pixel (2 bit), 高频会重复
print('=== 找 16-byte 重复 tile 区域 ===')
def is_tile_like(ud, off):
    # 16 个 byte 是不是看起来像 tile 调色板索引平面（值为 0..0xFF, 但概率分布应该集中）
    sli = ud[off:off+16]
    if any(b == 0 for b in sli):
        return False  # 全零
    # 字节分布方差不应为零
    if len(set(sli)) == 1:
        return False
    return True

# 这个查找太慢，跳过

# 6) 直接看开头 0x2000 byte 是什么 (typical IP.BIN 之后是 initial code + IP.BIN[0x100] 是 loader)
print('\n=== user_data 0x100-0x2000 ===')
hexdump_range(0x100, 0x2000)

# 7) 找 0x1500 偏移附近
print('\n=== sample 0x1500-0x1C00 HUDSON typical control area ===')
hexdump_range(0x1500, 0x1C00)

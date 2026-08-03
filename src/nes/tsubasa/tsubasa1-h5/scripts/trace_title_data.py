"""提取标题画面 nametable 数据 - 追踪指针链"""
NES = r'd:\studio\github\monkeycode\src\nes\tsubasa\tsubasa1-h5\_tmp_disasm_out\Captain Tsubasa (Japan).nes'

def read_rom(offset, length=64):
    with open(NES, 'rb') as f:
        f.seek(offset)
        return f.read(length)

BANK7_ROM = 0x1C010
BANK7_CPU = 0xC000

def cpu_to_rom(cpu_addr):
    if 0xC000 <= cpu_addr <= 0xFFFF:
        return BANK7_ROM + (cpu_addr - BANK7_CPU)
    return None

def hex_dump(data, label, cpu_addr=0):
    print(f"\n{label}:")
    for i in range(0, len(data), 16):
        chunk = data[i:i+16]
        hx = ' '.join(f'{b:02X}' for b in chunk)
        asc = ''.join(chr(b) if 32 <= b < 127 else '.' for b in chunk)
        print(f'  ${cpu_addr+i:04X}: {hx}  {asc}')

def read_ptrs(rom_off, count=8):
    """读取16位小端指针列表"""
    data = read_rom(rom_off, count*2)
    ptrs = []
    for i in range(0, len(data), 2):
        lo, hi = data[i], data[i+1]
        addr = lo | (hi << 8)
        ptrs.append(addr)
    return ptrs

# 1. 读取 Bank 7 $C070 的数据结构
print("="*60)
print("Tracing title data pointers from Bank 7 $C070")
print("="*60)

# $C070 包含指向 nametable 数据和调色板数据的指针
rom_c070 = cpu_to_rom(0xC070)
print(f"\n$C070 → ROM 0x{rom_c070:X}")
ptrs = read_ptrs(rom_c070, 8)
for i, p in enumerate(ptrs):
    r = cpu_to_rom(p) if p >= 0xC000 else None
    print(f"  ptr[{i}]: ${p:04X}" + (f" → ROM 0x{r:X}" if r else " (not Bank7)"))

# 2. 追踪 $C29C 的数据
print("\n" + "="*60)
print("Data at $C29C (possible title nametable data)")
print("="*60)
rom_c29c = cpu_to_rom(0xC29C)
data = read_rom(rom_c29c, 128)
hex_dump(data, "$C29C data", 0xC29C)

# 3. 追踪 $C2A8 的数据
print("\n" + "="*60)
print("Data at $C2A8")
print("="*60)
rom_c2a8 = cpu_to_rom(0xC2A8)
data = read_rom(rom_c2a8, 256)
hex_dump(data, "$C2A8 data", 0xC2A8)

# 4. 看看是不是 RLE nametable
# RLE 格式: byte < $80 → 直接 tile; byte >= $80 → count=(b&0x1F), next=value
def decode_title_rle(data):
    tiles = []
    i = 0
    while i < len(data):
        b = data[i]
        i += 1
        if b == 0x00:
            # End marker?
            break
        elif b == 0xFF:
            tiles.append(0xFF)
        elif b < 0x80:
            tiles.append(b)
        else:
            count = b & 0x1F
            if count == 0:
                tiles.append(b)
                continue
            if i < len(data):
                val = data[i]
                i += 1
                tiles.extend([val] * count)
    return tiles

# 5. 扫描 Bank 7 中看起来像标题 nametable 的数据
print("\n" + "="*60)
print("Scanning for title nametable patterns")
print("="*60)

# 天使之翼标题特征: 大量的空白(00或FF) + 标题文字tile
# 标题通常占据屏幕上半部分, 下半部分是版权信息
# 常见的标题tile模式: 连续的相同或递进tile

bank7_data = read_rom(BANK7_ROM, 16384)

# 找 RLE 数据块: 第一个字节是 RLE count (>= 0x80)
for start in range(0, 16384-256, 16):
    chunk = bank7_data[start:start+16]
    # RLE特征: >=0x80的字节后跟着<0x80的字节
    rle_pairs = 0
    for j in range(1, 16):
        if chunk[j-1] >= 0x80 and chunk[j-1] < 0xA0 and chunk[j] < 0x80:
            rle_pairs += 1
    if rle_pairs >= 2:
        cpu = BANK7_CPU + start
        tiles = decode_title_rle(bank7_data[start:start+512])
        if len(tiles) > 30:
            nonzero = sum(1 for t in tiles if t != 0 and t < 0x80)
            uniq = len(set(tiles))
            if nonzero > 20 and uniq > 8:
                print(f"\nPotential nametable at ${cpu:04X} (tiles={len(tiles)}, nonzero={nonzero}, unique={uniq}):")
                hex_dump(bank7_data[start:start+48], f"  Data", cpu)
                print(f"  Decoded first 48: {' '.join(f'{t:02X}' for t in tiles[:48])}")

# 6. Check Bank 1 for title-related nametable data
print("\n" + "="*60)
print("Checking Bank 1 ($8000+ offsets) for title nametable data")
print("="*60)
BANK1_ROM = 0x4010
bank1_data = read_rom(BANK1_ROM, 16384)

# Bank 1's data area: $9000-$BFFF (ROM 0x5010-0x800F)
# Look for RLE patterns in the upper half
for start in range(0x1000, 0x4000, 0x10):
    chunk = bank1_data[start:start+16]
    rle_pairs = 0
    for j in range(1, 16):
        if chunk[j-1] >= 0x80 and chunk[j-1] < 0xA0 and chunk[j] < 0x80:
            rle_pairs += 1
    if rle_pairs >= 3:
        cpu = 0x8000 + start
        tiles = decode_title_rle(bank1_data[start:start+512])
        if len(tiles) > 30:
            nonzero = sum(1 for t in tiles if t != 0 and t < 0x80)
            uniq = len(set(tiles))
            if nonzero > 20 and uniq > 8:
                print(f"\nPotential nametable at CPU ${cpu:04X} (nonzero={nonzero}, unique={uniq}):")
                hex_dump(bank1_data[start:start+32], f"  Data", cpu)
                print(f"  Decoded first 48: {' '.join(f'{t:02X}' for t in tiles[:48])}")

print("\nDone!")

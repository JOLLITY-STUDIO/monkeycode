"""验证 Bank 5 (数据 bank) 的 sub-state 分发机制"""
import struct

NES = r'd:\studio\github\monkeycode\src\nes\tsubasa\tsubasa1-h5\_tmp_disasm_out\Captain Tsubasa (Japan).nes'

def read_prg_bank(bank_idx):
    """读取 PRG bank (0-7), 每个 16KB"""
    offset = 0x10 + bank_idx * 0x4000  # 16 bytes header + bank * 16KB
    with open(NES, 'rb') as f:
        f.seek(offset)
        return f.read(16384)

def hex_dump(data, offset, length=48, addr=0, label=""):
    """格式化的 hex dump"""
    if label:
        print(f"\n{label}:")
    for i in range(0, length, 16):
        bytes_slice = data[offset+i:offset+i+16]
        hex_str = ' '.join(f'{b:02X}' for b in bytes_slice)
        ascii_str = ''.join(chr(b) if 32 <= b < 127 else '.' for b in bytes_slice)
        print(f'  ${addr+offset+i:04X}: {hex_str}  {ascii_str}')

# 读取各 bank
bank0 = read_prg_bank(0)  # Core engine
bank1 = read_prg_bank(1)  # Title/menu code+data
bank5 = read_prg_bank(5)  # Data bank
bank7 = read_prg_bank(7)  # Fixed bank

# ============================================================
# 1. Bank 5: 查找 sub-state D 相关的数据
# Bank 5 是数据 bank, sub-state 可能对应一个偏移量
# ============================================================
print("=" * 60)
print("BANK 5 DATA ANALYSIS (Data Bank)")
print("=" * 60)

# Bank 5 的前256字节 (如果是跳转表/指针表)
hex_dump(bank5, 0, 128, 0x8000, "Bank 5 header ($8000)")

# 查找Bank 5中是否有可识别的子状态表
# 如果 sub-state D = 13, 可能是 Bank 5 中的第13个数据块
# 数据块可能以指针表形式组织

print(f"\nBank 5 size: {len(bank5)} bytes")
print(f"Bank 5 first bytes: {bank5[0]:02X} {bank5[1]:02X} {bank5[2]:02X}")

# Check if Bank 5 starts with a pointer table
# MMC1 bank switch means CPU can see Bank 5 at $8000-$BFFF
# If Bank 5 is data, there's no executable code; data is accessed via absolute addressing

# 2. 检查 Bank 0 中 $84D2 如何处理数据 bank
print("\n" + "=" * 60)
print("BANK 0: $84D2 State Dispatcher Analysis")
print("=" * 60)

# $84D2 在 Bank 0 ROM offset 0x04D2
# 反汇编显示该函数:
#   PHA (保存stateID)
#   LSR x4 (提取高4位)
#   JSR $83C5 (写PRG Bank寄存器)
#   PLA (恢复stateID)
#   AND #$0F (提取低4位)
#   STA $05FC (存储sub-state索引)

# 关键: 对于数据bank, 后续处理不同
# 查看 $83C5 (Bank switch routine)

# 3. Bank 7 ($C000+) 检查固定bank中的脚本数据
print("\n" + "=" * 60)
print("BANK 7: Fixed Bank Structure Check")
print("=" * 60)

# Bank 7 中有两种区域:
# - $C000-$C2AF: 数据区 (跳转表, 事件脚本指针)
# - $C2B0-$FFBF: 脚本数据
# - $FFC0-$FFFF: RESET 代码 + 向量
hex_dump(bank7, 0, 64, 0xC000, "Bank 7 start ($C000)")
hex_dump(bank7, 0x40, 64, 0xC040, "Bank 7 + $40")

# 4. 查找标题画面相关的数据
# Bank 1 的 $D0F3 指针表指向标题数据
print("\n" + "=" * 60)
print("BANK 1: Title Data Pointer Table ($D0F3)")
print("=" * 60)
# $D0F3 在 Bank 1 ROM offset = $10F3 (因为Bank 1从0x4000开始, CPU $8000-$BFFF)
# 所以 CPU $C000 = ROM 0x8000? 不...
# Bank 1 maps to CPU $8000-$BFFF, so CPU $D0F3 → Bank 1 offset $10F3 → ROM offset $5013
# (0x4000 bank base + 0x10F3 = 0x50F3? No...)
# Bank 1 = ROM offset 0x4000 for CPU $8000-$BFFF
# CPU $D0F3 is outside this range!
# Actually $D0F3 is in Bank 7 fixed area ($C000-$FFFF)
# Bank 7 = ROM offset 0x1C000
# CPU $D0F3 => Bank 7 offset $10F3 => ROM offset 0x1C000 + 0x10F3 = 0x1D0F3? 
# No, Bank 7 starts at CPU $C000. So CPU $D0F3 = Bank 7 ROM offset ($D0F3 - $C000) = $10F3
# ROM offset = 0x1C000 + 0x10F3 = 0x1D0F3? No...
# PRG starts at ROM offset 0x0010. Bank 7 = bank index 7 = ROM offset 0x10 + 7*0x4000 = 0x1C010
# CPU $D0F3 → Bank 7 offset = $D0F3 - $C000 = $10F3
# ROM offset = 0x1C010 + $10F3 = 0x1D103

# Wait, let me re-check. The NES file:
# 16 bytes header, then PRG-ROM data
# Bank 0 = ROM 0x10 to 0x400F
# Bank 1 = ROM 0x4010 to 0x800F
# ...
# Bank 7 = ROM 0x1C010 to 0x2000F

bank7_offset_in_rom = 0x10 + 7 * 0x4000  # 0x1C010

# CPU $C000 = first byte of Bank 7
# CPU $D0F3 = Bank 7 + $10F3
rom_offset_d0f3 = bank7_offset_in_rom + 0x10F3

with open(NES, 'rb') as f:
    f.seek(rom_offset_d0f3)
    ptr_data = f.read(64)

print(f"ROM offset for $D0F3: 0x{rom_offset_d0f3:X}")
hex_dump(ptr_data, 0, 64, 0xD0F3, "Pointer table at $D0F3 (Bank 7)")

# 5. 查看 Bank 1 数据格式
# 标题 nametable 数据可能在 Bank 1 或 Bank 7 中
# 查找 RLE 压缩的特征标记
print("\n" + "=" * 60)
print("Looking for RLE nametable data in Bank 7...")
print("=" * 60)

# RLE 格式: bytes with high bit set (>= 0x80) followed by repetition value
# 或连续的直接 tile 数据 (< 0x80)
# 在 Bank 7 中查找可能的 RLE 数据起始位置

# 查找特征: 连续几个字节都在 0x80-0x9F 范围 (RLE count = 0-31)
# 并且跟随的字节在 0x00-0x7F 范围
rle_candidates = []
for i in range(0, len(bank7) - 10):
    # 检查连续3个字节的模式: [>=0x80][<0x80][>=0x80][<0x80]
    if (bank7[i] >= 0x80 and bank7[i] < 0xA0 and
        bank7[i+1] < 0x80 and
        bank7[i+2] >= 0x80 and bank7[i+2] < 0xA0):
        rle_candidates.append(i)

print(f"RLE candidates in Bank 7: {len(rle_candidates)}")
if rle_candidates:
    for offset in rle_candidates[:5]:
        cpu_addr = 0xC000 + offset
        print(f"\n  CPU ${cpu_addr:04X} (Bank7 offset ${offset:04X}):")
        hex_dump(bank7, offset, 32, cpu_addr)

# 在 Bank 1 中也查找
print("\n" + "=" * 60)
print("Looking for RLE nametable data in Bank 1...")
print("=" * 60)
rle_candidates_b1 = []
for i in range(0, len(bank1) - 10):
    if (bank1[i] >= 0x80 and bank1[i] < 0xA0 and
        bank1[i+1] < 0x80 and
        bank1[i+2] >= 0x80 and bank1[i+2] < 0xA0):
        rle_candidates_b1.append(i)

print(f"RLE candidates in Bank 1: {len(rle_candidates_b1)}")
if rle_candidates_b1:
    for offset in rle_candidates_b1[:5]:
        cpu_addr = 0x8000 + offset
        print(f"\n  CPU ${cpu_addr:04X} (Bank1 offset ${offset:04X}):")
        hex_dump(bank1, offset, 32, cpu_addr)

print("\nDone!")

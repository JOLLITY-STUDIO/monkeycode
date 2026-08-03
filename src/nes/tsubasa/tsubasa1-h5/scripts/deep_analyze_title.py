"""深度分析 Bank 7 中标题初始化相关的地址"""
import struct

BANK7 = r'd:\studio\github\monkeycode\src\nes\tsubasa\tsubasa1-h5\_tmp_disasm_out\banks\bank_07_fixed.asm'
NES = r'd:\studio\github\monkeycode\src\nes\tsubasa\tsubasa1-h5\_tmp_disasm_out\Captain Tsubasa (Japan).nes'

def read_nes_bank7():
    """从 NES ROM 读取 Bank 7 数据 (PRG offset 0x1C000, 16KB)"""
    with open(NES, 'rb') as f:
        f.seek(0x1C010)  # PRG data starts at 0x10 (header size) + 0x1C000
        return f.read(16384)

def hex_dump(data, offset, length=32, addr=0):
    """格式化的 hex dump"""
    for i in range(0, length, 16):
        bytes_slice = data[offset+i:offset+i+16]
        hex_str = ' '.join(f'{b:02X}' for b in bytes_slice)
        ascii_str = ''.join(chr(b) if 32 <= b < 127 else '.' for b in bytes_slice)
        print(f'  ${addr+offset+i:04X}: {hex_str}  {ascii_str}')

def find_asm_section(filepath, addr_label, ctx=30):
    """在 ASM 文件中找地址"""
    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
        lines = f.readlines()
    
    search = addr_label  # e.g., 'C05B'
    for i, line in enumerate(lines):
        if search in line and (':' in line or ';' in line):
            start = max(0, i-2)
            end = min(len(lines), i+ctx)
            print(f"\n--- ASM near ${search} (line {i+1}) ---")
            for j in range(start, end):
                print(f"{j+1:5d}: {lines[j].rstrip()}")
            return
    print(f"NOT FOUND: ${search}")

# 1. 查找 Bank 7 的关键地址
print("=== Bank 7 ASM Analysis ===\n")

for addr in ['C05B', 'C070', 'C0A7', 'C0BE', 'C0ED', 'C106', 'C181', 'C213']:
    find_asm_section(BANK7, addr, 8)

# 2. 读取 Bank 7 原始数据
print("\n\n=== Bank 7 ROM Data (offset 0x1C000 in NES) ===\n")
bank7 = read_nes_bank7()

# C05B = offset 0x005B in Bank 7
print(f"Bank 7 size: {len(bank7)} bytes")
print(f"\nData at $C05B (offset 0x005B in Bank 7):")
hex_dump(bank7, 0x005B, 64, 0xC000)

print(f"\nData at $C070 (offset 0x0070 in Bank 7):")
hex_dump(bank7, 0x0070, 64, 0xC000)

print(f"\nData at $C0A7 (offset 0x00A7 in Bank 7):")
hex_dump(bank7, 0x00A7, 64, 0xC000)

# 3. 查找 Bank 1 的数据指针表 $D0F3
print("\n\n=== Bank 1 Data Analysis ===\n")
BANK1_ASM = r'd:\studio\github\monkeycode\src\nes\tsubasa\tsubasa1-h5\_tmp_disasm_out\banks\bank_01_code.asm'
find_asm_section(BANK1_ASM, 'D0F3', 40)

# Bank 1 ROM data at offset 0x4000
with open(NES, 'rb') as f:
    f.seek(0x4010)  # header + 0x4000
    bank1 = f.read(16384)

print(f"\nData at $D0F3 (offset 0x10F3 in Bank 1):")
hex_dump(bank1, 0x10F3, 64, 0xD000)

# 4. 查找 Bank 0 的状态跳转表 $81FD
print("\n\n=== Bank 0 State Jump Table ===\n")
BANK0_ASM = r'd:\studio\github\monkeycode\src\nes\tsubasa\tsubasa1-h5\_tmp_disasm_out\banks\bank_00_code.asm'
find_asm_section(BANK0_ASM, '81FD', 60)

# 5. 读取 Bank 0 $82A1 和 $82A7 (各状态入口)
for addr in ['82A1', '82A7', '8276', '8264', '826A', '8270']:
    find_asm_section(BANK0_ASM, addr, 8)

print("\nDone!")

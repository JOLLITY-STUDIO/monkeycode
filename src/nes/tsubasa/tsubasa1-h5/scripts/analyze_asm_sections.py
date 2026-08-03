"""分析 ASM 文件关键代码段"""
import sys

BANK1 = r'd:\studio\github\monkeycode\src\nes\tsubasa\tsubasa1-h5\_tmp_disasm_out\banks\bank_01_code.asm'
BANK5 = r'd:\studio\github\monkeycode\src\nes\tsubasa\tsubasa1-h5\_tmp_disasm_out\banks\bank_05_data.asm'
BANK0 = r'd:\studio\github\monkeycode\src\nes\tsubasa\tsubasa1-h5\_tmp_disasm_out\banks\bank_00_code.asm'

def find_section(filepath, start_addr, context_lines=60):
    """找到指定地址附近的代码并打印"""
    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
        lines = f.readlines()
    
    # 匹配模式: ; PC: 0xC05B 或 - D 2 - I - 0x00C05B 01:C05B:
    for i, line in enumerate(lines):
        if f'{start_addr}:' in line or f'0x{start_addr}' in line:
            if any(marker in line for marker in [':', 'PC:', '01:']):
                start = max(0, i - 5)
                end = min(len(lines), i + context_lines)
                print(f"\n{'='*60}")
                print(f"Section near ${start_addr} in {filepath.split('/')[-1]}:")
                print(f"{'='*60}")
                for j in range(start, end):
                    print(f"{j+1:5d}: {lines[j].rstrip()}")
                return
    
    print(f"Address ${start_addr} not found in {filepath}")

def find_jump_table(filepath, label, context_lines=40):
    """查找跳转表"""
    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
        lines = f.readlines()
    
    for i, line in enumerate(lines):
        if label in line:
            start = max(0, i - 2)
            end = min(len(lines), i + context_lines)
            print(f"\n{'='*60}")
            print(f"Jump table '{label}' in {filepath.split('/')[-1]}:")
            print(f"{'='*60}")
            for j in range(start, end):
                print(f"{j+1:5d}: {lines[j].rstrip()}")
            return

# Bank 1: 标题初始化子状态
find_section(BANK1, 'C05B', 40)  # 子状态0: Title Init 1
find_section(BANK1, 'C070', 50)  # 子状态1: Title Init 2
find_section(BANK1, 'C0A7', 30)  # 子状态2: Title Anim

# Bank 1: 跳转表
find_jump_table(BANK1, '804B', 20)

# Bank 1: 寻找 nametable 数据
with open(BANK1, 'r', encoding='utf-8', errors='replace') as f:
    lines = f.readlines()

# 查找标题相关的数据引用
print(f"\n{'='*60}")
print(f"Searching for nametable/title data references in bank_01_code.asm:")
print(f"{'='*60}")
for i, line in enumerate(lines):
    lower = line.lower()
    if any(k in lower for k in ['nametable', 'rle', 'ppu_write', 'vram_data', 'title_data', 'menu_data']):
        print(f"{i+1:5d}: {line.rstrip()}")

# Bank 0: 查找状态跳转表 $84D2
find_section(BANK0, '84D2', 50)  # State dispatch
find_section(BANK0, '81F7', 60)  # Main state dispatcher

# Bank 0: 查找状态表
find_jump_table(BANK0, '81FD', 40)  # State jump table

# Bank 5: 查找 Bank 5 跳转表
find_jump_table(BANK5, 'C000', 30)  # Bank 5 entry
find_jump_table(BANK5, '8000', 20)  # Bank 5 entry address

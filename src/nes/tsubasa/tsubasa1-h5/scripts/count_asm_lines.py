"""Count lines in all ASM bank files."""
import os

base = 'd:/studio/github/monkeycode/src/nes/tsubasa/tsubasa1-h5/_tmp_disasm_out/banks'
banks = [
    'bank_00_code.asm', 'bank_01_code.asm', 'bank_02_nmi.asm',
    'bank_03_data.asm', 'bank_04_code.asm', 'bank_05_data.asm',
    'bank_06_code.asm', 'bank_07_fixed.asm', 'bank_ram.inc'
]

total = 0
for f in banks:
    path = os.path.join(base, f)
    count = sum(1 for _ in open(path, encoding='utf-8', errors='ignore'))
    total += count
    print(f'{f}: {count} lines')

print(f'TOTAL: {total} lines')

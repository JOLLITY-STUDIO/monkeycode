#!/usr/bin/env python3
"""逐字节比对编译出的 NES 和原始 ROM"""
import sys

orig = r'd:\studio\github\monkeycode\src\nes\tsubasa2\docs\roms\Captain Tsubasa II - Super Striker (Japan).nes'
built = r'd:\studio\github\monkeycode\src\nes\tsubasa2\asm\dist\tsubasa2.nes'

with open(orig, 'rb') as f:
    orig_data = f.read()
with open(built, 'rb') as f:
    built_data = f.read()

print(f'原始 ROM: {len(orig_data)} bytes')
print(f'编译 ROM: {len(built_data)} bytes')

if len(orig_data) != len(built_data):
    print(f'长度不一致!')
    sys.exit(1)

# 逐字节比对
diffs = []
for i in range(len(orig_data)):
    if orig_data[i] != built_data[i]:
        diffs.append((i, orig_data[i], built_data[i]))

print(f'差异字节数: {len(diffs)} / {len(orig_data)} ({len(diffs)/len(orig_data)*100:.2f}%)')

if not diffs:
    print('*** 100% 字节级还原! ***')
    sys.exit(0)

# 分类差异: header(0-15), PRG(16-262159), CHR(262160-)
hdr_diffs = [d for d in diffs if d[0] < 16]
prg_diffs = [d for d in diffs if 16 <= d[0] < 16+256*1024]
chr_diffs = [d for d in diffs if d[0] >= 16+256*1024]
print(f'  Header 差异: {len(hdr_diffs)}')
print(f'  PRG 差异: {len(prg_diffs)}')
print(f'  CHR 差异: {len(chr_diffs)}')

# 显示前 20 个 PRG 差异, 按 bank 分组
print('\n前 20 个 PRG 差异:')
for off, ob, nb in prg_diffs[:20]:
    bank = (off - 16) // 8192
    bank_off = (off - 16) % 8192
    if bank < 30:
        cpu = 0x8000 + bank_off
    elif bank == 30:
        cpu = 0xC000 + bank_off
    else:
        cpu = 0xE000 + bank_off
    print(f'  bank{bank:02d} off=${bank_off:04X} cpu=${cpu:04X}: orig=${ob:02X} built=${nb:02X}')

# 按 bank 统计差异
print('\n各 bank 差异统计:')
bank_diffs = {}
for off, ob, nb in prg_diffs:
    bank = (off - 16) // 8192
    if bank not in bank_diffs:
        bank_diffs[bank] = 0
    bank_diffs[bank] += 1
for b in sorted(bank_diffs.keys()):
    print(f'  bank{b:02d}: {bank_diffs[b]} diffs')

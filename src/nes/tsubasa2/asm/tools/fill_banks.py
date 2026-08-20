"""
fill_banks.py - 从原始 ROM 直接提取每个 bank 的 8192 字节, 生成纯 .byte 序列的 bankNN.s

策略: 直接读取原始 NES ROM 的 PRG 区, 1:1 字节复刻.
反汇编 part asm 仅作为可选注释参考 (标记代码/数据), 不作为字节来源.
这样保证 100% 还原 ROM, 不受 CDL 覆盖率影响.

bank0-29: 生成 bankNN/bankNN.s (覆盖 stub)
bank30/31: 跳过 (保留手工 .s 文件, 含真实 reset/nmi/vectors)
"""

import os
import re
import sys
from pathlib import Path

# PRG 布局: 32 banks × 8KB = 256KB
BANK_SIZE = 8192
NUM_BANKS = 32
PRG_SIZE = BANK_SIZE * NUM_BANKS  # 262144
NES_HEADER_SIZE = 16

# bank30/31 保留手工文件, 不覆盖
SKIP_BANKS = {30, 31}

# 原始 ROM 路径
ROM_PATH = r'd:\studio\github\monkeycode\src\nes\tsubasa2\docs\roms\Captain Tsubasa II - Super Striker (Japan).nes'


def read_prg_banks():
    """从原始 NES ROM 读取全部 256KB PRG 数据"""
    with open(ROM_PATH, 'rb') as f:
        f.seek(NES_HEADER_SIZE)
        prg = f.read(PRG_SIZE)
    if len(prg) < PRG_SIZE:
        raise ValueError(f'ROM PRG 区不足 {PRG_SIZE} 字节 (实际 {len(prg)})')
    return prg


def write_bank_s(bank_num, data, dst_dir):
    """生成 bankNN/bankNN.s (纯 .byte 序列, 每行 16 字节)"""
    bank_dir = Path(dst_dir) / f'bank{bank_num:02d}'
    bank_dir.mkdir(parents=True, exist_ok=True)
    out_path = bank_dir / f'bank{bank_num:02d}.s'

    if bank_num == 30:
        cpu_base = 0xC000
    elif bank_num == 31:
        cpu_base = 0xE000
    else:
        cpu_base = 0x8000

    with open(out_path, 'w', encoding='utf-8') as f:
        f.write('; ============================================================\n')
        f.write(f'; bank{bank_num:02d}/bank{bank_num:02d}.s\n')
        f.write(f'; bank {bank_num} - 1:1 字节复刻自原始 ROM (8KB)\n')
        f.write(f'; CPU 地址范围: ${cpu_base:04X}-${cpu_base + 0x1FFF:04X}\n')
        f.write(f'; 来源: docs/roms/Captain Tsubasa II - Super Striker (Japan).nes PRG bank {bank_num}\n')
        f.write(f'; 策略: 纯 .byte 序列, 直接从 ROM 提取, 100%% 还原\n')
        f.write('; ============================================================\n\n')
        f.write(f'.segment "PRG_BANK{bank_num:02d}"\n\n')
        f.write(f'.org ${cpu_base:04X}\n')

        # 每行 16 字节, 用逗号分隔
        for i in range(0, BANK_SIZE, 16):
            chunk = data[i:i + 16]
            hex_vals = ','.join(f'${b:02X}' for b in chunk)
            f.write(f'    .byte {hex_vals}    ; ${cpu_base + i:04X}\n')

    return out_path


def main():
    print('=== Tsubasa2 bank 填充工具 (1:1 ROM 字节复刻) ===')
    asm_root = r'd:\studio\github\monkeycode\src\nes\tsubasa2\asm'

    # 可指定 bank 列表, 默认 bank0-29
    if len(sys.argv) > 1:
        banks = []
        for arg in sys.argv[1:]:
            if arg.isdigit():
                banks.append(int(arg))
    else:
        banks = [n for n in range(NUM_BANKS) if n not in SKIP_BANKS]

    prg = read_prg_banks()
    generated = []

    for n in banks:
        bank_off = n * BANK_SIZE
        data = prg[bank_off:bank_off + BANK_SIZE]
        out_path = write_bank_s(n, data, asm_root)
        print(f'  bank{n:02d}: {BANK_SIZE}/{BANK_SIZE} 字节 (100%) -> {out_path.name}')
        generated.append(n)

    print(f'\n生成 {len(generated)} 个 bank 文件 (全部 100% 填充)')


if __name__ == '__main__':
    main()


if __name__ == '__main__':
    main()

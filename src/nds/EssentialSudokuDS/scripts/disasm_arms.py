"""Capstone disassembly of ARM9 + ARM7 entry points.

For Essential Sudoku DS, ARM9 binary starts at ROM file offset 0x4000 (entry point),
ARM7 at 0x200000. These map to RAM at 0x02000800 and 0x02380000 respectively per NTR header.

This script disassembles the first N instructions from each entry.
"""
import os
import sys
import io
from contextlib import redirect_stdout

ROM_DIR = r'D:\studio\github\monkeycode\src\nds\EssentialSudokuDS\rom-data'
ARM9_BIN = os.path.join(ROM_DIR, 'arm9.bin')
ARM7_BIN = os.path.join(ROM_DIR, 'arm7.bin')
DISASM_TXT = os.path.join(ROM_DIR, 'disasm.txt')

ARM9_ENTRY_FILE_OFF = 0  # entry at the start of arm9.bin (file offset 0x8000 in ROM)
ARM9_ENTRY_DST = 0x02008000  # RAM = 0x02000000 + 0x8000
ARM7_ENTRY_FILE_OFF = 0
ARM7_ENTRY_DST = 0x02380000
N_INSTRUCTIONS = 100
N_BYTES = 1024

try:
    from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM, CS_MODE_THUMB
except ImportError:
    print('capstone not available', file=sys.stderr)
    sys.exit(1)


def disasm_entry(path, file_off, dst_addr, mode, mode_name, buf, n=N_INSTRUCTIONS):
    print(f'\n=== {os.path.basename(path)} from file_off 0x{file_off:x} dst {dst_addr:#010x} ({mode_name}) ===', file=buf)
    with open(path, 'rb') as f:
        f.seek(file_off)
        data = f.read(N_BYTES)
    cs = Cs(CS_ARCH_ARM, mode)
    cs.detail = False
    count = 0
    for ins in cs.disasm(data, dst_addr):
        print(f'  {ins.address:08x}: {ins.bytes.hex():16}  {ins.mnemonic:8s} {ins.op_str}', file=buf)
        count += 1
        if count >= n:
            break
    if count == 0:
        print(f'  (no valid {mode_name} instructions decoded — may be data here)', file=buf)


def main():
    with open(DISASM_TXT, 'w') as buf:
        print('== Capstone Disassembly of Essential Sudoku DS ARM9/ARM7 ==', file=buf)
        print(f'ARM9 entry dst  = 0x02008000 (per cart layout, file offset 0x8000 in ROM)', file=buf)
        print(f'ARM7 entry dst  = 0x02380000 (src 0x100400, ROM offset 0x200000 in this file)', file=buf)

        disasm_entry(ARM9_BIN, ARM9_ENTRY_FILE_OFF, ARM9_ENTRY_DST, CS_MODE_ARM, 'ARM', buf)
        disasm_entry(ARM9_BIN, ARM9_ENTRY_FILE_OFF, ARM9_ENTRY_DST + 1, CS_MODE_THUMB, 'Thumb', buf)
        disasm_entry(ARM7_BIN, ARM7_ENTRY_FILE_OFF, ARM7_ENTRY_DST, CS_MODE_ARM, 'ARM', buf)
        disasm_entry(ARM7_BIN, ARM7_ENTRY_FILE_OFF, ARM7_ENTRY_DST + 1, CS_MODE_THUMB, 'Thumb', buf)
    print('Wrote', DISASM_TXT)


if __name__ == '__main__':
    main()

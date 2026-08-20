"""
split_bank.py - 按 gap 边界把 bankNN 的 8KB 拆分为带编号的子文件

策略:
  1. 读取原始 ROM 的 bank 字节 (8192B)
  2. 读取反汇编 _disasm.s, 提取每条反汇编记录的 (cpu_addr, is_code, is_data, bytes, mnemonic)
  3. 按 "连续代码块" 和 "连续数据/gap 块" 分段:
     - 代码块: 连续的 is_code 行 (CDL 标记 C)
     - 数据块: 连续的 .byte (gap) 或 is_data 行
     - 未覆盖区: 反汇编未到达的 $FF 填充区 (按数据块处理)
  4. 每段生成一个子文件 bankNN/bankNN_NN.s (带编号)
     - 代码段: 转写为可读助记符 (从反汇编提取), 保留 .org 定位
     - 数据段: 纯 .byte 序列
  5. 生成 bankNN/bankNN.s 作为 .include 聚合入口

转写规则 (代码段):
  - 保留反汇编的助记符 + 操作数, 但把 $XXXX 绝对地址引用替换为标号 (可选, 先保留原样)
  - ram_NNNN 零页/绝对地址保留 (需在 ram_map.inc 定义, 或用 $NN 形式)
  - 分支目标 $XXXX 保留 (汇编器按 rel 模式计算偏移)
  - 每个子文件: .segment + .org + 标号 FUNC_$ADDR: + 代码

用法:
  python asm/tools/split_bank.py 31
  python asm/tools/split_bank.py 30 31
"""

import os
import re
import sys
from pathlib import Path

NES_HEADER_SIZE = 16
BANK_SIZE = 8192
ROM_PATH = r'd:\studio\github\monkeycode\src\nes\tsubasa2\docs\roms\Captain Tsubasa II - Super Striker (Japan).nes'
ASM_ROOT = r'd:\studio\github\monkeycode\src\nes\tsubasa2\asm'

# 反汇编行正则: 提取 cpu_addr, bytes, mnemonic, cdl 标志
DISASM_RE = re.compile(
    r'^([CD\- ]+?)\s+0x([0-9A-Fa-f]+)\s+([0-9A-Fa-f]+):([0-9A-Fa-f]{4}):\s+([0-9A-Fa-f ]+?)\s{2,}(.*)$'
)


def read_bank_bytes(bank_num):
    with open(ROM_PATH, 'rb') as f:
        f.seek(NES_HEADER_SIZE + bank_num * BANK_SIZE)
        return bytearray(f.read(BANK_SIZE))


def parse_disasm(bank_num, asm_root):
    """解析原始反汇编 part 文件, 返回 [(cpu_addr, is_code, is_data, bytes_list, mnemonic, operand)] 按 cpu_addr 排序"""
    bank_name = f'bank_{bank_num:02d}'
    src_dir = r'd:\studio\github\monkeycode\src\nes\tsubasa2\_tmp_bzk_out'
    src_bank_dir = Path(src_dir) / bank_name
    if not src_bank_dir.exists():
        return []
    part_files = sorted(src_bank_dir.glob(f'{bank_name}_part*.asm'))
    if not part_files:
        return []
    entries = []
    for pf in part_files:
        with open(pf, 'r', encoding='utf-8') as f:
            for line in f:
                m = DISASM_RE.match(line.rstrip())
                if not m:
                    continue
                cdl = m.group(1)
                cpu_addr = int(m.group(4), 16)
                bytes_str = m.group(5).strip()
                operand_str = m.group(6).strip()
                try:
                    bytes_list = [int(b, 16) for b in bytes_str.split()]
                except ValueError:
                    continue
                is_code = 'C' in cdl
                is_data = 'D' in cdl
                parts = operand_str.split(None, 1)
                mnemonic = parts[0] if parts else ''
                operand = parts[1].strip() if len(parts) > 1 else ''
                entries.append((cpu_addr, is_code, is_data, bytes_list, mnemonic, operand))
    entries.sort(key=lambda e: e[0])
    return entries


def split_into_segments(bank_num, entries, bank_data, cpu_base):
    """把 bank 按 gap/代码/数据分成连续段. 返回 [(cpu_addr, end_addr, kind)] kind in {'code','data'}"""
    if not entries:
        # 无反汇编, 整个 bank 是数据
        return [(cpu_base, cpu_base + BANK_SIZE, 'data')]

    # 标记每个字节是 code/data/uncovered
    byte_kind = ['uncovered'] * BANK_SIZE  # uncovered = 反汇编未到达
    for cpu_addr, is_code, is_data, bytes_list, mn, op in entries:
        off = cpu_addr - cpu_base
        for i in range(len(bytes_list)):
            if 0 <= off + i < BANK_SIZE:
                if is_code:
                    byte_kind[off + i] = 'code'
                else:
                    byte_kind[off + i] = 'data'  # D 标记或无标志但反汇编有, 当数据

    # 扫描连续相同 effective kind 的段 (uncovered 归入 data)
    segments = []
    seg_start = 0
    seg_kind = byte_kind[0] if byte_kind[0] != 'uncovered' else 'data'
    for i in range(1, BANK_SIZE):
        eff_k = byte_kind[i] if byte_kind[i] != 'uncovered' else 'data'
        if eff_k != seg_kind:
            segments.append((cpu_base + seg_start, cpu_base + i, seg_kind))
            seg_start = i
            seg_kind = eff_k
    segments.append((cpu_base + seg_start, cpu_base + BANK_SIZE, seg_kind))
    return segments


def write_code_subfile(bank_num, idx, cpu_addr, end_addr, entries_subset, cpu_base, out_dir):
    """写代码段子文件: 可读助记符"""
    fname = f'bank{bank_num:02d}_{idx:02d}.s'
    fpath = out_dir / fname
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(f'; ============================================================\n')
        f.write(f'; {fname}\n')
        f.write(f'; bank {bank_num} 代码段 ${cpu_addr:04X}-${end_addr-1:04X} ({end_addr-cpu_addr}B)\n')
        f.write(f'; 转写自反汇编 (可读助记符)\n')
        f.write(f'; ============================================================\n\n')
        f.write(f'.segment "PRG_BANK{bank_num:02d}"\n')
        f.write(f'.org ${cpu_addr:04X}\n\n')
        # 函数入口标号
        f.write(f'FUNC_{cpu_addr:04X}:\n')
        for e_addr, is_code, is_data, bytes_list, mn, op in entries_subset:
            if e_addr < cpu_addr or e_addr >= end_addr:
                continue
            if is_code and mn:
                op_str = f'{mn} {op}'.strip()
                f.write(f'    {op_str:<24} ; ${e_addr:04X}\n')
            else:
                hex_str = ','.join(f'${b:02X}' for b in bytes_list)
                f.write(f'    .byte {hex_str:<18} ; ${e_addr:04X}\n')
    return fname


def write_data_subfile(bank_num, idx, cpu_addr, end_addr, bank_data, cpu_base, out_dir):
    """写数据段子文件: 纯 .byte"""
    fname = f'bank{bank_num:02d}_{idx:02d}.s'
    fpath = out_dir / fname
    start_off = cpu_addr - cpu_base
    end_off = end_addr - cpu_base
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(f'; ============================================================\n')
        f.write(f'; {fname}\n')
        f.write(f'; bank {bank_num} 数据段 ${cpu_addr:04X}-${end_addr-1:04X} ({end_addr-cpu_addr}B)\n')
        f.write(f'; 纯字节 (反汇编未覆盖或 CDL 标记为数据)\n')
        f.write(f'; ============================================================\n\n')
        f.write(f'.segment "PRG_BANK{bank_num:02d}"\n')
        f.write(f'.org ${cpu_addr:04X}\n')
        for i in range(start_off, end_off, 16):
            chunk = bank_data[i:min(i+16, end_off)]
            hex_vals = ','.join(f'${b:02X}' for b in chunk)
            f.write(f'    .byte {hex_vals}    ; ${cpu_base + i:04X}\n')
    return fname


def split_bank(bank_num):
    print(f'=== 拆分 bank{bank_num:02d} ===')
    bank_data = read_bank_bytes(bank_num)
    if bank_num == 30:
        cpu_base = 0xC000
    elif bank_num == 31:
        cpu_base = 0xE000
    else:
        cpu_base = 0x8000

    entries = parse_disasm(bank_num, ASM_ROOT)
    print(f'  反汇编记录: {len(entries)} 条')

    segments = split_into_segments(bank_num, entries, bank_data, cpu_base)
    out_dir = Path(ASM_ROOT) / f'bank{bank_num:02d}'

    # 先备份并删除旧的 bankNN.s (纯字节聚合)
    old_main = out_dir / f'bank{bank_num:02d}.s'

    subfiles = []
    idx = 1
    # 按段写子文件
    for seg_start, seg_end, kind in segments:
        if seg_end <= seg_start:
            continue
        # 收集该段内的反汇编条目 (代码段用)
        subset = [e for e in entries if seg_start <= e[0] < seg_end]
        if kind == 'code' and subset:
            fname = write_code_subfile(bank_num, idx, seg_start, seg_end, subset, cpu_base, out_dir)
            print(f'  [{idx:02d}] CODE ${seg_start:04X}-${seg_end-1:04X} ({seg_end-seg_start}B) -> {fname}')
        else:
            fname = write_data_subfile(bank_num, idx, seg_start, seg_end, bank_data, cpu_base, out_dir)
            print(f'  [{idx:02d}] DATA ${seg_start:04X}-${seg_end-1:04X} ({seg_end-seg_start}B) -> {fname}')
        subfiles.append(fname)
        idx += 1

    # 生成聚合入口 bankNN.s (.include 所有子文件)
    main_name = f'bank{bank_num:02d}.s'
    main_path = out_dir / main_name
    with open(main_path, 'w', encoding='utf-8') as f:
        f.write(f'; ============================================================\n')
        f.write(f'; {main_name}\n')
        f.write(f'; bank {bank_num} 聚合入口 - .include 按段拆分的子文件\n')
        f.write(f'; CPU 地址范围: ${cpu_base:04X}-${cpu_base+BANK_SIZE-1:04X}\n')
        f.write(f'; 子文件: {len(subfiles)} 个 (按 gap/代码/数据边界拆分)\n')
        f.write(f'; ============================================================\n\n')
        f.write(f'.segment "PRG_BANK{bank_num:02d}"\n\n')
        for sf in subfiles:
            f.write(f'.include "{sf}"\n')
    print(f'  聚合入口: {main_name} ({len(subfiles)} 个 .include)')
    return subfiles


def main():
    if len(sys.argv) > 1:
        banks = [int(a) for a in sys.argv[1:] if a.isdigit()]
    else:
        banks = [31]
    for n in banks:
        split_bank(n)


if __name__ == '__main__':
    main()

"""
convert_disasm.py - 反汇编转换工具 v2
将 _tmp_bzk_out/bank_NN/bank_NN_partMM.asm 转换为 asm/bankNN/bankNN.s 可编译源码

输出真实 6502 汇编指令 (LDA/STA/JSR/BNE...), 数据段保持 .byte
build_nes.py 可直接编译产出 .nes 文件

反汇编源格式 (whipon/tsnes):
  C - - - - - 0x03E009 0F:E00B: 90 02     BCC $E00F      ← 代码
  - - - - - - 0x03E010 0F:E000: FF        .byte $FF       ← 数据

输出格式 (我们的 .s):
  .segment "PRG_BANK31"
  .org $E000
  LDA #$00              ; $E000
  STA $2003             ; $E003
  .byte $FF             ; $E010 (data)

特性:
  - 跳过 CDL 标志解析
  - 代码区输出助记符 + 操作数 (保留 $XXXX 绝对地址)
  - 数据区输出 .byte
  - build_nes.py 自动计算分支偏移
  - 按地址排序, 填充空隙为 .byte $FF
"""

import os
import re
import sys
from pathlib import Path

# 解析一行反汇编
# 格式: [CDL] [file_off] [bank:cpu_addr]: [hex bytes] [mnemonic operand]
LINE_RE = re.compile(
    r'^([CD\- ]+?)\s+0x([0-9A-Fa-f]+)\s+([0-9A-Fa-f]+):([0-9A-Fa-f]{4}):\s+([0-9A-Fa-f ]+?)\s{2,}(.*)$'
)

# 数据行 (无 mnemonic, 只有 .byte $XX)
DATA_LINE_RE = re.compile(
    r'^([CD\- ]+?)\s+0x([0-9A-Fa-f]+)\s+([0-9A-Fa-f]+):([0-9A-Fa-f]{4}):\s+([0-9A-Fa-f ]+?)\s{2,}\.byte\s+(.*)$'
)


def parse_line(line):
    """返回 dict 或 None"""
    line = line.rstrip()
    if not line.strip():
        return None
    # 先尝试数据行
    m = DATA_LINE_RE.match(line)
    if m:
        cdl = m.group(1)
        cpu = int(m.group(4), 16)
        bytes_str = m.group(5).strip()
        operand = m.group(6).strip()
        bytes_list = [int(b, 16) for b in bytes_str.split()]
        return {
            'is_code': 'C' in cdl,
            'is_data': 'D' in cdl or '-' in cdl,
            'cpu_addr': cpu,
            'bytes': bytes_list,
            'mnemonic': '.byte',
            'operand': operand,
            'raw': line,
        }
    # 代码行
    m = LINE_RE.match(line)
    if not m:
        return None
    cdl = m.group(1)
    cpu = int(m.group(4), 16)
    bytes_str = m.group(5).strip()
    operand_str = m.group(6).strip()
    bytes_list = [int(b, 16) for b in bytes_str.split()]
    is_code = 'C' in cdl
    # 解析 mnemonic + operand
    parts = operand_str.split(None, 1)
    mn = parts[0] if parts else ''
    op = parts[1].strip() if len(parts) > 1 else ''
    # 去掉注释部分 (有些行 mnemonic 后有 ; 注释)
    return {
        'is_code': is_code,
        'is_data': not is_code,
        'cpu_addr': cpu,
        'bytes': bytes_list,
        'mnemonic': mn,
        'operand': op,
        'raw': line,
    }


def convert_bank(bank_num, src_dir, asm_root):
    """转换一个 bank → asm/bankNN/bankNN.s (可编译)"""
    bank_name = f'bank_{bank_num:02d}'
    src_bank_dir = Path(src_dir) / bank_name
    if not src_bank_dir.exists():
        return 0, f"跳过: {src_bank_dir} 不存在"

    part_files = sorted(src_bank_dir.glob(f'{bank_name}_part*.asm'))
    if not part_files:
        return 0, f"跳过: {src_bank_dir} 无 _part*.asm"

    # 解析所有行, 按 CPU 地址排序
    entries = []
    for pf in part_files:
        with open(pf, 'r', encoding='utf-8') as f:
            for line in f:
                e = parse_line(line)
                if e:
                    entries.append(e)
    entries.sort(key=lambda x: x['cpu_addr'])
    if not entries:
        return 0, "WARN: 无可解析行"

    # bank CPU 基址
    if bank_num == 30:
        cpu_base = 0xC000
    elif bank_num == 31:
        cpu_base = 0xE000
    else:
        cpu_base = 0x8000
    seg_name = f'PRG_BANK{bank_num:02d}'

    # 读取原始 ROM 字节 (用于填充反汇编未覆盖的空隙)
    rom_bytes_path = Path(asm_root) / f'bank{bank_num:02d}' / 'rom_bytes.bin'
    rom_bytes = None
    if rom_bytes_path.exists():
        with open(rom_bytes_path, 'rb') as f:
            rom_bytes = f.read()
        if len(rom_bytes) != 8192:
            rom_bytes = None

    # 输出路径: bankNN/bankNN.s (覆盖 stub)
    dst_dir = Path(asm_root) / f'bank{bank_num:02d}'
    dst_dir.mkdir(parents=True, exist_ok=True)
    out_path = dst_dir / f'bank{bank_num:02d}.s'

    with open(out_path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(f'; ============================================================\n')
        f.write(f'; bank{bank_num:02d}/bank{bank_num:02d}.s\n')
        f.write(f'; bank {bank_num} - 真实 6502 汇编 (8KB)\n')
        f.write(f'; CPU 地址范围: ${cpu_base:04X}-${cpu_base+0x1FFF:04X}\n')
        f.write(f'; 源: _tmp_bzk_out/{bank_name}/{bank_name}_partMM.asm\n')
        f.write(f'; 代码=助记符, 数据=.byte, build_nes.py 可直接编译\n')
        f.write(f'; ============================================================\n\n')
        f.write(f'.segment "{seg_name}"\n')
        f.write(f'.org ${cpu_base:04X}\n\n')

        cur_addr = cpu_base
        code_count = 0
        data_count = 0
        # 用于合并连续 .byte 行 (避免太多行)
        pending_bytes = []

        def flush_bytes():
            nonlocal pending_bytes
            if not pending_bytes:
                return
            # 每行最多 16 字节
            for i in range(0, len(pending_bytes), 16):
                chunk = pending_bytes[i:i+16]
                hex_str = ','.join(f'${b:02X}' for b in chunk)
                f.write(f'    .byte {hex_str}\n')
            pending_bytes = []

        for e in entries:
            # 填充空隙 (用原始 ROM 字节, 不是 $FF)
            while cur_addr < e['cpu_addr']:
                off = cur_addr - cpu_base
                if rom_bytes and 0 <= off < len(rom_bytes):
                    pending_bytes.append(rom_bytes[off])
                else:
                    pending_bytes.append(0xFF)
                cur_addr += 1
                if len(pending_bytes) >= 64:
                    flush_bytes()

            if e['is_code'] and e['mnemonic'] and e['mnemonic'] != '.byte':
                # UNDEFINED mnemonic → 作为数据
                if e['mnemonic'].upper() in ('UNDEFINED', 'UNKNOWN', '???'):
                    pending_bytes.extend(e['bytes'])
                    data_count += len(e['bytes'])
                    cur_addr = e['cpu_addr'] + len(e['bytes'])
                    continue
                flush_bytes()
                # 输出指令
                # 把 ram_XXXX 符号替换为 $XXXX (避免依赖 ram_map.inc 不全)
                op_str = e['operand']
                if op_str:
                    # ram_XXXX → $XXXX
                    op_str = re.sub(r'ram_([0-9A-Fa-f]{4})\b', r'$\1', op_str)
                    # 保留 a: 前缀 (强制 absolute), 去掉 d:/b: 等
                    op_str = re.sub(r'\b[bBdD]:\s*', '', op_str)
                    line_out = f'    {e["mnemonic"]} {op_str}'
                else:
                    line_out = f'    {e["mnemonic"]}'
                f.write(f'{line_out:<30} ; ${e["cpu_addr"]:04X}\n')
                code_count += 1
            else:
                # 数据: 累积
                pending_bytes.extend(e['bytes'])
                data_count += len(e['bytes'])
            cur_addr = e['cpu_addr'] + len(e['bytes'])

        flush_bytes()
        # 填充到 8KB (用原始 ROM 字节)
        while cur_addr < cpu_base + 0x2000:
            off = cur_addr - cpu_base
            if rom_bytes and 0 <= off < len(rom_bytes):
                pending_bytes.append(rom_bytes[off])
            else:
                pending_bytes.append(0xFF)
            cur_addr += 1
            if len(pending_bytes) >= 64:
                flush_bytes()
        flush_bytes()

    return len(entries), f"bank{bank_num:02d}: code={code_count}, data_bytes={data_count}, total={len(entries)}"


def main():
    print("=== convert_disasm.py v2 - 真实 6502 ASM 转换 ===")
    src_dir = r'd:\studio\github\monkeycode\src\nes\tsubasa2\_tmp_bzk_out'
    asm_root = r'd:\studio\github\monkeycode\src\nes\tsubasa2\asm'

    if len(sys.argv) > 1:
        banks = []
        for arg in sys.argv[1:]:
            m = re.match(r'bank_(\d+)', arg)
            if m:
                banks.append(int(m.group(1)))
            elif arg.isdigit():
                banks.append(int(arg))
            else:
                print(f"忽略参数: {arg}")
    else:
        banks = list(range(32))

    total = 0
    for n in banks:
        cnt, msg = convert_bank(n, src_dir, asm_root)
        total += cnt
        print(f"  {msg}")
    print(f"\n转换完成: {total} 条记录 → bankNN/bankNN.s")


if __name__ == '__main__':
    main()

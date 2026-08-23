"""convert_bank.py - 按 N 行切 bank 为子文件 (保证不丢内容)

用法: python tools/convert_bank.py <bank_num> [lines_per_file=400]

输入: asm/bankNN/_full.s
输出: asm/bankNN/
    bankNN.s        - 顶层 (.include 合并)
    bankNN_p01.s    - 第 1 段 (400 行)
    bankNN_p02.s    - 第 2 段
    ...
"""
import os, re, sys
from pathlib import Path


def convert(bank_num, asm_root, lines_per=400):
    bank_dir = Path(asm_root) / f'bank{bank_num:02d}'
    full_path = bank_dir / '_full.s'
    if not full_path.exists():
        print(f'  skip: {full_path} not found')
        return
    with open(full_path, encoding='utf-8', errors='replace') as f:
        all_lines = f.readlines()
    # 找 segment 和 org
    segment = None
    org_addr = None
    content_start = 0
    for i, line in enumerate(all_lines):
        t = line.strip()
        m = re.match(r'\.segment\s+"?([\w]+)"?', t, re.I)
        if m: segment = m.group(1)
        m = re.match(r'\.org\s+(.+)', t, re.I)
        if m: org_addr = m.group(1).strip()
        if t.startswith('.') and org_addr and segment:
            content_start = i + 1
            break
    # 内容行 = content_start 之后的所有行 (不含空行/注释? 保留所有)
    content = all_lines[content_start:]
    # 切分
    parts = []
    idx = 0
    while idx < len(content):
        chunk = content[idx:idx+lines_per]
        parts.append(chunk)
        idx += lines_per
    print(f'  bank{bank_num:02d}: segment={segment}, org={org_addr}, content={len(content)} lines, parts={len(parts)}')
    # 写子文件
    sub_names = []
    for i, chunk in enumerate(parts):
        fname = f'bank{bank_num:02d}_p{i+1:02d}.s'
        fpath = bank_dir / fname
        with open(fpath, 'w', encoding='utf-8', newline='\n') as f:
            for line in chunk:
                f.write(line.rstrip() + '\n')
        sub_names.append(fname)
    # 顶层
    top = bank_dir / f'bank{bank_num:02d}.s'
    with open(top, 'w', encoding='utf-8', newline='\n') as f:
        f.write(f'; ============================================================\n')
        f.write(f'; bank{bank_num:02d}/bank{bank_num:02d}.s - bank {bank_num}\n')
        f.write(f'; Split into {len(parts)} parts ({lines_per} lines each).\n')
        f.write(f'; ============================================================\n\n')
        f.write(f'.segment "{segment}"\n')
        f.write(f'.org {org_addr}\n\n')
        for name in sub_names:
            f.write(f'.include "{name}"\n')


if __name__ == '__main__':
    bn = int(sys.argv[1])
    asm_root = r'd:\studio\github\monkeycode\src\nes\tsubasa2\asm'
    convert(bn, asm_root)

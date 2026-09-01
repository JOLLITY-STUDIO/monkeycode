#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""V0.17 — 反汇编候选函数 (capstone 精确解码).

用途: 给 curated naming batch 提供真实指令序列. 从 function-table.json 取
callers>=N 且仍为 sub_ 的函数, 用 capstone 反汇编 arm9.bin/arm7.bin 的
函数入口前 LINES 条指令, 输出便于人工判断语义的文本.

用法:
  python scripts/extract_fn_disasm.py [--min-callers 3] [--lines 14] [--max 25]

输出: 终端打印; 建议配合重定向 (PS: ... 2>&1 | Out-File -Encoding utf8)
"""
import argparse
import json
import os
import re
import sys

from capstone import CS_ARCH_ARM, CS_MODE_ARM, Cs

ROM_DIR = r'D:\studio\github\monkeycode\src\nds\EssentialSudokuDS\rom-data'
FUNC_TABLE = os.path.join(ROM_DIR, 'function-table.json')
ARM9_BIN = os.path.join(ROM_DIR, 'arm9.bin')
ARM7_BIN = os.path.join(ROM_DIR, 'arm7.bin')
ARM9_LOAD = 0x02008000
ARM7_LOAD = 0x02380000


def load_binary(path):
    if not os.path.exists(path):
        return None
    with open(path, 'rb') as f:
        return f.read()


def disasm_at(binary, load_addr, addr, n):
    """Disassemble n instructions starting at addr. Returns list of insn strings."""
    if binary is None:
        return []
    off = addr - load_addr
    if off < 0 or off + 4 > len(binary):
        return []
    code = binary[off:off + n * 4]
    md = Cs(CS_ARCH_ARM, CS_MODE_ARM)
    md.detail = False
    out = []
    for i in md.disasm(code, addr):
        out.append(f'0x{i.address:08x}  {i.mnemonic} {i.op_str}'.strip())
        if len(out) >= n:
            break
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--min-callers', type=int, default=3)
    ap.add_argument('--lines', type=int, default=14)
    ap.add_argument('--max', type=int, default=25)
    ap.add_argument('--addrs', nargs='*', default=None, help='explicit addr list')
    args = ap.parse_args()

    ft = json.load(open(FUNC_TABLE, encoding='utf-8'))
    funcs = ft['functions']
    arm9 = load_binary(ARM9_BIN)
    arm7 = load_binary(ARM7_BIN)

    # load curated addrs to skip already-named
    curated_addrs = set()
    for fn in os.listdir(ROM_DIR):
        if 'curated' in fn and fn.endswith('.json'):
            try:
                d = json.load(open(os.path.join(ROM_DIR, fn), encoding='utf-8'))
                for e in d.get('names', []):
                    curated_addrs.add(e['addr'])
            except Exception:
                pass

    if args.addrs:
        cands = [f for f in funcs if f['addr'] in args.addrs]
    else:
        cands = [f for f in funcs
                 if (f.get('name') or '').startswith('sub_')
                 and (f.get('callers_n') or 0) >= args.min_callers
                 and f['addr'] not in curated_addrs]
    cands.sort(key=lambda f: -(f.get('callers_n') or 0))

    for f in cands[:args.max]:
        addr = int(f['addr'], 16)
        is_arm9 = f['cpu'] == 'arm9'
        binary = arm9 if is_arm9 else arm7
        load = ARM9_LOAD if is_arm9 else ARM7_LOAD
        print(f'\n=== {f["addr"]} ({f["cpu"]}) callers={f.get("callers_n", 0)} cat={f.get("category", "?")} ===')
        for ln in disasm_at(binary, load, addr, args.lines):
            print('  ' + ln)


if __name__ == '__main__':
    main()

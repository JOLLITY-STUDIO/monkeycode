#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""V0.3 — Capstone full disassembly of Essential Sudoku DS ARM9 + ARM7.

Outputs:
  - rom-data/disasm-arm9-full.txt   (1 MiB walk, ARM + Thumb 两 pass)
  - rom-data/disasm-arm7-full.txt   (256 KiB walk, ARM + Thumb 两 pass)
  - rom-data/mode-switches.json     (BX/BLX targets + LSB mode bit)
  - rom-data/function-calls.json    (BL/BLX targets 全反向 + calgraph)
  - console stats

V0.3 sub-todo (WBS):
  - V0.3.1 main walker (single-pass ARM mode) → arm9-full.txt / arm7-full.txt
  - V0.3.2 BX/BLX switch points collector (LSB-of-target determines mode)
  - V0.3.3 reverse call graph (callee → caller list) for rapid library nomi

Strategy: 1 MiB ARM9 反汇编不是 constant-time-size — capstone skipdata=True,
offset 在不可解析区域时跳 4 byte 步进。实际 MiB ROM 数均 600–900K 反汇编行。
"""
import os
import sys
import json
import struct
from collections import defaultdict

ROM_DIR = r'D:\studio\github\monkeycode\src\nds\EssentialSudokuDS\rom-data'
ARM9_BIN = os.path.join(ROM_DIR, 'arm9.bin')
ARM7_BIN = os.path.join(ROM_DIR, 'arm7.bin')

# 真实 entry addresses (从 cart header 推出)
ARM9_DST = 0x02008000  # file offset 0x0 in arm9.bin
ARM7_DST = 0x02380000  # file offset 0x0 in arm7.bin

# 标准 NDS binary range per ARM9/ARM7 dst
ARM9_SIZE = 0x100000  # 1 MiB
ARM7_SIZE = 0x40000   # 256 KiB

# Outputs
OUT_ARM9_TXT = os.path.join(ROM_DIR, 'disasm-arm9-full.txt')
OUT_ARM7_TXT = os.path.join(ROM_DIR, 'disasm-arm7-full.txt')
OUT_SWITCHES_JSON = os.path.join(ROM_DIR, 'mode-switches.json')
OUT_CALLGRAPH_JSON = os.path.join(ROM_DIR, 'function-calls.json')

try:
    from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM, CS_MODE_THUMB
    from capstone.arm import (
        ARM_INS_BX, ARM_INS_BL, ARM_INS_BLX, ARM_INS_B,
        ARM_INS_LDM, ARM_INS_POP,
    )
except ImportError:
    print('capstone not available', file=sys.stderr)
    sys.exit(1)


def disasm_arm_pass(bin_path: str, dst_base: int, bin_size: int, mode, mode_name: str):
    """Single-pass full ARM/Thumb disassembly. Returns list of dicts with skipdata flag."""
    print(f'  [{mode_name}] reading {bin_path} ({bin_size} bytes)...', file=sys.stderr)
    with open(bin_path, 'rb') as f:
        data = f.read()
    # Trim trailing zeros (capstone may struggle)
    cs = Cs(CS_ARCH_ARM, mode)
    cs.detail = True
    cs.skipdata = True   # skip invalid bytes 4/2-bytes respectively; needed for 1 MiB walk
    out = []
    n_decode = 0
    n_skip = 0
    for ins in cs.disasm(data, dst_base):
        # capstone skipdata mode: mnemonic == '.byte' and op_str is hex literal
        is_skip = (ins.mnemonic == '.byte')
        if is_skip:
            n_skip += 1
        else:
            n_decode += 1
        out.append({
            'addr': ins.address,
            'mode': mode_name,
            'bytes_hex': ins.bytes.hex(),
            'mnemonic': ins.mnemonic,
            'op_str': ins.op_str,
            'size': ins.size,
            'is_skipdata': is_skip,
        })
    print(f'  [{mode_name}] decoded {n_decode} insns (+ {n_skip} skipdata placeholders) from {dst_base:#x}',
          file=sys.stderr)
    return out


def collect_switches(arm_insns: list, thumb_insns: list):
    """Detect BX/BLX targets. LSB of target determines mode (0=ARM, 1=Thumb)."""
    switches = []
    # ARM-mode pass: scan for BLX (imm24) + BX reg
    for ins in arm_insns:
        if ins['mnemonic'] == 'blx':
            # blx imm24 — target already contains mode bit
            # extract from op_str like "#0x200823f" (Thumb) or "#0x2008040" (ARM)
            op = ins['op_str'].strip()
            if op.startswith('#0x') or op.startswith('#'):
                tgt = int(op.replace('#', ''), 16) if 'x' in op else int(op.replace('#', ''), 16)
                tgt = int(op[3:] if op.startswith('#0x') else op[1:], 16)
                tgt_mode = 'thumb' if (tgt & 1) else 'arm'
                switches.append({
                    'addr': ins['addr'],
                    'from_mode': 'arm',
                    'to_mode': tgt_mode,
                    'op': 'blx',
                    'target': tgt & ~1,
                    'lsb': tgt & 1,
                })
        elif ins['mnemonic'] == 'bx':
            switches.append({
                'addr': ins['addr'],
                'from_mode': 'arm',
                'to_mode': 'unknown(rX)',
                'op': 'bx',
                'target': None,  # runtime register, can't resolve statically
                'lsb': None,
                'op_str': ins['op_str'],
            })
    # LDR pc, [...] / POP {..pc..} / LDM {..pc..} → indirect switches
    for ins in arm_insns:
        op = ins['op_str']
        if ins['mnemonic'] in ('ldm', 'pop') and ('pc' in op):
            switches.append({
                'addr': ins['addr'],
                'from_mode': 'arm',
                'to_mode': 'indirect',
                'op': ins['mnemonic'],
                'target': None,
                'lsb': None,
                'op_str': op,
            })
        elif ins['mnemonic'] == 'ldr' and op.endswith(', [pc') or op.startswith('[pc'):
            pass  # skip literal pools
    # Thumb BLX imm — also target LSB
    for ins in thumb_insns:
        if ins['mnemonic'] == 'blx':
            op = ins['op_str'].strip()
            if op.startswith('#0x') or op.startswith('#'):
                try:
                    val = op[3:] if op.startswith('#0x') else op[1:]
                    if val.endswith('f') and not val.startswith('-'):
                        # Likely halfword-displacement → use capstone does for bl imm in Thumb
                        pass
                    tgt = int(val, 16)
                    tgt_mode = 'arm' if (tgt & 1) else 'thumb'  # in BLX imm, LSB==1 means ARM
                    switches.append({
                        'addr': ins['addr'],
                        'from_mode': 'thumb',
                        'to_mode': tgt_mode,
                        'op': 'blx',
                        'target': tgt & ~1,
                        'lsb': tgt & 1,
                    })
                except ValueError:
                    pass
    return switches


def collect_bl_targets(insns: list, valid_ranges):
    """Collect (caller_addr → callee_addr) for bl/blx in pass.
    valid_ranges: list of (lo, hi) addresses that are valid code destinations.
    """
    calls = []
    for ins in insns:
        if ins['mnemonic'] in ('bl', 'blx'):
            op = ins['op_str'].strip()
            if not op:
                continue
            try:
                val = op[3:] if op.startswith('#0x') else op[1:]
                tgt = int(val, 16)
                masked = tgt & ~1
                # Filter to valid address ranges (ARM9 + ARM7 binaries)
                valid = any(lo <= masked < hi for (lo, hi) in valid_ranges)
                if not valid:
                    continue
                calls.append({
                    'caller': ins['addr'],
                    'callee': masked,
                    'op': ins['mnemonic'],
                    'mode': ins['mode'],
                })
            except ValueError:
                pass
    return calls


def build_callgraph(calls: list):
    """Reverse call graph: callee → [caller, ...]."""
    graph = defaultdict(list)
    for c in calls:
        graph[c['callee']].append(c['caller'])
    return {hex(k): list(set(v)) for k, v in graph.items()}


def write_full_disasm_txt(path: str, arm_insns: list, thumb_insns: list, dst_base: int):
    """Write merged disasm: address+mode disambiguator first, then both passes interleaved.

    由于 ARM + Thumb 两 pass 都反同一段, 但解码偏移不同 (Thumb 2 字节对齐),
    简单方法是按 address 排序, 显示 mode; 如果两种 mode 都解出了, 标记 BOTH.
    """
    by_addr_arm = {i['addr']: i for i in arm_insns}
    by_addr_thumb = {i['addr']: i for i in thumb_insns}
    all_addrs = sorted(set(by_addr_arm.keys()) | set(by_addr_thumb.keys()))
    print(f'  writing {path} ({len(all_addrs)} unique addresses)...', file=sys.stderr)
    with open(path, 'w') as g:
        g.write(f'# Full disasm starting from {dst_base:#010x} (mode inferred from arm-pass for ARM, thumb-pass for Thumb)\n')
        g.write('# addr | arm_mode | arm_mnem arm_args | thumb_mode | thumb_mnem thumb_args\n')
        g.write('# Format: ADDR | A:[bytes] MNE OP | T:[bytes] MNE OP\n')
        g.write('#----------------------------------------------------------------\n')
        for addr in all_addrs:
            a = by_addr_arm.get(addr)
            t = by_addr_thumb.get(addr)
            if a and t:
                g.write(f'{addr:08x} | A:[{a["bytes_hex"]:>16}] {a["mnemonic"]:8} {a["op_str"]:32} | T:[{t["bytes_hex"]:>16}] {t["mnemonic"]:8} {t["op_str"]}\n')
            elif a:
                g.write(f'{addr:08x} | A:[{a["bytes_hex"]:>16}] {a["mnemonic"]:8} {a["op_str"]:32} | T:(data, no decode)                                  |\n')
            elif t:
                g.write(f'{addr:08x} | A:(data, no decode)                                                  | T:[{t["bytes_hex"]:>16}] {t["mnemonic"]:8} {t["op_str"]}\n')
    print(f'  done: {path}', file=sys.stderr)


def write_pure_disasm_txt(path: str, insns: list, dst_base: int):
    """Write a single-mode pass (used by V0.3 default ARM mainline trace)."""
    print(f'  writing {path} ({len(insns)} insns)...', file=sys.stderr)
    n_skip = sum(1 for i in insns if i['is_skipdata'])
    n_real = len(insns) - n_skip
    with open(path, 'w') as g:
        g.write(f'# Pure {insns[0]["mode"] if insns else "arm"} disasm starting from {dst_base:#010x}\n')
        g.write(f'# Real decoded insns: {n_real}; skipdata placeholders: {n_skip}\n')
        g.write('# Format: ADDR  [BYTES]  MNE OP   (skipdata lines start with ";")\n')
        g.write('#--------------------------------------------------------------\n')
        for ins in insns:
            if ins['is_skipdata']:
                # skipdata placeholders get ';' prefix so they can be grepped away
                g.write(f'; {ins["addr"]:08x}  +{ins["size"]:>2d}B  data: 0x{ins["bytes_hex"][:8]}... (capstone skipdata)\n')
            else:
                g.write(f'{ins["addr"]:08x}  {ins["bytes_hex"]:>16}  {ins["mnemonic"]:8s} {ins["op_str"]}\n')
    print(f'  done: {path}', file=sys.stderr)


def write_switches_json(path: str, switches: list, dst_base: int, dst_end: int):
    print(f'  writing {path} ({len(switches)} switch points)...', file=sys.stderr)
    payload = {
        'description': 'BX/BLX/LDM/LDRpc mode-switch points detected via capstone disasm',
        'arm_base': f'{dst_base:#010x}',
        'arm_end': f'{dst_end:#010x}',
        'total': len(switches),
        'switches': switches,
    }
    with open(path, 'w') as g:
        json.dump(payload, g, indent=2)
    print(f'  done', file=sys.stderr)


def write_callgraph_json(path: str, calls: list, graph: dict):
    print(f'  writing {path} ({len(calls)} calls, {len(graph)} unique callees)...', file=sys.stderr)
    # Top 128 most-called targets (entry-point candidates)
    by_called_count = sorted(graph.items(), key=lambda kv: len(kv[1]), reverse=True)[:128]
    payload = {
        'description': 'Static BL/BLX call graph (caller_addr → callee_addr), reverse-indexed',
        'total_calls': len(calls),
        'unique_callees': len(graph),
        'top_callees_by_callers': [
            {'callee': c, 'callers_n': len(v), 'callers': v}
            for c, v in by_called_count
        ],
        'all_calls': calls,
    }
    with open(path, 'w') as g:
        json.dump(payload, g, indent=2)
    print(f'  done', file=sys.stderr)


def main():
    print('== V0.3 Full ARM9 + ARM7 Disassembly ==', file=sys.stderr)
    print(f'  ARM9 BIN: {ARM9_BIN} (dst_base={ARM9_DST:#010x})', file=sys.stderr)
    print(f'  ARM7 BIN: {ARM7_BIN} (dst_base={ARM7_DST:#010x})', file=sys.stderr)

    # ARM9: full walk ARM + Thumb
    print('\n[ARM9]', file=sys.stderr)
    arm9_arm = disasm_arm_pass(ARM9_BIN, ARM9_DST, ARM9_SIZE, CS_MODE_ARM, 'arm')
    arm9_thumb = disasm_arm_pass(ARM9_BIN, ARM9_DST, ARM9_SIZE, CS_MODE_THUMB, 'thumb')
    write_pure_disasm_txt(OUT_ARM9_TXT, arm9_arm, ARM9_DST)
    # ARM7
    print('\n[ARM7]', file=sys.stderr)
    arm7_arm = disasm_arm_pass(ARM7_BIN, ARM7_DST, ARM7_SIZE, CS_MODE_ARM, 'arm')
    arm7_thumb = disasm_arm_pass(ARM7_BIN, ARM7_DST, ARM7_SIZE, CS_MODE_THUMB, 'thumb')
    write_pure_disasm_txt(OUT_ARM7_TXT, arm7_arm, ARM7_DST)

    # Switch points
    print('\n[Switch points]', file=sys.stderr)
    switches = []
    switches += collect_switches(arm9_arm, arm9_thumb)
    switches += collect_switches(arm7_arm, arm7_thumb)
    write_switches_json(OUT_SWITCHES_JSON, switches, ARM9_DST, ARM9_DST + ARM9_SIZE)

    # Call graph
    print('\n[Call graph]', file=sys.stderr)
    valid_ranges = [
        (ARM9_DST, ARM9_DST + ARM9_SIZE),  # ARM9 binary 0x02008000..0x02108000
        (ARM7_DST, ARM7_DST + ARM7_SIZE),  # ARM7 binary 0x02380000..0x023C0000
    ]
    calls = []
    calls += collect_bl_targets(arm9_arm, valid_ranges)
    calls += collect_bl_targets(arm7_arm, valid_ranges)
    calls += collect_bl_targets(arm9_thumb, valid_ranges)
    calls += collect_bl_targets(arm7_thumb, valid_ranges)
    graph = build_callgraph(calls)
    write_callgraph_json(OUT_CALLGRAPH_JSON, calls, graph)

    # Print stats
    print('\n== Stats ==', file=sys.stderr)
    print(f'  ARM9 insns:     ARM={len(arm9_arm)}  Thumb={len(arm9_thumb)}', file=sys.stderr)
    print(f'  ARM7 insns:     ARM={len(arm7_arm)}  Thumb={len(arm7_thumb)}', file=sys.stderr)
    print(f'  Switch points:  {len(switches)}', file=sys.stderr)
    print(f'  BL/BLX calls:   {len(calls)}', file=sys.stderr)
    print(f'  Unique callees: {len(graph)}', file=sys.stderr)
    print('Done.', file=sys.stderr)


if __name__ == '__main__':
    main()

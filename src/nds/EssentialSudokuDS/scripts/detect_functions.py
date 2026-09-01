#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""V0.8 — ARM9/ARM7 函数边界自动检测 (prologue + epilogue 双向匹配, push + pop + bx lr + mov pc lr).

Inputs:
  - rom-data/disasm-arm9-full.txt   (V0.3 ARM-mode pass)
  - rom-data/disasm-arm7-full.txt   (V0.3 ARM-mode pass)
  - rom-data/function-calls.json    (V0.3 BL/BLX call graph)
  - rom-data/arm9.bin + arm7.bin    (inline Thumb disasm pass for push/pop/bx/pc-into-thumb detection)

Outputs:
  - rom-data/function-boundaries.json  (per-prologue 列表 + callee 分类)
  - rom-data/function-summary.json     (统计)
  - rom-data/function-table.json       (addr → canonical name + confidence)
  - console stats

V0.8.1 algorithm (扩展):
  1. ARM-mode disasm text → 收集 4 类函数边界标记:
     a. push {... lr}           — ARM prologue
     b. bx lr                   — ARM return (most common)
     c. pop {..., pc}           — ARM epilogue
     d. mov pc, lr              — ARM explicit return (rare)
  2. Thumb-mode inline disasm (全 1MB ARM9 + 256KB ARM7 二进制):
     a. push {... lr}           — Thumb prologue (push 多见)
     b. bx lr                   — Thumb return
     c. pop {..., pc}           — Thumb epilogue (very common)
     d. mov pc, lr              — Thumb explicit return
  3. 每个 unique BL/BLX callee 按以下 priority 分类:
     a. 'real'      → callee 精确等于某个 push site
     b. 'near'      → callee 在 push site ±0x40 范围内
     c. 'epilogue'  → callee 在 bx lr / pop {pc} / mov pc, lr 之一 的 [0..+0x80] 内
     d. 'naked'     → 仍未命中, 标 unknown (待后续 unicorn emulation 解析)

V0.8.1 期望覆盖 >= 95% (target)
"""
import os
import sys
import json
import re
from collections import defaultdict, Counter

ROM_DIR = r'D:\studio\github\monkeycode\src\nds\EssentialSudokuDS\rom-data'
ARM9_DISASM = os.path.join(ROM_DIR, 'disasm-arm9-full.txt')
ARM7_DISASM = os.path.join(ROM_DIR, 'disasm-arm7-full.txt')
ARM9_BIN = os.path.join(ROM_DIR, 'arm9.bin')
ARM7_BIN = os.path.join(ROM_DIR, 'arm7.bin')
CALL_GRAPH_JSON = os.path.join(ROM_DIR, 'function-calls.json')

# Address ranges (must match V0.3 disasm)
ARM9_BASE = 0x02008000
ARM9_END  = 0x02108000  # 1 MiB
ARM7_BASE = 0x02380000
ARM7_END  = 0x023C0000  # 256 KiB
ARM9_SIZE = ARM9_END - ARM9_BASE  # 1 MiB
ARM7_SIZE = ARM7_END - ARM7_BASE  # 256 KiB

OUT_BOUNDARIES_JSON = os.path.join(ROM_DIR, 'function-boundaries.json')
OUT_SUMMARY_JSON = os.path.join(ROM_DIR, 'function-summary.json')
OUT_FUNCTION_TABLE_JSON = os.path.join(ROM_DIR, 'function-table.json')

# V0.4 known names (best-effort partial naming from V0.4 ADR-005 / LIBRARY_MAP.md)
KNOWN_NAMES = {
    '0x02028434': 'vec2_set_inline',
    '0x02039f4c': 'vec3_dot_product',
    '0x02039f38': 'vec3_normalize',
    '0x02029bb0': 'state_switch_8way_packed',
    '0x02029a58': 'simple_set_var_4byte',
    '0x02029ab8': 'state_dispatch_8way',
    '0x023913b8': 'ipc_fifo_recv_handler',
    '0x02391398': 'ipc_fifo_peek_byte',
    '0x02384350': 'touch_sample_xy',
    '0x0238863c': 'key_sample',
    '0x023942a4': 'rtc_read',
    '0x023920b0': 'lid_close_handler',
    '0x02391ce4': 'mic_sample',
    '0x0204d8e8': '__aeabi_fabs',
    '0x0204db1c': '__aeabi_fadd',
    '0x0204d430': '__aeabi_fsub',
    '0x0204d86c': '__aeabi_fcmp',
    '0x0204d930': '__aeabi_fclassify',
    '0x0204c86c': '__aeabi_fdiv',
    '0x0203a880': 'vec3_sub',
    '0x0203a7ec': 'vec3_length',
    '0x0203a73c': 'vec3_scale',
    '0x020395bc': 'vec3_neg',
    '0x0203a1e4': 'vec3_add_scaled',
    '0x02020d0c': 'memcpy_32',
    '0x02027ff4': 'mem_set_32',
    '0x02106954': 'pool_alloc_64',
    '0x02106940': 'pool_alloc_32',
}


def parse_arm_mode_disasm(path: str):
    """Parse ARM-mode disasm text. Returns (push_locs, bx_lr_set, pop_pc_set, mov_pc_lr_set, ldm_pc_set, b_targets_set)."""
    push_locs = []
    bx_lr_set = set()
    pop_pc_set = set()
    mov_pc_lr_set = set()
    ldm_pc_set = set()
    b_targets_set = set()
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        for line in f:
            line = line.rstrip('\n')
            if line.startswith(';') or line.startswith('#') or not line.strip():
                continue
            m = re.match(r'^([0-9a-f]{8})\s+[0-9a-f]+\s+(\S+)\s*(.*)$', line)
            if not m:
                continue
            addr_str, mnemonic, op_str = m.group(1), m.group(2), m.group(3)
            addr = int(addr_str, 16)
            if mnemonic == 'push':
                regs_match = re.search(r'\{([^}]+)\}', op_str)
                if regs_match:
                    regs = [r.strip() for r in regs_match.group(1).split(',')]
                    if 'lr' in regs:
                        push_locs.append((addr, regs, op_str))
            elif mnemonic == 'pop':
                regs_match = re.search(r'\{([^}]+)\}', op_str)
                if regs_match:
                    regs = [r.strip() for r in regs_match.group(1).split(',')]
                    if 'pc' in regs:
                        pop_pc_set.add(addr)
            elif mnemonic == 'bx' and op_str.strip() == 'lr':
                bx_lr_set.add(addr)
            elif mnemonic == 'mov' and 'pc' in op_str and 'lr' in op_str:
                mov_pc_lr_set.add(addr)
            elif mnemonic == 'ldm':
                if 'pc' in op_str:
                    ldm_pc_set.add(addr)
            elif mnemonic == 'b':
                m2 = re.match(r'#0x([0-9a-f]+)', op_str.strip())
                if m2:
                    try:
                        tgt = int(m2.group(1), 16)
                        b_targets_set.add(tgt)
                    except ValueError:
                        pass
    return push_locs, bx_lr_set, pop_pc_set, mov_pc_lr_set, ldm_pc_set, b_targets_set


def inline_thumb_disasm(bin_path: str, dst_base: int, bin_size: int):
    """Inline Thumb-mode disasm to detect push prologues, bx lr / pop pc / mov pc lr returns."""
    try:
        from capstone import Cs, CS_ARCH_ARM, CS_MODE_THUMB
    except ImportError:
        print('capstone not available, skipping Thumb pass', file=sys.stderr)
        return [], set(), set(), set(), set()
    with open(bin_path, 'rb') as f:
        data = f.read()
    cs = Cs(CS_ARCH_ARM, CS_MODE_THUMB)
    cs.detail = True
    cs.skipdata = True
    push_locs = []
    bx_lr_set = set()
    pop_pc_set = set()
    mov_pc_lr_set = set()
    ldm_pc_set = set()
    for ins in cs.disasm(data, dst_base):
        if ins.mnemonic == 'push':
            op = ins.op_str
            regs_match = re.search(r'\{([^}]+)\}', op)
            if regs_match:
                regs = [r.strip() for r in regs_match.group(1).split(',')]
                if 'lr' in regs:
                    push_locs.append((ins.address, regs, op))
        elif ins.mnemonic == 'pop':
            op = ins.op_str
            regs_match = re.search(r'\{([^}]+)\}', op)
            if regs_match:
                regs = [r.strip() for r in regs_match.group(1).split(',')]
                if 'pc' in regs:
                    pop_pc_set.add(ins.address)
        elif ins.mnemonic == 'bx' and ins.op_str.strip() == 'lr':
            bx_lr_set.add(ins.address)
        elif ins.mnemonic == 'mov' and 'pc' in ins.op_str and 'lr' in ins.op_str:
            mov_pc_lr_set.add(ins.address)
        elif ins.mnemonic == 'ldm' and 'pc' in ins.op_str:
            ldm_pc_set.add(ins.address)
    return push_locs, bx_lr_set, pop_pc_set, mov_pc_lr_set, ldm_pc_set


def categorize_callee(callee_addr, push_set, bx_lr_set, pop_pc_set, mov_pc_set, ldm_pc_set, b_target_set):
    """8-tier classification with priority:
    1. 'real'      — callee == push site (4-aligned match)
    2. 'near'      — callee within +/-0x40 of a push (manual-frame naked fn)
    3. 'bx_lr'     — callee within [0..+0x800] of any bx lr (extended for softfloat + utility)
    4. 'pop_pc'    — callee within [0..+0x400] of pop {pc} (compiler epilogue)
    5. 'mov_pc'    — callee within [0..+0x400] of mov pc, lr
    6. 'ldm_pc'    — callee within [0..+0x400] of ldm xx!, {..pc..}
    7. 'b_target'  — callee is a `b imm` target (jump to function entry)
    8. 'naked'     — no detection
    """
    if callee_addr in push_set:
        return 'real', None
    for off in (-4, 0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64):
        if (callee_addr + off) in push_set:
            return 'near', off
    for off in range(0, 0x804, 2):
        if (callee_addr + off) in bx_lr_set:
            return 'bx_lr', off
    for off in range(0, 0x404, 2):
        if (callee_addr + off) in pop_pc_set:
            return 'pop_pc', off
    for off in range(0, 0x404, 2):
        if (callee_addr + off) in mov_pc_set:
            return 'mov_pc', off
    for off in range(0, 0x404, 2):
        if (callee_addr + off) in ldm_pc_set:
            return 'ldm_pc', off
    if callee_addr in b_target_set:
        return 'b_target', 0
    return 'naked', None


def is_data_target(callee_addr: int, skipdata_ranges: list) -> bool:
    """Check if an address falls within a skipdata range (data region, not real code)."""
    for lo, hi in skipdata_ranges:
        if lo <= callee_addr <= hi:
            return True
    return False


def collect_skipdata_ranges(disasm_path: str):
    """Read V0.3 disasm file and collect skipdata ranges (consecutive '; ...' lines)."""
    ranges = []
    cur_start = None
    cur_end = None
    last_was_data = False
    with open(disasm_path, 'r', encoding='utf-8', errors='replace') as f:
        for line in f:
            line = line.rstrip('\n')
            # Two skipdata line formats exist in V0.3 disasm:
            # "; 0200d5dc  + 4B  data: 0xc5b3a291... (capstone skipdata)"
            # Use a more permissive pattern (fix \s+ greedy issue)
            m_data = re.search(r';\s*([0-9a-f]{8})\s*\+\s*(\d+)\s*B', line)
            m_insn = re.match(r'^([0-9a-f]{8})\s', line)
            if m_data:
                addr = int(m_data.group(1), 16)
                size = int(m_data.group(2))
                if last_was_data and cur_end == addr:
                    cur_end = addr + size
                else:
                    if cur_start is not None:
                        ranges.append((cur_start, cur_end))
                    cur_start = addr
                    cur_end = addr + size
                    last_was_data = True
            elif m_insn:
                if last_was_data and cur_start is not None:
                    ranges.append((cur_start, cur_end))
                    cur_start = None
                    cur_end = None
                last_was_data = False
    if cur_start is not None and cur_end is not None:
        ranges.append((cur_start, cur_end))
    return ranges


def main():
    print('== V0.8.1 ARM9/ARM7 函数边界自动检测 (扩展 epilogue heuristics) ==', file=sys.stderr)

    print('  collecting skipdata ranges...', file=sys.stderr)
    arm9_skipdata_ranges = collect_skipdata_ranges(ARM9_DISASM)
    arm7_skipdata_ranges = collect_skipdata_ranges(ARM7_DISASM)
    print(f'  ARM9 skipdata ranges: {len(arm9_skipdata_ranges)}', file=sys.stderr)
    print(f'  ARM7 skipdata ranges: {len(arm7_skipdata_ranges)}', file=sys.stderr)

    print('  parsing ARM9 ARM-mode disasm...', file=sys.stderr)
    (arm9_arm_pushes, arm9_arm_bxlr, arm9_arm_pop_pc,
     arm9_arm_mov_pc_lr, arm9_arm_ldm_pc, arm9_arm_b_targets) = parse_arm_mode_disasm(ARM9_DISASM)
    print(f'  ARM9 ARM-mode: {len(arm9_arm_pushes)} push, {len(arm9_arm_bxlr)} bx lr, '
          f'{len(arm9_arm_pop_pc)} pop pc, {len(arm9_arm_mov_pc_lr)} mov pc lr, '
          f'{len(arm9_arm_ldm_pc)} ldm pc', file=sys.stderr)

    print('  parsing ARM7 ARM-mode disasm...', file=sys.stderr)
    (arm7_arm_pushes, arm7_arm_bxlr, arm7_arm_pop_pc,
     arm7_arm_mov_pc_lr, arm7_arm_ldm_pc, arm7_arm_b_targets) = parse_arm_mode_disasm(ARM7_DISASM)
    print(f'  ARM7 ARM-mode: {len(arm7_arm_pushes)} push, {len(arm7_arm_bxlr)} bx lr, '
          f'{len(arm7_arm_pop_pc)} pop pc, {len(arm7_arm_mov_pc_lr)} mov pc lr, '
          f'{len(arm7_arm_ldm_pc)} ldm pc', file=sys.stderr)

    print('  running ARM9 Thumb-mode inline disasm...', file=sys.stderr)
    (arm9_thumb_pushes, arm9_thumb_bxlr, arm9_thumb_pop_pc,
     arm9_thumb_mov_pc_lr, arm9_thumb_ldm_pc) = inline_thumb_disasm(ARM9_BIN, ARM9_BASE, ARM9_SIZE)
    print(f'  ARM9 Thumb-mode: {len(arm9_thumb_pushes)} push, {len(arm9_thumb_bxlr)} bx lr, '
          f'{len(arm9_thumb_pop_pc)} pop pc, {len(arm9_thumb_mov_pc_lr)} mov pc lr, {len(arm9_thumb_ldm_pc)} ldm pc',
          file=sys.stderr)

    print('  running ARM7 Thumb-mode inline disasm...', file=sys.stderr)
    (arm7_thumb_pushes, arm7_thumb_bxlr, arm7_thumb_pop_pc,
     arm7_thumb_mov_pc_lr, arm7_thumb_ldm_pc) = inline_thumb_disasm(ARM7_BIN, ARM7_BASE, ARM7_SIZE)
    print(f'  ARM7 Thumb-mode: {len(arm7_thumb_pushes)} push, {len(arm7_thumb_bxlr)} bx lr, '
          f'{len(arm7_thumb_pop_pc)} pop pc, {len(arm7_thumb_mov_pc_lr)} mov pc lr, {len(arm7_thumb_ldm_pc)} ldm pc',
          file=sys.stderr)

    # Merge ARM + Thumb
    arm9_pushes = arm9_arm_pushes + arm9_thumb_pushes
    arm7_pushes = arm7_arm_pushes + arm7_thumb_pushes

    arm9_bx_lr_set = arm9_arm_bxlr | arm9_thumb_bxlr
    arm7_bx_lr_set = arm7_arm_bxlr | arm7_thumb_bxlr

    arm9_pop_pc_set = arm9_arm_pop_pc | arm9_thumb_pop_pc
    arm7_pop_pc_set = arm7_arm_pop_pc | arm7_thumb_pop_pc

    arm9_mov_pc_lr_set = arm9_arm_mov_pc_lr | arm9_thumb_mov_pc_lr
    arm7_mov_pc_lr_set = arm7_arm_mov_pc_lr | arm7_thumb_mov_pc_lr

    arm9_ldm_pc_set = arm9_arm_ldm_pc | arm9_thumb_ldm_pc
    arm7_ldm_pc_set = arm7_arm_ldm_pc | arm7_thumb_ldm_pc

    arm9_b_target_set = arm9_arm_b_targets | {a - 1 for a in arm9_arm_b_targets}  # also include Thumb bit-cleared
    arm7_b_target_set = arm7_arm_b_targets | {a - 1 for a in arm7_arm_b_targets}

    arm9_push_set = {a for a, _, _ in arm9_pushes}
    arm7_push_set = {a for a, _, _ in arm7_pushes}

    print('  loading function-calls.json...', file=sys.stderr)
    cg = json.load(open(CALL_GRAPH_JSON, 'r', encoding='utf-8'))
    all_calls = cg['all_calls']
    print(f'  total calls: {len(all_calls)}, unique callees: {cg["unique_callees"]}', file=sys.stderr)

    unique_callees = defaultdict(list)
    for c in all_calls:
        unique_callees[int(c['callee'])].append(int(c['caller']))

    boundaries = {
        'description': 'V0.8.1 — multi-heuristic function boundary detection (push + bx lr + pop {pc} + mov pc lr + ldm {pc})',
        'arm9': {'base': hex(ARM9_BASE), 'end': hex(ARM9_END)},
        'arm7': {'base': hex(ARM7_BASE), 'end': hex(ARM7_END)},
        'prologues': {
            'arm9_count': len(arm9_pushes),
            'arm7_count': len(arm7_pushes),
        },
        'epilogues': {
            'arm9': {'bx_lr': len(arm9_bx_lr_set), 'pop_pc': len(arm9_pop_pc_set),
                     'mov_pc_lr': len(arm9_mov_pc_lr_set), 'ldm_pc': len(arm9_ldm_pc_set)},
            'arm7': {'bx_lr': len(arm7_bx_lr_set), 'pop_pc': len(arm7_pop_pc_set),
                     'mov_pc_lr': len(arm7_mov_pc_lr_set), 'ldm_pc': len(arm7_ldm_pc_set)},
        },
        'callee_classification': {},
        'stats': {},
    }

    classify_counts = Counter()
    cpu_counts = Counter()
    real_call_counts = Counter()
    naked_call_counts = Counter()
    per_cpu_real = Counter()
    per_cpu_total = Counter()

    for callee, callers in unique_callees.items():
        callee_addr = callee

        if ARM9_BASE <= callee_addr < ARM9_END:
            cpu = 'arm9'
            push_set = arm9_push_set
            bx_lr_set_local = arm9_bx_lr_set
            pop_pc_set_local = arm9_pop_pc_set
            mov_pc_set_local = arm9_mov_pc_lr_set
            ldm_pc_set_local = arm9_ldm_pc_set
            b_target_set_local = arm9_b_target_set
            per_cpu_total[cpu] += 1
        elif ARM7_BASE <= callee_addr < ARM7_END:
            cpu = 'arm7'
            push_set = arm7_push_set
            bx_lr_set_local = arm7_bx_lr_set
            pop_pc_set_local = arm7_pop_pc_set
            mov_pc_set_local = arm7_mov_pc_lr_set
            ldm_pc_set_local = arm7_ldm_pc_set
            b_target_set_local = arm7_b_target_set
            per_cpu_total[cpu] += 1
        else:
            cpu = 'unknown'
            push_set = bx_lr_set_local = pop_pc_set_local = set()
            mov_pc_set_local = ldm_pc_set_local = b_target_set_local = set()

        category, offset = categorize_callee(
            callee_addr, push_set, bx_lr_set_local, pop_pc_set_local, mov_pc_set_local, ldm_pc_set_local, b_target_set_local
        ) if cpu != 'unknown' else ('out-of-range', None)
        # Decide detection status with multi-tier fallback:
        #   - heuristic-detected: real/near/bx_lr/pop_pc/mov_pc/ldm_pc/b_target
        #   - multi-caller naked → still detected (definitely a function)
        #   - single-caller NOT in skipdata → still detected (real 1-shot fn)
        #   - single-caller IN skipdata → naked-data-target (false positive)
        is_detected = category in ('real', 'near', 'bx_lr', 'pop_pc', 'mov_pc', 'ldm_pc', 'b_target')
        if not is_detected and category == 'naked':
            if len(callers) >= 2:
                category = 'multi_caller'
                is_detected = True
            else:
                if cpu == 'arm9':
                    in_data = is_data_target(callee_addr, arm9_skipdata_ranges)
                elif cpu == 'arm7':
                    in_data = is_data_target(callee_addr, arm7_skipdata_ranges)
                else:
                    in_data = False
                if not in_data:
                    category = 'single_caller_real'
                    is_detected = True
                else:
                    category = 'data_target'
        # Update the final category in classify_counts
        classify_counts[category] += 1
        cpu_counts[cpu] += 1

        if is_detected:
            real_call_counts[f'0x{callee:08x}'] = len(callers)
            per_cpu_real[cpu] += 1
        else:
            naked_call_counts[f'0x{callee:08x}'] = len(callers)

        boundaries['callee_classification'][f'0x{callee:08x}'] = {
            'cpu': cpu,
            'category': category,
            'epilogue_offset': offset,
            'callers_n': len(callers),
            'callers_preview': [f'0x{c:08x}' for c in callers[:10]],
        }

    detected_total = sum(per_cpu_real.values())
    total_callees = sum(per_cpu_total.values())
    overall_pct = round(100.0 * detected_total / total_callees, 2) if total_callees else 0

    boundaries['stats'] = {
        'total_unique_callees': total_callees,
        'classify_breakdown': dict(classify_counts),
        'cpu_breakdown': dict(cpu_counts),
        'overall_coverage_pct': overall_pct,
        'arm9_prologue_coverage': {
            'prologues': len(arm9_pushes),
            'unique_real_callees': per_cpu_real['arm9'],
            'unique_total_callees': per_cpu_total['arm9'],
            'pct_real': round(100.0 * per_cpu_real['arm9'] / per_cpu_total['arm9'], 2) if per_cpu_total['arm9'] else 0,
        },
        'arm7_prologue_coverage': {
            'prologues': len(arm7_pushes),
            'unique_real_callees': per_cpu_real['arm7'],
            'unique_total_callees': per_cpu_total['arm7'],
            'pct_real': round(100.0 * per_cpu_real['arm7'] / per_cpu_total['arm7'], 2) if per_cpu_total['arm7'] else 0,
        },
        'top_real_callees_by_callers': sorted(
            [{'callee': c, 'callers_n': n} for c, n in real_call_counts.items()],
            key=lambda x: -x['callers_n']
        )[:50],
        'top_naked_callees_by_callers': sorted(
            [{'callee': c, 'callers_n': n} for c, n in naked_call_counts.items()],
            key=lambda x: -x['callers_n']
        )[:50],
    }

    print(f'  writing {OUT_BOUNDARIES_JSON}...', file=sys.stderr)
    with open(OUT_BOUNDARIES_JSON, 'w') as g:
        json.dump(boundaries, g, indent=2)

    summary = {
        'description': 'V0.8.1 function boundary detection summary',
        'arm9_prologues': len(arm9_pushes),
        'arm7_prologues': len(arm7_pushes),
        'unique_callees': total_callees,
        'classify_breakdown': dict(classify_counts),
        'cpu_breakdown': dict(cpu_counts),
        'overall_coverage_pct': overall_pct,
        'arm9_real_pct': boundaries['stats']['arm9_prologue_coverage']['pct_real'],
        'arm7_real_pct': boundaries['stats']['arm7_prologue_coverage']['pct_real'],
    }
    print(f'  writing {OUT_SUMMARY_JSON}...', file=sys.stderr)
    with open(OUT_SUMMARY_JSON, 'w') as g:
        json.dump(summary, g, indent=2)

    print(f'  writing {OUT_FUNCTION_TABLE_JSON}...', file=sys.stderr)

    function_table = []
    seen_addrs = set()

    # 1. All push sites — confidence HIGH
    for addr, regs, op in arm9_pushes:
        addr_hex = f'0x{addr:08x}'
        if addr_hex in seen_addrs:
            continue
        seen_addrs.add(addr_hex)
        known = KNOWN_NAMES.get(addr_hex)
        function_table.append({
            'addr': addr_hex,
            'cpu': 'arm9',
            'mode': 'arm',
            'name': known or f'sub_{addr:08x}',
            'is_known': known is not None,
            'regs_pushed': regs,
            'category': 'prologue',
            'confidence': 'high',
        })

    for addr, regs, op in arm7_pushes:
        addr_hex = f'0x{addr:08x}'
        if addr_hex in seen_addrs:
            continue
        seen_addrs.add(addr_hex)
        known = KNOWN_NAMES.get(addr_hex)
        function_table.append({
            'addr': addr_hex,
            'cpu': 'arm7',
            'mode': 'arm',
            'name': known or f'sub_{addr:08x}',
            'is_known': known is not None,
            'regs_pushed': regs,
            'category': 'prologue',
            'confidence': 'high',
        })

    # 2. Detected callees not in push sets
    confidence_map = {
        'real': 'high', 'near': 'high',
        'bx_lr': 'medium', 'pop_pc': 'medium',
        'mov_pc': 'medium', 'ldm_pc': 'medium',
        'b_target': 'medium',
        'multi_caller': 'medium',
        'single_caller_real': 'low',
        'data_target': 'excluded',
        'naked': 'low',
    }
    for callee in unique_callees:
        callee_addr = callee
        addr_hex = f'0x{callee_addr:08x}'
        if addr_hex in seen_addrs:
            continue
        classification = boundaries['callee_classification'].get(addr_hex)
        if not classification:
            continue
        category = classification['category']
        if ARM9_BASE <= callee_addr < ARM9_END:
            cpu = 'arm9'
        elif ARM7_BASE <= callee_addr < ARM7_END:
            cpu = 'arm7'
        else:
            cpu = 'unknown'
        known = KNOWN_NAMES.get(addr_hex)
        function_table.append({
            'addr': addr_hex,
            'cpu': cpu,
            'mode': 'arm',
            'name': known or f'sub_{callee_addr:08x}',
            'is_known': known is not None,
            'regs_pushed': None,
            'category': category,
            'confidence': confidence_map.get(category, 'low'),
            'callers_n': classification['callers_n'],
        })
        seen_addrs.add(addr_hex)

    function_table.sort(key=lambda x: int(x['addr'], 16))

    known_n = sum(1 for f in function_table if f['is_known'])
    total_n = len(function_table)
    # Detected = anything that's NOT a "data_target" (since data_target is a false positive call)
    detected_in_table = sum(1 for f in function_table if f['category'] != 'data_target')
    data_target_n = sum(1 for f in function_table if f['category'] == 'data_target')

    function_table_payload = {
        'description': 'V0.8.1 function table — addr → name + confidence',
        'naming_scheme': 'sub_XXXXXXXX (auto) + V0.4 known names',
        'total_functions': total_n,
        'detected_functions': detected_in_table,
        'data_target_excluded': data_target_n,
        'detection_coverage_pct': round(100.0 * detected_in_table / total_n, 2) if total_n else 0,
        'known_functions': known_n,
        'unknown_functions': total_n - known_n,
        'naming_coverage_pct': round(100.0 * known_n / total_n, 2) if total_n else 0,
        'confidence_breakdown': dict(Counter(f['confidence'] for f in function_table)),
        'category_breakdown': dict(Counter(f['category'] for f in function_table)),
        'functions': function_table,
    }
    with open(OUT_FUNCTION_TABLE_JSON, 'w') as g:
        json.dump(function_table_payload, g, indent=2)

    print('\n== V0.8.1 Stats ==', file=sys.stderr)
    print(f'  ARM9 push prologues:     {len(arm9_pushes)}', file=sys.stderr)
    print(f'  ARM7 push prologues:     {len(arm7_pushes)}', file=sys.stderr)
    print(f'  Unique callees total:    {total_callees}', file=sys.stderr)
    print(f'  Classification breakdown: {dict(classify_counts)}', file=sys.stderr)
    print(f'  CPU breakdown:           {dict(cpu_counts)}', file=sys.stderr)
    print(f'  ARM9 detection coverage:  {per_cpu_real["arm9"]}/{per_cpu_total["arm9"]} = {boundaries["stats"]["arm9_prologue_coverage"]["pct_real"]}%', file=sys.stderr)
    print(f'  ARM7 detection coverage:  {per_cpu_real["arm7"]}/{per_cpu_total["arm7"]} = {boundaries["stats"]["arm7_prologue_coverage"]["pct_real"]}%', file=sys.stderr)
    print(f'  OVERALL detection coverage: {detected_total}/{total_callees} = {overall_pct}%', file=sys.stderr)
    print('Done.', file=sys.stderr)


if __name__ == '__main__':
    main()

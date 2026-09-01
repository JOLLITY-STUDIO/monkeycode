#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""V0.13 - Pattern detector (ADR-013).

对 V0.8 function-table 中尚未命名 (known / curated / excluded 以外) 的函数, 用 regex
模式自动从 disasm 推断名字. 产物:
  - rom-data/v013-pattern-suggestions.json

模式 (每个匹配给 auto_<kind>_<addr8> 名字 + confidence):
  1. state_setter_*    - ldr r1,[pc,N]; str r0,[r1]; bx lr
  2. state_getter_*    - ldr r0,[pc,N]; ldr r0,[r0]; bx lr
  3. byte_getter_*     - ldr r0,[pc,N]; ldrb r0,[r0]; bx lr
  4. byte_setter_*     - ldr r1,[pc,N]; strb r0,[r1]; bx lr
  5. halfword_getter_* - ldr r0,[pc,N]; ldrh r0,[r0]; bx lr
  6. halfword_setter_* - ldr r1,[pc,N]; strh r0,[r1]; bx lr
  7. const_return_*    - mov r0,#N; bx lr (N 为常量)
  8. struct_clear_0_*  - mov r1,#0; str r1,[r0]; bx lr (单 field clear)
  9. memset_word_*     - add ip,r1,r2; stmlt r1!,{r0}; ...; bx lr
  10. memcpy_word_*    - add ip,r1,r2; ldmlt r0!,{r2}; stmlt r1!,{r2}; ...; bx lr
  11. dcache_*          - 任何 mcr p15 c7 (cache control)
  12. tail_call_*      - ldr ip,[pc,N]; bx ip
  13. switch_dispatch_* - 多个 cmp rN,#X + beq (switch style)
  14. early_return_*    - addeq sp,sp,#4; ldmeq sp!,{lr}; bxeq lr (manual stack unwind)

Confidence:
  - high:   3-instruction exact pattern (state_setter/getter/byte/halfword/const/clear)
  - medium: multi-insn pattern with disasm hints (memset/memcpy/dcache/switch/tail/early_return)
  - low:    pattern match but confidence weaker

后续 (V0.13+):
- 高级 pattern: key input handler (writes IO_KEYINPUT), VRAM submit (writes to VRAM region),
  timer setup (writes IO_TIMER*), IPC send (writes IO_IPC_FIFO), etc.

输入: V0.8 function-table.json + disasm-arm9-full.txt + disasm-arm7-full.txt
输出: rom-data/v013-pattern-suggestions.json
"""
import json
import os
import re
from collections import Counter

ROM_DIR = r'D:\studio\github\monkeycode\src\nds\EssentialSudokuDS\rom-data'
FUNC_TABLE = os.path.join(ROM_DIR, 'function-table.json')
ARM9_DISASM = os.path.join(ROM_DIR, 'disasm-arm9-full.txt')
ARM7_DISASM = os.path.join(ROM_DIR, 'disasm-arm7-full.txt')
ARM9_DISASM_THUMB = os.path.join(ROM_DIR, 'disasm-arm9-thumb-full.txt')
ARM7_DISASM_THUMB = os.path.join(ROM_DIR, 'disasm-arm7-thumb-full.txt')
ARM9_BIN = os.path.join(ROM_DIR, 'arm9.bin')
ARM7_BIN = os.path.join(ROM_DIR, 'arm7.bin')
OUTPUT_JSON = os.path.join(ROM_DIR, 'v013-pattern-suggestions.json')
OUTPUT_JSON_V014 = os.path.join(ROM_DIR, 'v014-pattern-suggestions.json')

# ARM/Thumb load addrs per cart header
ARM9_LOAD = 0x02008000
ARM7_LOAD = 0x02380000

# Curated JSON paths (already-named: skip these)
CURATED = [
    os.path.join(ROM_DIR, 'v012-curated.json'),
    os.path.join(ROM_DIR, 'v0121-curated-batch2.json'),
    os.path.join(ROM_DIR, 'v0122-curated-batch3.json'),
    os.path.join(ROM_DIR, 'v0122-curated-batch4.json'),
]

# Pattern rules (kind, regex, confidence)
# V0.13.2: All patterns now match BOTH ARM and Thumb syntax:
#   - `bx lr` (ARM return) OR `pop {pc}` (Thumb return)
#   - `mov r0, #N` (ARM) OR `movs r0, #N` (Thumb)
#   - `beq` in both modes
#   - `ldr rN, [pc, #N]` in both modes (PC-relative load)
PATTERNS = [
    # State setter: write arg to global. ARM: bx lr. Thumb: pop {pc}.
    ('state_setter', re.compile(
        r'ldr\s+r1,\s*\[pc,\s*#\d+\][^\n]*\n[^\n]*'
        r'str\s+r0,\s*\[r1\][^\n]*\n[^\n]*'
        r'(?:bx\s+lr|pop\s+\{pc\})'
    ), 'high'),
    # State getter: 1-level read global
    ('state_getter', re.compile(
        r'ldr\s+r0,\s*\[pc,\s*#\d+\][^\n]*\n[^\n]*'
        r'ldr\s+r0,\s*\[r0\][^\n]*\n[^\n]*'
        r'(?:bx\s+lr|pop\s+\{pc\})'
    ), 'high'),
    # Byte getter
    ('byte_getter', re.compile(
        r'ldr\s+r0,\s*\[pc,\s*#\d+\][^\n]*\n[^\n]*'
        r'ldrb\s+r0,\s*\[r0\][^\n]*\n[^\n]*'
        r'(?:bx\s+lr|pop\s+\{pc\})'
    ), 'high'),
    # Byte setter
    ('byte_setter', re.compile(
        r'ldr\s+r1,\s*\[pc,\s*#\d+\][^\n]*\n[^\n]*'
        r'strb\s+r0,\s*\[r1\][^\n]*\n[^\n]*'
        r'(?:bx\s+lr|pop\s+\{pc\})'
    ), 'high'),
    # Halfword getter
    ('halfword_getter', re.compile(
        r'ldr\s+r0,\s*\[pc,\s*#\d+\][^\n]*\n[^\n]*'
        r'ldrh\s+r0,\s*\[r0\][^\n]*\n[^\n]*'
        r'(?:bx\s+lr|pop\s+\{pc\})'
    ), 'high'),
    # Halfword setter
    ('halfword_setter', re.compile(
        r'ldr\s+r1,\s*\[pc,\s*#\d+\][^\n]*\n[^\n]*'
        r'strh\s+r0,\s*\[r1\][^\n]*\n[^\n]*'
        r'(?:bx\s+lr|pop\s+\{pc\})'
    ), 'high'),
    # Const return: mov r0, #N; bx lr (ARM) OR movs r0, #N; pop {pc} (Thumb)
    ('const_return', re.compile(
        r'movs?\s+r0,\s*#0?[xX]?[0-9a-fA-F]+[^\n]*\n[^\n]*'
        r'(?:bx\s+lr|pop\s+\{pc\})'
    ), 'high'),
    # Struct clear single field: mov/movs r1, #0; str r1, [r0]; return
    ('struct_clear_0', re.compile(
        r'movs?\s+r1,\s*#0[^\n]*\n[^\n]*'
        r'str\s+r1,\s*\[r0\][^\n]*\n[^\n]*'
        r'(?:bx\s+lr|pop\s+\{pc\})'
    ), 'high'),
    # Memset word (ARM only — Thumb uses different stmlt syntax)
    ('memset_word', re.compile(
        r'add\s+ip,\s*r1,\s*r2[^\n]*\n[^\n]*'
        r'cmp\s+r1,\s*ip[^\n]*\n[^\n]*'
        r'stmlt\s+r1!,\s*\{r0\}[^\n]*\n[^\n]*'
        r'blt'
    ), 'medium'),
    # Memcpy word (ARM only)
    ('memcpy_word', re.compile(
        r'add\s+ip,\s*r1,\s*r2[^\n]*\n[^\n]*'
        r'cmp\s+r1,\s*ip[^\n]*\n[^\n]*'
        r'ldmlt\s+r0!,\s*\{r2\}[^\n]*\n[^\n]*'
        r'stmlt\s+r1!,\s*\{r2\}[^\n]*\n[^\n]*'
        r'blt'
    ), 'medium'),
    # D-cache: any mcr p15 c7 (works in both ARM/Thumb — coprocessor insns are mode-independent)
    ('dcache_helper', re.compile(
        r'mcr\s+p15,\s*#0,\s*r\d+,\s*c7'
    ), 'medium'),
    # Tail call: ldr ip, [pc, #N]; bx ip
    ('tail_call', re.compile(
        r'ldr\s+ip,\s*\[pc,\s*#\d+\][^\n]*\n[^\n]*'
        r'bx\s+ip'
    ), 'high'),
    # Switch dispatch: multiple cmp + beq
    ('switch_dispatch', re.compile(
        r'(?:cmp\s+r\d+,\s*#\d+[^\n]*\n[^\n]*beq\s+#){2,}'
    ), 'medium'),
    # Early return (ARM only — Thumb uses popeq {pc})
    ('early_return', re.compile(
        r'stmdb\s+sp!,\s*\{lr\}[^\n]*\n[^\n]*'
        r'sub\s+sp,\s*sp,\s*#4[^\n]*\n[^\n]*'
        r'cmp\s+r\d+,\s*#\d+[^\n]*\n[^\n]*'
        r'addeq\s+sp,\s*sp,\s*#4[^\n]*\n[^\n]*'
        r'ldmeq\s+sp!,\s*\{lr\}[^\n]*\n[^\n]*'
        r'bxeq\s+lr'
    ), 'medium'),
]


def load_disasm(path):
    """Load disasm file, return {addr_hex: lines_list}."""
    out = {}
    if not os.path.exists(path):
        return out
    with open(path, encoding='utf-8') as f:
        for line in f:
            m = re.match(r'^([0-9a-fA-F]{8})\s+[0-9a-fA-F]+\s+(.{0,80})\s*$', line)
            if m:
                addr = f'0x{m.group(1).lower()}'
                out.setdefault(addr, []).append(line.rstrip())
    return out


def load_binary(path):
    """Load binary file as bytes. Returns None if not exists."""
    if not os.path.exists(path):
        return None
    with open(path, 'rb') as f:
        return f.read()


def get_disasm_snippet(disasm_map, addr, n=8, step=4):
    """Get first n disasm lines starting from addr. step=4 for ARM, step=2 for Thumb."""
    if not disasm_map:
        return []
    addr_int = int(addr, 16)
    out = []
    for off in range(0, 64, step):
        a = f'0x{addr_int + off:08x}'
        if a in disasm_map:
            for ln in disasm_map[a]:
                out.append(ln)
            if len(out) >= n:
                break
    return out[:n]


def disasm_to_text(lines):
    """Strip addr+bytes prefix, keep mnemonic only."""
    parts = []
    for ln in lines:
        m = re.match(r'^[0-9a-fA-F]{8}\s+[0-9a-fA-F]+\s+(.{0,80})$', ln)
        if m:
            parts.append(m.group(1).strip())
    return '\n'.join(parts)


def extract_pc_relative_target(lines_or_text, fn_addr, binary, load_addr, prefer='first'):
    """Extract target address from `ldr rN, [pc, #N]` or `ldr ip, [pc, #N]` pattern.

    Accepts either raw disasm lines (with addr+bytes prefix) or plain text.
    Parses to find the ACTUAL address of each ldr instruction. In ARM mode,
    the PC for `ldr rN, [pc, #N]` is `ldr_addr + 8`. The actual memory address
    accessed is `ldr_addr + 8 + N`. Returns the 4-byte word (uint32 little-endian)
    read from that address. Returns None if pattern not found or out of range.

    V0.14.1: Now also matches `ldr ip, [pc, #N]` (used in tail_call / dispatch patterns).
    `prefer`: 'first' (default) or 'last' — which ldr to use. tail_call should use 'last'
    (the LAST `ldr ip, ...` is closest to `bx ip`).
    """
    # Normalize to list of raw disasm lines
    if isinstance(lines_or_text, str):
        raw_lines = lines_or_text.split('\n')
    else:
        raw_lines = lines_or_text

    # Look at each line; track address of ldr rN/ip, [pc, #N]
    ldr_addrs = []
    for line in raw_lines:
        m = re.match(r'^([0-9a-fA-F]{8})\s+[0-9a-fA-F]+\s+(.{0,80})$', line.strip())
        if not m:
            continue
        addr_here = int(m.group(1), 16)
        mnemonic = m.group(2).strip()
        # Match both `rN` and `ip` (intra-procedure-call scratch register)
        mm = re.match(r'ldr\s+(?:r\d+|ip),\s*\[pc,\s*#(\d+)\]', mnemonic)
        if mm:
            offset = int(mm.group(1))
            ldr_addrs.append((addr_here, offset))

    if not ldr_addrs:
        return None

    if prefer == 'last' and len(ldr_addrs) > 1:
        ldr_addr, offset = ldr_addrs[-1]
    else:
        ldr_addr, offset = ldr_addrs[0]

    target_addr = ldr_addr + 8 + offset
    bin_off = target_addr - load_addr
    if bin_off < 0 or bin_off + 4 > len(binary):
        return None
    return int.from_bytes(binary[bin_off:bin_off + 4], 'little')


def extract_const_value(lines_or_text):
    """Extract constant value from `mov r0, #N` or `movs r0, #N` pattern.

    Used by const_return: returns the int value, or None if no mov r0 found.
    """
    if isinstance(lines_or_text, str):
        raw_lines = lines_or_text.split('\n')
    else:
        raw_lines = lines_or_text

    for line in raw_lines:
        m = re.match(r'^[0-9a-fA-F]{8}\s+[0-9a-fA-F]+\s+(.{0,80})$', line.strip())
        if not m:
            continue
        mnemonic = m.group(1).strip()
        mm = re.match(r'movs?\s+r0,\s*#(\d+)', mnemonic)
        if mm:
            return int(mm.group(1))
    return None


def extract_dcache_op(lines_or_text):
    """Extract dcache operation from `mcr p15, #0, rN, c7, cM, #op2` pattern.

    Returns opcode string like 'c7_c10_1' (clean D-cache MVA) or None.
    """
    if isinstance(lines_or_text, str):
        raw_lines = lines_or_text.split('\n')
    else:
        raw_lines = lines_or_text

    for line in raw_lines:
        m = re.match(r'^[0-9a-fA-F]{8}\s+[0-9a-fA-F]+\s+(.{0,80})$', line.strip())
        if not m:
            continue
        mnemonic = m.group(1).strip()
        mm = re.search(r'mcr\s+p15,\s*#0,\s*r\d+,\s*(c\d+),\s*(c\d+),\s*#(\d+)', mnemonic)
        if mm:
            return f'{mm.group(1)}_{mm.group(2)}_{mm.group(3)}'
    return None


def main():
    print('== V0.13 pattern detector (ADR-013) ==', flush=True)

    # Load function-table
    print(f'  loading {FUNC_TABLE}...', flush=True)
    ft = json.load(open(FUNC_TABLE, 'r', encoding='utf-8'))
    funcs = ft['functions']
    print(f'  loaded {len(funcs)} functions', flush=True)

    # Load curated (skip these)
    curated_addrs = set()
    for p in CURATED:
        if os.path.exists(p):
            data = json.load(open(p, encoding='utf-8'))
            for e in data.get('names', []):
                curated_addrs.add(e['addr'])
    print(f'  curated addrs to skip: {len(curated_addrs)}', flush=True)

    # Load disasm (ARM + Thumb)
    arm9 = load_disasm(ARM9_DISASM)
    arm7 = load_disasm(ARM7_DISASM)
    arm9_thumb = load_disasm(ARM9_DISASM_THUMB)
    arm7_thumb = load_disasm(ARM7_DISASM_THUMB)
    print(f'  ARM9 disasm: ARM={len(arm9)} Thumb={len(arm9_thumb)}', flush=True)
    print(f'  ARM7 disasm: ARM={len(arm7)} Thumb={len(arm7_thumb)}', flush=True)

    # For each function, apply patterns
    suggestions = []
    matches_by_kind = Counter()
    skipped_known = 0
    skipped_curated = 0
    skipped_excluded = 0
    skipped_no_disasm = 0
    skipped_no_match = 0

    # V0.14: load binaries for pc-relative target extraction
    arm9_bin = load_binary(ARM9_BIN)
    arm7_bin = load_binary(ARM7_BIN)

    for f in funcs:
        addr = f['addr']
        addr_int = int(addr, 16)
        if f.get('is_known'):
            skipped_known += 1
            continue
        if f.get('confidence') == 'excluded':
            skipped_excluded += 1
            continue
        if addr in curated_addrs:
            skipped_curated += 1
            continue

        # Get disasm (try ARM first, then Thumb)
        is_arm9 = addr.startswith('0x020')
        src_arm = arm9 if is_arm9 else arm7
        src_thumb = arm9_thumb if is_arm9 else arm7_thumb
        lines = get_disasm_snippet(src_arm, addr, n=8, step=4)
        thumb_lines = get_disasm_snippet(src_thumb, addr, n=8, step=2)
        if not lines and not thumb_lines:
            skipped_no_disasm += 1
            continue

        # Try ARM mode first; if no match AND thumb exists, try Thumb mode
        text = disasm_to_text(lines) if lines else disasm_to_text(thumb_lines)
        matched = False
        for kind, regex, conf in PATTERNS:
            if regex.search(text):
                matched = True
                # V0.14: extract target_global_ptr from ldr rN, [pc, #N]
                # V0.14.1: per-kind target extraction
                bin_data = arm9_bin if is_arm9 else arm7_bin
                load_addr = ARM9_LOAD if is_arm9 else ARM7_LOAD
                use_lines = lines if lines else thumb_lines
                if kind == 'tail_call':
                    # Use LAST ldr ip (closest to bx ip)
                    target_ptr = extract_pc_relative_target(use_lines, addr_int, bin_data, load_addr, prefer='last')
                elif kind == 'const_return':
                    # Extract constant value from mov r0, #N
                    cv = extract_const_value(use_lines)
                    target_ptr = cv if cv is not None else None
                elif kind == 'dcache_helper':
                    # Extract dcache opcode from mcr p15 c7 cN #op2 (returns str)
                    target_ptr = extract_dcache_op(use_lines)
                else:
                    target_ptr = extract_pc_relative_target(use_lines, addr_int, bin_data, load_addr)
                # Name: prefer target global ptr short, fall back to function addr
                if target_ptr is not None:
                    if isinstance(target_ptr, int):
                        short = f'{target_ptr:08x}'
                    else:
                        # str (e.g. dcache opcode 'c7_c10_1')
                        short = str(target_ptr).replace(' ', '_')
                else:
                    short = addr.replace('0x', '').lower()
                suggestion_name = f'auto_{kind}_{short}'
                cn = f.get('callers_n') or 0
                suggestions.append({
                    'addr': addr,
                    'name': suggestion_name,
                    'pattern_kind': kind,
                    'confidence': conf,
                    'callers_n': cn,
                    'disasm_snippet': text[:200],
                    'disasm_mode': 'arm' if lines else 'thumb',
                    'target_global_ptr': (
                        f'0x{target_ptr:08x}' if isinstance(target_ptr, int)
                        else str(target_ptr)
                    ) if target_ptr is not None else None,
                    'category': f.get('category', 'unknown'),
                    'cpu': f.get('cpu', '?'),
                })
                matches_by_kind[kind] += 1
                break
        # If no ARM match and we have thumb_lines, try thumb mode
        if not matched and lines and thumb_lines:
            text_t = disasm_to_text(thumb_lines)
            for kind, regex, conf in PATTERNS:
                if regex.search(text_t):
                    short_addr = addr.replace('0x', '').lower()
                    suggestion_name = f'auto_{kind}_{short_addr}'
                    cn = f.get('callers_n') or 0
                    suggestions.append({
                        'addr': addr,
                        'name': suggestion_name,
                        'pattern_kind': kind,
                        'confidence': conf,
                        'callers_n': cn,
                        'disasm_snippet': text_t[:200],
                        'disasm_mode': 'thumb',
                        'target_global_ptr': None,
                        'category': f.get('category', 'unknown'),
                        'cpu': f.get('cpu', '?'),
                    })
                    matches_by_kind[kind] += 1
                    break
            else:
                skipped_no_match += 1
        elif not matched:
            skipped_no_match += 1

    # V0.14: Handle name collisions (multiple funcs target same global)
    # When 2+ funcs get same auto_<kind>_<target_ptr>, append _a/_b/_c
    name_counts = Counter()
    for s in suggestions:
        name_counts[s['name']] += 1
    name_seen = Counter()
    collision_pairs = []
    for s in suggestions:
        if name_counts[s['name']] > 1:
            idx = name_seen[s['name']]
            suffix = chr(ord('a') + idx)
            old = s['name']
            s['name'] = f'{s["name"]}_{suffix}'
            name_seen[old] += 1
            collision_pairs.append((s['addr'], old, s['name']))
    print(f'\n  V0.14 name collisions: {len(collision_pairs)} (suffix _a/_b/_c added)', flush=True)
    if collision_pairs:
        for addr, old, new in collision_pairs[:5]:
            print(f'    {addr}: {old} -> {new}', flush=True)

    # Stats
    print(f'\n  suggestions: {len(suggestions)}', flush=True)
    print(f'  skipped known: {skipped_known}', flush=True)
    print(f'  skipped curated: {skipped_curated}', flush=True)
    print(f'  skipped excluded: {skipped_excluded}', flush=True)
    print(f'  skipped no_disasm: {skipped_no_disasm}', flush=True)
    print(f'  skipped no_match: {skipped_no_match}', flush=True)
    print(f'\n  matches by kind:', flush=True)
    for kind, n in sorted(matches_by_kind.items(), key=lambda x: -x[1]):
        print(f'    {kind:20s}: {n}', flush=True)

    # V0.14: target_global_ptr coverage
    with_target = sum(1 for s in suggestions if s.get('target_global_ptr'))
    print(f'\n  suggestions with target_global_ptr: {with_target}/{len(suggestions)}', flush=True)

    # V0.14: Cluster by (pattern_kind, target_global_ptr) — find unique target globals per pattern
    # Group state_*/byte_*/halfword_* by target_ptr to see global coverage
    cluster_by_ptr = {}
    for s in suggestions:
        kind = s['pattern_kind']
        ptr = s.get('target_global_ptr')
        if ptr and kind.startswith(('state_', 'byte_', 'halfword_', 'const_')):
            key = (kind, ptr)
            cluster_by_ptr.setdefault(key, []).append(s['addr'])

    print(f'\n  unique (pattern_kind, target_global) clusters: {len(cluster_by_ptr)}', flush=True)

    # Build cluster summary
    cluster_summary = []
    for (kind, ptr), addrs in sorted(cluster_by_ptr.items()):
        cluster_summary.append({
            'pattern_kind': kind,
            'target_global_ptr': ptr,
            'function_count': len(addrs),
            'function_addrs': addrs,
        })

    # Output V0.13 JSON (preserve for backward compat)
    output = {
        'version': 'V0.14',
        'description': 'V0.14 pattern detector + global dedup (ADR-014) — target_global_ptr extraction',
        'pattern_rules': [
            {'kind': k, 'confidence': c, 'regex': r.pattern[:60] + '...'}
            for k, _, r, c in [(p[0], p[1], p[1], p[2]) for p in PATTERNS]
        ],
        'total_suggestions': len(suggestions),
        'matches_by_kind': dict(matches_by_kind),
        'skipped': {
            'known': skipped_known,
            'curated': skipped_curated,
            'excluded': skipped_excluded,
            'no_disasm': skipped_no_disasm,
            'no_match': skipped_no_match,
        },
        'names': suggestions,
        'clusters': cluster_summary,
    }

    with open(OUTPUT_JSON_V014, 'w', encoding='utf-8') as g:
        json.dump(output, g, indent=2)
    print(f'\n  wrote {OUTPUT_JSON_V014}', flush=True)
    print(f'\n== V0.14 done ==', flush=True)


if __name__ == '__main__':
    main()

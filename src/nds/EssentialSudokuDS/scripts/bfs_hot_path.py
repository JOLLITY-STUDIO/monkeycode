#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""V0.11 — ARM9 BFS hot-path reachability from entry 0x02008000.

Algorithm (ADR-011):
1. Load V0.3 function-calls.json (caller_addr → callee_addr, 7141 BL/BLX records)
2. Load V0.8 function-table.json (function metadata)
3. Load disasm-arm9-full.txt (per-addr disasm lines)
4. Forward BFS from 0x02008000, max_depth=5 (skip __aeabi_* SOFTFLOAT region for clarity)
5. For each reached func: tier classifier + first-disasm extractor
6. Output: hot-path-tree.json + hot-path-summary.txt

V0.11 scope:
- Catalog (not name) — V0.12+ does curated naming using these outputs
- Reasonable BFS depth (5 hops) covers 90% hot-path
- Accepts V0.3 graph limitations (caller = BL-instruction addr, not function addr)

Usage:
    python scripts/bfs_hot_path.py
"""
import json
import os
import re
import sys
from collections import defaultdict

ROM_DIR = r'D:\studio\github\monkeycode\src\nds\EssentialSudokuDS\rom-data'
OUTPUT_TREE = os.path.join(ROM_DIR, 'hot-path-tree.json')
OUTPUT_SUMMARY = os.path.join(ROM_DIR, 'hot-path-summary.txt')
DISASM_FILE = os.path.join(ROM_DIR, 'disasm-arm9-full.txt')

ARM9_ENTRY = 0x02008000
SOFTFLOAT_BASE = 0x0204c000
SOFTFLOAT_END = 0x0204e000
BFS_MAX_DEPTH = 5
# V0.11.1: 缩 entry_zone window (旧 32KB → 8KB) 让真 BFS depth 2/3/4 显露
ENTRY_ZONE_WINDOW = 0x00002000  # 8KB

# V0.4 known SOFTFLOAT names (28)
KNOWN_SFLOAT_NAMES = {
    '__aeabi_fadd', '__aeabi_fsub', '__aeabi_fmul', '__aeabi_fdiv',
    '__aeabi_fcmp', '__aeabi_fabs', '__aeabi_fclassify',
}


def load_calls():
    fc_path = os.path.join(ROM_DIR, 'function-calls.json')
    fc = json.load(open(fc_path, encoding='utf-8'))
    return fc['all_calls']


def load_function_table():
    ft_path = os.path.join(ROM_DIR, 'function-table.json')
    ft = json.load(open(ft_path, encoding='utf-8'))
    # build addr → fn record
    addr_to_fn = {f['addr']: f for f in ft['functions']}
    return addr_to_fn


def addr_to_int(addr_str_or_int):
    if isinstance(addr_str_or_int, int):
        return addr_str_or_int
    return int(addr_str_or_int, 16)


def build_caller_to_callees(calls):
    """Return {caller_addr_int: [callee_addr_int, ...]}."""
    g = defaultdict(set)
    for c in calls:
        caller = c['caller']
        callee = c['callee']
        g[caller].add(callee)
    return {k: sorted(v) for k, v in g.items()}


def build_callee_to_callers(calls):
    g = defaultdict(set)
    for c in calls:
        g[c['callee']].add(c['caller'])
    return {k: sorted(v) for k, v in g.items()}


def is_sfloat(addr_int):
    return SOFTFLOAT_BASE <= addr_int < SOFTFLOAT_END


def is_excluded(addr_to_fn, addr_int):
    f = addr_to_fn.get(f'0x{addr_int:08x}')
    if not f:
        return False
    return f.get('confidence') == 'excluded'


def tier_from_depth(depth):
    if depth == 0:
        return 'entry_root'
    if depth == 1:
        return 'frame_loop'
    if depth == 2:
        return 'subsystem'
    if depth == 3:
        return 'worker'
    return 'leaf_helper'


def extract_first_disasm(disasm_path, target_addrs, max_insns=8, addr_to_fn=None):
    """For each target addr in target_addrs, return list of first `max_insns` real disasm lines.

    Real lines = not starting with ';' (skipdata placeholders).
    Returns {addr_int: ['bl __aeabi_fabs', 'mov r1, r0', ...]}

    Thumb-mode funcs (mode=thumb in function-table) are not in disasm-arm9-full.txt
    (which only has ARM-mode pass). Return placeholder note instead (V0.11.1).

    Reads disasm line-by-line, parsing '02008000  ....  bl       #0x204d8e8'.
    """
    target_set = set(target_addrs)
    result = {}
    with open(disasm_path, encoding='utf-8', errors='replace') as f:
        for line in f:
            line = line.rstrip()
            if not line:
                continue
            if line.startswith(';') or line.startswith('#'):
                continue
            m = re.match(r'^([0-9a-f]{8})\s+[0-9a-f]+\s+(\S.*)$', line)
            if not m:
                continue
            addr_str = m.group(1)
            try:
                addr = int(addr_str, 16)
            except ValueError:
                continue
            if addr not in target_set:
                continue
            if addr in result:
                continue
            collected = [m.group(2).strip()]
            counter = 1
            for fline in f:
                fline = fline.rstrip()
                if not fline:
                    continue
                if fline.startswith(';') or fline.startswith('#') or fline.startswith('='):
                    if len(collected) >= max_insns:
                        break
                    continue
                m2 = re.match(r'^([0-9a-f]{8})\s+[0-9a-f]+\s+(\S.*)$', fline)
                if not m2:
                    continue
                next_addr = int(m2.group(1), 16)
                if next_addr <= addr:
                    continue
                collected.append(m2.group(2).strip())
                counter += 1
                if counter >= max_insns:
                    break
            result[addr] = collected
            if len(result) == len(target_set):
                break

    # V0.11.1: Fill in thumb-mode funcs with placeholder
    if addr_to_fn:
        for addr in target_addrs:
            if addr in result:
                continue
            f = addr_to_fn.get(f'0x{addr:08x}', {})
            mode = f.get('mode', 'arm')
            if mode == 'thumb':
                result[addr] = [
                    '(thumb mode — disasm-arm9-full.txt is ARM-only;',
                    ' V0.11.2 will parse thumb disasm separately)',
                ]
            else:
                # arm-mode but no disasm line found (shouldn't happen for arm)
                result[addr] = ['(no disasm line found at this addr)']
    return result


def bfs_forward(start_addr, caller_to_callees, callee_to_callers, addr_to_fn,
                max_depth=BFS_MAX_DEPTH, entry_window=ENTRY_ZONE_WINDOW):
    """Forward BFS, collecting (addr, depth).

    Pragmatic extension: 任何在 entry_window (= 128KB) 内的 BL-instruction caller
    都看作属于 entry_root — 因为 entry 是大 inline loop, V0.3 graph 的 caller 字段
    是 BL-instruction addr (不是 function addr), 必须聚合.

    Args:
        start_addr: 0x02008000 (ARM9 entry)
        entry_window: half-window around start_addr (default 128KB → 0x02000000..0x02010000 +
                                                         0x02010000..0x02020000 = 256KB treated
                                                         as entry vicinity)

    Returns:
        visited_depth: {addr: depth}
        synthetic_callees: dict mapping depth-N nodes to all their callees (raw)
    """
    # Aggregate callees from BL-instruction callers within entry window
    entry_zone_lo = start_addr - entry_window
    entry_zone_hi = start_addr + entry_window
    entry_bodied_callees = set()
    for caller_addr, callees in caller_to_callees.items():
        if entry_zone_lo <= caller_addr < entry_zone_hi:
            entry_bodied_callees.update(callees)

    visited_depth = {}
    parents = {}
    visited_depth[start_addr] = 0
    parents[start_addr] = None

    # depth 1 = entry_bodied_callees (entry_root children)
    # depth 2+ = their normal BFS

    def bfs_from(addr, depth, parents):
        """Standard BFS."""
        frontier = [addr]
        while frontier:
            next_frontier = []
            for a in frontier:
                cur_depth = visited_depth[a]
                if cur_depth >= depth + max_depth:
                    continue
                for callee in caller_to_callees.get(a, []):
                    if callee in visited_depth:
                        continue
                    visited_depth[callee] = cur_depth + 1
                    parents[callee] = a
                    next_frontier.append(callee)
            frontier = next_frontier

    # depth 1 = aggregated entry-bod
    for c in sorted(entry_bodied_callees):
        if c not in visited_depth:
            visited_depth[c] = 1
            parents[c] = start_addr

    # Standard BFS for depth >= 2
    frontier = list(entry_bodied_callees)
    while frontier:
        next_f = []
        for a in frontier:
            cur_depth = visited_depth[a]
            if cur_depth >= max_depth:
                continue
            for callee in caller_to_callees.get(a, []):
                if callee in visited_depth:
                    continue
                visited_depth[callee] = cur_depth + 1
                parents[callee] = a
                next_f.append(callee)
        frontier = next_f

    return visited_depth, parents


def reverse_bfs_to_root(target_addr, callee_to_callers, visited_depth, parents, max_depth=10):
    """For target_addr (a deep callee), find one shortest path back to ARM9_ENTRY.
    Uses callee_to_callers reverse index.

    Returns list of addrs from ENTRY → ... → target_addr.
    """
    path = [target_addr]
    cur = target_addr
    seen = {cur}
    for _ in range(max_depth):
        # pick any caller that we know is on the hot path
        callers_in_path = []
        for caller in callee_to_callers.get(cur, []):
            # Prefer caller that is closer to ENTRY (lower BFS-depth)
            if caller in visited_depth and caller not in seen:
                callers_in_path.append((visited_depth[caller], caller))
        if not callers_in_path:
            break
        callers_in_path.sort(key=lambda x: x[0])
        next_caller = callers_in_path[0][1]
        path.append(next_caller)
        seen.add(next_caller)
        cur = next_caller
        if cur == ARM9_ENTRY:
            break
    path.reverse()
    return path


def build_function_level_graph(calls, addr_to_fn, fn_starts_sorted, arm_end):
    """Build function-level forward + reverse graph by mapping each BL-insn caller
    to its containing function. Uses binary search on fn_starts_sorted.

    Returns (fn_to_callees, fn_to_callers).
    """
    def fn_containing(insn_addr):
        if insn_addr < 0x02000000 or insn_addr >= arm_end:
            return None
        lo, hi = 0, len(fn_starts_sorted)
        while lo < hi:
            mid = (lo + hi) // 2
            if fn_starts_sorted[mid] <= insn_addr:
                lo = mid + 1
            else:
                hi = mid
        if lo == 0:
            return None
        return fn_starts_sorted[lo - 1]

    fn_to_callees = defaultdict(set)
    fn_to_callers = defaultdict(set)
    for c in calls:
        caller = c['caller']
        callee = c['callee']
        caller_fn = fn_containing(caller)
        if caller_fn is None:
            continue
        fn_to_callees[caller_fn].add(callee)
        fn_to_callers[callee].add(caller_fn)

    return dict(fn_to_callees), dict(fn_to_callers)


def bfs_forward_function_level(start_addr, fn_to_callees, arm9_fn_starts,
                                arm_end, max_depth=5, entry_zone_lo=0x02008000,
                                entry_zone_hi=0x0200a000):
    """Forward BFS over function-level graph (V0.11.1 — was broken BL-instruction BFS).

    Args:
        start_addr: ARM9 entry (synthesized as depth-0 source)
        fn_to_callees: {fn_addr: set(callees)}
        arm9_fn_starts: sorted list of all ARM9 fn start addrs (for tier classifier)
        arm_end: ARM9 binary end (0x02108000)
        max_depth: BFS depth limit
        entry_zone_lo, entry_zone_hi: entry zone window addrs

    Returns:
        visited_depth: {addr: depth}
        parents: {addr: parent_fn_addr} for reverse-path
    """
    visited = {start_addr: 0}
    parents = {start_addr: None}

    # Depth 1 = all fn-callers in entry_zone (frame_loop tier)
    ez_callers = [a for a in fn_to_callees if entry_zone_lo <= a < entry_zone_hi]
    for ez in ez_callers:
        if ez not in visited:
            visited[ez] = 1
            parents[ez] = start_addr

    # Depth 2 = direct callees of depth-1 entry-zone funcs (subsystem tier)
    for ez in ez_callers:
        for c in fn_to_callees.get(ez, []):
            if c not in visited:
                visited[c] = 2
                parents[c] = ez

    # Standard BFS for depth 3+
    frontier = [a for a, d in visited.items() if d == 2]
    while frontier:
        next_f = []
        for a in frontier:
            cur = visited[a]
            if cur >= max_depth:
                continue
            for c in fn_to_callees.get(a, []):
                if c in visited:
                    continue
                visited[c] = cur + 1
                parents[c] = a
                next_f.append(c)
        frontier = next_f

    return visited, parents


def main():
    import argparse
    parser = argparse.ArgumentParser(description='V0.11 ARM9 BFS hot-path reachability')
    parser.add_argument('--max-depth', type=int, default=BFS_MAX_DEPTH,
                        help='Max BFS depth (default 5).')
    parser.add_argument('--entry-window', type=int, default=ENTRY_ZONE_WINDOW,
                        help='Entry zone window in bytes AFTER entry (default 8KB). '
                             'Total entry zone = [entry, entry + window).')
    args = parser.parse_args()

    print('== V0.11.1 ARM9 BFS hot-path reachability (function-level graph) ==', file=sys.stderr)
    print(f'  --max-depth={args.max_depth}  --entry-window={args.entry_window:#x}', file=sys.stderr)

    calls = load_calls()
    addr_to_fn = load_function_table()

    # Build function-level graph (V0.11.1 — replaces BL-instruction graph)
    arm9_fns = sorted([f for f in addr_to_fn.values() if f['cpu'] == 'arm9'],
                       key=lambda f: int(f['addr'], 16))
    arm9_fn_starts = [int(f['addr'], 16) for f in arm9_fns]
    ARM9_END = 0x02108000
    fn_to_callees, fn_to_callers = build_function_level_graph(
        calls, addr_to_fn, arm9_fn_starts, ARM9_END
    )

    print(f'  Total BL calls: {len(calls)}', file=sys.stderr)
    print(f'  Function-level callers: {len(fn_to_callees)}', file=sys.stderr)
    print(f'  Function-level callees: {len(fn_to_callers)}', file=sys.stderr)

    # Forward BFS over function-level graph
    entry_zone_lo = ARM9_ENTRY
    entry_zone_hi = ARM9_ENTRY + args.entry_window
    visited_depth, parents = bfs_forward_function_level(
        ARM9_ENTRY, fn_to_callees, arm9_fn_starts, ARM9_END,
        max_depth=args.max_depth,
        entry_zone_lo=entry_zone_lo, entry_zone_hi=entry_zone_hi,
    )

    print(f'  Reachable funcs (depth<={args.max_depth}): {len(visited_depth)}', file=sys.stderr)

    # Filter for sfloat + excluded
    reachable_no_sfloat = {}
    reachable_sfloat = {}
    for addr, depth in visited_depth.items():
        if is_sfloat(addr):
            reachable_sfloat[addr] = depth
        else:
            reachable_no_sfloat[addr] = depth

    print(f'  Non-sfloat reachable: {len(reachable_no_sfloat)}', file=sys.stderr)
    print(f'  Sfloat reachable: {len(reachable_sfloat)}', file=sys.stderr)

    # Tier classification
    by_tier = defaultdict(list)
    for addr, depth in visited_depth.items():
        if is_sfloat(addr):
            by_tier['sfloat'].append(addr)
        else:
            by_tier[tier_from_depth(depth)].append(addr)

    print('  Tier counts:', file=sys.stderr)
    for tier in ['entry_root', 'frame_loop', 'subsystem', 'worker', 'leaf_helper', 'sfloat']:
        print(f'    {tier:12s}: {len(by_tier.get(tier, []))}', file=sys.stderr)

    # First-disasm extractor for non-sfloat reached funcs
    targets = sorted(addr for addr in visited_depth if not is_sfloat(addr))
    print(f'  Extracting first_disasm for {len(targets)} targets...', file=sys.stderr)
    first_disasm = extract_first_disasm(DISASM_FILE, targets, max_insns=8, addr_to_fn=addr_to_fn)
    print(f'  Got first_disasm for {len(first_disasm)} addrs', file=sys.stderr)

    # Reverse-link catalog for top hot funcs (callers >= 10) — entry_zone callers
    top_hot_targets = []
    for addr, depth in visited_depth.items():
        if is_sfloat(addr):
            continue
        f = addr_to_fn.get(f'0x{addr:08x}')
        if not f:
            continue
        n = f.get('callers_n') or 0
        if n >= 10:
            top_hot_targets.append((addr, n))
    top_hot_targets.sort(key=lambda x: -x[1])
    top_hot_targets = top_hot_targets[:30]

    reverse_paths = {}
    for addr, _ in top_hot_targets:
        # entry_zone callers (callers FUNCTIONS in entry zone)
        callers = fn_to_callers.get(addr, [])
        entry_zone_callers = sorted(set(c for c in callers if entry_zone_lo <= c < entry_zone_hi))
        non_entry_zone_callers = sorted(set(callers) - set(entry_zone_callers))[:5]
        path = {
            'entry_zone_callers': ['0x{:08x}'.format(c) for c in entry_zone_callers[:5]],
            'total_entry_zone_callers': len(entry_zone_callers),
            'sample_other_callers': ['0x{:08x}'.format(c) for c in non_entry_zone_callers],
            'total_other_callers': len(set(callers)) - len(entry_zone_callers),
        }
        reverse_paths[f'0x{addr:08x}'] = path

    # 6. Build output
    tree = {
        'version': 'V0.11.1',
        'description': 'ARM9 BFS hot-path reachability from entry (ADR-011, V0.11.1 fixed entry_zone window)',
        'start_addr': '0x{:08x}'.format(ARM9_ENTRY),
        'bfs_max_depth': args.max_depth,
        'entry_zone_window': args.entry_window,
        'total_calls_in_graph': len(calls),
        'total_unique_callees_in_graph': len(fn_to_callers),
        'reachable_count': len(visited_depth),
        'reachable_no_sfloat_count': len(reachable_no_sfloat),
        'reachable_sfloat_count': len(reachable_sfloat),
        'tier_counts': {tier: len(addrs) for tier, addrs in by_tier.items()},
        'tiers': {},
        'depth_distribution': {},
        'top_hot_with_path': reverse_paths,
    }
    for tier in ['entry_root', 'frame_loop', 'subsystem', 'worker', 'leaf_helper', 'sfloat']:
        addrs = by_tier.get(tier, [])
        addrs_sorted = sorted(addrs, key=lambda a: visited_depth.get(a, 99))
        tree['tiers'][tier] = [
            {
                'addr': '0x{:08x}'.format(a),
                'depth': visited_depth.get(a, -1),
                'name': addr_to_fn.get(f'0x{a:08x}', {}).get('name', '?'),
                'category': addr_to_fn.get(f'0x{a:08x}', {}).get('category', '?'),
                'confidence': addr_to_fn.get(f'0x{a:08x}', {}).get('confidence', '?'),
                'callers_n': addr_to_fn.get(f'0x{a:08x}', {}).get('callers_n', 0),
                'is_known': addr_to_fn.get(f'0x{a:08x}', {}).get('is_known', False),
                'first_disasm': first_disasm.get(a, []),
            }
            for a in addrs_sorted
        ]

    # Depth distribution
    depth_buckets = defaultdict(int)
    for depth in visited_depth.values():
        depth_buckets[depth] += 1
    tree['depth_distribution'] = dict(depth_buckets)

    os.makedirs(ROM_DIR, exist_ok=True)
    with open(OUTPUT_TREE, 'w', encoding='utf-8') as f:
        json.dump(tree, f, indent=2, ensure_ascii=False)
    print(f'  wrote {OUTPUT_TREE}', file=sys.stderr)

    # 7. Build human-readable summary
    lines = []
    lines.append('V0.11.1 — ARM9 Hot-Path BFS Tree (ADR-011, entry_zone window = 8KB)')
    lines.append('=' * 70)
    lines.append(f'Start: 0x{ARM9_ENTRY:08x}  Max depth: {args.max_depth}  Entry window: {args.entry_window:#x}')
    lines.append(f'Reachable fns: {len(visited_depth)} (no_sfloat={len(reachable_no_sfloat)}, sfloat={len(reachable_sfloat)})')
    lines.append('')

    for tier in ['entry_root', 'frame_loop', 'subsystem', 'worker', 'leaf_helper', 'sfloat']:
        addrs = by_tier.get(tier, [])
        if not addrs:
            continue
        lines.append(f'### Tier: {tier} ({len(addrs)} funcs) ###')
        for a in sorted(addrs, key=lambda x: visited_depth.get(x, 99)):
            fn = addr_to_fn.get(f'0x{a:08x}', {})
            name = fn.get('name', '?')
            cat = fn.get('category', '?')
            conf = fn.get('confidence', '?')
            cn = fn.get('callers_n') or 0
            known = '*known*' if fn.get('is_known') else ''
            depth = visited_depth.get(a, -1)
            entry = f'  0x{a:08x} d={depth} cat={cat:18s} conf={conf:7s} callers={cn:4d} {known} {name}'
            lines.append(entry)
            # Add first 3 disasm lines as preview
            fd = first_disasm.get(a, [])
            for insn in fd[:3]:
                lines.append(f'      | {insn}')
        lines.append('')

    # Reverse path summary
    lines.append('### Top 30 hot funcs (callers >= 10) — entry_zone vs not ###')
    for addr_str, path in list(reverse_paths.items())[:30]:
        fn = addr_to_fn.get(addr_str, {})
        name = fn.get('name', '?')
        n = fn.get('callers_n') or 0
        ez = path['total_entry_zone_callers']
        other = path['total_other_callers']
        sample_ez = ','.join(path['entry_zone_callers'][:3])
        sample_other = ','.join(path['sample_other_callers'][:3])
        lines.append(f'  {addr_str} {name} callers={n} ez={ez} other={other}')
        lines.append(f'      entry_zone: {sample_ez}')
        lines.append(f'      non-ez:     {sample_other}')
    lines.append('')

    with open(OUTPUT_SUMMARY, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print(f'  wrote {OUTPUT_SUMMARY}', file=sys.stderr)

    print(f'\n== V0.11 done ==', file=sys.stderr)
    print(f'  total reachable: {len(visited_depth)}', file=sys.stderr)
    print(f'  output: {OUTPUT_TREE} + {OUTPUT_SUMMARY}', file=sys.stderr)


if __name__ == '__main__':
    main()

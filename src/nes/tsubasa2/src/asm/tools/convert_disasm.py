"""convert_disasm.py v3 - split by entry/data subfiles

Input:  _tmp_bzk_out/bank_NN/bank_NN_partMM.asm
Output: asm/bankNN/
    bankNN.s        - top file (.include all subs)
    entry_XXXX.s    - function starting at $XXXX (ends with RTS/RTI)
    data_XXXX.s     - data table (contiguous .byte, non-code)
"""
import os, re, sys
from pathlib import Path

LINE_RE = re.compile(
    r'^([CD\- ]+?)\s+0x([0-9A-Fa-f]+)\s+([0-9A-Fa-f]+):([0-9A-Fa-f]{4}):\s+([0-9A-Fa-f ]+?)\s{2,}(.*)$')
DATA_RE = re.compile(
    r'^([CD\- ]+?)\s+0x([0-9A-Fa-f]+)\s+([0-9A-Fa-f]+):([0-9A-Fa-f]{4}):\s+([0-9A-Fa-f ]+?)\s{2,}\.byte\s+(.*)$')

BRANCH_OPS = {'BCC','BCS','BEQ','BMI','BNE','BPL','BVC','BVS'}


def parse_line(line):
    line = line.rstrip()
    if not line.strip():
        return None
    m = DATA_RE.match(line)
    if m:
        return {'is_code': 'C' in m.group(1), 'cpu': int(m.group(4), 16),
                'bytes': [int(b, 16) for b in m.group(5).split()],
                'mn': '.byte', 'op': m.group(6).split(';')[0].strip(), 'raw': line}
    m = LINE_RE.match(line)
    if not m:
        return None
    operand = m.group(6).strip()
    if ';' in operand:
        operand = operand.split(';', 1)[0].strip()
    parts = operand.split(None, 1)
    return {'is_code': 'C' in m.group(1), 'cpu': int(m.group(4), 16),
            'bytes': [int(b, 16) for b in m.group(5).split()],
            'mn': parts[0] if parts else '', 'op': parts[1].strip() if len(parts) > 1 else '',
            'raw': line}


def get_target(op):
    if not op:
        return None
    m = re.match(r'\$([0-9A-Fa-f]{4})', op)
    return int(m.group(1), 16) if m else None


def norm_op(op):
    if not op:
        return op
    op = re.sub(r'ram_([0-9A-Fa-f]{4})\b', r'$\1', op)
    op = re.sub(r'\b[bBdD]:\s*', '', op)
    return op


def convert_bank(bn, src_dir, asm_root):
    bank_name = f'bank_{bn:02d}'
    src_bank_dir = Path(src_dir) / bank_name
    if not src_bank_dir.exists():
        return 0, f'skip {bank_name} not exist'
    parts = sorted(src_bank_dir.glob(f'{bank_name}_part*.asm'))
    if not parts:
        return 0, f'skip {bank_name} no parts'

    # Pass A: parse all lines
    entries = []
    for pf in parts:
        with open(pf, encoding='utf-8') as f:
            for line in f:
                e = parse_line(line)
                if e:
                    entries.append(e)
    entries.sort(key=lambda x: x['cpu'])
    if not entries:
        return 0, f'bank{bn:02d} empty'

    cpu_base = 0xC000 if bn == 30 else 0xE000 if bn == 31 else 0x8000
    seg_name = f'PRG_BANK{bn:02d}'
    bank_end = cpu_base + 0x2000
    addr_map = {e['cpu']: e for e in entries}
    entries_set = set(addr_map.keys())

    # Pass B: collect entry points (JSR/JMP targets in-bank)
    entry_points = set()
    for e in entries:
        if not e['is_code'] or e['mn'] == '.byte':
            continue
        mn = e['mn'].upper()
        if mn in ('JSR', 'JMP'):
            tgt = get_target(e['op'])
            if tgt is not None and tgt in entries_set:
                entry_points.add(tgt)
    if bn == 31:
        entry_points.add(0xFFF0)
    if bn == 30:
        entry_points.update([0xC000, 0xC503])
    entry_points.add(min(entries_set))

    # Pass C: trace functions from each entry
    functions = {}
    visited = set()

    def trace(entry):
        body = []
        cur = entry
        seen = set()
        while cur in addr_map:
            if cur in seen:
                break
            seen.add(cur)
            e = addr_map[cur]
            if not e['is_code'] or e['mn'] == '.byte':
                break
            body.append(cur)
            mn = e['mn'].upper()
            if mn in BRANCH_OPS:
                tgt = get_target(e['op'])
                if tgt is not None and tgt in entries_set:
                    entry_points.add(tgt)
            if mn in ('RTS', 'RTI', 'BRK'):
                break
            if mn == 'JMP':
                tgt = get_target(e['op'])
                if tgt is not None and tgt in entries_set and tgt not in seen:
                    cur = tgt
                    continue
                break
            cur = e['cpu'] + len(e['bytes'])
        return body

    pending = sorted(entry_points)
    while pending:
        ep = pending.pop(0)
        if ep in functions:
            continue
        body = trace(ep)
        if body:
            functions[ep] = body
            visited.update(body)
        new = [t for t in entry_points if t not in functions and t not in visited and t not in pending]
        pending.extend(sorted(new))

    # Pass D: orphan code -> single-instr functions
    for a in sorted(entries_set):
        if a in visited:
            continue
        e = addr_map[a]
        if e['is_code'] and e['mn'] != '.byte':
            functions.setdefault(a, []).append(a)
            visited.add(a)

    # Pass E: output
    dst_dir = Path(asm_root) / f'bank{bn:02d}'
    dst_dir.mkdir(parents=True, exist_ok=True)
    for old in list(dst_dir.glob('entry_*.s')) + list(dst_dir.glob('data_*.s')):
        old.unlink()

    sub_files = []
    for entry_addr in sorted(functions.keys()):
        body = functions[entry_addr]
        fname = f'entry_{entry_addr:04X}.s'
        fpath = dst_dir / fname
        with open(fpath, 'w', encoding='utf-8', newline='\n') as f:
            f.write(f'; entry ${entry_addr:04X} (bank {bn}) len={len(body)}\n\n')
            f.write(f'.org ${entry_addr:04X}\n')
            f.write(f'L_{entry_addr:04X}:\n')
            for addr in body:
                e = addr_map[addr]
                if addr in entry_points and addr != entry_addr:
                    f.write(f'L_{addr:04X}:\n')
                if e['mn'] == '.byte':
                    bs = ','.join(f'${b:02X}' for b in e['bytes'])
                    f.write(f'    .byte {bs:<24}; ${addr:04X}\n')
                else:
                    op = norm_op(e['op'])
                    tgt = get_target(e['op'])
                    if tgt is not None and tgt in entry_points:
                        op = re.sub(r'\$' + f'{tgt:04X}', f'L_{tgt:04X}', op, count=1)
                    line = f'    {e["mn"]} {op}' if op else f'    {e["mn"]}'
                    f.write(f'{line:<30}; ${addr:04X}\n')
        sub_files.append(fname)

    # data subfiles
    data_files = []
    data_addrs = sorted(a for a in entries_set if a not in visited)
    if data_addrs:
        segs = []
        cur_seg = [data_addrs[0]]
        for a in data_addrs[1:]:
            prev = addr_map.get(cur_seg[-1])
            expected = cur_seg[-1] + (len(prev['bytes']) if prev else 1)
            if a == expected:
                cur_seg.append(a)
            else:
                segs.append(cur_seg)
                cur_seg = [a]
        segs.append(cur_seg)

        for seg in segs:
            start = seg[0]
            fname = f'data_{start:04X}.s'
            fpath = dst_dir / fname
            with open(fpath, 'w', encoding='utf-8', newline='\n') as f:
                f.write(f'; data ${start:04X} (bank {bn}) len={len(seg)}\n\n')
                f.write(f'.org ${start:04X}\n')
                f.write(f'D_{start:04X}:\n')
                all_bytes = []
                for addr in seg:
                    all_bytes.extend(addr_map[addr]['bytes'])
                for i in range(0, len(all_bytes), 16):
                    chunk = all_bytes[i:i+16]
                    f.write('    .byte ' + ','.join(f'${b:02X}' for b in chunk) + '\n')
            data_files.append(fname)

    # top bankNN.s
    top = dst_dir / f'bank{bn:02d}.s'
    with open(top, 'w', encoding='utf-8', newline='\n') as f:
        f.write(f'; bank{bn:02d}.s - bank {bn} ({cpu_base:04X}-{bank_end-1:04X})\n')
        f.write(f'; functions={len(functions)} data_segs={len(data_files)}\n\n')
        f.write(f'.segment "{seg_name}"\n\n')
        if sub_files:
            f.write(f'; --- functions ({len(sub_files)}) ---\n')
            for sf in sub_files:
                f.write(f'.include "{sf}"\n')
        if data_files:
            f.write(f'\n; --- data ({len(data_files)}) ---\n')
            for df in data_files:
                f.write(f'.include "{df}"\n')

    return len(entries), f'bank{bn:02d}: entries={len(entries)} funcs={len(functions)} data={len(data_files)}'


def main():
    print('convert_disasm v3')
    src_dir = r'd:\studio\github\monkeycode\src\nes\tsubasa2\_tmp_bzk_out'
    asm_root = r'd:\studio\github\monkeycode\src\nes\tsubasa2\asm'
    if len(sys.argv) > 1:
        banks = [int(re.match(r'bank_(\d+)', a).group(1) if re.match(r'bank_(\d+)', a) else a) for a in sys.argv[1:]]
    else:
        banks = list(range(32))
    total = 0
    for n in banks:
        try:
            cnt, msg = convert_bank(n, src_dir, asm_root)
            total += cnt
            print('  ' + msg)
        except Exception as e:
            import traceback
            print('  bank%02d ERROR: %s' % (n, e))
            traceback.print_exc()
    print('done: %d' % total)


if __name__ == '__main__':
    main()

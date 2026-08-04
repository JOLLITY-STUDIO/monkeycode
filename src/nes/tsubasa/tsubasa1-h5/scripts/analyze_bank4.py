"""Analyze Bank 4 structure - match event processing"""
import re, sys
from collections import Counter

path = "_tmp_disasm_out/banks/bank_04_code.asm"
data = open(path, encoding='utf-8').read()
lines = data.split('\n')

# 1. Find C05B and C107 locations
print("=== Key entry points ===")
for addr in ['C05B', 'C107', 'C064', 'C3C7', 'C3BD', 'C3D9', 'C3F9', 'C4', 'C7', 'C8']:
    hits = [l for l in lines if re.search(rf'04:{addr}:', l)]
    if hits:
        for h in hits[:3]:
            print(f"  {h.strip()}")

print()

# 2. RAM addresses in $0600-$06FF used >= 3 times
print("=== Key RAM ($0600-$06FF) used by Bank 4 ===")
rams = {}
for m in re.finditer(r'ram_([0-9A-F]{4})', data):
    r = m.group(1)
    rams[r] = rams.get(r, 0) + 1

for addr_str, count in sorted(rams.items(), key=lambda x: r'x{:04X}'.format(int(x[0], 16))):
    addr = int(addr_str, 16)
    if 0x0600 <= addr < 0x0700 and count >= 3:
        # Find context lines
        ctx = [l for l in lines if f'ram_{addr_str}' in l]
        # Get first LDA/STA usage
        for cl in ctx:
            m2 = re.search(r'LDA|STA|INC|DEC|LDX|STX|CMP|AND|ORA|EOR|BIT', cl)
            if m2:
                print(f"  ${addr_str}: {count}x refs")
                break
        else:
            if ctx:
                print(f"  ${addr_str}: {count}x refs (data only)")

print()

# 3. JSR $8017 jump tables in Bank 4
print("=== JSR $8017 indirect dispatch tables ===")
in_table = False
table_entries = []
for i, l in enumerate(lines):
    if 'JSR $8017' in l and '04:' in l:
        in_table = True
        print(f"  Line {i+1}: {l.strip()}")
        table_entries = []
        continue
    if in_table:
        if '.byte' in l and '04:' in l:
            table_entries.append(l.strip())
        else:
            if table_entries:
                for te in table_entries[:8]:
                    print(f"    -> {te}")
                if len(table_entries) > 8:
                    print(f"    ... ({len(table_entries)} entries total)")
            in_table = False

print()

# 4. Function boundaries (RTS lines, count functions)
print("=== Code statistics ===")
code_lines = [l for l in lines if re.match(r'^C\s+-.*04:', l)]
rts_count = sum(1 for l in code_lines if 'RTS' in l)
jmp_count = sum(1 for l in code_lines if 'JMP' in l)
jsr_count = sum(1 for l in code_lines if 'JSR' in l)
print(f"  Code lines: {len(code_lines)}")
print(f"  RTS: {rts_count}, JSR: {jsr_count}, JMP: {jmp_count}")
print(f"  Total lines: {len(lines)}")

# 5. Search for key match-related constants
print()
print("=== Key constants/values ===")
consts = Counter()
for l in code_lines:
    m = re.search(r'LDA\s+#\$(\w+)', l)
    if m:
        consts[m.group(1)] += 1
for k, v in consts.most_common(30):
    print(f"  LDA #${k}: {v}x")

# 6. Check what addresses are called from Bank 0 (cross-bank calls)
print()
print("=== Cross-bank references (likely Bank 0 utility functions) ===")
bank0_funcs = ['8005', '8017', '8020', '8026', '801D', '8014', '8059']
for f in bank0_funcs:
    count = data.count(f'JSR ${f}')
    if count > 0:
        print(f"  JSR ${f}: {count}x")

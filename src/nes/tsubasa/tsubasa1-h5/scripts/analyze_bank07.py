#!/usr/bin/env python3
"""Analyze Bank 7 (fixed bank) structure from disassembly"""
import re, sys

bank_file = "_tmp_disasm_out/banks/bank_07_fixed.asm"

sections = []  # (line_no, addr, type, content)
current_code = None
code_start = None
code_lines = []
data_regions = []

with open(bank_file, 'r', encoding='utf-8', errors='replace') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    # Match lines with address info
    m = re.search(r'0x[0-9A-F]+ 07:([0-9A-F]{4}):', line)
    if not m:
        continue
    cpu_addr = int(m.group(1), 16)
    
    # Check if it's code (C flag) or data
    is_code = line.startswith('C ')
    has_label = bool(re.search(r'loc_|sub_|tbl_|ofs_|LABEL|L_', line))
    
    if is_code:
        if current_code is None:
            current_code = {'start': i+1, 'addr': cpu_addr, 'lines': []}
        current_code['lines'].append(line.rstrip())
    else:
        if current_code is not None:
            current_code['end'] = i
            current_code['end_addr'] = prev_addr
            current_code['count'] = len(current_code['lines'])
            sections.append(current_code)
            current_code = None
        
        # Track data regions with non-zero data
        if '00        .byte $00' not in line and '00  ' not in line[:20]:
            data_regions.append((i+1, cpu_addr, line.rstrip()))
    
    prev_addr = cpu_addr

# Don't forget last code section
if current_code is not None:
    current_code['end'] = len(lines)
    current_code['end_addr'] = prev_addr
    current_code['count'] = len(current_code['lines'])
    sections.append(current_code)

print("=" * 70)
print("BANK 7 (FIXED BANK $C000-$FFFF) STRUCTURE ANALYSIS")
print("=" * 70)

print(f"\nTotal lines: {len(lines)}")
print(f"Code sections: {len(sections)}")
print(f"Non-zero data entries: {len(data_regions)}")

print("\n--- CODE SECTIONS ---")
for s in sections:
    print(f"  Lines {s['start']}-{s['end']}: ${s['addr']:04X}-${s['end_addr']:04X} ({s['count']} instructions)")

print("\n--- NON-ZERO DATA REGIONS (first 50) ---")
for dr in data_regions[:50]:
    print(f"  Line {dr[0]}: ${dr[1]:04X} - {dr[2][:80]}")

# Group data regions by address ranges
print("\n--- DATA REGION CLUSTERS ---")
clusters = []
cluster_start = None
cluster_end = None
for dr in data_regions:
    if cluster_start is None:
        cluster_start = dr
        cluster_end = dr
    elif dr[1] - cluster_end[1] <= 4:
        cluster_end = dr
    else:
        clusters.append((cluster_start, cluster_end))
        cluster_start = dr
        cluster_end = dr
if cluster_start:
    clusters.append((cluster_start, cluster_end))

for cs, ce in clusters:
    size = ce[1] - cs[1] + 1
    if size > 3:
        print(f"  ${cs[1]:04X}-${ce[1]:04X} ({size} bytes non-zero data)")

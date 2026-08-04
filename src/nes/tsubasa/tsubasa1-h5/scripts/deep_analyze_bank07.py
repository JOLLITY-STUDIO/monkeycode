#!/usr/bin/env python3
"""Deep analysis of Bank 7 data structure patterns"""
import re, struct
from collections import Counter

bank_file = "_tmp_disasm_out/banks/bank_07_fixed.asm"

with open(bank_file, 'r', encoding='utf-8', errors='replace') as f:
    lines = f.readlines()

bytes_data = []
for line in lines:
    m = re.search(r'07:([0-9A-F]{4}):\s+([0-9A-F]{2})\s', line)
    if m:
        addr = int(m.group(1), 16)
        byte_val = int(m.group(2), 16)
        bytes_data.append((addr, byte_val))

# Look for 16-bit pointer patterns (little-endian addresses in range $8000-$FFFF)
print("=" * 70)
print("POINTER TABLE ANALYSIS (2-byte LE pointers)")
print("=" * 70)

# Scan for sequences that look like pointer tables
# A pointer table has values where:
# - byte pairs form addresses mostly in $8000-$FFFF
# - consecutive pairs don't vary wildly
ptr_tables = []
i = 0
while i < len(bytes_data) - 1:
    lo = bytes_data[i][1]
    hi = bytes_data[i+1][1]
    addr_val = lo | (hi << 8)
    
    # Check if this could be a pointer into ROM space ($8000-$FFFF)
    if 0x8000 <= addr_val <= 0xFFFF:
        # Check next few entries
        count = 1
        j = i + 2
        valid_ptrs = [addr_val]
        while j < len(bytes_data) - 1 and count < 100:
            lo2 = bytes_data[j][1]
            hi2 = bytes_data[j+1][1]
            addr2 = lo2 | (hi2 << 8)
            if 0x8000 <= addr2 <= 0xFFFF:
                count += 1
                valid_ptrs.append(addr2)
                j += 2
            else:
                break
        
        if count >= 3:  # At least 3 consecutive valid pointers
            ptr_tables.append((bytes_data[i][0], count, valid_ptrs))
            i = j
            continue
    i += 1

print(f"Found {len(ptr_tables)} potential pointer tables\n")
for start_addr, count, ptrs in ptr_tables[:20]:
    print(f"  ${start_addr:04X}: {count} pointers, first={ptrs[0]:04X} last={ptrs[-1]:04X}")
    # Show first 6 pointers
    ptr_str = ' '.join(f'${p:04X}' for p in ptrs[:6])
    print(f"    -> {ptr_str}")

# Byte frequency analysis by 256-byte pages
print("\n" + "=" * 70)
print("BYTE DISTRIBUTION BY 256-BYTE PAGE")
print("=" * 70)

page_entropy = {}
for addr, val in bytes_data:
    page = addr >> 8
    if page not in page_entropy:
        page_entropy[page] = Counter()
    page_entropy[page][val] += 1

for page in range(0xC0, 0x100):
    if page in page_entropy:
        c = page_entropy[page]
        unique = len(c)
        most_common = c.most_common(3)
        mc_str = ', '.join(f'${v:02X}x{n}' for v, n in most_common)
        zero_count = c.get(0, 0)
        print(f"  ${page:02X}00: {256} bytes, {unique} unique, zeros={zero_count}, top: {mc_str}")

# Analyze structure of large data clusters
print("\n" + "=" * 70)
print("LARGE DATA CLUSTER STRUCTURE")
print("=" * 70)

# The main cluster: $E306-$FA32 (5933 bytes)
# Look for repeating patterns
offset_start = 0xE306 - 0xC000
offset_end = 0xFA33 - 0xC000

# Sample the first 256 bytes
print(f"\nCluster $E306-$FA32 ({offset_end-offset_start} bytes)")
print("First 256 bytes hex dump:")
for i in range(offset_start, min(offset_start+256, len(bytes_data))):
    if (i - offset_start) % 16 == 0:
        print(f"\n  ${bytes_data[i][0]:04X}: ", end='')
    print(f"{bytes_data[i][1]:02X} ", end='')
print()

# Check for structured records (fixed-length entries)
print("\nLooking for fixed-width record patterns...")
for rec_size in [4, 6, 8, 12, 16, 32]:
    sample_records = []
    for start_off in range(offset_start, offset_end - rec_size, rec_size):
        record = [bytes_data[start_off + k][1] for k in range(rec_size)]
        sample_records.append(record)
    if len(sample_records) > 5:
        # Check if first byte of each record has limited range
        first_bytes = [r[0] for r in sample_records[:50]]
        unique_first = len(set(first_bytes))
        zero_bytes = sum(1 for r in sample_records[:50] if all(b == 0 for b in r))
        if unique_first <= 30:
            print(f"  Record size {rec_size}: {len(sample_records)} records, "
                  f"first_byte unique={unique_first}/50, all-zero={zero_bytes}/50")

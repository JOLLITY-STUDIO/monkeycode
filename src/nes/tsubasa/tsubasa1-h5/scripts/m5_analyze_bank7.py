#!/usr/bin/env python3
"""M5: Deep Bank 7 analysis - find data segments and structure"""
import re
import os

def analyze():
    bank_file = os.path.join(os.path.dirname(__file__), '..', '_tmp_disasm_out', 'banks', 'bank_07_fixed.asm')
    with open(bank_file, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()

    # Extract all bytes with CDL markers
    lines = content.split('\n')
    bytes_data = []
    for line in lines:
        m = re.match(r'^([- CD]+)\s+0x01C[0-9A-F]{3}\s+07:([0-9A-F]{4}):\s+([0-9A-F]{2})', line)
        if m:
            cdl = m.group(1).strip()
            addr = int(m.group(2), 16)
            val = int(m.group(3), 16)
            bytes_data.append((addr, val, cdl))

    print(f"Total bytes: {len(bytes_data)}")
    
    # CDL stats
    d_count = sum(1 for _, _, c in bytes_data if 'D' in c)
    c_count = sum(1 for _, _, c in bytes_data if 'C' in c)
    unused = sum(1 for _, _, c in bytes_data if c == '- - -')
    print(f"D (data): {d_count}, C (code): {c_count}, unused: {unused}")

    # Find contiguous non-zero segments > 16 bytes
    print("\n=== Contiguous non-zero segments (>16 bytes) ===")
    segments = []
    start = None
    prev = None
    for addr, val, _ in bytes_data:
        if val != 0:
            if start is None:
                start = addr
                prev = addr
            elif addr == prev + 1:
                prev = addr
            else:
                seg_size = prev - start + 1
                if seg_size > 16:
                    segments.append((start, prev, seg_size))
                start = addr
                prev = addr
    if start and prev and prev - start + 1 > 16:
        segments.append((start, prev, prev - start + 1))

    for s, e, sz in segments:
        print(f"  ${s:04X}-${e:04X}: {sz} bytes")

    # Analyze the largest segment ($E306-$F968, 5731 bytes)
    print("\n=== Largest segment: $E306-$F968 ===")
    seg_data = [(a, v) for a, v, _ in bytes_data if 0xE306 <= a <= 0xF968]
    print(f"Size: {len(seg_data)} bytes")

    # Show first 128 bytes in hex and ascii
    print("\nFirst 128 bytes:")
    for i in range(0, 128, 16):
        chunk = seg_data[i:i+16]
        hex_str = ' '.join(f'{v:02X}' for _, v in chunk)
        ascii_str = ''.join(chr(v) if 0x20 <= v < 0x7f else '.' for _, v in chunk)
        print(f"  ${chunk[0][0]:04X}: {hex_str}  {ascii_str}")

    # Look for structured records: values that repeat every N bytes
    print("\n=== Looking for record structure ===")
    for rec_size in [4, 6, 8, 12, 16]:
        values_by_offset = {i: [] for i in range(rec_size)}
        for i in range(0, len(seg_data) - rec_size, rec_size):
            for j in range(rec_size):
                values_by_offset[j].append(seg_data[i+j][1])
        # Check uniqueness
        uniques = [len(set(values_by_offset[j][:50])) for j in range(rec_size)]
        print(f"  Rec size {rec_size}: byte uniqueness = {uniques}")

    # Analyze the pointer table at $C000
    print("\n=== Pointer table at $C000 ===")
    ptr_entries = []
    for i in range(0, 44, 2):
        lo_addr = 0xC000 + i
        hi_addr = 0xC000 + i + 1
        lo = next((v for a, v, _ in bytes_data if a == lo_addr), None)
        hi = next((v for a, v, _ in bytes_data if a == hi_addr), None)
        if lo is not None and hi is not None:
            ptr = lo | (hi << 8)
            if 0xC000 <= ptr <= 0xFFBF:
                ptr_entries.append((i//2, ptr))
    print(f"Found {len(ptr_entries)} valid pointers:")
    for idx, ptr in ptr_entries:
        offset = ptr - 0xC000
        print(f"  [{idx:2d}] -> ${ptr:04X} (offset ${offset:04X})")

if __name__ == '__main__':
    analyze()

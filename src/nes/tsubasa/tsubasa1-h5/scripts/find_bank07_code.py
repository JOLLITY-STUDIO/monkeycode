#!/usr/bin/env python3
"""Find potential code in Bank 7 by looking for common 6502 opcode patterns"""
import re, sys

bank_file = "_tmp_disasm_out/banks/bank_07_fixed.asm"

# Common 6502 opcode bytes that suggest code
code_indicators = {
    0x60: 'RTS', 0x4C: 'JMP abs', 0x6C: 'JMP ind',
    0x20: 'JSR', 0xA9: 'LDA #', 0xA2: 'LDX #', 0xA0: 'LDY #',
    0x85: 'STA zp', 0x86: 'STX zp', 0x84: 'STY zp',
    0xA5: 'LDA zp', 0xA6: 'LDX zp', 0xA4: 'LDY zp',
    0x8D: 'STA abs', 0xAD: 'LDA abs', 0x18: 'CLC', 0xD8: 'CLD',
    0x78: 'SEI', 0x58: 'CLI', 0x48: 'PHA', 0x68: 'PLA',
    0x08: 'PHP', 0x28: 'PLP', 0xAA: 'TAX', 0x8A: 'TXA',
    0xA8: 'TAY', 0x98: 'TYA', 0xCA: 'DEX', 0x88: 'DEY',
    0xE8: 'INX', 0xC8: 'INY', 0xC9: 'CMP #', 0xD0: 'BNE',
    0xF0: 'BEQ', 0x10: 'BPL', 0x30: 'BMI', 0x50: 'BVC',
    0x70: 'BVS', 0x90: 'BCC', 0xB0: 'BCS', 0xC6: 'DEC zp',
    0xE6: 'INC zp', 0x29: 'AND #', 0x09: 'ORA #',
    0x4A: 'LSR A', 0x0A: 'ASL A', 0x2A: 'ROL A', 0x6A: 'ROR A',
    0xEA: 'NOP', 0x40: 'RTI', 0x38: 'SEC', 0xE0: 'CPX #',
    0xC0: 'CPY #', 0x01: 'ORA (zp,x)', 0x21: 'AND (zp,x)',
    0x41: 'EOR (zp,x)', 0x81: 'STA (zp,x)', 0xA1: 'LDA (zp,x)',
    0x91: 'STA (zp),y', 0xB1: 'LDA (zp),y', 0x65: 'ADC zp',
    0x69: 'ADC #', 0x6D: 'ADC abs', 0xE5: 'SBC zp',
}

# Code subsequence patterns (2-3 bytes) that indicate code
code_patterns = [
    (0x20, None, None),   # JSR
    (0x4C, None, None),   # JMP
    (0x60, None, None),   # RTS  
    (0x40, None, None),   # RTI
    (0xA9, None, 0x8D),   # LDA # → STA abs
    (0xA2, None, 0x8E),   # LDX # → STX abs
    (0xA0, None, 0x8C),   # LDY # → STY abs
    (0x20, None, 0x60),   # JSR → RTS (routine boundary)
]

with open(bank_file, 'r', encoding='utf-8', errors='replace') as f:
    content = f.read()

# Extract all byte values with their addresses
bytes_data = []
for line in content.split('\n'):
    m = re.search(r'07:([0-9A-F]{4}):\s+([0-9A-F]{2})\s', line)
    if m:
        addr = int(m.group(1), 16)
        byte_val = int(m.group(2), 16)
        bytes_data.append((addr, byte_val, line.rstrip()))

print(f"Total bytes in Bank 7: {len(bytes_data)}")

# Find potential subroutine starts (addresses that are targets of JSR/JMP or after RTS)
# First pass: collect all addresses that look like they could start code
potential_code_starts = set()

for i, (addr, val, line) in enumerate(bytes_data):
    if val in code_indicators:
        # Found common opcode - mark this as potential code start
        if val in (0x20, 0x4C, 0x6C):
            # JSR/JMP - look at target
            if i + 2 < len(bytes_data):
                target_lo = bytes_data[i+1][1]
                target_hi = bytes_data[i+2][1]
                target = target_lo | (target_hi << 8)
                if 0xC000 <= target <= 0xFFFF:
                    potential_code_starts.add(target)
            if val == 0x20:  # JSR - next instruction is also code
                if i + 3 < len(bytes_data):
                    potential_code_starts.add(bytes_data[i+3][0])

# Second pass: find RTS/RTI boundaries  
for i, (addr, val, line) in enumerate(bytes_data):
    if val in (0x60, 0x40):
        if i + 1 < len(bytes_data):
            potential_code_starts.add(bytes_data[i+1][0])

# Also add addresses that appear in the byte stream as JMP targets (high bytes like $C0, $C1, etc.)
# Scan for $C0, $C1, $C2... $FF as potential JMP/JSR target high bytes
for i, (addr, val, line) in enumerate(bytes_data):
    if i >= 2:
        prev2 = bytes_data[i-2][1]
        prev1 = bytes_data[i-1][1]
        # Check if prev2 is JSR/JMP opcode
        if prev2 in (0x20, 0x4C, 0x6C):
            target = prev1 | (val << 8)
            if 0xC000 <= target <= 0xFFFF:
                potential_code_starts.add(target)

# Print results
sorted_starts = sorted(potential_code_starts)
print(f"\nPotential code entry points: {len(sorted_starts)}")
print("=" * 70)

# Group nearby entries
groups = []
current_group = [sorted_starts[0]] if sorted_starts else []
for addr in sorted_starts[1:]:
    if addr - current_group[-1] <= 8:
        current_group.append(addr)
    else:
        groups.append(current_group)
        current_group = [addr]
if current_group:
    groups.append(current_group)

for g in groups:
    if len(g) == 1:
        print(f"  ${g[0]:04X}")
    else:
        print(f"  ${g[0]:04X}-${g[-1]:04X}  ({len(g)} entries)")

# Now show actual byte values around each potential start
print("\n" + "=" * 70)
print("CODE CANDIDATES (first 8 bytes at each entry)")
print("=" * 70)
for addr in sorted_starts[:30]:
    offset = addr - 0xC000
    if 0 <= offset < len(bytes_data):
        chunk = bytes_data[offset:offset+8]
        hex_str = ' '.join(f'{v[1]:02X}' for v in chunk)
        ascii_str = ''.join(chr(v[1]) if 32 <= v[1] < 127 else '.' for v in chunk)
        # Check if this looks like real code
        ops = []
        for v in chunk:
            op = code_indicators.get(v[1], '')
            if op:
                ops.append(op)
        score = len(ops)
        print(f"  ${addr:04X}: {hex_str}  |{ascii_str}|  score={score}  {' '.join(ops)}")

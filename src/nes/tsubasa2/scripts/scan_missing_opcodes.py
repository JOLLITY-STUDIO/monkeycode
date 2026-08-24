import sys, os
sys.path.insert(0, r"d:\studio\github\monkeycode\src\nes\tools\NESgen\NESgen\NESgen")
import MOS6502Instructions as M

rom = r"d:\studio\github\monkeycode\src\nes\tsubasa2\debug\nesgen\tsubasa2_ines1.nes"
with open(rom, "rb") as f:
    data = f.read()

missing = set()
for b in data[0x10:]:
    if b not in M.MOS_INSTRUCTION_DEFINITIONS:
        missing.add(b)

print(f"total distinct opcodes used in ROM: {len(set(data[0x10:]))}")
print(f"missing opcodes used in ROM ({len(missing)}):")
print(" ".join(f"{b:#04x}" for b in sorted(missing)))

# 也检查定义表中注册的 opcode 总数
print(f"defined opcodes: {len(M.MOS_INSTRUCTION_DEFINITIONS)}")

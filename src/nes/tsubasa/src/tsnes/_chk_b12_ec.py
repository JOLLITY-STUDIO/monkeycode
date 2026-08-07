"""Check for $EC command in Sound 3 track data"""
import re

with open(r"d:\studio\github\monkeycode\src\nes\tsubasa\src\tsnes\rom-data\prg-bank-12.ts", "r", encoding="utf-8") as f:
    nums = [int(x, 16) for x in re.findall(r"0x([0-9A-Fa-f]+)", f.read())]

def b12(a): return a - 0x8000

# Sound 3 pointer
ptr3 = nums[b12(0x8BE0)] | (nums[b12(0x8BE0) + 1] << 8)

# Sound 3 init list: 00 92 8E 01 92 8E 03 93 8E FF
# After FF, data starts at +10 (9 bytes of channels + 1 terminator)
# ch3 track ptr = nums[b12(ptr3)+7] | (nums[b12(ptr3)+8] << 8)
# That's: nums[b12(0x8E89)+7] = nums[b12(0x8E89)+7]
# ptr3=0x8E89 → b12(ptr3)=0x0E89
ch3_lo = nums[0x0E89 + 7]
ch3_hi = nums[0x0E89 + 8]
ch3_track = ch3_lo | (ch3_hi << 8)
print(f"Sound 3 ch3 track ptr=${ch3_track:04X} (bank off=${b12(ch3_track):04X})")

# Read first 512 bytes from ch3 track
start = b12(ch3_track)
ec_count = 0
print(f"\nFirst 512 bytes from ch3 track:")
for i in range(512):
    b = nums[start + i]
    tag = ""
    if b >= 0xE0: tag = " ← CMD"
    elif b >= 0x80 and b < 0xE0: tag = " ← NOTE"
    if b == 0xEC:
        ec_count += 1
        tag += "  ★★ $EC (channel type activate!)"
    print(f"  +{i:03d}: ${b:02X} ({b:3d}){tag}")

print(f"\n$EC command count in first 512 bytes: {ec_count}")

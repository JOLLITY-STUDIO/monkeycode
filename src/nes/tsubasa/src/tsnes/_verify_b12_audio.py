"""验证 Bank12 音频指针链和数据加载"""
import re, json

# 1. 读取 prg-bank-12.ts 的原始字节
with open(r"d:\studio\github\monkeycode\src\nes\tsubasa\src\tsnes\rom-data\prg-bank-12.ts", "r", encoding="utf-8") as f:
    raw = f.read()
nums = [int(x, 16) for x in re.findall(r"0x([0-9A-Fa-f]+)", raw)]
print(f"Bank12 bytes loaded: {len(nums)}")

def b12(addr):
    """CPU $8000-$9FFF 映射到 bank 内偏移"""
    return addr - 0x8000

# ── SE_MAP = 0x8BDA ──
SE_MAP = 0x8BDA
print(f"\n=== SE_MAP at CPU ${SE_MAP:04X} (bank offset ${b12(SE_MAP):04X}) ===")
for i in range(32):
    lo = nums[b12(SE_MAP) + i * 2]
    hi = nums[b12(SE_MAP) + i * 2 + 1]
    ptr = lo | (hi << 8)
    if ptr == 0xFF00:
        break
    print(f"  Sound {i:02d}: ${SE_MAP + i*2:04X} = {lo:02X} {hi:02X} → ptr=${ptr:04X} (bank offset ${b12(ptr):04X})")

# ── 解析第 0 个音效的通道初始化列表 ──
SOUND_ID = 0  # 对应 SE_MAP 第一个指针
print(f"\n=== Sound {SOUND_ID}: parse channel init list ===")
ptr = nums[b12(SE_MAP)] | (nums[b12(SE_MAP)+1] << 8)
if ptr >= 0x8000 and ptr < 0xA000:
    off = b12(ptr)
    y = 0
    while True:
        b = nums[off + y]
        if b >= 0x80:
            print(f"  Terminator: ${b:02X} at +{y}")
            break
        tLo = nums[off + y + 1]
        tHi = nums[off + y + 2]
        track = tLo | (tHi << 8)
        print(f"  ch={b} → track ptr=${track:04X} (bank offset ${b12(track):04X})")
        y += 3

# ── 频率表 FREQ_TBL (0x870D) and DUR_TBL (0x8725) ──
print(f"\n=== FREQ_TBL at $870D (12 entries x2) ===")
for i in range(12):
    lo = nums[b12(0x870D) + i * 2]
    hi = nums[b12(0x870D) + i * 2 + 1]
    period = lo | ((hi & 7) << 8)
    hz = 1789772.5 / (16 * (period + 1)) if period > 0 else 0
    print(f"  [{i:02d}] lo={lo:02X} hi={hi:02X} → period={period:04X} ({period:5d}) → {hz:.1f} Hz")

print(f"\n=== DUR_TBL at $8725 (first 64 bytes) ===")
dur_data = [nums[b12(0x8725) + i] for i in range(64)]
print("  ", " ".join(f"{d:02X}" for d in dur_data[:32]))
print("  ", " ".join(f"{d:02X}" for d in dur_data[32:]))

# ── 检查 $8705-$8724 之间是什么（音符周期表？） ──
print(f"\n=== $8705-$8724 raw ===")
for i in range(0x8705, 0x8725, 16):
    row = nums[b12(i):b12(i)+16]
    hexs = " ".join(f"{b:02X}" for b in row)
    print(f"  ${i:04X}: {hexs}")

# ── 检查第一个 track 的前 64 字节 ──
print(f"\n=== First track data (at first sound init pointer) ===")
ptr0 = nums[b12(SE_MAP)] | (nums[b12(SE_MAP) + 1] << 8)
# 通道初始化列表的第一个 track 指针
ch = nums[b12(ptr0)]
if ch < 0x80:
    trackPtr = nums[b12(ptr0)+1] | (nums[b12(ptr0)+2] << 8)
    print(f"  Track 0 data at ${trackPtr:04X} (bank offset ${b12(trackPtr):04X}):")
    for i in range(0, 64):
        b = nums[b12(trackPtr) + i]
        print(f"    +{i:02d}: ${b:02X} ({b:3d})", end="")
        if b >= 0xE0: print(" ← CMD")
        elif b >= 0xB0: print(" ← NOTE+")
        elif b >= 0x80: print(" ← NOTE")
        else: print(" ← DUR/CTRL")

# ── 检查 Sound 3+ 的 init list 是否有不同格式 ──
print(f"\n=== Sound 3 init list raw (ptr=$8E89) ===")
ptr3 = nums[b12(SE_MAP) + 6] | (nums[b12(SE_MAP) + 7] << 8)
print(f"  Sound 3 ptr=${ptr3:04X} (bank offset ${b12(ptr3):04X})")
line_byte = b12(ptr3)
for i in range(0, 32):
    b = nums[line_byte + i]
    print(f"    +{i:02d}: ${b:02X} ({b:3d})", end="")
    if b >= 0x80: print(" ← BIT7!")
    elif b <= 7: print(" ← CH")
    else: print(" ← DATA")

# ── 检查 $8700-$8760 完整区域 ──
print(f"\n=== $8700-$8760 raw (tables) ===")
for i in range(0x700, 0x760, 16):
    row = nums[i:i+16]
    hexs = " ".join(f"{b:02X}" for b in row)
    ascii_ = "".join(chr(b) if 32 <= b < 127 else "." for b in row)
    print(f"  \${0x8000+i:04X}: {hexs}  {ascii_}")

# ── 检查 ASM 中引用的 $8725-$8780 区域 ──
print(f"\n=== $8725-$8780 raw (64-byte 'dur' region) ===")
data = [nums[b12(0x8725) + i] for i in range(0x60)]
print("  Raw:", " ".join(f"{d:02X}" for d in data[:32]))
print("       ", " ".join(f"{d:02X}" for d in data[32:64]))
print("       ", " ".join(f"{d:02X}" for d in data[64:]))

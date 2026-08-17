# G3: 检查 file_87/89/91/93 小附件内容
import re

base = "d:/studio/github/monkeycode/src/nds/Picross/extracted/unnamed"
for fid in (87, 89, 91, 93):
    d = open(f"{base}/file_{fid}.bin", "rb").read()
    print(f"=== file_{fid}.bin size={len(d)} ===")
    print(f"  hex: {d[:96].hex(' ')}")
    # utf16
    for m in list(re.finditer(rb"(?:[\x20-\x7e]\x00){2,}", d))[:6]:
        print(f"  utf16@{m.start():#x}: {m.group().decode('utf-16-le')!r}")
    # ascii
    for m in list(re.finditer(rb"[\x20-\x7e]{3,}", d))[:6]:
        print(f"  ascii@{m.start():#x}: {m.group().decode()!r}")
    # u16 值
    u16 = [int.from_bytes(d[j:j + 2], "little") for j in range(0, min(len(d), 32), 2)]
    print(f"  u16: {[hex(x) for x in u16]}")
    print()

# file_86 头结构复习：FF FE 后 6B 头 + u32 偏移表
d = open(f"{base}/file_86.bin", "rb").read()
print(f"=== file_86.bin size={len(d)} 头 32B: {d[:32].hex(' ')}")
print(f"  u32 前 8: {[hex(int.from_bytes(d[j:j+4],'little')) for j in range(0,32,4)]}")

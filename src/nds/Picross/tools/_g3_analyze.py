# G3: 分析 Msg/*.dat —— ARM 代码前导 + 内部结构扫描
# 用法: python tools/_g3_analyze.py [文件名关键词]
import sys, glob, re
try:
    from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM, CS_MODE_THUMB
except ImportError:
    print("capstone 未安装"); sys.exit(1)

MSG = r"d:/studio/github/monkeycode/src/nds/Picross/extracted/Msg"
FILE = "PicrossDS_messageList_ENG_JP_Easy.dat"
if len(sys.argv) > 1:
    FILE = sys.argv[1]
d = open(f"{MSG}/{FILE}", "rb").read()
print(f"=== {FILE} size={len(d)} ===")

# 1) 反汇编开头（先 ARM 后 Thumb 试）
for mode, name in ((CS_MODE_ARM, "ARM"), (CS_MODE_THUMB, "Thumb")):
    md = Cs(CS_ARCH_ARM, mode)
    md.detail = False
    print(f"--- {name} 开头 16 条 ---")
    insns = list(md.disasm(d[:128], 0))
    for i in insns[:16]:
        print(f"  {i.address:04x}: {i.mnemonic} {i.op_str}")

# 2) 32 位小端指针扫描：值指向文件内部
print("--- 文件内指针（u32 LE，值<文件长）前 20 ---")
n = 0
for off in range(0, min(len(d) - 4, 4096), 4):
    v = int.from_bytes(d[off:off + 4], "little")
    if 0 < v < len(d):
        print(f"  off={off:#x} -> {v:#x}")
        n += 1
        if n >= 20:
            break

# 3) 文本扫描：单字节 ASCII + UTF-16LE
print("--- ASCII 可读串（>=4 字符）前 30 ---")
n = 0
for m in re.finditer(rb"[\x20-\x7e]{4,}", d):
    s = m.group().decode()
    print(f"  @{m.start():#x}: {s!r}")
    n += 1
    if n >= 30:
        break

print("--- UTF-16LE 可读串（>=4 字符）前 30 ---")
n = 0
for m in re.finditer(rb"(?:[\x20-\x7e]\x00){4,}", d):
    s = m.group().decode("utf-16-le")
    print(f"  @{m.start():#x}: {s!r}")
    n += 1
    if n >= 30:
        break

# 4) FF 填充区域分布（未使用部分）
print("--- FF 区域（>64B 连续 FF）---")
start = None
for i in range(len(d)):
    if d[i] == 0xFF:
        if start is None:
            start = i
    else:
        if start is not None and i - start > 64:
            print(f"  {start:#x} - {i:#x} ({i - start}B)")
        start = None
if start is not None and len(d) - start > 64:
    print(f"  {start:#x} - {len(d):#x} ({len(d) - start}B)")

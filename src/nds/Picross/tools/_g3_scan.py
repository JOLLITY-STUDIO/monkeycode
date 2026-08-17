# G3: 从 0x190 起按 400B 分块扫描记录结构
import re
import sys

d = open("d:/studio/github/monkeycode/src/nds/Picross/extracted/Msg/PicrossDS_messageList_ENG_JP_Easy.dat", "rb").read()
REC = 0x190
print("--- 0x190 起每条记录头 32B ---")
for i in range(8):
    off = 0x190 + i * REC
    if off + 32 > len(d):
        break
    h = d[off:off + 32]
    u32s = [hex(int.from_bytes(h[j:j + 4], "little")) for j in range(0, 32, 4)]
    print(f"rec[{i}] off={off:#x} u32={u32s}")
    for m in list(re.finditer(rb"[\x20-\x7e]{3,}", h))[:4]:
        print(f"    ascii@{m.start():#x}: {m.group().decode()!r}")
    for m in list(re.finditer(rb"(?:[\x20-\x7e]\x00){2,}", h))[:4]:
        print(f"    utf16@{m.start():#x}: {m.group().decode('utf-16-le')!r}")

print()
print("--- 0x190 处反汇编(ARM, 20 条) ---")
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM
md = Cs(CS_ARCH_ARM, CS_MODE_ARM)
for i in list(md.disasm(d[0x190:0x190 + 128], 0x190))[:20]:
    print(f"  {i.address - 0x190:04x}: {i.mnemonic} {i.op_str}")

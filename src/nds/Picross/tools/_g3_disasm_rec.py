# G3: 反汇编单条 400B 记录（ARM），观察文本输出逻辑
import sys
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM

MSG = r"d:/studio/github/monkeycode/src/nds/Picross/extracted/Msg"
FILE = "PicrossDS_messageList_ENG_JP_Easy.dat"
REC_IDX = 0
if len(sys.argv) > 1:
    FILE = sys.argv[1]
if len(sys.argv) > 2:
    REC_IDX = int(sys.argv[2])

d = open(f"{MSG}/{FILE}", "rb").read()
REC = 0x190
off = 0x18 + REC_IDX * REC
rec = d[off:off + REC]
print(f"=== {FILE} rec[{REC_IDX}] off={off:#x} ===")

md = Cs(CS_ARCH_ARM, CS_MODE_ARM)
md.detail = False
insns = list(md.disasm(rec, off))
for i in insns:
    print(f"  {i.address - off:04x}: {i.mnemonic} {i.op_str}")

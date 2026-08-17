# G3: 反汇编记录区（验证记录是否为 ARM 代码）
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM, CS_MODE_THUMB

for fn, rec_off in [
    ("PicrossDS_messageList_ENG_JP_Easy.dat", 0x1A8),
    ("PicrossDS_messageList_SPA_JP_Normal.dat", 0x1A8),
    ("PicrossDS_messageList_FRE_JP_Normal.dat", 0x1A8),
]:
    d = open(f"extracted/Msg/{fn}", "rb").read()
    rec = d[rec_off:rec_off + 0x190]
    print(f"=== {fn} rec@0x{rec_off:x} ===")
    for mode, name in ((CS_MODE_ARM, "ARM"), (CS_MODE_THUMB, "Thumb")):
        md = Cs(CS_ARCH_ARM, mode)
        insns = list(md.disasm(rec, rec_off))
        # 合法性：统计含分支/返回/栈操作的指令占比
        special = sum(1 for i in insns if i.mnemonic in ("push", "pop", "bx", "bl", "b", "ldm", "stm", "ldr", "str", "add", "mov", "sub", "cmp"))
        print(f"  {name}: {len(insns)} 条指令, 特殊指令 {special} ({special/max(len(insns),1)*100:.0f}%), 前12条:")
        for i in insns[:12]:
            print(f"    {i.address - rec_off:04x}: {i.mnemonic} {i.op_str}")
        if len(insns) >= 40:
            print(f"    ... (共 {len(insns)} 条)")
    print()

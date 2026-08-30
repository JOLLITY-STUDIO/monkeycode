b = open("BUGS.md", encoding="utf-8").read()
new = """

| BUG-020 | DEVLOG/engine 注释引用假 ARM9 地址 0x207d898 / 0x2075310 | DONE | 这些地址是 disasm 数据区假解读（stmdahi / svcge 不是真指令）。修复：删除错地址注释；写 docs/ARM9_GAME_LOGIC_MAP.md (11 行真地址对照)；src/core/engine.ts doc block 改为真地址 0x2001264 (cmp r4, #5)、0x2001290 (state-machine jump table)、0x2001344 (solve-judge)、0x200136c (timer 0x258=600)。|
"""
open("BUGS.md", "w", encoding="utf-8").write(b.rstrip() + new)
print("BUGS.md BUG-020 appended")

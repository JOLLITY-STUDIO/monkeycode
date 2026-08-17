import re
lines = open("_tmp_disasm_out/arm9.bin.asm", "r", errors="replace").read().splitlines()
print("total", len(lines))

pats = ["#0x0c03", "#0x0C03", "#0x0c0", "#0x0d", "#0x0c04", "0x0C03", "0x0c03"]
seen = set()
for i, l in enumerate(lines):
    low = l.lower()
    if "0x0c03" in low or "0x0c04" in low:
        if i not in seen:
            seen.add(i)
            print(i, l[:140])
    if len(seen) > 25:
        break
print("---0x0c03 hits:", len(seen))

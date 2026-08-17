import re
lines = open("_tmp_disasm_out/arm9.bin.asm", "r", errors="replace").read().splitlines()

# 1) 数据区字符串扫描：找英文文本（菜单/调试）
print("=== ascii strings in asm data ===")
cnt = 0
for i, l in enumerate(lines):
    m = re.search(r'\.ascii\s+"([^"]{6,})"', l)
    if m:
        s = m.group(1)
        if re.search(r"[A-Za-z]{4,}", s):
            print(f"{i}: {l[:110]}")
            cnt += 1
            if cnt > 40:
                break
print("--- ascii hits:", cnt)

# 2) 搜索 LZ 解压 / 文件读取函数名线索
print("=== file/load related labels ===")
cnt = 0
for i, l in enumerate(lines):
    if re.search(r"^(sub|fn|lbl|func|loc)\w*:", l, re.I):
        pass
    if "fopen" in l or "fread" in l or "FAT" in l or "arc" in l.lower():
        print(f"{i}: {l[:110]}")
        cnt += 1
        if cnt > 15:
            break

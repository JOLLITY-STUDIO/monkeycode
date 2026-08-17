# G3: 在 arm9.bin / overlay / ROM 中搜索 Msg 入口函数与常量
base = "d:/studio/github/monkeycode/src/nds/Picross/extracted"
targets = {
    "arm9.bin": f"{base}/arm9.bin",
    "arm9_ov.bin": f"{base}/arm9_ov.bin",
}
import glob
roms = glob.glob("d:/studio/github/monkeycode/src/nds/Picross/_rom_raw/*.nds")
if roms:
    targets["rom"] = roms[0]

# 入口函数: ldr r2,[pc,#0xc]; add r1,r0,#1; mov r0,#0x190; mla; bx lr
fn = bytes.fromhex("0c209fe5011080e29040a0e30c2091e01eff2fe1")
const = bytes.fromhex("6c39e302")  # 0x02E3396C LE

for name, path in targets.items():
    d = open(path, "rb").read()
    i1 = d.find(fn)
    i2 = d.find(const)
    print(f"{name} size={len(d)} fn@{hex(i1) if i1 >= 0 else 'N/A'} const@{hex(i2) if i2 >= 0 else 'N/A'}")
    if i2 >= 0:
        # 常量上下文前后 64B
        s = max(0, i2 - 64)
        print(f"  const ctx: {d[s:i2 + 64].hex(' ')}")
    if i1 >= 0:
        print(f"  fn ctx: {d[max(0,i1-32):i1+64].hex(' ')}")

# 生成 iNES 1.0 标准头的 ROM 副本，供 NESgen 使用（绕过其 NES2.0 误判）
import os, shutil

src = r"d:\studio\github\monkeycode\src\nes\tsubasa2\src\asm\dist\tsubasa2.nes"
dst = r"d:\studio\github\monkeycode\src\nes\tsubasa2\debug\nesgen\tsubasa2_ines1.nes"
os.makedirs(os.path.dirname(dst), exist_ok=True)
with open(src, "rb") as f:
    data = bytearray(f.read())
# 字节7 高4位是 mapper 高半字节(0)，低4位清零 → 满足 iNES 1.0 (flags7 & 0x0C == 0)
data[7] = data[7] & 0xF0
with open(dst, "wb") as f:
    f.write(data)
print(f"wrote {dst} ({len(data)} bytes), flags7={data[7]:#04x}")

# 运行 NESgen
import subprocess, sys
nesgen_dir = r"d:\studio\github\monkeycode\src\nes\tools\NESgen\NESgen\NESgen"
out_dir = os.path.dirname(dst)
log = os.path.join(out_dir, "run_log.txt")
cmd = [sys.executable, "NESgen.py", "-i", dst, "-c", os.path.join(out_dir, "game.c"), "-h", os.path.join(out_dir, "game.h")]
r = subprocess.run(cmd, cwd=nesgen_dir, capture_output=True, text=True, timeout=600)
with open(log, "w", encoding="utf-8", errors="replace") as f:
    f.write("STDOUT:\n" + r.stdout[-4000:] + "\nSTDERR:\n" + r.stderr[-4000:])
print(f"exit={r.returncode}")
for n in os.listdir(out_dir):
    p = os.path.join(out_dir, n)
    if os.path.isfile(p):
        print(f"  {n}: {os.path.getsize(p)}")

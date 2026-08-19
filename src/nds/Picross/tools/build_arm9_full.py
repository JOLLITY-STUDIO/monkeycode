"""合并 arm9.bin 引导区 [0,0x4000) VA=0x02000000 + arm9_decomp.bin 解压区 [0,0xDB058) VA=0x02004000
输出完整内存镜像 arm9_full.bin：文件偏移 = VA - 0x02000000"""
import os
ROOT = os.path.dirname(os.path.abspath(__file__)) + "/.."
ED = os.path.join(ROOT, "extracted")
boot = open(os.path.join(ED, "arm9.bin"), "rb").read()[:0x4000]
decomp = open(os.path.join(ED, "arm9_decomp.bin"), "rb").read()
assert len(decomp) == 0xDB058, f"decomp size {len(decomp):#x}"
full = boot + decomp
out = os.path.join(ROOT, "extracted", "arm9_full.bin")
open(out, "wb").write(full)
print(f"arm9_full.bin = {len(full):#x} bytes, VA [0x02000000, 0x02000000+{len(full):#x})")
print(f"  入口 0x02000800 -> 文件偏移 {0x02000800-0x02000000:#x}")
print(f"  主入口 0x02003000 -> 文件偏移 {0x02003000-0x02000000:#x}")

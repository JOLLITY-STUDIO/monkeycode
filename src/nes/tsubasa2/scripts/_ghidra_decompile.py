# Ghidra 脚本：反编译 NES ROM 为 C 代码
# 用法：analyzeHeadless <project_dir> <project_name> -import <rom.nes> -processor 6502 -postScript _ghidra_decompile.py

# 反编译所有函数到 C 文件
from ghidra.app.decompiler import DecompInterface
from ghidra.util.task import ConsoleTaskMonitor
import java.io.File as File

outputFile = "D:\\studio\\github\\monkeycode\\src\\nes\\tsubasa2\\debug\\ghidra_decompiled.c"

decomp = DecompInterface()
decomp.openProgram(currentProgram)
monitor = ConsoleTaskMonitor()

f = open(outputFile, "w")

# 获取所有函数
fm = currentProgram.getFunctionManager()
funcs = fm.getFunctions(True)
count = 0

for func in funcs:
    if monitor.isCancelled():
        break
    addr = func.getEntryPoint()
    name = func.getName()

    # 只反编译 $8000-$FFFF 范围（PRG ROM 区）
    addrVal = addr.getOffset()
    if addrVal < 0x8000:
        continue

    results = decomp.decompileFunction(func, 60, monitor)
    if results and results.depiledFunction():
        c_code = results.getDecompiledFunction().getC()
        f.write("// === {} at {} ===\n".format(name, addr))
        f.write(c_code)
        f.write("\n\n")
        count += 1

f.close()
print("Decompiled {} functions to {}".format(count, outputFile))

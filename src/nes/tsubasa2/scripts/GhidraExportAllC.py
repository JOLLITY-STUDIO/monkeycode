# Export all functions: disassembly + C decompilation (Ghidra Jython)
from ghidra.app.decompiler import DecompInterface
from ghidra.util.task import ConsoleTaskMonitor
from java.io import File, PrintWriter, BufferedWriter, FileWriter

outDir = "D:/studio/github/monkeycode/src/nes/tsubasa2/debug/ghidra_c"
d = File(outDir)
d.mkdirs()
cFile = File(d, "all_decompiled.c")
asmFile = File(d, "all_disasm.txt")

cw = PrintWriter(BufferedWriter(FileWriter(cFile)))
aw = PrintWriter(BufferedWriter(FileWriter(asmFile)))

fm = currentProgram.getFunctionManager()
listing = currentProgram.getListing()

decomp = DecompInterface()
decomp.openProgram(currentProgram)
monitor = ConsoleTaskMonitor()

total = 0
ok = 0
funcs = fm.getFunctions(True)
while funcs.hasNext():
    func = funcs.next()
    total += 1
    name = func.getName()
    entry = func.getEntryPoint().toString()
    cw.println("// ===== %s @ %s =====" % (name, entry))
    aw.println("// ===== %s @ %s =====" % (name, entry))
    cuIter = listing.getCodeUnits(func.getBody(), True)
    while cuIter.hasNext():
        cu = cuIter.next()
        aw.println(str(cu.getAddress()) + "  " + str(cu))
    res = decomp.decompileFunction(func, 120, monitor)
    if res.decompileCompleted():
        cw.println(res.getDecompiledFunction().getC())
        ok += 1
    else:
        cw.println("// DECOMPILE FAILED: " + str(res.getErrorMessage()))
    cw.println()
    aw.println()

cw.close()
aw.close()
print("Total functions: %d decompiled OK: %d" % (total, ok))
print("saved: " + str(cFile))

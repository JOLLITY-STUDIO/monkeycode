// Ghidra 11 脚本：从 ROM 文件填充 PRG_ROM + 创建函数 + 反编译
// @category Analysis

import ghidra.app.decompiler.DecompInterface;
import ghidra.app.decompiler.DecompileResults;
import ghidra.app.script.GhidraScript;
import ghidra.program.model.address.Address;
import ghidra.program.model.address.AddressSpace;
import ghidra.program.model.listing.Function;
import ghidra.program.model.listing.FunctionManager;
import ghidra.program.model.mem.Memory;
import ghidra.program.model.mem.MemoryBlock;
import ghidra.program.model.mem.MemoryAccessException;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.PrintWriter;

public class _ghidra_decompile_java extends GhidraScript {
    @Override
    public void run() throws Exception {
        String outputFile = "D:\\studio\\github\\monkeycode\\src\\nes\\tsubasa2\\debug\\ghidra_decompiled.c";
        String romFile = "D:\\studio\\github\\monkeycode\\src\\nes\\tsubasa2\\src\\asm\\dist\\tsubasa2.nes";

        Memory memory = currentProgram.getMemory();
        AddressSpace space = currentProgram.getAddressFactory().getDefaultAddressSpace();
        FunctionManager fm = currentProgram.getFunctionManager();

        // 读 ROM 文件
        File f = new File(romFile);
        byte[] romData = new byte[(int) f.length()];
        FileInputStream fis = new FileInputStream(f);
        fis.read(romData);
        fis.close();
        println("ROM size: " + romData.length);

        // NES header: 16 bytes
        // PRG size = romData[4] * 16KB
        int prgSize = (romData[4] & 0xFF) * 16384;
        println("PRG size: " + prgSize + " bytes");

        // PRG 从 offset 16 开始
        // PRG_ROM 块在 Ghidra 是 $8000-$FFFF (32KB)
        // 但 ROM 有 256KB PRG (32 banks × 8KB)，只有 bank30+31 在 fixed bank
        // Ghidra 只映射了 32KB（bank30+31）

        // 填充 PRG_ROM 块
        MemoryBlock prgBlock = null;
        for (MemoryBlock block : memory.getBlocks()) {
            if (block.getName().equals("PRG_ROM")) {
                prgBlock = block;
                break;
            }
        }
        if (prgBlock == null) {
            println("PRG_ROM block not found!");
            return;
        }

        // 用 ROM 数据填充 PRG_ROM
        // Fixed bank = last 16KB of PRG (bank30+31)
        // bank30 = offset 16 + 30*8192 = 245776
        // bank31 = offset 16 + 31*8192 = 253968
        // PRG_ROM $8000-$BFFF = bank30, $C000-$FFFF = bank31
        int bank30Offset = 16 + 30 * 8192; // 245776
        int bank31Offset = 16 + 31 * 8192; // 253968

        println("Filling PRG_ROM with bank30+31 data...");
        for (int i = 0; i < 8192; i++) {
            // bank30 → $8000-$9FFF
            memory.setByte(space.getAddress(0x8000 + i), romData[bank30Offset + i]);
        }
        for (int i = 0; i < 8192; i++) {
            // bank31 → $C000-$DFFF (mapped to $E000-$FFFF in fixed bank)
            // Actually NES fixed bank is $C000-$FFFF = bank31 $8000-$9FFF → $E000-$FFFF
            // But Ghidra maps PRG_ROM $8000-$FFFF
            // bank31 maps to $E000-$FFFF
            memory.setByte(space.getAddress(0xE000 + i), romData[bank31Offset + i]);
        }
        // $A000-$BFFF and $C000-$DFFF are switchable banks, fill with bank30 data as placeholder
        for (int i = 0; i < 8192; i++) {
            memory.setByte(space.getAddress(0xA000 + i), romData[bank30Offset + i]);
            memory.setByte(space.getAddress(0xC000 + i), romData[bank30Offset + i]);
        }

        // 创建函数：扫描 JSR 指令
        int created = 0;
        for (long addr = 0x8000; addr <= 0xFFFD; addr++) {
            try {
                byte b = memory.getByte(space.getAddress(addr));
                if ((b & 0xFF) == 0x20) {
                    byte lo = memory.getByte(space.getAddress(addr + 1));
                    byte hi = memory.getByte(space.getAddress(addr + 2));
                    int target = ((hi & 0xFF) << 8) | (lo & 0xFF);
                    if (target >= 0x8000 && target <= 0xFFFF) {
                        Address targetAddr = space.getAddress(target);
                        if (fm.getFunctionAt(targetAddr) == null) {
                            ghidra.app.cmd.function.CreateFunctionCmd cmd =
                                new ghidra.app.cmd.function.CreateFunctionCmd(targetAddr);
                            if (cmd.applyTo(currentProgram)) {
                                created++;
                            }
                        }
                    }
                }
            } catch (Exception e) {
                // skip
            }
        }
        println("Created " + created + " functions from JSR targets");

        // 反编译所有函数
        DecompInterface decomp = new DecompInterface();
        decomp.openProgram(currentProgram);

        PrintWriter pw = new PrintWriter(new FileWriter(outputFile));
        int count = 0;
        for (Function func : fm.getFunctions(true)) {
            if (monitor.isCancelled()) break;
            Address addr = func.getEntryPoint();
            long addrVal = addr.getOffset();
            if (addrVal < 0x8000 || addrVal > 0xFFFF) continue;

            DecompileResults results = decomp.decompileFunction(func, 60, monitor);
            if (results != null && results.getDecompiledFunction() != null) {
                String c = results.getDecompiledFunction().getC();
                pw.println("// === " + func.getName() + " at " + addr + " ===");
                pw.println(c);
                pw.println();
                count++;
            }
        }
        pw.close();
        println("Decompiled " + count + " functions to " + outputFile);
    }
}

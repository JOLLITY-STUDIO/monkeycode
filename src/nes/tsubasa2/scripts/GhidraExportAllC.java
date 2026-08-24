//Export all functions: disassembly + C decompilation.
//@category NES

import ghidra.app.decompiler.DecompInterface;
import ghidra.app.decompiler.DecompileResults;
import ghidra.app.script.GhidraScript;
import ghidra.program.model.address.Address;
import ghidra.program.model.address.AddressIterator;
import ghidra.program.model.listing.CodeUnit;
import ghidra.program.model.listing.Function;
import ghidra.program.model.listing.FunctionManager;
import ghidra.program.model.listing.Listing;
import ghidra.program.model.mem.MemoryBlock;
import ghidra.program.model.symbol.Reference;
import ghidra.program.model.symbol.ReferenceManager;
import ghidra.program.model.symbol.Symbol;
import ghidra.program.model.symbol.SymbolTable;
import ghidra.util.task.ConsoleTaskMonitor;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.PrintWriter;

public class GhidraExportAllC extends GhidraScript {

	@Override
	public void run() throws Exception {
		String outDir = "D:/studio/github/monkeycode/src/nes/tsubasa2/debug/ghidra_c";
		File dir = new File(outDir);
		dir.mkdirs();
		File cFile = new File(dir, "all_decompiled.c");
		File asmFile = new File(dir, "all_disasm.txt");

		for (MemoryBlock blk : currentProgram.getMemory().getBlocks()) {
			println("BLOCK " + blk.getName() + " " + blk.getStart() + "-" + blk.getEnd());
		}

		// 1. create functions at vector targets (reset/vblank/irq)
		SymbolTable st = currentProgram.getSymbolTable();
		for (Symbol s : st.getAllSymbols(true)) {
			String n = s.getName();
			if (n.equals("reset") || n.equals("vblank") || n.equals("irq")) {
				createFunc(s.getAddress());
				println("vector target -> function: " + s.getAddress());
			}
		}

		// 2. create functions at all flow targets (call/jump)
		ReferenceManager rm = currentProgram.getReferenceManager();
		AddressIterator it = rm.getReferenceIterator(currentProgram.getMinAddress());
		int refs = 0;
		while (it.hasNext()) {
			Reference ref = it.next();
			if (ref.getReferenceType().isFlow()) {
				Address to = ref.getToAddress();
				if (to != null && currentProgram.getMemory().contains(to)) {
					MemoryBlock blk = currentProgram.getMemory().getBlock(to);
					if ((blk.getPermissions() & 4) != 0) { // EXECUTE = 4
						createFunc(to);
						refs++;
					}
				}
			}
		}

		DecompInterface decomp = new DecompInterface();
		decomp.openProgram(currentProgram);
		ConsoleTaskMonitor monitor = new ConsoleTaskMonitor();

		FunctionManager fm = currentProgram.getFunctionManager();
		Listing listing = currentProgram.getListing();

		PrintWriter cw = new PrintWriter(new BufferedWriter(new FileWriter(cFile)));
		PrintWriter aw = new PrintWriter(new BufferedWriter(new FileWriter(asmFile)));

		int total = 0;
		int ok = 0;
		for (Function func : fm.getFunctions(true)) {
			total++;
			String name = func.getName();
			String entry = func.getEntryPoint().toString();
			cw.println("// ===== " + name + " @ " + entry + " =====");
			aw.println("// ===== " + name + " @ " + entry + " =====");
			for (CodeUnit cu : listing.getCodeUnits(func.getBody(), true)) {
				aw.println(cu.getAddress() + "  " + cu);
			}
			DecompileResults res = decomp.decompileFunction(func, 120, monitor);
			if (res.decompileCompleted()) {
				cw.println(res.getDecompiledFunction().getC());
				ok++;
			}
			else {
				cw.println("// DECOMPILE FAILED: " + res.getErrorMessage());
			}
			cw.println();
			aw.println();
		}

		aw.println();
		aw.println("// ===== ALL DEFINED CODE UNITS NOT IN FUNCTIONS =====");

		cw.close();
		aw.close();

		println("Total functions: " + total + " decompiled OK: " + ok + " refs: " + refs);
		println("saved: " + cFile);
		println("saved: " + asmFile);
	}

	private void createFunc(Address addr) {
		try {
			createFunction(addr, null);
		}
		catch (Exception e) {
			// already a function or cannot create
		}
	}
}

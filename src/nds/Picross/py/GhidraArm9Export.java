// Ghidra headless postScript: ARM9 function-level export (Java, pure ASCII)
// Usage: analyzeHeadless <proj> <name> -process arm9_full.bin -scriptPath <dir> -postScript GhidraArm9Export.java
// Output: <scriptPath>/arm9_export/funcs_flat.json  callgraph.json  funcs_asm/
import java.io.File;
import java.io.FileWriter;
import java.util.*;

import ghidra.app.script.GhidraScript;
import ghidra.program.model.address.Address;
import ghidra.program.model.listing.*;
import ghidra.program.model.mem.Memory;
import ghidra.program.model.mem.MemoryBlock;
import ghidra.program.model.symbol.*;

public class GhidraArm9Export extends GhidraScript {

    private static final int MAX_DEPTH = 16;

    private final Set<Long> visited = new HashSet<Long>();
    private final Map<String, Map<String, Object>> callGraph = new LinkedHashMap<String, Map<String, Object>>();
    private File asmDir;
    private FunctionManager fm;

    @Override
    public void run() throws Exception {
        // ---- 0. image info ----
        long base = currentProgram.getImageBase().getOffset();
        println("IMAGE BASE: 0x" + Long.toHexString(base));
        Memory mem = currentProgram.getMemory();
        for (MemoryBlock b : mem.getBlocks()) {
            println("BLOCK " + b.getName() + " " + hex(b.getStart().getOffset()) + "-" + hex(b.getEnd().getOffset()) + " size=0x" + Long.toHexString(b.getSize()));
        }

        // ARM9 main entry: 0x02003000 if base is high, else 0x3000 (file-offset import)
        long rootAddr = (base < 0x10000L) ? 0x00003000L : 0x02003000L;

        File outRoot = new File(getSourceFile().getParentFile(), "arm9_export");
        asmDir = new File(outRoot, "funcs_asm");
        if (!asmDir.exists()) asmDir.mkdirs();

        fm = getFunctionManager();

        // ---- 1. flat table ----
        List<Map<String, Object>> flat = new ArrayList<Map<String, Object>>();
        for (Function f : fm.getFunctions(true)) {
            long ep = f.getEntryPoint().getOffset();
            Address min = f.getBody().getMinAddress();
            Address max = f.getBody().getMaxAddress();
            Map<String, Object> m = new LinkedHashMap<String, Object>();
            m.put("entry", hex(ep & ~1L));
            m.put("entry_raw", hex(ep));
            m.put("start", hex(min.getOffset()));
            m.put("end", hex(max.getOffset()));
            m.put("size", max.getOffset() - min.getOffset() + 1);
            m.put("name", f.getName());
            m.put("is_thunk", Boolean.valueOf(f.isThunk()));
            m.put("is_thumb", Boolean.valueOf((ep & 1) == 1));
            flat.add(m);
        }
        Collections.sort(flat, new Comparator<Map<String, Object>>() {
            public int compare(Map<String, Object> a, Map<String, Object> b) {
                return ((String) a.get("entry")).compareTo((String) b.get("entry"));
            }
        });
        writeJson(new File(outRoot, "funcs_flat.json"), flat);
        println("FLAT count = " + flat.size());

        // ---- 2. DFS from main entry ----
        Function rootFunc = fm.getFunctionAt(toAddr(rootAddr));
        if (rootFunc == null) rootFunc = fm.getFunctionContaining(toAddr(rootAddr));
        if (rootFunc == null) {
            println("ERROR: root func not found @ " + hex(rootAddr));
            return;
        }
        dfs(rootFunc, 0);
        writeJson(new File(outRoot, "callgraph.json"), callGraph);
        println("EXPORT done: flat=" + flat.size() + " dfs=" + visited.size());
    }

    private void dfs(Function f, int depth) throws Exception {
        long entry = f.getEntryPoint().getOffset() & ~1L;
        if (visited.contains(entry) || depth > MAX_DEPTH) return;
        visited.add(entry);
        String hexE = hex(entry);

        StringBuilder sb = new StringBuilder();
        CodeUnitIterator cus = getListing().getCodeUnits(f.getBody(), true);
        while (cus.hasNext()) {
            CodeUnit cu = cus.next();
            sb.append(String.format("0x%08X\t%s%n", cu.getAddress().getOffset(), cu.toString()));
        }

        Set<String> callees = new TreeSet<String>();
        ReferenceIterator refs = getReferenceManager().getReferencesFrom(f.getBody());
        while (refs.hasNext()) {
            Reference r = refs.next();
            RefType ft = r.getFlowType();
            if (ft.equals(RefType.CALL) || ft.equals(RefType.UNCONDITIONAL_JUMP)) {
                Function tf = fm.getFunctionContaining(r.getToAddress());
                if (tf != null) callees.add(hex(tf.getEntryPoint().getOffset() & ~1L));
            }
        }

        Map<String, Object> meta = new LinkedHashMap<String, Object>();
        meta.put("func_name", f.getName());
        meta.put("entry", hexE);
        meta.put("start", hex(f.getBody().getMinAddress().getOffset()));
        meta.put("end", hex(f.getBody().getMaxAddress().getOffset()));
        meta.put("depth", Integer.valueOf(depth));
        meta.put("is_thumb", Boolean.valueOf((f.getEntryPoint().getOffset() & 1) == 1));
        meta.put("called_subfuncs", new ArrayList<String>(callees));
        callGraph.put(hexE, meta);

        FileWriter w = new FileWriter(new File(asmDir, safe(hexE + "_" + f.getName()) + ".asm"));
        w.write("FUNC_META: " + json(meta) + "\n\n=====DISASM=====\n" + sb.toString());
        w.close();

        for (String h : callees) {
            Function sub = fm.getFunctionAt(toAddr(h));
            if (sub == null) sub = fm.getFunctionContaining(toAddr(h));
            if (sub != null) dfs(sub, depth + 1);
        }
    }

    private Address toAddr(long v) {
        return currentProgram.getAddressFactory().getDefaultAddressSpace().getAddress(v);
    }

    private static String hex(long v) {
        return String.format("0x%08X", v);
    }

    private static String safe(String s) {
        return s.replaceAll("[\\\\/:*?\"<>|]", "_");
    }

    private void writeJson(File f, Object o) throws Exception {
        FileWriter w = new FileWriter(f);
        w.write(json(o));
        w.close();
    }

    private static String json(Object o) {
        if (o instanceof Map) {
            StringBuilder sb = new StringBuilder("{");
            boolean first = true;
            for (Map.Entry<?, ?> e : ((Map<?, ?>) o).entrySet()) {
                if (!first) sb.append(",");
                first = false;
                sb.append("\"").append(e.getKey()).append("\":").append(json(e.getValue()));
            }
            return sb.append("}").toString();
        }
        if (o instanceof List) {
            StringBuilder sb = new StringBuilder("[");
            boolean first = true;
            for (Object x : (List<?>) o) {
                if (!first) sb.append(",");
                first = false;
                sb.append(json(x));
            }
            return sb.append("]").toString();
        }
        if (o instanceof String) return "\"" + o + "\"";
        if (o instanceof Boolean || o instanceof Number) return String.valueOf(o);
        return "\"" + String.valueOf(o) + "\"";
    }
}

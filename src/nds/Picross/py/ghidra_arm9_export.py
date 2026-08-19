#@category Analysis
# Ghidra headless postScript: ARM9 function-level export (PyGhidra / Python3)
# Output: <scriptPath>/arm9_export/funcs_flat.json  callgraph.json  funcs_asm/
import os
import json
import re

from ghidra.program.model.symbol import RefType

ROOT = 0x02003000
MAX_DEPTH = 16


def hexl(v):
    return "0x%08X" % (int(v) & 0xFFFFFFFF)


def safe(s):
    return re.sub(r'[\\/:*?"<>|]', "_", str(s))


def to_addr(v):
    return currentProgram.getAddressFactory().getDefaultAddressSpace().getAddress(int(v))


# ---- 0. image info (verify base) ----
base = currentProgram.getImageBase().getOffset()
print("IMAGE BASE: 0x%08X" % base)
for b in currentProgram.getMemory().getBlocks():
    print("BLOCK %s %s-%s size=0x%x" % (b.getName(), hexl(b.getStart().getOffset()),
                                        hexl(b.getEnd().getOffset()), b.getSize()))

# ARM9 main entry: high-base or file-offset import
root_addr = 0x00003000 if base < 0x10000 else ROOT

fm = currentProgram.getFunctionManager()
listing = currentProgram.getListing()
ref_mgr = currentProgram.getReferenceManager()

out_root = os.path.join(os.path.dirname(getSourceFile().getAbsolutePath()), "arm9_export")
asm_dir = os.path.join(out_root, "funcs_asm")
if not os.path.exists(asm_dir):
    os.makedirs(asm_dir)

# ---- 1. flat table ----
flat = []
it = fm.getFunctions(True)
while it.hasNext():
    f = it.next()
    ep = f.getEntryPoint().getOffset()
    min_a = f.getBody().getMinAddress().getOffset()
    max_a = f.getBody().getMaxAddress().getOffset()
    flat.append({
        "entry": hexl(ep & ~1),
        "entry_raw": hexl(ep),
        "start": hexl(min_a),
        "end": hexl(max_a),
        "size": max_a - min_a + 1,
        "name": f.getName(),
        "is_thunk": f.isThunk(),
        "is_thumb": (ep & 1) == 1,
    })
flat.sort(key=lambda m: m["entry"])
with open(os.path.join(out_root, "funcs_flat.json"), "w") as w:
    w.write(json.dumps(flat, indent=1))
print("FLAT count = %d" % len(flat))

# ---- 2. DFS from main entry ----
visited = set()
callgraph = {}


def dfs(f, depth):
    if f is None:
        return
    entry = f.getEntryPoint().getOffset() & ~1
    if entry in visited or depth > MAX_DEPTH:
        return
    visited.add(entry)
    he = hexl(entry)

    sb = []
    cus = listing.getCodeUnits(f.getBody(), True)
    while cus.hasNext():
        cu = cus.next()
        sb.append("0x%08X\t%s" % (cu.getAddress().getOffset(), cu.toString()))

    callees = set()
    refs = ref_mgr.getReferencesFrom(f.getBody())
    while refs.hasNext():
        r = refs.next()
        ft = r.getFlowType()
        if ft.equals(RefType.CALL) or ft.equals(RefType.UNCONDITIONAL_JUMP):
            tf = fm.getFunctionContaining(r.getToAddress())
            if tf is not None:
                callees.add(hexl(tf.getEntryPoint().getOffset() & ~1))

    meta = {
        "func_name": f.getName(),
        "entry": he,
        "start": hexl(f.getBody().getMinAddress().getOffset()),
        "end": hexl(f.getBody().getMaxAddress().getOffset()),
        "depth": depth,
        "is_thumb": (f.getEntryPoint().getOffset() & 1) == 1,
        "called_subfuncs": sorted(callees),
    }
    callgraph[he] = meta

    with open(os.path.join(asm_dir, safe(he + "_" + f.getName()) + ".asm"), "w") as w:
        w.write("FUNC_META: " + json.dumps(meta) + "\n\n=====DISASM=====\n" + "\n".join(sb))

    for h in sorted(callees):
        sub = fm.getFunctionAt(to_addr(h))
        if sub is None:
            sub = fm.getFunctionContaining(to_addr(h))
        if sub is not None:
            dfs(sub, depth + 1)


root_f = fm.getFunctionAt(to_addr(root_addr))
if root_f is None:
    root_f = fm.getFunctionContaining(to_addr(root_addr))
if root_f is None:
    print("ERROR: root func not found @ " + hexl(root_addr))
else:
    dfs(root_f, 0)
    with open(os.path.join(out_root, "callgraph.json"), "w") as w:
        w.write(json.dumps(callgraph, indent=1))
    print("EXPORT done: flat=%d dfs=%d" % (len(flat), len(visited)))

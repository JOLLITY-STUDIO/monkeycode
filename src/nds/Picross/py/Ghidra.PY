# NDS ARM9 递归DFS导出函数汇编片段 +元数据，适配TS移植流水线
# 运行环境：Ghidra + NTRGhidra(NDS加载插件)，ARMv5T‑little‑endian，已经完成自动分析
# 输出目录：每个函数单独asm文本，全局callgraph.json记录调用依赖
import os
import json
from ghidra.program.model.listing import Function
from ghidra.program.model.symbol import FlowType

# =========配置区========
OUTPUT_ROOT = r"./arm9_export"
START_FUNC_ADDR = "0x08000000"  # 修改为你的起始函数内存地址（thumb入口可带1，如0x08000401）
MAX_RECURSION_DEPTH = 12        # 递归深度，防止无限递归（循环调用）
SKIP_STUBS = True               # 跳过ghidra自动生成stub函数
# ========================

program = currentProgram
listing = program.getListing()
funcManager = program.getFunctionManager()

visited = set()
callGraph = dict()

if not os.path.exists(OUTPUT_ROOT):
    os.makedirs(OUTPUT_ROOT)
asm_dir = os.path.join(OUTPUT_ROOT,"funcs_asm")
os.makedirs(asm_dir, exist_ok=True)

def get_func_disasm_text(func):
    """提取一个函数完整汇编文本"""
    sb = []
    addrSet = func.getBody()
    codeUnitIter = listing.getCodeUnits(addrSet, True)
    for cu in codeUnitIter:
        sb.append("0x%08X\t%s" % (cu.getAddress().getOffset(), cu.toString()))
    return "\n".join(sb)

def sanitize_filename(name):
    return "".join(c if c not in r'\/:*?"<>|' else "_" for c in name)

def dfs_export(func, depth=0):
    entry_off = func.getEntryPoint().getOffset()
    entry_hex = "0x%08X" % entry_off
    if entry_hex in visited:
        return
    if depth > MAX_RECURSION_DEPTH:
        return
    if SKIP_STUBS and func.isThunk():
        return
    visited.add(entry_hex)

    # 收集本函数信息
    body = func.getBody()
    start_addr = body.getMinAddress()
    end_addr = body.getMaxAddress()
    func_name = func.getName()
    disasm_text = get_func_disasm_text(func)

    # 收集所有直接调用的子函数（BL跳转）
    called_funcs = []
    refIter = program.getReferenceManager().getReferencesFrom(func.getEntryPoint())
    for ref in program.getReferenceManager().getReferencesFrom(func.getBody()):
        if ref.getFlowType() in (FlowType.CALL, FlowType.UNCONDITIONAL_JUMP):
            target_func = funcManager.getFunctionContaining(ref.getToAddress())
            if target_func is not None:
                t_entry = target_func.getEntryPoint().getOffset()
                t_hex = "0x%08X" % t_entry
                called_funcs.append(t_hex)

    called_funcs = list(set(called_funcs))

    meta = {
        "func_name": func_name,
        "entry": entry_hex,
        "start": "0x%08X" % start_addr.getOffset(),
        "end": "0x%08X" % end_addr.getOffset(),
        "depth": depth,
        "called_subfuncs": called_funcs,
        "is_thumb": func.getEntryPoint().getOffset() & 1 == 1
    }
    callGraph[entry_hex] = meta

    fn_safe = sanitize_filename(f"{entry_hex}_{func_name}")
    asm_path = os.path.join(asm_dir, f"{fn_safe}.asm")
    with open(asm_path,"w",encoding="utf‑8") as f:
        f.write(json.dumps(meta,indent=2))
        f.write("\n\n=====DISASM=====\n")
        f.write(disasm_text)

    # DFS递归遍历子函数
    for sub_entry_hex in called_funcs:
        sub_addr = program.getAddressFactory().getAddress(sub_entry_hex)
        sub_func = funcManager.getFunctionAt(sub_addr)
        if sub_func is not None:
            dfs_export(sub_func, depth+1)

# 入口
start_addr_obj = program.getAddressFactory().getAddress(START_FUNC_ADDR)
root_func = funcManager.getFunctionContaining(start_addr_obj)
if root_func is None:
    raise Exception("起始地址找不到函数，请核对内存地址，注意Thumb最低位1")

dfs_export(root_func, depth=0)

# 输出全局调用图
with open(os.path.join(OUTPUT_ROOT,"callgraph.json"),"w",encoding="utf‑8") as f:
    json.dump(callGraph,f,indent=2)

print("导出完成，总函数数量：%d" % len(visited))
print("输出目录：%s" % OUTPUT_ROOT)
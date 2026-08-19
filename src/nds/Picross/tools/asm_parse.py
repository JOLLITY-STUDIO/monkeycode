#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
asm_parse.py —— NDS ARM9/ARM7 反汇编文本 → 结构化 JSON
输入：_tmp_disasm_out/arm9.bin.asm / arm7.bin.asm（linear first-pass 反汇编）
输出：_tmp_disasm_out/arm9.json / arm7.json
每条指令：{a: 地址, m: 助记符, o: 操作数原文, ops: [操作数, ...], t: 原始文本}
函数边界启发：push {..lr} 起始 + pop {..pc}/bx lr/ldm..pc 结束
TODO(分块覆盖):
  [ ] 分支目标解析（b/bl/bx 立即数、条件码）
  [ ] 函数边界启发式校正（BL 调用图 + 数据区过滤）
  [ ] 常量池 PC 相对目标回填
"""
import json
import re
import sys

ADDR_RE = re.compile(r"^\s*(0x[0-9a-fA-F]+)\s+(.+)$")


def parse_line(line: str):
    """返回 (addr:int|None, rest:str|None)"""
    m = ADDR_RE.match(line)
    if not m:
        return None, None
    return int(m.group(1), 16), m.group(2)


def split_ops(text: str):
    """把操作数串按逗号粗分（保留 { } [ ] 括号内逗号）"""
    parts = []
    depth = 0
    cur = ""
    for ch in text:
        if ch in "{[":
            depth += 1
        elif ch in "}]":
            depth -= 1
        if ch == "," and depth == 0:
            parts.append(cur.strip())
            cur = ""
        else:
            cur += ch
    if cur.strip():
        parts.append(cur.strip())
    return parts


def main(asm_path: str, out_path: str):
    instructions = []
    with open(asm_path, "r", encoding="utf-8", errors="replace") as f:
        for line in f:
            addr, rest = parse_line(line)
            if addr is None:
                continue
            rest = rest.strip()
            if rest.startswith(".byte") or rest.startswith(".word") or rest.startswith(".ascii"):
                instructions.append({"a": addr, "m": rest.split()[0], "o": rest, "ops": [], "t": rest})
                continue
            parts = rest.split(None, 1)
            mnemonic = parts[0].lower()
            ops = split_ops(parts[1]) if len(parts) > 1 else []
            instructions.append({"a": addr, "m": mnemonic, "o": parts[1] if len(parts) > 1 else "", "ops": ops, "t": rest})

    # 函数边界启发：push {..lr} → 函数起点；pop {..pc}/bx lr/ldm..pc → 终点
    funcs = []
    cur_start = None
    last_addr = None
    for ins in instructions:
        a, m, ops = ins["a"], ins["m"], ins["ops"]
        joined = " ".join(ops)
        if cur_start is None and m.startswith("push") and "lr" in joined:
            cur_start = a
        elif cur_start is not None:
            if (m.startswith("pop") and "pc" in joined) or m == "bx" and ops and "lr" in ops[0] \
               or (m.startswith("ldm") and "pc" in joined and "!" in joined) \
               or m in ("bl", "b", "bx") and a - last_addr > 0x100:  # 超长间隙兜底
                funcs.append({"start": cur_start, "end": a})
                cur_start = None
        last_addr = a
    if cur_start is not None:
        funcs.append({"start": cur_start, "end": last_addr})

    out = {
        "file": asm_path,
        "count": len(instructions),
        "funcs": funcs,
        "instrs": instructions,
    }
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False)
    print(f"[asm_parse] {asm_path}: {len(instructions)} instrs, {len(funcs)} funcs heuristic -> {out_path}")


if __name__ == "__main__":
    if len(sys.argv) > 2:
        main(sys.argv[1], sys.argv[2])
    else:
        main("_tmp_disasm_out/arm9.bin.asm", "_tmp_disasm_out/arm9.json")
        main("_tmp_disasm_out/arm7.bin.asm", "_tmp_disasm_out/arm7.json")

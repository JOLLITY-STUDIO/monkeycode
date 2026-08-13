# -*- coding: utf-8 -*-
"""
disasm_full.py v2 — Pic Pic ARM9/ARM7 完整反汇编
=================================================
策略:
  1. 递归下降: 从入口 + 已知函数开始追踪 BL/B/字面量池
  2. 指针表扫描: 所有指向代码段的 u32 连续 >=2 视为函数指针表, 其目标作为入口
  3. 线性扫描: 递归下降覆盖后，对剩余区间做线性反汇编（标记 DATA 段）
输出:
    tools/arm9-full.dis.txt     完整反汇编（按地址排序）
    tools/arm9-functions.tsv    函数列表
"""
import sys, os, struct, argparse
from pathlib import Path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ndsrom import NdsRom
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM

TOOLS = Path(__file__).resolve().parent


class Disassembler:
    def __init__(self, code, ram, entry, name):
        self.code = code
        self.ram = ram
        self.entry = entry
        self.name = name
        self.md = Cs(CS_ARCH_ARM, CS_MODE_ARM)
        self.done = set()          # 已线性覆盖的指令地址
        self.queued = set()        # 已入队地址
        self.queue = []
        self.insns = {}            # addr -> (mn, op)
        self.blocks = []           # (start, end) 代码块（已反汇编）
        self.entry_points = set()

    def rel(self, addr):
        return addr - self.ram

    def valid(self, addr):
        r = self.rel(addr)
        return 0 <= r < len(self.code) and (addr & 3) == 0

    def enqueue(self, addr):
        if not self.valid(addr) or addr in self.queued or addr in self.done:
            return
        self.queued.add(addr)
        self.queue.append(addr)

    def scan_ptr_tables(self):
        """扫描指向代码段的指针表，返回入口集合"""
        entries = set()
        for off in range(0, len(self.code) - 3, 4):
            v = struct.unpack_from('<I', self.code, off)[0]
            if self.ram + 0x800 <= v < self.ram + len(self.code) and (v & 3) == 0:
                entries.add(v)
        return entries

    def run(self):
        # 入口 + 指针表目标
        entries = self.scan_ptr_tables()
        self.enqueue(self.entry)
        for e in entries:
            self.enqueue(e)
        while self.queue:
            addr = self.queue.pop(0)
            self.linear_trace(addr)
        return self

    def linear_trace(self, addr):
        """从 addr 线性反汇编直到函数返回/跳转到已覆盖区域"""
        r = self.rel(addr)
        md = self.md
        cur = addr
        code = self.code[r:]
        for ins in md.disasm(code, addr):
            a = ins.address
            if a in self.done:
                break
            if a & 3:
                break
            self.done.add(a)
            self.insns[a] = (ins.mnemonic, ins.op_str)
            cur = a
            op = ins.op_str
            mn = ins.mnemonic
            # 追踪直接分支
            if mn in ('b', 'bl', 'blx') and op.startswith('#'):
                try:
                    t = int(op[1:], 16)
                except ValueError:
                    t = None
                if t:
                    if mn in ('bl', 'blx'):
                        self.enqueue(t & ~1)
                    else:
                        self.enqueue(t)
            # ldr pc,[pc,#x] 字面量池
            elif mn == 'ldr' and op.startswith('pc,'):
                try:
                    off = int(op.split('#')[1].split(']')[0], 16) + 8
                    lit_addr = (a & ~3) + off
                    lit_rel = self.rel(lit_addr)
                    if 0 <= lit_rel < len(self.code) - 3:
                        t = struct.unpack_from('<I', self.code, lit_rel)[0]
                        if self.valid(t):
                            self.enqueue(t)
                except Exception:
                    pass
            # 返回指令
            if mn == 'bx' and op == 'lr':
                break
            if mn == 'mov' and op.startswith('pc, lr'):
                break
            if mn in ('pop', 'ldm') and 'pc' in op:
                break
        # 记录块
        if cur >= addr:
            self.blocks.append((addr, cur + 4))

    def func_list(self):
        """函数列表: 所有被 BL 引用或指针表引用的入口 + 主入口"""
        funcs = {}
        for a, (mn, op) in self.insns.items():
            if mn in ('bl', 'blx') and op.startswith('#'):
                try:
                    t = int(op[1:], 16) & ~1
                except ValueError:
                    continue
                funcs.setdefault(t, []).append(a)
        # 指针表目标也作为函数
        entries = self.scan_ptr_tables()
        for e in entries:
            funcs.setdefault(e, [])
        return funcs

    def dump(self, out_path, funcs):
        self.blocks.sort()
        merged = []
        for s, e in self.blocks:
            if merged and s <= merged[-1][1] + 4:
                merged[-1] = (merged[-1][0], max(merged[-1][1], e))
            else:
                merged.append((s, e))
        self.blocks = merged
        lines = []
        lines.append('; Pic Pic %s 完整反汇编' % self.name)
        lines.append('; RAM base: 0x%08X  entry: 0x%08X  size: 0x%X' % (
            self.ram, self.entry, len(self.code)))
        lines.append('; 指令: %d  代码块: %d  函数: %d' % (
            len(self.insns), len(self.blocks), len(funcs)))
        lines.append('')
        func_starts = sorted(funcs)
        fi = 0
        for s, e in self.blocks:
            lines.append('; ---- block 0x%08X - 0x%08X (%d bytes) ----' % (s, e, e - s))
            addr = s
            while addr < e:
                while fi < len(func_starts) and func_starts[fi] < addr:
                    fi += 1
                if fi < len(func_starts) and func_starts[fi] == addr:
                    callers = funcs[addr]
                    lines.append('; ===== FUNC 0x%08X (%d refs: %s) =====' % (
                        addr, len(callers), ', '.join('0x%08X' % c for c in callers[:6])))
                if addr in self.insns:
                    mn, op = self.insns[addr]
                    lines.append('0x%08X  %-8s %s' % (addr, mn, op))
                addr += 4
            # 跳过未反汇编间隙（可能是数据）
            addr = e
        Path(out_path).write_text('\n'.join(lines), encoding='utf-8')
        return out_path

    def dump_funcs_tsv(self, out_path, funcs):
        lines = ['start\tend\tsize\trefs']
        for t in sorted(funcs):
            # 找函数内最大地址
            addrs = [a for a in self.insns if t <= a < t + 0x10000]
            end = max(addrs) + 4 if addrs else t + 4
            lines.append('0x%08X\t0x%08X\t%d\t%d' % (t, end, end - t, len(funcs[t])))
        Path(out_path).write_text('\n'.join(lines), encoding='utf-8')
        return out_path


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--arm9', action='store_true')
    ap.add_argument('--arm7', action='store_true')
    a = ap.parse_args()
    rom = NdsRom()
    h = rom.header(0)
    if a.arm9:
        d = Disassembler(rom.arm9(h), h['arm9_ram'], h['arm9_entry'], 'ARM9')
        d.run()
        funcs = d.func_list()
        f1 = d.dump(TOOLS / 'arm9-full.dis.txt', funcs)
        f2 = d.dump_funcs_tsv(TOOLS / 'arm9-functions.tsv', funcs)
        print('ARM9: %d insns, %d funcs' % (len(d.insns), len(funcs)))
        print(' ->', f1)
        print(' ->', f2)
    if a.arm7:
        d = Disassembler(rom.arm7(h), h['arm7_ram'], h['arm7_entry'], 'ARM7')
        d.run()
        funcs = d.func_list()
        f1 = d.dump(TOOLS / 'arm7-full.dis.txt', funcs)
        f2 = d.dump_funcs_tsv(TOOLS / 'arm7-functions.tsv', funcs)
        print('ARM7: %d insns, %d funcs' % (len(d.insns), len(funcs)))
        print(' ->', f1)
        print(' ->', f2)


if __name__ == '__main__':
    main()

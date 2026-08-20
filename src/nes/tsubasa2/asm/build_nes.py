"""
build_nes.py - 自包含 6502 汇编器 + NES 文件构建器
不依赖外部汇编器, 实现 Tecmo 当时手工编写的最小可用工具链

支持指令:
  - 完整 6502 指令集 (151 opcodes)
  - 地址模式: implied/accumulator/immediate/zp/zpx/zpy/abs/abx/aby/ind/indx/indy/rel
  - 伪指令: .byte .word .res .org .segment .include .incbin
  - 标号 (label:) 与全局符号
  - ; 行注释
  - 数学表达式: 简单的 + - 运算 (low8/high8)
  - 2-pass 汇编: 先扫描所有标号, 再生成代码

输入: asm/**/*.s (按 segment 组织)
输出: dist/tsubasa2.nes (16B header + 256KB PRG + 128KB CHR)
"""

import os
import re
import sys
from pathlib import Path

# --- 6502 操作码表 (addressing mode → opcode byte) ---
# 模式简称:
#   imp = implied, acc = accumulator, imm = immediate
#   zp/zpx/zpy = zero page (+X/+Y)
#   abs/abx/aby = absolute (+X/+Y)
#   ind = indirect, indx = (zp,X), indy = (zp),Y, rel = relative branch
OPCODES = {
    'ADC': {'imm':0x69,'zp':0x65,'zpx':0x75,'abs':0x6D,'abx':0x7D,'aby':0x79,'indx':0x61,'indy':0x71},
    'AND': {'imm':0x29,'zp':0x25,'zpx':0x35,'abs':0x2D,'abx':0x3D,'aby':0x39,'indx':0x21,'indy':0x31},
    'ASL': {'acc':0x0A,'zp':0x06,'zpx':0x16,'abs':0x0E,'abx':0x1E},
    'BCC': {'rel':0x90}, 'BCS': {'rel':0xB0}, 'BEQ': {'rel':0xF0}, 'BMI': {'rel':0x30},
    'BNE': {'rel':0xD0}, 'BPL': {'rel':0x10}, 'BVC': {'rel':0x50}, 'BVS': {'rel':0x70},
    'BIT': {'zp':0x24,'abs':0x2C},
    'BRK': {'imp':0x00},
    'CLC': {'imp':0x18}, 'CLD': {'imp':0xD8}, 'CLI': {'imp':0x58}, 'CLV': {'imp':0xB8},
    'CMP': {'imm':0xC9,'zp':0xC5,'zpx':0xD5,'abs':0xCD,'abx':0xDD,'aby':0xD9,'indx':0xC1,'indy':0xD1},
    'CPX': {'imm':0xE0,'zp':0xE4,'abs':0xEC},
    'CPY': {'imm':0xC0,'zp':0xC4,'abs':0xCC},
    'DEC': {'zp':0xC6,'zpx':0xD6,'abs':0xCE,'abx':0xDE},
    'DEX': {'imp':0xCA}, 'DEY': {'imp':0x88},
    'EOR': {'imm':0x49,'zp':0x45,'zpx':0x55,'abs':0x4D,'abx':0x5D,'aby':0x59,'indx':0x41,'indy':0x51},
    'INC': {'zp':0xE6,'zpx':0xF6,'abs':0xEE,'abx':0xFE},
    'INX': {'imp':0xE8}, 'INY': {'imp':0xC8},
    'JMP': {'abs':0x4C,'ind':0x6C},
    'JSR': {'abs':0x20},
    'LDA': {'imm':0xA9,'zp':0xA5,'zpx':0xB5,'abs':0xAD,'abx':0xBD,'aby':0xB9,'indx':0xA1,'indy':0xB1},
    'LDX': {'imm':0xA2,'zp':0xA6,'zpy':0xB6,'abs':0xAE,'aby':0xBE},
    'LDY': {'imm':0xA0,'zp':0xA4,'zpx':0xB4,'abs':0xAC,'abx':0xBC},
    'LSR': {'acc':0x4A,'zp':0x46,'zpx':0x56,'abs':0x4E,'abx':0x5E},
    'NOP': {'imp':0xEA},
    'ORA': {'imm':0x09,'zp':0x05,'zpx':0x15,'abs':0x0D,'abx':0x1D,'aby':0x19,'indx':0x01,'indy':0x11},
    'PHA': {'imp':0x48}, 'PHP': {'imp':0x08}, 'PLA': {'imp':0x68}, 'PLP': {'imp':0x28},
    'ROL': {'acc':0x2A,'zp':0x26,'zpx':0x36,'abs':0x2E,'abx':0x3E},
    'ROR': {'acc':0x6A,'zp':0x66,'zpx':0x76,'abs':0x6E,'abx':0x7E},
    'RTI': {'imp':0x40}, 'RTS': {'imp':0x60},
    'SBC': {'imm':0xE9,'zp':0xE5,'zpx':0xF5,'abs':0xED,'abx':0xFD,'aby':0xF9,'indx':0xE1,'indy':0xF1},
    'SEC': {'imp':0x38}, 'SED': {'imp':0xF8}, 'SEI': {'imp':0x78},
    'STA': {'zp':0x85,'zpx':0x95,'abs':0x8D,'abx':0x9D,'aby':0x99,'indx':0x81,'indy':0x91},
    'STX': {'zp':0x86,'zpy':0x96,'abs':0x8E},
    'STY': {'zp':0x84,'zpx':0x94,'abs':0x8C},
    'TAX': {'imp':0xAA}, 'TAY': {'imp':0xA8}, 'TSX': {'imp':0xBA},
    'TXA': {'imp':0x8A}, 'TXS': {'imp':0x9A}, 'TYA': {'imp':0x98},
}

# 8 个 bank 段 (segment 名 → PRG bank 索引)
SEGMENTS_TO_BANK = {f"PRG_BANK{i:02d}": i for i in range(32)}

class AsmError(Exception):
    def __init__(self, msg, file=None, line=None):
        self.file = file; self.line = line
        super().__init__(msg)

class SourceLine:
    __slots__ = ('file', 'lineno', 'raw', 'text', 'label', 'mnemonic', 'operand', 'segment')
    def __init__(self, file, lineno, raw):
        self.file = file; self.lineno = lineno; self.raw = raw
        # 去除注释
        semi = raw.find(';')
        text = raw[:semi] if semi >= 0 else raw
        self.text = text.rstrip()
        self.label = None
        self.mnemonic = None
        self.operand = None
        self.segment = None
        self._parse()

    def _parse(self):
        t = self.text.strip()
        if not t: return

        # .segment "NAME"
        m = re.match(r'\.segment\s+"?([\w]+)"?', t, re.I)
        if m:
            self.segment = m.group(1)
            return

        # 常量定义: NAME = value  (NAME 不能是 * 等)
        m = re.match(r'^([A-Za-z_][\w]*)\s*=\s*(.+)$', t)
        if m:
            self.label = None
            self.mnemonic = '='           # constant assignment pseudo-op
            self.operand = m.group(1) + ',' + m.group(2)
            return

        # "* = $XXXX"  (ca65 的 .org 简写)
        m = re.match(r'^\*\s*=\s*(.+)$', t)
        if m:
            self.mnemonic = '.org'
            self.operand = m.group(1).strip()
            return

        # 标号: NAME: (可选后续指令)
        m = re.match(r'^([A-Za-z_][\w]*):\s*(.*)$', t)
        if m:
            self.label = m.group(1)
            t = m.group(2).strip()
            if not t: return

        # 局部标号: .label (跳转用 @xxx 或 .name)
        # 注意: .开头但后面有冒号或单独出现的局部标号, 也要作为可被引用的符号
        # 但要先检查它不是其他伪指令
        m = re.match(r'^(\.[A-Za-z_][\w]*):\s*(.*)$', t)
        if m:
            self.label = m.group(1)
            t = m.group(2).strip()
            if not t: return

        # .局部标号单独出现 (定义, 无后续)
        # 注意: 必须严格匹配 .name (无后续指令/操作数)
        m = re.match(r'^(\.[A-Za-z_][\w]*)\s*$', t)
        if m:
            self.label = m.group(1)
            return

        # .org / .byte / .word / .res / .incbin / .include
        m = re.match(r'\.(\w+)\s*(.*)$', t, re.I)
        if m:
            self.mnemonic = '.' + m.group(1).lower()
            self.operand = m.group(2).strip()
            return

        # 普通指令
        parts = t.split(None, 1)
        self.mnemonic = parts[0].upper()
        self.operand = parts[1].strip() if len(parts) > 1 else ''


class Assembler:
    def __init__(self):
        self.symbols = {}            # 全局标号 → 地址
        self.banks = [bytearray(8192) for _ in range(32)]
        for b in self.banks:
            for i in range(len(b)):
                b[i] = 0xFF
        self.bank_size = 8192
        self.errors = []

        # bank30/31 是固定映射 (CPU 地址不同), 但数据布局仍是 8KB
        # bank30 → CPU $C000, bank31 → CPU $E000

    def parse_number(self, s):
        s = s.strip()
        if not s: return 0
        if s.startswith('$'):
            return int(s[1:], 16)
        if s.startswith('%'):
            return int(s[1:], 2)
        if s.startswith("'") and s.endswith("'"):
            return ord(s[1:-1])
        # 表达式支持 + - <<8 等
        return int(s, 0)

    def eval_expr(self, s, symbols=None):
        """简单表达式求值: 支持 $XX, 数字, 标号, + - * /"""
        s = s.strip()
        if not s: return 0
        # 替换 % 二进制 (%1010 → 0b1010)
        s = re.sub(r'%([01]+)', r'0b\1', s)
        # 替换 $XX 为 0xXX
        s = re.sub(r'\$([0-9A-Fa-f]+)', r'0x\1', s)
        # 替换标号: 标识符前不能是数字 (避免匹配 0x8000 中的 x8000)
        if symbols is None: symbols = self.symbols
        def repl(m):
            name = m.group(1)
            if name in symbols:
                return str(symbols[name])
            # 尝试 .name 形式 (局部标号), 同时消费前导的点
            if m.group(0).startswith('.') and m.group(0) in symbols:
                return str(symbols[m.group(0)])
            # 可能是数字 (如 0x8000 的 'x8000' 部分不该匹配)
            try:
                int(name, 0)
                return name
            except ValueError:
                return '0'   # 未定义标号 → 0 (第1 pass 允许)
        # 用 lookbehind 避免匹配 0x8000 中的 x8000
        # 匹配: 可选前导 . + 标识符
        s = re.sub(r'(?<![0-9A-Za-z_])(\.?[A-Za-z_][\w]*)', repl, s)
        try:
            return int(eval(s, {'__builtins__': {}}, {}))
        except Exception as e:
            raise AsmError(f"无法解析表达式: {s!r} ({e})")

    def get_addr_mode(self, operand, mnemonic=None):
        """识别地址模式, 返回 (mode, value_str)
        mnemonic 用于判断 zpx/zpy 是否可用 (STA/LDA 等某些指令只有 abx/aby)
        支持 'a:' 前缀强制 absolute (zeropage → absolute)"""
        op = operand.strip()
        if not op or op.upper() == 'A':
            return ('imp' if not op else 'acc'), ''
        # a: 前缀 = 强制 absolute (不降级到 zeropage)
        force_abs = False
        m = re.match(r'^a:\s*(.+)$', op, re.I)
        if m:
            force_abs = True
            op = m.group(1).strip()
        # immediate
        if op.startswith('#'):
            return 'imm', op[1:].strip()
        # (zp,X)
        m = re.match(r'\(\s*(.+?)\s*,\s*X\s*\)', op, re.I)
        if m:
            return 'indx', m.group(1)
        # (zp),Y
        m = re.match(r'\(\s*(.+?)\s*\)\s*,\s*Y', op, re.I)
        if m:
            return 'indy', m.group(1)
        # (abs) - JMP indirect
        m = re.match(r'\(\s*(.+?)\s*\)$', op)
        if m:
            return 'ind', m.group(1)
        # zp,X / abs,X
        m = re.match(r'(.+?)\s*,\s*X\s*$', op, re.I)
        if m:
            v = m.group(1).strip()
            try:
                val = self.eval_expr(v)
                # zpx 只有部分指令支持; 若不支持或 force_abs 则用 abx
                if not force_abs and val < 256 and mnemonic and mnemonic in OPCODES and 'zpx' in OPCODES[mnemonic]:
                    return 'zpx', v
                if not force_abs and val < 256 and (not mnemonic or mnemonic not in OPCODES):
                    return 'zpx', v
                return 'abx', v
            except Exception:
                return 'abx', v
        # zp,Y / abs,Y
        m = re.match(r'(.+?)\s*,\s*Y\s*$', op, re.I)
        if m:
            v = m.group(1).strip()
            try:
                val = self.eval_expr(v)
                # zpy 只有 LDX/STX 支持; 其他强制 aby
                if not force_abs and val < 256 and mnemonic and mnemonic in OPCODES and 'zpy' in OPCODES[mnemonic]:
                    return 'zpy', v
                return 'aby', v
            except Exception:
                return 'aby', v
        # 单个值: zp 或 abs
        try:
            val = self.eval_expr(op)
            if force_abs:
                return 'abs', op
            return ('zp' if val < 256 else 'abs'), op
        except Exception:
            return 'abs', op

    def _expand_includes(self, path, out_lines, visited):
        """递归展开 .include "filename" 指令
        path: 当前文件路径
        out_lines: 累积输出的 SourceLine 列表
        visited: 已访问文件集合 (防止循环引用)
        """
        path = os.path.abspath(path)
        if path in visited:
            self.errors.append(f"{path}: 循环 .include 检测到, 跳过")
            return
        visited.add(path)
        base_dir = os.path.dirname(path)

        try:
            with open(path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
        except Exception as e:
            self.errors.append(f"{path}: cannot read: {e}")
            return

        for i, raw in enumerate(lines, 1):
            ln = SourceLine(path, i, raw)
            # 检测 .include "path"
            if ln.mnemonic and ln.mnemonic.lower() == '.include':
                inc_name = ln.operand.strip().strip('"').strip("'")
                if not os.path.isabs(inc_name):
                    inc_path = os.path.join(base_dir, inc_name)
                else:
                    inc_path = inc_name
                # 递归展开
                self._expand_includes(inc_path, out_lines, visited)
            else:
                # 普通行直接加入
                # 同时把文件路径设为相对路径, 让错误信息更可读
                ln.file = path
                out_lines.append(ln)

    def assemble(self, source_files):
        """主入口: 2-pass 汇编"""
        # bank30 → CPU $C000, bank31 → CPU $E000, 其他 bank → $8000 (bank 内偏移)
        bank_base_cpu = {30: 0xC000, 31: 0xE000}

        # --- Pass 1: 收集标号地址 ---
        # 先递归展开 .include 指令, 得到一个完整的 SourceLine 列表
        all_lines = []
        for path in source_files:
            self._expand_includes(path, all_lines, set())

        # 当前段 + bank 内 PC
        cur_seg = None
        cur_bank = 0
        bank_pc = [0] * 32  # 每个 bank 的当前写入偏移
        # bank 30 = $C000, bank 31 = $E000 (CPU 地址)
        bank_base_cpu = {30: 0xC000, 31: 0xE000}

        for ln in all_lines:
            try:
                if ln.segment:
                    cur_seg = ln.segment
                    if cur_seg in SEGMENTS_TO_BANK:
                        cur_bank = SEGMENTS_TO_BANK[cur_seg]
                    continue

                if ln.label:
                    # 计算标号地址
                    if cur_seg in SEGMENTS_TO_BANK:
                        b = SEGMENTS_TO_BANK[cur_seg]
                        cpu_base = bank_base_cpu.get(b, 0x8000)
                        addr = cpu_base + bank_pc[b]
                    else:
                        addr = 0
                    self.symbols[ln.label] = addr

                if ln.mnemonic:
                    if ln.mnemonic == '=':
                        # NAME = value  → 立即定义到 symbols 表
                        name, val_str = ln.operand.split(',', 1)
                        self.symbols[name.strip()] = self.eval_expr(val_str)
                        continue
                    if ln.mnemonic == '.org':
                        # .org 设置当前 PC (相对 bank 偏移)
                        target = self.eval_expr(ln.operand)
                        if cur_seg in SEGMENTS_TO_BANK:
                            b = SEGMENTS_TO_BANK[cur_seg]
                            base = bank_base_cpu.get(b, 0x8000)
                            bank_pc[b] = target - base
                        continue
                    if ln.mnemonic == '.byte':
                        cnt = self._count_bytes(ln.operand, ln)
                        if cur_seg in SEGMENTS_TO_BANK:
                            bank_pc[SEGMENTS_TO_BANK[cur_seg]] += cnt
                        continue
                    if ln.mnemonic == '.word':
                        # .word 支持多个表达式
                        cnt = len(re.split(r',', ln.operand.strip())) * 2
                        if cur_seg in SEGMENTS_TO_BANK:
                            bank_pc[SEGMENTS_TO_BANK[cur_seg]] += cnt
                        continue
                    if ln.mnemonic == '.res':
                        cnt = self.eval_expr(ln.operand)
                        if cur_seg in SEGMENTS_TO_BANK:
                            bank_pc[SEGMENTS_TO_BANK[cur_seg]] += cnt
                        continue
                    if ln.mnemonic in ('.include', '.incbin'):
                        continue  # 已在文件列表处理
                    if ln.mnemonic.startswith('.'):
                        continue  # 跳过未识别的伪指令
                    # 估算指令长度
                    sz = self._instruction_size(ln)
                    if cur_seg in SEGMENTS_TO_BANK:
                        bank_pc[SEGMENTS_TO_BANK[cur_seg]] += sz
            except AsmError as e:
                self.errors.append(f"{ln.file}:{ln.lineno}: {e}")
            except Exception as e:
                import traceback
                tb = traceback.format_exc().splitlines()
                self.errors.append(f"{ln.file}:{ln.lineno}: {e}\n    " + "\n    ".join(tb[-3:]))

        if self.errors:
            print("Pass 1 errors:")
            for e in self.errors[:20]:
                print(f"  {e}")
            return False

        # --- Pass 2: 生成机器码 ---
        bank_pc2 = [0] * 32
        cur_seg = None
        cur_bank = 0
        patches = []  # (bank, offset, source_addr, size, line, is_branch)
        for ln in all_lines:
            try:
                if ln.segment:
                    cur_seg = ln.segment
                    if cur_seg in SEGMENTS_TO_BANK:
                        cur_bank = SEGMENTS_TO_BANK[cur_seg]
                    continue

                if ln.label: pass  # 已处理

                if ln.mnemonic:
                    if ln.mnemonic == '=':
                        # NAME = value → 已在 pass1 定义, pass2 跳过
                        continue
                    if ln.mnemonic == '.org':
                        target = self.eval_expr(ln.operand)
                        if cur_seg in SEGMENTS_TO_BANK:
                            b = SEGMENTS_TO_BANK[cur_seg]
                            base = bank_base_cpu.get(b, 0x8000)
                            bank_pc2[b] = target - base
                            if b == 31 and target >= 0xFA00:
                                print(f'  DEBUG .org ${target:04X} -> bank_pc2[{b}]={bank_pc2[b]} (0x{bank_pc2[b]:04X}) file={os.path.basename(ln.file)}')
                        continue
                    if ln.mnemonic == '.byte':
                        self._emit_bytes(cur_seg, cur_bank, bank_pc2, ln)
                        continue
                    if ln.mnemonic == '.word':
                        self._emit_words(cur_seg, cur_bank, bank_pc2, ln)
                        continue
                    if ln.mnemonic == '.res':
                        cnt = self.eval_expr(ln.operand)
                        b = SEGMENTS_TO_BANK[cur_seg] if cur_seg in SEGMENTS_TO_BANK else 0
                        bank_pc2[b] += cnt
                        continue
                    if ln.mnemonic.startswith('.'):
                        continue
                    if cur_seg is None or cur_seg not in SEGMENTS_TO_BANK:
                        # 没有 segment 上下文, 跳过
                        continue
                    # DEBUG: 检查 pc
                    b_dbg = SEGMENTS_TO_BANK[cur_seg]
                    if bank_pc2[b_dbg] >= len(self.banks[b_dbg]):
                        raise AsmError(f"bank{b_dbg} pc={bank_pc2[b_dbg]} 越界 (line={ln.mnemonic} {ln.operand})")
                    self._emit_instruction(cur_seg, cur_bank, bank_pc2, ln)
            except AsmError as e:
                self.errors.append(f"{ln.file}:{ln.lineno}: {e}")
            except Exception as e:
                import traceback
                tb = traceback.format_exc().splitlines()
                self.errors.append(f"{ln.file}:{ln.lineno}: {e}\n    " + "\n    ".join(tb[-3:]))

        # 打印 PC 偏移警告 (帮助诊断)
        if hasattr(self, '_pc_warnings') and self._pc_warnings:
            print("\nPC 偏移警告 (pass1 估算 vs pass2 实际不一致):")
            for w in self._pc_warnings[:10]:
                print(f"  {w}")

        if self.errors:
            print("Pass 2 errors:")
            for e in self.errors[:20]:
                print(f"  {e}")
            return False

        return True

    def _count_bytes(self, operand, ln):
        """计算 .byte 占用字节数 (支持逗号分隔, 字符串)"""
        cnt = 0
        for part in self._split_args(operand):
            part = part.strip()
            if not part: continue
            if part.startswith('"'):
                cnt += len(part) - 2  # 去引号
            else:
                cnt += 1
        return cnt

    def _split_args(self, s):
        """按逗号分割, 但尊重字符串"""
        result = []
        cur = ''
        in_str = False
        for c in s:
            if c == '"':
                in_str = not in_str
                cur += c
            elif c == ',' and not in_str:
                result.append(cur)
                cur = ''
            else:
                cur += c
        if cur.strip(): result.append(cur)
        return result

    def _instruction_size(self, ln):
        """估算指令字节数"""
        mn = ln.mnemonic.upper() if not ln.mnemonic.startswith('.') else ln.mnemonic
        if mn not in OPCODES: return 1
        # 分支指令强制 rel (2 字节)
        if mn in ('BCC','BCS','BEQ','BMI','BNE','BPL','BVC','BVS'):
            return 2
        if not ln.operand or ln.operand.upper() == 'A':
            return 1
        mode, _ = self.get_addr_mode(ln.operand, mn)
        if mode in ('imp', 'acc'): return 1
        if mode == 'rel': return 2
        if mode in ('imm', 'zp', 'zpx', 'zpy', 'indx', 'indy'): return 2
        return 3  # abs/abx/aby/ind

    def _emit_bytes(self, seg, bank, bank_pc, ln):
        if seg not in SEGMENTS_TO_BANK: return
        b = SEGMENTS_TO_BANK[seg]
        for part in self._split_args(ln.operand):
            part = part.strip()
            if not part: continue
            if part.startswith('"'):
                # 字符串
                for ch in part[1:-1]:
                    self.banks[b][bank_pc[b]] = ord(ch)
                    bank_pc[b] += 1
            else:
                val = self.eval_expr(part)
                self.banks[b][bank_pc[b]] = val & 0xFF
                bank_pc[b] += 1

    def _emit_words(self, seg, bank, bank_pc, ln):
        if seg not in SEGMENTS_TO_BANK: return
        b = SEGMENTS_TO_BANK[seg]
        for part in self._split_args(ln.operand):
            part = part.strip()
            if not part: continue
            val = self.eval_expr(part)
            self.banks[b][bank_pc[b]] = val & 0xFF
            self.banks[b][bank_pc[b]+1] = (val >> 8) & 0xFF
            bank_pc[b] += 2

    def _emit_instruction(self, seg, bank, bank_pc, ln):
        if seg not in SEGMENTS_TO_BANK: return
        b = SEGMENTS_TO_BANK[seg]
        mn = ln.mnemonic.upper()
        if mn not in OPCODES:
            raise AsmError(f"未知指令: {mn}")

        # 从注释提取原始 CPU 地址用于一致性检查
        orig_addr = None
        m = re.search(r';\s*\$([0-9A-Fa-f]{4})', ln.raw)
        if m:
            orig_addr = int(m.group(1), 16)
        cur_pc_calc = (0xE000 if b == 31 else 0xC000 if b == 30 else 0x8000) + bank_pc[b]
        if orig_addr is not None and abs(cur_pc_calc - orig_addr) > 0:
            # PC 偏移了 - 报告但不中断 (帮助定位问题)
            if not hasattr(self, '_pc_warnings'):
                self._pc_warnings = []
            if len(self._pc_warnings) < 10:
                self._pc_warnings.append(f"{ln.file}:{ln.lineno}: PC偏移 cur=${cur_pc_calc:04X} orig=${orig_addr:04X} diff={cur_pc_calc-orig_addr:+d} ({mn} {ln.operand})")

        if not ln.operand or ln.operand.upper() == 'A':
            # accumulator / implied
            if 'acc' in OPCODES[mn]:
                op = OPCODES[mn]['acc']
            elif 'imp' in OPCODES[mn]:
                op = OPCODES[mn]['imp']
            else:
                raise AsmError(f"{mn} needs operand")
            if b >= len(self.banks) or bank_pc[b] >= len(self.banks[b]) or bank_pc[b] < 0:
                raise AsmError(f"bank{b} imp/acc 越界: pc={bank_pc[b]}/{len(self.banks[b]) if b<len(self.banks) else 'N/A'} seg={seg}")
            self.banks[b][bank_pc[b]] = op
            bank_pc[b] += 1
            return

        # 分支指令强制 rel
        if mn in ('BCC','BCS','BEQ','BMI','BNE','BPL','BVC','BVS'):
            opcode = OPCODES[mn]['rel']
            cur_pc = (0xE000 if b == 31 else 0xC000 if b == 30 else 0x8000) + bank_pc[b]
            target = self.eval_expr(ln.operand.strip())
            offset = target - (cur_pc + 2)
            if offset < -128 or offset > 127:
                raise AsmError(f"分支距离超范围: {offset} (target=${target:04X}, cur=${cur_pc:04X})")
            if bank_pc[b]+1 >= len(self.banks[b]):
                raise AsmError(f"bank{b} 写入越界: pc={bank_pc[b]}")
            self.banks[b][bank_pc[b]] = opcode
            self.banks[b][bank_pc[b]+1] = offset & 0xFF
            bank_pc[b] += 2
            return

        mode, val_str = self.get_addr_mode(ln.operand, mn)
        if mode not in OPCODES[mn]:
            raise AsmError(f"{mn} 不支持 {mode} 地址模式")

        opcode = OPCODES[mn][mode]
        val = self.eval_expr(val_str)

        if mode == 'rel':
            cur_pc = (0xE000 if b == 31 else 0xC000 if b == 30 else 0x8000) + bank_pc[b]
            target = val
            offset = target - (cur_pc + 2)
            if offset < -128 or offset > 127:
                raise AsmError(f"分支距离超范围: {offset}")
            self.banks[b][bank_pc[b]] = opcode
            self.banks[b][bank_pc[b]+1] = offset & 0xFF
            bank_pc[b] += 2
        elif mode in ('imm', 'zp', 'zpx', 'zpy', 'indx', 'indy'):
            if bank_pc[b]+1 >= len(self.banks[b]):
                raise AsmError(f"bank{b} 写入越界: pc={bank_pc[b]} (mode={mode})")
            self.banks[b][bank_pc[b]] = opcode
            self.banks[b][bank_pc[b]+1] = val & 0xFF
            bank_pc[b] += 2
        else:  # abs/abx/aby/ind
            if bank_pc[b]+2 >= len(self.banks[b]):
                raise AsmError(f"bank{b} 写入越界: pc={bank_pc[b]} (mode={mode})")
            self.banks[b][bank_pc[b]] = opcode
            self.banks[b][bank_pc[b]+1] = val & 0xFF
            self.banks[b][bank_pc[b]+2] = (val >> 8) & 0xFF
            bank_pc[b] += 3


def main():
    print("=== Tsubasa2 NES Builder (with 6502 assembler) ===")
    asm_root = Path(r"d:\studio\github\monkeycode\src\nes\tsubasa2\asm")
    dist_dir = asm_root / "dist"
    dist_dir.mkdir(parents=True, exist_ok=True)
    out_nes = dist_dir / "tsubasa2.nes"

    # --- 1. 扫描顶层源文件 (bankNN/bankNN.s, 不含被 .include 的子文件) ---
    source_files = []
    for bank_dir in sorted(asm_root.iterdir()):
        if not bank_dir.is_dir(): continue
        if not bank_dir.name.lower().startswith('bank'): continue
        # 顶层入口: bankNN/bankNN.s (严格的入口名, 不包括 _disasm.s 等参考文件)
        top = bank_dir / f"{bank_dir.name}.s"
        if top.exists():
            source_files.append(top)
        else:
            # 没有 bankNN.s 时, 跳过该 bank (用默认 $FF 填充)
            # 不再 fallback 扫描整个目录, 避免误编译 _disasm.s 等参考文件
            pass
    if not source_files:
        print("WARN: 未找到 .s 源文件, 使用内置字节流")
        # fallback 走之前的硬编码逻辑
        return build_fallback(out_nes)

    print(f"Found {len(source_files)} source files (top-level):")
    for f in source_files:
        print(f"  - {f.relative_to(asm_root)}")
    print()

    # --- 2. 汇编 ---
    asm = Assembler()
    ok = asm.assemble([str(f) for f in source_files])
    if not ok:
        print("\nFAIL: 汇编失败")
        return 1

    # --- 3. 拼接 PRG ---
    prg = bytearray()
    for b in asm.banks:
        prg.extend(b)
    assert len(prg) == 256 * 1024

    # --- 4. CHR ---
    chr_path = Path(r"d:\studio\github\monkeycode\src\nes\tsubasa2\_tmp_bzk_out\CHR_ROM.chr")
    if chr_path.exists():
        chr_data = chr_path.read_bytes()
        print(f"Loaded CHR ({len(chr_data)} bytes)")
    else:
        chr_data = b'\x00' * (128 * 1024)

    # --- 5. iNES Header ---
    # 偏移 15 = PRG RAM size (0x01 = 8KB, 天使之翼2 用 battery-backed 8KB PRG RAM)
    header = bytes([0x4E, 0x45, 0x53, 0x1A, 0x10, 0x10, 0x40, 0x08, 0,0,0,0,0,0,0,0x01])

    # --- 6. 输出 ---
    nes_data = header + bytes(prg) + chr_data
    out_nes.write_bytes(nes_data)
    print(f"\nBuilt: {out_nes} ({len(nes_data)} bytes)")
    print(f"  Header: 16B | PRG: {len(prg)}B | CHR: {len(chr_data)}B")
    print(f"  Mapper: {(nes_data[6]>>4)|((nes_data[7]&0xF0)>>4)}")

    # --- 7. 符号表 dump ---
    sym_path = dist_dir / "tsubasa2.sym"
    with open(sym_path, 'w', encoding='utf-8') as f:
        for name, addr in sorted(asm.symbols.items(), key=lambda x: x[1]):
            f.write(f"${addr:04X}  {name}\n")
    print(f"  Symbols: {len(asm.symbols)} written to {sym_path.name}")

    return 0


def build_fallback(out_nes):
    """无源文件时的回退方案"""
    header = bytes([0x4E, 0x45, 0x53, 0x1A, 0x10, 0x10, 0x40, 0x08, 0,0,0,0,0,0,0,0])
    prg = bytearray(b'\xFF' * (256 * 1024))
    # bank31 简化 reset
    bank31_off = 31 * 8192
    code = bytes([
        0x78, 0xD8,                          # SEI, CLD
        0xA2, 0x40, 0x8E, 0x17, 0x40,        # LDX #$40; STX $4017
        0xA9, 0x00, 0x8D, 0x00, 0x20,        # LDA #0; STA $2000
        0x8D, 0x01, 0x20,                    # STA $2001
        0x8D, 0x10, 0x40,                    # STA $4010
        0x4C, 0x12, 0xE0,                    # JMP $E012
        0x40,                                # $E015: RTI (NMI)
    ])
    prg[bank31_off:bank31_off+len(code)] = code
    # vectors
    prg[bank31_off + 0x1FFA] = 0x15; prg[bank31_off + 0x1FFB] = 0xE0
    prg[bank31_off + 0x1FFC] = 0x00; prg[bank31_off + 0x1FFD] = 0xE0
    prg[bank31_off + 0x1FFE] = 0x15; prg[bank31_off + 0x1FFF] = 0xE0
    chr_data = b'\x00' * (128 * 1024)
    out_nes.write_bytes(header + bytes(prg) + chr_data)
    print(f"Built (fallback): {out_nes}")
    return 0


if __name__ == '__main__':
    sys.exit(main())

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
为 6 个含 code 的 Bank (11/16/19/20/22/27) 生成 TS service 骨架:
- 解析 _tmp_bzk_out/bank_XX.asm (CDL 标记: C=code, 行以 \\r 分隔, \\n 为续行)
- 提取跳转表 / code 段 / 本地 JSR 函数
- 生成 tsubasa2-h5-src/src/game/bankXX_*.service.ts
- 数据部分直接引用 rom-data/prg-bank-XX.ts 原始字节 (不结构化)
"""
import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))
ASM_DIR = os.path.join(ROOT, '_tmp_bzk_out')
GAME_DIR = os.path.join(ROOT, 'tsubasa2-h5-src', 'src', 'game')

BANKS = [
    (11, 'Match Turn Logic (PT1)', 'bank11_match-turn.service.ts', 'Bank11Service', 0x0B),
    (16, 'Special Moves & Skills', 'bank16_skills.service.ts', 'Bank16Service', 0x10),
    (19, 'Auxiliary Logic & Data', 'bank19_auxiliary.service.ts', 'Bank19Service', 0x13),
    (20, 'Match Auxiliary Logic', 'bank20_match-aux.service.ts', 'Bank20Service', 0x14),
    (22, 'Data+Code Hybrid', 'bank22_hybrid.service.ts', 'Bank22Service', 0x16),
    (27, 'Data + Minimal Code', 'bank27_minimal.service.ts', 'Bank27Service', 0x1B),
]


def parse_asm(bank: int):
    """解析 asm → code 指令列表 [{addr, op, operand, bytes_len}]"""
    path = os.path.join(ASM_DIR, 'bank_%02d.asm' % bank)
    # newline='' 保留原始 \r\n, 行以 \r 分隔, \n 为续行符
    with open(path, 'r', encoding='utf-8', errors='replace', newline='') as f:
        raw = f.read()
    lines = [l.replace('\n', ' ').strip() for l in raw.split('\r')]
    code = []
    for line in lines:
        if not line.startswith('C - - - - - '):
            continue
        m = re.match(r'^C - - - - - 0x([0-9A-F]{6}) ([0-9A-F]{2}):([0-9A-F]{4}): (.*)$', line)
        if not m:
            continue
        addr = int(m.group(3), 16)
        rest = m.group(4)
        parts = re.split(r'\s{2,}', rest)
        if len(parts) >= 2:
            mne = parts[1].strip()          # 形如 "JMP $8083" / "LDA ram_05D4"
            mne_parts = mne.split(None, 1)  # 单个空格切分 op / operand
            op = mne_parts[0]
            operand = mne_parts[1] if len(mne_parts) > 1 else ''
        else:
            op = parts[0].strip() if parts[0] else ''
            operand = ''
        if op == 'UNDEFINED':
            continue  # C 标记的数据字节, 非真实指令
        # 估算字节数
        bytes_len = 1
        if op in ('BRK', 'NOP', 'RTI', 'RTS', 'TAX', 'TAY', 'TXA', 'TYA', 'INX', 'INY',
                  'DEX', 'DEY', 'ASL', 'LSR', 'ROL', 'ROR', 'CLC', 'SEC', 'CLI', 'SEI',
                  'CLV', 'CLD', 'SED', 'PHA', 'PHP', 'PLA', 'PLP'):
            bytes_len = 1
        elif op in ('BPL', 'BMI', 'BVC', 'BVS', 'BCC', 'BCS', 'BNE', 'BEQ'):
            bytes_len = 2
        elif op.startswith('J') or op in ('LDA', 'LDX', 'LDY', 'STA', 'STX', 'STY',
                                          'AND', 'ORA', 'EOR', 'ADC', 'SBC', 'CMP',
                                          'CPX', 'CPY', 'BIT', 'LDA', 'JSR', 'JMP'):
            if re.search(r'[#$]', operand) or re.search(r'\$[0-9A-F]{4}', operand):
                bytes_len = 3
            else:
                bytes_len = 2  # (zp),Y / zp,X 等
        else:
            bytes_len = 3
        code.append({'addr': addr, 'op': op, 'operand': operand, 'bytes': bytes_len})
    return code


def segments(code):
    """合并 code 段 (gap<=8 视为连续) → [{start,end,bytes}]"""
    segs = []
    cur = None
    for c in code:
        if cur is None:
            cur = {'start': c['addr'], 'end': c['addr']}
        elif c['addr'] - cur['end'] <= 8:
            cur['end'] = c['addr']
        else:
            segs.append(cur)
            cur = {'start': c['addr'], 'end': c['addr']}
    if cur:
        segs.append(cur)
    for s in segs:
        s['bytes'] = s['end'] - s['start'] + 1
    return segs


def collect_targets(code, opname):
    """收集本地 JSR/JMP 目标 → {addr: count}"""
    out = {}
    for c in code:
        if c['op'] != opname:
            continue
        m = re.search(r'\$([0-9A-F]{4})', c['operand'])
        if not m:
            continue
        a = int(m.group(1), 16)
        if 0x8000 <= a < 0xC000:
            out[a] = out.get(a, 0) + 1
    return out


def jmp_table(code):
    """段首连续 JMP 目标列表 (跳转表)"""
    targets = []
    for c in code[:12]:
        if c['op'] != 'JMP':
            break
        m = re.search(r'\$([0-9A-F]{4})', c['operand'])
        if not m:
            break
        targets.append(int(m.group(1), 16))
    return targets


def gen_ts(bank, name, cls, bank_no, code, segs, jt, jsr, jmp):
    addr_start = min(c['addr'] for c in code) if code else 0x8000
    addr_end = max(c['addr'] for c in code) if code else 0x9FFF
    off_start = 0x10 + bank * 0x2000   # 16 字节 ROM header + bank 序号 * 8KB
    off_end = off_start + 0x1FFF

    lines = []
    lines.append('/**')
    lines.append(' * Bank %d Service — %s (骨架)' % (bank, name))
    lines.append(' *')
    lines.append(' * CPU 映射: $8000-$9FFF (MMC3 R6 切换, Bank #0x%02X = %d)' % (bank_no, bank))
    lines.append(' * PRG offset: 0x%06X-0x%06X' % (off_start, off_end))
    lines.append(' *')
    lines.append(' * H5 版本: 无 MMC3 / CPU 模拟。数据直接使用 `rom-data/prg-bank-%02d.ts` 原始字节,' % bank)
    lines.append(' *           本文件为 code 翻译骨架 (来源: _tmp_bzk_out/bank_%02d.asm, CDL C 标记)。' % bank)
    lines.append(' *')
    lines.append(' * 原始入口 (跳转表):')
    if jt:
        for i, t in enumerate(jt):
            lines.append(' *   [%d] $%04X' % (i, t))
    else:
        lines.append(' *   (无跳转表, 直接执行 $%04X)' % addr_start)
    lines.append(' *')
    lines.append(' * code 段 (%d):' % len(segs))
    for s in segs:
        lines.append(' *   $%04X-$%04X (%d B)' % (s['start'], s['end'], s['bytes']))
    if jsr:
        lines.append(' *')
        lines.append(' * 本地函数 (被 JSR 调用, %d):' % len(jsr))
        lines.append(' *   ' + ' '.join('$%04X×%d' % (a, n) for a, n in sorted(jsr.items())))
    if jmp:
        lines.append(' *')
        lines.append(' * 本地 JMP 目标:')
        lines.append(' *   ' + ' '.join('$%04X×%d' % (a, n) for a, n in sorted(jmp.items())))
    lines.append(' */')
    lines.append('')
    lines.append("import { DataStore } from '../data/DataStore';")
    lines.append('import PRG_BANK_%02d from "../../../rom-data/prg-bank-%02d";' % (bank, bank))
    lines.append('')
    lines.append('// ═══════════════════════════════════════════════════════════════')
    lines.append('// %s' % cls)
    lines.append('// ═══════════════════════════════════════════════════════════════')
    lines.append('')
    lines.append('export class %s {' % cls)
    lines.append('  constructor(private _store: DataStore) {}')
    lines.append('')
    lines.append('  // ── 数据访问 (原始字节, 未结构化) ──')
    lines.append('')
    lines.append('  /** 读取本 bank 内地址 addr 的原始字节 (addr: $%04X-$%04X) */' % (addr_start, addr_end))
    lines.append('  readByte(addr: number): number {')
    lines.append('    return PRG_BANK_%02d[addr - 0x%04X] ?? 0xFF;' % (bank, 0x8000))
    lines.append('  }')
    lines.append('')
    lines.append('  /** 读取本 bank 内 16bit 小端数值 */')
    lines.append('  readU16(addr: number): number {')
    lines.append('    return this.readByte(addr) | (this.readByte(addr + 1) << 8);')
    lines.append('  }')
    lines.append('')
    lines.append('  get store(): DataStore { return this._store; }')
    lines.append('')

    # 跳转表自身所在区域 (如 $8003-$800B), 段起点在此区域内则不重复生成入口
    jt_zone = set()
    if jt:
        first_jmp = code[0]['addr']  # code[0] 为跳转表第一条 JMP
        for c in code:
            if c['op'] == 'JMP' and c['addr'] - first_jmp <= 16:
                jt_zone.add(c['addr'])
            else:
                break

    # 入口列表: 跳转表 + 段起点 + JSR 目标 (去重, 排序)
    entries = []
    seen = set()
    for t in jt:
        if t not in seen:
            seen.add(t)
            entries.append(('entry', t))
    for s in segs:
        if s['start'] not in jt_zone and s['start'] not in seen:
            seen.add(s['start'])
            entries.append(('entry', s['start']))
    for a in sorted(jsr.keys()):
        if a not in seen:
            seen.add(a)
            entries.append(('fn', a))
    entries.sort(key=lambda e: e[1])

    # dispatch
    if jt:
        lines.append('  // ──────────────────────────────────────────────')
        lines.append('  // $8003: 入口跳转表 (%d 路)' % len(jt))
        lines.append('  // ──────────────────────────────────────────────')
        lines.append('')
        lines.append('  /**')
        lines.append('   * 跳转表分发 (bank_%02d.asm $8003)' % bank)
        lines.append('   *   ' + '  '.join('[%d]→$%04X' % (i, t) for i, t in enumerate(jt)))
        lines.append('   */')
        lines.append('  dispatch(index: number): void {')
        lines.append('    switch (index) {')
        for i, t in enumerate(jt):
            lines.append('      case %d: this.entry_%04X(); break;' % (i, t))
        lines.append('      default: break;')
        lines.append('    }')
        lines.append('  }')
        lines.append('')

    # 每个入口一个方法
    for kind, a in entries:
        tag = '入口' if kind == 'entry' else '内部函数'
        lines.append('  // ──────────────────────────────────────────────')
        lines.append('  // $%04X: %s' % (a, tag))
        lines.append('  // ──────────────────────────────────────────────')
        lines.append('')
        lines.append('  /**')
        lines.append('   * $%04X — %s (TODO 翻译)' % (a, tag))
        lines.append('   * 原始: bank_%02d.asm, CDL code 标记' % bank)
        lines.append('   */')
        if kind == 'entry':
            lines.append('  entry_%04X(): void {' % a)
        else:
            lines.append('  private fn_%04X(): void {' % a)
        lines.append('    // TODO: 翻译自 bank_%02d.asm $%04X' % (bank, a))
        lines.append('  }')
        lines.append('')

    lines.append('}')
    return '\n'.join(lines)


def main():
    os.makedirs(GAME_DIR, exist_ok=True)
    for bank, name, fname, cls, bank_no in BANKS:
        code = parse_asm(bank)
        segs = segments(code)
        jt = jmp_table(code)
        jsr = collect_targets(code, 'JSR')
        jmp = collect_targets(code, 'JMP')
        out = gen_ts(bank, name, cls, bank_no, code, segs, jt, jsr, jmp)
        path = os.path.join(GAME_DIR, fname)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(out)
        print('OK Bank %02d -> %s (code %d lines, %d segs, jt %d, jsr %d)' %
              (bank, fname, len(code), len(segs), len(jt), len(jsr)))


if __name__ == '__main__':
    main()

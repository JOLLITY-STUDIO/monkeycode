# -*- coding: utf-8 -*-
"""
disasm_state_machine.py — 状态机完整反汇编输出
输出: tools/state-machine.dis.txt
包含:
  1. 状态机调度器 0x205113c 完整
  2. 状态切换函数 0x2051adc / 0x2051afc
  3. 状态读取函数 0x2051b1c / 0x2053be4
  4. 场景相关函数
"""
import sys, os
from pathlib import Path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ndsrom import NdsRom
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM

rom = NdsRom()
h = rom.header(0)
arm9 = rom.arm9(h)
md = Cs(CS_ARCH_ARM, CS_MODE_ARM)
RAM = h['arm9_ram']
OUT = Path(__file__).resolve().parent / 'state-machine.dis.txt'

lines = []
def emit(s=''):
    lines.append(s)

def disasm(addr, count, label):
    rel = addr - RAM
    emit('')
    emit('; ============================================================')
    emit('; %s @ 0x%08X (rel 0x%X)' % (label, addr, rel))
    emit('; ============================================================')
    code = arm9[rel:rel + count * 4]
    for ins in md.disasm(code, addr):
        emit('0x%08X  %-8s %s' % (ins.address, ins.mnemonic, ins.op_str))

emit('; Pic Pic 状态机完整反汇编')
emit('; 全局状态基址: 0x020DEB70')
emit(';   [+0x28] = 主状态 (STATE), [+0x14] = 子状态 (SUBSTATE)')
emit(';   [+0x0c] = 场景ID?,  [+0x24] = ？')
emit('; 状态设置: 0x2051adc(r0), 子状态: 0x2051afc(r0), 读状态: 0x2051b1c')
emit('; 主调度器: 0x205113c')

disasm(0x2051adc, 30, 'STATE SETTER (写[+0x28])')
disasm(0x2051afc, 30, 'SUBSTATE SETTER (写[+0x14])')
disasm(0x2051b1c, 20, 'STATE GETTER (读[+0x28])')
disasm(0x2053be4, 16, 'STATE GETTER B (读[+0x28])')
disasm(0x2053bf4, 60, 'FUNC 0x2053bf4 (状态相关)')
disasm(0x205113c, 330, 'MAIN DISPATCHER 0x205113c')
disasm(0x2051828, 40, 'DISPATCH END / IDLE')
disasm(0x2051be8, 60, 'FUNC 0x2051be8')
disasm(0x2051d5c, 80, 'FUNC 0x2051d5c (状态13进入?)')
disasm(0x2051b84, 50, 'FUNC 0x2051b84 (状态读取)')
disasm(0x2051080, 30, 'FUNC 0x2051080')

OUT.write_text('\n'.join(lines), encoding='utf-8')
print('written', OUT, os.path.getsize(OUT), 'bytes')

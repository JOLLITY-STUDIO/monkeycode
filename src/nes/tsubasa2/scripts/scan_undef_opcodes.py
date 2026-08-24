# -*- coding: utf-8 -*-
"""Linear-scan the PRG ROM for opcodes not in NESgen's instruction table."""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'tools', 'NESgen', 'NESgen', 'NESgen'))

from iNESROM import iNESROM
from MOS6502Instructions import MOSInstrExists

raw = open(sys.argv[1] if len(sys.argv) > 1 else r'd:\studio\github\monkeycode\src\nes\tsubasa2\debug\nesgen\tsubasa2_ines1.nes', 'rb').read()
rom = iNESROM(raw)
prg = rom.prgRom
missing = {}
for i, b in enumerate(prg):
    if not MOSInstrExists(b):
        missing.setdefault(b, []).append(i)
print("PRG size:", len(prg))
print("Undefined opcodes (opcode: count, first offsets):")
for op, offs in sorted(missing.items()):
    print("  $%02X  count=%d  first=%s" % (op, len(offs), [hex(o) for o in offs[:5]]))

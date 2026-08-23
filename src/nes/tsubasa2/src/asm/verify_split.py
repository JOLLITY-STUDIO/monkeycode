"""verify_split.py - 验证拆分后 bank31 编译结果"""
import sys
sys.path.insert(0, r'd:\studio\github\monkeycode\src\nes\tsubasa2\asm')
from build_nes import Assembler

asm = Assembler()
asm.assemble([r'd:\studio\github\monkeycode\src\nes\tsubasa2\asm\bank31\bank31.s'])

print('=== Key symbols ===')
for k, v in sorted(asm.symbols.items()):
    if any(t in k for t in ('HANDLER','LOOP','INIT','PADS','BOOT','TITLE')):
        print(f'  ${v:04X}  {k}')

print()
print('=== Bank31 layout ===')
b = asm.banks[31]
print(f'  First byte @ $0000: ${b[0]:02X}  (expect $78 = SEI)')
print(f'  Reset @ $1FFC:      ${b[0x1FFC]:02X}${b[0x1FFD]:02X}  (expect 00E0 = $E000)')
print(f'  NMI   @ $1FFA:      ${b[0x1FFA]:02X}${b[0x1FFB]:02X}')
print(f'  IRQ   @ $1FFE:      ${b[0x1FFE]:02X}${b[0x1FFF]:02X}')

# 期望值
assert b[0] == 0x78, f"first byte wrong: ${b[0]:02X}"
nmi_addr = b[0x1FFA] | (b[0x1FFB] << 8)
reset_addr = b[0x1FFC] | (b[0x1FFD] << 8)
irq_addr = b[0x1FFE] | (b[0x1FFF] << 8)
print(f'  NMI addr   = ${nmi_addr:04X}  (NMI_HANDLER)')
print(f'  Reset addr = ${reset_addr:04X}  (RESET_HANDLER = $E000)')
print(f'  IRQ addr   = ${irq_addr:04X}  (IRQ_HANDLER)')
assert reset_addr == 0xE000, f"reset vector wrong: ${reset_addr:04X}"
print()
print('OK: 拆分后构建与向量验证全部通过')

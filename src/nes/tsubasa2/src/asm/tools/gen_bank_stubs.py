"""gen_bank_stubs.py - 为缺失的 bank 生成顶层入口 stub"""
from pathlib import Path

asm_root = Path(r'd:\studio\github\monkeycode\src\nes\tsubasa2\asm')

# 已有 bankNN.s 的目录
existing = set()
for d in asm_root.iterdir():
    if d.is_dir() and d.name.lower().startswith('bank'):
        top = d / f"{d.name}.s"
        if top.exists():
            # 检查内容, 如果是 PowerShell 错误生成的 (含 @ echo off) 则删除重写
            content = top.read_text(encoding='utf-8')
            if content.startswith('@') or 'echo off' in content:
                top.unlink()
            else:
                existing.add(d.name)

template = """; ============================================================
; {dir}/{dir}.s
; bank {n} - 占位入口 (8KB)
; 运行时映射: $8000-$9FFF (R6 可切换)
; 真实代码: 参考 {dir}/{dir}_disasm.s (反汇编转换的参考)
;          后续按功能拆分到多个 .s, 由 .include 合并
; ============================================================

.segment "PRG_BANK{n:02d}"

.org $8000
    RTS                    ; 占位入口

.org $9FFE
    .byte $00, $00        ; 填充到 8KB 末尾
"""

count = 0
for n in range(32):
    dirname = f'bank{n:02d}'
    if dirname in existing:
        continue
    bank_dir = asm_root / dirname
    bank_dir.mkdir(parents=True, exist_ok=True)
    top = bank_dir / f'{dirname}.s'
    if top.exists():
        continue
    top.write_text(template.format(dir=dirname, n=n), encoding='utf-8')
    count += 1
    print(f'Created {top.relative_to(asm_root)}')

print(f'\nTotal: {count} stub files created')

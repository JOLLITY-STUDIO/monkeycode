#!/usr/bin/env python3
"""B1: dump ASCII 区原始字节(0-260) + 00 位置 + 渲染解法块0"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
P94 = os.path.join(ROOT, "extracted", "unnamed", "file_94.bin")
data = open(P94, "rb").read()

print("=== A) ASCII 区 0xb30000 前 260 字节(带偏移) ===")
A = 0x0B30000
for off in range(0, 260, 16):
    row = data[A+off:A+off+16]
    ascii_row = ''.join(chr(b) if 0x30 <= b < 0x40 else '.' for b in row)
    print(f"{off:04X}: {row.hex(' ')}  {ascii_row}")

print("\n=== B) ASCII 区 00 字节位置(前 40) ===")
zeros = [i for i in range(0, 720896) if data[A+i] == 0]
print(zeros[:40])

print("\n=== C) 0x10c0000 解法块 0 渲染 16x16 ===")
C = 0x10C0000
for r in range(16):
    row = data[C + r*16 : C + r*16 + 16]
    print(''.join(('#' if b >= 3 else '.') for b in row), end='   ')
    print(' '.join(f'{b:02X}' for b in row))

print("\n=== D) 解法块 1 (0x10c0100) 前 3 行 ===")
for r in range(3):
    row = data[C + 0x100 + r*16 : C + 0x100 + r*16 + 16]
    print(''.join(('#' if b >= 3 else '.') for b in row), end='   ')
    print(' '.join(f'{b:02X}' for b in row))

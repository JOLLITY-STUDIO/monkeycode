"""
gen_bank31_clean.py - 从 dist/tsubasa2.nes 的 bank31 真实字节生成清理版 bank31.s
按当年 tecmo 程序员手写风格:
  - 顶部一段连续代码 (反汇编器标注的指令保留助记符形式, 数据用 .byte)
  - 中段 $FD10-$FFEF 大块 $FF padding 用 .res
  - 末尾 RESET stub + 中断向量用标号 + .word
输出字节必须与原 ROM 100% 一致.
"""
import os

NES = r"d:\studio\github\monkeycode\src\nes\tsubasa2\asm\dist\tsubasa2.nes"
OUT_S = r"d:\studio\github\monkeycode\src\nes\tsubasa2\asm\bank31\bank31.s"

# 读取 bank31 真实字节 (8192B)
with open(NES, "rb") as f:
    data = f.read()
prg = data[16:]
b31 = prg[31 * 8192: 32 * 8192]
assert len(b31) == 8192

def w(off):
    """bank31 偏移 off → CPU 地址"""
    return 0xE000 + off

# === 1. 找连续 $FF padding 区 ===
# 策略: 找最大连续 $FF 区段 (从 $FD10 开始)
# 已知 $FD10-$FFEF 是 736B 连续 $FF (从 _tmp_check_b31_runs.js 验证)
# 这里用算法找: 从 $FFF0 之前往前扫, 找到第一个连续 $FF 区的起点
# 注意: 末尾 16B ($FFF0-$FFFF) 包含真实代码 + 向量, 不能算 padding
# 所以 padding 区在 $FFF0 之前
PAD_END = 0x1FEF  # $FFEF 偏移 (padding 区终点, 不含 $FFF0)
# 从 PAD_END 往前找连续 $FF 起点
pad_start_off = PAD_END + 1
while pad_start_off > 0 and b31[pad_start_off - 1] == 0xFF:
    pad_start_off -= 1
pad_end_off = PAD_END
pad_len = pad_end_off - pad_start_off + 1
assert pad_len > 0, "padding 区长度为 0"
assert all(b31[i] == 0xFF for i in range(pad_start_off, pad_end_off + 1)), "padding 区不全是 $FF"
print(f"padding: ${w(pad_start_off):04X}-${w(pad_end_off):04X} = {pad_len} bytes (CPU ${w(pad_start_off):04X}-${w(pad_end_off):04X})")

# 代码区终点 = padding 起点 - 1
code_end_off = pad_start_off - 1
print(f"code region: $E000-${w(code_end_off):04X} = {code_end_off + 1} bytes")

# === 2. 从 disasm 提取代码区 ($E000 - $FD0F) 的助记符 ===
# disasm 文件里的内容已经是反汇编过的助记符 + .byte 数据
# 我们保留它的助记符部分, 但去掉行尾的反汇编地址注释
DISASM = r"d:\studio\github\monkeycode\src\nes\tsubasa2\asm\bank31\bank31_disasm.s"
with open(DISASM, "r", encoding="utf-8") as f:
    disasm_lines = f.readlines()

# 提取从 ".org $E000" 之后到 $FD0F 之前的所有有效行
# disasm 行格式: "    MNEMONIC operand                  ; $XXXX"  或  "    .byte $XX                  ; $XXXX (gap)"
code_lines = []
in_code = False
for line in disasm_lines:
    stripped = line.rstrip("\r\n")
    if stripped.strip().startswith(".org $E000"):
        in_code = True
        continue
    if not in_code:
        continue
    # 停在 padding 起点 (即注释里出现 $FD10 之类的地址)
    stop_addr = w(pad_start_off)  # padding 起点 CPU 地址, 如 $FD10
    stop_str = f"${stop_addr:04X}"
    if stop_str in stripped:
        break
    code_lines.append(stripped)

print(f"extracted {len(code_lines)} code lines from disasm (up to $FD0F)")

# 清理每行: 去掉行尾的 "  ; $XXXX" 反汇编标注 (但保留有意义的注释如 (gap))
def clean_disasm_line(line):
    # 去掉行尾 "; $XXXX" 注释
    # 但保留 "; $XXXX (gap)" 中的 (gap) 标注? 不, 直接全部去掉反汇编标注, 改成简洁注释
    s = line.rstrip()
    # 分离注释
    semi = s.find(";")
    if semi >= 0:
        code = s[:semi].rstrip()
        comment = s[semi:].strip()
        # 从 "; $XXXX" 提取地址
        # 简化: 直接丢弃反汇编标注, 只保留代码部分
        return code
    return s

# === 3. 生成新的 bank31.s ===
out = []
out.append("; ============================================================")
out.append("; bank31.s")
out.append("; PRG bank 31 - 固定映射 CPU $E000-$FFFF")
out.append("; 包含: 主循环尾部代码 + RESET stub + 中断向量")
out.append("; ============================================================")
out.append("")
out.append(".segment \"PRG_BANK31\"")
out.append("")
out.append(".org $E000")
out.append("")

# 代码区: 保留 disasm 助记符, 去掉行尾反汇编地址标注
# 注意: 不能完全去掉注释, 否则有些 (gap) 信息丢失. 这里采取折中: 去掉 "$XXXX" 地址
import re
for line in code_lines:
    s = line.rstrip()
    # 去掉行尾 "; $XXXX" 或 "; $XXXX (xxx)" 注释
    # 改写成更简洁的形式
    m = re.match(r'^(\s*)(.+?)(\s*;\s*\$[0-9A-Fa-f]{4}(?:\s*\([^)]*\))?\s*)$', s)
    if m:
        indent, code, _comment = m.groups()
        out.append(f"{indent}{code}")
    else:
        # 没有注释的行 (纯标号/segment等)
        # 跳过 .segment (已经在文件头声明)
        if s.strip().startswith(".segment"):
            continue
        if s.strip() == "":
            # 连续空行压缩
            if out and out[-1] != "":
                out.append("")
            continue
        out.append(s)

# 压缩末尾空行
while out and out[-1] == "":
    out.pop()
out.append("")
out.append("; -----------------------------------------------------------")
out.append(f"; $FD10-$FFEF: {pad_len} 字节未使用 ROM 区 (出厂填充 $FF)")
out.append("; -----------------------------------------------------------")
out.append(f".res {pad_len}")
out.append("")
out.append("; -----------------------------------------------------------")
out.append("; $FFF0: RESET 入口 stub")
out.append(";   LDA #$00        ; $FFF0")
out.append(";   STA $8000       ; $FFF2  (写 MMC3 PRG bank select)")
out.append(";   JMP $C503       ; $FFF5  (跳转到 bank30 主初始化)")
out.append("; -----------------------------------------------------------")
out.append(".org $FFF0")
out.append("RESET_Entry:")
out.append("    LDA #$00       ; $FFF0")
out.append("    STA $8000      ; $FFF2")
out.append("    JMP $C503      ; $FFF5")
out.append("")
out.append("; -----------------------------------------------------------")
out.append("; $FFF8-$FFF9: 2 字节保留 (出厂 $00 $00)")
out.append("; -----------------------------------------------------------")
out.append(".org $FFF8")
out.append("    .byte $00, $00")
out.append("")
out.append("; -----------------------------------------------------------")
out.append("; $FFFA-$FFFF: 中断向量")
out.append(";   IRQ/BRK → $C500  (bank30)")
out.append(";   RESET  → $FFF0  (本 bank RESET_Entry)")
out.append(";   NMI    → $C506  (bank30)")
out.append("; -----------------------------------------------------------")
out.append(".org $FFFA")
out.append("    .word $C500     ; IRQ/BRK")
out.append("    .word RESET_Entry ; RESET")
out.append("    .word $C506     ; NMI")

content = "\n".join(out) + "\n"
with open(OUT_S, "w", encoding="utf-8") as f:
    f.write(content)
print(f"\nWrote: {OUT_S}")
print(f"  {len(out)} lines, {len(content)} bytes")

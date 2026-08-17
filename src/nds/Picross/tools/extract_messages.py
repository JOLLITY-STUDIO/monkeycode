#!/usr/bin/env python3
"""
从 ROM 提取文本 → 生成 src/data/messages.ts（B3 完成）

格式定案（_b3_a*.py 系列）:
  - 文本文件为 UTF-16LE: [FF FE][6B 头][u32 偏移表...][文本区]
  - 每条文本以 00 00 终止
  - file_86.bin: 372 条 EN 主消息（教程/规则/提示）
  - file_88.bin: 165 条 EN 拼图名
  - file_90.bin: 165 条 FR 拼图名
  - file_92.bin: 15 条 ES 拼图名（不完整，保留原样）

输出:
  - src/data/messages.ts: MESSAGES（EN 主消息）+ PUZZLE_NAMES {en,fr,es}
"""
import os, struct, json

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE, "..")
EX = os.path.join(ROOT, "extracted", "unnamed")
OUT = os.path.join(ROOT, "src", "data", "messages.ts")


def decode(path):
    data = open(path, "rb").read()
    offsets = []
    i = 6  # 头 6B (FF FE + 2B)
    while i + 4 <= len(data):
        v = struct.unpack_from("<I", data, i)[0]
        if v == 0 or v >= len(data):
            break
        offsets.append(v)
        i += 4
    out = []
    for idx, off in enumerate(offsets):
        end = offsets[idx + 1] if idx + 1 < len(offsets) else len(data)
        blob = data[off:end]
        s = []
        for j in range(0, len(blob) - 1, 2):
            c = blob[j] | (blob[j + 1] << 8)
            if c == 0:
                break
            s.append(chr(c))
        out.append("".join(s))
    return out


def ts_str(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def main():
    en_msgs = decode(os.path.join(EX, "file_86.bin"))
    en_names = decode(os.path.join(EX, "file_88.bin"))
    fr_names = decode(os.path.join(EX, "file_90.bin"))
    es_names = decode(os.path.join(EX, "file_92.bin"))
    print(f"en_msgs={len(en_msgs)} en_names={len(en_names)} fr_names={len(fr_names)} es_names={len(es_names)}")

    lines = []
    lines.append("/**")
    lines.append(" * 文本数据 —— 由 tools/extract_messages.py 生成（B3 完成）")
    lines.append(" * 来源: extracted/unnamed/file_86.bin（EN 主消息）/ file_88,90,92（拼图名 EN/FR/ES）")
    lines.append(" * 格式: UTF-16LE [FF FE][6B 头][u32 偏移表][00 00 终止的文本]")
    lines.append(" */")
    lines.append("")
    lines.append("export const MESSAGES: string[] = [")
    for s in en_msgs:
        lines.append(f"  {ts_str(s)},")
    lines.append("];")
    lines.append("")
    lines.append("export const PUZZLE_NAMES: { en: string[]; fr: string[]; es: string[] } = {")
    lines.append("  en: [")
    for s in en_names:
        lines.append(f"    {ts_str(s)},")
    lines.append("  ],")
    lines.append("  fr: [")
    for s in fr_names:
        lines.append(f"    {ts_str(s)},")
    lines.append("  ],")
    lines.append("  es: [")
    for s in es_names:
        lines.append(f"    {ts_str(s)},")
    lines.append("  ],")
    lines.append("};")
    lines.append("")
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print(f"generated -> src/data/messages.ts")


if __name__ == "__main__":
    main()

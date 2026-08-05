"""直接从 ROM 重新生成 chrBinary.ts (128KB CHR → base64)"""
import base64

ROM_PATH = '_tmp_disasm_out/Captain Tsubasa (Japan).nes'
OUT_PATH = 'src/data/chrBinary.ts'
BANK_COUNT = 32
BANK_SIZE = 4096

# 读取 ROM CHR 数据
with open(ROM_PATH, 'rb') as f:
    f.seek(16 + 0x20000)  # header + PRG 128KB
    chr_data = f.read(0x20000)

assert len(chr_data) == BANK_COUNT * BANK_SIZE, f'Expected {BANK_COUNT * BANK_SIZE}, got {len(chr_data)}'
print(f'ROM CHR: {len(chr_data)} bytes')

# base64 编码
b64 = base64.b64encode(chr_data).decode('ascii')
print(f'Base64: {len(b64)} chars')

# 分块写入 (每行 80 字符)
CHUNK_SIZE = 80
chunks = []
for i in range(0, len(b64), CHUNK_SIZE):
    chunks.append(b64[i:i + CHUNK_SIZE])

ts = "".join([
    '/**\n',
    ' * CHR Binary Data - Base64 encoded\n',
    ' *\n',
    ' * 自动生成，勿手动编辑。\n',
    f' * 来源: ROM CHR (32 banks × {BANK_SIZE} bytes = {BANK_COUNT * BANK_SIZE} bytes)\n',
    ' * 运行时解码: TileStore.init() 使用 atob → Uint8Array\n',
    ' */\n',
    'export const CHR_BASE64 = [\n',
    ',\n'.join(f"  '{c}'" for c in chunks),
    '\n].join(\'\');\n',
    '\n',
    '/** CHR 总字节数 */\n',
    f'export const CHR_RAW_SIZE = {len(chr_data)};\n',
    '\n',
    '/** CHR Bank 数量 */\n',
    f'export const CHR_BANK_COUNT = {BANK_COUNT};\n',
    '\n',
    '/** 每个 Bank 字节数 */\n',
    f'export const CHR_BANK_SIZE = {BANK_SIZE};\n',
])

with open(OUT_PATH, 'w', encoding='utf-8') as f:
    f.write(ts)

import os
out_sz = os.path.getsize(OUT_PATH)
print(f'Written {OUT_PATH} ({out_sz/1024:.1f} KB)')
print('Done.')

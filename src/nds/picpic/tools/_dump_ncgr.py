# -*- coding: utf-8 -*-
import struct, sys, os
sys.path.insert(0, os.path.dirname(__file__))
from convert_title import lz10

raw = lz10(open(os.path.join(os.path.dirname(__file__), '..', 'roms', 'extracted', 'title', 'bg_title_t_LZ.bin'), 'rb').read())
print('len', len(raw))
print('u16 head:', [hex(v) for v in struct.unpack_from('<8H', raw, 0)])
print('u32@0x0C', hex(struct.unpack_from('<I', raw, 0x0C)[0]))
print('u32@0x10', hex(struct.unpack_from('<I', raw, 0x10)[0]))
print('u32@0x14', hex(struct.unpack_from('<I', raw, 0x14)[0]))
print('u16@0x20', hex(struct.unpack_from('<H', raw, 0x20)[0]))
print('bytes 0x20..0x30:', raw[0x20:0x30].hex())
print('nonzero count in 0x60..0xE0:', sum(1 for b in raw[0x60:0xE0] if b != 0))
print('first 32 bytes after 0x60:', raw[0x60:0x80].hex())

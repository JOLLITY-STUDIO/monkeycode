import struct, os
BASE = r'd:\studio\github\monkeycode\src\pc-fx\Sexy Idol Mahjong\_tools\extracted\track_data\track_02'
ip_path = os.path.join(BASE, 'IP.BIN')
ud_path = os.path.join(BASE, 'user_data.bin')

# IP.BIN 头 256 byte
with open(ip_path,'rb') as f:
    ip = f.read()

print('=== IP.BIN size:', len(ip))
print('first 64 hex:', ip[:64].hex(' '))
print('IP.BIN first 64 ascii:', ip[:64])
print()

# 0x00-0x03: 'PC Engine CD-ROM²' marker, 0x05-... title, 0xC0-0xFF CDP info
# MCODE bytes for title
title = ip[0x10:0x40]
print('title (shift-jis may be):', title.split(b'\x00',1)[0])

# 0x04: ID
print('id:', hex(ip[4]))

# 0x40+: developer
print('developer:', ip[0x40:0x80].split(b'\x00',1)[0])

# 0x80-0x9F: region
print('region:', ip[0x80:0xA0].split(b'\x00',1)[0])

# IPL.TXT pointer at 0xC0-0xC1 (MSF format)
# 0xC4-0xC5: load address, 0xC8-0xC9: load size
# easier: read PCE.MP3 volume label
print('vol label:', ip[0xA0:0xC0].split(b'\x00',1)[0])

# user_data.bin 头
print()
print('=== user_data.bin')
with open(ud_path,'rb') as f:
    ud = f.read()

print('size:', len(ud))
print('first 128 hex:', ud[:128].hex(' '))
# 找魔数
candidates = ['ARC\x00','ARCD','HUD\x00','HUD1','HUD2','CDROM',
             'PEA','ADS','ADP','MGF0','MGS','HUE','PI']
for c in candidates:
    p = ud.find(c.encode())
    if p>=0:
        print(f'  found "{c}" @ 0x{p:X}')

# 0x100 找
print('user_data first 256 bytes ASCII (replace 0x00):')
print(ud[:256].replace(b'\x00', b' '))

# Track 02 总长: MODE1/2352 总 2352 byte/sector, data 2048, header 24
# user_data.bin 应该是从 sector data 部分剥离出来的
print()
print('user_data size modulo: 2048?', len(ud)%2048, '2048 byte-aligned')

# 看后部
print('last 128 hex:', ud[-128:].hex(' '))
print('last ASCII:', ud[-128:].replace(b'\x00',b' '))

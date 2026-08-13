# -*- coding: utf-8 -*-
"""比较两个 ROM 的头结构与 FAT 数量，确认原版"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom, find_nds_header

for name in ['Pic Pic - Toku to E ni Naru 3-tsu no Puzzle (Japan).nds',
             'Pic Pic (Europe).nds']:
    p = os.path.join(r'd:\studio\github\monkeycode\src\nds\picpic\roms', name)
    rom = NdsRom(p)
    h = rom.header(0)
    print('=' * 70)
    print('ROM :', name)
    print('size: 0x%X (%d)' % (rom.size, rom.size))
    print('外层头: title=%r gamecode=%r maker=%r' % (h['title'], h['gamecode'], h['makercode']))
    print('  ARM9 off=0x%X entry=0x%08X ram=0x%08X size=0x%X' % (h['arm9_rom_off'], h['arm9_entry'], h['arm9_ram'], h['arm9_size']))
    print('  ARM7 off=0x%X entry=0x%08X ram=0x%08X size=0x%X' % (h['arm7_rom_off'], h['arm7_entry'], h['arm7_ram'], h['arm7_size']))
    print('  FNT off=0x%X size=0x%X | FAT off=0x%X size=0x%X (%d files)' % (h['fnt_off'], h['fnt_size'], h['fat_off'], h['fat_size'], h['fat_size']//8))
    print('  banner=0x%X secure=0x%04X romsize=0x%X headersize=0x%X' % (h['banneroff'], h['secure_checksum'], h['romsize'], h['headersize']))
    print('  title_long=%r' % h['title_long'][:40])
    # 备用头搜索
    hits = find_nds_header(rom.data, 0x300000)
    print('  备用 NTRJ 头:', ['0x%08X' % (o-0x0C) for o, t, a in hits] if hits else '无')
    # 头部加密校验（secure area 16KB 后 0x4000 起始）
    print('  0x4000 处字节(前8):', rom.data[0x4000:0x4008].hex(' '))
    print('  0x4850 处字节(entry rel 0x850):', rom.data[0x4000+0x850:0x4000+0x858].hex(' '))
    print()

"""
Bank 7 数据结构分析脚本
分析固定 Bank ($C000-$FFFF) 中的脚本数据和指针表
"""
import struct
import os
import sys

def read_rom():
    rom_path = os.path.join(os.path.dirname(__file__), '..', '_tmp_disasm_out', 'Captain Tsubasa (Japan).nes')
    with open(rom_path, 'rb') as f:
        return f.read()

def analyze():
    rom = read_rom()
    # Bank 7: 8th PRG bank (index 7), 16KB at $1C010
    prg_start = 0x0010 + 0x4000 * 7
    bank7 = rom[prg_start:prg_start + 0x4000]
    
    print(f'Bank 7 size: {len(bank7)} bytes')
    print(f'CPU address range: $C000-$FFFF')
    print()
    
    # === Section 1: Pointer tables ($C000-$C0xx) ===
    print('=' * 60)
    print('Section 1: Pointer Table at $C000 (word-sized entries)')
    print('=' * 60)
    
    # Count how many consecutive word entries look like valid Bank 7 addresses
    ptr_count = 0
    for i in range(0, 0x200, 2):  # Check first 512 bytes
        lo = bank7[i]
        hi = bank7[i+1]
        addr = (hi << 8) | lo
        if 0xC000 <= addr <= 0xFFBF:  # Valid Bank 7 address
            ptr_count = i // 2 + 1
        else:
            break
    
    print(f'Valid pointer entries: {ptr_count}')
    for i in range(ptr_count):
        lo = bank7[i*2]
        hi = bank7[i*2+1]
        addr = (hi << 8) | lo
        target_offset = addr - 0xC000
        print(f'  [{i:3d}] ${addr:04X} (offset ${target_offset:04X})')
    
    print()
    
    # === Section 2: Analyze data at each pointer target ===
    print('=' * 60)
    print('Section 2: Data content at first 5 pointer targets')
    print('=' * 60)
    
    for ptr_idx in range(min(5, ptr_count)):
        lo = bank7[ptr_idx*2]
        hi = bank7[ptr_idx*2+1]
        addr = (hi << 8) | lo
        target_offset = addr - 0xC000
        
        print(f'\n--- Pointer [{ptr_idx}] → ${addr:04X} (offset ${target_offset:04X}) ---')
        
        # Show first 48 bytes at target
        data = bank7[target_offset:target_offset+48]
        for j in range(0, len(data), 16):
            hex_str = ' '.join(f'{b:02X}' for b in data[j:j+16])
            ascii_str = ''.join(chr(b) if 32 <= b < 127 else '.' for b in data[j:j+16])
            print(f'  +${j:02X}: {hex_str}  {ascii_str}')
        
        # Try to interpret as script opcodes
        # Look for common patterns: text blocks, control codes
        offset = target_offset
        cmd_count = 0
        while offset < len(bank7) and cmd_count < 20:
            b = bank7[offset]
            if b == 0:
                # Possible terminator
                print(f'  [${offset-0xC000:04X}] $00 (terminator?)')
                offset += 1
                cmd_count += 1
            elif b == 0xFF:
                print(f'  [${offset-0xC000:04X}] $FF (end?)')
                offset += 1
                cmd_count += 1
                break
            elif 0x20 <= b < 0x80:
                # Possible text character
                end = offset
                while end < len(bank7) and 0x20 <= bank7[end] < 0x80:
                    end += 1
                text = ''.join(chr(bank7[i]) for i in range(offset, end))
                if len(text) > 2:
                    print(f'  [${offset-0xC000:04X}] TEXT({len(text)}): "{text}"')
                    offset = end
                else:
                    print(f'  [${offset-0xC000:04X}] ${b:02X}')
                    offset += 1
                cmd_count += 1
            elif 0x01 <= b <= 0x1F:
                # Control code
                print(f'  [${offset-0xC000:04X}] CTRL ${b:02X}', end='')
                # Try to read parameters
                params = []
                for k in range(1, 4):
                    if offset + k < len(bank7):
                        pb = bank7[offset + k]
                        if pb < 0x20:
                            break
                        params.append(pb)
                if params:
                    print(f' + params: {[f"${p:02X}" for p in params]}', end='')
                print()
                offset += 1 + len(params)
                cmd_count += 1
            else:
                print(f'  [${offset-0xC000:04X}] ${b:02X}')
                offset += 1
                cmd_count += 1
    
    print()
    
    # === Section 3: Find all non-zero, non-FF data blocks ===
    print('=' * 60)
    print('Section 3: Non-zero data blocks in Bank 7')
    print('=' * 60)
    
    in_block = False
    block_start = 0
    for offset in range(len(bank7)):
        b = bank7[offset]
        if not in_block and b != 0 and b != 0xFF:
            in_block = True
            block_start = offset
        elif in_block and (b == 0 and offset < len(bank7) - 1 and bank7[offset+1] == 0 and 
                           offset < len(bank7) - 2 and bank7[offset+2] == 0):
            # End of block (3 consecutive zeros)
            size = offset - block_start
            if size > 2:
                cpu_addr = 0xC000 + block_start
                print(f'  ${cpu_addr:04X}-${cpu_addr+size-1:04X}: {size} bytes')
            in_block = False
        elif in_block and offset == len(bank7) - 0x40:
            # Near the end (MMC1 code starts around $FFC0)
            if offset > block_start + 2:
                size = offset - block_start
                cpu_addr = 0xC000 + block_start
                print(f'  ${cpu_addr:04X}-${cpu_addr+size-1:04X}: {size} bytes (ends near vectors)')
            break
    
    print()
    
    # === Section 4: Analyze the "second" table at $C02C ===
    print('=' * 60)
    print('Section 4: OAM/Sprite-like table at $C02C+')
    print('=' * 60)
    
    # After the pointer table, there seems to be a different structure
    # Entries look like they could be sprite definitions (Y, tile, attr, X)
    oam_start = ptr_count * 2  # Right after pointer table
    if oam_start < 0x100:
        print(f'Data starting at offset ${oam_start:04X} (CPU ${0xC000+oam_start:04X}):')
        entry_size = 4  # OAM entries are 4 bytes
        entries_shown = 0
        for i in range(oam_start, min(oam_start + 64, 0x100), entry_size):
            if i + 3 < len(bank7):
                y, tile, attr, x = bank7[i], bank7[i+1], bank7[i+2], bank7[i+3]
                if y == 0 and tile == 0 and attr == 0 and x == 0:
                    if entries_shown > 0:
                        print(f'  [{entries_shown}] $00 $00 $00 $00 (terminator)')
                    break
                print(f'  [${i-oam_start:02X}] Y=${y:02X} Tile=${tile:02X} Attr=${attr:02X} X=${x:02X}')
                entries_shown += 1
                if entries_shown >= 20:
                    if i + entry_size < len(bank7):
                        next_bytes = bank7[i+entry_size:i+entry_size+4]
                        if not all(b == 0 for b in next_bytes):
                            print(f'  ... more entries ...')
                    break

if __name__ == '__main__':
    analyze()

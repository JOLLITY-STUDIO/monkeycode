"""
从NES ROM提取球员数据
ROM结构: PRG 128KB, CHR 128KB
Bank 3 ($0C000-$0FFFF): 数据bank
Bank 5 ($14000-$17FFF): 数据bank
"""
import struct, json, os, sys

ROM_PATH = os.path.join(os.path.dirname(__file__), '..', '_tmp_disasm_out', 'Captain Tsubasa (Japan).nes')

def read_rom():
    with open(ROM_PATH, 'rb') as f:
        header = f.read(16)
        prg_size = header[4] * 16384
        chr_size = header[5] * 8192
        prg = f.read(prg_size)
        chr_data = f.read(chr_size)
    return prg, chr_data

def bank_offset(bank_num):
    """获取PRG bank在ROM中的偏移"""
    return bank_num * 0x4000

def read_bank(prg, bank_num):
    """读取一个16KB bank"""
    offset = bank_offset(bank_num)
    return prg[offset:offset + 0x4000]

def search_player_data(prg):
    """查找球员数据模式"""
    # 球员数据结构通常: 名字(若干字节) + 属性(speed, power, tech, stamina...)
    # 已知游戏有77名球员 (7队 x 11人)
    
    # 先看 Bank 3 的结构
    bank3 = read_bank(prg, 3)
    bank5 = read_bank(prg, 5)
    
    results = {}
    
    # 打印 Bank 3 和 Bank 5 前256字节的概览
    print("=" * 60)
    print("Bank 3 ($0C000-$0FFFF) - First 256 bytes:")
    for i in range(0, 256, 16):
        hex_str = ' '.join(f'{b:02X}' for b in bank3[i:i+16])
        ascii_str = ''.join(chr(b) if 32 <= b < 127 else '.' for b in bank3[i:i+16])
        print(f"  ${i:04X}: {hex_str}  {ascii_str}")
    
    print("\n" + "=" * 60)
    print("Bank 5 ($14000-$17FFF) - First 256 bytes:")
    for i in range(0, 256, 16):
        hex_str = ' '.join(f'{b:02X}' for b in bank5[i:i+16])
        ascii_str = ''.join(chr(b) if 32 <= b < 127 else '.' for b in bank5[i:i+16])
        print(f"  ${i:04X}: {hex_str}  {ascii_str}")
    
    # 寻找 07 0B 模式 - 可能是7队11人的数据布局
    print("\n" + "=" * 60)
    print("Searching for team/player count patterns (07, 0B = 7 teams, 11 players)...")
    
    for bank_num, bank_data in [(3, bank3), (5, bank5)]:
        for addr in range(len(bank_data) - 2):
            if bank_data[addr] == 0x07 and bank_data[addr+1] == 0x0B:
                print(f"  Bank {bank_num} @ ${addr:04X}: 07 0B (7 teams, 11 players)")
    
    # 查找可能的球员名字区域 (连续大写字母)
    print("\n" + "=" * 60)
    print("Searching for ASCII name patterns...")
    for bank_num, bank_data in [(3, bank3), (5, bank5)]:
        i = 0
        while i < len(bank_data) - 5:
            # 检查连续5个大写字母
            if all(0x41 <= b <= 0x5A for b in bank_data[i:i+5]):
                end = i + 5
                while end < len(bank_data) and 0x41 <= bank_data[end] <= 0x5A:
                    end += 1
                name_len = end - i
                if name_len >= 3:
                    name = ''.join(chr(b) for b in bank_data[i:end])
                    print(f"  Bank {bank_num} @ ${i:04X} (len={name_len}): {name}")
                    i = end
                    continue
            i += 1
    
    # 查找数据表结构 - 寻找连续字节组 (每11或22个字节一组)
    print("\n" + "=" * 60)
    print("Looking for structured data tables...")
    
    # Bank 3 中查找以 0B(11) 开头的偏移表
    print("\nBank 3 pointer-like structures near $C000:")
    for addr in range(0, min(0x4000, len(bank3)), 2):
        lo = bank3[addr]
        hi = bank3[addr+1]
        ptr = (hi << 8) | lo
        # 检查是否指向Bank 3内部的有效地址
        if 0xC000 <= (0xC000 + ptr) <= 0xFFFF:
            if addr % 16 == 0:
                print(f"  ${addr:04X}: {lo:02X} {hi:02X} -> ${0xC000+ptr:04X}")

    return results

def main():
    prg, chr_data = read_rom()
    print(f"ROM loaded: PRG={len(prg)} bytes, CHR={len(chr_data)} bytes")
    print(f"PRG Banks: {len(prg)//0x4000}")
    print(f"CHR Banks: {len(chr_data)//0x2000}")
    
    search_player_data(prg)

if __name__ == '__main__':
    main()

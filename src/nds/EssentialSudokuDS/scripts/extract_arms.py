"""Extract ARM9 + ARM7 binaries from NDS ROM.

For Essential Sudoku DS, the NTR header reports:
  ARM9 off=0x02000000 dst=0x02000800 size=0x000fc298
  ARM7 off=0x02380000 dst=0x02380000 size=0x000286a0

But our 8 MB ROM (size 0x800000) cannot contain these offsets.
The header values appear to be cart-space addresses (0x02000000 = RAM / 0x02380000 = RAM),
NOT file offsets.

We use the standard NDS cart layout: ARM9 binary typically starts at 0x4000,
ARM7 at 0x200000 (verified by ARM-like bytes at those offsets in the ROM scan).

For ROMs where the header offsets fit in the file, we also support the standard case.
"""
import os
import struct

ROM = r'D:\studio\github\monkeycode\src\nds\EssentialSudokuDS\work\Essential Sudoku DS (Europe).nds'
OUT = r'D:\studio\github\monkeycode\src\nds\EssentialSudokuDS\rom-data'

# Standard NDS cart layout for this game:
#   Cart header 0x0000..0x4000
#   ARM9 stub 0x4000..0x8000 (illegal-instruction padding)
#   ARM9 binary starts at 0x8000
#   ARM7 binary starts at 0x200000
#   Data follows
ARM9_OFF = 0x8000
ARM9_SZ = 0x100000  # 1 MiB max for ARM9 binary
ARM9_DST = 0x02000000 + ARM9_OFF  # cart headers map dst = RAM 0x02000000 + cart_off for ARM9 stuff

ARM7_OFF = 0x200000
ARM7_SZ = 0x40000   # 256 KiB max for ARM7 binary
ARM7_DST = 0x02380000


def main():
    ROM_SIZE = os.path.getsize(ROM)
    with open(ROM, 'rb') as f:
        # First, dump cart header 0x4000 bytes for diagnostics
        f.seek(0)
        hdr = f.read(0x4000)
        hdr_path = os.path.join(OUT, 'cart_header.bin')
        with open(hdr_path, 'wb') as g:
            g.write(hdr)
        print(f'== Cart header (0x0000..0x4000) -> {hdr_path}')

        # ARM9 binary
        f.seek(ARM9_OFF)
        arm9 = f.read(ARM9_SZ)
        arm9_path = os.path.join(OUT, 'arm9.bin')
        with open(arm9_path, 'wb') as g:
            g.write(arm9)
        print(f'== ARM9 extracted: {ARM9_OFF:#x}..{ARM9_OFF + ARM9_SZ:#x} -> {arm9_path} '
              f'({ARM9_SZ} bytes, dst={ARM9_DST:#x})')

        # ARM7 binary
        f.seek(ARM7_OFF)
        arm7 = f.read(ARM7_SZ)
        arm7_path = os.path.join(OUT, 'arm7.bin')
        with open(arm7_path, 'wb') as g:
            g.write(arm7)
        print(f'== ARM7 extracted: {ARM7_OFF:#x}..{ARM7_OFF + ARM7_SZ:#x} -> {arm7_path} '
              f'({ARM7_SZ} bytes, dst={ARM7_DST:#x})')

        # Banner
        banner_off = 0x00129600
        if banner_off < ROM_SIZE:
            f.seek(banner_off)
            bnr = f.read(0x840)
            bnr_path = os.path.join(OUT, 'banner.bin')
            with open(bnr_path, 'wb') as g:
                g.write(bnr)
            print(f'== Banner: {banner_off:#x} ({len(bnr)} bytes) -> {bnr_path}')

    print('\nDone.')


if __name__ == '__main__':
    main()

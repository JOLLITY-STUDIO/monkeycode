#!/usr/bin/env python3
"""Parse NDS NTR header (0x200 bytes) and dump ARM9/ARM7 segment info."""
import struct, sys, os, json

ROM = os.path.join(os.path.dirname(__file__), "..", "_rom_raw", "Picross DS (USA) (En,Fr,Es).nds")

def u32(b, o):
    return struct.unpack_from("<I", b, o)[0]

def u16(b, o):
    return struct.unpack_from("<H", b, o)[0]

def main():
    with open(ROM, "rb") as f:
        hdr = f.read(0x200)
    out = {}
    out["game_title"] = hdr[0x00:0x0C].decode("ascii", "replace").strip("\x00")
    out["game_code"] = hdr[0x0C:0x10].decode("ascii", "replace").strip("\x00")
    out["maker_code"] = hdr[0x10:0x12].decode("ascii", "replace").strip("\x00")
    out["unit_code"] = hdr[0x12]
    out["device_capacity"] = hdr[0x14]
    out["rom_version"] = hdr[0x1D]
    out["arm9_rom_offset"] = u32(hdr, 0x20)
    out["arm9_entry"] = hex(u32(hdr, 0x24))
    out["arm9_ram_addr"] = hex(u32(hdr, 0x28))
    out["arm9_code_size"] = u32(hdr, 0x2C)
    out["arm7_rom_offset"] = u32(hdr, 0x30)
    out["arm7_entry"] = hex(u32(hdr, 0x34))
    out["arm7_ram_addr"] = hex(u32(hdr, 0x38))
    out["arm7_code_size"] = u32(hdr, 0x3C)
    out["fnt_offset"] = u32(hdr, 0x40)
    out["fnt_size"] = u32(hdr, 0x44)
    out["fat_offset"] = u32(hdr, 0x48)
    out["fat_size"] = u32(hdr, 0x4C)
    out["arm9_overlay_offset"] = u32(hdr, 0x50)
    out["arm9_overlay_size"] = u32(hdr, 0x54)
    out["arm7_overlay_offset"] = u32(hdr, 0x58)
    out["arm7_overlay_size"] = u32(hdr, 0x5C)
    out["icon_title_offset"] = u32(hdr, 0x68)
    out["secure_area_checksum"] = hex(u32(hdr, 0x6C))
    out["rom_size"] = os.path.getsize(ROM)
    print(json.dumps(out, indent=2))
    # Save for other scripts
    with open(os.path.join(os.path.dirname(__file__), "..", "_rom_raw", "header.json"), "w") as f:
        json.dump(out, f, indent=2)
    print("saved -> _rom_raw/header.json")

if __name__ == "__main__":
    main()

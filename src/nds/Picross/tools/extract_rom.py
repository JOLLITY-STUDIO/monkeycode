#!/usr/bin/env python3
"""Extract NDS ROM: code segments + empirical FNT/FAT filesystem (Picross DS)."""
import struct, os, sys, json

BASE = os.path.dirname(os.path.abspath(__file__))
ROM_DIR = os.path.join(BASE, "..", "_rom_raw")
ROM = os.path.join(ROM_DIR, "Picross DS (USA) (En,Fr,Es).nds")
OUT = os.path.join(BASE, "..", "extracted")

def u32(b, o): return struct.unpack_from("<I", b, o)[0]

def parse_fnt(fnt):
    """Empirical FNT for Picross DS:
    - 4 bytes: unknown count (0x38)
    - directory metadata pre-table (variable, ends before 0x39)
    - dir names: [0x80|len][name][dirID][0xF0]
    - file lists per dir: [len][name]..., terminated by 0x00
    """
    ndirs = u32(fnt, 0)
    # find end of pre-table: scan from 4 for the first 0x80|len pattern that
    # is followed by ASCII name + 0xF0 marker
    p = 4
    while p < len(fnt):
        if (fnt[p] & 0x80) and p + 2 < len(fnt):
            ln = fnt[p] & 0x7F
            if 1 <= ln <= 16 and all(32 <= c < 127 for c in fnt[p+1:p+1+ln]):
                break
        p += 2
    pre_table = fnt[4:p]
    # dir names
    dirs = []  # (dir_id, name)
    while p < len(fnt):
        b = fnt[p]
        if b & 0x80:
            ln = b & 0x7F
            name = fnt[p+1:p+1+ln].decode("ascii", "replace")
            p += 1 + ln
            dir_id = fnt[p]; p += 1
            marker = fnt[p]; p += 1
            assert marker == 0xF0, f"dir marker {marker:#x} at {p}"
            dirs.append((dir_id, name))
        else:
            break
    # file lists: each dir's files until 0x00 (first list = root, then dirs in order)
    lists = []  # list of (dir_id, [names])
    cur = []
    dir_queue = [0] + [d[0] for d in dirs]  # root=0 then backup,dwc,Msg,PackData,Sound,wireless
    di = 0
    while p < len(fnt):
        b = fnt[p]
        if b == 0:
            did = dir_queue[di] if di < len(dir_queue) else None
            lists.append((did, cur))
            cur = []
            p += 1
            di += 1
            continue
        ln = b & 0x7F
        name = fnt[p+1:p+1+ln].decode("ascii", "replace")
        p += 1 + ln
        cur.append(name)
    return {"ndirs": ndirs, "pre_table_hex": pre_table.hex(),
            "dirs": dirs, "file_lists": lists}

def main():
    hdr = json.load(open(os.path.join(ROM_DIR, "header.json")))
    with open(ROM, "rb") as f:
        rom = f.read()
    os.makedirs(OUT, exist_ok=True)

    segs = {
        "arm9.bin": (hdr["arm9_rom_offset"], hdr["arm9_code_size"]),
        "arm7.bin": (hdr["arm7_rom_offset"], hdr["arm7_code_size"]),
        "arm9_ov.bin": (hdr["arm9_overlay_offset"], hdr["arm9_overlay_size"]),
    }
    for name, (off, sz) in segs.items():
        with open(os.path.join(OUT, name), "wb") as f:
            f.write(rom[off:off+sz])

    # FAT
    fat_off, fat_sz = hdr["fat_offset"], hdr["fat_size"]
    nfiles = fat_sz // 12
    fat = [struct.unpack_from("<III", rom, fat_off + i*12) for i in range(nfiles)]

    # FNT
    fnt_off, fnt_sz = hdr["fnt_offset"], hdr["fnt_size"]
    fnt = rom[fnt_off:fnt_off+fnt_sz]
    parsed = parse_fnt(fnt)
    with open(os.path.join(OUT, "fnt_parsed.json"), "w") as f:
        json.dump(parsed, f, indent=2)

    # build id->path (id 0 = root, then dirs in file-list order)
    name_of = {}   # id -> (dir, name)
    fid = 0
    # dirs with their lists: root list is the first (may be empty)
    for dir_id, names in parsed["file_lists"]:
        for n in names:
            name_of[fid] = (dir_id, n)
            fid += 1
    # remaining ids have no name
    print("named ids:", sorted(name_of))
    print("dirs:", parsed["dirs"])

    manifest = {}
    for i, (start, end, mem) in enumerate(fat):
        size = end - start
        if i in name_of:
            did, fname = name_of[i]
            dpath = {1: "backup", 2: "dwc", 3: "Msg", 4: "PackData", 5: "Sound", 6: "wireless"}.get(did, f"dir{did}")
            path = f"{dpath}/{fname}"
        elif i == 0:
            path = "root/arm9_arm7_shared.bin"
        else:
            path = f"unnamed/file_{i:02d}.bin"
        manifest[path] = {"id": i, "start": start, "end": end, "mem": hex(mem), "size": size}
        dpath = os.path.join(OUT, path)
        os.makedirs(os.path.dirname(dpath), exist_ok=True)
        with open(dpath, "wb") as f:
            f.write(rom[start:end])
    with open(os.path.join(OUT, "manifest.json"), "w") as f:
        json.dump(manifest, f, indent=2)
    print(f"saved {len(manifest)} files -> extracted/")
    for p, m in manifest.items():
        print(f"  {p:70s} {m['size']:9d}  {m['mem']}")

if __name__ == "__main__":
    main()

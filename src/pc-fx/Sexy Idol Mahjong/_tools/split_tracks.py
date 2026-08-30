#!/usr/bin/env python3
"""Split .cue/.bin into separate audio + data files.

Audio tracks: 16bit stereo 44.1kHz -> WAV
Data tracks : PC Engine / TurboGrafx CD (Hudson IP.BIN) — extract IP.BIN
              + decompress all zlib streams + scan for image signatures
"""
import struct, os, sys, wave, zlib, re, io

SAMPLE_RATE = 44100
BYTES_PER_SECTOR = 2352


def msf_to_lba(s):
    parts = s.strip().split(":")
    return int(parts[0]) * 60 * 75 + int(parts[1]) * 75 + int(parts[2])


def parse_cue(path):
    tracks, cur = [], None
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line.startswith("TRACK"):
                parts = line.split()
                mode = parts[2]
                if "/" in mode:
                    mode = "MODE1_RAW"
                tracks.append({"num": int(parts[1]), "mode": mode, "indices": []})
                cur = tracks[-1]
            elif line.startswith("INDEX"):
                p = line.split()
                cur["indices"].append((int(p[1]), msf_to_lba(p[2])))
    return tracks


def compute_ranges(tracks, total_bytes):
    total = total_bytes // BYTES_PER_SECTOR
    out = []
    for i, t in enumerate(tracks):
        idx1 = next((l for ix, l in t["indices"] if ix == 1), None)
        idx0 = next((l for ix, l in t["indices"] if ix == 0), None)
        if idx1 is None:
            idx1 = idx0 or 0
        if i + 1 < len(tracks):
            n = tracks[i + 1]
            nfirst = next((l for ix, l in n["indices"] if ix in (0, 1)), None)
            end = nfirst if nfirst is not None else total
        else:
            end = total
        out.append({"num": t["num"], "mode": t["mode"], "start_lba": idx1, "end_lba": end, "num_sectors": end - idx1})
    return out


def extract_audio(binpath, start_lba, sectors, outpath):
    with open(binpath, "rb") as f:
        f.seek(start_lba * BYTES_PER_SECTOR)
        raw = f.read(sectors * BYTES_PER_SECTOR)
    os.makedirs(os.path.dirname(outpath), exist_ok=True)
    with wave.open(outpath, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SAMPLE_RATE)
        w.writeframes(raw[:(len(raw) // BYTES_PER_SECTOR) * BYTES_PER_SECTOR])
    return len(raw) // 4


def read_user_data(binpath, start_lba, sectors):
    """Read MODE1/2352 sectors and return concatenated user data (skip CD headers)."""
    with open(binpath, "rb") as f:
        f.seek(start_lba * BYTES_PER_SECTOR)
        raw = f.read(sectors * BYTES_PER_SECTOR)
    user = bytearray()
    for s in range(sectors):
        user += raw[s * BYTES_PER_SECTOR + 16: s * BYTES_PER_SECTOR + 16 + 2048]
    return user, raw


def analyze_pc_engine_cd(binpath, track, outdir):
    user, raw = read_user_data(binpath, track["start_lba"], track["num_sectors"])

    info = {"size": len(user), "sectors": track["num_sectors"]}
    data_dir = os.path.join(outdir, "track_data", f"track_{track['num']:02d}")
    os.makedirs(data_dir, exist_ok=True)

    # Save raw user data
    raw_p = os.path.join(data_dir, "user_data.bin")
    with open(raw_p, "wb") as f:
        f.write(user)
    info["raw_dump"] = raw_p

    # Save game title (sector 0 user data, Shift-JIS text)
    title_data = user[:2048]
    title_text = bytes(title_data).split(b"\x00", 1)[0].decode("shift-jis", errors="replace")
    info["title_text"] = title_text
    title_p = os.path.join(data_dir, "game_title_jp.txt")
    with open(title_p, "w", encoding="utf-8") as f:
        f.write(title_text)
    info["title_file"] = title_p

    # Find IP.BIN (PC Engine CD-ROM SYSTEM)
    ip_idx = user.find(b"PC Engine CD-ROM SYSTEM")
    info["ip_offset"] = ip_idx
    if ip_idx >= 0:
        ip = user[ip_idx:ip_idx + 256]
        ip_p = os.path.join(data_dir, "IP.BIN")
        with open(ip_p, "wb") as f:
            f.write(ip)
        # Parse IP.BIN fields (256-byte structure)
        info["ip_file"] = ip_p
        info["ip_signature"] = ip[0:22].decode("ascii", errors="replace").rstrip("\x00")
        info["ip_copyright"] = ip[0x18:0x18+22].decode("ascii", errors="replace").rstrip("\x00")
        info["ip_title"] = ip[0x9c:0x9c+22].decode("ascii", errors="replace").rstrip("\x00")
        info["ip_developer"] = ip[0xc0:0xc0+22].decode("ascii", errors="replace").rstrip("\x00")
        info["ip_volume"] = ip[0xc0+0x20:0xc0+0x20+22].decode("ascii", errors="replace").rstrip("\x00")

        # IPL load address (offset 0xE0..0xE2 = M:S:F BCD)
        info["ip_ipl_msf"] = f"{ip[0xe0]:02x}:{ip[0xe1]:02x}:{ip[0xe2]:02x}"
        info["ip_ipl_size_sectors"] = int.from_bytes(ip[0xe4:0xe6], "big") if 0xe6 <= len(ip) else 0

        # After IP.BIN, dump a few sectors to inspect what follows (loader or compressed data)
        ip_end = ip_idx + 256
        info["after_ip_uncompressed"] = user[ip_end:ip_end + 32].hex()

    # Decompress all zlib streams
    zlib_blocks = []
    seen_offsets = set()
    # Search for zlib magic 0x78 0x01|0x9c|0xda|0x5e
    pos = 0
    while pos < len(user) - 2:
        if user[pos] == 0x78 and user[pos + 1] in (0x01, 0x9c, 0xda, 0x5e):
            start = pos
            try:
                d = zlib.decompress(user[start:])
                zlib_blocks.append((start, len(d), d))
                seen_offsets.add(start)
                # Skip past this block (approx - some round-trip)
                advance = max(1, len(d) // 4)
                pos = start + advance
            except zlib.error:
                pos = start + 1
        else:
            pos += 1

    zlib_summary = []
    cgs_saved = []
    if zlib_blocks:
        zdir = os.path.join(data_dir, "zlib_blocks")
        os.makedirs(zdir, exist_ok=True)
        for i, (off, dlen, data) in enumerate(zlib_blocks):
            zp = os.path.join(zdir, f"block_{i:03d}_off{off:08x}_size{dlen}.bin")
            with open(zp, "wb") as f:
                f.write(data)
            zlib_summary.append({"i": i, "offset": off, "size": dlen, "saved_to": zp})

            # Scan inside decoded zlib for known image signatures
            for name, magic, ext in [
                ("PNG", b"\x89PNG", "png"),
                ("JPEG", b"\xff\xd8\xff", "jpg"),
                ("BMP", b"BM", "bmp"),
                ("GIF", b"GIF8", "gif"),
                ("RIFF", b"RIFF", "wav"),  # WAV is RIFF WAV
                ("ZIP", b"PK\x03\x04", "zip"),
                ("LZ4", b"\x04\x22\x4d\x18", "lz4"),
                ("PNG-end-marker", b"IEND\xae\x42\x60\x82", None),
                # PC Engine native (16-bit LE paletted often start with palettes)
                ("NES-iNES", b"NES\x1a", "nes"),
                ("VGM-magic", b"Vgm ", "vgm"),
            ]:
                if ext:
                    pos2 = 0
                    while True:
                        idx = data.find(magic, pos2)
                        if idx < 0:
                            break
                        # Save embedded
                        ep = os.path.join(zdir, f"block{i:03d}_embedded_{name}_{idx:08x}.{ext}")
                        try:
                            with open(ep, "wb") as f:
                                f.write(data[idx:idx + min(len(data) - idx, 1024 * 1024)])
                            cgs_saved.append({"block": i, "kind": name, "offset": idx, "saved_to": ep})
                        except Exception:
                            pass
                        pos2 = idx + 1
    info["zlib_blocks"] = zlib_summary
    info["embedded_assets"] = cgs_saved

    return info


def main():
    if len(sys.argv) < 3:
        print(f"Usage: {sys.argv[0]} <cue> <out_dir>")
        sys.exit(1)
    cuepath = sys.argv[1]
    outdir = sys.argv[2]
    os.makedirs(outdir, exist_ok=True)

    binpath = cuepath.replace(".cue", ".bin")
    bin_size = os.path.getsize(binpath)
    print(f"BIN: {bin_size:,} bytes = {bin_size // BYTES_PER_SECTOR} sectors\n")

    tracks = parse_cue(cuepath)
    ranges = compute_ranges(tracks, bin_size)

    audio_dir = os.path.join(outdir, "audio")
    for r in ranges:
        if r["mode"] == "AUDIO":
            dur = r["num_sectors"] / 75.0
            out = os.path.join(audio_dir, f"track_{r['num']:02d}_AUDIO_{dur:.1f}s.wav")
            samples = extract_audio(binpath, r["start_lba"], r["num_sectors"], out)
            print(f"  T{r['num']:02d} AUDIO   -> {os.path.relpath(out, outdir)}  ({samples/44100:.1f}s)")
        elif r["mode"] == "MODE1_RAW":
            print(f"\n  T{r['num']:02d} MODE1_RAW  ({r['num_sectors']} sectors, {r['num_sectors']*2048/1024/1024:.1f} MB):")
            info = analyze_pc_engine_cd(binpath, r, outdir)
            print(f"    user data:       {info['size']:,} bytes (raw: {info['raw_dump']})")
            print(f"    game title (Shift-JIS): {info.get('title_text','')[:60]}")
            print(f"    title file:      {info['title_file']}")
            print(f"    IP.BIN offset:   {info.get('ip_offset')}")
            if info.get("ip_offset", -1) >= 0:
                print(f"    IP.BIN sig:      {info['ip_signature']}")
                print(f"    copyright:       {info['ip_copyright']}")
                print(f"    title:           {info['ip_title']}")
                print(f"    volume:          {info['ip_volume']}")
                print(f"    developer:       {info['ip_developer']}")
                print(f"    IPL MSF:         {info.get('ip_ipl_msf','?')}")
                print(f"    IPL sectors:     {info.get('ip_ipl_size_sectors','?')}")
                print(f"    IP.BIN saved:    {info['ip_file']}")
            print(f"    zlib blocks:     {len(info['zlib_blocks'])}")
            for b in info["zlib_blocks"][:5]:
                print(f"      - off={b['offset']:08x} size={b['size']:>10,} saved={b['saved_to']}")
            if len(info["zlib_blocks"]) > 5:
                print(f"      ... ({len(info['zlib_blocks'])-5} more)")
            if info["embedded_assets"]:
                print(f"    embedded assets:")
                for e in info["embedded_assets"][:10]:
                    print(f"      - {e['kind']} block#{e['block']} offset={e['offset']} -> {e['saved_to']}")
                if len(info["embedded_assets"]) > 10:
                    print(f"      ... ({len(info['embedded_assets'])-10} more)")


if __name__ == "__main__":
    main()

class Tile {
  pix: Uint8Array;
  initialized: boolean;
  opaque: Uint8Array;

  constructor() {
    // Tile data: color indices 0–3
    this.pix = new Uint8Array(64);

    this.initialized = false;
    this.opaque = new Uint8Array(8);
  }

  setBuffer(scanline: Uint8Array): void {
    for (let y = 0; y < 8; y++) {
      this.setScanline(y, scanline[y], scanline[y + 8]);
    }
  }

  setScanline(sline: number, b1: number, b2: number): void {
    this.initialized = true;
    let tIndex = sline << 3;
    for (let x = 0; x < 8; x++) {
      this.pix[tIndex + x] =
        ((b1 >> (7 - x)) & 1) + (((b2 >> (7 - x)) & 1) << 1);
      if (this.pix[tIndex + x] === 0) {
        this.opaque[sline] = false;
      }
    }
  }

  render(
    buffer: Uint32Array,
    srcx1: number,
    srcy1: number,
    srcx2: number,
    srcy2: number,
    dx: number,
    dy: number,
    palAdd: number,
    palette: Uint32Array,
    flipHorizontal: number,
    flipVertical: number,
    pri: number,
    priTable: Uint32Array,
  ): void {
    if (dx < -7 || dx >= 256 || dy < -7 || dy >= 240) {
      return;
    }

    if (dx < 0) {
      srcx1 -= dx;
    }
    if (dx + srcx2 >= 256) {
      srcx2 = 256 - dx;
    }

    if (dy < 0) {
      srcy1 -= dy;
    }
    if (dy + srcy2 >= 240) {
      srcy2 = 240 - dy;
    }

    let fbIndex: number, tIndex: number, palIndex: number, tpri: number;

    if (!flipHorizontal && !flipVertical) {
      fbIndex = (dy << 8) + dx;
      tIndex = 0;
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          if (x >= srcx1 && x < srcx2 && y >= srcy1 && y < srcy2) {
            palIndex = this.pix[tIndex];
            tpri = priTable[fbIndex];
            if (palIndex !== 0 && pri <= (tpri & 0xff)) {
              buffer[fbIndex] = palette[palIndex + palAdd];
              tpri = (tpri & 0xf00) | pri;
              priTable[fbIndex] = tpri;
            }
          }
          fbIndex++;
          tIndex++;
        }
        fbIndex -= 8;
        fbIndex += 256;
      }
    } else if (flipHorizontal && !flipVertical) {
      fbIndex = (dy << 8) + dx;
      tIndex = 7;
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          if (x >= srcx1 && x < srcx2 && y >= srcy1 && y < srcy2) {
            palIndex = this.pix[tIndex];
            tpri = priTable[fbIndex];
            if (palIndex !== 0 && pri <= (tpri & 0xff)) {
              buffer[fbIndex] = palette[palIndex + palAdd];
              tpri = (tpri & 0xf00) | pri;
              priTable[fbIndex] = tpri;
            }
          }
          fbIndex++;
          tIndex--;
        }
        fbIndex -= 8;
        fbIndex += 256;
        tIndex += 16;
      }
    } else if (flipVertical && !flipHorizontal) {
      fbIndex = (dy << 8) + dx;
      tIndex = 56;
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          if (x >= srcx1 && x < srcx2 && y >= srcy1 && y < srcy2) {
            palIndex = this.pix[tIndex];
            tpri = priTable[fbIndex];
            if (palIndex !== 0 && pri <= (tpri & 0xff)) {
              buffer[fbIndex] = palette[palIndex + palAdd];
              tpri = (tpri & 0xf00) | pri;
              priTable[fbIndex] = tpri;
            }
          }
          fbIndex++;
          tIndex++;
        }
        fbIndex -= 8;
        fbIndex += 256;
        tIndex -= 16;
      }
    } else {
      fbIndex = (dy << 8) + dx;
      tIndex = 63;
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          if (x >= srcx1 && x < srcx2 && y >= srcy1 && y < srcy2) {
            palIndex = this.pix[tIndex];
            tpri = priTable[fbIndex];
            if (palIndex !== 0 && pri <= (tpri & 0xff)) {
              buffer[fbIndex] = palette[palIndex + palAdd];
              tpri = (tpri & 0xf00) | pri;
              priTable[fbIndex] = tpri;
            }
          }
          fbIndex++;
          tIndex--;
        }
        fbIndex -= 8;
        fbIndex += 256;
      }
    }
  }

  isTransparent(x: number, y: number): boolean {
    return this.pix[(y << 3) + x] === 0;
  }

  toJSON(): { opaque: number[]; pix: number[] } {
    return {
      opaque: Array.from(this.opaque),
      pix: Array.from(this.pix),
    };
  }

  fromJSON(s: { opaque: number[]; pix: number[] }): void {
    this.opaque.set(s.opaque);
    this.pix.set(s.pix);
  }
}

export default Tile;

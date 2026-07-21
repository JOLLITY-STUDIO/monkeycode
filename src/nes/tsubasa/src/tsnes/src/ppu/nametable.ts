class NameTable {
  width: number;
  height: number;
  name: string;
  tile: Uint8Array;
  attrib: Uint8Array;

  constructor(width: number, height: number, name: string) {
    this.width = width;
    this.height = height;
    this.name = name;

    this.tile = new Uint8Array(width * height);
    this.attrib = new Uint8Array(width * height);
  }

  getTileIndex(x: number, y: number): number {
    return this.tile[y * this.width + x];
  }

  getAttrib(x: number, y: number): number {
    return this.attrib[y * this.width + x];
  }

  writeAttrib(index: number, value: number): void {
    let basex = (index % 8) * 4;
    let basey = Math.floor(index / 8) * 4;
    let add: number;
    let tx: number, ty: number;
    let attindex: number;

    for (let sqy = 0; sqy < 2; sqy++) {
      for (let sqx = 0; sqx < 2; sqx++) {
        add = (value >> (2 * (sqy * 2 + sqx))) & 3;
        for (let y = 0; y < 2; y++) {
          for (let x = 0; x < 2; x++) {
            tx = basex + sqx * 2 + x;
            ty = basey + sqy * 2 + y;
            attindex = ty * this.width + tx;
            this.attrib[attindex] = (add << 2) & 12;
          }
        }
      }
    }
  }

  toJSON(): { tile: number[]; attrib: number[] } {
    return {
      tile: Array.from(this.tile),
      attrib: Array.from(this.attrib),
    };
  }

  fromJSON(s: { tile: number[]; attrib: number[] }): void {
    this.tile.set(s.tile);
    this.attrib.set(s.attrib);
  }
}

export default NameTable;

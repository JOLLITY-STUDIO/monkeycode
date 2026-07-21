import Mapper4 from "./mapper4";

// TxSROM - MMC3 variant with CHR-controlled nametable mirroring
class Mapper118 extends Mapper4 {
  static mapperName = "TxSROM";

  chrRegs: number[];

  constructor(nes: any) {
    super(nes);
    this.chrRegs = [0, 0, 0, 0, 0, 0];
  }

  write(address: number, value: number): void {
    if (address === 0xa000) {
      return;
    }
    super.write(address, value);
    if (address === 0x8000) {
      this.updateNametableMirroring();
    }
  }

  executeCommand(cmd: number, arg: number): void {
    if (cmd <= 5) {
      this.chrRegs[cmd] = arg;
      super.executeCommand(cmd, arg & 0x7f);
      this.updateNametableMirroring();
    } else {
      super.executeCommand(cmd, arg);
    }
  }

  updateNametableMirroring(): void {
    let ppu = this.nes.ppu;

    if (this.chrAddressSelect === 0) {
      let nt01 = (this.chrRegs[0] >> 7) & 1;
      let nt23 = (this.chrRegs[1] >> 7) & 1;
      ppu.ntable1[0] = nt01;
      ppu.ntable1[1] = nt01;
      ppu.ntable1[2] = nt23;
      ppu.ntable1[3] = nt23;
    } else {
      ppu.ntable1[0] = (this.chrRegs[2] >> 7) & 1;
      ppu.ntable1[1] = (this.chrRegs[3] >> 7) & 1;
      ppu.ntable1[2] = (this.chrRegs[4] >> 7) & 1;
      ppu.ntable1[3] = (this.chrRegs[5] >> 7) & 1;
    }

    for (let i = 0; i < 4; i++) {
      let source = 0x2000 + i * 0x400;
      let target = 0x2000 + ppu.ntable1[i] * 0x400;
      ppu.defineMirrorRegion(source, target, 0x400);
    }

    ppu.currentMirroring = -1;
  }

  loadROM(): void {
    super.loadROM();
    this.updateNametableMirroring();
  }

  toJSON(): any {
    let s = super.toJSON();
    s.chrRegs = this.chrRegs.slice();
    return s;
  }

  fromJSON(s: any): void {
    super.fromJSON(s);
    this.chrRegs = s.chrRegs;
    this.updateNametableMirroring();
  }
}

export default Mapper118;

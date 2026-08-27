"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mapper0_1 = __importDefault(require("./mapper0"));
// Camerica/Codemasters mapper (BF9093/BF9097)
class Mapper71 extends mapper0_1.default {
    constructor(nes) {
        super(nes);
    }
    write(address, value) {
        if (address < 0x8000) {
            super.write(address, value);
            return;
        }
        if (address >= 0x9000 && address < 0xa000) {
            if (value & 0x10) {
                this.nes.ppu.setMirroring(this.nes.rom.SINGLESCREEN_MIRRORING2);
            }
            else {
                this.nes.ppu.setMirroring(this.nes.rom.SINGLESCREEN_MIRRORING);
            }
        }
        else if (address >= 0xc000) {
            this.loadRomBank(value & 0x0f, 0x8000);
        }
    }
    loadROM() {
        if (!this.nes.rom.valid) {
            throw new Error("Mapper 71: Invalid ROM! Unable to load.");
        }
        this.loadRomBank(0, 0x8000);
        this.loadRomBank(this.nes.rom.romCount - 1, 0xc000);
        this.loadCHRROM();
        this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
    }
}
Mapper71.mapperName = "Camerica";
exports.default = Mapper71;

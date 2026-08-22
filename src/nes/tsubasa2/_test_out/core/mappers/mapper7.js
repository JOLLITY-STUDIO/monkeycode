"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mapper0_1 = __importDefault(require("./mapper0"));
// AxROM (NES-AMROM, NES-ANROM, NES-AOROM)
class Mapper7 extends mapper0_1.default {
    constructor(nes) {
        super(nes);
    }
    write(address, value) {
        if (address < 0x8000) {
            super.write(address, value);
        }
        else {
            this.load32kRomBank(value & 0x7, 0x8000);
            if (value & 0x10) {
                this.nes.ppu.setMirroring(this.nes.rom.SINGLESCREEN_MIRRORING2);
            }
            else {
                this.nes.ppu.setMirroring(this.nes.rom.SINGLESCREEN_MIRRORING);
            }
        }
    }
    loadROM() {
        if (!this.nes.rom.valid) {
            throw new Error("AOROM: Invalid ROM! Unable to load.");
        }
        this.loadPRGROM();
        this.loadCHRROM();
        this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
    }
}
Mapper7.mapperName = "AxROM";
exports.default = Mapper7;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mapper0_1 = __importDefault(require("./mapper0"));
// UxROM (NES-UNROM, NES-UOROM)
class Mapper2 extends mapper0_1.default {
    constructor(nes) {
        super(nes);
    }
    write(address, value) {
        if (address < 0x8000) {
            super.write(address, value);
            return;
        }
        else {
            this.loadRomBank(value, 0x8000);
        }
    }
    loadROM() {
        if (!this.nes.rom.valid) {
            throw new Error("UNROM: Invalid ROM! Unable to load.");
        }
        this.loadRomBank(0, 0x8000);
        this.loadRomBank(this.nes.rom.romCount - 1, 0xc000);
        this.loadCHRROM();
        this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
    }
}
Mapper2.mapperName = "UxROM";
exports.default = Mapper2;

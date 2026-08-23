"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mapper0_1 = __importDefault(require("./mapper0"));
// PCI556 (UNL-PCI556) - Bit Corp
class Mapper38 extends mapper0_1.default {
    constructor(nes) {
        super(nes);
    }
    write(address, value) {
        if (address < 0x7000 || address > 0x7fff) {
            super.write(address, value);
            return;
        }
        else {
            this.load32kRomBank(value & 3, 0x8000);
            this.load8kVromBank(((value >> 2) & 3) * 2, 0x0000);
        }
    }
}
Mapper38.mapperName = "PCI556";
exports.default = Mapper38;

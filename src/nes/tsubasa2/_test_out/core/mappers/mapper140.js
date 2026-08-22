"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mapper0_1 = __importDefault(require("./mapper0"));
// Jaleco JF-11 / JF-14
class Mapper140 extends mapper0_1.default {
    constructor(nes) {
        super(nes);
    }
    write(address, value) {
        if (address < 0x6000 || address > 0x7fff) {
            super.write(address, value);
            return;
        }
        else {
            this.load32kRomBank((value >> 4) & 3, 0x8000);
            this.load8kVromBank((value & 0xf) * 2, 0x0000);
        }
    }
}
Mapper140.mapperName = "Jaleco JF-11/JF-14";
exports.default = Mapper140;

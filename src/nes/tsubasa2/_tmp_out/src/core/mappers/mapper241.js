"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mapper0_1 = __importDefault(require("./mapper0"));
// BxROM variant (Hengge Technology)
class Mapper241 extends mapper0_1.default {
    constructor(nes) {
        super(nes);
    }
    write(address, value) {
        if (address < 0x8000) {
            super.write(address, value);
            return;
        }
        else {
            this.load32kRomBank(value, 0x8000);
        }
    }
}
Mapper241.mapperName = "BxROM (Mapper 241)";
exports.default = Mapper241;

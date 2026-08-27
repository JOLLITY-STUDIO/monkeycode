"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TitleMenuPaletteInitService = void 0;
/** ROM $054A..$0629 RAM buffer 长度 */
const TITLE_NT_PALETTE_BUF_LEN = 224; // 0xE0
class TitleMenuPaletteInitService {
    constructor(store) {
        this.store = store;
    }
    /**
     * Bank00 $9B10-$9B23 协议完整翻译:
     *   - $0048/$0049/$004A/$004B 清零 (cursor + palette state counters)
     *   - $054A..$0629 全 $0F (清 NT palette buffer)
     */
    initState() {
        this.store.writeByte(0x0048, 0x00);
        this.store.writeByte(0x0049, 0x00);
        this.store.writeByte(0x004a, 0x00);
        this.store.writeByte(0x004b, 0x00);
        for (let off = 0; off < TITLE_NT_PALETTE_BUF_LEN; off++) {
            this.store.writeByte(0x054a + off, 0x0f);
        }
    }
}
exports.TitleMenuPaletteInitService = TitleMenuPaletteInitService;

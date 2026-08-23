"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterruptService = void 0;
class InterruptService {
    constructor(store, input) {
        this.store = store;
        this.input = input;
        this.router = null;
        this.audio = null;
        /** 已应用 CHR 槽位缓存（$C9E9 每帧重放，仅装载变化槽位） */
        this.chrSlots = new Array(8).fill(-1);
    }
    /** 注入场景路由（BootRouter） */
    attachRouter(router) {
        this.router = router;
    }
    /** 注入音频服务（每帧推进音频引擎） */
    attachAudio(audio) {
        this.audio = audio;
    }
    /**
     * 每帧 NMI（$C76E 语义）
     * @param frame 帧号
     */
    nmi(frame) {
        const store = this.store;
        store.frame = frame;
        // 1. 手柄读取（bank02 $80D7 语义）
        this.input.readControllers();
        // 2. 音频引擎帧推进（bank12 $80BA 语义）
        this.audio?.update();
        // 3. 场景帧更新（游戏逻辑；v0.1 场景为 stub）
        this.router?.update(frame);
        // 4. 主渲染路径标志（$C775: ram_001B bit7 置位）
        store.writeByte(0x001b, store.readByte(0x001b) | 0x80);
    }
    /**
     * 渲染提交（$C775 + bank02 $8000 语义）：
     * CTRL/MASK → 滚动 → $05E8 缓冲 → $0498 队列 → OAM → 调色板
     */
    renderCommit(ppu) {
        const store = this.store;
        // PPU CTRL/MASK
        ppu.updateControlReg1(store.readByte(0x0020));
        ppu.updateControlReg2(store.readByte(0x0021));
        // 滚动：X = ram_004A + ram_0538（$C7B7 语义），Y = ram_004B
        const sx = (store.readByte(0x004a) + store.readByte(0x0538)) & 0xff;
        const sy = store.readByte(0x004b) & 0xff;
        ppu.regHT = (sx >> 3) & 31;
        ppu.regFH = sx & 7;
        ppu.regH = (sx >> 5) & 1;
        ppu.regVT = (sy >> 3) & 31;
        ppu.regFV = sy & 7;
        ppu.regV = (sy >> 5) & 1;
        // CHR bank 请求表（$C9E9 语义：ram_0022 + ram_0490-$0497 → MMC3 8 slot）
        this.applyChrRequest(ppu);
        // $05E8 渲染缓冲（bank02 $8019 语义）：[count, addrLo, addrHi, data×count...]，0 终止
        // count bit7=1 时 CTRL 列增量（+32），否则行增量（+1）
        this.flushNtBuffer(ppu);
        // $0498 延迟缓冲队列（$C8FB 语义）
        this.flushRenderQueue(ppu);
        // OAM $0200 → spriteMem（$C78B OAM DMA 语义）
        const oam = store.oamBuffer;
        for (let i = 0; i < 0x100; i++)
            ppu.spriteMem[i] = oam[i];
        // 调色板：ram_062A（BG）/ ram_063A（SPR）→ PPU $3F00/$3F10
        this.flushPalette(ppu);
    }
    /**
     * $05E8 渲染缓冲消费（bank02 $801D-$804A）。
     * 条目格式：byte0=count（非 0），byte1=addrLo，byte2=addrHi，之后 count 字节数据。
     * count bit7=0 时 PPU 地址每次 +1（行模式），bit7=1 时每次 +32（列模式）。
     * byte0=0 表示结束。
     */
    flushNtBuffer(ppu) {
        const buf = this.store.ntRenderBuffer;
        let x = 0;
        while (x + 3 <= 0x40) {
            const b0 = buf[x] & 0xff;
            if (b0 === 0)
                break; // $9B5E 结束标记
            const vertical = (b0 & 0x80) !== 0;
            const count = vertical ? (b0 & 0x3f) : b0;
            const addr = (buf[x + 2] << 8) | buf[x + 1];
            const step = vertical ? 32 : 1;
            for (let i = 0; i < count && x + 3 + i < 0x40; i++) {
                ppu.writeMem((addr + i * step) & 0x3fff, buf[x + 3 + i]);
            }
            x += 3 + count;
        }
        // 缓冲消费后清零（原版 NMI 末尾 STA $0628=0 语义）
        this.store.writeByte(0x0628, 0);
    }
    /** $0498 渲染缓冲队列（$C8FB）：每项 3 字节 [bank|0x80, ptrLo, ptrHi] */
    flushRenderQueue(_ppu) {
        const store = this.store;
        const count = store.readByte(0x0498);
        if (count === 0)
            return;
        // TODO V0.2/V0.3: 完整翻译 $C8FB 数据流（渲染命令流解析）
        store.writeByte(0x0498, 0);
    }
    /** 调色板：ram_062A+16（BG）→ $3F00；ram_063A+16（SPR）→ $3F10 */
    flushPalette(ppu) {
        const store = this.store;
        for (let i = 0; i < 0x10; i++) {
            ppu.writeMem(0x3f00 + i, store.readByte(0x062a + i));
        }
        for (let i = 0; i < 0x10; i++) {
            ppu.writeMem(0x3f10 + i, store.readByte(0x063a + i));
        }
    }
    /**
     * $C9E9 CHR bank 请求表装载（MMC3，逐指令对照 asm/bank30/code_main.s $C9E9-$CA21）。
     * 由 ram_0022（命令基址 + chrSel）+ ram_0490-$0497（8 字节请求表）解码为 8 个 1KB slot。
     */
    applyChrRequest(ppu) {
        if (!ppu.loadChrBank)
            return;
        const store = this.store;
        const base = store.readByte(0x0022);
        const cmdBase = base & 7;
        const chrSel = (base >> 7) & 1;
        let x = chrSel !== 0 ? 4 : 0;
        // $C9F1: $8000=cmd, $8001=ram_0490+X；$8000=cmd|1, $8001=ram_0491+X
        this.mmc3ChrWrite(ppu, cmdBase, chrSel, store.readByte(0x0490 + x));
        this.mmc3ChrWrite(ppu, cmdBase | 1, chrSel, store.readByte(0x0491 + x));
        x ^= 4;
        // $CA0F: for Y=2..5: $8000=Y|ram_0022, $8001=ram_0490+X++
        for (let y = 2; y <= 5; y++) {
            this.mmc3ChrWrite(ppu, y | base, chrSel, store.readByte(0x0490 + x));
            x++;
        }
    }
    /** MMC3 $8000/$8001 CHR 写解码（Mapper4.executeCommand 语义；cmd 6/7=PRG 无语义） */
    mmc3ChrWrite(ppu, cmd, chrSel, arg) {
        const bank = arg & 0xff;
        switch (cmd & 7) {
            case 0:
                if (chrSel === 0) {
                    this.loadChrSlot(ppu, 0, bank);
                    this.loadChrSlot(ppu, 1, bank + 1);
                }
                else {
                    this.loadChrSlot(ppu, 4, bank);
                    this.loadChrSlot(ppu, 5, bank + 1);
                }
                break;
            case 1:
                if (chrSel === 0) {
                    this.loadChrSlot(ppu, 2, bank);
                    this.loadChrSlot(ppu, 3, bank + 1);
                }
                else {
                    this.loadChrSlot(ppu, 6, bank);
                    this.loadChrSlot(ppu, 7, bank + 1);
                }
                break;
            case 2:
                this.loadChrSlot(ppu, chrSel === 0 ? 4 : 0, bank);
                break;
            case 3:
                this.loadChrSlot(ppu, chrSel === 0 ? 5 : 1, bank);
                break;
            case 4:
                this.loadChrSlot(ppu, chrSel === 0 ? 6 : 2, bank);
                break;
            case 5:
                this.loadChrSlot(ppu, chrSel === 0 ? 7 : 3, bank);
                break;
            default: break; // cmd 6/7 = PRG ROM page，H5 无语义
        }
    }
    /** 装载单个 1KB CHR slot（值未变化时跳过，避免每帧重复拷贝） */
    loadChrSlot(ppu, slot, bank1k) {
        const b = bank1k & 0xff;
        if (this.chrSlots[slot] === b)
            return;
        this.chrSlots[slot] = b;
        ppu.loadChrBank(slot, b);
    }
}
exports.InterruptService = InterruptService;

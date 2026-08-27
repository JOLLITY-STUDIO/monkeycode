"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioService = void 0;
const audio_rom_1 = require("../../data/audio/audio-rom");
const SongCatalog_1 = require("../../data/audio/SongCatalog");
// APU 状态寄存器
const APU_STATUS = 0x4015;
// 通道状态块基址（每通道 16 字节）
const CH_STATE_BASE = 0x0727;
// 计数器基址（每通道 4 字节）
const CH_COUNTER_BASE = 0x0707;
// 通道数
const NUM_CH = 8;
// ChannelKind → 内部 ch 编号
const KIND_TO_CH = {
    pulse1: 4, pulse2: 5, triangle: 6, noise: 7,
    pulse1Dup: 4, pulse2Dup: 5, triangleDup: 6, noiseDup: 7,
};
/** APU 通道分组（group 3=SQ1, 2=SQ2, 1=TRI, 0=NOISE） */
const APU_GROUPS = [
    { mask: 0x11, chLow: 0, chHigh: 4, group: 3 }, // SQ1
    { mask: 0x22, chLow: 1, chHigh: 5, group: 2 }, // SQ2
    { mask: 0x44, chLow: 2, chHigh: 6, group: 1 }, // TRI
    { mask: 0x88, chLow: 3, chHigh: 7, group: 0 }, // NOISE
];
class AudioService {
    constructor(store) {
        this.papu = null;
        /** 当前播放曲目（用于 token 流迭代） */
        this.currentSong = null;
        /** 每通道当前 token 流 + cursor */
        this.trackCursors = new Map();
        this.store = store;
    }
    /** 注入 PAPU 实例 */
    attachPapu(papu) { this.papu = papu; }
    // ════════════════════════════════════════════════════
    // 公共 API
    // ════════════════════════════════════════════════════
    update() {
        this.consumeQueue();
        // Phase 1: 8 通道 tick
        this.phase1();
        // Phase 2: APU 寄存器写入
        this.phase2();
        // PAPU 帧推进
        if (this.papu) {
            let remaining = 29830;
            while (remaining > 0) {
                const n = remaining > 7 ? 7 : remaining;
                this.papu.clockFrameCounter(n, 0);
                remaining -= n;
            }
        }
        // 全局静音
        if (this.store.audioState.muteAll !== 0)
            this.papu?.writeReg(APU_STATUS, 0);
    }
    playBgm(bgmId) {
        this.store.audioState.bgmRequest = bgmId & 0xFF;
    }
    playSe(seId) {
        const state = this.store.audioState;
        for (let s = 1; s <= 5; s++) {
            const cur = s === 1 ? state.seRequest1
                : s === 2 ? state.seRequest2
                    : s === 3 ? state.seRequest3
                        : s === 4 ? state.seRequest4
                            : state.seRequest5;
            if (cur === 0) {
                if (s === 1)
                    state.seRequest1 = seId & 0xFF;
                else if (s === 2)
                    state.seRequest2 = seId & 0xFF;
                else if (s === 3)
                    state.seRequest3 = seId & 0xFF;
                else if (s === 4)
                    state.seRequest4 = seId & 0xFF;
                else
                    state.seRequest5 = seId & 0xFF;
                return;
            }
        }
        state.seRequest5 = seId & 0xFF;
    }
    stopAll() {
        const state = this.store.audioState;
        state.bgmRequest = 0;
        state.seRequest1 = 0;
        state.seRequest2 = 0;
        state.seRequest3 = 0;
        state.seRequest4 = 0;
        state.seRequest5 = 0;
        state.channelMask = 0;
        this.papu?.writeReg(APU_STATUS, 0);
    }
    // ════════════════════════════════════════════════════
    // 请求队列消费
    // ════════════════════════════════════════════════════
    consumeQueue() {
        const state = this.store.audioState;
        const bgmReq = state.bgmRequest;
        if (bgmReq !== 0 && bgmReq < 0x32) {
            this.startBgm(bgmReq);
            state.bgmRequest = 0;
        }
        for (let slot = 1; slot <= 5; slot++) {
            const seReq = slot === 1 ? state.seRequest1
                : slot === 2 ? state.seRequest2
                    : slot === 3 ? state.seRequest3
                        : slot === 4 ? state.seRequest4
                            : state.seRequest5;
            if (seReq === 0)
                continue;
            if (seReq >= 0x72) {
                if (slot === 1)
                    state.seRequest1 = 0;
                else if (slot === 2)
                    state.seRequest2 = 0;
                else if (slot === 3)
                    state.seRequest3 = 0;
                else if (slot === 4)
                    state.seRequest4 = 0;
                else
                    state.seRequest5 = 0;
                continue;
            }
            if (seReq === 0x31) {
                this.stopAllSe();
                if (slot === 1)
                    state.seRequest1 = 0;
                else if (slot === 2)
                    state.seRequest2 = 0;
                else if (slot === 3)
                    state.seRequest3 = 0;
                else if (slot === 4)
                    state.seRequest4 = 0;
                else
                    state.seRequest5 = 0;
                continue;
            }
            this.startSe(seReq);
            if (slot === 1)
                state.seRequest1 = 0;
            else if (slot === 2)
                state.seRequest2 = 0;
            else if (slot === 3)
                state.seRequest3 = 0;
            else if (slot === 4)
                state.seRequest4 = 0;
            else
                state.seRequest5 = 0;
        }
    }
    /**
     * 启动 BGM：按 requestId 查 SongCatalog（具名）
     * 不再走 readSePointer / readBank12U16
     */
    startBgm(bgmId) {
        this.store.audioState.channelMask = 0;
        this.currentSong = (0, SongCatalog_1.lookupSong)(bgmId);
        if (!this.currentSong)
            return;
        this.startSong(this.currentSong);
    }
    /** 启动 SE：按 seId 查 SongCatalog（具名） */
    startSe(seId) {
        this.currentSong = (0, SongCatalog_1.lookupSong)(seId);
        if (!this.currentSong)
            return;
        this.startSong(this.currentSong);
    }
    /**
     * 统一歌曲启动：从 SongRecord 初始化各通道 token 流
     * 不再解析 readBank12U16 / readTrackData 字节流
     */
    startSong(song) {
        if (((song.headerFlag ?? 0) & 0x80) !== 0) {
            this.papu?.writeReg(APU_STATUS, 0x0F);
            return;
        }
        for (const track of song.channels) {
            const ch = KIND_TO_CH[track.channel] ?? 4;
            this.initChannel(ch, track);
        }
        this.papu?.writeReg(APU_STATUS, 0x0F);
    }
    /** 初始化单个通道（具名 token 流 + cursor） */
    initChannel(ch, track) {
        const chBase = CH_STATE_BASE + ch * 0x10;
        const counterBase = CH_COUNTER_BASE + ch * 4;
        const store = this.store;
        // 通道状态块（首字节 = track 长度，供后续 token 迭代）
        store.writeU16(chBase, track.track.length);
        store.writeU16(chBase + 2, 0); // 循环起点（start 之后用）
        store.writeByte(chBase + 4, 0); // timing index
        const pm = ch & 3;
        store.writeByte(chBase + 5, pm === 1 ? 0x80 : pm === 2 ? 0x0F : 0x00); // volCtrl
        store.writeByte(chBase + 6, 0x30); // apuVol
        store.writeByte(chBase + 7, 0); // freqLo
        store.writeByte(chBase + 8, 0x80); // freqHi (bit7=标志)
        store.writeByte(chBase + 9, 0x0F); // stkPtr
        // 计数器
        store.writeByte(counterBase, 1); // durLo
        store.writeByte(counterBase + 1, 1); // durHi
        store.writeByte(counterBase + 2, 1); // noteDur
        store.writeByte(counterBase + 3, 0); // nextDurHi
        // 通道使能位
        let bit = 1;
        for (let i = 0; i < ch; i++)
            bit = (bit << 1) & 0xFF;
        this.store.audioState.channelMask |= bit;
        // 记录 token 流 cursor
        this.trackCursors.set(ch, 0);
        // 立即触发音序器（durLo=1 → 第一帧 dl=0 → 触发 token 处理）
        store.writeByte(counterBase, 1);
        store.writeByte(counterBase + 1, 1);
    }
    // ════════════════════════════════════════════════════
    // Phase 1: 8 通道 tick
    // ════════════════════════════════════════════════════
    phase1() {
        const state = this.store.audioState;
        const mask = state.channelMask;
        for (let ch = 0; ch < NUM_CH; ch++) {
            const chBit = 1 << ch;
            if (!(mask & chBit))
                continue;
            const c = state.channelCounter(ch);
            // DEC durLo
            const dl = (c.durLo - 1) & 0xFF;
            state.setChannelCounter(ch, { durLo: dl });
            if (dl === 0)
                this.processToken(ch);
            // DEC durHi
            const dh = (c.durHi - 1) & 0xFF;
            state.setChannelCounter(ch, { durHi: dh });
            if (dh === 0) {
                const newDurHi = state.channelCounter(ch).durLo || 1;
                state.setChannelCounter(ch, { durHi: newDurHi });
            }
            // 音高计算
            this.calcPitch(ch);
        }
    }
    /**
     * 处理下一个 token（具名 token 流迭代，替代 sub83CB 的字节流解析）
     * 简化实现：note token → 写 freqLo/freqHi；duration → 更新 durLo/durHi
     */
    processToken(ch) {
        const track = this.currentSong?.channels.find(c => {
            const kn = c.channel;
            const internalCh = (kn === 'pulse1' || kn === 'pulse1Dup') ? 4
                : (kn === 'pulse2' || kn === 'pulse2Dup') ? 5
                    : (kn === 'triangle' || kn === 'triangleDup') ? 6
                        : 7;
            return internalCh === ch;
        });
        if (!track)
            return;
        const cursor = this.trackCursors.get(ch) ?? 0;
        if (cursor >= track.track.length)
            return;
        const token = track.track[cursor];
        this.trackCursors.set(ch, cursor + 1);
        const store = this.store;
        const chBase = CH_STATE_BASE + ch * 0x10;
        const counterBase = CH_COUNTER_BASE + ch * 4;
        switch (token.kind) {
            case 'note': {
                // 直通通道（NOISE）：freqByte 直接作 frequency
                if (ch === 3 || ch === 7) {
                    if (token.semitone === 0x10) {
                        store.writeByte(chBase + 5, store.readByte(chBase + 5) | 0x20);
                    }
                    else {
                        store.writeByte(chBase + 7, token.semitone);
                        store.writeByte(chBase + 8, 0x80);
                    }
                    store.writeByte(0x07F4 + ch, 0);
                    store.writeByte(counterBase + 1, 1);
                    return;
                }
                // 半音通道
                if (token.semitone >= 0x0C) {
                    store.writeByte(chBase + 5, store.readByte(chBase + 5) | 0x20);
                    store.writeByte(0x07F4 + ch, 0);
                    store.writeByte(counterBase + 1, 1);
                    return;
                }
                // 查频率表 → 八度右移
                let period = audio_rom_1.AudioRom.frequency(token.semitone);
                let fLo = period & 0xFF;
                let fHi = (period >> 8) & 0x07;
                for (let o = 0; o < token.octave; o++) {
                    const carry = fHi & 1;
                    fHi = (fHi >> 1) & 0x07;
                    fLo = ((fLo >> 1) | (carry << 7)) & 0xFF;
                }
                if (fLo < 2 && fHi === 0)
                    fLo = 2;
                fHi |= 0x80;
                store.writeByte(chBase + 7, fLo);
                store.writeByte(chBase + 8, fHi);
                store.writeByte(0x07B7 + ch, fLo);
                store.writeByte(0x07BF + ch, fHi);
                store.writeByte(0x07F4 + ch, 0);
                store.writeByte(counterBase + 1, 1);
                return;
            }
            case 'duration': {
                store.writeByte(counterBase, token.ticks);
                store.writeByte(counterBase + 1, token.ticks);
                return;
            }
            case 'speed': {
                // 速度 token：跳过（速度值不写状态）
                return;
            }
            case 'rest': {
                store.writeByte(chBase + 5, store.readByte(chBase + 5) | 0x20);
                return;
            }
            case 'noise': {
                store.writeByte(chBase + 7, token.freqByte);
                store.writeByte(chBase + 8, 0x80);
                return;
            }
            case 'command': {
                // 命令处理由 execCmd 调度（保留 opcode → 行为映射）
                this.execCmd(ch, chBase, token.opcode, token.arg);
                return;
            }
        }
    }
    /** 命令执行（保留原 opcode → 行为映射的语义） */
    execCmd(ch, chBase, opcode, arg) {
        const store = this.store;
        const counterBase = CH_COUNTER_BASE + ch * 4;
        const opAddr = audio_rom_1.AudioRom.command(opcode);
        switch (opAddr) {
            case 0x8544: { // $E0: 设置音符表指针
                store.writeByte(chBase + 4, arg ?? 0);
                store.writeByte(chBase + 5, store.readByte(chBase + 5) | 0x80);
                return;
            }
            case 0x8641: { // $E2: 设置音量
                const p = arg ?? 0;
                store.writeByte(chBase + 5, (store.readByte(chBase + 5) & 0xF0) | (p & 0x0F));
                return;
            }
            case 0x8670: { // $E5: 设置 portamento
                const p = arg ?? 0;
                if (!(p & 0x80))
                    store.writeByte(0x07F4 + ch, (p << 1) & 0xFF);
                store.writeByte(0x07A7 + ch, p);
                return;
            }
            case 0x8681: { // $ED: 设置通道类型
                const p = arg ?? 0;
                store.writeByte(0x07AF + ch, p);
                store.writeByte(0x07C7 + ch, 0);
                return;
            }
            case 0x8690: { // $EF: 清除通道类型
                store.writeByte(0x07AF + ch, 0);
                return;
            }
            case 0x851A: { // $F2: 停止
                this.stopAll();
                return;
            }
            case 0x8699:
                this.playDpcm(0);
                return;
            case 0x86B8:
                this.playDpcm(1);
                return;
            case 0x86D6:
                this.playDpcm(2);
                return;
            case 0x86F6: { // $FE: 设置 volDecay
                const decay = arg ?? 0;
                store.writeByte(0x07CF + ch, decay);
                store.writeByte(0x07D7 + ch, decay);
                return;
            }
            case 0x8655: { // $FF: 停止通道 / 循环
                // 回到循环起点（具名 token 流：cursor = 0）
                this.trackCursors.set(ch, 0);
                store.writeByte(chBase + 4, 0);
                return;
            }
            // F3/F6 新增命令 — Vibrato / Arpeggio / Portamento 变体
            // (Bank 6 offset 0x4DA 命令表新提取的命令处理器地址；待 ROM 详细反汇编确认行为)
            case 0x855F: // $E3 - Portamento speed / Slide rate
                store.writeByte(0x07F4 + ch, ((arg ?? 0) & 0x3f) << 2);
                return;
            case 0x8617: // $E4 - Detune / pitch offset
                store.writeByte(0x07F4 + ch, (arg ?? 0) & 0xff);
                return;
            case 0x8578: // Vibrato 模式 A
                store.writeByte(0x07AF + ch, ((store.readByte(0x07AF + ch) & 0xf0) | ((arg ?? 0) & 0x0f)));
                return;
            case 0x8585: // Vibrato 模式 B
                store.writeByte(0x07AF + ch, ((store.readByte(0x07AF + ch) & 0x0f) | (((arg ?? 0) & 0x0f) << 4)));
                return;
            case 0x85AF: // Arpeggio 模式 A
                store.writeByte(0x07B7 + ch, (arg ?? 0) & 0xff);
                return;
            case 0x85C6: // Arpeggio 模式 B
                store.writeByte(0x07BF + ch, (arg ?? 0) & 0xff);
                return;
            case 0x85EF: // Arpeggio 模式 C
                store.writeByte(0x07C7 + ch, (arg ?? 0) & 0xff);
                return;
            case 0x8709: // NOP 变体
                return;
            case 0x853B: // Portamento target
                store.writeByte(0x07A7 + ch, (arg ?? 0) & 0xff);
                return;
            case 0x8532: // Slide period
                store.writeByte(0x07AF + ch, (arg ?? 0) & 0xff);
                return;
            case 0x86D7: // DPCM 变体 (DPCM sample 2 variant)
                this.playDpcm(2);
                return;
            default: return;
        }
    }
    // ════════════════════════════════════════════════════
    // Phase 2: APU 寄存器写入
    // ════════════════════════════════════════════════════
    phase2() {
        const chMask = this.store.audioState.channelMask;
        for (const slot of APU_GROUPS) {
            if (!(chMask & slot.mask))
                continue;
            const ch = (chMask & (1 << slot.chLow)) ? slot.chLow : slot.chHigh;
            this.writeApuReg(ch, slot.group);
        }
    }
    /** 写 APU 寄存器（具名 group：3=SQ1, 2=SQ2, 1=TRI, 0=NOISE） */
    writeApuReg(ch, group) {
        const chBase = CH_STATE_BASE + ch * 0x10;
        const isTri = group === 1;
        const apuBase = 0x4000 + (group ^ 3) * 4;
        const store = this.store;
        const volByte = isTri ? store.readByte(chBase + 5) : store.readByte(chBase + 6);
        if (isTri) {
            this.papu?.writeReg(apuBase, (volByte & 0x0F) | 0x80);
        }
        else {
            this.papu?.writeReg(apuBase, volByte | 0x30);
        }
        const sweepEnabled = (store.readByte(chBase + 5) & 0x10) !== 0;
        if (!sweepEnabled) {
            this.papu?.writeReg(apuBase + 1, 0x08);
        }
        if (!sweepEnabled || (store.readByte(chBase + 8) & 0x80) !== 0) {
            if (sweepEnabled) {
                store.writeByte(chBase + 8, store.readByte(chBase + 8) & 0x7F);
            }
            const freqLo = store.readByte(chBase + 7);
            const freqHi = store.readByte(chBase + 8) & 0x07;
            this.papu?.writeReg(apuBase + 2, freqLo);
            this.papu?.writeReg(apuBase + 3, freqHi | 0x18);
        }
    }
    // ════════════════════════════════════════════════════
    // 音高计算（包络衰减 + 频率偏移）
    // ════════════════════════════════════════════════════
    calcPitch(ch) {
        const chBase = CH_STATE_BASE + ch * 0x10;
        const store = this.store;
        const volCtrl = store.readByte(chBase + 5);
        const hiNib = volCtrl & 0xF0;
        let vol;
        if (hiNib & 0x20) {
            vol = 0x0F;
        }
        else {
            vol = volCtrl & 0x0F;
            const decay = store.readByte(0x07CF + ch);
            if (decay !== 0) {
                const newDecay = (decay - 1) & 0xFF;
                store.writeByte(0x07CF + ch, newDecay);
                if (newDecay === 0) {
                    vol = (vol + 1) & 0xFF;
                    if (vol > 0x0F)
                        vol = 0x0F;
                }
            }
        }
        const noteDur = store.readByte(0x0709 + ch * 4);
        let finalVol = noteDur - vol;
        if (finalVol < 0)
            finalVol = 0;
        finalVol |= hiNib;
        store.writeByte(chBase + 6, finalVol);
    }
    // ════════════════════════════════════════════════════
    // DPCM
    // ════════════════════════════════════════════════════
    playDpcm(sample) {
        const params = [{ a: 0x00, l: 0x0C }, { a: 0x03, l: 0x20 }, { a: 0x0B, l: 0x13 }];
        const s = params[sample];
        this.papu?.writeReg(APU_STATUS, 0x0F);
        this.papu?.writeReg(0x4010, 0x0F);
        this.papu?.writeReg(0x4012, s.a);
        this.papu?.writeReg(0x4013, s.l);
        this.papu?.writeReg(APU_STATUS, 0x1F);
    }
    // ════════════════════════════════════════════════════
    // 停止 SE
    // ════════════════════════════════════════════════════
    stopAllSe() {
        const ENV_STOP = 0x19, VOL_STOP = 0x0A;
        for (const a of [0x07D0, 0x07D4, 0x07D8, 0x07DC])
            this.store.writeByte(a, VOL_STOP);
        for (const a of [0x07CF, 0x07D1, 0x07D2, 0x07D3, 0x07D5, 0x07D6, 0x07D7,
            0x07D9, 0x07DA, 0x07DB, 0x07DD, 0x07DE, 0x07DF])
            this.store.writeByte(a, ENV_STOP);
    }
}
exports.AudioService = AudioService;

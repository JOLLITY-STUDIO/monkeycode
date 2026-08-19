"use strict";
/**
 * Bank 12 音频引擎 — 核心逻辑
 *
 * 从 mini-audio/bgm-data/Tsubasa2AudioPlayer.ts 移植。
 * 严格对照 bank_12.asm 逐行翻译，直接消费 BGM/SE 轨道数据驱动 PAPU。
 *
 * 核心循环 (每帧 tick):
 *   1. Phase 1 ($80C6-$811B): 遍历 8 通道，递减时长，到期调用 $83CB 音序器
 *   2. Phase 2 ($8129-$8161): 按 4 个 APU 组写入寄存器
 *   3. 每组通过 $816E 写入 $4000-$4003 (X = (3^group)*4)
 *
 * 适配: 使用 PapuOutput (项目内 PAPU + AudioContext 桥接)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bank12AudioEngine = void 0;
const bank12_audio_tables_1 = require("../data/bank12_audio_tables");
// ════════════════════════════════════════════════
// Bank12AudioEngine
// ════════════════════════════════════════════════
class Bank12AudioEngine {
    constructor(papu) {
        this.blocks = [];
        this.w = (0, bank12_audio_tables_1.createWorkArea)();
        this.tracks = [];
        this.isPlaying = false;
        this.frameCount = 0;
        this.totalChannels = 4;
        /** one-shot mode: $FF stops channel instead of looping */
        this._oneShot = false;
        /** 音频请求槽位 ($0700-$0705, 6 个) */
        this.slots = new Uint8Array(6);
        /** Bank 12 数据源 — SE header 表与音效轨道 */
        this.seBankData = null;
        /** 标记该通道当前由 SE 占用 */
        this.seChannel = new Array(bank12_audio_tables_1.NUM_CHANNELS).fill(false);
        /** Track start positions (for restart on end-of-data) */
        this.startOffsets = [0, 0, 0, 0, 0, 0, 0, 0];
        /** Shared BGM raw data for CALL/JUMP NES address resolution */
        this.sharedData = null;
        this.bgmNesBase = 0;
        this.bgmHeaderOffset = 0;
        /** Per-channel call stack */
        this._callStacks = Array.from({ length: bank12_audio_tables_1.NUM_CHANNELS }, () => []);
        /** Per-channel loop stack */
        this._loopStacks = Array.from({ length: bank12_audio_tables_1.NUM_CHANNELS }, () => []);
        this._papu = papu;
        for (let i = 0; i < bank12_audio_tables_1.NUM_CHANNELS; i++) {
            this.blocks.push((0, bank12_audio_tables_1.createChBlock)());
            this.tracks.push(null);
        }
    }
    /** 注入 Bank 12 SE 数据 */
    setSeBankData(data) {
        this.seBankData = new Uint8Array(data);
    }
    /**
     * $8349 — 音乐播放初始化
     * 通道映射: SQ1→ch4, SQ2→ch5, TRI→ch6, NOISE→ch7
     */
    load(trackSQ1, trackSQ2, trackTRI, trackNOISE, sharedRaw, nesBase, headerOffset) {
        this.stop();
        if (sharedRaw) {
            this.sharedData = new Uint8Array(sharedRaw);
            this.bgmNesBase = nesBase || 0;
            this.bgmHeaderOffset = headerOffset || 0;
        }
        else {
            this.sharedData = null;
            this.bgmNesBase = 0;
            this.bgmHeaderOffset = 0;
        }
        this.w.chMask = 0;
        if (this.sharedData) {
            let pos = this.bgmHeaderOffset || 0;
            if (this.sharedData[pos] === 0xFF)
                pos += 1;
            for (let i = 0; i < 8 && pos + 2 < this.sharedData.length; i++) {
                const byte0 = this.sharedData[pos];
                if (byte0 === 0xFF)
                    break;
                const lo = this.sharedData[pos + 1];
                const hi = this.sharedData[pos + 2];
                pos += 3;
                const chNum = byte0;
                const nesAddr = lo | (hi << 8);
                const off = this._nesAddrToOffset(nesAddr);
                const internalCh = (chNum >= 4) ? chNum : chNum + 4;
                if (internalCh === 4)
                    this._initChannel(4, trackSQ1, off);
                else if (internalCh === 5)
                    this._initChannel(5, trackSQ2, off);
                else if (internalCh === 6)
                    this._initChannel(6, trackTRI, off);
                else if (internalCh === 7)
                    this._initChannel(7, trackNOISE, off);
            }
        }
        else {
            this._initChannel(4, trackSQ1, 0);
            this._initChannel(5, trackSQ2, 0);
            this._initChannel(6, trackTRI, 0);
            this._initChannel(7, trackNOISE, 0);
        }
        this.totalChannels = 4;
        return true;
    }
    /** $8349 init for one channel */
    _initChannel(ch, data, sharedStart = 0) {
        if (data.length === 0)
            return;
        const useShared = this.sharedData !== null;
        this.startOffsets[ch] = useShared ? sharedStart : 0;
        const blk = this.blocks[ch];
        blk.trackLo = useShared ? (sharedStart & 0xFF) : 0;
        blk.trackHi = useShared ? ((sharedStart >> 8) & 0xFF) : 0;
        blk.timingLo = 0;
        blk.timingHi = 0;
        blk.timingOff = 0;
        blk.volCtrl = (ch === 5) ? 0x80 : (ch === 6) ? 0x0F : 0x00;
        blk.apuVol = 0x30;
        blk.freqLo = 0;
        blk.freqHi = 0x80;
        blk.stkPtr = 0x0F;
        this.w.durLo[ch] = 1;
        this.w.durHi[ch] = 1;
        this.w.noteDur[ch] = 1;
        this.w.nextDurHi[ch] = 0;
        this.w.chType[ch] = 0;
        this.w.volDecay[ch] = 0;
        this.w.volDecayReload[ch] = 0;
        this.w.portamentoEn[ch] = 0;
        this.w.portamentoVal[ch] = 0;
        this.w.freqDirty[ch] = 0;
        this.tracks[ch] = new Uint8Array(data);
        let bit = 1;
        for (let i = 0; i < ch; i++)
            bit <<= 1;
        this.w.chMask |= bit;
    }
    /** 设置 one-shot 模式 */
    setOneShot(enabled) {
        this._oneShot = enabled;
    }
    /** 请求播放一个 SE 音效 */
    setSeRequest(req) {
        this.requestSlot(0, req);
    }
    /** 向指定槽位 (0-5) 写入音频请求 */
    requestSlot(idx, req) {
        if (idx < 0 || idx > 5)
            return;
        this.slots[idx] = req & 0xFF;
    }
    start() {
        if (this.w.chMask === 0)
            return false;
        this.isPlaying = true;
        this.frameCount = 0;
        this.w.dmcActive = 0;
        for (let g = 0; g < 4; g++) {
            this.w.muteFlags[g] = 0;
            this.w.last4003[g] = 0;
        }
        this._papu.writeReg(0x4015, 0x0F);
        return true;
    }
    stop() {
        this.isPlaying = false;
        this.w = (0, bank12_audio_tables_1.createWorkArea)();
        for (let i = 0; i < bank12_audio_tables_1.NUM_CHANNELS; i++) {
            this.blocks[i] = (0, bank12_audio_tables_1.createChBlock)();
            this.tracks[i] = null;
        }
        this.seChannel.fill(false);
        this.slots.fill(0);
        this.frameCount = 0;
    }
    get progress() {
        return {
            frame: this.frameCount,
            seconds: Math.round(this.frameCount / 60 * 10) / 10,
            playing: this.isPlaying,
        };
    }
    // ════════════════════════════════════════════════
    // $8002 入口 — 音频请求槽位分发
    // ════════════════════════════════════════════════
    _processSlots() {
        const data = this.seBankData;
        if (!data)
            return;
        for (let x = 5; x >= 0; x--) {
            const val = this.slots[x];
            if (val === 0)
                continue;
            if (val >= 0x72)
                continue;
            if (val === 0x31) {
                this._slotReset();
            }
            else {
                this._initSe(val);
            }
            this.slots[x] = 0;
        }
    }
    /** $8070 特殊重置: 音量衰减计数器全部重载 */
    _slotReset() {
        for (let ch = 0; ch < bank12_audio_tables_1.NUM_CHANNELS; ch++) {
            const v = (ch === 1 || ch === 5) ? 0x0A : 0x19;
            this.w.volDecay[ch] = v;
            this.w.volDecayReload[ch] = v;
        }
    }
    /** $8349 — SE/歌曲初始化 (来自槽位请求) */
    _initSe(req) {
        const data = this.seBankData;
        if (!data)
            return;
        const idx = ((req - 1) * 2) & 0xFF;
        const t = 0xBDA + idx;
        if (t + 1 >= data.length)
            return;
        const headerPtr = data[t] | (data[t + 1] << 8);
        let pos = headerPtr - 0x8000;
        if (pos < 0 || pos >= data.length)
            return;
        if (data[pos] & 0x80) {
            this._papu.writeReg(0x4015, 0x0F);
            return;
        }
        while (pos + 2 < data.length) {
            const chNum = data[pos];
            if (chNum & 0x80)
                break;
            const trackLo = data[pos + 1];
            const trackHi = data[pos + 2];
            pos += 3;
            if (chNum > 7)
                continue;
            const trackAddr = trackLo | (trackHi << 8);
            const trackOff = trackAddr - 0x8000;
            if (trackOff < 0 || trackOff >= data.length)
                continue;
            this._initSeChannel(chNum, trackOff);
        }
    }
    /** $8349 单通道初始化 (SE 版) */
    _initSeChannel(ch, startOff) {
        const blk = this.blocks[ch];
        this.w.portamentoVal[ch] = 0;
        this.w.chType[ch] = 0;
        this.w.portamentoEn[ch] = 0;
        this.w.volDecay[ch] = 0;
        this.w.volDecayReload[ch] = 0;
        this.w.seqIdx[ch] = 0;
        this.w.freqDirty[ch] = 0;
        this.w.notePlayed[ch] = 0;
        blk.trackLo = startOff & 0xFF;
        blk.trackHi = (startOff >> 8) & 0xFF;
        blk.timingLo = 0;
        blk.timingHi = 0;
        blk.timingOff = 0;
        blk.stkPtr = 0x0F;
        const pm = ch & 3;
        blk.volCtrl = (pm === 1) ? 0x80 : (pm === 2) ? 0x0F : 0x00;
        blk.apuVol = 0x30;
        blk.freqLo = 0;
        blk.freqHi = 0x80;
        this.w.durLo[ch] = 1;
        this.w.durHi[ch] = 1;
        this.w.noteDur[ch] = 1;
        this.w.nextDurHi[ch] = 0;
        this.tracks[ch] = this.seBankData;
        this.startOffsets[ch] = startOff;
        this.seChannel[ch] = true;
        this._callStacks[ch] = [];
        this._loopStacks[ch] = [];
        this.w.chMask |= (1 << ch);
        this.w.last4003[2] = 0;
        this.w.last4003[3] = 0;
        this.w.dmcActive = 0;
    }
    /** Song loop restart: reinits all channels to their start offsets */
    _restartSong() {
        this.w.chMask = 0;
        for (let ch = 0; ch < bank12_audio_tables_1.NUM_CHANNELS; ch++) {
            if (this.seChannel[ch]) {
                this.seChannel[ch] = false;
                this.tracks[ch] = null;
                continue;
            }
            if (!this.tracks[ch])
                continue;
            const blk = this.blocks[ch];
            const startOff = this.startOffsets[ch] || 0;
            blk.trackLo = startOff & 0xFF;
            blk.trackHi = (startOff >> 8) & 0xFF;
            blk.timingLo = 0;
            blk.timingHi = 0;
            blk.timingOff = 0;
            blk.volCtrl = (ch === 5) ? 0x80 : (ch === 6) ? 0x0F : 0x00;
            blk.apuVol = 0x30;
            blk.freqLo = 0;
            blk.freqHi = 0x80;
            blk.stkPtr = 0x0F;
            this.w.durLo[ch] = 1;
            this.w.durHi[ch] = 1;
            this.w.noteDur[ch] = 1;
            this.w.nextDurHi[ch] = 0;
            this.w.chType[ch] = 0;
            this.w.seqIdx[ch] = 0;
            this.w.volDecay[ch] = 0;
            this.w.volDecayReload[ch] = 0;
            this.w.portamentoEn[ch] = 0;
            this.w.portamentoVal[ch] = 0;
            this.w.freqDirty[ch] = 0;
            this.w.notePlayed[ch] = 0;
            this._callStacks[ch] = [];
            this._loopStacks[ch] = [];
            let bit = 1;
            for (let i = 0; i < ch; i++)
                bit <<= 1;
            this.w.chMask |= bit;
        }
        this.w.dmcActive = 0;
        for (let g = 0; g < 4; g++) {
            this.w.muteFlags[g] = 0;
            this.w.last4003[g] = 0;
        }
    }
    // ════════════════════════════════════════════════
    // 每帧更新 ($8002 入口)
    // ════════════════════════════════════════════════
    tick() {
        if (!this.isPlaying)
            return;
        this._processSlots();
        if (this.w.chMask === 0) {
            if (this._oneShot) {
                this.isPlaying = false;
            }
            else {
                this._restartSong();
            }
            return;
        }
        // ── Phase 1 ($80C6-$811B): 遍历 8 通道 ──
        let mask = this.w.chMask;
        for (let ch = 0; ch < bank12_audio_tables_1.NUM_CHANNELS; ch++) {
            const chBit = 1 << ch;
            if (!(mask & chBit))
                continue;
            const blk = this.blocks[ch];
            const track = this.tracks[ch];
            if (!track)
                continue;
            // $80D9-$80E1: DEC dur_lo → if 0: $83CB
            let dl = (this.w.durLo[ch] - 1) & 0xFF;
            this.w.durLo[ch] = dl;
            if (dl === 0) {
                this._sequencerTick(ch, blk, track);
            }
            // $80E3-$8106: DEC next_dur → if 0: read from timing table
            let nd = (this.w.durHi[ch] - 1) & 0xFF;
            this.w.durHi[ch] = nd;
            if (nd === 0) {
                if (blk.timingHi === 0xFF) {
                    const subTable = bank12_audio_tables_1.TIMING_SUB_TABLES[blk.timingLo];
                    if (subTable && subTable.length > 0) {
                        let entryIdx = blk.timingOff >> 1;
                        if (entryIdx >= subTable.length)
                            entryIdx = 0;
                        const [newDurLo, newNextDurHi] = subTable[entryIdx];
                        nd = newDurLo;
                        this.w.durHi[ch] = newDurLo;
                        this.w.nextDurHi[ch] = newNextDurHi || 0;
                        blk.timingOff = (blk.timingOff + 2) & 0xFF;
                    }
                    else {
                        nd = this.w.durLo[ch] || 1;
                        this.w.durHi[ch] = nd;
                    }
                }
                else {
                    nd = this.w.durLo[ch] || 1;
                    this.w.durHi[ch] = nd;
                }
            }
            // $8109: JSR $81DB — 音量处理
            this._processVolume(ch);
        }
        // ── Phase 2 ($8129-$8161): 4 组 APU 寄存器写入 ──
        const groupSlots = [
            { g: 3, mask: 0x11, chLow: 0, chHigh: 4 },
            { g: 2, mask: 0x22, chLow: 1, chHigh: 5 },
            { g: 1, mask: 0x44, chLow: 2, chHigh: 6 },
            { g: 0, mask: 0x88, chLow: 3, chHigh: 7 },
        ];
        for (const slot of groupSlots) {
            if (!(this.w.chMask & slot.mask))
                continue;
            const ch = (this.w.chMask & (1 << slot.chLow)) ? slot.chLow : slot.chHigh;
            this._writeApuReg(ch, slot.g);
        }
        // ── Audio rendering: PAPU 帧推进 ──
        // 将帧周期切成 32-cycle 小块送入 PAPU，避免 extraCycles 缓冲导致采样不足
        let remaining = bank12_audio_tables_1.CYCLES_PER_FRAME;
        const CHUNK = 32;
        while (remaining > 0) {
            const n = remaining < CHUNK ? remaining : CHUNK;
            this._papu.papu.clockFrameCounter(n);
            remaining -= n;
        }
        this.frameCount++;
    }
    // ════════════════════════════════════════════════
    // $83CB: 音序器 — 读取下一个音符/命令
    // ════════════════════════════════════════════════
    _sequencerTick(ch, blk, track) {
        blk.volCtrl &= 0xCF;
        const data = this.seChannel[ch] && this.seBankData ? this.seBankData : (this.sharedData || track);
        const maxLen = data.length;
        while (true) {
            const pos = blk.trackLo | (blk.trackHi << 8);
            if (pos >= maxLen) {
                if (this.seChannel[ch]) {
                    this.w.chMask &= ~(1 << ch);
                    return;
                }
                // End of track data — restart from start offset (song loop)
                let restartOff = this.startOffsets[ch] || 0;
                if (this.sharedData && restartOff < this.sharedData.length && this.sharedData[restartOff] === 0xFF) {
                    restartOff++;
                }
                blk.trackLo = restartOff & 0xFF;
                blk.trackHi = (restartOff >> 8) & 0xFF;
                blk.volCtrl &= 0xCF;
                blk.timingOff = 0;
                blk.timingLo = 0;
                blk.timingHi = 0;
                this.w.chType[ch] = 0;
                this.w.seqIdx[ch] = 0;
                this.w.portamentoEn[ch] = 0;
                this.w.portamentoVal[ch] = 0;
                this.w.notePlayed[ch] = 0;
                this._callStacks[ch] = [];
                this._loopStacks[ch] = [];
                this.w.durLo[ch] = 1;
                this.w.durHi[ch] = 1;
                this.w.noteDur[ch] = 1;
                return;
            }
            const b = data[pos];
            this._advanceTrack(blk, 1);
            // $83E1: BPL → b < $80 = 音符字节
            if (b < 0x80) {
                this._parseNote(ch, blk, b);
                if (this.w.portamentoEn[ch] === 0) {
                    blk.timingOff = 0;
                }
                this.w.durLo[ch] = this.w.noteDur[ch] || 1;
                return;
            }
            // $83E4: CMP #$E0 → b >= $E0 = 命令分发
            if (b >= 0xE0) {
                const ok = this._dispatchCmd(ch, blk, data, b);
                if (!ok)
                    return;
                continue;
            }
            // $83ED-$8402: b ∈ [$80,$DF] = 时长前缀
            const durIdx = b & 0x3F;
            const dur = bank12_audio_tables_1.DUR_TABLE[durIdx] || 1;
            this.w.durLo[ch] = dur;
            this.w.noteDur[ch] = dur;
        }
    }
    // ════════════════════════════════════════════════
    // $8404-$848D: 音符频率计算
    // ════════════════════════════════════════════════
    _parseNote(ch, blk, noteByte) {
        const isDirect = (ch === 3 || ch === 7);
        if (isDirect) {
            if (noteByte === 0x10) {
                blk.volCtrl |= 0x20;
                return;
            }
            let fLo = noteByte;
            let fHi = 0;
            if (this.w.portamentoVal[ch] !== 0) {
                const upper = fLo & 0xF0;
                const lower = (fLo + this.w.portamentoVal[ch]) & 0x0F;
                fLo = upper | lower;
            }
            this.w.baseFreqLo[ch] = fLo;
            this.w.baseFreqHi[ch] = fHi;
            blk.freqLo = fLo;
            blk.freqHi = fHi | 0x80;
            this.w.freqDirty[ch] = 0xFF;
            this.w.notePlayed[ch] = 1;
            return;
        }
        // 半音 + 八度编码
        const semitone = noteByte & 0x0F;
        if (semitone >= 0x0C) {
            blk.volCtrl |= 0x20;
            return;
        }
        let period = bank12_audio_tables_1.FREQ_TABLE[semitone];
        let fLo = period & 0xFF;
        let fHi = (period >> 8) & 7;
        const octave = (noteByte & 0xF0) >> 4;
        for (let o = 0; o < octave; o++) {
            const carry = fHi & 1;
            fHi >>= 1;
            fLo = (fLo >> 1) | (carry << 7);
            fHi &= 7;
        }
        if (fLo < 2 && fHi === 0)
            fLo = 2;
        const portVal = this.w.portamentoVal[ch];
        const portEn = this.w.portamentoEn[ch];
        if (portEn !== 0 && this.w.baseFreqLo[ch] !== 0) {
            let baseLo = this.w.baseFreqLo[ch];
            let baseHi = this.w.baseFreqHi[ch] & 0x7F;
            let basePeriod = baseLo | (baseHi << 8);
            if (portVal < 0) {
                basePeriod += (-portVal);
            }
            else {
                basePeriod += portVal;
            }
            fLo = basePeriod & 0xFF;
            fHi = (basePeriod >> 8) & 7;
            if (fLo === 0 && fHi === 0)
                fLo = 1;
        }
        else {
            fLo = (fLo + (portVal & 0xFF)) & 0xFF;
            if (fLo < 2 && fHi === 0)
                fLo = 2;
        }
        this.w.baseFreqLo[ch] = fLo;
        this.w.baseFreqHi[ch] = fHi;
        blk.freqLo = fLo;
        blk.freqHi = fHi | 0x80;
        this.w.freqDirty[ch] = 0xFF;
        this.w.notePlayed[ch] = 1;
    }
    // ════════════════════════════════════════════════
    // $84C9: 命令分发 ($E0-$FF)
    // ════════════════════════════════════════════════
    _dispatchCmd(ch, blk, data, cmdByte) {
        const read = () => {
            const pos = blk.trackLo | (blk.trackHi << 8);
            if (pos < data.length) {
                this._advanceTrack(blk, 1);
                return data[pos];
            }
            return 0;
        };
        const cmdIdx = cmdByte & 0x1F;
        switch (cmdIdx) {
            // $E0 → SET_TIMING_TABLE_PTR
            case 0x00: {
                const tblIdx = read();
                blk.timingLo = tblIdx;
                blk.timingHi = 0xFF;
                blk.timingOff = 0;
                const subTable = bank12_audio_tables_1.TIMING_SUB_TABLES[tblIdx];
                if (subTable && subTable.length > 0) {
                    this.w.nextDurHi[ch] = subTable[0][1] || 0;
                }
                return true;
            }
            // $E1: NOP
            case 0x01: return true;
            // $E2 → SET_VOLUME_ENV
            case 0x02: {
                const param = read();
                blk.volCtrl = (blk.volCtrl & 0xF0) | (param & 0x0F);
                return true;
            }
            // $E3 → OR_VOLUME_CTRL
            case 0x03: {
                const param = read();
                if (this.w.dmcActive === 0) {
                    blk.volCtrl |= param;
                }
                return true;
            }
            // $E4 → ENABLE_SWEEP
            case 0x04: {
                const param = read();
                blk.volCtrl |= 0x10;
                const apuX = ((7 - ch) * 4) & 0x0F;
                if (apuX < 0x08) {
                    this._papu.writeReg(0x4001 + apuX, param);
                }
                const grp = ch & 3;
                this.w.muteFlags[grp] = 0;
                return true;
            }
            // $E5 → SET_PORTAMENTO_AMOUNT
            case 0x05: {
                const param = read();
                const shifted = (param << 1) & 0xFF;
                if (!(param & 0x80)) {
                    this.w.portamentoEn[ch] = shifted;
                }
                this.w.portamentoVal[ch] = param >> 1;
                return true;
            }
            // $E6, $E7: NOP
            case 0x06:
            case 0x07: return true;
            // $E8 → JUMP
            case 0x08: {
                const lo = read();
                const hi = read();
                const nesAddr = lo | (hi << 8);
                const target = this.seChannel[ch] ? (nesAddr - 0x8000) : this._nesAddrToOffset(nesAddr);
                blk.trackLo = target & 0xFF;
                blk.trackHi = (target >> 8) & 0xFF;
                return true;
            }
            // $E9 → CALL
            case 0x09: {
                const lo = read();
                const hi = read();
                const nesAddr = lo | (hi << 8);
                const target = this.seChannel[ch] ? (nesAddr - 0x8000) : this._nesAddrToOffset(nesAddr);
                this._pushReturn(blk);
                blk.trackLo = target & 0xFF;
                blk.trackHi = (target >> 8) & 0xFF;
                return true;
            }
            // $EA → RETURN
            case 0x0A: {
                const addr = this._popReturn(blk);
                if (addr !== null) {
                    blk.trackLo = addr & 0xFF;
                    blk.trackHi = (addr >> 8) & 0xFF;
                }
                else {
                    this.w.durLo[ch] = 1;
                }
                return true;
            }
            // $EB → LOOP_START
            case 0x0B: {
                const count = read();
                this._pushLoop(blk, count);
                return true;
            }
            // $EC → LOOP_END
            case 0x0C: {
                const result = this._popLoop(blk);
                if (result !== null) {
                    blk.trackLo = result & 0xFF;
                    blk.trackHi = (result >> 8) & 0xFF;
                }
                return true;
            }
            // $ED → SET_CHANNEL_TYPE
            case 0x0D: {
                const param = read();
                this.w.chType[ch] = param;
                this.w.seqIdx[ch] = 0;
                return true;
            }
            // $EE: NOP
            case 0x0E: return true;
            // $EF → CLEAR_CHANNEL_TYPE
            case 0x0F: {
                this.w.chType[ch] = 0;
                return true;
            }
            // $F0, $F1: NOP
            case 0x10:
            case 0x11: return true;
            // $F2 → STOP ALL: NOP
            case 0x12: return true;
            // $F3 → PORTAMENTO ON
            case 0x13: {
                this.w.portamentoEn[ch] = 0x0F;
                return true;
            }
            // $F4 → PORTAMENTO OFF
            case 0x14: {
                this.w.portamentoEn[ch] = 0;
                return true;
            }
            // $F5-$F8: NOP
            case 0x15:
            case 0x16:
            case 0x17:
            case 0x18: return true;
            // $F9 → DMC init A
            case 0x19: {
                this._dmcInit(0x00, 0x0C);
                return true;
            }
            // $FA → DMC init B
            case 0x1A: {
                this._dmcInit(0x03, 0x20);
                return true;
            }
            // $FB → DMC init C
            case 0x1B: {
                this._dmcInit(0x0B, 0x13);
                return true;
            }
            // $FC/$FD: NOP
            case 0x1C:
            case 0x1D: return true;
            // $FE: NOP (0x58 未使用)
            case 0x1E: return true;
            // $FF → STOP CHANNEL
            case 0x1F: {
                if (this._oneShot || this.seChannel[ch]) {
                    this.w.chMask &= ~(1 << ch);
                    return false;
                }
                let restartOff = this.startOffsets[ch] || 0;
                if (this.sharedData && restartOff < this.sharedData.length && this.sharedData[restartOff] === 0xFF) {
                    restartOff++;
                }
                blk.trackLo = restartOff & 0xFF;
                blk.trackHi = (restartOff >> 8) & 0xFF;
                blk.timingLo = 0;
                blk.timingHi = 0;
                blk.timingOff = 0;
                blk.volCtrl = (ch === 5) ? 0x80 : (ch === 6) ? 0x0F : 0x00;
                blk.apuVol = 0x30;
                blk.freqLo = 0;
                blk.freqHi = 0x80;
                blk.stkPtr = 0x0F;
                this.w.durLo[ch] = 1;
                this.w.durHi[ch] = 1;
                this.w.noteDur[ch] = 1;
                this.w.nextDurHi[ch] = 0;
                this.w.chType[ch] = 0;
                this.w.seqIdx[ch] = 0;
                this.w.volDecay[ch] = 0;
                this.w.volDecayReload[ch] = 0;
                this.w.portamentoEn[ch] = 0;
                this.w.portamentoVal[ch] = 0;
                this.w.freqDirty[ch] = 0;
                this.w.notePlayed[ch] = 0;
                this._callStacks[ch] = [];
                this._loopStacks[ch] = [];
                return false;
            }
        }
        return true;
    }
    // ════════════════════════════════════════════════
    // $81DB: 音量/包络处理
    // ════════════════════════════════════════════════
    _processVolume(ch) {
        const blk = this.blocks[ch];
        const volByte = blk.volCtrl;
        const hiNib = volByte & 0xF0;
        let vol;
        if (hiNib & 0x20) {
            vol = 0x0F;
        }
        else {
            vol = volByte & 0x0F;
        }
        let vc = this.w.volDecay[ch];
        if (vc !== 0) {
            vc--;
            this.w.volDecay[ch] = vc;
            if (vc === 0) {
                vol++;
                if (vol > 0x0F) {
                    vol = 0x0F;
                    this.w.volDecayReload[ch] = 0;
                    this.w.dmcActive = 0x80;
                }
                blk.volCtrl = hiNib | vol;
            }
            vc = this.w.volDecay[ch];
            if (vc === 0 && this.w.volDecayReload[ch] !== 0) {
                this.w.volDecay[ch] = this.w.volDecayReload[ch];
            }
        }
        const nxtDurHi = this.w.nextDurHi[ch];
        let finalVol = nxtDurHi - vol;
        if (finalVol < 0)
            finalVol = 0;
        finalVol |= hiNib;
        blk.apuVol = finalVol;
        const cht = this.w.chType[ch];
        if (cht === 1) {
            this._applyFreqModType1(ch);
        }
        else if (cht === 2) {
            this._applyFreqModType2(ch);
        }
        const apuX = ((7 - ch) * 4) & 0x0F;
        if (apuX !== 0x04 && this.w.notePlayed[ch]) {
            blk.freqHi |= 0x80;
            this.w.freqDirty[ch] = 0xFF;
        }
    }
    // $8257-$82B3: 频率修改 (type=1)
    _applyFreqModType1(ch) {
        const blk = this.blocks[ch];
        let si = this.w.seqIdx[ch];
        if (si >= bank12_audio_tables_1.SEQ_MOD_TABLE_TYPE1.length)
            si = 0;
        if (this.w.notePlayed[ch]) {
            const [dLo, dHi] = bank12_audio_tables_1.SEQ_MOD_TABLE_TYPE1[si];
            let fLo = (this.w.baseFreqLo[ch] + dLo) & 0xFF;
            let fHi = (this.w.baseFreqHi[ch] + dHi) & 7;
            if (fLo > 0xFF) {
                fHi++;
                fLo &= 0xFF;
            }
            blk.freqLo = fLo;
            blk.freqHi = fHi | 0x80;
            this.w.freqDirty[ch] = 0xFF;
        }
        si = (si + 1) % bank12_audio_tables_1.SEQ_MOD_TABLE_TYPE1.length;
        this.w.seqIdx[ch] = si;
    }
    // $82D2-$8348: 频率修改 (type=2)
    _applyFreqModType2(ch) {
        const blk = this.blocks[ch];
        let si = this.w.seqIdx[ch];
        if (si >= bank12_audio_tables_1.SEQ_MOD_TABLE_TYPE2.length)
            si = 0;
        if (this.w.notePlayed[ch]) {
            const [dLo, dHi] = bank12_audio_tables_1.SEQ_MOD_TABLE_TYPE2[si];
            let fLo = this.w.baseFreqLo[ch];
            let fHi = this.w.baseFreqHi[ch] & 7;
            if (dHi < 0 || dLo < 0) {
                const val = ((-dLo) & 0xFF) | ((dHi < 0 ? -dHi : 0) << 8);
                let period = fLo | (fHi << 8);
                period -= val;
                if (period < 2)
                    period = 2;
                fLo = period & 0xFF;
                fHi = (period >> 8) & 7;
            }
            else {
                fLo = (fLo + dLo) & 0xFF;
                fHi = (fHi + dHi) & 7;
                if (fLo > 0xFF) {
                    fHi++;
                    fLo &= 0xFF;
                }
            }
            blk.freqLo = fLo;
            blk.freqHi = fHi | 0x80;
            this.w.freqDirty[ch] = 0xFF;
        }
        si = (si + 1) % bank12_audio_tables_1.SEQ_MOD_TABLE_TYPE2.length;
        this.w.seqIdx[ch] = si;
    }
    // ════════════════════════════════════════════════
    // $816E: APU 寄存器写入
    // ════════════════════════════════════════════════
    _writeApuReg(ch, group) {
        const blk = this.blocks[ch];
        const isTri = group === 1;
        const apuBase = bank12_audio_tables_1.APU_GROUP_BASE[group];
        const apuAddr = 0x4000 + apuBase;
        const volByte = isTri ? blk.volCtrl : blk.apuVol;
        if (isTri) {
            this._papu.writeReg(apuAddr, (volByte & 0x0F) | 0x80);
        }
        else {
            this._papu.writeReg(apuAddr, volByte | 0x30);
        }
        // sweep 检查
        if (!(blk.volCtrl & 0x10)) {
            this.w.muteFlags[group] = 0x08;
            if (apuBase < 0x08 || group === 0) {
                this._papu.writeReg(apuAddr + 1, 0x08);
            }
        }
        const sweepEnabled = (blk.volCtrl & 0x10) !== 0;
        if (!sweepEnabled) {
            // sweep 禁用路径
            this._papu.writeReg(apuAddr + 2, blk.freqLo);
            const fhLen = blk.freqHi | 0x18;
            if (group >= 2 && fhLen === this.w.last4003[group]) {
                return;
            }
            this._papu.writeReg(apuAddr + 3, fhLen);
            this.w.last4003[group] = fhLen;
            if (this.w.muteFlags[group] === 0) {
                this.w.last4003[group] = 0;
            }
            return;
        }
        // sweep 使能路径
        if (!(blk.freqHi & 0x80)) {
            return;
        }
        blk.freqHi &= 0x7F;
        this.w.freqDirty[ch] = 0;
        this._papu.writeReg(apuAddr + 2, blk.freqLo);
        const fh = blk.freqHi & 7;
        const fhLen = fh | 0x18;
        if (group >= 2 && fhLen === this.w.last4003[group]) {
            return;
        }
        this._papu.writeReg(apuAddr + 3, fhLen);
        this.w.last4003[group] = fhLen;
        if (this.w.muteFlags[group] === 0) {
            this.w.last4003[group] = 0;
        }
    }
    // ════════════════════════════════════════════════
    // DMC helpers
    // ════════════════════════════════════════════════
    _dmcInit(sampleAddr, sampleLen) {
        this._papu.writeReg(0x4015, 0x0F);
        if (this.w.dmcActive === 0) {
            this._papu.writeReg(0x4010, 0x0F);
            this._papu.writeReg(0x4012, sampleAddr);
            this._papu.writeReg(0x4013, sampleLen);
            this._papu.writeReg(0x4015, 0x1F);
        }
    }
    // ════════════════════════════════════════════════
    // Call/Loop stack helpers
    // ════════════════════════════════════════════════
    _pushReturn(blk) {
        const ch = this.blocks.indexOf(blk);
        if (ch < 0)
            return;
        const addr = blk.trackLo | (blk.trackHi << 8);
        if (this._callStacks[ch].length < 8) {
            this._callStacks[ch].push(addr);
        }
    }
    _popReturn(blk) {
        const ch = this.blocks.indexOf(blk);
        if (ch < 0)
            return null;
        const stk = this._callStacks[ch];
        if (stk.length === 0)
            return null;
        return stk.pop();
    }
    _pushLoop(blk, count) {
        const ch = this.blocks.indexOf(blk);
        if (ch < 0)
            return;
        const addr = blk.trackLo | (blk.trackHi << 8);
        if (this._loopStacks[ch].length < 8) {
            this._loopStacks[ch].push({ count, addr });
        }
    }
    _popLoop(blk) {
        const ch = this.blocks.indexOf(blk);
        if (ch < 0)
            return null;
        const stk = this._loopStacks[ch];
        if (stk.length === 0)
            return null;
        const frame = stk[stk.length - 1];
        frame.count--;
        if (frame.count > 0) {
            return frame.addr;
        }
        else {
            stk.pop();
            return null;
        }
    }
    // ════════════════════════════════════════════════
    // Track pointer helpers
    // ════════════════════════════════════════════════
    _advanceTrack(blk, n) {
        let addr = blk.trackLo | (blk.trackHi << 8);
        addr += n;
        blk.trackLo = addr & 0xFF;
        blk.trackHi = (addr >> 8) & 0xFF;
    }
    _nesAddrToOffset(nesAddr) {
        if (this.sharedData) {
            const offset = (nesAddr - this.bgmNesBase) & 0xFFFF;
            if (offset < this.sharedData.length)
                return offset;
        }
        return nesAddr;
    }
}
exports.Bank12AudioEngine = Bank12AudioEngine;

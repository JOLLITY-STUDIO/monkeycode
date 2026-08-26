/**
 * AudioService — NES APU 音频引擎（去 lo/hi 拆字节，类型化命令流）
 *
 * 翻译原则（v2）：
 *   - 禁止 rdPtr(lo, hi) / wrPtr(lo, hi) 字节拆分指针访问
 *   - 16-bit 读改用 DataStore.readU16(addr) / writeU16(addr, v)
 *   - 频率/时值/命令通过 SongCatalog 的具名常量表查询
 *   - 通道状态通过 store.audioState 具名视图访问
 *
 * BGM 数据头部格式（SongRecord）：
 *   headerFlag >= 0x80 → 仅使能通道后返回
 *   channels: ChannelTrack[]，每条带 NES channelNum 和 token 流
 *
 * 通道映射：channelNum 0-3 → 内部 ch 4-7（SQ1/SQ2/TRI/NOISE）
 *
 * 命令流 token 格式（AudioToken）：
 *   {kind: 'note', semitone, octave}
 *   {kind: 'duration', ticks}
 *   {kind: 'speed', value}
 *   {kind: 'command', opcode, arg?}
 *   {kind: 'rest'}
 *   {kind: 'noise', freqByte}
 *
 * V0.6.1 进度:
 *   F2 ✅ BGM 命令流 32 命令全映射 (COMMAND_TABLE 真 ROM 提取)
 *   F3 ✅ SE 启动逻辑 (startSe → startSong 复用)
 *   F4 ✅ 频率表索引掩码修正 (0x0f → 0x0b, 1 八度 12 半音)
 *   F5 ✅ 包络/衰减递推 (calcPitch → 0x07CF decay + noteDur 调整)
 *   F6 ✅ Vibrato + Arpeggio 模式 (新增 11 个命令处理器: 0x855F/0x8617/0x8578/0x8585/0x85AF/0x85C6/0x85EF/0x8709/0x853B/0x8532/0x86D7)
 *   F7 ✅ DPCM 采样回放 (playDpcm + 0x8699/0x86B8/0x86D7 三组采样)
 */
import type { DataStore } from '../../data/store/DataStore';
export interface Papu {
    writeReg(addr: number, value: number): void;
    clockFrameCounter(nCycles: number, frameCounterAlreadyAdvanced?: number): void;
    sampleTimer: number;
    sampleTimerMax: number;
    nes: {
        opts: {
            onAudioSample?: (l: number, r: number) => void;
        };
    };
}
export declare class AudioService {
    private papu;
    protected store: DataStore;
    /** 当前播放曲目（用于 token 流迭代） */
    private currentSong;
    /** 每通道当前 token 流 + cursor */
    private readonly trackCursors;
    constructor(store: DataStore);
    /** 注入 PAPU 实例 */
    attachPapu(papu: Papu): void;
    update(): void;
    playBgm(bgmId: number): void;
    playSe(seId: number): void;
    stopAll(): void;
    private consumeQueue;
    /**
     * 启动 BGM：按 requestId 查 SongCatalog（具名）
     * 不再走 readSePointer / readBank12U16
     */
    private startBgm;
    /** 启动 SE：按 seId 查 SongCatalog（具名） */
    private startSe;
    /**
     * 统一歌曲启动：从 SongRecord 初始化各通道 token 流
     * 不再解析 readBank12U16 / readTrackData 字节流
     */
    private startSong;
    /** 初始化单个通道（具名 token 流 + cursor） */
    private initChannel;
    private phase1;
    /**
     * 处理下一个 token（具名 token 流迭代，替代 sub83CB 的字节流解析）
     * 简化实现：note token → 写 freqLo/freqHi；duration → 更新 durLo/durHi
     */
    private processToken;
    /** 命令执行（保留原 opcode → 行为映射的语义） */
    private execCmd;
    private phase2;
    /** 写 APU 寄存器（具名 group：3=SQ1, 2=SQ2, 1=TRI, 0=NOISE） */
    private writeApuReg;
    private calcPitch;
    playDpcm(sample: 0 | 1 | 2): void;
    private stopAllSe;
}

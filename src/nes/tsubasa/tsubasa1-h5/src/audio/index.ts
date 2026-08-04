/**
 * 音频模块导出
 */
export { ApuSimulator, APU_REG, APU_STATUS_FLAGS, ApuChannel } from './ApuSimulator';
export type { IAudioContext, IOscillatorNode, IGainNode, IBufferSourceNode } from './ApuSimulator';
export { AudioEngine } from './AudioEngine';
export type { MusicTrack, MusicSequenceData } from './AudioEngine';
// 废弃: 旧MusicData格式(BUG-032~036), 保留用于兼容
// export { MUSIC_TRACKS, MUSIC_SEQUENCES, NES_NOTE_PERIODS, periodToFreq } from './MusicData';
// 新MusicData格式: (dur,pitch)双字节对, 指针表$A000
export { MUSIC_PTR_TABLE, MUSIC_SEQUENCES as MUSIC_SEQUENCES_V2 } from './MusicData';
export type { MusicPair, MusicSequence } from './MusicData';
export { getSequenceByPtr, getSequenceByOffset } from './MusicData';

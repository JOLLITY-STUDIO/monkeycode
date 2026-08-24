/**
 * data/audio/index.ts — 音频数据出口契约（v2 具象化）
 *
 * 三类契约：
 *   1. song-track.ts  类型契约（SongTrack / SongType / SongBank）
 *   2. BGM_SONGS / SE_SONGS  声明式曲目元数据（48 + 59 = 107 首）
 *   3. AudioRom  类型化访问器（频率/时值/命令，含旧类兼容）
 *
 * 历史：老版残留 *POINTER_TABLE_ADDR / NOTE_*_TABLE_ADDR 等"按 NES ROM 地址读字节"
 *       占位 -1 兜底，已在 audio-rom.ts 清理。新版 SONG_COUNT 由 SongCatalog 聚合。
 */
export type { SongTrack, SongType, SongBank } from './song-track';
export { BGM_SONGS } from './bgm/index';
export { SE_SONGS } from './se/index';
export { SONG_COUNT } from './SongCatalog';
export { AudioRom } from './audio-rom';
export {
  getApePeriod,
  getTickDuration,
  getCommandHandler,
} from './audio-rom';

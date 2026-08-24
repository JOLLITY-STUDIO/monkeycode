/**
 * data/audio/index.ts — 音频数据出口契约
 *
 * 曲目列表（bgm/、se/ 声明式文件）+ 音频 ROM 数据访问器（AudioRom）。
 */
export type { SongTrack, SongType, SongBank } from './song-track';
export { BGM_SONGS } from './bgm';
export { SE_SONGS } from './se';
export {
  SONG_COUNT, SONG_REQUEST_IDS,
  BGM_POINTER_TABLE_ADDR, BGM_POINTER_TABLE_LEN,
  SE_POINTER_TABLE_ADDR, SE_POINTER_TABLE_LEN,
  NOTE_DURATION_TABLE_ADDR, NOTE_DURATION_TABLE_LEN,
  NOTE_FREQ_TABLE_ADDR,
  AudioRom,
} from './audio-rom';

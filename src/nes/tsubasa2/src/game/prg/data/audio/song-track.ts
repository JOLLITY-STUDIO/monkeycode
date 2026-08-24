/**
 * song-track.ts — 曲目列表条目类型（音频 model 层）
 *
 * 每首曲目一个声明式文件（bgm/、se/ 目录），字段描述曲目的请求 ID、
 * 类型、数据归属 bank 与起始地址。字节数据仍由 AudioRom 按
 * bank + cpuAddr 提供（乐谱为流式结构，通道轨道可能跨区存储，
 * 不宜按曲目硬切字节）。
 */
export type SongType = 'BGM' | 'SE';
export type SongBank = 7 | 12 | 13 | 14 | 15;

export interface SongTrack {
  /** NSF 105 首曲目序号（1-105；游戏内部 BGM 0x01/0x02 记 0） */
  songNo: number;
  /** 游戏请求 ID（写入 $0700+ 请求队列） */
  requestId: number;
  /** 曲目类型 */
  type: SongType;
  /** 数据所在 bank（12=引擎固定区，7=BGM，13/14/15=SE） */
  bank: SongBank;
  /** 数据起始 CPU 地址（$8000-$BFFF） */
  cpuAddr: number;
  /** 曲目名称（预留，待补充） */
  name: string;
}

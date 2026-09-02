/**
 * 小程序端音频资源清单。
 *
 * 所有 BGM/SE 文件由 scripts/pack_audio_assets.py 从 work/wav/*.wav 转码而来
 * (MP3 24kbps mono @ 22050Hz), 存放在 miniprogram/assets/audio/。
 *
 * BGM 映射为临时推测, 后续根据原 DS 实际场景音乐调用链校准。
 */

/** 10 个场景名称 (与 pages/index/index.ts SceneName 保持一致)。 */
export type AudioScene =
  | 'title'
  | 'menu'
  | 'select'
  | 'options'
  | 'sudoku'
  | 'picture'
  | 'pictList'
  | 'staff'
  | 'about'
  | 'tutorial';

/** 通用音效事件名。 */
export type SeEvent =
  | 'tap'      // 普通按钮按下
  | 'back'     // 返回/取消
  | 'start'    // 开始游戏
  | 'decide'   // 确认/决定
  | 'clear'    // 清空/擦除
  | 'paint'    // 涂色
  | 'slide'    // 切换/滑动
  | 'complete' // 完成
  | 'undo';    // 撤销

/** 场景 → BGM 文件路径。 */
export const BGM_MANIFEST: Record<AudioScene, string> = {
  title: '/assets/audio/bgm/SEQ_01.mp3',
  menu: '/assets/audio/bgm/SEQ_02.mp3',
  select: '/assets/audio/bgm/SEQ_03.mp3',
  options: '/assets/audio/bgm/SEQ_10.mp3',
  sudoku: '/assets/audio/bgm/SEQ_04.mp3',
  picture: '/assets/audio/bgm/SEQ_12.mp3',
  pictList: '/assets/audio/bgm/SEQ_13.mp3',
  tutorial: '/assets/audio/bgm/SEQ_15.mp3',
  staff: '/assets/audio/bgm/SEQ_14.mp3',
  about: '/assets/audio/bgm/SEQ_10.mp3',
};

/** 事件 → SE 文件路径。 */
export const SE_MANIFEST: Record<SeEvent, string> = {
  tap: '/assets/audio/se/00_botan.mp3',
  back: '/assets/audio/se/08_batu.mp3',
  start: '/assets/audio/se/29_start.mp3',
  decide: '/assets/audio/se/11_kettei.mp3',
  clear: '/assets/audio/se/06_kesu.mp3',
  paint: '/assets/audio/se/05_nuru.mp3',
  slide: '/assets/audio/se/01_slide.mp3',
  complete: '/assets/audio/se/29_start.mp3',
  undo: '/assets/audio/se/04_idou.mp3',
};

/** BGM 默认音量 (避免覆盖提示音)。 */
export const BGM_VOLUME = 0.5;
/** SE 默认音量。 */
export const SE_VOLUME = 0.8;

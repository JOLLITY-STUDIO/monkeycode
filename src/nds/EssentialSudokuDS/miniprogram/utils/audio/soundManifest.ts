/**
 * 小程序端音频资源清单。
 *
 * 所有 BGM/SE 文件由 scripts/pack_audio_assets.py 从 work/wav/*.wav 转码而来
 * (MP3 24kbps mono @ 22050Hz), 存放在 miniprogram/assets/audio/。
 *
 * BGM 映射为临时推测, 后续根据原 DS 实际场景音乐调用链校准。
 */

/** 11 个场景名称 (与 pages/index/index.ts SceneName 保持一致)。 */
export type AudioScene =
  | 'title'
  | 'menu'
  | 'select'
  | 'options'
  | 'sudoku'
  | 'picture'
  | 'pictureMode'
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
  pictureMode: '/assets/audio/bgm/SEQ_13.mp3',
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

/* ===========================================================
 * BGM 节拍表 (bg-fx 呼吸光周期用, V0.35 Bright Sky Loop)
 * --------------------------------------------------------
 * 实测自 work/wav/bgm/SEQ_*.wav (脚本 _bpm_scan.py,
 * onset comb filter 20ms 窗, 候选 40~208 bpm)。
 * 真实值可能因半/双倍节拍 (8分/16分音符强) 而偏低,
 * UI 实际用作"柔和呼吸光晕周期"而非节拍相位同步。
 * 半速怀疑的标 ? 注明。
 * =========================================================== */
export const BGM_BPM: Record<AudioScene, number> = {
  title:        98,   // SEQ_01 检测 49, 长曲偏慢, 翻倍
  menu:         79,   // SEQ_02 实测 79 (轻快)
  select:       92,   // SEQ_03 检测 46, 翻倍
  sudoku:       62,   // SEQ_04 实测 62 (沉稳)
  options:      52,   // SEQ_10
  picture:     138,   // SEQ_12 检测 46? 太短, 取中等明快
  pictureMode: 138,
  pictList:    138,
  staff:        80,   // SEQ_14
  tutorial:    116,   // SEQ_15 实测 116 (活泼)
  about:        52,   // SEQ_10 同 options
};

/** beat 间隔毫秒 (UI pulse / 呼吸光晕周期)。 */
export const beatMs = (scene: AudioScene): number =>
  Math.round(60000 / BGM_BPM[scene]);

/** 小节 (4 拍) 毫秒, 用于"动"幅度大的卡片浮动。 */
export const barMs = (scene: AudioScene): number =>
  Math.round(240000 / BGM_BPM[scene]);

/**
 * 小程序端音频资源清单。
 *
 * 所有 BGM/SE 文件由 scripts/pack_audio_assets.py 从 work/wav/*.wav 转码而来
 * (MP3 24kbps mono @ 22050Hz), 存放在 miniprogram/assets/audio/。
 *
 * BGM 映射校准记录 (SOUND-V0.6.1):
 * - SDAT 9 首 SSEQ 官方分类: BGM #01-05 (SEQ_01/02/03/04/15, 可循环长曲 31-782s)
 *   与 Jingle #01-04 (SEQ_10/12/13/14, 无循环短乐句 6-19s, 官方 OST 即标为
 *   "Jingle #01..#04" — docs/(EMU) 资源文件名可证; mp3 体积亦佐证:
 *   SEQ_01-04 = 1.8-2.5MB, SEQ_15 = 329KB, Jingle 四首仅 41-75KB)。
 * - 旧版把 4 首 Jingle 全当"场景循环 BGM" (picture→SEQ_12 / pictureMode+pictList→
 *   SEQ_13 / options+about→SEQ_10 / staff→SEQ_14), 听感 = 几秒的音效在循环。
 *   SOUND-V0.6 修 picture/pictureMode/pictList, SOUND-V0.6.1 补修
 *   options/about/staff (同一 loop=true 链路, 同样是几秒 Jingle 循环)。
 * - 现 11 场景全部映射官方 BGM #01-05 (唯一可循环资源), 菜单/附属页策略:
 *   * picture (图画对局)    → SEQ_04 (对局级 BGM, 与 sudoku 同曲, 60s 循环)
 *   * pictureMode/pictList  → SEQ_03 (选题列表 BGM, 与 select 同曲)
 *   * options/about/staff   → SEQ_02 (主菜单系统 BGM; ROM 无专曲依据,
 *     原版如按动作触发不同曲目, 待调用链校准后再各自配曲)
 * - Jingle 四首保留在 assets/audio/bgm/, 按原 DS 动作链接入"一次性提示音"
 *   (non-loop) 时使用, 不再作循环背景乐。
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
  | 'tap'       // 普通按钮按下
  | 'back'      // 返回/取消
  | 'start'     // 开始游戏
  | 'decide'    // 确认/决定
  | 'clear'     // 单格擦除 (06_kesu, 短擦除音)
  | 'clear2'    // 清空画板 (07_kesu2, 大块清空音 — 区别于 clear)
  | 'paint'     // 涂色
  | 'slide'     // 切换/滑动
  | 'complete'  // 完成
  | 'undo'      // 撤销
  | 'windopen'  // 弹窗/答案层打开 (02_windopen)
  | 'windclose' // 弹窗/答案层关闭 (03_windclose);

/** 场景 → BGM 文件路径。 */
export const BGM_MANIFEST: Record<AudioScene, string> = {
  title: '/assets/audio/bgm/SEQ_01.mp3',
  menu: '/assets/audio/bgm/SEQ_02.mp3',
  select: '/assets/audio/bgm/SEQ_03.mp3',
  options: '/assets/audio/bgm/SEQ_02.mp3',
  sudoku: '/assets/audio/bgm/SEQ_04.mp3',
  picture: '/assets/audio/bgm/SEQ_04.mp3',
  pictureMode: '/assets/audio/bgm/SEQ_03.mp3',
  pictList: '/assets/audio/bgm/SEQ_03.mp3',
  tutorial: '/assets/audio/bgm/SEQ_15.mp3',
  staff: '/assets/audio/bgm/SEQ_02.mp3',
  about: '/assets/audio/bgm/SEQ_02.mp3',
};

/** 事件 → SE 文件路径。 */
export const SE_MANIFEST: Record<SeEvent, string> = {
  tap: '/assets/audio/se/00_botan.mp3',
  back: '/assets/audio/se/08_batu.mp3',
  start: '/assets/audio/se/29_start.mp3',
  decide: '/assets/audio/se/11_kettei.mp3',
  clear: '/assets/audio/se/06_kesu.mp3',
  clear2: '/assets/audio/se/07_kesu2.mp3',
  paint: '/assets/audio/se/05_nuru.mp3',
  slide: '/assets/audio/se/01_slide.mp3',
  complete: '/assets/audio/se/13_kakikaki.mp3',
  undo: '/assets/audio/se/04_idou.mp3',
  windopen: '/assets/audio/se/02_windopen.mp3',
  windclose: '/assets/audio/se/03_windclose.mp3',
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
  options:      79,   // SEQ_02 同 menu (SOUND-V0.6.1 起不再循环 Jingle)
  picture:      62,   // SEQ_04 同 sudoku (SOUND-V0.6 起不再循环 SEQ_12 Jingle)
  pictureMode:  92,   // SEQ_03 同 select
  pictList:     92,   // SEQ_03 同 select
  staff:        79,   // SEQ_02 同 menu (原 SEQ_14 Jingle 已弃作循环 BGM)
  tutorial:    116,   // SEQ_15 实测 116 (活泼)
  about:        79,   // SEQ_02 同 menu
};

/** beat 间隔毫秒 (UI pulse / 呼吸光晕周期)。 */
export const beatMs = (scene: AudioScene): number =>
  Math.round(60000 / BGM_BPM[scene]);

/** 小节 (4 拍) 毫秒, 用于"动"幅度大的卡片浮动。 */
export const barMs = (scene: AudioScene): number =>
  Math.round(240000 / BGM_BPM[scene]);

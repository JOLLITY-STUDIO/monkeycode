/**
 * title_screen GT 数据（f3727-f4096）
 *
 * 来源：emu-full trace OpeningScreenTable[id=12].chr (label='title_menu')
 *
 * title 是稳定画面 (fadeIn=4 stable=359 fadeOut=7)：
 *   - 8 个 1KB CHR slot 映射到固定 bank id: [124,125,126,127,252,125,126,127]
 *     (PPU $0000-$1FFF: PT 表 4KB, BG 0/1 + SPR 0/1 各 1KB bank)
 *     解释: BG bank 0/1 = 124/125 (字形), SPR bank 0 = 126 (奖杯 sprite),
 *           SPR bank 1 = 127 (光标 sprite), 252 = 故事幕/退化期)
 *   - NT 全 4 块装载 (mid.nt[0..3], tile/attrib)
 *   - OAM 64 sprite (mid.oam)
 *   - palette: bg=[15,22,0,48,...] / spr=[15,39,55,48,...]
 *
 * 在 TitleMenuSceneController.onEnter() 直接装载静态 GT 即可 (NES $9AB8-$9B05
 * pointer resolver 已锁定 title 的 chr plan 全程不变)。
 *
 * ⚠️ V0.6 待办：从 emu-full 重跑 f3727-f4096 每帧 dump 出 chrBanks[8] 时序,
 *    确认是否真稳定 (故事幕/标题切换帧可能动态切 bank)。
 */
export const TITLE_SCREEN_CHR_BANKS: readonly number[] = [
  0x7c, // slot 0 — $0000-$03FF BG pattern table 0/lower
  0x7d, // slot 1 — $0400-$07FF BG pattern table 0/upper
  0x7e, // slot 2 — $0800-$0BFF BG pattern table 1/lower
  0x7f, // slot 3 — $0C00-$0FFF BG pattern table 1/upper
  0xfc, // slot 4 — $1000-$13FF SPR pattern table 0/lower (奖杯)
  0x7d, // slot 5 — $1400-$17FF SPR pattern table 0/upper
  0x7e, // slot 6 — $1800-$1BFF SPR pattern table 1/lower
  0x7f, // slot 7 — $1C00-$1FFF SPR pattern table 1/upper
];

/** Title Menu 跨帧 id (title 是稳定画面,所有 frame 都用同一组) */
export const TITLE_SCREEN_STABLE: boolean = true;

/** Title Menu 总寿命 (NES frame) — 来自 OpeningScreenEntry.duration */
export const TITLE_SCREEN_FIRST_FRAME: number = 3727;
export const TITLE_SCREEN_LAST_FRAME: number = 4096;

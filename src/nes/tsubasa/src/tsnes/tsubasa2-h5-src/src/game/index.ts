/**
 * 天使之翼2 — 游戏服务目录索引
 *
 * 每个 PRG Bank = 一个 Service 类，对外暴露业务接口。
 * H5 不需要 MMC3 bank 切换，直接 import 并调用对应 Service 的方法。
 *
 * 已翻译:
 *   Bank 00 → Bank00Service (核心系统服务: NT/PPU Buffer/调色板/场景/主循环)
 *   Bank 01 → DataQueryService (球员/队伍数据查询 + 选项屏幕管理)
 *   Bank 02 → Bank02Service (场景控制器: RESET 入口, 8路入口分发表)
 *   Bank 30 → Bank30Service (硬件初始化)
 *
 * 翻译中 (结构完成，handler/数据 持续迭代):
 *   Bank 12 → Bank12AudioService (音频引擎: APU 模拟 + BGM/SFX 数据)
 *   Bank 26 → MatchEngineService (比赛核心引擎)
 *   Bank 31 → InterruptService (中断/NMI 服务)
 */

export { Bank00Service } from './bank00_core.service';
export { Bank02Service } from './bank02_scene.service';
export { Bank30Service } from './bank30_init.service';
export { DataQueryService } from './bank01_data-query.service';
export { Bank12AudioService, SE_POINTER_TABLE, BGM_DATA_MAP } from './bank12_audio.service';
export type { IAudioOutput, ApuWriteEvent, ChannelType } from './bank12_audio.service';
export { OpeningSceneController } from './scene_opening.controller';
export type { OpeningDisplayState } from './scene_opening.controller';
export { MatchEngineService } from './bank26_match.service';
export { InterruptService } from './bank31_interrupt.service';
export type { BankConfig } from './bank31_interrupt.service';

// 场景路由器 (BOOT/TITLE/MEETING/MATCH/RESULT 全路由)
export { BootService, BOOT_KEYS } from './boot';

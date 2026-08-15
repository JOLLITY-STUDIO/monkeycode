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
 *   Bank 24 → Bank24HudService (HUD 文本流渲染 + 精灵加载)
 *   Bank 28 → Bank28MatchService (比赛对阵/阵型/等级配置)
 *   Bank 30 → Bank30Service (硬件初始化)
 *
 * 翻译中 (结构完成，handler/数据 持续迭代):
 *   Bank 12 → Bank12AudioService (音频引擎: APU 模拟 + BGM/SFX 数据)
 *   Bank 26 → MatchEngineService (比赛核心引擎)
 *   Bank 31 → InterruptService (中断/NMI 服务)
 *
 * 骨架 (结构完成, code 待翻译):
 *   Bank 11 → Bank11Service (比赛回合逻辑 PT1)
 *   Bank 16 → Bank16Service (特殊动作/技能)
 *   Bank 19 → Bank19Service (辅助逻辑)
 *   Bank 20 → Bank20Service (比赛辅助逻辑)
 *   Bank 22 → Bank22Service (数据+代码混合)
 *   Bank 27 → Bank27Service (数据+极少量代码)
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
export { Bank24HudService } from './bank24_hud.service';
export { Bank28MatchService } from './bank28_match.service';
export { InterruptService } from './bank31_interrupt.service';
export type { BankConfig } from './bank31_interrupt.service';
export { Bank11Service } from './bank11_match-turn.service';
export { Bank16Service } from './bank16_skills.service';
export { Bank19Service } from './bank19_auxiliary.service';
export { Bank20Service } from './bank20_match-aux.service';
export { Bank22Service } from './bank22_hybrid.service';
export { Bank27Service } from './bank27_minimal.service';

// 场景路由器 (BOOT/TITLE/MEETING/MATCH/RESULT 全路由)
export { BootService, BOOT_KEYS } from './boot';

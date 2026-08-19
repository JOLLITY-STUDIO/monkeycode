"use strict";
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
 *   Bank 11 → Bank11Service (比赛回合逻辑 PT1: 滚动控制/脚本处理/精灵组写入, 差分验证 10064/0)
 *   Bank 27 → Bank27Service (精灵/场景动画数据加载 + 动画帧推进, 差分验证 7274/0)
 *   Bank 28 → Bank28MatchService (比赛对阵/阵型/等级配置)
 *   Bank 30 → Bank30Service (硬件初始化)
 *
 * 翻译中 (结构完成，handler/数据 持续迭代):
 *   Bank 12 → Bank12AudioService (音频引擎: APU 模拟 + BGM/SFX 数据)
 *   Bank 26 → MatchEngineService (比赛核心引擎)
 *   Bank 31 → InterruptService (中断/NMI 服务)
 *
 * 已翻译 (完整实现, 不再属于骨架):
 *   Bank 16 → Bank16Service (特殊动作/技能)
 *   Bank 18 → Bank18Service (剧情场景主控制器: 章节→Bank19 数据流偏移调度, 骨架已接入 STORY 路由, 数据表建模 TODO)
 *   Bank 19 → Bank19Service (剧情场景精灵/文字渲染库: 数据流驱动/控制码分发/精灵渲染/场景重置, 差分验证 5600/0, 已接入 STORY 路由)
 *   ResultController → 赛果场景 (RESULT 路由: A→TITLE, 玩链路闭环)
 *   PasswordController → 密码输入场景 (PASSWORD 路由: Bank02 $A484 分发+$A4C0 主逻辑, 骨架已接入)
 *   Bank 20 → Bank20Service (比赛辅助: 计时状态机×2/精灵渲染/动画偏移/计分板, 差分验证 17014/0, 已接入 MATCH 路由 frameTick)
 *   Bank 22 → Bank22Service (数据+代码混合, 精灵生成器)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BOOT_KEYS = exports.BootService = exports.Bank29RosterService = exports.Bank27Service = exports.Bank22Service = exports.Bank20Service = exports.StoryChapter = exports.Bank18Service = exports.Bank19Service = exports.Bank16Service = exports.Bank11Service = exports.InterruptService = exports.Bank28MatchService = exports.Bank24HudService = exports.MatchEngineService = exports.PASSWORD_DISPATCH_TABLE = exports.PasswordController = exports.ResultController = exports.OpeningSceneController = exports.BGM_DATA_MAP = exports.SE_POINTER_TABLE = exports.Bank12AudioService = exports.DataQueryService = exports.Bank30Service = exports.Bank02Service = exports.Bank00Service = void 0;
var bank00_core_service_1 = require("./service/bank00/bank00_core.service");
Object.defineProperty(exports, "Bank00Service", { enumerable: true, get: function () { return bank00_core_service_1.Bank00Service; } });
var bank02_scene_service_1 = require("./service/bank02_scene.service");
Object.defineProperty(exports, "Bank02Service", { enumerable: true, get: function () { return bank02_scene_service_1.Bank02Service; } });
var bank30_init_service_1 = require("./service/bank30_init.service");
Object.defineProperty(exports, "Bank30Service", { enumerable: true, get: function () { return bank30_init_service_1.Bank30Service; } });
var bank01_data_query_service_1 = require("./service/bank01_data-query.service");
Object.defineProperty(exports, "DataQueryService", { enumerable: true, get: function () { return bank01_data_query_service_1.DataQueryService; } });
var bank12_audio_service_1 = require("./service/bank12_audio.service");
Object.defineProperty(exports, "Bank12AudioService", { enumerable: true, get: function () { return bank12_audio_service_1.Bank12AudioService; } });
Object.defineProperty(exports, "SE_POINTER_TABLE", { enumerable: true, get: function () { return bank12_audio_service_1.SE_POINTER_TABLE; } });
Object.defineProperty(exports, "BGM_DATA_MAP", { enumerable: true, get: function () { return bank12_audio_service_1.BGM_DATA_MAP; } });
var scene_opening_controller_1 = require("./service/bank00/scene_opening.controller");
Object.defineProperty(exports, "OpeningSceneController", { enumerable: true, get: function () { return scene_opening_controller_1.OpeningSceneController; } });
var bank00_result_controller_1 = require("./service/bank00_result.controller");
Object.defineProperty(exports, "ResultController", { enumerable: true, get: function () { return bank00_result_controller_1.ResultController; } });
var bank02_password_service_1 = require("./service/bank02_password.service");
Object.defineProperty(exports, "PasswordController", { enumerable: true, get: function () { return bank02_password_service_1.PasswordController; } });
Object.defineProperty(exports, "PASSWORD_DISPATCH_TABLE", { enumerable: true, get: function () { return bank02_password_service_1.PASSWORD_DISPATCH_TABLE; } });
var bank26_match_service_1 = require("./service/bank26_match.service");
Object.defineProperty(exports, "MatchEngineService", { enumerable: true, get: function () { return bank26_match_service_1.MatchEngineService; } });
var bank24_hud_service_1 = require("./service/bank24_hud.service");
Object.defineProperty(exports, "Bank24HudService", { enumerable: true, get: function () { return bank24_hud_service_1.Bank24HudService; } });
var bank28_match_service_1 = require("./service/bank28_match.service");
Object.defineProperty(exports, "Bank28MatchService", { enumerable: true, get: function () { return bank28_match_service_1.Bank28MatchService; } });
var bank31_interrupt_service_1 = require("./service/bank31_interrupt.service");
Object.defineProperty(exports, "InterruptService", { enumerable: true, get: function () { return bank31_interrupt_service_1.InterruptService; } });
var bank11_match_turn_service_1 = require("./service/bank11_match-turn.service");
Object.defineProperty(exports, "Bank11Service", { enumerable: true, get: function () { return bank11_match_turn_service_1.Bank11Service; } });
var bank16_skills_service_1 = require("./service/bank16_skills.service");
Object.defineProperty(exports, "Bank16Service", { enumerable: true, get: function () { return bank16_skills_service_1.Bank16Service; } });
var bank19_auxiliary_service_1 = require("./service/bank19_auxiliary.service");
Object.defineProperty(exports, "Bank19Service", { enumerable: true, get: function () { return bank19_auxiliary_service_1.Bank19Service; } });
var bank18_story_service_1 = require("./service/bank18_story.service");
Object.defineProperty(exports, "Bank18Service", { enumerable: true, get: function () { return bank18_story_service_1.Bank18Service; } });
Object.defineProperty(exports, "StoryChapter", { enumerable: true, get: function () { return bank18_story_service_1.StoryChapter; } });
var bank20_match_aux_service_1 = require("./service/bank20_match-aux.service");
Object.defineProperty(exports, "Bank20Service", { enumerable: true, get: function () { return bank20_match_aux_service_1.Bank20Service; } });
var bank22_hybrid_service_1 = require("./service/bank22_hybrid.service");
Object.defineProperty(exports, "Bank22Service", { enumerable: true, get: function () { return bank22_hybrid_service_1.Bank22Service; } });
var bank27_minimal_service_1 = require("./service/bank27_minimal.service");
Object.defineProperty(exports, "Bank27Service", { enumerable: true, get: function () { return bank27_minimal_service_1.Bank27Service; } });
var bank29_roster_service_1 = require("./service/bank29_roster.service");
Object.defineProperty(exports, "Bank29RosterService", { enumerable: true, get: function () { return bank29_roster_service_1.Bank29RosterService; } });
// 场景路由器 (BOOT/TITLE/MEETING/MATCH/RESULT 全路由)
var boot_1 = require("./boot");
Object.defineProperty(exports, "BootService", { enumerable: true, get: function () { return boot_1.BootService; } });
Object.defineProperty(exports, "BOOT_KEYS", { enumerable: true, get: function () { return boot_1.BOOT_KEYS; } });

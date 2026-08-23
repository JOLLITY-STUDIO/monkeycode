"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRG = exports.NES_CHR_ROM = exports.HEADER = void 0;
/**
 * game/rom.ts — 扁平化 ROM 定义 (小程序编译器友好)
 *
 * prg 参数 = 翻译后的 bank 类集合 (存到 rom.tsPrg, 无需原始字节)。
 * 浏览器/小程序入口: BrowserMini.loadTsROM({ header, prg, chr })。
 */
const header_1 = require("./header");
Object.defineProperty(exports, "HEADER", { enumerable: true, get: function () { return header_1.HEADER; } });
const index_1 = require("./chr/index");
Object.defineProperty(exports, "NES_CHR_ROM", { enumerable: true, get: function () { return index_1.NES_CHR_ROM; } });
const index_2 = require("./prg/index");
/** PRG bank 类集合 (供 NES.loadTsROM 存到 rom.tsPrg) */
const PRG = {
    GameSystemService: index_2.GameSystemService, HardwareInitService: index_2.HardwareInitService, PlayerQueryService: index_2.PlayerQueryService,
    AudioService: index_2.AudioService, ResultSceneController: index_2.ResultSceneController,
    PasswordCallbackHandler: index_2.PasswordCallbackHandler, MatchEngineService: index_2.MatchEngineService, MatchHudService: index_2.MatchHudService,
    MatchConfigService: index_2.MatchConfigService, InterruptService: index_2.InterruptService, MatchTurnService: index_2.MatchTurnService, SkillService: index_2.SkillService,
    MatchAuxService: index_2.MatchAuxService, SpriteService: index_2.SpriteService, SpriteAnimationService: index_2.SpriteAnimationService,
    TeamRosterService: index_2.TeamRosterService, BootRouter: index_2.BootRouter, NmiCallbackIndex: index_2.NmiCallbackIndex,
};
exports.PRG = PRG;

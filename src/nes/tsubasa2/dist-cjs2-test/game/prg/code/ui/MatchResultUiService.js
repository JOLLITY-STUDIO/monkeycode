"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchResultUiService = void 0;
const levelup_table_1 = require("../../data/tables/levelup-table");
const team_table_1 = require("../../data/tables/team-table");
const player_table_1 = require("../../data/tables/player-table");
const match_config_table_1 = require("../../data/tables/match-config-table");
class MatchResultUiService {
    constructor(store) {
        this.store = store;
        this.step = 0;
        this.frameCount = 0;
    }
    reset() {
        this.step = 0;
        this.frameCount = 0;
    }
    /**
     * 输入比赛结果数据 → 输出渲染视图。
     */
    render(input) {
        const homeName = (0, team_table_1.findTeamNameById)(input.homeTeam) || 'HOME';
        const awayName = (0, team_table_1.findTeamNameById)(input.awayTeam) || 'AWAY';
        const winner = input.homeScore > input.awayScore ? 'home' :
            input.homeScore < input.awayScore ? 'away' : 'draw';
        const scorerNames = input.scorers.map(id => (0, player_table_1.findPlayerNameById)(id) || `#${id}`);
        const mvp = (0, player_table_1.findPlayerById)(input.mvpPlayerId);
        const mvpName = mvp?.name || `#${input.mvpPlayerId}`;
        const lvBefore = (0, levelup_table_1.findLevelByExp)(input.mvpExpBefore);
        const lvAfter = (0, levelup_table_1.findLevelByExp)(input.mvpExpBefore + input.expGained);
        const nextLv = lvAfter < 30 ? (0, levelup_table_1.findLevelById)(lvAfter + 1) : null;
        const cfg = (0, match_config_table_1.getMatchConfig)(input.homeTeam, input.awayTeam);
        const view = {
            homeName,
            awayName,
            scoreText: `${input.homeScore} - ${input.awayScore}`,
            winner,
            scorerNames,
            mvpName,
            mvpLevelBefore: lvBefore,
            mvpLevelAfter: lvAfter,
            leveledUp: lvAfter > lvBefore,
            expGained: input.expGained,
            expRequiredNext: nextLv ? nextLv.expRequired - (input.mvpExpBefore + input.expGained) : 0,
            tournament: cfg.tournament,
        };
        // 状态机：step 0 = 显示分数，step 1 = 进球者，step 2 = 升级，step 3 = 按键继续
        if (this.step === 0 && this.frameCount > 30) {
            this.drawScore(view);
            this.step = 1;
        }
        else if (this.step === 1 && this.frameCount > 60) {
            this.drawScorers(view);
            this.step = 2;
        }
        else if (this.step === 2 && this.frameCount > 90) {
            if (view.leveledUp)
                this.drawLevelUp(view);
            this.step = 3;
        }
        this.frameCount++;
        return view;
    }
    drawScore(view) {
        // TODO V1.0: 写 NT 缓冲头部 "HOME - AWAY" + 大字号比分
        void view;
    }
    drawScorers(view) {
        // TODO V1.0: 写 NT 缓冲 "GOALS" + 进球者名列表
        void view;
    }
    drawLevelUp(view) {
        // TODO V1.0: 写 NT 缓冲 "LEVEL UP!" + 升级前后等级对比
        void view;
    }
    exit() {
        this.step = 0;
        this.frameCount = 0;
    }
    get currentStep() { return this.step; }
}
exports.MatchResultUiService = MatchResultUiService;

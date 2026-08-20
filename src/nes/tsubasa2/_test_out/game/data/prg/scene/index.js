"use strict";
/**
 * 天使之翼2 — 场景常量（纯数据，无逻辑）
 *
 * 根据游戏说明书梳理的全部界面场景定义。
 * 本文件只有 enum 和 const 数组，不包含任何 interface / 函数 / 业务逻辑。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RIO_CUP_MATCHES = exports.ResultPhase = exports.MatchPauseMenu = exports.PkShootoutPhase = exports.SetPieceRole = exports.SetPieceType = exports.KeeperSaveCommand = exports.KeeperOneOnOneCommand = exports.KeeperFloatCommand = exports.FloatBallOwnCommand = exports.FloatBallEnemyCommand = exports.DefenseCommand = exports.OffenseCommand = exports.RadarRole = exports.MatchPhase = exports.StoryId = exports.LevelMenu = exports.ChangeMenu = exports.DefenseType = exports.FormationType = exports.TeamDataMenu = exports.MeetingMenu = exports.TitleMenu = exports.OpeningShot = exports.SceneRoot = void 0;
// ═══════════════════════════════════════════════════════════════
// 根场景路由
// ═══════════════════════════════════════════════════════════════
var SceneRoot;
(function (SceneRoot) {
    SceneRoot[SceneRoot["BOOT"] = 0] = "BOOT";
    SceneRoot[SceneRoot["TITLE"] = 1] = "TITLE";
    SceneRoot[SceneRoot["PASSWORD"] = 2] = "PASSWORD";
    SceneRoot[SceneRoot["MEETING"] = 3] = "MEETING";
    SceneRoot[SceneRoot["STORY"] = 4] = "STORY";
    SceneRoot[SceneRoot["MATCH"] = 5] = "MATCH";
    SceneRoot[SceneRoot["RESULT"] = 6] = "RESULT";
    SceneRoot[SceneRoot["LEVELUP"] = 8] = "LEVELUP";
    SceneRoot[SceneRoot["CREDITS"] = 7] = "CREDITS";
})(SceneRoot || (exports.SceneRoot = SceneRoot = {}));
// ═══════════════════════════════════════════════════════════════
// Boot → 开场动画镜头（按顺序播放）
// ═══════════════════════════════════════════════════════════════
// 注意: 标题画面不是开场镜头, 由 SceneRoot.TITLE 独立场景
// (TitleSceneController) 负责, 开场播完后由 BootService 流转进入。
var OpeningShot;
(function (OpeningShot) {
    OpeningShot[OpeningShot["LOGO"] = 0] = "LOGO";
    /** 大空翼 */
    OpeningShot[OpeningShot["TSUBASA"] = 1] = "TSUBASA";
    /** 日向 */
    OpeningShot[OpeningShot["HYUGA"] = 2] = "HYUGA";
    /** 岬太郎 */
    OpeningShot[OpeningShot["MISAKI"] = 3] = "MISAKI";
    /** 若林 */
    OpeningShot[OpeningShot["WAKABAYASHI"] = 4] = "WAKABAYASHI";
    /** 世界杯 */
    OpeningShot[OpeningShot["WORLD_CUP"] = 5] = "WORLD_CUP";
})(OpeningShot || (exports.OpeningShot = OpeningShot = {}));
// ═══════════════════════════════════════════════════════════════
var TitleMenu;
(function (TitleMenu) {
    TitleMenu[TitleMenu["KICKOFF"] = 0] = "KICKOFF";
    TitleMenu[TitleMenu["CONTINUE"] = 1] = "CONTINUE";
    // 真实 ROM 标题菜单只有 2 项 (说明书: KICKOFF=新游戏, CONTINUE=续关→密码输入画面)
    // 密码输入画面是 CONTINUE 确认后的子流程, 不是标题菜单第三项
})(TitleMenu || (exports.TitleMenu = TitleMenu = {}));
// ═══════════════════════════════════════════════════════════════
// Meeting → 赛前会议
// ═══════════════════════════════════════════════════════════════
var MeetingMenu;
(function (MeetingMenu) {
    MeetingMenu[MeetingMenu["TEAM_INFO"] = 0] = "TEAM_INFO";
    MeetingMenu[MeetingMenu["SCORE_MEMO"] = 1] = "SCORE_MEMO";
    MeetingMenu[MeetingMenu["TEAM_DATA"] = 2] = "TEAM_DATA";
    MeetingMenu[MeetingMenu["KICKOFF"] = 3] = "KICKOFF";
})(MeetingMenu || (exports.MeetingMenu = MeetingMenu = {}));
var TeamDataMenu;
(function (TeamDataMenu) {
    TeamDataMenu[TeamDataMenu["FORMATION"] = 0] = "FORMATION";
    TeamDataMenu[TeamDataMenu["DEFENSE_TYPE"] = 1] = "DEFENSE_TYPE";
    TeamDataMenu[TeamDataMenu["CHANGE"] = 2] = "CHANGE";
    TeamDataMenu[TeamDataMenu["LEVEL"] = 3] = "LEVEL";
    TeamDataMenu[TeamDataMenu["BACK"] = 4] = "BACK";
})(TeamDataMenu || (exports.TeamDataMenu = TeamDataMenu = {}));
var FormationType;
(function (FormationType) {
    /** 4-3-3 */
    FormationType[FormationType["FORM_433"] = 0] = "FORM_433";
    /** 4-4-2 */
    FormationType[FormationType["FORM_442"] = 1] = "FORM_442";
    /** 3-5-2 */
    FormationType[FormationType["FORM_352"] = 2] = "FORM_352";
    /** 巴西型 */
    FormationType[FormationType["BRAZIL"] = 3] = "BRAZIL";
})(FormationType || (exports.FormationType = FormationType = {}));
var DefenseType;
(function (DefenseType) {
    DefenseType[DefenseType["NORMAL"] = 0] = "NORMAL";
    DefenseType[DefenseType["PRESS"] = 1] = "PRESS";
    DefenseType[DefenseType["COUNTER"] = 2] = "COUNTER";
})(DefenseType || (exports.DefenseType = DefenseType = {}));
var ChangeMenu;
(function (ChangeMenu) {
    ChangeMenu[ChangeMenu["POSITION"] = 0] = "POSITION";
    ChangeMenu[ChangeMenu["MEMBER"] = 1] = "MEMBER";
    ChangeMenu[ChangeMenu["BACK"] = 2] = "BACK";
})(ChangeMenu || (exports.ChangeMenu = ChangeMenu = {}));
var LevelMenu;
(function (LevelMenu) {
    LevelMenu[LevelMenu["SELECT_PLAYER"] = 0] = "SELECT_PLAYER";
    LevelMenu[LevelMenu["DETAIL"] = 1] = "DETAIL";
    LevelMenu[LevelMenu["SPECIAL_DETAIL"] = 2] = "SPECIAL_DETAIL";
    LevelMenu[LevelMenu["BACK"] = 3] = "BACK";
})(LevelMenu || (exports.LevelMenu = LevelMenu = {}));
// ═══════════════════════════════════════════════════════════════
// Story → 剧情
// ═══════════════════════════════════════════════════════════════
var StoryId;
(function (StoryId) {
    StoryId[StoryId["RIO_OPENING"] = 0] = "RIO_OPENING";
    StoryId[StoryId["PRE_MATCH_INTRO"] = 1] = "PRE_MATCH_INTRO";
    StoryId[StoryId["POST_MATCH"] = 2] = "POST_MATCH";
    StoryId[StoryId["HALF_TIME"] = 3] = "HALF_TIME";
    StoryId[StoryId["EXTRA_TIME"] = 4] = "EXTRA_TIME";
    StoryId[StoryId["PK_PRELUDE"] = 5] = "PK_PRELUDE";
    StoryId[StoryId["CHAMPION"] = 6] = "CHAMPION";
    StoryId[StoryId["INTERNATIONAL"] = 7] = "INTERNATIONAL";
    StoryId[StoryId["ENDING"] = 8] = "ENDING";
})(StoryId || (exports.StoryId = StoryId = {}));
// ═══════════════════════════════════════════════════════════════
// Match → 比赛
// ═══════════════════════════════════════════════════════════════
var MatchPhase;
(function (MatchPhase) {
    MatchPhase[MatchPhase["PRE_SHOW"] = 0] = "PRE_SHOW";
    MatchPhase[MatchPhase["KICKOFF"] = 1] = "KICKOFF";
    MatchPhase[MatchPhase["FIELD_POSITIONING"] = 2] = "FIELD_POSITIONING";
    MatchPhase[MatchPhase["COMMAND"] = 3] = "COMMAND";
    MatchPhase[MatchPhase["ANIMATION"] = 4] = "ANIMATION";
    MatchPhase[MatchPhase["GOAL"] = 5] = "GOAL";
    MatchPhase[MatchPhase["SET_PIECE"] = 6] = "SET_PIECE";
    MatchPhase[MatchPhase["HALF_TIME"] = 7] = "HALF_TIME";
    MatchPhase[MatchPhase["FULL_TIME"] = 8] = "FULL_TIME";
    MatchPhase[MatchPhase["EXTRA_TIME"] = 9] = "EXTRA_TIME";
    MatchPhase[MatchPhase["PK_SHOOTOUT"] = 10] = "PK_SHOOTOUT";
})(MatchPhase || (exports.MatchPhase = MatchPhase = {}));
// 雷达画面
var RadarRole;
(function (RadarRole) {
    RadarRole[RadarRole["DRIBBLING"] = 0] = "DRIBBLING";
    RadarRole[RadarRole["DEFENDING"] = 1] = "DEFENDING";
})(RadarRole || (exports.RadarRole = RadarRole = {}));
// 命令
var OffenseCommand;
(function (OffenseCommand) {
    OffenseCommand[OffenseCommand["PASS"] = 0] = "PASS";
    OffenseCommand[OffenseCommand["DRIBBLE"] = 1] = "DRIBBLE";
    OffenseCommand[OffenseCommand["SHOOT"] = 2] = "SHOOT";
    OffenseCommand[OffenseCommand["ONE_TWO"] = 3] = "ONE_TWO";
    OffenseCommand[OffenseCommand["SPECIAL"] = 4] = "SPECIAL";
})(OffenseCommand || (exports.OffenseCommand = OffenseCommand = {}));
var DefenseCommand;
(function (DefenseCommand) {
    DefenseCommand[DefenseCommand["TACKLE"] = 0] = "TACKLE";
    DefenseCommand[DefenseCommand["BLOCK"] = 1] = "BLOCK";
    DefenseCommand[DefenseCommand["PASS_CUT"] = 2] = "PASS_CUT";
    DefenseCommand[DefenseCommand["STAND"] = 3] = "STAND";
    DefenseCommand[DefenseCommand["SPECIAL"] = 4] = "SPECIAL";
})(DefenseCommand || (exports.DefenseCommand = DefenseCommand = {}));
var FloatBallEnemyCommand;
(function (FloatBallEnemyCommand) {
    FloatBallEnemyCommand[FloatBallEnemyCommand["TRAP"] = 0] = "TRAP";
    FloatBallEnemyCommand[FloatBallEnemyCommand["SHOOT"] = 1] = "SHOOT";
    FloatBallEnemyCommand[FloatBallEnemyCommand["THROUGH"] = 2] = "THROUGH";
})(FloatBallEnemyCommand || (exports.FloatBallEnemyCommand = FloatBallEnemyCommand = {}));
var FloatBallOwnCommand;
(function (FloatBallOwnCommand) {
    FloatBallOwnCommand[FloatBallOwnCommand["FOLLOW"] = 0] = "FOLLOW";
    FloatBallOwnCommand[FloatBallOwnCommand["CLEAR"] = 1] = "CLEAR";
    FloatBallOwnCommand[FloatBallOwnCommand["PASS_CUT"] = 2] = "PASS_CUT";
    FloatBallOwnCommand[FloatBallOwnCommand["STAND"] = 3] = "STAND";
})(FloatBallOwnCommand || (exports.FloatBallOwnCommand = FloatBallOwnCommand = {}));
var KeeperFloatCommand;
(function (KeeperFloatCommand) {
    KeeperFloatCommand[KeeperFloatCommand["JUMP_OUT"] = 0] = "JUMP_OUT";
    KeeperFloatCommand[KeeperFloatCommand["PREPARE"] = 1] = "PREPARE";
})(KeeperFloatCommand || (exports.KeeperFloatCommand = KeeperFloatCommand = {}));
var KeeperOneOnOneCommand;
(function (KeeperOneOnOneCommand) {
    KeeperOneOnOneCommand[KeeperOneOnOneCommand["PREPARE_DRIBBLE"] = 0] = "PREPARE_DRIBBLE";
    KeeperOneOnOneCommand[KeeperOneOnOneCommand["PREPARE_SHOOT"] = 1] = "PREPARE_SHOOT";
})(KeeperOneOnOneCommand || (exports.KeeperOneOnOneCommand = KeeperOneOnOneCommand = {}));
var KeeperSaveCommand;
(function (KeeperSaveCommand) {
    KeeperSaveCommand[KeeperSaveCommand["PUNCH"] = 0] = "PUNCH";
    KeeperSaveCommand[KeeperSaveCommand["CATCH"] = 1] = "CATCH";
    KeeperSaveCommand[KeeperSaveCommand["TRIANGLE_JUMP"] = 2] = "TRIANGLE_JUMP";
})(KeeperSaveCommand || (exports.KeeperSaveCommand = KeeperSaveCommand = {}));
// 定位球
var SetPieceType;
(function (SetPieceType) {
    SetPieceType[SetPieceType["GOAL_KICK"] = 0] = "GOAL_KICK";
    SetPieceType[SetPieceType["CORNER_KICK"] = 1] = "CORNER_KICK";
    SetPieceType[SetPieceType["THROW_IN"] = 2] = "THROW_IN";
    SetPieceType[SetPieceType["FREE_KICK"] = 3] = "FREE_KICK";
    SetPieceType[SetPieceType["PENALTY_KICK"] = 4] = "PENALTY_KICK";
})(SetPieceType || (exports.SetPieceType = SetPieceType = {}));
var SetPieceRole;
(function (SetPieceRole) {
    SetPieceRole[SetPieceRole["OFFENSE"] = 0] = "OFFENSE";
    SetPieceRole[SetPieceRole["DEFENSE"] = 1] = "DEFENSE";
})(SetPieceRole || (exports.SetPieceRole = SetPieceRole = {}));
// PK
var PkShootoutPhase;
(function (PkShootoutPhase) {
    PkShootoutPhase[PkShootoutPhase["SELECT_KICKERS"] = 0] = "SELECT_KICKERS";
    PkShootoutPhase[PkShootoutPhase["KICKING"] = 1] = "KICKING";
    PkShootoutPhase[PkShootoutPhase["RESULT"] = 2] = "RESULT";
    PkShootoutPhase[PkShootoutPhase["SUDDEN_DEATH"] = 3] = "SUDDEN_DEATH";
})(PkShootoutPhase || (exports.PkShootoutPhase = PkShootoutPhase = {}));
// 比赛中暂停
var MatchPauseMenu;
(function (MatchPauseMenu) {
    MatchPauseMenu[MatchPauseMenu["FORMATION"] = 0] = "FORMATION";
    MatchPauseMenu[MatchPauseMenu["DEFENSE_TYPE"] = 1] = "DEFENSE_TYPE";
    MatchPauseMenu[MatchPauseMenu["POSITION_CHANGE"] = 2] = "POSITION_CHANGE";
    MatchPauseMenu[MatchPauseMenu["MEMBER_CHANGE"] = 3] = "MEMBER_CHANGE";
    MatchPauseMenu[MatchPauseMenu["CONTINUE"] = 4] = "CONTINUE";
})(MatchPauseMenu || (exports.MatchPauseMenu = MatchPauseMenu = {}));
// ═══════════════════════════════════════════════════════════════
// Result → 赛后
// ═══════════════════════════════════════════════════════════════
var ResultPhase;
(function (ResultPhase) {
    ResultPhase[ResultPhase["SCORE_DISPLAY"] = 0] = "SCORE_DISPLAY";
    ResultPhase[ResultPhase["LEVEL_UP"] = 1] = "LEVEL_UP";
    ResultPhase[ResultPhase["PASSWORD_DISPLAY"] = 2] = "PASSWORD_DISPLAY";
    ResultPhase[ResultPhase["NEXT_MATCH"] = 3] = "NEXT_MATCH";
    ResultPhase[ResultPhase["TOURNAMENT_WIN"] = 4] = "TOURNAMENT_WIN";
    ResultPhase[ResultPhase["GAME_OVER"] = 5] = "GAME_OVER";
})(ResultPhase || (exports.ResultPhase = ResultPhase = {}));
// ═══════════════════════════════════════════════════════════════
// 里约杯对战表
// ═══════════════════════════════════════════════════════════════
/**
 * 里约杯 6 场完整对阵（来自游戏说明书）
 *
 * 场景流转：
 *   BOOT → TITLE → MEETING → STORY → MATCH → RESULT → MEETING → ... → CREDITS
 */
exports.RIO_CUP_MATCHES = [
    {
        round: 1,
        label: '一回戦',
        opponentTeamId: 0x01,
        opponentName: 'フルミネンセ',
        opponentFormation: FormationType.FORM_433,
        opponentDefense: DefenseType.NORMAL,
        opponentNote: 'これといって取り柄のないチーム。しかし、油断は禁物だ。',
    },
    {
        round: 2,
        label: '二回戦',
        opponentTeamId: 0x02,
        opponentName: 'コリンチャンス',
        opponentFormation: FormationType.BRAZIL,
        opponentDefense: DefenseType.NORMAL,
        opponentNote: '10番リベリオのバナナシュートと、9番サトルステギのダイナマイトヘッドは要注意！',
    },
    {
        round: 3,
        label: '三回戦',
        opponentTeamId: 0x03,
        opponentName: 'グレミオ',
        opponentFormation: FormationType.FORM_442,
        opponentDefense: DefenseType.COUNTER,
        opponentNote: '9番ダ・シルバのスピードが攻撃の中心。GKメオンが鉄壁の守り。しかしどこかに弱点があるはず…',
    },
    {
        round: 4,
        label: '四回戦',
        opponentTeamId: 0x04,
        opponentName: 'パルメイラス',
        opponentFormation: FormationType.FORM_433,
        opponentDefense: DefenseType.COUNTER,
        opponentNote: '1番ネイのドリブルが切り込む。9番トニーニョはドライブシュートを打つので気をつけろ！',
    },
    {
        round: 5,
        label: '準決勝',
        opponentTeamId: 0x05,
        opponentName: 'サントス',
        opponentFormation: FormationType.FORM_442,
        opponentDefense: DefenseType.COUNTER,
        opponentNote: '9番ザガロがダブルイールで強引突破。4番チュウセウのパワーディフェンスも要注意。',
    },
    {
        round: 6,
        label: '決勝',
        opponentTeamId: 0x06,
        opponentName: 'フラメンゴ',
        opponentFormation: FormationType.BRAZIL,
        opponentDefense: DefenseType.NORMAL,
        opponentNote: '10番カルロスを筆頭に、6番サンタマリア、2番ジェトーリオとタレント揃い。全員必殺シュート持ちの攻撃的チーム。',
    },
];

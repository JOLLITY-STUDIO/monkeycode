/**
 * 天使之翼2 — 场景常量（纯数据，无逻辑）
 *
 * 根据游戏说明书梳理的全部界面场景定义。
 * 本文件只有 enum 和 const 数组，不包含任何 interface / 函数 / 业务逻辑。
 */

// ═══════════════════════════════════════════════════════════════
// 根场景路由
// ═══════════════════════════════════════════════════════════════

export const enum SceneRoot {
  BOOT = 0,
  TITLE = 1,
  PASSWORD = 2,
  MEETING = 3,
  STORY = 4,
  MATCH = 5,
  RESULT = 6,
  CREDITS = 7,
}

// ═══════════════════════════════════════════════════════════════
// Boot → 开场动画镜头（按顺序播放）
// ═══════════════════════════════════════════════════════════════

export const enum OpeningShot {
  LOGO = 0,
  /** 大空翼 */
  TSUBASA = 1,
  /** 日向 */
  HYUGA = 2,
  /** 岬太郎 */
  MISAKI = 3,
  /** 若林 */
  WAKABAYASHI = 4,
  /** 世界杯 */
  WORLD_CUP = 5,
  /** 标题画面 */
  TITLE = 6,
}
// ═══════════════════════════════════════════════════════════════

export const enum TitleMenu {
  KICKOFF = 0,
  CONTINUE = 1,
}

// ═══════════════════════════════════════════════════════════════
// Meeting → 赛前会议
// ═══════════════════════════════════════════════════════════════

export const enum MeetingMenu {
  TEAM_INFO = 0,
  SCORE_MEMO = 1,
  TEAM_DATA = 2,
  KICKOFF = 3,
}

export const enum TeamDataMenu {
  FORMATION = 0,
  DEFENSE_TYPE = 1,
  CHANGE = 2,
  LEVEL = 3,
  BACK = 4,
}

export const enum FormationType {
  /** 4-3-3 */
  FORM_433 = 0,
  /** 4-4-2 */
  FORM_442 = 1,
  /** 3-5-2 */
  FORM_352 = 2,
  /** 巴西型 */
  BRAZIL = 3,
}

export const enum DefenseType {
  NORMAL = 0,
  PRESS = 1,
  COUNTER = 2,
}

export const enum ChangeMenu {
  POSITION = 0,
  MEMBER = 1,
  BACK = 2,
}

export const enum LevelMenu {
  SELECT_PLAYER = 0,
  DETAIL = 1,
  SPECIAL_DETAIL = 2,
  BACK = 3,
}

// ═══════════════════════════════════════════════════════════════
// Story → 剧情
// ═══════════════════════════════════════════════════════════════

export const enum StoryId {
  RIO_OPENING = 0,
  PRE_MATCH_INTRO = 1,
  POST_MATCH = 2,
  HALF_TIME = 3,
  EXTRA_TIME = 4,
  PK_PRELUDE = 5,
  CHAMPION = 6,
  INTERNATIONAL = 7,
  ENDING = 8,
}

// ═══════════════════════════════════════════════════════════════
// Match → 比赛
// ═══════════════════════════════════════════════════════════════

export const enum MatchPhase {
  PRE_SHOW = 0,
  KICKOFF = 1,
  FIELD_POSITIONING = 2,
  COMMAND = 3,
  ANIMATION = 4,
  GOAL = 5,
  SET_PIECE = 6,
  HALF_TIME = 7,
  FULL_TIME = 8,
  EXTRA_TIME = 9,
  PK_SHOOTOUT = 10,
}

// 雷达画面
export const enum RadarRole {
  DRIBBLING = 0,
  DEFENDING = 1,
}

// 命令
export const enum OffenseCommand {
  PASS = 0,
  DRIBBLE = 1,
  SHOOT = 2,
  ONE_TWO = 3,
  SPECIAL = 4,
}

export const enum DefenseCommand {
  TACKLE = 0,
  BLOCK = 1,
  PASS_CUT = 2,
  STAND = 3,
  SPECIAL = 4,
}

export const enum FloatBallEnemyCommand {
  TRAP = 0,
  SHOOT = 1,
  THROUGH = 2,
}

export const enum FloatBallOwnCommand {
  FOLLOW = 0,
  CLEAR = 1,
  PASS_CUT = 2,
  STAND = 3,
}

export const enum KeeperFloatCommand {
  JUMP_OUT = 0,
  PREPARE = 1,
}

export const enum KeeperOneOnOneCommand {
  PREPARE_DRIBBLE = 0,
  PREPARE_SHOOT = 1,
}

export const enum KeeperSaveCommand {
  PUNCH = 0,
  CATCH = 1,
  TRIANGLE_JUMP = 2,
}

// 定位球
export const enum SetPieceType {
  GOAL_KICK = 0,
  CORNER_KICK = 1,
  THROW_IN = 2,
  FREE_KICK = 3,
  PENALTY_KICK = 4,
}

export const enum SetPieceRole {
  OFFENSE = 0,
  DEFENSE = 1,
}

// PK
export const enum PkShootoutPhase {
  SELECT_KICKERS = 0,
  KICKING = 1,
  RESULT = 2,
  SUDDEN_DEATH = 3,
}

// 比赛中暂停
export const enum MatchPauseMenu {
  FORMATION = 0,
  DEFENSE_TYPE = 1,
  POSITION_CHANGE = 2,
  MEMBER_CHANGE = 3,
  CONTINUE = 4,
}

// ═══════════════════════════════════════════════════════════════
// Result → 赛后
// ═══════════════════════════════════════════════════════════════

export const enum ResultPhase {
  SCORE_DISPLAY = 0,
  LEVEL_UP = 1,
  PASSWORD_DISPLAY = 2,
  NEXT_MATCH = 3,
  TOURNAMENT_WIN = 4,
  GAME_OVER = 5,
}

// ═══════════════════════════════════════════════════════════════
// 里约杯对战表
// ═══════════════════════════════════════════════════════════════

/**
 * 里约杯 6 场完整对阵（来自游戏说明书）
 *
 * 场景流转：
 *   BOOT → TITLE → MEETING → STORY → MATCH → RESULT → MEETING → ... → CREDITS
 */
export const RIO_CUP_MATCHES = [
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
] as const;

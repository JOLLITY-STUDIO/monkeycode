/**
 * GameModel — 游戏状态的数据模型 (纯数据，零渲染逻辑)
 *
 * 这是 logic&model 层的核心。State 类只修改 Model，
 * View 层只读取 Model。两者完全独立，互不依赖。
 *
 * 类似"前后端分离"中后端操作的数据模型：
 *   后端(State) → 更新 Model → 前端(View) → 读取 Model → 渲染 Canvas
 */

// ===================== 子模型类型定义 =====================

/** 菜单状态 */
export interface MenuModel {
  title: string;
  items: string[];
  selectedIndex: number;
}

/** 球员信息 (用于队员选择画面) */
export interface MemberInfo {
  number: number;
  name: string;
  position: string;   // 'GK' | 'DF' | 'MF' | 'FW'
  speed: number;
  power: number;
  technique: number;
  stamina: number;
  isActive: boolean;
}

/** 队员选择状态 */
export interface MemberSelectModel {
  teamName: string;
  players: MemberInfo[];
  cursorIndex: number;
  activeCount: number;
}

/** 比赛球员 */
export interface MatchPlayerInfo {
  id: number;
  x: number;        // 场地坐标 (0-255)
  y: number;        // 场地坐标 (0-240)
  hasBall: boolean;
  isTeamLeft: boolean;  // true=左队(玩家), false=右队(对手)
  isActive: boolean;
}

/** 比赛状态 */
export interface MatchModel {
  leftTeamName: string;
  rightTeamName: string;
  players: MatchPlayerInfo[];
  ballX: number;
  ballY: number;
  scoreLeft: number;
  scoreRight: number;
  phase: number;       // 0=上半场, 1=下半场
  timeMinutes: number;
}

/** 事件状态 (进球/半场/终场) */
export interface EventModel {
  type: '' | 'goal' | 'halftime' | 'fulltime';
  step: number;
  goalScorer: number;   // 进球球员 ID
  scoreLeft: number;
  scoreRight: number;
}

// ===================== 主模型 =====================

export class GameModel {
  // --- PPU/Bank 配置 (State 设置，View 使用) ---
  ppuCtrl: number = 0x10;
  ppuMask: number = 0x06;
  scrollX: number = 0;
  scrollY: number = 0;
  chrBank0: number = 0;
  chrBank1: number = 0;

  // --- 当前状态 ID ---
  stateId: number = 0;

  // --- 各状态子模型 ---
  menu: MenuModel = { title: '', items: [], selectedIndex: 0 };
  memberSelect: MemberSelectModel = {
    teamName: '', players: [], cursorIndex: 0, activeCount: 0,
  };
  match: MatchModel = {
    leftTeamName: '', rightTeamName: '',
    players: [], ballX: 0, ballY: 0,
    scoreLeft: 0, scoreRight: 0,
    phase: 0, timeMinutes: 0,
  };
  event: EventModel = {
    type: '', step: 0, goalScorer: 0, scoreLeft: 0, scoreRight: 0,
  };

  // --- 便捷方法 ---

  /** 重置菜单模型 */
  setMenu(title: string, items: string[], selectedIndex: number): void {
    this.menu = { title, items, selectedIndex };
  }

  /** 重置队员选择模型 */
  setMemberSelect(teamName: string, players: MemberInfo[], cursorIndex: number): void {
    this.memberSelect = { teamName, players, cursorIndex, activeCount: players.filter(p => p.isActive).length };
  }

  /** 更新队员选择光标 */
  setMemberCursor(index: number, players: MemberInfo[]): void {
    this.memberSelect.cursorIndex = index;
    this.memberSelect.players = players;
    this.memberSelect.activeCount = players.filter(p => p.isActive).length;
  }

  /** 重置比赛模型 */
  setMatch(leftName: string, rightName: string): void {
    this.match = {
      leftTeamName: leftName, rightTeamName: rightName,
      players: [], ballX: 128, ballY: 120,
      scoreLeft: 0, scoreRight: 0,
      phase: 0, timeMinutes: 0,
    };
  }

  /** 更新比赛模型 (每帧调用) */
  updateMatch(
    players: MatchPlayerInfo[], ballX: number, ballY: number,
    score: [number, number], phase: number, timeMinutes: number,
    leftName?: string, rightName?: string,
  ): void {
    this.match.players = players;
    this.match.ballX = ballX;
    this.match.ballY = ballY;
    this.match.scoreLeft = score[0];
    this.match.scoreRight = score[1];
    this.match.phase = phase;
    this.match.timeMinutes = timeMinutes;
    if (leftName !== undefined) this.match.leftTeamName = leftName;
    if (rightName !== undefined) this.match.rightTeamName = rightName;
  }

  /** 设置事件 */
  setEvent(type: EventModel['type'], step: number = 0, goalScorer: number = 0, score?: [number, number]): void {
    this.event = {
      type, step, goalScorer,
      scoreLeft: score ? score[0] : 0,
      scoreRight: score ? score[1] : 0,
    };
  }

  /** 递增事件步数 */
  advanceEvent(): void {
    this.event.step++;
  }
}

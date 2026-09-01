// components/scenes/sudoku-scene/sudoku-scene.ts — 数独对局场景组件
// 9x9 grid 渲染 / 选中 / 数字键盘 / 清除 / 提示 / 计时 / 完成检测 / 难度切换
// puzzleId property 支持选题页跳入; 返回 → triggerEvent('back')

import { SudokuGameService } from '../../../utils/sudoku/game_service';
import { Coord, Value } from '../../../utils/sudoku/board';
import { Difficulty, getPuzzleById } from '../../../utils/sudoku/numple_puzzles';
import {
  NBM_SELECT1_N_1_NORMAL,
  NBM_SELECT1_N_1_SELECTED,
  NBM_SELECT1_N_2_NORMAL,
  NBM_SELECT1_N_2_SELECTED,
  NBM_SELECT1_N_3_NORMAL,
  NBM_SELECT1_N_3_SELECTED,
  NBM_SELECT1_N_4_NORMAL,
  NBM_SELECT1_N_4_SELECTED,
  NBM_SELECT1_N_5_NORMAL,
  NBM_SELECT1_N_5_SELECTED,
  NBM_SELECT1_N_6_NORMAL,
  NBM_SELECT1_N_6_SELECTED,
  NBM_SELECT1_N_7_NORMAL,
  NBM_SELECT1_N_7_SELECTED,
  NBM_SELECT1_N_8_NORMAL,
  NBM_SELECT1_N_8_SELECTED,
  NBM_SELECT1_N_9_NORMAL,
  NBM_SELECT1_N_9_SELECTED,
  NBM_SELECT1_CLEARED_NORMAL,
} from '../../../utils/sudoku/nbmAssets';

interface ViewCell {
  r: number;         // 行
  c: number;         // 列
  v: number;         // 显示值 0=空
  given: boolean;    // 给定格 (不可改, 加粗)
  err: boolean;      // 冲突错误
  sel: boolean;      // 当前选中
  same: boolean;     // 与选中格同值高亮
  candidates: number[]; // V0.18 候选笔记 (v=0 时空格显示)
  candidatesText: string; // 候选笔记文本, 便于 wxml 直接渲染
}

interface NumberIconPair {
  normal: string;
  selected: string;
}

const DIFF_LABELS: Record<string, string> = {
  easy: '简单',
  medium: '中等',
  hard: '困难',
  expert: '专家',
  daily: '每日一题',
};

const DIFF_ORDER: Array<Difficulty | 'daily'> = ['easy', 'medium', 'hard', 'expert', 'daily'];

const NUMBER_ICON_PAIRS: Record<number, NumberIconPair> = {
  1: { normal: NBM_SELECT1_N_1_NORMAL, selected: NBM_SELECT1_N_1_SELECTED },
  2: { normal: NBM_SELECT1_N_2_NORMAL, selected: NBM_SELECT1_N_2_SELECTED },
  3: { normal: NBM_SELECT1_N_3_NORMAL, selected: NBM_SELECT1_N_3_SELECTED },
  4: { normal: NBM_SELECT1_N_4_NORMAL, selected: NBM_SELECT1_N_4_SELECTED },
  5: { normal: NBM_SELECT1_N_5_NORMAL, selected: NBM_SELECT1_N_5_SELECTED },
  6: { normal: NBM_SELECT1_N_6_NORMAL, selected: NBM_SELECT1_N_6_SELECTED },
  7: { normal: NBM_SELECT1_N_7_NORMAL, selected: NBM_SELECT1_N_7_SELECTED },
  8: { normal: NBM_SELECT1_N_8_NORMAL, selected: NBM_SELECT1_N_8_SELECTED },
  9: { normal: NBM_SELECT1_N_9_NORMAL, selected: NBM_SELECT1_N_9_SELECTED },
};

const CLEAR_ICON_URL = NBM_SELECT1_CLEARED_NORMAL;

const service = new SudokuGameService();

Component({
  properties: {
    /** 选题页传入的题目 id (numpleX.data_NNN), 空则默认 easy */
    puzzleId: { type: String, value: '' },
  },

  data: {
    grid: [] as ViewCell[][],
    selected: null as Coord | null,
    selectedValue: 0,
    difficulty: 'easy' as Difficulty | 'daily',
    difficultyLabel: '简单',
    timerText: '00:00',
    moves: 0,
    complete: false,
    diffChips: DIFF_ORDER,
    diffLabels: DIFF_LABELS,
    notesMode: false, // V0.18 候选笔记模式
    canUndo: false,
    canRedo: false,
    /** 数字键盘 1-9 的原版 select1.nbm 图标 (normal / selected). */
    numberIconUrls: NUMBER_ICON_PAIRS,
    /** 清除按钮的原版图标. */
    clearIconUrl: CLEAR_ICON_URL,
    /** TS 私有字段声明 (非渲染数据): attached 状态 + 计时器句柄 */
    _attachedDone: false,
    _timer: 0,
  },

  observers: {
    // 运行中 puzzleId 变化 (页面复用) → 重新加载题目
    puzzleId(id: string) {
      if (id && this.data._attachedDone) this._startFromId(String(id));
    },
  },

  lifetimes: {
    attached() {
      this.data._attachedDone = true;
      if (this.data.puzzleId) {
        this._startFromId(String(this.data.puzzleId));
      } else {
        this._startGame('easy');
      }
    },
    detached() {
      this.data._attachedDone = false;
      this._stopTimer();
    },
  },

  methods: {
    /** 返回主菜单 */
    onBackMenu() {
      this.triggerEvent('back');
    },

    /** 从选题页 id 启动 */
    _startFromId(id: string) {
      const puzzle = getPuzzleById(id);
      if (puzzle && service.startFromPuzzle(puzzle).ok) {
        this.setData({
          difficulty: puzzle.difficulty,
          difficultyLabel: DIFF_LABELS[puzzle.difficulty],
          moves: 0,
          complete: false,
        });
        this._sync();
        this._startTimer();
        return;
      }
      this._startGame('easy');
    },

    /** 开始新一局 (difficulty 或 daily) */
    _startGame(diff: Difficulty | 'daily') {
      const ok = diff === 'daily'
        ? service.startNewGame()
        : service.startNewGame(diff);
      if (!ok) {
        wx.showToast({ title: '题目加载失败', icon: 'none' });
        return;
      }
      this.setData({
        difficulty: diff,
        difficultyLabel: diff === 'daily' ? '每日一题' : DIFF_LABELS[diff],
        moves: 0,
        complete: false,
      });
      this._sync();
      this._startTimer();
    },

    /** 从 board 同步到 wxml grid */
    _sync() {
      const board = service.getBoard();
      if (!board) return;
      const grid: ViewCell[][] = [];
      const sel = board.selected;
      let selValue = 0;
      for (let r = 0; r < 9; r++) {
        const row: ViewCell[] = [];
        for (let c = 0; c < 9; c++) {
          const cell = board.cells[r][c];
          const isSel = sel != null && sel.row === r && sel.col === c;
          row.push({
            r,
            c,
            v: cell.value,
            given: cell.given,
            err: cell.isError,
            sel: isSel,
            same: false,
            candidates: cell.candidates.slice(),
            candidatesText: cell.value === 0 && cell.candidates.length ? cell.candidates.join(' ') : '',
          });
          if (isSel) selValue = cell.value;
        }
        grid.push(row);
      }
      // 第二遍: 同值高亮 (需要 selValue 已知)
      if (sel && selValue !== 0) {
        for (let r = 0; r < 9; r++) {
          for (let c = 0; c < 9; c++) {
            if (r === sel.row && c === sel.col) continue;
            if (grid[r][c].v === selValue && grid[r][c].v !== 0) {
              grid[r][c].same = true;
            }
          }
        }
      }
      this.setData({
        grid,
        selected: sel,
        selectedValue: selValue,
        canUndo: board.canUndo,
        canRedo: board.canRedo,
      });
    },

    /** 点击格子选中 */
    onTapCell(e: any) {
      const { r, c } = e.currentTarget.dataset;
      service.selectCell({ row: r, col: c });
      this._sync();
    },

    /** 数字键盘 1-9 (笔记模式下 toggle 候选笔记) */
    onTapNumber(e: any) {
      const num = Number(e.currentTarget.dataset.num) as Value;
      const sel = this.data.selected;
      if (!sel) {
        wx.showToast({ title: '先点选一个格子', icon: 'none' });
        return;
      }
      const board = service.getBoard();
      if (!board) return;
      const cell = board.cells[sel.row][sel.col];
      if (cell.given) {
        wx.showToast({ title: '给定格不可修改', icon: 'none' });
        return;
      }
      if (this.data.notesMode) {
        service.toggleCandidate(sel.row, sel.col, num);
      } else {
        service.inputValue(sel.row, sel.col, num);
        this._checkComplete();
      }
      this.setData({ moves: service.getSessionInfo()?.moves ?? 0 });
      this._sync();
    },

    /** 清除选中格 */
    onTapClear() {
      const sel = this.data.selected;
      if (!sel) return;
      service.clearAt(sel.row, sel.col);
      this.setData({ moves: service.getSessionInfo()?.moves ?? 0 });
      this._sync();
    },

    /** 切换笔记模式 (数字键盘变为 toggle candidate) */
    onToggleNotesMode() {
      this.setData({ notesMode: !this.data.notesMode });
    },

    /** 撤销 */
    onUndo() {
      if (service.undo()) {
        this.setData({ moves: service.getSessionInfo()?.moves ?? 0 });
        this._sync();
      }
    },

    /** 重做 */
    onRedo() {
      if (service.redo()) {
        this.setData({ moves: service.getSessionInfo()?.moves ?? 0 });
        this._sync();
      }
    },

    /** 提示: 自动填入下一空/错格 */
    onTapHint() {
      const h = service.hint();
      if (!h) {
        wx.showToast({ title: '已无空格或全部正确', icon: 'none' });
        return;
      }
      service.selectCell({ row: h.row, col: h.col });
      service.inputValue(h.row, h.col, h.value);
      this.setData({ moves: service.getSessionInfo()?.moves ?? 0 });
      this._sync();
      this._checkComplete();
    },

    /** 难度切换 */
    onTapDifficulty(e: any) {
      const d = e.currentTarget.dataset.diff as Difficulty | 'daily';
      this._startGame(d);
    },

    /** 完成检测 */
    _checkComplete() {
      const res = service.checkCompletion();
      if (res.complete) {
        this._stopTimer();
        this.setData({ complete: true });
        const info = service.getSessionInfo();
        wx.showModal({
          title: '🎉 完成!',
          content: `用时 ${this.data.timerText}，步数 ${info?.moves ?? 0}。再来一局?`,
          confirmText: '再来一局',
          cancelText: '关闭',
          success: (r) => {
            if (r.confirm) this._startGame(this.data.difficulty);
          },
        });
      } else if (res.valid) {
        // 无错误但未完成: 静默
      } else {
        wx.showToast({ title: `有 ${res.errors} 处冲突`, icon: 'none' });
      }
    },

    /** 计时器 */
    _startTimer() {
      this._stopTimer();
      this.data._timer = setInterval(() => {
        const info = service.getSessionInfo();
        if (!info) return;
        const sec = Math.floor(info.elapsedMs / 1000);
        const mm = String(Math.floor(sec / 60)).padStart(2, '0');
        const ss = String(sec % 60).padStart(2, '0');
        this.setData({ timerText: `${mm}:${ss}` });
      }, 1000);
    },

    _stopTimer() {
      if (this.data._timer) {
        clearInterval(this.data._timer);
        this.data._timer = 0;
      }
    },
  },
});

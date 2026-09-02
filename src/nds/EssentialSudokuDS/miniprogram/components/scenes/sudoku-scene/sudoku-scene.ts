// components/scenes/sudoku-scene/sudoku-scene.ts — 数独对局场景组件
// 9x9 grid 渲染 / 选中 / 数字键盘 / 清除 / 提示 / 计时 / 完成检测 / 难度切换
// puzzleId property 支持选题页跳入; 返回 → triggerEvent('back')

import { SudokuGameService } from '../../../utils/sudoku/game_service';
import { Coord, Value } from '../../../utils/sudoku/board';
import { Difficulty, NumplePuzzle, getPuzzleById } from '../../../utils/sudoku/numple_puzzles';
import {
  SudokuProgress,
  loadSudokuProgress,
  saveSudokuProgress,
  clearSudokuProgress,
} from '../../../utils/sudoku/sudoku_progress';
import { audioService } from '../../../utils/audio/audioService';

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

const DIFF_LABELS: Record<string, string> = {
  easy: '简单',
  medium: '中等',
  hard: '困难',
  expert: '专家',
  daily: '每日一题',
};

const DIFF_ORDER: Array<Difficulty | 'daily'> = ['easy', 'medium', 'hard', 'expert', 'daily'];

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
    /** TS 私有字段声明 (非渲染数据): attached 状态 + 计时器/存档防抖句柄 */
    _attachedDone: false,
    _timer: 0,
    _saveTimer: 0,
    /** 仅 select 直达题参与进度存档 (随机/每日局无固定恢复语义, 不写脏档) */
    _persistEnabled: false,
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
      this._flushSave();
      this._stopTimer();
      this._clearSaveTimer();
    },
  },

  methods: {
    /** 返回选题页 (先落盘当前进度, 返回后可从选题页原题恢复) */
    onBackMenu() {
      audioService.playSe('back');
      this._flushSave();
      this.triggerEvent('back');
    },

    /**
     * 从选题页 id 启动. 该题有未完成进度 → 弹窗询问「继续上次 / 重新开始」,
     * 重新开始会清除旧存档 (玩家可主动重解同一题)。
     */
    _startFromId(id: string) {
      const puzzle = getPuzzleById(id);
      if (!puzzle) {
        this._startGame('easy');
        return;
      }
      const saved = loadSudokuProgress(id);
      if (saved && saved.board) {
        const sec = Math.floor((saved.elapsedMs || 0) / 1000);
        const mm = String(Math.floor(sec / 60)).padStart(2, '0');
        const ss = String(sec % 60).padStart(2, '0');
        wx.showModal({
          title: '发现未完成进度',
          content: `已用时 ${mm}:${ss}，${saved.board.moves ?? 0} 步。继续上次进度?`,
          confirmText: '继续',
          cancelText: '重新开始',
          success: (r) => {
            if (r.confirm) {
              this._launchPuzzle(puzzle, saved);
            } else {
              clearSudokuProgress(id);
              this._launchPuzzle(puzzle);
            }
          },
        });
        return;
      }
      this._launchPuzzle(puzzle);
    },

    /** 载入题目开一局; saved 非空 → 恢复盘面 (含 undo/redo 栈) + 续接计时 */
    _launchPuzzle(puzzle: NumplePuzzle, saved?: SudokuProgress | null) {
      let ok = true;
      if (saved && saved.board) {
        const r = service.restoreProgress(saved);
        if (!r.ok) {
          // 存档非法 → 清脏存档, 走新开
          clearSudokuProgress(saved.puzzleId);
          ok = false;
        }
      } else {
        ok = service.startFromPuzzle(puzzle).ok;
      }
      if (!ok) {
        this._startGame('easy');
        return;
      }
      this.data._persistEnabled = true;
      const info = service.getSessionInfo();
      this.setData({
        difficulty: puzzle.difficulty,
        difficultyLabel: DIFF_LABELS[puzzle.difficulty],
        moves: info?.moves ?? 0,
        complete: false,
      });
      this._sync();
      this._startTimer();
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
      this.data._persistEnabled = false; // 随机/每日局不写进度存档
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
      audioService.playSe('tap');
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
      this._scheduleSave();
    },

    /** 清除选中格 */
    onTapClear() {
      const sel = this.data.selected;
      if (!sel) return;
      audioService.playSe('clear');
      service.clearAt(sel.row, sel.col);
      this.setData({ moves: service.getSessionInfo()?.moves ?? 0 });
      this._sync();
      this._scheduleSave();
    },

    /** 切换笔记模式 (数字键盘变为 toggle candidate) */
    onToggleNotesMode() {
      this.setData({ notesMode: !this.data.notesMode });
    },

    /** 撤销 */
    onUndo() {
      audioService.playSe('undo');
      if (service.undo()) {
        this.setData({ moves: service.getSessionInfo()?.moves ?? 0 });
        this._sync();
        this._scheduleSave();
      }
    },

    /** 重做 */
    onRedo() {
      if (service.redo()) {
        this.setData({ moves: service.getSessionInfo()?.moves ?? 0 });
        this._sync();
        this._scheduleSave();
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
      this._scheduleSave();
      this._checkComplete();
    },

    /** 难度切换 (主动换题 = 放弃当前题 → 清其进度再随机新题) */
    onTapDifficulty(e: any) {
      const d = e.currentTarget.dataset.diff as Difficulty | 'daily';
      const oldId = service.getPuzzleId();
      if (oldId) clearSudokuProgress(oldId);
      this._startGame(d);
    },

    /** 完成检测 */
    _checkComplete() {
      const res = service.checkCompletion();
      if (res.complete) {
        this._stopTimer();
        this._clearSaveTimer();
        clearSudokuProgress(service.getPuzzleId() || '');
        this.setData({ complete: true });
        audioService.playSe('complete');
        const info = service.getSessionInfo();
        const modeDesc = this.data._persistEnabled ? '回到选题页挑新题' : '回到选题页换难度';
        wx.showModal({
          title: '🎉 完成!',
          content: `用时 ${this.data.timerText}，步数 ${info?.moves ?? 0}。`,
          confirmText: '再来一局',
          cancelText: '回选题',
          success: (r) => {
            if (r.confirm) {
              // 再来一局: 选题直达题 → 重解同一题 (进度已清); 随机/每日局 → 同难度新随机
              if (this.data._persistEnabled) {
                const id = service.getPuzzleId();
                if (id) {
                  clearSudokuProgress(id);
                  const puzzle = getPuzzleById(id);
                  if (puzzle) {
                    this._launchPuzzle(puzzle);
                    return;
                  }
                }
              }
              this._startGame(this.data.difficulty);
            } else {
              // 回选题: 落盘 (complete 状态自动清档) 后返回选题页
              wx.showToast({ title: modeDesc, icon: 'none' });
              this.onBackMenu();
            }
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

    /** 变更后延迟落盘 (400ms 防抖: 连点只写一次 storage) */
    _scheduleSave() {
      this._clearSaveTimer();
      this.data._saveTimer = setTimeout(() => {
        this._flushSave();
      }, 400);
    },

    _clearSaveTimer() {
      if (this.data._saveTimer) {
        clearTimeout(this.data._saveTimer);
        this.data._saveTimer = 0;
      }
    },

    /** 立即落盘当前会话进度; 通关 / 零操作 / 非直达题 → 清除或不写进度 */
    _flushSave() {
      this._clearSaveTimer();
      const id = service.getPuzzleId();
      if (!id) return;
      if (!this.data._persistEnabled) return;
      if (this.data.complete) {
        clearSudokuProgress(id);
        return;
      }
      const info = service.getSessionInfo();
      if (!info) return;
      if ((info.moves ?? 0) === 0) {
        clearSudokuProgress(id);
        return;
      }
      const cap = service.captureProgress();
      if (!cap) return;
      saveSudokuProgress({
        puzzleId: cap.puzzleId,
        difficulty: cap.difficulty,
        elapsedMs: cap.elapsedMs,
        board: cap.board,
        updatedAt: Date.now(),
      });
    },
  },
});

// components/scenes/picture-scene/picture-scene.ts — 图画谜题场景组件
// 15x15 彩色网格 / 调色板 / 完成检测 / 类别切换 / 上/下/随机导航
// fileKey + puzzleIdx property 支持列表页跳入; 返回 → triggerEvent('back')

import { PictureGameService } from '../../../utils/sudoku/picture_game_service';
import { CellColor } from '../../../utils/sudoku/numclo_puzzles';
import { NUMCLO_ANSWERS } from '../../../utils/sudoku/numclo_answers';
import { audioService } from '../../../utils/audio/audioService';
import {
  isGridEmpty,
  loadCompleted,
  loadProgress,
  saveProgress,
  clearProgress,
  recordCompleted,
} from '../../../utils/sudoku/picture_progress';

/** 自动保存防抖 (ms): 每次涂色后延迟写入 storage, 避免连点刷盘 */
const AUTO_SAVE_MS = 400;
/** 通关庆祝动画时长 (ms) */
const CELEBRATE_MS = 1600;

const GRID = 15;
const TOTAL_CELLS = GRID * GRID;

/**
 * 6 色调色板: 0=擦除(白底), 1..5=画笔色.
 * V0.15 色值改为 DS 原版 NBM palette 真值 (rom-data 直接读 numclo_00.nbm 16 色 palette):
 *   - 1..4 = numclo_00.nbm 按钮色心 idx1-4: 红 #f80000 / 黄 #f8f800 / 蓝 #4868f8 / 绿 #48b048
 *   - 5     = 黑色 #181818 (DS 原版色; 单色剪影题 Cat/Raccoon Dog 验证:
 *             全色 5 题渲染为经典黑白剪影, Fox 等题用 5 做黑描边 + 彩色填充)
 *   - 旧值 #e53935/#fdd835/#1e88e5/#43a047/#8e24aa(紫, V0.10 无 ROM 依据的猜测) 废弃
 */
const PALETTE_HEX = ['#ffffff', '#f80000', '#f8f800', '#4868f8', '#48b048', '#181818'];
const PALETTE_LABELS = ['擦除', '', '', '', '', ''];
/** 边框深色 = numclo_00.nbm 按钮暗边 idx7-10 (红黄蓝绿) + 黑 #606060 (V0.25 起 waku 网格改 CSS 自绘) */
const PALETTE_BORDERS = ['#c8d0d8', '#c00000', '#c8c800', '#000090', '#308830', '#606060'];
/** 15 个类别 (numclo0-9 主题库 + numclo_00-03 附加 + numclo_tu 教程) */
const CATEGORIES: Array<{ key: string; label: string }> = [
  { key: 'numclo0.data', label: '动物' },
  { key: 'numclo1.data', label: '科学' },
  { key: 'numclo2.data', label: '地标' },
  { key: 'numclo3.data', label: '家电' },
  { key: 'numclo4.data', label: '玩具' },
  { key: 'numclo5.data', label: '自然' },
  { key: 'numclo6.data', label: '交通' },
  { key: 'numclo7.data', label: '美食' },
  { key: 'numclo8.data', label: '生活' },
  { key: 'numclo9.data', label: '符号' },
  { key: 'numclo_00.data', label: '附加1' },
  { key: 'numclo_01.data', label: '附加2' },
  { key: 'numclo_02.data', label: '附加3' },
  { key: 'numclo_03.data', label: '附加4' },
  { key: 'numclo_tu.data', label: '教程' },
];

interface PictureCell {
  i: number;       // 展平索引
  r: number;       // 行 0..14
  c: number;       // 列 0..14
  v: number;       // 玩家当前颜色 0..5
  t: number;       // 目标颜色 0..5
  bg: string;      // 背景色 hex
  border: string;  // 边框色 hex
}

/** 行列提示: 某一行/列中某种颜色的总个数 (ナンクロ / Number Cross 风格)。 */
interface ColorCount {
  color: CellColor; // 1..5
  count: number;    // 0..15
  key: number;      // 列内唯一 key (wx:key)
}

/** 统计序列中颜色 1..5 的出现次数, 按颜色顺序返回 5 条提示。 */
function countByColor(seq: number[]): ColorCount[] {
  const hist = [0, 0, 0, 0, 0, 0];
  for (const v of seq) {
    if (v >= 0 && v <= 5) hist[v] += 1;
  }
  return [1, 2, 3, 4, 5].map((c, i) => ({ color: c as CellColor, count: hist[c], key: i }));
}

/**
 * 从目标网格计算 15 行 + 15 列的每色计数。
 * ナンクロ / Number Cross 规则: 提示只告诉每行/列里各颜色共有多少格,
 * 不表示连续段, 与 DS 原版 5×5 块边界布局对应 (V0.25 起 waku 改 CSS 自绘, 见 picture-scene.wxss).
 */
function computeClues(target: CellColor[]): { rows: ColorCount[][]; cols: ColorCount[][] } {
  const rows: ColorCount[][] = [];
  const cols: ColorCount[][] = [];
  for (let r = 0; r < GRID; r++) {
    rows.push(countByColor(target.slice(r * GRID, r * GRID + GRID)));
  }
  for (let c = 0; c < GRID; c++) {
    const col: number[] = [];
    for (let r = 0; r < GRID; r++) col.push(target[r * GRID + c]);
    cols.push(countByColor(col));
  }
  return { rows, cols };
}

const service = new PictureGameService();

Component({
  properties: {
    /** 列表页传入的类别 key (numcloX.data) */
    fileKey: { type: String, value: '' },
    /** 列表页传入的文件内索引 */
    puzzleIdx: { type: Number, value: 0 },
  },

  data: {
    cells: [] as PictureCell[],
    categories: CATEGORIES,
    currentFile: 'numclo0.data',
    puzzleName: '',
    puzzleIndex: 0,      // 文件内索引 0-based
    puzzleCount: 0,
    palette: PALETTE_HEX.map((color, id) => ({
      id,
      color,
      label: PALETTE_LABELS[id],
      border: PALETTE_BORDERS[id],
    })),
    selectedColor: 1 as number,
    timerText: '00:00',
    moves: 0,
    complete: false,
    /** 本题是否已通关 (完成标记: 标题旁 ✓) */
    completed: false,
    /** 通关庆祝动画中 */
    celebrate: false,
    showingAnswer: false,
    correctCount: 0,           // 已正确格数 (进度)
    /** 每色剩余待涂格数 paletteNeed[color] (color 0 恒为 0) */
    paletteNeed: [0, 0, 0, 0, 0, 0],
    rowClues: [] as ColorCount[][],
    colClues: [] as ColorCount[][],
    /** 操作历史栈, 用于撤销 (undo) */
    history: [] as Array<{ i: number; prev: CellColor }>,
    /** 重做栈: undo 弹出的操作, from=撤销后格值, to=撤销前格值 (redo 恢复) */
    redoStack: [] as Array<{ i: number; from: CellColor; to: CellColor }>,
    /** 教程提示图是否被用户关闭 */
    tutorialClosed: false,
    /** TS 私有字段声明 (非渲染数据): attached 状态 + 计时器句柄 */
    _attachedDone: false,
    _timer: 0,
    _saveTimer: 0,
    _celebrateTimer: 0,
  },

  observers: {
    // 运行中 fileKey/puzzleIdx 变化 (页面复用) → 重新开题
    'fileKey, puzzleIdx'(fileKey: string, puzzleIdx: number) {
      if (fileKey && this.data._attachedDone) {
        const key = String(fileKey);
        if (CATEGORIES.some((c) => c.key === key)) {
          this._startPuzzle(key, Number(puzzleIdx || 0));
        }
      }
    },
  },

  lifetimes: {
    attached() {
      this.data._attachedDone = true;
      const key = String(this.data.fileKey || '');
      if (key && CATEGORIES.some((c) => c.key === key)) {
        this._startPuzzle(key, Number(this.data.puzzleIdx || 0));
      } else {
        // 默认打开动物类第 1 题
        this._startPuzzle('numclo0.data', 0);
      }
    },
    detached() {
      this.data._attachedDone = false;
      this._flushSave();
      this._stopTimer();
      this._clearSaveTimer();
      this._clearCelebrateTimer();
    },
  },

  methods: {
    /** 返回主菜单 */
    onBack() {
      audioService.playSe('back');
      this.triggerEvent('back');
    },

    /** 关闭教程提示图 */
    onCloseTutorial() {
      this.setData({ tutorialClosed: true });
      audioService.playSe('tap');
    },

    /** 开一题: fileKey + indexInFile (先落盘上一题进度, 再载入本题/恢复进度) */
    _startPuzzle(fileKey: string, indexInFile: number) {
      // 切题前把上一题当前进度立即落盘 (会话即将被替换) + 取消待弹的庆祝弹窗
      this._flushSave();
      this._clearCelebrateTimer();
      const res = service.startPuzzleInFile(fileKey, indexInFile);
      if (!res.ok) {
        wx.showToast({ title: '题目加载失败', icon: 'none' });
        return;
      }
      const info = service.getPuzzleInfo();
      const answers = NUMCLO_ANSWERS[fileKey] || [];
      const name = info?.name || answers[indexInFile] || '第 ' + (indexInFile + 1) + ' 题';
      const list = service.listFilePuzzleIds(fileKey);
      const target = service.getTarget();
      const clues = computeClues(target);
      const cells: PictureCell[] = [];
      for (let i = 0; i < TOTAL_CELLS; i++) {
        const t = target[i];
        cells.push({
          i,
          r: Math.floor(i / GRID),
          c: i % GRID,
          v: 0,
          t,
          bg: PALETTE_HEX[0],
          border: PALETTE_BORDERS[0],
        });
      }
      // 已通关题目不恢复旧进度 (从空白重涂); 未通关则恢复上次涂色网格
      const done = loadCompleted(fileKey, indexInFile);
      const saved = done ? null : loadProgress(fileKey, indexInFile);
      const hasSaved = !!(saved && !isGridEmpty(saved.grid));
      let moves = 0;
      if (hasSaved && saved) {
        moves = saved.moves || 0;
        service.restoreProgress(saved.grid, moves, saved.elapsedMs || 0);
        for (let i = 0; i < TOTAL_CELLS; i++) {
          const v = saved.grid[i] as CellColor;
          cells[i].v = v;
          cells[i].bg = PALETTE_HEX[v];
          cells[i].border = PALETTE_BORDERS[v];
        }
      }
      const need = this._computeNeed(cells);
      this.setData({
        cells,
        currentFile: fileKey,
        puzzleName: name,
        puzzleIndex: indexInFile,
        puzzleCount: list.length,
        moves,
        complete: false,
        completed: !!done,
        celebrate: false,
        showingAnswer: false,
        correctCount: hasSaved ? TOTAL_CELLS - this._countWrong(cells) : 0,
        paletteNeed: need,
        rowClues: clues.rows,
        colClues: clues.cols,
        history: [],
        redoStack: [],
        tutorialClosed: false,
      });
      this._startTimer();
    },

    /** 类别切换 */
    onTapCategory(e: any) {
      const key = e.currentTarget.dataset.key as string;
      if (key === this.data.currentFile) return;
      audioService.playSe('decide');
      this._startPuzzle(key, 0);
    },

    /** 上一题 */
    onPrev() {
      audioService.playSe('slide');
      const { currentFile, puzzleIndex, puzzleCount } = this.data;
      const idx = (puzzleIndex - 1 + puzzleCount) % puzzleCount;
      this._startPuzzle(currentFile, idx);
    },

    /** 下一题 */
    onNext() {
      audioService.playSe('slide');
      const { currentFile, puzzleIndex, puzzleCount } = this.data;
      const idx = (puzzleIndex + 1) % puzzleCount;
      this._startPuzzle(currentFile, idx);
    },

    /** 随机一题 (当前类别) */
    onRandom() {
      audioService.playSe('slide');
      const { currentFile, puzzleCount } = this.data;
      let idx = Math.floor(Math.random() * puzzleCount);
      if (puzzleCount > 1 && idx === this.data.puzzleIndex) {
        idx = (idx + 1) % puzzleCount;
      }
      this._startPuzzle(currentFile, idx);
    },

    /** 跳转到指定题号 (1..puzzleCount) */
    onJumpTo() {
      const { puzzleCount, puzzleIndex, currentFile } = this.data;
      if (puzzleCount <= 1) {
        wx.showToast({ title: '当前类别只有 1 题', icon: 'none' });
        return;
      }
      audioService.playSe('tap');
      wx.showModal({
        title: `跳转 (1-${puzzleCount})`,
        content: String(puzzleIndex + 1),
        editable: true,
        placeholderText: `输入 1-${puzzleCount}`,
        success: (r) => {
          if (!r.confirm) return;
          const raw = (r.content ?? '').toString().trim();
          const n = parseInt(raw, 10);
          if (!raw || isNaN(n) || n < 1 || n > puzzleCount) {
            wx.showToast({ title: `请输入 1-${puzzleCount}`, icon: 'none' });
            return;
          }
          if (n - 1 === this.data.puzzleIndex) return;
          this._startPuzzle(currentFile, n - 1);
        },
      });
    },

    /** 点格子涂色 */
    onTapCell(e: any) {
      if (this.data.showingAnswer || this.data.complete) return;
      const i = Number(e.currentTarget.dataset.i);
      const color = this.data.selectedColor as CellColor;
      const cells = this.data.cells.slice();
      const cell = cells[i];
      if (!cell) return;
      const prev = cell.v as CellColor;
      // 同一格再点一次当前色 = 擦除
      const next = prev === color ? 0 : color;
      if (prev === next) return;
      service.paint(cell.r, cell.c, next as CellColor);
      cell.v = next;
      cell.bg = PALETTE_HEX[next];
      cell.border = PALETTE_BORDERS[next];
      const history = this.data.history.slice();
      history.push({ i, prev });
      // 新涂色打断 redo 链 (标准编辑行为)
      this.setData({ cells, history, redoStack: [] });
      this._scheduleSave();
      this._updatePaletteNeed(cells);
      audioService.playSe(next === 0 ? 'clear' : 'paint');
      this._checkComplete();
    },

    /** 调色板选色 */
    onTapPalette(e: any) {
      if (this.data.showingAnswer) return;
      const id = Number(e.currentTarget.dataset.id);
      this.setData({ selectedColor: id });
      audioService.playSe('tap');
    },

    /** 显示/隐藏答案 */
    onToggleAnswer() {
      const showing = !this.data.showingAnswer;
      const cells = this.data.cells.slice();
      if (showing) {
        for (const cell of cells) {
          cell.bg = PALETTE_HEX[cell.t];
          cell.border = PALETTE_BORDERS[cell.t];
        }
      } else {
        for (const cell of cells) {
          cell.bg = PALETTE_HEX[cell.v];
          cell.border = PALETTE_BORDERS[cell.v];
        }
      }
      this.setData({ showingAnswer: showing, cells });
    },

    /** 清空画板 (同步 service 会话 + 清除本题进度) */
    onClearAll() {
      if (this.data.showingAnswer || this.data.complete) return;
      audioService.playSe('clear');
      const cells = this.data.cells.slice();
      for (const cell of cells) {
        cell.v = 0;
        cell.bg = PALETTE_HEX[0];
        cell.border = PALETTE_BORDERS[0];
      }
      service.clearGrid();
      this.setData({ cells, moves: 0, history: [], redoStack: [] });
      this._updatePaletteNeed(cells);
      this._flushSave();
    },

    /** 撤销上一步涂色 (被撤项压入重做栈) */
    onUndo() {
      if (this.data.showingAnswer || this.data.complete) return;
      const history = this.data.history.slice();
      const last = history.pop();
      if (!last) {
        wx.showToast({ title: '没有可撤销的操作', icon: 'none' });
        return;
      }
      audioService.playSe('undo');
      const cells = this.data.cells.slice();
      const cell = cells[last.i];
      if (cell) {
        const cur = cell.v as CellColor; // 撤销前格值 → 重做目标
        service.paint(cell.r, cell.c, last.prev);
        cell.v = last.prev;
        cell.bg = PALETTE_HEX[last.prev];
        cell.border = PALETTE_BORDERS[last.prev];
        if (cur !== last.prev) {
          const redoStack = this.data.redoStack.slice();
          redoStack.push({ i: last.i, from: last.prev, to: cur });
          this.setData({ cells, history, redoStack });
        } else {
          this.setData({ cells, history });
        }
      } else {
        this.setData({ history });
      }
      this._scheduleSave();
      this._updatePaletteNeed(cells);
      this._checkComplete();
    },

    /** 重做被撤销的一步涂色 (重做项压回撤销栈) */
    onRedo() {
      if (this.data.showingAnswer || this.data.complete) return;
      const redoStack = this.data.redoStack.slice();
      const entry = redoStack.pop();
      if (!entry) {
        wx.showToast({ title: '没有可重做的操作', icon: 'none' });
        return;
      }
      audioService.playSe('undo');
      const cells = this.data.cells.slice();
      const cell = cells[entry.i];
      const history = this.data.history.slice();
      if (cell) {
        service.paint(cell.r, cell.c, entry.to);
        cell.v = entry.to;
        cell.bg = PALETTE_HEX[entry.to];
        cell.border = PALETTE_BORDERS[entry.to];
        history.push({ i: entry.i, prev: entry.from });
      }
      this.setData({ cells, history, redoStack });
      this._scheduleSave();
      this._updatePaletteNeed(cells);
      this._checkComplete();
    },

    /** 提示 run 颜色 hex (color 0 占位灰) — wxml 表达式调用 */
    clueColor(color: number): string {
      return PALETTE_HEX[color] || '#9aa7b4';
    },

    /** 每色剩余待涂格数: 目标该色总格数 - 已正确涂成该色格数 (0 号色恒为 0) */
    _computeNeed(cells: PictureCell[]): number[] {
      const need = [0, 0, 0, 0, 0, 0];
      for (const cell of cells) {
        const t = cell.t as number;
        if (t >= 1 && t <= 5) need[t] += 1;
      }
      for (const cell of cells) {
        if (cell.v === cell.t && cell.t >= 1 && cell.t <= 5) need[cell.t] -= 1;
      }
      return need;
    },

    /** 当前网格错误格数 (v !== t) */
    _countWrong(cells: PictureCell[]): number {
      let wrong = 0;
      for (const cell of cells) if (cell.v !== cell.t) wrong += 1;
      return wrong;
    },

    /** 刷新调色板剩余计数 (涂色/撤销/清空后调用) */
    _updatePaletteNeed(cells: PictureCell[]) {
      this.setData({ paletteNeed: this._computeNeed(cells) });
    },

    /** 自动保存 (防抖): 每次涂色后 400ms 落盘一次 */
    _scheduleSave() {
      this._clearSaveTimer();
      this.data._saveTimer = setTimeout(() => {
        this._flushSave();
      }, AUTO_SAVE_MS);
    },

    _clearSaveTimer() {
      if (this.data._saveTimer) {
        clearTimeout(this.data._saveTimer);
        this.data._saveTimer = 0;
      }
    },

    /** 立即落盘当前会话进度; complete 状态 → 清除本题进度 (空网格也会被移除) */
    _flushSave() {
      this._clearSaveTimer();
      const session = service.getSession();
      if (!session) return;
      if (this.data.complete) {
        clearProgress(session.file, session.indexInFile);
        return;
      }
      saveProgress(session.file, session.indexInFile, {
        grid: session.grid,
        moves: session.moves,
        elapsedMs: Date.now() - session.startTime,
      });
    },

    _clearCelebrateTimer() {
      if (this.data._celebrateTimer) {
        clearTimeout(this.data._celebrateTimer);
        this.data._celebrateTimer = 0;
      }
    },

    /** 完成检测 (通关 → 记录成绩 + 庆祝动画 → 弹窗询问下一题) */
    _checkComplete() {
      const info = service.getSessionInfo();
      const res = service.checkComplete();
      const session = service.getSession();
      this.setData({ moves: info?.moves ?? 0, correctCount: TOTAL_CELLS - res.wrong });
      if (res.complete) {
        this._stopTimer();
        this._clearSaveTimer();
        if (session) {
          recordCompleted(session.file, session.indexInFile, {
            name: session.name,
            durationMs: Math.max(0, Date.now() - session.startTime),
            moves: session.moves,
          });
          clearProgress(session.file, session.indexInFile);
        }
        const { puzzleName } = this.data;
        this.setData({ complete: true, completed: true, celebrate: true });
        audioService.playSe('complete');
        this._clearCelebrateTimer();
        this.data._celebrateTimer = setTimeout(() => {
          this.setData({ celebrate: false });
          wx.showModal({
            title: '🎉 完成!',
            content: `${puzzleName} 用时 ${this.data.timerText}，${info?.moves ?? 0} 步。下一题?`,
            confirmText: '下一题',
            cancelText: '关闭',
            success: (r) => {
              if (r.confirm) this.onNext();
            },
          });
        }, CELEBRATE_MS);
      }
    },

    /** 计时器 (先立即刷新一次, 再每秒 tick; 恢复进度后计时从上次累计值续走) */
    _startTimer() {
      this._stopTimer();
      const tick = () => {
        const info = service.getSessionInfo();
        if (!info) return;
        const sec = Math.floor(info.elapsedMs / 1000);
        const mm = String(Math.floor(sec / 60)).padStart(2, '0');
        const ss = String(sec % 60).padStart(2, '0');
        this.setData({ timerText: `${mm}:${ss}` });
      };
      tick();
      this.data._timer = setInterval(tick, 1000);
    },

    _stopTimer() {
      if (this.data._timer) {
        clearInterval(this.data._timer);
        this.data._timer = 0;
      }
    },
  },
});

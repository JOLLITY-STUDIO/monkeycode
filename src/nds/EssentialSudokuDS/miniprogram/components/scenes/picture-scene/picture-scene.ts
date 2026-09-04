// components/scenes/picture-scene/picture-scene.ts — 图画谜题场景组件
// 21x21 渲染网格 (15x15 ROM 内容居中, 四周 3 格留白) / 调色板 / 完成检测 / 类别切换 / 上/下/随机导航
// fileKey + puzzleIdx property 支持列表页跳入; 返回 → triggerEvent('back')

import { PictureGameService } from '../../../utils/sudoku/picture_game_service';
import { CellColor, GRID_RENDER, GRID_ROM, PADDING } from '../../../utils/sudoku/numclo_puzzles';
import { NUMCLO_ANSWERS, NUMCLO_ANSWERS_ZH } from '../../../utils/sudoku/numclo_answers';
import {
  NBM_NUMCLO00_COLOR_1_RED,
  NBM_NUMCLO00_COLOR_2_YELLOW,
  NBM_NUMCLO00_COLOR_3_BLUE,
  NBM_NUMCLO00_COLOR_4_GREEN,
  NBM_NUMCLO00_ERASE,
  NBM_NUMCLO00_CLEAR,
} from '../../../utils/sudoku/nbmAssets';
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

const GRID = GRID_RENDER; // 21×21 渲染网格 (内容 15×15 居中, 四周 PADDING=3 格留白)
const TOTAL_CELLS = GRID * GRID;
/** 内容区实际格数 (15×15=225, 排除四周 PADDING 留白) — 进度/通关按内容区计 */
const CONTENT_CELLS = GRID_ROM * GRID_ROM;

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
/** 留白区 (内容区外 PADDING=3 四周边距) 浅灰衬底: DS 原版 numclo_waku 四周灰边, cell=0 空, 不参与涂色 */
const PAD_HEX = '#dfe6ee';
const PAD_BORDER = 'transparent';
/** V0.45.1 恢复 DS 原版 NBM 调色板按钮 (5 画笔色 + 擦除), 不再用纯 CSS 色块.
 *  1=红 / 2=黄 / 3=蓝 / 4=绿, 5=黑 (PALETTE_HEX 索引 1..5). 0=擦除 (用 erase 切片). */
const PALETTE_IMAGES: string[] = [
  NBM_NUMCLO00_ERASE,
  NBM_NUMCLO00_COLOR_1_RED,
  NBM_NUMCLO00_COLOR_2_YELLOW,
  NBM_NUMCLO00_COLOR_3_BLUE,
  NBM_NUMCLO00_COLOR_4_GREEN,
  '', // 5=黑目前没有专用 NBM 切片, 继续用纯色块
];
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
  i: number;       // 展平索引 (0..440, 21×21 渲染网格)
  r: number;       // 行 0..20
  c: number;       // 列 0..20
  v: number;       // 玩家当前颜色 0..5
  t: number;       // 目标颜色 0..5
  bg: string;      // 背景色 hex
  border: string;  // 边框色 hex
  pad: boolean;    // 留白区 (内容区外 3 格边距), 不可涂色 (渲染浅灰衬底)
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
    /** 双语图片信息: 中文名 (来自 NUMCLO_ANSWERS_ZH, 无则回退类别 label) */
    puzzleNameZh: '',
    /** 双语图片信息: 英文名 (来自 NUMCLO_ANSWERS) */
    puzzleNameEn: '',
    puzzleIndex: 0,      // 文件内索引 0-based
    puzzleCount: 0,
    /** DS 原版 NBM 切片 (5 画笔色 + 擦除) — V0.45.1 起恢复 1:1 NBM 调色板按钮, 不用纯 CSS 色块 */
    palette: PALETTE_HEX.map((color, id) => ({
      id,
      color,
      label: PALETTE_LABELS[id],
      border: PALETTE_BORDERS[id],
      imageUrl: PALETTE_IMAGES[id] || '',
    })),
    /** V0.45.1: 清空画板按钮图 (numclo_00.nbm clear 切片) */
    clearImageUrl: NBM_NUMCLO00_CLEAR,
    selectedColor: 1 as number,
    timerText: '00:00',
    moves: 0,
    complete: false,
    /** 本题是否已通关 (完成标记: 标题旁 ✓) */
    completed: false,
    /** 通关庆祝动画中 */
    celebrate: false,
    /** 通关大图快照 (15×15 内容区 225 格, 行主序): {i, v = 真实答案 t (0..5)}.
     *  V0.50 起只取内容区 (去掉 padding), 与 .completed-grid 15/行 CSS 对齐渲染真实答案图. */
    completedWork: [] as Array<{ i: number; v: number }>,
    showingAnswer: false,
    correctCount: 0,           // 已正确内容格数 (进度, 只计 15×15 内容区)
    contentTotal: CONTENT_CELLS, // 内容区总格数 225 (进度分母, 不含 padding)
    /** 每色剩余待涂格数 paletteNeed[color] (color 0 恒为 0) */
    paletteNeed: [0, 0, 0, 0, 0, 0],
    rowClues: [] as ColorCount[][],
    colClues: [] as ColorCount[][],
    /** 操作历史栈, 用于撤销 (undo) */
    history: [] as Array<{ i: number; prev: CellColor }>,
    /** 重做栈: undo 弹出的操作, from=撤销后格值, to=撤销前格值 (redo 恢复) */
    redoStack: [] as Array<{ i: number; from: CellColor; to: CellColor }>,
    /** 图文教程弹层是否打开 (A) */
    tutOpen: false,
    /** 当前教程页 (0-based) */
    tutPage: 0,
    /** 教程是否已看过 (未看过时按钮带红点提示) */
    tutSeen: false,
    /** 教程总页数占位 (仅用于 wxml 页计数/边界判断) */
    tutSteps: [
      { title: '认识对局界面' },
      { title: '提示怎么读' },
      { title: '涂色操作' },
      { title: '常用工具' },
      { title: '完成一幅画' },
    ],
    /** 首次进入引导是否显示 (B) */
    guideVisible: false,
    /** 当前引导步 0..guideSteps.length-1 */
    guideStep: 0,
    /** 引导步骤定义 (高亮目标 selector + 文案) */
    guideSteps: [
      {
        sel: '.puzzle-area',
        title: '认识提示区',
        desc: '顶部和左侧的彩色小方块 + 数字，告诉你每一行/每一列里各种颜色各有几格。先看懂它，再动手涂。',
      },
      {
        sel: '.palette',
        title: '选色 → 涂色',
        desc: '先点下方色块选中颜色（色块下的小数字 = 该色还剩几格），再点画板格子涂上去。再点一次同色格子可以擦除。',
      },
      {
        sel: '.tool-row',
        title: '常用工具',
        desc: '涂错了用「撤销」退一步；想重来点「清空」；实在卡住可以「显示答案」再隐藏，不扣分。',
      },
    ],
    /** 高亮框 rect (px, 相对视口), 未定位时为 0 → 全遮 fallback */
    guideRectTop: 0,
    guideRectLeft: 0,
    guideRectRight: 0,
    guideRectBottom: 0,
    guideRectW: 0,
    guideRectH: 0,
    /** 顶部遮罩高度 (= target.top) */
    guideDimTop: 0,
    /** 高亮框箭头方向 ('up'=▲ 指向上方目标 / 'down'=▼ / 'none'=隐藏) */
    guideArrow: 'up',
    /** 箭头相对高亮框的位置 ('above'=框上方 / 'below'=框下方) */
    guideArrowPos: 'below',
    /** TS 私有字段声明 (非渲染数据): attached 状态 + 计时器句柄 */
    _attachedDone: false,
    _timer: 0,
    _saveTimer: 0,
    _celebrateTimer: 0,
    _guideChecked: false,
    _guideTimer: 0,
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
      // 读教程已读标记 (未读时教程按钮带红点)
      let seen = false;
      try {
        seen = wx.getStorageSync('esds_pic_tut_seen') === 1;
      } catch (_e) { /* ignore */ }
      this.setData({ tutSeen: seen });
      // 首次进入玩法 → 高亮引导
      this._maybeShowGuide();
    },
    detached() {
      this.data._attachedDone = false;
      this._flushSave();
      this._stopTimer();
      this._clearSaveTimer();
      this._clearCelebrateTimer();
      this._clearGuideTimer();
      this.setData({ guideVisible: false, tutOpen: false });
    },
  },

  methods: {
    /** 返回 (按 pictureOrigin 路由: 类别列表 pictList / 子模式页 pictureMode, 由 index 决定) */
    onBack() {
      audioService.playSe('back');
      this.triggerEvent('back');
    },

    /** 打开图文教程弹层 (A); 未看过则标记已读 (红点消失) */
    onOpenTutorial() {
      if (!this.data._attachedDone) return;
      audioService.playSe('windopen');
      this.setData({ tutOpen: true, tutPage: 0 });
      if (!this.data.tutSeen) {
        this.setData({ tutSeen: true });
        try {
          wx.setStorageSync('esds_pic_tut_seen', 1);
        } catch (_e) { /* ignore */ }
      }
    },

    /** 关闭图文教程弹层 (× / 最后一页的「开始涂色」/ 跳过) */
    onCloseTutorial() {
      if (!this.data._attachedDone) return;
      audioService.playSe('windclose');
      this.setData({ tutOpen: false });
    },

    /** 教程下一页 */
    onTutNext() {
      if (!this.data._attachedDone) return;
      const total = this.data.tutSteps.length;
      const page = Math.min(this.data.tutPage + 1, total - 1);
      audioService.playSe('slide');
      this.setData({ tutPage: page });
    },

    /** 教程上一页 */
    onTutPrev() {
      if (!this.data._attachedDone) return;
      audioService.playSe('slide');
      this.setData({ tutPage: Math.max(0, this.data.tutPage - 1) });
    },

    /** 跳过图文教程 (已打开即视为看过, 标记在 onOpenTutorial 里完成) */
    onTutSkip() {
      this.onCloseTutorial();
    },

    /* ============ 首次进入引导 (B) ============ */

    /** 首次进入玩法时检查并启动引导 (storage: esds_pic_guide_done) */
    _maybeShowGuide() {
      if (this.data._guideChecked) return;
      this.data._guideChecked = true;
      let done = false;
      try {
        done = wx.getStorageSync('esds_pic_guide_done') === 1;
      } catch (_e) { /* ignore */ }
      if (done) return;
      // 等首题 setData 渲染 + 场景转场稳定后再定位目标
      this._clearGuideTimer();
      this.data._guideTimer = setTimeout(() => {
        if (!this.data._attachedDone) return;
        this.setData({ guideVisible: true, guideStep: 0 });
        this._locateGuideStep(0);
      }, 350);
    },

    _clearGuideTimer() {
      if (this.data._guideTimer) {
        clearTimeout(this.data._guideTimer);
        this.data._guideTimer = 0;
      }
    },

    /** 定位第 step 步高亮目标 rect (组件内 selectorQuery); 失败 → 整屏遮罩 fallback */
    _locateGuideStep(step: number) {
      const def = this.data.guideSteps[step];
      if (!def || !this.data._attachedDone) return;
      const done = (rect: any) => {
        if (!this.data._attachedDone) return;
        if (rect && rect.width > 0 && rect.height > 0) {
          // 目标在屏幕上方 → 箭头放框下方指上; 否则放框上方指下
          const pos = rect.top > 300 ? 'above' : 'below';
          this.setData({
            guideRectTop: rect.top,
            guideRectLeft: rect.left,
            guideRectRight: rect.right,
            guideRectBottom: rect.bottom,
            guideRectW: rect.width,
            guideRectH: rect.height,
            guideDimTop: rect.top,
            guideArrow: pos === 'above' ? 'down' : 'up',
            guideArrowPos: pos,
          });
        } else {
          // fallback: rect 全 0 → 高亮框隐藏, 四块 dim 拼成整屏遮罩 (仅底部卡可见)
          this.setData({
            guideRectTop: 0,
            guideRectLeft: 0,
            guideRectRight: 0,
            guideRectBottom: 0,
            guideRectW: 0,
            guideRectH: 0,
            guideDimTop: 0,
            guideArrow: 'none',
            guideArrowPos: 'below',
          });
        }
      };
      try {
        wx.createSelectorQuery()
          .in(this)
          .select(def.sel)
          .boundingClientRect(done)
          .exec();
      } catch (_e) {
        done(null);
      }
    },

    /** 引导下一步; 走完最后一步 → 结束 */
    onGuideNext() {
      if (!this.data._attachedDone) return;
      audioService.playSe('tap');
      const next = this.data.guideStep + 1;
      if (next >= this.data.guideSteps.length) {
        this._finishGuide();
        return;
      }
      this.setData({ guideStep: next });
      this._locateGuideStep(next);
    },

    /** 引导上一步 */
    onGuidePrev() {
      if (!this.data._attachedDone) return;
      audioService.playSe('slide');
      const prev = Math.max(0, this.data.guideStep - 1);
      this.setData({ guideStep: prev });
      this._locateGuideStep(prev);
    },

    /** 跳过引导 */
    onGuideSkip() {
      if (!this.data._attachedDone) return;
      audioService.playSe('back');
      this._finishGuide();
    },

    /** 结束引导 (不再自动弹出) */
    _finishGuide() {
      this.setData({ guideVisible: false });
      try {
        wx.setStorageSync('esds_pic_guide_done', 1);
      } catch (_e) { /* ignore */ }
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
      const enName = info?.name || answers[indexInFile] || '';
      const name = enName || '第 ' + (indexInFile + 1) + ' 题';
      // 双语图片信息: zh = NUMCLO_ANSWERS_ZH 中文名 (无则回退类别 label), en = ROM 英文名
      const resolved = this._resolveName(fileKey, indexInFile, enName);
      const list = service.listFilePuzzleIds(fileKey);
      const target = service.getTarget();
      const clues = computeClues(target);
      const cells: PictureCell[] = [];
      for (let i = 0; i < TOTAL_CELLS; i++) {
        const t = target[i];
        const r = Math.floor(i / GRID);
        const c = i % GRID;
        // 内容区 (15×15) 外的四周 PADDING 格 = 留白衬底, 不可涂色
        const pad = r < PADDING || r >= PADDING + GRID_ROM || c < PADDING || c >= PADDING + GRID_ROM;
        cells.push({
          i,
          r,
          c,
          v: 0,
          t,
          pad,
          bg: pad ? PAD_HEX : PALETTE_HEX[0],
          border: pad ? PAD_BORDER : PALETTE_BORDERS[0],
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
          if (cells[i].pad) {
            cells[i].bg = PAD_HEX;
            cells[i].border = PAD_BORDER;
          } else {
            cells[i].bg = PALETTE_HEX[v];
            cells[i].border = PALETTE_BORDERS[v];
          }
        }
      }
      const need = this._computeNeed(cells);
      this.setData({
        cells,
        currentFile: fileKey,
        puzzleName: name,
        /** V0.50: 双语图片信息 — 中文名 (NUMCLO_ANSWERS_ZH; 无翻译回退类别 label 如「动物」) */
        puzzleNameZh: resolved.zh,
        /** V0.50: 双语图片信息 — 英文名 (ROM numclo_seikai 名) */
        puzzleNameEn: resolved.en,
        puzzleIndex: indexInFile,
        puzzleCount: list.length,
        moves,
        complete: false,
        completed: !!done,
        celebrate: false,
        /** PICTURE-V0.47: 切题时清空上一题通关作品快照 */
        completedWork: [],
        showingAnswer: false,
        correctCount: hasSaved ? CONTENT_CELLS - this._countWrong(cells) : 0,
        paletteNeed: need,
        rowClues: clues.rows,
        colClues: clues.cols,
        history: [],
        redoStack: [],
      });
      this._startTimer();
    },

    /** 类别切换 */
    onTapCategory(e: any) {
      const key = e.currentTarget.dataset.key as string;
      if (key === this.data.currentFile) return;
      audioService.playSe('start');
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
      if (!cell || cell.pad) return;
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
          if (cell.pad) {
            cell.bg = PAD_HEX;
            cell.border = PAD_BORDER;
          } else {
            cell.bg = PALETTE_HEX[cell.t];
            cell.border = PALETTE_BORDERS[cell.t];
          }
        }
      } else {
        for (const cell of cells) {
          if (cell.pad) {
            cell.bg = PAD_HEX;
            cell.border = PAD_BORDER;
          } else {
            cell.bg = PALETTE_HEX[cell.v];
            cell.border = PALETTE_BORDERS[cell.v];
          }
        }
      }
      this.setData({ showingAnswer: showing, cells });
      audioService.playSe(showing ? 'windopen' : 'windclose');
    },

    /** 清空画板 (同步 service 会话 + 清除本题进度) */
    onClearAll() {
      if (this.data.showingAnswer || this.data.complete) return;
      audioService.playSe('clear');
      const cells = this.data.cells.slice();
      for (const cell of cells) {
        cell.v = 0;
        cell.bg = cell.pad ? PAD_HEX : PALETTE_HEX[0];
        cell.border = cell.pad ? PAD_BORDER : PALETTE_BORDERS[0];
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

    /** PICTURE-V0.47: completed-grid 单元背景色 (玩家涂色 v → PALETTE_HEX hex) */
    completedColor(v: number): string {
      return PALETTE_HEX[v] || '#9aa7b4';
    },

    /** 提示 band 文字色 class — 黄色块用黑字 (cb-yellow) 避免糊, 其余沿用 .clue-band 默认白字 */
    clueTextClass(color: number): string {
      return color === 2 ? ' cb-yellow' : '';
    },

    /** 类别中文 label (CATEGORIES 查找; 找不到回退空串) */
    _categoryLabel(fileKey: string): string {
      const cat = CATEGORIES.find((c) => c.key === fileKey);
      return cat ? cat.label : '';
    },

    /** 解析双语图片信息: { zh, en }.
     *  en = ROM 英文名 (NUMCLO_ANSWERS 或 info.name);
     *  zh = NUMCLO_ANSWERS_ZH 中文名, 无则回退类别 label (仍保持双语展示, 不空白). */
    _resolveName(fileKey: string, indexInFile: number, en: string): { zh: string; en: string } {
      const zhArr = NUMCLO_ANSWERS_ZH[fileKey];
      const zh = (zhArr && zhArr[indexInFile]) || this._categoryLabel(fileKey);
      return { zh: zh || en || '', en: en || '' };
    },

    /** 通关大图预览数据: 只取 15×15 内容区 (去掉四周 PADDING 留白), 行主序 225 格,
     *  颜色取目标色 t (= 通关瞬间真实答案, 与玩家涂色一致). 与 .completed-grid 15/行对齐. */
    _snapshotContentWork(): Array<{ i: number; v: number }> {
      const out: Array<{ i: number; v: number }> = [];
      for (let r = PADDING; r < PADDING + GRID_ROM; r++) {
        for (let c = PADDING; c < PADDING + GRID_ROM; c++) {
          const cell = this.data.cells[r * GRID + c];
          out.push({ i: out.length, v: cell ? (cell.t as number) : 0 });
        }
      }
      return out;
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
      this.setData({ moves: info?.moves ?? 0, correctCount: CONTENT_CELLS - res.wrong });
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
        const { puzzleName, puzzleNameZh, puzzleNameEn } = this.data;
        /** 通关大图: 真实答案 (target t) 15×15 内容区快照, 不再含 padding → celebrate-panel 正确 15 列对齐 */
        const completedWork = this._snapshotContentWork();
        this.setData({ complete: true, completed: true, celebrate: true, completedWork });
        audioService.playSe('complete');
        this._clearCelebrateTimer();
        this.data._celebrateTimer = setTimeout(() => {
          this.setData({ celebrate: false });
          const nameLine = puzzleNameZh || puzzleName;
          const enLine = puzzleNameEn && puzzleNameEn !== puzzleNameZh ? ` (${puzzleNameEn})` : '';
          wx.showModal({
            title: '🎉 完成!',
            content: `${nameLine}${enLine} 用时 ${this.data.timerText}，${info?.moves ?? 0} 步。下一题?`,
            confirmText: '下一题',
            cancelText: '返回',
            success: (r) => {
              if (r.confirm) {
                this.onNext();
              } else {
                // 返回进入对局前的页面 (类别列表 / 子模式选择, 由 index 按 pictureOrigin 路由)
                this.onBack();
              }
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

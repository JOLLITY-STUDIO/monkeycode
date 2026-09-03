// components/scenes/title-scene/title-scene.ts — 启动标题场景组件
// V0.42 极简封面 (贴合 DS 原版视觉):
//   - 深色底 + 满屏散落数字背景 (bgNums, 半透明大字 1-9 微旋转)
//   - 中央 9×9 数独网格 (3×3 宫粗线内嵌), 格内填数字,
//     9 宫各点缀 1 个 6 色实色方块+白数字 (呼应图画谜题 6 色)
//   - 底部 Press START 脉冲按钮 + 两行版权
//   点击 → triggerEvent('start') → index _switchScene('menu')

import { audioService } from '../../../utils/audio/audioService';

/* ---------------- 中央数独: 一个完整 9×9 解 ---------------- */
const SUDOKU_SOLUTION: number[][] = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

/* 每宫一个彩色方块格 (r, c) — 呼应图画谜题 6 色调色板 */
const CELL_POP: Array<[number, number]> = [
  [0, 0], [0, 5], [1, 8],
  [3, 2], [4, 4], [5, 6],
  [7, 0], [7, 4], [8, 8],
];
/* 6 色调色板 (与 picture-scene PALETTE_HEX 视觉同源) */
const POP_COLORS = [
  '#e8503a', '#f0a020', '#e6c521', '#3fae5a', '#2e9fd8', '#7a5cc8', '#d84a8c',
];

/* ---------------- 背景散落数字 (确定性生成 22 个) ---------------- */
interface BgNum {
  i: number;
  n: string;
  x: number; // %
  y: number; // %
  size: number; // px
  rot: number; // deg
  o: number; // opacity 0.05-0.16
  c: string;
}
const BG_COLORS = ['#ffffff', '#9fd0ff', '#ffe08a', '#ff9f8a', '#b3f0a8', '#d6b3ff'];

function buildBgNums(): BgNum[] {
  const arr: BgNum[] = [];
  let seed = 20260903;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < 22; i++) {
    arr.push({
      i,
      n: String(1 + Math.floor(rnd() * 9)),
      x: Math.round(2 + rnd() * 92),
      y: Math.round(2 + rnd() * 92),
      size: Math.round(30 + rnd() * 48),
      rot: Math.round(rnd() * 44 - 22),
      o: 0.05 + rnd() * 0.12,
      c: BG_COLORS[Math.floor(rnd() * BG_COLORS.length)],
    });
  }
  return arr;
}

interface SudokuCell {
  i: number;
  n: string;
  pop: boolean;
  cc: string;
}

Component({
  options: { virtualHost: false },
  data: {
    pulse: false,
    /** 背景散落数字 */
    bgNums: [] as BgNum[],
    /** 81 个数独单元格 (完整解) */
    sudokuCells: [] as SudokuCell[],
    /** TS 私有字段声明 (非渲染数据) */
    _pulseTimer: 0 as number,
  },

  lifetimes: {
    attached() {
      // 背景散落数字
      const bgNums = buildBgNums();

      // 81 格: 全部填入数字, 指定格上 6 色方块 (白数字)
      const popSet = new Set(CELL_POP.map(([r, c]) => r * 9 + c));
      const sudokuCells: SudokuCell[] = [];
      let popIdx = 0;
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          const i = r * 9 + c;
          const isPop = popSet.has(i);
          sudokuCells.push({
            i,
            n: String(SUDOKU_SOLUTION[r][c]),
            pop: isPop,
            cc: isPop ? POP_COLORS[popIdx++ % POP_COLORS.length] : '',
          });
        }
      }

      this.setData({ bgNums, sudokuCells });
      this.data._pulseTimer = setTimeout(() => {
        this.setData({ pulse: true });
      }, 1000);
    },
    detached() {
      if (this.data._pulseTimer) {
        clearTimeout(this.data._pulseTimer);
        this.data._pulseTimer = 0;
      }
    },
  },

  methods: {
    /** 点击任意处 → 通知页面进入主菜单 */
    onTapStart() {
      try {
        audioService.playSe('start');
      } catch (_e) {
        // 音频异常不阻断跳转
      }
      console.log('[title-scene] onTapStart -> trigger start');
      this.triggerEvent('start');
    },
  },
});

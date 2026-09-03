// components/scenes/title-scene/title-scene.ts — 启动标题场景组件
// V0.44 封面透明化 (视觉背景交给全局 bg-fx 糖果动态背景):
//   - bg-fx 负责背景层: 浅色糖果渐变 + 满屏漂浮大数字 1-9 (number 玩法)
//                       + 3×3/4×4/5×5/6×6 小网格方块 (picture 玩法) + 呼吸柔光
//   - title-scene 只保留前景: 品牌标题 + 中央 9×9 数独大网格 (3×3 宫内嵌 3×3)
//                            + Press START + 版权两行 (背景透明, bg-fx 透出)
//   点击 → triggerEvent('start') → index _switchScene('menu')

import { audioService } from '../../../utils/audio/audioService';

/* ---------------- 中央 9×9 数独: 一个完整合法解 ---------------- */
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

/* 每宫一个糖果格 (r, c) — 呼应图画谜题 6 色调色板 */
const CELL_POP: Array<[number, number]> = [
  [0, 0], [0, 5], [1, 8],
  [3, 2], [4, 4], [5, 6],
  [7, 0], [7, 4], [8, 8],
];

/* 6 色糖果调色板 (跟 picture-scene PALETTE / bg-fx CANDY 同源) */
const CANDY = [
  '#ff6b81', '#ff9f43', '#ffd93d', '#6bcb77', '#4d96ff', '#b66ce5',
];

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
    /** 81 个数独单元格 (完整解) */
    sudokuCells: [] as SudokuCell[],
    /** TS 私有字段声明 (非渲染数据) */
    _pulseTimer: 0 as number,
  },

  lifetimes: {
    attached() {
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
            cc: isPop ? CANDY[popIdx++ % CANDY.length] : '',
          });
        }
      }
      this.setData({ sudokuCells });
      this.data._pulseTimer = setTimeout(() => {
        this.setData({ pulse: true });
      }, 600);
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

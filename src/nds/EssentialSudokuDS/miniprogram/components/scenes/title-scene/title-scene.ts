// components/scenes/title-scene/title-scene.ts — 启动标题场景组件
// V0.37 纯 WXML/CSS 封面 (替代 V0.36 Canvas 自绘, 因 Skyline 开发者工具暂不支持
//   canvas type="2d" 调试, 真机才可见 — devtools 里整张封面一片黑)。
//   - 暗夜书桌暖色 (深夜蓝紫 → 暖琥珀), 保留"思考"主题
//   - 中央双谜题预览 (9×9 数独 + 6×6 图画谜题) 用 view 矩阵画, 真机/devtools 一致
//   - 顶部主标题 + 副标题 + 英文小字
//   - 底部"点击开始"脉冲提示
//   点击 → triggerEvent('start') → index _switchScene('menu') (无页面跳转)

import { audioService } from '../../../utils/audio/audioService';

/* ---------------- 数独 9×9 预览数据 ---------------- */
// 用户已填的色块 (无数字, 暖金/冷蓝两色表达用户笔触)
const SUDOKU_FILLED: Array<[number, number, string]> = [
  [1, 2, '#f5d27a'], [1, 5, '#7fc8ff'], [1, 6, '#f5d27a'],
  [2, 0, '#7fc8ff'], [2, 2, '#f5d27a'], [2, 8, '#f5d27a'],
  [3, 5, '#7fc8ff'], [3, 7, '#f5d27a'],
  [4, 4, '#f5d27a'], [4, 7, '#7fc8ff'],
  [5, 5, '#f5d27a'],
  [6, 0, '#f5d27a'], [6, 2, '#7fc8ff'], [6, 8, '#f5d27a'],
  [7, 0, '#f5d27a'], [7, 7, '#7fc8ff'],
  [8, 0, '#7fc8ff'], [8, 1, '#f5d27a'], [8, 5, '#f5d27a'],
];
// 给定数字 (题面已有, 暖金色显示)
const SUDOKU_GIVEN: Array<[number, number, number]> = [
  [0, 0, 5], [0, 1, 3], [0, 4, 7],
  [1, 0, 6], [1, 3, 1], [1, 4, 5],
  [2, 1, 9], [2, 4, 8], [2, 7, 6],
  [3, 1, 8], [3, 4, 6], [3, 8, 2],
  [4, 0, 1], [4, 8, 3],
  [5, 0, 8], [5, 3, 6], [5, 4, 3], [5, 8, 7],
  [6, 1, 6], [6, 4, 2], [6, 7, 9],
  [7, 4, 1], [7, 5, 9], [7, 8, 5],
  [8, 4, 4], [8, 7, 7], [8, 8, 9],
];

/* ---------------- 图画谜题 6×6 预览数据 ---------------- */
// 已填格子 = 形似小猫头 (22/36 填充, 留白呈现轮廓)
const PICTURE_FILLED = new Set([
  '1_0', '1_1', '1_2', '1_3', '1_4', '1_5',
  '2_0', '2_1', '2_4', '2_5',
  '3_0', '3_2', '3_3', '3_5',
  '4_0', '4_1', '4_3', '4_4', '4_5',
  '5_0', '5_1', '5_5',
]);

interface SudokuCell {
  i: number;
  r: number;
  c: number;
  kind: 'given' | 'filled' | 'empty';
  n?: string;
  c?: string;
}

interface PictureCell {
  i: number;
  r: number;
  c: number;
  filled: boolean;
}

Component({
  options: { virtualHost: false },
  data: {
    pulse: false,
    /** 81 个数独单元格 (按行扫描, i = r*9+c) */
    sudokuCells: [] as SudokuCell[],
    /** 36 个图画谜题单元格 (按行扫描, i = r*6+c) */
    pictureCells: [] as PictureCell[],
    /** TS 私有字段声明 (非渲染数据) */
    _pulseTimer: 0 as number,
  },

  lifetimes: {
    attached() {
      // 预算数独 + 图画谜题单元 (性能: 81+36 = 117 个固定数组, 不触发响应式)
      const sudokuCells: SudokuCell[] = [];
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          sudokuCells.push({ i: r * 9 + c, r, c, kind: 'empty' });
        }
      }
      for (const [r, c, color] of SUDOKU_FILLED) {
        sudokuCells[r * 9 + c] = { i: r * 9 + c, r, c, kind: 'filled', c: color };
      }
      for (const [r, c, n] of SUDOKU_GIVEN) {
        // 给定数字覆盖填充色 (题面优先)
        sudokuCells[r * 9 + c] = {
          i: r * 9 + c, r, c, kind: 'given', n: String(n),
        };
      }

      const pictureCells: PictureCell[] = [];
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 6; c++) {
          pictureCells.push({ i: r * 6 + c, r, c, filled: false });
        }
      }
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 6; c++) {
          pictureCells[r * 6 + c].filled = PICTURE_FILLED.has(`${r}_${c}`);
        }
      }

      this.setData({ sudokuCells, pictureCells });
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
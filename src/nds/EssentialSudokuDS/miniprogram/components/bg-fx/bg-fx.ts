/* components/bg-fx/bg-fx.ts
 * 全局动态背景层 (Playful Sudoku, V0.47): 欢快糖果风
 * 由 pages/index/index 放置在 .scene-area 第一层 (z-index 0),
 * 场景 (z-index 1/2) 浮在其上, 场景根背景已设为 transparent。
 *
 * 结构 (从后到前 5 层):
 *   1. .fx-base       糖果渐变底 (粉 → 暖黄 → 天蓝 → 薄荷) + 4 团彩色柔光
 *   2. 远景 band-distal : 满屏漂浮大数字 1-9 (糖果 6 色), 最慢横滚 (~90s),
 *                        V0.47 加密到 48 个铺满
 *   3. 中景 band-grids  : 3×3 / 4×4 / 5×5 / 6×6 小网格方块
 *                        (代表"图画谜题"玩法, 若干小格已填糖果色), 中速横滚 (~60s),
 *                        V0.47 加密到 20 件铺满
 *   4. 近景 band-thought: 彩色柔光点 (6 色淡光, 慢飘 + 闪烁), 最快横滚 (~30s)
 *   5. .fx-beat       顶部暖白呼吸光晕 (周期 = pulseMs, 平缓不闪)
 *
 * 无缝循环实现: 每个横滚层 = .roll (width:200%) 内两个相同 .seg,
 *   roll 动画 translateX 0 → -50% (= 恰好一个 seg 宽度), 循环无缝。
 *   层上再包一层 .bob 做缓慢上下浮动 → 斜向走动感。
 * 全部纯 CSS 绘制 (数字 + 网格线), skyline 兼容良好, 不依赖任何图片。
 * 全项目禁用 rpx, 一律 px。
 */

/* ---------------- 6 色糖果调色板 (跟 picture-scene PALETTE 同源) ---------------- */
const CANDY = [
  '#ff6b81', // 草莓红
  '#ff9f43', // 蜜橙
  '#ffd93d', // 柠檬黄
  '#6bcb77', // 薄荷绿
  '#4d96ff', // 天蓝
  '#b66ce5', // 葡萄紫
];

interface FloatNum {
  i: number;
  x: number; // %
  y: number; // %
  n: string;
  s: number; // font px
  r: number; // rot deg
  o: number; // opacity
  c: string;
}
function buildBigNums(): FloatNum[] {
  const arr: FloatNum[] = [];
  let seed = 20260904;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  // V0.47 加密: 48 个/屏, 满铺 1-99%
  for (let i = 0; i < 48; i++) {
    arr.push({
      i,
      x: Math.round(1 + rnd() * 98),
      y: Math.round(2 + rnd() * 92),
      n: String(1 + Math.floor(rnd() * 9)),
      s: Math.round(28 + rnd() * 48), // 28-76
      r: Math.round(rnd() * 40 - 20),
      o: 0.45 + rnd() * 0.3, // 0.45-0.75
      c: CANDY[Math.floor(rnd() * CANDY.length)],
    });
  }
  return arr;
}

/* ---------------- 中景: 小网格方块 (图画谜题玩法代表) ---------------- */
interface MiniCell {
  f: number; // 1 = 已填糖果色
  l: number; // left %
  t: number; // top %
}
interface MiniGrid {
  i: number;
  x: number; // %  (左上)
  y: number; // %
  size: number; // px 整块
  n: number;     // 每边格数 3-6
  rot: number;   // deg
  o: number;     // opacity
  c: string;     // 线色
  cells: MiniCell[];
}
function buildMiniGrids(): MiniGrid[] {
  // V0.47 加密到 20 件, 满铺 -4..96% 区域
  // [x, y, size, n, rot]
  const seeds: Array<[number, number, number, number, number]> = [
    [3, 8, 92, 3, -8],
    [72, 4, 76, 4, 6],
    [14, 24, 62, 3, 12],
    [84, 26, 88, 5, 10],
    [4, 46, 100, 4, -5],
    [86, 54, 74, 6, -10],
    [6, 74, 86, 5, 8],
    [22, 88, 68, 4, -6],
    [66, 82, 96, 6, 10],
    [40, 12, 64, 3, 12],
    [52, 48, 54, 3, -12],
    [56, 66, 60, 4, 6],
    // V0.47 新增 8 件, 填缝隙
    [-2, 30, 70, 4, 6],
    [94, 38, 64, 3, -8],
    [28, 56, 56, 5, 10],
    [76, 14, 50, 3, -10],
    [-4, 60, 78, 6, 8],
    [90, 70, 58, 4, -12],
    [34, 78, 50, 5, 6],
    [62, 4, 48, 4, -10],
  ];
  return seeds.map((s, i) => {
    const n = s[3];
    const c = CANDY[i % CANDY.length];
    const cellPct = 100 / n;
    const cellTotal = n * n;
    const cells: MiniCell[] = [];
    // 约 1/4 格子填色 (图画谜题"已着色"观感), 位置确定性错开
    const fillCount = Math.max(2, Math.round(cellTotal / 4));
    for (let k = 0; k < cellTotal; k++) {
      const r = Math.floor(k / n);
      const col = k % n;
      cells.push({
        f: k % (fillCount + 1) === 0 ? 1 : 0,
        l: Math.round(col * cellPct * 100) / 100,
        t: Math.round(r * cellPct * 100) / 100,
      });
    }
    return {
      i,
      x: s[0],
      y: s[1],
      size: s[2],
      n,
      rot: s[4],
      o: 0.22 + (i % 5) * 0.05, // 0.22-0.42 (V0.47 件数多, 透明度略降避免堆叠抢戏)
      c,
      cells,
    };
  });
}

/* ---------------- 近景: 彩色柔光点 ---------------- */
interface Thought {
  i: number;
  x: number;
  y: number;
  s: number; // px
  o: number;
  c: string; // 光色
}
function buildThoughts(): Thought[] {
  let seed = 77777;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const arr: Thought[] = [];
  for (let i = 0; i < 18; i++) {
    arr.push({
      i,
      x: Math.round(2 + rnd() * 94),
      y: Math.round(3 + rnd() * 90),
      s: Math.round(10 + rnd() * 18),
      o: 0.55 + rnd() * 0.35,
      c: CANDY[Math.floor(rnd() * CANDY.length)],
    });
  }
  return arr;
}

Component({
  options: { virtualHost: true, multipleSlots: false },
  properties: {
    /** 当前场景 BGM 小节毫秒 (呼吸光动画周期, 平缓不闪)。 */
    pulseMs: { type: Number, value: 2600 },
  },
  data: {
    segs: [0, 1] as number[],

    /* 远景: 满屏大数字 1-9 (糖果 6 色, V0.47 加密 48 个) */
    bigNums: [] as FloatNum[],

    /* 中景: 小网格方块 (图画谜题玩法代表, V0.47 加密 20 件铺满) */
    miniGrids: [] as MiniGrid[],

    /* 近景: 彩色柔光点 */
    thoughts: [] as Thought[],
  },

  lifetimes: {
    attached() {
      // 确定性生成 (多次进入保持一致视觉)
      const bigNums = buildBigNums();
      const miniGrids = buildMiniGrids();
      const thoughts = buildThoughts();
      this.setData({ bigNums, miniGrids, thoughts });
    },
  },
});

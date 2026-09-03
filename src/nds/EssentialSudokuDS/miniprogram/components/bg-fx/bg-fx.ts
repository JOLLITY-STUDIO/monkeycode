/* components/bg-fx/bg-fx.ts
 * 全局动态背景层 (Playful Sudoku, V0.49.3): 欢快糖果风 + 景深 + 数独格纸真实 view
 * 由 pages/index/index 放置在 .scene-area 第一层 (z-index 0),
 * 场景 (z-index 1/2) 浮在其上, 场景根背景已设为 transparent。
 *
 * 结构 (从后到前 6 层) + V0.49.3 景深 + 数独格纸:
 *   1. .fx-base       糖果渐变底 (粉 → 暖黄 → 天蓝 → 薄荷) + 4 团彩色柔光
 *   2. .fx-grid       V0.49.3 整屏平铺数独格纸, 真实 view 阵列
 *                       (V0.49.2 的 repeating-linear-gradient 在 Skyline 1.4.21
 *                        完全静默不渲染, V0.49.3 改用 ts 算每条线 px 位置,
 *                        wxml wx:for 渲染 N 条 1px/2px 实线 view, 兼容 Skyline)
 *                       细格: 24px 周期, 1px 深紫 #562e87 alpha 0.55
 *                       宫粗: 72px 周期 (3 × 24), 2px 深粉 #be4682 alpha 0.78
 *   3. 远景 band-distal : V0.49.2 深紫/深蓝调色板大数字 (alpha 0.40-0.55, 远而虚),
 *                        4 方向深紫描边 + 浅色顶部高光, size 32-88 (远处更大)
 *   4. 中景 band-grids  : 糖果色小网格方块 (alpha 0.55-0.76, 近而实),
 *                        深色 box-shadow + 白色内边框 = 在网格纸上"浮起"
 *   5. 近景 band-thought: 高亮柔光点 (alpha 0.80-1.00 + 双层 box-shadow 光晕, 最近最亮)
 *   6. .fx-beat       顶部暖白呼吸光晕 (周期 = pulseMs, 平缓不闪)
 *
 * 无缝循环实现: 每个横滚层 = .roll (width:200%) 内两个相同 .seg,
 *   roll 动画 translateX 0 → -50% (= 恰好一个 seg 宽度), 循环无缝。
 *   层上再包一层 .bob 做缓慢上下浮动 → 斜向走动感。
 * 全部纯 CSS + 真实 view (数字 + 网格线 + 光晕), skyline 兼容性最好。
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

/* ---------------- 远景深色调色板 (V0.49.2 远而虚景深)
 *      深紫/深蓝/暗红/深青: 远处数字"雾里看"的感觉 ---------------- */
const DARK_CANDY = [
  '#6a4ba8', // 深葡萄紫
  '#3d6ba8', // 深天蓝
  '#a84a8a', // 深玫红
  '#3d8a8a', // 深青
  '#a86a3d', // 深橙棕
  '#5a3d8a', // 深靛
];

/* ---------------- 网格线 (V0.49.3 真实 view 阵列) ----------------
 * V0.49.2 用的 repeating-linear-gradient 在 Skyline 1.4.21 完全静默不渲染。
 * 改方案: ts 在 attached 读 wx.getWindowInfo() 拿屏幕宽高 (rpx → px 计算条数),
 *          每 24px / 72px 生成一条 { i, px } 真实 view 节点。
 * 兼容: 用 128px 兜底余量, 保证任何屏 (含 pad 横屏 1024+) 都铺满。
 */
interface GridLine {
  i: number;
  px: number;
}
function buildGridLines(wWidth: number, wHeight: number): {
  fineH: GridLine[];
  fineV: GridLine[];
  boldH: GridLine[];
  boldV: GridLine[];
} {
  // +64 padding 让边缘也有一条线, 避免旋转/缩放下空洞
  const W = Math.max(wWidth, 320) + 64;
  const H = Math.max(wHeight, 568) + 64;
  const arr = (max: number, step: number): GridLine[] => {
    const r: GridLine[] = [];
    let i = 0;
    for (let p = 0; p <= max; p += step, i++) {
      r.push({ i, px: p });
    }
    return r;
  };
  return {
    fineH: arr(H, 24),     // 细横线: 24px 周期
    fineV: arr(W, 24),     // 细竖线
    boldH: arr(H, 72),     // 宫粗横线: 72px 周期 (3 × 24)
    boldV: arr(W, 72),
  };
}

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
  // V0.49.2 远景大数字: 深色糖果 + alpha 0.40-0.55 (远而虚)
  for (let i = 0; i < 48; i++) {
    arr.push({
      i,
      x: Math.round(1 + rnd() * 98),
      y: Math.round(2 + rnd() * 92),
      n: String(1 + Math.floor(rnd() * 9)),
      s: Math.round(32 + rnd() * 56), // 32-88 (远处更大)
      r: Math.round(rnd() * 40 - 20),
      o: 0.40 + rnd() * 0.15, // 0.40-0.55 远而虚 (v0.47: 0.45-0.75 太实)
      c: DARK_CANDY[Math.floor(rnd() * DARK_CANDY.length)],
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
      o: 0.55 + (i % 4) * 0.07, // 0.55-0.76 (V0.49.2 中景近而实, 显著提高)
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
  // V0.49.2 近景: size 略小 (8-22) + alpha 0.8-1.0 (近而亮)
  for (let i = 0; i < 18; i++) {
    arr.push({
      i,
      x: Math.round(2 + rnd() * 94),
      y: Math.round(3 + rnd() * 90),
      s: Math.round(8 + rnd() * 14), // 8-22 (缩小, 留空间给大数字)
      o: 0.80 + rnd() * 0.20, // 0.80-1.00 (近而亮)
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

    /* V0.49.3: 网格线 4 个数组 (横/竖 × 细/粗), 由 wx:for 渲染真实 view */
    gridLinesFineH: [] as GridLine[],
    gridLinesFineV: [] as GridLine[],
    gridLinesBoldH: [] as GridLine[],
    gridLinesBoldV: [] as GridLine[],
  },

  lifetimes: {
    attached() {
      // 读屏幕大小 (rpx 系: wx.getWindowInfo().windowWidth 返回 px, 不需 *dpr)
      let wWidth = 375;
      let wHeight = 812;
      try {
        const wxAny: any = (typeof wx !== 'undefined') ? wx : null;
        if (wxAny && typeof wxAny.getWindowInfo === 'function') {
          const info = wxAny.getWindowInfo();
          if (info && info.windowWidth && info.windowHeight) {
            wWidth = info.windowWidth;
            wHeight = info.windowHeight;
          }
        }
      } catch (_) { /* 兜底用兜底值 */ }

      // 确定性生成 (多次进入保持一致视觉)
      const bigNums = buildBigNums();
      const miniGrids = buildMiniGrids();
      const thoughts = buildThoughts();
      const grid = buildGridLines(wWidth, wHeight);

      this.setData({
        bigNums,
        miniGrids,
        thoughts,
        gridLinesFineH: grid.fineH,
        gridLinesFineV: grid.fineV,
        gridLinesBoldH: grid.boldH,
        gridLinesBoldV: grid.boldV,
      });
    },
  },
});

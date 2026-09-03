/* components/bg-fx/bg-fx.ts
 * 全局动态背景层 (Playful Sudoku, V0.46): 欢快糖果风
 * 由 pages/index/index 放置在 .scene-area 第一层 (z-index 0),
 * 场景 (z-index 1/2) 浮在其上, 场景根背景已设为 transparent。
 *
 * 结构 (从后到前 6 层):
 *   1. .fx-base   糖果渐变底 (粉 → 暖黄 → 天蓝 → 薄荷) + 4 团彩色柔光
 *   2. 远景 band-distal : 满屏漂浮大数字 1-9 (糖果 6 色), 最慢横滚 (~90s)
 *   3. 中景 band-grids  : 3×3 / 4×4 / 5×5 / 6×6 小网格方块
 *                        (代表"图画谜题"玩法, 若干小格已填糖果色), 中速横滚 (~60s)
 *   3.5 封面 band-cover (V0.46): 9×9 数独网格 + 品牌标题 + Press START 胶囊,
 *       静态分布在屏幕 4 角, 淡化不抢前景 UI, 强化"封面作为背景平铺"的观感
 *   4. 近景 band-thought: 彩色柔光点 (6 色淡光, 慢飘 + 闪烁), 最快横滚 (~30s)
 *   5. .fx-beat   顶部暖白呼吸光晕 (周期 = pulseMs, 平缓不闪)
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
  // 28 个/屏, 满铺 2-96%
  for (let i = 0; i < 28; i++) {
    arr.push({
      i,
      x: Math.round(2 + rnd() * 92),
      y: Math.round(3 + rnd() * 88),
      n: String(1 + Math.floor(rnd() * 9)),
      s: Math.round(34 + rnd() * 48), // 34-82
      r: Math.round(rnd() * 40 - 20),
      o: 0.5 + rnd() * 0.3, // 0.5-0.8 (亮底上醒目不抢戏)
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
      o: 0.24 + (i % 4) * 0.06, // 0.24-0.42
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

/* ---------------- 封面装饰 (V0.46) ----------------
   把 title-scene 的 3 类核心元素作为氛围背景固定在屏幕 4 角:
   - grid   : 9×9 数独网格 (96×96), 中央填若干糖果色格 (代表封面图板)
   - brand  : 品牌字 "ESSENTIAL SUDOKU DS", 紫/橙渐变 + 旋转, 顶部/底部
   - press  : Press START 糖果胶囊, 角落放置
   坐标避开中央 50% 区域 (40-60% 横, 38-62% 纵) 不遮挡前景 UI。
*/
interface CoverCell {
  f: number; // 0/1 是否填色
  c?: string;
  n?: string; // 显示数字 ('0' = 空格)
}
interface CoverPiece {
  i: number;
  kind: 'grid' | 'brand' | 'press';
  x: number; // % left
  y: number; // % top
  r: number; // deg 旋转
  o: number; // 透明度
  label?: string;
  pulse?: number; // 1 = 加脉冲动画 (press 专用)
  cells?: CoverCell[]; // grid 专用
  size?: number; // grid 像素大小
  pos?: string; // grid 锚定角 (让 piece 用相对位置而非绝对居中)
}
function buildCoverGridCells(seedIdx: number): CoverCell[] {
  const cells: CoverCell[] = [];
  // 与 title-scene 一致: 9 宫每宫 1 糖果格, 共 9 格填色, 显示数字
  // seedIdx 错开格位置让两个装饰 grid 看起来不一样
  const baseOffsets = [0, 1, 2, 5, 8, 11, 14, 17, 20];
  const nums = ['3', '7', '1', '9', '4', '6', '2', '8', '5'];
  for (let i = 0; i < 81; i++) {
    const filled = baseOffsets.includes(i);
    cells.push({
      f: filled ? 1 : 0,
      c: filled ? CANDY[(i + seedIdx * 2) % CANDY.length] : undefined,
      n: filled ? nums[(i + seedIdx) % nums.length] : '0',
    });
  }
  return cells;
}
function buildCoverArt(): CoverPiece[] {
  return [
    // 左上角: 9×9 数独网格 (旋转 -6°, 微透明, 让背景能看到"封面图板")
    {
      i: 0, kind: 'grid', x: -3, y: 4, r: -6, o: 0.32,
      size: 96, pos: 'tl', cells: buildCoverGridCells(0),
    },
    // 右下角: 9×9 数独网格 (旋转 +8°, 与左上呼应)
    {
      i: 1, kind: 'grid', x: 78, y: 60, r: 8, o: 0.32,
      size: 96, pos: 'br', cells: buildCoverGridCells(1),
    },
    // 中上: 品牌标题 (居中靠上, 与原 title 顶部 banner 同位, 倾斜微旋转)
    {
      i: 2, kind: 'brand', x: 10, y: -1.5, r: -3, o: 0.4,
      label: 'ESSENTIAL SUDOKU DS',
    },
    // 中下: Press START 胶囊 (底部偏左, 让"封面按钮"作为氛围出现)
    {
      i: 3, kind: 'press', x: 6, y: 78, r: 4, o: 0.55, pulse: 1,
      label: 'Press START',
    },
    // 右下角: Press START (镜像, 让画面四角对称, 互相呼应)
    {
      i: 4, kind: 'press', x: 64, y: 84, r: -5, o: 0.45, pulse: 1,
      label: 'Press START',
    },
  ];
}

Component({
  options: { virtualHost: true, multipleSlots: false },
  properties: {
    /** 当前场景 BGM 小节毫秒 (呼吸光动画周期, 平缓不闪)。 */
    pulseMs: { type: Number, value: 2600 },
  },
  data: {
    segs: [0, 1] as number[],

    /* 远景: 满屏大数字 1-9 (糖果 6 色) */
    bigNums: [] as FloatNum[],

    /* 中景: 小网格方块 (图画谜题玩法代表) */
    miniGrids: [] as MiniGrid[],

    /* 近景: 彩色柔光点 */
    thoughts: [] as Thought[],

    /* 封面装饰 (V0.46): 9×9 数独网格 + 品牌标题 + Press START, 屏幕 4 角 */
    coverArt: [] as CoverPiece[],
  },

  lifetimes: {
    attached() {
      // 确定性生成 (多次进入保持一致视觉)
      const bigNums = buildBigNums();
      const miniGrids = buildMiniGrids();
      const thoughts = buildThoughts();
      const coverArt = buildCoverArt();
      this.setData({ bigNums, miniGrids, thoughts, coverArt });
    },
  },
});

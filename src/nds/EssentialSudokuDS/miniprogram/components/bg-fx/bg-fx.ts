/* components/bg-fx/bg-fx.ts
 * 全局动态背景层 (Night Study Desk, V0.36): 暗夜书桌 + 思考主题
 * 由 pages/index/index 放置在 .scene-area 第一层 (z-index 0),
 * 场景 (z-index 1/2) 浮在其上, 场景根背景已设为 transparent。
 *
 * 结构 (从后到前 4 层):
 *   1. .fx-base   深夜书桌渐变 (蓝紫 → 暖琥珀 → 暗木) + 台灯柔光晕 (左上)
 *   2. 远景 band-distal : 漂浮数字小方块 1-9 (think tiles), 最慢横滚 (~75s)
 *   3. 中景 band-drafts  : 半透明草稿方块 (虚线格/已填一部分), 中速横滚 (~45s)
 *   4. 近景 band-thought : 思考光点 (柔光圆 + 慢飘), 最快横滚 (~22s)
 *   5. .fx-beat   台灯呼吸光晕 (左侧偏中), 周期 = pulseMs (平缓不闪)
 *
 * 无缝循环实现: 每个横滚层 = .roll (width:200%) 内两个相同 .seg,
 *   roll 动画 translateX 0 → -50% (= 恰好一个 seg 宽度), 循环无缝。
 *   层上再包一层 .bob 做缓慢上下浮动 → 斜向走动感。
 * 不依赖 NBM 提取图, 全部纯色 + 渐变 + 几何形, skyline 兼容良好。
 */
Component({
  options: { virtualHost: true, multipleSlots: false },
  properties: {
    /** 当前场景 BGM 小节毫秒 (呼吸光动画周期, 平缓不闪)。 */
    pulseMs: { type: Number, value: 2600 },
  },
  data: {
    /** 每个横滚层的两个相同片段 (首尾相接实现无缝) */
    segs: [0, 1],

    /* ---------- 远景: 漂浮数字小方块 1-9 (think tiles) ---------- */
    thinkTiles: [
      { i: 0, x: 5, y: 8, n: '5', c: '#f5d27a', o: 0.28 },
      { i: 1, x: 14, y: 28, n: '3', c: '#7fc8ff', o: 0.32 },
      { i: 2, x: 23, y: 6, n: '9', c: '#f5d27a', o: 0.24 },
      { i: 3, x: 32, y: 30, n: '1', c: '#a8dcff', o: 0.3 },
      { i: 4, x: 41, y: 12, n: '7', c: '#f5d27a', o: 0.26 },
      { i: 5, x: 50, y: 36, n: '4', c: '#7fc8ff', o: 0.22 },
      { i: 6, x: 58, y: 14, n: '6', c: '#f5d27a', o: 0.3 },
      { i: 7, x: 66, y: 32, n: '2', c: '#a8dcff', o: 0.24 },
      { i: 8, x: 75, y: 8, n: '8', c: '#f5d27a', o: 0.28 },
      { i: 9, x: 84, y: 22, n: '5', c: '#7fc8ff', o: 0.22 },
      { i: 10, x: 92, y: 14, n: '9', c: '#f5d27a', o: 0.2 },
    ],

    /* ---------- 中景: 草稿方块 (虚线/已填一部分) ---------- */
    drafts: [
      { i: 0, x: 4, y: 36, w: 60, h: 60, kind: 'dashed', o: 0.34 },
      { i: 1, x: 12, y: 64, w: 48, h: 48, kind: 'partial', o: 0.4 },
      { i: 2, x: 23, y: 40, w: 70, h: 70, kind: 'dashed', o: 0.32 },
      { i: 3, x: 36, y: 70, w: 56, h: 56, kind: 'partial', o: 0.36 },
      { i: 4, x: 48, y: 42, w: 80, h: 80, kind: 'dashed', o: 0.3 },
      { i: 5, x: 62, y: 68, w: 50, h: 50, kind: 'partial', o: 0.4 },
      { i: 6, x: 73, y: 38, w: 66, h: 66, kind: 'dashed', o: 0.34 },
      { i: 7, x: 84, y: 64, w: 54, h: 54, kind: 'partial', o: 0.36 },
      { i: 8, x: 94, y: 40, w: 48, h: 48, kind: 'dashed', o: 0.28 },
    ],

    /* ---------- 近景: 思考光点 (柔光圆) ---------- */
    thoughts: [
      { i: 0, x: 8, y: 18, s: 14, o: 0.55 },
      { i: 1, x: 18, y: 50, s: 10, o: 0.4 },
      { i: 2, x: 28, y: 12, s: 22, o: 0.6 },
      { i: 3, x: 38, y: 64, s: 9, o: 0.38 },
      { i: 4, x: 49, y: 28, s: 16, o: 0.5 },
      { i: 5, x: 60, y: 70, s: 12, o: 0.45 },
      { i: 6, x: 70, y: 16, s: 20, o: 0.6 },
      { i: 7, x: 80, y: 48, s: 11, o: 0.42 },
      { i: 8, x: 90, y: 30, s: 14, o: 0.5 },
      { i: 9, x: 95, y: 80, s: 10, o: 0.4 },
    ],
  },
});

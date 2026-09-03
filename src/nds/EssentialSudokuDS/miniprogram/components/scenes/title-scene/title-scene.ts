// components/scenes/title-scene/title-scene.ts — 启动标题场景组件
// 自绘 Canvas 封面 (代替已损坏的 title.nbm 提取图):
//   - 暗夜书桌色调 (深夜蓝紫 → 暖琥珀), 表达"思考"主题
//   - 中央双谜题预览 (9×9 数独部分填充 + 6×6 图画谜题部分填充)
//   - 顶部主标题 "ESSENTIAL PUZZLE DS", 副标题 "每日拼图"
//   - 底部 "点击开始" 脉冲提示
//   点击 → triggerEvent('start') → index _switchScene('menu') (无页面跳转)

import { audioService } from '../../../utils/audio/audioService';

/**
 * Canvas 2D context (新 Canvas 2D API, 与 Web 一致)。
 * 微信 typings 没导出 getContext('2d') 完整接口, 这里在局部宽松声明:
 * 只覆盖本组件用到的 API, 其他保留灵活扩展。
 */
interface TitleC2D {
  fillStyle: string;
  strokeStyle: string;
  font: string;
  globalAlpha: number;
  textAlign: 'left' | 'center' | 'right';
  textBaseline: 'top' | 'middle' | 'bottom' | 'alphabetic';
  lineWidth: number;
  measureText: (text: string) => { width: number };
  fillText: (text: string, x: number, y: number) => void;
  strokeText: (text: string, x: number, y: number) => void;
  fillRect: (x: number, y: number, w: number, h: number) => void;
  strokeRect: (x: number, y: number, w: number, h: number) => void;
  fill: () => void;
  stroke: () => void;
  beginPath: () => void;
  closePath: () => void;
  moveTo: (x: number, y: number) => void;
  lineTo: (x: number, y: number) => void;
  arc: (x: number, y: number, r: number, startAng: number, endAng: number, ccw?: boolean) => void;
  arcTo: (x1: number, y1: number, x2: number, y2: number, r: number) => void;
  scale: (x: number, y: number) => void;
  save: () => void;
  restore: () => void;
  createLinearGradient: (x0: number, y0: number, x1: number, y1: number) => {
    addColorStop: (offset: number, color: string) => void;
  };
  createRadialGradient: (
    x0: number, y0: number, r0: number,
    x1: number, y1: number, r1: number
  ) => {
    addColorStop: (offset: number, color: string) => void;
  };
}

Component({
  options: { virtualHost: false },
  data: {
    pulse: false,
    /** TS 私有字段声明 (非渲染数据) */
    _pulseTimer: 0 as number,
  },

  lifetimes: {
    attached() {
      this.data._pulseTimer = setTimeout(() => {
        this.setData({ pulse: true });
      }, 1000);
    },
    ready() {
      this._drawCover();
    },
    detached() {
      if (this.data._pulseTimer) {
        clearTimeout(this.data._pulseTimer);
        this.data._pulseTimer = 0;
      }
    },
  },

  methods: {
    /** 自绘封面: 单次绘制, 内容相对屏幕自适应缩放 */
    _drawCover() {
      const query = wx.createSelectorQuery().in(this);
      query
        .select('#title-cover-canvas')
        .fields({ node: true, size: true })
        .exec((res: any) => {
          const item = res && res[0];
          if (!item || !item.node) return;
          const node: any = item.node;
          const ctx: TitleC2D = node.getContext('2d');
          const cssW: number = item.width || 360;
          const cssH: number = item.height || 480;
          const win: any = wx.getWindowInfo ? wx.getWindowInfo() : { pixelRatio: 2 };
          const dpr = win.pixelRatio || 2;
          node.width = Math.floor(cssW * dpr);
          node.height = Math.floor(cssH * dpr);
          ctx.scale(dpr, dpr);
          this._paintCover(ctx, cssW, cssH);
        });
    },

    _paintCover(ctx: TitleC2D, w: number, h: number) {
      // ---------- 1. 暗夜书桌底色 (深夜蓝紫 → 暖琥珀 → 暗木) ----------
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, '#11152a');
      sky.addColorStop(0.45, '#1e2240');
      sky.addColorStop(0.62, '#3a2e26');
      sky.addColorStop(0.85, '#2c1d14');
      sky.addColorStop(1, '#1a0f0a');
      ctx.fillStyle = sky as unknown as string;
      ctx.fillRect(0, 0, w, h);

      // 1b. 台灯柔光晕 (中央偏上, 像一盏灯打在书桌)
      const lamp = ctx.createRadialGradient(
        w * 0.5, h * 0.35, 0,
        w * 0.5, h * 0.35, Math.max(w, h) * 0.7
      );
      lamp.addColorStop(0, 'rgba(255, 213, 138, 0.34)');
      lamp.addColorStop(0.35, 'rgba(255, 200, 120, 0.16)');
      lamp.addColorStop(0.7, 'rgba(255, 180, 100, 0.04)');
      lamp.addColorStop(1, 'rgba(255, 180, 100, 0)');
      ctx.fillStyle = lamp as unknown as string;
      ctx.fillRect(0, 0, w, h);

      // 1c. 远散光斑 (思考光点)
      ctx.fillStyle = 'rgba(255, 230, 178, 0.08)';
      const dots: Array<[number, number, number]> = [
        [w * 0.08, h * 0.12, 28],
        [w * 0.92, h * 0.18, 36],
        [w * 0.06, h * 0.7, 40],
        [w * 0.95, h * 0.65, 24],
        [w * 0.5, h * 0.85, 32],
        [w * 0.18, h * 0.46, 18],
        [w * 0.82, h * 0.88, 22],
      ];
      for (const [dx, dy, dr] of dots) {
        ctx.beginPath();
        ctx.arc(dx, dy, dr, 0, Math.PI * 2);
        ctx.fill();
      }

      // ---------- 2. 主标题 ESSENTIAL PUZZLE DS ----------
      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const titleY = h * 0.13;
      ctx.fillStyle = '#f5d27a';
      ctx.font = `bold ${Math.max(16, Math.round(w * 0.062))}px sans-serif`;
      this._fillTextSpaced(ctx, 'ESSENTIAL PUZZLE DS', w / 2, titleY, 4);

      // 标题下方细金色装饰线
      const lineY = titleY + Math.max(14, w * 0.04);
      ctx.strokeStyle = 'rgba(245, 210, 122, 0.55)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w * 0.32, lineY);
      ctx.lineTo(w * 0.68, lineY);
      ctx.stroke();
      // 装饰线中央圆点
      ctx.fillStyle = '#f5d27a';
      ctx.beginPath();
      ctx.arc(w / 2, lineY, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // ---------- 3. 副标题 每日拼图 ----------
      ctx.fillStyle = '#dfe6f4';
      ctx.font = `500 ${Math.max(12, Math.round(w * 0.042))}px sans-serif`;
      this._fillTextSpaced(ctx, '每日拼图', w / 2, titleY + Math.max(40, w * 0.1), 6);

      // 副标题下方英文小字 "NUMBER × PICTURE"
      ctx.fillStyle = 'rgba(159, 182, 211, 0.55)';
      ctx.font = '11px sans-serif';
      this._fillTextSpaced(ctx, 'NUMBER  ×  PICTURE', w / 2, titleY + Math.max(64, w * 0.16), 3);

      // ---------- 4. 中央双谜题预览 (数独 9×9 + 图画谜题 6×6) ----------
      const previewY = h * 0.4;
      const previewSide = Math.min(w * 0.34, h * 0.32);
      const sudokuX = w / 2 - previewSide - w * 0.06;
      const pictureX = w / 2 + w * 0.06;
      this._paintSudokuPreview(ctx, sudokuX, previewY, previewSide, previewSide);
      this._paintPicturePreview(ctx, pictureX, previewY, previewSide, previewSide);

      // 中间分隔竖线
      ctx.strokeStyle = 'rgba(245, 210, 122, 0.18)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w / 2, previewY + previewSide * 0.12);
      ctx.lineTo(w / 2, previewY + previewSide * 0.88);
      ctx.stroke();

      // 标签
      ctx.fillStyle = '#c8d5e8';
      ctx.font = '600 13px sans-serif';
      ctx.fillText('数独', sudokuX + previewSide / 2, previewY + previewSide + 18);
      ctx.fillText('图画谜题', pictureX + previewSide / 2, previewY + previewSide + 18);

      // 标签下小字
      ctx.fillStyle = 'rgba(159, 182, 211, 0.6)';
      ctx.font = '10px sans-serif';
      ctx.fillText('1000 题', sudokuX + previewSide / 2, previewY + previewSide + 34);
      ctx.fillText('1525 题', pictureX + previewSide / 2, previewY + previewSide + 34);

      // ---------- 5. 底部装饰言 ----------
      ctx.fillStyle = 'rgba(220, 200, 170, 0.5)';
      ctx.font = '11px sans-serif';
      this._fillTextSpaced(ctx, '一  格  一  思', w / 2, h - 130, 2);

      ctx.restore();
    },

    /** 9×9 数独预览 (部分填充, 主色调 #f5d27a 暖金) */
    _paintSudokuPreview(ctx: TitleC2D, x: number, y: number, w: number, h: number) {
      const N = 9;
      const cell = w / N;
      // 卡片底 (略深于背景, 突出网格)
      ctx.fillStyle = 'rgba(20, 24, 44, 0.55)';
      this._roundRect(ctx, x, y, w, h, 8);
      ctx.fill();

      // 用户答对色块 (浅色填充, 表达"已完成一部分")
      const filled: Array<[number, number, string]> = [
        [1, 2, '#f5d27a'], [1, 5, '#7fc8ff'], [1, 6, '#f5d27a'],
        [2, 0, '#7fc8ff'], [2, 2, '#f5d27a'], [2, 8, '#f5d27a'],
        [3, 5, '#7fc8ff'], [3, 7, '#f5d27a'],
        [4, 4, '#f5d27a'], [4, 7, '#7fc8ff'],
        [5, 5, '#f5d27a'],
        [6, 0, '#f5d27a'], [6, 2, '#7fc8ff'], [6, 8, '#f5d27a'],
        [7, 0, '#f5d27a'], [7, 7, '#7fc8ff'],
        [8, 0, '#7fc8ff'], [8, 1, '#f5d27a'], [8, 5, '#f5d27a'],
      ];
      for (const [r, c, color] of filled) {
        ctx.fillStyle = color + '44';
        ctx.fillRect(x + c * cell, y + r * cell, cell, cell);
      }

      // 网格细线
      ctx.strokeStyle = 'rgba(245, 210, 122, 0.3)';
      ctx.lineWidth = 1;
      for (let i = 1; i < N; i++) {
        ctx.beginPath();
        ctx.moveTo(x + i * cell, y);
        ctx.lineTo(x + i * cell, y + h);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y + i * cell);
        ctx.lineTo(x + w, y + i * cell);
        ctx.stroke();
      }

      // 3×3 粗线
      ctx.strokeStyle = 'rgba(245, 210, 122, 0.8)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i <= N; i += 3) {
        ctx.beginPath();
        ctx.moveTo(x + i * cell, y);
        ctx.lineTo(x + i * cell, y + h);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y + i * cell);
        ctx.lineTo(x + w, y + i * cell);
        ctx.stroke();
      }

      // 外边框
      ctx.strokeStyle = '#f5d27a';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, w, h);

      // 数字 (固定给定数字)
      const given: Array<[number, number, number]> = [
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
      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#f5d27a';
      ctx.font = `bold ${Math.max(8, cell * 0.55)}px sans-serif`;
      for (const [r, c, n] of given) {
        ctx.fillText(String(n), x + c * cell + cell / 2, y + r * cell + cell / 2);
      }
      ctx.restore();
    },

    /** 图画谜题预览 (主色调 #7fc8ff 冷蓝, 与数独区分) */
    _paintPicturePreview(ctx: TitleC2D, x: number, y: number, w: number, h: number) {
      const N = 6;
      const cell = w / N;

      // 卡片底
      ctx.fillStyle = 'rgba(20, 24, 44, 0.55)';
      this._roundRect(ctx, x, y, w, h, 8);
      ctx.fill();

      // 已填格子 (形似小猫/小动物头像)
      const filled = new Set([
        '1_0', '1_1', '1_2', '1_3', '1_4', '1_5',
        '2_0', '2_1', '2_4', '2_5',
        '3_0', '3_2', '3_3', '3_5',
        '4_0', '4_1', '4_3', '4_4', '4_5',
        '5_0', '5_1', '5_5',
      ]);

      // 网格细线
      ctx.strokeStyle = 'rgba(127, 200, 255, 0.28)';
      ctx.lineWidth = 1;
      for (let i = 1; i < N; i++) {
        ctx.beginPath();
        ctx.moveTo(x + i * cell, y);
        ctx.lineTo(x + i * cell, y + h);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y + i * cell);
        ctx.lineTo(x + w, y + i * cell);
        ctx.stroke();
      }

      // 大格粗线
      ctx.strokeStyle = 'rgba(127, 200, 255, 0.8)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x + 3 * cell, y);
      ctx.lineTo(x + 3 * cell, y + h);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y + 3 * cell);
      ctx.lineTo(x + w, y + 3 * cell);
      ctx.stroke();

      // 填充的方块 (渐变填充 + 圆角)
      for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
          if (!filled.has(`${r}_${c}`)) continue;
          const cx = x + c * cell;
          const cy = y + r * cell;
          const grad = ctx.createLinearGradient(cx, cy, cx, cy + cell);
          grad.addColorStop(0, '#a8dcff');
          grad.addColorStop(1, '#3a86d4');
          ctx.fillStyle = grad as unknown as string;
          this._roundRect(ctx, cx + 1.5, cy + 1.5, cell - 3, cell - 3, 2);
          ctx.fill();
        }
      }

      // 外边框
      ctx.strokeStyle = '#7fc8ff';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, w, h);
    },

    /** 跨基库兼容的等距文字 (手动按 spacing 像素间距排列字符) */
    _fillTextSpaced(ctx: TitleC2D, text: string, cx: number, cy: number, spacing: number) {
      if (spacing <= 0) {
        ctx.fillText(text, cx, cy);
        return;
      }
      const widths: number[] = [];
      let total = 0;
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        const wd = ctx.measureText(ch).width;
        widths.push(wd);
        total += wd;
      }
      total += spacing * (text.length - 1);
      let cursor = cx - total / 2;
      const oldAlign = ctx.textAlign;
      ctx.textAlign = 'left';
      for (let i = 0; i < text.length; i++) {
        const wd = widths[i];
        ctx.fillText(text[i], cursor + wd / 2, cy);
        cursor += wd + spacing;
      }
      ctx.textAlign = oldAlign;
    },

    /** 圆角矩形 path */
    _roundRect(ctx: TitleC2D, x: number, y: number, w: number, h: number, r: number) {
      const rr = Math.min(r, w / 2, h / 2);
      ctx.beginPath();
      ctx.moveTo(x + rr, y);
      ctx.lineTo(x + w - rr, y);
      ctx.arcTo(x + w, y, x + w, y + rr, rr);
      ctx.lineTo(x + w, y + h - rr);
      ctx.arcTo(x + w, y + h, x + w - rr, y + h, rr);
      ctx.lineTo(x + rr, y + h);
      ctx.arcTo(x, y + h, x, y + h - rr, rr);
      ctx.lineTo(x, y + rr);
      ctx.arcTo(x, y, x + rr, y, rr);
      ctx.closePath();
    },

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

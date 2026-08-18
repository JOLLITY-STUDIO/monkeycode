/** 原版 Picross DS 主题色 */
export const NDS_THEME = {
    bg: "#ffffff", // 网格白底
    hintBg: "#fff6c8", // 提示区浅黄
    grid: "#c8c8c8", // 细网格线
    gridStrong: "#333333", // 5 格粗线
    fill: "#111111", // 填充黑块
    cross: "#e60000", // 叉红色
    hint: "#111111", // 提示数字黑
    hintDone: "#e60000", // 满足变红
    label: "#ffd800", // 顶部标签条黄
    labelText: "#111111", // 标签条黑字
};
export class PicrossRenderer {
    constructor(canvas, opts = {}) {
        // 布局
        this.hintH = 0; // 列提示区高度
        this.hintW = 0; // 行提示区宽度
        this.cell = 0; // 单元格像素
        this.gridX = 0;
        this.gridY = 0;
        // F2: 脏区缓存 —— 布局快照 + 上一帧 marks
        this.lastW = 0;
        this.lastH = 0;
        this.lastCW = 0;
        this.lastCH = 0;
        this.lastMarks = null;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.opts = {
            fillColor: NDS_THEME.fill,
            bgColor: NDS_THEME.bg,
            hintColor: NDS_THEME.hint,
            showLabels: false,
            maxCell: Infinity,
            ...opts,
        };
    }
    /** 根据拼图尺寸与提示数量重新计算布局，提示数字与网格严格一格一格格对齐 */
    layout(state) {
        const { width, height } = state.puzzle;
        const cw = this.canvas.width;
        const ch = this.canvas.height;
        const maxRow = Math.max(1, ...state.rowHints.map((h) => h.nums.length));
        const maxCol = Math.max(1, ...state.colHints.map((h) => h.nums.length));
        // 迭代求解 cell：提示区宽度 = maxRow*cell，高度 = maxCol*cell
        let cell = Math.min(cw / (width + maxRow), ch / (height + maxCol));
        for (let i = 0; i < 6; i++) {
            const next = Math.min((cw - maxRow * cell) / width, (ch - maxCol * cell) / height, this.opts.maxCell);
            if (Math.abs(next - cell) < 0.5)
                break;
            cell = next;
        }
        this.cell = Math.max(4, Math.floor(cell));
        this.hintW = maxRow * this.cell;
        this.hintH = maxCol * this.cell;
        this.gridX = Math.floor((cw - this.hintW - this.cell * width) / 2) + this.hintW;
        this.gridY = Math.floor((ch - this.hintH - this.cell * height) / 2) + this.hintH;
    }
    draw(state) {
        const { width, height } = state.puzzle;
        const cw = this.canvas.width;
        const ch = this.canvas.height;
        // 布局变化 → 全量重绘
        if (this.lastCW !== cw || this.lastCH !== ch ||
            this.lastW !== width || this.lastH !== height) {
            this.layout(state);
            this.drawFull(state);
            this.lastW = width;
            this.lastH = height;
            this.lastCW = cw;
            this.lastCH = ch;
            this.lastMarks = state.marks.slice();
            return;
        }
        // 脏区：仅重绘变化的格子 + 受影响行列提示
        const changed = [];
        for (let i = 0; i < state.marks.length; i++) {
            if (state.marks[i] !== this.lastMarks[i])
                changed.push(i);
        }
        if (changed.length) {
            for (const i of changed) {
                const x = i % width;
                const y = (i / width) | 0;
                this.drawCell(x, y, state.marks[i]);
                this.redrawRowHint(state.rowHints[y].nums, y, state.rowHints[y].satisfied);
                this.redrawColHint(state.colHints[x].nums, x, state.colHints[x].satisfied);
            }
            this.lastMarks = state.marks.slice();
        }
        // 顶部标签/进度条（仅在独立画布模式下绘制）
        if (this.opts.showLabels)
            this.drawLabels(state);
    }
    /** 全量重绘（布局变化/首帧） */
    drawFull(state) {
        const { width, height } = state.puzzle;
        const ctx = this.ctx;
        ctx.fillStyle = NDS_THEME.bg;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // 提示区背景（浅黄）
        ctx.fillStyle = NDS_THEME.hintBg;
        ctx.fillRect(0, 0, this.canvas.width, this.hintH);
        ctx.fillRect(0, 0, this.hintW, this.canvas.height);
        // 网格
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.drawCell(x, y, state.marks[y * width + x]);
            }
        }
        // 网格线：5 格一组粗线，其余细线（原版分组）
        for (let x = 0; x <= width; x++) {
            const strong = x % 5 === 0;
            ctx.strokeStyle = strong ? NDS_THEME.gridStrong : NDS_THEME.grid;
            ctx.lineWidth = strong ? 2 : 1;
            const px = this.gridX + x * this.cell;
            ctx.beginPath();
            ctx.moveTo(px, this.gridY);
            ctx.lineTo(px, this.gridY + height * this.cell);
            ctx.stroke();
        }
        for (let y = 0; y <= height; y++) {
            const strong = y % 5 === 0;
            ctx.strokeStyle = strong ? NDS_THEME.gridStrong : NDS_THEME.grid;
            ctx.lineWidth = strong ? 2 : 1;
            const py = this.gridY + y * this.cell;
            ctx.beginPath();
            ctx.moveTo(this.gridX, py);
            ctx.lineTo(this.gridX + width * this.cell, py);
            ctx.stroke();
        }
        // 行列提示
        for (let y = 0; y < height; y++) {
            const hint = state.rowHints[y];
            this.drawRowHint(hint.nums, y, hint.satisfied);
        }
        for (let x = 0; x < width; x++) {
            const hint = state.colHints[x];
            this.drawColHint(hint.nums, x, hint.satisfied);
        }
        // 顶部/左侧标签（独立画布模式）
        if (this.opts.showLabels)
            this.drawLabels(state);
    }
    /** 绘制单个格子（背景 + 填充 + 叉） */
    drawCell(x, y, mark) {
        const ctx = this.ctx;
        const px = this.gridX + x * this.cell;
        const py = this.gridY + y * this.cell;
        ctx.fillStyle = mark === "filled" ? this.opts.fillColor : this.opts.bgColor;
        ctx.fillRect(px + 1, py + 1, this.cell - 2, this.cell - 2);
        if (mark === "crossed")
            this.drawCross(px, py);
    }
    /** 重绘行提示（先擦除旧数字） */
    redrawRowHint(nums, row, satisfied) {
        const ctx = this.ctx;
        ctx.fillStyle = NDS_THEME.hintBg;
        ctx.fillRect(0, this.gridY + row * this.cell, this.hintW, this.cell);
        this.drawRowHint(nums, row, satisfied);
    }
    /** 重绘列提示（先擦除旧数字） */
    redrawColHint(nums, col, satisfied) {
        const ctx = this.ctx;
        ctx.fillStyle = NDS_THEME.hintBg;
        ctx.fillRect(this.gridX + col * this.cell, 0, this.cell, this.hintH);
        this.drawColHint(nums, col, satisfied);
    }
    drawRowHint(nums, row, satisfied) {
        const ctx = this.ctx;
        const cy = this.gridY + row * this.cell + this.cell / 2;
        ctx.font = `bold ${Math.max(8, this.cell * 0.55)}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = satisfied ? NDS_THEME.hintDone : NDS_THEME.hint;
        // 从右往左一格一个：nums[0] 在最右侧，靠近网格
        for (let i = 0; i < nums.length; i++) {
            const slot = nums.length - 1 - i;
            const cx = this.hintW - slot * this.cell - this.cell / 2;
            ctx.fillText(String(nums[i]), cx, cy);
        }
    }
    drawColHint(nums, col, satisfied) {
        const ctx = this.ctx;
        const cx = this.gridX + col * this.cell + this.cell / 2;
        ctx.font = `bold ${Math.max(8, this.cell * 0.55)}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = satisfied ? NDS_THEME.hintDone : NDS_THEME.hint;
        // 从下往上一格一个：nums[0] 在最下方，靠近网格
        for (let i = 0; i < nums.length; i++) {
            const slot = nums.length - 1 - i;
            const cy = this.hintH - slot * this.cell - this.cell / 2;
            ctx.fillText(String(nums[i]), cx, cy);
        }
    }
    drawCross(px, py) {
        const ctx = this.ctx;
        const m = this.cell * 0.25;
        ctx.strokeStyle = NDS_THEME.cross;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(px + m, py + m);
        ctx.lineTo(px + this.cell - m, py + this.cell - m);
        ctx.moveTo(px + this.cell - m, py + m);
        ctx.lineTo(px + m, py + this.cell - m);
        ctx.stroke();
    }
    /** 顶部黄色标签条（拼图名/时间/失误）+ 底部进度条，还原原版布局 */
    drawLabels(state) {
        const ctx = this.ctx;
        const cw = this.canvas.width;
        // 黄色标签条
        ctx.fillStyle = NDS_THEME.label;
        ctx.fillRect(0, 0, cw, 26);
        ctx.fillStyle = NDS_THEME.labelText;
        ctx.font = "bold 13px sans-serif";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(state.puzzle.name || "Puzzle", 8, 13);
        ctx.textAlign = "right";
        ctx.fillText(`${state.elapsedSec}s  ✕${state.mistakes}/${state.maxMistakes}`, cw - 8, 13);
        // 进度条（黑底黄条）
        const pct = state.totalFilled > 0 ? state.filledCount / state.totalFilled : 0;
        const bw = cw * 0.5;
        const bx = cw / 2 - bw / 2;
        const by = 30;
        ctx.fillStyle = "#d0d0d0";
        ctx.fillRect(bx, by, bw, 6);
        ctx.fillStyle = NDS_THEME.label;
        ctx.fillRect(bx, by, bw * pct, 6);
        ctx.strokeStyle = "#999999";
        ctx.lineWidth = 1;
        ctx.strokeRect(bx, by, bw, 6);
    }
    /** 触摸坐标 → 网格单元 */
    hitTest(x, y, state) {
        const { width, height } = state.puzzle;
        if (x < this.gridX || y < this.gridY)
            return { type: "none", x: -1, y: -1 };
        const cx = Math.floor((x - this.gridX) / this.cell);
        const cy = Math.floor((y - this.gridY) / this.cell);
        if (cx < 0 || cy < 0 || cx >= width || cy >= height) {
            return { type: "none", x: -1, y: -1 };
        }
        return { type: "cell", x: cx, y: cy };
    }
}

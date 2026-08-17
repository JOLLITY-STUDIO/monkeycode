export class PicrossRenderer {
    constructor(canvas, opts = {}) {
        // 布局
        this.hintH = 0; // 列提示区高度
        this.hintW = 0; // 行提示区宽度
        this.cell = 0; // 单元格像素
        this.gridX = 0;
        this.gridY = 0;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.opts = {
            fillColor: "#3b6fd4",
            bgColor: "#e8ecf2",
            hintColor: "#1a1a2e",
            ...opts,
        };
    }
    /** 根据拼图尺寸重新计算布局 */
    layout(width, height, maxCell = 34) {
        const cw = this.canvas.width;
        const ch = this.canvas.height;
        // 预留提示区（最多 ~8 位数字）
        this.hintH = Math.min(72, Math.floor(ch * 0.22));
        this.hintW = Math.min(72, Math.floor(cw * 0.22));
        this.cell = Math.floor(Math.min((cw - this.hintW) / width, (ch - this.hintH) / height, maxCell));
        this.gridX = Math.floor((cw - this.hintW - this.cell * width) / 2) + this.hintW;
        this.gridY = Math.floor((ch - this.hintH - this.cell * height) / 2) + this.hintH;
    }
    draw(state) {
        const { width, height } = state.puzzle;
        this.layout(width, height);
        const ctx = this.ctx;
        ctx.fillStyle = "#0f0f1a";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // 提示区背景
        ctx.fillStyle = "#1c1c33";
        ctx.fillRect(0, 0, this.canvas.width, this.hintH);
        ctx.fillRect(0, 0, this.hintW, this.canvas.height);
        // 网格
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const px = this.gridX + x * this.cell;
                const py = this.gridY + y * this.cell;
                const mark = state.marks[y * width + x];
                if (mark === "filled") {
                    ctx.fillStyle = this.opts.fillColor;
                    ctx.fillRect(px + 1, py + 1, this.cell - 2, this.cell - 2);
                }
                else {
                    ctx.fillStyle = this.opts.bgColor;
                    ctx.fillRect(px + 1, py + 1, this.cell - 2, this.cell - 2);
                }
                if (mark === "crossed") {
                    this.drawCross(px, py);
                }
            }
        }
        // 网格线
        ctx.strokeStyle = "#4a4a6a";
        ctx.lineWidth = 1;
        for (let x = 0; x <= width; x++) {
            const px = this.gridX + x * this.cell;
            ctx.beginPath();
            ctx.moveTo(px, this.gridY);
            ctx.lineTo(px, this.gridY + height * this.cell);
            ctx.stroke();
        }
        for (let y = 0; y <= height; y++) {
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
        // 顶部/左侧标签
        this.drawLabels(state);
    }
    drawRowHint(nums, row, satisfied) {
        const ctx = this.ctx;
        const n = nums.length;
        const cy = this.gridY + row * this.cell + this.cell / 2;
        ctx.font = `bold ${Math.max(10, this.cell * 0.4)}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for (let i = 0; i < n; i++) {
            const cx = this.hintW - (n - i) * (this.hintW / (n + 0.5)) + this.hintW * 0.08;
            ctx.fillStyle = satisfied ? "#4caf50" : "#ffffff";
            ctx.fillText(String(nums[i]), cx, cy);
        }
    }
    drawColHint(nums, col, satisfied) {
        const ctx = this.ctx;
        const n = nums.length;
        const cx = this.gridX + col * this.cell + this.cell / 2;
        ctx.font = `bold ${Math.max(10, this.cell * 0.4)}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for (let i = 0; i < n; i++) {
            const cy = this.hintH - (n - i) * (this.hintH / (n + 0.5)) + this.hintH * 0.08;
            ctx.fillStyle = satisfied ? "#4caf50" : "#ffffff";
            ctx.fillText(String(nums[i]), cx, cy);
        }
    }
    drawCross(px, py) {
        const ctx = this.ctx;
        const m = this.cell * 0.25;
        ctx.strokeStyle = "#d23b3b";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(px + m, py + m);
        ctx.lineTo(px + this.cell - m, py + this.cell - m);
        ctx.moveTo(px + this.cell - m, py + m);
        ctx.lineTo(px + m, py + this.cell - m);
        ctx.stroke();
    }
    drawLabels(state) {
        const ctx = this.ctx;
        ctx.font = "12px sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(`${state.puzzle.name || "Puzzle"}  ${state.elapsedSec}s  ✕${state.mistakes}/${state.maxMistakes}`, this.canvas.width / 2, 14);
        // 进度条
        const pct = state.totalFilled > 0 ? state.filledCount / state.totalFilled : 0;
        const bw = this.canvas.width * 0.5;
        ctx.fillStyle = "#33334d";
        ctx.fillRect(this.canvas.width / 2 - bw / 2, 22, bw, 6);
        ctx.fillStyle = state.solved ? "#4caf50" : "#3b6fd4";
        ctx.fillRect(this.canvas.width / 2 - bw / 2, 22, bw * pct, 6);
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

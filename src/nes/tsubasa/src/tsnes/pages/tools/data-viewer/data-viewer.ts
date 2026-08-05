/**
 * ROM 数据可视化页面
 *
 * 直接消费 data-extractor.ts 的解析输出，按 Tab 分类展示。
 * 不依赖游戏运行态，纯数据浏览。
 */
import {
  parseAttrRecords,
  parsePlayerNamesByTeam,
  parsePlayerNames,
  parseTeamRecords,
  parseAnimSequences,
  parseValueCurves,
  parsePlayerValueRows,
  parseFormationRecords,
} from '../../../game-engine/native-game/tsubasa/banks/prg/data-extractor';
import { decodeTileName, tilesToHex } from './tile-text-map';

// ── 格式化工具 ──
const hex = (n: number): string => n.toString(16).padStart(2, '0').toUpperCase();

interface SimpleAttrRow {
  idx: number; pid: number; a: string; stm: string; def: string;
  chg: string; tkl: string; skl: string; mup: string;
  spd: string; stam: string; tech: string; lvl: string;
}

interface SimpleSceneSlot {
  sid: number; slot: string; curveOff: string; attr: string;
  flags: string; pos: string; fHi: number;
}

interface SimpleSceneConfig {
  idx: number; ptr: string; off: string; shared: boolean;
  slots: SimpleSceneSlot[];
}

interface MatrixByte { hex: string; z: boolean; mirror: boolean; }
interface SimpleMatrixRow { rowId: number; marker: string; bytes: MatrixByte[]; }

Page({
  data: {
    activeTab: 'attr' as string,
    // stats
    stats: {} as Record<string, number>,
    // attr
    attrRecords: [] as SimpleAttrRow[],
    attrFilter: '',
    filteredAttrs: [] as SimpleAttrRow[],
    uniquePids: 0,
    // names
    teamPlayerNames: [] as Array<{ teamId: number; names: Array<{ idx: number; text: string; hex: string }> }>,
    // teams
    teamRecords: [] as Array<{ teamId: number; nameText: string; nameHex: string; playerIds: string }>,
    // scene configs
    sceneConfigs: [] as SimpleSceneConfig[],
    // curve
    curveData: [] as number[],
    curveCols: [] as number[],
    curveRows: [] as string[][],
    // matrix
    matrixRows: [] as SimpleMatrixRow[],
    matrixFilter: '',
    filteredMatrix: [] as SimpleMatrixRow[],
    matrixMarkerRange: '',
    // anim
    animSeqs: [] as Array<{ seqId: number; frames: Array<{ duration: number; tile: string }> }>,
    animTotalFrames: 0,
  },

  onLoad() {
    this.buildAll();
  },

  buildAll() {
    // 1. 球员属性
    const attrs = parseAttrRecords();
    const attrRows: SimpleAttrRow[] = [];
    const pidSet = new Set<number>();
    for (const [idx, r] of attrs) {
      pidSet.add(r.playerId);
      attrRows.push({
        idx, pid: r.playerId,
        a: hex(r.attrA), stm: hex(r.attrStaminaMul), def: hex(r.attrDefense),
        chg: hex(r.attrCharge), tkl: hex(r.attrTacklePlus), skl: hex(r.attrSkillActivate),
        mup: hex(r.attrMatchup), spd: hex(r.attrSpeedMod), stam: hex(r.attrStaminaMod),
        tech: hex(r.attrTechParam), lvl: hex(r.attrLevel),
      });
    }
    const filteredAttrs = attrRows.slice(0, 50); // 默认显示前50条

    // 2. 球员名称
    const teamNames = parsePlayerNamesByTeam();
    const teamNameView: typeof this.data.teamPlayerNames = [];
    for (const [tid, names] of teamNames) {
      teamNameView.push({
        teamId: tid,
        names: names.map((n, i) => ({
          idx: i,
          text: decodeTileName(n),
          hex: tilesToHex(n),
        })),
      });
    }

    // 3. 球队
    const teams = parseTeamRecords(teamNames);
    const teamView: typeof this.data.teamRecords = [];
    for (const [tid, t] of teams) {
      teamView.push({
        teamId: tid,
        nameText: decodeTileName(t.name),
        nameHex: tilesToHex(t.name),
        playerIds: t.playerIds.join(', '),
      });
    }

    // 4. 场景配置 (阵型)
    const formations = parseFormationRecords();
    const sceneView: SimpleSceneConfig[] = [];
    for (const [idx, f] of formations) {
      const ptr = 0x9460 + (idx * 2 < 328 ? idx * 2 : 0); // approx

      // 实际上数据是从 data 数组里读出来的，ptr 本身在记录里
      // 用 formationId 做 ptr 定位
      const ptr0 = 0x9460 + idx * 2;
      sceneView.push({
        idx,
        ptr: ptr0.toString(16).toUpperCase(),
        off: idx.toString(16),
        shared: idx >= 7,
        slots: f.positions.map((p, i) => ({
          sid: i,
          slot: hex(p.slotIndex),
          curveOff: hex(p.xCoord),
          attr: hex(p.yCoord),
          flags: hex(p.flags),
          pos: ['GK', 'DF', 'MF', 'FW'][p.flags & 0x03] || '?',
          fHi: (p.flags >> 3) & 0x1F,
        })),
      });
    }

    // 5. 曲线
    const curves = parseValueCurves();
    const curveRows: string[][] = [];
    const COLS_PER_ROW = 16;
    for (let i = 0; i < curves.combined.length; i += COLS_PER_ROW) {
      curveRows.push(
        curves.combined.slice(i, i + COLS_PER_ROW).map(v => hex(v))
      );
    }

    // 6. 矩阵
    const valueRows = parsePlayerValueRows();
    const matrixView: SimpleMatrixRow[] = [];
    const markers: number[] = [];
    for (const [rid, vr] of valueRows) {
      markers.push(vr.teamMarker);
      const bytes: MatrixByte[] = vr.rawData.map((b, i) => {
        const isMirror = vr.mirrorLen > 0 && i >= (vr.rawData.length - vr.mirrorLen);
        return { hex: hex(b), z: b === 0, mirror: isMirror };
      });
      matrixView.push({
        rowId: rid,
        marker: hex(vr.teamMarker),
        bytes,
      });
    }
    const mmRange = markers.length > 0
      ? `${hex(Math.min(...markers))} - ${hex(Math.max(...markers))}`
      : 'N/A';

    // 7. 动画
    const anims = parseAnimSequences();
    const animView: typeof this.data.animSeqs = [];
    let totalFrames = 0;
    for (const [sid, seq] of anims) {
      totalFrames += seq.frames.length;
      animView.push({
        seqId: sid,
        frames: seq.frames.map(f => ({ duration: f.duration, tile: hex(f.tileId) })),
      });
    }

    this.setData({
      stats: {
        players: [...teamNameView].reduce((s, t) => s + t.names.length, 0),
        attrs: attrs.size,
        teams: teams.size,
        formations: formations.size,
        curveLen: curves.combined.length,
        valueRows: valueRows.size,
      },
      attrRecords: attrRows,
      filteredAttrs,
      uniquePids: pidSet.size,
      teamPlayerNames: teamNameView,
      teamRecords: teamView,
      sceneConfigs: sceneView,
      curveData: curves.combined,
      curveCols: Array.from({ length: COLS_PER_ROW }, (_, i) => i),
      curveRows,
      matrixRows: matrixView,
      filteredMatrix: matrixView.slice(0, 20),
      matrixMarkerRange: mmRange,
      animSeqs: animView,
      animTotalFrames: totalFrames,
    });

    // 延迟画曲线图
    setTimeout(() => this.drawCurveChart(curves.combined), 300);
  },

  // ── Tab 切换 ──
  switchTab(e: WechatMiniprogram.TouchEvent) {
    const tab = e.currentTarget.dataset.tab as string;
    this.setData({ activeTab: tab });
  },

  // ── 过滤 ──
  onAttrFilter(e: WechatMiniprogram.InputEvent) {
    const v = (e.detail.value || '').toLowerCase();
    const filtered = v
      ? this.data.attrRecords.filter(r => String(r.pid).includes(v))
      : this.data.attrRecords.slice(0, 50);
    this.setData({ attrFilter: v, filteredAttrs: filtered });
  },

  onMatrixFilter(e: WechatMiniprogram.InputEvent) {
    const v = (e.detail.value || '').toLowerCase();
    const filtered = v
      ? this.data.matrixRows.filter(r => r.marker.toLowerCase().includes(v))
      : this.data.matrixRows.slice(0, 20);
    this.setData({ matrixFilter: v, filteredMatrix: filtered });
  },

  // ── 画值曲线 Canvas ──
  drawCurveChart(curve: number[]) {
    const query = wx.createSelectorQuery();
    query.select('#curveChart')
      .fields({ node: false, size: true })
      .exec((res) => {
        if (!res || !res[0]) { setTimeout(() => this.drawCurveChart(curve), 200); return; }
        const { width, height } = res[0] as { width: number; height: number };
        const ctx = wx.createCanvasContext('curveChart');
        const pad = { top: 20, right: 20, bottom: 30, left: 40 };
        const w = width - pad.left - pad.right;
        const h = height - pad.top - pad.bottom;

        // 背景
        ctx.setFillStyle('#161b22');
        ctx.fillRect(0, 0, width, height);

        // 网格
        ctx.setStrokeStyle('#21262d');
        ctx.setLineWidth(0.5);
        for (let i = 0; i <= 4; i++) {
          const y = pad.top + (h * i / 4);
          ctx.beginPath();
          ctx.moveTo(pad.left, y);
          ctx.lineTo(width - pad.right, y);
          ctx.stroke();
          ctx.setFillStyle('#8b949e');
          ctx.setFontSize(10);
          ctx.fillText(String(Math.round(255 * (4 - i) / 4)), 2, y + 3);
        }

        // 曲线
        if (curve.length > 0) {
          ctx.setStrokeStyle('#58a6ff');
          ctx.setLineWidth(1.5);
          ctx.beginPath();
          const stepX = w / Math.max(curve.length - 1, 1);
          for (let i = 0; i < curve.length; i++) {
            const x = pad.left + i * stepX;
            const y = pad.top + h - (curve[i] / 255) * h;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();

          // 高位区分线
          if (curve.length > 129) {
            const splitX = pad.left + 129 * stepX;
            ctx.setStrokeStyle('rgba(240, 136, 62, 0.33)');
            ctx.setLineWidth(1);
            ctx.beginPath();
            ctx.moveTo(splitX, pad.top);
            ctx.lineTo(splitX, pad.top + h);
            ctx.stroke();
          }
        }

        // 标签
        ctx.setFillStyle('#8b949e');
        ctx.setFontSize(10);
        ctx.fillText('指数', width / 2 - 10, height - 4);
        ctx.draw();
      });
  },
});

/**
 * 天使之翼1 — 比赛场地渲染器
 * 
 * 负责在比赛状态 (State 4) 渲染足球场地:
 *   - 草地背景 + 场地标线
 *   - 球员位置 (圆形标记)
 *   - 球的位置
 *   - 比分 + 计时器 HUD
 * 
 * 足球场尺寸: 全宽约 256px (匹配NES分辨率)
 * 球员以简单几何图形表示 (圆形 + 编号)
 */

import { DataStore } from '../../data/DataStore';

/** 场地尺寸常量 */
const FIELD_WIDTH = 240;
const FIELD_HEIGHT = 180;
const FIELD_X = 8;
const FIELD_Y = 4;

/** 球队颜色 */
const TEAM_COLORS = {
  A: { fill: '#FF4444', stroke: '#CC0000' },  // 红色 (玩家)
  B: { fill: '#4488FF', stroke: '#0044CC' },  // 蓝色 (对手)
  GK: { fill: '#FFAA00', stroke: '#CC8800' }, // 橙色 (门将)
};

export class MatchFieldRenderer {
  private ds: DataStore;
  
  /** 球位置 */
  private _ballX: number = 128;
  private _ballY: number = 100;
  
  /** 球员位置缓存 */
  private _players: Map<number, { x: number; y: number; team: number; role: number }> = new Map();
  
  /** 帧计数 (用于动画) */
  private _frameCount: number = 0;
  
  constructor(ds: DataStore) {
    this.ds = ds;
  }
  
  /**
   * 每帧更新球员位置数据
   */
  update(): void {
    this._frameCount++;
    
    // 从 DataStore 读取球员位置
    // 主队: $0410-$043F (11人 × 4字节: x, y, state, flags)
    // 客队: $0490-$04BF
    this._players.clear();
    
    for (let team = 0; team < 2; team++) {
      const baseAddr = team === 0 ? 0x410 : 0x490;
      for (let i = 0; i < 11; i++) {
        const x = this.ds.get04xx(baseAddr + i * 4);
        const y = this.ds.get04xx(baseAddr + i * 4 + 1);
        
        if (x > 0 || y > 0) {
          this._players.set(team * 16 + i, {
            x: (x / 256) * FIELD_WIDTH + FIELD_X,  // 映射到场地坐标
            y: (y / 256) * FIELD_HEIGHT + FIELD_Y,
            team,
            role: i === 0 ? 0 : (i <= 4 ? 1 : (i <= 7 ? 2 : 3)), // GK/DF/MF/FW
          });
        }
      }
    }
    
    // 球位置
    this._ballX = this.ds.get06xx(0x40);
    this._ballY = this.ds.get06xx(0x41);
    if (this._ballX === 0 && this._ballY === 0) {
      this._ballX = 128;
      this._ballY = 100;
    }
    // 映射球坐标
    this._ballX = (this._ballX / 256) * FIELD_WIDTH + FIELD_X;
    this._ballY = (this._ballY / 256) * FIELD_HEIGHT + FIELD_Y;
  }
  
  /**
   * 渲染比赛画面到Canvas
   * @param ctx Canvas 2D 渲染上下文
   * @param canvasW Canvas 宽度
   * @param canvasH Canvas 高度
   */
  render(ctx: CanvasRenderingContext2D, canvasW: number, canvasH: number): void {
    // 清除画面
    ctx.fillStyle = '#1a3a1a'; // 深绿色背景
    ctx.fillRect(0, 0, canvasW, canvasH);
    
    // 绘制场地
    this._drawField(ctx, canvasW, canvasH);
    
    // 绘制球员
    this._drawPlayers(ctx, canvasW, canvasH);
    
    // 绘制球
    this._drawBall(ctx, canvasW, canvasH);
    
    // 绘制HUD
    this._drawHud(ctx, canvasW, canvasH);
  }
  
  /**
   * 绘制足球场地
   */
  private _drawField(ctx: CanvasRenderingContext2D, canvasW: number, canvasH: number): void {
    const scaleX = canvasW / 256;
    const scaleY = canvasH / 240;
    
    const fx = FIELD_X * scaleX;
    const fy = FIELD_Y * scaleY;
    const fw = FIELD_WIDTH * scaleX;
    const fh = FIELD_HEIGHT * scaleY;
    const midX = fx + fw / 2;
    const midY = fy + fh / 2;
    
    // 场地底色
    ctx.fillStyle = '#2d5a1e'; // 草地绿
    ctx.fillRect(fx, fy, fw, fh);
    
    // 场地边框
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2 * scaleX;
    ctx.strokeRect(fx, fy, fw, fh);
    
    // 中线
    ctx.beginPath();
    ctx.moveTo(midX, fy);
    ctx.lineTo(midX, fy + fh);
    ctx.stroke();
    
    // 中圈
    ctx.beginPath();
    ctx.arc(midX, midY, 20 * scaleX, 0, Math.PI * 2);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5 * scaleX;
    ctx.stroke();
    
    // 开球点
    ctx.beginPath();
    ctx.arc(midX, midY, 2 * scaleX, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    
    // 禁区 (左侧)
    const paW = 40 * scaleX;
    const paH = 90 * scaleY;
    ctx.strokeRect(fx, midY - paH / 2, paW, paH);
    
    // 球门区 (左侧)
    const gaW = 16 * scaleX;
    const gaH = 50 * scaleY;
    ctx.strokeRect(fx, midY - gaH / 2, gaW, gaH);
    
    // 禁区 (右侧)
    ctx.strokeRect(fx + fw - paW, midY - paH / 2, paW, paH);
    
    // 球门区 (右侧)
    ctx.strokeRect(fx + fw - gaW, midY - gaH / 2, gaW, gaH);
    
    // 球门 (左侧)
    ctx.fillStyle = '#333333';
    const goalW = 12 * scaleX;
    const goalH = 32 * scaleY;
    ctx.fillRect(fx - goalW, midY - goalH / 2, goalW, goalH);
    ctx.strokeStyle = '#ffffff';
    ctx.strokeRect(fx - goalW, midY - goalH / 2, goalW, goalH);
    
    // 球门 (右侧)
    ctx.fillStyle = '#333333';
    ctx.fillRect(fx + fw, midY - goalH / 2, goalW, goalH);
    ctx.strokeStyle = '#ffffff';
    ctx.strokeRect(fx + fw, midY - goalH / 2, goalW, goalH);
  }
  
  /**
   * 绘制球员
   */
  private _drawPlayers(ctx: CanvasRenderingContext2D, canvasW: number, canvasH: number): void {
    const scaleX = canvasW / 256;
    const scaleY = canvasH / 240;
    const radius = 5 * Math.min(scaleX, scaleY);
    
    for (const [id, player] of this._players) {
      const colors = player.role === 0 ? TEAM_COLORS.GK : 
                     (player.team === 0 ? TEAM_COLORS.A : TEAM_COLORS.B);
      
      const px = player.x * scaleX;
      const py = player.y * scaleY;
      
      // 球员身体 (圆形)
      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.fillStyle = colors.fill;
      ctx.fill();
      ctx.strokeStyle = colors.stroke;
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // GK 特殊标记 (菱形)
      if (player.role === 0) {
        ctx.beginPath();
        ctx.moveTo(px, py - radius - 3);
        ctx.lineTo(px + 3, py - radius);
        ctx.lineTo(px, py - radius + 3);
        ctx.lineTo(px - 3, py - radius);
        ctx.closePath();
        ctx.fillStyle = '#FFFF00';
        ctx.fill();
      }
    }
  }
  
  /**
   * 绘制球
   */
  private _drawBall(ctx: CanvasRenderingContext2D, canvasW: number, canvasH: number): void {
    const scaleX = canvasW / 256;
    const scaleY = canvasH / 240;
    
    // 球动画 (轻微弹跳)
    const bounce = Math.sin(this._frameCount * 0.1) * 1;
    const bx = this._ballX * scaleX;
    const by = (this._ballY + bounce) * scaleY;
    const radius = 3.5 * Math.min(scaleX, scaleY);
    
    // 球体
    ctx.beginPath();
    ctx.arc(bx, by, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 0.8;
    ctx.stroke();
    
    // 球面纹理
    ctx.beginPath();
    ctx.arc(bx - 1, by - 1, radius * 0.6, 0.3, Math.PI * 0.7);
    ctx.strokeStyle = '#DDDDDD';
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }
  
  /**
   * 绘制 HUD (比分 + 计时器)
   */
  private _drawHud(ctx: CanvasRenderingContext2D, canvasW: number, canvasH: number): void {
    const scaleX = canvasW / 256;
    const scaleY = canvasH / 240;
    
    // HUD 背景
    const hudY = (FIELD_Y + FIELD_HEIGHT + 8) * scaleY;
    const hudH = 40 * scaleY;
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(0, hudY, canvasW, hudH);
    
    // 左队名
    ctx.font = `${10 * scaleX}px monospace`;
    ctx.fillStyle = '#FF6644';
    ctx.textAlign = 'left';
    ctx.fillText('南葛SC', 8 * scaleX, hudY + 18 * scaleY);
    
    // 比分
    const scoreA = this.ds.scoreA;
    const scoreB = this.ds.scoreB;
    ctx.font = `${16 * scaleX}px monospace`;
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText(`${scoreA} - ${scoreB}`, canvasW / 2, hudY + 22 * scaleY);
    
    // 右队名
    ctx.font = `${10 * scaleX}px monospace`;
    ctx.fillStyle = '#4488FF';
    ctx.textAlign = 'right';
    ctx.fillText('对手', canvasW - 8 * scaleX, hudY + 18 * scaleY);
    
    // 计时器
    const phase = this.ds.matchPhase;
    const phaseText = ['赛前', '开球', '上半场', '中场', '下半场', '加时', 'PK', '结束'][phase] || '';
    
    ctx.font = `${7 * scaleX}px monospace`;
    ctx.fillStyle = '#AAAACC';
    ctx.textAlign = 'center';
    ctx.fillText(phaseText, canvasW / 2, hudY + 34 * scaleY);
  }
}

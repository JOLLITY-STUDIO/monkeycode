/**
 * State 08: 游戏通关画面
 *
 * 显示通关信息、累计战绩、游戏结束。
 * 按 START 返回标题画面。
 */
import { StateBase } from './StateBase';
import { Button } from '../../core/types';
import type { ProgressManager } from '../../model/ProgressManager';

export class State08_GameEnding extends StateBase {
  readonly id = 8;

  private displayFrames: number = 0;
  private progressManager: ProgressManager | null = null;

  onEnter(): void {
    this.displayFrames = 0;
    this.progressManager = this.data.get('progressManager') as ProgressManager || null;

    const totalScore = this.progressManager?.getTotalScore() ?? [0, 0];
    const wl = this.progressManager?.getWinLossRecord() ?? { wins: 0, losses: 0, draws: 0 };

    console.log('═'.repeat(50));
    console.log('  🎉 遊戲通關!');
    console.log(`  累计比分: ${totalScore[0]} - ${totalScore[1]}`);
    console.log(`  战绩: ${wl.wins}胜 ${wl.draws}平 ${wl.losses}负`);
    console.log('═'.repeat(50));

    // 输出完整日志
    if (this.progressManager) {
      const fullLog = this.progressManager.generateLog();
      console.log(fullLog);
    }

    this.model.setEvent(
      'game_ending',
      0, 0,
      totalScore,
    );
  }

  onUpdate(): void {
    this.displayFrames++;

    // 显示 600 帧 (10秒) 或按 START 返回标题
    if (this.displayFrames >= 600 || this.input.isPressed(Button.START)) {
      console.log('[State 08] Returning to title...');

      // 重置进度
      if (this.progressManager) {
        this.progressManager.reset();
      }

      // 返回标题画面
      this.sm.transitionTo(0);
    }

    // 每60帧输出一次进度
    if (this.displayFrames % 60 === 0) {
      console.log(`[State 08] Ending screen... ${Math.ceil((600 - this.displayFrames) / 60)}s remaining`);
    }
  }
}

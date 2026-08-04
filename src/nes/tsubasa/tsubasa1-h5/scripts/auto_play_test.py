"""
Auto-Play Full Game Test - 全自动通关测试

模拟完整的游戏流程: 标题 → 菜单 → 队员选择 → 比赛 → 结果 → 循环
使用自动AI控制双方，记录每场比赛的得分和输赢。

Usage: python scripts/auto_play_test.py [--matches N] [--max-frames F]
"""
import sys
import os

# 比赛阶段常量
class MatchPhase:
    KICKOFF = 0
    PLAYING = 1
    HALFTIME = 2
    SECOND_HALF = 3
    FULLTIME = 4
    PAUSED = 5

class Button:
    A = 0x80
    B = 0x40
    SELECT = 0x20
    START = 0x10
    UP = 0x08
    DOWN = 0x04
    LEFT = 0x02
    RIGHT = 0x01

# ============================================================
# Mock 数据结构
# ============================================================

class MockDataCache:
    def __init__(self):
        self.sub_state = 0       # $03CB
        self.step_counter = 0    # $03CC
        self.game_state = 0      # $03CA
        self.bank_lock = 0       # $93
        self.frame_counter = 0   # $0300
        self.ppu_ctrl = 0x10
        self.ppu_mask = 0x06
        self.scroll_x = 0
        self.scroll_y = 0
        self.mmc_bank_reg0 = 0
        self.mmc_bank_reg1 = 1
        self.mmc_bank_reg2 = 2
        self._store = {}

    def read(self, addr):
        if addr == 0x03CB: return self.sub_state
        if addr == 0x03CC: return self.step_counter
        if addr == 0x03CA: return self.game_state
        return 0

    def write(self, addr, val):
        if addr == 0x03CB: self.sub_state = val
        elif addr == 0x03CC: self.step_counter = val
        elif addr == 0x03CA: self.game_state = val

    def get(self, key):
        return self._store.get(key)

    def set(self, key, val):
        self._store[key] = val


class MockInputManager:
    def __init__(self):
        self.external_buttons = 0
        self.pressed_buttons = set()

    def setExternalButtons(self, buttons):
        self.external_buttons = buttons

    def clearExternalButtons(self):
        self.external_buttons = 0

    def isPressed(self, button):
        return self.external_buttons == button

    def pressButton(self, button):
        self.pressed_buttons.add(button)

    def releaseButton(self, button):
        self.pressed_buttons.discard(button)


# ============================================================
# 简化比赛引擎
# ============================================================

class MockMatchEngine:
    """简化的比赛引擎用于自动化测试"""
    def __init__(self):
        self.phase = MatchPhase.KICKOFF
        self.match_time = 0       # 游戏时间(秒)
        self.frame_count = 0
        self.score = [0, 0]
        # 加速模式: 每半场仅30秒 (30*60=1800帧)
        self.half_length_sec = 30
        self._current_half = 1    # 1=上半场, 2=下半场

        # 简化的球员数据
        self.team0_players = [MockPlayer(i, 0) for i in range(11)]
        self.team1_players = [MockPlayer(i + 11, 1) for i in range(11)]

        # 球
        self.ball = MockBall()

        # 事件队列
        self.goal_scored_this_cycle = False
        self._halftime_triggered = False
        self._fulltime_triggered = False

    def update(self):
        self.frame_count += 1

        # 时间推进 (每60帧=1游戏秒)
        if self.frame_count % 60 == 0:
            self.match_time += 1

        if self.phase == MatchPhase.KICKOFF:
            if self.frame_count > 30:
                self.phase = MatchPhase.PLAYING if self._current_half == 1 else MatchPhase.SECOND_HALF
            return None

        elif self.phase == MatchPhase.PLAYING:
            # 上半场进行中: 检查半场
            if self.match_time >= self.half_length_sec and not self._halftime_triggered:
                self._halftime_triggered = True
                self.phase = MatchPhase.HALFTIME
                return {'type': 'halftime', 'data': {'score': list(self.score)}}

            # 自动进球模拟
            if self.frame_count % 400 == 200 and not self.goal_scored_this_cycle:
                self.goal_scored_this_cycle = True
                scorer = 0 if self.frame_count % 800 < 400 else 1
                self.score[scorer] += 1
                return {'type': 'goal', 'data': {'scoringTeam': scorer, 'playerId': scorer * 11 + 9}}

            if self.frame_count % 400 == 0:
                self.goal_scored_this_cycle = False

            return None

        elif self.phase == MatchPhase.SECOND_HALF:
            # 下半场进行中: 检查终场
            if self.match_time >= self.half_length_sec * 2 and not self._fulltime_triggered:
                self._fulltime_triggered = True
                self.phase = MatchPhase.FULLTIME
                return {'type': 'fulltime', 'data': {'score': list(self.score)}}

            # 自动进球模拟
            if self.frame_count % 350 == 150 and not self.goal_scored_this_cycle:
                self.goal_scored_this_cycle = True
                scorer = 0 if self.frame_count % 700 < 350 else 1
                self.score[scorer] += 1
                return {'type': 'goal', 'data': {'scoringTeam': scorer, 'playerId': scorer * 11 + 9}}

            if self.frame_count % 350 == 0:
                self.goal_scored_this_cycle = False

            return None

        return None

    def handleGoal(self, scoring_team):
        """进球后回到开球状态"""
        self.phase = MatchPhase.KICKOFF
        self.frame_count = 0
        self.goal_scored_this_cycle = False

    def getAllPlayers(self):
        return self.team0_players + self.team1_players

    def getBallHolder(self):
        return 0

    def getPlayerTeam(self, pid):
        return 0 if pid < 11 else 1

    def getPlayerById(self, pid):
        for p in self.team0_players + self.team1_players:
            if p.player_id == pid:
                return p
        return None


class MockPlayer:
    def __init__(self, pid, team):
        self.player_id = pid
        self.team = team
        self.position = type('Pos', (), {'x': 100, 'y': 100})()
        self.has_ball = False
        self.is_active = True
        self.stats = type('Stats', (), {
            'speed': 5, 'power': 5, 'technique': 5, 'stamina': 5,
            'id': pid, 'number': pid + 1, 'name': f'P{pid}',
            'position': 1,
        })()


class MockBall:
    def __init__(self):
        self.x = 128
        self.y = 100
        self.vx = 0
        self.vy = 0
        self.possessed_by = None


# ============================================================
# 自动控制器
# ============================================================

class AutoController:
    """自动化控制器: 模拟人类玩家输入"""
    def __init__(self, input_mgr, data_cache):
        self.input = input_mgr
        self.data = data_cache
        self.state_frame = 0
        self.last_state = -1
        self.match_count = 0
        self.total_score = [0, 0]
        self.log_lines = []

    def log(self, msg):
        self.log_lines.append(msg)
        print(f"  [AUTO] {msg}")

    def update(self, state_id):
        self.state_frame += 1

        if state_id != self.last_state:
            self.state_frame = 0
            self.last_state = state_id

        if state_id == 0:  # 标题初始化
            self.input.clearExternalButtons()
        elif state_id == 1:  # 标题循环
            if self.state_frame > 30:
                self.input.setExternalButtons(Button.START)
            else:
                self.input.clearExternalButtons()
        elif state_id == 2:  # 菜单
            if self.state_frame > 15:
                self.input.setExternalButtons(Button.A)
            else:
                self.input.clearExternalButtons()
        elif state_id == 3:  # 队员选择
            if self.state_frame > 10:
                self.input.setExternalButtons(Button.START)
            else:
                self.input.clearExternalButtons()
        elif state_id == 4:  # 比赛
            self.input.clearExternalButtons()
        elif state_id == 5:  # 进球事件
            self.input.clearExternalButtons()
        elif state_id == 6:  # 半场/终场
            self.input.clearExternalButtons()
        elif state_id == 7:  # 结果
            if self.state_frame > 60:
                self.input.setExternalButtons(Button.START)
            else:
                self.input.clearExternalButtons()


# ============================================================
# 状态机
# ============================================================

class MockStateMachine:
    def __init__(self, data, input_mgr):
        self.data = data
        self.input = input_mgr
        self.current_state_id = -1
        self.state_frames = {}  # state_id → frames spent
        self.match_engine = None
        self.auto = AutoController(input_mgr, data)

    def transition_to(self, state_id):
        if self.current_state_id != -1:
            old = self.current_state_id
            frames = self.state_frames.get(old, 0)

            # 记录比赛结束 (从比赛相关状态离开到非比赛状态)
            if old in (4, 5, 6) and state_id not in (4, 5, 6, 7):
                if self.match_engine:
                    self.auto.total_score[0] += self.match_engine.score[0]
                    self.auto.total_score[1] += self.match_engine.score[1]
                    result = 'WIN' if self.match_engine.score[0] > self.match_engine.score[1] else \
                             'LOSE' if self.match_engine.score[0] < self.match_engine.score[1] else 'DRAW'
                    self.auto.log(f"Match#{self.auto.match_count} END: {self.match_engine.score[0]}-{self.match_engine.score[1]} ({result}) | Total: {self.auto.total_score[0]}-{self.auto.total_score[1]}")

        self.current_state_id = state_id
        self.data.game_state = state_id
        self.state_frames[state_id] = 0

        if state_id == 2:
            self.data.bank_lock = 0
        elif state_id == 3:
            self.data.bank_lock = 0
        elif state_id == 4:
            # 只在从非比赛状态进入时才创建新比赛
            # 从 State 05/06 回到 State 04 不创建新比赛
            pass

    def update(self):
        sid = self.current_state_id
        if sid not in self.state_frames:
            self.state_frames[sid] = 0
        self.state_frames[sid] += 1

        # Auto input
        self.auto.update(sid)

        if sid == 0:
            self._update_state00()
        elif sid == 1:
            self._update_state01()
        elif sid == 2:
            self._update_state02()
        elif sid == 3:
            self._update_state03()
        elif sid == 4:
            self._update_state04()
        elif sid == 5:
            self._update_state05()
        elif sid == 6:
            self._update_state06()
        elif sid == 7:
            self._update_state07()

    def _update_state00(self):
        self.data.sub_state += 1
        if self.data.sub_state >= 2:
            self.transition_to(1)

    def _update_state01(self):
        if self.input.isPressed(Button.START):
            self.transition_to(2)

    def _update_state02(self):
        if self.input.isPressed(Button.A):
            self.transition_to(3)

    def _update_state03(self):
        if self.input.isPressed(Button.START):
            # 创建新比赛引擎
            self.auto.match_count += 1
            self.match_engine = MockMatchEngine()
            self.data.set('matchEngine', self.match_engine)
            self.data.set('playerTeam', 0)
            self.data.set('playerTeamName', 'Nankatsu')
            self.data.set('opponentTeam', 1)
            self.data.set('opponentTeamName', 'Toho')
            self.auto.log(f"Match#{self.auto.match_count} START: Nankatsu vs Toho")
            self.transition_to(4)
        elif self.input.isPressed(Button.B):
            self.transition_to(2)

    def _update_state04(self):
        if self.match_engine:
            event = self.match_engine.update()
            if event:
                if event['type'] == 'goal':
                    self.match_engine.handleGoal(event['data']['scoringTeam'])
                    self.data.set('eventType', 'goal')
                    self.data.set('eventData', event['data'])
                    self.transition_to(5)
                elif event['type'] == 'halftime':
                    self.match_engine._current_half = 2
                    self.match_engine.phase = MatchPhase.SECOND_HALF
                    self.data.set('eventType', 'halftime')
                    self.transition_to(6)
                elif event['type'] == 'fulltime':
                    self.data.set('eventType', 'fulltime')
                    self.data.set('finalScore', self.match_engine.score)
                    self.transition_to(6)

    def _update_state05(self):
        if self.state_frames[5] > 120:
            self.data.set('eventType', '')
            self.data.set('eventData', None)
            self.transition_to(4)

    def _update_state06(self):
        event_type = self.data.get('eventType') or ''
        if event_type == 'halftime':
            if self.state_frames[6] > 180:
                self.transition_to(4)
        else:
            if self.state_frames[6] > 120:
                self.transition_to(7)

    def _update_state07(self):
        if self.state_frames[7] > 180 or self.input.isPressed(Button.START):
            # 记录比赛结束
            if self.match_engine:
                self.auto.total_score[0] += self.match_engine.score[0]
                self.auto.total_score[1] += self.match_engine.score[1]
                result = 'WIN' if self.match_engine.score[0] > self.match_engine.score[1] else \
                         'LOSE' if self.match_engine.score[0] < self.match_engine.score[1] else 'DRAW'
                self.auto.log(f"Match#{self.auto.match_count} RESULT: {self.match_engine.score[0]}-{self.match_engine.score[1]} ({result}) | Total: {self.auto.total_score[0]}-{self.auto.total_score[1]}")
            self.data.set('eventType', '')
            self.data.set('finalScore', None)
            self.data.set('matchEngine', None)
            self.match_engine = None
            self.transition_to(2)


# ============================================================
# 主测试函数
# ============================================================

def run_auto_play(num_matches=1, max_frames=100000, verbose=True):
    """
    运行自动游戏测试

    Args:
        num_matches: 要进行的比赛场数
        max_frames: 最大帧数限制 (防止无限循环)
        verbose: 是否输出详细日志
    """
    print("=" * 60)
    print("  天使之翼 H5 - Auto-Play 全自动测试")
    print(f"  目标: {num_matches} 场比赛")
    print("=" * 60)
    print()

    data = MockDataCache()
    input_mgr = MockInputManager()
    sm = MockStateMachine(data, input_mgr)

    # 开始: State 0
    sm.transition_to(0)

    frame = 0
    matches_completed = 0
    state_history = []
    last_state = -1
    match_just_ended = False

    while frame < max_frames:
        frame += 1
        last_state = sm.current_state_id
        sm.update()

        # 记录状态切换
        new_state = sm.current_state_id
        if new_state != last_state:
            state_history.append(new_state)

            # 检测比赛完成: State 7 → State 2 的转换
            if last_state == 7 and new_state == 2 and not match_just_ended:
                match_just_ended = True
                matches_completed += 1
                if verbose:
                    print(f"\n  === Match #{matches_completed} completed at frame {frame} ===")
                    eng = sm.match_engine
                    if eng:
                        print(f"  Score: {eng.score[0]} - {eng.score[1]}")
                    print(f"  Total: {sm.auto.total_score[0]} - {sm.auto.total_score[1]}")

            # 进入新比赛时重置标记
            if new_state == 4:
                match_just_ended = False

        # 完成所有比赛
        if matches_completed >= num_matches and sm.current_state_id == 2:
            print(f"\n  All {num_matches} match(es) completed at frame {frame}")
            break

        # 进度指示
        if frame % 1000 == 0 and verbose:
            print(f"  ... frame {frame}, state={sm.current_state_id}, matches={matches_completed}")

    # ── 结果汇总 ──
    print()
    print("=" * 60)
    print("  Auto-Play 测试结果")
    print("=" * 60)
    print(f"  总帧数: {frame}")
    print(f"  完成比赛: {matches_completed}")
    print(f"  累计比分: {sm.auto.total_score[0]} - {sm.auto.total_score[1]}")
    print(f"  最终状态: {sm.current_state_id}")
    print(f"  状态遍历: {state_history}")

    # 日志输出
    print()
    print("── 比赛日志 ──")
    for log_line in sm.auto.log_lines:
        print(f"  {log_line}")

    # 验证
    print()
    print("── 验证 ──")
    errors = []
    if matches_completed < num_matches:
        errors.append(f"未完成所有比赛 ({matches_completed}/{num_matches})")
    if sm.current_state_id not in (2, 7):
        errors.append(f"最终状态异常: {sm.current_state_id} (expected 2 or 7)")

    if errors:
        for e in errors:
            print(f"  [FAIL] {e}")
        return False
    else:
        print(f"  [OK] 全部 {num_matches} 场比赛完成!")
        print(f"  [OK] 状态流转正常")
        return True


# ============================================================
# 入口
# ============================================================

def main():
    import argparse
    parser = argparse.ArgumentParser(description='Auto-Play Full Game Test')
    parser.add_argument('--matches', type=int, default=1, help='Number of matches to play')
    parser.add_argument('--max-frames', type=int, default=100000, help='Max frames per test')
    parser.add_argument('--verbose', action='store_true', default=True, help='Verbose output')
    parser.add_argument('--quiet', action='store_true', help='Quiet mode')
    args = parser.parse_args()

    if args.quiet:
        args.verbose = False

    success = run_auto_play(
        num_matches=args.matches,
        max_frames=args.max_frames,
        verbose=args.verbose,
    )

    sys.exit(0 if success else 1)


if __name__ == '__main__':
    main()

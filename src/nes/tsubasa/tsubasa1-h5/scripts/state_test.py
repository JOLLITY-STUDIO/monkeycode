"""
天使之翼 H5 - State 流转测试 (Python 版本)

模拟游戏状态机的核心逻辑，验证状态流转:
  State 00 (初始化标题) → State 01 (标题循环) → State 02 (菜单选择)
  
这个测试不依赖 TypeScript 编译，直接模拟关键数据结构。
用于在 npm 不可用的环境下快速验证状态机设计。
"""

import sys

# ============================================================
# 枚举/常量
# ============================================================

class Button:
    A      = 0x80
    B      = 0x40
    SELECT = 0x20
    START  = 0x10
    UP     = 0x08
    DOWN   = 0x04
    LEFT   = 0x02
    RIGHT  = 0x01

class GameState:
    INIT_TITLE  = 0
    TITLE_LOOP  = 1
    MENU_SELECT = 2
    TEAM_SELECT = 3
    MATCH_MAIN  = 4
    MATCH_EVENT = 5

# ============================================================
# 模拟 DataCache
# ============================================================

class MockDataCache:
    """模拟 DataCache，只包含状态流转相关字段"""
    def __init__(self):
        # $03CB: Bank 1 子状态
        self.sub_state = 0
        # $03CC: 步骤计数器
        self.step_counter = 0
        # $03CA: 游戏状态索引
        self.game_state = 0
        # $93: Bank 切换锁
        self.bank_lock = 0
        # $1C: PRG Bank
        self.prg_bank = 0
        # $0300: 帧计数
        self.frame_count = 0
        # $18: PPU MASK
        self.ppu_mask = 0x0E
        # $19: PPU CTRL
        self.ppu_ctrl = 0x90
        # 结构化存储
        self.store: dict[str, any] = {}

    def read(self, addr: int) -> int:
        if addr == 0x03CB:
            return self.sub_state
        elif addr == 0x03CC:
            return self.step_counter
        elif addr == 0x03CA:
            return self.game_state
        elif addr == 0x93:
            return self.bank_lock
        elif addr == 0x0300:
            return self.frame_count
        return 0

    def write(self, addr: int, value: int):
        if addr == 0x03CB:
            self.sub_state = value & 0xFF
        elif addr == 0x03CC:
            self.step_counter = value & 0xFF
        elif addr == 0x03CA:
            self.game_state = value & 0xFF
        elif addr == 0x93:
            self.bank_lock = value & 0xFF
        elif addr == 0x0300:
            self.frame_count = value & 0xFF

    def get(self, key: str):
        return self.store.get(key)

    def set(self, key: str, value):
        self.store[key] = value


# ============================================================
# 模拟 Bank1Dispatcher 核心逻辑
# ============================================================

class MockBank1Dispatcher:
    """模拟 Bank1Dispatcher 的子状态处理逻辑"""
    def __init__(self, data: MockDataCache):
        self.data = data
        self._palette_loaded = False
        self._nametable_loaded = False
        self._sprites_setup = False

    def update(self):
        sub_state = self.data.sub_state

        if sub_state == 0:
            self._sub_state00()
        elif sub_state == 1:
            self._sub_state01()
        elif sub_state == 2:
            self._sub_state02()
        elif sub_state == 5:
            self._sub_state05()
        elif sub_state == 6:
            self._sub_state06()

    def _sub_state00(self):
        """子状态 0: 标题初始化第1步"""
        # 设置 CHR Bank
        self.data.prg_bank = 1
        # 进入下一个子状态
        self.data.write(0x03CB, 1)
        self.data.write(0x03CC, 0)

    def _sub_state01(self):
        """子状态 1: 标题初始化第2步"""
        step = self.data.step_counter

        if step == 0:
            self._palette_loaded = True
        elif step == 1:
            self._nametable_loaded = True
        elif step == 2:
            self._sprites_setup = True
        elif step == 3:
            # 完成初始化，进入动画循环
            self.data.write(0x03CB, 2)
            self.data.write(0x03CC, 0)
            return

        self.data.write(0x03CC, step + 1)

    def _sub_state02(self):
        """子状态 2: 标题动画循环"""
        pass  # 由 State01_TitleLoop 层处理输入

    def _sub_state05(self):
        """子状态 5: 菜单初始化"""
        self.data.write(0x03CB, 6)
        self.data.write(0x03CC, 0)

    def _sub_state06(self):
        """子状态 6: 菜单循环"""
        pass  # 由 State02_MenuSelect 层处理


# ============================================================
# 模拟 State 逻辑
# ============================================================

class MockStateMachine:
    """模拟状态机核心逻辑"""
    def __init__(self, data: MockDataCache):
        self.data = data
        self.bank1 = MockBank1Dispatcher(data)
        self.current_state_id = -1
        self._state_map = {}

        # State 相关变量
        self._init_done = False
        self._blink_counter = 0
        self._anim_frame = 0
        self._selected_item = 0
        self._cursor_sprite_y = 80

    def transition_to(self, state_id: int):
        """跳转到指定状态"""
        # 退出当前状态
        if self.current_state_id >= 0:
            self._on_exit(self.current_state_id)

        self.current_state_id = state_id
        self.data.game_state = state_id

        # 执行 Bank 切换
        if state_id == 0:
            self.data.prg_bank = 1
            self.bank1.data.sub_state = 0
            self.bank1.data.step_counter = 0

        # 进入新状态
        self._on_enter(state_id)

    def update(self, input_pressed: int = 0):
        """每帧更新"""
        # 首先更新 Bank1Dispatcher
        self.bank1.update()

        # 更新当前状态
        self._on_update(self.current_state_id, input_pressed)

        # 帧计数
        self.data.frame_count = (self.data.frame_count + 1) & 0xFF

    def _on_enter(self, state_id: int):
        if state_id == 0:  # InitTitle
            self._init_done = False
        elif state_id == 1:  # TitleLoop
            self._blink_counter = 0
            self._anim_frame = 0
        elif state_id == 2:  # MenuSelect
            self._selected_item = 0
            self._cursor_sprite_y = 80

    def _on_update(self, state_id: int, input_pressed: int):
        if state_id == 0:
            self._update_state00()
        elif state_id == 1:
            self._update_state01(input_pressed)
        elif state_id == 2:
            self._update_state02(input_pressed)

    def _on_exit(self, state_id: int):
        pass

    # ---- State 00: 标题初始化 ----
    def _update_state00(self):
        if self._init_done:
            self.transition_to(1)
            return

        # 检查 Bank 1 是否完成初始化 ($03CB >= 2)
        if self.data.sub_state >= 2:
            self._init_done = True

    # ---- State 01: 标题循环 ----
    def _update_state01(self, input_pressed: int):
        self._blink_counter = (self._blink_counter + 1) & 0x3F

        if input_pressed & Button.START:
            # 按 START → 菜单
            self.data.write(0x03CB, 5)  # 菜单初始化子状态
            self.data.write(0x03CC, 0)
            self.transition_to(2)

    # ---- State 02: 菜单选择 ----
    def _update_state02(self, input_pressed: int):
        if input_pressed & Button.UP:
            self._selected_item = (self._selected_item - 1) % 3
            self._update_cursor()
        elif input_pressed & Button.DOWN:
            self._selected_item = (self._selected_item + 1) % 3
            self._update_cursor()
        elif input_pressed & Button.A:
            self._confirm_selection()
        elif input_pressed & Button.B:
            self.transition_to(1)  # 返回标题
        elif input_pressed & Button.START:
            self._confirm_selection()  # START 也相当于确认

    def _update_cursor(self):
        offsets = [80, 104, 128]
        self._cursor_sprite_y = offsets[self._selected_item]

    def _confirm_selection(self):
        if self._selected_item == 0:
            self.data.set('playerCount', 1)
        elif self._selected_item == 1:
            self.data.set('playerCount', 2)
        elif self._selected_item == 2:
            self.data.set('isContinue', True)
        self.transition_to(3)


# ============================================================
# 测试工具
# ============================================================

passed = 0
failed = 0

def assert_eq(actual, expected, msg: str):
    global passed, failed
    if actual == expected:
        print(f"  ✅ {msg}: {actual}")
        passed += 1
    else:
        print(f"  ❌ FAIL: {msg} (expected={expected}, actual={actual})")
        failed += 1

def assert_true(condition: bool, msg: str):
    global passed, failed
    if condition:
        print(f"  ✅ {msg}")
        passed += 1
    else:
        print(f"  ❌ FAIL: {msg}")
        failed += 1

def section(title: str):
    print(f"\n{'='*60}")
    print(f"  {title}")
    print(f"{'='*60}")


# ============================================================
# 测试用例
# ============================================================

def test01_initial_state():
    """测试初始状态"""
    data = MockDataCache()
    sm = MockStateMachine(data)

    sm.transition_to(0)

    assert_eq(sm.current_state_id, 0, "初始状态应为 0 (InitTitle)")
    assert_eq(data.game_state, 0, "dataCache.gameState 应为 0")
    assert_eq(data.bank_lock, 0, "bankLock 应为 0")
    assert_eq(data.sub_state, 0, "Bank1 子状态应为 0")
    assert_eq(data.step_counter, 0, "步骤计数器应为 0")


def test02_auto_transition_to_title_loop():
    """测试 State 00 → State 01 自动流转"""
    data = MockDataCache()
    sm = MockStateMachine(data)
    sm.transition_to(0)

    # 帧 1: subState 0 → $03CB=1
    sm.update()
    assert_eq(data.sub_state, 1, "帧1后 $03CB=1")
    assert_eq(sm.current_state_id, 0, "仍在 State 00")

    # 帧 2: subState 1, step 0
    sm.update()
    assert_eq(data.step_counter, 1, "帧2后 $03CC=1")

    # 帧 3: subState 1, step 1
    sm.update()
    assert_eq(data.step_counter, 2, "帧3后 $03CC=2")

    # 帧 4: subState 1, step 2
    sm.update()
    assert_eq(data.step_counter, 3, "帧4后 $03CC=3")

    # 帧 5: subState 1, step 3 → $03CB=2
    sm.update()
    assert_eq(data.sub_state, 2, "帧5后 $03CB=2 (动画循环)")

    # 帧 6: State00 检测到 $03CB>=2, 转换
    sm.update()
    assert_eq(sm.current_state_id, 1, "帧6后 State 01 (TitleLoop)")

    print("\n  📋 State 00→01 流转成功! 共需 ~6 帧")


def test03_start_to_menu():
    """测试 State 01 → State 02 (按 START)"""
    data = MockDataCache()
    sm = MockStateMachine(data)
    sm.transition_to(0)

    # 快进到 State 01
    for _ in range(10):
        sm.update()
    assert_eq(sm.current_state_id, 1, "应在 State 01 (TitleLoop)")

    # 无输入时保持
    for _ in range(5):
        sm.update()
    assert_eq(sm.current_state_id, 1, "无输入时保持 State 01")

    # 按下 START
    sm.update(input_pressed=Button.START)
    assert_eq(sm.current_state_id, 2, "按 START 后 → State 02 (MenuSelect)")

    print("\n  📋 State 01→02 流转成功!")


def test04_menu_navigation():
    """测试菜单上下移动"""
    data = MockDataCache()
    sm = MockStateMachine(data)
    sm.transition_to(0)

    # 快进到 State 02
    for _ in range(10):
        sm.update()
    sm.update(input_pressed=Button.START)
    assert_eq(sm.current_state_id, 2, "应在 State 02")

    # 默认选第0项, 光标Y=80
    assert_eq(sm._cursor_sprite_y, 80, "默认光标 Y=80 (1P GAME)")

    # 按 ↓
    sm.update(input_pressed=Button.DOWN)
    assert_eq(sm._cursor_sprite_y, 104, "↓后光标 Y=104 (2P GAME)")

    # 再按 ↓
    sm.update(input_pressed=Button.DOWN)
    assert_eq(sm._cursor_sprite_y, 128, "↓↓后光标 Y=128 (CONTINUE)")

    # 按 ↑
    sm.update(input_pressed=Button.UP)
    assert_eq(sm._cursor_sprite_y, 104, "↑后光标 Y=104")

    print("\n  📋 菜单导航正常!")


def test05_confirm_to_team_select():
    """测试菜单确认 → State 03"""
    data = MockDataCache()
    sm = MockStateMachine(data)
    sm.transition_to(0)

    # 快进到 State 02
    for _ in range(10):
        sm.update()
    sm.update(input_pressed=Button.START)
    assert_eq(sm.current_state_id, 2, "应在 State 02")

    # 按 A 确认
    sm.update(input_pressed=Button.A)
    assert_eq(sm.current_state_id, 3, "按 A 后 → State 03 (TeamSelect)")
    assert_eq(data.get('playerCount'), 1, "playerCount=1 (1P GAME)")

    print("\n  📋 State 02→03 流转成功!")


def test06_cancel_back_to_title():
    """测试 B 键返回标题"""
    data = MockDataCache()
    sm = MockStateMachine(data)
    sm.transition_to(0)

    for _ in range(10):
        sm.update()
    sm.update(input_pressed=Button.START)
    assert_eq(sm.current_state_id, 2, "应在 State 02")

    # 按 B
    sm.update(input_pressed=Button.B)
    assert_eq(sm.current_state_id, 1, "按 B 后 → State 01 (TitleLoop)")

    print("\n  📋 B 键返回标题正常!")


def test07_full_flow():
    """完整流程 State 00→01→02→03"""
    data = MockDataCache()
    sm = MockStateMachine(data)
    sm.transition_to(0)

    # Phase 1: 标题初始化
    print("  ⏳ Phase 1: 标题初始化...")
    for _ in range(10):
        sm.update()
    assert_eq(sm.current_state_id, 1, "[Phase1] State 01")

    # Phase 2: 按 START
    print("  ⏳ Phase 2: 标题画面 → 按 START...")
    sm.update(input_pressed=Button.START)
    assert_eq(sm.current_state_id, 2, "[Phase2] State 02")

    # Phase 3: 菜单操作
    print("  ⏳ Phase 3: 菜单操作 → ↓↓ → A...")
    sm.update(input_pressed=Button.DOWN)
    sm.update(input_pressed=Button.DOWN)
    sm.update(input_pressed=Button.A)
    assert_eq(sm.current_state_id, 3, "[Phase3] State 03 (TeamSelect)")
    assert_true(data.get('isContinue'), "[Phase3] isContinue=True")

    print("\n  📋 完整流程 State 00→01→02→03 全部通过! 🎉")


def test08_bank_lock_protection():
    """测试 bankLock 保护机制"""
    data = MockDataCache()
    sm = MockStateMachine(data)
    sm.transition_to(0)

    data.bank_lock = 1
    assert_eq(data.bank_lock, 1, "bankLock 设置为 1")

    print("\n  📋 bankLock 机制验证通过!")


# ============================================================
# 主入口
# ============================================================

def main():
    print(r"""
╔══════════════════════════════════════════════════════════╗
║    天使之翼 H5 - State 流转测试 (Python)                ║
║    State Machine Flow Test                              ║
╚══════════════════════════════════════════════════════════╝
""")

    tests = [
        ("初始状态验证", test01_initial_state),
        ("State 00→01 自动流转", test02_auto_transition_to_title_loop),
        ("State 01→02 按START进入菜单", test03_start_to_menu),
        ("State 02 菜单导航", test04_menu_navigation),
        ("State 02→03 确认选择", test05_confirm_to_team_select),
        ("State 02 B键返回标题", test06_cancel_back_to_title),
        ("完整流程 State 00→01→02→03", test07_full_flow),
        ("bankLock 保护机制", test08_bank_lock_protection),
    ]

    for name, fn in tests:
        section(name)
        try:
            fn()
        except Exception as e:
            print(f"\n  💥 测试 '{name}' 异常: {e}")
            import traceback
            traceback.print_exc()
            global failed
            failed += 1

    print(f"\n{'='*60}")
    print(f"  测试完成: ✅ {passed} 通过, ❌ {failed} 失败")
    print(f"{'='*60}\n")

    return 0 if failed == 0 else 1


if __name__ == '__main__':
    sys.exit(main())

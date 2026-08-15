// ============================================================================
// Pic Pic (Japan) 真实 ROM 状态机映射表
// 依据: tools/arm9-full.dis.txt / tools/state-machine.dis.txt / tools/_dump_funcs_out.txt
//
// 全局结构基址 0x020DEB70:
//   [+0x0c] = SCENE ID
//   [+0x14] = SUBSTATE
//   [+0x28] = STATE
//   [+0x34] = 回调表（enter/exit）
//   [+0x38] = 状态附加参数
//   [+0x3c] = 场景 widget 尺寸
//
// 主调度器 0x205113c 双层分派:
//   SUBSTATE=1 → STATE 0x00~0x0A（boot / 槽位管理）
//   SUBSTATE=2 → STATE 0x0B~0x14（主流程）
//   SUBSTATE=3 → 0x205171C 再分派（STATE 0x16~0x19）
//
// 真实流程链:
//   boot → title(0x11) → profile-naming(f_make) → mode select(0x12)
//        → state select(0x0D) → gaming(0x13) → achieve(0x14)
//        → saving(0x10) → 回 state select(0x08→0x0D) → etc
// ============================================================================

// --- 全局结构偏移（0x020DEB70 基址） ---
export const GBL = {
  BASE: 0x020DEB70,
  OFFSET_SCENE: 0x0c,
  OFFSET_SUBSTATE: 0x14,
  OFFSET_STATE: 0x28,
  OFFSET_CALLBACK_TABLE: 0x34,
  OFFSET_STATE_PARAM: 0x38,
  OFFSET_WIDGET_SIZE: 0x3c,
} as const;

// --- STATE 常量（真实 ROM 值） ---
export const ROM_STATE = {
  // SUBSTATE=1 段（boot / 存档槽管理）
  ST_BOOT_INIT: 0x00,       // 上电初始化
  ST_RESET: 0x05,           // 重置
  ST_SAVE_CHECK: 0x06,      // 存档检查
  ST_SLOT_READ: 0x08,       // 槽位读取 → 回 state select
  ST_SLOT_SHIFT: 0x09,      // 槽位移位
  ST_PATH_BUILD: 0x0B,      // 路径/场景初始化 (0x20558F0) → 0x11

  // SUBSTATE=2 段（主流程）
  ST_SCENE_INIT: 0x0B,      // 大场景初始化 (0x20558F0) → 0x11
  ST_MODE_INIT: 0x0C,       // RNG/模式初始化 (0x2053BF4+0x205418C) → 0x12
  ST_STATE_SELECT: 0x0D,    // 选关 select/（No_window_map/lap/fap）
  ST_RESULT_CHECK: 0x0E,    // 完成检查 (0x2055D9C) → ==2 → 0x14
  ST_SAVING: 0x10,          // 写存档槽 (0x2051BE8+0x2051D5C) → 0x08
  ST_TITLE: 0x11,           // 标题+建档命名 title/ + f_make/
  ST_MODE_SELECT: 0x12,     // 模式选择 cinario_select/
  ST_GAMING: 0x13,          // 游玩 map/ lap/ fap/（game setup 0x2055BC8）
  ST_ACHIEVE: 0x14,         // 完成画面 map_comp/ lap_comp/ fap_comp/

  // SUBSTATE=3 段
  ST_TUTORIAL: 0x16,        // tutorial/（教学）
  ST_OPTION: 0x17,          // option/（设置）
  ST_TAIKEN: 0x18,          // taiken/（体验）
  ST_OTAMESI: 0x19,         // otamesi/（试玩）
} as const;

export type RomStateValue = (typeof ROM_STATE)[keyof typeof ROM_STATE];

// --- SUBSTATE 常量 ---
export const ROM_SUBSTATE = {
  SUB_BOOT: 1,    // STATE 0x00~0x0A
  SUB_MAIN: 2,    // STATE 0x0B~0x14
  SUB_EXTRA: 3,   // STATE 0x16~0x19 (0x205171C)
} as const;

// --- 状态切换辅助函数（对应 ROM 0x2052a00） ---
// 0x2052a00: 读 [gbl+0x34] 回调表 → 退出回调 → 写 [gbl+0x28] → 进入回调
export function makeSetState() {
  return {
    writeState: (g: { state: number; subState: number }, next: RomStateValue) => {
      g.state = next;
    },
    writeSubState: (g: { state: number; subState: number }, s: number) => {
      g.subState = s;
    },
  };
}

// --- 模式 ---
export type ModeId = 'map' | 'lap' | 'fap';

export const MODES: { id: ModeId; name: string; resDir: string; compDir: string }[] = [
  { id: 'map', name: '迷宫', resDir: 'map/', compDir: 'map_comp/' },
  { id: 'lap', name: '连线', resDir: 'lap/', compDir: 'lap_comp/' },
  { id: 'fap', name: '数格子', resDir: 'fap/', compDir: 'fap_comp/' },
];

// 各模式关卡数（真实数据）
export const MODE_STAGE_COUNT: Record<ModeId, number> = {
  map: 404,
  lap: 400,
  fap: 405,
};

// --- 难度等级（Lv1-Lv5）分段：均匀分 5 段，滑块跳转用 ---
// 返回 [start, end]（1-based，闭区间）
export function getLevelRange(mode: ModeId, lv: number): [number, number] {
  const total = MODE_STAGE_COUNT[mode];
  const seg = Math.ceil(total / 5);
  const start = (lv - 1) * seg + 1;
  const end = Math.min(lv * seg, total);
  return [start, end];
}

// 某关卡属于哪个 Lv（1-5）
export function getStageLevel(mode: ModeId, stage: number): number {
  const total = MODE_STAGE_COUNT[mode];
  const seg = Math.ceil(total / 5);
  return Math.min(5, Math.ceil(stage / seg));
}

// --- 3 个存档槽（欧版截图 choose-profile：3 个手绘存档槽） ---
export const SAVE_SLOT_COUNT = 3;

/**
 * MatchSceneTable — bank19 比赛场景数据表 ($8000-$9FFF)
 * @bank 19
 *
 * 布局: [0x0000-0x0FFF] metatile/tile 图块数据, [0x1000-0x144D] 代码, [0x144E-0x1466] 球员起始位置表,
 *       [0x1467-0x1FFF] 比赛场景脚本流 (消费方: MatchSceneService $902D 循环 + $E0-$E6/$FC 命令)。
 *
 * 场景脚本命令 (每字节 >= $E0 为命令, 其余为精灵数据):
 *   $E0 事件0: JSR $C52D (精灵批初始化) + 读字节→$C54E→清 $0011/$0012/$000D/$000E/$05D2 + 填 $0557/$0558=$FF
 *   $E1 事件1: 读字节 N, 协程让出等待 N 帧
 *   $E2 事件2: 读 3 字节 (X/值/阶段号), 阶段号<$0B→$002A=X 否则 $002B=X; JSR $C50C (查玩家指针); 写值到 ($0034)
 *   $E3 事件3: JMP $9349 (比赛初始化 matchInit9349)
 *   $E4 事件4: 读字节→ram_008B (精灵索引)
 *   $E5 事件5: 读字节 0-3 → 调色板操作 ($9240/$9246/$92A8/$92DD)
 *   $E6 事件6: ram_063F |= $40 (切 $90AF 精灵连续模式)
 *   $FC 事件: ram_0515=$80 (等待精灵批完成)
 *   $FF: 精灵填充数据 (不消费)
 *
 * 消费方: MatchSceneService (bank19 比赛场景), 经 ram_0088/0089 指针 ($B467 窗口 = 脚本流起点) 读取。
 */
/** 场景脚本流起点 (bank 偏移) — 对应窗口地址 $B467 */
export declare const MATCH_SCENE_SCRIPT_OFFSET = 5223;
/** 场景脚本流长度 (到 $FF 填充区起点) */
export declare const MATCH_SCENE_SCRIPT_LENGTH = 1064;
/** 计分板控制字节 $B402-$B405 (bank 偏移 $1402-$1405) */
export declare const MATCH_CTRL_B402: readonly number[];
/** 球员起始位置表 $144E-$1466 (25 字节, X/Y 坐标对) */
export declare const MATCH_POS_TABLE: readonly number[];
/** 场景脚本流 (从 $1467 起到 $FF 填充区前) */
export declare const MATCH_SCENE_SCRIPT: readonly number[];
/** 按脚本流相对索引读字节 (越界返回 $FF) */
export declare function getMatchScriptByte(idx: number): number;
/** bank19 全量数据 (8192 字节, 含 metatile 图块区, 供渲染/其他消费方) */
export declare const MATCH_SCENE_BYTES_19: readonly number[];

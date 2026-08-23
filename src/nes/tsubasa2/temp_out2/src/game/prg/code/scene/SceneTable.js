"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCENE_TABLE = void 0;
exports.getSceneEntry = getSceneEntry;
/** 场景表：24 项，顺序与跳转表 $A491 完全一致 */
exports.SCENE_TABLE = [
    {
        id: 0,
        jumpAddr: '$A4C0',
        entryAddr: '$A4C1',
        behavior: '开场序列：渐显($9A0D) → 等16帧 → 0x30次{OAM下漂+1} → 清$005B/$007B → $8AF7(0x17) → $0044=$68 → $8920(3) → $008E→$0090/$008F→$0091 → 等4帧 → $9A35调色板 → $88FB精灵翻转 → 滚动循环{INC $0079; DEC $007C×2; $0044-=2; until<$03} → $8920(0) → ram_001B|=$01 → 等240+60帧 → 清bit0 → $0090=0/$0091=2 → $99F0渐隐 → $9B7F隐藏OAM → $98A0清NT → $23C0填2行×32列$55 → $8920(1) → 返回 2',
        controller: undefined, // Scene0Controller（已翻译）
    },
    {
        id: 1,
        jumpAddr: '$A559',
        entryAddr: '$A55A',
        behavior: '数学工具：$0060=0; $00EC 右移2位(LSR/ROR×2)→$0061; 若$0062 bit7 置位则 $0060/$0061 取 16bit 补码；返回 3',
    },
    {
        id: 2,
        jumpAddr: '$A57B',
        entryAddr: '$A57C',
        behavior: 'JSR $9B91 清精灵扩展表（$0568/$0588/$05A8/$05C8=0）；返回 2',
    },
    {
        id: 3,
        jumpAddr: '$A581',
        entryAddr: '$A582',
        behavior: '清 NT：NT0（$2000 起 0x10 行 × 0x20 列）与 NT1（$2400 起 0x20 行 × 0x20 列）全部写 0；返回 2',
    },
    {
        id: 4,
        jumpAddr: '$A5A2',
        entryAddr: '$A5A3',
        behavior: 'JSR $9B7F 隐藏全部 OAM（$0468/$0200 填 $F8，清扩展表）；返回 2',
    },
    {
        id: 5,
        jumpAddr: '$A5A8',
        entryAddr: '$A5A9',
        behavior: 'LDX #$09; JSR $9F96（$0009 延迟计数器处理）；返回 2',
    },
    {
        id: 6,
        jumpAddr: '$A5B0',
        entryAddr: '$A5B1',
        behavior: 'LDX #$09; JSR $9F89（$0009 标志处理）；返回 2',
    },
    {
        id: 7,
        jumpAddr: '$A5B8',
        entryAddr: '$A5B9',
        behavior: '$0099 = $FF；返回 2',
    },
    {
        id: 8,
        jumpAddr: '$A5BF',
        entryAddr: '$A5C0',
        behavior: '$A000=0（MMC3 写，H5 省略）；ram_001B &= ~$40；返回 2',
    },
    {
        id: 9,
        jumpAddr: '$A5CD',
        entryAddr: '$A5CE',
        behavior: '$A000=1（MMC3 写，H5 省略）；ram_001B |= $40；返回 2',
    },
    {
        id: 10,
        jumpAddr: '$A5DB',
        entryAddr: '$A5DC',
        behavior: '$8895(0) 装载 CHR 配置 0；$8920(5) 装载场景数据 5；返回 2',
    },
    {
        id: 11,
        jumpAddr: '$A5E8',
        entryAddr: '$A5E9',
        behavior: '若 $000D≠0：清 $000D/$000E；否则 $8895($10) 装载 CHR 配置 + $8920(6) 场景数据 6；返回 2',
    },
    {
        id: 12,
        jumpAddr: '$A602',
        entryAddr: '$A603',
        behavior: '若 $000D≠0：清 $000D/$000E；否则 $8895($30) 装载 CHR 配置 + $8920(8) 场景数据 8；返回 2',
    },
    {
        id: 13,
        jumpAddr: '$A61C',
        entryAddr: '$A61D',
        behavior: '$8895($20) 装载 CHR 配置 + $8920(7) 场景数据 7；返回 2',
    },
    {
        id: 14,
        jumpAddr: '$A629',
        entryAddr: '$A62A',
        behavior: '$8976(装载 NT 属性表 $23BD 起)；$9A35 调色板装载+满渐显；等1帧；$058F 清 bit7；$004C=$82；$A82F(精灵装载, $20列×$28行, $C8)；返回 2',
    },
    {
        id: 15,
        jumpAddr: '$A650',
        entryAddr: '$A651',
        behavior: 'NT 缓冲写入长场景：读 $AA97 表逐项（高字节+长度/低字节+数据首字节），经 $9B28/$9B5E 写 $05E8 渲染缓冲，BIT $00EA 控制结束/延时，直至表项 bit7 置位；返回 2',
    },
    {
        id: 16,
        jumpAddr: '$A69C',
        entryAddr: '$A69D',
        behavior: '精灵放置场景：若 $04E5≠$FF：$A767 复制精灵属性表 + 多组 $A72C 精灵放置（组1: $0468+ 4×0x10, 组2: $0468+0x1C, 复制 $A67B→$0460 精灵扩展表）；否则仅 $A767 复制 + 两组放置；返回 2',
    },
    {
        id: 17,
        jumpAddr: '$A77A',
        entryAddr: '$A77B',
        behavior: '$8895($80) 装载 CHR 配置；返回 2',
    },
    {
        id: 18,
        jumpAddr: '$A782',
        entryAddr: '$A783',
        behavior: '等 2 帧；$88FB 精灵属性翻转；返回 2',
    },
    {
        id: 19,
        jumpAddr: '$A78D',
        entryAddr: '$A78E',
        behavior: '精灵闪烁循环：LDY #$40 次 {等1帧; 扫描 $0468 起点在屏幕外($0468<0)的精灵 attr |= $08}；$9B91 清扩展表；等1帧；等待 $0009==0 → JMP $A651（回到场景 15）',
    },
    {
        id: 20,
        jumpAddr: '$A7BD',
        entryAddr: '$A7BE',
        behavior: '等 1 帧；$A82F(精灵装载, $64列×$28行, $B0)；返回 2',
    },
    {
        id: 21,
        jumpAddr: '$A7CE',
        entryAddr: '$A7CF',
        behavior: '$8895($81) 装载 CHR 配置；返回 2',
    },
    {
        id: 22,
        jumpAddr: '$A7D6',
        entryAddr: '$A7D7',
        behavior: 'LDY #$80 次循环 {等1帧; 扫描 $0468 起点在屏幕外($0468<0)的精灵 attr |= $04}；返回 2',
    },
    {
        id: 23,
        jumpAddr: '$A7FA',
        entryAddr: '$A7FB',
        behavior: '数值显示：$0028 → $9E7C(转16bit)；$00EC 高4位 → $AC6D 查表 → $88CA 写 OAM；$00EC 低4位 → $AC71 查表 → $88CA；各等6帧；返回 2',
    },
];
/** 按场景号取条目 */
function getSceneEntry(sceneId) {
    return exports.SCENE_TABLE.find((e) => e.id === sceneId);
}

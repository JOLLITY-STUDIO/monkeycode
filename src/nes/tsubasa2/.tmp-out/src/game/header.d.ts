/**
 * 天游戏 2 — 翻译层头契约（业务语义，无硬件窗口概念）
 *
 * iNES header 字节保留作为版本标识（解包需要），但 H5 已无 MMC3 / bank 切换语义：
 *   - 数据全部声明式表（SceneTable / SongCatalog / SkillTable 等）
 *   - 状态通过具名视图访问（store.scene / store.palette / store.audioState ...）
 *   - bank 编号、CHR/PRG 切换粒度、MMC3 寄存器 → 全部省略
 *
 * 渲染参数（Mirroring）保留作为业务配置项。
 */
export declare const HEADER: Uint8Array<ArrayBuffer>;
export declare enum Mirroring {
    Horizontal = 0,// NT0 左 / NT1 右 (64×30 水平世界)
    Vertical = 1
}
export declare const CONFIG: {
    readonly mirroring: Mirroring.Horizontal;
};

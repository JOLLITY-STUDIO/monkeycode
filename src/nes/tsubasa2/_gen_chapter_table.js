// 一次性生成脚本: 从 _tmp_bank18.json 生成 chapter-table.ts (机器提取, 保证准确)
const fs = require('fs');
const a = JSON.parse(fs.readFileSync('_tmp_bank18.json', 'utf8'));

const parts = [];
for (let i = 0; i < a.length; i += 16) {
  parts.push('  ' + a.slice(i, i + 16).join(', '));
}

const body = `/**
 * chapter-table — bank18 场景地图数据表 (章节/场景地图)
 * @bank 18 ($8000-$9FFF 窗口)
 *
 * bank18 为纯数据段 (无 6502 指令), 共 8192 字节, 全部为场景/章节地图 tile 数据。
 * 本模块从 asm/bank18/_full.s 逐行 .byte 提取为声明式数组, 供 StorySceneController 装载。
 *
 * 翻译版禁止 PRG_BANK_18[addr] 裸地址随机访问, 一律使用本模块声明式数组。
 */

/** bank18 场景地图数据 (8192 字节, 从 _full.s 提取) */
export const CHAPTER_MAP_DATA: readonly number[] = [
${parts.join(',\n')}
];

/**
 * 章节/场景 → 地图数据引用。
 * bank18 为整块地图数据 (世界/城镇/室内场景), 由章节 ID 引用装载。
 */
export interface ChapterMapRef {
  /** 地图数据起点偏移 (相对 CHAPTER_MAP_DATA) */
  offset: number;
  /** 地图数据字节长度 */
  length: number;
  /** 每行 tile 数 (宽) */
  width: number;
}

/** 章节指针表: 章节 ID → 场景地图引用 */
export const CHAPTER_TABLE: Readonly<Record<number, ChapterMapRef>> = {
  // 章节 0 引用整块地图数据 (世界/城镇地图)。细分章节段见各场景控制器。
  0: { offset: 0, length: 0x2000, width: 16 },
};

export default CHAPTER_TABLE;
`;

fs.writeFileSync('src/game/prg/data/scene/chapter-table.ts', body);
console.log('written chapter-table.ts bytes=' + a.length);

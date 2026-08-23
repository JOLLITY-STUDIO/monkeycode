/**
 * prg/index.ts — 翻译层出口契约
 *
 * code/ = 业务逻辑（Service，按业务域分包）
 * data/ = 数据模型（Table，ORM 风格）
 *
 * 命名规范 v2（Java/Spring 风格）：禁止 bankXX 前缀。
 * 外部只能通过 src/game/index.ts（组合根）访问。
 */
export * from './code/index';
export * from './data/index';

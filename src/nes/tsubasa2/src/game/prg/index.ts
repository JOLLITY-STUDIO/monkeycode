/**
 * prg/index.ts — 翻译层出口契约
 *
 * code/ = 业务逻辑 (Service, 按业务域分包)
 * data/ = 数据模型 (Table, ORM 风格)
 *
 * 命名规范 v2 (Java/Spring 风格): 弃用 bankXX 前缀, 见 .codebuddy/rules/新架构命名规范.mdc
 */
export * from './code/index';
export { DataStore } from './data/store/DataStore';

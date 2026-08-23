/**
 * 自动化测试套件 — tsubasa2-h5-src 核心引擎
 *
 * 覆盖维度：
 *   1. 单元测试 — DataStore / Renderer / Bank00 / Bank12 / OamManager
 *   2. 集成测试 — 引擎完整初始化、帧循环、场景流转、渲染输出
 *   3. 输入测试 — 按键 press/release、位掩码、上升沿
 *   4. 性能测试 — FPS 稳定性、连续帧耗时、内存增长
 *   5. 边界测试 — 越界 bankId、空数据、重复启动、极值帧
 *
 * 每个测试用例返回 { name, pass, detail } 由 runner 汇总。
 */
import { Tsubasa2 } from '../src/index';
export interface TestResult {
    suite: string;
    name: string;
    pass: boolean;
    detail: string;
}
export interface TestContext {
    game: Tsubasa2 | null;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
}
export declare function getResults(): TestResult[];
export declare function clearResults(): void;
export declare function runUnitTests(ctx: TestContext): Promise<void>;
export declare function runIntegrationTests(ctx: TestContext): Promise<void>;
export declare function runInputTests(ctx: TestContext): Promise<void>;
export declare function runPerformanceTests(ctx: TestContext): Promise<void>;
export declare function runEdgeTests(ctx: TestContext): Promise<void>;

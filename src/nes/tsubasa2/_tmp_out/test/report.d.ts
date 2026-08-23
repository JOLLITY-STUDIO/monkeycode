/**
 * 测试报告生成器
 *
 * 汇总所有测试结果，按套件分组，统计通过率，
 * 并列出已知 bug（含代码审查发现的问题）。
 */
export interface KnownBug {
    id: string;
    severity: 'Critical' | 'Major' | 'Minor';
    title: string;
    file: string;
    line?: string;
    description: string;
    expected: string;
    actual: string;
    reproducible: string;
}
/**
 * 已知 bug 清单（来自代码审查 + 测试发现）
 * 这些 bug 在测试前通过代码静态分析已确认，测试运行进一步验证。
 */
export declare const KNOWN_BUGS: KnownBug[];
/** 生成报告 HTML 并写入报告面板 */
export declare function generateReport(): void;
/** 导出报告为 Markdown 文本文件下载 */
export declare function exportReportMarkdown(): void;

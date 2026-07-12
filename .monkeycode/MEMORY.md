# 用户指令记忆

本文件记录了用户的指令、偏好和教导，用于在未来的交互中提供参考。

## 格式

### 用户指令条目
用户指令条目应遵循以下格式：

[用户指令摘要]
- Date: [YYYY-MM-DD]
- Context: [提及的场景或时间]
- Instructions:
  - [用户教导或指示的内容，逐行描述]

### 项目知识条目
Agent 在任务执行过程中发现的条目应遵循以下格式：

[项目知识摘要]
- Date: [YYYY-MM-DD]
- Context: Agent 在执行 [具体任务描述] 时发现
- Category: [运维部署|构建方法|测试方法|排错调试|工作流协作|环境配置]
- Instructions:
  - [具体的知识点，逐行描述]

## 去重策略
- 添加新条目前，检查是否存在相似或相同的指令
- 若发现重复，跳过新条目或与已有条目合并
- 合并时，更新上下文或日期信息

## 条目

---

Langrisser II MD ROM 解析项目
- Date: 2026-07-12
- Context: Langrisser II (MD/Genesis) ROM 逆向工程项目
- Category: 工作流协作
- Instructions:
  - ROM文件: `src/langrisser2/rom.md` (2MB, 与粉丝站同一MD版本)
  - 参考数据: `src/langrisser2/docs/` (Langrisser专题站粉丝资料, GBK编码)
  - 关键代码: `./monkeycode-tmp-files/1b73ae22-Langrisser II (Japan).md-1.c` (Ghidra伪代码)
  - RAM dump: `./monkeycode-tmp-files/17e953fa-Langrisser II (Japan)_68K-1.ram` (64KB)
  - 已完成: 职业名表(151条)、职业数据(28B)、能力参考(39类)、道具(38条)、单位结构体
  - 待完成: 转职路线、魔法数据、佣兵数据、精灵图(tiles)、游戏逻辑(战斗/AI)

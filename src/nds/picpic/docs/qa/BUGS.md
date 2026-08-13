# BUG 记录（BUGS）

> 由 11 测试/12 审查维护。记录汇编与 ROM 差异、汇编与 TS 差异、数据误判等，含修复状态。格式：ID | 描述 | 环节 | 状态 | 修复记录。

## 已记录 BUG
### BUG-001 map 关卡 404 → 392 有效
- **描述**：`map_d/` 解包 404 个单元，部分文件损坏/空（NSCR 头校验失败或尺寸为 0），转换后仅 392 个有效谜题
- **环节**：06 资源提取
- **状态**：✅ 已解决（workaround）
- **修复**：`tools/convert_maps.py`/`convert_maps2.py` 增加有效性过滤；`P<id>` 索引按有效集生成。注：lap/fap 转换时需复用同一过滤策略
- **影响**：map 模式实际可选关 392 关（< 声明的 404）

### BUG-002 小程序帧循环无 rAF
- **描述**：小程序环境无全局 requestAnimationFrame/performance，直接调用会崩溃
- **环节**：08 引擎
- **状态**：✅ 已解决
- **修复**：`engine.ts createFrameLooper()` 三级回退：Canvas 节点 rAF → 全局 rAF → setTimeout(16ms)

### BUG-003 存档读写环境差异
- **描述**：非小程序环境调用 wx.getStorageSync/setStorageSync 抛异常
- **环节**：08 引擎
- **状态**：✅ 已解决
- **修复**：try/catch 包裹（loadSlotsFromStorageSafe/writeSlot），非小程序环境忽略

## 待确认/待修复
### BUG-004 场景资源为占位渲染
- **描述**：title/f_make/select/comp 场景图形为 Canvas 手绘占位，未使用 ROM 提取的 NCGR/NCLR/NSCR 数据（FIDELITY-PENDING）
- **环节**：09 场景 + 06 资源
- **状态**：⏳ 待资源就绪后替换（L0→L2/L3）

### BUG-005 lap/fap 数据未转换
- **描述**：lap_d/ fap_d/ 未执行转换管线，getStageDetail 返回 null
- **环节**：06 资源提取
- **状态**：⏳ 待办

### BUG-006 Nurie_sd.sdat 音频未接入
- **描述**：音频档案未解析，游戏无 BGM/SE
- **环节**：06/08
- **状态**：⏳ 待办

## 关联
- 测试报告：docs/qa/TEST_REPORT.md
- 审查记录：docs/qa/REVIEW_LOG.md

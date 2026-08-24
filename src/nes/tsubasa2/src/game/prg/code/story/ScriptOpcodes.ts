/**
 * ScriptOpcodes — 剧情脚本操作码定义
 *
 * opcode 数值在 V0.4 从 asm 脚本解释器提取，禁止臆造。
 * 以下枚举仅为契约占位，数值待提取后覆盖。
 */
export enum ScriptOpcode {
  // TODO V0.4: 从脚本解释器提取真实 opcode 数值
  Nop = 0x00,
  Text = 0x01,       // 显示文本
  WaitFrames = 0x02, // 等待 N 帧
  WaitInput = 0x03,  // 等待按键
  Jump = 0x04,       // 跳转
  Branch = 0x05,     // 条件分支
  Call = 0x06,       // 调用子段
  Return = 0x07,     // 返回
  End = 0xff,        // 段结束
}

/** 初始化 opcode 表（V0.4 后改为从数据表加载真实映射） */
export function initScriptOpcodes(): void {
  // TODO V0.4: 从 asm 提取 opcode → handler 映射
}
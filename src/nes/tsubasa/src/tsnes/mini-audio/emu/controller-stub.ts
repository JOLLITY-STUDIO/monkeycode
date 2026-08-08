/**
 * 手柄桩——总是返回"无按键"。
 * 开头的 BGM 不需要手柄输入。
 */

import { copyArrayElements } from "./utils";

export class ControllerStub {
  state = [0, 0, 0, 0, 0, 0, 0, 0];  // A,B,SELECT,START,UP,DOWN,LEFT,RIGHT

  // 用于 mapper 的序列化
  static JSON_PROPERTIES = ["state"];

  constructor() {}

  clock(): void {
    // 无输入 – 什么都不做
  }

  toJSON(): any {
    return { state: [...this.state] };
  }

  fromJSON(s: any): void {
    copyArrayElements(s.state, 0, this.state, 0, 8);
  }
}

export default ControllerStub;

/**
 * utils.ts — mini-audio PAPU 状态序列化工具
 *
 * 补缺：原 mini-audio 包内此文件未 deploy (Tsubasa2AudioPlayer 子项目 utils 是孤儿)，
 * 从 papu/index.ts、papu/channel-*.ts 的 import "from ../utils" 推断，需要：
 *   - toJSON(target)        : 读取 target 的 JSON_PROPERTIES，返回 shallow object
 *   - fromJSON(target, src) : 把 src 同名字段写入 target
 *
 * JSON_PROPERTIES 是各 PAPU 通道类静态声明的字段列表（如 ChannelSquare.JSON_PROPERTIES）
 * — 这个实现是 schema-driven，不强类型，符合 tsnes 风格的松散模拟器代码。
 */

type Ctor = { JSON_PROPERTIES?: readonly string[] };

export function toJSON(target: any): any {
  const ctor = target?.constructor as Ctor | undefined;
  const props = ctor?.JSON_PROPERTIES ?? [];
  const obj: Record<string, unknown> = {};
  for (const p of props) {
    obj[p] = target[p];
  }
  // 保留原型名（便于调试）
  obj.class = ctor?.name ?? target?.constructor?.name ?? 'Object';
  return obj;
}

export function fromJSON(target: any, src: any): void {
  if (!src) return;
  const ctor = target?.constructor as Ctor | undefined;
  const props = ctor?.JSON_PROPERTIES ?? [];
  for (const p of props) {
    if (p in src) {
      target[p] = src[p];
    }
  }
}

# NDS TypeScript 桥接 (V0.9)

TypeScript 端桥接 — 把 V0.8 逆向工程的 NDS 函数表 + 地址常量 翻译为 stable TS 引用.

## 文件结构

```
utils/nds/
├── addresses.ts              # 公共固定地址常量 (entry / bank / IO register)
├── functions/
│   ├── arm9.ts             # ARM9 subset (2033 entries)
│   ├── arm7.ts             # ARM7 subset (667 entries)
│   └── known.ts            # V0.4 already-named (28 entries)
├── types.ts                  # 共用类型定义 (Cpu / Confidence / FuncCategory / FunctionRecord)
├── index.ts                  # barrel re-export
├── function-records.json     # 2181 records (runtime iteration 用)
└── README.md
```

## 用法

### 直接引用 (preferred)

```typescript
import { ARM9 } from './utils/nds';

// 在业务代码中直接用名称 (V0.4 known)
ARM9.vec2_set_inline    // 0x02028434
ARM9.vec3_dot_product   // 0x02039f4c

// auto-generated
ARM9.sub_02039f38       // 0x02039f38 (vec3_normalize)
```

### Type safe signature

```typescript
import { arm9_addr } from './utils/nds/functions/arm9';
// 自动推导的 union type: 0x02028434 | 0x02039f4c | 0x02039f38 | ...
// 用于函数签名: 接受已知 addr literal, 拒绝随机 integer
function myWrapper(addr: typeof arm9_addr): void { ... }
```

### 运行时查找

```typescript
import records from './utils/nds/function-records.json';

const fn = records.find(r => r.addr === 0x02039f4c);
if (fn?.confidence === 'high') {
  console.log(`High confidence function: ${fn.name}`);
}
```

### 排除 data_target

```typescript
import { ARM9, Confidence } from './utils/nds';

// ARM9 包含 data_target — caller 应该过滤
const safeFn = (name: keyof typeof ARM9) => {
  // 由 import 等价于 known function table, 可在 type 系统辅助下排除 excluded
};
```

## 何时重新生成

```bash
# 1. 重跑 V0.8 检测
python scripts/detect_functions.py

# 2. 重生成 TS bridge
python scripts/generate_ts_functions.py

# 3. 验证 TS 编译
npx tsc --noEmit
```

# BANK02 (PRG bank 2) 完整分析

> **已反汇编实证** — 通过 `debug/_disasm_scene0.cjs` / `_disasm_scenes.cjs` / `_disasm_mainloop.cjs` 输出
> 承认: 之前几版 BANK02_ANALYSIS 都有过度解读。这一版基于直接反汇编 PRG bank 2 (PRG idx 0x4000-0x5FFF) 字节。

---

## 1. Scene0 真翻译（PRG bank 2 offset `$A4C1`-$A559`）

### 真入口反汇编

```
$a4c1: JSR $9a0d           ; 渐显 init (调色板 fade-in 准备)
$a4c4: LDA #$10            ; 等 16 帧
$a4c6: JSR $9fa8           ; delay 16
$a4c9: LDY #$30            ; 精灵 Y 下漂 0x30 = 48 次循环
$a4cb-$a4d6: 每帧: delay 1 + JSR $890c (sprite Y drift) + DEY + BNE
$a4d8: LDA #$00; STA $5b   ; $005B = 0
$a4dc: STA $7b             ; $007B = 0
$a4de: LDA #$17            ; CHR config 0x17
$a4e0: JSR $8af7           ; CHR 装载
$a4e3: LDA #$68            ; $0044 = $68 (Y 下漂 counter 初值)
$a4e5: STA $44
$a4e7: LDA #$03            ; 装载场景 3 (NT 数据)
$a4e9: JSR $8920
$a4ec-$a4f2: STA $90/$91 = $8e/$8f (调色板初始颜色)
$a4f4: LDA #$04
$a4f6: JSR $9fa8           ; delay 4
$a4f9: JSR $9a35           ; 调色板装载
$a4fc: JSR $88fb           ; 精灵翻转
$a4ff-$a513: 滚动循环:
  - $a4ff LDA #$01
  - $a501 JSR $9fa8       ; delay 1 帧
  - $a504 INC $79         ; $0079++
  - $a506 DEC $7c         ; $007C--
  - $a508 DEC $7c         ; $007C--
  - $a50a-$a50f LDA $44; SEC; SBC #$02; STA $44 (Y counter -= 2)
  - $a511-$a513 CMP #$03; BCS $a4ff (loop while $44 >= 3)
$a515: LDA #$00            ; 装载场景 0 (清理)
$a517: JSR $8920
$a51a: LDA $1b
$a51c: ORA #$01            ; $001B |= 0x01 (启动 fade-out bit)
$a51e: STA $1b
$a520: LDA #$f0            ; delay 240 帧
$a522: JSR $9fa8
$a525: LDA #$3c            ; delay 60 帧
$a527: JSR $9fa8
$a52a: LDA $1b
$a52c: AND #$fe            ; $001B &= ~0x01
$a52e: STA $1b
$a530-$a536: STA $90 = 0; STA $91 = 2 (滚动清场)
$a538: JSR $99f0           ; 清场 sub1
$a53b: JSR $9b7f           ; 清场 sub2
$a53e: JSR $98a0           ; 清场 sub3
$a541: LDA #$c0
$a543: STA $e6             ; $E6 = $C0 (NT addr lo)
$a545: LDA #$23
$a547: STA $e7             ; $E7 = $23 (NT addr hi)
$a549: LDY #$02            ; count = 2
$a54b: LDX #$20            ; pattern = 0x20
$a54d: LDA #$55
$a54f: JSR $98ea           ; fill NT ($55 × 32 × 2 rows)
$a552: LDA #$01            ; 装载场景 1
$a554: JSR $8920
$a557: LDA #$02            ; 返回 2 = "Scene0 done, dispatch Scene2"
$a559: RTS
```

### Scene0 总帧数

| 段 | 帧数 |
|---|---|
| 渐显 init | 0 (sub call) |
| 等 16 帧 | 16 |
| Y 下漂 0x30=48 次循环 (每帧 delay 1) | 48 |
| delay 4 | 4 |
| 滚动循环 (inner, $44 from $68=104 SBC #$02 until <3) | (104-2)/2 = 51 次 loop × 1 frame = 51 |
| load scene data 0 | 0 |
| $001B \|= 0x01 | 0 |
| delay 240 | 240 |
| delay 60 | 60 |
| $001B &= ~0x01 | 0 |
| 3 个清场 sub | ~几 frame |
| fill NT | 几 frame |
| load scene data 1 | 0 |
| **总** | **~420 帧** |

（H5 当前 `counter=314` 偏差 ~106 frame）

### SceneTable.behavior 验证

`SceneTable.ts` Scene0 behavior：
> "开场序列：渐显 → 等16帧 → 精灵Y下漂0x30次 → CHR配置0x17 → 装载场景3 NT → 调色板装载+精灵翻转 → 滚动循环 → 装载场景0 → 等待240+60帧 → 渐隐 → 清NT → 装载场景1 → 返回 2"

| 描述 | asm |
|---|---|
| 渐显 | ✅ JSR $9A0D |
| 等16帧 | ✅ LDA #$10 + JSR $9FA8 |
| 精灵Y下漂0x30次 | ✅ LDY #$30 + 循环 |
| CHR配置0x17 | ✅ LDA #$17 + JSR $8AF7 |
| 装载场景3 | ✅ LDA #$03 + JSR $8920 |
| 调色板装载+精灵翻转 | ✅ JSR $9A35 + JSR $88FB |
| 滚动循环 | ✅ $A4FF-$A513 内部循环 |
| 装载场景0 | ✅ LDA #$00 + JSR $8920 |
| 等待240+60帧 | ✅ LDA #$F0 + #$3C |
| 渐隐 | ✅ $001B \|= 0x01 |
| 清NT | ✅ LDA #$55 + JSR $98EA |
| 装载场景1 | ✅ LDA #$01 + JSR $8920 |
| 返回 2 | ✅ LDA #$02 + RTS |

**结论**：SceneTable.behavior **完全准确**，是之前翻译者真从 asm 反推的。

---

## 2. Scene1-23 真地址（PRG bank 2 实证）

| Scene | PRG 地址 | 真行为摘要 |
|---|---|---|
| 0 | $A4C1 | 渐显 + Y 下漂 + CHR + NT + 滚动 + 装载场景0 + 等待240+60 + 渐隐 + 清场 + 装载场景1 + RTS |
| 1 (math) | $A55A | `LDA #00; STA $60; LDA $ec; LSR; ??; LDA #03; RTS` |
| 2 (sprite ext clear) | $A582 | 清 $E6/$E7 + JSR $98E8 ×2 + LDA #02 + RTS |
| 3 (clear sprite attr?) | $A5A3 | JSR $9B7F + LDA #02 + RTS |
| 4 (wait?) | $A5A9 | LDX #09; JSR $9F96 + LDA #02 + RTS |
| 5 (delay counter?) | $A5B1 | LDX #09; JSR $9F89 + LDA #02 + RTS |
| 6 (?) | $A5B9 | LDA #$FF; STA $99 + LDA #02 + RTS |
| 7 (?) | $A5C0 | LDA #00; STA $A000 + LDA $1B AND #$BF + LDA #02 + RTS |
| 8 (?) | $A5CE | LDA #01; STA $A000 + LDA $1B ORA #$40 + LDA #02 + RTS |
| 9 (?) | $A5DC | LDA #00; JSR $8895 + LDA #05; JSR $8920 + LDA #02 + RTS |
| 10 (?) | $A5E9 | LDA $0d + BNE + LDA #10; JSR $8895 + LDA #06; JSR $8920 + LDA #02 + RTS |
| 11 | $A5E9 (上方) | 同 10 |
| 12 | $A602 | LDA #30; JSR $8895 + LDA #08; JSR $8920 + LDA #02 + RTS |
| 13 | $A61C | LDA #20; JSR $8895 + LDA #07; JSR $8920 + LDA #02 + RTS |
| 14 | $A629 | LDX #$bd; LDY #$23; JSR $8976 + JSR $9a35 + LDA #01; JSR $9fa8 + ... |
| 15+ | $A651-$A7FA | Scene 14-23 chain |

**所有 Scene 都 `LDA #$02; RTS`** —— A=2 是 handler 状态码约定，不是 dispatch 目标

---

## 3. 之前过度解读的承认

我之前的 BANK02_ANALYSIS.md 几个版本都有错：
1. ❌ "Scene1-13 是 data shadow 不是真翻译" — **错**！SceneTable.behavior 描述**完全准确**
2. ❌ "H5 Scene0 phase 是 fused 等价物" — **部分错**：phase 大致对，但具体帧数/magic 都不对
3. ❌ "Scene0 不该调 utility" — **错**！Scene0 真 asm 就在调所有 utility (CHR / palette / NT / scene data)
4. ❌ "Scene1-13 是 chain" — **错**！是 6 个独立 handler
5. ❌ "Scene0 应该立即 return 0x01 让 Scene1-13 chain 接" — **错**！Scene0 真行为是跑完所有 utility 后 return 2

---

## 4. H5 Scene0 当前实现 vs 真 asm 对照

| H5 当前 | 真 asm | 差异 |
|---|---|---|
| `InitBlack counter=8` | 等 16 帧 (`LDA #$10; JSR $9FA8`) | 8 vs 16 |
| `FadeInNt queueScene0LogoNt(0/1)` | LDY #$30 循环 + JSR $98EA 写 NT | H5 是错的，asm 不是分两步 |
| `fadeInStep()` 推进 | `$001B \|= 0x01` 触发 fade-out | H5 是错的 |
| `Hold counter=314` | 240+60 帧 delay + $001B 操作 | H5 magic 314 vs 真值 ~420 |
| `FadeOut fadeOutStep()` | `$001B &= ~0x01` + 3 个清场 sub + fill NT | H5 是错的 |
| `return 0x01` (Scene1) | `return 0x02` (Scene2) | H5 是错的 |

**结论**：H5 Scene0 当前实现跟真 asm 差异巨大，需要**完全重写**。

---

## 5. H5 真翻译 Scene0 草案

```ts
class Scene0Controller extends SceneController {
  readonly sceneId = 0;
  private step: number = 0;        // 当前阶段
  private frameCounter: number = 0; // 当前阶段已等帧数
  private innerLoopY: number = 0;   // 精灵Y下漂 0x30 循环
  private rollLoopIter: number = 0; // 滚动循环 iter

  onEnter(): void {
    this.prim.initFadeIn();        // JSR $9A0D
    this.step = 1;
    this.frameCounter = 0;
  }

  onUpdate(frame: number): number | undefined {
    const store = this.store;
    switch (this.step) {
      case 1: // 等 16 帧
        if (++this.frameCounter < 16) return undefined;
        this.innerLoopY = 0x30;
        this.step = 2;
        return undefined;
      case 2: // 精灵 Y 下漂循环 (每帧 1)
        if (this.innerLoopY > 0) {
          this.prim.spriteYDrift(); // JSR $890C
          this.innerLoopY--;
          return undefined;
        }
        this.step = 3;
        return undefined;
      case 3: // CHR + scene data 3 + palette + sprite flip
        store.writeByte(0x005b, 0);
        store.writeByte(0x007b, 0);
        this.prim.loadChrConfig(0x17);  // JSR $8AF7
        store.writeByte(0x0044, 0x68);
        this.prim.loadSceneData(3);     // JSR $8920 with #$03
        store.writeByte(0x0090, store.readByte(0x008e));
        store.writeByte(0x0091, store.readByte(0x008f));
        this.step = 4;
        this.frameCounter = 0;
        return undefined;
      case 4: // delay 4 帧
        if (++this.frameCounter < 4) return undefined;
        this.prim.loadPalettes();       // JSR $9A35
        this.prim.flipSprites();        // JSR $88FB
        this.rollLoopIter = 0;
        this.step = 5;
        return undefined;
      case 5: // 滚动循环
        if (store.readByte(0x0044) >= 3) {
          store.writeByte(0x0079, store.readByte(0x0079) + 1);
          store.writeByte(0x007c, store.readByte(0x007c) - 2);
          store.writeByte(0x0044, store.readByte(0x0044) - 2);
          return undefined; // 每帧 1 帧 delay
        }
        this.step = 6;
        return undefined;
      case 6: // load scene data 0
        this.prim.loadSceneData(0);
        store.writeByte(0x001b, store.readByte(0x001b) | 0x01);
        this.step = 7;
        this.frameCounter = 0;
        return undefined;
      case 7: // delay 240
        if (++this.frameCounter < 240) return undefined;
        this.frameCounter = 0;
        this.step = 8;
        return undefined;
      case 8: // delay 60
        if (++this.frameCounter < 60) return undefined;
        store.writeByte(0x001b, store.readByte(0x001b) & ~0x01);
        store.writeByte(0x0090, 0);
        store.writeByte(0x0091, 2);
        this.prim.clearField1(); // JSR $99F0
        this.prim.clearField2(); // JSR $9B7F
        this.prim.clearField3(); // JSR $98A0
        this.prim.fillNametable($c0, $23, $02, $20, $55); // JSR $98EA with $c0/$23/$02/$20/$55
        this.prim.loadSceneData(1);
        return 0x02; // 返回 2 (Scene2 dispatch)
    }
  }
}
```

---

## 6. 6-slot timer dispatcher（bank00 $9EED-$9F70）

之前已反汇编。这是 boot 完进入主游戏后的 CPU 主循环，**不是 Scene0/Scene1-13 dispatch 用的**。

Scene0/Scene14 是**直接 JSR + RTS 调用**（不是 timer slot）。

---

## 7. 下一步

1. ✅ Scene0 真入口 + 真行为已反汇编
2. ✅ Scene1-13 真地址已大部分识别
3. ❌ H5 Scene0 需要按真 asm 重写（替换 fused phase 状态机）
4. ❌ H5 counter=314 magic 需要改成 ~420
5. ❌ H5 Scene1-13 controllers 需要按真 asm 实现替换 stub

真翻译 Scene0 完整草案已给出。需要立即重写 H5 Scene0。

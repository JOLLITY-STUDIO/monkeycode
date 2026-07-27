移植tsnes版本（src\tsnes\tsubasa-hex2asm），不再出现cpu ram硬件模拟的东西可以缓存，没有地址这些，直接语义化建立对象，函数，框架架构（逻辑完美移植tsnes）。纯html5开发，兼容小程序。也就是纯ts+canvas开发。游戏逻辑通过分析翻译prg，或者nes文件，生成ts代码。从入口stepin，逐步分析，生成代码。
config=romheadr
游戏逻辑=prg（主要改造的核心）
不能做的事：自己随意写代码不根据实际游戏逻辑。
参考：原通过cdl解析的_tmp_bzk_out\_full_disasm.asm（未验证并没有真正使用跑起来,并不建议以这个实现代码逻辑，进作为参考对照）
实际最好参考：src\tsnes\tsubasa-hex2asm（已验证可以跑通）
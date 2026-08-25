log 里 bank 只出现 0x00-0x0F（16 种），且 $0F 占 15076 条——正好对应固定 
C
000
/
C000/E000 区。这提示 log 的 bank 是 16KB 粒度（真实 8KB bank >> 1）


模拟器 f1–f13 真实状态拿到了，关键差异已经清晰：

f1/f5：NT 全 0、palette 全 0 → 黑屏（纯初始化）
f9：nt0 有 48 个非零 tile，palette 全 0x0F
f13：nt0 有 57 tile，palette 彩色，OAM 64 精灵可见（y=72…），chrBanks 前 4 组已换 252/113/82/83
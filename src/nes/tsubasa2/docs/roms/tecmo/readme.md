log 里 bank 只出现 0x00-0x0F（16 种），且 $0F 占 15076 条——正好对应固定 
C
000
/
C000/E000 区。这提示 log 的 bank 是 16KB 粒度（真实 8KB bank >> 1）
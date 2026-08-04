"""音频数据BUG修复总结"""
print('=' * 60)
print(' 音频数据BUG修复总结 ')
print('=' * 60)
print()
print('发现并修复的BUG:')
print()
b = [
    ('BUG-032', 'AudioEngine.ts 数据格式完全错误',
     '错误: 假设单字节opcode ($00-$7F音符, $80-$AF休止)',
     '实际: (duration, pitch) 2字节对 + 0xFF终止',
     '修复: MusicData.ts 重写为v2格式'),
    ('BUG-033', '音乐指针表位置错误',
     '错误: 假设 $E1A8 为指针表',
     '实际: $E1A8是OAM数据, 真正指针表在 $A000 (13条目)',
     '修复: MUSIC_PTR_TABLE 指向正确位置'),
    ('BUG-034', 'extract_real_sequences.py 起始偏移错误',
     '错误: 从ROM 0x6011(CPU $A011)读取 - 在指针表中间!',
     '实际: 指针表$A000-$A019, 序列数据从$A01A开始',
     '修复: extract_music_correct.py'),
    ('BUG-035', 'Note Length Table $DFC8不存在',
     '错误: AudioEngine.ts编造了NOTE_LENGTH_TABLE=[6,12,18,...]',
     '实际: $DFC8是OAM数据(0F 1A 60 02...), 不是音长表',
     '修复: 需要从Bank 2反汇编找真正的音长表'),
    ('BUG-036', 'NES APU频率表缺失',
     '错误: MusicData.ts中的NES_NOTE_PERIODS是猜测值',
     '实际: 频率表可能在Bank 2($DCEC代码所在bank)',
     '修复: 待反汇编Bank 2音频代码'),
]

for bid, title, *lines in b:
    print(f'[{bid}] {title}')
    for l in lines:
        print(f'  {l}')
    print()

print('修复的文件:')
print('  src/audio/MusicData.ts - 完全重写, v2格式')
print('  src/audio/index.ts - 更新导出')
print('  scripts/extract_music_correct.py - 正确提取脚本')
print('  BUG_TRACKER.md - 追加BUG-032~036')

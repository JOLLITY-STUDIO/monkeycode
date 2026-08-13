# -*- coding: utf-8 -*-
"""给 miniprogram/engine/data/puzzles/map_batch_*.ts 注入 id 字段
export const P4000101 = { name: ...  ->  export const P4000101 = { id: '4000101', name: ...
"""
import re, glob, os

D = r'd:/studio/github/monkeycode/src/nds/picpic/miniprogram/engine/data/puzzles'
PAT = re.compile(r'^export const (P\w+) = \{', re.M)

for f in glob.glob(os.path.join(D, 'map_batch_*.ts')):
    with open(f, encoding='utf-8') as fp:
        src = fp.read()
    def repl(m):
        pid = m.group(1)[1:]  # 去掉 P 前缀
        return "export const %s = { id: '%s'," % (m.group(1), pid)
    out = PAT.sub(repl, src)
    if out != src:
        with open(f, 'w', encoding='utf-8') as fp:
            fp.write(out)
        print('updated', os.path.basename(f))
print('done')

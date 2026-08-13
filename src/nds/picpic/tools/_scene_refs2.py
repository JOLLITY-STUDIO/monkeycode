# -*- coding: utf-8 -*-
"""
_scene_refs2.py — 找引用"场景资源表基址"或"大关卡表基址"的所有代码位置。
步骤：对每个目标地址，扫描全镜像中等于该地址的 u32（字面量），
再向前找 ldr rX,[pc,#imm]，把调用者归入函数/状态。
输出写入 _scene_refs2_result.txt
"""
import sys, os, struct
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ndsrom import NdsRom

rom = NdsRom()
h = rom.header(0)
arm9 = rom.arm9(h)
RAM = h['arm9_ram']
SIZE = len(arm9)
out = []
def p(s=''):
    out.append(str(s))

# 目标表基址（来自 _scene_resources_result.txt）
targets = {
    0x020680F4: 'title/bg_title 组1',
    0x0206810C: 'title/bg_title 组2',
    0x02068124: 'title/success',
    0x0206813C: 'title/conceptis+f_make/caution',
    0x02068154: 'f_make/caution',
    0x0206816C: 'f_make/clr_res',
    0x02068184: 'f_make/file_make_main',
    0x0206819C: 'f_make/file_make_main_2(ue)',
    0x020681B4: 'f_make/file_make_main_2(sita)',
    0x020681CC: 'f_make/file_kill',
    0x020681E4: 'title/axss',
    0x020681FC: 'title/autosave',
    0x02068214: 'otamesi BG1',
    0x0206822C: 'otamesi BG_title',
    0x02068244: 'otamesi BG2',
    0x0206825C: 'f_make/file_make_change',
    0x02068274: 'title/besttime',
    0x0206828C: 'f_make/file_make_change_2_sita',
    0x020682A4: 'title/file_kill_run',
    0x020682BC: 'f_make/file_make_main_ue',
    0x020682D8: 'main_bg/main_bg00',
    0x0206839C: 'option/mahoujin_1f',
    0x020683B8: 'option/mahoujin_2f',
    0x020683D4: 'cinario_select/sinario_bg2',
    0x020683F0: 'cinario_select/sinario_bg',
    0x0206840C: 'battle/sent_bk',
    0x02068428: 'main_bg/bg_00',
    0x02068B7C: 'main_bg/bg_67',
    0x0206CC24: 'map/bg_map 组1',
    0x0206CC3C: 'select 组(03_window_top)',
    0x0206CC54: 'map/map_waku',
    0x0206CC70: 'map/map_wakuf2',
    0x0206CC9C: 'sample/map_dmy',
    0x0206CDF0: 'title+select/window_01',
    0x0206CE08: 'select/No_button',
    0x0206CE20: 'select/No_button_2',
    0x0206CE50: 'title+select/hatena',
    0x0206CE68: 'select/hatena+No_window',
    0x0206CE80: 'select/No_window_map',
    0x0206CE98: 'select/No_window_lap',
    0x0206CEB0: 'select/No_window_fap',
    0x0206DA0C: 'fap/bg_fap 组1',
    0x0206DA24: 'fap+select 组',
    0x0206DA54: 'fap map_waku',
    0x0206DA70: 'fap/fap_parts',
    0x0206DA9C: 'fap/fap_henkan',
    0x0206DD58: 'lap/l_color+map/curs',
    0x0206DD88: 'lap map_waku',
    0x0206DE30: 'lap/bg_lap',
    0x0206DE48: 'lap/lap_BG_ue',
    0x0206EB84: 'lap tutorial 顺序(5_dat+Step1...)',
    0x0206ECA0: 'title+f_make/caution',
    0x0206ECB8: 'f_make/caution+kakuninn',
    0x0206ECD0: 'kakuninn/continue_top1',
    0x0206ECE8: 'kakuninn/continue_top2',
    0x0206ED00: 'kakuninn/continue_vtm',
    0x0206ED90: 'title+select window',
    0x0206EDA8: 'select+title/bg_title_v',
    0x0206EDC0: 'option/05_menu_BG',
    0x0206EDD8: 'option/cmn_menu_main',
    0x0206EDF0: 'option/cmn_chuudan_main',
    0x0206EE08: 'option/fap_btn_main',
    0x0206EE20: 'option+select/hatena',
    0x0206EE38: 'option/cmn_sound_main',
    0x0206EE50: 'option/map_opt_main',
    0x0206EE68: 'option/lap_opt_main',
    0x0206EE80: 'option/fap_opt_main',
    0x0206EE98: 'map bg',
    0x0206EEB0: 'lap bg',
    0x0206EEC8: 'fap bg',
    0x0206EEE0: 'option/cmn_shuuryou_main',
    0x0206F21C: 'title+taiken/taiken_main',
    0x0206F234: 'taiken/taiken_ue',
    0x0206F24C: 'taiken/taiken_sita_1',
    0x0206F264: 'taiken/taiken_sita_2',
    0x0206F370: 'tutorial t_map_s1',
    0x0206F4BC: 'tutorial/tutorial_ue_1',
    0x0206F4D4: 'title/button_select',
    0x0206F504: 'tutorial/window_01+tu_sita_1',
    0x0206F520: 'tutorial/t_top',
    0x0206F654: 'tutorial/step_1',
    0x02084724: 'map_d 404 关卡表',
    0x0208E474: 'fap_d 405 关卡表',
    0x0208F5B8: 'MBP 状态表',
    0x02034DE4: 'comp 表 (map/lap/fap_comp)',
    0x020462F8: 'fap_comp 表',
    0x0204E710: 'lap_comp 表',
    0x02034B88: 'map_comp 表',
}

# 反向: 在镜像中找这些目标地址作为 u32 出现的位置
from collections import defaultdict
addr_pos = defaultdict(list)
for off in range(0, SIZE - 3, 4):
    v = struct.unpack_from('<I', arm9, off)[0]
    if v in targets:
        addr_pos[v].append(off)

# 对每个出现位置找 ldr
def find_ldr(lit_off, window=0x200):
    found = []
    for off in range(max(0, lit_off - window), lit_off):
        ins = struct.unpack_from('<I', arm9, off)[0]
        if (ins & 0x0F5F0000) == 0x051F0000:
            rd = (ins >> 12) & 0xF
            imm = ins & 0xFFF
            target = (RAM + off + 8 + imm) & ~3
            if target == RAM + lit_off:
                found.append((RAM + off, rd))
    return found

p('=== 场景表基址的引用 ===')
for taddr, name in sorted(targets.items()):
    poss = addr_pos.get(taddr, [])
    if not poss:
        continue
    p('\n[%s] @0x%08X 出现 %d 处:' % (name, taddr, len(poss)))
    for lit_off in poss:
        callers = find_ldr(lit_off)
        for c, rd in callers:
            p('  字面量0x%08X <- ldr r%d @ 0x%08X' % (RAM + lit_off, rd, c))

with open(os.path.join(os.path.dirname(os.path.abspath(__file__)),
                       '_scene_refs2_result.txt'), 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))
print('done, lines=%d' % len(out))

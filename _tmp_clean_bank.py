import json
jp = lambda d: json.dumps(d, indent=2, ensure_ascii=False)

d = json.load(open(r"d:\studio\github\monkeycode\src\nes\tsubasa\disasm\banks\_romdata\bank_08.json"))
arr = d["bytes"]

SCENE_START = 0x04A0
SCENE_END = 0x0550

# 把 meeting 场景段替换为 0xF0 (标记"已抽出")
for i in range(SCENE_START, SCENE_END):
    arr[i] = 0xF0

d["bytes"] = arr

# 加标注
d["extracted"] = {
    "scene_meeting": {
        "prgOffset": f"0x{SCENE_START:04X}",
        "size": SCENE_END - SCENE_START,
        "note": "extracted to scene_meeting.json"
    }
}

with open(r"d:\studio\github\monkeycode\src\nes\tsubasa\disasm\banks\_romdata\bank_08.json", "w") as f:
    json.dump(d, f, indent=2)

print(f"bank_08: bytes[{SCENE_START}:{SCENE_END}] = full of 0xF0 (extracted)")
print(f"  added 'extracted' field → points to scene_meeting.json")

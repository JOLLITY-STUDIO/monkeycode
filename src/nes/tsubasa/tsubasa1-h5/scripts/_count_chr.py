"""Count CHR banks from git history"""
import subprocess

result = subprocess.run(
    ["git", "show", "HEAD:./src/data/ChrData.ts"],
    capture_output=True, cwd="d:/studio/github/monkeycode/src/nes/tsubasa/tsubasa1-h5"
)
content = result.stdout.decode('utf-8', errors='replace')

# Count lines that look like base64 data (starts with quote, ends with quote+comma)
count = 0
for line in content.split('\n'):
    stripped = line.strip()
    if stripped.startswith('"') and stripped.endswith('",'):
        count += 1

print(f"Total base64 string entries: {count}")

# Show constants
for line in content.split('\n'):
    if 'CHR_BANK_SIZE' in line or 'CHR_BANK_COUNT' in line:
        print(f"  {line.strip()}")

import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const root = fileURLToPath(new URL('../', import.meta.url))
const values = process.argv.slice(2)
const option = (key) => { const i = values.indexOf(key); return i < 0 ? undefined : values[i + 1] }
const project = option('--project') || process.env.GODOT_PROJECT
const godot = option('--godot') || process.env.GODOT_BIN
if (!project || !existsSync(path.join(project, 'tools/export_web.py'))) {
  console.error('Specify the complete Godot project: npm run game:export -- --project "D:/Godot Projects/ktct-game" --godot "D:/Godot/Godot_v4.7.2-stable_win64.exe"')
  process.exit(1)
}
const args = [path.join(project, 'tools/export_web.py'), '--output', path.join(root, 'public/games/lenh-xoa')]
if (godot) args.push('--godot', godot)
const result = spawnSync(process.env.PYTHON_BIN || 'python', args, { stdio: 'inherit', windowsHide: true })
if (result.error) { console.error(result.error.message); process.exit(1) }
process.exit(result.status ?? 1)

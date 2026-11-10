import { readFile, stat } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { gunzipSync } from 'node:zlib'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
const root = fileURLToPath(new URL('../', import.meta.url))
const dir = path.join(root, 'public/games/lenh-xoa')
try {
  const manifest = JSON.parse(await readFile(path.join(dir, 'runtime.json'), 'utf8'))
  for (const name of ['index.html', 'loader.js', 'index.js', 'index.wasm', 'THIRD_PARTY_NOTICES.txt']) await stat(path.join(dir, name))
  if (manifest.pack.file !== 'index.pck.gz') throw new Error('Unexpected game package path.')
  const pack = await readFile(path.join(dir, manifest.pack.file))
  if (pack.length !== manifest.pack.downloadBytes || createHash('sha256').update(pack).digest('hex') !== manifest.pack.sha256) throw new Error('Game package is incomplete or does not match runtime.json.')
  const unpacked = gunzipSync(pack)
  if (unpacked.length !== manifest.pack.uncompressedBytes || unpacked.readUInt32LE(0) !== 0x43504447) throw new Error('Invalid Godot package.')
  const wasm = await readFile(path.join(dir, 'index.wasm'))
  if (wasm.readUInt32LE(0) !== 0x6d736100) throw new Error('Invalid WebAssembly engine.')
  console.log(`Lệnh Xóa verified: ${(pack.length / 1048576).toFixed(1)} MB game + ${(wasm.length / 1048576).toFixed(1)} MB engine.`)
} catch (error) {
  console.error('Game build check failed:', error.message)
  console.error('Run npm run game:export -- --project "path/to/ktct-game" before building.')
  process.exitCode = 1
}

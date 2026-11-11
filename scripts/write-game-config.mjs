import { loadEnv } from 'vite'
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = fileURLToPath(new URL('../', import.meta.url))
export async function writeLeaderboardConfig(mode = 'production', projectRoot = root) {
const env = loadEnv(mode, projectRoot, '')
const suppliedUrl = env.SUPABASE2_URL?.trim()
const suppliedKey = env.SUPABASE2_ANON_KEY?.trim()
if (Boolean(suppliedUrl) !== Boolean(suppliedKey)) throw new Error('Set both SUPABASE2_URL and SUPABASE2_ANON_KEY for the Lenh Xoa leaderboard.')
const config = {
  url: suppliedUrl || 'https://sgetjgiuyfwbbjnfdkgq.supabase.co',
  anonKey: suppliedKey || 'sb_publishable_9gXGxmGELg0fv71lU76jdA_ph53DfAJ',
}
const url = new URL(config.url)
if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || !['', '/'].includes(url.pathname)) throw new Error('SUPABASE2_URL must be an HTTPS Supabase project origin.')
let publicKey = config.anonKey.startsWith('sb_publishable_')
if (config.anonKey.startsWith('eyJ')) {
  try { publicKey = JSON.parse(Buffer.from(config.anonKey.split('.')[1], 'base64url').toString()).role === 'anon' } catch { publicKey = false }
}
if (!publicKey) throw new Error('SUPABASE2_ANON_KEY must be a public publishable key or legacy anon JWT. Server-secret keys cannot be exported.')
config.url = url.origin
const destination = path.join(projectRoot, 'public/games/lenh-xoa')
await mkdir(destination, { recursive: true })
await writeFile(path.join(destination, 'leaderboard-config.json'), JSON.stringify(config) + '\n')
console.log('Lenh Xoa leaderboard config prepared from ' + (suppliedUrl ? 'SUPABASE2 environment variables.' : 'the approved public project defaults.'))

}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const mode = process.argv.includes('--mode') ? process.argv[process.argv.indexOf('--mode') + 1] : 'production'
  await writeLeaderboardConfig(mode)
}

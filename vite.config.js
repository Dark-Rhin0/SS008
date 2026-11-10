import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { writeLeaderboardConfig } from './scripts/write-game-config.mjs'

export default defineConfig({
  plugins: [react(), {
    name: 'lenh-xoa-leaderboard-config',
    async configResolved(config) { await writeLeaderboardConfig(config.mode, config.root) },
  }],
  server: { port: 5173, watch: { ignored: ['**/.vs/**', '**/.worktrees/**'] } },
})

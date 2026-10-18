import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isLeaderboardConfigured = Boolean(supabaseUrl && supabaseAnonKey)

let supabase = null

function getSupabaseClient() {
  if (!isLeaderboardConfigured) {
    throw new Error('Bảng xếp hạng chưa được cấu hình. Hãy thêm VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY vào file .env.')
  }

  if (!supabase) {
    try {
      supabase = createClient(supabaseUrl, supabaseAnonKey)
    } catch (error) {
      throw new Error(`Cấu hình Supabase không hợp lệ: ${error.message}`)
    }
  }

  return supabase
}

export async function saveInvestigationScore({ playerName, durationMs }) {
  const { data, error } = await getSupabaseClient().rpc('submit_investigation_score', {
    p_player_name: playerName,
    p_duration_ms: durationMs,
  })

  if (error) {
    throw new Error(`Không thể lưu kết quả: ${error.message}`)
  }

  if (!data?.[0]) {
    throw new Error('Supabase không trả về kết quả đã lưu.')
  }

  return data[0]
}

export async function getInvestigationLeaderboard() {
  const { data, error } = await getSupabaseClient()
    .from('investigation_scores')
    .select('id, player_name, duration_ms, completed_at')
    .order('duration_ms', { ascending: true })
    .order('completed_at', { ascending: true })
    .limit(100)

  if (error) {
    throw new Error(`Không thể tải bảng xếp hạng: ${error.message}`)
  }

  return data
}

export function formatInvestigationTime(durationMs) {
  const totalSeconds = Math.floor(durationMs / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  if (hours > 0) {
    return `${hours} giờ ${minutes} phút ${seconds} giây`
  }
  if (minutes > 0) {
    return `${minutes} phút ${seconds} giây`
  }
  return `${seconds} giây`
}

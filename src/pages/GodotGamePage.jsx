import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Maximize2, RotateCcw, Play } from 'lucide-react'
import '../page-styles/godot-game.css'

const GAME_PATH = '/games/lenh-xoa/index.html'

export default function GodotGamePage() {
  const [started, setStarted] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const frame = useRef(null)
  const stage = useRef(null)

  useEffect(() => {
    const receive = (event) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return
      if (event.data?.source !== 'lenh-xoa') return
      if (event.data.type === 'ready') setStatus('ready')
      if (event.data.type === 'error') {
        setStatus('error')
        setError(event.data.message || 'Không thể khởi động game. Hãy thử tải lại.')
      }
    }
    window.addEventListener('message', receive)
    return () => window.removeEventListener('message', receive)
  }, [])

  const start = () => {
    setError('')
    setStatus('loading')
    setAttempt((value) => value + 1)
    setStarted(true)
  }

  const fullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else await stage.current?.requestFullscreen()
      frame.current?.focus()
    } catch {
      setError('Trình duyệt chưa cho phép toàn màn hình. Bạn vẫn có thể chơi trong khung.')
    }
  }

  return (
    <main className="godot-page">
      <header className="godot-toolbar">
        <Link to="/game" className="godot-back"><ArrowLeft size={18} /> Kho trò chơi</Link>
        <span className="godot-title">LỆNH XÓA</span>
        <div className="godot-actions">
          {started && <button onClick={start} aria-label="Tải lại game" title="Tải lại game"><RotateCcw size={18} /></button>}
          <button onClick={fullscreen} aria-label="Toàn màn hình" title="Toàn màn hình"><Maximize2 size={18} /></button>
          <a href={GAME_PATH} target="_blank" rel="noreferrer" aria-label="Mở game trong tab riêng" title="Mở game trong tab riêng"><ExternalLink size={18} /></a>
        </div>
      </header>
      <section className="godot-stage" ref={stage} aria-label="Game Lệnh Xóa">
        {!started ? (
          <div className="godot-intro">
            <span className="godot-kicker">ĐIỀU TRA · HÀNH ĐỘNG 3D</span>
            <h1>LỆNH XÓA</h1>
            <p>Theo dấu hồ sơ trong tập đoàn Haneul. Khám phá, đối chất và phản đòn để hoàn tất bản điều tra.</p>
            <button className="godot-start" onClick={start}><Play size={19} fill="currentColor" /> Chơi Lệnh Xóa</button>
            <small>Dành cho máy tính có bàn phím và chuột. Lần tải đầu có thể mất một lúc.</small>
            <div className="godot-controls"><span><b>WASD</b> Di chuyển</span><span><b>Chuột trái</b> Đánh</span><span><b>Chuột phải</b> Parry</span><span><b>F</b> Tương tác</span><span><b>Esc</b> Menu / thả chuột</span></div>
          </div>
        ) : (
          <iframe key={attempt} ref={frame} src={GAME_PATH} title="Lệnh Xóa — Game điều tra 3D" allow="autoplay; fullscreen; gamepad" allowFullScreen onLoad={() => frame.current?.focus()} />
        )}
        {status === 'error' && <div className="godot-error" role="alert"><p>{error}</p><button onClick={start}>Thử lại</button><Link to="/game">Quay lại kho trò chơi</Link></div>}
      </section>
      <footer className="godot-footer" aria-live="polite">
        <span>{status === 'loading' ? 'Đang tải game…' : status === 'ready' ? 'Nhấn vào game để điều khiển · Esc để thả chuột' : 'Haneul và các nhân vật là hư cấu. Tư liệu Hàn Quốc có nguồn trong game.'}</span>
        {error && status !== 'error' && <span role="status">{error}</span>}
      </footer>
    </main>
  )
}

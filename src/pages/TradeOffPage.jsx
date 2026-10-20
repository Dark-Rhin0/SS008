import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageIntro from '../components/PageIntro'
import Reveal from '../components/Reveal'
import Balance2D from '../components/Balance2D'
import PageFooterNav from '../components/PageFooterNav'
import { tradeoffs } from '../data'
import '../page-styles/detail.css'
import { FLIPBOOK_URL, GAME_URL } from '../config'
import RouteCard from '../components/RouteCard'

function BarChartBackdrop() {
  return (
    <div 
      aria-hidden="true" 
      style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: 0.07, overflow: 'hidden'
      }}
    >
      <svg viewBox="0 0 1400 400" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
        <g fill="#00c2ff">
          <rect x="20" y="160" width="45" height="240" rx="6" />
          <rect x="120" y="90" width="50" height="310" rx="6" />
          <rect x="230" y="220" width="40" height="180" rx="6" />
          <rect x="340" y="50" width="60" height="350" rx="6" />
          <rect x="460" y="140" width="45" height="260" rx="6" />
          <rect x="570" y="70" width="55" height="330" rx="6" />
          <rect x="690" y="190" width="40" height="210" rx="6" />
          <rect x="800" y="100" width="50" height="300" rx="6" />
          <rect x="910" y="240" width="45" height="160" rx="6" />
          <rect x="1030" y="60" width="55" height="340" rx="6" />
          <rect x="1150" y="150" width="45" height="250" rx="6" />
          <rect x="1270" y="110" width="50" height="290" rx="6" />
        </g>
      </svg>
    </div>
  );
}

export default function TradeOffPage(){
  const [tilt, setTilt] = useState(0)
  const [selectedPoint, setSelectedPoint] = useState(null)

  // Ref để theo dõi vùng danh sách danh mục (dùng để bắt click-outside)
  const tradeContainerRef = useRef(null)

  // 1. TỰ ĐỘNG ĐÓNG POPUP KHI CLICK RA NGOÀI (Thay thế hoàn toàn cho bubble-backdrop)
  useEffect(() => {
    function handleClickOutside(event) {
      if (tradeContainerRef.current && !tradeContainerRef.current.contains(event.target)) {
        setSelectedPoint(null)
      }
    }

    if (selectedPoint) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [selectedPoint])

  // 2. Tính toán phía đang mở pop-up (0: Lợi ích / Bên trái, 1: Rủi ro / Bên phải)
  const activeSideIndex = selectedPoint 
    ? tradeoffs.findIndex(side => side.points.some(p => p.title === selectedPoint.title))
    : -1;

  // 3. Khóa cán cân nghiêng về phía có pop-up. Nếu không mở -> Dùng tilt khi hover.
  const activeTilt = activeSideIndex !== -1 
    ? (activeSideIndex === 0 ? -1 : 1) 
    : tilt;

  return (
    <>
      <PageIntro
        number="07 / Cái giá phải trả"
        title="Chính phủ đang đánh đổi điều gì?"
        subtitle="Hai phía cùng tồn tại: lợi ích kinh tế kỳ vọng ↔ công bằng pháp luật và niềm tin xã hội."
      />

      <section className="section section-with-chart">
        <BarChartBackdrop />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal>
            <div className="trade-layout">
              <div className="trade-copy">
                <span className="eyebrow">Sự đánh đổi</span>
                <h2 className="h2" style={{ marginTop: 12 }}>
                  Không có lựa chọn nào “miễn phí”.
                </h2>
                <p className="copy" style={{ marginTop: 18 }}>
                  Di chuột hoặc chạm vào hai phía để làm chiếc cân nghiêng. Bấm vào một mục để xem giải thích chi tiết.
                </p>

                {/* Gắn ref vào container này */}
                <div className="trade-side-list" ref={tradeContainerRef}>
                  {tradeoffs.map((side, i) => (
                    <div
                      key={side.side}
                      className={`trade-side ${side.color}`}
                      onMouseEnter={() => setTilt(i === 0 ? -1 : 1)}
                      onMouseLeave={() => setTilt(0)}
                    >
                      <div>
                        <span className="eyebrow">
                          {i === 0 ? "Lợi ích" : "Rủi ro"}
                        </span>
                        <h3>{side.side}</h3>
                      </div>
                      <div className="trade-points">
                        {side.points.map((p) => {
                          const isSelected = selectedPoint?.title === p.title;
                          return (
                            <div className="trade-point-wrapper" key={p.title}>
                              <motion.button 
                                whileHover={{ x: 5 }} 
                                className={isSelected ? "active" : ""}
                                onClick={() => setSelectedPoint(isSelected ? null : p)}
                              >
                                {p.title}
                              </motion.button>

                              {/* POP-UP KHÔNG CẦN LỚP PHỦ BACKDROP NỮA */}
                              <AnimatePresence>
                                {isSelected && (
                                  <motion.div 
                                    className="speech-bubble-popup"
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                    transition={{ duration: 0.15 }}
                                  >
                                    <button 
                                      className="bubble-close" 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedPoint(null);
                                      }}
                                    >
                                      ×
                                    </button>
                                    <div className="bubble-header">
                                      <span className="bubble-icon">💬</span>
                                      <span className="bubble-title">{p.title}</span>
                                    </div>
                                    <p className="bubble-desc">
                                      {p.detail}
                                    </p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="trade-illustration">
                <Balance2D tilt={activeTilt} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <Reveal>
            <div className="policy-quote dark">
              <span className="quote-mark">↔</span>
              <p>
                Trường hợp này cho thấy chính phủ phải cân bằng giữa mục tiêu phục hồi kinh tế và những hệ quả đối với pháp quyền, công bằng và quyền lực kinh tế.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <RouteCard 
        gameUrl={GAME_URL} 
        flipbookUrl={FLIPBOOK_URL} 
      />
      <PageFooterNav
        nextPath="/conclusion"
        nextLabel="Đến trang kế"
      />
    </>
  );
}
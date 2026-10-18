import { useState } from 'react'
import { motion } from 'framer-motion'
import PageIntro from '../components/PageIntro'
import Reveal from '../components/Reveal'
import Balance2D from '../components/Balance2D'
import PageFooterNav from '../components/PageFooterNav'
import { tradeoffs, TRADE_OFF_DETAILS } from '../data'
import '../page-styles/detail.css'
import { FLIPBOOK_URL, GAME_URL } from '../config'
import RouteCard from '../components/RouteCard'

function BarChartBackdrop() {
  return (
    <div 
      aria-hidden="true" 
      style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: 0.06, overflow: 'hidden'
      }}
    >
      <svg viewBox="0 0 1000 400" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
        <g fill="#00c2ff">
          <rect x="30" y="180" width="40" height="220" rx="4" />
          <rect x="100" y="100" width="40" height="300" rx="4" />
          <rect x="170" y="240" width="40" height="160" rx="4" />
          <rect x="240" y="60" width="40" height="340" rx="4" />
          <rect x="310" y="150" width="40" height="250" rx="4" />
          <rect x="380" y="40" width="40" height="360" rx="4" />
          <rect x="450" y="180" width="40" height="220" rx="4" />
          <rect x="520" y="90" width="40" height="310" rx="4" />
          <rect x="590" y="220" width="40" height="180" rx="4" />
          <rect x="660" y="70" width="40" height="330" rx="4" />
          <rect x="730" y="130" width="40" height="270" rx="4" />
          <rect x="800" y="200" width="40" height="200" rx="4" />
          <rect x="870" y="50" width="40" height="350" rx="4" />
          <rect x="940" y="140" width="40" height="260" rx="4" />
        </g>
      </svg>
    </div>
  );
}

function SideBarChart({ color }) {
  const fillColor = color === 'blue' ? '#00c2ff' : '#ff4d4f';
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: 0.12, overflow: 'hidden', borderRadius: 'inherit'
      }}
    >
      <svg viewBox="0 0 500 200" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
        <g fill={fillColor}>
          <rect x="15" y="90" width="22" height="110" rx="3" />
          <rect x="50" y="40" width="22" height="160" rx="3" />
          <rect x="85" y="110" width="22" height="90" rx="3" />
          <rect x="120" y="20" width="22" height="180" rx="3" />
          <rect x="155" y="70" width="22" height="130" rx="3" />
          <rect x="190" y="30" width="22" height="170" rx="3" />
          <rect x="225" y="90" width="22" height="110" rx="3" />
          <rect x="260" y="50" width="22" height="150" rx="3" />
          <rect x="295" y="100" width="22" height="100" rx="3" />
          <rect x="330" y="25" width="22" height="175" rx="3" />
          <rect x="365" y="60" width="22" height="140" rx="3" />
          <rect x="400" y="95" width="22" height="105" rx="3" />
          <rect x="435" y="35" width="22" height="165" rx="3" />
          <rect x="470" y="75" width="22" height="125" rx="3" />
        </g>
      </svg>
    </div>
  );
}

export default function TradeOffPage() {
  const [tilt, setTilt] = useState(0)
  const [popover, setPopover] = useState(null) // Luu thong tin & vi tri popup

 const handleTagClick = (e, tagName, sideIndex) => {
  setTilt(sideIndex === 0 ? -1 : 1)
  
  const rect = e.currentTarget.getBoundingClientRect()
  
  if (popover && popover.title === tagName) {
    setPopover(null)
    return
  }

  const detail = (TRADE_OFF_DETAILS && TRADE_OFF_DETAILS[tagName]) ? TRADE_OFF_DETAILS[tagName] : {
    title: tagName,
    desc: `Thông tin chi tiết về ${tagName} trong bối cảnh đánh đổi kinh tế.`
  }

  setPopover({
    title: detail.title,
    desc: detail.desc,
    // Đặt popup ngay phía trên nút bấm (cách 10px)
    top: rect.top + window.scrollY - 10,
    // Đặt mép trái popup trùng với vị trí nhấn trên nút
    left: rect.left + 15 
  })
}

  return (
    <>
      <PageIntro
        number="07 / Cái giá phải trả"
        title="Chính phủ đang đánh đổi điều gì?"
        subtitle="Hai phía cùng tồn tại: lợi ích kinh tế kỳ vọng ↔ công bằng pháp luật và niềm tin xã hội."
      />

      <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
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
                
                <div className="trade-side-list">
                  {tradeoffs && tradeoffs.map((side, i) => (
                    <div
                      key={side.side}
                      className={`trade-side ${side.color}`}
                      style={{ 
                        position: 'relative', 
                        overflow: 'hidden',
                        backgroundColor: 'rgba(255, 255, 255, 0.92)'
                      }}
                      onMouseEnter={() => setTilt(i === 0 ? -1 : 1)}
                      onMouseLeave={() => setTilt(0)}
                    >
                      <SideBarChart color={side.color} />

                      <div style={{ position: 'relative', zIndex: 1 }}>
                        <div>
                          <span className="eyebrow">
                            {i === 0 ? "LỢI ÍCH" : "RỦI RO"}
                          </span>
                          <h3>{side.side}</h3>
                        </div>
                        <div className="trade-points">
                          {side.points && side.points.map((p) => (
                            <motion.button
                              whileHover={{ x: 5, scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              key={p}
                              className="trade-tag-btn"
                              onClick={(e) => handleTagClick(e, p, i)}
                            >
                              {p}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="trade-illustration">
                <Balance2D tilt={tilt} />
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

      {/* BONG BÓNG TIN NHẮN HIỆN NGAY TRÊN ĐẦU NÚT VỪA BẤM */}
      {popover && (
        <>
          {/* Lớp click ẩn popup khi bấm ra ngoài */}
          <div 
            style={{ position: 'fixed', inset: 0, zIndex: 99998 }} 
            onClick={() => setPopover(null)} 
          />
          <div 
            className="tag-popover-bubble"
            style={{
              top: `${popover.top}px`,
              left: `${popover.left}px`,
            }}
          >
            <button 
              className="tag-popover-close" 
              onClick={() => setPopover(null)}
            >
              &times;
            </button>
            <h4 className="tag-popover-title">
              💬 {popover.title ? popover.title.normalize('NFC') : ''}
            </h4>
            <p className="tag-popover-desc">
              {popover.desc ? popover.desc.normalize('NFC') : ''}
            </p>
          </div>
        </>
      )}

      <RouteCard 
        gameUrl={GAME_URL} 
        flipbookUrl={FLIPBOOK_URL} 
      />
      
      <PageFooterNav
        nextPath="/conclusion"
        nextLabel="Đến trang kế"
      />
    </>
  )
}
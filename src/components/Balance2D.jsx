import { useMemo } from 'react'
import './Balance2D.css'

export default function Balance2D({ tilt = 0 }) {
  // tilt: -1 (Nghiêng trái), 0 (Cân bằng), 1 (Nghiêng phải)
  // Giới hạn góc xoay trong khoảng -10 đến 10 độ
  const angle = useMemo(() => Math.max(-10, Math.min(10, tilt * 8)), [tilt])

  return (
    <div className="balance-2d" aria-label="Minh họa cán cân giữa lợi ích kinh tế và pháp quyền">
      <svg viewBox="0 0 760 520" role="img" aria-labelledby="balanceTitle balanceDesc">
        <title id="balanceTitle">Cán cân lợi ích kinh tế và pháp quyền</title>
        <desc id="balanceDesc">Cán cân 2D nghiêng theo tương tác chuột giữa hai phía kinh tế và pháp quyền.</desc>
        
        <defs>
          <linearGradient id="balanceBlue" x1="0" x2="1">
            <stop offset="0%" stopColor="#5D7BFF" />
            <stop offset="100%" stopColor="#1428A0" />
          </linearGradient>
          <linearGradient id="balanceRed" x1="0" x2="1">
            <stop offset="0%" stopColor="#FF6674" />
            <stop offset="100%" stopColor="#C42838" />
          </linearGradient>
          <filter id="balanceShadow" x="-20%" y="-20%" width="140%" height="160%">
            <feDropShadow dx="0" dy="16" stdDeviation="16" floodColor="#1428A0" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Lưới nền phía sau */}
        <g className="balance-grid">
          <circle cx="380" cy="220" r="158" />
          <circle cx="380" cy="220" r="116" />
          <line x1="70" y1="390" x2="690" y2="390" />
        </g>

        {/* Chân đế cán cân (Đặt trước để đòn bẩy nằm đè lên trên) */}
        <g className="balance-base" filter="url(#balanceShadow)">
          <path d="M380 205 L330 350 L430 350 Z" fill="#E7ECFF" stroke="#1428A0" strokeWidth="2" />
          <rect x="250" y="350" width="260" height="24" rx="12" fill="#1428A0" />
          <rect x="290" y="374" width="180" height="16" rx="8" fill="#B9C7FF" />
        </g>

        {/* Cụm đòn bẩy & đĩa cân xoay quanh tâm (380, 185) */}
        <g 
          className="balance-rig" 
          style={{ 
            transform: `rotate(${angle}deg)`,
            transformOrigin: '380px 185px',
            transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          {/* Thanh đòn bẩy & khớp nối */}
          <line className="balance-beam" x1="145" y1="185" x2="615" y2="185" stroke="#1428A0" strokeWidth="8" strokeLinecap="round" />
          <circle className="balance-pivot" cx="380" cy="185" r="15" fill="#1428A0" />

          {/* Đĩa cân bên trái - Tự phản xoay góc (-angle) quanh điểm móc (180, 185) để luôn thẳng đứng */}
          <g 
            className="balance-pan balance-pan-left" 
            style={{ 
              transform: `rotate(${-angle}deg)`,
              transformOrigin: '180px 185px',
              transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <line x1="180" y1="185" x2="180" y2="245" stroke="#1428A0" strokeWidth="3" />
            <line x1="130" y1="245" x2="230" y2="245" stroke="#1428A0" strokeWidth="3" />
            <path d="M 112 246 Q 180 300 248 246 L 238 280 Q 180 315 122 280 Z" fill="url(#balanceBlue)" />
          </g>

          {/* Đĩa cân bên phải - Tự phản xoay góc (-angle) quanh điểm móc (580, 185) để luôn thẳng đứng */}
          <g 
            className="balance-pan balance-pan-right" 
            style={{ 
              transform: `rotate(${-angle}deg)`,
              transformOrigin: '580px 185px',
              transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <line x1="580" y1="185" x2="580" y2="245" stroke="#1428A0" strokeWidth="3" />
            <line x1="530" y1="245" x2="630" y2="245" stroke="#1428A0" strokeWidth="3" />
            <path d="M 512 246 Q 580 300 648 246 L 638 280 Q 580 315 522 280 Z" fill="url(#balanceRed)" />
          </g>
        </g>

        {/* Nhãn nhãn thông tin ECONOMY & LAW */}
        <g className="balance-label balance-label-left">
          <rect x="62" y="52" width="188" height="64" rx="18" fill="#F0F4FF" stroke="#5D7BFF" strokeWidth="2" />
          <text x="88" y="79" fill="#1428A0" fontWeight="bold" fontSize="14">KINH TẾ</text>
          <text x="88" y="101" fill="#4B5563" fontSize="11">Vốn • Việc Làm • Phát Triển</text>
        </g>

        <g className="balance-label balance-label-right">
          <rect x="510" y="52" width="188" height="64" rx="18" fill="#FFF0F2" stroke="#FF6674" strokeWidth="2" />
          <text x="536" y="79" fill="#C42838" fontWeight="bold" fontSize="14">TÍNH NGHIÊM MINH</text>
          <text x="536" y="101" fill="#4B5563" fontSize="11">Công Bằng • Công Lý</text>
        </g>
      </svg>

      {/* Chú thích màu bên dưới */}
      <div className="balance-legend" aria-hidden="true">
        <span><i className="legend-dot legend-blue" />Lợi ích kinh tế</span>
        <span><i className="legend-dot legend-red" />Chi phí thể chế</span>
      </div>
    </div>
  )
}
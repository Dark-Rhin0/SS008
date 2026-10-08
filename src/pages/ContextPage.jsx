import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, TrendingDown, Flame, Ship, Activity } from 'lucide-react'
import PageIntro from '../components/PageIntro'
import PageFooterNav from '../components/PageFooterNav'
import Reveal from '../components/Reveal'
import { crisisStats } from '../data'
import '../page-styles/detail.css'

export default function ContextPage() {
  const [active, setActive] = useState(0)
  const s = crisisStats[active]

  return (
    <>
      <PageIntro 
        number="02 / CONTEXT" 
        title="Tại sao lại là lúc đó?" 
        subtitle="Năm 2022, Hàn Quốc phải xử lý cùng lúc lạm phát, chi phí năng lượng, tỷ giá, chuỗi cung ứng và nguy cơ giảm tốc. Đây là đòn đánh cực kỳ nặng nề vào nền kinh tế Hàn Quốc" 
      />

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="crisis-stage card">
              <div className="crisis-list">
                {crisisStats.map((x, i) => (
                  <button 
                    key={x.label} 
                    onClick={() => setActive(i)} 
                    className={i === active ? 'active' : ''}
                  >
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <b>{x.label}</b>
                    <small>{x.value}</small>
                  </button>
                ))}
              </div>
              <div className="crisis-focus">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={s.label} 
                    initial={{ opacity: 0, scale: 0.96, y: 12 }} 
                    animate={{ opacity: 1, scale: 1, y: 0 }} 
                    exit={{ opacity: 0, scale: 0.98, y: -10 }} 
                    transition={{ duration: 0.4 }}
                  >
                    <span className="eyebrow">SIGNAL {String(active + 1).padStart(2, '0')}</span>
                    <strong>{s.value}</strong>
                    <h2 className="h3">{s.label}</h2>
                    <p className="copy">{s.detail}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container grid grid-3">
          <Reveal>
            <div className="card callout">
              <TrendingDown size={22} color="var(--blue)" />
              <b>Tăng trưởng</b>
              <p>Từ 4,1% năm 2021, dự báo 2022 bị hạ xuống quanh 2,6% trong tài liệu.</p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="card callout">
              <Flame size={22} color="#D73645" />
              <b>Lạm phát & năng lượng</b>
              <p>Chi phí sinh hoạt và sản xuất bị đẩy lên bởi năng lượng nhập khẩu đắt đỏ.</p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="card callout">
              <Ship size={22} color="#0A1333" />
              <b>Xuất khẩu & chip</b>
              <p>Xuất khẩu là động lực tăng trưởng nhưng nhu cầu chip toàn cầu suy yếu.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container grid grid-2">
          <Reveal>
            <div className="editorial-image" style={{ minHeight: 420 }} />
          </Reveal>
          <Reveal delay={0.12}>
            <div style={{ alignSelf: 'center' }}>
              <span className="eyebrow">THE GOVERNMENT'S NEED</span>
              <h2 className="h2" style={{ marginTop: 15 }}>Họ cần gì từ các Chaebol?</h2>
              <ul className="bullet-list">
                <li>
                  <b>Vốn & quyết định chiến lược</b>
                  <span>cho bán dẫn, công nghệ và các dự án rủi ro cao.</span>
                </li>
                <li>
                  <b>Xuất khẩu & việc làm</b>
                  <span>để làm “đầu tàu” trong bối cảnh thâm hụt thương mại.</span>
                </li>
                <li>
                  <b>Năng lực cạnh tranh công nghệ</b>
                  <span>để giữ vị trí trong chuỗi cung ứng bán dẫn toàn cầu.</span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <PageFooterNav 
        nextPath="/chaebol" 
        nextLabel="Đến trang kế" 
      />
    </>
  )
}
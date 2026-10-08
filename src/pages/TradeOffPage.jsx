import { useState } from 'react'
import { motion } from 'framer-motion'
import PageIntro from '../components/PageIntro'
import Reveal from '../components/Reveal'
import Balance2D from '../components/Balance2D'
import PageFooterNav from '../components/PageFooterNav'
import { tradeoffs } from '../data'
import '../page-styles/detail.css'
export default function TradeOffPage(){
 const [tilt,setTilt]=useState(0)


return (
  <>
    <PageIntro
      number="07 / Cái giá phải trả"
      title="Chính phủ đang đánh đổi điều gì?"
      subtitle="Hai phía cùng tồn tại: lợi ích kinh tế kỳ vọng ↔ công bằng pháp luật và niềm tin xã hội."
    />

    <section className="section">
      <div className="container">
        <Reveal>
          <div className="trade-layout">
            <div className="trade-copy">
              <span className="eyebrow">THE BALANCE</span>
              <h2 className="h2" style={{ marginTop: 12 }}>
                Không có lựa chọn nào “miễn phí”.
              </h2>
              <p className="copy" style={{ marginTop: 18 }}>
                Di chuột qua hai phía để làm chiếc cân thật sự nghiêng. Bấm một mục để làm nổi bật lợi ích hoặc hệ quả.
              </p>
              <div className="trade-side-list">
                {tradeoffs.map((side, i) => (
                  <div
                    key={side.side}
                    className={`trade-side ${side.color}`}
                    onMouseEnter={() => setTilt(i === 0 ? -1 : 1)}
                    onMouseLeave={() => setTilt(0)}
                  >
                    <div>
                      <span className="eyebrow">
                        {i === 0 ? "BENEFIT" : "RISK"}
                      </span>
                      <h3>{side.side}</h3>
                    </div>
                    <div className="trade-points">
                      {side.points.map((p) => (
                        <motion.button whileHover={{ x: 5 }} key={p}>
                          {p}
                        </motion.button>
                      ))}
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
    <PageFooterNav
      nextPath="/conclusion"
      nextLabel="Đến trang kế"
    />
  </>
);
}
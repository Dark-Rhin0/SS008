
import { useState } from "react";
import { RotateCcw, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import PageIntro from "../components/PageIntro";
import Reveal from "../components/Reveal";
import PageFooterNav from "../components/PageFooterNav";
import { myths } from "../data";

import "../page-styles/detail.css";
import "../page-styles/myth.css";

export default function MythPage() {
  const [open, setOpen] = useState(null);

  return (
    <>
      <PageIntro
        number="06 / tin đồn và sự thật"
        title="Điều gì dễ bị hiểu sai?"
        subtitle="Bấm vào từng thẻ để lật mặt sau. Trang chính chỉ cho bạn những câu hỏi đáng chú ý; câu trả lời xuất hiện sau tương tác."
      />

      <section className="section myth-section">
        <div className="container grid grid-2 myth-grid">
          {myths.map((m, i) => {
            const isOpen = open === i;

            return (
              <Reveal key={m.myth} delay={i * 0.04}>
                <button
                  type="button"
                  className={`flip-card ${isOpen ? "is-open" : ""}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-label={
                    isOpen
                      ? `Trở lại mặt trước: ${m.myth}`
                      : `Khám phá sự thật: ${m.myth}`
                  }
                  aria-pressed={isOpen}
                >
                  <motion.div
                    className="flip-inner"
                    animate={{
                      rotateY: isOpen ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {/* MẶT TRƯỚC */}
                    <div
                      className={`flip-face front tone-${m.tone}`}
                    >
                      {/* Ảnh nền phủ toàn bộ thẻ */}
                      <div className="myth-card-image">
                        {m.image ? (
                          <img
                            src={m.image}
                            alt=""
                            loading="lazy"
                            draggable="false"
                          />
                        ) : (
                          <div className="myth-card-image-placeholder" />
                        )}

                        <div className="myth-image-overlay" />

                        <span className="card-tag">
                          TIN ĐỒN {String(i + 1).padStart(2, "0")}
                        </span>

                        <span className="myth-image-index">
                          {String(i + 1).padStart(2, "0")}
                          <span>
                            {" "}
                            / {String(myths.length).padStart(2, "0")}
                          </span>
                        </span>
                      </div>

                      {/* Khối màu trong suốt đè lên ảnh */}
                      <div className="myth-card-content">
                        <h3 className="card-title">
                          {m.myth}
                        </h3>

                        <div className="card-hint">
                          <span className="myth-hint-text">
                            <RotateCcw size={15} />
                            Khám phá sự thật
                          </span>

                          <span className="myth-hint-arrow">
                            <ArrowUpRight size={17} />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* MẶT SAU */}
                    <div
                      className={`flip-face back tone-${m.tone}`}
                    >
                      <div className="myth-back-header">
                        <span className="card-tag">
                          SỰ THẬT
                        </span>

                        <span className="myth-back-index">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <p className="fact-text">{m.fact}</p>

                      <div className="myth-back-footer">
                        <span className="myth-hint-text">
                          <RotateCcw size={15} />
                          Bấm để trở lại
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </section>

      <PageFooterNav
        nextPath="/tradeoff"
        nextLabel="Đến trang kế"
      />
    </>
  );
}

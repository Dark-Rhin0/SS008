import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageIntro from "../components/PageIntro";
import Reveal from "../components/Reveal";
import { conclusion } from "../data";
import PageFooterNav from "../components/PageFooterNav";
import "../page-styles/detail.css";
export default function ConclusionPage() {
  const [i, setI] = useState(0),
    x = conclusion[i];
  return (
    <>
      <PageIntro
        number="08 / Kết luận tổng hợp"
        title="Quyết định hợp lý?"
        subtitle="Câu trả lời cô đọng từ toàn bộ tài liệu — không phải một nguyên nhân duy nhất, mà là một chuỗi 5 yếu tố."
      />
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="conclusion-wrap card">
              <div className="conclusion-index">
                {conclusion.map((c, k) => (
                  <button
                    onClick={() => setI(k)}
                    className={k === i ? "active" : ""}
                    key={c[0]}
                  >
                    <span>{c[0]}</span>
                    <b>{c[1]}</b>
                  </button>
                ))}
              </div>
              <div className="conclusion-main">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={x[0]}
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35 }}
                  >
                    <span className="eyebrow">YẾU TỐ {x[0]}</span>
                    <h2 className="h2" style={{ marginTop: 12 }}>
                      {x[1]}
                    </h2>
                    <p className="lead" style={{ marginTop: 20 }}>
                      {x[2]}
                    </p>
                  </motion.div>
                </AnimatePresence>
                <div className="slider-controls">
                  <button
                    className="btn btn-ghost"
                    onClick={() => setI((i - 1 + 5) % 5)}
                  >
                    <ArrowLeft size={16} /> trước
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => setI((i + 1) % 5)}
                  >
                    tiếp <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section section-soft">
        <div className="container">
          <Reveal>
            <div className="final-statement">
              <div>
                <span className="eyebrow">đáp án</span>
                <h2 className="h2" style={{ marginTop: 15 }}>
                  Khó khăn kinh tế + vai trò lớn của Chaebol + nhu cầu đầu tư và
                  công nghệ → Chính phủ lựa chọn đặc xá.
                </h2>
              </div>
              <div className="statement-side">
                <CheckCircle2 size={24} color="var(--blue)" />
                <p>
                  Nhưng quyết định đó đồng thời mở ra một tranh luận lớn về công
                  bằng pháp luật, đặc quyền và niềm tin xã hội.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <PageFooterNav nextPath="/qna" nextLabel="Đến trang kế" />
    </>
  );
}

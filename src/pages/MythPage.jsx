import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import PageIntro from "../components/PageIntro";
import Reveal from "../components/Reveal";
import PageFooterNav from "../components/PageFooterNav";
import { myths } from "../data";
import "../page-styles/detail.css";
export default function MythPage() {
  const [open, setOpen] = useState(null);
  return (
    <>
      <PageIntro
        number="06 / tin đồn và sự thật"
        title="Điều gì dễ bị hiểu sai?"
        subtitle="Bấm vào từng thẻ để lật mặt sau. Trang chính chỉ cho bạn những câu hỏi đáng chú ý; câu trả lời xuất hiện sau tương tác."
      />
      <section className="section">
        <div className="container grid grid-2">
          {myths.map((m, i) => (
            <Reveal key={m.myth} delay={i * 0.04}>
              <button
                className="flip-card"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <motion.div
                  className="flip-inner"
                  animate={{ rotateY: open === i ? 180 : 0 }}
                  transition={{ duration: 0.55 }}
                >
                  <div className="flip-face front">
                    <span>TIN ĐỒN {i + 1}</span>
                    <h3>{m.myth}</h3>
                    <small>
                      <RotateCcw size={14} /> bấm để lật
                    </small>
                  </div>
                  <div className="flip-face back">
                    <span>SỰ THẬT</span>
                    <h3>{m.fact}</h3>
                    <small>← bấm để trở lại</small>
                  </div>
                </motion.div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>
      <PageFooterNav nextPath="/tradeoff" nextLabel="Đến trang kế" />
    </>
  );
}

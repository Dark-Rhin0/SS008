import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Gavel,
  BriefcaseBusiness,
  Factory,
  Globe2,
} from "lucide-react";
import PageIntro from "../components/PageIntro";
import PageFooterNav from "../components/PageFooterNav";
import Reveal from "../components/Reveal";
import { policySteps } from "../data";
import "../page-styles/detail.css";

const icons = [Gavel, BriefcaseBusiness, Factory, Globe2];
export default function GovernmentPage() {
  const [i, setI] = useState(0),
    s = policySteps[i],
    Icon = icons[i];
  return (
    <>
      <PageIntro
        number="04 / GÓC NHÌN CỦA CHÍNH TRỊ GIA"
        title="Chính phủ nói gì?"
        subtitle="Nguồn chính thức và tài liệu trình bày lý do đặc xá như một nỗ lực phục hồi kinh tế và xã hội."
      />
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="policy-quote">
              <span className="quote-mark">“</span>
              <p>
                Nhằm khôi phục sinh kế cho người dân và huy động toàn bộ động
                lực quốc gia để vượt qua cuộc khủng hoảng kinh tế toàn diện.
              </p>
              <small>
                — thông điệp được tài liệu dẫn lại từ quyết định đặc xá ngày
                12/08/2022
              </small>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="policy-stage card">
              <div className="policy-steps">
                {policySteps.map((x, k) => (
                  <button
                    onClick={() => setI(k)}
                    className={k === i ? "active" : ""}
                    key={x.no}
                  >
                    <span>{x.no}</span>
                    <b>{x.title}</b>
                  </button>
                ))}
              </div>
              <div className="policy-focus">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={s.no}
                    initial={{ opacity: 0, scale: 0.97, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="policy-icon">
                      <Icon size={30} />
                    </div>
                    <span className="small">GIAI ĐOẠN {s.no}</span>
                    <h2 className="h3" style={{ marginTop: 10 }}>
                      {s.title}
                    </h2>
                    <p className="copy">{s.body}</p>
                  </motion.div>
                </AnimatePresence>
                <div className="slider-controls">
                  <button
                    className="btn btn-ghost"
                    onClick={() => setI((i - 1 + 4) % 4)}
                  >
                    <ArrowLeft size={16} /> trước
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => setI((i + 1) % 4)}
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
            <div className="video-grid">
              <div>
                <span className="eyebrow">xem VIDEO</span>
                <h2 className="h3" style={{ marginTop: 12 }}>
                  Lệnh đặc xá nhìn từ truyền thông quốc tế
                </h2>
                <p className="copy">
                  Một video ngắn dưới góc nhìn truyền thông quốc tế.
                </p>
              </div>
              <div className="video-shell">
                <iframe
                  src="https://www.youtube.com/embed/R59cneCcUt8"
                  title="Reuters — South Korea pardons Samsung's Lee over economic crisis"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <PageFooterNav nextPath="/debate" nextLabel="Đến trang kế" />
    </>
  );
}

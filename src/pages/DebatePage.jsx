import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, ShieldAlert, TrendingUp } from "lucide-react";
import PageIntro from "../components/PageIntro";
import PageFooterNav from "../components/PageFooterNav";
import Reveal from "../components/Reveal";
import "../page-styles/detail.css";

const support = [
  "Tự do hoạt động để ra quyết định đầu tư nhanh hơn",
  "Thúc đẩy đầu tư, phục hồi sản xuất và tăng trưởng",
  "Cần lãnh đạo đầy đủ quyền hạn cho quyết định dài hạn",
  "Bán dẫn là ngành công nghiệp chiến lược",
  "Việc làm và xuất khẩu có thể hưởng lợi",
];
const against = [
  "Bình đẳng trước pháp luật",
  "Đặc quyền của Chaebol",
  "Tiền lệ cho doanh nhân quyền lực",
  "Niềm tin của công chúng vào tư pháp",
  "Không có bằng chứng chắc chắn về tăng trưởng do đặc xá",
];
export default function DebatePage() {
  const [side, setSide] = useState("support");
  const arr = side === "support" ? support : against;
  return (
    <>
      <PageIntro
        number="05 / Tranh cãi"
        title="Tại sao quyết định này gây tranh cãi?"
        subtitle="Tài liệu không xem đây là một câu chuyện một chiều; tranh luận nằm ở xung đột giữa phục hồi kinh tế và pháp quyền."
      />
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="debate-toggle">
              <button
                className={side === "support" ? "active" : ""}
                onClick={() => setSide("support")}
              >
                <TrendingUp size={17} /> Lập luận ủng hộ
              </button>
              <button
                className={side === "against" ? "active" : ""}
                onClick={() => setSide("against")}
              >
                <ShieldAlert size={17} /> Lập luận phản đối
              </button>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="debate-grid">
              {arr.map((x, i) => (
                <motion.div
                  layout
                  key={x}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={"debate-card " + side}
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <p>{x}</p>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section section-soft">
        <div className="container grid grid-2">
          <Reveal>
            <div className="card callout">
              <Scale size={28} color="var(--blue)" />
              <h3 className="h3" style={{ fontSize: 34, marginTop: 10 }}>
                Điểm xung đột
              </h3>
              <p className="copy">
                Tranh luận không nằm ở việc Samsung có quan trọng hay không, mà
                ở câu hỏi liệu lợi ích kinh tế có nên là lý do để dành sự khoan
                hồng đặc biệt cho người đã phạm tội.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="card callout">
              <span className="eyebrow">PUBLIC RESPONSE</span>
              <strong className="big-number">77%</strong>
              <p className="copy">
                Tài liệu dẫn lại một khảo sát cho thấy khoảng 77% người được hỏi
                ủng hộ việc đặc xá Lee Jae-yong.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
      <PageFooterNav nextPath="/myth" nextLabel="Đến trang kế" />
    </>
  );
}

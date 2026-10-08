import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Car, BatteryCharging, Network, ArrowUpRight } from "lucide-react";
import PageIntro from "../components/PageIntro";
import Reveal from "../components/Reveal";
import PageFooterNav from "../components/PageFooterNav";
import { chaebols } from "../data";
import "../page-styles/detail.css";

const iconMap = {
  samsung: Cpu,
  hyundai: Car,
  sk: Network,
  lg: BatteryCharging,
};
export default function ChaebolPage() {
  const [id, setId] = useState("samsung");
  const x = chaebols.find((v) => v.id === id);
  const Icon = iconMap[id];
  return (
    <>
      <PageIntro
        number="03 / TẦM ẢNH HƯỞNG CỦA GIỚI CHAEBOL"
        title="Tại sao Samsung lại quan trọng?"
        subtitle="Chaebol là các tập đoàn quy mô khổng lồ thuộc sở hữu và được điều hành chi phối bởi các gia tộc tại Hàn Quốc."
      />
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="chaebol-map">
              <div className="chaebol-center">
                <div className="center-orbit" />
                <div className="center-text">
                  <span>KINH TẾ</span>
                  <b>TRỤ CỘT</b>
                </div>
              </div>
              {chaebols.map((c, i) => {
                const I = iconMap[c.id];
                return (
                  <button
                    key={c.id}
                    className={
                      "chaebol-node node-" +
                      i +
                      (c.id === id ? " selected" : "")
                    }
                    onClick={() => setId(c.id)}
                  >
                    <span className="node-icon">
                      <I size={22} />
                    </span>
                    <b>{c.name}</b>
                    <small>{c.tag}</small>
                  </button>
                );
              })}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="chaebol-detail card">
              <AnimatePresence mode="wait">
                <motion.div
                  key={id}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.35 }}
                  className="chaebol-detail-grid"
                >
                  <div>
                    <span className="eyebrow">{x.tag}</span>
                    <h2 className="h2" style={{ marginTop: 12 }}>
                      {x.name}
                    </h2>
                    <p className="copy" style={{ marginTop: 18 }}>
                      {x.text}
                    </p>
                  </div>
                  <div className="big-stat">
                    <span>{x.stat}</span>
                    <small>{x.statLabel}</small>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section section-soft">
        <div className="container grid grid-2">
          <Reveal>
            <div>
              <span className="eyebrow">WHY THE PARDON WAS ECONOMIC</span>
              <h2 className="h2" style={{ marginTop: 15 }}>
                Một người không “cứu” nền kinh tế.
              </h2>
              <p className="copy" style={{ marginTop: 20 }}>
                Luận điểm trong tài liệu khác: vai trò của Lee nằm ở vị trí
                trung tâm quyền kiểm soát Samsung. Việc trở lại hoạt động có thể
                mở đường cho quyết định đầu tư dài hạn, M&A, đối ngoại và tác
                động lan tỏa sang chuỗi cung ứng.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="logic-stack">
              <div>
                <b>đầu tư vốn</b>
                <ArrowUpRight />
              </div>
              <div>
                <b>nhà máy / R&D</b>
                <ArrowUpRight />
              </div>
              <div>
                <b>nhà cung cấp + việc làm</b>
                <ArrowUpRight />
              </div>
              <div>
                <b>xuất khẩu + năng lực công nghệ</b>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <PageFooterNav nextPath="/government" nextLabel="Đến trang kế" />
    </>
  );
}

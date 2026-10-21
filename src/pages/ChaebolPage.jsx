import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Car,
  BatteryCharging,
  Network,
  Building2,
  Scale,
  Gavel,
  AlertTriangle,
} from "lucide-react";

import PageIntro from "../components/PageIntro";
import Reveal from "../components/Reveal";
import PageFooterNav from "../components/PageFooterNav";
import { chaebols } from "../data";
import "../page-styles/detail.css";
import { FLIPBOOK_URL, GAME_URL } from "../config";
import RouteCard from "../components/RouteCard";

const iconMap = {
  samsung: Cpu,
  hyundai: Car,
  sk: Network,
  lg: BatteryCharging,
};

export default function ChaebolPage() {
  const [id, setId] = useState("samsung");
  const [electricPath, setElectricPath] = useState(null);

  const mapRef = useRef(null);
  const centerRef = useRef(null);
  const nodeRefs = useRef({});

  const x = chaebols.find((v) => v.id === id);

  // Tính đường điện từ tâm sơ đồ đến ô đang được chọn.
  const updateElectricPath = useCallback(() => {
    const map = mapRef.current;
    const center = centerRef.current;
    const node = nodeRefs.current[id];

    if (!map || !center || !node) return;

    const mapRect = map.getBoundingClientRect();
    const centerRect = center.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();

    if (
      mapRect.width === 0 ||
      mapRect.height === 0 ||
      centerRect.width === 0 ||
      centerRect.height === 0 ||
      nodeRect.width === 0 ||
      nodeRect.height === 0
    ) {
      return;
    }

    const x1 = centerRect.left + centerRect.width / 2 - mapRect.left;
    const y1 = centerRect.top + centerRect.height / 2 - mapRect.top;

    const x2 = nodeRect.left + nodeRect.width / 2 - mapRect.left;
    const y2 = nodeRect.top + nodeRect.height / 2 - mapRect.top;

    const dx = x2 - x1;
    const dy = y2 - y1;

    const length = Math.sqrt(dx * dx + dy * dy) || 1;
    const bend = 24;

    const mx = (x1 + x2) / 2 - (dy / length) * bend;
    const my = (y1 + y2) / 2 + (dx / length) * bend;

    setElectricPath(`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`);
  }, [id]);

  useEffect(() => {
    let animationFrame;

    const scheduleUpdate = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        updateElectricPath();
      });
    };

    scheduleUpdate();

    const map = mapRef.current;
    const observer = map ? new ResizeObserver(scheduleUpdate) : null;

    if (map && observer) {
      observer.observe(map);
      if (centerRef.current) observer.observe(centerRef.current);
      const selectedNode = nodeRefs.current[id];
      if (selectedNode) observer.observe(selectedNode);
    }

    window.addEventListener("resize", scheduleUpdate);

    return () => {
      cancelAnimationFrame(animationFrame);
      observer?.disconnect();
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [id, updateElectricPath]);

  return (
    <>
      <PageIntro
        number="03 / TẦM ẢNH HƯỞNG CỦA GIỚI CHAEBOL"
        title="Tại sao Samsung lại quan trọng?"
        subtitle="Chaebol là các tập đoàn quy mô khổng lồ thuộc sở hữu và được điều hành chi phối bởi các gia tộc tại Hàn Quốc."
      />

      {/* =====================================================
          SƠ ĐỒ INTERACTIVE CHAEBOL
      ===================================================== */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div
              className="chaebol-map chaebol-map--electric"
              ref={mapRef}
            >
              <svg
                className="electric-connection"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="electricGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#536dfe" />
                    <stop offset="50%" stopColor="#7df9ff" />
                    <stop offset="100%" stopColor="#536dfe" />
                  </linearGradient>

                  <filter
                    id="electricGlow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {electricPath && (
                  <>
                    <path className="electric-path-glow" d={electricPath} />
                    <path className="electric-path-core" d={electricPath} />
                    <path className="electric-path-pulse" d={electricPath} />
                  </>
                )}
              </svg>

              <div className="chaebol-center" ref={centerRef}>
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
                    ref={(element) => {
                      nodeRefs.current[c.id] = element;
                    }}
                    className={
                      "chaebol-node node-" +
                      i +
                      (c.id === id ? " selected" : "")
                    }
                    onClick={() => {
                      setId(c.id);
                    }}
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

      {/* =====================================================
          VAI TRÒ CỦA SAMSUNG VÀ NGÀNH BÁN DẪN
      ===================================================== */}
      <section className="section section-soft">
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
          
          <Reveal>
            <div>
              <span className="eyebrow">SAMSUNG & NỀN KINH TẾ HÀN QUỐC</span>
              <h2 className="h2" style={{ marginTop: 12 }}>
                Lá chắn Silicon & Động lực tăng trưởng
              </h2>
            </div>
          </Reveal>

          {/* Vai trò của Samsung Electronics */}
          <Reveal>
            <div className="reason-layout">
              <div className="reason-content">
                <span className="eyebrow">VƯƠNG MIỆN KINH TẾ</span>
                <h2 className="h2 reason-title">Samsung Electronics: Trụ cột tài chính</h2>
                <ul className="bullet-list" style={{ marginTop: 16 }}>
                  <li>
                    <b>Đóng góp ngân sách:</b> Chiếm 15-20% tổng số thu thuế TNDN của Chính phủ Hàn Quốc hàng năm.
                  </li>
                  <li>
                    <b>Vốn hóa thị trường:</b> Đạt 20-25% tổng vốn hóa chứng khoán KOSPI, ảnh hưởng trực tiếp tới chỉ số tài chính quốc gia.
                  </li>
                </ul>
              </div>

              <div className="reason-media-grid" style={{ gridTemplateColumns: "1fr" }}>
                <div className="reason-media-card" style={{ aspectRatio: "16/11" }}>
                  <img src="/images/myth7.png" alt="Samsung Electronics Logo" />
                  <span>Samsung Electronics - Doanh nghiệp công nghệ hàng đầu châu Á</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Ngành bán dẫn đối với Hàn Quốc */}
          <Reveal delay={0.12}>
            <div className="reason-layout">
              <div className="reason-content">
                <span className="eyebrow">AN NINH QUỐC GIA</span>
                <h2 className="h2 reason-title">Tầm quan trọng của ngành Bán dẫn</h2>
                <ul className="bullet-list" style={{ marginTop: 16 }}>
                  <li>
                    <b>Trụ cột xuất khẩu:</b> Chiếm 18-22% tổng kim ngạch xuất khẩu toàn quốc.
                  </li>
                  <li>
                    <b>Thống trị chip nhớ:</b> Nắm giữ 40-45% thị phần DRAM và hơn 30% NAND Flash toàn cầu.
                  </li>
                  <li>
                    <b>Lá chắn Silicon:</b> Biến Hàn Quốc thành mắt xích cốt lõi trong chuỗi cung ứng công nghệ toàn cầu.
                  </li>
                </ul>
              </div>

              <div className="reason-media-grid" style={{ gridTemplateColumns: "1fr" }}>
                <div className="reason-media-card" style={{ aspectRatio: "16/11" }}>
                  <img src="/images/myth8.png" alt="Nhà máy sản xuất chip bán dẫn Samsung" />
                  <span>Khu sản xuất chip bán dẫn tiên tiến của Samsung</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Vị trí xuất khẩu và công nghệ */}
          <Reveal delay={0.16}>
            <div className="reason-layout">
              <div className="reason-content">
                <span className="eyebrow">TIÊN PHONG CÔNG NGHỆ</span>
                <h2 className="h2 reason-title">Vị thế Xuất khẩu & R&D Toàn cầu</h2>
                <ul className="bullet-list" style={{ marginTop: 16 }}>
                  <li>
                    <b>Đầu tư R&D:</b> Chi trả 20-25 tỷ USD/năm, đứng Top 2 thế giới cạnh tranh với Google, Amazon.
                  </li>
                  <li>
                    <b>Sở hữu bằng sáng chế:</b> Liên tục dẫn đầu về số lượng bằng sáng chế tại USPTO (Hoa Kỳ).
                  </li>
                  <li>
                    <b>Đúc chip siêu nhỏ:</b> Cùng TSMC tiên phong công nghệ 3nm & 2nm sử dụng cấu trúc GAA.
                  </li>
                </ul>
              </div>

              <div className="reason-media-grid" style={{ gridTemplateColumns: "1fr" }}>
                <div className="reason-media-card" style={{ aspectRatio: "16/11" }}>
                  <img src="/images/myth9.png" alt="Cấu trúc đúc chip GAAFET" />
                  <span>Công nghệ đúc chip tiến trình cao cấp GAAFET</span>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* =====================================================
          MẶT TRÁI CỦA MÔ HÌNH CHAEBOL
      ===================================================== */}
      <section className="section">
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
          
          <Reveal>
            <div>
              <span className="eyebrow">MẶT TRÁI CỦA MÔ HÌNH CHAEBOL</span>
              <h2 className="h2" style={{ marginTop: 12 }}>
                Góc khuất quyền lực & Thách thức thể chế
              </h2>
            </div>
          </Reveal>

          {/* Các góc khuất lý thuyết */}
          <Reveal>
            <div className="grid grid-2" style={{ gap: "24px" }}>
              <div className="card callout">
                <Building2 size={28} color="var(--blue)" />
                <strong>Tập trung quyền lực kinh tế</strong>
                <p>
                  Độc quyền bành trướng làm chèn ép doanh nghiệp vừa và nhỏ. Vận dụng KTCT Mác - Lênin: Sự tập trung sản xuất dẫn tới tổ chức độc quyền "bóp chết những ai không phục tùng".
                </p>
              </div>

              <div className="card callout">
                <AlertTriangle size={28} color="#D73645" />
                <strong>Quan hệ sở hữu gia đình</strong>
                <p>
                  Mô hình hình tháp giúp gia tộc kiểm soát toàn bộ tập đoàn dù sở hữu ít cổ phần, dẫn tới rủi ro chia rẽ kinh tế khi xảy ra tranh chấp quyền lực.
                </p>
              </div>

              <div className="card callout">
                <Gavel size={28} color="var(--blue)" />
                <strong>Quản trị doanh nghiệp</strong>
                <p>
                  Quyết định mang tính độc đoán cá nhân của "Tổng tài" (Chairman). HĐQT và Ban kiểm soát thường chỉ đóng vai trò "con dấu cao su".
                </p>
              </div>

              <div className="card callout">
                <Scale size={28} color="#D73645" />
                <strong>Đặc quyền "Quy tắc 3-5"</strong>
                <p>
                  Nhiều lãnh đạo phạm tội nhận án 3 năm tù, 5 năm án treo rồi được đặc xá với lý do "công lao kinh tế", tạo sự bất bình đẳng xã hội ("Thìa vàng - Thìa đất").
                </p>
              </div>
            </div>
          </Reveal>

          {/* Bê bối chấn động chính trường 2016 - 2017 */}
          <Reveal delay={0.12}>
            <div className="reason-layout" style={{ background: "var(--surface-soft, #f8fafc)", padding: "32px", borderRadius: "24px" }}>
              <div className="reason-content">
                <span className="eyebrow" style={{ color: "#D73645" }}>BÊ BỐI LỊCH SỬ</span>
                <h2 className="h2 reason-title">Chính trường chấn động (2016 - 2017)</h2>
                <p className="copy reason-text">
                  Lee Jae-yong bị điều tra do đưa hối lộ nhằm vận động Quỹ Hưu trí Quốc gia (NPS) ủng hộ thương vụ sáp nhập Samsung C&T và Cheil Industries (2015), giúp củng cố quyền kiểm soát Samsung Electronics.
                </p>
                <div style={{ marginTop: "16px", padding: "16px", background: "#fff", borderRadius: "12px", borderLeft: "4px solid #D73645" }}>
                  <b>Hậu quả pháp lý:</b> Dẫn đến phong trào biểu tình thắp nến khổng lồ, Tổng thống Park Geun-hye bị phế truất, còn Lee Jae-yong bị tuyên phạt 2 năm 6 tháng tù giam vào tháng 1/2021.
                </div>
              </div>

              <div className="reason-media-grid" style={{ gridTemplateColumns: "1fr", gap: "16px" }}>
                <div className="reason-media-card" style={{ aspectRatio: "16/10" }}>
                  <img src="/images/myth10.png" alt="Biểu tình thắp nến tại Quảng trường Gwanghwamun" />
                  <span>Biểu tình thắp nến tại Quảng trường Gwanghwamun (Seoul, 2016)</span>
                </div>
                <div className="reason-media-card" style={{ aspectRatio: "16/10" }}>
                  <img src="/images/myth11.png" alt="Toàn cảnh các cuộc biểu tình thắp nến phản đối bê bối" />
                  <span>Toàn cảnh làn sóng biểu tình yêu cầu phế truất Tổng thống</span>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      <RouteCard gameUrl={GAME_URL} flipbookUrl={FLIPBOOK_URL} />

      <PageFooterNav nextPath="/government" nextLabel="Đến trang kế" />
    </>
  );
}
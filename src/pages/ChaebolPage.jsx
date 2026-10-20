import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Car,
  BatteryCharging,
  Network,
  ArrowUpRight,
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
  const Icon = iconMap[id];

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

    // Tọa độ tâm của hai phần tử, tính tương đối với sơ đồ.
    const x1 = centerRect.left + centerRect.width / 2 - mapRect.left;
    const y1 = centerRect.top + centerRect.height / 2 - mapRect.top;

    const x2 = nodeRect.left + nodeRect.width / 2 - mapRect.left;
    const y2 = nodeRect.top + nodeRect.height / 2 - mapRect.top;

    const dx = x2 - x1;
    const dy = y2 - y1;

    const length = Math.sqrt(dx * dx + dy * dy) || 1;

    // Độ cong nhẹ của đường điện.
    const bend = 24;

    const mx = (x1 + x2) / 2 - (dy / length) * bend;
    const my = (y1 + y2) / 2 + (dx / length) * bend;

    setElectricPath(`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`);
  }, [id]);

  // Tự vẽ đường điện khi tải trang và khi đổi chaebol.
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

      if (centerRef.current) {
        observer.observe(centerRef.current);
      }

      const selectedNode = nodeRefs.current[id];

      if (selectedNode) {
        observer.observe(selectedNode);
      }
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
                    <feGaussianBlur
                      stdDeviation="3"
                      result="blur"
                    />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {electricPath && (
                  <>
                    <path
                      className="electric-path-glow"
                      d={electricPath}
                    />
                    <path
                      className="electric-path-core"
                      d={electricPath}
                    />
                    <path
                      className="electric-path-pulse"
                      d={electricPath}
                    />
                  </>
                )}
              </svg>

              <div
                className="chaebol-center"
                ref={centerRef}
              >
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

                    <h2
                      className="h2"
                      style={{ marginTop: 12 }}
                    >
                      {x.name}
                    </h2>

                    <p
                      className="copy"
                      style={{ marginTop: 18 }}
                    >
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
          ĐẶC ĐIỂM CHAEBOL & SỰ BẢO TRỢ CỦA NHÀ NƯỚC
      ===================================================== */}
      <section className="section section-soft">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          
          {/* KHỐI 1: KINH DOANH ĐA NGÀNH */}
          <Reveal>
            <div className="reason-layout">
              <div className="reason-content">
                <span className="eyebrow">ĐẶC ĐIỂM CHAEBOL</span>
                <h2 className="h2 reason-title">Kinh doanh đa ngành xuyên lĩnh vực (Conglomerate)</h2>
                <p className="copy reason-text">
                  Hoạt động từ sản xuất công nghiệp nặng, công nghệ cao, đóng tàu, hóa chất, xe hơi cho đến bán lẻ, bảo hiểm, bất động sản, bệnh viện, giải trí, truyền thông.
                </p>
              </div>

              <div className="reason-media-grid" style={{ gridTemplateColumns: '1fr' }}>
                <div className="reason-media-card" style={{ aspectRatio: '16/11' }}>
                  <img src="/images/myth5.png" alt="Các tập đoàn Chaebol tiêu biểu: SK, Samsung, Hyundai, LG" />
                  <span>Các trụ cột kinh tế: SK, Samsung, Hyundai, LG</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* KHỐI 2: SỰ BẢO TRỢ CỦA NHÀ NƯỚC */}
          <Reveal delay={0.12}>
            <div className="reason-layout">
              <div className="reason-content">
                <span className="eyebrow">MỐI QUAN HỆ THỂ CHẾ</span>
                <h2 className="h2 reason-title">Sự bảo trợ đặc biệt của Nhà nước</h2>
                <p className="copy reason-text">
                  Tồn tại mối liên hệ hữu cơ, gắn bó mật thiết với chính phủ trong suốt lịch sử phát triển thông qua việc tiếp cận tín dụng rẻ, ưu đãi thuế quan và bảo hộ thị trường.
                </p>
              </div>

              <div className="reason-media-grid" style={{ gridTemplateColumns: '1fr' }}>
                <div className="reason-media-card" style={{ aspectRatio: '16/11' }}>
                  <img src="/images/myth6.png" alt="Tổng thống Park Chung-hee thăm nhà máy" />
                  <span>Tổng thống Park Chung-hee thăm nhà máy hoặc khu công nghiệp trong giai đoạn công nghiệp hóa.</span>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      <RouteCard
        gameUrl={GAME_URL}
        flipbookUrl={FLIPBOOK_URL}
      />

      <PageFooterNav
        nextPath="/government"
        nextLabel="Đến trang kế"
      />
    </>
  );
}
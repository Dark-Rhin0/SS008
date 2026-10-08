import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Users,
  CalendarDays,
  Youtube,
  ExternalLink,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import PageIntro from '../components/PageIntro'
import PageFooterNav from '../components/PageFooterNav'
import Reveal from '../components/Reveal'
import { eventTimeline } from '../data'

import '../page-styles/detail.css'

const YOUTUBE_VIDEO_ID = 'gweXJpFlIlI'

const YOUTUBE_WATCH_URL =
  `https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`

const YOUTUBE_EMBED_URL =
  `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1&playsinline=1`

export default function EventPage() {
  const [i, setI] = useState(0)
  const e = eventTimeline[i]

  return (
    <>
      {/* =====================================================
          PAGE INTRO
      ===================================================== */}
      <PageIntro
        number="01 / Sự kiện"
        title="Điều gì đã xảy ra?"
        subtitle="Quyết định đặc xá được công bố ngày 12/08/2022 và có hiệu lực vào ngày 15/08/2022, nhân Ngày Giải phóng Hàn Quốc."
      />

      {/* =====================================================
          EVENT CONTENT
      ===================================================== */}
      <section className="section">
        <div className="container">

          {/* =================================================
              FACTS
          ================================================= */}
          <Reveal>
            <div className="event-facts grid grid-3">
              <div className="card fact">
                <CalendarDays />

                <strong>12/08/2022</strong>

                <span>công bố</span>
              </div>

              <div className="card fact">
                <CalendarDays />

                <strong>15/08/2022</strong>

                <span>có hiệu lực</span>
              </div>

              <div className="card fact">
                <Users />

                <strong>1.693</strong>

                <span>
                  người được ân xá theo thông báo chính thức
                </span>
              </div>
            </div>
          </Reveal>

          {/* =================================================
              INTERACTIVE TIMELINE
          ================================================= */}
          <Reveal delay={0.08}>
            <div className="story-slider card">

              <div className="story-side">
                <span className="eyebrow">
                  INTERACTIVE TIMELINE
                </span>

                <div className="timeline-nav">
                  {eventTimeline.map((x, k) => (
                    <button
                      key={x.date}
                      className={k === i ? 'active' : ''}
                      onClick={() => setI(k)}
                    >
                      <span>{x.date}</span>
                      <i />
                    </button>
                  ))}
                </div>
              </div>

              <div className="story-main">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={e.date}
                    initial={{
                      opacity: 0,
                      y: 25,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -25,
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                  >
                    <span className="small">
                      MỐC {String(i + 1).padStart(2, '0')}
                    </span>

                    <div className="big-date">
                      {e.date}
                    </div>

                    <h2 className="h3">
                      {e.title}
                    </h2>

                    <p className="copy">
                      {e.text}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="slider-controls">
                  <button
                    className="btn btn-ghost"
                    onClick={() =>
                      setI(
                        (i - 1 + eventTimeline.length) %
                          eventTimeline.length
                      )
                    }
                  >
                    <ArrowLeft size={16} />
                    trước
                  </button>

                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      setI(
                        (i + 1) %
                          eventTimeline.length
                      )
                    }
                  >
                    tiếp
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>

          {/* =================================================
              YOUTUBE PLAYER
          ================================================= */}
          <Reveal delay={0.14}>
            <div className="event-video-section">

              <div className="event-video-heading">
                <span className="eyebrow">
                  xem video
                </span>

                <h2
                  className="h3"
                  style={{ marginTop: 12 }}
                >
                  Video về quyết định đặc xá Lee Jae-yong
                </h2>

                <p
                  className="copy"
                  style={{
                    marginTop: 12,
                    maxWidth: 720,
                  }}
                >
                  Phóng sự Reuters về việc Chính phủ
                  Hàn Quốc đặc xá Lee Jae-yong trong
                  bối cảnh nước này đối mặt với áp lực
                  kinh tế năm 2022.
                </p>
              </div>

              <div className="event-video-card card">

                {/* =========================================
                    YOUTUBE PLAYER
                ========================================== */}
                <div className="event-video-frame">
                  <iframe
                    src={YOUTUBE_EMBED_URL}
                    title="South Korea pardons Samsung's Lee over economic crisis - Reuters"
                    loading="lazy"
                    allow="
                      accelerometer;
                      autoplay;
                      clipboard-write;
                      encrypted-media;
                      gyroscope;
                      picture-in-picture;
                      web-share
                    "
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>

                {/* =========================================
                    VIDEO INFO
                ========================================== */}
                <div className="event-video-footer">
                  <div className="event-video-info">
                    <strong>
                      Reuters — 12/08/2022
                    </strong>

                    <p>
                      South Korea pardons Samsung's Lee
                      over 'economic crisis'
                    </p>
                  </div>

                  <a
                    href={YOUTUBE_WATCH_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-ghost"
                  >
                    <Youtube size={17} />
                    Xem trên YouTube
                    <ExternalLink size={15} />
                  </a>
                </div>

              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          LEGAL CONTEXT
      ===================================================== */}
      <section className="section section-soft">
        <div className="container grid grid-2">

          <Reveal>
            <div>
              <span className="eyebrow">
                LEE JAE-YONG
              </span>

              <h2
                className="h2"
                style={{ marginTop: 16 }}
              >
                Đặc xá không có nghĩa là được tuyên vô tội.
              </h2>

              <p
                className="copy"
                style={{ marginTop: 22 }}
              >
                Theo tài liệu, ông đã mãn hạn tù vào
                29/07/2022 nhưng vẫn chịu hạn chế làm việc
                5 năm. Quyết định đặc xá dỡ bỏ hạn chế đó
                và khôi phục quyền điều hành, chứ không
                xóa phán quyết hình sự.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="card callout">
              <ShieldCheck
                size={28}
                color="var(--blue)"
              />

              <strong>
                Điểm pháp lý cần nhớ
              </strong>

              <p>
                Lệnh đặc xá không đồng nghĩa xóa án hay
                tuyên vô tội; tài liệu cũng nêu ông vẫn
                phải đối diện một vụ án riêng về cáo buộc
                gian lận kế toán, thao túng giá cổ phiếu
                và giao dịch bất hợp pháp.
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}
      <PageFooterNav
        nextPath="/context"
        nextLabel="Đến trang kế"
      />
    </>
  )
}
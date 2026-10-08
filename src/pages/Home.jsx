import { Link } from 'react-router-dom'
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Gamepad2,
  Scale,
  FileText,
} from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { sections } from '../data'
import { FLIPBOOK_URL, GAME_URL } from '../config'
import Reveal from '../components/Reveal'
import '../page-styles/home.css'

function HeroBackdrop({ progress }) {
  const scale = useTransform(
    progress,
    [0, 0.45, 1],
    [1, 1.06, 1.12]
  )

  const y = useTransform(
    progress,
    [0, 1],
    [0, 46]
  )

  const brightness = useTransform(
    progress,
    [0, 0.65, 1],
    [
      'brightness(1)',
      'brightness(.84)',
      'brightness(.64)',
    ]
  )

  const overlay = useTransform(
    progress,
    [0, 0.6, 1],
    [0.18, 0.34, 0.55]
  )

  return (
    <>
      <motion.div
        className="hero-photo"
        style={{
          scale,
          y,
          filter: brightness,
        }}
      />

      <motion.div
        className="hero-photo-tint"
        style={{
          opacity: overlay,
        }}
      />
    </>
  )
}

export default function Home() {
  const heroRef = useRef(null)

  const {
    scrollYProgress: heroProgress,
  } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const copyY = useTransform(
    heroProgress,
    [0, 1],
    [0, -46]
  )

  const copyOpacity = useTransform(
    heroProgress,
    [0, 0.48, 1],
    [1, 1, 0.25]
  )

  // =========================================================
  // CUỘN MƯỢT TỚI PHẦN STORY MAP
  // =========================================================
  const handleStoryScroll = (event) => {
    event.preventDefault()

    const target = document.getElementById('map')

    if (!target) return

    const lenis = window.__lenis

    if (lenis) {
      lenis.scrollTo(target, {
        duration: 1.15,
        immediate: false,
        force: false,
      })
    } else {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }

    // Cập nhật URL hash mà không làm browser tự nhảy
    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}${window.location.search}#map`
    )
  }

  return (
    <div>
      {/* =====================================================
          HERO
      ===================================================== */}
      <section
        className="home-hero-stage"
        ref={heroRef}
      >
        <div className="hero-pin">
          <HeroBackdrop progress={heroProgress} />

          <div className="hero-vignette" />

          <div className="container hero-content-wrap">
            <motion.div
              className="hero-copy"
              style={{
                y: copyY,
                opacity: copyOpacity,
              }}
            >
              <span className="eyebrow hero-eyebrow">
                CASE STUDY / SOUTH KOREA / 2022
              </span>

              <h1 className="h1 hero-title" style={{ marginTop: 12 }}>
                Khi <span style={{ color:'#35cc27'}}>KINH TẾ</span>
                <br />
                <span>tác động đến</span>
                <br />
                <span style={{ color:'#0c6ec9', lineHeight: 1.2 }}>CHÍNH TRỊ</span>
              </h1>

              <p className="lead hero-lead">
                Tại sao Chính phủ Hàn Quốc đặc xá cho Lee
                Jae-yong và nhiều lãnh đạo Chaebol vào
                tháng 8/2022?
              </p>

              <div className="hero-actions">
                <Link
                  className="btn btn-primary"
                  to="/event"
                >
                  Bắt đầu câu chuyện
                  <ArrowUpRight size={17} />
                </Link>

                <a
                  className="btn btn-hero-ghost"
                  href={FLIPBOOK_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  <BookOpen size={16} />
                  Mở Flipbook
                </a>
              </div>

              <div className="hero-under">
                <span>
                  <span className="pulse" />
                  scroll để nội dung tiến lên
                </span>

                <span>
                  8 chương / 1 câu hỏi lớn
                </span>
              </div>
            </motion.div>
          </div>

          {/* =================================================
              SMOOTH SCROLL CUE
              ================================================= */}
          <a
            href="#map"
            className="scroll-cue scroll-cue-dark"
            onClick={handleStoryScroll}
            style={{ position: 'fixed', bottom: '5vh'}}
          >
            <ArrowDown size={16}/>
            cuộn để mở câu chuyện
          </a>
        </div>

        {/* =====================================================
            HERO COVER
        ===================================================== */}
        <section
          className="hero-cover"
          id="map"
        >
          <div className="container hero-cover-inner">
            <Reveal>
              <div className="cover-kicker">
                <span className="eyebrow">
                  THE QUESTION
                </span>

                <span className="cover-rule" />
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="cover-title">
                Một quyết định đặc xá.
                <br />
                <span>
                  Nhưng đằng sau nó là một bài toán quốc gia.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="cover-copy">
                Kinh tế Hàn Quốc năm 2022 chịu sức ép từ
                lạm phát, thương mại, năng lượng và cạnh
                tranh công nghệ. Chính phủ đặt cược vào
                năng lực của các Chaebol — đồng thời chấp
                nhận một cuộc tranh luận lớn về pháp quyền.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="cover-actions">
                <Link
                  className="btn btn-primary"
                  to="/context"
                >
                  Đi vào bối cảnh
                  <ArrowUpRight size={16} />
                </Link>

                <Link
                  className="btn btn-ghost"
                  to="/tradeoff"
                >
                  <Scale size={16} />
                  Xem điểm căng thẳng
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </section>

      {/* =======================================================
          STORY MAP
      ======================================================= */}
      <section className="section section-map">
        <div className="container">
          <Reveal>
            <div className="kicker-line">
              <div>
                <span className="eyebrow">
                  THE STORY MAP
                </span>

                <h2
                  className="h2"
                  style={{ marginTop: 15 }}
                >
                  Đừng đọc hết.
                  <br />
                  <span style={{ color: 'var(--blue)' }}>
                    Hãy chọn nơi muốn đi.
                  </span>
                </h2>
              </div>

              <div className="right">
                <p className="copy">
                  Trang chủ chỉ giữ lại những câu mở đầu
                  quan trọng. Mỗi chương mở sang một trang
                  nhánh để câu chuyện có nhịp, có khoảng thở
                  và có tương tác.
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            {sections.map((s, i) => (
              <Reveal
                key={s.id}
                delay={Math.min(i * 0.03, 0.18)}
              >
                <Link
                  className="section-link"
                  to={s.path}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 15,
                    }}
                  >
                    <div className="num">
                      {s.number}
                    </div>

                    <div>
                      <h3>{s.title}</h3>
                      <p>{s.subtitle}</p>
                    </div>
                  </div>

                  <ArrowUpRight
                    size={24}
                    color="#98A2B3"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =======================================================
          CENTRAL TENSION
      ======================================================= */}
      <section className="section home-feature">
        <div className="container grid grid-2 home-feature-grid">
          <Reveal>
            <div className="editorial-image" />
          </Reveal>

          <Reveal delay={0.12}>
            <div
              style={{
                alignSelf: 'center',
              }}
            >
              <span className="eyebrow">
                THE CENTRAL TENSION
              </span>

              <h2
                className="h2"
                style={{ marginTop: 16 }}
              >
                “Samsung có quá quan trọng để bị đứng yên?”
              </h2>

              <p
                className="copy"
                style={{ marginTop: 22 }}
              >
                Tài liệu đặt trọng tâm vào mối căng thẳng
                giữa hai giá trị: một phía là phục hồi kinh
                tế, đầu tư, việc làm và công nghệ; phía còn
                lại là bình đẳng trước pháp luật và niềm tin
                vào tư pháp.
              </p>

              <div className="mini-actions">
                <Link
                  className="btn btn-ghost"
                  to="/tradeoff"
                >
                  Xem bài toán đánh đổi
                  <Scale size={16} />
                </Link>

                <Link
                  className="btn btn-ghost"
                  to="/sources"
                >
                  <FileText size={16} />
                  Xem nguồn
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =======================================================
          FLIPBOOK + GAME
      ======================================================= */}
      <section className="section home-portal">
        <div className="container">
          <Reveal>
            <div className="portal card">
              <div>
                <span className="eyebrow">
                  NEXT LAYER
                </span>

                <h2
                  className="h3"
                  style={{ marginTop: 14 }}
                >
                  Flipbook & Game sẽ là hai lớp trải nghiệm
                  tiếp theo.
                </h2>

                <p className="copy">
                  Flipbook dành cho tài liệu đầy đủ. Game
                  dành cho phần tương tác/kiểm tra tình huống
                  — có thể thay URL ngay trong{' '}
                  <code>src/config.js</code>.
                </p>
              </div>

              <div className="portal-actions">
                <a
                  className="btn btn-primary"
                  href={FLIPBOOK_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  <BookOpen size={16} />
                  Flipbook
                </a>

                <a
                  className="btn btn-red"
                  href={GAME_URL}
                >
                  <Gamepad2 size={16} />
                  Game Hub
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
import { Link, useLocation } from 'react-router-dom'

import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Scale,
  FileText,
  X,
  Maximize2, Compass
} from 'lucide-react'

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
} from 'framer-motion'

import {
  useEffect,
  useRef,
  useState,
} from 'react'

import { sections } from '../data'
import { FLIPBOOK_URL, GAME_URL } from '../config'
import Reveal from '../components/Reveal'

import '../page-styles/home.css'


/*
 * =========================================================
 * IMPORT IMAGE
 * =========================================================
 */

import bigChaebol from '../assets/bigChaebol.jpg'
import leeJaeYong from '../assets/LeeJaeYong.jpg'

/*
 * =========================================================
 * HERO BACKDROP
 * =========================================================
 *
 * Có 2 trạng thái:
 *
 * 1. replay = false
 *    → hoạt động hoàn toàn bằng scroll như hiện tại.
 *
 * 2. replay = true
 *    → khi đang ở Home và bấm logo,
 *      ảnh bắt đầu lớn rồi thu nhỏ về bình thường.
 */

function HeroBackdrop({ progress, replay }) {

  /*
   * =========================================================
   * SCROLL ANIMATION
   * =========================================================
   */

  const scrollScale = useTransform(
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


  /*
   * =========================================================
   * REPLAY SCALE
   * =========================================================
   *
   * Khi replay:
   *
   * 1.12
   *   ↓
   * 1
   *
   * Khi không replay:
   * dùng scrollScale bình thường.
   */

  const replayScale = useMotionValue(
    replay ? 1.12 : 1
  )


  /*
   * =========================================================
   * REPLAY ANIMATION
   * =========================================================
   */

  useEffect(() => {

    if (!replay) {

      replayScale.set(1)

      return

    }


    /*
     * Luôn bắt đầu từ ảnh lớn.
     */

    replayScale.set(1.12)


    /*
     * Thu nhỏ về kích thước bình thường.
     */

    const controls = animate(
      replayScale,
      1,
      {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }
    )


    return () => {

      controls.stop()

    }

  }, [replay, replayScale])


  /*
   * Khi replay → dùng replayScale.
   * Bình thường → dùng scrollScale.
   */

  const finalScale = replay
    ? replayScale
    : scrollScale


  return (
    <>
      <motion.div
        className="hero-photo"
        style={{
          scale: finalScale,
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


/*
 * =========================================================
 * HOME
 * =========================================================
 */

export default function Home() {

  /*
   * =========================================================
   * ROUTER LOCATION
   * =========================================================
   *
   * Header sẽ truyền:
   *
   * state={{ replayHero: true }}
   *
   * khi người dùng đang ở Home và bấm logo.
   */

  const location = useLocation()


  const replayHero =
    location.state?.replayHero === true


  /*
   * =========================================================
   * CLEAR REPLAY STATE
   * =========================================================
   *
   * Sau khi nhận replayHero, xóa state khỏi history.
   *
   * Điều này tránh việc refresh Home lại tiếp tục replay.
   */

  useEffect(() => {

    if (!replayHero) return


    window.history.replaceState(
      {},
      document.title,
      window.location.pathname +
        window.location.search
    )

  }, [replayHero])


  /*
   * =========================================================
   * IMAGE LIGHTBOX
   * =========================================================
   */

  const [selectedImage, setSelectedImage] = useState(null)


  /*
   * =========================================================
   * ESCAPE TO CLOSE IMAGE
   * =========================================================
   */

  useEffect(() => {

    const handleKeyDown = (event) => {

      if (event.key === 'Escape') {

        setSelectedImage(null)

      }

    }


    window.addEventListener(
      'keydown',
      handleKeyDown
    )


    return () => {

      window.removeEventListener(
        'keydown',
        handleKeyDown
      )

    }

  }, [])


  /*
   * =========================================================
   * THE CENTRAL TENSION
   * =========================================================
   */

  const centralTensionRef = useRef(null)


  const centralTensionInView = useInView(
    centralTensionRef,
    {
      amount: 0.05,
    }
  )


  /*
   * =========================================================
   * HERO
   * =========================================================
   */

  const heroRef = useRef(null)


  /*
   * =========================================================
   * HERO SCROLL PROGRESS
   * =========================================================
   */

  const {
    scrollYProgress: heroProgress,
  } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })


  /*
   * =========================================================
   * HERO CONTENT MOVEMENT
   * =========================================================
   */

  const copyY = useTransform(
    heroProgress,
    [0, 1],
    [0, -46]
  )


  /*
   * =========================================================
   * HERO CONTENT OPACITY
   * =========================================================
   */

  const copyOpacity = useTransform(
    heroProgress,
    [0, 0.48, 1],
    [1, 1, 0.25]
  )


  /*
   * =========================================================
   * CUỘN MƯỢT TỚI STORY MAP
   * =========================================================
   */

  const handleStoryScroll = (event) => {

    event.preventDefault()


    const target = document.getElementById('map')


    if (!target) return


    const lenis = window.__lenis


    if (lenis) {

      lenis.scrollTo(
        target,
        {
          duration: 1.15,
          immediate: false,
          force: false,
        }
      )

    } else {

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })

    }


    /*
     * Cập nhật URL hash mà không để browser
     * tự nhảy vị trí.
     */

    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}${window.location.search}#map`
    )

  }


  /*
   * =========================================================
   * OPEN IMAGE
   * =========================================================
   */

  const openImage = () => {

    setSelectedImage(bigChaebol)

  }


  /*
   * =========================================================
   * CLOSE IMAGE
   * =========================================================
   */

  const closeImage = () => {

    setSelectedImage(null)

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


          {/* =================================================
              HERO BACKDROP
              ================================================= */}

          <HeroBackdrop
            progress={heroProgress}
            replay={replayHero}
          />


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

                SS008 / HÀN QUỐC / 2022

              </span>


              <h1
                className="h1 hero-title"
                style={{
                  marginTop: 12,
                }}
              >

                Khi{' '}

                <span
                  style={{
                    color: '#35cc27',
                  }}
                >
                  KINH TẾ
                </span>


                <br />


                <span>
                  tác động đến
                </span>


                <br />


                <span
                  style={{
                    color: '#0c6ec9',
                    lineHeight: 1.2,
                  }}
                >
                  CHÍNH TRỊ
                </span>

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

                <span className="hero-under-copy"></span>

              </div>

            </motion.div>

          </div>


          {/* =================================================
              SMOOTH SCROLL CUE
              ================================================= */}

          <motion.a
            href="#map"
            className="scroll-cue scroll-cue-dark"
            onClick={handleStoryScroll}
            animate={{
              opacity: centralTensionInView
                ? 0
                : 1,
            }}
            transition={{
              duration: 0.25,
              ease: 'easeOut',
            }}
            style={{
              position: 'fixed',
              bottom: '5vh',
              pointerEvents:
                centralTensionInView
                  ? 'none'
                  : 'auto',
            }}
          >

            <ArrowDown size={16} />

            cuộn để mở câu chuyện

          </motion.a>

        </div>


        {/* =====================================================
            HERO COVER
            ===================================================== */}

        <section className="hero-cover" id="map">
          <div className="container hero-cover-inner">
            
            {/* TIÊU ĐỀ ĐẶT RIÊNG Ở TRÊN CÙNG */}
            <div className="hero-cover-header">
              <Reveal>
                <div className="cover-kicker">
                  <span className="eyebrow">BÀI TOÁN ĐÁNH ĐỔI</span>
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
            </div>

            {/* KHỐI GRID 2 CỘT: NỘI DUNG (TRÁI) & ẢNH (PHẢI) */}
            <div className="editorial-body-grid">
              
              {/* CỘT TRÁI: NỘI DUNG & NÚT */}
              <div className="editorial-content">
                <Reveal delay={0.14}>
                  <p className="cover-copy">
                    Kinh tế Hàn Quốc năm 2022 chịu sức ép từ lạm phát, thương mại,
                    năng lượng và cạnh tranh công nghệ. Chính phủ đặt cược vào năng
                    lực của các Chaebol — đồng thời chấp nhận một cuộc tranh luận lớn
                    về pháp quyền.
                  </p>
                </Reveal>

                <Reveal delay={0.2}>
                  <div className="cover-actions">
                    <Link className="btn btn-primary" to="/context">
                      Xem bối cảnh
                      <ArrowUpRight size={16} />
                    </Link>

                    <Link className="btn btn-ghost" to="/tradeoff">
                      <Scale size={16} />
                      Xem cán cân
                    </Link>
                  </div>
                </Reveal>
              </div>

              {/* CỘT PHẢI: KHUNG ẢNH CẠNH NỘI DUNG */}
              <Reveal delay={0.16}>
                <figure className="editorial-figure">
                  <div className="editorial-image-wrapper">
                    <img
                      src={leeJaeYong}
                      alt="Lee Jae-yong tại tòa án"
                      className="editorial-img"
                    />
                  </div>
                  <figcaption className="editorial-caption">
                    Ông <strong>Lee Jae-yong</strong> (Phó chủ tịch Samsung) xuất hiện tại phiên tòa — biểu tượng của cuộc tranh luận giữa lợi ích kinh tế và tính nghiêm minh của pháp luật.
                  </figcaption>
                </figure>
              </Reveal>

            </div>

          </div>
        </section>

      </section>


      {/* =======================================================
          STORY MAP (HIỂN THỊ 4 CHƯƠNG ĐẦU + NÚT XEM TẤT CẢ)
          ======================================================= */}

      <section className="story-map-section" id="map">

        <div className="container">

          {/* SECTION HEADER */}
          <Reveal>

            <div className="story-map-header">

              <div className="header-left">

                <span className="eyebrow-badge">
                  <Compass size={14} /> BẢNG MỤC LỤC
                </span>

                <h2 className="h2 header-title">

                  Đừng chỉ nghe kể.{' '}

                  <span className="highlight-text">
                    Hãy tự tìm hiểu.
                  </span>

                </h2>

              </div>


              <div className="header-right">

                <p className="copy header-desc">

                  Chỉ khi tự đi tìm câu trả lời, bạn mới hiểu được đằng sau một
                  quyết định là cả một bài toán đánh đổi. Mỗi chương bạn khám phá
                  sẽ mở ra một góc nhìn khác.

                </p>

              </div>

            </div>

          </Reveal>


          {/* LƯỚI 4 CARD (2 CỘT x 2 HÀNG) */}
          <div className="story-map-grid">

            {sections.slice(0, 4).map((s, i) => (

              <Reveal
                key={s.id || i}
                delay={Math.min(i * 0.04, 0.16)}
              >

                <Link
                  className="story-card"
                  to={s.path}
                >

                  {/* Số thứ tự chìm ở nền */}
                  <span className="card-watermark-num">
                    {s.number || (i + 1).toString().padStart(2, '0')}
                  </span>


                  {/* Đỉnh thẻ: Tag & Mũi tên */}
                  <div className="card-top">

                    <span className="card-index-tag">
                      CHƯƠNG {s.number || (i + 1).toString().padStart(2, '0')}
                    </span>


                    <div className="card-arrow-circle">

                      <ArrowUpRight size={18} className="arrow-icon" />

                    </div>

                  </div>


                  {/* Thân thẻ: Tiêu đề & Mô tả */}
                  <div className="card-body">

                    <h3 className="card-title">
                      {s.title}
                    </h3>


                    <p className="card-subtitle">
                      {s.subtitle}
                    </p>

                  </div>


                  {/* Đường viền phát sáng khi Hover */}
                  <div className="card-hover-line" />

                </Link>

              </Reveal>

            ))}

          </div>


          {/* BANNER NÚT CHUYỂN HƯỚNG TỚI TRANG FULL */}
          <Reveal delay={0.2}>

            <div className="story-map-footer">

              <div className="footer-info">

                <span className="footer-badge">
                  Đang hiển thị 4 / {sections.length || 8} chương
                </span>

                <p className="footer-text">

                  Vẫn còn nhiều góc nhìn quan trọng về kinh tế, con người và pháp quyền phía trước.

                </p>

              </div>


              <Link
                to="/sections" /* Thay đường dẫn tới trang hiển thị full của bạn */
                className="btn-view-all"
              >

                <span>Mở toàn bộ mục lục</span>

                <ArrowUpRight size={18} />

              </Link>

            </div>

          </Reveal>

        </div>

      </section>


      {/* =======================================================
          CENTRAL TENSION
          ======================================================= */}

      <section
        ref={centralTensionRef}
        className="section home-feature"
      >

        <div className="container grid grid-2 home-feature-grid">


          {/* =================================================
              CLICKABLE BIG CHAEBOL IMAGE
              ================================================= */}

          <Reveal>

            <button
              type="button"
              className="editorial-image image-expand-trigger"
              onClick={openImage}
              aria-label="Xem ảnh Chaebol kích thước lớn"
            >

              <span className="image-expand-icon">

                <Maximize2 size={18} />

              </span>

            </button>

          </Reveal>


          <Reveal delay={0.12}>

            <div
              style={{
                alignSelf: 'center',
              }}
            >

              <span className="eyebrow">
                Tâm điểm tranh luận
              </span>


              <h2
                className="h2"
                style={{
                  marginTop: 16,
                }}
              >

                “Liệu Samsung có quan trọng đến thế?”

              </h2>


              <p
                className="copy"
                style={{
                  marginTop: 22,
                }}
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

      <section className="section final-experience">

        <div className="container">


          {/* =================================================
              TOP MINI NAV
              ================================================= */}

          <Reveal>

            <div className="final-mini-nav">

              <a
                href={GAME_URL}
                target="_blank"
                rel="noreferrer"
                className="final-mini-link"
              >

                Game

                <ArrowUpRight size={15} />

              </a>


              <a
                href={FLIPBOOK_URL}
                target="_blank"
                rel="noreferrer"
                className="final-mini-link"
              >

                Flipbook

                <ArrowUpRight size={15} />

              </a>


              <Link
                to="/sources"
                className="final-mini-link"
              >

                Nguồn

                <ArrowUpRight size={15} />

              </Link>

            </div>

          </Reveal>


          {/* =================================================
              MAIN FEATURE
              ================================================= */}

          <Reveal delay={0.08}>

            <div className="final-feature">


              {/* =================================================
                  IMAGE SIDE
                  ================================================= */}

              <div className="final-feature-image">

                <div className="final-image-overlay" />


                <div className="final-image-label">

                  SS008

                  <span>
                    ·
                  </span>

                  2022

                </div>

              </div>


              {/* =================================================
                  CONTENT SIDE
                  ================================================= */}

              <div className="final-feature-content">

                <span className="eyebrow final-eyebrow">
                  Đa góc nhìn
                </span>


                <h2 className="final-title">

                  Một quyết định.

                  <br />

                  <span>
                    Nhiều cách để nhìn.
                  </span>

                </h2>


                <p className="final-description">

                  Bạn đã thấy vì sao Chính phủ Hàn Quốc lựa chọn
                  đặc xá cho Lee Jae-yong và các lãnh đạo Chaebol.
                  Nhưng để hiểu đầy đủ quyết định ấy, hãy nhìn nó
                  từ cả dữ kiện lẫn góc nhìn của người ra quyết định.

                </p>


                {/* =================================================
                    OPTIONS
                    ================================================= */}

                <div className="final-options">


                  {/* =================================================
                      ĐÓNG GÓP
                      ================================================= */}

                  <Link
                    to="/qna"
                    className="final-option"
                  >

                    <div className="final-option-number">
                    </div>


                    <div className="final-option-content">

                      <span className="final-option-label">
                        Đóng góp
                      </span>


                      <h3>

                        Câu hỏi của bạn

                        <ArrowUpRight size={19} />

                      </h3>


                      <p>

                        Gửi cho mình câu hỏi phản biện của bạn để mình có thể trả lời ngay

                      </p>

                    </div>

                  </Link>


                  {/* =================================================
                      GAME
                      ================================================= */}

                  <a
                    href={GAME_URL}
                    className="final-option final-option-game"
                  >

                    <div className="final-option-number">
                    </div>


                    <div className="final-option-content">

                      <span className="final-option-label">
                        TƯƠNG TÁC
                      </span>


                      <h3>

                        Thử đưa ra quyết định

                        <ArrowUpRight size={19} />

                      </h3>


                      <p>

                        Nếu bạn là người ra quyết định, bạn sẽ
                        cân bằng tăng trưởng kinh tế và pháp quyền
                        như thế nào?

                      </p>

                    </div>

                  </a>

                </div>


                {/* =================================================
                    CLOSING LINE
                    ================================================= */}

                <div className="final-closing">

                  <span className="final-closing-line" />


                  <span>

                    KINH TẾ

                    <b>
                      {' × '}
                    </b>

                    PHÁP QUYỀN

                  </span>


                  <span className="final-closing-line" />

                </div>

              </div>

            </div>

          </Reveal>

        </div>

      </section>


      {/* =======================================================
          IMAGE LIGHTBOX
          ======================================================= */}

      {selectedImage && (

        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Xem ảnh kích thước lớn"
          onClick={closeImage}
        >


          {/* =================================================
              CLOSE BUTTON
              ================================================= */}

          <button
            type="button"
            className="image-lightbox-close"
            onClick={closeImage}
            aria-label="Đóng ảnh"
          >

            <X size={26} />

          </button>


          {/* =================================================
              FULL IMAGE
              ================================================= */}

          <img
            src={selectedImage}
            alt="Chaebol / Big 5"
            className="image-lightbox-img"
            onClick={(event) => {
              event.stopPropagation()
            }}
          />

        </div>

      )}

    </div>
  )
}
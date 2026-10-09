import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  TrendingDown,
  Flame,
  Ship,
  Activity,
  X,
  Maximize2,
} from 'lucide-react'

import PageIntro from '../components/PageIntro'
import PageFooterNav from '../components/PageFooterNav'
import Reveal from '../components/Reveal'
import { crisisStats } from '../data'

import '../page-styles/detail.css'


export default function ContextPage() {

  /* =========================================================
     CRISIS DATA
     ========================================================= */

  const [active, setActive] = useState(0)

  const s = crisisStats[active]


  /* =========================================================
     IMAGE LIGHTBOX
     ========================================================= */

  const [selectedImage, setSelectedImage] = useState(null)


  /* =========================================================
     ESCAPE TO CLOSE LIGHTBOX
     ========================================================= */

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


  /* =========================================================
     OPEN IMAGE
     ========================================================= */

  const openImage = () => {

    /*
     * Vì ảnh hiện tại đang được khai báo trong CSS
     * bằng background-image nên lightbox lấy trực tiếp
     * background-image của .editorial-image.
     */

    setSelectedImage(
      new URL(
        '../assets/bigChaebol.jpg',
        import.meta.url
      ).href
    )

  }


  /* =========================================================
     CLOSE IMAGE
     ========================================================= */

  const closeImage = () => {
    setSelectedImage(null)
  }


  return (
    <>

      {/* =====================================================
          PAGE INTRO
          ===================================================== */}

      <PageIntro
        number="02 / Bối cảnh"
        title="Tại sao lại là lúc đó?"
        subtitle="Năm 2022, Hàn Quốc phải xử lý cùng lúc lạm phát, chi phí năng lượng, tỷ giá, chuỗi cung ứng và nguy cơ giảm tốc. Đây là đòn đánh cực kỳ nặng nề vào nền kinh tế Hàn Quốc"
      />


      {/* =====================================================
          CRISIS STATS
          ===================================================== */}

      <section className="section">

        <div className="container">

          <Reveal>

            <div className="crisis-stage card">


              {/* =================================================
                  CRISIS LIST
                  ================================================= */}

              <div className="crisis-list">

                {crisisStats.map((x, i) => (

                  <button
                    key={x.label}
                    onClick={() => setActive(i)}
                    className={
                      i === active
                        ? 'active'
                        : ''
                    }
                  >

                    <span>
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <b>
                      {x.label}
                    </b>

                    <small>
                      {x.value}
                    </small>

                  </button>

                ))}

              </div>


              {/* =================================================
                  ACTIVE CRISIS
                  ================================================= */}

              <div className="crisis-focus">

                <AnimatePresence mode="wait">

                  <motion.div
                    key={s.label}

                    initial={{
                      opacity: 0,
                      scale: 0.96,
                      y: 12,
                    }}

                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                    }}

                    exit={{
                      opacity: 0,
                      scale: 0.98,
                      y: -10,
                    }}

                    transition={{
                      duration: 0.4,
                    }}
                  >

                    <span className="eyebrow">

                      Lí do {' '}

                      {String(active + 1).padStart(2, '0')}

                    </span>


                    <strong>
                      {s.value}
                    </strong>


                    <h2 className="h3">
                      {s.label}
                    </h2>


                    <p className="copy">
                      {s.detail}
                    </p>

                  </motion.div>

                </AnimatePresence>

              </div>

            </div>

          </Reveal>

        </div>

      </section>


      {/* =====================================================
          THREE CALLOUTS
          ===================================================== */}

      <section className="section section-soft">

        <div className="container grid grid-3">


          {/* =================================================
              GROWTH
              ================================================= */}

          <Reveal>

            <div className="card callout">

              <TrendingDown
                size={22}
                color="var(--blue)"
              />

              <b>
                Tăng trưởng
              </b>

              <p>
                Từ 4,1% năm 2021, dự báo 2022 bị hạ xuống
                quanh 2,6% trong tài liệu.
              </p>

            </div>

          </Reveal>


          {/* =================================================
              INFLATION
              ================================================= */}

          <Reveal delay={0.06}>

            <div className="card callout">

              <Flame
                size={22}
                color="#D73645"
              />

              <b>
                Lạm phát & năng lượng
              </b>

              <p>
                Chi phí sinh hoạt và sản xuất bị đẩy lên bởi
                năng lượng nhập khẩu đắt đỏ.
              </p>

            </div>

          </Reveal>


          {/* =================================================
              EXPORT / CHIP
              ================================================= */}

          <Reveal delay={0.12}>

            <div className="card callout">

              <Ship
                size={22}
                color="#0A1333"
              />

              <b>
                Xuất khẩu & chip
              </b>

              <p>
                Xuất khẩu là động lực tăng trưởng nhưng nhu
                cầu chip toàn cầu suy yếu.
              </p>

            </div>

          </Reveal>

        </div>

      </section>


      {/* =====================================================
          GOVERNMENT'S NEED
          ===================================================== */}

      <section className="section">

        <div className="container grid grid-2">


          {/* =================================================
              CLICKABLE IMAGE
              ================================================= */}

          <Reveal>

            <button
              type="button"
              className="editorial-image image-expand-trigger"
              style={{
                minHeight: 420,
              }}
              onClick={openImage}
              aria-label="Xem ảnh kích thước lớn"
            >

              <span className="image-expand-icon">

                <Maximize2 size={18} />

              </span>

            </button>

          </Reveal>


          {/* =================================================
              TEXT
              ================================================= */}

          <Reveal delay={0.12}>

            <div
              style={{
                alignSelf: 'center',
              }}
            >

              <span className="eyebrow">
                THỨ CHÍNH PHỦ CẦN
              </span>


              <h2
                className="h2"
                style={{
                  marginTop: 15,
                }}
              >

                Họ cần gì từ các Chaebol?

              </h2>


              <ul className="bullet-list">

                <li>

                  <b>
                    Vốn & quyết định chiến lược
                  </b>

                  <span>
                    cho bán dẫn, công nghệ và các dự án
                    rủi ro cao.
                  </span>

                </li>


                <li>

                  <b>
                    Xuất khẩu & việc làm
                  </b>

                  <span>
                    để làm “đầu tàu” trong bối cảnh thâm
                    hụt thương mại.
                  </span>

                </li>


                <li>

                  <b>
                    Năng lực cạnh tranh công nghệ
                  </b>

                  <span>
                    để giữ vị thế trong chuỗi cung ứng bán
                    dẫn toàn cầu.
                  </span>

                </li>

              </ul>

            </div>

          </Reveal>

        </div>

      </section>


      {/* =====================================================
          FOOTER NAVIGATION
          ===================================================== */}

      <PageFooterNav
        nextPath="/chaebol"
        nextLabel="Đến trang kế"
      />


      {/* =====================================================
          IMAGE LIGHTBOX
          ===================================================== */}

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

    </>
  )
}
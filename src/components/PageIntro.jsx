import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

export default function PageIntro({
  number,
  title,
  subtitle,
  children,
}) {
  const shouldReduceMotion = useReducedMotion()

  const motionDuration = shouldReduceMotion ? 0 : 0.55

  return (
    <section className="detail-hero">

      {/* Background — không animation liên tục */}
      <div className="detail-hero-grid" />
      <div className="detail-hero-glow detail-hero-glow-1" />
      <div className="detail-hero-glow detail-hero-glow-2" />


      <div className="container detail-hero-inner">

        {/* =================================================
            BACK
            ================================================= */}

        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  x: -10,
                }
          }
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: motionDuration,
            ease: 'easeOut',
          }}
        >
          <Link
            className="small detail-hero-back"
            to="/"
          >
            <ArrowLeft size={14} />
            <span>Tổng quan</span>
          </Link>
        </motion.div>


        {/* =================================================
            CONTENT
            ================================================= */}

        <div className="detail-hero-content">


          {/* =================================================
              META
              ================================================= */}

          <motion.div
            className="detail-hero-meta"
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 8,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: motionDuration,
              delay: shouldReduceMotion ? 0 : 0.08,
              ease: 'easeOut',
            }}
          >

            <span className="eyebrow detail-hero-number">
              {number}
            </span>

            <span className="detail-hero-meta-line" />

            <span className="detail-hero-meta-label">
              CASE STUDY / SOUTH KOREA
            </span>

          </motion.div>


          {/* =================================================
              TITLE

              QUAN TRỌNG:
              Không dùng overflow:hidden.
              Không scale chữ.
              ================================================= */}

          <motion.h1
            className="h2 detail-hero-title"
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 22,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: shouldReduceMotion
                ? 0
                : 0.65,
              delay: shouldReduceMotion
                ? 0
                : 0.14,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {title}
          </motion.h1>


          {/* =================================================
              SUBTITLE
              ================================================= */}

          <motion.div
            className="detail-hero-subtitle-wrap"
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 14,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: shouldReduceMotion
                ? 0
                : 0.55,
              delay: shouldReduceMotion
                ? 0
                : 0.3,
              ease: 'easeOut',
            }}
          >

            <p className="lead detail-hero-subtitle">
              {subtitle}
            </p>

          </motion.div>


          {/* =================================================
              CHILDREN
              ================================================= */}

          {children && (

            <motion.div
              className="detail-hero-children"
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 12,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: shouldReduceMotion
                  ? 0
                  : 0.5,
                delay: shouldReduceMotion
                  ? 0
                  : 0.42,
                ease: 'easeOut',
              }}
            >
              {children}
            </motion.div>

          )}


          {/* =================================================
              BOTTOM LINE
              ================================================= */}

          <motion.div
            className="detail-hero-bottom"
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                  }
            }
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.45,
              delay: shouldReduceMotion
                ? 0
                : 0.48,
            }}
          >

            <span className="detail-hero-bottom-line" />

            <span className="detail-hero-bottom-text">
              SS008 · KOREA · 2022
            </span>

            <span className="detail-hero-bottom-line" />

          </motion.div>

        </div>

      </div>


      {/* =====================================================
          DECORATIVE CORNER
          ===================================================== */}

      <div className="detail-hero-corner">
        <ArrowUpRight size={18} />
      </div>

    </section>
  )
}
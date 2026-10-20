import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

// Component Nền kinh tế chứa đường Line xanh xuất hiện 1 lần
function EcoBackdrop({ type = 'line', shouldReduceMotion }) {
  return (
    <div className="eco-backdrop" aria-hidden="true">
      <svg viewBox="0 0 1200 600" preserveAspectRatio="none">
        <defs>
          <pattern id="eco-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M60 0H0V60" fill="none" stroke="currentColor" strokeOpacity=".08" />
          </pattern>
        </defs>
        <rect width="1200" height="600" fill="url(#eco-grid)" />
        
        {type === 'line' && (
          <g>
            {/* Đường line xanh vẽ từ 0 -> 100% đúng 1 lần (đã bỏ đường mờ bên dưới) */}
            <motion.polyline
              points="0,480 120,430 240,455 360,380 480,400 600,300 720,330 840,220 960,250 1080,150 1200,170"
              fill="none"
              stroke="#00a2ff7a"
              strokeWidth="3"
              strokeOpacity=".9"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 1.8,
                ease: "easeInOut",
                delay: 0.2
              }}
            />
          </g>
        )}
        
        {type === 'wafer' && (
          <g stroke="currentColor" strokeWidth="1" strokeOpacity=".15" fill="none">
            <circle cx="600" cy="300" r="200" />
            <circle cx="600" cy="300" r="140" />
            <path d="M400 300H800 M600 100V500" />
          </g>
        )}
      </svg>
    </div>
  );
}

export default function PageIntro({
  number,
  title,
  subtitle,
  children,
  backdropType = 'line',
}) {
  const shouldReduceMotion = useReducedMotion()
  const motionDuration = shouldReduceMotion ? 0 : 0.55

  return (
    <section className="detail-hero" style={{ position: 'relative' }}>

      {/* SVG Eco Backdrop chứa đường Line xanh chạy 1 lần */}
      <EcoBackdrop type={backdropType} shouldReduceMotion={shouldReduceMotion} />

      {/* Background Decor */}
      <div className="detail-hero-grid" />
      <div className="detail-hero-glow detail-hero-glow-1" />
      <div className="detail-hero-glow detail-hero-glow-2" />
      <div className="ink-blob ink-blob-1" />
      <div className="ink-blob ink-blob-2" />
      <div className="ink-blob ink-blob-3" />

      <div className="container detail-hero-inner" style={{ position: 'relative', zIndex: 1 }}>

        {/* BACK BUTTON */}
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

        {/* CONTENT */}
        <div className="detail-hero-content">

          {/* META */}
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
              NHÓM 6 / SS008
            </span>
          </motion.div>

          {/* TITLE */}
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
              duration: shouldReduceMotion ? 0 : 0.65,
              delay: shouldReduceMotion ? 0 : 0.14,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {title}
          </motion.h1>

          {/* SUBTITLE */}
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
              duration: shouldReduceMotion ? 0 : 0.55,
              delay: shouldReduceMotion ? 0 : 0.3,
              ease: 'easeOut',
            }}
          >
            <p className="lead detail-hero-subtitle">
              {subtitle}
            </p>
          </motion.div>

          {/* CHILDREN */}
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
                duration: shouldReduceMotion ? 0 : 0.5,
                delay: shouldReduceMotion ? 0 : 0.42,
                ease: 'easeOut',
              }}
            >
              {children}
            </motion.div>
          )}

          {/* BOTTOM LINE */}
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
              delay: shouldReduceMotion ? 0 : 0.48,
            }}
          >
            <span className="detail-hero-bottom-line" />
            <span className="detail-hero-bottom-text">
              SS008 · HÀN QUỐC · 2022
            </span>
            <span className="detail-hero-bottom-line" />
          </motion.div>

        </div>

      </div>

    </section>
  )
}
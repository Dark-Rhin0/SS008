import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from '@studio-freight/lenis'

import Header from './components/Header'
import ScrollProgress from './components/ScrollProgress'

import Home from './pages/Home'
import EventPage from './pages/EventPage'
import ContextPage from './pages/ContextPage'
import ChaebolPage from './pages/ChaebolPage'
import GovernmentPage from './pages/GovernmentPage'
import DebatePage from './pages/DebatePage'
import MythPage from './pages/MythPage'
import TradeOffPage from './pages/TradeOffPage'
import ConclusionPage from './pages/ConclusionPage'
import SourcesPage from './pages/SourcesPage'
import FlipbookPage from './pages/FlipbookPage'
import GamePage from './pages/GamePage'
import GamePlayPage from './pages/GamePlayPage'
import Sections from './pages/Sections'
import QnA from './pages/QnA'

function Shell() {
  const location = useLocation()
  const lenisRef = useRef(null)
  const isStandaloneGame = location.pathname.replace(/\/$/, '') === '/game/play'

  useEffect(() => {
    document.documentElement.classList.toggle('game-mode', isStandaloneGame)
    return () => document.documentElement.classList.remove('game-mode')
  }, [isStandaloneGame])

  // =========================================================
  // KHỞI TẠO LENIS
  // =========================================================
  useEffect(() => {
    // Trên thiết bị cảm ứng, dùng native scrolling
    // để tránh Lenis can thiệp vào thao tác vuốt.
    const isTouchDevice = window.matchMedia(
      '(pointer: coarse)'
    ).matches

    if (isTouchDevice) {
      lenisRef.current = null
      delete window.__lenis
      return
    }

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1.5,
    })

    lenisRef.current = lenis
    window.__lenis = lenis

    let rafId

    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()

      if (window.__lenis === lenis) {
        delete window.__lenis
      }

      lenisRef.current = null
    }
  }, [])

  // =========================================================
  // XỬ LÝ ANCHOR SCROLL MƯỢT
  // Ví dụ: <a href="#map">
  // =========================================================
  useEffect(() => {
    const handleAnchorClick = (event) => {
      const anchor = event.target.closest('a[href^="#"]')

      if (!anchor) return

      // Chỉ xử lý click chuột trái bình thường
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const href = anchor.getAttribute('href')

      if (!href || href === '#') {
        return
      }

      let target = null

      try {
        target = document.querySelector(href)
      } catch {
        return
      }

      if (!target) {
        return
      }

      event.preventDefault()

      const lenis = lenisRef.current

      if (lenis) {
        lenis.scrollTo(target, {
          duration: 1.15,
          immediate: false,
        })
      } else {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }

      // Cập nhật hash nhưng không để browser tự jump
      window.history.replaceState(
        null,
        '',
        `${window.location.pathname}${window.location.search}${href}`
      )
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [])

  // =========================================================
  // RESET SCROLL KHI CHUYỂN ROUTE
  // =========================================================
  useEffect(() => {
    // Không cho browser tự restore vị trí cũ
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const resetScroll = () => {
      const lenis = lenisRef.current

      if (lenis) {
        // Dừng animation scroll hiện tại nếu có
        if (typeof lenis.stop === 'function') {
          lenis.stop()
        }

        // Reset vị trí Lenis về đầu
        lenis.scrollTo(0, {
          immediate: true,
          force: true,
        })

        // Chạy Lenis lại
        if (typeof lenis.start === 'function') {
          lenis.start()
        }
      }

      // Đồng bộ native browser scroll
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto',
      })
    }

    // Reset ngay
    resetScroll()

    // Reset lại sau 1 frame
    const frame1 = requestAnimationFrame(() => {
      resetScroll()
    })

    // Reset thêm một lần để tránh AnimatePresence/
    // browser đưa vị trí cũ trở lại
    const frame2 = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        resetScroll()
      })
    })

    return () => {
      cancelAnimationFrame(frame1)
      cancelAnimationFrame(frame2)
    }
  }, [location.pathname])

  const routes = (
    <Routes location={location}>
      <Route path="/" element={<Home />} />

      <Route path="/sections" element={<Sections />} />
      <Route path="/event" element={<EventPage />} />
      <Route path="/context" element={<ContextPage />} />
      <Route path="/chaebol" element={<ChaebolPage />} />
      <Route path="/government" element={<GovernmentPage />} />
      <Route path="/debate" element={<DebatePage />} />
      <Route path="/myth" element={<MythPage />} />
      <Route path="/tradeoff" element={<TradeOffPage />} />
      <Route path="/conclusion" element={<ConclusionPage />} />
      <Route path="/sources" element={<SourcesPage />} />
      <Route path="/qna" element={<QnA />} />
      <Route path="/flipbook" element={<FlipbookPage />} />
      <Route path="/game/play" element={<GamePlayPage />} />
      <Route path="/game" element={<GamePage />} />
    </Routes>
  )

  return (
    <>
      {!isStandaloneGame && <ScrollProgress />}

      {!isStandaloneGame && <Header />}

      {isStandaloneGame ? (
        <div className="page-shell">{routes}</div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            className="page-shell"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {routes}
          </motion.main>
        </AnimatePresence>
      )}
    </>
  )
}

export default function App() {
  return <Shell />
}
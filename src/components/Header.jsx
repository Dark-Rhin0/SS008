import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import {
  Menu,
  X,
  BookOpen,
  Gamepad2,
} from 'lucide-react'

import { FLIPBOOK_URL, GAME_URL } from '../config'

export default function Header() {
  const [open, setOpen] = useState(false)

  const { pathname } = useLocation()

  const isHome = pathname === '/'


  /*
   * =========================================================
   * LOGO CLICK
   * =========================================================
   *
   * Nếu đang ở trang khác:
   * → chỉ chuyển về Home như bình thường.
   *
   * Nếu đang ở Home:
   * → cuộn nhanh về đầu trang
   * → đồng thời kích hoạt hiệu ứng Hero.
   */

  const handleLogoClick = () => {

    setOpen(false)


    /*
     * Không làm gì thêm nếu đang ở trang khác.
     */

    if (!isHome) {
      return
    }


    /*
     * Lấy Lenis nếu website đang sử dụng Lenis.
     */

    const lenis = window.__lenis


    if (lenis) {

      /*
       * Lenis scroll về đầu trang.
       */

      lenis.scrollTo(
        0,
        {
          duration: 0.65,
          immediate: false,
          force: true,
        }
      )

    } else {

      /*
       * Fallback nếu không có Lenis.
       */

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })

    }

  }


  return (
    <header className="site-header">

      <div className="nav-wrap">


        {/* =================================================
            LOGO
            ================================================= */}

        <Link
          to="/"
          className="brand"
          replace={isHome}
          onClick={handleLogoClick}
          state={
            isHome
              ? {
                  replayHero: Date.now(),
                }
              : undefined
          }
        >

          CHAEBOL<span>/</span>

          <small>
            KOREA 2022
          </small>

        </Link>


        {/* =================================================
            NAVIGATION
            ================================================= */}

        <nav className={open ? 'nav-open' : ''}>

          <Link
            className={
              isHome
                ? 'active'
                : ''
            }
            to="/"
          >
            Tổng quan
          </Link>


          <Link
            className={
              pathname === '/event'
                ? 'active'
                : ''
            }
            to="/event"
          >
            Sự kiện
          </Link>


          <Link
            className={
              pathname === '/context'
                ? 'active'
                : ''
            }
            to="/context"
          >
            Bối cảnh
          </Link>


          <Link
            className={
              pathname === '/debate'
                ? 'active'
                : ''
            }
            to="/debate"
          >
            Tranh luận
          </Link>


          <Link
            className={
              pathname === '/sources'
                ? 'active'
                : ''
            }
            to="/sources"
          >
            Nguồn
          </Link>


          <a
            href={FLIPBOOK_URL}
            target="_blank"
            rel="noreferrer"
          >

            <BookOpen size={15} />

            Flipbook

          </a>


          <a
            href={GAME_URL}
            target="_blank"
            rel="noreferrer"
          >

            <Gamepad2 size={15} />

            Game

          </a>

        </nav>


        {/* =================================================
            MOBILE MENU
            ================================================= */}

        <button
          className="menu-button"
          onClick={() => setOpen(v => !v)}
          aria-label="menu"
        >

          {open
            ? <X />
            : <Menu />
          }

        </button>

      </div>

    </header>
  )
}
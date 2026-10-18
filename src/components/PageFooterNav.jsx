import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react'

export default function PageFooterNav({
  nextPath = 'none',
  nextLabel = 'Trang tiếp theo',
}) {
  const handleBackToTop = () => {
    const lenis = window.__lenis

    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.1,
        immediate: false,
      })
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  const hasNextPage =
    nextPath &&
    nextPath !== 'none'

  return (
    <section className="page-footer-nav">
      <div className="container page-footer-nav-inner">

        {/* VỀ TRANG TỔNG QUAN */}
        <Link
          to="/"
          className="page-footer-back"
        >
          <ArrowLeft size={17} />
          <span>Về trang tổng quan</span>
        </Link>

        {/* VỀ ĐẦU TRANG */}
        <button
          type="button"
          className="page-footer-top"
          onClick={handleBackToTop}
          aria-label="Về đầu trang"
        >
          <ArrowUp size={17} />
          <span>Về đầu trang</span>
        </button>

        {/* TRANG TIẾP THEO */}
        {hasNextPage ? (
          <Link
            to={nextPath}
            className="page-footer-next"
          >
            <span>{nextLabel}</span>
            <ArrowRight size={18} />
          </Link>
        ) : (
          <div className="page-footer-next-placeholder" />
        )}

      </div>
    </section>
  )
}
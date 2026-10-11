import React from 'react';
import { Link } from 'react-router-dom'; // Hoặc thư viện router bạn đang dùng
import { ArrowUpRight } from 'lucide-react'; // Đảm bảo bạn đã cài đặt thư viện icon này
import Reveal from './Reveal'; // Điều chỉnh đường dẫn đến component Reveal của bạn nếu cần
import '../page-styles/home.css';

export default function RouteCard({ 
  gameUrl = "#", 
  flipbookUrl = "#" 
}) {
  return (
    <section className="section final-experience">
      <div className="container">
        <Reveal delay={0.3}>
          <div className="final-mini-nav">
            <a
              href={gameUrl}
              target="_blank"
              rel="noreferrer"
              className="final-mini-link"
            >
              Game
              <ArrowUpRight size={15} />
            </a>

            <a
              href={flipbookUrl}
              target="_blank"
              rel="noreferrer"
              className="final-mini-link"
            >
              Flipbook
              <ArrowUpRight size={15} />
            </a>

            <Link to="/sources" className="final-mini-link">
              Nguồn
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </Reveal>

        <div className="final-feature">
          <div className="final-feature-image">
            <div className="final-image-overlay" />

            <div className="final-image-label">
              SS008
              <span>·</span>
              2022
            </div>
          </div>

          <div className="final-feature-content">
            <span className="eyebrow final-eyebrow">Đa góc nhìn</span>

            <h2 className="final-title">
              Một quyết định.
              <br />
              <span>Nhiều cách để nhìn.</span>
            </h2>

            <p className="final-description">
              Bạn đã thấy vì sao Chính phủ Hàn Quốc lựa chọn đặc xá cho Lee
              Jae-yong và các lãnh đạo Chaebol. Nhưng để hiểu đầy đủ quyết
              định ấy, hãy nhìn nó từ cả dữ kiện lẫn góc nhìn của người ra
              quyết định.
            </p>

            <div className="final-options">
              <Link to="/qna" className="final-option">
                <div className="final-option-number"></div>

                <div className="final-option-content">
                  <span className="final-option-label">ĐỐNG GÓP</span>

                  <h3>
                    Câu hỏi của bạn
                    <ArrowUpRight size={19} />
                  </h3>

                  <p>
                    Gửi cho mình câu hỏi phản biện của bạn để mình có thể trả
                    lời ngay.
                  </p>
                </div>
              </Link>

              <Link to="/sections" className="final-option final-option-game">
                <div className="final-option-number"></div>

                <div className="final-option-content">
                  <span className="final-option-label">MỤC LỤC</span>

                  <h3>
                    Xem hết 8 chương
                    <ArrowUpRight size={19} />
                  </h3>

                  <p>
                    Cùng khám phá hết 8 chương để có cái nhìn tổng quát nhất về sự kiện này.
                  </p>
                </div>
              </Link>
            </div>

            <div className="final-closing">
              <span className="final-closing-line" />
              <span>
                KINH TẾ
                <b>{' × '}</b>
                PHÁP QUYỀN
              </span>
              <span className="final-closing-line" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
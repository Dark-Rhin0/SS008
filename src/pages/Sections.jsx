import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Clock, ArrowUpRight, BookOpen } from 'lucide-react';
import PageIntro from '../components/PageIntro';
import '../page-styles/sections.css';
import PageFooterNav from "../components/PageFooterNav";
import { FLIPBOOK_URL, GAME_URL } from '../config';
import Reveal from '../components/Reveal';

// 1. DỮ LIỆU 8 CHƯƠNG ĐÃ TÍCH HỢP CATEGORY BỘ LỌC
export const sections = [
  { 
    id: 'event', 
    number: '01', 
    category: 'in4', 
    title: 'Điều gì đã xảy ra?', 
    subtitle: 'Đặc xá tháng 8/2022 và Lee Jae-yong', 
    path: '/event',
    readTime: '3-5 phút'
  },
  { 
    id: 'context', 
    number: '02', 
    category: 'in4', 
    title: 'Tại sao lại là lúc đó?', 
    subtitle: 'Bối cảnh kinh tế Hàn Quốc năm 2022', 
    path: '/context',
    readTime: '3-5 phút'
  },
  { 
    id: 'chaebol', 
    number: '03', 
    category: 'in4', 
    title: 'Tại sao Samsung lại quan trọng?', 
    subtitle: 'Chaebol, bán dẫn và quyền lực kinh tế', 
    path: '/chaebol',
    readTime: '2-3 phút'
  },
  { 
    id: 'government', 
    number: '04', 
    category: 'gov', 
    title: 'Chính phủ nói gì?', 
    subtitle: 'Quyết định chính thức và lí do', 
    path: '/government',
    readTime: '2-4 phút'
  },
  { 
    id: 'debate', 
    number: '05', 
    category: 'pview', 
    title: 'Tại sao gây tranh cãi?', 
    subtitle: 'Quyết định có tiền lệ ↔ Vụ bê bối chấn động', 
    path: '/debate',
    readTime: '4-6 phút'
  },
  { 
    id: 'myth', 
    number: '06', 
    category: 'pview', 
    title: 'Điều gì dễ bị hiểu sai?', 
    subtitle: 'Myth vs Fact', 
    path: '/myth',
    readTime: '4-5 phút'
  },
  { 
    id: 'tradeoff', 
    number: '07', 
    category: 'gov', 
    title: 'Chính phủ đang đánh đổi điều gì?', 
    subtitle: 'Bài toán cân bằng', 
    path: '/tradeoff',
    readTime: '2-3 phút'
  },
  { 
    id: 'conclusion', 
    number: '08', 
    category: 'gov', 
    title: 'Quyết định liệu có đúng đắn?', 
    subtitle: '5 yếu tố để trả lời câu hỏi lớn', 
    path: '/conclusion',
    readTime: '6-8 phút'
  },
];

// 2. DANH MỤC LỌC
const CATEGORIES = [
  { id: 'all', label: 'Tất cả' },
  { id: 'in4', label: 'Thông tin sự kiện' },
  { id: 'gov', label: 'Phía chính phủ' },
  { id: 'pview', label: 'các góc nhìn' }
];

export default function Sections() {
  const [activeTab, setActiveTab] = useState('all');

  // Logic lọc dữ liệu
  const filteredSections = activeTab === 'all'
    ? sections
    : sections.filter(item => item.category === activeTab);

  return (
    <div className="sections-page">
      {/* PAGEINTRO HERO SECTION */}
      <PageIntro
        title={<>Bài toán đánh đổi: <span className="highlight">8 Góc nhìn</span></>}
        subtitle="Khám phá toàn bộ 8 chương phân tích chi tiết về bối cảnh kinh tế, vị thế các Chaebol, và cuộc tranh luận pháp quyền xung quanh quyết định đặc xá năm 2022."
        backText="Tổng quan"
        backLink="/"
        number="MỤC LỤC TOÀN CẢNH"
        metaLabel="HÀN QUỐC / 2022"
        bottomText="SS008 · KOREA · 2022"
      >
        {/* BAR BỘ LỌC CHỦ ĐỀ */}
        <div className="sections-filter-bar">
          <span className="filter-label">
            <Filter size={15} /> LỌC THEO CHỦ ĐỀ:
          </span>
          <div className="filter-tabs">
            {CATEGORIES.map(cat => {
              const count = cat.id === 'all' 
                ? sections.length 
                : sections.filter(item => item.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  className={`tab-btn ${activeTab === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(cat.id)}
                >
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </PageIntro>

      {/* DANH SÁCH 8 THẺ BÀI VIẾT */}
      <div className="sections-body container">
        <div className="sections-grid">
          {filteredSections.map(item => (
            <Reveal delay={0.3}>
            <Link key={item.id} to={item.path} className="full-story-card">
              <div className="card-watermark">{item.number}</div>

              <div className="card-header">
                <span className="chapter-badge">CHƯƠNG {item.number}</span>
                <span className="read-time">
                  <Clock size={13} /> {item.readTime}
                </span>
              </div>

              <div className="card-content">
                <h3 className="card-heading">{item.title}</h3>
                <p className="card-desc">{item.subtitle}</p>
              </div>

              <div className="card-footer">
                <span className="read-more-text">Đọc chương này</span>
                <div className="arrow-icon-wrap">
                  <ArrowUpRight size={16} />
                </div>
              </div>

              <div className="card-accent-border" />
            </Link></Reveal>
          ))}
        </div>

        {/* CTA CHÂN TRANG */}
        <div className="sections-cta-box">
          <div className="cta-content">
            <h3>Bắt đầu theo tiến trình lịch sử?</h3>
            <p>Đọc tuần tự từ Chương 01 đến Chương 08 để có góc nhìn toàn diện nhất.</p>
          </div>
          <Link to="/event" className="btn-start-reading">
            <BookOpen size={16} /> Bắt đầu đọc Chương 01
          </Link>
        </div>
      </div>

      <section className="section final-experience">
        <div className="container">
          <Reveal delay={0.3}>
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
                    <span className="final-option-label">ĐÓNG GÓP</span>

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

                <a href={GAME_URL} className="final-option final-option-game">
                  <div className="final-option-number"></div>

                  <div className="final-option-content">
                    <span className="final-option-label">TƯƠNG TÁC</span>

                    <h3>
                      Thử đưa ra quyết định
                      <ArrowUpRight size={19} />
                    </h3>

                    <p>
                      Nếu bạn là người ra quyết định, bạn sẽ cân bằng tăng
                      trưởng kinh tế và pháp quyền như thế nào?
                    </p>
                  </div>
                </a>
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

      <PageFooterNav nextPath="none" nextLabel="Đến trang kế" />
    </div>
  );
}
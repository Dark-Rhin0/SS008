import React from 'react';
import { Link } from 'react-router-dom';

function EcoBackdrop({ type = 'line' }) {
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
          <polyline
            className="eco-line"
            points="0,480 120,430 240,455 360,380 480,400 600,300 720,330 840,220 960,250 1080,150 1200,170"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeOpacity=".25"
          />
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
  number = '01 / SỰ KIỆN',
  title = (
    <>
      Lee Jae-yong<br />
      và quyết định<br />
      <span className="underline-dac">đặc</span> xá năm 2022
    </>
  ),
  subtitle = 'Bối cảnh, diễn biến và những tranh luận xoay quanh quyết định khoan hồng dành cho lãnh đạo Samsung.',
  children,
  backText = 'Tổng quan',
  backLink = '/',
  metaLabel = 'NHÓM 6 / SS008',
  bottomText = 'SS008 · HÀN QUỐC · 2022',
  backdropType = 'line',
}) {
  return (
    <section className="detail-hero" style={{ position: 'relative' }}>
      <EcoBackdrop type={backdropType} />
      
      <div aria-hidden="true" className="hero-decorations">
        <div className="detail-hero-grid" />
        <div className="glow" />
        <div className="ink-blob" />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="detail-hero-inner">
          <div className="detail-hero-nav">
            <Link to={backLink} className="detail-hero-back back-link">
              ← {backText}
            </Link>
          </div>

          <div className="detail-hero-content">
            <div className="detail-hero-meta">
              {number && <span className="detail-hero-number hero-number">{number}</span>}
              <span className="detail-hero-meta-line"></span>
              {metaLabel && <span className="detail-hero-meta-label meta-label">{metaLabel}</span>}
            </div>

            <h1 className="detail-hero-title">{title}</h1>
            {subtitle && <p className="detail-hero-subtitle hero-subtitle">{subtitle}</p>}
            {children}
          </div>

          {bottomText && (
            <div className="detail-hero-footer-tag detail-hero-footer">
              <span>{bottomText}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
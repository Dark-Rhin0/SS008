
import { useState } from 'react';

export default function Stage1CaseFile({
  onStartCase,
  onNext,
  initialStep = 1,
}) {
  const [step, setStep] = useState(initialStep);

  const handleStartClick = () => {
    setStep(2);

    if (onStartCase) {
      onStartCase();
    }
  };

  return (
    <section className="sid-dossier">
      <div className="sid-dossier__record">
        <span className="sid-dossier__record-dot" />
        HỒ SƠ ĐIỀU TRA ĐẶC BIỆT
      </div>

      <span className="sid-dossier__number">
        TÀI LIỆU NO. 0815
      </span>

      {step === 1 ? (
        <div className="sid-dossier__layout">
          <div className="sid-dossier__content">

            <h2 className="sid-dossier__title">
              Một quyết định.
              <span>Nhiều góc nhìn.</span>
            </h2>

            <p className="sid-dossier__description">
              Quyết định đặc xá tháng 8/2022 đặt ra những câu hỏi
              về lợi ích kinh tế, trách nhiệm pháp lý và lợi ích công.
              Vai trò của bạn là phân tích hồ sơ trước khi đưa ra
              đánh giá độc lập.
            </p>

            <div className="sid-dossier__steps">
              <div className="sid-dossier__step">
                <span className="sid-dossier__step-number">01</span>
                <div>
                  <strong>Thu thập</strong>
                  <span>Chứng cứ</span>
                </div>
              </div>

              <div className="sid-dossier__step">
                <span className="sid-dossier__step-number">02</span>
                <div>
                  <strong>Phân tích</strong>
                  <span>Hai chiều</span>
                </div>
              </div>

              <div className="sid-dossier__step">
                <span className="sid-dossier__step-number">03</span>
                <div>
                  <strong>Kết luận</strong>
                  <span>Báo cáo</span>
                </div>
              </div>
            </div>
          </div>

          
<div className="sid-dossier__visual">
  <span
    className="sid-dossier__cross sid-dossier__cross--top"
    aria-hidden="true"
  >
    +
  </span>

  <div className="sid-dossier__orbit">
    <div className="sid-dossier__orbit-inner" />

    <button
      type="button"
      className="sid-dossier__file"
      onClick={handleStartClick}
      aria-label="Mở hồ sơ 0815 và bắt đầu điều tra"
    >
      <span>PLAY</span>
      <strong>0815</strong>
      <i />
      <small>SEOUL · 2022</small>
      <span className="sid-dossier__file-hint">
        OPEN FILE ↗
      </span>
    </button>
  </div>

  <span
    className="sid-dossier__cross sid-dossier__cross--bottom"
    aria-hidden="true"
  >
    +
  </span>

  <div className="sid-dossier__coordinates">
    <span>37°33′ N</span>
    <span>126°58′ E</span>
  </div>
</div>

        </div>
      ) : (
        <div className="sid-dossier__profile">
          <div className="sid-dossier__eyebrow">
            <span />
            SUBJECT PROFILE / 0815-A
          </div>

          <h2 className="sid-dossier__title">
            Hồ sơ đối tượng.
            <span>Lee Jae-yong.</span>
          </h2>

          <div className="sid-dossier__profile-grid">
            <div>
              <span>ĐỐI TƯỢNG</span>
              <strong>LEE JAE-YONG</strong>
            </div>

            <div>
              <span>CHỨC VỤ</span>
              <strong>Phó Chủ tịch Samsung Electronics</strong>
            </div>

            <div>
              <span>TIỀN ÁN</span>
              <strong>Vụ án hối lộ liên quan đến bê bối chính trị</strong>
            </div>

            <div>
              <span>BẢN ÁN</span>
              <strong>2 năm 6 tháng tù</strong>
            </div>

            <div>
              <span>TÌNH TRẠNG NĂM 2021</span>
              <strong>Được tạm tha vào tháng 8/2021</strong>
            </div>

            <div>
              <span>QUYẾT ĐỊNH NĂM 2022</span>
              <strong>
                Được đặc xá, khôi phục quyền kinh doanh theo quyết định
                của chính phủ Hàn Quốc
              </strong>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

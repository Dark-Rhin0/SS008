// Vị trí: src/game/Stage1CaseFile.jsx
import { useState } from 'react';

export default function Stage1CaseFile({ onStartCase, onNext, initialStep = 1 }) {
  const [step, setStep] = useState(initialStep);

  const handleStartClick = () => {
    setStep(2);
    if (onStartCase) {
      onStartCase();
    }
  };

  return (
    <div className="case-folder" data-lenis-prevent>
      <div className="stamp-secret">CONFIDENTIAL // SEOUL AUGUST 2022</div>
      
      {step === 1 ? (
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '8px', color: '#f8fafc' }}>
            CASE #0815: THE PARDON
          </h2>
          <p style={{ color: '#94a3b8', marginBottom: '24px' }}>
            Ngày 15/8/2022, Hàn Quốc chuẩn bị công bố danh sách đặc xá. Một doanh nhân từng bị kết án hối lộ sắp nhận được lệnh ân xá từ Tổng thống.
          </p>
          <div style={{ background: '#1e293b', padding: '16px', borderRadius: '6px', marginBottom: '20px' }}>
            <strong>NHIỆM VỤ CỦA BẠN:</strong>
            <p style={{ margin: '8px 0 0 0', color: '#38bdf8' }}>
              Vào vai phóng viên điều tra, hãy tìm hiểu TẠI SAO.
            </p>
          </div>
          <button className="game-btn" onClick={handleStartClick}>
            [ START CASE ]
          </button>
        </div>
      ) : (
        <div>
          <h3 style={{ color: '#f59e0b', margin: '0 0 12px 0' }}>HỒ SƠ ĐỐI TƯỢNG (SUBJECT PROFILE)</h3>
          <div className="profile-card">
            <h2 style={{ margin: '0 0 8px 0', color: '#fff' }}>LEE JAE-YONG</h2>
            <p style={{ margin: '6px 0', color: '#cbd5e1' }}><strong>Chức vụ:</strong> Phó Chủ tịch Samsung Electronics ("Thái tử" Samsung)</p>
            <p style={{ margin: '6px 0', color: '#cbd5e1' }}><strong>Tiền án:</strong> Kết án liên quan đến đại án hối lộ</p>
            <p style={{ margin: '6px 0', color: '#cbd5e1' }}><strong>Bản án:</strong> 2 năm 6 tháng tù giam</p>
            <p style={{ margin: '6px 0', color: '#cbd5e1' }}><strong>Ngày ra tù:</strong> Tháng 8/2021, được tạm tha với các hạn chế về kinh doanh trong vòng 5 năm</p>
            <p style={{ margin: '6px 0', color: '#38bdf8' }}><strong>Ân xá tháng 8/2022:</strong> Được Tổng thống đặc xá khôi phục quyền kinh doanh.</p>
          </div>
          <button className="game-btn" onClick={onNext}>
            [ OPEN INVESTIGATION ]
          </button>
        </div>
      )}
    </div>
  );
}
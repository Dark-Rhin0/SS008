import { useNavigate } from 'react-router-dom'
import PageIntro from '../components/PageIntro'
import Reveal from '../components/Reveal'
import Stage1CaseFile from '../game/Stage1CaseFile'
import '../page-styles/detail.css'
import '../game/Game.css'

export default function GamePage() {
  const navigate = useNavigate()

  return (
    <>
      <PageIntro
        number="INTERACTIVE CASE #0815"
        title="Hồ sơ Đặc xá — Phóng viên Điều tra."
        subtitle="Tháng 8/2022, 'Thái tử' Samsung Lee Jae-yong xuất hiện trong danh sách đặc xá. Hãy thu thập bằng chứng, phân tích hai mặt của vấn đề và hoàn thành báo cáo của bạn."
      />

    
        <div className="container">
          <Reveal>
            <div className="game-container">
              
              <Stage1CaseFile
                onStartCase={() => navigate('/game/play')}
              />
            </div>
          </Reveal>
        </div>
    
    </>
  )
}

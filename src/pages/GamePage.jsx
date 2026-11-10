import { Link, useNavigate } from 'react-router-dom'
import PageIntro from '../components/PageIntro'
import Reveal from '../components/Reveal'
import Stage1CaseFile from '../game/Stage1CaseFile'
import '../page-styles/detail.css'
import '../game/Game.css'
import '../page-styles/godot-game.css'

export default function GamePage() {
  const navigate = useNavigate()

  return (
    <>
      <PageIntro
        number="hồ sơ số #0815"
        title="Hồ sơ Đặc xá — Phóng viên Điều tra."
        subtitle="Tháng 8/2022, 'Thái tử' Samsung Lee Jae-yong xuất hiện trong danh sách đặc xá. Hãy thu thập bằng chứng, phân tích hai mặt của vấn đề và hoàn thành báo cáo của bạn."
      />


        <div className="container">
          <section className="godot-hub-card" aria-labelledby="lenh-xoa-heading">
            <div><span className="godot-kicker">ĐIỀU TRA · HÀNH ĐỘNG 3D</span><h2 id="lenh-xoa-heading">LỆNH XÓA</h2><p>Khám phá khu liên hợp Haneul, lần theo hồ sơ và phản đòn trong giao tranh. Tìm hiểu sức mạnh của tập đoàn và những lời hứa phục hồi kinh tế.</p></div>
            <Link to="/game/lenh-xoa">Chơi Lệnh Xóa <span aria-hidden="true">→</span></Link>
          </section>
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

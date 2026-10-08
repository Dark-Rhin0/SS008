import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, FileCheck2, GitBranch, KeyRound, ScrollText, Search } from 'lucide-react'
import Stage1CaseFile from '../game/Stage1CaseFile'
import Stage2Board from '../game/Stage2Board'
import Stage3Connect from '../game/Stage3Connect'
import Stage4Report from '../game/Stage4Report'
import {
  getInvestigationLeaderboard,
  isLeaderboardConfigured,
  saveInvestigationScore,
} from '../game/leaderboard'
import '../game/Game.css'

export default function GamePlayPage() {
  const [currentStage, setCurrentStage] = useState(1)
  const [playerName, setPlayerName] = useState('')
  const [nameDraft, setNameDraft] = useState('')
  const [nameError, setNameError] = useState('')
  const [startedAt, setStartedAt] = useState(null)
  const [durationMs, setDurationMs] = useState(null)
  const [scoreStatus, setScoreStatus] = useState('idle')
  const [scoreError, setScoreError] = useState('')
  const [leaderboard, setLeaderboard] = useState([])
  const [leaderboardStatus, setLeaderboardStatus] = useState('idle')
  const [leaderboardError, setLeaderboardError] = useState('')
  const [savedScoreId, setSavedScoreId] = useState(null)
  const stageItems = [
    { label: 'Hồ sơ vụ án', detail: 'Thông tin đối tượng', icon: ScrollText },
    { label: 'Bảng điều tra', detail: 'Thu thập bằng chứng', icon: Search },
    { label: 'Nối dữ kiện', detail: 'Phân tích hai mặt', icon: GitBranch },
    { label: 'Báo cáo', detail: 'Kết luận hồ sơ', icon: FileCheck2 },
  ]

  const handlePlayerEntry = (event) => {
    event.preventDefault()
    const trimmedName = nameDraft.trim().replace(/\s+/g, ' ')
    if (trimmedName.length < 2 || trimmedName.length > 24) {
      setNameError('Tên cần có từ 2 đến 24 ký tự.')
      return
    }

    setPlayerName(trimmedName)
    setNameDraft(trimmedName)
    setNameError('')
    setStartedAt(Date.now())
    setDurationMs(null)
    setCurrentStage(1)
  }

  const loadLeaderboard = async () => {
    setLeaderboardStatus(isLeaderboardConfigured ? 'loading' : 'unconfigured')
    setLeaderboardError('')
    if (!isLeaderboardConfigured) return

    try {
      const scores = await getInvestigationLeaderboard()
      setLeaderboard(scores)
      setLeaderboardStatus('loaded')
    } catch (error) {
      setLeaderboardError(error.message)
      setLeaderboardStatus('error')
    }
  }

  const handleInvestigationComplete = async () => {
    const completedDuration = durationMs ?? (
      startedAt === null ? null : Math.max(1000, Date.now() - startedAt)
    )

    if (!playerName || completedDuration === null) {
      setScoreStatus('error')
      setScoreError('Không tìm thấy tên người chơi hoặc thời điểm bắt đầu. Hãy chơi lại để ghi nhận thời gian.')
      return
    }

    setDurationMs(completedDuration)
    setScoreError('')
    if (savedScoreId) {
      setScoreStatus('saved')
      await loadLeaderboard()
      return
    }

    setScoreStatus(isLeaderboardConfigured ? 'saving' : 'unconfigured')
    if (isLeaderboardConfigured) {
      try {
        const savedScore = await saveInvestigationScore({
          playerName,
          durationMs: completedDuration,
        })
        setSavedScoreId(savedScore.id)
        setScoreStatus('saved')
      } catch (error) {
        setScoreError(error.message)
        setScoreStatus('error')
      }
    }

    await loadLeaderboard()
  }

  const restartInvestigation = () => {
    setCurrentStage(1)
    setPlayerName('')
    setNameDraft('')
    setNameError('')
    setStartedAt(null)
    setDurationMs(null)
    setScoreStatus('idle')
    setScoreError('')
    setLeaderboard([])
    setLeaderboardStatus('idle')
    setLeaderboardError('')
    setSavedScoreId(null)
  }

  return (
    <main className="game-standalone-page" data-lenis-prevent>
      <aside className="case-sidebar">
        <Link className="case-sidebar-brand" to="/game">
          <span className="case-code">0815</span>
          <span className="case-title">
            <small>HỒ SƠ ĐIỀU TRA</small>
            <strong>Ân xá đặc biệt</strong>
          </span>
        </Link>

        <div className="investigator-card">
          <span className="investigator-icon"><Search size={17} /></span>
          <span><small>PHÓNG VIÊN ĐIỀU TRA</small><strong>{playerName || 'Chưa nhận hồ sơ'}</strong></span>
        </div>

        <nav className="case-stage-menu" aria-label="Các phần hồ sơ">
          {stageItems.map(({ label, detail, icon: Icon }, index) => {
            const stage = index + 1
            const isActive = currentStage === stage
            const isComplete = currentStage > stage

            return (
              <div
                key={label}
                className={`case-stage-item ${isActive ? 'active' : ''} ${isComplete ? 'complete' : ''}`}
                aria-current={isActive ? 'step' : undefined}
              >
                <span className="case-stage-icon">
                  {isComplete ? <KeyRound size={19} /> : <Icon size={19} />}
                </span>
                <span className="case-stage-copy">
                  <small>MÀN {stage}{isComplete ? ' · HOÀN TẤT' : ''}</small>
                  <strong>{label}</strong>
                  <em>{detail}</em>
                </span>
                {isActive && <span className="case-stage-pin" aria-hidden="true" />}
              </div>
            )
          })}
        </nav>

        <Link className="case-sidebar-back" to="/game">
          <ArrowLeft size={15} /> Thoát hồ sơ
        </Link>
      </aside>

      <div className="game-workspace">
        <header className="game-statusbar">
          <div className="status-case">
            <span className="status-case-icon"><KeyRound size={25} /></span>
            <span><small>HỒ SƠ SỐ</small><strong>0815 <i>/ SEOUL 2022</i></strong></span>
          </div>
          <div className="status-progress">
            <span><small>TIẾN ĐỘ ĐIỀU TRA</small><strong>{currentStage}<i>/4</i></strong></span>
            <div className="status-keys" aria-label={`${currentStage} trên 4 màn hoàn thành`}>
              {stageItems.map((item, index) => (
                <KeyRound
                  key={item.label}
                  size={19}
                  className={index < currentStage ? 'earned' : ''}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </header>

        <section className="game-sheet" aria-label="Nội dung hồ sơ">
          <div className="sheet-toolbar">
            <span className="sheet-progress-label">Tiến độ hồ sơ {currentStage}/4</span>
            <div className="sheet-progress-track" aria-hidden="true">
              <div
                className="sheet-progress-fill"
                style={{ width: `${(currentStage / 4) * 100}%` }}
              />
            </div>
            <span className="sheet-case-mark"><KeyRound size={13} /> CASE 0815</span>
          </div>

          <section key={currentStage} className="stage-scroll-area" data-lenis-prevent>
            {!playerName && (
              <form className="player-entry-form" onSubmit={handlePlayerEntry}>
                <div className="stamp-secret">CONFIDENTIAL // PLAYER REGISTRATION</div>
                <p className="player-entry-kicker">HỒ SƠ 0815 · SEOUL 2022</p>
                <h1>Trước khi mở hồ sơ</h1>
                <p className="player-entry-copy">
                  Nhập tên phóng viên để lưu kết quả và ghi danh lên bảng xếp hạng điều tra.
                  Đồng hồ sẽ bắt đầu khi bạn vào hồ sơ. Dùng cùng tên ở lần chơi sau để cập nhật kết quả trước đó.
                </p>
                <label htmlFor="investigator-name">TÊN PHÓNG VIÊN</label>
                <input
                  id="investigator-name"
                  name="investigatorName"
                  type="text"
                  autoComplete="nickname"
                  maxLength={24}
                  value={nameDraft}
                  onChange={(event) => {
                    setNameDraft(event.target.value)
                    if (nameError) setNameError('')
                  }}
                  placeholder="tên + MSSV"
                  aria-describedby={nameError ? 'investigator-name-error' : undefined}
                  aria-invalid={Boolean(nameError)}
                  autoFocus
                />
                {nameError && <p className="player-entry-error" id="investigator-name-error" role="alert">{nameError}</p>}
                <button className="game-btn" type="submit">NHẬN HỒ SƠ & BẮT ĐẦU →</button>
              </form>
            )}
            {playerName && currentStage === 1 && (
              <Stage1CaseFile
                initialStep={1}
                onNext={() => setCurrentStage(2)}
              />
            )}
            {currentStage === 2 && <Stage2Board onNext={() => setCurrentStage(3)} />}
            {currentStage === 3 && <Stage3Connect onNext={() => setCurrentStage(4)} />}
            {currentStage === 4 && (
              <Stage4Report
                playerName={playerName}
                durationMs={durationMs}
                scoreStatus={scoreStatus}
                scoreError={scoreError}
                leaderboard={leaderboard}
                leaderboardStatus={leaderboardStatus}
                leaderboardError={leaderboardError}
                savedScoreId={savedScoreId}
                onComplete={handleInvestigationComplete}
                onRetrySave={handleInvestigationComplete}
                onRefreshLeaderboard={loadLeaderboard}
                onRestart={restartInvestigation}
              />
            )}
          </section>
        </section>
      </div>
    </main>
  )
}

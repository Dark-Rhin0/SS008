// Vị trí: src/game/Stage2Board.jsx
import { useState } from 'react';
import { EVIDENCES, QUESTIONS } from './gameData';

export default function Stage2Board({ onNext }) {
  const [selectedEv, setSelectedEv] = useState(null);
  const [activeDropQuestion, setActiveDropQuestion] = useState(null);
  const [answers, setAnswers] = useState({ q1: [], q2: [], q3: [] });
  const [feedback, setFeedback] = useState(
    'Kéo thẻ bằng chứng vào câu hỏi phù hợp, hoặc chạm một thẻ rồi chạm câu hỏi.'
  );

  const handleAssign = (evidence, question) => {
    if (evidence.isRedHerring) {
      setFeedback(`❌ BẰNG CHỨNG GÂY NHIỄU: "${evidence.title}" là sự thật, nhưng không giải thích trực tiếp lý do đặc xá!`);
      setSelectedEv(null);
      return;
    }

    const currentList = answers[question.id];
    if (currentList.some(item => item.id === evidence.id)) {
      setFeedback('⚠️ Bằng chứng này đã có trong câu hỏi này rồi.');
      return;
    }

    if (question.requiredTags.includes(evidence.title)) {
      const updated = [...currentList, evidence];
      setAnswers({ ...answers, [question.id]: updated });
      setFeedback(`✅ CHÍNH XÁC! Đã ghép [${evidence.title}] vào ${question.number}.`);
      setSelectedEv(null);
    } else {
      setFeedback(`🤔 Thẻ [${evidence.title}] trả lời cho một khía cạnh khác, chưa khớp với ${question.number}.`);
    }
  };

  const handleDrop = (event, question) => {
    event.preventDefault();
    setActiveDropQuestion(null);

    const evidenceId = event.dataTransfer.getData('text/plain');
    const evidence = EVIDENCES.find(item => item.id === evidenceId);
    if (evidence) {
      handleAssign(evidence, question);
    }
  };

  const handleTouchFallback = (question) => {
    if (selectedEv) {
      handleAssign(selectedEv, question);
    }
  };

  const isAllSolved = QUESTIONS.every(q => answers[q.id].length === 3);

  return (
    <div className="stage2-wrapper" data-lenis-prevent>
      {/* Thanh trạng thái thông báo luôn nằm cố định ở trên cùng của màn 2 */}
      <div className="feedback-bar">
        <strong>TRẠNG THÁI: </strong> <span>{feedback}</span>
      </div>

      <div className="board-layout">
        {/* CỘT TRÁI: KHO BẰNG CHỨNG (Có thanh cuộn độc lập) */}
        <div className="board-column" data-lenis-prevent>
          <h3 className="column-title">1. KHO BẰNG CHỨNG (Cuộn để xem)</h3>
          <div className="evidence-grid" data-lenis-prevent>
            {EVIDENCES.map((ev) => (
              <div
                key={ev.id}
                className={`evidence-card ${selectedEv?.id === ev.id ? 'selected' : ''}`}
                draggable
                role="button"
                tabIndex={0}
                aria-label={`Bằng chứng ${ev.title}. Kéo vào câu hỏi phù hợp.`}
                onClick={() => setSelectedEv(ev)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setSelectedEv(ev);
                  }
                }}
                onDragStart={(event) => {
                  event.dataTransfer.setData('text/plain', ev.id);
                  event.dataTransfer.effectAllowed = 'move';
                  setSelectedEv(ev);
                }}
                onDragEnd={() => setActiveDropQuestion(null)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="ev-tag">[{ev.tag}]</span>
                  <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{ev.code}</span>
                </div>
                <h4 style={{ margin: '4px 0', color: '#f8fafc', fontSize: '0.95rem' }}>{ev.title}</h4>
                <p style={{ fontSize: '0.8rem', color: '#cbd5e1', margin: 0, lineHeight: 1.4 }}>{ev.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CỘT PHẢI: 3 CÂU HỎI ĐIỀU TRA (Có thanh cuộn độc lập) */}
        <div className="board-column" data-lenis-prevent>
          <h3 className="column-title">2. CÂU HỎI ĐIỀU TRA (3 CẦN TÌM)</h3>
          <div className="questions-scroll" data-lenis-prevent>
            {QUESTIONS.map((q) => {
              const currentEvs = answers[q.id];
              const isSolved = currentEvs.length === 3;

              return (
                <div
                  key={q.id}
                  className={`question-box ${isSolved ? 'solved' : ''} ${activeDropQuestion === q.id ? 'drop-target' : ''}`}
                  onDragOver={(event) => {
                    event.preventDefault();
                    event.dataTransfer.dropEffect = 'move';
                    setActiveDropQuestion(q.id);
                  }}
                  onDragLeave={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      setActiveDropQuestion(null);
                    }
                  }}
                  onDrop={(event) => handleDrop(event, q)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', color: isSolved ? '#22c55e' : '#f59e0b' }}>
                      {q.number} {isSolved && '— ĐÃ RÕ!'}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      {currentEvs.length}/3
                    </span>
                  </div>
                  
                  <p style={{ margin: '6px 0', fontWeight: 600, fontSize: '0.9rem' }}>{q.question}</p>

                  <div className="slot-container">
                    {currentEvs.map((item) => (
                      <div key={item.id} className="slot-item">
                        ✓ {item.title}
                      </div>
                    ))}
                  </div>

                  {!isSolved && (
                    <div
                      className="question-drop-zone"
                      role="button"
                      tabIndex={0}
                      aria-label={`Ô thả bằng chứng cho ${q.number}`}
                      onClick={() => handleTouchFallback(q)}
                      onKeyDown={(event) => {
                        if ((event.key === 'Enter' || event.key === ' ') && selectedEv) {
                          event.preventDefault();
                          handleTouchFallback(q);
                        }
                      }}
                    >
                      {selectedEv
                        ? `Thả hoặc chạm để gắn "${selectedEv.title}" vào đây`
                        : 'Kéo thẻ bằng chứng vào đây'}
                    </div>
                  )}
                </div>
              );
            })}

            {isAllSolved && (
              <button className="game-btn" style={{ width: '100%', backgroundColor: '#16a34a', marginTop: '8px' }} onClick={onNext}>
                ĐÃ TÌM ĐỦ MỐI LIÊN HỆ — SANG MÀN 3 →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
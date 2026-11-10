
import { useState } from 'react';
import { EVIDENCES, QUESTIONS } from './gameData';

export default function Stage2Board({ onNext }) {
  const [selectedEv, setSelectedEv] = useState(null);
  const [activeDropQuestion, setActiveDropQuestion] = useState(null);
  const [answers, setAnswers] = useState({
    q1: [],
    q2: [],
    q3: []
  });

  const [feedback, setFeedback] = useState(
    'Kéo thẻ bằng chứng vào câu hỏi phù hợp, hoặc chạm một thẻ rồi chạm câu hỏi.'
  );

  // Kiểm tra bằng chứng đã được sử dụng hay chưa
  const isEvidenceUsed = (evidenceId) => {
    return Object.values(answers).some(list =>
      list.some(item => item.id === evidenceId)
    );
  };

  // Xử lý ghép bằng chứng vào câu hỏi
  const handleAssign = (evidence, question) => {
    // Không cho phép sử dụng lại bằng chứng đã ghép đúng
    if (isEvidenceUsed(evidence.id)) {
      setSelectedEv(null);
      return;
    }

    if (evidence.isRedHerring) {
      setFeedback(
        `❌ BẰNG CHỨNG GÂY NHIỄU: "${evidence.title}" là sự thật, nhưng không giải thích trực tiếp lý do đặc xá!`
      );
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

      setAnswers(prev => ({
        ...prev,
        [question.id]: updated
      }));

      setFeedback(
        `✅ CHÍNH XÁC! Đã ghép [${evidence.title}] vào ${question.number}.`
      );

      setSelectedEv(null);
    } else {
      setFeedback(
        `🤔 Thẻ [${evidence.title}] trả lời cho một khía cạnh khác, chưa khớp với ${question.number}.`
      );
    }
  };

  // Xử lý kéo thả bằng chuột
  const handleDrop = (event, question) => {
    event.preventDefault();
    setActiveDropQuestion(null);

    const evidenceId = event.dataTransfer.getData('text/plain');
    const evidence = EVIDENCES.find(item => item.id === evidenceId);

    if (evidence) {
      handleAssign(evidence, question);
    }
  };

  // Hỗ trợ thao tác trên màn hình cảm ứng
  const handleTouchFallback = (question) => {
    if (selectedEv) {
      handleAssign(selectedEv, question);
    }
  };

  // Kiểm tra toàn bộ câu hỏi đã hoàn thành
  const isAllSolved = QUESTIONS.every(
    q => answers[q.id].length === 3
  );

  return (
    <div className="stage2-wrapper" data-lenis-prevent>

      {/* THANH TRẠNG THÁI */}
      <div className="feedback-bar">
        <strong>TRẠNG THÁI: </strong>
        <span>{feedback}</span>
      </div>

      <div className="board-layout">

        {/* CỘT TRÁI: KHO BẰNG CHỨNG */}
        <div className="board-column" data-lenis-prevent>
          <h3 className="column-title">
            1. KHO BẰNG CHỨNG (Cuộn để xem)
          </h3>

          <div className="evidence-grid" data-lenis-prevent>
            {EVIDENCES.map((ev) => {
              const isUsed = isEvidenceUsed(ev.id);

              return (
                <div
                  key={ev.id}
                  className={`evidence-card ${
                    selectedEv?.id === ev.id ? 'selected' : ''
                  } ${isUsed ? 'used' : ''}`}

                  draggable={!isUsed}
                  role="button"
                  tabIndex={isUsed ? -1 : 0}
                  aria-disabled={isUsed}

                  aria-label={`Bằng chứng ${ev.title}${
                    isUsed
                      ? '. Đã sử dụng'
                      : '. Kéo vào câu hỏi phù hợp.'
                  }`}

                  onClick={() => {
                    if (!isUsed) {
                      setSelectedEv(ev);
                    }
                  }}

                  onKeyDown={(event) => {
                    if (
                      !isUsed &&
                      (event.key === 'Enter' || event.key === ' ')
                    ) {
                      event.preventDefault();
                      setSelectedEv(ev);
                    }
                  }}

                  onDragStart={(event) => {
                    if (isUsed) {
                      event.preventDefault();
                      return;
                    }

                    event.dataTransfer.setData('text/plain', ev.id);
                    event.dataTransfer.effectAllowed = 'move';
                    setSelectedEv(ev);
                  }}

                  onDragEnd={() => {
                    setActiveDropQuestion(null);
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span className="ev-tag">
                      [{ev.tag}]
                    </span>

                    <span
                      style={{
                        fontSize: '0.7rem',
                        color: '#64748b'
                      }}
                    >
                      {ev.code}
                    </span>
                  </div>

                  <h4
                    style={{
                      margin: '4px 0',
                      color: '#f8fafc',
                      fontSize: '0.95rem'
                    }}
                  >
                    {ev.title}
                  </h4>

                  <p
                    style={{
                      fontSize: '0.8rem',
                      color: '#cbd5e1',
                      margin: 0,
                      lineHeight: 1.4
                    }}
                  >
                    {ev.desc}
                  </p>

                  {/* NHÃN ĐÃ SỬ DỤNG */}
                  {isUsed && (
                    <div className="ev-used-label">
                      ✓ ĐÃ SỬ DỤNG
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CỘT PHẢI: CÂU HỎI ĐIỀU TRA */}
        <div className="board-column" data-lenis-prevent>
          <h3 className="column-title">
            2. CÂU HỎI ĐIỀU TRA (3 CẦN TÌM)
          </h3>

          <div className="questions-scroll" data-lenis-prevent>
            {QUESTIONS.map((q) => {
              const currentEvs = answers[q.id];
              const isSolved = currentEvs.length === 3;

              return (
                <div
                  key={q.id}
                  className={`question-box ${
                    isSolved ? 'solved' : ''
                  } ${
                    activeDropQuestion === q.id ? 'drop-target' : ''
                  }`}

                  onDragOver={(event) => {
                    event.preventDefault();
                    event.dataTransfer.dropEffect = 'move';
                    setActiveDropQuestion(q.id);
                  }}

                  onDragLeave={(event) => {
                    if (
                      !event.currentTarget.contains(event.relatedTarget)
                    ) {
                      setActiveDropQuestion(null);
                    }
                  }}

                  onDrop={(event) => handleDrop(event, q)}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        color: isSolved ? '#22c55e' : '#f59e0b'
                      }}
                    >
                      {q.number} {isSolved && '— ĐÃ RÕ!'}
                    </span>

                    <span
                      style={{
                        fontSize: '0.8rem',
                        color: '#94a3b8'
                      }}
                    >
                      {currentEvs.length}/3
                    </span>
                  </div>

                  <p
                    style={{
                      margin: '6px 0',
                      fontWeight: 600,
                      fontSize: '0.9rem'
                    }}
                  >
                    {q.question}
                  </p>

                  {/* CÁC BẰNG CHỨNG ĐÃ GHÉP */}
                  <div className="slot-container">
                    {currentEvs.map((item) => (
                      <div
                        key={item.id}
                        className="slot-item"
                      >
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
                        if (
                          (event.key === 'Enter' ||
                            event.key === ' ') &&
                          selectedEv
                        ) {
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

            {/* NÚT CHUYỂN MÀN */}
            {isAllSolved && (
              <button
                className="game-btn"
                style={{
                  width: '100%',
                  backgroundColor: '#16a34a',
                  marginTop: '8px'
                }}
                onClick={onNext}
              >
                ĐÃ TÌM ĐỦ MỐI LIÊN HỆ — SANG MÀN 3 →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { 
  Send, Lock, MessageSquare, CheckCircle2, 
  HelpCircle, ChevronDown, ChevronUp, KeyRound, X, Trash2, Edit3, MessageCirclePlus, Filter 
} from 'lucide-react';
import PageIntro from '../components/PageIntro';
import '../page-styles/qna.css';
import PageFooterNav from "../components/PageFooterNav";

// 1. Import kết nối Database và các hàm thao tác từ Firestore
import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';

const ADMIN_PASSWORD = '@dmin@@@';

const GROUPS = [
  'Nhóm 01', 'Nhóm 02', 'Nhóm 03', 'Nhóm 04', 'Nhóm 05',
  'Nhóm 06', 'Nhóm 07', 'Nhóm 08', 'Nhóm 09', 'Nhóm 10',
  'Khách'
];

export default function QnA() {
  const [selectedGroup, setSelectedGroup] = useState(GROUPS[0]);
  const [questionText, setQuestionText] = useState('');
  const [filterGroup, setFilterGroup] = useState('ALL');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState({});

  // 2. Đồng bộ dữ liệu Thời gian thực (Real-time Listener) từ Firestore
  useEffect(() => {
    const q = query(collection(db, 'questions'), orderBy('timestamp', 'desc'));

    // Lắng nghe biến động dữ liệu từ đám mây
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedQuestions = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
      setQuestions(fetchedQuestions);
      setLoading(false);
    }, (error) => {
      console.error("Lỗi khi kết nối Firestore:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Modal State
  const [authModal, setAuthModal] = useState({
    isOpen: false,
    questionId: null,
    actionType: 'answer',
    error: ''
  });
  const [passwordInput, setPasswordInput] = useState('');

  const [editorModal, setEditorModal] = useState({
    isOpen: false,
    questionId: null,
    answerText: ''
  });

  // 3. Gửi câu hỏi mới lên Firestore
  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    try {
      await addDoc(collection(db, 'questions'), {
        group: selectedGroup,
        question: questionText.trim(),
        answer: '',
        createdAt: new Date().toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' }),
        answeredAt: null,
        timestamp: serverTimestamp() // Dùng làm mốc thời gian để sắp xếp câu hỏi mới nhất lên đầu
      });

      setQuestionText('');
    } catch (err) {
      alert("Không thể gửi câu hỏi. Vui lòng kiểm tra lại kết nối mạng!");
      console.error(err);
    }
  };

  const handleOpenAuthModal = (qId, actionType) => {
    setAuthModal({
      isOpen: true,
      questionId: qId,
      actionType,
      error: ''
    });
    setPasswordInput('');
  };

  // 4. Xác thực Mật khẩu & Xóa dữ liệu trên Firestore
  const handleVerifyPassword = async (e) => {
    e.preventDefault();
    if (passwordInput !== ADMIN_PASSWORD) {
      setAuthModal(prev => ({ ...prev, error: 'Mật khẩu không chính xác! Vui lòng thử lại.' }));
      return;
    }

    const qId = authModal.questionId;
    const action = authModal.actionType;

    setAuthModal({ isOpen: false, questionId: null, actionType: 'answer', error: '' });
    setPasswordInput('');

    if (action === 'delete') {
      try {
        // Xóa document khỏi Firestore
        await deleteDoc(doc(db, 'questions', qId));
      } catch (err) {
        alert("Xóa thất bại!");
        console.error(err);
      }
    } else if (action === 'answer') {
      const currentQ = questions.find(q => q.id === qId);
      setEditorModal({
        isOpen: true,
        questionId: qId,
        answerText: currentQ?.answer || ''
      });
    }
  };

  // 5. Cập nhật Câu trả lời lên Firestore
  const handleSaveAnswer = async (e) => {
    e.preventDefault();
    if (!editorModal.answerText.trim()) return;

    try {
      const qRef = doc(db, 'questions', editorModal.questionId);
      await updateDoc(qRef, {
        answer: editorModal.answerText.trim(),
        answeredAt: new Date().toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' })
      });

      setEditorModal({ isOpen: false, questionId: null, answerText: '' });
    } catch (err) {
      alert("Lưu câu trả lời thất bại!");
      console.error(err);
    }
  };

  const toggleExpand = (id) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredQuestions = filterGroup === 'ALL' 
    ? questions 
    : questions.filter(q => q.group === filterGroup);

  return (
    <div className="qna-page">
      <PageIntro
        title={<>Hỏi đáp & <span className="highlight">Phản biện</span></>}
        subtitle="Gửi các câu hỏi phản biện theo nhóm thảo luận. Câu trả lời chính thức sẽ được phản hồi và lưu trữ tại đây."
        backText="Mục lục toàn cảnh"
        backLink="/sections"
        number="GÓC PHẢN BIỆN"
        metaLabel="HÀN QUỐC / 2022"
        bottomText="DIỄN ĐÀN TRUYỀN THÔNG SS008"
      />

      <div className="qna-container">
        {/* FORM GỬI CÂU HỎI */}
        <section className="qna-card qna-form-card">
          <div className="form-card-header">
            <MessageSquare className="icon-header" size={22} />
            <h2>Gửi câu hỏi phản biện mới</h2>
          </div>

          <form onSubmit={handleSubmitQuestion} className="qna-form">
            <div className="form-grid">
              <div className="form-group flex-1">
                <label htmlFor="group-select">Chọn nhóm của bạn:</label>
                <select
                  id="group-select"
                  className="qna-select"
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                >
                  {GROUPS.map((groupName) => (
                    <option key={groupName} value={groupName}>
                      {groupName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="question-input">Nội dung câu hỏi phản biện:</label>
              <textarea
                id="question-input"
                className="qna-textarea"
                rows={5}
                placeholder="Nhập chi tiết câu hỏi phản biện của nhóm bạn tại đây (hỗ trợ văn bản dài)..."
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                required
              />
            </div>

            <div className="form-action">
              <button type="submit" className="qna-btn-primary">
                <Send size={16} /> Gửi câu hỏi phản biện
              </button>
            </div>
          </form>
        </section>

        {/* DANH SÁCH CÂU HỎI */}
        <section className="qna-list-section">
          <div className="qna-list-header">
            <h3>Danh sách câu hỏi ({filteredQuestions.length}/{questions.length})</h3>
          </div>

          {/* BỘ LỌC THEO NHÓM */}
          <div className="qna-filter-wrapper">
            <div className="filter-label">
              <Filter size={16} />
              <span>Phân loại nhóm:</span>
            </div>
            <div className="filter-tabs">
              <button
                type="button"
                className={`filter-tab ${filterGroup === 'ALL' ? 'active' : ''}`}
                onClick={() => setFilterGroup('ALL')}
              >
                Tất cả ({questions.length})
              </button>
              {GROUPS.map((groupName) => {
                const count = questions.filter((q) => q.group === groupName).length;
                return (
                  <button
                    key={groupName}
                    type="button"
                    className={`filter-tab ${filterGroup === groupName ? 'active' : ''}`}
                    onClick={() => setFilterGroup(groupName)}
                  >
                    {groupName}
                    {count > 0 && <span className="tab-count">{count}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {loading ? (
            <div className="qna-empty-state">
              <p>Đang tải dữ liệu câu hỏi từ máy chủ...</p>
            </div>
          ) : filteredQuestions.length === 0 ? (
            <div className="qna-empty-state">
              <HelpCircle size={40} />
              <p>
                {filterGroup === 'ALL'
                  ? 'Chưa có câu hỏi nào trên hệ thống. Hãy gửi câu hỏi đầu tiên!'
                  : `Chưa có câu hỏi nào từ ${filterGroup}.`}
              </p>
            </div>
          ) : (
            <div className="qna-list">
              {filteredQuestions.map((q) => {
                const isExpanded = !!expandedIds[q.id];
                const isLongQuestion = q.question && q.question.length > 280;

                return (
                  <article key={q.id} className="qna-card qna-item-card">
                    <div className="item-meta-bar">
                      <div className="badge-group">{q.group}</div>
                      <span className="item-time">Đăng lúc: {q.createdAt}</span>
                      
                      {q.answer ? (
                        <span className="status-tag status-answered">
                          <CheckCircle2 size={13} /> Đã trả lời
                        </span>
                      ) : (
                        <span className="status-tag status-pending">
                          Chờ phản hồi
                        </span>
                      )}

                      <div className="item-actions">
                        <button
                          type="button"
                          className="btn-action-q btn-answer-q"
                          onClick={() => handleOpenAuthModal(q.id, 'answer')}
                          title={q.answer ? 'Chỉnh sửa câu trả lời' : 'Viết câu trả lời'}
                        >
                          {q.answer ? <Edit3 size={14} /> : <MessageCirclePlus size={14} />}
                          <span>{q.answer ? 'Chỉnh sửa' : 'Trả lời'}</span>
                        </button>

                        <button
                          type="button"
                          className="btn-action-q btn-delete-q"
                          onClick={() => handleOpenAuthModal(q.id, 'delete')}
                          title="Xóa câu hỏi này"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="item-question-box">
                      <div className="box-title">Câu hỏi phản biện:</div>
                      <p className={`text-content ${!isExpanded && isLongQuestion ? 'text-truncated' : ''}`}>
                        {q.question}
                      </p>
                      {isLongQuestion && (
                        <button 
                          type="button" 
                          className="btn-toggle-expand"
                          onClick={() => toggleExpand(q.id)}
                        >
                          {isExpanded ? (
                            <><ChevronUp size={14} /> Thu gọn câu hỏi</>
                          ) : (
                            <><ChevronDown size={14} /> Xem toàn bộ câu hỏi dài</>
                          )}
                        </button>
                      )}
                    </div>

                    {q.answer && (
                      <div className="item-answer-box">
                        <div className="answer-header">
                          <span className="author-tag">Phản hồi chính thức:</span>
                          {q.answeredAt && <span className="answer-time">{q.answeredAt}</span>}
                        </div>
                        <p className="text-content answer-text">{q.answer}</p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* MODAL MẬT KHẨU */}
      {authModal.isOpen && (
        <div className="qna-modal-overlay">
          <div className="qna-modal-content">
            <button 
              type="button" 
              className="modal-close-btn"
              onClick={() => setAuthModal({ isOpen: false, questionId: null, actionType: 'answer', error: '' })}
            >
              <X size={18} />
            </button>

            <div className="modal-header">
              <div className={`modal-icon-wrap ${authModal.actionType === 'delete' ? 'icon-wrap-delete' : ''}`}>
                {authModal.actionType === 'delete' ? <Trash2 size={24} /> : <KeyRound size={24} />}
              </div>
              <h3>{authModal.actionType === 'delete' ? 'Xác nhận xóa câu hỏi' : 'Xác thực mật khẩu'}</h3>
              <p>
                {authModal.actionType === 'delete' 
                  ? 'Nhập mật khẩu quản trị để xác nhận XÓA vĩnh viễn câu hỏi này.' 
                  : 'Nhập mật khẩu quản trị để mở giao diện viết / chỉnh sửa câu trả lời.'}
              </p>
            </div>

            <form onSubmit={handleVerifyPassword} className="modal-form">
              <input
                type="password"
                className="qna-input"
                placeholder="Nhập mật khẩu..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                autoFocus
                required
              />

              {authModal.error && <div className="modal-error-msg">{authModal.error}</div>}

              <div className="modal-actions">
                <button
                  type="button"
                  className="qna-btn-secondary"
                  onClick={() => setAuthModal({ isOpen: false, questionId: null, actionType: 'answer', error: '' })}
                >
                  Hủy bỏ
                </button>
                <button 
                  type="submit" 
                  className={`qna-btn-primary ${authModal.actionType === 'delete' ? 'btn-modal-danger' : ''}`}
                >
                  {authModal.actionType === 'delete' ? 'Xác nhận Xóa' : 'Xác nhận'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL SOẠN THẢO CÂU TRẢ LỜI */}
      {editorModal.isOpen && (
        <div className="qna-modal-overlay">
          <div className="qna-modal-content modal-editor-content">
            <button 
              type="button" 
              className="modal-close-btn"
              onClick={() => setEditorModal({ isOpen: false, questionId: null, answerText: '' })}
            >
              <X size={18} />
            </button>

            <div className="modal-header">
              <div className="modal-icon-wrap">
                <Edit3 size={24} />
              </div>
              <h3>Soạn thảo câu trả lời</h3>
              <p>Nhập nội dung phản hồi chính thức của tác giả cho câu hỏi này.</p>
            </div>

            <form onSubmit={handleSaveAnswer} className="modal-form">
              <div className="form-group">
                <label>Nội dung câu trả lời:</label>
                <textarea
                  className="qna-textarea editor-modal-textarea"
                  rows={8}
                  placeholder="Nhập câu trả lời chi tiết tại đây..."
                  value={editorModal.answerText}
                  onChange={(e) => setEditorModal({ ...editorModal, answerText: e.target.value })}
                  autoFocus
                  required
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="qna-btn-secondary"
                  onClick={() => setEditorModal({ isOpen: false, questionId: null, answerText: '' })}
                >
                  Hủy bỏ
                </button>
                <button type="submit" className="qna-btn-primary">
                  Lưu phản hồi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <PageFooterNav nextPath="none" nextLabel="Đến trang kế" />
    </div>
  );
}
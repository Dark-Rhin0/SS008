import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Scale,
  ShieldAlert,
  TrendingUp,
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";

import PageIntro from "../components/PageIntro";
import PageFooterNav from "../components/PageFooterNav";
import Reveal from "../components/Reveal";
import "../page-styles/detail.css";

const argumentsData = {
  support: {
    label: "LẬP LUẬN ỦNG HỘ",
    title: "Ưu tiên động lực kinh tế",
    description:
      "Đặc xá được nhìn nhận như một cơ hội để khôi phục năng lực lãnh đạo và thúc đẩy các quyết định đầu tư dài hạn.",
    points: [
      {
        text: "Giúp giao kinh tế và thu hút vốn đầu tư nước ngoài",
        audio: "/audio/ung-ho/lap-luan-01.mp3",
      },
      {
        text: "Thúc đẩy đầu tư, phục hồi sản xuất và tăng trưởng",
        audio: "/audio/ung-ho/lap-luan-02.mp3",
      },
      {
        text: "Cần lãnh đạo đầy đủ quyền hạn cho quyết định dài hạn",
        audio: "/audio/ung-ho/lap-luan-03.mp3",
      },
      {
        text: "Bán dẫn là ngành công nghiệp chiến lược",
        audio: "/audio/ung-ho/lap-luan-04.mp3",
      },
      {
        text: "Việc làm và xuất khẩu có thể hưởng lợi",
        audio: "/audio/ung-ho/lap-luan-05.mp3",
      },
    ],
  },

  against: {
    label: "LẬP LUẬN PHẢN ĐỐI",
    title: "Không ai đứng trên pháp luật",
    description:
      "Lợi ích kinh tế không tự động xóa bỏ những câu hỏi về công lý, trách nhiệm và niềm tin của công chúng.",
    points: [
      {
        text: "Bình đẳng trước pháp luật và niềm tin của công chúng",
        audio: "/audio/phan-doi/lap-luan-01.mp3",
      },
      {
        text: "Đặc quyền của các tập đoàn Chaebol",
        audio: "/audio/phan-doi/lap-luan-02.mp3",
      },
      {
        text: "Mối quan hệ cộng sinh không lành mạnh",
        audio: "/audio/phan-doi/lap-luan-03.mp3",
      },
      {
        text: "Sự thất vọng về lời hứa công bằng và gánh nặng kinh tế lên người dân nhỏ lẻ",
        audio: "/audio/phan-doi/lap-luan-04.mp3",
      },
      {
        text: "Chưa có bằng chứng chắc chắn về tăng trưởng do đặc xá",
        audio: "/audio/phan-doi/lap-luan-05.mp3",
      },
    ],
  },
};

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

export default function DebatePage() {
  const [side, setSide] = useState("support");
  const [activeIndex, setActiveIndex] = useState(0);

  const [currentKey, setCurrentKey] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [errorKey, setErrorKey] = useState(null);

  // Âm lượng mặc định 100%
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const previousVolumeRef = useRef(1);

  // Lưu đối tượng Audio đang phát
  const audioRef = useRef(null);

  const current = argumentsData[side];
  const activeKey = `${side}-${activeIndex}`;

  // Dừng và giải phóng bài âm thanh hiện tại
  const stopAudio = () => {
    const audio = audioRef.current;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;

      audio.onloadedmetadata = null;
      audio.ontimeupdate = null;
      audio.onended = null;
      audio.onerror = null;

      audioRef.current = null;
    }

    setCurrentKey(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  };

  const changeSide = (nextSide) => {
    if (nextSide === side) return;

    stopAudio();
    setErrorKey(null);
    setActiveIndex(0);
    setSide(nextSide);
  };

  const goToPoint = (nextIndex) => {
    const total = current.points.length;

    if (nextIndex < 0 || nextIndex >= total) return;

    stopAudio();
    setErrorKey(null);
    setActiveIndex(nextIndex);
  };

  // Phát, tạm dừng hoặc tiếp tục âm thanh
  const toggleAudio = async (key, src) => {
    setErrorKey(null);

    const existingAudio = audioRef.current;

    // Nếu đúng bài đang mở thì tạm dừng hoặc tiếp tục
    if (currentKey === key && existingAudio) {
      if (!existingAudio.paused) {
        existingAudio.pause();
        setIsPlaying(false);
        return;
      }

      try {
        await existingAudio.play();

        if (audioRef.current === existingAudio) {
          setIsPlaying(true);
        }
      } catch {
        if (audioRef.current === existingAudio) {
          setIsPlaying(false);
          setErrorKey(key);
        }
      }

      return;
    }

    // Dừng bài trước khi phát bài mới
    if (existingAudio) {
      existingAudio.pause();
      existingAudio.currentTime = 0;

      existingAudio.onloadedmetadata = null;
      existingAudio.ontimeupdate = null;
      existingAudio.onended = null;
      existingAudio.onerror = null;

      audioRef.current = null;
    }

    setCurrentKey(key);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);

    const audio = new Audio(src);

    // Áp dụng âm lượng người dùng đã chọn
    audio.volume = volume;
    audio.muted = isMuted || volume === 0;

    audio.preload = "metadata";
    audioRef.current = audio;

    audio.onloadedmetadata = () => {
      if (audioRef.current === audio) {
        setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
      }
    };

    audio.ontimeupdate = () => {
      if (audioRef.current === audio) {
        setCurrentTime(audio.currentTime);
      }
    };

    audio.onended = () => {
      if (audioRef.current === audio) {
        audioRef.current = null;
        setCurrentKey(null);
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
      }
    };

    audio.onerror = () => {
      if (audioRef.current === audio) {
        audioRef.current = null;
        setCurrentKey(null);
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
        setErrorKey(key);
      }
    };

    try {
      await audio.play();

      if (audioRef.current === audio) {
        setIsPlaying(true);
      }
    } catch {
      if (audioRef.current === audio) {
        audioRef.current = null;
        setCurrentKey(null);
        setIsPlaying(false);
        setErrorKey(key);
      }
    }
  };

  // Tua âm thanh
  const seekAudio = (key, value) => {
    const audio = audioRef.current;

    if (!audio || currentKey !== key) return;

    const nextTime = Number(value);

    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  // Thay đổi âm lượng ngay lập tức
  const changeVolume = (value) => {
    const nextVolume = Number(value);

    setVolume(nextVolume);
    setIsMuted(nextVolume === 0);

    if (nextVolume > 0) {
      previousVolumeRef.current = nextVolume;
    }

    if (audioRef.current) {
      audioRef.current.volume = nextVolume;
      audioRef.current.muted = nextVolume === 0;
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;

    if (isMuted || volume === 0) {
      const restoredVolume = previousVolumeRef.current || 1;

      setVolume(restoredVolume);
      setIsMuted(false);

      if (audio) {
        audio.volume = restoredVolume;
        audio.muted = false;
      }
    } else {
      previousVolumeRef.current = volume;

      setIsMuted(true);

      if (audio) {
        audio.muted = true;
      }
    }
  };

  // Dừng âm thanh khi rời khỏi trang
  useEffect(() => {
    return () => {
      const audio = audioRef.current;

      if (audio) {
        audio.pause();
        audio.onloadedmetadata = null;
        audio.ontimeupdate = null;
        audio.onended = null;
        audio.onerror = null;
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <PageIntro
        number="05 / Tranh cãi"
        title="Tại sao quyết định này gây tranh cãi?"
        subtitle="Tranh luận nằm ở xung đột giữa phục hồi kinh tế và pháp quyền."
      />

      <section className="section debate-section">
        <div className="container">
          <Reveal>
            <div className="debate-heading">
              <span className="eyebrow">HAI PHÍA CỦA TRANH LUẬN</span>

              <h2 className="h2">Cùng một quyết định, hai góc nhìn</h2>

              <p className="copy">
                Chọn một quan điểm, khám phá từng lập luận và nghe phần giải
                thích chi tiết.
              </p>
            </div>

            <div
              className="debate-toggle"
              role="group"
              aria-label="Chọn góc nhìn tranh luận"
            >
              <button
                type="button"
                className={side === "support" ? "active" : ""}
                aria-pressed={side === "support"}
                onClick={() => changeSide("support")}
              >
                <TrendingUp size={18} />
                Lập luận ủng hộ
              </button>

              <button
                type="button"
                className={side === "against" ? "active" : ""}
                aria-pressed={side === "against"}
                onClick={() => changeSide("against")}
              >
                <ShieldAlert size={18} />
                Lập luận phản đối
              </button>
            </div>
          </Reveal>

          <div className={`debate-visual ${side}`}>
            <div className="debate-visual-overlay" />

            <div className="debate-visual-content">
              <div className="debate-visual-top">
                <span className="debate-visual-label">{current.label}</span>

                <span className="debate-visual-index">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(current.points.length).padStart(2, "0")}
                </span>
              </div>

              <div className="debate-visual-intro">
                <span className="debate-visual-line" />

                <h2>{current.title}</h2>

                <p>{current.description}</p>
              </div>

              <div
                className="debate-carousel"
                style={{
                  "--active-index": activeIndex,
                }}
              >
                <div className="debate-carousel-track">
                  {current.points.map((point, index) => {
                    const pointKey = `${side}-${index}`;
                    const isActive = index === activeIndex;
                    const isThisAudio = currentKey === pointKey;
                    const isThisPlaying = isThisAudio && isPlaying;
                    const hasError = errorKey === pointKey;

                    const pointProgress =
                      isThisAudio && duration > 0
                        ? Math.min((currentTime / duration) * 100, 100)
                        : 0;

                    return (
                      <motion.article
                        key={pointKey}
                        className={`debate-card debate-featured-card ${side} ${
                          isActive ? "is-active" : ""
                        } ${isThisPlaying ? "is-playing" : ""}`}
                        initial={false}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="debate-featured-top">
                          <span className="debate-card-number">
                            LẬP LUẬN {String(index + 1).padStart(2, "0")}
                          </span>

                          <span className="debate-featured-count">
                            {index + 1} / {current.points.length}
                          </span>
                        </div>

                        <h3 className="debate-card-title">{point.text}</h3>

                        <div className="debate-audio-player">
                          <div className="debate-audio-player-heading">
                            <div>
                              <strong>Giải thích lập luận</strong>
                              <span>Nghe phần phân tích chi tiết</span>
                            </div>
                          </div>

                          <button
                            type="button"
                            className="debate-audio-button"
                            onClick={() => {
                              setActiveIndex(index);
                              toggleAudio(pointKey, point.audio);
                            }}
                          >
                            {isThisPlaying ? (
                              <Pause size={20} fill="currentColor" />
                            ) : (
                              <Play size={20} fill="currentColor" />
                            )}

                            <span>
                              {hasError
                                ? "Thử phát lại"
                                : isThisPlaying
                                  ? "Tạm dừng"
                                  : isThisAudio
                                    ? "Tiếp tục nghe"
                                    : "Nghe ý kiến"}
                            </span>
                          </button>

                          {/* Thanh tua và điều chỉnh âm lượng */}
                          <div className="debate-audio-progress-row">
                            {" "}
                            <div className="debate-audio-progress-main">
                              {" "}
                              <input
                                type="range"
                                className="debate-audio-progress"
                                min="0"
                                max={isThisAudio ? duration || 0 : 0}
                                step="0.1"
                                value={
                                  isThisAudio
                                    ? Math.min(currentTime, duration || 0)
                                    : 0
                                }
                                style={{
                                  "--audio-progress": `${pointProgress}%`,
                                }}
                                onChange={(event) =>
                                  seekAudio(pointKey, event.target.value)
                                }
                                disabled={!isThisAudio || duration <= 0}
                                aria-label={`Tua âm thanh lập luận ${index + 1}`}
                              />{" "}
                              <div className="debate-audio-times">
                                {" "}
                                <span>
                                  {" "}
                                  {formatTime(
                                    isThisAudio ? currentTime : 0,
                                  )}{" "}
                                </span>{" "}
                                <span>
                                  {" "}
                                  {formatTime(isThisAudio ? duration : 0)}{" "}
                                </span>{" "}
                              </div>{" "}
                            </div>{" "}
                            <div className="debate-volume-control">
                              {" "}
                              <button
                                type="button"
                                className="debate-mute-button"
                                onClick={toggleMute}
                                aria-label={
                                  isMuted || volume === 0
                                    ? "Bật tiếng"
                                    : "Tắt tiếng"
                                }
                                title={
                                  isMuted || volume === 0
                                    ? "Bật tiếng"
                                    : "Tắt tiếng"
                                }
                              >
                                {" "}
                                {isMuted || volume === 0 ? (
                                  <VolumeX size={19} />
                                ) : (
                                  <Volume2 size={19} />
                                )}{" "}
                              </button>{" "}
                              <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                value={isMuted ? 0 : volume}
                                style={{
                                  "--volume-progress": `${(isMuted ? 0 : volume) * 100}%`,
                                }}
                                onChange={(event) =>
                                  changeVolume(event.target.value)
                                }
                                aria-label="Điều chỉnh âm lượng"
                                title={`Âm lượng ${Math.round((isMuted ? 0 : volume) * 100)}%`}
                              />{" "}
                            </div>{" "}
                          </div>

                          {hasError && (
                            <p className="debate-audio-error" role="status">
                              Không thể phát file âm thanh. Hãy kiểm tra đường
                              dẫn MP3.
                            </p>
                          )}
                        </div>

                        <span className="debate-card-mark" aria-hidden="true">
                          {side === "support" ? "+" : "—"}
                        </span>
                      </motion.article>
                    );
                  })}
                </div>
              </div>

              <div className="debate-desktop-navigation">
                <button
                  type="button"
                  className="debate-nav-button"
                  onClick={() => goToPoint(activeIndex - 1)}
                  disabled={activeIndex === 0}
                  aria-label="Xem lập luận trước"
                >
                  <ArrowLeft size={19} />
                </button>

                <div
                  className="debate-dots"
                  role="group"
                  aria-label="Chọn lập luận"
                >
                  {current.points.map((point, index) => (
                    <button
                      key={`${side}-dot-${index}`}
                      type="button"
                      className={`debate-dot ${
                        activeIndex === index ? "active" : ""
                      }`}
                      onClick={() => goToPoint(index)}
                      aria-label={`Xem lập luận ${index + 1}`}
                      aria-current={activeIndex === index ? "step" : undefined}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  className="debate-nav-button"
                  onClick={() => goToPoint(activeIndex + 1)}
                  disabled={activeIndex === current.points.length - 1}
                  aria-label="Xem lập luận tiếp theo"
                >
                  <ArrowRight size={19} />
                </button>
              </div>

              <div className="debate-visual-footer">
                <span>
                  {side === "support"
                    ? "ĐỘNG LỰC KINH TẾ"
                    : "THƯỢNG TÔN PHÁP LUẬT"}
                </span>

                <span className="debate-footer-counter">
                  Lập luận {activeIndex + 1}/{current.points.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container grid grid-2">
          <Reveal>
            <div className="card callout">
              <Scale size={28} color="var(--blue)" />

              <h3 className="h3" style={{ fontSize: 34, marginTop: 10 }}>
                Điểm xung đột
              </h3>

              <p className="copy">
                Tranh luận không nằm ở việc Samsung có quan trọng hay không, mà
                ở câu hỏi liệu lợi ích kinh tế có nên là lý do để dành sự khoan
                hồng đặc biệt cho người đã phạm tội.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="card callout">
              <span className="eyebrow">PHẢN ỨNG CÔNG CHÚNG</span>

              <strong className="big-number">77% Ủng hộ</strong>

              <p className="copy">
                Trong một khảo sát do hãng tin Reuters thực hiện cho biết khoảng 77% người được hỏi
                ủng hộ việc đặc xá cho Lee Jae-yong.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <PageFooterNav nextPath="/myth" nextLabel="Đến trang kế" />
    </>
  );
}

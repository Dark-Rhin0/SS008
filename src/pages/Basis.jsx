import { useEffect, useState } from 'react'
import Reveal from '../components/Reveal';
import PageFooterNav from "../components/PageFooterNav";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Building2,
  BarChart3,
  Factory,
  Landmark,
  Lightbulb,
  Network,
  Scale,
  TrendingUp,
  Wallet,
  Zap,
} from 'lucide-react'

import '../page-styles/basis.css'
import RouteCard from "../components/RouteCard";
import { FLIPBOOK_URL, GAME_URL } from "../config";

const causes = [
  {
    number: '01',
    icon: Factory,
    title: 'Sự phát triển của lực lượng sản xuất',
    image:
      'https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Dây chuyền sản xuất công nghiệp quy mô lớn',
    body: 'Cuối thế kỷ XIX, các thành tựu khoa học – kỹ thuật mới ra đời, tiêu biểu như lò luyện kim mới, động cơ điêzen, máy phát điện,... Để áp dụng những thành tựu này vào sản xuất, doanh nghiệp cần nguồn vốn lớn – điều mà đa số doanh nghiệp thời kỳ đó chưa đáp ứng được.',
    result:
      'Doanh nghiệp phải tích lũy tư bản, tích tụ và tập trung sản xuất, làm biến đổi cơ cấu kinh tế – xã hội theo hướng sản xuất quy mô lớn.',
  },
  {
    number: '02',
    icon: TrendingUp,
    title: 'Cạnh tranh',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Các tòa nhà văn phòng của những tập đoàn lớn',
    body: 'Cạnh tranh gay gắt khiến nhiều doanh nghiệp vừa và nhỏ phá sản; những doanh nghiệp lớn còn tồn tại cũng có thể bị suy yếu. Để tiếp tục phát triển, các doanh nghiệp tìm cách tích tụ và tập trung tư bản, hình thành những doanh nghiệp có quy mô lớn hơn.',
    quote:
      '“... tự do cạnh tranh đẻ ra tập trung sản xuất và sự tập trung sản xuất này, khi phát triển tới một mức độ nhất định, lại dẫn tới độc quyền.”',
    author: 'V.I. Lênin: Toàn tập, Sđd, t.27, tr.402',
  },
  {
    number: '03',
    icon: Landmark,
    title: 'Khủng hoảng và sự phát triển của hệ thống tín dụng',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Trung tâm tài chính và hệ thống ngân hàng',
    body: 'Khủng hoảng kinh tế năm 1873 làm nhiều doanh nghiệp vừa và nhỏ phá sản, trong khi các doanh nghiệp lớn còn tồn tại có điều kiện củng cố vị thế độc quyền.\n\nHệ thống tín dụng huy động và tập trung nguồn tiền nhàn rỗi trong xã hội, thúc đẩy tập trung sản xuất. Sự hình thành và phát triển của công ty cổ phần là một biểu hiện rõ nét, tạo tiền đề cho các tổ chức độc quyền ra đời.',
  },
]

const profitSources = [
  'Lao động của công nhân làm việc trong các xí nghiệp độc quyền.',
  'Lao động không công của công nhân làm việc trong các xí nghiệp ngoài độc quyền.',
  'Giá trị thặng dư của các nhà tư bản vừa và nhỏ bị mất đi do thua thiệt trong cạnh tranh.',
  'Lao động thặng dư và đôi khi cả một phần lao động tất yếu của người sản xuất nhỏ, nhân dân lao động ở các nước tư bản, thuộc địa và phụ thuộc.',
]

const positiveEffects = [
  {
    number: '01',
    icon: Lightbulb,
    title: 'Thúc đẩy tiến bộ khoa học – kỹ thuật',
    text: 'Quá trình tích tụ và tập trung nguồn lực, đặc biệt là tài chính, tạo điều kiện để các tổ chức độc quyền nghiên cứu và triển khai những hoạt động khoa học – kỹ thuật với quy mô lớn.',
  },
  {
    number: '02',
    icon: BarChart3,
    title: 'Tăng năng suất lao động và năng lực cạnh tranh',
    text: 'Ưu thế về vốn giúp tổ chức độc quyền ứng dụng thành tựu khoa học – công nghệ, hiện đại hóa sản xuất, tăng năng suất lao động và giảm chi phí sản xuất.',
  },
  {
    number: '03',
    icon: Building2,
    title: 'Thúc đẩy sản xuất lớn, hiện đại',
    text: 'Với lợi thế nguồn lực kinh tế tập trung, độc quyền có nhiều điều kiện đầu tư vào những lĩnh vực trọng tâm, mũi nhọn, góp phần thúc đẩy nền kinh tế theo hướng sản xuất quy mô lớn và hiện đại.',
  },
]

const sectionIds = ['concept', 'causes', 'profit', 'price', 'effects']

function SectionHeading({ index, eyebrow, title, description }) {
  return (
    <div className="basis-section-heading">
      <div className="basis-heading-top">
        <div className="basis-section-index">{index}</div>
        <span className="basis-eyebrow">{eyebrow}</span>
      </div>

      <h2>{title}</h2>

      {description && <p>{description}</p>}
    </div>
  )
}

export default function Basis() {
  const [activeSection, setActiveSection] = useState('concept')

  // Scroll Spy: tự động xác định phần nội dung đang được đọc
  useEffect(() => {
    document.title = 'Cơ sở lý luận | Cạnh tranh và Độc quyền'

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          )

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -65% 0px',
        threshold: 0,
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="basis-page">
      {/* HERO */}
      <section className="basis-hero">
        <div className="basis-hero-image" aria-hidden="true" />
        <div className="basis-hero-overlay" aria-hidden="true" />

        <div className="basis-container basis-hero-content">
          <div className="basis-kicker">
            <span />
            NỀN TẢNG LÝ LUẬN · KINH TẾ CHÍNH TRỊ
          </div>

          <p className="basis-chapter">
            CHƯƠNG 00 <span>—</span> THỊ TRƯỜNG VÀ QUYỀN LỰC KINH TẾ
          </p>

          <h1>
            Cạnh tranh
            <br />
            <em>và Độc quyền</em>
          </h1>

          <p className="basis-hero-lead">
            Cơ sở lý luận về sự hình thành, bản chất và những tác động
            của độc quyền trong nền kinh tế thị trường.
          </p>

          <br></br>

          <a className="basis-scroll-link" href="#concept">
            
          &nbsp; Khám phá nội dung <ArrowDown size={16} />
          </a>

          <div className="basis-hero-foot">
            <span>SS008 · ĐẰNG LỆNH SAU ÂN XÁ</span>
            <span>CƠ SỞ LÝ LUẬN</span>
          </div>
        </div>
      </section>

      {/* MAIN LAYOUT */}
      <div className="basis-container basis-layout">

        {/* TABLE OF CONTENTS */}
        <aside className="basis-toc">
          <span className="basis-toc-label">TRONG BÀI NÀY</span>

          <a
            href="#concept"
            className={activeSection === 'concept' ? 'active' : ''}
            aria-current={
              activeSection === 'concept' ? 'location' : undefined
            }
          >
            01 <span>Khái niệm độc quyền</span>
          </a>

          <a
            href="#causes"
            className={activeSection === 'causes' ? 'active' : ''}
            aria-current={
              activeSection === 'causes' ? 'location' : undefined
            }
          >
            02 <span>Nguồn gốc độc quyền</span>
          </a>

          <a
            href="#profit"
            className={activeSection === 'profit' ? 'active' : ''}
            aria-current={
              activeSection === 'profit' ? 'location' : undefined
            }
          >
            03 <span>Lợi nhuận độc quyền</span>
          </a>

          <a
            href="#price"
            className={activeSection === 'price' ? 'active' : ''}
            aria-current={
              activeSection === 'price' ? 'location' : undefined
            }
          >
            04 <span>Giá cả độc quyền</span>
          </a>

          <a
            href="#effects"
            className={activeSection === 'effects' ? 'active' : ''}
            aria-current={
              activeSection === 'effects' ? 'location' : undefined
            }
          >
            05 <span>Tác động tích cực</span>
          </a>

          <div className="basis-toc-note">
            <BookOpen size={17} />
            <span>
              Kiến thức nền tảng
              <br />
              Kinh tế chính trị
            </span>
          </div>
        </aside>

        {/* ARTICLE */}
        <main className="basis-article">

          {/* SECTION 01 */}
          <Reveal delay={0.3}>
            <section
              className="basis-section basis-concept"
              id="concept"
            >
              <SectionHeading
                index="01"
                eyebrow="Khái niệm cốt lõi"
                title="Độc quyền và nguồn gốc của độc quyền"
              />

              <div className="basis-concept-grid">
                <div className="basis-prose">
                  <p>
                    Khi nghiên cứu chủ nghĩa tư bản tự do cạnh tranh,
                    C.Mác đã dự báo:
                  </p>

                  <blockquote className="basis-quote basis-quote-light">
                    <span className="basis-quote-mark">“</span>
                    <p>
                      Tự do cạnh tranh đẻ ra tập trung sản xuất và sự
                      tập trung sản xuất này, khi phát triển tới một mức
                      độ nhất định, lại dẫn tới độc quyền.
                    </p>
                    <cite>C.Mác - trích V.I.Lênin: Toàn tập, Sđd, t.27, tr.402</cite>
                  </blockquote>

                  <p>
                    <strong>Độc quyền</strong> là sự liên minh giữa các
                    doanh nghiệp lớn, có khả năng thâu tóm việc sản xuất
                    và tiêu thụ một số loại hàng hóa, có khả năng định ra
                    giá cả độc quyền nhằm thu lợi nhuận độc quyền cao.
                  </p>
                </div>

                <figure className="basis-concept-visual">
                  <img
                    src="https://miro.medium.com/v2/resize:fit:4800/format:webp/1*2u-jqY0Xa6VwZQpBK4A-pg.png"
                    alt="Quy mô công nghiệp và hoạt động sản xuất"
                    loading="lazy"
                  />

                  <figcaption>
                    <span>MONOPOLY</span>
                    <b>
                      Từ cạnh tranh đến tập trung quyền lực kinh tế
                    </b>
                  </figcaption>
                </figure>
              </div>

              <div
                className="basis-flow"
                aria-label="Quá trình hình thành độc quyền"
              >
                <div >
                  <span>01</span>
                  <b>Tự do cạnh tranh</b>
                  <small>Nhiều doanh nghiệp tham gia</small>
                </div>

                <ArrowRight className="basis-flow-arrow" />

                <div>
                  <span>02</span>
                  <b>Tập trung sản xuất</b>
                  <small>Quy mô và tư bản tăng lên</small>
                </div>

                <ArrowRight className="basis-flow-arrow" />

                <div className="basis-flow-active">
                  <span>03</span>
                  <b>Độc quyền</b>
                  <small>Quyền lực thị trường tập trung</small>
                </div>
              </div>
            </section>
          </Reveal>

          {/* SECTION 02 */}
          <Reveal delay={0.2}>
            <section className="basis-section" id="causes">
              <SectionHeading
                index="02"
                eyebrow="Ba động lực hình thành"
                title="Các nguyên nhân dẫn tới độc quyền"
                description="Độc quyền không xuất hiện ngẫu nhiên mà là kết quả của những biến đổi sâu sắc trong lực lượng sản xuất và quan hệ kinh tế."
              />

              <div className="basis-causes">
                {causes.map((cause) => {
                  const Icon = cause.icon

                  return (
                    <article
                      className="basis-cause-card"
                      key={cause.number}
                    >
                      <div className="basis-cause-image">
                        <img
                          src={cause.image}
                          alt={cause.imageAlt}
                          loading="lazy"
                        />
                        <span>{cause.number}</span>
                      </div>

                      <div className="basis-cause-body">
                        <div className="basis-cause-title">
                          <Icon size={21} />
                          <h3>{cause.title}</h3>
                        </div>

                        <p style={{ fontSize: '15px', fontWeight: '500' }}>{cause.body}</p>

                        {cause.result && (
                          <div className="basis-result">
                            <b>HỆ QUẢ</b>
                            <p style={{ fontSize: '15px', fontWeight: '610' }}>{cause.result}</p>
                          </div>
                        )}

                        {cause.quote && (
                          <blockquote className="basis-mini-quote">
                            <p>{cause.quote}</p>
                            <cite>— {cause.author}</cite>
                          </blockquote>
                        )}
                      </div>
                    </article>
                  )
                })}
              </div>

              {/* CREDIT EXAMPLE */}
              <div className="basis-credit-example">
                <div className="basis-credit-icon">
                  <Wallet size={25} />
                </div>

                <div className="basis-credit-copy">
                  <span className="basis-eyebrow">
                    VÍ DỤ MINH HỌA · HỆ THỐNG TÍN DỤNG
                  </span>

                  <h3>
                    1.000 tỷ đồng có thể được huy động như thế nào?
                  </h3>

                  <p>
                    Nếu không có tín dụng, doanh nghiệp muốn có 1.000 tỷ
                    đồng để mở nhà máy phải tự tích lũy hoặc tìm đến từng
                    người cho vay. Nhưng thông qua hệ thống tín dụng, nguồn vốn
                    có thể được huy động từ nhiều chủ thể trong xã hội.
                    Ví dụ đơn giản: doanh nghiệp có thể chia thành 10 triệu phần, mỗi phần
                    tương ứng 100.000 đồng, rồi huy động vốn thông qua
                    việc phát hành cổ phiếu.
                  </p>

                  <div className="basis-money-flow">
                    <div>
                      <strong>1.000 tỷ</strong>
                      <small>Nhu cầu vốn</small>
                    </div>

                    <ArrowRight />

                    <div>
                      <strong>10 triệu</strong>
                      <small>Phần vốn nhỏ</small>
                    </div>

                    <ArrowRight />

                    <div>
                      <strong>Cộng đồng</strong>
                      <small>Nguồn vốn xã hội</small>
                    </div>
                  </div>

                  <small className="basis-example-note">
                    Minh họa khái quát cơ chế huy động vốn; cổ phiếu là
                    phần vốn góp, không đồng nhất với khoản vay tín dụng.
                  </small>
                </div>
              </div>
            </section>
          </Reveal>

          {/* SECTION 03 */}
          <Reveal delay={0.2}>
            <section className="basis-section" id="profit">
              <SectionHeading
                index="03"
                eyebrow="Bản chất kinh tế"
                title="Bản chất của lợi nhuận độc quyền"
                description="Tổ chức độc quyền có thể ấn định giá mua và giá bán để thu lợi nhuận độc quyền cao. Tuy nhiên, xét đến cùng, nguồn gốc của lợi nhuận độc quyền vẫn do lao động tạo ra."
              />

              <div className="basis-profit-panel">
                <div className="basis-profit-intro">
                  <Network size={27} />

                  <div>
                    <span>NGUỒN HÌNH THÀNH</span>
                    <h3>Lợi nhuận độc quyền</h3>
                  </div>
                </div>

                <div className="basis-profit-list">
                  {profitSources.map((item, index) => (
                    <div className="basis-profit-item" key={item}>
                      <span>0{index + 1}</span>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>

                <div className="basis-profit-foot">
                  <Scale size={18} />
                  <p>
                    Lợi nhuận độc quyền phản ánh sự phân phối và chiếm
                    đoạt giá trị trong quan hệ kinh tế giữa các nhóm
                    chủ thể.
                  </p>
                </div>
              </div>
            </section>
          </Reveal>

          {/* SECTION 04 */}
          <Reveal delay={0.2}>
            <section className="basis-section" id="price">
              <SectionHeading
                index="04"
                eyebrow="Cơ chế thị trường"
                title="Giá cả độc quyền"
                description="Với vị trí độc quyền trong sản xuất và tiêu thụ, các tổ chức độc quyền có khả năng áp đặt mức giá trong quan hệ mua – bán hàng hóa."
              />

              <div className="basis-price-grid">
                <article className="basis-price-card basis-price-high">
                  <div className="basis-price-top">
                    <span>01 / KHI BÁN</span>
                    <ArrowUpRight size={22} />
                  </div>

                  <div className="basis-price-graphic">
                    <div className="basis-price-line">
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                    </div>
                    <ArrowUpRight size={35} />
                  </div>

                  <h3>Giá độc quyền cao</h3>

                  <p>
                    Tổ chức độc quyền áp đặt mức giá cao khi bán hàng
                    hóa, tận dụng vị thế chi phối thị trường.
                  </p>

                  <span className="basis-price-tag">
                    BÁN RA · GIÁ CAO
                  </span>
                </article>

                <article className="basis-price-card basis-price-low">
                  <div className="basis-price-top">
                    <span>02 / KHI MUA</span>
                    <ArrowDown size={22} />
                  </div>

                  <div className="basis-price-graphic">
                    <div className="basis-price-line">
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                    </div>
                    <ArrowDown size={35} />
                  </div>

                  <h3>Giá độc quyền thấp</h3>

                  <p>
                    Tổ chức độc quyền áp đặt mức giá thấp khi mua hàng
                    hóa hoặc nguyên liệu từ các chủ thể khác.
                  </p>

                  <span className="basis-price-tag">
                    MUA VÀO · GIÁ THẤP
                  </span>
                </article>
              </div>

              <div className="basis-price-definition">
                <Zap size={19} />
                <p>
                  <strong>Giá cả độc quyền</strong> là giá cả do tổ chức
                  độc quyền áp đặt trong mua và bán hàng hóa.
                </p>
              </div>
            </section>
          </Reveal>

          {/* SECTION 05 */}
          <Reveal delay={0.2}>
            <section
              className="basis-section basis-effects-section"
              id="effects"
            >
              <SectionHeading
                index="05"
                eyebrow="Mặt có lợi của độc quyền"
                title="Những tác động tích cực trong nền kinh tế thị trường"
                description="Khi nói về mặt tích cực, độc quyền cũng có thể tạo ra một số động lực thúc đẩy sản xuất và đổi mới kỹ thuật."
              />

              <div className="basis-effects-grid">
                {positiveEffects.map((effect) => {
                  const Icon = effect.icon

                  return (
                    <article
                      className="basis-effect-card"
                      key={effect.number}
                    >
                      <div className="basis-effect-top">
                        <span>{effect.number}</span>
                        <Icon size={23} />
                      </div>

                      <h3>{effect.title}</h3>
                      <p>{effect.text}</p>
                    </article>
                  )
                })}
              </div>

              <blockquote className="basis-quote basis-quote-final">
                <span className="basis-quote-mark">“</span>

                <p>
                  ... nhưng trước mắt chúng ta cạnh tranh tự do biến
                  thành độc quyền và tạo ra nền sản xuất lớn, loại bỏ
                  nền sản xuất nhỏ, thay thế nền sản xuất lớn bằng một
                  nền sản xuất lớn hơn nữa.
                </p>

                <cite>V.I. Lênin: Toàn tập, Sđd, t.27, tr.488</cite>
              </blockquote>
            </section>
          </Reveal>

        </main>
      </div>
      <RouteCard gameUrl={GAME_URL} flipbookUrl={FLIPBOOK_URL} />

      {/* END NOTE */}
      <PageFooterNav nextPath="/event" nextLabel="Đến trang kế" />
    </div>
  )
}

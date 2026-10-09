import { ExternalLink, FileText, Image as ImageIcon, PlayCircle } from 'lucide-react'
import PageIntro from '../components/PageIntro'
import Reveal from '../components/Reveal'
import { sources } from '../data'
import '../page-styles/detail.css'


export default function SourcesPage() {
    return (
        <>
            <PageIntro
                number="SOURCES"
                title="Nguồn & tư liệu"
                subtitle="Các nguồn được tách thành một trang riêng để nội dung chính không bị ngắt nhịp. Tài liệu PDF người dùng cung cấp là cơ sở chính để chọn lọc nội dung website."
            />
            <section className="section">
                <div className="container grid grid-2">
                    {sources.map((s, i) => (
                        <Reveal key={s.title} delay={(i % 4) * 0.04}>
                            <a
                                className="source-card card"
                                href={s.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <div className="source-icon">
                                    {s.name === "Reuters" ||
                                    s.name === "CNA" ? (
                                        <PlayCircle size={20} />
                                    ) : (
                                        <FileText size={20} />
                                    )}
                                </div>
                                <div>
                                    <span>{s.name}</span>
                                    <h3>{s.title}</h3>
                                </div>
                                <ExternalLink size={17} color="#98A2B3" />
                            </a>
                        </Reveal>
                    ))}
                </div>
            </section>
            <section className="section section-soft">
                <div className="container">
                    <div className="card source-note">
                        <span className="eyebrow">NOTE</span>
                        <p>
                            Ảnh website sử dụng lấy từ các trang báo điện tử chính thống và dùng Pippit AI để tạo. Phần
                            YouTube dùng iframe của Reuters/CNA.
                        </p>
                        <a
                            href="https://cafebiz.vn/5-chaebol-tang-truong-nhanh-hon-ca-toan-bo-nen-kinh-te-con-dau-dau-cua-han-quoc-20181029111315076.chn#img-lightbox-4"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Xem nguồn ảnh 1↗ 
                        </a>
                        <span> </span>
                        <a
                            href="https://tuoitre.vn/samsung-se-buong-xuoi-neu-pho-chu-tich-di-tu-1374298.htm"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Xem nguồn ảnh 2↗
                        </a>
                        <span> </span>
                        <a
                            href="https://tuoitre.vn/thai-tu-samsung-lee-jae-yong-duoc-tong-thong-han-quoc-an-x-20220812095537723.htm"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Xem nguồn ảnh 3↗
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}


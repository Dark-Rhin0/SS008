import { BookOpen, ArrowUpRight } from 'lucide-react'
import PageIntro from '../components/PageIntro'
import Reveal from '../components/Reveal'
import { FLIPBOOK_URL } from '../config'
import '../page-styles/detail.css'
export default function FlipbookPage(){return <><PageIntro number="FLIPBOOK" title="Đọc bản đầy đủ" subtitle="Trang này là cổng nối. Bạn có thể gắn link Flipbook thật ở src/config.js mà không phải sửa component."/><section className="section"><div className="container"><Reveal><div className="flipbook-portal card"><div className="fake-book"><div className="book-page left"><small>SS008</small><b>HÀN QUỐC<br/>2022</b></div><div className="book-page right"><span>FULL MATERIAL</span><h3>Ân xá & kinh tế</h3></div></div><div className="portal-copy"><BookOpen size={30} color="var(--blue)"/><h2 className="h3">Mở Flipbook bên ngoài</h2><p className="copy">Link placeholder hiện tại: <code>{FLIPBOOK_URL}</code></p><a className="btn btn-primary" href={FLIPBOOK_URL} target="_blank" rel="noreferrer">Mở Flipbook <ArrowUpRight size={16}/></a></div></div></Reveal></div></section></>}

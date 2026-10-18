import { motion, useScroll } from 'framer-motion'
import './Header.css'
export default function ScrollProgress(){ const {scrollYProgress}=useScroll(); return <div className="progress"><motion.div style={{scaleX:scrollYProgress}}/></div> }

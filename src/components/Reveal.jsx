import { motion } from 'framer-motion'
export default function Reveal({children,delay=0,amount=.2,className=''}){
  return <motion.div className={className} initial={{opacity:0,y:34}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount}} transition={{duration:.72,ease:[.22,1,.36,1],delay}}>{children}</motion.div>
}

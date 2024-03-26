import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { links, footerLinks } from './data';
import { perspective, slideIn } from "./anim";
import Transition from '../../../Transition/Transition';
import { Link as ScrollLink } from 'react-scroll';
const Nav = () => {
  return ( 
    <div className={styles.nav}>
       <div className={styles.body}>
        {
            links.map( (link, i) => {
                const { title, href , to} = link;
                return (
                    <div key={`b_${i}`} className={styles.linkContainer}>
                        
                        <motion.div
                          href={href}
                          custom={i}
                          variants={perspective}
                          initial="initial"
                          animate="enter"
                          exit="exit"
                        >
                            <ScrollLink
                                to={to}
                                spy={true} 
                                 smooth={true} 
                                offset={50} 
                                duration={1200} 
    >
                            <a>
                                {title}
                            </a>
                            </ScrollLink>
                        </motion.div>
                    
                    </div>
                )
            })
        }
       </div>
       <motion.div className={styles.footer}>
            {
                footerLinks.map( (link, i) => {
                    const { title, href } = link;
                    return (
                        <motion.a 
                            variants={slideIn}
                            custom={i} 
                            initial="initial"
                            animate="enter"
                            exit="exit"
                            key={`f_${i}`}
                            href={href}
                        >
                            
                            {title}
                        </motion.a>
                    )
                })
            }
       </motion.div>
    </div>
  )
}

export default Nav;
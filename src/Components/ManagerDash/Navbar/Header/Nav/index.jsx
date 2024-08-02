import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { useAuth } from '../../../../../Contexts/AuthContext';
import { perspective, slideIn } from "./anim";
import { Link } from 'react-router-dom';

const Nav = () => {
    const { currentUser } = useAuth();

    const links = [
        {
          title: "Home",
          to:'/'
        },
        {
          title: "Account",
          to: currentUser ? '/Form' : '/Login'
        },
        {
          title: "About Us",
          href: "/"
        },
        {
          title: "Services",
          href: "/"
        },
        {
          title: "Contact",
          href: "/"
        }
    ];

    const footerLinks = [
        {
          title: "Facebook",
          href: "/"
        },
        {
          title: "LinkedIn",
          href: "/"
        },
        {
          title: "Instagram",
          href: "/"
        },
        {
          title: "Whatsapp",
          href: "https://wa.me/917349344224"
        }
    ];

    return ( 
        <div className={styles.nav}>
            <div className={styles.body}>
                {links.map((link, i) => {
                    const { title, href, to } = link;
                    return (
                        <div key={`b_${i}`} className={styles.linkContainer}>
                            <motion.a
                                href={href}
                                custom={i}
                                variants={perspective}
                                initial="initial"
                                animate="enter"
                                exit="exit"
                            >
                                <Link to={to}>
                                    {title}
                                </Link>
                            </motion.a>
                        </div>
                    );
                })}
            </div>
            <motion.div className={styles.footer}>
                {footerLinks.map((link, i) => {
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
                    );
                })}
            </motion.div>
        </div>
    );
}

export default Nav;

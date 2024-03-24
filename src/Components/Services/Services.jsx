import styles from './services.module.scss';
import all_items from './Provides';
import Card from './Cards/Card';
import { useScroll } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Car from '../../assets/img/Car.mp4';

export default function Services() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  useEffect(() => {
    // Scroll to the Services component on mount
    container.current.scrollIntoView({ behavior: 'smooth' });
  }, []);
  

  return (
    <main id='Services' ref={container} className={styles.main}>
      <div className={styles.topic}>
        <div className='h112'>SERVICES</div>
      </div>
      {all_items.map((project, i) => {
        const targetScale = 1 - ((all_items.length - i) * 0.05);
        return <Card key={`p_${i}`} i={i} {...project} progress={scrollYProgress} range={[i * 0.25, 1]} targetScale={targetScale} />;
      })}
    </main>
  );
}


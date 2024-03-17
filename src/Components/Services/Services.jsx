'use client';
import styles from './services.module.scss'
import all_items from './Provides';
import Card from './Cards/Card';
import { useScroll } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Car from '../../assets/img/Car.mp4'

export default function Services() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })



  return (

    <main ref={container} className={styles.main}>
        
      <div className={styles.topic}>
        <h1>SERVICES</h1>
      </div>
      {
        all_items.map( (project, i) => {
          const targetScale = 1 - ( (all_items.length - i) * 0.05);
          return <Card key={`p_${i}`} i={i} {...project} progress={scrollYProgress} range={[i * .25, 1]} targetScale={targetScale}/>
        })
      }
    </main>
  )
}

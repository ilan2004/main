import React, { useState } from 'react';
import styles from './Project.module.scss';
import Titles from './Titles/Title';
import Descriptions from './Description/Description';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { gsap, Power3 } from 'gsap';

const data = [
    {
        title: "EV-BMS",
        description: "Cutting-edge BMS technology optimized for EVs, ensuring peak performance and safety through AI-driven insights.",
        speed: 0.5
    },
    {
        title: "Performance",
        description: "Leveraging AI-generated data to maximize efficiency, extend battery lifespan, and enhance overall performance.",
        speed: 0.5
    },
    {
        title: "Safety",
        description: "Implementation of overcharge prevention and advanced monitoring systems to ensure safe operation of EV batteries.",
        speed: 0.8
    },
    {
        title: "Insights",
        description: "Providing in-depth performance analysis, mileage projections, and charging mode recommendations for optimal usage.",
        speed: 0.8
    },
    {
        title: "Collaboration",
        description: "Developed through collaboration with leading EV manufacturers, focusing on scalability, cost-effectiveness, and sustainability to drive innovation in battery management for EVs.",
        speed: 0.8
    }
]

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const { ref, inView } = useInView({
        triggerOnce: true, // Trigger animation only once
        threshold: 0.5 // 50% of the object visible
    });

    useEffect(() => {
        if (inView) {
            // Animation code
            gsap.to(".container", {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: Power3.easeOut
            });
        }
    }, [inView]);

    return (
        <div ref={ref} className={styles.container} >
            <Titles data={data} setSelectedProject={setSelectedProject} />
            <Descriptions data={data} selectedProject={selectedProject} />
        </div>
    );
};

export default Projects;

import React from 'react';
import { motion } from 'framer-motion';
import './Transition.css';

const Transition = ({ isVisible, children }) => {
    return (
        <motion.div
            className={isVisible ? "slide-in" : "slide-out"} // Use slide-in or slide-out based on isVisible prop
            initial={{ scaleY: 0 }}
            animate={{ scaleY: isVisible ? 1 : 0 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
};

export default Transition;



// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"; 

const Reveal = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }} // Trigger slightly before it hits the center
      transition={{ 
        duration: 0.8, 
        ease: [0.17, 0.55, 0.55, 1] // Professional cubic-bezier for smooth motion
      }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
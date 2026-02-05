import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  bgColor?: 'white' | 'silver' | 'primary' | 'black' | 'transparent' | 'charcoal' | 'beige';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  addHeaderSpace?: boolean;
  delay?: number;
}

const Section: React.FC<SectionProps> = ({ 
  id, 
  className = '', 
  children, 
  bgColor = 'white',
  padding = 'lg',
  addHeaderSpace = false,
  delay = 0
}) => {
  const colors = {
    white: 'bg-white text-charcoal',
    silver: 'bg-gray-50 text-charcoal', 
    beige: 'bg-gray-50 text-charcoal', 
    primary: 'bg-primary/30 text-charcoal', 
    black: 'bg-charcoal text-white',
    charcoal: 'bg-charcoal text-white',
    transparent: 'bg-transparent'
  };

  const paddings = {
    none: '',
    sm: 'py-12 md:py-16',
    md: 'py-20 md:py-24',
    lg: 'py-24 md:py-32'
  };

  // Ensure enough space for fixed header without gaps
  const headerSpacing = addHeaderSpace ? 'pt-32 md:pt-44' : '';

  return (
    <motion.section 
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: delay }}
      className={`${colors[bgColor]} ${paddings[padding]} ${headerSpacing} ${className} relative w-full`}
    >
      {children}
    </motion.section>
  );
};

export default Section;
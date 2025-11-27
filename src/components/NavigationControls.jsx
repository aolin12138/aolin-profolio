import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';

const NavigationControls = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show controls after scrolling down a bit, or always show if preferred
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (direction) => {
    const sections = Array.from(document.querySelectorAll('section'));
    if (sections.length === 0) return;

    const scrollPosition = window.scrollY + window.innerHeight / 2; // Center of viewport

    let currentSectionIndex = sections.findIndex((section) => {
      const rect = section.getBoundingClientRect();
      // Check if the section is mostly in the viewport
      const offsetTop = section.offsetTop;
      const offsetBottom = offsetTop + section.offsetHeight;
      return scrollPosition >= offsetTop && scrollPosition < offsetBottom;
    });

    // Fallback if no section is "active" (e.g. top of page padding)
    if (currentSectionIndex === -1) {
      if (window.scrollY < sections[0].offsetTop) {
        currentSectionIndex = -1; // Before first section
      } else {
        currentSectionIndex = sections.length - 1; // End of page
      }
    }

    let targetIndex = direction === 'next' ? currentSectionIndex + 1 : currentSectionIndex - 1;

    // Clamp index
    if (targetIndex < 0) targetIndex = 0;
    if (targetIndex >= sections.length) targetIndex = sections.length - 1;

    const targetSection = sections[targetIndex];
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-4 pointer-events-none">
      <div className="pointer-events-auto flex flex-col gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scrollToSection('prev')}
          className="p-3 rounded-full bg-primary/80 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group shadow-lg cursor-pointer"
          aria-label="Scroll Up"
        >
          <ChevronUp className="w-6 h-6 text-secondary group-hover:text-white transition-colors" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scrollToSection('next')}
          className="p-3 rounded-full bg-primary/80 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group shadow-lg cursor-pointer"
          aria-label="Scroll Down"
        >
          <ChevronDown className="w-6 h-6 text-secondary group-hover:text-white transition-colors" />
        </motion.button>
      </div>
    </div>
  );
};

export default NavigationControls;

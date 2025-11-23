'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const TextReveal = ({
  text,
  revealText,
  className
}) => {
  const [widthPercentage, setWidthPercentage] = useState(0);
  const containerRef = useRef(null);
  const [left, setLeft] = useState(0);
  const [localWidth, setLocalWidth] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const updatePosition = () => {
    if (containerRef.current) {
      const { left, width: localWidth } =
        containerRef.current.getBoundingClientRect();
      setLeft(left);
      setLocalWidth(localWidth);
    }
  };

  useEffect(() => {
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, []);

  function mouseMoveHandler(event) {
    event.preventDefault();
    const { clientX } = event;
    if (containerRef.current) {
      const relativeX = clientX - left;
      setWidthPercentage((relativeX / localWidth) * 100);
    }
  }

  function mouseLeaveHandler() {
    setIsMouseOver(false);
    setWidthPercentage(0);
  }

  function mouseEnterHandler() {
    setIsMouseOver(true);
  }

  function touchMoveHandler(event) {
    event.preventDefault();
    const clientX = event.touches[0].clientX;
    if (containerRef.current) {
      const relativeX = clientX - left;
      setWidthPercentage((relativeX / localWidth) * 100);
    }
  }

  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseMove={mouseMoveHandler}
      onTouchStart={mouseEnterHandler}
      onTouchEnd={mouseLeaveHandler}
      onTouchMove={touchMoveHandler}
      ref={containerRef}
      className={cn('relative flex items-center overflow-hidden cursor-pointer', className)}>
      {/* Revealed text layer */}
      <motion.div
        style={{
          width: '100%',
        }}
        animate={
          isMouseOver
            ? {
              opacity: widthPercentage > 0 ? 1 : 0,
              clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
            }
            : {
              clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
            }
        }
        transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
        className="absolute z-20 will-change-transform">
        <p className="text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]">
          {revealText}
        </p>
      </motion.div>
      {/* Base text layer */}
      <div className="overflow-hidden">
        <p className="text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] opacity-40">
          {text}
        </p>
      </div>
    </div>
  );
};
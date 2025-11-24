import React, { useEffect, useRef, useState } from 'react';

const TextPressureSimple = ({
  text = 'Compressa',
  className = '',
  minFontSize = 24,
  textColor = '#FFFFFF'
}) => {
  const containerRef = useRef(null);
  const spansRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });

  const [fontSize, setFontSize] = useState(minFontSize);
  const spanPositions = useRef([]);
  const containerBounds = useRef({ left: 0, top: 0, width: 0, height: 0 });
  const introActive = useRef(false);
  const hasPlayed = useRef(false);
  const introStartTime = useRef(0);
  const animationStarted = useRef(false);

  const chars = text.split('');

  const dist = (a, b) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Only allow mouse control after intro animation is complete
      if (!introActive.current && hasPlayed.current) {
        cursorRef.current.x = e.clientX;
        cursorRef.current.y = e.clientY;
      }
    };

    const handleResize = () => {
      if (containerRef.current) {
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        // Cache container bounds for intro animation
        containerBounds.current = { left: left + window.scrollX, top: top + window.scrollY, width, height };
      }
      // Recalculate span positions
      if (spansRef.current) {
        spanPositions.current = spansRef.current.map(span => {
          if (!span) return null;
          const rect = span.getBoundingClientRect();
          return {
            x: rect.left + window.scrollX + rect.width / 2,
            y: rect.top + window.scrollY + rect.height / 2
          };
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Initial calculation
    handleResize();

    // Intersection Observer to trigger intro animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed.current) {
            hasPlayed.current = true;
            
            if (containerRef.current) {
              containerRef.current.style.transition = 'opacity 1s ease';
              containerRef.current.style.opacity = 1;
            }
            
            // Start sweep animation shortly after fade starts (not waiting for it to finish)
            setTimeout(() => {
              introActive.current = true;
              introStartTime.current = Date.now();
              animationStarted.current = true; // Signal to start the animation loop
              
              // Set initial position to left side
              const { left, top, height } = containerBounds.current;
              
              const startX = containerBounds.current.left - window.scrollX;
              const centerY = containerBounds.current.top + containerBounds.current.height / 2 - window.scrollY;
              
              mouseRef.current = { x: startX, y: centerY };
              cursorRef.current = { x: startX, y: centerY };
            }, 300); // Start sweep animation 300ms after fade begins
          }
        });
      },
      { threshold: 0.8, rootMargin: '0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let rafId;
    const animate = () => {
      // Don't run the heavy animation loop until the component is visible
      if (!animationStarted.current) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      // Optimization: Read scroll once per frame
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      // Handle Intro Animation
      if (introActive.current) {
        const elapsed = Date.now() - introStartTime.current;
        const duration = 1800; // 1.8 seconds for the sweep
        const progress = Math.min(elapsed / duration, 1);
        
        const { left, width, top, height } = containerBounds.current;
        
        // Convert Page bounds to Viewport bounds for the cursor
        const viewportLeft = left - scrollX;
        const viewportTop = top - scrollY;
        
        // Sweep from slightly left to slightly right of the container to ensure it clears
        const startX = viewportLeft - 100;
        const endX = viewportLeft + width + 100;
        
        const currentX = startX + (endX - startX) * progress;
        const currentY = viewportTop + height / 2;
        
        cursorRef.current = { x: currentX, y: currentY };
        
        if (progress >= 1) {
          introActive.current = false;
        }
      }

      // Calculate distance to target
      const dx = cursorRef.current.x - mouseRef.current.x;
      const dy = cursorRef.current.y - mouseRef.current.y;
      
      // Check if settled (very close to target)
      const isSettled = Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5;

      // Only update if NOT settled OR intro is active
      // This prevents unnecessary DOM updates when mouse is idle
      if (introActive.current || !isSettled) {
        // Smooth mouse following - faster response to reduce lag perception
        mouseRef.current.x += dx / 5;
        mouseRef.current.y += dy / 5;

        if (containerRef.current) {
          // Max distance for effect to be visible - reduced for tighter circle
          const maxDist = 140;

          spansRef.current.forEach((span, i) => {
            if (!span || !spanPositions.current[i]) return;

            const spanX = spanPositions.current[i].x - scrollX;
            const spanY = spanPositions.current[i].y - scrollY;

            const diffX = mouseRef.current.x - spanX;
            const diffY = mouseRef.current.y - spanY;
            const d = Math.sqrt(diffX * diffX + diffY * diffY);

            // Calculate proximity (0 to 1, where 1 is closest)
            let proximity = 1 - Math.min(d, maxDist) / maxDist;

            // Calculate weight: 100 (thin) to 900 (bold)
            let weight = 100 + proximity * 800;

            // Set both for maximum compatibility and smoothness
            span.style.fontWeight = weight;
            span.style.fontVariationSettings = `'wght' ${weight}`;
          });
        }
      }
      
      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [chars.length]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className}`}
      style={{ 
        fontSize: minFontSize, 
        color: textColor,
        opacity: 0 // Start hidden
      }}
    >
      <h1
        className="flex justify-start items-center w-full h-full m-0 p-0"
        style={{
          fontFamily: '"Inter", sans-serif',
          fontVariationSettings: "'wght' 100"
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={el => spansRef.current[i] = el}
            className="inline-block"
            style={{ 
              fontWeight: 100
            }} 
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressureSimple;

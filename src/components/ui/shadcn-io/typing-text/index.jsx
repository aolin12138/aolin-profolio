'use client';;
import { useEffect, useRef, useState, createElement, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';

const TypingText = ({
  text,
  as: Component = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  segments = [], // NEW: array of {text: string, color: string} objects
  hideCursorOnComplete = true, // NEW: whether to hide cursor after typing completes
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const [hasStarted, setHasStarted] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const cursorRef = useRef(null);
  const containerRef = useRef(null);

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  // Build full text from segments if provided
  const fullText = useMemo(() => {
    if (segments.length > 0) {
      return segments.map(seg => seg.text).join('');
    }
    return textArray[currentTextIndex];
  }, [segments, textArray, currentTextIndex]);

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return 'currentColor';
    return textColors[currentTextIndex % textColors.length];
  };

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (showCursor && cursorRef.current && hasStarted) {
      // Kill any existing animations
      gsap.killTweensOf(cursorRef.current);

      // Set initial state
      gsap.set(cursorRef.current, { opacity: 1 });

      // Start blinking animation
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });
    }

    return () => {
      if (cursorRef.current) {
        gsap.killTweensOf(cursorRef.current);
      }
    };
  }, [showCursor, cursorBlinkDuration, hasStarted, isTypingComplete]);

  useEffect(() => {
    if (!isVisible) return;

    let timeout;

    const currentText = segments.length > 0 ? fullText : textArray[currentTextIndex];
    const processedText = reverseMode ? currentText.split('').reverse().join('') : currentText;

    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (displayedText === '') {
          setIsDeleting(false);
          if (currentTextIndex === textArray.length - 1 && !loop) {
            return;
          }

          if (onSentenceComplete) {
            onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
          }

          setCurrentTextIndex(prev => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
          timeout = setTimeout(() => { }, pauseDuration);
        } else {
          timeout = setTimeout(() => {
            setDisplayedText(prev => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else {
        if (currentCharIndex < processedText.length) {
          timeout = setTimeout(() => {
            setDisplayedText(prev => prev + processedText[currentCharIndex]);
            setCurrentCharIndex(prev => prev + 1);
          }, variableSpeed ? getRandomSpeed() : typingSpeed);
        } else {
          // Typing complete
          if (!loop) {
            setIsTypingComplete(true);
          }
          if (textArray.length > 1) {
            timeout = setTimeout(() => {
              setIsDeleting(true);
            }, pauseDuration);
          }
        }
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
      timeout = setTimeout(() => {
        setHasStarted(true);
        executeTypingAnimation();
      }, initialDelay);
    } else {
      executeTypingAnimation();
    }

    return () => clearTimeout(timeout);
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    onSentenceComplete,
    getRandomSpeed
  ]);

  const shouldHideCursor =
    hideCursorWhileTyping && (currentCharIndex < textArray[currentTextIndex].length || isDeleting);

  const shouldShowCursor = showCursor && hasStarted && (!isTypingComplete || !hideCursorOnComplete);

  // Render text with colored segments
  const renderColoredText = () => {
    if (segments.length === 0) {
      return <span className="inline" style={{ color: getCurrentTextColor() }}>
        {displayedText}
      </span>;
    }

    let charCount = 0;
    const renderedSegments = [];

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const segmentLength = segment.text.length;
      const segmentStart = charCount;
      const segmentEnd = charCount + segmentLength;

      if (displayedText.length > segmentStart) {
        const visibleText = displayedText.substring(
          segmentStart,
          Math.min(displayedText.length, segmentEnd)
        );

        renderedSegments.push(
          <span key={i} style={{ color: segment.color || 'currentColor' }}>
            {visibleText}
          </span>
        );
      }

      charCount += segmentLength;

      if (charCount >= displayedText.length) break;
    }

    return renderedSegments;
  };

  return createElement(Component, {
    ref: containerRef,
    className: `inline-block whitespace-pre-wrap tracking-tight ${className}`,
    ...props
  }, renderColoredText(), shouldShowCursor && (
    <span
      ref={cursorRef}
      className={`inline-block opacity-100 ${shouldHideCursor ? 'hidden' : ''} ${cursorCharacter === '|'
        ? `h-5 w-[1px] translate-y-1 bg-foreground ${cursorClassName}`
        : `ml-1 ${cursorClassName}`
        }`}>
      {cursorCharacter === '|' ? '' : cursorCharacter}
    </span>
  ));
};

export default TypingText;
import { useState, useEffect, useCallback } from 'react';

interface TypewriterConfig {
  typeSpeed?: number;
  naturalVariation?: boolean;
  cursorBlinkSpeed?: number;
  pauseOnComplete?: number;
  startDelay?: number;
}

const useAdvancedTypingEffect = (
  textToType: string, 
  config: TypewriterConfig = {}
) => {
  const {
    typeSpeed = 80,
    naturalVariation = true,
    cursorBlinkSpeed = 530,
    pauseOnComplete = 1000,
    startDelay = 200
  } = config;

  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const getTypingDelay = useCallback(() => {
    if (!naturalVariation) return typeSpeed;
    const variation = (Math.random() - 0.5) * 0.6;
    return Math.max(30, typeSpeed + (typeSpeed * variation));
  }, [typeSpeed, naturalVariation]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, cursorBlinkSpeed);
    return () => clearInterval(blinkInterval);
  }, [cursorBlinkSpeed]);

  useEffect(() => {
    if (currentIndex >= textToType.length) return;
    const timer = setTimeout(() => {
      setDisplayText(textToType.substring(0, currentIndex + 1));
      setCurrentIndex(prev => prev + 1);
    }, currentIndex === 0 ? startDelay : getTypingDelay());
    return () => clearTimeout(timer);
  }, [currentIndex, textToType, getTypingDelay, startDelay]);

  useEffect(() => {
    if (currentIndex >= textToType.length && !isComplete) {
      const completeTimer = setTimeout(() => {
        setIsComplete(true);
      }, pauseOnComplete);
      return () => clearTimeout(completeTimer);
    }
  }, [currentIndex, textToType.length, isComplete, pauseOnComplete]);

  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
    setIsComplete(false);
    setShowCursor(true);
  }, [textToType]);

  return {
    displayText,
    isComplete,
    showCursor: showCursor || !isComplete,
  };
};

export default useAdvancedTypingEffect;

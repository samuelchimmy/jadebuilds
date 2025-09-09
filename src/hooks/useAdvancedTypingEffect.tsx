import { useState, useEffect, useCallback } from 'react';

// Define the shape of our configuration object for clarity
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
  // Set default values for any config options not provided
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

  // Natural typing variation - mimics human typing rhythm
  const getTypingDelay = useCallback(() => {
    if (!naturalVariation) return typeSpeed;
    
    // Add natural variation (±30% of base speed)
    const variation = (Math.random() - 0.5) * 0.6;
    return Math.max(30, typeSpeed + (typeSpeed * variation));
  }, [typeSpeed, naturalVariation]);

  // Cursor blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, cursorBlinkSpeed);

    return () => clearInterval(blinkInterval);
  }, [cursorBlinkSpeed]);

  // Main typing animation logic
  useEffect(() => {
    // Stop if we've finished typing
    if (currentIndex >= textToType.length) return;

    // Set a timeout for the next character
    const timer = setTimeout(() => {
      setDisplayText(textToType.substring(0, currentIndex + 1));
      setCurrentIndex(prev => prev + 1);
    }, currentIndex === 0 ? startDelay : getTypingDelay());

    return () => clearTimeout(timer);
  }, [currentIndex, textToType, getTypingDelay, startDelay]);

  // Handle completion state
  useEffect(() => {
    if (currentIndex >= textToType.length && !isComplete) {
      const completeTimer = setTimeout(() => {
        setIsComplete(true);
      }, pauseOnComplete);

      return () => clearTimeout(completeTimer);
    }
  }, [currentIndex, textToType.length, isComplete, pauseOnComplete]);

  // Reset the animation if the textToType ever changes
  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
    setIsComplete(false);
    setShowCursor(true);
  }, [textToType]);

  return {
    displayText,
    isComplete,
    showCursor: showCursor || !isComplete, // Cursor stays solid while typing, blinks after
  };
};

export default useAdvancedTypingEffect;

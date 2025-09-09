import React, { useEffect, useRef, useMemo } from 'react';

type DoodleBackgroundProps = {
  svgString: string;
};

// This component takes raw SVG code, processes it, and makes it interactive.
const InteractiveDoodleBackground = ({ svgString }: DoodleBackgroundProps) => {
  const svgContainerRef = useRef<HTMLDivElement>(null);
  // Using a ref to store doodle data avoids re-renders on mouse move
  const doodleDataRef = useRef(new Map());

  // --- SVG Processing ---
  // We use useMemo to ensure this complex processing only runs once.
  const processedSvg = useMemo(() => {
    let processed = svgString;
    // This regular expression finds top-level shapes/groups in the SVG
    // and adds a unique ID and a common class to each one.
    let idCounter = 0;
    const regex = /<(path|g|circle|rect|ellipse)/g;
    processed = processed.replace(regex, (match) => {
      idCounter++;
      // We add a class for styling and an ID for tracking
      return `${match} class="interactive-doodle" id="doodle-${idCounter}"`;
    });
    return processed;
  }, [svgString]);

  // --- Initialization Effect ---
  // This runs once after the component mounts to find all the doodles.
  useEffect(() => {
    const container = svgContainerRef.current;
    if (!container) return;

    const doodles = container.querySelectorAll('.interactive-doodle');
    doodles.forEach(el => {
      const rect = el.getBoundingClientRect();
      // We store each doodle's element and its center position
      doodleDataRef.current.set(el.id, {
        el,
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    });
  }, [processedSvg]); // Re-run if the SVG string changes

  // --- Mouse Tracking Effect ---
  // This effect adds the listener that tracks the cursor.
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      
      // The distance (in pixels) at which doodles will start to react
      const proximityThreshold = 100;

      doodleDataRef.current.forEach(data => {
        // Calculate distance from mouse to the center of the doodle
        const distance = Math.sqrt(
          Math.pow(clientX - data.x, 2) + Math.pow(clientY - data.y, 2)
        );

        // If the mouse is close enough, add the 'active' class. Otherwise, remove it.
        if (distance < proximityThreshold) {
          data.el.classList.add('doodle-active');
        } else {
          data.el.classList.remove('doodle-active');
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Clean up the listener when the component is removed
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={svgContainerRef}
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -1, 
        overflow: 'hidden' 
      }}
      // This is the standard way to render a string as HTML/SVG in React
      dangerouslySetInnerHTML={{ __html: processedSvg }} 
    />
  );
};

export default InteractiveDoodleBackground;

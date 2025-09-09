import React, { useEffect, useRef, useMemo } from 'react';

type DoodleBackgroundProps = {
  svgString: string;
};

const InteractiveDoodleBackground = ({ svgString }: DoodleBackgroundProps) => {
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const doodleDataRef = useRef(new Map());

  const processedSvg = useMemo(() => {
    if (!svgString) return '';

    let processed = svgString;
    
    // 1. Add preserveAspectRatio to the main <svg> tag for proper scaling
    processed = processed.replace(
      /<svg/,
      '<svg preserveAspectRatio="xMidYMid slice"'
    );

    // 2. Add class and ID to all top-level child elements for interactivity
    let idCounter = 0;
    const regex = /<(path|g|circle|rect|ellipse)/g;
    processed = processed.replace(regex, (match) => {
      idCounter++;
      return `${match} class="interactive-doodle" id="doodle-${idCounter}"`;
    });

    return processed;
  }, [svgString]);

  useEffect(() => {
    const container = svgContainerRef.current;
    if (!container) return;

    // We need to re-calculate positions if the window is resized
    const calculatePositions = () => {
      doodleDataRef.current.clear();
      const doodles = container.querySelectorAll('.interactive-doodle');
      doodles.forEach(el => {
        const rect = el.getBoundingClientRect();
        doodleDataRef.current.set(el.id, {
          el,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      });
    };
    
    calculatePositions(); // Initial calculation
    window.addEventListener('resize', calculatePositions); // Recalculate on resize

    return () => {
      window.removeEventListener('resize', calculatePositions);
    };
  }, [processedSvg]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const proximityThreshold = 100;

      doodleDataRef.current.forEach(data => {
        const distance = Math.sqrt(
          Math.pow(clientX - data.x, 2) + Math.pow(clientY - data.y, 2)
        );

        if (distance < proximityThreshold) {
          data.el.classList.add('doodle-active');
        } else {
          data.el.classList.remove('doodle-active');
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={svgContainerRef}
      className="svg-background" // Use the new CSS class
      dangerouslySetInnerHTML={{ __html: processedSvg }}
    />
  );
};

export default InteractiveDoodleBackground;

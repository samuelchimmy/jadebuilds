import React, { useEffect, useRef, useMemo } from 'react';

type DoodleBackgroundProps = {
  svgString: string;
  isPortfolioActive: boolean; // ADD THIS PROP
};

const InteractiveDoodleBackground = ({ svgString, isPortfolioActive }: DoodleBackgroundProps) => {
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const doodleDataRef = useRef(new Map());

  const processedSvg = useMemo(() => {
    // ... (memo logic is unchanged)
    if (!svgString) return '';
    let processed = svgString;
    processed = processed.replace(
      /<svg/,
      '<svg preserveAspectRatio="xMidYMid slice"'
    );
    let idCounter = 0;
    const regex = /<(path|g|circle|rect|ellipse)/g;
    processed = processed.replace(regex, (match) => {
      idCounter++;
      return `${match} class="interactive-doodle" id="doodle-${idCounter}"`;
    });
    return processed;
  }, [svgString]);

  useEffect(() => {
    // ... (position calculation is unchanged)
    const container = svgContainerRef.current;
    if (!container) return;
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
    calculatePositions();
    window.addEventListener('resize', calculatePositions);
    return () => {
      window.removeEventListener('resize', calculatePositions);
    };
  }, [processedSvg]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // ADD THIS CHECK: If portfolio is active, do nothing.
      if (isPortfolioActive) {
        // Ensure all doodles are reset to their non-active state
        doodleDataRef.current.forEach(data => {
            data.el.classList.remove('doodle-active');
        });
        return;
      }
      
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
  }, [isPortfolioActive]); // UPDATE DEPENDENCY: Re-run if the portfolio state changes

  return (
    <div
      ref={svgContainerRef}
      className="svg-background"
      dangerouslySetInnerHTML={{ __html: processedSvg }}
    />
  );
};

export default InteractiveDoodleBackground;

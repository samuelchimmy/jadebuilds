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
    const regex = /<(path|g|circle|rect|ellipse|text)/g;
    processed = processed.replace(regex, (match) => {
      idCounter++;
      // We add a class for styling and an ID for tracking
      return `${match} class="interactive-doodle" id="doodle-${idCounter}"`;
    });
    return processed;
  }, [svgString]);

  // --- Function to distribute doodles around screen edges ---
  const distributeDoodlesAroundEdges = () => {
    const container = svgContainerRef.current;
    if (!container) return;

    const doodles = container.querySelectorAll('.interactive-doodle');
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Define safe zones (avoid the center where content is)
    const centerWidth = Math.min(600, viewportWidth * 0.6);
    const centerHeight = Math.min(800, viewportHeight * 0.8);
    const centerLeft = (viewportWidth - centerWidth) / 2;
    const centerRight = centerLeft + centerWidth;
    const centerTop = (viewportHeight - centerHeight) / 2;
    const centerBottom = centerTop + centerHeight;

    doodles.forEach((el, index) => {
      const element = el as SVGElement;
      let x, y;

      // Distribute doodles around the edges
      const edgeMargin = 50; // Distance from screen edge
      const totalDoodles = doodles.length;
      const section = Math.floor((index / totalDoodles) * 4); // 0=top, 1=right, 2=bottom, 3=left

      switch(section) {
        case 0: // Top edge
          x = Math.random() * (viewportWidth - 200) + 100;
          y = Math.random() * (centerTop - edgeMargin) + edgeMargin;
          break;
        case 1: // Right edge  
          x = Math.random() * (viewportWidth - centerRight - edgeMargin) + centerRight;
          y = Math.random() * (viewportHeight - 200) + 100;
          break;
        case 2: // Bottom edge
          x = Math.random() * (viewportWidth - 200) + 100;
          y = Math.random() * (viewportHeight - centerBottom - edgeMargin) + centerBottom;
          break;
        case 3: // Left edge
          x = Math.random() * (centerLeft - edgeMargin) + edgeMargin;
          y = Math.random() * (viewportHeight - 200) + 100;
          break;
        default:
          x = Math.random() * 200 + 50;
          y = Math.random() * 200 + 50;
      }

      // Apply transform to position the element
      element.style.transform = `translate(${x}px, ${y}px)`;
      element.style.position = 'absolute';
      element.style.top = '0';
      element.style.left = '0';

      // Store position for mouse interaction
      doodleDataRef.current.set(el.id, {
        el: element,
        x: x,
        y: y,
      });
    });
  };

  // --- Initialization Effect ---
  useEffect(() => {
    // Small delay to ensure SVG is rendered
    const timer = setTimeout(() => {
      distributeDoodlesAroundEdges();
    }, 100);

    return () => clearTimeout(timer);
  }, [processedSvg]);

  // --- Mouse Tracking Effect ---
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

    // --- Resize Handler ---
    const handleResize = () => {
      distributeDoodlesAroundEdges();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize, { passive: true });

    // Clean up the listeners when the component is removed
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
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
        overflow: 'hidden',
        pointerEvents: 'none' // This ensures the background doesn't interfere with clicking
      }}
      // This is the standard way to render a string as HTML/SVG in React
      dangerouslySetInnerHTML={{ __html: processedSvg }} 
    />
  );
};

export default InteractiveDoodleBackground;

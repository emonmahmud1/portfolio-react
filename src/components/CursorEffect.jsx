import React, { useEffect, useState } from 'react';

const CursorEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', updateMousePosition);
    
    const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
          transform: `scale(${isHovering ? 2 : 1})`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        <div className="w-5 h-5 bg-white rounded-full opacity-80"></div>
      </div>
      <div
        className="fixed pointer-events-none z-40"
        style={{
          left: mousePosition.x - 20,
          top: mousePosition.y - 20,
          transform: `scale(${isHovering ? 1.5 : 1})`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <div className="w-10 h-10 border-2 border-blue-500/30 rounded-full animate-pulse"></div>
      </div>
    </>
  );
};

export default CursorEffect;
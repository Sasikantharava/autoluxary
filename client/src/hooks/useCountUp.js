import { useState, useEffect, useRef } from 'react';

export const useCountUp = (target, trigger) => {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (trigger && !animationRef.current) {
      animationRef.current = true;
      startTimeRef.current = Date.now();
      
      const duration = 2000; // 2 seconds
      const frameRate = 60;
      const totalFrames = duration / 1000 * frameRate;
      
      let frame = 0;
      
      const animate = () => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = Math.floor(progress * target);
        
        setCount(currentCount);
        
        if (frame < totalFrames) {
          intervalRef.current = requestAnimationFrame(animate);
        } else {
          setCount(target); // Ensure we reach the exact target
        }
      };
      
      intervalRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (intervalRef.current) {
        cancelAnimationFrame(intervalRef.current);
      }
    };
  }, [trigger, target]);

  return count;
};
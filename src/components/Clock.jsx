import React, { useEffect, useState, useRef } from 'react';

const Clock = ({ duration, start, onComplete, reset, onResetDone }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef = useRef(null);
  const lastTickRef = useRef(Date.now());
  const startTimeRef = useRef(null);
  
  useEffect(() => {
    if (intervalRef.current) {
      cancelAnimationFrame(intervalRef.current);
      intervalRef.current = null;
    }
    
    if (reset) {
      setTimeLeft(duration);
      lastTickRef.current = Date.now();
      startTimeRef.current = null;
      setTimeout(() => onResetDone(), 50);
      return;
    }
    
    if (start) {
      if (!startTimeRef.current) {
        startTimeRef.current = Date.now();
        lastTickRef.current = Date.now();
      }
      
      const updateTimer = () => {
        const now = Date.now();
        if (now - lastTickRef.current >= 100) {
          lastTickRef.current = now;
          
          setTimeLeft(prevTime => {
            const elapsedSeconds = (now - startTimeRef.current) / 1000;
            const newTime = Math.max(0, duration - elapsedSeconds);
            
            if (newTime <= 0 && prevTime > 0) {
              onComplete?.();
              return 0;
            }
            return newTime;
          });
        }
        if (timeLeft > 0) {
          intervalRef.current = requestAnimationFrame(updateTimer);
        }
      };
      
      intervalRef.current = requestAnimationFrame(updateTimer);
    } else {
      startTimeRef.current = null;
    }
    
    return () => {
      if (intervalRef.current) {
        cancelAnimationFrame(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [start, reset, duration, onComplete, onResetDone]);
  
  const timeFormat = (sec) => {
    const min = Math.floor(sec / 60);
    const rem = Math.floor(sec % 60);
    return `${String(min).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };
  
  return (
    <div className='text-xl font-semibold mb-4'>
      Time Left: {timeFormat(timeLeft)}
    </div>
  );
};

export default React.memo(Clock);
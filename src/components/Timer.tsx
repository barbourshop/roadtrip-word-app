import { useEffect, useCallback } from 'react';

interface TimerProps {
  timeRemaining: number;
  isPlaying: boolean;
  onTimeUpdate: (newTime: number) => void;
  onTimeUp: () => void;
}

export function Timer({ timeRemaining, isPlaying, onTimeUpdate, onTimeUp }: TimerProps) {
  const updateTimer = useCallback(() => {
    if (timeRemaining <= 1) {
      onTimeUpdate(0);
      onTimeUp();
      return;
    }
    onTimeUpdate(timeRemaining - 1);
  }, [timeRemaining, onTimeUp, onTimeUpdate]);

  useEffect(() => {
    let interval: number | undefined;
    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(updateTimer, 1000);
    } else if (timeRemaining === 0 && isPlaying) {
      onTimeUp();
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeRemaining, updateTimer, onTimeUp]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="text-6xl font-mono font-bold">
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
}
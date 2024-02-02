'use client';

import { useEffect, useState } from "react";

interface TimeContentsProps {
  startTime: string;
}
export default function TimeContents({ startTime }: TimeContentsProps) {
  const [timeElapsed, setTimeElapsed] = useState<number | null>(null);

  useEffect(() => {
    const calculateTimeElapsed = () => {
      const targetTime = new Date(startTime).getTime();
      const currentTime = new Date().getTime();
      const difference = currentTime - targetTime;

      if (difference >= 0) {
        setTimeElapsed(difference);
      } else {
        setTimeElapsed(null);
      }
    };

    calculateTimeElapsed(); // Initial calculation

    // Update the timer every second
    const intervalId = setInterval(calculateTimeElapsed, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [startTime]);

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

    if (minutes == 0) {
      return "now";
    } else if (hours == 0) {
      return `${minutes} min${minutes > 1 ? 's' : ''}`;
    } else if (days == 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else {
      return `${days} day${days > 1 ? 's' : ''}`;
    }
  };

  return (
    <div>
      {timeElapsed !== null ? (
        <p className="min-w-16 text-gray-400">{formatTime(timeElapsed)}</p>
      ) : (
        <div className="min-w-16"/>
      )}
    </div>
  );
};

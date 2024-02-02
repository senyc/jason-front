'use client';

import { useEffect, useState } from "react";

interface AccountAgeProps {
  accountAge: string;
}
export default function AccountAge({ accountAge }: AccountAgeProps) {
  const [timeElapsed, setTimeElapsed] = useState<number | null>(null);

  useEffect(() => {
    const calculateTimeElapsed = () => {
      const targetTime = new Date(accountAge).getTime();
      const currentTime = new Date().getTime();
      const difference = currentTime - targetTime;

      if (difference >= 0) {
        setTimeElapsed(difference);
      } else {
        setTimeElapsed(null);
      }
    };

    calculateTimeElapsed();
  }, [accountAge]);

  const formatTime = (milliseconds: number) => {
    const months = Math.floor(milliseconds / (1000 * 60 * 60 * 24 * 30));
    return `${months} months`;
  };

  return (
    <div>
      {timeElapsed !== null ? (
        <p className="min-w-16">Account Age: {formatTime(timeElapsed)}</p>
      ) : (
        <div className="min-w-16" />
      )}
    </div>
  );
}

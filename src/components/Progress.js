import React, { useEffect, useState } from 'react';

const PERIOD = 100;

export const Progress = (props) => {
  const { radius, stroke, time, isRunning } = props;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const max = time * 1000;
  const [currentTimeInMillis, setCurrentTimeInMillis] = useState(max);

  useEffect(() => setCurrentTimeInMillis(max), [max]);

  useEffect(() => {
    if (isRunning && currentTimeInMillis > 0) {
      setTimeout(() => {
        setCurrentTimeInMillis(currentTimeInMillis - PERIOD);
      }, PERIOD);
    }
  }, [isRunning, currentTimeInMillis]);

  const progress = currentTimeInMillis / max;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} className='progress-overlay'>
      <circle
        stroke='var(--accent)'
        fill='transparent'
        strokeWidth={stroke}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset }}
        stroke-width={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

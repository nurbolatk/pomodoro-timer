import React from 'react';

export const Progress = ({ progress }) => {
  const newDashArray = (progress * 846).toFixed(0);
  return (
    <svg className='progress-overlay'>
      <circle
        r={135}
        cx={150}
        cy={150}
        className={`progress-bar`}
        stroke='var(--accent)'
        fill='none'
        stroke-width='8'
        stroke-linecap='round'
        strokeDasharray={`${newDashArray} 846`}
      />
    </svg>
  );
};

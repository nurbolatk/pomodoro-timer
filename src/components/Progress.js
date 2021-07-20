import { useEffect, useState } from 'react'

export const Progress = ({ current, max, isRunning }) => {
  const [animationDuration, setAnimationDuration] = useState(current)

  useEffect(() => {
    if (isRunning) {
      setAnimationDuration(current - 1)
    }
  }, [current, isRunning])

  const progress = animationDuration / max
  const newDashArray = (progress * 846).toFixed(0)
  return (
    <svg className="progress-overlay">
      <circle
        r={135}
        cx={150}
        cy={150}
        className={`animated`}
        stroke="var(--accent)"
        fill="none"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={`${newDashArray} 846`}
      />
    </svg>
  )
}

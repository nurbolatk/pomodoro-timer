import { useEffect, useState } from 'react'

export function Timer() {
  const [currentState, setCurrentState] = useState({
    state: 'work',
    duration: 6,
  })

  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    console.log('am i running')
    if (isRunning) {
      console.log('what about me?')
      const now = Date.now()
      const then = now + currentState.duration * 1000

      const timer = setTimeout(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000)
        console.log('is this it?', secondsLeft)
        if (secondsLeft >= 0) {
          setCurrentState({
            state: currentState.state,
            duration: secondsLeft,
          })
        }
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isRunning, currentState])

  return (
    <div>
      <article>{currentState.duration}</article>
      <button onClick={() => setIsRunning(true)}>start</button>
    </div>
  )
}

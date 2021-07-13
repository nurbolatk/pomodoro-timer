import { useContext, useEffect, useState } from 'react'
import { PomodoroModesContext } from '../App'
import { displayTimeLeft } from '../utils'
import { Progress } from './Progress'
import { TabGroup } from './TabGroup'

export function Timer() {
  const modes = useContext(PomodoroModesContext)

  const [currentState, setCurrentState] = useState({
    state: 'work',
    duration: modes.work,
    isRunning: false,
  })

  const [animationDuration, setAnimationDuration] = useState(currentState.duration)

  useEffect(() => {
    if (currentState.isRunning) {
      setAnimationDuration(currentState.duration - 1)

      const now = Date.now()
      const then = now + currentState.duration * 1000

      const timer = setTimeout(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000)

        if (secondsLeft > 0) {
          setCurrentState({
            ...currentState,
            state: currentState.state,
            duration: secondsLeft,
          })
          setAnimationDuration(secondsLeft - 1)
        } else {
          if (currentState.state === 'work') {
            setCurrentState({
              state: 'short',
              duration: modes.short,
              isRunning: false,
            })
            setAnimationDuration(modes.short)
          } else {
            setCurrentState({
              state: 'work',
              duration: modes.work,
              isRunning: false,
            })
            setAnimationDuration(modes.work)
          }
        }
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [currentState, modes])

  function changeState(newState) {
    setCurrentState({
      state: newState,
      duration: modes[newState],
      isRunning: false,
    })
    setAnimationDuration(modes[newState])
  }

  function toggleIsRunning() {
    setCurrentState({
      ...currentState,
      isRunning: !currentState.isRunning,
    })
  }

  return (
    <main>
      <TabGroup currentState={currentState.state} onTabClick={changeState} />
      <button onClick={toggleIsRunning} className="timer-container">
        <div className="time">{displayTimeLeft(currentState.duration)}</div>
        <p className="timer-controls">{currentState.isRunning ? 'pause' : 'start'}</p>
        <Progress progress={animationDuration / modes[currentState.state]} />
      </button>
    </main>
  )
}

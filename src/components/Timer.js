import { useContext, useEffect } from 'react'
import { PomodoroModesContext } from '../App'
import { displayTimeLeft } from '../utils'
import { Progress } from './Progress'
import { TabGroup } from './TabGroup'

export function Timer() {
  const { state, resetTimer, tick, toggleIsRunning, durations: modes } = useContext(PomodoroModesContext)

  useEffect(() => {
    if (state.isRunning) {
      const now = Date.now()
      const then = now + state.duration * 1000

      const timer = setTimeout(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000)

        if (secondsLeft > 0) {
          tick(secondsLeft)
        } else {
          if (state.name === 'work') {
            resetTimer('short')
          } else if (state.name === 'short') {
            resetTimer('long')
          } else {
            resetTimer('work')
          }
        }
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [state, resetTimer, tick])

  function changeState(newState) {
    resetTimer(newState)
  }

  return (
    <main>
      <TabGroup currentState={state.name} onTabClick={changeState} />
      <button onClick={toggleIsRunning} className="timer-container">
        <div className="time">{displayTimeLeft(state.duration)}</div>
        <p className="timer-controls">{state.isRunning ? 'pause' : 'start'}</p>
        <Progress key={state.name} max={modes[state.name]} current={state.duration} isRunning={state.isRunning} />
      </button>
    </main>
  )
}

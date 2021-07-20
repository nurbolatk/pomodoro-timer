import React from 'react'
import { Timer } from './components/Timer'

export const PomodoroModesContext = React.createContext()

const durations = {
  work: 3, //  * 60,
  short: 2, //  * 60,
  long: 1, //  * 60,
}

const types = {
  toggleIsRunning: 'TOGGLE_IS_RUNNING',
  resetTimer: 'RESET_STATE',
  tick: 'TICK',
}

const actions = {
  toggleIsRunning: { type: types.toggleIsRunning },
  resetTimer(newState) {
    return {
      type: types.resetTimer,
      payload: newState,
    }
  },
  tick(newDuration) {
    return {
      type: types.tick,
      payload: newDuration,
    }
  },
}

function pomodoroReducer(state, action) {
  switch (action.type) {
    case types.toggleIsRunning:
      return { ...state, isRunning: !state.isRunning }
    case types.resetTimer:
      return { isRunning: false, name: action.payload, duration: durations[action.payload] }
    case types.tick:
      return { ...state, duration: action.payload }
    default:
      return state
  }
}

function PomodoroModesContextProvider({ children }) {
  const defaultState = React.useRef({
    name: 'work',
    duration: durations.work,
    isRunning: false,
  })
  const [state, dispatch] = React.useReducer(pomodoroReducer, defaultState.current)

  function toggleIsRunning() {
    dispatch(actions.toggleIsRunning)
  }

  function resetTimer(newState) {
    dispatch(actions.resetTimer(newState))
  }

  function tick(newDuration) {
    dispatch(actions.tick(newDuration))
  }

  const values = {
    state,
    toggleIsRunning,
    resetTimer,
    tick,
    durations,
  }

  return <PomodoroModesContext.Provider value={values}>{children}</PomodoroModesContext.Provider>
}

function App() {
  return (
    <PomodoroModesContextProvider>
      <h1>pomodoro</h1>
      <Timer />
    </PomodoroModesContextProvider>
  )
}

export default App

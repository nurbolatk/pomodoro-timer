import { createContext } from 'react'
import { Timer } from './components/Timer'

export const PomodoroModesContext = createContext()

const durations = {
  work: 3, //  * 60,
  short: 2, //  * 60,
  long: 1, //  * 60,
}

function App() {
  return (
    <PomodoroModesContext.Provider value={durations}>
      <h1>pomodoro</h1>
      <Timer />
    </PomodoroModesContext.Provider>
  )
}

export default App

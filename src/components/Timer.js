import { useEffect, useState } from 'react';
import { Progress } from './Progress';

function displayTimeLeft(secondsLeft) {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  return `${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
  if (number < 10) {
    return `0${number}`;
  }
  return number.toString();
}

export function Timer() {
  const [currentState, setCurrentState] = useState({
    initial: 25,
    state: 'work',
    duration: 25,
  });

  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const now = Date.now();
      const then = now + currentState.duration * 1000;

      const timer = setTimeout(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if (secondsLeft >= 0) {
          setCurrentState({
            ...currentState,
            state: currentState.state,
            duration: secondsLeft,
          });
        } else {
          setCurrentState({
            ...currentState,
            duration: currentState.initial,
          });
          setIsRunning(false);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isRunning, currentState]);

  return (
    <main>
      <div className='tab-group'>
        <button
          className={`tab ${currentState.state === 'work' ? 'active' : ''}`}
          onClick={() =>
            setCurrentState({
              initial: 25,
              state: 'work',
              duration: 25,
            })
          }
        >
          pomodoro
        </button>
        <button
          className={`tab ${currentState.state === 'short' ? 'active' : ''}`}
          onClick={() =>
            setCurrentState({
              initial: 5,
              state: 'short',
              duration: 5,
            })
          }
        >
          short break
        </button>
        <button
          className={`tab ${currentState.state === 'long' ? 'active' : ''}`}
          onClick={() =>
            setCurrentState({
              initial: 20,
              state: 'long',
              duration: 20,
            })
          }
        >
          long break
        </button>
      </div>
      <button
        onClick={() => setIsRunning(!isRunning)}
        className='timer-container'
      >
        <div className='time'>{displayTimeLeft(currentState.duration)}</div>
        <p className='timer-controls'>{isRunning ? 'pause' : 'start'}</p>
        <Progress progress={currentState.duration / currentState.initial} />
      </button>
    </main>
  );
}

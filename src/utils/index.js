function pad(number) {
  if (number < 10) {
    return `0${number}`
  }
  return number.toString()
}

export function displayTimeLeft(secondsLeft) {
  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60
  return `${pad(minutes)}:${pad(seconds)}`
}

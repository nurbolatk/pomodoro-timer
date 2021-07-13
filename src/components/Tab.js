export function Tab({ isActive, onClick, title, index }) {
  function handleClick() {
    onClick(index)
  }

  return (
    <button className={`tab ${isActive ? 'active' : ''}`} onClick={handleClick}>
      {title}
    </button>
  )
}

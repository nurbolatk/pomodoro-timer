import { Tab } from './Tab'

const tabs = [
  {
    title: 'pomodoro',
    index: 'work',
  },
  {
    title: 'short break',
    index: 'short',
  },
  {
    title: 'long break',
    index: 'long',
  },
]

export function TabGroup({ currentState, onTabClick }) {
  return (
    <div className="tab-group">
      {tabs.map((tab) => (
        <Tab
          key={tab.index}
          title={tab.title}
          index={tab.index}
          isActive={currentState === tab.index}
          onClick={() => {
            onTabClick(tab.index)
          }}
        />
      ))}
    </div>
  )
}

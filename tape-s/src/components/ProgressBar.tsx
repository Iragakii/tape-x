import { useEffect, useState } from 'react'
import './ProgressBar.css'

interface ProgressBarProps {
  completedCount: number
  totalCount: number
}

export default function ProgressBar({ completedCount, totalCount }: ProgressBarProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Calculate overall progress percentage
    const percentage = totalCount > 0 
      ? Math.round((completedCount / totalCount) * 100)
      : 0
    setProgress(percentage)
  }, [completedCount, totalCount])

  return (
    <div className='progress-bar-container'>
      <div className='progress-header'>
        <span className='progress-label'>Overall Progress</span>
        <span className='progress-percentage'>{progress}%</span>
      </div>
      <div className='progress-track'>
        <div 
          className='progress-fill'
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className='progress-counter'>
        <span>{completedCount} of {totalCount} completed input</span>
      </div>
    </div>
  )
}


import { useState } from 'react'
import './App.css'
import TapedInput from './components/TapedInput'
import ProgressBar from './components/ProgressBar'

function App() {
  const [completedInputs, setCompletedInputs] = useState(new Set<string>())
  const totalInputs = 6

  const handleInputComplete = (id: string) => {
    setCompletedInputs(prev => {
      const newSet = new Set(prev)
      newSet.add(id)
      return newSet
    })
  }

  return (
    <div>
      
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-8'>
      {/* Progress Bar */}
      <ProgressBar completedCount={completedInputs.size} totalCount={totalInputs} />

      <div className='text-center'>
        {/* Top row of taped inputs */}
        <div className='flex space-between '>
          <TapedInput placeholder='Schema' color='text-red-600' id='schema' onComplete={handleInputComplete} />
          <TapedInput placeholder='Domain' color='text-yellow-300' id='domain' onComplete={handleInputComplete} />
          <TapedInput placeholder='Query' color='text-purple-400' id='query' onComplete={handleInputComplete} />
        </div>

        {/* URL Image */}
        <img src='/url.jpg' alt='URL structure' className='w-full max-w-sm h-auto  rounded ml-60' />

        {/* Bottom row of taped inputs */}
        <div className='flex space-between'>
          <TapedInput placeholder='Subdomain' color='text-blue-900' id='subdomain' onComplete={handleInputComplete} />
          <TapedInput placeholder='Path' color='text-green-300' id='path' onComplete={handleInputComplete} />
          <TapedInput placeholder='Fragment' color='text-blue-400' id='fragment' onComplete={handleInputComplete} />
        </div>
      </div>
    </div>
    </div>
  )
}

export default App

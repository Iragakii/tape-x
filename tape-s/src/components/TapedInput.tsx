import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import './TapedInput.css'

interface TapedInputProps {
  placeholder: string
  color: string
  id: string
  onComplete?: (id: string) => void
}

const colorMap: Record<string, { bg: string; text: string }> = {
  'text-red-600': { bg: '#dc2626', text: '#6d6d6d' },
  'text-yellow-300': { bg: '#fcd34d', text: '#6d6d6d' },
  'text-purple-400': { bg: '#c084fc', text: '#6d6d6d' },
  'text-blue-900': { bg: '#1e3a8a', text: '#ffffff' },
  'text-green-300': { bg: '#86efac', text: '#6d6d6d' },
  'text-blue-400': { bg: '#60a5fa', text: '#6d6d6d' },
}

export default function TapedInput({ placeholder, color, id, onComplete }: TapedInputProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const backRef = useRef<SVGGElement>(null)
  const maskBackRef = useRef<SVGPathElement>(null)
  const maskFrontRef = useRef<SVGPathElement>(null)
  const textBackRef = useRef<SVGTextElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isAnimated, setIsAnimated] = useState(false)
  const hasAnimated = useRef(false)

  const colors = colorMap[color] || colorMap['text-red-600']

  // Initialize positions on mount
  useEffect(() => {
    if (!svgRef.current || !backRef.current || !maskFrontRef.current) return

    gsap.set(svgRef.current, { autoAlpha: 1 })
gsap.set(backRef.current, { rotation: -25, svgOrigin: '0 90', x: '-=7', y: '+=9.8' })
    gsap.set(maskFrontRef.current, { x: -370 })
  }, [])

  useEffect(() => {
    if (!svgRef.current || !backRef.current || !maskBackRef.current || !maskFrontRef.current || !textBackRef.current) return

    const handleClick = () => {
      if (hasAnimated.current) return

      hasAnimated.current = true
      setIsAnimated(true)

      // Animate
      const timeline = gsap.timeline({
        defaults: { duration: 4, ease: 'none' },
      })

      timeline.to([maskBackRef.current, maskFrontRef.current, textBackRef.current, backRef.current], {
        x: '+=250',
      })

      // Fade out and show input after animation
      setTimeout(() => {
        if (svgRef.current) {
          gsap.to(svgRef.current, {
            opacity: 0,
            pointerEvents: 'none',
            duration: 0.5,
          })
        }
      }, 3500)

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.style.pointerEvents = 'auto'
          inputRef.current.style.opacity = '1'
          inputRef.current.focus()
        }
      }, 4000)
    }

    svgRef.current.addEventListener('click', handleClick)

    return () => {
      svgRef.current?.removeEventListener('click', handleClick)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const placeholderLower = placeholder.toLowerCase()
    const valueLower = value.toLowerCase()
    
    // Check if input is complete (matches placeholder)
    if (valueLower === placeholderLower && onComplete) {
      onComplete(id)
    }
  }

  return (
    <div className='tape-svg-container'>
      <svg
        ref={svgRef}
        id={id}
        viewBox='0 0 400 150'
        className='tape-svg'
      >
        <defs>
          <style>{`
            .tape-text { font-family: Arial, sans-serif; font-weight: 600; font-size: 12px; }
          `}</style>

          {/* Mask for back (rolled tape) */}
          <mask id={`maskBack-${id}`}>
            <rect fill='white' x='0' y='0' width='400' height='150' />
            <path ref={maskBackRef} className='maskBack' fill='black' d='M 0 88 L 400 88 L 400 117 L 0 117 z' />
            <path className='maskSpecialforText' fill='black' d='M -100 90 L 30 90 L 30 117 L -100 117 z' />
          </mask>

          {/* Mask for front (visible tape) */}
          <mask id={`maskFront-${id}`}>
            <rect fill='white' x='0' y='0' width='400' height='150' />
            <path ref={maskFrontRef} className='maskFront' fill='black' d='M 30 90 L 388 90 L 400 117 L 30 117 z' />
          </mask>
        </defs>

        {/* Front layer - visible tape */}
<g className='front' mask={`url(#maskFront-${id})`}>
  <rect fill={colors.bg} x='30' y='90' width='270' height='25' rx='5' ry='5' />
  <text className='tape-text' x='32' y='107' fill={colors.text}>
    {placeholder} 
  </text>
</g>

{/* Back layer - rolled tape */}
<g className='back' ref={backRef} mask={`url(#maskBack-${id})`}>
  <rect className='fond' fill={colors.bg} x='30' y='88' width='270' height='27' rx='5' ry='5' />
  <text ref={textBackRef} className='textBack tape-text' x='-270' y='107' fill={colors.text}>
    {placeholder} {placeholder} {placeholder}  {placeholder}  
  </text>
</g>
      </svg>

      {/* Input field */}
      {isAnimated && (
        <input
          ref={inputRef}
          type='text'
          placeholder={placeholder}
          className={`tape-input-field ${color}`}
          onChange={handleInputChange}
        />
      )}
    </div>
  )
}
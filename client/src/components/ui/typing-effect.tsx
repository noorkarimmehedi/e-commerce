import { useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
function cn(...inputs: any[]) { return twMerge(clsx(inputs)) }

interface TypingEffectProps {
  texts?: string[]
  className?: string
}

export const TypingEffect = ({
  texts,
  className,
}: TypingEffectProps) => {
  const [displayed, setDisplayed] = useState('')
  const text = texts?.[0] ?? ''
  const indexRef = useRef(0)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    indexRef.current = 0
    setDisplayed('')

    const type = () => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1))
        indexRef.current++
        frameRef.current = window.setTimeout(type, 180)
      }
    }

    frameRef.current = window.setTimeout(type, 1200)

    return () => clearTimeout(frameRef.current)
  }, [text])

  return (
    <span className={cn('inline-block', className)}>
      {displayed}
    </span>
  )
}

export default TypingEffect

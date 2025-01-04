import React, { useState, useEffect } from 'react'
import './Fade.css'

export default function InstructionText() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, 5000)
    
    setVisible(true)
    console.log('created')
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`instruction-text ${visible ? 'fade-in' : 'fade-out'}`}>
      Welcome to my Portfolio! Find a "magic birdie" in each room to unlock the next. Use arrow keys to navigate and click on interactive elements to explore.
    </div>
  )
}


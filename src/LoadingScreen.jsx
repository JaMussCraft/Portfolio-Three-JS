import { useEffect } from 'react'
import './LoadingScreen.css'
import { Html, useProgress } from '@react-three/drei'

export default function LoadingScreen({ onLoad }) {
  const { progress } = useProgress()

  useEffect(() => {
    if (progress >= 100.0) {
      console.log('loading complete')
      onLoad()
    } else {
      console.log('loading...', progress)
    }
  }, [progress])

  return (
    <Html>
      <div className="loading-screen">
        <div className="loading-bar" style={{ width: `${progress}%` }}></div>
      </div>
    </Html>
  )
}

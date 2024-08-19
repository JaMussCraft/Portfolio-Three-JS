import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import RoomNavigator from './RoomNavigator.jsx'
import { Suspense, useEffect, useState } from 'react'
import LoadingScreen from './LoadingScreen.jsx'
import { LoadingManager } from 'three'
import StartScreen from './StartScreen.jsx'
import { Html, Loader, useProgress } from '@react-three/drei'
import './LoadingScreen.css'


export default function App() {
  const [currentRoom, setCurrentRoom] = useState(0)
  const [unlockRoom, setUnlockRoom] = useState(0) // unlockRoom = max index of unlocked rooms

  const switchRoom = (direction, newRoom) => {
    if (direction) {
      setCurrentRoom((prevRoom) => {
        const newRoomIndex = (prevRoom + direction + 4) % 4
        return newRoomIndex
      })
    } else if (newRoom !== undefined) {
      setCurrentRoom(newRoom)
    }
  }

  const [loaded, setLoaded] = useState(false)
  const [started, setStarted] = useState(false)

  const { progress } = useProgress()

  useEffect(() => {
    if (progress >= 100.0) {
      console.log('loading complete')
      handleLoad()
    } else {
      console.log('loading...', progress)
    }
  }, [progress])

  const handleLoad = () => {
    setLoaded(true)
  }

  const handleStart = () => {
    setStarted(true)
  }

  const handleCubeClick = () => {
    if (unlockRoom < 3) {
      setUnlockRoom((prevUnlockRoom) => {
        setCurrentRoom(prevUnlockRoom + 1)
        return prevUnlockRoom + 1
      })
    }
  }


  return (
    <>
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [5, 5, 5],
        }}
      >
        <Suspense fallback={null}>
          <Experience currentRoom={currentRoom} />

          <mesh position={[0, 0, 0]} onClick={handleCubeClick}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="blue" />
          </mesh>

          <axesHelper args={[7]} />
        </Suspense>
      </Canvas>

      <Loader/>


      {loaded && started && (
        <RoomNavigator
          currentRoom={currentRoom}
          unlockRoom={unlockRoom}
          onSwitchRoom={switchRoom}
        />
      )}

      {loaded && !started && <StartScreen onStart={handleStart} />}
    </>
  )
}

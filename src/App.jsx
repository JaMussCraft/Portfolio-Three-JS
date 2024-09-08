import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import RoomNavigator from './RoomNavigator.jsx'
import { Suspense, useEffect, useState } from 'react'
import { Html, Loader, useProgress, Text } from '@react-three/drei'
import './Fade.css'
import CustomLoader from './CustomLoader.jsx'
import { Leva, useControls } from 'leva'

export default function App() {
  const [currentRoom, setCurrentRoom] = useState(0)
  const [unlockRoom, setUnlockRoom] = useState(0) // unlockRoom = max index of unlocked rooms

  const [fade, setFade] = useState(false)

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
      setLoaded(true)
    } else {
      console.log('loading...', progress)
    }
  }, [progress])

  const handleStart = () => {
    if (loaded) setStarted(true)

    // !!!: play sound effect...
  }

  const handleCubeClick = () => {
    if (unlockRoom < 3) {
      setUnlockRoom((prevUnlockRoom) => {
        setCurrentRoom(prevUnlockRoom + 1)
        return prevUnlockRoom + 1
      })
      setFade(false)
    }
  }

  const handleTransitionComplete = () => {
    setShowTransition(false)
  }

  // LEVA
  const { props } = useControls({
    TriggerFunction: {
      value: false,
      onChange: (value) => {
        // setFade(!fade)
        console.log('fade changed to', fade)
      },
    },
  })

  console.log('fade is', fade)

  return (
    <>
      <Leva />
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [5, 5, 5],
        }}
      >
        <Experience currentRoom={currentRoom} loaded={loaded} started={started} setFade={setFade} />

        <mesh position={[0, 0, 0]} onClick={handleCubeClick}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="blue" />
        </mesh>

        <axesHelper args={[7]} />

        {!started && <CustomLoader progress={progress} loaded={loaded} onStart={handleStart} />}
      </Canvas>

      <div className={`fade-overlay ${fade ? '' : 'hidden'}`}></div>

      {loaded && started && (
        <RoomNavigator
          currentRoom={currentRoom}
          unlockRoom={unlockRoom}
          onSwitchRoom={switchRoom}
        />
      )}
    </>
  )
}

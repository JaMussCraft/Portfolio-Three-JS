import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import RoomNavigator from './RoomNavigator.jsx'
import { Suspense, useEffect, useState } from 'react'
import { Html, Loader, useProgress, Text } from '@react-three/drei'
import './Fade.css'
import CustomLoader from './CustomLoader.jsx'
import { Leva, useControls } from 'leva'
import MagicBirdie from './MagicBirdie.jsx'


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

  const handleClick = (event) => {
    const intersections = event.intersections;
    console.log(intersections[0].distance)

    if (unlockRoom < 3 && intersections[0].distance < 6) {
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

        {!started && <CustomLoader progress={progress} loaded={loaded} onStart={handleStart} />}

        <MagicBirdie handleClick={handleClick} position={[1.1,0.5,-0.2]}/>
        <MagicBirdie handleClick={handleClick} position={[-0.15,1.25,-1.78]}/>
        <MagicBirdie handleClick={handleClick} position={[-0.7,0.37,0.2]}/>
        <MagicBirdie handleClick={handleClick} position={[1,0.1,1]}/>


        <axesHelper args={[7]} />

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

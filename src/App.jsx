import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import RoomNavigator from './RoomNavigator.jsx'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Loader, useProgress } from '@react-three/drei'
import './Fade.css'
import MagicBirdie from './MagicBirdie.jsx'
import StartScreen from './StartScreen.jsx'
import roomTransitionSound from '../public/sounds/room_transition_sound.mp3' 

export default function App() {
  const [currentRoom, setCurrentRoom] = useState(0)
  const [unlockRoom, setUnlockRoom] = useState(0) // unlockRoom = max index of unlocked rooms

  const [fade, setFade] = useState(false)

  const roomTransitionSoundRef = useRef(new Audio(roomTransitionSound))
  roomTransitionSoundRef.current.volume = 0.5
  const playRoomTransitionSound = () => {
    if (!roomTransitionSoundRef.current.paused) {
      return
    }
    roomTransitionSoundRef.current.play()
  }

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
      setLoaded(true)
    }
  }, [progress])

  const handleStart = () => {
    if (loaded) setStarted(true)
  }

  const handleClick = (event) => {
    const intersections = event.intersections

    if (unlockRoom < 3 && intersections[0].distance < 6) {
      playRoomTransitionSound()
      setUnlockRoom((prevUnlockRoom) => {
        setCurrentRoom(prevUnlockRoom + 1)
        return prevUnlockRoom + 1
      })
      setFade(false)
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
          <Experience
            currentRoom={currentRoom}
            loaded={loaded}
            started={started}
            setFade={setFade}
          />
          <MagicBirdie handleClick={handleClick} position={[1.1, 0.48, -0.2]} />
          <MagicBirdie handleClick={handleClick} position={[-0.15, 1.21, -1.78]} />
          <MagicBirdie handleClick={handleClick} position={[-0.7, 0.35, 0.2]} />
          {!started && <StartScreen onStart={handleStart} />}
        </Suspense>
      </Canvas>
      <Loader />
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

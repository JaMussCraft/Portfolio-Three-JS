import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import RoomNavigator from './RoomNavigator.jsx'
import { useState } from 'react'

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

  const handleCubeClick = () => {
    if (unlockRoom < 3) {
      setUnlockRoom((prevUnlockRoom) => {
        setCurrentRoom(prevUnlockRoom+1)
        return prevUnlockRoom+1
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
        <Experience currentRoom={currentRoom} />

        <mesh position={[0, 0, 0]} onClick={handleCubeClick}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="blue" />
        </mesh>
      </Canvas>

      <RoomNavigator currentRoom={currentRoom} unlockRoom={unlockRoom} onSwitchRoom={switchRoom} />
    </>
  )
}
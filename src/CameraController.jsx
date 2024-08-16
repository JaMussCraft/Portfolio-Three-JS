import { useState, useEffect } from 'react'
import { useThree } from '@react-three/fiber'

export default function CameraController({ currentRoom }) {
  const cameraPositions = [
    [4, 3, -4], // work room
    [-4, 3, -4], // play room
    [-4, 3, 4], // about room
    [4, 3, 4], // contact room
  ]

  // update camera position and angle
  const { camera } = useThree()
  camera.position.set(...cameraPositions[currentRoom])
  camera.lookAt(0, 0, 0)

  return null
}

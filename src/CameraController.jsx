import { useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'

export default function CameraController({ currentRoom, loaded, started, setFade }) {
  const cameraPositions = [
    [4, 3, -4], // work room
    [-4, 3, -4], // play room
    [-4, 3, 4], // about room
    [4, 3, 4], // contact room
    [0, 30, 0], // loading screen angle
  ]

  // update camera position and angle
  const { camera } = useThree()

  // room transition animation sequence
  const tl = gsap.timeline()

  useEffect(() => {
    if (!loaded || !started) {
      camera.position.set(...cameraPositions[4])
    } else {
      // room transitions
      if (camera.position.y <= 10) {
        setFade(true)

        tl.to(camera.position, {
          x: cameraPositions[currentRoom][0] / 2,
          y: cameraPositions[currentRoom][1] / 2,
          z: cameraPositions[currentRoom][2] / 2,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => {
            setFade(false)
          },
        }).to(camera.position, {
          x: cameraPositions[currentRoom][0],
          y: cameraPositions[currentRoom][1],
          z: cameraPositions[currentRoom][2],
          duration: 0.8,
          ease: 'power2.out',
        })
      } else {
        // start screen to main screen transition
        tl.to(camera.position, {
          x: cameraPositions[currentRoom][0],
          y: cameraPositions[currentRoom][1],
          z: cameraPositions[currentRoom][2],
          duration: 0.8,
          ease: 'power2.out',
        })
      }
    }
  }, [currentRoom, loaded, started])

  // if (!loaded) camera.position.set(...cameraPositions[4])
  // else if (!started) camera.position.set(...cameraPositions[4])
  // else camera.position.set(...cameraPositions[currentRoom])

  useFrame(() => {
    camera.lookAt(0, 0, 0)
  })

  return <pointLight intensity={started ? 30.0 : 0.0} position={cameraPositions[currentRoom]} />
}

import { Suspense, useState, Shadow, useRef, useEffect } from 'react'
import { OrbitControls, Text, BakeShadows, SoftShadows } from '@react-three/drei'
import CameraController from './CameraController'
import MainModel from './MainModel'
import { Physics, RigidBody } from '@react-three/rapier'

export default function Experience({ currentRoom, loaded, started, setFade }) {
  return (
    <>
      <CameraController
        currentRoom={currentRoom}
        loaded={loaded}
        started={started}
        setFade={setFade}
      />

      <color args={['grey']} attach="background" />

      <OrbitControls makeDefault />

      <MainModel scale={started ? [1, 1, 1] : [0.1, 0.1, 0.1]} />

      <pointLight intensity={1000.0} position={[0, 20, 0]} />
    </>
  )
}

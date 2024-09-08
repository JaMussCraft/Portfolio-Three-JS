import { Suspense, useState } from 'react'
import { OrbitControls, Text } from '@react-three/drei'
import CameraController from './CameraController'
import MainModel from './MainModel'

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

      {/* <OrbitControls makeDefault /> */}

      <Suspense fallback={null}>
        <MainModel />
      </Suspense>

      <ambientLight intensity={2.0} />
    </>
  )
}

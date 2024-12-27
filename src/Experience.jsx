import { Suspense, useState } from 'react'
import { OrbitControls, Text } from '@react-three/drei'
import CameraController from './CameraController'
import MainModel from './MainModel'

export default function Experience({ currentRoom, loaded, started, setFade }) {
  console.log('experience rendered')
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

      <MainModel scale={started? [1,1,1]: [0.1,0.1,0.1]}/>

      <ambientLight intensity={2.0} />
    </>
  )
}

import { useState } from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import CameraController from './CameraController'


export default function Experience({ currentRoom }) {
  const model = useGLTF('./model/portfolio_nocap.glb')



  return (
    <>
      <CameraController currentRoom={currentRoom}/>

      <color args={['#008000']} attach="background" />

      <OrbitControls makeDefault />


      <primitive object={model.scene} />

      <ambientLight intensity={2.0} />
    </>
  )
}

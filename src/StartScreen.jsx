import { useState, useRef } from 'react'
import { useProgress, Text, Clone } from '@react-three/drei'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function StartScreen({ onStart }) {
  const model = useGLTF('./model/loading_screen_birdie.glb')
  const modelRef = useRef(null)

  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y -= 0.001
    }
  })

  return (
    <>
      <primitive
        object={model.scene}
        ref={modelRef}
        scale={hovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
      />

      <Text
        color='gold'
        anchorX='center'
        anchorY='middle'
        fontSize={1}
        textAlign='center'
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 5, 0]}
        onClick={onStart}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        START
      </Text>
    </>
  )
}

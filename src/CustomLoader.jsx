import { useEffect, useRef } from 'react'
import './CustomLoader.css'
import { useProgress, Text } from '@react-three/drei'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function CustomLoader({ progress, loaded, onStart }) {
  const model = useGLTF('./model/loading_screen_birdie.glb')

  const modelRef = useRef(null)

  useFrame(() => {
    if (modelRef.current && !loaded) {
      // birdie should start rotating slower as loading completes
      modelRef.current.rotation.y -= 0.5 * (100 / progress)
    }
  })

  return (
    <>
      <primitive object={model.scene} ref={modelRef} />

      <Text
        color="gold"
        anchorX="center"
        anchorY="middle"
        fontSize={1}
        textAlign="center"
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 5, 0]}
        onClick={onStart}
      >
        {!loaded ? `${progress.toFixed(2)}%` : 'Start'}
      </Text>
    </>
  )
}

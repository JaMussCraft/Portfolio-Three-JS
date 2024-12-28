import { useState, useRef } from 'react'
import { useGLTF, Clone, Center } from '@react-three/drei'

export default function MagicBirdie({ handleClick, position }) {
  const model = useGLTF('./model/magic_birdie.glb')

  const [hovered, setHovered] = useState(false)

  return (
    <group position={position} scale={hovered ? [1.1, 1.1, 1.1] : [1.2, 1.2, 1.2]}>
      <mesh
        onClick={handleClick}
        onPointerOver={() => {
          setHovered(true)
        }}
        onPointerOut={() => setHovered(false)}
        position={[0, -0.04, 0]}
        scale={[0.5, 0.8, 0.5]}
      >
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshStandardMaterial transparent={true} opacity={0.0} />
      </mesh>
      <Center>
        <Clone object={model.scene} color="blue" />
      </Center>
    </group>
  )
}

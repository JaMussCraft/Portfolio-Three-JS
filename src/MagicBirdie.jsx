import { useState } from 'react'
import { useGLTF, Clone } from '@react-three/drei'

export default function MagicBirdie({ handleClick, position }) {
  const model = useGLTF('./model/magic_birdie.glb')

  const [hovered, setHovered] = useState(false)

  return (
    <group position={position}>
      <mesh
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        position={[0,-0.04,0]}
        scale={[0.5,0.8,0.5]}
      >
        <boxGeometry args={[0.15, 0.15, 0.15]}/>
        <meshStandardMaterial transparent={true} opacity={0.5} />
      </mesh>
      <Clone
        object={model.scene}
        scale={hovered ? [0.006, 0.006, 0.006] : [0.005, 0.005, 0.005]}
        color="blue"
      />
    </group>
  )
}

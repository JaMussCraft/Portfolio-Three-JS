import { useState, useRef } from 'react'
import { Center, Html, Outlines, Text, useTexture } from '@react-three/drei'

export default function Project({ position, rotation, project }) {
  const [opened, setOpened] = useState(false)
  const [hovered, setHovered] = useState(false)

  const texture = useTexture(project.imagePath)

  return (
    <>
      <group position={position} rotation={rotation}>
        <mesh
          onClick={() => {
            setOpened(true)
          }}
          onPointerOver={() => {
            setHovered(true)
          }}
          onPointerOut={() => setHovered(false)}
        >
          <boxGeometry args={[0.02, 0.5, 0.8]} />
          <meshStandardMaterial map={texture} emissive="white" emissiveIntensity={0.03} />
          <Outlines thickness={hovered ? 5 : 0} color="yellow" />
        </mesh>

        <Text
          color="black"
          anchorX="center"
          anchorY="middle"
          rotation={[0, Math.PI * 0.5, 0]}
          scale={[0.1, 0.1, 0.1]}
          position={[0,-0.4,0]}
        >
          {project.shortTitle}
        </Text>
      </group>

      {opened && (
        <Html center>
          <>
            <div
              className="flex flex-col justify-center items-center"
              style={{
                width: '80vw',
                height: '80vh',
                backgroundColor: 'white',
                border: '1px solid black',
                borderRadius: '5px',
                padding: '20px',
                position: 'relative', // To position the close button
                zIndex: 1000, // Ensure modal is on top
              }}
            >
              <button
                onClick={() => {
                  setOpened(false)
                }}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: '1.2em',
                }}
              >
                ✖
              </button>

              <img
                src={project.imagePath}
                style={{
                  height: '30vh',
                  width: 'auto',
                  marginBottom: '15px',
                }}
                className="mx-auto rounded-lg shadow-lg mb-4"
              />

              <h1 className="text-center text-2xl font-bold mb-4">{project.title}</h1>
              <p className="text-center text-lg mb-4">{project.description}</p>
            </div>
          </>
        </Html>
      )}
    </>
  )
}

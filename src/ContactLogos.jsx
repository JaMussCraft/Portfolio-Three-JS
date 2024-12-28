import { useState, useRef, useEffect, useMemo } from 'react'
import { Center, Outlines, useGLTF } from '@react-three/drei'
import linkedInSound from '../public/sounds/linkedin_sound.mp3'
import gitHubSound from '../public/sounds/github_sound.mp3'
import gmailSound from '../public/sounds/gmail_sound.mp3'
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier'

export default function ContactLogos({ position }) {
  const linkedInModel = useGLTF('./model/linkedin_logo.glb')
  const gitHubModel = useGLTF('./model/github_logo.glb')
  const gmailModel = useGLTF('./model/gmail_logo.glb')
  const [linkedInCanHover, setLinkedInCanHover] = useState(true)
  const [gitHubCanHover, setGitHubCanHover] = useState(true)
  const [gmailCanHover, setGmailCanHover] = useState(true)

  const linkedInRef = useRef()
  const gitHubRef = useRef()
  const gmailRef = useRef()

  const linkedInSoundRef = useRef(new Audio(linkedInSound))
  linkedInSoundRef.current.volume = 0.8
  const playLinkedInSound = () => {
    if (!linkedInSoundRef.current.paused) {
      return
    }
    linkedInSoundRef.current.play()
  }
  const gitHubSoundRef = useRef(new Audio(gitHubSound))
  gitHubSoundRef.current.volume = 0.5
  const playGitHubSound = () => {
    if (!gitHubSoundRef.current.paused) {
      return
    }
    gitHubSoundRef.current.play()
  }
  const gmailSoundRef = useRef(new Audio(gmailSound))
  gmailSoundRef.current.volume = 0.3
  const playGmailSound = () => {
    if (!gmailSoundRef.current.paused) {
      return
    }
    gmailSoundRef.current.play()
  }

  const linkedInClick = (event) => {
    const distance = event.intersections[0].distance
    if (distance < 5) window.open('https://www.linkedin.com/in/singhiengwong/', '_blank')
  }
  const gitHubClick = (event) => {
    const distance = event.intersections[0].distance
    if (distance < 5) window.open('https://github.com/JaMussCraft', '_blank')
  }
  const gmailClick = (event) => {
    const distance = event.intersections[0].distance
    if (distance < 5) window.open('mailto:shwo225@uky.edu', '_blank')
  }

  const handleLinkedInHover = (event) => {
    const distance = event.intersections[0].distance
    if (!linkedInCanHover || distance > 5) return

    linkedInRef.current.applyImpulse({ x: 0, y: 0.1, z: 0 }, true)
    linkedInRef.current.applyTorqueImpulse({ x: 0, y: 0.01, z: 0 }, true)
    playLinkedInSound()

    setLinkedInCanHover(false)
    setTimeout(() => setLinkedInCanHover(true), 2000)
  }
  const handleGitHubHover = (event) => {
    const distance = event.intersections[0].distance
    console.log(distance)
    if (!gitHubCanHover || distance > 5.2) return

    gitHubRef.current.applyImpulse({ x: 0, y: 0.1, z: 0 }, true)
    gitHubRef.current.applyTorqueImpulse({ x: 0, y: 0.01, z: 0 }, true)
    playGitHubSound()

    setGitHubCanHover(false)
    setTimeout(() => setGitHubCanHover(true), 2000)
  }
  const handleGmailHover = (event) => {
    const distance = event.intersections[0].distance
    if (!gmailCanHover || distance > 5) return

    gmailRef.current.applyImpulse({ x: 0, y: 0.1, z: 0 }, true)
    gmailRef.current.applyTorqueImpulse({ x: 0, y: 0.01, z: 0 }, true)
    playGmailSound()

    setGmailCanHover(false)
    setTimeout(() => setGmailCanHover(true), 2000)
  }

  return (
    <Physics debug={false}>
      <RigidBody type="fixed" friction={0.1}>
        <CuboidCollider args={[2, 0.3, 2]} position={[1, -0.15, 1]} />
      </RigidBody>

      <RigidBody ref={linkedInRef} type="dynamic" colliders="cuboid" friction={0.1}>
        <group
          position={[0.8, 0.5, 1.8]}
          onPointerOver={(event) => handleLinkedInHover(event)}
          onClick={linkedInClick}
        >
          <Center>
            <mesh
              geometry={linkedInModel.scene.children[0].children[0].geometry}
              material={linkedInModel.scene.children[0].children[0].material}
            >
              <Outlines thickness={linkedInCanHover ? 0 : 2} color="hotpink" />
            </mesh>
            <mesh
              geometry={linkedInModel.scene.children[0].children[1].geometry}
              material={linkedInModel.scene.children[0].children[1].material}
            />
          </Center>
          <mesh>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial transparent={true} opacity={0.0} />
          </mesh>
        </group>
      </RigidBody>

      <RigidBody ref={gitHubRef} type="dynamic" colliders="cuboid" friction={0.1}>
        <group
          position={[1, 0.5, 1]}
          onPointerOver={(event) => handleGitHubHover(event)}
          onClick={gitHubClick}
        >
          <Center>
            <mesh
              geometry={gitHubModel.scene.children[0].geometry}
              material={gitHubModel.scene.children[0].material}
            >
              <Outlines thickness={gitHubCanHover ? 0 : 2} color="hotpink" />
            </mesh>
          </Center>
          <mesh>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial transparent={true} opacity={0.0} />
          </mesh>
        </group>
      </RigidBody>

      <RigidBody ref={gmailRef} type="dynamic" colliders="cuboid" friction={0.1}>
        <group
          position={[1.8, 0.5, 0.8]}
          onPointerOver={(event) => handleGmailHover(event)}
          onClick={gmailClick}
        >
          <Center>
            <mesh
              geometry={gmailModel.scene.children[0].geometry}
              material={gmailModel.scene.children[0].material}
              scale={[2, 2, 2]}
            >
              <Outlines thickness={gmailCanHover ? 0 : 2} color="hotpink" />
            </mesh>
          </Center>
          <mesh>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial transparent={true} opacity={0.0} />
          </mesh>
        </group>
      </RigidBody>
    </Physics>
  )
}

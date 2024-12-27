import { useGLTF } from '@react-three/drei'

export default function MainModel({scale}) {
  const model = useGLTF('./model/portfolio_nocap.glb')

  return <primitive object={model.scene} scale={scale}/>
}

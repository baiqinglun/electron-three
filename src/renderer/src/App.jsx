import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Flex, Layout, Button } from 'antd'
import { ATool } from './component'

const { Header, Footer, Sider, Content } = Layout

const Box = (props) => {
  const meshRef = useRef()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((state, delta) => (meshRef.current.rotation.z += delta))
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const Sphere = (props) => {
  const meshRef = useRef()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((state, delta) => (meshRef.current.rotation.z += delta))
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <sphereGeometry args={[1, 32]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const App = () => {
  return (
    <>
      <Layout className="w-full h-lvh overflow-hidden">
        <Header className="h-18 bg-red-500">
          <div className="grid mt-4">
            <div className="flex">
              <Button className="ml-2">Button 1</Button>
              <Button className="ml-2">Button 1</Button>
              <Button className="ml-2">Button 1</Button>
              <Button className="ml-2">Button 1</Button>
            </div>
          </div>
        </Header>
        <Layout>
          <Content>
            <Canvas
              onCreated={(state) => {
                console.log('创建成功')
              }}
              fallback={<div>Sorry no WebGL supported!</div>}
            >
              <ambientLight intensity={Math.PI / 2} />
              <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                decay={0}
                intensity={Math.PI}
              />
              <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
              <Box position={[-1.2, 0, 0]} />
              <Sphere position={[3, 0, 0]} />
            </Canvas>{' '}
          </Content>
          <Sider className="bg-orange-300 w-1/6">Sider</Sider>
        </Layout>
        <Footer className="bg-green-400">Footer</Footer>
      </Layout>
    </>
  )
}

export default App

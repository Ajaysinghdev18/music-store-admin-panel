import { Environment, OrbitControls, Preload } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { FC, Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GLTF } from 'three-stdlib';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { ProductsApi } from '../../apis';

interface ObjectRenderProps {
  objectUrl: string;
}

const Render: FC<ObjectRenderProps> = ({ objectUrl }) => {
  const { scene } = useLoader(GLTFLoader, objectUrl) as GLTF;

  return (
    <Suspense fallback={<div>Loading Modal</div>}>
      <div style={{ width: '100%', height: '100%' }}>
        <Canvas
          style={{ width: '100%', height: '100%' }}
          camera={{
            fov: 30,
            zoom: 4,
            near: 0.1,
            far: 1000
          }}
        >
          <Suspense fallback={<div>Loading..</div>}>
            <primitive object={scene} />
            <Preload all />
          </Suspense>
          <Environment preset="city" />
          <OrbitControls
            addEventListener={undefined}
            hasEventListener={undefined}
            removeEventListener={undefined}
            dispatchEvent={undefined}
          />
        </Canvas>
      </div>
    </Suspense>
  );
};
export const ObjectRender: FC<ObjectRenderProps> = ({ objectUrl }) => {
  const [isUrlAvailable, setIsUrlAvailable] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      ProductsApi.get3DObjectData(id).then(() => {
        setIsUrlAvailable(true);
      });
    } else if (objectUrl) {
      setIsUrlAvailable(true);
    }
  }, [id, objectUrl]);
  return isUrlAvailable ? <Render objectUrl={objectUrl} /> : null;
};

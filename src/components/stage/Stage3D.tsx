import { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, ThreeEvent } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { useProjectStore } from '../../store/projectStore';
import { useLibraryStore } from '../../store/libraryStore';
import { Project } from '../../types/domain';
import { FireworksScene } from './FireworksScene';
import { getQuickLaunchWorldPoint } from './quickLaunch';
import { resolveStageTapLaunchMode } from './stageLaunchSelection';

type StageCubeSpec = {
  center: [number, number, number];
  size: number;
};

const FIXED_STAGE_SIZE = 300;

const getStageCubeSpec = (
  project: Project | null
): StageCubeSpec => {
  const groundHeight = project?.groundHeight ?? 0;
  const size = FIXED_STAGE_SIZE;

  const center: [number, number, number] = [
    0,
    groundHeight + size / 2,
    0,
  ];

  return { center, size };
};

function StageCube({ visible, spec }: { visible: boolean; spec: StageCubeSpec }) {
  if (!visible) return null;
  return (
    <group position={spec.center}>
      <mesh>
        <boxGeometry args={[spec.size, spec.size, spec.size]} />
        <meshBasicMaterial
          color="#1F2937"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
      <mesh>
        <boxGeometry args={[spec.size, spec.size, spec.size]} />
        <meshBasicMaterial color="#F59E0B" transparent opacity={0.4} wireframe />
      </mesh>
    </group>
  );
}

export function Stage3D() {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const [showStageCube, setShowStageCube] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const project = useProjectStore((state) => state.project);
  const quickLaunchMode = useProjectStore((state) => state.quickLaunchMode);
  const quickLaunchPreset = useProjectStore((state) => state.quickLaunchPreset);
  const requestQuickLaunch = useProjectStore((state) => state.requestQuickLaunch);
  const selectedEffect = useLibraryStore((state) => state.selectedEffect);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const stageCube = useMemo(
    () => getStageCubeSpec(project),
    [project]
  );
  const bestViewTarget = stageCube.center;
  const bestViewDistance = Math.max(80, stageCube.size * 1.2);
  const bestViewPosition: [number, number, number] = [
    stageCube.center[0],
    stageCube.center[1] + stageCube.size * 0.18,
    stageCube.center[2] - bestViewDistance,
  ];
  const orbitMaxDistance = Math.max(200, stageCube.size * 2);
  const heightLimit = stageCube.center[1] + stageCube.size / 2;

  const handleResetView = () => {
    const controls = controlsRef.current;
    if (!controls) return;
    controls.target.set(...bestViewTarget);
    controls.object.position.set(...bestViewPosition);
    controls.update();
    controls.saveState();
  };

  const handleStageTap = (event: ThreeEvent<PointerEvent>) => {
    const world = getQuickLaunchWorldPoint([
      event.point.x,
      event.point.y,
      event.point.z,
    ]);
    const launchMode = resolveStageTapLaunchMode({
      quickLaunchMode,
      selectedEffectId: selectedEffect?.id ?? null,
      quickLaunchPreset,
    });

    if (launchMode.mode === 'library') {
      requestQuickLaunch({ world, source: 'stage-tap', selectedEffectId: launchMode.selectedEffectId });
      return;
    }

    requestQuickLaunch({ world, source: 'stage-tap' });
  };

  return (
    <div
      id="stage-3d-panel"
      className="h-full relative"
      style={{
        background:
          'radial-gradient(circle at 28% 18%, rgba(220, 38, 38, 0.18), transparent 32%),' +
          'radial-gradient(circle at 80% 12%, rgba(245, 158, 11, 0.12), transparent 32%),' +
          'linear-gradient(135deg, #0A0404 0%, #150606 60%, #1F0808 100%)',
      }}
    >
      {!isMobile && (
        <div className="absolute top-4 left-4 z-10 bg-panel-bg/95 backdrop-blur-sm px-3 py-2 rounded border border-panel-border text-xs shadow-glow">
          <div className="text-text-main font-medium">3D 场景预览</div>
          <div className="text-text-secondary mt-1">拖动旋转 · 滚轮缩放 · 右键平移</div>
          <button
            onClick={handleResetView}
            className="mt-2 w-full px-2 py-1 rounded border border-panel-border bg-panel-bg text-text-main hover:bg-panel-border"
          >
            正面视角
          </button>
          <button
            onClick={() => setShowStageCube((prev) => !prev)}
            className="mt-2 w-full px-2 py-1 rounded border border-panel-border bg-panel-bg text-text-main hover:bg-panel-border"
          >
            {showStageCube ? '隐藏空间' : '显示空间'}
          </button>
        </div>
      )}

      <Canvas
        camera={{ position: [0, 50, 50], fov: 60, far: 5000 }}
        gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
      >
        <color attach="background" args={['#0A0404']} />

        {/* 环境与主光源 */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 12, 6]} intensity={0.9} color="#F59E0B" />
        <pointLight position={[0, 10, 0]} intensity={0.8} color="#DC2626" />

        {/* 地面网格 */}
        <Grid
          args={[stageCube.size, stageCube.size]}
          cellSize={5}
          cellThickness={0.7}
          cellColor="#4A1515"
          sectionSize={10}
          sectionThickness={1.2}
          sectionColor="#6A2020"
          fadeDistance={200}
          fadeStrength={1}
          followCamera={false}
          infiniteGrid={false}
        />

        <group onClick={handleStageTap}>
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, project?.groundHeight ?? 0, 0]}
            visible={false}
          >
            <planeGeometry args={[stageCube.size, stageCube.size]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>

          <StageCube visible={showStageCube} spec={stageCube} />
        </group>

        {/* 烟花场景 */}
        <FireworksScene heightLimit={heightLimit} />

        {/* 交互控制 */}
        <OrbitControls
          ref={controlsRef}
          makeDefault
          minDistance={10}
          maxDistance={orbitMaxDistance}
          maxPolarAngle={Math.PI / 2}
        />

        {/* 后期处理：辉光 + 色差 */}
        <EffectComposer>
          <Bloom
            intensity={3.4}
            luminanceThreshold={0.03}
            luminanceSmoothing={0.82}
            radius={0.72}
            mipmapBlur
            levels={5}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

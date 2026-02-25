# 🎯 TASK.md — 烟花视觉效果改造任务单

> **来源**: VPS端亚米代发，Y先生授权
> **规则**: 逐步执行，每步完成后 `npm run build` 确认通过再做下一步。不要跳步。

---

## Step 1 ✅ 粒子纹理升级
已完成。`src/utils/particleSprite.ts` 已升级为 128x128 高质量纹理 + trail/flash 纹理。

## Step 2 ✅ GPU 着色器
已完成。`src/shaders/particle.vert.glsl` + `particle.frag.glsl` 已写入。

## Step 3: 创建 GPUParticleSystem 组件

在 `src/components/stage/GPUParticleSystem.tsx` 创建新组件：

**核心设计**：
- 使用 `THREE.Points` + `THREE.ShaderMaterial` + `THREE.BufferGeometry`
- 最大粒子数 100000（比现在50000翻倍，但GPU计算所以性能更好）
- Buffer attributes: position(3), aVelocity(3), aColor(3), aBornTime(1), aLifespan(1), aSize(1)
- Uniforms: uTime, uGravity, uDrag, uResolution
- 用 additive blending + depthWrite=false
- 暴露 `emit(origin: Vec3, velocities: Vec3[], colors: Color[], lifespans: number[], sizes: number[])` 方法
- 内部维护一个 `nextIndex` 环形写入指针，新粒子覆盖最老的死粒子
- 在 `useFrame` 中只更新 `uTime` uniform，不循环粒子数组（GPU算位置）

**着色器加载**：
- 用 Vite 的 `?raw` 导入 glsl 文件：`import vertexShader from '../../shaders/particle.vert.glsl?raw'`

**粒子纹理**：
- 使用升级后的 `createParticleSprite()` 作为 point sprite map

**关键**：这个组件只负责粒子渲染，不包含烟花逻辑。它是一个通用的 GPU 粒子发射器。

完成后 build 确认。

## Step 4: 集成到 FireworksScene

修改 `FireworksScene.tsx`：

1. 导入 GPUParticleSystem，用 `useRef` 获取它的 emit 方法
2. 删除旧的 InstancedMesh 渲染（`<instancedMesh>` 和 `<sphereGeometry>` + `<meshBasicMaterial>`）
3. 替换为 `<GPUParticleSystem ref={gpuRef} />`
4. 修改 `spawnBurstAt` 和 `spawnLaunchShell`：不再遍历 particles 数组找空位，而是调用 `gpuRef.current.emit(...)`
5. 删除 useFrame 中的粒子位置更新循环（GPU着色器处理了）
6. 保留 useFrame 中的：时间更新、schedule 触发、shell 爆炸判断
7. Shell（上升中的弹丸）仍用少量 CPU 粒子追踪位置（因为需要判断apex和爆炸），但 burst 粒子全部走 GPU
8. 保留所有 tube 渲染和 position marker 渲染不变

**关键**：不要改变 store 接口、不要改 showGenerator、不要动 planner。只改渲染层。

完成后 build 确认。

## Step 5: 后处理增强

修改 `src/components/stage/Stage3D.tsx`（或 FireworksScene 的父组件）：

1. 从 `@react-three/postprocessing` 导入 EffectComposer, Bloom
2. 添加 Bloom 效果：`<Bloom intensity={1.5} luminanceThreshold={0.3} luminanceSmoothing={0.9} />`
3. 可选加轻微 `<ChromaticAberration offset={[0.002, 0.002]} />` 增加冲击感
4. 确保 Bloom 对 additive blending 的粒子生效（可能需要调 renderOrder）

完成后 build 确认。

## Step 6: 颜色温度衰减优化

如果 Step 4 的 vertex shader 颜色衰减不够好（白→黄→橙→红→暗红→消失），在这步微调 shader：

1. 在 fragment shader 中加入基于 vLife 的色温曲线
2. life > 0.8: 混入白色（白热状态）
3. life 0.3-0.8: 保持原色
4. life < 0.3: 混入 vec3(0.8, 0.15, 0.0)（冷却红移）+ 亮度衰减
5. 加入 sparkle 闪烁效果（已在 frag shader 中实现，确认效果）

完成后 build + 在浏览器中视觉确认效果。

---

## 注意事项
- **不要动** README.md, wrangler.toml, .githooks, CLAUDE.md
- **不要引入** 新的大型npm依赖
- **Shader 手写**，不用 shader 库
- 每步都 `npm run build` 确认，有 TS 错误就修
- 完成所有步骤后 `git add -A && git commit -m "feat: GPU particle system + bloom post-processing"`

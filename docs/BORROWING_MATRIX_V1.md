# 萤合落全项目借鉴矩阵 V1

本文档用于把 `yingheluo-v3` 的每个核心功能域映射到可借鉴的高星 GitHub 项目，优先选择 `500+ stars` 的项目。映射分为三类：

- `direct dependency`：适合直接接入
- `implementation reference`：适合照着结构和交互重写
- `conceptual reference`：适合借鉴思路，不建议直接塞进项目

## 1. 主舞台与 3D 场景

| 功能 | 项目 | Stars | 借鉴类型 | 用途 |
|---|---|---:|---|---|
| 3D 场景图 | `mrdoob/three.js` | 112k+ | direct dependency | 场景、相机、光照、buffer geometry、instancing |
| React 3D 交互 | `pmndrs/react-three-fiber` | 30k+ | direct dependency | 场景组件化、pointer 事件、点击交互 |
| 3D 辅助能力 | `pmndrs/drei` | 9k+ | direct dependency | Text、Points、Svg、Sampler、环境 helper |
| 摄像机过渡 | `yomotsu/camera-controls` | 2k+ | direct dependency | 平滑 orbit、dolly、truck、过渡镜头 |

## 2. 粒子与烟花视觉

| 功能 | 项目 | Stars | 借鉴类型 | 用途 |
|---|---|---:|---|---|
| 烟花/喷泉/爆裂预设 | `tsparticles/tsparticles` | 8.8k+ | implementation reference | fireworks/fountain/confetti 效果参数模型 |
| 即时爽感爆裂 | `catdad/canvas-confetti` | 12.5k+ | conceptual reference | 点击即爆、轻量反馈 |
| Three 粒子行为 | `creativelifeform/three-nebula` | 1.2k+ | implementation reference | 3D 粒子发射器与行为模式 |
| 高密度点与实例 | `potree/potree` | 5.4k+ | implementation reference | 点云预算与重负载点渲染思路 |
| 大规模属性更新 | `visgl/deck.gl` | 14k+ | implementation reference | 高负载实例/属性更新与 picking 参考 |

## 3. 发光与后处理

| 功能 | 项目 | Stars | 借鉴类型 | 用途 |
|---|---|---:|---|---|
| Bloom / ShockWave | `pmndrs/postprocessing` | 2.8k+ | direct dependency | Bloom、ShockWave、ToneMapping |
| three 后处理基线 | `mrdoob/three.js` | 112k+ | implementation reference | `EffectComposer`、`UnrealBloomPass` |

## 4. 手机端交互与爽玩模式

| 功能 | 项目 | Stars | 借鉴类型 | 用途 |
|---|---|---:|---|---|
| 触摸手势 | `pmndrs/use-gesture` | 9.6k+ | direct dependency | tap、drag、pinch、swipe |
| 手势识别模型 | `hammerjs/hammer.js` | 24k+ | conceptual reference | 多点手势与移动端输入模式 |
| 移动端 action sheet | `stipsan/react-spring-bottom-sheet` | 1.1k+ | direct dependency candidate | 底部抽屉、snap points |
| App shell 参考 | `shadcn-ui/ui` | 112k+ | implementation reference | 移动端底部栏、sheet、drawer |

## 5. 图案 / 文字 / 几何烟花

| 功能 | 项目 | Stars | 借鉴类型 | 用途 |
|---|---|---:|---|---|
| 3D 文字/形状基础 | `mrdoob/three.js` | 112k+ | implementation reference | Text、SVGLoader、Points、BufferGeometry |
| R3F 文字/采样 helper | `pmndrs/drei` | 9k+ | direct dependency | Text、Text3D、Svg、Sampler |
| 数学/插值/分布 | `pmndrs/maath` | 900+ | direct dependency candidate | 几何点分布、插值、缓动 |
| 图案生成思路 | `processing/p5.js` | 23k+ | conceptual reference | 文字转点阵、图案生成算法 |
| 矢量动画结构 | `airbnb/lottie-web` | 31k+ | conceptual reference | 图案/文字时间动画结构 |

## 6. 时间轴 / 编排 / 播放调度

| 功能 | 项目 | Stars | 借鉴类型 | 用途 |
|---|---|---:|---|---|
| 关键帧编辑器 | `theatre-js/theatre` | 12.3k+ | implementation reference | keyframe tracks、timeline 编辑模式 |
| 时序引擎 | `greensock/GSAP` | 24.3k+ | implementation reference | timeline、labels、nested sequencing |
| 声画时间模型 | `remotion-dev/remotion` | 42.2k+ | conceptual reference | 帧驱动、可确定性的时间模型 |
| 代码编排 DSL | `motion-canvas/motion-canvas` | 18.4k+ | implementation reference | 场景与时间编排 DSL |
| 音频 transport | `Tonejs/Tone.js` | 14.7k+ | direct dependency candidate | transport、music sync、scheduled callbacks |

## 7. 音乐同步 / 波形 / 标记

| 功能 | 项目 | Stars | 借鉴类型 | 用途 |
|---|---|---:|---|---|
| 波形与 Regions | `katspaugh/wavesurfer.js` | 10.2k+ | direct dependency | waveform、timeline、regions、markers |
| 音频编辑波形参考 | `bbc/peaks.js` | 3.4k+ | implementation reference | 详细/总览波形、标记编辑 |
| transport 基础 | `Tonejs/Tone.js` | 14.7k+ | direct dependency candidate | 音画统一时间基准 |

## 8. 阵地编辑 / 2D 编辑器

| 功能 | 项目 | Stars | 借鉴类型 | 用途 |
|---|---|---:|---|---|
| 无限画布编辑器 | `tldraw/tldraw` | 46.2k+ | implementation reference | 无限画布、工具、吸附、编辑器 API |
| 白板式空间编辑 | `excalidraw/excalidraw` | 120k+ | implementation reference | 平面元素编辑与交互模型 |
| 拖拽/变换手柄 | `daybrush/moveable` | 10.7k+ | direct dependency candidate | resize、rotate、snap、group transforms |
| 框选 | `daybrush/selecto` | 2.2k+ | direct dependency candidate | marquee selection |
| 2D canvas 编辑 | `fabricjs/fabric.js` | 31.1k+ | implementation reference | 2D 对象编辑与变换 |

## 9. 状态管理 / Undo / 编辑模式

| 功能 | 项目 | Stars | 借鉴类型 | 用途 |
|---|---|---:|---|---|
| 轻量状态管理 | `pmndrs/zustand` | 57.7k+ | direct dependency | 项目状态、播放状态、编辑状态 |
| 有限状态机 | `statelyai/xstate` | 29.4k+ | direct dependency candidate | 工具模式与播放/编辑模式切换 |
| 不可变更新 | `immerjs/immer` | 28.9k+ | direct dependency candidate | undo/redo 友好状态变更 |
| 文档事务参考 | `tldraw/tldraw` | 46.2k+ | implementation reference | 编辑器事务与历史 |

## 10. 管理端 / 表单 / 资源管理

| 功能 | 项目 | Stars | 借鉴类型 | 用途 |
|---|---|---:|---|---|
| 头部 CRUD 框架 | `refinedev/refine` | 34.4k+ | implementation reference | 资源型 CRUD 架构 |
| 后台 CRUD | `marmelab/react-admin` | 26.6k+ | implementation reference | 列表、编辑、过滤、资源视图 |
| 数据表格 | `TanStack/table` | 27.9k+ | direct dependency candidate | 烟花库、模板库、素材库表格 |
| 表单引擎 | `react-hook-form/react-hook-form` | 44.6k+ | direct dependency | 参数编辑表单 |
| schema 表单 | `rjsf-team/react-jsonschema-form` | 15.7k+ | direct dependency candidate | schema-driven 配置编辑 |
| 复杂表单 | `TanStack/form` | 6.5k+ | direct dependency candidate | 嵌套动态表单 |
| 拖拽上传 | `react-dropzone/react-dropzone` | 11k+ | direct dependency | 音频与资源上传 |
| 媒体库参考 | `payloadcms/payload` | 41.7k+ | implementation reference | 媒体和资源管理模式 |
| 媒体库参考 | `strapi/strapi` | 71.8k+ | implementation reference | 后台与资源管理模式 |
| 媒体库参考 | `directus/directus` | 34.7k+ | implementation reference | 数据/资源后台组织 |

## 11. 专业应用 UX

| 功能 | 项目 | Stars | 借鉴类型 | 用途 |
|---|---|---:|---|---|
| 命令面板 | `dip/cmdk` | 12.5k+ | direct dependency | 全局动作和快速搜索 |
| 键盘快捷键 | `jaywcjlove/hotkeys-js` | 7.2k+ | direct dependency candidate | 全局快捷键 |
| React 热键 | `JohannesKlauss/react-hotkeys-hook` | 3.4k+ | direct dependency candidate | React 范围内快捷键 |
| 搜索建议 | `algolia/autocomplete` | 5.3k+ | direct dependency candidate | 快速搜索与补全 |

## 12. 许可与接入备注

这些项目允许借鉴，但接入时仍要看适配成本和许可：

- `tldraw/tldraw`：适合深度借鉴编辑器结构，生产嵌入需再次确认许可
- `theatre-js/theatre`：`core` 与 `studio` 许可不同，更适合借鉴结构
- `greensock/GSAP`：可借鉴 timeline 能力，直接接入前需再次看许可
- `potree/potree`、`pmndrs/maath`、`pmndrs/uikit`：直接接入前应再次确认许可展示情况

## 推荐优先顺序

1. 爽玩模式与手机端：`react-three-fiber` + `use-gesture` + `postprocessing`
2. 烟花视觉：`three.js` + `tsparticles` 思路 + `postprocessing`
3. 图案/文字/几何烟花：`three.js` + `drei` + `maath`
4. 时间轴与音乐同步：`wavesurfer.js` + `Tone.js` + `theatre-js` 参考
5. 阵地编辑器：`moveable` + `selecto` + `tldraw` 参考
6. 管理端收敛：`TanStack Table` + `react-hook-form` + `cmdk`

# CLAUDE.md - 萤合落 (Yingheluo) 烟花项目

## 🎯 使命
把萤合落打造成 GitHub 上最有趣的电子烟花模拟器。核心目标：**让人一打开就想玩，玩了就停不下来**。

## 📐 技术栈
- React 19 + TypeScript + Vite 6
- Three.js + @react-three/fiber + @react-three/drei + postprocessing
- Zustand 状态管理
- TailwindCSS 4
- 部署在 Cloudflare Pages (https://yingheluo.dpdns.org/)

## 🔥 当前最大问题（按优先级）

### 1. 烟花效果太差（最重要！）
- 粒子精灵只是 32x32 的模糊圆点，没有光晕、拖尾、火花质感
- 爆炸效果缺乏层次：没有芯星、闪烁、余烬、烟雾
- 没有 GPU shader 粒子，全靠 CPU 更新 5 万粒子位置，性能差效果也差
- 缺少真实烟花的关键效果：上升尾迹的火花、爆炸闪光、颜色渐变冷却、重力拖尾弯曲
- **参考**: emitter3d (yubrot/emitter3d) 的粒子拖尾和 bloom 效果非常优秀

### 2. UI/UX 布局很差
- 界面看起来像后台管理系统，不像一个好玩的烟花 app
- 应该第一屏就是震撼的 3D 烟花场景，一键就能放
- 操控面板应该简洁、现代、不遮挡烟花画面
- 需要一个精美的首页/欢迎界面

### 3. 代码质量问题
- 17000 行代码，大量未使用的功能模块（admin、manager、planner 等）
- FireworksScene.tsx 1279 行单文件巨无霸，需要拆分
- 各种 showGenerator 功能重叠
- 类型定义过度复杂（domain.ts 里一堆实际没用到的类型）

## 📋 改造计划

### Phase 1: 视觉效果革命
1. **GPU 粒子系统**: 用 custom shader (vertex + fragment) 替代 CPU 粒子
   - 粒子位置/速度/颜色全部 GPU 计算
   - 支持 10 万+ 粒子不卡
2. **粒子渲染升级**:
   - 软粒子 + additive blending（叠加混合）
   - 动态大小衰减（远大近小到远小）
   - 颜色温度衰减：白→黄→橙→红→暗红→消失
   - 拖尾效果：trail mesh 或 motion blur
3. **后处理**:
   - Bloom（发光）大幅增强
   - 轻微 chromatic aberration（色散）增加视觉冲击
   - 场景雾效 + 天空盒（夜空/城市天际线）
4. **音效**: 上升嘶嘶声 + 爆炸轰鸣 + 远处回响

### Phase 2: 用户体验重做
1. **首页**: 全屏 3D 烟花背景 + 简洁 logo + "开始放烟花" 按钮
2. **快速模式**: 点击/触摸屏幕任意位置直接放烟花（像手机烟花 app 一样）
3. **编排模式**: 时间轴 + 预设 pattern + 音乐同步
4. **UI**: 浮动透明面板、现代感图标、动画过渡

### Phase 3: 代码清理
1. 删除未使用的模块（admin、大部分 manager）
2. 拆分 FireworksScene.tsx
3. 统一类型定义
4. 清理重复的 showGenerator

## 🚫 不要做的事
- 不要改 README.md 里的 SEO 内容和化学原理部分
- 不要删除 .githooks 和安全审计相关文件
- 不要改动 wrangler.toml 和部署配置
- 不要引入新的大型依赖（保持 bundle 小），shader 手写
- 不要一次性重写所有东西，分步迭代

## 🔧 开发命令
```bash
npm run dev      # 开发服务器 (Vite)
npm run build    # 构建
npm run preview  # 预览构建
```

## 📁 关键文件
- `src/components/stage/FireworksScene.tsx` — 核心渲染（需要重写）
- `src/utils/particleSprite.ts` — 粒子纹理（需要升级）
- `src/utils/physics.ts` — 物理引擎（基础不错，保留优化）
- `src/store/` — Zustand stores
- `src/App.tsx` — 路由入口

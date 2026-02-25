/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_AI_API_URL?: string;
  readonly VITE_AI_API_KEY?: string;
  readonly VITE_AI_MODEL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.glsl?raw' {
  const value: string;
  export default value;
}

declare module '*.vert.glsl?raw' {
  const value: string;
  export default value;
}

declare module '*.frag.glsl?raw' {
  const value: string;
  export default value;
}

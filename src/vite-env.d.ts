/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_FORM_ENDPOINT?: string
  readonly VITE_PLAUSIBLE_DOMAIN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

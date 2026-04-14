import type { SiteConfig } from './types'
import { DEFAULT_SITE_CONFIG } from './types'
import yaml from 'js-yaml'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

function loadYamlConfig(): SiteConfig {
  const configPath = join(process.cwd(), 'config.yaml')
  try {
    if (existsSync(configPath)) {
      const content = readFileSync(configPath, 'utf-8')
      return yaml.load(content) as SiteConfig
    }
  } catch (error) {
    console.error('Failed to load config.yaml:', error)
  }
  return DEFAULT_SITE_CONFIG
}

const appConfig = loadYamlConfig()

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-CN'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  },

  compatibilityDate: '2025-07-15',

  devtools: {
    enabled: true
  },

  devServer: {
    port: 3001
  },

  ssr: true,

  css: [
    '@/assets/css/main.scss',
    'remixicon/fonts/remixicon.css'
  ],

  modules: [],

  imports: {
    dirs: [
      'composables',
      'utils'
    ]
  },

  components: [
    {
      path: '~/components',
      pathPrefix: true
    }
  ],

  nitro: {
    preset: 'static',
    compressPublicAssets: true
  },

  typescript: {
    strict: true,
    typeCheck: false
  },

  runtimeConfig: {
    public: {
      appConfig: appConfig as any
    }
  }
})

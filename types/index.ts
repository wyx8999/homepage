/**
 * GitHub 仓库信息
 */
export interface GithubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  pushed_at: string
  license: {
    spdx_id: string
  } | null
}

/**
 * 网站项配置
 */
export interface SiteItem {
  name: string
  description: string
  url: string
  icon: string
  tag?: string
}

/**
 * 文章分类
 */
export interface ArticleCategory {
  id: number
  name: string
  url: string
}

/**
 * 文章信息
 */
export interface Article {
  id: number
  title: string
  summary: string
  cover: string
  url: string
  publish_time: string
  category: ArticleCategory
}

/**
 * 文章配置项（静态）
 */
export interface ArticleConfigItem {
  title: string
  cover: string
  description: string
  category: string
  time: string
  url?: string
}

/**
 * 文章配置
 */
export interface ArticlesConfig {
  blogUrl: string
  postAPI?: string
  postRSS?: string
  postList: ArticleConfigItem[]
}

/**
 * 时间线事件
 */
export interface TimelineEvent {
  date: string
  title: string
  description?: string
  icon?: string
}

/**
 * 站点基础信息
 */
export interface SiteMeta {
  title: string
  favicon: string
  description: string
  keywords: string[]
  author: string
  url: string
}

/**
 * 页脚备案信息
 */
export interface FooterRecordItem {
  label: string
  url: string
}

/**
 * 页脚配置
 */
export interface FooterConfig {
  startYear: number
  icp: FooterRecordItem[]
}

/**
 * Hero 主按钮
 */
export interface HeroAction {
  text: string
  url: string
}

/**
 * Hero 社交链接
 */
export interface HeroSocialLink {
  name: string
  url: string
  icon: string
}

/**
 * Hero 右侧照片配置
 */
export interface RightPhotoConfig {
  image: string
  iconA: string
  iconB: string
  iconC: string
}

/**
 * Hero 配置
 */
export interface HeroConfig {
  badgeText: string
  descriptions: string[]
  skills: string[]
  primaryAction: HeroAction
  socialLinks: HeroSocialLink[]
  rightPhoto: RightPhotoConfig
}

/**
 * 网站配置
 */
export interface SiteConfig {
  site: SiteMeta
  footer: FooterConfig
  hero: HeroConfig
  articles: ArticlesConfig
  sites: SiteItem[]
  projects: string[]
  timeline: TimelineEvent[]
}

/**
 * 默认网站配置
 */
export const DEFAULT_SITE_CONFIG: SiteConfig = {
  site: {
    title: '',
    favicon: '/favicon.png',
    description: '',
    keywords: [],
    author: '',
    url: ''
  },
  footer: {
    startYear: new Date().getFullYear(),
    icp: []
  },
  hero: {
    badgeText: '',
    descriptions: [],
    skills: [],
    primaryAction: {
      text: '',
      url: ''
    },
    socialLinks: [],
    rightPhoto: {
      image: '/photo.jpg',
      iconA: '',
      iconB: '',
      iconC: ''
    }
  },
  articles: {
    blogUrl: '',
    postAPI: '',
    postRSS: '',
    postList: []
  },
  sites: [],
  projects: [],
  timeline: []
}


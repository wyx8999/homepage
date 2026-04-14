import type { SiteConfig, GithubRepo, Article } from '@@/types'
import { DEFAULT_SITE_CONFIG } from '@@/types'

const GITHUB_API_BASE = 'https://api.github.com'
const RSS2JSON_API_BASE = 'https://rss2json.flec.top'

/**
 * API 请求 Composable
 * 集中管理所有外部 API 调用和配置读取
 */
export const useApi = () => {
  /**
   * 加载配置文件
   */
  const loadConfig = async (): Promise<SiteConfig> => {
    const config = useRuntimeConfig().public.appConfig as unknown as SiteConfig
    return config || DEFAULT_SITE_CONFIG
  }

  /**
   * 获取项目列表
   */
  const getProjects = async (repos: string[]): Promise<GithubRepo[]> => {
    if (!repos || repos.length === 0) return []

    const config = useRuntimeConfig().public.appConfig as unknown as SiteConfig
    const userAgent = config?.site?.title

    const results = await Promise.all(
      repos.map(async (repo) => {
        const [owner, name] = repo.split('/')
        return await $fetch<GithubRepo>(`${GITHUB_API_BASE}/repos/${owner}/${name}`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': userAgent
          }
        })
      })
    )

    return results
  }

  /**
   * 获取文章列表
   */
  const getArticles = async (postAPI?: string, page = 1, pageSize = 6): Promise<{ list: Article[]; total: number }> => {
    if (!postAPI) {
      return { list: [], total: 0 }
    }

    const response = await $fetch<{ code: number; data: { list: Article[]; total: number } }>(
      postAPI,
      { params: { page, page_size: pageSize } }
    )

    if (response.code === 0 && response.data) {
      return response.data
    }

    return { list: [], total: 0 }
  }

  /**
   * 从 RSS Feed 获取文章列表
   */
  const getRssArticles = async (rssUrl?: string): Promise<{ list: Article[]; total: number }> => {
    if (!rssUrl) {
      return { list: [], total: 0 }
    }

    const apiUrl = `${RSS2JSON_API_BASE}/api.json?rss_url=${encodeURIComponent(rssUrl)}`

    try {
      const response = await $fetch<{ code: number; data: { list: Article[]; total: number } }>(apiUrl)

      if (response.code === 0 && response.data) {
        return response.data
      }
    } catch (error) {
      console.error('Failed to fetch RSS articles:', error)
    }

    return { list: [], total: 0 }
  }

  return {
    loadConfig,
    getProjects,
    getArticles,
    getRssArticles
  }
}
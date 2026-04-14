<template>
  <main class="home-page">
    <SectionsHeroSection :projects-count="projects.length" :sites-count="sites.length" :articles-count="articlesTotal"
      :hero="hero" :author="siteAuthor" :articles-label="heroArticlesLabel" />

    <SectionsProjectsSection :projects="projects" />

    <SectionsSitesSection :sites="sites" />

    <SectionsTimelineSection :events="timeline" />

    <SectionsArticlesSection :articles="articles" :blog-url="articlesBlogUrl" :section-title="articlesSectionTitle" :hide-cover="articlesFromRss" />
  </main>
</template>

<script setup lang="ts">
import type {
  GithubRepo,
  Article,
  SiteItem,
  TimelineEvent,
  HeroConfig,
  ArticlesConfig,
  ArticleConfigItem
} from '@@/types'

const { loadConfig, getProjects, getArticles, getRssArticles } = useApi()

const projects = ref<GithubRepo[]>([])
const articles = ref<Article[]>([])
const articlesTotal = ref(0)
const sites = ref<SiteItem[]>([])
const timeline = ref<TimelineEvent[]>([])
const hero = ref<HeroConfig>({
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
})
const articlesConfig = ref<ArticlesConfig>({
  blogUrl: '',
  postAPI: '',
  postRSS: '',
  postList: []
})
const siteAuthor = ref('')
const articlesSectionTitle = ref<'近期文章' | '置顶文章'>('近期文章')
const heroArticlesLabel = ref<'发布文章' | '置顶文章'>('发布文章')
const articlesFromRss = ref(false)

const articlesBlogUrl = computed(() => articlesConfig.value.blogUrl || '#')

const mapStaticArticles = (items: ArticleConfigItem[]): Article[] => {
  return items.map((item, index) => ({
    id: index + 1,
    title: item.title,
    summary: item.description,
    cover: item.cover,
    url: item.url || '#',
    publish_time: item.time,
    category: {
      id: index + 1,
      name: item.category,
      url: '#'
    }
  }))
}

onMounted(async () => {
  const config = await loadConfig()
  siteAuthor.value = config.site.author
  hero.value = config.hero
  articlesConfig.value = config.articles
  sites.value = config.sites
  timeline.value = config.timeline
  projects.value = await getProjects(config.projects)

  // 文章数据加载（优先级：postAPI → postRSS → postList）
  const loadArticles = async () => {
    const { postAPI, postRSS, postList } = config.articles
    articlesSectionTitle.value = '近期文章'
    heroArticlesLabel.value = '发布文章'
    articlesFromRss.value = false

    if (postAPI?.trim()) {
      const { list, total } = await getArticles(postAPI)
      articles.value = list
      articlesTotal.value = total
    } else if (postRSS?.trim()) {
      const { list, total } = await getRssArticles(postRSS)
      articles.value = list
      articlesTotal.value = total
      articlesFromRss.value = true
    } else {
      articles.value = mapStaticArticles(postList)
      articlesTotal.value = postList.length
      articlesSectionTitle.value = '置顶文章'
      heroArticlesLabel.value = '置顶文章'
    }
  }

  await loadArticles()
})
</script>

<style lang="scss" scoped>
.home-page {
  max-width: 72rem;
  margin: 0 auto;
}
</style>

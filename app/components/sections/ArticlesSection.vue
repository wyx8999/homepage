<template>
  <section id="articles" class="section">
    <div class="section-header">
      <h2 class="section-title">{{ sectionTitle }}</h2>
      <p class="section-desc">思想的羽翼，心灵的絮语</p>
    </div>
    <div v-if="articles.length > 0" class="articles-grid">
      <a v-for="article in articles" :key="article.id" :href="toArticleUrl(article.url)" target="_blank"
        rel="noopener noreferrer" class="article-card">
        <div v-if="!hideCover" class="article-cover">
          <img :src="article.cover" :alt="article.title" loading="lazy" />
        </div>
        <div class="article-content">
          <h3 class="article-title">{{ article.title }}</h3>
          <p class="article-summary">{{ article.summary }}</p>
          <div class="article-meta">
            <span class="article-category">{{ article.category.name }}</span>
            <span class="article-date">{{ formatDate(article.publish_time) }}</span>
          </div>
        </div>
      </a>
    </div>
    <div v-else class="articles-redirect">
      <p class="redirect-text">更多精彩内容尽在博客端</p>
      <p class="redirect-hint">文章加载失败，请检查网络连接</p>
      <a :href="blogUrl" target="_blank" rel="noopener noreferrer" class="view-all-btn">前往博客阅读更多</a>
    </div>
    <div v-if="articles.length > 0" class="articles-more">
      <a :href="blogUrl" target="_blank" rel="noopener noreferrer" class="view-all-btn">查看更多文章</a>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Article } from '@@/types'

interface Props {
  articles: Article[]
  blogUrl: string
  sectionTitle: '近期文章' | '置顶文章'
  hideCover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  blogUrl: '#',
  sectionTitle: '近期文章',
  hideCover: false
})

const toArticleUrl = (articleUrl: string): string => {
  if (articleUrl.startsWith('http://') || articleUrl.startsWith('https://') || articleUrl.startsWith('mailto:')) {
    return articleUrl
  }

  if (!props.blogUrl || props.blogUrl === '#') {
    return articleUrl
  }

  return `${props.blogUrl}${articleUrl}`
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
</script>

<style lang="scss" scoped>
.section {
  padding: 5rem 0;
}

.section-header {
  margin-bottom: 2.5rem;
  text-align: center;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--nav-hover);
  margin-bottom: 0.5rem;
}

.section-desc {
  font-size: 0.9375rem;
  color: var(--nav-color);
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.article-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--menu-border);
  border-radius: 0.75rem;
  background: var(--menu-backdrop);
  overflow: hidden;
  text-decoration: none;
  transition: border-color 0.2s;

  &:hover {
    border-color: var(--toggle-border);
  }
}

.article-cover {
  aspect-ratio: 16 / 9;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  .article-card:hover & img {
    transform: scale(1.05);
  }
}

.article-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
}

.article-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--nav-hover);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
}

.article-summary {
  font-size: 0.8125rem;
  color: var(--nav-color);
  line-height: 1.5;
  height: 3em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
}

.article-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--toggle-icon);
  margin-top: 0.25rem;
}

.article-category {
  padding: 0.125rem 0.5rem;
  background: var(--header-bg);
  border-radius: 0.25rem;
}

.articles-more {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.articles-redirect {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 3rem;
  background: var(--header-bg);
  border: 1px solid var(--menu-border);
  border-radius: 0.75rem;
}

.redirect-text {
  font-size: 1rem;
  color: var(--nav-hover);
}

.redirect-hint {
  font-size: 0.875rem;
  color: var(--nav-color);
}

.view-all-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  border-radius: 0.5rem;
  border: 1px solid var(--menu-border);
  color: var(--nav-color);
  background: var(--header-bg);
  transition: all 200ms ease-out;

  &:hover {
    border-color: var(--toggle-border);
    color: var(--nav-hover);
  }
}

@media (max-width: 768px) {
  .section {
    padding: 3rem 0;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .articles-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>

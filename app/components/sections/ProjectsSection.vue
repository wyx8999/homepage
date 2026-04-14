<template>
  <section id="projects" class="section">
    <div class="section-header">
      <h2 class="section-title">精选项目</h2>
      <p class="section-desc">用心打造的开源作品</p>
    </div>
    <div v-if="projects.length > 0" class="projects-grid">
      <a v-for="repo in projects" :key="repo.html_url" :href="repo.html_url" target="_blank" class="project-card">
        <div class="project-header">
          <svg viewBox="0 0 16 16" fill="currentColor" class="project-icon">
            <path
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          <span class="project-title">{{ repo.name }}</span>
        </div>

        <p class="project-description">{{ repo.description || '暂无描述' }}</p>

        <div class="project-meta">
          <span v-if="repo.language" class="meta-item">
            {{ repo.language }}
          </span>
          <span class="meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z">
              </path>
            </svg>
            {{ formatNumber(repo.stargazers_count) }}
          </span>
          <span class="meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M9 6C9 7.30622 8.16519 8.41746 7 8.82929V9C7 10.1046 7.89543 11 9 11H15C16.1046 11 17 10.1046 17 9V8.82929C15.8348 8.41746 15 7.30622 15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6C21 7.30622 20.1652 8.41746 19 8.82929V9C19 11.2091 17.2091 13 15 13H13V15.1707C14.1652 15.5825 15 16.6938 15 18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18C9 16.6938 9.83481 15.5825 11 15.1707V13H9C6.79086 13 5 11.2091 5 9V8.82929C3.83481 8.41746 3 7.30622 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z">
              </path>
            </svg>
            {{ formatNumber(repo.forks_count) }}
          </span>
          <span class="meta-item">
            {{ formatRelativeDate(repo.pushed_at) }}
          </span>
          <span v-if="repo.license" class="meta-item">
            {{ repo.license.spdx_id }}
          </span>
        </div>
      </a>
    </div>
    <div v-else class="projects-redirect">
      <p class="redirect-text">更多精彩项目尽在 GitHub</p>
      <p class="redirect-hint">项目加载失败，请检查网络连接</p>
      <a :href="githubUrl" target="_blank" class="view-all-btn">前往 GitHub 查看</a>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { GithubRepo } from '@@/types'

interface Props {
  projects: GithubRepo[]
}

defineProps<Props>()

const githubUrl = 'https://github.com/flechazo'

/**
 * 格式化数字，大于1000的显示为 k 格式
 */
function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) return '今天'
  if (days === 1) return '昨天'
  if (days < 7) return `${days}天前`
  if (days < 30) return `${Math.floor(days / 7)}周前`
  if (days < 365) return `${Math.floor(days / 30)}月前`
  return `${Math.floor(days / 365)}年前`
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

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.project-card {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid var(--menu-border);
  border-radius: 0.75rem;
  background: var(--menu-backdrop);
  text-decoration: none;
  transition: border-color 0.2s;

  &:hover {
    border-color: var(--toggle-border);
  }
}

.project-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.project-icon {
  width: 1rem;
  height: 1rem;
  color: var(--nav-color);
}

.project-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--nav-hover);
}

.project-description {
  font-size: 0.875rem;
  color: var(--nav-color);
  line-height: 1.5;
  height: 2.625rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.project-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
  color: var(--toggle-icon);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;

  svg {
    width: 0.875rem;
    height: 0.875rem;
  }
}

.projects-redirect {
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

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>

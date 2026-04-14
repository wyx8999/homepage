<template>
  <section id="sites" class="section">
    <div class="section-header">
      <h2 class="section-title">上线网站</h2>
      <p class="section-desc">精心雕琢的数字空间</p>
    </div>
    <div class="sites-grid">
      <a v-for="(site, index) in sites" :key="index" :href="site.url" target="_blank" class="site-card">
        <div class="site-header">
          <i v-if="site.icon" :class="`ri-${site.icon}`" class="site-icon"></i>
          <svg v-else viewBox="0 0 24 24" fill="currentColor" class="site-icon">
            <path
              d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm0 2v14h14V5H5zm2 2h4v4H7V7zm6 0h4v2h-4V7zm0 4h4v2h-4v-2zm-6 2h10v2H7v-2zm0 4h10v2H7v-2z" />
          </svg>
          <span class="site-title">{{ site.name }}</span>
          <span v-if="site.tag" class="site-tag">{{ site.tag }}</span>
        </div>
        <p class="site-description">{{ site.description }}</p>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SiteItem } from '@@/types'

interface Props {
  sites: SiteItem[]
}

defineProps<Props>()
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

.sites-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.site-card {
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

.site-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.site-icon {
  width: 1rem;
  height: 1rem;
  color: var(--nav-color);
}

.site-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--nav-hover);
}

.site-tag {
  font-size: 0.625rem;
  font-weight: 500;
  color: var(--nav-color);
  padding: 0.125rem 0.375rem;
  background: var(--header-bg);
  border: 1px solid var(--menu-border);
  border-radius: 0.25rem;
}

.site-description {
  font-size: 0.875rem;
  color: var(--nav-color);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  .section {
    padding: 3rem 0;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .sites-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>

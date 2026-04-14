<template>
  <section id="home" class="hero-section">
    <div class="hero-bg">
      <div class="hero-grid"></div>
      <div class="hero-glow"></div>
      <div class="hero-dots"></div>
    </div>

    <div class="hero-content">
      <div class="hero-badge">
        <span class="badge-dot"></span>
        <span class="badge-text">{{ props.hero.badgeText }}</span>
      </div>

      <div class="hero-intro">
        <h1 class="hero-name">Hi，我是 {{ props.author }}</h1>
        <div v-if="props.hero.descriptions.length" class="hero-bio">
          <p v-for="(line, index) in props.hero.descriptions" :key="index">
            {{ line }}
          </p>
        </div>
      </div>

      <div v-if="props.hero.skills.length" class="hero-skills">
        <span class="skills-label">技术栈</span>
        <div class="skills-grid">
          <span v-for="skill in props.hero.skills" :key="skill" class="skill-item">
            {{ skill }}
          </span>
        </div>
      </div>

      <div class="hero-stats">
        <div class="stat-item">
          <span class="stat-value">{{ props.projectsCount }}</span>
          <span class="stat-label">精选项目</span>
        </div>
        <span class="stat-divider"></span>
        <div class="stat-item">
          <span class="stat-value">{{ props.sitesCount }}</span>
          <span class="stat-label">上线网站</span>
        </div>
        <span class="stat-divider"></span>
        <div class="stat-item">
          <span class="stat-value">{{ props.articlesCount }}</span>
          <span class="stat-label">{{ props.articlesLabel }}</span>
        </div>
      </div>

      <div class="hero-actions">
        <a :href="props.hero.primaryAction.url" target="_blank" rel="noopener noreferrer" class="hero-btn">
          {{ props.hero.primaryAction.text }}
        </a>
        <div class="social-links">
          <a v-for="contact in props.hero.socialLinks" :key="contact.name" :href="contact.url" target="_blank"
            :aria-label="contact.name" rel="noopener noreferrer" class="social-link">
            <i :class="contact.icon" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>

    <div class="hero-visual">
      <div class="photo-container">
        <div class="photo-frame">
          <img :src="props.hero.rightPhoto.image" alt="站长形象" loading="eager" class="photo-image" />
        </div>
        <div class="photo-decoration photo-decoration-1"></div>
        <div class="photo-decoration photo-decoration-2"></div>
        <div v-if="props.hero.rightPhoto.iconA" class="photo-float" :class="`photo-float-1`">
          <i :class="props.hero.rightPhoto.iconA"></i>
        </div>
        <div v-if="props.hero.rightPhoto.iconB" class="photo-float" :class="`photo-float-2`">
          <i :class="props.hero.rightPhoto.iconB"></i>
        </div>
        <div v-if="props.hero.rightPhoto.iconC" class="photo-float" :class="`photo-float-3`">
          <i :class="props.hero.rightPhoto.iconC"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { HeroConfig } from '@@/types'

interface Props {
  projectsCount: number
  sitesCount: number
  articlesCount: number
  articlesLabel: '发布文章' | '置顶文章'
  author: string
  hero: HeroConfig
}

const props = withDefaults(defineProps<Props>(), {
  articlesLabel: '发布文章',
  author: '',
  hero: () => ({
    badgeText: '',
    descriptions: [],
    skills: [],
    primaryAction: {
      text: '进入我的博客',
      url: '#'
    },
    socialLinks: [],
    rightPhoto: {
      image: '/photo.jpg',
      iconA: '',
      iconB: '',
      iconC: ''
    }
  })
})
</script>

<style lang="scss" scoped>
.hero-section {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  place-items: center;
  min-height: 100vh;
  padding: 3rem;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--menu-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--menu-border) 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.3;
  mask-image: radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 100%);
}

.hero-glow {
  position: absolute;
  top: 20%;
  left: 10%;
  width: 40%;
  height: 40%;
  background: radial-gradient(circle, var(--toggle-border) 0%, transparent 70%);
  opacity: 0.15;
  filter: blur(60px);
}

.hero-dots {
  position: absolute;
  top: 60%;
  right: 5%;
  width: 200px;
  height: 200px;
  background-image: radial-gradient(var(--menu-border) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.5;
}

.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  padding: 0.375rem 0.875rem;
  background: var(--header-bg);
  border: 1px solid var(--menu-border);
  border-radius: 9999px;
  font-size: 0.75rem;
  color: var(--nav-color);
}

.badge-dot {
  width: 6px;
  height: 6px;
  background: #22c55e;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }
}

.badge-text {
  letter-spacing: 0.02em;
}

.hero-intro {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.hero-name {
  font-size: 4rem;
  font-weight: 700;
  color: var(--nav-hover);
  line-height: 1.1;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, var(--nav-hover) 0%, var(--toggle-border) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-bio {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.5rem;

  p {
    font-size: 1.125rem;
    color: var(--nav-color);
    line-height: 1.7;
    max-width: 32rem;
    margin: 0;
  }
}

.hero-skills {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skills-label {
  font-size: 0.75rem;
  color: var(--toggle-icon);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-item {
  padding: 0.5rem 0.875rem;
  font-size: 0.8125rem;
  color: var(--nav-hover);
  background: var(--header-bg);
  border: 1px solid var(--menu-border);
  border-radius: 0.375rem;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  transition: all 200ms ease-out;

  &:hover {
    border-color: var(--toggle-border);
  }
}

.hero-stats {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1.25rem 0;
  margin: 0.5rem 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--nav-hover);
  line-height: 1;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--nav-color);
}

.stat-divider {
  width: 1px;
  height: 2rem;
  background: var(--menu-border);
  align-self: center;
}

.hero-actions {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 9999px;
  border: 1px solid var(--nav-hover);
  background-color: var(--nav-hover);
  color: var(--menu-backdrop);
  transition: all 200ms ease-out;

  &:hover {
    border-color: var(--toggle-border);
    background-color: var(--menu-backdrop);
    color: var(--nav-hover);
  }
}

.social-links {
  display: flex;
  gap: 0.25rem;
  margin-left: 0.5rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  color: var(--toggle-icon);
  border-radius: 0.5rem;
  transition: all 200ms ease-out;

  i {
    font-size: 1.5rem;
  }

  &:hover {
    color: var(--nav-hover);
    background: var(--header-bg);
  }
}

.hero-visual {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.photo-container {
  position: relative;
  width: 100%;
  max-width: 28rem;
}

.photo-frame {
  position: relative;
  z-index: 5;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
}

.photo-image {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  display: block;
}

.photo-decoration {
  position: absolute;
  border-radius: 1.5rem;
  pointer-events: none;
}

.photo-decoration-1 {
  top: -1rem;
  left: -1rem;
  right: 1rem;
  bottom: 1rem;
  border: 2px dashed var(--menu-border);
  z-index: 1;
}

.photo-decoration-2 {
  top: 1rem;
  left: 1rem;
  right: -1.5rem;
  bottom: -1.5rem;
  background: var(--header-bg);
  border: 1px solid var(--menu-border);
  z-index: 0;
}

.photo-float {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background: var(--menu-backdrop);
  border: 1px solid var(--menu-border);
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  animation: float 4s ease-in-out infinite;

  i {
    font-size: 1.25rem;
    color: var(--nav-hover);
  }
}

.photo-float-1 {
  top: 10%;
  right: -0.5rem;
  animation-delay: 0s;
}

.photo-float-2 {
  bottom: 30%;
  left: -1rem;
  animation-delay: 1s;
}

.photo-float-3 {
  bottom: 10%;
  right: 5%;
  animation-delay: 2s;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

@media (max-width: 1024px) {
  .hero-section {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding: 3rem 1rem;
  }

  .hero-bg {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero-visual {
    display: none;
  }

  .hero-name {
    font-size: 2.75rem;
  }

  .hero-bio p {
    font-size: 1rem;
  }

  .hero-stats {
    gap: 1rem;
    padding: 1rem 0;
  }

  .stat-value {
    font-size: 1.25rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  .social-links {
    justify-content: center;
    margin-left: 0;
    margin-top: 0.5rem;
  }
}

@media (max-width: 480px) {
  .hero-name {
    font-size: 2.25rem;
  }

  .hero-badge {
    font-size: 0.6875rem;
    padding: 0.25rem 0.625rem;
  }

  .skills-grid {
    gap: 0.375rem;
  }

  .skill-item {
    padding: 0.375rem 0.625rem;
    font-size: 0.75rem;
  }

  .hero-stats {
    gap: 0.75rem 1.25rem;
  }

  .stat-divider {
    display: none;
  }
}
</style>

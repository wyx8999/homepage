<template>
  <section id="timeline" class="section">
    <div class="section-header">
      <h2 class="section-title">经历过往</h2>
      <p class="section-desc">记录成长路上的重要时刻</p>
    </div>

    <div class="timeline-container">
      <div v-for="(event, index) in events" :key="index" class="timeline-item">
        <span class="timeline-date">{{ event.date }}</span>
        <div class="timeline-dot">
          <i :class="event.icon || 'ri-star-line'" aria-hidden="true"></i>
        </div>
        <div class="timeline-content">
          <h3 class="timeline-title">{{ event.title }}</h3>
          <span v-if="event.description" class="timeline-description">· {{ event.description }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { TimelineEvent } from '@@/types'

interface Props {
  events: TimelineEvent[]
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.section {
  padding: 5rem 0;
}

.section-header {
  margin-bottom: 2rem;
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

.timeline-container {
  max-width: 60rem;
  margin: 0 auto;
  padding: 0 1rem;
}

.timeline-item {
  display: grid;
  grid-template-columns: 5rem auto 1fr;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.timeline-date {
  justify-self: end;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--toggle-border);
  letter-spacing: 0.02em;
}

.timeline-dot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.125rem;
  height: 1.125rem;
  background: var(--menu-backdrop);
  border: 2px solid var(--toggle-border);
  border-radius: 50%;
  z-index: 1;
  transition: all 200ms ease-out;

  i {
    font-size: 0.625rem;
    color: var(--toggle-border);
  }
}

.timeline-item:hover .timeline-dot {
  background: var(--toggle-border);

  i {
    color: var(--menu-backdrop);
  }
}

.timeline-content {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.625rem 0.875rem;
  background: var(--menu-backdrop);
  border: 1px solid var(--menu-border);
  border-radius: 0.5rem;
  transition: border-color 0.2s;

  &:hover {
    border-color: var(--toggle-border);
  }
}

.timeline-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--nav-hover);
}

.timeline-description {
  font-size: 0.8125rem;
  color: var(--nav-color);
}

@media (max-width: 768px) {
  .section {
    padding: 3rem 0;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .timeline-container {
    padding: 0 0.75rem;
  }

  .timeline-dot {
    width: 1rem;
    height: 1rem;

    i {
      font-size: 0.5rem;
    }
  }

  .timeline-content {
    padding: 0.5rem 0.75rem;
    gap: 0.375rem;
  }

  .timeline-title {
    font-size: 0.875rem;
  }

  .timeline-description {
    font-size: 0.75rem;
  }
}
</style>

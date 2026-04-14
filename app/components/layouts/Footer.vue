<template>
  <div class="footer">
    <div class="footer-column">
      <div class="column-left">
        <div class="copyright">
          ©{{ copyrightYear }} By {{ author }}
        </div>
      </div>
      <div class="column-right">
        <a v-for="record in recordItems" :key="`${record.label}-${record.url}`" :href="record.url" target="_blank"
          :aria-label="record.label" rel="noopener noreferrer">
          {{ record.label }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SiteConfig, FooterRecordItem } from '@@/types'

const config = useRuntimeConfig().public.appConfig as unknown as SiteConfig | undefined

const startYear = config?.footer?.startYear ?? new Date().getFullYear()
const currentYear = new Date().getFullYear()
const copyrightYear = startYear === currentYear ? `${currentYear}` : `${startYear} - ${currentYear}`
const author = config?.site?.author

const recordItems = config?.footer?.icp ?? ([] as FooterRecordItem[])
</script>

<style lang="scss" scoped>
.footer {
  border-top: 1px solid var(--header-border);
  margin-top: 5rem;
}

.footer-column {
  margin: 0 auto;
  max-width: 80rem;
  display: flex;
  overflow: hidden;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  line-height: 1;
  padding: 1.5rem 1.75rem;
  color: var(--nav-color);

  .column-left {
    display: flex;
    align-items: center;
  }

  .column-right {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;

    a {
      color: inherit;
      text-decoration: none;
      transition: 200ms ease;

      &:hover {
        color: var(--nav-hover);
      }
    }
  }
}

@media (max-width: 768px) {
  .footer-column {
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.25rem 1rem;
    text-align: center;

    .column-left {
      order: 1;
    }

    .column-right {
      order: 2;
      flex-direction: column;
      gap: 0.75rem;
      align-items: center;
    }
  }
}
</style>

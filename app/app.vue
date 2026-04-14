<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { SiteConfig } from '@@/types'
import { DEFAULT_SITE_CONFIG } from '@@/types'

const config = useRuntimeConfig().public.appConfig as unknown as SiteConfig | undefined
const site = config?.site ?? DEFAULT_SITE_CONFIG.site
const keywords = site.keywords.join(',')

useSeoMeta({
  description: site.description,
  keywords,
  author: site.author,
  ogTitle: site.title,
  ogDescription: site.description,
  ogType: 'website',
  ogSiteName: site.title,
  ogUrl: site.url,
  twitterCard: 'summary_large_image',
  twitterTitle: site.title,
  twitterDescription: site.description,
})

useHead({
  title: site.title,
  htmlAttrs: {
    lang: "zh-CN"
  },
  meta: [
    { name: 'keywords', content: keywords },
    { name: 'author', content: site.author },
    { name: 'description', content: site.description },
  ],
  link: [
    { rel: 'icon', href: site.favicon },
    { rel: 'apple-touch-icon', href: site.favicon },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: site.title,
        description: site.description,
        url: site.url,
        author: {
          '@type': 'Person',
          name: site.author
        }
      })
    }
  ]
})
</script>

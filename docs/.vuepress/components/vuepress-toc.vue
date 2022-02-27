<template>
  <Toc :headers="headers" :options="options" />
  <!-- container -->
  <nav class="vuepress-toc">
    <!-- list -->
    <ul class="vuepress-toc-list">
      <!-- item -->
      <li class="vuepress-toc-item">
        <!-- link -->
        <RouterLink class="vuepress-toc-link" to="###1234567">1234567</RouterLink>
      </li>
      <!-- item with children -->
      <li class="vuepress-toc-item">
        <!-- link (children active) -->
        <RouterLink class="vuepress-toc-link active" to="#bar">Bar</RouterLink>
        <!-- list (children) -->
        <ul class="vuepress-toc-list">
          <!-- item -->
          <li class="vuepress-toc-item">
            <!-- link (active) -->
            <RouterLink class="vuepress-toc-link active" to="#bar-child">Bar Child</RouterLink>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
interface PageHeader {
  level: number
  title: string
  slug: string
  children: PageHeader[]
}
interface TocPropsOptions {
  containerTag: string
  containerClass: string
  listClass: string
  itemClass: string
  linkTag: 'a' | 'RouterLink'
  linkClass: string
  linkActiveClass: string
  linkChildrenActiveClass: string
}
const defaultOptions = {
containerTag: 'nav',
  containerClass: 'vuepress-toc',
  listClass: 'vuepress-toc-list',
  itemClass: 'vuepress-toc-item',
  linkTag: 'RouterLink',
  linkClass: 'vuepress-toc-link',
  linkActiveClass: 'active',
  linkChildrenActiveClass: 'active',
}
</script>

<template>
  <a
    class="npm-badge"
    :href="badgeLink"
    :title="package"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img :src="badgeImg" :alt="package" />
  </a>
</template>

<script setup lang="ts">
//导入vue的计算属性
import { computed } from 'vue'
const props = defineProps({
  package: {
    type: String,
    required: true,
  },
  distTag: {
    type: String,
    required: false,
    default: 'next',
  },
})
//徽章的链接
const badgeLink = computed(
  () => `https://www.npmjs.com/package/${props.package}`
)
//徽章的Label
const badgeLabel = computed(() => {
  if (props.distTag) {
    return `${props.package}@${props.distTag}`
  }
  return props.package
})
//徽章的链接Image
const badgeImg = computed(
  () =>
    `https://badgen.net/npm/v/${props.package}/${
      props.distTag
    }?label=${encodeURIComponent(badgeLabel.value)}`
)
</script>

<style scoped>
.npm-badge {
  margin-right: 0.5rem;
}
</style>
© 2021 GitHub, Inc.
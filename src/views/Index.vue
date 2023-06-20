<template>
  <div :id="buildView(component)">
    <div :class="buildWrap(component,'title')">
      <div :class="build(component,'title')">EStylist</div>
      <div :class="build(component,'des')">Email @ Fashion</div>
    </div>
    <div :class="buildWrap(component,'des')">
      {{ getStr(store.settings.language,pagei18n.index.des) }}
    </div>
  </div>
</template>



<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { build, buildView, buildWrap } from '../styles/name'
import { pagei18n, getStr } from '../core'
import { indexStore } from '../store/IndexPinia'
const component = 'index'
const store = indexStore()
</script>

<style lang="scss" scoped>
@import '../styles/views/Index.scss';
</style>
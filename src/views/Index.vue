<template>
  <div :id="buildView(component)">
    <div :class="buildWrap(component,'title')">
      <div :class="build(component,'title')">EStylist</div>
      <div :class="build(component,'des')">Email @ Fashion</div>
    </div>
    <div :class="buildWrap(component,'des')">
      I will help you make a fashion email!
    </div>
  </div>
</template>



<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { build, buildView, buildWrap } from '../styles/name'
const component = 'index'
</script>

<style lang="scss" scoped>
@import '../styles/views/Index.scss';
</style>
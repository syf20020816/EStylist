<template>
  <div>
  </div>

</template>

<script lang="ts">
export default {
  name: 'ComponentLib'
}
</script>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { build, buildView, buildWrap } from '../styles/name'
const component = 'ComponentLib'
</script>

<style lang="scss" scoped>
@use '../styles/name.scss' as *;
@use '../styles/src/var.scss' as *;

$component: 'ComponentLib';
</style>
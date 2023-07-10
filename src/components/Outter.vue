<template>
  <table width="100%" cellspacing="0" cellpadding="0" border="0">
    <tbody :style="itemDirection">
      <slot></slot>
    </tbody>
  </table>
</template>

<script lang="ts">
export default {
  name: 'Outter'
}
</script>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'

let props = defineProps({
  direction: {
    type: String,
    default: 'y'
  }
})

let itemDirection = computed(() => {
  let { direction } = props
  let directionStyle = 'display:flex;flex-direction:column;'
  if (direction == 'x') {
    directionStyle = 'display:flex;flex-direction:row;'
  }
  return directionStyle
})
</script>

<style lang="scss" scoped>
</style>
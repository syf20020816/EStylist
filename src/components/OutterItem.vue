<template>
  <tr :style="flexGrow">
    <td :style="ItemStyles" :colspan="ItemColSpan">
      <slot></slot>
    </td>
  </tr>
</template>

<script lang="ts">
export default {
  name: 'OutterItem'
}
</script>

<script lang="ts" setup>
import { ref, reactive, computed, defineProps, PropType } from 'vue'
import { AreaModel } from '../core'

const props = defineProps({
  data: {
    type: Object as PropType<AreaModel>,
    default: null
  }
})

let ItemStyles = computed(() => {
  let { bgColor, textAlign, direction, justifyContent, span } = props.data

  return 'background-color:' + bgColor + ' ;text-align: ' + textAlign + ';' + 'display:flex;align-items:center;justify-content:' + justifyContent + ';'
})

let ItemColSpan = computed(() => {
  let { span } = props.data
  return span
})

let flexGrow = computed(() => {
  let { span } = props.data
  let growSpan = span - 1
  return 'flex-grow:' + growSpan + ';'
})
</script>

<style lang="scss" scoped>
</style>
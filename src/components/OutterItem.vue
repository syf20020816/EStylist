<template>
  <tr>
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
import { parseArray } from '../util'

const props = defineProps({
  data: {
    type: Object as PropType<AreaModel>,
    default: null
  }
})

let ItemStyles = computed(() => {
  let { bgColor, fontSize, fontColor, fontFamily, textAlign, direction, padding, margin, justifyContent } = props.data
  let paddingParse = parseArray(padding)
  let marginParse = parseArray(margin)

  let mp = 'padding: ' + paddingParse + ';margin:' + marginParse + ';'

  return 'font-size: ' + fontSize + 'pt; line-height: 0pt;' + 'background-color:' + bgColor + ' ;text-align: ' + textAlign + ';font-family:' + fontFamily + ' ;color: ' + fontColor + ';' + mp + 'display:flex;align-items:center;justify-content:' + justifyContent + ';'
})

let ItemColSpan = computed(() => {
  let { span } = props.data
  return span
})
</script>

<style lang="scss" scoped>
</style>
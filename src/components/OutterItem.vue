<template>
  <tr>
    <td :style="ItemStyles" :colspan="ItemColSpan">

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
  let { bgColor, fontSize, fontColor, fontFamily, textAlign, direction, padding, margin } = props.data

  return 'font-size: ' + fontSize + 'pt; line-height: 0pt;' + 'background-color:' + bgColor + ' ;padding: ' + padding + ';margin:' + margin + ' ;text-align: ' + textAlign + ';font-family:' + fontFamily + ' ;color: ' + fontColor + ';'
})

let ItemColSpan = computed(() => {
  let { span } = props.data
  return span
})
</script>

<style lang="scss" scoped>
</style>
<template>
  <tr>
    <td :style="areaStyle">
      <ModelItemVue :data="item" v-for="item,index in itemData.modelItem" :key="index"></ModelItemVue>
    </td>
  </tr>
</template>

<script lang="ts">
export default {
  name: 'TempComponent'
}
</script>

<script lang="ts" setup>
import { AreaModel } from '../../core'
import { ref, reactive, computed, PropType, toRef } from 'vue'
import ModelItemVue from './ModelItem.vue'

const props = defineProps({
  data: {
    type: Object as PropType<AreaModel>,
    default: {}
  }
})

let itemData = toRef(props.data)

let areaStyle = computed(() => {
  let { bgColor, textAlign, direction, justifyContent } = props.data
  let directionStyle = 'flex-direction:column;'
  if (direction == 'x') {
    directionStyle = 'flex-direction:row;'
  }
  return 'background-color:' + bgColor + ' ;text-align: ' + textAlign + ';' + 'display:flex;align-items:center;justify-content:' + justifyContent + ';' + directionStyle
})
</script>

<style lang="scss" scoped>
</style>
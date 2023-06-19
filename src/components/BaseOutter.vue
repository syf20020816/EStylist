<template>
  <table>
    <tbody>
      <tr>
        <td :style="baseOutterStyles">
          <table width="100%" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <tr>
                <td :style="baseOutterPadding" :bgcolor="baseOtterColor">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <OutterItem :data="item" v-for="item,index in areaItem" :key="index"></OutterItem>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
export default {
  name: 'BaseOutter'
}
</script>

<script lang="ts" setup>
import { ref, reactive, computed, defineProps, PropType } from 'vue'
import { build, buildView, buildWrap } from '../styles/name'
import type { BaseModel, Model } from '../core'
import OutterItem from './OutterItem.vue'

const props = defineProps({
  data: {
    type: Object as PropType<Model>,
    default: null
  }
})

let baseOutterStyles = computed(() => {
  let { width, fontSize } = props.data.base
  return 'width: ' + width + 'px; min-width: ' + width + 'px; font-size: ' + fontSize + 'pt; line-height: 0pt; padding: 0; margin: 0; font-weight: normal'
})

let baseOutterPadding = computed(() => {
  let { padding } = props.data.base
  return 'padding: ' + padding + 'px'
})

let baseOtterColor = computed(() => {
  let { bgColor } = props.data.base
  return bgColor
})

let areaItem = computed(() => {
  let { areas } = props.data
  return areas
})
</script>

<style lang="scss" scoped>
</style>
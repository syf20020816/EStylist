<template>
  <span v-if="modelData.type=='div'" :style="modelStyles">{{ modelContent}}</span>
  <img v-else-if="modelData.type=='img'" :src="modelSrc" :alt="modelContent" :style="modelStyles">
  <a v-else-if="modelData.type=='a'" :href="modelSrc" :style="modelStyles" target="blank">{{ modelContent }}</a>
</template>

<script lang="ts">
export default {
  name: 'ModelItem'
}
</script>

<script lang="ts" setup>
import { ref, reactive, PropType, computed } from 'vue'
import { defalutModelItem, ModelItem } from '../../core'
import { ElMessage } from 'element-plus'
import { parseArray } from '../../util'

const props = defineProps({
  data: {
    type: Object as PropType<ModelItem>,
    default: defalutModelItem
  }
})

let modelData = computed(() => {
  return props.data
})

let modelContent = computed(() => {
  let { content } = props.data
  return content
})

let modelSrc = computed(() => {
  let { src } = props.data
  return src
})

let modelStyles = computed(() => {
  let { type, height, width, fontWeight, bgColor, fontSize, fontColor, fontFamily, textAlign, padding, margin, borderRadius, justifyContent, border } = props.data
  let styles = ''
  let paddingParse = parseArray(padding)
  let marginParse = parseArray(margin)
  let fontWeightParse = 100
  if (fontWeight) {
    fontWeightParse = 700
  }
  if (type == 'img') {
  } else if (type == 'a' || type == 'div') {
    styles = 'font-size: ' + fontSize + 'px; color: ' + fontColor + ';text-align:' + textAlign + ';display: inline-block;line-height: 1.5em;'
  } else {
    ElMessage({
      message: 'System Error! Please send email to author!(syf20020816@outlook.com)',
      type: 'error'
    })
  }
  styles +=
    'width: ' +
    width +
    '; height:' +
    height +
    ';font-weight:' +
    fontWeightParse +
    ' ;margin:' +
    marginParse +
    ';padding:' +
    paddingParse +
    ';background-color:' +
    bgColor +
    ';font-family:' +
    fontFamily +
    ';border-radius:' +
    borderRadius +
    'px;display: flex;align-items: center;justify-content: ' +
    justifyContent +
    ';border-left:' +
    border.left.width +
    'px ' +
    border.left.borderType +
    ' ' +
    border.left.color +
    ';border-top:' +
    border.top.width +
    'px ' +
    border.top.borderType +
    ' ' +
    border.top.color +
    ';border-right:' +
    border.right.width +
    'px ' +
    border.right.borderType +
    ' ' +
    border.right.color +
    ';border-bottom:' +
    border.bottom.width +
    'px ' +
    border.bottom.borderType +
    ' ' +
    border.bottom.color +
    ';'
  return styles
})
</script>

<style lang="scss" scoped>
</style>
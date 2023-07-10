<template>
  <el-collapse-item :name="generateUUID()">
    <template #title>
      {{ getStr(store.settings.language,pagei18n.edit.areaTitle) }}{{ areaItem+1 }}
    </template>
    <div>
      <div :class="build('template','base')">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.colSpan) }}</div>
        <el-input-number @change="childEndSpanChange" v-model="areaData.span" :step="1" :max="100" />
      </div>
      <div :class="build('template','base')">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.bgColor) }}</div>
        <el-color-picker @change="childEndBGChange" v-model="areaData.bgColor" />
      </div>
      <div :class="build('template','base')">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.contentPos) }}</div>
        <el-select @change="childEndJCChange" v-model="areaData.justifyContent" placeholder="Select Type">
          <el-option v-for="jarea in JustifyContent" :key="jarea.value" :label="jarea.label" :value="jarea.value" />
        </el-select>
      </div>
      <div style="display: flex;align-items: center;justify-content:end;margin-top: 1vh;flex-wrap: wrap;">
        <el-button style="margin: 4px;" type="primary" round @click="addModel(areaItem)">{{ getStr(store.settings.language,pagei18n.buttons.addModel) }}</el-button>
        <el-button style="margin: 4px;" type="warning" round @click="delModel(areaItem)">{{ getStr(store.settings.language,pagei18n.buttons.delModel) }}</el-button>
      </div>
      <AreaOrModel v-if="areaData.modelItem!=undefined" :data="areaData.modelItem" :index="areaItem" @upload-picture="uploadPicture"></AreaOrModel>
    </div>
  </el-collapse-item>
</template>

<script lang="ts">
export default {
  name: 'ChildEnd'
}
</script>

<script lang="ts" setup>
import { ref, reactive, PropType, computed } from 'vue'
import { Operation } from '@element-plus/icons-vue'
import { getStr, pagei18n, AreaModel, defaultAreaModel, JustifyContent, TextAlign, ModelTypes, Direction, FontFamily } from '../core'
import { generateUUID, convertImageToBase64 } from '../util'
import { indexStore } from '../store/IndexPinia'
import { build, buildView, buildWrap } from '../styles/name'
import AreaOrModel from './AreaOrModel.vue'

const component = 'ChildEnd'
const store = indexStore()
const emits = defineEmits(['upload-picture', 'add-model', 'del-model', 'change-span', 'change-bg', 'change-jc'])
const props = defineProps({
  area: {
    type: Object as PropType<AreaModel>,
    default: {}
  },
  index: {
    type: Number,
    default: 0
  },
  fIndex: {
    type: Number,
    default: 0
  }
})

let areaData = computed(() => {
  let { area } = props
  return area
})

let areaItem = computed(() => {
  let { index } = props
  return index
})

let areaFIndex = computed(() => {
  let { fIndex } = props
  return fIndex
})

// 上传本地照片
const uploadPicture = (file: any, index: number) => {
  emits('upload-picture', file, index)
}

// 添加模块
const addModel = (index: number) => {
  emits('add-model', index)
}

const delModel = (index: number) => {
  emits('del-model', index)
}

const childEndSpanChange = (e: any) => {
  emits('change-span', e, areaFIndex.value, areaItem.value)
}
const childEndBGChange = (e: any) => {
  emits('change-bg', e, areaFIndex.value, areaItem.value)
}
const childEndJCChange = (e: any) => {
  emits('change-jc', e, areaFIndex.value, areaItem.value)
}
</script>

<style lang="scss" scoped>
</style>
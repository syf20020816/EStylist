<template>
  <el-collapse-item :name="generateUUID()">
    <template #title>
      {{ getStr(store.settings.language,pagei18n.edit.areaTitle) }}{{ itemIndex+1 }}
    </template>
    <div>
      <div :class="build('template','base')">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.colSpan) }}</div>
        <el-input-number v-model="itemData.span" :step="1" :max="100" />
      </div>
      <div :class="build('template','base')">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.bgColor) }}</div>
        <el-color-picker v-model="itemData.bgColor" />
      </div>
      <div :class="build('template','base')">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.contentPos) }}</div>
        <el-select v-model="itemData.justifyContent" placeholder="Select Type">
          <el-option v-for="jcitem in JustifyContent" :key="jcitem.value" :label="jcitem.label" :value="jcitem.value" />
        </el-select>
      </div>
      <div :class="build('template','base')">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.areaNum) }}</div>
        <el-input-number v-model="itemData.modelItem.length" :step="1" :max="20" disabled />
      </div>
      <div :class="build('template','base')">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.direction) }}</div>
        <el-select v-model="itemData.direction" placeholder="Select Direction">
          <el-option v-for="item in Direction" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div style="display: flex;align-items: center;justify-content:end;margin-top: 1vh;flex-wrap: wrap;">
        <el-button style="margin: 4px;" type="primary" round @click="addModel(index)">{{ getStr(store.settings.language,pagei18n.buttons.addModel) }}</el-button>
        <el-button style="margin: 4px;" type="warning" round @click="delModel(index)">{{ getStr(store.settings.language,pagei18n.buttons.delModel) }}</el-button>
        <!-- <el-button style="margin: 4px;" type="success" round @click="saveAreaChange(index)">{{ getStr(store.settings.language,pagei18n.buttons.changeArea) }}</el-button> -->
      </div>
      <slot></slot>
    </div>
  </el-collapse-item>
</template>

<script lang="ts">
export default {
  name: 'MailEditItem'
}
</script>

<script lang="ts" setup>
import { ref, reactive, toRef, PropType, computed } from 'vue'
import { Operation } from '@element-plus/icons-vue'
import { getStr, pagei18n, AreaModel, defaultAreaModel, JustifyContent, TextAlign, ModelTypes, Direction, FontFamily } from '../core'
import { generateUUID, convertImageToBase64 } from '../util'
import { indexStore } from '../store/IndexPinia'
import { build, buildView, buildWrap } from '../styles/name'

const component = 'MailEditItem'
const store = indexStore()
let flexArea = ref(false)
const emits = defineEmits(['upload-picture', 'add-model', 'del-model'])
const props = defineProps({
  data: {
    type: Object as PropType<AreaModel>,
    default: defaultAreaModel
  },
  index: {
    type: Number,
    default: 0
  }
})

// let itemData = toRef(props.data)
let itemData = computed(() => {
  let { data } = props
  return data
})
let itemIndex = computed(() => {
  let { index } = props
  return index
})

// 添加模块
const addModel = (index: number) => {
  emits('add-model', index)
}

const delModel = (index: number) => {
  emits('del-model', index)
}
</script>

<style lang="scss" scoped>
</style>
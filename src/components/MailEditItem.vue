<template>
  <el-collapse-item :name="generateUUID()" v-for="citem,index in areas" :key="index">
    <template #title>
      {{ getStr(store.settings.language,pagei18n.edit.areaTitle) }}{{ index+1 }}
    </template>
    <div>
      <div :class="build('template','base')">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.colSpan) }}</div>
        <el-input-number v-model="citem.span" :step="1" :max="100" />
      </div>
      <div :class="build('template','base')">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.bgColor) }}</div>
        <el-color-picker v-model="citem.bgColor" />
      </div>
      <div :class="build('template','base')">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.contentPos) }}</div>
        <el-select v-model="citem.justifyContent" placeholder="Select Type">
          <el-option v-for="jcitem in JustifyContent" :key="jcitem.value" :label="jcitem.label" :value="jcitem.value" />
        </el-select>
      </div>
      <div :class="build('template','base')">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.areaNum) }}</div>
        <el-input-number v-model="citem.areaNum" :step="1" :max="20" />
      </div>
      <div :class="build('template','base')">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.direction) }}</div>
        <el-select v-model="citem.direction" placeholder="Select Direction">
          <el-option v-for="item in Direction" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div style="display: flex;align-items: center;justify-content:end;margin-top: 1vh;flex-wrap: wrap;">
        <el-button style="margin: 4px;" type="primary" round @click="addModel(index)">{{ getStr(store.settings.language,pagei18n.buttons.addModel) }}</el-button>
        <el-button style="margin: 4px;" type="warning" round @click="delModel(index)">{{ getStr(store.settings.language,pagei18n.buttons.delModel) }}</el-button>
        <el-button style="margin: 4px;" type="success" round @click="saveAreaChange(index)">{{ getStr(store.settings.language,pagei18n.buttons.changeArea) }}</el-button>
      </div>

      <AreaOrModel v-if="citem.modelItem!=undefined" :data="citem.modelItem" :index="index" @upload-picture="uploadPicture"></AreaOrModel>
      <ChildEnd v-for="cnItem,cnIndex in citem.areas" :key="cnIndex" :data="cnItem" :index="cnIndex" :fIndex="index" @change-span="childEndSpanChange" @change-bg="childEndBGChange" @change-jc="childEndJCChange"></ChildEnd>
    </div>
  </el-collapse-item>
</template>

<script lang="ts">
export default {
  name: 'MailEditItem'
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
import ChildEnd from './ChildEnd.vue'

const component = 'MailEditItem'
const store = indexStore()
const emits = defineEmits(['upload-picture', 'add-model', 'del-model', 'save', 'change-span', 'change-bg', 'change-jc'])
const props = defineProps({
  areas: {
    type: Array<AreaModel>,
    default: defaultAreaModel
  }
})

let areas = computed(() => {
  let { areas } = props
  return areas
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

/**
 * 添加子区域的子区域
 * 若子区域添加子区域则会销毁当前的模块
 */
const saveAreaChange = (index: number) => {
  console.log(index)
  emits('save', index)
}

// /**
//  * 确认添加子区域
//  */
// const addChildAreaConfirm = () => {}

const childEndSpanChange = (e: any, fIndex: number, index: number) => {
  emits('change-span', e, fIndex, index)
}
const childEndBGChange = (e: any, fIndex: number, index: number) => {
  emits('change-bg', e, fIndex, index)
}
const childEndJCChange = (e: any, fIndex: number, index: number) => {
  emits('change-jc', e, fIndex, index)
}
</script>

<style lang="scss" scoped>
</style>
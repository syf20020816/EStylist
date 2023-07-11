<template>
  <div :class="build('template','base')" style="display: flex;flex-wrap: wrap;">
    <div class="tmptitle" style="cursor: pointer;width: 100%;font-size:14px;box-sizing: border-box;" @click="showFlex">
      <el-icon>
        <Operation />
      </el-icon>
      {{ getStr(store.settings.language,pagei18n.edit.modelTitle) }} {{ itemIndex + 1 }}
    </div>
    <span v-if="!flexArea">
      <div :class="build('template','base')">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.modelTypes) }}</div>
        <el-select v-model="itemData.type" placeholder="Select Type">
          <el-option v-for="titem in ModelTypes" :key="titem.value" :label="titem.label" :value="titem.value" />
        </el-select>
      </div>
      <div :class="build('template','base')">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.height) }}</div>
        <el-input placeholder="Please input height" v-model="itemData.height" />
      </div>
      <div :class="build('template','base')">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.width) }}</div>
        <el-input v-model="itemData.width" placeholder="Please input width" />
      </div>
      <div :class="build('template','base')">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.contentPos) }}</div>
        <el-select v-model="itemData.justifyContent" placeholder="Select Type">
          <el-option v-for="jcitem in JustifyContent" :key="jcitem.value" :label="jcitem.label" :value="jcitem.value" />
        </el-select>
      </div>
      <div :class="build('template','base')">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.radius) }}</div>
        <el-input v-model="itemData.borderRadius" placeholder="Please input radius" />
      </div>
      <div :class="build('template','base')">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.content) }}</div>
        <el-input v-model="itemData.content" placeholder="Please input text" />
      </div>
      <div :class="build('template','base')" v-if="itemData.type=='img'">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.upload) }}</div>
        <input type="file" name="" id="upload-picture" @change="uploadPicture(itemIndex,$event)">
      </div>
      <div :class="build('template','base')" v-if="itemData.type!='div'">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.src) }}</div>
        <el-input v-model="itemData.src" placeholder="Please input address" />
      </div>
      <div :class="build('template','base')">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.bgColor) }}</div>
        <el-color-picker v-model="itemData.bgColor" />
      </div>
      <div :class="build('template','base')" v-if="itemData.type!='img'">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.fontSize) }}</div>
        <el-input-number v-model="itemData.fontSize" :step="2" :max="80" />
      </div>
      <div :class="build('template','base')" v-if="itemData.type!='img'">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.fontWeight) }}</div>
        <el-switch v-model="itemData.fontWeight" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
      </div>
      <div :class="build('template','base')" v-if="itemData.type!='img'">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.fontFamily) }}</div>
        <el-select v-model="itemData.fontFamily" placeholder="Select FontFamily">
          <el-option v-for="fitem in FontFamily" :key="fitem.value" :label="fitem.label" :value="fitem.value" />
        </el-select>
      </div>
      <div :class="build('template','base')" v-if="itemData.type!='img'">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.fontColor) }}</div>
        <el-color-picker v-model="itemData.fontColor" />
      </div>
      <div :class="build('template','base')" v-if="itemData.type!='img'">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.textAlign) }}</div>
        <el-select v-model="itemData.textAlign" placeholder="Select FontFamily">
          <el-option v-for="taitem in TextAlign" :key="taitem.value" :label="taitem.label" :value="taitem.value" />
        </el-select>
      </div>
      <div :class="build('template','base')" style="flex-wrap: wrap;">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.padding) }}</div>
        <div class="wrapline">{{ getStr(store.settings.language,pagei18n.edit.top) }}:<el-input-number @change="(currentValue:number,oldValue:number)=>paddingChange(currentValue,oldValue,0)" v-model="itemData.padding[0]" :step="1" :max="1000" /></div>
        <div class="wrapline">{{ getStr(store.settings.language,pagei18n.edit.right) }}:<el-input-number @change="(currentValue:number,oldValue:number)=>paddingChange(currentValue,oldValue,1)" v-model="itemData.padding[1]" :step="1" :max="1000" /></div>
        <div class="wrapline">{{ getStr(store.settings.language,pagei18n.edit.bottom) }}:<el-input-number @change="(currentValue:number,oldValue:number)=>paddingChange(currentValue,oldValue,2)" v-model="itemData.padding[2]" :step="1" :max="1000" /></div>
        <div class="wrapline">{{ getStr(store.settings.language,pagei18n.edit.left) }}:<el-input-number @change="(currentValue:number,oldValue:number)=>paddingChange(currentValue,oldValue,3)" v-model="itemData.padding[3]" :step="1" :max="1000" /></div>
      </div>
      <div :class="build('template','base')" style="flex-wrap: wrap;">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.margin) }}</div>
        <div class="wrapline">{{ getStr(store.settings.language,pagei18n.edit.top) }}:<el-input-number @change="(currentValue:number,oldValue:number)=>marginChange(currentValue,oldValue,0)" v-model="itemData.margin[0]" :step="1" :max="1000" /></div>
        <div class="wrapline">{{ getStr(store.settings.language,pagei18n.edit.right) }}:<el-input-number @change="(currentValue:number,oldValue:number)=>marginChange(currentValue,oldValue,1)" v-model="itemData.margin[1]" :step="1" :max="1000" /></div>
        <div class="wrapline">{{ getStr(store.settings.language,pagei18n.edit.bottom) }}:<el-input-number @change="(currentValue:number,oldValue:number)=>marginChange(currentValue,oldValue,2)" v-model="itemData.margin[2]" :step="1" :max="1000" /></div>
        <div class="wrapline">{{ getStr(store.settings.language,pagei18n.edit.left) }}:<el-input-number @change="(currentValue:number,oldValue:number)=>marginChange(currentValue,oldValue,3)" v-model="itemData.margin[3]" :step="1" :max="1000" /></div>
      </div>
    </span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AreaOrModel'
}
</script>

<script lang="ts" setup>
import { ref, reactive, PropType, computed, toRef } from 'vue'
import { Operation } from '@element-plus/icons-vue'
import { getStr, pagei18n, AreaModel, defaultAreaModel, JustifyContent, TextAlign, ModelTypes, Direction, FontFamily, ModelItem, defalutModelItem } from '../core'
import { generateUUID, convertImageToBase64 } from '../util'
import { indexStore } from '../store/IndexPinia'
import { build, buildView, buildWrap } from '../styles/name'
const store = indexStore()
let flexArea = ref(false)

const emits = defineEmits(['upload-picture', 'margin-change', 'padding-change'])
const props = defineProps({
  data: {
    type: Object as PropType<ModelItem>,
    default: defalutModelItem
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

// let itemData = computed(() => {
//   let { data } = props
//   return data!
// })
let itemData = toRef(props.data)

let itemIndex = computed(() => {
  let { index } = props
  return index
})
let itemfIndex = computed(() => {
  let { fIndex } = props
  return fIndex
})

// 上传本地照片
const uploadPicture = (index: number, event: any) => {
  const file = event.target.files[0]
  emits('upload-picture', file, itemfIndex.value, index)
}

const showFlex = () => {
  flexArea.value = !flexArea.value
}

const marginChange = (currentValue: any, oldValue: any, index: number) => {
  emits('margin-change', itemfIndex.value, itemIndex.value, index, currentValue)
}

const paddingChange = (currentValue: any, oldValue: any, index: number) => {
  emits('padding-change', itemfIndex.value, itemIndex.value, index, currentValue)
}
</script>

<style lang="scss" scoped>
</style>
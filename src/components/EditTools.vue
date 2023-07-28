<template>
  <div :id="buildView(component)">
    <div :class="buildWrap(component,'tool1')">
      <div :class="buildWrap(component,'color')" v-if="fontOrColor">
        <div :class="build('color','main')" :style="colors" @click="showColorPicker">
          <input ref="colorPickerRef" type="color" v-model="store.globalColor" name="" id="color-picker" style="display: none;">
        </div>
        <div class="details">
          <span style="font-weight: 700;">调色器</span>
          <el-tooltip placement="top">
            <template #content>
              调色器可以控制全局颜色以及组件颜色
            </template>
            <el-icon size="16">
              <QuestionFilled />
            </el-icon>
          </el-tooltip>
          <el-tooltip placement="top">
            <template #content>
              切换工具:工具有调色器和字体调节器
            </template>
            <el-icon size="16" @click="switchTools">
              <Switch />
            </el-icon>
          </el-tooltip>
          <el-input v-model="store.globalColor" placeholder="transparent" clearable></el-input>
        </div>
      </div>
      <div :class="buildWrap(component,'font')" v-else>
        <div class="details">
          <span style="font-weight: 700;">字体调节器</span>
          <el-tooltip placement="top">
            <template #content>
              字体调节器用于控制字体样式<br>
              样式:颜色、大小、字体、粗细等
            </template>
            <el-icon size="16">
              <QuestionFilled />
            </el-icon>
          </el-tooltip>
          <el-tooltip placement="top">
            <template #content>
              切换工具:工具有调色器和字体调节器
            </template>
            <el-icon size="16" @click="switchTools">
              <Switch />
            </el-icon>
          </el-tooltip>
          <div :class="build('font','main')" @click="showColorPicker">
            <div :class="build('template','base')">
              <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.fontSize) }}</div>
              <el-input-number v-model="store.fontStyles.fontSize" :step="2" :max="80" />
            </div>
            <div :class="build('template','base')">
              <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.fontWeight) }}</div>
              <el-switch v-model="store.fontStyles.fontWeight" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
            </div>
            <div :class="build('template','base')">
              <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.fontFamily) }}</div>
              <el-select v-model="store.fontStyles.fontFamily" placeholder="Select FontFamily">
                <el-option v-for="fitem in FontFamily" :key="fitem.value" :label="fitem.label" :value="fitem.value" />
              </el-select>
            </div>
            <div :class="build('template','base')">
              <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.fontColor) }}</div>
              <el-color-picker v-model="store.fontStyles.fontColor" />
            </div>
          </div>

        </div>
      </div>
    </div>
    <hr>
    <div :class="buildWrap(component,'tool2')">
      <el-input v-model="store.activeTarget.name" placeholder="choose name" disabled>
        <template #prepend>目标:</template>
      </el-input>
      <div :class="build('tool2','info')">
        ❗note: <span style="font-size: 14px;">{{ store.activeTarget.info }}</span>
      </div>
      <hr />
      <div :class="build('tool2','config')">
        <div class="configs_title">
          <span style="font-weight: 700;">参数配置</span>
          <el-tooltip placement="bottom">
            <template #content>
              底板|区域|组件都是由下方参数定义的<br>
              通过修改参数定义自己的设计
            </template>
            <el-icon size="16">
              <QuestionFilled />
            </el-icon>
          </el-tooltip>
        </div>
        <EditBasePlate v-if="mailRep.targetChoose.basePlate.active" @copy-color="copyColor"></EditBasePlate>
        <EditArea v-else-if="mailRep.targetChoose.area.active" :data="store.currentMailModel.areas[mailRep.areaId]" @copy-color="copyColor(mailRep.areaId)"></EditArea>
        <EditModel v-else-if="mailRep.targetChoose.model.active" :data="store.currentMailModel.areas[mailRep.modelId.areaIndex].modelItem[mailRep.modelId.modelIndex]" @copy-color="copyColor(mailRep.modelId.areaIndex,mailRep.modelId.modelIndex)" @copy-font="copyFont(mailRep.modelId.areaIndex,mailRep.modelId.modelIndex)" @copy-border-color="copyBorderColor" @margin-change="marginChange" @padding-change="paddingChange">
        </EditModel>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'EditTools'
}
</script>

<script lang="ts" setup>
import { ref, reactive, computed, nextTick } from 'vue'
import { build, buildView, buildWrap } from '../styles/name'
import { QuestionFilled, Switch } from '@element-plus/icons-vue'
import { getStr, pagei18n, FontFamily } from '../core'
import { indexStore } from '../store/IndexPinia'
import { mailStore } from '../store/MailPinia'
import EditBasePlate from './edit/EditBasePlate.vue'
import EditArea from './edit/EditArea.vue'
import EditModel from './edit/EditModel.vue'

const mailRep = mailStore()
const store = indexStore()
const colorPickerRef = ref()
const component = 'EditTools'
let fontOrColor = ref(true)
let targetChoose = reactive({
  basePlate: false,
  area: false,
  model: false
})

let colors = computed(() => {
  let mainColor = store.globalColor
  let weakColor = '#ff' + mainColor.slice(3, mainColor.length)
  return 'background: linear-gradient(90deg,' + weakColor + ',' + mainColor + ',' + weakColor + ');'
})

const showColorPicker = () => {
  colorPickerRef.value.click()
}
//复制颜色
const copyColor = (areaIndex?: number, modelIndex?: number) => {
  if (areaIndex == undefined) {
    store.currentMailModel.base.bgColor = store.globalColor
  } else {
    if (modelIndex == undefined) {
      store.currentMailModel.areas[areaIndex].bgColor = store.globalColor
    } else {
      store.currentMailModel.areas[areaIndex].modelItem[modelIndex].bgColor = store.globalColor
    }
  }
}

const switchTools = () => {
  fontOrColor.value = !fontOrColor.value
}
//复制字体
const copyFont = (areaIndex: number, modelIndex: number) => {
  let { fontColor, fontFamily, fontSize, fontWeight } = store.fontStyles
  store.currentMailModel.areas[areaIndex].modelItem[modelIndex].fontColor = fontColor
  store.currentMailModel.areas[areaIndex].modelItem[modelIndex].fontFamily = fontFamily
  store.currentMailModel.areas[areaIndex].modelItem[modelIndex].fontSize = fontSize
  store.currentMailModel.areas[areaIndex].modelItem[modelIndex].fontWeight = fontWeight
}

//复制边框颜色
const copyBorderColor = (direction: string) => {
  let { areaIndex } = mailRep.modelId
  let { modelIndex } = mailRep.modelId
  store.deepCloneBorderColor(areaIndex, modelIndex, direction)
}

const paddingChange = (value: number, direction: number) => {
  let { areaIndex } = mailRep.modelId
  let { modelIndex } = mailRep.modelId
  store.paddingChange(areaIndex, modelIndex, direction, value)
}
const marginChange = (value: number, direction: number) => {
  let { areaIndex } = mailRep.modelId
  let { modelIndex } = mailRep.modelId
  store.marginChange(areaIndex, modelIndex, direction, value)
}
</script>

<style lang="scss" scoped>
@use '../styles/components/EditTools.scss';
</style>
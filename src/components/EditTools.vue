<template>
  <div :id="buildView(component)">
    <div :class="buildWrap(component,'tool1')">
      <div :class="buildWrap(component,'color')" v-if="fontOrColor">
        <div :class="build('color','main')" :style="colors" @click="showColorPicker">
          <input ref="colorPickerRef" type="color" v-model="store.globalColor" name="" id="color-picker" style="display: none;">
        </div>
        <div class="details">
          <span style="font-weight: 700;">{{ getStr(store.settings.language,pagei18n.edit.tool.color)}}</span>
          <el-tooltip placement="top">
            <template #content>
              {{ getStr(store.settings.language,pagei18n.edit.tool.colorInfo)}}
            </template>
            <el-icon size="16">
              <QuestionFilled />
            </el-icon>
          </el-tooltip>
          <el-tooltip placement="top">
            <template #content>
              {{ getStr(store.settings.language,pagei18n.edit.tool.switch)}}
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
          <span style="font-weight: 700;">{{ getStr(store.settings.language,pagei18n.edit.tool.font)}}</span>
          <el-tooltip placement="top">
            <template #content>
              {{ getStr(store.settings.language,pagei18n.edit.tool.fontInfo)}}
            </template>
            <el-icon size="16">
              <QuestionFilled />
            </el-icon>
          </el-tooltip>
          <el-tooltip placement="top">
            <template #content>
              {{ getStr(store.settings.language,pagei18n.edit.tool.switch)}}
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
      <el-input :value="getStr(store.settings.language,store.activeTarget.name)" placeholder="choose name" disabled>
        <template #prepend>{{ getStr(store.settings.language,pagei18n.edit.tool.target) }}:</template>
      </el-input>
      <div :class="build('tool2','info')">
        ❗note: <span style="font-size: 14px;">{{ getStr(store.settings.language,store.activeTarget.info) }}</span>
      </div>
      <hr />
      <div :class="build('tool2','config')">
        <div class="configs_title">
          <span style="font-weight: 700;">{{ getStr(store.settings.language,pagei18n.edit.tool.config) }}</span>
          <el-tooltip placement="bottom">
            <template #content>
              {{ getStr(store.settings.language,pagei18n.edit.tool.configInfo[0]) }}<br>
              {{ getStr(store.settings.language,pagei18n.edit.tool.configInfo[1]) }}
            </template>
            <el-icon size="16">
              <QuestionFilled />
            </el-icon>
          </el-tooltip>
        </div>
        <EditBasePlate v-if="mailRep.targetChoose.basePlate.active" @copy-color="copyColor"></EditBasePlate>
        <EditArea v-else-if="mailRep.targetChoose.area.active" :data="store.currentMailModel.areas[mailRep.areaId]" @copy-color="copyColor(mailRep.areaId)"></EditArea>
        <EditModel v-else-if="mailRep.targetChoose.model.active" :data="store.currentMailModel.areas[mailRep.modelId.areaIndex].modelItem[mailRep.modelId.modelIndex]" @copy-border-change="copyBorderChange" @copy-color="copyColor(mailRep.modelId.areaIndex,mailRep.modelId.modelIndex)" @copy-font="copyFont(mailRep.modelId.areaIndex,mailRep.modelId.modelIndex)" @copy-border-color="copyBorderColor" @margin-change="marginChange" @padding-change="paddingChange" @upload-picture="uploadPicture">
        </EditModel>
        <EditArea v-else-if="mailRep.targetChoose.componentArea.active" :data="store.currentComponent" @copy-color="copyColorComponentArea"></EditArea>
        <EditModel v-else-if="mailRep.targetChoose.component.active" :data="store.currentComponent.modelItem[mailRep.componentIndex]" @copy-color="copyColorComponent" @copy-border-change="copyBorderChangeComponent" @copy-font="copyFontComponent" @copy-border-color="copyBorderColorComponent" @margin-change="marginChangeComponent" @padding-change="paddingChangeComponent" @upload-picture="uploadPictureComponent">
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
import { convertImageToBase64 } from '../util'
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
//复制颜色到组件的区域中
const copyColorComponentArea = () => {
  store.currentComponent.bgColor = store.globalColor
}

const copyColorComponent = () => {
  let { componentIndex: index } = mailRep
  store.currentComponent.modelItem[index].bgColor = store.globalColor
  console.log(store.currentComponent)
  console.log(store.currentMailModel.areas)
}

//修改内边距
//使用deep clone
const paddingChange = (value: number, direction: number) => {
  let { areaIndex } = mailRep.modelId
  let { modelIndex } = mailRep.modelId
  store.paddingChange(areaIndex, modelIndex, direction, value)
}
//修改外边距
//使用deep clone
const marginChange = (value: number, direction: number) => {
  let { areaIndex } = mailRep.modelId
  let { modelIndex } = mailRep.modelId
  store.marginChange(areaIndex, modelIndex, direction, value)
}

// 上传本地照片
const uploadPicture = (file: any) => {
  let { areaIndex } = mailRep.modelId
  let { modelIndex } = mailRep.modelId
  convertImageToBase64(file)
    .then((base64: any) => {
      store.currentMailModel.areas[areaIndex].modelItem[modelIndex].src = base64
    })
    .catch(error => {})
}

//修改组件内边距
//使用deep clone
const paddingChangeComponent = (value: number, direction: number) => {
  let { componentIndex: index } = mailRep
  store.paddingChangeComponent(index, direction, value)
}
//修改组件外边距
//使用deep clone
const marginChangeComponent = (value: number, direction: number) => {
  let { componentIndex: index } = mailRep
  store.marginChangeComponent(index, direction, value)
}

// 上传本地照片到组件中
const uploadPictureComponent = (file: any) => {
  let { componentIndex: index } = mailRep
  convertImageToBase64(file)
    .then((base64: any) => {
      store.currentComponent.modelItem[index].src = base64
    })
    .catch(error => {})
}

const copyFontComponent = () => {
  let { componentIndex: index } = mailRep
  let { fontColor, fontFamily, fontSize, fontWeight } = store.fontStyles
  store.currentComponent.modelItem[index].fontColor = fontColor
  store.currentComponent.modelItem[index].fontFamily = fontFamily
  store.currentComponent.modelItem[index].fontSize = fontSize
  store.currentComponent.modelItem[index].fontWeight = fontWeight
}

const copyBorderChange = (newValue: number, direction: string) => {
  let { areaIndex } = mailRep.modelId
  let { modelIndex } = mailRep.modelId
  store.deepCloneBorderChange(areaIndex, modelIndex, direction, newValue)
}

const copyBorderColorComponent = (direction: string) => {
  let { componentIndex: index } = mailRep
  store.deepCloneBorderColorComponent(index, direction)
}

const copyBorderChangeComponent = (newValue: number, direction: string) => {
  let { componentIndex: index } = mailRep
  store.deepCloneBorderChangeComponent(index, direction, newValue)
}
</script>

<style lang="scss" scoped>
@use '../styles/components/EditTools.scss';
</style>
<template>
  <div :id="buildView(component)">
    <span v-if="!flexArea">
      <div :class="build('template','base')">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.componentName) }}</div>
        <el-input placeholder="Please input model name" v-model="itemData.name" />
      </div>
      <div :class="build('template','base')">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.modelTypes) }}</div>
        <el-select v-model="itemData.type" placeholder="Select Type" @change="changeModelType">
          <el-option v-for="titem in ModelTypes" :key="titem.value" :label="getStr(store.settings.language,titem.label)" :value="titem.value" />
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
        <el-input-number v-model="itemData.borderRadius" :step="2" :max="10000" />
      </div>
      <div :class="build('template','base')">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.content) }}</div>
        <el-input v-model="itemData.content" placeholder="Please input text" />
      </div>
      <div :class="build('template','base')" v-if="itemData.type=='img'">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.upload) }}</div>

        <input type="file" name="" id="upload-picture" @change="uploadPicture">
      </div>
      <div :class="build('template','base')" v-if="itemData.type!='div'">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.src) }}</div>
        <el-input v-model="itemData.src" placeholder="Please input address" />
      </div>
      <div :class="build('template','base')">
        <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.bgColor) }}</div>
        <el-input v-model="itemData.bgColor" :placeholder="getStr(store.settings.language,pagei18n.placeholder.color)" clearable></el-input>
        <el-tooltip class="box-item" effect="dark" :content="getStr(store.settings.language,pagei18n.buttons.copyColor)" placement="right">
          <el-button type="primary" :icon="CopyDocument" circle style="margin: 0 6px;" @click="emits('copyColor')"></el-button>
        </el-tooltip>
      </div>
      <el-collapse accordion>
        <el-collapse-item name="1">
          <template #title>
            {{ getStr(store.settings.language,pagei18n.edit.fontStyles) }}
            <el-tooltip class="box-item" effect="dark" :content="getStr(store.settings.language,pagei18n.buttons.copyFont)" placement="right">
              <el-button type="primary" :icon="CopyDocument" circle style="margin: 0 6px;" @click="emits('copyFont')"></el-button>
            </el-tooltip>
          </template>
          <div :class="build('template','base')">
            <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.fontSize) }}</div>
            <el-input-number v-model="itemData.fontSize" :step="2" :max="80" />
          </div>
          <div :class="build('template','base')">
            <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.fontWeight) }}</div>
            <el-switch v-model="itemData.fontWeight" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
          </div>
          <div :class="build('template','base')">
            <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.fontFamily) }}</div>
            <el-select v-model="itemData.fontFamily" placeholder="Select FontFamily">
              <el-option v-for="fitem in FontFamily" :key="fitem.value" :label="fitem.label" :value="fitem.value" />
            </el-select>
          </div>
          <div :class="build('template','base')">
            <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.fontColor) }}</div>
            <el-color-picker v-model="itemData.fontColor" />
          </div>
        </el-collapse-item>
      </el-collapse>
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
      <el-collapse accordion>
        <el-collapse-item name="1">
          <template #title>
            {{ getStr(store.settings.language,pagei18n.edit.border) }}
          </template>
          <div :class="build('template','base2')">
            <span class="baseline">
              <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.top) }}:</div>
              <el-input-number v-model="itemData.border.top.width" :step="0.5" :max="80" @change="(newValue:number,oldValue:number)=>borderWidthChange(newValue,oldValue,'top')" />
            </span>
            <span class="baseline">
              <el-select v-model="itemData.border.top.borderType" placeholder="Select Type">
                <el-option v-for="titem in BorderTypes" :key="titem.value" :label="titem.label" :value="titem.value" />
              </el-select>
              <el-input style="width: 40%;" v-model="itemData.border.top.color" :placeholder="getStr(store.settings.language,pagei18n.placeholder.color)" clearable></el-input>
              <el-tooltip class="box-item" effect="dark" :content="getStr(store.settings.language,pagei18n.buttons.copyColor)" placement="right">
                <el-button type="primary" :icon="CopyDocument" circle style="margin: 0 6px;" @click="copyBorderColor('top')"></el-button>
              </el-tooltip>
            </span>
          </div>
          <div :class="build('template','base2')">
            <span class="baseline">
              <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.right) }}:</div>
              <el-input-number v-model="itemData.border.right.width" :step="0.5" :max="80" @change="(newValue:number,oldValue:number)=>borderWidthChange(newValue,oldValue,'right')" />
            </span>
            <span class="baseline">
              <el-select v-model="itemData.border.right.borderType" placeholder="Select Type">
                <el-option v-for="titem in BorderTypes" :key="titem.value" :label="titem.label" :value="titem.value" />
              </el-select>
              <el-input style="width: 40%;" v-model="itemData.border.right.color" :placeholder="getStr(store.settings.language,pagei18n.placeholder.color)" clearable></el-input>
              <el-tooltip class="box-item" effect="dark" :content="getStr(store.settings.language,pagei18n.buttons.copyColor)" placement="right">
                <el-button type="primary" :icon="CopyDocument" circle style="margin: 0 6px;" @click="copyBorderColor('right')"></el-button>
              </el-tooltip>
            </span>
          </div>
          <div :class="build('template','base2')">
            <span class="baseline">
              <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.bottom) }}:</div>
              <el-input-number v-model="itemData.border.bottom.width" :step="0.5" :max="80" @change="(newValue:number,oldValue:number)=>borderWidthChange(newValue,oldValue,'bottom')" />
            </span>
            <span class="baseline">
              <el-select v-model="itemData.border.bottom.borderType" placeholder="Select Type">
                <el-option v-for="titem in BorderTypes" :key="titem.value" :label="titem.label" :value="titem.value" />
              </el-select>
              <el-input style="width: 40%;" v-model="itemData.border.bottom.color" :placeholder="getStr(store.settings.language,pagei18n.placeholder.color)" clearable></el-input>
              <el-tooltip class="box-item" effect="dark" :content="getStr(store.settings.language,pagei18n.buttons.copyColor)" placement="right">
                <el-button type="primary" :icon="CopyDocument" circle style="margin: 0 6px;" @click="copyBorderColor('bottom')"></el-button>
              </el-tooltip>
            </span>
          </div>
          <div :class="build('template','base2')">
            <span class="baseline">
              <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.left) }}:</div>
              <el-input-number v-model="itemData.border.left.width" :step="0.5" :max="80" @change="(newValue:number,oldValue:number)=>borderWidthChange(newValue,oldValue,'left')" />
            </span>
            <span class="baseline">
              <el-select v-model="itemData.border.left.borderType" placeholder="Select Type">
                <el-option v-for="titem in BorderTypes" :key="titem.value" :label="titem.label" :value="titem.value" />
              </el-select>
              <el-input style="width: 40%;" v-model="itemData.border.left.color" :placeholder="getStr(store.settings.language,pagei18n.placeholder.color)" clearable></el-input>
              <el-tooltip class="box-item" effect="dark" :content="getStr(store.settings.language,pagei18n.buttons.copyColor)" placement="right">
                <el-button type="primary" :icon="CopyDocument" circle style="margin: 0 6px;" @click="copyBorderColor('left')"></el-button>
              </el-tooltip>
            </span>
          </div>
        </el-collapse-item>
      </el-collapse>
    </span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'EditModel'
}
</script>

<script lang="ts" setup>
import { ref, reactive, PropType, computed } from 'vue'
import { getStr, pagei18n, AreaModel, defaultAreaModel, BorderTypes, JustifyContent, TextAlign, ModelTypes, Direction, FontFamily, ModelItem, defalutModelItem } from '../../core'
import { indexStore } from '../../store/IndexPinia'
import { build, buildView, buildWrap } from '../../styles/name'
import { CopyDocument } from '@element-plus/icons-vue'
import { mailStore } from '../../store/MailPinia'
const component = 'EditModel'
const store = indexStore()
const mailRep = mailStore()
let flexArea = ref(false)

const emits = defineEmits(['copyColor', 'copyFont', 'copyBorderColor', 'marginChange', 'paddingChange', 'uploadPicture', 'copyBorderChange'])
const props = defineProps({
  data: {
    type: Object as PropType<ModelItem>,
    default: defalutModelItem
  }
})

let itemData = computed(() => {
  let { data } = props
  return data
})

// 上传本地照片
const uploadPicture = (event: any) => {
  const file = event.target.files[0]
  emits('uploadPicture', file)
}

const showFlex = () => {
  flexArea.value = !flexArea.value
}

const marginChange = (currentValue: any, oldValue: any, direction: number) => {
  emits('marginChange', currentValue, direction)
}

const paddingChange = (currentValue: any, oldValue: any, direction: number) => {
  emits('paddingChange', currentValue, direction)
}

const changeModelType = (e: string) => {
  let res = ''
  switch (e) {
    case 'div':
      res = '文字'
      break
    case 'img':
      res = '图片'
      break
    case 'a':
      res = '链接'
      break
    default:
      res = '自定义组件'
      break
  }
  itemData.value.name = res
}

const copyBorderColor = (direction: string) => {
  emits('copyBorderColor', direction)
}

const borderWidthChange = (newValue: number, oldValue: number, direction: string) => {
  emits('copyBorderChange', newValue, direction)
}
</script>

<style lang="scss" >
@use '../../styles/name.scss' as *;
@use '../../styles/src/var.scss' as *;

$component: 'EditModel';
@include buildView($component) {
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  @include build('template', 'base') {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: auto;
    margin: 0.5vh 0;

    .tmptitle {
      white-space: nowrap;
      margin-right: 16px;
      font-size: 13px;
    }
    .wrapline {
      width: 100%;
      margin: 0.5vh 0;
      font-size: 13px;
      .el-input-number {
        margin-left: 16px;
      }
    }
  }
  @include build('template', 'base2') {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    height: auto;
    margin: 0.5vh 0;
    border-bottom: 1px dashed #fff;

    .tmptitle {
      white-space: nowrap;
      margin-right: 16px;
      font-size: 13px;
    }
    .baseline {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      box-sizing: border-box;
      padding: 4px 0;
    }
    .el-select {
      width: 40%;
    }

    .wrapline {
      width: 100%;
      margin: 0.5vh 0;
      font-size: 13px;
      .el-input-number {
        margin-left: 16px;
      }
    }
  }
  .el-collapse {
    color: $bg-color-light;
  }
  .el-collapse-item__header {
    background-color: transparent;
    color: $bg-color-light;
    text-indent: 10px;
  }
  .el-collapse-item__content {
    background-color: $bg-color-dark;
    color: $bg-color-light;
    padding: 1vh 0.5vw;
  }
}
</style>
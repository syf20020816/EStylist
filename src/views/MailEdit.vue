<template>
  <div :id="buildView(component)">
    <div :class="buildWrap(component,'left')">
      <div :style="scaleViewStyle">
        <!-- todo: -->
        <BaseOutter :data="mailModel"></BaseOutter>
      </div>
    </div>
    <div :class="buildWrap(component,'right')">
      <div :class="buildWrap(component,'templates')">
        <el-collapse accordion>
          <el-collapse-item name="1">
            <template #title>
              {{ getStr(store.settings.language,pagei18n.edit.basePlateTitle) }}
            </template>
            <div>

              <div :class="build('template','base')">
                <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.width) }}</div>
                <el-input-number v-model="mailModel.base.width" :step="10" :max="800" />
              </div>
              <div :class="build('template','base')">
                <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.bgColor) }}</div>
                <el-color-picker v-model="mailModel.base.bgColor" />
              </div>
              <div :class="build('template','base')">
                <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.fontSize) }}</div>
                <el-input-number v-model="mailModel.base.fontSize" :step="1" :max="60" />
              </div>
              <div :class="build('template','base')">
                <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.padding) }}</div>
                <el-input-number v-model="mailModel.base.padding" :step="2" :max="100" />
              </div>
              <div :class="build('template','base')">
                <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.areaNum) }}</div>
                <el-input-number v-model="mailModel.base.areaNum" :step="1" :max="20" />
              </div>
              <div :class="build('template','base')">
                <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.direction) }}</div>
                <el-select v-model="mailModel.base.direction" placeholder="Select Direction">
                  <el-option v-for="item in Direction" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
              <div style="display: flex;align-items: center;justify-content:end;margin-top: 1vh;">
                <el-button type="success" round @click="saveBaseChange">Save Change</el-button>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item :name="generateUUID()" v-for="citem,index in mailModel.areas" :key="index">
            <template #title>
              {{ getStr(store.settings.language,pagei18n.edit.areaTitle) }}{{ index+1 }}
            </template>
            <div>
              <!-- <div :class="build('template','base')">
                <div class="tmptitle">区域高度</div>
                <el-input-number v-model="citem.height" :step="10" :max="800" />
              </div> -->
              <div :class="build('template','base')">
                <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.colSpan) }}</div>
                <el-input-number v-model="citem.span" :step="10" :max="800" />
              </div>
              <div :class="build('template','base')">
                <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.bgColor) }}</div>
                <el-color-picker v-model="citem.bgColor" />
              </div>
              <div :class="build('template','base')">
                <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.fontFamily) }}</div>
                <el-select v-model="citem.fontFamily" placeholder="Select FontFamily">
                  <el-option v-for="fitem in FontFamily" :key="fitem.value" :label="fitem.label" :value="fitem.value" />
                </el-select>
              </div>
              <div :class="build('template','base')">
                <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.fontColor) }}</div>
                <el-color-picker v-model="citem.fontColor" />
              </div>
              <div :class="build('template','base')">
                <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.fontSize) }}</div>
                <el-input-number v-model="citem.fontSize" :step="1" :max="60" />
              </div>
              <div :class="build('template','base')">
                <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.areaNum) }}</div>
                <el-input-number v-model="citem.areaNum" :step="1" :max="20" />
              </div>
              <div :class="build('template','base')" style="flex-wrap: wrap;">
                <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.padding) }}</div>
                <div class="wrapline">{{ getStr(store.settings.language,pagei18n.edit.top) }}:<el-input-number v-model="citem.padding[0]" :step="1" :max="1000" /></div>
                <div class="wrapline">{{ getStr(store.settings.language,pagei18n.edit.right) }}:<el-input-number v-model="citem.padding[1]" :step="1" :max="1000" /></div>
                <div class="wrapline">{{ getStr(store.settings.language,pagei18n.edit.bottom) }}:<el-input-number v-model="citem.padding[2]" :step="1" :max="1000" /></div>
                <div class="wrapline">{{ getStr(store.settings.language,pagei18n.edit.left) }}:<el-input-number v-model="citem.padding[3]" :step="1" :max="1000" /></div>
              </div>
              <div :class="build('template','base')" style="flex-wrap: wrap;">
                <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.margin) }}</div>
                <div class="wrapline">{{ getStr(store.settings.language,pagei18n.edit.top) }}:<el-input-number v-model="citem.margin[0]" :step="1" :max="1000" /></div>
                <div class="wrapline">{{ getStr(store.settings.language,pagei18n.edit.right) }}:<el-input-number v-model="citem.margin[1]" :step="1" :max="1000" /></div>
                <div class="wrapline">{{ getStr(store.settings.language,pagei18n.edit.bottom) }}:<el-input-number v-model="citem.margin[2]" :step="1" :max="1000" /></div>
                <div class="wrapline">{{ getStr(store.settings.language,pagei18n.edit.left) }}:<el-input-number v-model="citem.margin[3]" :step="1" :max="1000" /></div>
              </div>
              <div :class="build('template','base')">
                <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.direction) }}</div>
                <el-select v-model="citem.direction" placeholder="Select Direction">
                  <el-option v-for="item in Direction" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
              <div style="display: flex;align-items: center;justify-content:end;margin-top: 1vh;">
                <el-button type="primary" round @click="addModel(index)">添加模块</el-button>
                <el-button type="success" round @click="saveAreaChange(index)">修改子区域</el-button>
              </div>
              <div :class="build('template','base')" v-if="citem.modelItem!=null" style="display: flex;flex-wrap: wrap;">
                <div class="tmptitle" style="width: 100%;font-size:14px;"><el-icon>
                    <Operation />
                  </el-icon>{{ getStr(store.settings.language,pagei18n.edit.modelTitle) }}</div>
                <div :class="build('template','base')">
                  <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.modelTypes) }}</div>
                  <el-select v-model="citem.modelItem.type" placeholder="Select Type">
                    <el-option v-for="titem in ModelTypes" :key="titem.value" :label="titem.label" :value="titem.value" />
                  </el-select>
                </div>
                <div :class="build('template','base')">
                  <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.height) }}</div>
                  <el-input placeholder="Please input height" v-model="citem.modelItem.height" />
                </div>
                <div :class="build('template','base')">
                  <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.width) }}</div>
                  <el-input v-model="citem.modelItem.width" placeholder="Please input width" />
                </div>
                <div :class="build('template','base')">
                  <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.contentPos) }}</div>
                  <el-select v-model="citem.modelItem.justifyContent" placeholder="Select Type">
                    <el-option v-for="jcitem in JustifyContent" :key="jcitem.value" :label="jcitem.label" :value="jcitem.value" />
                  </el-select>
                </div>
                <div :class="build('template','base')">
                  <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.radius) }}</div>
                  <el-input v-model="citem.modelItem.borderRadius" placeholder="Please input radius" />
                </div>
                <div :class="build('template','base')">
                  <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.content) }}</div>
                  <el-input v-model="citem.modelItem.content" placeholder="Please input text" />
                </div>
                <div :class="build('template','base')" v-if="citem.modelItem.type=='img'">
                  <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.upload) }}</div>
                  <input type="file" name="" id="upload-picture" @change="uploadPicture(index,$event)">
                </div>
                <div :class="build('template','base')" v-if="citem.modelItem.type!='div'">
                  <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.src) }}</div>
                  <el-input v-model="citem.modelItem.src" placeholder="Please input address" />
                </div>
                <div :class="build('template','base')">
                  <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.bgColor) }}</div>
                  <el-color-picker v-model="citem.modelItem.bgColor" />
                </div>
                <div :class="build('template','base')" v-if="citem.modelItem.type!='img'">
                  <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.fontSize) }}</div>
                  <el-input-number v-model="citem.modelItem.fontSize" :step="2" :max="80" />
                </div>
                <div :class="build('template','base')" v-if="citem.modelItem.type!='img'">
                  <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.fontWeight) }}</div>
                  <el-switch v-model="citem.modelItem.fontWeight" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
                </div>
                <div :class="build('template','base')" v-if="citem.modelItem.type!='img'">
                  <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.fontFamily) }}</div>
                  <el-select v-model="citem.modelItem.fontFamily" placeholder="Select FontFamily">
                    <el-option v-for="fitem in FontFamily" :key="fitem.value" :label="fitem.label" :value="fitem.value" />
                  </el-select>
                </div>
                <div :class="build('template','base')" v-if="citem.modelItem.type!='img'">
                  <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.fontColor) }}</div>
                  <el-color-picker v-model="citem.modelItem.fontColor" />
                </div>
                <div :class="build('template','base')" v-if="citem.modelItem.type!='img'">
                  <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.textAlign) }}</div>
                  <el-select v-model="citem.modelItem.textAlign" placeholder="Select FontFamily">
                    <el-option v-for="taitem in TextAlign" :key="taitem.value" :label="taitem.label" :value="taitem.value" />
                  </el-select>
                </div>
                <div :class="build('template','base')" style="flex-wrap: wrap;">
                  <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.padding) }}</div>
                  <div class="wrapline">{{ getStr(store.settings.language,pagei18n.edit.top) }}:<el-input-number v-model="citem.modelItem.padding[0]" :step="1" :max="1000" /></div>
                  <div class="wrapline">{{ getStr(store.settings.language,pagei18n.edit.right) }}:<el-input-number v-model="citem.modelItem.padding[1]" :step="1" :max="1000" /></div>
                  <div class="wrapline">{{ getStr(store.settings.language,pagei18n.edit.bottom) }}:<el-input-number v-model="citem.modelItem.padding[2]" :step="1" :max="1000" /></div>
                  <div class="wrapline">{{ getStr(store.settings.language,pagei18n.edit.left) }}:<el-input-number v-model="citem.modelItem.padding[3]" :step="1" :max="1000" /></div>
                </div>
                <div :class="build('template','base')" style="flex-wrap: wrap;">
                  <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.margin) }}</div>
                  <div class="wrapline">{{ getStr(store.settings.language,pagei18n.edit.top) }}:<el-input-number v-model="citem.modelItem.margin[0]" :step="1" :max="1000" /></div>
                  <div class="wrapline">{{ getStr(store.settings.language,pagei18n.edit.right) }}:<el-input-number v-model="citem.modelItem.margin[1]" :step="1" :max="1000" /></div>
                  <div class="wrapline">{{ getStr(store.settings.language,pagei18n.edit.bottom) }}:<el-input-number v-model="citem.modelItem.margin[2]" :step="1" :max="1000" /></div>
                  <div class="wrapline">{{ getStr(store.settings.language,pagei18n.edit.left) }}:<el-input-number v-model="citem.modelItem.margin[3]" :step="1" :max="1000" /></div>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <!-- <div :class="buildWrap(component,'edit')"></div> -->
      <div :class="buildWrap(component,'tools')">
        <el-icon size="18" @click="scaleView(-0.1)">
          <ZoomOut />
        </el-icon>
        <el-icon size="18" @click="scaleView(0.1)">
          <ZoomIn />
        </el-icon>
        <el-icon size="18" @click="uploadTemplate">
          <Upload />
        </el-icon>
        <el-icon size="18" @click="downloadTemplate">
          <Download />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MailEdit'
}
</script>

<script lang="ts" setup>
import { generateUUID, convertImageToBase64 } from '../util'
import { ref, reactive, computed } from 'vue'
import { build, buildView, buildWrap } from '../styles/name'
import { ZoomIn, ZoomOut, InfoFilled, Operation, Download, Upload } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { BaseModel, AreaModel, Model } from '../core'
import BaseOutter from '../components/BaseOutter.vue'
import { pagei18n, getStr } from '../core'
import { indexStore } from '../store/IndexPinia'

const component = 'MailEdit'
const store = indexStore()
const Direction = [
  {
    value: 'x',
    label: 'x'
  },
  {
    value: 'y',
    label: 'y'
  }
]
const FontFamily = [
  {
    value: 'Helvetica',
    label: 'Helvetica'
  },
  {
    value: 'Arial Narrow',
    label: 'Arial Narrow'
  },
  {
    value: 'Verdana',
    label: 'Verdana'
  },
  {
    value: 'Arial',
    label: 'Arial'
  },
  {
    value: 'Franklin Gothic Medium',
    label: 'Franklin Gothic Medium'
  }
]

const ModelTypes = [
  {
    value: 'div',
    label: '文字'
  },
  {
    value: 'img',
    label: '图片'
  },
  {
    value: 'a',
    label: '链接'
  }
]

const TextAlign = [
  {
    value: 'left',
    label: 'left'
  },
  {
    value: 'right',
    label: 'right'
  },
  {
    value: 'center',
    label: 'center'
  },
  {
    value: 'justify',
    label: 'justify'
  }
]

const JustifyContent = [
  {
    value: 'start',
    label: 'start'
  },
  {
    value: 'end',
    label: 'end'
  },
  {
    value: 'center',
    label: 'center'
  },
  {
    value: 'baseline',
    label: 'baseline'
  }
]
let mailModel = reactive({
  base: {
    // height: 240,
    width: 180,
    bgColor: '#fff',
    fontSize: 16,
    areaNum: 1,
    direction: 'y',
    padding: 0
  },
  areas: [
    {
      height: 100,
      width: 180,
      bgColor: '#fff',
      fontSize: 16,
      fontColor: '#000',
      fontFamily: 'Helvetica',
      areaNum: 0,
      direction: 'y',
      padding: [0, 0, 0, 0],
      margin: [0, 0, 0, 0],
      textAlign: 'center',
      span: 1,
      areas: new Array(),
      modelItem: undefined
    }
  ] as Array<AreaModel>,
  areasLen: 1
})

// let mailArea = reactive({
//   height: 240,
//   width: 180,
//   bgColor: '#fff',
//   fontSize: 16,
//   fontColor: '#000',
//   areaNum: 1,
//   direction: 'x'
// })
let scaleViewSize = ref(1)
let scaleViewStyle = computed(() => {
  return {
    transform: 'scale(' + scaleViewSize.value + ')'
  }
})
const scaleView = (num: number) => {
  scaleViewSize.value += num
}

const saveBaseChange = () => {
  let oldLen = mailModel.areasLen
  if (oldLen < mailModel.base.areaNum) {
    for (let i = oldLen; i < mailModel.base.areaNum; i++) {
      let tmp: AreaModel = {
        height: 100,
        width: 180,
        bgColor: '#fff',
        fontSize: 16,
        fontColor: '#000',
        fontFamily: 'Helvetica',
        areaNum: 0,
        direction: 'y',
        padding: [0, 0, 0, 0],
        margin: [0, 0, 0, 0],
        textAlign: 'center',
        span: 1,
        areas: new Array(),
        modelItem: undefined
      }
      mailModel.areas.push(tmp)
    }
  } else if (oldLen > mailModel.base.areaNum) {
    for (let i = oldLen; i > mailModel.base.areaNum; i--) {
      mailModel.areas.pop()
    }
  } else {
  }
  mailModel.areasLen = mailModel.areas.length
  ElMessage({
    message: 'Change Save Successfully',
    type: 'success'
  })
}

const saveAreaChange = (index: number) => {}
const addModel = (index: number) => {
  mailModel.areas[index].modelItem = {
    type: 'div',
    height: '30px',
    width: '100%',
    bgColor: 'transparent',
    fontSize: 16,
    fontColor: '#000',
    fontFamily: 'Helvetica',
    textAlign: 'center',
    direction: 'x',
    fontWeight: false,
    padding: [0, 0, 0, 0],
    margin: [0, 0, 0, 0],
    content: '示例文字|地址',
    borderRadius: '0px',
    justifyContent: 'center',
    src: ''
  }
  ElMessage({
    message: 'Add Model Successfully',
    type: 'success'
  })
}

const uploadPicture = (index: number, event: any) => {
  const file = event.target.files[0]
  convertImageToBase64(file)
    .then((base64: any) => {
      mailModel.areas[index].modelItem!.src = base64
    })
    .catch(error => {
      console.error(error)
    })

  console.log()
}
const uploadTemplate = () => {}
const downloadTemplate = () => {}
</script>

<style lang="scss" >
@use '../styles/name.scss' as *;
@use '../styles/src/var.scss' as *;

$component: 'MailEdit';

@include buildView($component) {
  height: inherit;
  width: calc(100vw - 60px);
  text-align: left;
  color: $bg-color-light;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @include buildWrap($component, 'left') {
    width: 65%;
    height: inherit;
    overflow: scroll;
    scrollbar-width: thin;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 30px;
    box-sizing: border-box;
  }
  @include buildWrap($component, 'right') {
    width: 35%;
    height: inherit;
    background-color: $bg-color-dark-deep;

    @include buildWrap($component, 'templates') {
      height: calc(100% - 24px);
      width: 100%;
      overflow-y: scroll;
      scrollbar-width: thin;
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
    // @include buildWrap($component, 'edit') {
    //   height: calc(5% - 24px);
    //   width: 100%;
    // }
    @include buildWrap($component, 'tools') {
      height: 24px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;

      .el-icon {
        cursor: pointer;
        transition: all 0.4s ease-in-out;
        &:hover {
          filter: drop-shadow(0 0 4px $force-color) brightness(1.5);
          transform: scale(0.9);
        }
      }
    }
  }
}
</style>
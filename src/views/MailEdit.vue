<template>
  <div :id="buildView(component)">
    <div :class="buildWrap(component,'left')" :style="`width:`+editLeftWidth+`%;`">
      <div :style="scaleViewStyle">
        <!-- todo: -->
        <BaseOutter id="targetTemplate" ref="targetTemplate" :data="mailModel"></BaseOutter>
      </div>
    </div>
    <div :class="buildWrap(component,'right')" :style="`width:calc(100% - `+editLeftWidth+`%);`">
      <div :class="buildWrap(component,'templates')">
        <el-collapse>
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
                <el-button type="success" round @click="saveBaseChange">{{ getStr(store.settings.language,pagei18n.buttons.changeArea) }}</el-button>
              </div>
            </div>
          </el-collapse-item>
          <MailEditItem :areas="mailModel.areas" @upload-picture="uploadPicture" @add-model="addModel" @del-model="delModel" @save="saveAreaChange" @change-span="childEndSpanChange" @change-bg="childEndBGChange" @change-jc="childEndJCChange">
          </MailEditItem>
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
        <el-icon size="18" @click="uploadTemplateCheck">
          <Upload />
        </el-icon>
        <el-icon size="18" @click="downloadTemplateVisable = true">
          <Download />
        </el-icon>
        <el-icon size="18" @click="uploadToStore">
          <UploadFilled />
        </el-icon>
        <el-icon size="18" @click="delCache">
          <Delete />
        </el-icon>
      </div>
    </div>
  </div>
  <el-dialog v-model="downloadTemplateVisable" :title="getStr(store.settings.language,pagei18n.common.dowloadTemplate.title)" width="40%">
    <el-input v-model="downloadFileName" :placeholder="getStr(store.settings.language,pagei18n.common.dowloadTemplate.placeholder)" clearable></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="downloadTemplateVisable = false">{{ getStr(store.settings.language,pagei18n.common.cancel) }}</el-button>
        <el-button type="primary" @click="downloadTemplate">
          {{ getStr(store.settings.language,pagei18n.common.confirm) }}
        </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- load templates -->
  <el-dialog v-model="uploadTemplateVisiable" :title="getStr(store.settings.language,pagei18n.common.uploadTemplate.title)" width="40%">
    <el-select v-model="uploadTemplateTarget" :placeholder="getStr(store.settings.language,pagei18n.common.uploadTemplate.placeholder)" style="width: 90%;">
      <el-option v-for="titem in store.templates" :key="titem" :label="titem" :value="titem" />
    </el-select>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="uploadTemplateVisiable = false">{{ getStr(store.settings.language,pagei18n.common.cancel) }}</el-button>
        <el-button type="primary" @click="uploadTemplate">
          {{ getStr(store.settings.language,pagei18n.common.confirm) }}
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="addChildAreaVisiable" :title="getStr(store.settings.language,pagei18n.edit.addChildArea.title)" width="40%">
    <div>
      {{ getStr(store.settings.language,pagei18n.edit.addChildArea.word) }}
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addChildAreaVisiable = false">{{ getStr(store.settings.language,pagei18n.common.cancel) }}</el-button>
        <el-button type="primary" @click="addChildAreaConfirm">
          {{ getStr(store.settings.language,pagei18n.common.confirm) }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
export default {
  name: 'MailEdit'
}
</script>

<script lang="ts" setup>
import { generateUUID, convertImageToBase64 } from '../util'
import { ref, reactive, computed, onMounted, getCurrentInstance } from 'vue'
import { build, buildView, buildWrap } from '../styles/name'
import { ZoomIn, ZoomOut, InfoFilled, Operation, Download, Upload, UploadFilled, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { BaseModel, AreaModel, Model } from '../core'
import { JustifyContent, TextAlign, ModelTypes, Direction, FontFamily } from '../core'
import BaseOutter from '../components/BaseOutter.vue'
import { pagei18n, getStr } from '../core'
import { indexStore } from '../store/IndexPinia'
import { invoke } from '@tauri-apps/api'
import MailEditItem from '../components/MailEditItem.vue'

const { ctx } = getCurrentInstance() as any
const component = 'MailEdit'
let targetTemplate = ref()
let downloadFileName = ref('')
let uploadTemplateVisiable = ref(false)
let uploadTemplateTarget = ref('')
let downloadTemplateVisable = ref(false)
let addChildAreaVisiable = ref(false)
let addChildAreaIndex = ref(-1)
const store = indexStore()

//模板数据
let mailModel = ref<any>({
  base: {
    width: 320,
    bgColor: '#fff',
    areaNum: 1,
    direction: 'y',
    padding: 46
  },
  areas: [
    {
      bgColor: '#fff',
      areaNum: 0,
      direction: 'y',
      textAlign: 'center',
      span: 1,
      areas: new Array(),
      justifyContent: 'center',
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

let editLeftWidth = computed(() => {
  let tmp_arr = store.settings.proportion.split(':')
  let left = parseInt(tmp_arr[0])
  let right = parseInt(tmp_arr[1])
  let proportion_item = 100 / (left + right)
  return proportion_item * left
})
const scaleView = (num: number) => {
  scaleViewSize.value += num
}
// 修改子区域个数
const saveBaseChange = () => {
  let oldLen = mailModel.value.areasLen
  if (oldLen < mailModel.value.base.areaNum) {
    for (let i = oldLen; i < mailModel.value.base.areaNum; i++) {
      let tmp: AreaModel = {
        bgColor: '#fff',
        areaNum: 0,
        direction: 'y',
        textAlign: 'center',
        justifyContent: 'center',
        span: 1,
        areas: new Array(),
        modelItem: undefined
      }
      mailModel.value.areas.push(tmp)
    }
  } else if (oldLen > mailModel.value.base.areaNum) {
    for (let i = oldLen; i > mailModel.value.base.areaNum; i--) {
      mailModel.value.areas.pop()
    }
  } else {
  }
  mailModel.value.areasLen = mailModel.value.areas.length
  ElMessage({
    message: 'Change Save Successfully',
    type: 'success'
  })
}

/**
 * 添加子区域的子区域
 * 若子区域添加子区域则会销毁当前的模块
 */
const saveAreaChange = (index: number) => {
  addChildAreaIndex.value = index
  //判断是否有模块
  if (mailModel.value.areas[index].modelItem != undefined) {
    addChildAreaVisiable.value = true
  } else {
    addChildAreaConfirm()
  }
}

/**
 * 确认添加子区域
 */
const addChildAreaConfirm = () => {
  if (addChildAreaIndex.value == -1) {
    ElMessage({
      message: 'Error: Please contact the author : syf20020816@outlook.com!'
    })
  } else {
    //统一删除下属模块
    mailModel.value.areas[addChildAreaIndex.value].modelItem = undefined
    //添加子区域
    let tmp = {
      bgColor: '#fff',
      areaNum: 0,
      direction: 'y',
      textAlign: 'center',
      span: 1,
      areas: new Array(),
      justifyContent: 'center',
      modelItem: undefined
    } as AreaModel

    let len = mailModel.value.areas[addChildAreaIndex.value].areaNum
    let currentLen = mailModel.value.areas[addChildAreaIndex.value].areas.length

    if (currentLen > len) {
      for (let i = currentLen; i > len; i--) {
        mailModel.value.areas[addChildAreaIndex.value].areas.pop()
      }
    } else if (currentLen < len) {
      for (let i = currentLen; i < len; i++) {
        mailModel.value.areas[addChildAreaIndex.value].areas.push(tmp)
      }
    }
  }
  addChildAreaVisiable.value = false
  console.log(mailModel.value.areas[addChildAreaIndex.value].areas)
}
// 添加模块
const addModel = (index: number) => {
  mailModel.value.areas[index].modelItem = {
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

const delModel = (index: number) => {
  mailModel.value.areas[index].modelItem = undefined
  ElMessage({
    message: 'Del Model Successfully',
    type: 'success'
  })
}
// 上传本地照片
const uploadPicture = (file: any, index: number) => {
  convertImageToBase64(file)
    .then((base64: any) => {
      mailModel.value.areas[index].modelItem!.src = base64
    })
    .catch(error => {
      console.error(error)
    })
}

// 上传模板文件检查
const uploadTemplateCheck = () => {
  invoke('load_templates').then((res: any) => {
    store.templates = res
    if (res.length == 0) {
      ElMessage({
        message: 'You Have No Templates!',
        type: 'info'
      })
    } else {
      ElMessage({
        message: 'Load Templates Successfully!',
        type: 'info'
      })
    }
  })
  uploadTemplateVisiable.value = true
}

// 上传文件
const uploadTemplate = () => {
  invoke('upload_file', { name: uploadTemplateTarget.value })
    .then((res: any) => {
      mailModel.value = JSON.parse(res)
      store.templateMailModel = mailModel.value
      ElMessage({
        message: 'Upload Template Successfully! Please Wait a moment!',
        type: 'success'
      })
    })
    .catch(e => {
      ElMessage({
        message: 'Upload Template Failure!',
        type: 'error'
      })
    })
  setTimeout(() => {
    uploadTemplateVisiable.value = false
  }, 1500)
}

// 下载模板文件
const downloadTemplate = () => {
  let tmp = JSON.stringify(mailModel.value)
  invoke('download_template', { name: downloadFileName.value, data: tmp, dom: targetTemplate.value.$el.outerHTML })
    .then(res => {
      ElMessage({
        message: 'Download Template Successfully! Please Check Your Template Store Dir!',
        type: 'success'
      })
    })
    .catch(() => {
      ElMessage({
        message: 'Download Template Failed!',
        type: 'error'
      })
    })
  downloadTemplateVisable.value = false
}

// 模板暂存到Pinia中，关闭页面消失
const uploadToStore = () => {
  store.templateMailModel = mailModel.value
  store.templateMailHtml = targetTemplate.value.$el.outerHTML
  if (JSON.stringify(store.templateMailModel) != '{}') {
    ElMessage({
      message: 'Upload To Temp Store Successfully!',
      type: 'success'
    })
  } else {
    ElMessage({
      message: 'Upload To Temp Store Failure!',
      type: 'error'
    })
  }
}

const delCache = () => {
  ElMessageBox.confirm('Delete The Template And Cache?', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
    .then(() => {
      store.templateMailHtml = ''
      store.templateMailModel = {}
      mailModel.value = {
        base: {
          width: 320,
          bgColor: '#fff',
          areaNum: 1,
          direction: 'y',
          padding: 46
        },
        areas: [
          {
            bgColor: '#fff',
            areaNum: 0,
            direction: 'y',
            textAlign: 'center',
            span: 1,
            areas: new Array(),
            justifyContent: 'center',
            modelItem: undefined
          }
        ] as Array<AreaModel>,
        areasLen: 1
      }
      ElMessage({
        type: 'success',
        message: 'Delete completed'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}

const childEndSpanChange = (e: any, fIndex: number, index: number) => {
  mailModel.value.areas[fIndex].areas[index].span = e
  console.log(mailModel.value.areas[fIndex].areas[index].span)
}
const childEndBGChange = (e: any, fIndex: number, index: number) => {
  mailModel.value.areas[fIndex].areas[index].bgColor = e
  console.log(mailModel.value.areas[fIndex].areas[index].bgColor)
  ctx.$forceUpdate()
}
const childEndJCChange = (e: any, fIndex: number, index: number) => {
  mailModel.value.areas[fIndex].areas[index].justifyContent = e
  console.log(mailModel.value.areas[fIndex].areas[index].justifyContent)
}

onMounted(() => {
  if (JSON.stringify(store.templateMailModel) != '{}') {
    mailModel.value = store.templateMailModel
  }
})
</script>

<style lang="scss" >
@use '../styles/views/MailEdit.scss';
</style>
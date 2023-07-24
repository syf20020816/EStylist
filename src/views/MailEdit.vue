<template>
  <div :id="buildView(component)">
    <div :class="buildWrap(component,'left')" :style="`width:`+editLeftWidth+`%;`">
      <div :style="scaleViewStyle">
        <!-- todo: -->
        <BaseOutter id="targetTemplate" ref="targetTemplate" :data="store.currentMailModel"></BaseOutter>
      </div>
    </div>
    <div :class="buildWrap(component,'mid')" style="min-width: 200px;">
      <EditTools></EditTools>
    </div>
    <div :class="buildWrap(component,'right')" :style="`width:calc(80% - `+editLeftWidth+`%);`">
      <div :class="buildWrap(component,'templates')">
        <el-collapse accordion>
          <el-collapse-item name="1">
            <template #title>
              {{ getStr(store.settings.language,pagei18n.edit.basePlateTitle) }}
            </template>
            <div>
              <div :class="build('template','base')">
                <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.width) }}</div>
                <el-input-number v-model="store.currentMailModel.base.width" :step="10" :max="800" />
              </div>
              <div :class="build('template','base')">
                <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.bgColor) }}</div>
                <el-color-picker v-model="store.currentMailModel.base.bgColor" />
              </div>
              <div :class="build('template','base')">
                <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.padding) }}</div>
                <el-input-number v-model="store.currentMailModel.base.padding" :step="2" :max="100" />
              </div>
              <div :class="build('template','base')">
                <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.areaNum) }}</div>
                <el-input-number v-model="store.currentMailModel.base.areaNum" :step="1" :max="20" />
              </div>
              <div :class="build('template','base')">
                <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.direction) }}</div>
                <el-select v-model="store.currentMailModel.base.direction" placeholder="Select Direction">
                  <el-option v-for="item in Direction" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
              <div style="display: flex;align-items: center;justify-content:end;margin-top: 1vh;">
                <el-button type="success" round @click="saveBaseChange">{{ getStr(store.settings.language,pagei18n.buttons.changeArea) }}</el-button>
              </div>
            </div>
          </el-collapse-item>
          <MailEditItem v-for="meItem in store.currentMailModel.areas" :key="meItem.id" :data="meItem" :index="meItem.id" @add-model="addModel" @del-model="delModel">
            <AreaOrModel v-for="amItem in meItem.modelItem" :key="amItem.id" :index="amItem.id" :data="amItem" :f-index="meItem.id" @upload-picture="uploadPicture" @margin-change="marginChange" @padding-change="paddingChange"></AreaOrModel>
          </MailEditItem>
        </el-collapse>
      </div>

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

</template>

<script lang="ts">
export default {
  name: 'MailEdit'
}
</script>

<script lang="ts" setup>
import { generateUUID, convertImageToBase64 } from '../util'
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { build, buildView, buildWrap } from '../styles/name'
import { ZoomIn, ZoomOut, InfoFilled, Download, Upload, UploadFilled, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { BaseModel, AreaModel, Model } from '../core'
import { JustifyContent, TextAlign, ModelTypes, Direction, FontFamily, defalutModel, defaultAreaModel, defaultAreaModels, defalutModelItem } from '../core'
import BaseOutter from '../components/BaseOutter.vue'
import { pagei18n, getStr } from '../core'
import { indexStore } from '../store/IndexPinia'
import { invoke } from '@tauri-apps/api'
import MailEditItem from '../components/MailEditItem.vue'
import AreaOrModel from '../components/AreaOrModel.vue'
import EditTools from '../components/EditTools.vue'

const router = useRouter()
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
// let mailModel = reactive<any>(store.currentMailModel)

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
  console.log(left)
  return proportion_item * left
})
const scaleView = (num: number) => {
  scaleViewSize.value += num
}
// 修改子区域个数
const saveBaseChange = () => {
  let oldLen = store.currentMailModel.areasLen
  if (oldLen < store.currentMailModel.base.areaNum) {
    for (let i = oldLen; i < store.currentMailModel.base.areaNum; i++) {
      store.pushAreaToCurrentMailModel(defaultAreaModel)
    }
  } else if (oldLen > store.currentMailModel.base.areaNum) {
    for (let i = oldLen; i > store.currentMailModel.base.areaNum; i--) {
      store.currentMailModel.areas.pop()
    }
  } else {
  }
  store.currentMailModel.areasLen = store.currentMailModel.areas.length
  ElMessage({
    message: 'Change Save Successfully',
    type: 'success'
  })
}

// 添加模块
const addModel = (index: number) => {
  let tmp = defalutModelItem
  store.pushCurrentMailModel(index)
  ElMessage({
    message: 'Add Model Successfully',
    type: 'success'
  })
}

const delModel = (index: number) => {
  store.currentMailModel.areas[index].modelItem.pop()
  ElMessage({
    message: 'Del Model Successfully',
    type: 'success'
  })
}
// 上传本地照片
const uploadPicture = (file: any, fIndex: number, index: number) => {
  convertImageToBase64(file)
    .then((base64: any) => {
      store.currentMailModel.areas[fIndex].modelItem[index].src = base64
    })
    .catch(error => {})
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
      store.currentMailModel = JSON.parse(res)
      store.templateMailModel = store.currentMailModel
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
  let tmp = JSON.stringify(store.currentMailModel)
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
  store.templateMailModel = store.currentMailModel
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
      store.templateMailModel = {} as Model

      store.currentMailModel = defalutModel
      //刷新视图
      router.go(0)
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

const paddingChange = (fIndex: number, sIndex: number, index: number, value: number) => {
  store.paddingChange(fIndex, sIndex, index, value)
}
const marginChange = (fIndex: number, sIndex: number, index: number, value: number) => {
  store.marginChange(fIndex, sIndex, index, value)
}
onMounted(() => {
  if (JSON.stringify(store.templateMailModel) != '{}') {
    store.currentMailModel = store.templateMailModel
  } else {
    store.currentMailModel = store.currentMailModel
  }
})
</script>

<style lang="scss" >
@use '../styles/views/MailEdit.scss';
</style>
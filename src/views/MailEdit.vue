<template>
  <div :id="buildView(component)">
    <div :class="buildWrap(component,'left')" :style="`width:`+editLeftWidth+`%;`">
      <el-tabs v-model="activeEdit" class="demo-tabs" @tab-change="tabChange">
        <el-tab-pane label="设计邮件" name="mail">
          <div :style="scaleViewStyle" style="cursor: pointer;">
            <!-- todo: -->
            <!-- <BaseOutter id="targetTemplate" ref="targetTemplate" :data="store.currentMailModel"></BaseOutter> -->
            <BasePlate ref="targetTemplate"></BasePlate>
          </div>
        </el-tab-pane>
        <el-tab-pane label="设计组件" name="model">
          <div :style="scaleViewStyle" style="cursor: pointer;">
            <ComponentVue ref="targetComponent"></ComponentVue>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Tips" name="tips">
          <Tips></Tips>
        </el-tab-pane>
      </el-tabs>

    </div>
    <div :class="buildWrap(component,'mid')" style="min-width: 200px;">
      <EditTools></EditTools>
    </div>
    <div :class="buildWrap(component,'right')" :style="`width:calc(80% - `+editLeftWidth+`%);`">
      <div :class="buildWrap(component, 'templates')">
        <div class="title">
          <span style="font-weight: 700;">模板层级</span>
          <el-tooltip placement="bottom">
            <template #content>
              模板层级表示底板、区域、组件形成的组合设计层级
            </template>
            <el-icon size="16">
              <QuestionFilled />
            </el-icon>
          </el-tooltip>
        </div>
        <div>
          <el-tree v-if="activeEdit=='mail'" :data="mailLevelTree" :props="defaultProps" @node-click="handleNodeClick" />
          <el-tree v-else-if="activeEdit=='model'" :data="componentLevelTree" :props="defaultProps" @node-click="handleNodeClick" />
        </div>
      </div>
      <div :class="buildWrap(component,'tools')">
        <el-tooltip effect="dark" content="缩小" placement="top">
          <el-icon size="18" @click="scaleView(-0.1)">
            <ZoomOut />
          </el-icon>
        </el-tooltip>
        <el-tooltip effect="dark" content="放大" placement="top">
          <el-icon size="18" @click="scaleView(0.1)">
            <ZoomIn />
          </el-icon>
        </el-tooltip>
        <el-tooltip effect="dark" content="上传邮件模板" placement="top">
          <img src="../assets/upload_template.svg" alt="" class="el-icon2" @click="uploadTemplateCheck">
        </el-tooltip>
        <el-tooltip effect="dark" content="下载邮件模板" placement="top">
          <img src="../assets/download_mail.svg" alt="" class="el-icon2" @click="downloadTemplateVisable = true">
        </el-tooltip>
        <el-tooltip effect="dark" content="上传组件模板" placement="top">
          <img src="../assets/upload_component.svg" alt="" class="el-icon2" @click="uploadComponentCheck">
        </el-tooltip>
        <el-tooltip effect="dark" content="下载组件模板" placement="top">
          <img src="../assets/download_component.svg" alt="" class="el-icon2" @click="downloadComponentVisable = true">
        </el-tooltip>
        <el-tooltip effect="dark" content="删除缓存" placement="top">
          <el-icon size="18" @click="delCache">
            <Delete />
          </el-icon>
        </el-tooltip>
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
  <el-dialog v-model="downloadComponentVisable" :title="getStr(store.settings.language,pagei18n.common.dowloadTemplate.title)" width="40%">
    <el-input v-model="downloadFileName" :placeholder="getStr(store.settings.language,pagei18n.common.dowloadTemplate.placeholder)" clearable></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="downloadComponentVisable = false">{{ getStr(store.settings.language,pagei18n.common.cancel) }}</el-button>
        <el-button type="primary" @click="downloadComponent">
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
  <el-dialog v-model="uploadComponentVisiable" :title="getStr(store.settings.language,pagei18n.common.uploadTemplate.title)" width="40%">
    <el-select v-model="uploadComponentTarget" :placeholder="getStr(store.settings.language,pagei18n.common.uploadTemplate.placeholder)" style="width: 90%;">
      <el-option v-for="titem in store.components" :key="titem" :label="titem" :value="titem" />
    </el-select>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="uploadComponentVisiable = false">{{ getStr(store.settings.language,pagei18n.common.cancel) }}</el-button>
        <el-button type="primary" @click="uploadComponent">
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
import { ZoomIn, ZoomOut, InfoFilled, Download, Upload, UploadFilled, Delete, QuestionFilled } from '@element-plus/icons-vue'
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
import BasePlate from '../components/core/BasePlate.vue'
import ComponentVue from '../components/core/Component.vue'
import Tips from '../components/Tips.vue'

let activeEdit = ref('mail')
const router = useRouter()
const component = 'MailEdit'
let targetTemplate = ref()
let targetComponent = ref()
let downloadFileName = ref('')
let uploadTemplateVisiable = ref(false)
let uploadComponentVisiable = ref(false)
let uploadTemplateTarget = ref('')
let uploadComponentTarget = ref('')
let downloadTemplateVisable = ref(false)
let downloadComponentVisable = ref(false)
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
  if (JSON.stringify(store.settings) != '{}') {
    let tmp_arr = store.settings.proportion.split(':')
    let left = parseInt(tmp_arr[0])
    let right = parseInt(tmp_arr[1])
    let proportion_item = 100 / (left + right)

    return proportion_item * left
  } else {
    return 60
  }
})
const scaleView = (num: number) => {
  scaleViewSize.value += num
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

// 上传组件模板文件检查
const uploadComponentCheck = () => {
  invoke('load_components').then((res: any) => {
    store.components = res
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
  uploadComponentVisiable.value = true
}

// 上传文件
const uploadTemplate = () => {
  invoke('upload_file', { name: uploadTemplateTarget.value, isTemplate: true })
    .then((res: any) => {
      console.log(res)
      store.currentMailModel = JSON.parse(res)
      store.templateMailModel = store.currentMailModel
      targetTemplate.value.reInitAreaTipVisibles()
      targetTemplate.value.reInitModelTipVisibles()
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

const uploadComponent = () => {
  invoke('upload_file', { name: uploadComponentTarget.value, isTemplate: false })
    .then((res: any) => {
      console.log(res)
      store.currentComponent = JSON.parse(res)
      targetComponent.value.reinitModelTipVisibles()
      ElMessage({
        message: 'Upload Template Successfully! Please Wait a moment!',
        type: 'success'
      })
    })
    .catch(e => {
      console.log(e)
      ElMessage({
        message: 'Upload Template Failure!',
        type: 'error'
      })
    })
  setTimeout(() => {
    uploadComponentVisiable.value = false
  }, 500)
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

const downloadComponent = () => {
  let tmp = JSON.stringify(store.currentComponent)
  invoke('download_component', { name: downloadFileName.value, data: tmp, dom: targetComponent.value.$el.outerHTML })
    .then(res => {
      ElMessage({
        message: 'Download Component Successfully! Please Check Your Component Store Dir!',
        type: 'success'
      })
    })
    .catch(() => {
      ElMessage({
        message: 'Download Component Failed!',
        type: 'error'
      })
    })
  downloadComponentVisable.value = false
}

/**
 * 删除缓存,将刷新页面
 */
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

onMounted(() => {
  if (JSON.stringify(store.templateMailModel) != '{}') {
    store.currentMailModel = store.templateMailModel
  } else {
    store.currentMailModel = store.currentMailModel
  }
})

const tabChange = (tabName: string) => {
  activeEdit.value = tabName
}

//-----------------模板层级生成------------------------
interface Tree {
  label: string
  children?: Tree[]
}

const defaultProps = {
  children: 'children',
  label: 'label'
}

const handleNodeClick = (data: Tree) => {
  console.log(data)
}
//生成邮件层级树
let mailLevelTree = computed(() => {
  //get the mail model data
  let { base, areas } = store.currentMailModel
  let areaLen = areas.length
  let treeList: Tree[] = []

  treeList.push({
    label: '邮件底板',
    children: [] as Tree[]
  })

  for (let i = 0; i < areaLen; i++) {
    let item = {
      label: '区域' + (i + 1),
      children: [] as Tree[]
    }
    for (let j = 0; j < areas[i].modelItem.length; j++) {
      let modelItem = { label: '组件' + (j + 1) + ':' + areas[i].modelItem[j].name }
      item.children.push(modelItem)
    }
    treeList[0].children?.push(item)
  }

  return treeList
})

let componentLevelTree = computed(() => {
  let { modelItem } = store.currentComponent
  let areaLen = modelItem.length
  let treeList: Tree[] = []

  treeList.push({
    label: '组件域',
    children: [] as Tree[]
  })

  for (let i = 0; i < areaLen; i++) {
    let item = {
      label: '组件' + (i + 1) + ':' + modelItem[i].name
    }
    treeList[0].children?.push(item)
  }

  return treeList
})
</script>

<style lang="scss" >
@use '../styles/views/MailEdit.scss';
</style>
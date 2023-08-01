<template>
  <div :id="buildView(component)">
    <div :class="buildWrap(component,'left')" :style="`width:`+editLeftWidth+`%;`">
      <el-tabs v-model="activeEdit" class="demo-tabs" @tab-change="tabChange">
        <el-tab-pane :label="getStr(store.settings.language,pagei18n.edit.designMail) " name="mail">
          <div :style="scaleViewStyle" style="cursor: pointer;">
            <!-- todo: -->
            <!-- <BaseOutter id="targetTemplate" ref="targetTemplate" :data="store.currentMailModel"></BaseOutter> -->
            <BasePlate ref="targetTemplate" @add-component="addDefineComponent"></BasePlate>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="getStr(store.settings.language,pagei18n.edit.designComponent)" name="model">
          <div :style="scaleViewStyle" style="cursor: pointer;">
            <ComponentVue ref="targetComponent"></ComponentVue>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="getStr(store.settings.language,pagei18n.edit.tips)" name="tips">
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
          <span style="font-weight: 700;">{{ getStr(store.settings.language,pagei18n.edit.tool.level) }}</span>
          <el-tooltip placement="bottom">
            <template #content>
              {{ getStr(store.settings.language,pagei18n.edit.tool.levelInfo) }}
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
      <div :class="buildWrap(component,'StarContribute')">
        <StarContribute></StarContribute>
      </div>
      <div :class="buildWrap(component,'tools')">
        <el-tooltip effect="dark" :content="getStr(store.settings.language,pagei18n.tips.icon.zoomOut)" placement="top">
          <el-icon size="18" @click="scaleView(-0.1)">
            <ZoomOut />
          </el-icon>
        </el-tooltip>
        <el-tooltip effect="dark" :content="getStr(store.settings.language,pagei18n.tips.icon.zoomIn)" placement="top">
          <el-icon size="18" @click="scaleView(0.1)">
            <ZoomIn />
          </el-icon>
        </el-tooltip>
        <el-tooltip effect="dark" :content="getStr(store.settings.language,pagei18n.tips.icon.uploadTemplate)" placement="top">
          <img src="../assets/upload_template.svg" alt="" class="el-icon2" @click="uploadTemplateCheck">
        </el-tooltip>
        <el-tooltip effect="dark" :content="getStr(store.settings.language,pagei18n.tips.icon.downloadTemplate)" placement="top">
          <img src="../assets/download_mail.svg" alt="" class="el-icon2" @click="downloadTemplateVisable = true">
        </el-tooltip>
        <el-tooltip effect="dark" :content="getStr(store.settings.language,pagei18n.tips.icon.uploadComponent)" placement="top">
          <img src="../assets/upload_component.svg" alt="" class="el-icon2" @click="uploadComponentCheck">
        </el-tooltip>
        <el-tooltip effect="dark" :content="getStr(store.settings.language,pagei18n.tips.icon.downloadComponent)" placement="top">
          <img src="../assets/download_component.svg" alt="" class="el-icon2" @click="downloadComponentVisable = true">
        </el-tooltip>
        <el-tooltip effect="dark" :content="getStr(store.settings.language,pagei18n.tips.icon.delCache)" placement="top">
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
  <el-dialog v-model="adcVisible" title="Choose Component" width="40%">
    <el-select v-model="currentComponent" placeholder="Select" style="width: 90%;">
      <el-option v-for="item in store.components" :label="item" :value="item" :key="item">
      </el-option>
    </el-select>
    <div class="previewComponent">
      <TempComponent :data="previewComponentTarget"></TempComponent>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="adcVisible = false">{{ getStr(store.settings.language,pagei18n.common.cancel) }}</el-button>
        <el-button @click="previewComponent" type="info">preview</el-button>
        <el-button type="primary" @click="confirmUploadComponent">
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
import type { BaseModel, AreaModel, Model, I18n } from '../core'
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
import TempComponent from '../components/core/TempComponent.vue'
import StarContribute from '../components/core/StarContribute.vue'

let activeEdit = ref('mail')
const router = useRouter()
const component = 'MailEdit'
// add define component visibility
let adcVisible = ref(false)
let currentComponent = ref('')
let previewComponentTarget = reactive<AreaModel>({
  id: generateUUID(),
  bgColor: '#fff',
  direction: 'y',
  textAlign: 'center',
  justifyContent: 'center',
  modelItem: new Array()
})
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
let labels = [
  {
    zh: '邮件底板',
    en: 'Base Plate'
  } as I18n,
  {
    zh: '区域',
    en: 'Area'
  } as I18n,
  {
    zh: '组件',
    en: 'Component'
  } as I18n
]
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
        message: getStr(store.settings.language, pagei18n.tips.infos.noTemplate),
        type: 'info'
      })
    } else {
      ElMessage({
        message: getStr(store.settings.language, pagei18n.tips.infos.loadTemplateSuccess),
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
        message: getStr(store.settings.language, pagei18n.tips.infos.noTemplate),
        type: 'info'
      })
    } else {
      ElMessage({
        message: getStr(store.settings.language, pagei18n.tips.infos.loadTemplateSuccess),
        type: 'info'
      })
    }
  })
  uploadComponentVisiable.value = true
}

// 上传文件到邮件模板
const uploadTemplate = () => {
  invoke('upload_file', { name: uploadTemplateTarget.value, isTemplate: true })
    .then((res: any) => {
      console.log(res)
      store.currentMailModel = JSON.parse(res)
      store.templateMailModel = store.currentMailModel
      targetTemplate.value.reInitAreaTipVisibles()
      targetTemplate.value.reInitModelTipVisibles()
      ElMessage({
        message: getStr(store.settings.language, pagei18n.tips.infos.uploadTemplateSuccess),
        type: 'success'
      })
    })
    .catch(e => {
      ElMessage({
        message: getStr(store.settings.language, pagei18n.tips.infos.uploadTemplateFail),
        type: 'error'
      })
    })
  setTimeout(() => {
    uploadTemplateVisiable.value = false
  }, 1500)
}
//上传组件到组件设计
const uploadComponent = () => {
  invoke('upload_file', { name: uploadComponentTarget.value, isTemplate: false })
    .then((res: any) => {
      console.log(res)
      store.currentComponent = JSON.parse(res)
      targetComponent.value.reinitModelTipVisibles()
      ElMessage({
        message: getStr(store.settings.language, pagei18n.tips.infos.uploadComponentSuccess),
        type: 'success'
      })
    })
    .catch(e => {
      ElMessage({
        message: getStr(store.settings.language, pagei18n.tips.infos.uploadComponentFail),
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
        message: getStr(store.settings.language, pagei18n.tips.infos.downloadTemplateSuccess),
        type: 'success'
      })
    })
    .catch(() => {
      ElMessage({
        message: getStr(store.settings.language, pagei18n.tips.infos.downloadTemplateFail),
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
        message: getStr(store.settings.language, pagei18n.tips.infos.downloadComponentSuccess),
        type: 'success'
      })
    })
    .catch(() => {
      ElMessage({
        message: getStr(store.settings.language, pagei18n.tips.infos.downloadComponentFail),
        type: 'error'
      })
    })
  downloadComponentVisable.value = false
}

/**
 * 删除缓存,将刷新页面
 */
const delCache = () => {
  ElMessageBox.confirm(getStr(store.settings.language, pagei18n.tips.infos.delCache), 'Warning', {
    confirmButtonText: getStr(store.settings.language, pagei18n.common.confirm),
    cancelButtonText: getStr(store.settings.language, pagei18n.common.cancel),
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
  let { language } = store.settings

  let areaLen = areas.length
  let treeList: Tree[] = []

  treeList.push({
    label: getStr(language, labels[0]),
    children: [] as Tree[]
  })

  for (let i = 0; i < areaLen; i++) {
    let item = {
      label: getStr(language, labels[1]) + (i + 1),
      children: [] as Tree[]
    }
    for (let j = 0; j < areas[i].modelItem.length; j++) {
      let modelItem = { label: getStr(language, labels[2]) + (j + 1) + ':' + areas[i].modelItem[j].name }
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
  let { language } = store.settings
  treeList.push({
    label: getStr(language, labels[1]),
    children: [] as Tree[]
  })

  for (let i = 0; i < areaLen; i++) {
    let item = {
      label: getStr(language, labels[2]) + (i + 1) + ':' + modelItem[i].name
    }
    treeList[0].children?.push(item)
  }

  return treeList
})
//----------------------模板层级树生成完毕----------------------
const addDefineComponent = () => {
  invoke('load_components').then((res: any) => {
    store.components = res
    if (res.length == 0) {
      ElMessage({
        message: getStr(store.settings.language, pagei18n.tips.infos.noTemplate),
        type: 'info'
      })
    } else {
      ElMessage({
        message: getStr(store.settings.language, pagei18n.tips.infos.loadTemplateSuccess),
        type: 'info'
      })
    }
    adcVisible.value = true
  })
}
//上传自定义组件到邮件模板中
const confirmUploadComponent = () => {
  invoke('upload_file', { name: currentComponent.value, isTemplate: false })
    .then((res: any) => {
      let tmp = JSON.parse(res)
      store.currentMailModel.areas.push(tmp)
      targetTemplate.value.reInitAreaTipVisibles()
      targetTemplate.value.reInitModelTipVisibles()
      ElMessage({
        message: getStr(store.settings.language, pagei18n.tips.infos.uploadComponentSuccess),
        type: 'success'
      })
    })
    .catch(e => {
      ElMessage({
        message: getStr(store.settings.language, pagei18n.tips.infos.uploadComponentFail),
        type: 'error'
      })
    })
  setTimeout(() => {
    adcVisible.value = false
  }, 500)
}

const previewComponent = () => {
  invoke('upload_file', { name: currentComponent.value, isTemplate: false }).then((res: any) => {
    let tmp = JSON.parse(res)
    previewComponentTarget.id = tmp.id
    previewComponentTarget.bgColor = tmp.bgColor
    previewComponentTarget.direction = tmp.direction
    previewComponentTarget.justifyContent = tmp.justifyContent
    previewComponentTarget.textAlign = tmp.textAlign
    previewComponentTarget.modelItem = tmp.modelItem
  })
}
</script>

<style lang="scss" >
@use '../styles/views/MailEdit.scss';
</style>
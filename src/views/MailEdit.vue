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
                <div class="tmptitle">{{ getStr(store.settings.language,pagei18n.edit.contentPos) }}</div>
                <el-select v-model="citem.justifyContent" placeholder="Select Type">
                  <el-option v-for="jcitem in JustifyContent" :key="jcitem.value" :label="jcitem.label" :value="jcitem.value" />
                </el-select>
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
import { build, buildView, buildWrap } from '../styles/name'
import { ZoomIn, ZoomOut, InfoFilled, Operation, Download, Upload, UploadFilled, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { BaseModel, AreaModel, Model } from '../core'
import BaseOutter from '../components/BaseOutter.vue'
import { pagei18n, getStr } from '../core'
import { indexStore } from '../store/IndexPinia'
import { invoke } from '@tauri-apps/api'

const component = 'MailEdit'
let targetTemplate = ref()
let downloadFileName = ref('')
let uploadTemplateVisiable = ref(false)
let uploadTemplateTarget = ref('')
let downloadTemplateVisable = ref(false)
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

let mailModel = ref<any>({
  base: {
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

const saveAreaChange = (index: number) => {}
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
// 上传本地照片
const uploadPicture = (index: number, event: any) => {
  const file = event.target.files[0]
  convertImageToBase64(file)
    .then((base64: any) => {
      mailModel.value.areas[index].modelItem!.src = base64
    })
    .catch(error => {
      console.error(error)
    })

  console.log()
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
  }, 2000)
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

onMounted(() => {
  if (JSON.stringify(store.templateMailModel) != '{}') {
    mailModel.value = store.templateMailModel
  }
})
</script>

<style lang="scss" >
@use '../styles/views/MailEdit.scss';
</style>
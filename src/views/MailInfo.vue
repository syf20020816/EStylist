<template>
  <div :id="buildView(component)">
    <div :class="build(component,'title')">EStylist</div>
    <div :class="buildWrap(component,'content')">
      <div :class="build('content','title')">
        {{ getStr(store.settings.language,pagei18n.info.what) }}
      </div>
      <div :class="build('content','des')">
        {{ getStr(store.settings.language,pagei18n.info.des) }}
      </div>
      <div :class="build('content','title')">
        {{ getStr(store.settings.language,pagei18n.info.promise) }}
      </div>
      <div :class="build('content','des')">
        {{ getStr(store.settings.language,pagei18n.info.promiseDes) }}
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="version" label="Version" width="200" />
        <el-table-column prop="date" label="Date" />
        <el-table-column prop="author" label="Author" />
      </el-table>
      <div style="overflow-y: scroll;height: 40vh;margin-top: 10px;">
        <ul>
          <li v-for="item,index in updateList" :key="index">✅{{ item }}</li>
        </ul>
      </div>
    </div>
    <el-button type="primary" class="updateBtn" @click="checkUpdate">{{  getStr(store.settings.language,pagei18n.buttons.checkUpdate)  }}</el-button>
  </div>
  <el-dialog v-model="updateVisiable" :title="getStr(store.settings.language,pagei18n.common.uploadTemplate.title)" width="40%">
    <div style="text-align: left;">
      Version:{{ store.settings.version }} {{ updateOrNot }}
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="updateVisiable = false">{{ getStr(store.settings.language,pagei18n.common.cancel) }}</el-button>
        <el-button type="primary" @click="updateConfirm">
          {{ getStr(store.settings.language,pagei18n.common.confirm) }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
export default {
  name: 'MailInfo'
}
</script>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { build, buildView, buildWrap } from '../styles/name'
import { pagei18n, getStr } from '../core'
import { indexStore } from '../store/IndexPinia'
import { invoke } from '@tauri-apps/api'
import { exit } from '@tauri-apps/api/process'
import { ElMessage } from 'element-plus'
const component = 'MailInfo'
const store = indexStore()
let updateVisiable = ref(false)
// 更新提示
let updateOrNot = ref('')
// 进行更新
let updateNow = ref(false)
const tableData = [
  {
    date: '2023-06-23',
    version: '0.0.1',
    author: 'syf20020816@outlook.com'
  },
  {
    date: '2023-07-11',
    version: '0.0.2',
    author: 'syf20020816@outlook.com'
  },
  {
    date: '2023-08-02',
    version: '0.1.0',
    author: 'syf20020816@outlook.com'
  }
]

const checkUpdate = () => {
  let { language } = store.settings
  invoke('check_update').then(res => {
    if (res) {
      updateOrNot.value = getStr(language, pagei18n.info.update[0])
      updateNow.value = true
    } else {
      updateOrNot.value = getStr(language, pagei18n.info.update[1])
    }
    updateVisiable.value = true
  })
}

// 确定更新
const updateConfirm = () => {
  if (updateNow.value) {
    invoke('update_version').then(async () => {
      updateVisiable.value = false
      await exit(1)
    })
  } else {
    updateVisiable.value = false
  }
}

let updateList = computed(() => {
  let lang = store.settings.language
  if (lang == 'Chinese') {
    return [
      '增加模块组件边框属性',
      '增加自定义模块组件（支持用户自定义组件进行复用，提升效率）',
      '增加模块节点复制功能（添加区域将直接复制上个区域）',
      '优化模块节点删除',
      '提升模板编辑交互性',
      '增加用户模板直接预览',
      '增加模板库（用户可在线获取模板）',
      '增加组件库（用户在线获取组件）',
      '修复不完全国际化',
      '修复域冲突问题',
      '优化内部数据结构',
      '设置优化',
      '编辑界面更新(调色器,字体控制器)',
      '文档更新'
    ]
  }
  return [
    'Add module component border attributes',
    'Add custom module components (supporting reuse of user-defined components to improve efficiency)',
    'Add module node replication function (adding regions will directly copy the previous region)',
    'Optimization module node deletion',
    'Improve template editing interactivity',
    'Add user template for direct preview',
    'Add template library (users can obtain templates online)',
    'Add component library (users can access components online)',
    'Fix incomplete internationalization',
    'Fix domain conflict issues',
    'Optimize internal data structure',
    'Set Optimization',
    'Editing interface update (color palette, font controller)',
    'Document update'
  ]
})
</script>

<style lang="scss" scoped>
@use '../styles/views/MailInfo.scss';
</style>